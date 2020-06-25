import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

const localUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

	emails: any = [];

	constructor (public http: HttpClient) {

	}

getEmail() {
  return this.http.get(localUrl);
}

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {

    /* A static array is used to validate the availability of user names.
    *  Ideally it should be a service call to the server to search the value from a database.
    */

    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }

  emailExistValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateEmailExist(userControl.value)) {
          resolve({ emailNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateEmailExist(Email: string) {
     this.getEmail()
    .subscribe(data => {
      for (const d of (data as any)) {
        this.emails.push(d.email
        );
      }
      
    });

    /*const source$: Observable<any> = this.http.get(this.apiUrl, {responseType: 'json'});
 
  source$.pipe(
      map(x => x),
      filter(x => x)
  ).subscribe(x => console.log(x));*/

      const obj = JSON.stringify(this.emails); // Converts the JS Obj to JSON
      const ob = JSON.parse(obj); // Converts to JSON to array/JS Obj
      const x = Object.values(ob); // Get the values in the Obj/array
    return (x.indexOf(Email) > -1);
  }


}