import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { Icons, ICONS } from '@e-commerce-store/core/models/icons/icon.const';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  // Inputs
  public icon: InputSignal<Icons> = input.required<Icons>();
  public size: InputSignal<number> = input<number>(3);

  // Public
  public ICONS = ICONS
}
