import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

interface Step {
  label: string;
  completed: boolean;
}
@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  constructor(private ngZone: NgZone) {}

  /**
   * An array of step objects containing label and completed status.
   * @type {{ label: string; completed: boolean }[]}
   */
  @Input() steps: Step[] = [];

  /**
   * The current step index.
   * @type {number}
   */
  @Input() currentStep: number = 0;

  /**
   * The orientation of the stepper, either 'horizontal' or 'vertical'.
   * @type {string}
   */
  @Input() orientation: string = 'vertical';

  /**
   * A flag indicating whether to show step numbers.
   * @type {boolean}
   */
  @Input() showSteps: boolean = true;

  /**
   * A flag indicating whether the steps are clickable.
   * @type {boolean}
   */
  @Input() clickable: boolean = true;

  /**
   * Event emitted when the stepper is finished.
   * @type {EventEmitter<void>}
   */
  @Output() finished: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event emitted when a step is clicked.
   * @type {EventEmitter<number>}
   */
  @Output() stepClick: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Advances to the next step.
   */
  onNext() {
    this.ngZone.run(() => {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep += 1;
        this.stepClick.emit(this.currentStep);
      }
    });
  }

  /**
   * Goes back to the previous step.
   */
  onBack() {
    this.ngZone.run(() => {
      if (this.currentStep > 0) {
        this.currentStep -= 1;
        this.stepClick.emit(this.currentStep);
      }
    });
  }

  /**
   * Navigates to a specific step.
   * @param {number} index - The index of the step to navigate to.
   */
  goToStep(index: number) {
    if (this.clickable) {
      this.ngZone.run(() => {
        this.currentStep = index;
        this.stepClick.emit(this.currentStep);
      });
    }
  }

  /**
   * Completes the stepper process.
   */
  onFinish() {
    this.ngZone.run(() => {
      this.finished.emit();
    });
  }
}
