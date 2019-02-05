import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig} from "@angular/material";
import { UpdatePromptDialogComponent } from '../update-prompt-dialog/update-prompt-dialog.component';


declare var firebase;

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent implements OnInit {

  spaza : any;
  constructor(private dialogRef: MatDialogRef<PromptDialogComponent>,@Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {
    console.log(data);
    this.spaza = data;
   }

  ngOnInit() {
    
  }

  close() {
    this.dialogRef.close();
  }

  updateSpaza(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

  //   dialogConfig.data = {
  //     ownerKey : spaza.ownerKey,
  //     spazaKey : spaza.spazaKey,
  //     spazaName : spaza.spazaName,
  //     cityName : spaza.cityName,
  //     streetName : spaza.streetName
  //   };
    dialogConfig.data = this.spaza;
    this.close();

    this.dialog.open(UpdatePromptDialogComponent, dialogConfig);

  }

  deleteSpaza(){
    firebase.database().ref('users/'+this.spaza.ownerKey+'/mySpazas/'+this.spaza.spazaKey+'/').remove().then(result =>{
      this.close();
    });
  }

}
