import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HTTPService {
	constructor(private _http: Http) {}
	
	getJSONData() {
		return this._http.get('resources/json/schedules.json')
			//Extract the HTTP response to a JSON object
			.map(res => res.json());
	}
	
	getFormattedJSONData() {
		return this._http.get('resources/json/schedulesArrayed.json')
			//Extract the HTTP response to a JSON object
			.map(res => res.json());
	}
}