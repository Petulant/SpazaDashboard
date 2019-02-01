import { Component, OnInit } from '@angular/core';

declare var L;
declare var firebase;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mymap: any;
  constructor() { }

  ngOnInit() {
    this.showMap();
    this.getAllSpazas();
  }

  async showMap(/*lat : number, log : number*/){
    L.mapbox.accessToken = 'pk.eyJ1IjoicmVhbHNhbmVsZSIsImEiOiJjanAybWZ2enUwODIxM3dwaGo2cDU4bWNxIn0.Q0PkSHqlG4VV6CNw1c_zcA';
    this.mymap = L.map('mapid',{zoomControl:false}).setView(['-25.7518607','28.263174'],15);
  //   var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
  //     keepOpen: true, autocomplete: true
  // });

  // geocoderControl.addTo(mymap);

  // geocoderControl.on('select', function(res) {
  //   console.log(res)
    
  //   var location = L.marker([res.feature.center[1], res.feature.center[0]],9).addTo(mymap);
  //   console.log(location);
    
  //   console.log("b_show_der = "+ this.b_show_der);
  //   var circle = L.circle([res.feature.center[1], res.feature.center[0]], {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5,
  //     radius: 20
  // }).addTo(mymap);

  //   this.b_show_der = 1;
  //   //mSouth@2011 --> mLab wifi password
  // });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xpZmZvcmRzY216b2JlIiwiYSI6ImNqanlhc2d3aDNpMGMzcGxlbDZpbzVmMXMifQ.4Hg1wM44HKbuH5H05n0Jag', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
     id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.mymap);

  //var marker = L.marker([lat, log],10,).addTo(this.mymap);

  // var circle = L.circle([lat, log], {
  //   color: 'green',
  //   fillColor: '#00802b',
  //   fillOpacity: 0.5,
  //   radius: 20
  // }).addTo(this.mymap);
  
  //marker.bindPopup("<b>I'm Here</b>").openPopup();
  }

  async getAllSpazas(/*userCoords*/){
    // Array<{spazaName: string, latlog: any ,spazaIndex: number}>

    var mySpazasRef;
    
    var usersRef = firebase.database().ref("users/").on("value", (snapshot) => {
      snapshot.forEach(usersElement => {
        mySpazasRef = usersElement.key;
        var customMarker = L.Marker.extend({
                options: { 
                  spazaName: '',//element.val().spazaName,
                  cityName: '',//element.val().cityName,
                  streetName: ''//element.val().streetName
                }
            });
        firebase.database().ref("users/"+mySpazasRef+"/mySpazas").once("value",(snap) => {
          snap.forEach(element => {
            //var marker = L.marker([element.val().latitude_coord, element.val().longitude_coord],10).addTo(this.mymap);
            // var marker = L.marker([-25.7487246, 28.2671659],10).on('click', this.onClick).addTo(this.mymap);
            // var marker = L.marker([element.val().latitude_coord, element.val().longitude_coord],10).on('click', function(e){
            //   console.log('works')
            // }).addTo(this.mymap);
            
            var marker = L.marker([element.val().latitude_coord, element.val().longitude_coord],10,).addTo(this.mymap);
            marker.bindPopup("<b>"+element.val().spazaName+"</b>").openPopup();
          });
        })
      });
    });
  }

}
