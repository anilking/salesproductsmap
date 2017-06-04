import { MapService } from './../../services/mapservice.service';

import { Component, OnInit,ViewChild } from '@angular/core';
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
  public ctx:CanvasRenderingContext2D;
   @ViewChild("myCanvas") myCanvas;

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.map = L.map('map')
                .setView([37.8, -96],4);
                
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
      id: 'mapbox.light',
      attribution: '<a href="http://openstreetmap.org">Open Street Map</a>'
    }).addTo(this.map);

    this.getNPSRegion();

    const canvasEl: HTMLCanvasElement = this.myCanvas.nativeElement;
    let ctx = canvasEl.getContext("2d");
    var my_gradient = ctx.createLinearGradient(0, 0, 285, 0);

    my_gradient.addColorStop(0, "#ff0000");
    my_gradient.addColorStop(0.5, "#ffa500");
    my_gradient.addColorStop(1, "#00cc00");
    ctx.fillStyle = my_gradient;      
    ctx.fillText("-10", 20,60); 
    ctx.fillText("0", 138,60); 
    ctx.fillText("10", 260,60); 
    ctx.fillRect(20, 20, 250, 25);
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
        // this.regionsData.crs = data.crs;
        // this.regionsData.features = [];
        // this.regionsData.type = data.type;
        for (let i in data.features) {
          let feature: any = data.features[i] || {};
          let properties = feature.properties || {};
          let npsRegion = this.npsRegions[properties.dsm_id] || {};
          if(npsRegion.change){
            data.features[i].change = npsRegion.change;
            data.features[i].npsRegion = npsRegion;
           // this.regionsData.features.push(data.features[i]);
          }
          else{
            data.features[i].npsRegion = {};
            data.features[i].npsRegion["2016"] = {};            
            data.features[i].npsRegion["2015"] = {};            
            data.features[i].npsRegion["2014"] = {}; 
          }                       
        }
        this.regionsData = data;
        L.geoJSON(this.regionsData, { style: this.countiestyle, onEachFeature:this.onEachFeature }).addTo(this.map);
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
                  feature.change > 0  ? '#ffa500' : 
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

   onEachFeature(feature,layer) {
      if(feature.npsRegion['2016'] && feature.npsRegion['2016'].mean && feature.npsRegion['2015'] && feature.npsRegion['2015'].mean && feature.npsRegion['2014'] && feature.npsRegion['2014'].mean){
          layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016 : ' + feature.npsRegion['2016'].mean + ' </br>' + '2015 : ' + feature.npsRegion['2015'].mean + '  </br> 2014 : ' + feature.npsRegion['2014'].mean + '</div');
      }
      else if(feature.npsRegion['2016'] && feature.npsRegion['2016'].mean && feature.npsRegion['2015'] && feature.npsRegion['2015'].mean){
          layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016 : ' + feature.npsRegion['2016'].mean + ' </br>' + '2015 : ' + feature.npsRegion['2015'].mean + ' </div>');          
      }
      else{
        layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </div>');
      }
      layer.on("mouseover", function (e) {
        layer.openPopup(e.latlng);
      });
      layer.on("mouseout", function () {
        layer.closePopup();
      });
    };

}
