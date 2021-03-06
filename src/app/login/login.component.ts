import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var firebase;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  spazaDash: FormGroup;

  constructor(private router: Router, private Fb: FormBuilder) {
    this.spazaDash = Fb.group({
      email: ['', Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([ Validators.minLength(6), Validators.maxLength(12), Validators.required])],

      });
  }
  username: string;
  password: string;



  ngOnInit() {
  }
login() {

  firebase.auth().signInWithEmailAndPassword(this.spazaDash.value.email, this.spazaDash.value.password).then(result =>{
    console.log(result.user.uid)
    // this.router.navigate(['/sidebar/my-dashboard']);
    firebase.database().ref('/users/'+result.user.uid).once('value',user =>{
     if (user.val().typeOfUser === 'Admin') {
       console.log(user.val().typeOfUser)
      this.router.navigate(['/sidebar/my-dashboard']);
    } else {
      alert('Invalid credentials');
    }
    })
      
  },err =>{
    alert('Invalid credentials');
  });
  
      
}

  }
































































































































































































































































































































































































































































































































































































































