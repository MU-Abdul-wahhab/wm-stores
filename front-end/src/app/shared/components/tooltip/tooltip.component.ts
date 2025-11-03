import {Component, input, ViewEncapsulation} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tooltip.component.html',
  // encapsulation: ViewEncapsulation.None,
  host:{
    'class':'z-50'
  }
})
export class TooltipComponent {
  text = input.required<string>();
  show = input(false);
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  positionClass() {
    switch (this.position()) {
      case 'bottom':
        return 'tooltip-bottom';
      case 'left':
        return 'tooltip-left';
      case 'right':
        return 'tooltip-right';
      default:
        return 'tooltip-top';
    }
  }
}
