import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PromptDialogComponent } from '../component/prompt-dialog/prompt-dialog.component';


declare var firebase;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'weight', 'symbol'];
  dataSource = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllSpazas();

    // firebase.database.ref('/users/').once('value', (snapshot)=> {
    //   snapshot.forEach(element => {
    //     let user = {
    //       name : element.val().name,
    //       surname : element.val().surname,
    //       gender : element.val().gender,
    //       email: element.val().Email
    //     }
    //     this.dataSource.push(user)
    //   });
    // });
  }

  getAllSpazas(/*userCoords*/){
    // Array<{spazaName: string, latlog: any ,spazaIndex: number}>
    //this.dataSource = [];
    var mySpazasRef;
    
    var usersRef = firebase.database().ref("/users/").on("value", (snapshot) => {
      this.dataSource = [];
      snapshot.forEach(usersElement => {
        console.log(usersElement.val());
        mySpazasRef = usersElement.key;
        firebase.database().ref("users/"+mySpazasRef+"/mySpazas").once("value",(snap) => {
          snap.forEach(element => {
            let spaza = {
              ownerKey : usersElement.key,
              spazaKey : element.key,
              spazaName : element.val().spazaName,
              cityName : element.val().cityName,
              streetName : element.val().streetName
            }

            this.dataSource.push(spaza);
          });
        })
      });
    });
  }

  openDialog(spaza) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      ownerKey : spaza.ownerKey,
      spazaKey : spaza.spazaKey,
      spazaName : spaza.spazaName,
      cityName : spaza.cityName,
      streetName : spaza.streetName
    };

    this.dialog.open(PromptDialogComponent, dialogConfig);
  }

}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }

// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
// })
// export class DialogContentExampleDialog {}
