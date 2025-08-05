export function relativeLuminance(hex: string): number {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Calculate relative luminance
    const a = [r, g, b].map((color) => {
        return color <= 0.03928
            ? color / 12.92
            : ((color + 0.055) / 1.055) ** 2.4;
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrastRatio(hex1: string, hex2: string): number {
    const lum1 = relativeLuminance(hex1);
    const lum2 = relativeLuminance(hex2);

    // Calculate contrast ratio
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
}
