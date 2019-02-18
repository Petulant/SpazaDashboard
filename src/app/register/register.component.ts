import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var firebase;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  spazaDash: FormGroup;

  constructor(private router: Router, private Fb: FormBuilder) {
    this.spazaDash = Fb.group({
name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
surname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30),Validators.required])],
address: ['', Validators.required],
gender: ['', Validators.required],
email: ['', Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
password: ['', Validators.compose([ Validators.minLength(6), Validators.maxLength(12), Validators.required])],

    });
  }


  ngOnInit() {
  }
  register() {
    firebase.auth().createUserWithEmailAndPassword(this.spazaDash.value.email, this.spazaDash.value.password).then(result => {
      firebase.database().ref('/users/'+result.user.uid).set({
        email : this.spazaDash.value.email,
        gender : this.spazaDash.value.gender,
        mySpazas : {},
        name : this.spazaDash.value.name,
        surname : this.spazaDash.value.surname,
        typeOfUser : 'Admin'
      }).then(user =>{
        this.router.navigate(['/sidebar/my-dashboard']);
      });
    });

    
  }
}
