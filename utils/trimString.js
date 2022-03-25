export function trimString(str) {
  const trimmedString = str.replace(/[^A-Za-z0-9]/g, '')
  return trimmedString
}
