import {Component, computed, ElementRef, HostListener, input, output, viewChild} from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  errorMessage = input.required<string>();
  type = input<'error' | 'success'>('error');
  closed = output<void>();
  private dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('errorDialog');

  isError = computed(() => {
    return this.type() === 'error';
  });

  title = computed(() => {
    return this.isError() ? 'An Error Occurred' : 'Success';
  });

  iconClass = computed(() => {
    return this.isError()
      ? 'bi-exclamation-triangle'
      : 'bi-check-circle';
  });

  colorClasses = computed(() => {
    return this.isError()
      ? 'bg-red-100 text-red-600'
      : 'bg-green-100 text-green-600';
  });

  ngAfterViewInit(): void {
    this.dialogEl().nativeElement.showModal();
  }

  onClose() {
    this.dialogEl().nativeElement.close();
    this.closed.emit();
  }

  // Close dialog when clicking on backdrop
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dialog = this.dialogEl()?.nativeElement;
    if (dialog && event.target === dialog) {
      this.onClose();
    }
  }
}
