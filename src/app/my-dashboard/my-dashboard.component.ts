import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { PromptDialogComponent } from '../component/prompt-dialog/prompt-dialog.component';

declare var firebase;
@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'weight', 'symbol'];
  dataSource = [];

  public barChartsOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartsLabels = ['Soshanguve', 'PretoriaCBD', 'Mamelodi' ];
  public barChartsType = 'bar';
  public barChartsLegend = true;
  public barChartsData = [
    {data: [23, 65 , 45], label: 'Series A'},
    {data: [18, 14 , 10], label: 'Series B'}
  ];

  public PieChartsLabels = ['Soshanguve', 'PretoriaCBD', 'Mamelodi' ];
  public PieChartsType = 'pie';
  public PieChartsLegend = true;
  public PieChartsData = [
    {data: [23, 65 , 45], label: 'Series A'},
    {data: [18, 14 , 10], label: 'Series B'}
  ];
  dialog: any;

  ngOnInit() {
    this.getAllSpazas();
  }
  getAllSpazas(/*userCoords*/) {

    var mySpazasRef;

    var usersRef = firebase.database().ref("/users/").on("value", (snapshot) => {
      this.dataSource = [];
      snapshot.forEach(usersElement => {
        console.log(usersElement.val());
        mySpazasRef = usersElement.key;
        firebase.database().ref("users/"+mySpazasRef+"/mySpazas").once("value", (snap) => {
          snap.forEach(element => {
            let spaza  = {
              ownerKey : usersElement.key,
              spazaKey : element.key,
              spazaName : element.val().spazaName,
              cityName : element.val().cityName,
              streetName : element.val().streetName
            };

            this.dataSource.push(spaza);
          });
        });
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


