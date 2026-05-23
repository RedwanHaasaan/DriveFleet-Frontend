export function getMongoId(value) {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (typeof value === "object") {
    if (value.$oid) return value.$oid;
    if (typeof value.toString === "function") {
      const str = value.toString();
      if (str !== "[object Object]") return str;
    }
  }

  return String(value);
}
