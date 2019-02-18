import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PromptDialogComponent } from '../component/prompt-dialog/prompt-dialog.component';


declare var firebase;
@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  public barChartsOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  displayedColumns: string[] = [ 'name', 'weight', 'symbol'];
  dataSource = [];
  constructor(public dialog: MatDialog) { }

  public barChartsLabels: Array<string> = ['Total Users', 'Total Spaza'];
  //  public barChartsLabels = [];
  //  public barChartsType = 'bar';
  //  public barChartsLegend = true;
   public barChartsData = [];

    public PieChartsLabels: Array<string> = [];
    // public PieChartsType = 'pie';
    // public PieChartsLegend = true;
  //   public PieChartsData = [
  //    {data: [23, 65 , 45], label: 'Series A'},
  //    {data: [1, 1 , 1], label: 'Series A'},
  //    {data: [18, 14 , 10], label: 'Series B'}
  //  ];
   public PieChartsData = [];

  // displayedColumns: string[] = [ 'name', 'weight', 'symbol'];
  // dataSource = [];



  // public barChartsLabels = ['Soshanguve', 'PretoriaCBD', 'Mamelodi' ];
  // public barChartsType = 'bar';
  // public barChartsLegend = true;
  // public barChartsData = [
  //   {data: [23, 65 , 45], label: 'Series A'},
  //   {data: [18, 14 , 10], label: 'Series B'}
  // ];

  // public PieChartsLabels = ['Soshanguve', 'PretoriaCBD', 'Mamelodi' ];
  // public PieChartsType = 'pie';
  // public PieChartsLegend = true;
  // public PieChartsData = [
  //   {data: [23, 65 , 45], label: 'Series A'},
  //   {data: [18, 14 , 10], label: 'Series B'}
  // ];
  // dialog: any;

  ngOnInit() {
    this.getAllTownships();
    // this.showPie();

  }

  async getAllTownships() {
    var mySpazasRef;
    var totalSpaza = 0;

    var usersRef = firebase.database().ref("/users/").on("value", (snapshot) => {

      snapshot.forEach(usersElement => {
        console.log(usersElement.val());
         mySpazasRef = usersElement.key;
        firebase.database().ref("users/"+mySpazasRef+"/mySpazas").once("value",(snap) => {
          // this.PieChartsData = [];
          snap.forEach(element => {

            if (this.PieChartsLabels.length != 0 && this.PieChartsLabels != null) {
              var isFound: boolean = false
              for (let i = 0; i <= this.PieChartsLabels.length; i++) {
                if (this.PieChartsLabels[i] === element.val().cityName) {
                  console.log("City found")
                  this.PieChartsData[i]++;
                  totalSpaza++;
                  isFound = true;
                  break;
                }
              }

              if (!isFound) {
                console.log("City not found")
                var index = this.PieChartsLabels.push(element.val().cityName);
                this.PieChartsData[index - 1] = 1;
                totalSpaza++;
              }


            } else {
              var index = this.PieChartsLabels.push(element.val().cityName);
              this.PieChartsData[index - 1] = 1;
              totalSpaza++;
              console.log(this.PieChartsLabels);
            }

            // if(element != null){
            //   console.log(Object.keys(element).length);
            //   this.barChartsData[1] = this.barChartsData[1] + Object.keys(element).length; // --> PieChartsData[total_Users, total_Spaza]
            // }

          });
          console.log(snapshot);

        });
      });
      this.barChartsData[1] = totalSpaza;
      this.barChartsData[0] = Object.keys(snapshot).length; // --> PieChartsData[total_Users, total_Spaza]
      this.showPie();
      this.showAppUsers();
      console.log(this.PieChartsData);
      console.log(this.PieChartsLabels);
    });
  }

  getAllSpazas(/*userCoords*/) {

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



  showPie() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      labels : this.PieChartsLabels,
      datasets: [{
        label: '# of Votes',
        // data: [12, 19, 3, 5, 2, 3],
        data: this.PieChartsData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    });
  }

  showAppUsers() {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.barChartsLabels,
        datasets: [{
          label: '# of Votes',
          data: this.barChartsData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}


