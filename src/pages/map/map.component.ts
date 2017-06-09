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
  public isNpsRegions: boolean = false;

  @ViewChild("myCanvas") myCanvas;

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.mapInitialization();
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


  countieStyle(feature) {
    return {
      weight:0.3
    };
  } 

  yearCountieStyle(feature) {
    if(feature.isNpsRegion){
        let styleObj =  {
            fillColor: feature.npsRegion.changeColor != undefined ? feature.npsRegion.changeColor : "#EBECEE",
            weight: 0,
            fillOpacity: 0.7
          };
        return styleObj;
    }
    else{
      let styleObj = {
                        weight:0.3
                      };
       return styleObj;
    }
  }

  countiesStyleBYQ1(feature) {
    if(feature.isNpsRegion){
        let styleObj =  {
            fillColor: feature.npsRegion.Q1dtColor != undefined ? feature.npsRegion.Q1dtColor : "#EBECEE",
            weight: 0,
            fillOpacity: 0.7
          };
        return styleObj;
    }
    else{
      let styleObj = {
                        weight:0.3
                      };
       return styleObj;
    }
  }

  countiesStyleBYQ2(feature) {
    if(feature.isNpsRegion){
        let styleObj =  {
            fillColor: feature.npsRegion.Q2dtColor != undefined ? feature.npsRegion.Q2dtColor : "#EBECEE",
            weight: 0,
            fillOpacity: 0.7
          };
        return styleObj;
    }
    else{
      let styleObj = {
                        weight:0.3
                      };
       return styleObj;
    }
  }

  countiesStyleBYQ3(feature) {
    if(feature.isNpsRegion){
        let styleObj =  {
            fillColor: feature.npsRegion.Q3dtColor != undefined ? feature.npsRegion.Q3dtColor : "#EBECEE",
            weight: 0,
            fillOpacity: 0.7
          };
        return styleObj;
    }
    else{
      let styleObj = {
                        weight:0.3
                      };
       return styleObj;
    }
  }

  countiesStyleBYQ4(feature) {
    if(feature.isNpsRegion){
        let styleObj =  {
            fillColor: feature.npsRegion.Q4dtColor != undefined ? feature.npsRegion.Q4dtColor : "#EBECEE",
            weight: 0,
            fillOpacity: 0.7
          };
        return styleObj;
    }
    else{
      let styleObj = {
              weight:0.3
            };
       return styleObj;
    }
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
    this.selectedYear = "";
    let url = this.selectedRegion.toLocaleLowerCase() || "";
    if(url == "region"){
      url = "regional";
    }
    let params = {
      'usOrg': url
    }
     this.mapService.getRegionsData(params)
      .subscribe(
      data => {
        this.map.remove();
        this.mapInitialization();
        this.regionsData = data || {};
        L.geoJSON(this.regionsData,  { style: this.countieStyle}).addTo(this.map);
      },
      error => {
        console.log(error)
      }
      );

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
          let npsRegion;
          if(this.selectedRegion == "Region"){
             npsRegion = this.npsRegions[properties.terrid] || {};
          }
          else{
            npsRegion = this.npsRegions[properties.dsm_id] || {};
          }
          if (npsRegion.change) {
            this.regionsData.features[i].npsRegion = npsRegion || {};
            this.regionsData.features[i].isNpsRegion = true;
          }
          else {
            this.regionsData.features[i].npsRegion = {};
            this.regionsData.features[i].isNpsRegion = false;
            this.regionsData.features[i].npsRegion["2016"] = {};
            this.regionsData.features[i].npsRegion["2015"] = {};
            this.regionsData.features[i].npsRegion["2014"] = {};
          }
          this.regionsData.features[i].properties.dsm_name = properties.terrdescr;
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
