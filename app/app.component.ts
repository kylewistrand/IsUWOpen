import {Component} from 'angular2/core';
import {HTTPService} from './httpservice'

@Component({
    selector: 'my-app',
    templateUrl: 'partials/main.html',
	providers: [HTTPService]
})
export class AppComponent { 

	schedules = null;
	arrayed = false;
	
	constructor (private _httpService:HTTPService) {}
	
	getOldData() {
		this.arrayed = false;
		this.schedules = null;
		
		this._httpService.getJSONData()
		.subscribe(
			data => this.schedules = data,
			error => console.log(error),
			() => console.log("Request Complete")
		);
		
		this.arrayed = false;
	}
	
	getArrayedData() {
		this.arrayed = false;
		this.schedules = null;
		
		this._httpService.getFormattedJSONData()
		.subscribe(
			data => this.schedules = data,
			error => console.log(error),
			() => console.log("Request Complete")
		);
		
		this.arrayed = true;
	}
	
	printData() {
		console.log(this.schedules);
	}
}