import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  readonly BaseURI = 'http://localhost:62537/api';

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : [''],
    Passwords: this.fb.group(
      {
        Password : ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword : ['', Validators.required]
      },
      {
        validator: this.comparePasswords
      }
    ),
    Address : [''],
    FacebookId : [''],
    LinkedIn : ['']
  });

  comparePasswords(fb:FormGroup){
    let ConfirmPswrdCtrl = fb.get('ConfirmPassword');
    if(ConfirmPswrdCtrl.errors == null || 'passwordMismatch' in ConfirmPswrdCtrl.errors){
      if(fb.get('Password').value != ConfirmPswrdCtrl.value){
        ConfirmPswrdCtrl.setErrors({passwordMismatch: true});
      }
      else{
        ConfirmPswrdCtrl.setErrors(null);
      } 
    }
  }

  register(){
    var body = {
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName : this.formModel.value.FullName,
      Password : this.formModel.value.Passwords.Password,
      Address : this.formModel.value.Address,
      FacebookId : this.formModel.value.FacebookId,
      LinkedIn : this.formModel.value.LinkedIn
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData){
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  roleMatch(allowRoles): boolean{
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payload.role;
    allowRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
