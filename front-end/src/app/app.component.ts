import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutsComponent } from "./layouts/layouts.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
