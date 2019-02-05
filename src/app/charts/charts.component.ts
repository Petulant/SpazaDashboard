import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

}
