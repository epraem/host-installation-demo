import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSizes, ButtonTypes } from './button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /**
   * The background color of the button. Accepts any valid CSS color value.
   * Used to force set the background color. Note: This does not influence hover and active states unless explicitly configured.
   */
  @Input() public backgroundColor: string = '';

  /**
   * Disabled state. Accepts true or false value.
   */
  @Input() public disabled: boolean = false;

  /**
   * The icon to display on the left side of the label. Expected to be a valid icon reference.
   */
  @Input() public iconLeft: string = '';

  /**
   * The icon to display on the right side of the label. Expected to be a valid icon reference.
   */
  @Input() public iconRight: string = '';

  /**
   * The text to display on the button. This label can be anything from a simple string to complex HTML.
   */
  @Input() public label: string = 'Click Me';

  /**
   * Defines the size of the button. Accepted values are 'xsm', 'sm', 'lg', or 'normal'.
   */
  @Input() public size: ButtonSizes = 'normal';

  /**
   * The text color of the button. Accepts any valid CSS color value.
   * Used to force set the text color. Note: This does not influence hover and active states unless explicitly configured.
   */
  @Input() public textColor: string = '';

  /**
   * Defines the type of the button, which influences its styling. Valid types are 'primary' and 'secondary'.
   */
  @Input() public type: ButtonTypes = 'primary';

  /**
   * Generates class names based on button type and size, if values are provided.
   * Constructs an object suitable for ngClass based on `type` and `size`.
   * @returns {Object} Object with dynamic class names
   */
  public getClass(): { [key: string]: boolean } {
    const classes = {
      [`btn--${this.type}`]: !!this.type,
      [`btn--${this.size}`]: !!this.size,
    };

    return classes;
  }
}
