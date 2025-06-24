import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoggedIn = false;
  loginContainerClasses = 'max-w-md space-y-8 p-8';
  signupContainerClasses = 'max-w-lg space-y-3 md:space-y-8 p-4 md:p-8';

  onClick(){
    this.isLoggedIn = !this.isLoggedIn;
  }

}
