export function capitalizeName(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Resolve name from search params: `n` (base64-encoded) takes priority, falls back to `name` (plain string)
export function resolveNameParam(searchParams) {
  const encoded = searchParams.get("n");
  if (encoded) {
    try {
      const decoded = atob(encoded);
      return capitalizeName(decoded.trim());
    } catch {
      return null;
    }
  }

  const raw = searchParams.get("name");
  if (raw) {
    return capitalizeName(raw.trim());
  }

  return null;
}

export function cn(...inputs) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string") return [input];
      if (Array.isArray(input)) return input.filter(Boolean);
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ")
    .trim();
}
