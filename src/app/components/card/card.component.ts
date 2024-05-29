import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardConfig, CardShadows } from './card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  config = input<CardConfig>({
    shadowLevel: 1,
    backgroundColor: '#ffffff',
    sidePadding: 25,
    cardSize: 'auto'
  });

  getClass(): object {
    return {
      [`card--shadow-${this.config().shadowLevel}`]: this.config().shadowLevel,
    };
  }
}
