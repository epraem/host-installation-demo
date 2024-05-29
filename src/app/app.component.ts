import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card';
import { StepperComponent } from './components/stepper/stepper.component';
import { TextComponent } from './components/text';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, StepperComponent, TextComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Host Installation';
  cardSize = 'fit-content';

  // Forms Stepper
  formStepperBg = '#ffffff';
  formCardSize = 'auto';
  formOrientation: string = 'horizontal';
  formCurrentStep: number = 0;

  // Step 1
  createHostSteps: { label: string; completed: boolean }[] = [
    { label: 'Search Hostplace', completed: false },
    { label: 'Create Hostplace', completed: true },
  ];

  // Step 2
  generateLicenseSteps: { label: string; completed: boolean }[] = [
    { label: 'Enter License Details', completed: true },
    { label: 'Review License', completed: false },
    { label: 'Confirm and Generate', completed: false },
  ];

  // Step 3
  createScreenSteps: { label: string; completed: boolean }[] = [
    { label: 'Create Screen', completed: false },
    { label: 'Choose Template', completed: false },
    { label: 'Assign Playlist', completed: false },
  ];

  formSteps: { label: string; completed: boolean }[] = this.createHostSteps;

  // Sidebar Stepper
  sidebarBg = '#091635';
  sidebarClickable: boolean = true;
  sidebarCurrentStep: number = 0;
  sidebarOrientation: string = 'vertical';
  sidebarSteps: { label: string; completed: boolean }[] = [
    {
      label: 'Create a Host',
      completed: this.createHostSteps.every((data) => data.completed),
    },
    {
      label: 'Generate License',
      completed: this.generateLicenseSteps.every((data) => data.completed),
    },
    {
      label: 'Create Screen',
      completed: this.createScreenSteps.every((data) => data.completed),
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  goToStep(stepIndex: number) {
    this.sidebarCurrentStep = stepIndex;
    let newFormSteps: { label: string; completed: boolean }[];

    if (stepIndex === 0) {
      newFormSteps = this.createHostSteps;
    } else if (stepIndex === 1) {
      newFormSteps = this.generateLicenseSteps;
    } else if (stepIndex === 2) {
      newFormSteps = this.createScreenSteps;
    } else {
      newFormSteps = [];
    }

    // Set the new form steps first before checking the current step
    this.formSteps = newFormSteps;

    // Determine the last incomplete step
    const lastIncompleteStep = newFormSteps.findIndex(
      (step) => !step.completed
    );
    if (lastIncompleteStep !== -1) {
      this.formCurrentStep = lastIncompleteStep;
    } else {
      this.formCurrentStep = newFormSteps.length - 1;
    }

    this.cdr.detectChanges();
  }

  goToFormStep(stepIndex: number) {
    this.formCurrentStep = stepIndex;
    this.cdr.detectChanges();
  }
}
