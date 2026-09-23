import fs from "fs/promises";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function parseFrontMatter(source) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n?/;
  const match = source.match(frontMatterRegex);

  if (!match) {
    return { metadata: {}, content: source.trim() };
  }

  const [, rawMetadata] = match;
  const content = source.slice(match[0].length);
  const metadata = {};
  const lines = rawMetadata.split("\n");

  lines.forEach((line) => {
    if (!line.trim()) return;
    const [rawKey, ...rest] = line.split(":");
    if (!rawKey || rest.length === 0) return;

    const key = rawKey.trim();
    const rawValue = rest.join(":").trim();
    metadata[key] = normalizeValue(rawValue);
  });

  return { metadata, content: content.trim() };
}

function normalizeValue(value) {
  if (!value) return "";

  const normalized = value.trim();

  if (
    (normalized.startsWith("\"") && normalized.endsWith("\"")) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    return normalized.slice(1, -1);
  }

  if (normalized.startsWith("[") && normalized.endsWith("]")) {
    try {
      return JSON.parse(normalized.replace(/'([^']+)'/g, '"$1"'));
    } catch (error) {
      return normalized
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^\"|\"$/g, ""))
        .filter(Boolean);
    }
  }

  if (normalized === "true" || normalized === "false") {
    return normalized === "true";
  }

  if (!Number.isNaN(Number(normalized))) {
    return Number(normalized);
  }

  return normalized;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function transformInline(text) {
  let transformed = escapeHtml(text);

  transformed = transformed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  transformed = transformed.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  transformed = transformed.replace(/\*(?!\s)([^*]+)\*(?!\s)/g, "<em>$1</em>");
  transformed = transformed.replace(/`([^`]+)`/g, "<code>$1</code>");

  return transformed;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const htmlParts = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^```/.test(line)) {
      const language = line.slice(3).trim();
      const codeLines = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      htmlParts.push(
        `<pre><code${language ? ` class="language-${language}"` : ""}>${escapeHtml(
          codeLines.join("\n"),
        )}</code></pre>`,
      );
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(transformInline(lines[index].trim().replace(/^>\s?/, "")));
        index += 1;
      }
      htmlParts.push(`<blockquote>${quoteLines.join("<br />")}</blockquote>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        const itemText = lines[index].trim().replace(/^[-*]\s+/, "");
        items.push(`<li>${transformInline(itemText)}</li>`);
        index += 1;
      }
      htmlParts.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        const itemText = lines[index].trim().replace(/^\d+\.\s+/, "");
        items.push(`<li>${transformInline(itemText)}</li>`);
        index += 1;
      }
      htmlParts.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (/^#{1,6}\s+/.test(line)) {
      const [, hashes, headingText] = line.match(/^(#{1,6})\s+(.*)$/) ?? [];
      if (hashes) {
        const level = Math.min(hashes.length, 6);
        htmlParts.push(`<h${level}>${transformInline(headingText.trim())}</h${level}>`);
        index += 1;
        continue;
      }
    }

    const paragraphLines = [];
    while (index < lines.length && lines[index].trim()) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    const paragraphText = transformInline(paragraphLines.join(" "));
    htmlParts.push(`<p>${paragraphText}</p>`);
  }

  return htmlParts.join("");
}

function ensureArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [value];
}

function estimateReadTime(content) {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()!-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return `${Math.max(1, Math.ceil(words.length / 220))} min read`;
}

function normalizeMetadata(slug, metadata, content = "") {
  const normalizedDate = metadata.date ? new Date(metadata.date) : null;

  return {
    slug,
    title: metadata.title ?? "Untitled Post",
    description: metadata.description ?? "",
    keywords: ensureArray(metadata.keywords),
    date: normalizedDate ? normalizedDate.toISOString().split("T")[0] : "",
    author: metadata.author ?? "",
    category: metadata.category ?? "",
    tags: ensureArray(metadata.tags),
    coverImage: metadata.coverImage ?? "",
    coverImageAlt: metadata.coverImageAlt ?? metadata.title ?? "Blog post cover image",
    readTime: estimateReadTime(content),
  };
}

async function readPostFile(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const file = await fs.readFile(filePath, "utf8");
  const { metadata, content } = parseFrontMatter(file);
  const normalized = normalizeMetadata(slug, metadata, content);
  const html = markdownToHtml(content);

  return { metadata: normalized, html };
}

export async function getAllPostSlugs() {
  try {
    const entries = await fs.readdir(BLOG_DIR);
    return entries.filter((entry) => entry.endsWith(".mdx")).map((entry) => entry.replace(/\.mdx$/, ""));
  } catch (error) {
    return [];
  }
}

export async function getAllPostsMetadata() {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map(async (slug) => readPostFile(slug)));

  return posts
    .map(({ metadata }) => metadata)
    .sort((a, b) => (a.date && b.date ? new Date(b.date) - new Date(a.date) : 0));
}

export async function getPostBySlug(slug) {
  try {
    return await readPostFile(slug);
  } catch (error) {
    return null;
  }
}

export function renderMarkdown(markdown) {
  return markdownToHtml(markdown);
}
