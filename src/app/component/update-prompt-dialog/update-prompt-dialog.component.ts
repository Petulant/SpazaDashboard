import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig} from "@angular/material";
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
declare var firebase;
@Component({
  selector: 'app-update-prompt-dialog',
  templateUrl: './update-prompt-dialog.component.html',
  styleUrls: ['./update-prompt-dialog.component.css']
})
export class UpdatePromptDialogComponent implements OnInit {
  spaza : any;
  spazaShopForm : FormGroup;
  // --> Form Controls
  // spazaName = new FormControl('', [Validators.required]);
  constructor(private fb: FormBuilder ,private dialogRef: MatDialogRef<UpdatePromptDialogComponent>,@Inject(MAT_DIALOG_DATA) data) {
    this.spaza = data;
    console.log(this.spaza);
    this.spazaShopForm = fb.group({
      spazaName : new FormControl(this.spaza.spazaName, [Validators.required]),
      cityName : new FormControl(this.spaza.cityName,[Validators.required]),
      streetName : new FormControl(this.spaza.streetName,[Validators.required])
    })
  }

  ngOnInit() {
    
  }

  close() {
    this.dialogRef.close();
  }

  save(){
    firebase.database().ref('users/'+this.spaza.ownerKey+'/mySpazas/'+this.spaza.spazaKey+'/').update({
      spazaName : this.spazaShopForm.value.spazaName,
      cityName : this.spazaShopForm.value.cityName,
      streetName : this.spazaShopForm.value.streetName
    }).then(result =>{
      console.log("UpdatePromptDialogComponent == "+result)
      this.close();
    });
  }

}
