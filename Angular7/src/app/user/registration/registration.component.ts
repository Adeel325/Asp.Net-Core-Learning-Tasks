import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success("New user created", "Registration successful");
        }
        else{
          res.errors.forEach(element => {
            switch(element.code){
              case('DuplicateUserName'):
                //user already exist
                this.toastr.error('Username is alrady taken', 'Registration failed');
                break;
              default:
                //Registration failed
                this.toastr.error(element.description, 'Registration failed');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
