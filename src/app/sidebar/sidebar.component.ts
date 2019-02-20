import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var firebase;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    firebase.auth().signOut().then(result =>{
      this.router.navigate(['']);
      alert('Succesful Logged Out');
    });
    

  }
  register() {
    this.router.navigate(['/register']);
  }
}
