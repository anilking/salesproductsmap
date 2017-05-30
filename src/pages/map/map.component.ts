import { MapService } from './../../services/mapservice.service';

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public map: any;
  public mapboxAccessToken: string = 'pk.eyJ1IjoiYW5pbHBhdGh1cmkiLCJhIjoiY2oybDhmcWF0MDAwMDJxcWtzMDgwZWI3cyJ9.hzryXsu_ec_AafR-QzzVUQ';

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.map = L.map('map')
                .setView([37.8, -96], 4);

                
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
      id: 'mapbox.light',
      attribution: '<a href="http://openstreetmap.org">Open Street Map</a>'
    }).addTo(this.map);

    this.getMapData();
    
  }

  getMapData() {
    this.mapService.getMapData()
      .subscribe(
      data => {
        L.geoJSON(data,{ style: this.countiestyle }).addTo(this.map);
      },
      error => {
        console.log(error)
      }
      );
  }

   countiestyle(feature) {
    return {
      weight: 0.5,
    };
  }
  
}
