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
  public npsObject: any = {};
  public isCanvas: boolean = false;

  @ViewChild("myCanvas") myCanvas;

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.mapInitialization();
    this.regionsList = ["Channel", "Region", "National"];
    this.yearsList = ["2015-14", "2016-15", "2017-16"];
  }
  mapInitialization(){
    this.map = L.map('map')
      .setView([37.8, -96], 4);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
      id: 'mapbox.light',
      attribution: '<a href="http://openstreetmap.org">Open Street Map</a>'
    }).addTo(this.map);
  }

  canvasInitialization(){
    this.isCanvas = true;
    const canvasEl: HTMLCanvasElement = this.myCanvas.nativeElement;
    let ctx = canvasEl.getContext("2d");
    var my_gradient = ctx.createLinearGradient(0, 0, 285, 0);
    my_gradient.addColorStop(0, "#00cc00");
    my_gradient.addColorStop(0.5, "#ffa500");
    my_gradient.addColorStop(1, "#ff0000");
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
        let styleObj =  {
            fillColor: feature.npsRegion.change > 40 ? '#ff0000' :
                       feature.npsRegion.change < -40  ? '#00cc00' :
                       feature.npsRegion.change == undefined ? "#EEEEEE" :
                                              '#ffa500',
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
            fillColor: feature.npsRegion.Q1dt > 40 ? '#ff0000' :
                       feature.npsRegion.Q1dt < -40  ? '#00cc00' :
                       feature.npsRegion.Q1dt == undefined ? "#EEEEEE" :
                                              '#ffa500',
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
            fillColor: feature.npsRegion.Q2dt > 40 ? '#ff0000' :
                       feature.npsRegion.Q2dt < -40  ? '#00cc00' :
                       feature.npsRegion.Q2dt == undefined ? "#EEEEEE" :
                                              '#ffa500',
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
            fillColor: feature.npsRegion.Q3dt > 40 ? '#ff0000' :
                       feature.npsRegion.Q3dt < -40  ? '#00cc00' :
                       feature.npsRegion.Q3dt == undefined ? "#EEEEEE" :
                                              '#ffa500',
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
            fillColor: feature.npsRegion.Q4dt > 40 ? '#ff0000' :
                       feature.npsRegion.Q4dt < -40  ? '#00cc00' :
                       feature.npsRegion.Q4dt == undefined ? "#EEEEEE" :
                                              '#ffa500',
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
     let npsValue = {};
        npsValue['2016'] = feature.npsRegion['2016'] || {};
        npsValue['2015'] = feature.npsRegion['2015'] || {};
        npsValue['2014'] = feature.npsRegion['2014'] || {};
   if ( npsValue['2016'].mean && feature.selecredYear.indexOf('2017') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2017-16 : ' + npsValue['2016'].mean + '</div>');
    }
    else if ( npsValue['2015'].mean && feature.selecredYear.indexOf('2016') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016-15 : ' + npsValue['2015'].mean + '</div>');
    }
    else if ( npsValue['2014'].mean && feature.selecredYear.indexOf('2015') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2015-14 : ' + npsValue['2014'].mean + '</div>');
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
        this.isCanvas = false;
        this.npsObject = {};
        for (let i in this.regionsData.features) {
          let feature: any = this.regionsData.features[i] || {};
          let properties = feature.properties || {};
          let npsRegion;
          if(this.selectedRegion == "Region"){
             npsRegion = this.npsRegions[properties.terrid] || {};
             this.regionsData.features[i].properties.dsm_name = properties.terrdescr;
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
            this.regionsData.features[i].npsRegion["2016"] = {"Q1": {},"Q2":{},"Q3":{},"Q4":{}};
            this.regionsData.features[i].npsRegion["2015"] = {"Q1": {},"Q2":{},"Q3":{},"Q4":{}};
            this.regionsData.features[i].npsRegion["2014"] = {"Q1": {},"Q2":{},"Q3":{},"Q4":{}};
          }
          this.regionsData.features[i].selecredYear = this.selectedYear;
        }

        let meanValues = this.regionsData.features.map(function(o){return o.npsRegion.change;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let max = Math.max.apply(Math,meanValues);
          this.npsObject.maxMean = Math.round(max) || "";
        }
        meanValues = this.regionsData.features.map(function(o){return o.npsRegion.change;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let min = Math.min.apply(Math,meanValues);
          this.npsObject.minMean = Math.round(min) || "";
        }
        if(this.npsObject.maxMean && this.npsObject.minMean){
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
        this.map.remove();
        this.mapInitialization();
        this.isCanvas = false;
        this.npsObject = {};
        let meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q1dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let max = Math.max.apply(Math,meanValues);
          this.npsObject.maxMean = Math.round(max) || "";
        }
        meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q1dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let min = Math.min.apply(Math,meanValues);
          this.npsObject.minMean = Math.round(min) || "";
        }
        if(this.npsObject.maxMean && this.npsObject.minMean){
          this.canvasInitialization();
        }
        L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ1, onEachFeature : this.onEachFeatureQ1}).addTo(this.map);
  }
  onQ2Select(){
        this.map.remove();
        this.mapInitialization();
        this.isCanvas = false;
        this.npsObject = {};
        let meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q2dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let max = Math.max.apply(Math,meanValues);
          this.npsObject.maxMean = Math.round(max) || "";
        }
        meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q2dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let min = Math.min.apply(Math,meanValues);
          this.npsObject.minMean = Math.round(min) || "";
        }
        if(this.npsObject.maxMean && this.npsObject.minMean){
          this.canvasInitialization();
        }
        L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ2, onEachFeature : this.onEachFeatureQ2}).addTo(this.map);
  }
  onQ3Select(){
        this.map.remove();
        this.mapInitialization();
        this.isCanvas = false;
        this.npsObject = {};
        let meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q3dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let max = Math.max.apply(Math,meanValues);
          this.npsObject.maxMean = Math.round(max) || "";
        }
        meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q3dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let min = Math.min.apply(Math,meanValues);
          this.npsObject.minMean = Math.round(min) || "";
        }
        if(this.npsObject.maxMean && this.npsObject.minMean){
          this.canvasInitialization();
        }
        L.geoJSON(this.regionsData, { style: this.countiesStyleBYQ3, onEachFeature : this.onEachFeatureQ3}).addTo(this.map);
  }
  onQ4Select(){
        this.map.remove();
        this.mapInitialization();
        this.isCanvas = false;
        this.npsObject = {};
        let meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q4dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let max = Math.max.apply(Math,meanValues);
          this.npsObject.maxMean = Math.round(max) || "";
        }
        meanValues = this.regionsData.features.map(function(o){return o.npsRegion.Q4dt;})
        meanValues = meanValues.filter((mean) => mean != undefined);
        if(meanValues.length > 0){
          let min = Math.min.apply(Math,meanValues);
          this.npsObject.minMean = Math.round(min) || "";
        }
        if(this.npsObject.maxMean && this.npsObject.minMean){
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
    if ( npsValue['2016'].mean && feature.selecredYear.indexOf('2017') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2017-16 : ' + npsValue['2016'].mean + '</div>');
    }
    else if ( npsValue['2015'].mean && feature.selecredYear.indexOf('2016') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016-15 : ' + npsValue['2015'].mean + '</div>');
    }
    else if ( npsValue['2014'].mean && feature.selecredYear.indexOf('2015') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2015-14 : ' + npsValue['2014'].mean + '</div>');
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

  onEachFeatureQ2(feature, layer) {
    let npsValue = {};
        npsValue['2016'] = feature.npsRegion['2016'] || { "Q2":{}};
        npsValue['2016'] =  npsValue['2016'].Q2 || {};
        npsValue['2015'] = feature.npsRegion['2015'] || { "Q2":{}};
        npsValue['2015'] =  npsValue['2015'].Q2 || {};
        npsValue['2014'] = feature.npsRegion['2014'] || { "Q2":{}};
        npsValue['2014'] =  npsValue['2014'].Q2 || {};

    if ( npsValue['2016'].mean && feature.selecredYear.indexOf('2017') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2017-16 : ' + npsValue['2016'].mean + '</div>');
    }
    else if ( npsValue['2015'].mean && feature.selecredYear.indexOf('2016') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016-15 : ' + npsValue['2015'].mean + '</div>');
    }
    else if ( npsValue['2014'].mean && feature.selecredYear.indexOf('2015') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2015-14 : ' + npsValue['2014'].mean + '</div>');
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

  onEachFeatureQ3(feature, layer) {
    let npsValue = {};
        npsValue['2016'] = feature.npsRegion['2016'] || { "Q3":{}};
        npsValue['2016'] =  npsValue['2016'].Q3 || {};
        npsValue['2015'] = feature.npsRegion['2015'] || { "Q3":{}};
        npsValue['2015'] =  npsValue['2015'].Q3 || {};
        npsValue['2014'] = feature.npsRegion['2014'] || { "Q3":{}};
        npsValue['2014'] =  npsValue['2014'].Q3 || {};

    if ( npsValue['2016'].mean && feature.selecredYear.indexOf('2017') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2017-16 : ' + npsValue['2016'].mean + '</div>');
    }
    else if ( npsValue['2015'].mean && feature.selecredYear.indexOf('2016') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016-15 : ' + npsValue['2015'].mean + '</div>');
    }
    else if ( npsValue['2014'].mean && feature.selecredYear.indexOf('2015') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2015-14 : ' + npsValue['2014'].mean + '</div>');
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

  onEachFeatureQ4(feature, layer) {
    let npsValue = {};
        npsValue['2016'] = feature.npsRegion['2016'] || { "Q4":{}};
        npsValue['2016'] =  npsValue['2016'].Q4 || {};
        npsValue['2015'] = feature.npsRegion['2015'] || { "Q4":{}};
        npsValue['2015'] =  npsValue['2015'].Q4 || {};
        npsValue['2014'] = feature.npsRegion['2014'] || { "Q4":{}};
        npsValue['2014'] =  npsValue['2014'].Q4 || {};
    if ( npsValue['2016'].mean && feature.selecredYear.indexOf('2017') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2017-16 : ' + npsValue['2016'].mean + '</div>');
    }
    else if ( npsValue['2015'].mean && feature.selecredYear.indexOf('2016') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2016-15 : ' + npsValue['2015'].mean + '</div>');
    }
    else if ( npsValue['2014'].mean && feature.selecredYear.indexOf('2015') != -1) {
      layer.bindPopup('<div class="info-div"> <b>' + feature.properties.dsm_name + '</b> </br>' + '2015-14 : ' + npsValue['2014'].mean + '</div>');
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

}
