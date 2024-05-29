import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  /**
   * Identifier for the input element.
   */
  @Input() for: string = 'for';

  /**
   * Text label for the input.
   */
  @Input() label: string = 'Default Label';

  /**
   * Placeholder text for the input.
   */
  @Input() placeholder: string = 'Default Placeholder';

  /**
   * Size of the input element (e.g., small, medium, large).
   */
  @Input() inputSize: string = 'medium';

  /**
   * Indicates whether the input has a label.
   */
  hasLabel: boolean = false;

  /**
   * Indicates whether the input is currently active (focused).
   */
  isActive: boolean = false;

  /**
   * Reference to the wrapper element.
   */
  wrapper: any;

  /**
   * Reference to the select button element (if applicable).
   */
  selectBtn: any;

  ngOnInit() {
    // Check if a label is provided, set hasLabel accordingly
    if (this.label.length) {
      this.hasLabel = true;
    }
  }

  /**
   * Dynamically generates class names based on inputSize.
   * @returns {Object} Object with dynamic class names.
   */
  getClass(): object {
    const classes = {
      [`input--${this.inputSize}`]: this.inputSize, // Apply class based on inputSize
    };

    return classes;
  }
}
