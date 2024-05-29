import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card';
import { CardConfig } from './components/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  cardConfig = signal<CardConfig>({
    shadowLevel: 1,
    backgroundColor: 'red',
    sidePadding: 2,
    cardSize: 'fit-content',
  });
}
