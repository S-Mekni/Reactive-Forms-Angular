import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { forbiddenNameValidator } from './shared/user_name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm: FormGroup;
  get userName(){
    return this.registrationForm.get('username');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  addAlternateEmail(){
   this.alternateEmails.push(this.fb.control(''));
  }
  removeEmails(){
    this.alternateEmails.removeAt(this.alternateEmails.length -1);
   }
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService){}


  ngOnInit() {
  this.registrationForm = this.fb.group({

      username : ['mohammad', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      password: [''],
      email: [''],
      subscribe: [false],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    },{validator: PasswordValidator});
    
  this.registrationForm.get('subscribe').valueChanges
    .subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      }
      else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  // registrationForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });
  loadApiData(){
    // this.registrationForm.setValue({
    //   username: 'ali',
    //   password: 'test',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'amman',
    //     state: 'state',
    //     postalCode: '2qeq'
    //   }
    // });
    this.registrationForm.patchValue({
      username: 'ali',
      password: 'test',
      confirmPassword: 'test'

    });
  }
onSubmit(){
  console.log(this.registrationForm.value);
  this._registrationService.register(this.registrationForm.value)
  .subscribe(
    response => console.log('Success', response),
      error =>  console.error('Error', error)

  );

}
}
