import {Component, HostListener, signal} from '@angular/core';

@Component({
  selector: 'app-move-top-btn',
  imports: [],
  templateUrl: './move-top-btn.component.html',
  styleUrl: './move-top-btn.component.css',
  host: {
    'class': 'fixed bottom-8 right-8 transition-opacity duration-300',
    '[class.opacity-0]': 'isAtTop()',
    '[class.pointer-events-none]': 'isAtTop()'
  }
})
export class MoveTopBtnComponent {
  isAtTop = signal(true);

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.isAtTop.set(scrollTop < 126);
  }

  topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
