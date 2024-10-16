export default function isJson(input: string) {
  try {
    var json = JSON.parse(input);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
}
