import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MapService {

  constructor(public http:  Http) { }

  getMapData(){
		return this.http.get('assets/regions.json')
                      .map((res:any) => res.json());
	}

}
