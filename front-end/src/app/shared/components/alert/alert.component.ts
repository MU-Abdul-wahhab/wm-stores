import { Component, computed, ElementRef, input, output, viewChild } from '@angular/core';

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

  iconPath = computed(() => {
    return this.isError()
      ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4a2 2 0 00-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z'
      : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
  });

  colorClasses = computed(() => {
    return this.isError()
      ? 'bg-red-100 text-red-600'
      : 'bg-green-100 text-green-600';
  });

  buttonColor = computed(() => {
    return this.isError()
      ? 'bg-orange-500 hover:bg-orange-600'
      : 'bg-button-green hover:bg-buttonHover-green';
  });

  ngAfterViewInit(): void {
    this.dialogEl().nativeElement.showModal();
  }

  onClose() {
    this.dialogEl().nativeElement.close();
    this.closed.emit();
  }
}
