function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s: number;
  const l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100]; // return HSL as degrees and percentages
}

export function hslToString(hsl: number[]): string {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

export function darkenHsl(hsl: number[], amount: number): number[] {
  return [hsl[0], hsl[1], Math.max(hsl[2] - amount, 10)];
}

export function darkenHexHsl(hex: string | null, amount: number): string {
  if (!hex) {
    return 'hsl(0, 0%, 0%)';
  }
  return hslToString(darkenHsl(hexToHsl(hex), amount));
}
