import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  input,
  InputSignal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ICONS, Icons } from '../../../core/models/icons/icon.const';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss',
})
export class SvgIconComponent implements OnChanges {
  // Inputs
  public icon: InputSignal<Icons> = input.required<Icons>();
  public size: InputSignal<number> = input<number>(3);
  @Input() fill: string | undefined;

  // Public
  public ICONS = ICONS;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fill']?.currentValue) {
      this.fillStyles;
    }
  }

  get fillStyles() {
    const styles: { [key: string]: string } = {};
    for (let i = 1; i <= 15; i++) {
      styles[`--color${i}`] = this.fill!;
    }
    return styles;
  }
}
