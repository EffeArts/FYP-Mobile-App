// App's Authentication

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
   private isLoggedIn = false;

   constructor() {}

   // Login token

   login() : void {
      this.isLoggedIn = true;
   }

   // Logout the user, and destroy token
    logout() : void {
       this.isLoggedIn = false;
    }

    // Returns whether the user is currently authenticated
    // Could check if current token is still valid
    authenticated() : boolean {
       return this.isLoggedIn;
    }
}