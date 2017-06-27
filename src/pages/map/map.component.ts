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
  public brandNames: any = [];
  public yearsList: any = [];
  public selectedRegion: string = "";
  public selectedYear: string = "";
  public selectedBrand: string = "";
  public isNpsRegions: boolean = false;
  public npsObject: any = {};
  public isCanvas: boolean = false;
  public selectedTab: string = "";

  @ViewChild("myCanvas") myCanvas;

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.mapInitialization();
    this.regionsList = ["Channel", "Region", "National"];
    this.yearsList = ["2015-14", "2016-15"];
    this.brandNames = ["x","y","z"];
  }
  mapInitialization(){
    this.map = L.map('map') .setView([37.8, -96], 4);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
      id: 'mapbox.light',
      attribution: ''
    }).addTo(this.map);
  }

  canvasInitialization(){
    this.isCanvas = true;
    const canvasEl: HTMLCanvasElement = this.myCanvas.nativeElement;
    let ctx = canvasEl.getContext("2d");
    var my_gradient = ctx.createLinearGradient(0, 0, 285, 0);
    my_gradient.addColorStop(0, "#f29492");
    my_gradient.addColorStop(0.25, "#f9d4d3");
    my_gradient.addColorStop(0.5, "#f5f5f5");
    my_gradient.addColorStop(0.75, "#a4d3ed");
    my_gradient.addColorStop(1, "#1c92d2");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(20, 20, 250, 25);
  }

  countieStyle(feature) {
    return {
      weight:0.3
    };
  }

  yearCountieStyle(feature) {
    if(feature.isNpsRegion){
      let npsValue = {};
      let diff = 0;
      npsValue['2016'] = feature.npsRegion['2016'] || {};
      npsValue['2015'] = feature.npsRegion['2015'] || {};
      npsValue['2014'] = feature.npsRegion['2014'] || {};
      if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
        diff = npsValue['2016'].NPS - npsValue['2015'].NPS;
      }
      else if((npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1){
        diff = npsValue['2016'].NPS;
      }
      else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
        diff = npsValue['2015'].NPS - npsValue['2014'].NPS;
      }
      else{
         diff = npsValue['2015'].NPS
      }
      
        let styleObj =  {
        fillColor: diff > 45 ? '#f29492' :
                    diff > 25 ? '#f4a9a7' :
                      diff > 5 ? '#f9d4d3' :
                        diff > -5 ? '#a4d3ed' :
                          diff > -25 ? '#49a7db' :
                            diff > -45  ? '#1c92d2' :
                              diff == undefined ? "#000000" :
                                '#f5f5f5',
        weight: 0,
        fillOpacity: 0.7
      };
      return styleObj;
    }
    else{
      let styleObj = {
        // weight:0.3
        weight:0,
        fillColor: "#000000",
        fillOpacity: 0.8
      };
      return styleObj;
    }
  }

  countiesStyleBYQ1(feature) {
    if(feature.isNpsRegion){
      let npsValue = {};
      let diff = 0;
      npsValue['2016'] = feature.npsRegion['2016'] || {};
      npsValue['2016'] =  npsValue['2016'].Q1 || {};
      npsValue['2015'] = feature.npsRegion['2015'] || {};
      npsValue['2015'] =  npsValue['2015'].Q1 || {};
      npsValue['2014'] = feature.npsRegion['2014'] || {};
      npsValue['2014'] =  npsValue['2014'].Q1 || {};

      if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
        diff = npsValue['2016'].NPS - npsValue['2015'].NPS;
      }
      else if((npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1){
        diff = npsValue['2016'].NPS;
      }
      else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
        diff = npsValue['2015'].NPS - npsValue['2014'].NPS;
      }
      else{
         diff = npsValue['2015'].NPS
      }
      
        let styleObj =  {
        fillColor: diff > 45 ? '#f29492' :
                    diff > 25 ? '#f4a9a7' :
                      diff > 5 ? '#f9d4d3' :
                        diff > -5 ? '#a4d3ed' :
                          diff > -25 ? '#49a7db' :
                            diff > -45  ? '#1c92d2' :
                              diff == undefined ? "#000000" :
                                '#f5f5f5',
        weight: 0,
        fillOpacity: 0.7
      };
      return styleObj;
    }
    else{
      let styleObj = {
        // weight:0.3
        weight:0,
        fillColor: "#000000",
        fillOpacity: 0.8
      };
      return styleObj;
    }
  }

  countiesStyleBYQ2(feature) {
    if(feature.isNpsRegion){
      let npsValue = {};
      let diff = 0;
      npsValue['2016'] = feature.npsRegion['2016'] || {};
      npsValue['2016'] =  npsValue['2016'].Q2 || {};
      npsValue['2015'] = feature.npsRegion['2015'] || {};
      npsValue['2015'] =  npsValue['2015'].Q2 || {};
      npsValue['2014'] = feature.npsRegion['2014'] || {};
      npsValue['2014'] =  npsValue['2014'].Q2 || {};

      if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
        diff = npsValue['2016'].NPS - npsValue['2015'].NPS;
      }
      else if((npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1){
        diff = npsValue['2016'].NPS;
      }
      else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
        diff = npsValue['2015'].NPS - npsValue['2014'].NPS;
      }
      else{
         diff = npsValue['2015'].NPS
      }
      
        let styleObj =  {
        fillColor: diff > 45 ? '#f29492' :
                    diff > 25 ? '#f4a9a7' :
                      diff > 5 ? '#f9d4d3' :
                        diff > -5 ? '#a4d3ed' :
                          diff > -25 ? '#49a7db' :
                            diff > -45  ? '#1c92d2' :
                              diff == undefined ? "#000000" :
                                '#f5f5f5',
        weight: 0,
        fillOpacity: 0.7
      };
      return styleObj;
    }
    else{
      let styleObj = {
        // weight:0.3
        weight:0,
        fillColor: "#000000",
        fillOpacity: 0.8
      };
      return styleObj;
    }
  }

  countiesStyleBYQ3(feature) {
    if(feature.isNpsRegion){
      let npsValue = {};
      let diff = 0;
      npsValue['2016'] = feature.npsRegion['2016'] || {};
      npsValue['2016'] =  npsValue['2016'].Q3 || {};
      npsValue['2015'] = feature.npsRegion['2015'] || {};
      npsValue['2015'] =  npsValue['2015'].Q3 || {};
      npsValue['2014'] = feature.npsRegion['2014'] || {};
      npsValue['2014'] =  npsValue['2014'].Q3 || {};

      if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
        diff = npsValue['2016'].NPS - npsValue['2015'].NPS;
      }
      else if((npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1){
        diff = npsValue['2016'].NPS;
      }
      else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
        diff = npsValue['2015'].NPS - npsValue['2014'].NPS;
      }
      else{
         diff = npsValue['2015'].NPS
      }
      
        let styleObj =  {
        fillColor: diff > 45 ? '#f29492' :
                    diff > 25 ? '#f4a9a7' :
                      diff > 5 ? '#f9d4d3' :
                        diff > -5 ? '#a4d3ed' :
                          diff > -25 ? '#49a7db' :
                            diff > -45  ? '#1c92d2' :
                              diff == undefined ? "#000000" :
                                '#f5f5f5',
        weight: 0,
        fillOpacity: 0.7
      };
      return styleObj;
    }
    else{
      let styleObj = {
        // weight:0.3
        weight:0,
        fillColor: "#000000",
        fillOpacity: 0.8

      };
      return styleObj;
    }
  }

  countiesStyleBYQ4(feature) {
    console.log(feature);    
    if(feature.isNpsRegion){
      let npsValue = {};
      let diff = 0;
      npsValue['2016'] = feature.npsRegion['2016'] || {};
      npsValue['2016'] =  npsValue['2016'].Q4 || {};
      npsValue['2015'] = feature.npsRegion['2015'] || {};
      npsValue['2015'] =  npsValue['2015'].Q4 || {};
      npsValue['2014'] = feature.npsRegion['2014'] || {};
      npsValue['2014'] =  npsValue['2014'].Q4 || {};

      if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
        diff = npsValue['2016'].NPS - npsValue['2015'].NPS;
      }
      else if((npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1){
        diff = npsValue['2016'].NPS;
      }
      else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
        diff = npsValue['2015'].NPS - npsValue['2014'].NPS;
      }
      else{
         diff = npsValue['2015'].NPS
      }
      
        let styleObj =  {
        fillColor: diff > 45 ? '#f29492' :
                    diff > 25 ? '#f4a9a7' :
                      diff > 5 ? '#f9d4d3' :
                        diff > -5 ? '#a4d3ed' :
                          diff > -25 ? '#49a7db' :
                            diff > -45  ? '#1c92d2' :
                              diff == undefined ? "#000000" :
                                '#f5f5f5',
        weight: 0,
        fillOpacity: 0.7
      };
      return styleObj;
    }
    else{
      let styleObj = {
        // weight:0.3
        weight:0,
        fillColor: "#000000",
        fillOpacity: 0.8
      };
      return styleObj;
    }
  }

  onEachFeature(feature, layer) {
    let npsValue = {};
    npsValue['2016'] = feature.npsRegion['2016'] || {};
    npsValue['2015'] = feature.npsRegion['2015'] || {};
    npsValue['2014'] = feature.npsRegion['2014'] || {};

    if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2016'].NPS - npsValue['2015'].NPS;
          diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2014'].NPS = Math.round(npsValue['2014'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2015'].NPS - npsValue['2014'].NPS;
           diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }

      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>2014</td>
                <td>${npsValue['2014'].NPS}</td>
                <td>${npsValue['2014'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_id + '</b> </div>');
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
    this.selectedTab = "";
    this.selectedBrand = "";
    this.isCanvas = false;
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

  brandChange(brandName){
    this.selectedBrand = brandName || "";
    this.selectedYear = "";
    this.selectedTab = "";
  }

  yearChange(selectedYear) {
    this.selectedYear = selectedYear;
    this.selectedTab = "";
    let params = {
      'year': this.selectedYear || ""
    }
    this.mapService.getNPSRegion(params)
      .subscribe(
        data => {
          this.map.remove();
          this.mapInitialization();
          this.npsRegions = data || {};
          this.isCanvas = false;
          this.npsObject = {};
          for (let i in this.regionsData.features) {
            let feature: any = this.regionsData.features[i] || {};
            let properties = feature.properties || {};
            let npsRegion;
            if(this.selectedRegion == "Region"){
              npsRegion = this.npsRegions[properties.terrid] || {};
              this.regionsData.features[i].properties.dsm_id = properties.terrid;
            }
            else{
              npsRegion = this.npsRegions[properties.dsm_id] || {};
              console.log(npsRegion);
            }
            if (npsRegion.change) {
              this.regionsData.features[i].npsRegion = npsRegion || {};
              this.regionsData.features[i].isNpsRegion = true;
            }
            else {
              this.regionsData.features[i].npsRegion = {};
              this.regionsData.features[i].isNpsRegion = false;
              this.regionsData.features[i].npsRegion["2016"] = {"Q1": {},"Q2":{},"Q3":{},"Q4":{}};
              this.regionsData.features[i].npsRegion["2015"] = {"Q1": {},"Q2":{},"Q3":{},"Q4":{}};
              this.regionsData.features[i].npsRegion["2014"] = {"Q1": {},"Q2":{},"Q3":{},"Q4":{}};
            }
            this.regionsData.features[i].selecredYear = this.selectedYear;
          }

          let NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.change;})
          NPSValues = NPSValues.filter((NPS) => NPS != undefined);
          if(NPSValues.length > 0){
            let max = Math.max.apply(Math,NPSValues);
            this.npsObject.maxNPS = Math.round(max) || "";
          }
          NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.change;})
          NPSValues = NPSValues.filter((NPS) => NPS != undefined);
          if(NPSValues.length > 0){
            let min = Math.min.apply(Math,NPSValues);
            this.npsObject.minNPS = Math.round(min) || "";
          }
          if(this.npsObject.maxNPS && this.npsObject.minNPS){
            this.canvasInitialization();
          }
          L.geoJSON(this.regionsData, { style: this.yearCountieStyle, onEachFeature : this.onEachFeature}).addTo(this.map);
        },
        error => {
          console.log(error)
        }
      );
  }

  onQ1Select(){
    this.selectedTab = "Q1";
    this.map.remove();
    this.mapInitialization();
    this.isCanvas = false;
    this.npsObject = {};
    let NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q1dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let max = Math.max.apply(Math,NPSValues);
      this.npsObject.maxNPS = Math.round(max) || "";
    }
    NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q1dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let min = Math.min.apply(Math,NPSValues);
      this.npsObject.minNPS = Math.round(min) || "";
    }
    if(this.npsObject.maxNPS && this.npsObject.minNPS){
      this.canvasInitialization();
    }
    L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ1, onEachFeature : this.onEachFeatureQ1}).addTo(this.map);
  }
  onQ2Select(){
    this.selectedTab = "Q2";
    this.map.remove();
    this.mapInitialization();
    this.isCanvas = false;
    this.npsObject = {};
    let NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q2dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let max = Math.max.apply(Math,NPSValues);
      this.npsObject.maxNPS = Math.round(max) || "";
    }
    NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q2dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let min = Math.min.apply(Math,NPSValues);
      this.npsObject.minNPS = Math.round(min) || "";
    }
    if(this.npsObject.maxNPS && this.npsObject.minNPS){
      this.canvasInitialization();
    }
    L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ2, onEachFeature : this.onEachFeatureQ2}).addTo(this.map);
  }
  onQ3Select(){
    this.selectedTab = "Q3";
    this.map.remove();
    this.mapInitialization();
    this.isCanvas = false;
    this.npsObject = {};
    let NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q3dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let max = Math.max.apply(Math,NPSValues);
      this.npsObject.maxNPS = Math.round(max) || "";
    }
    NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q3dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let min = Math.min.apply(Math,NPSValues);
      this.npsObject.minNPS = Math.round(min) || "";
    }
    if(this.npsObject.maxNPS && this.npsObject.minNPS){
      this.canvasInitialization();
    }
    L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ3, onEachFeature : this.onEachFeatureQ3}).addTo(this.map);
  }
  onQ4Select(){
    this.selectedTab = "Q4";
    this.map.remove();
    this.mapInitialization();
    this.isCanvas = false;
    this.npsObject = {};
    let NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q4dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let max = Math.max.apply(Math,NPSValues);
      this.npsObject.maxNPS = Math.round(max) || "";
    }
    NPSValues = this.regionsData.features.map(function(o){return o.npsRegion.Q4dt;})
    NPSValues = NPSValues.filter((NPS) => NPS != undefined);
    if(NPSValues.length > 0){
      let min = Math.min.apply(Math,NPSValues);
      this.npsObject.minNPS = Math.round(min) || "";
    }
    if(this.npsObject.maxNPS && this.npsObject.minNPS){
      this.canvasInitialization();
    }
    L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ4, onEachFeature : this.onEachFeatureQ4}).addTo(this.map);
  }

  onEachFeatureQ1(feature, layer) {
    let npsValue = {};
    npsValue['2016'] = feature.npsRegion['2016'] || { "Q1":{}};
    npsValue['2016'] =  npsValue['2016'].Q1 || {};
    npsValue['2015'] = feature.npsRegion['2015'] || { "Q1":{}};
    npsValue['2015'] =  npsValue['2015'].Q1 || {};
    npsValue['2014'] = feature.npsRegion['2014'] || { "Q1":{}};
    npsValue['2014'] =  npsValue['2014'].Q1 || {};

    if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
    let diff: any = npsValue['2016'].NPS - npsValue['2015'].NPS;
          diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2014'].NPS = Math.round(npsValue['2014'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2015'].NPS - npsValue['2014'].NPS;
           diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }

      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>2014</td>
                <td>${npsValue['2014'].NPS}</td>
                <td>${npsValue['2014'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_id + '</b> </div>');
    }
    layer.on("mouseover", function (e) {
      layer.openPopup(e.latlng);
    });
    layer.on("mouseout", function () {
      layer.closePopup();
    });
  };

  onEachFeatureQ2(feature, layer) {
    let npsValue = {};
    npsValue['2016'] = feature.npsRegion['2016'] || { "Q2":{}};
    npsValue['2016'] =  npsValue['2016'].Q2 || {};
    npsValue['2015'] = feature.npsRegion['2015'] || { "Q2":{}};
    npsValue['2015'] =  npsValue['2015'].Q2 || {};
    npsValue['2014'] = feature.npsRegion['2014'] || { "Q2":{}};
    npsValue['2014'] =  npsValue['2014'].Q2 || {};

    if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2016'].NPS - npsValue['2015'].NPS;
          diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2014'].NPS = Math.round(npsValue['2014'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2015'].NPS - npsValue['2014'].NPS;
           diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }

      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>2014</td>
                <td>${npsValue['2014'].NPS}</td>
                <td>${npsValue['2014'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_id + '</b> </div>');
    }
    layer.on("mouseover", function (e) {
      layer.openPopup(e.latlng);
    });
    layer.on("mouseout", function () {
      layer.closePopup();
    });
  };

  onEachFeatureQ3(feature, layer) {
    let npsValue = {};
    npsValue['2016'] = feature.npsRegion['2016'] || { "Q3":{}};
    npsValue['2016'] =  npsValue['2016'].Q3 || {};
    npsValue['2015'] = feature.npsRegion['2015'] || { "Q3":{}};
    npsValue['2015'] =  npsValue['2015'].Q3 || {};
    npsValue['2014'] = feature.npsRegion['2014'] || { "Q3":{}};
    npsValue['2014'] =  npsValue['2014'].Q3 || {};

    if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2016'].NPS - npsValue['2015'].NPS;
          diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2014'].NPS = Math.round(npsValue['2014'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2015'].NPS - npsValue['2014'].NPS;
           diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }

      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>2014</td>
                <td>${npsValue['2014'].NPS}</td>
                <td>${npsValue['2014'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_id + '</b> </div>');
    }
    layer.on("mouseover", function (e) {
      layer.openPopup(e.latlng);
    });
    layer.on("mouseout", function () {
      layer.closePopup();
    });
  };

  onEachFeatureQ4(feature, layer) {
    let npsValue = {};
    npsValue['2016'] = feature.npsRegion['2016'] || { "Q4":{}};
    npsValue['2016'] =  npsValue['2016'].Q4 || {};
    npsValue['2015'] = feature.npsRegion['2015'] || { "Q4":{}};
    npsValue['2015'] =  npsValue['2015'].Q4 || {};
    npsValue['2014'] = feature.npsRegion['2014'] || { "Q4":{}};
    npsValue['2014'] =  npsValue['2014'].Q4 || {};

    if ( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2016'].NPS - npsValue['2015'].NPS;
          diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2016'].NPS || npsValue['2016'].NPS == 0.0) && feature.selecredYear.indexOf('2016') != -1) {
      npsValue['2016'].NPS = Math.round(npsValue['2016'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>${npsValue['2016'].NPS}</td>
                <td>${npsValue['2016'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if ( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && (npsValue['2014'].NPS || npsValue['2014'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2014'].NPS = Math.round(npsValue['2014'].NPS);
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      let diff: any = npsValue['2015'].NPS - npsValue['2014'].NPS;
           diff = Math.round(diff);
      let icon = "";
      if(diff > 0){
        icon = 'glyphicon-arrow-up color-blue';
      }
      else{
        icon = 'glyphicon-arrow-down color-red';
      }

      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
              <tr>
                <td>2014</td>
                <td>${npsValue['2014'].NPS}</td>
                <td>${npsValue['2014'].N}</td>
              </tr>
              <tr>
                <td>Diff</td>
                <td colspan="2">${diff} <span class="glyphicon  ${icon} "></td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else if( (npsValue['2015'].NPS || npsValue['2015'].NPS == 0.0) && feature.selecredYear.indexOf('2015') != -1) {
      npsValue['2015'].NPS = Math.round(npsValue['2015'].NPS);
      layer.bindPopup(`<div>
          <h4 class="set-margincls">${feature.properties.dsm_id}</h4>            
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>NPS</th>
                <th>NUMBERS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2015</td>
                <td>${npsValue['2015'].NPS}</td>
                <td>${npsValue['2015'].N}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    }
    else {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_id + '</b> </div>');
    }
    layer.on("mouseover", function (e) {
      layer.openPopup(e.latlng);
    });
    layer.on("mouseout", function () {
      layer.closePopup();
    });
  };

}

