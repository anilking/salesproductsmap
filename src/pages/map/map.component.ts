import { MapService } from './../../services/mapservice.service';

import { Component, OnInit, ViewChild } from '@angular/core';
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
  public ctx: CanvasRenderingContext2D;
  public regionsList: any = [];
  public yearsList: any = [];
  public selectedRegion: string = "";
  public selectedYear: string = "";

  @ViewChild("myCanvas") myCanvas;

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.mapInitialization();
    this.getRegionsData();

    this.regionsList = ["Channel", "Region", "National"];
    this.yearsList = ["2014-15", "2015-16", "2016-17"];
  }
  mapInitialization(){
    this.map = L.map('map')
      .setView([37.8, -96], 4);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
      id: 'mapbox.light',
      attribution: '<a href="http://openstreetmap.org">Open Street Map</a>'
    }).addTo(this.map);
  }
  // getNPSRegion() {
  //   this.mapService.getNPSRegion()
  //     .subscribe(
  //       data => {
  //         this.npsRegions = data || {};
  //       },
  //       error => {
  //         console.log(error)
  //       }
  //     );
  // }

  getRegionsData() {
    this.mapService.getRegionsData()
      .subscribe(
      data => {
        this.regionsData = data || {};
        L.geoJSON(this.regionsData,  { style: this.countieStyle}).addTo(this.map);
      },
      error => {
        console.log(error)
      }
      );
  };

  countieStyle(feature) {
    return {
      weight:0.3
    };
  } 

  yearCountieStyle(feature) {
    return {
      fillColor: feature.npsRegion.change > 8 ? '#00cc00' :
                 feature.npsRegion.change > 5 ? '#FFA500' :
                  feature.npsRegion.change == undefined ? "#EBECEE" :
                          '#ff0000',
      weight: 0,
      fillOpacity: 0.7
    };
  }

  countiesStyleBYQ1(feature) {
    return {
      fillColor: feature.npsRegion.Q1dt > 8 ? '#00cc00' :
                 feature.npsRegion.Q1dt > 5 ? '#FFA500' :
                  feature.npsRegion.Q1dt == undefined ? "#EBECEE" :
                          '#ff0000',
      weight: 0,
      fillOpacity: 0.7
    };
  }

  countiesStyleBYQ2(feature) {
    return {
      fillColor: feature.npsRegion.Q2dt > 8 ? '#00cc00' :
                 feature.npsRegion.Q2dt > 5 ? '#FFA500' :
                  feature.npsRegion.Q2dt == undefined ? "#EBECEE" :
                          '#ff0000',
      weight: 0,
      fillOpacity: 0.7
    };
  }

  countiesStyleBYQ3(feature) {
    return {
      fillColor: feature.npsRegion.Q3dt > 8 ? '#00cc00' :
                 feature.npsRegion.Q3dt > 5 ? '#FFA500' :
                  feature.npsRegion.Q3dt == undefined ? "#EBECEE" :
                          '#ff0000',
      weight: 0,
      fillOpacity: 0.7
    };
  }

  countiesStyleBYQ4(feature) {
    return {
      fillColor: feature.npsRegion.Q4dt > 8 ? '#00cc00' :
                 feature.npsRegion.Q4dt > 5 ? '#FFA500' :
                  feature.npsRegion.Q4dt == undefined ? "#EBECEE" :
                          '#ff0000',
      weight: 0,
      fillOpacity: 0.7
    };
  }

  onEachFeature(feature, layer) {
    if (feature.npsRegion['2016'] && feature.npsRegion['2016'].mean && feature.npsRegion['2015'] && feature.npsRegion['2015'].mean && feature.npsRegion['2014'] && feature.npsRegion['2014'].mean) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016 : ' + feature.npsRegion['2016'].mean + ' </br>' + '2015 : ' + feature.npsRegion['2015'].mean + '  </br> 2014 : ' + feature.npsRegion['2014'].mean + '</div');
    }
    else if (feature.npsRegion['2016'] && feature.npsRegion['2016'].mean && feature.npsRegion['2015'] && feature.npsRegion['2015'].mean) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016 : ' + feature.npsRegion['2016'].mean + ' </br>' + '2015 : ' + feature.npsRegion['2015'].mean + ' </div>');
    }
    else {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </div>');
    }
    layer.on("mouseover", function (e) {
      layer.openPopup(e.latlng);
    });
    layer.on("mouseout", function () {
      layer.closePopup();
    });
  };


  regionChange(selectedRegion) {
    this.selectedRegion = selectedRegion;

  }

  yearChange(selectedYear) {
    this.selectedYear = selectedYear;
    let params = {
      'year': this.selectedYear || ""
    }
    this.mapService.getNPSRegion(params)
      .subscribe(
      data => {
        this.map.remove();
        this.mapInitialization();
        this.npsRegions = data || {};
        for (let i in this.regionsData.features) {
          let feature: any = this.regionsData.features[i] || {};
          let properties = feature.properties || {};
          let npsRegion = this.npsRegions[properties.dsm_id] || {};
          if (npsRegion.change) {
            this.regionsData.features[i].npsRegion = npsRegion || {};
          }
          else {
            this.regionsData.features[i].npsRegion = {};
            this.regionsData.features[i].npsRegion["2016"] = {};
            this.regionsData.features[i].npsRegion["2015"] = {};
            this.regionsData.features[i].npsRegion["2014"] = {};
          }
        }
        L.geoJSON(this.regionsData, { style: this.yearCountieStyle, onEachFeature : this.onEachFeature}).addTo(this.map);
      },
      error => {
        console.log(error)
      }
      );
  }

  onQ1Select(){
        this.map.remove();
        this.mapInitialization();
        L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ1, onEachFeature : this.onEachFeature}).addTo(this.map);
  }
  onQ2Select(){
        this.map.remove();
        this.mapInitialization();
        L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ2, onEachFeature : this.onEachFeature}).addTo(this.map);
  }
  onQ3Select(){
        this.map.remove();
        this.mapInitialization();
        L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ3, onEachFeature : this.onEachFeature}).addTo(this.map);
  }
  onQ4Select(){
        this.map.remove();
        this.mapInitialization();
        L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ4, onEachFeature : this.onEachFeature}).addTo(this.map);
  }

}
