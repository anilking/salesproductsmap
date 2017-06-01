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
      fillColor:  feature.change > 8 ? '#00cc00' :
                  feature.change > 6  ? '#33ff33' :
                  feature.change > 4  ? '#66ff66' :
                  feature.change > 2  ? '#99ff99' :
                  feature.change > 0  ? '#e6ffe6' : 
                  feature.change < -2 ? '#ffe6e6' :
                  feature.change < -4 ? '#ffb3b3' :
                  feature.change < -6 ? '#ff8080' :
                  feature.change < -8 ? '#ff4d4d' :
                  feature.change == undefined ? "#EEEEEE" :
                                        '#ff0000',
      weight: 0 ,
      fillOpacity: 0.7
    };
  }

}
