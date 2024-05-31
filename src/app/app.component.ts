import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card';
import { StepperComponent } from './components/stepper/stepper.component';
import { TextComponent } from './components/text';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

interface Field {
  label: string;
  placeholder: string;
  leftIconSvg?: string;
  rightIconSvg?: string;
  dummyData?: { id: string; name: string }[];
}

interface Step {
  step: string;
  fields: Field[];
}

/**
 * Root application component that integrates the stepper functionality.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AutocompleteComponent,
    ButtonComponent,
    CardComponent,
    CommonModule,
    InputComponent,
    RouterOutlet,
    StepperComponent,
    TextComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cardSize = 'fit-content';

  //DUMMY DATA
  formData: { steps: Step[] } = {
    steps: [
      {
        step: 'Search Host Place',
        fields: [
          {
            label: 'Search City',
            placeholder: 'City Name',
            leftIconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20px">
              <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`, rightIconSvg: `<svg width="15" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              clip-rule="evenodd"
              d="M9.53033 9.28033C9.23744 9.57322 8.76256 9.57322 8.46967 9.28033L0.96967 1.78033C0.676777 1.48744 0.676777 1.01256 0.96967 0.719671C1.26256 0.426777 1.73744 0.426777 2.03033 0.719671L9 7.68934L15.9697 0.71967C16.2626 0.426777 16.7374 0.426777 17.0303 0.71967C17.3232 1.01256 17.3232 1.48744 17.0303 1.78033L9.53033 9.28033Z" 
            >
            </path>
          </svg>`,
            dummyData: [
              { id: '1', name: 'New York' },
              { id: '2', name: 'Los Angeles' },
              { id: '3', name: 'Chicago' },
              { id: '4', name: 'Houston' },
              { id: '5', name: 'Phoenix' },
              { id: '6', name: 'Philadelphia' },
              { id: '7', name: 'San Antonio' },
              { id: '8', name: 'San Diego' },
              { id: '9', name: 'Dallas' },
              { id: '10', name: 'San Jose' },
              { id: '11', name: 'Austin' },
              { id: '12', name: 'Jacksonville' },
              { id: '13', name: 'Fort Worth' },
              { id: '14', name: 'Columbus' },
              { id: '15', name: 'Charlotte' },
            ],
          },
        ],
      },
      {
        step: 'Create Host Place',
        fields: [
          {
            label: 'Host Name',
            placeholder: 'Type Host Name',
          },
          {
            label: 'Description',
            placeholder: 'Describe this Host',
          },
        ],
      },
    ],
  };

  dummyTemplates = [
    { id: '1', name: 'Guthib Zone' },
    { id: '2', name: 'Template 2' },
    { id: '3', name: 'Template 3' },
    { id: '4', name: 'Template 4' },
    { id: '5', name: 'Template 5' },
    { id: '6', name: 'Template 6' },
    { id: '7', name: 'Template 7' },
    { id: '8', name: 'Template 8' },
    { id: '9', name: 'Template 9' },
    { id: '10', name: 'Template 10' },
    { id: '11', name: 'Template 11' },
    { id: '12', name: 'Template 12' },
    { id: '13', name: 'Template 13' },
    { id: '14', name: 'Template 14' },
    { id: '15', name: 'Template 15' },
  ];

  dummyPlaylists = [
    { id: '1', name: 'Tito Mars Playlist' },
    { id: '2', name: 'Playlist 2' },
    { id: '3', name: 'Playlist 3' },
    { id: '4', name: 'Playlist 4' },
    { id: '5', name: 'Playlist 5' },
    { id: '6', name: 'Playlist 6' },
    { id: '7', name: 'Playlist 7' },
    { id: '8', name: 'Playlist 8' },
    { id: '9', name: 'Playlist 9' },
    { id: '10', name: 'Playlist 10' },
  ];

  // Forms Stepper
  formStepperBg = '#ffffff';
  formCardSize = 'auto';
  formOrientation: string = 'horizontal';
  formCurrentStep$ = new BehaviorSubject<number>(0);

  // Host Installation Steps
  hostInstallationSteps: {
    title: string;
    steps: { label: string; completed: boolean }[];
  }[] = [
    {
      title: 'Create a Host',
      steps: [
        { label: 'Search Hostplace', completed: false },
        // THIS SHOULD BE BASED ON THE SECOND STEP INPUTS
        { label: 'Create Hostplace', completed: true },
      ],
    },
    {
      title: 'Generate a License',
      steps: [
        { label: 'Enter License Details', completed: false },
        { label: 'Review License', completed: false },
        { label: 'Confirm and Generate', completed: false },
      ],
    },
    {
      title: 'Create a Screen',
      steps: [
        { label: 'Create Screen', completed: false },
        { label: 'Choose Template', completed: false },
        { label: 'Assign Playlist', completed: false },
      ],
    },
  ];

  formSteps$ = new BehaviorSubject<{ label: string; completed: boolean }[]>(
    this.hostInstallationSteps[0].steps
  );

  // Sidebar Stepper
  sidebarBg = '#091635';
  sidebarClickable: boolean = true;
  sidebarCurrentStep$ = new BehaviorSubject<number>(0);
  sidebarOrientation: string = 'vertical';
  sidebarSteps: { label: string; completed: boolean }[] =
    this.hostInstallationSteps.map((step) => ({
      label: step.title,
      completed: step.steps.every((s) => s.completed),
    }));

  searchHostForm: FormGroup;
  createHostForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchHostForm = this.fb.group({
      city: ['', Validators.required],
    });

    this.createHostForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.searchHostForm.valueChanges.subscribe((value) => {
      if (this.searchHostForm.valid) {
        this.updateStepCompletion('Search Hostplace', true);
      } else {
        this.updateStepCompletion('Search Hostplace', false);
      }
    });

    this.createHostForm.valueChanges.subscribe((value) => {
      if (this.createHostForm.valid) {
        this.updateStepCompletion('Create Hostplace', true);
      } else {
        this.updateStepCompletion('Create Hostplace', false);
      }
    });
  }

  /**
   * Update the completion status of a step based on its label.
   * @param {string} label - The label of the step to update.
   * @param {boolean} completed - The completion status to set.
   */
  updateStepCompletion(label: string, completed: boolean): void {
    this.hostInstallationSteps.forEach((stepGroup) => {
      stepGroup.steps.forEach((step) => {
        if (step.label === label) {
          step.completed = completed;
        }
      });
    });

    // Update the sidebar steps to reflect the changes
    this.sidebarSteps = this.hostInstallationSteps.map((step) => ({
      label: step.title,
      completed: step.steps.every((s) => s.completed),
    }));
  }

  /**
   * Navigates to the specified step in the sidebar and updates form steps.
   * @param {number} stepIndex - The index of the sidebar step to navigate to.
   */
  goToStep(stepIndex: number): void {
    this.sidebarCurrentStep$.next(stepIndex);

    const selectedStep = this.hostInstallationSteps[stepIndex];
    this.formSteps$.next(selectedStep.steps);

    // Determine the last incomplete step
    const lastIncompleteStep = selectedStep.steps.findIndex(
      (step) => !step.completed
    );
    this.formCurrentStep$.next(
      lastIncompleteStep !== -1
        ? lastIncompleteStep
        : selectedStep.steps.length - 1
    );
  }

  /**
   * Navigates to the specified step in the form stepper.
   * @param {number} stepIndex - The index of the form step to navigate to.
   */
  goToFormStep(stepIndex: number): void {
    this.formCurrentStep$.next(stepIndex);
  }

  /**
   * Advances to the next step in the form stepper.
   */
  onNext(): void {
    const currentStepIndex = this.formCurrentStep$.getValue();
    const currentFormSteps = this.formSteps$.getValue();
    const sidebarStepIndex = this.sidebarCurrentStep$.getValue();

    if (currentStepIndex < currentFormSteps.length - 1) {
      // Move to next form step
      this.formCurrentStep$.next(currentStepIndex + 1);
    } else if (sidebarStepIndex < this.hostInstallationSteps.length - 1) {
      // Move to next sidebar step
      this.goToStep(sidebarStepIndex + 1);
    } else {
      // Submit the form
      this.onSubmit();
    }
  }

  /**
   * Goes back to the previous step in the form stepper.
   */
  onBack(): void {
    const currentStepIndex = this.formCurrentStep$.getValue();
    const sidebarStepIndex = this.sidebarCurrentStep$.getValue();

    if (currentStepIndex > 0) {
      this.formCurrentStep$.next(currentStepIndex - 1);
    } else if (sidebarStepIndex > 0) {
      this.goToStep(sidebarStepIndex - 1);
    }
  }

  /**
   * Handles the form submission.
   */
  onSubmit(): void {
    console.log('Form submitted');
  }

  /**
   * Returns the title of the current sidebar step.
   * @returns {string} The title of the current sidebar step.
   */
  getCurrentTitle(): string {
    const currentIndex = this.sidebarCurrentStep$.getValue();
    return this.hostInstallationSteps[currentIndex].title;
  }

  /**
   * Returns the label of the current form step.
   * @returns {string} The label of the current form step.
   */
  getCurrentFormLabel(): string {
    const currentIndex = this.formCurrentStep$.getValue();
    return this.formSteps$.getValue()[currentIndex].label;
  }

  /**
   * Returns the fields for the current form step.
   * @returns {Step[]} The fields for the current form step.
   */
  getCurrentFormStepFields(): Field[] {
    const currentIndex = this.formCurrentStep$.getValue();
    return this.formData.steps[currentIndex].fields;
  }

  /**
   * Returns the label for the next button based on the current step and sidebar step.
   * @returns {string} The label for the next button.
   */
  getNextButtonLabel(): string {
    const currentFormStepIndex = this.formCurrentStep$.getValue();
    const currentFormSteps = this.formSteps$.getValue();
    const sidebarStepIndex = this.sidebarCurrentStep$.getValue();

    if (currentFormStepIndex < currentFormSteps.length - 1) {
      return 'Next';
    } else if (sidebarStepIndex < this.hostInstallationSteps.length - 1) {
      return 'Proceed';
    } else {
      return 'Submit';
    }
  }

  handleOptionSelected(option: any) {
    if (option) {
      this.searchHostForm.patchValue({ city: option.name });
    } else {
      this.searchHostForm.patchValue({ city: '' });
    }
  }

 
  
}
