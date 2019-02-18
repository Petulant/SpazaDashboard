import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AdminDialogComponent } from '../component/admin-dialog/admin-dialog.component';

export interface Profile{
  _key : string;
  email?: string;
  gender?: string;
  name? : string;
  surname? : string;
  typeOfUser? : string;
  numberOfSpazas?: number;
}

declare var firebase;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  usersProfilesList: Array<Profile> = [];
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    firebase.database().ref('/users/').on('value', (snapshot) =>{
      snapshot.forEach(element => {
        if(element.val().mySpazas){
          let userProfile = {
            _key : element.key,
            email : element.val().email,
            gender : element.val().gender,
            name : element.val().name,
            surname : element.val().surname,
            typeOfUser : element.val().typeOfUser,
            numberOfSpazas : Object.keys(element.val().mySpazas).length //--

          }

          this.usersProfilesList.push(userProfile);
          
        }else{
          let userProfile = {
            _key : element.key,
            email : element.val().email,
            gender : element.val().gender,
            name : element.val().name,
            surname : element.val().surname,
            typeOfUser : element.val().typeOfUser,
            numberOfSpazas : 0
          }
          this.usersProfilesList.push(userProfile);
        }
        
      });
    });
  }

  openDialog(userProfile: Profile){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = userProfile;
    // dialogConfig.data = {
    //   ownerKey : spaza.ownerKey,
    //   spazaKey : spaza.spazaKey,
    //   spazaName : spaza.spazaName,
    //   cityName : spaza.cityName,
    //   streetName : spaza.streetName
    // };

    this.dialog.open(AdminDialogComponent, dialogConfig);
  }

}
