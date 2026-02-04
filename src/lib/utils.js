export function capitalizeName(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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
