export function getShortAddress(addr: string | undefined) {
  if (!addr) return "";

  const lastIndex = addr.length - 1;
  return addr.substring(0, 4) + "..." + addr.substring(lastIndex - 3)
}