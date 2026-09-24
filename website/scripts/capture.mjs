// Screenshot a page as a desktop or phone, for project mockups.
// usage: node scripts/capture.mjs <url> <desktop|phone> <out.png> [--width=1440 --height=960] [--cookie=name=value] [--reduce-motion] [--wait=2500]
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PRESETS = {
  desktop: { width: 1440, height: 960, scale: 2, mobile: false },
  phone: { width: 430, height: 885, scale: 3, mobile: true },
};
const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;

const args = process.argv.slice(2);
const [url, presetName, out] = args.filter((a) => !a.startsWith("--"));
const option = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
if (!url || !PRESETS[presetName] || !out) {
  console.error("usage: node scripts/capture.mjs <url> <desktop|phone> <out.png> [--width=1440 --height=960] [--cookie=name=value] [--reduce-motion] [--wait=2500]");
  process.exit(1);
}
const preset = {
  ...PRESETS[presetName],
  ...(option("width") && { width: Number(option("width")) }),
  ...(option("height") && { height: Number(option("height")) }),
};
const reduceMotion = args.includes("--reduce-motion");
const waitMs = Number(option("wait") ?? 2500);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), "capture-"));
const chrome = spawn(
  CHROME,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`],
  { stdio: "ignore" }
);

try {
  const base = `http://127.0.0.1:${PORT}`;
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(`${base}/json/version`);
      break;
    } catch {
      await sleep(200);
    }
  }
  const target = await (await fetch(`${base}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (events.has(msg.method)) {
      events.get(msg.method)();
      events.delete(msg.method);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)));
      ws.send(JSON.stringify({ id: n, method, params }));
    });

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: preset.width,
    height: preset.height,
    deviceScaleFactor: preset.scale,
    mobile: preset.mobile,
  });
  if (preset.mobile) {
    await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await send("Emulation.setUserAgentOverride", { userAgent: IPHONE_UA });
  }
  // e.g. a consent cookie, so a cookie banner doesn't cover the page
  for (const arg of args.filter((a) => a.startsWith("--cookie="))) {
    const [name, ...rest] = arg.slice("--cookie=".length).split("=");
    await send("Network.setCookie", { name, value: rest.join("="), url });
  }
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: reduceMotion ? "reduce" : "no-preference" }],
  });

  const loaded = new Promise((r) => events.set("Page.loadEventFired", r));
  await send("Page.navigate", { url });
  await Promise.race([loaded, sleep(15000)]);
  await sleep(waitMs);

  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(out, Buffer.from(data, "base64"));
  console.log("saved", out);
  ws.close();
} finally {
  chrome.kill();
  await new Promise((r) => (chrome.exitCode !== null ? r() : chrome.once("exit", r)));
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
