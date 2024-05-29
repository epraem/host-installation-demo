import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  constructor(private ngZone: NgZone) {}

  @Input() steps: { label: string; completed: boolean }[] = [];
  @Input() currentStep: number = 0;
  @Input() orientation: string = 'vertical';
  @Input() showSteps: boolean = true;
  @Input() clickable: boolean = true;

  @Output() finished = new EventEmitter<void>();
  @Output() stepClick = new EventEmitter<number>();

  onNext() {
    this.ngZone.run(() => {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep += 1;
        this.stepClick.emit(this.currentStep);
      }
    });
  }

  onBack() {
    this.ngZone.run(() => {
      if (this.currentStep > 0) {
        this.currentStep -= 1;
        this.stepClick.emit(this.currentStep);
      }
    });
  }

  goToStep(index: number) {
    if (this.clickable) {
      this.ngZone.run(() => {
        this.currentStep = index;
        this.stepClick.emit(this.currentStep);
      });
    }
  }

  onFinish() {
    this.ngZone.run(() => {
      this.finished.emit();
    });
  }
}
