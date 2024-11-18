import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fadeColor',
  standalone: true
})
export class FadeColorPipe implements PipeTransform {


  transform(colorHex: string, alpha: number): string {
    if (!this.isValidHex(colorHex)) {
      console.warn('Invalid color hex code');
      return colorHex;  // Return original color if invalid
    }

    const rgba = this.hexToRgba(colorHex, alpha);
    return rgba;
  }

  private isValidHex(hex: string): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
  }

  private hexToRgba(hex: string, alpha: number): string {
    let r: number, g: number, b: number;

    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    } else {
      throw new Error('Invalid hex color');
    }

    alpha = Math.min(Math.max(alpha, 0), 1);  // Ensure alpha is between 0 and 1
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
