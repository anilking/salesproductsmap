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
  public npsRegions: any = {};
  public regionsData: any = {};
  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.map = L.map('map')
                .setView([37.8, -96], 4);

                
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
      id: 'mapbox.light',
      attribution: '<a href="http://openstreetmap.org">Open Street Map</a>'
    }).addTo(this.map);

    this.getNPSRegion();
    
  }

  getNPSRegion() {
    this.mapService.getNPSRegion()
      .subscribe(
      data => {
        this.npsRegions = data || {};
        this.getRegionsData();
      },
      error => {
        console.log(error)
      }
      );
  }

  getRegionsData() {
    this.mapService.getRegionsData()
      .subscribe(
      data => {
        for (let i in data.features) {
          debugger
          let feature: any = data.features[i] || {};
          let properties = feature.properties || {};
          let npsRegion = this.npsRegions[properties.dsm_id] || {};
          if(npsRegion.change){
            data.features[i].change = npsRegion.change;
          }
        }
        this.regionsData = data;
        L.geoJSON(this.regionsData, { style: this.countiestyle }).addTo(this.map);
      },
      error => {
        console.log(error)
      }
      );
  }

   countiestyle(feature) {
    return {
      fillColor: feature.change > 0 ? '#ff0000' : '#008000',
      weight: 0.3,
      fillOpacity: 0.7
    };
  }
  
}
