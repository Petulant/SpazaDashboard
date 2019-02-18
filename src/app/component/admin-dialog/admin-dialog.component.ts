import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig} from "@angular/material";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  adminForm: FormGroup;
  userProfile: any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AdminDialogComponent>,@Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {
    this.userProfile = data;

    this.adminForm = fb.group({
      typeOfUser : new FormControl('', [Validators.required]),
      // cityName : new FormControl(this.spaza.cityName,[Validators.required]),
      // streetName : new FormControl(this.spaza.streetName,[Validators.required])
    })
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

}
