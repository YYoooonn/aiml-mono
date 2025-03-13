export default function isJson(input: string) {
  try {
    const json = JSON.parse(input);
    return typeof json === "object";
  } catch {
    return false;
  }
}
