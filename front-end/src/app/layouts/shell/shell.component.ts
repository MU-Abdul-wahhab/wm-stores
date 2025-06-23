import { Component } from '@angular/core';
import { AuthComponent } from "../../features/auth/auth.component";

@Component({
  selector: 'app-shell',
  imports: [AuthComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent {

}
