export function getColorFromAddress(address: string): string {
  const hex = address.slice(0, 6);
  const num = parseInt(hex, 16);

  // Generate hue based on the number (0-360)
  const hue = num % 360;

  // Use different parts of the number for saturation and lightness
  const saturation = 70 + ((num >> 8) % 30); // Use bits 8-15 for saturation
  const lightness = 50 + ((num >> 16) % 20); // Use bits 16-23 for lightness

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
