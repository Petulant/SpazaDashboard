import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

declare var firebase;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
 public barChartsOptions = {
   scaleShowVerticalLines: false,
   responsive: true
 };

 public barChartsLabels: Array<string> = ['Soshanguve', 'PretoriaCBD', 'Mamelodi' ];
//  public barChartsLabels = [];
 public barChartsType = 'bar';
 public barChartsLegend = true;
 public barChartsData = [
   {data: [23, 65 , 45], label: 'Series A'},
   {data: [18, 14 , 10], label: 'Series B'}
 ];

  public PieChartsLabels: Array<string> = [];
  public PieChartsType = 'pie';
  public PieChartsLegend = true;
  public PieChartsData = [
   {data: [23, 65 , 45], label: 'Series A'},
   {data: [18, 14 , 10], label: 'Series B'}
 ];


  constructor() { }

  ngOnInit() {
    this.getAllTownships();

  }

  async getAllTownships() {
    var mySpazasRef;

    var usersRef = firebase.database().ref("/users/").on("value", (snapshot) => {

      snapshot.forEach(usersElement => {
        console.log(usersElement.val());
         mySpazasRef = usersElement.key;
        firebase.database().ref("users/"+ mySpazasRef+"/mySpazas").once("value",(snap) => {
          snap.forEach(element => {

            // if(this.searchIfExist(element.val().cityName)){
            //   console.log("inside if")
            // }

            if (this.PieChartsLabels.length != 0 && this.PieChartsLabels != null) {
              var isFound: boolean = false
              for (let i = 0; i <= this.PieChartsLabels.length; i++) {
                if (this.PieChartsLabels[1] === element.val().cityName) {
                  isFound = true;
                }
              }

              if (isFound) {
                console.log("City not found")
                this.PieChartsLabels.push(element.val().cityName);
              }


            } else {
              this.PieChartsLabels.push(element.val().cityName);
              console.log(this.PieChartsLabels);
            }


          });
        });
      });
      console.log(this.PieChartsLabels);
    });
  }

  searchIfExist(cityName: string) {
    var isFound: boolean = false;

    if (this.barChartsLabels.length !== 0 && this.barChartsLabels != null) {
      for (let i = 0; i <= this.barChartsLabels.length; i++) {
        if (this.barChartsLabels[1].toLowerCase === cityName.toLowerCase) {
          isFound = true;
        }
      }
    }

    return isFound;
  }

}
