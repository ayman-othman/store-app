import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HNavBarComponent } from './core/components/h-nav-bar/h-nav-bar.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HNavBarComponent, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'store-app';
}
