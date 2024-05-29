import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontWeights, TextTypes } from './text';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  /**
   * Specifies the font size of the text. Accepts any valid CSS font-size value.
   * Example values: '16px', '1em', '1.5rem', etc.
   */
  @Input() fontSize!: number;

  /**
   * Specifies the font weight of the text. Accepts any valid CSS font-weight value.
   * Example values: 'normal', 'bold', '600', etc.
   */
  @Input() fontWeight!: FontWeights;

  /**
   * Specifies the text color. Accepts any valid CSS color format.
   * Example values: 'red', '#ff0000', 'rgb(255, 0, 0)', etc.
   */
  @Input() textColor: string = '';

  /**
   * The text content to be displayed. This is the actual text that appears in the component.
   * Default value is 'This is a text'.
   */
  @Input() textContent: string = 'This is a text';

  /**
   * Specifies the type of text with pre-set font-size and font-weight.
   * Expected Values: 'larger', 'large', 'heading', 'paragraph', 'small'.
   */
  @Input() textType: TextTypes = 'paragraph';

  /**
   * Generates class names based on text type, if values are provided.
   * Constructs an object suitable for ngClass based on `textType`.
   * Add more if necessary
   * @returns {Object} Object with dynamic class names
   */
  getClass() {
      const classes = {
          [`formatted-text--${this.textType}`]: this.textType,
          [`formatted-text--${this.fontWeight}`]: this.fontWeight,
      };

      return classes;
  }
}
