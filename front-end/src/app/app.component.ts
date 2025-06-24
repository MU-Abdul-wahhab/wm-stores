import { Component } from '@angular/core';
import { AuthComponent } from "./features/auth/auth.component";


@Component({
  selector: 'app-root',
  imports: [AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
