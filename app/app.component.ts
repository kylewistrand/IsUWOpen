import {Component} from 'angular2/core';
import {HTTPService} from './httpservice'

@Component({
    selector: 'my-app',
    templateUrl: 'partials/main.html',
	providers: [HTTPService]
})
export class AppComponent { 

	schedules: Object;
	
	constructor (private _httpService:HTTPService) {
		this.getData();	
	}
	
	getData() {
		this._httpService.getJSONData()
		.subscribe(
			data => this.schedules = data,
			error => console.log(error),
			() => console.log("Request Complete")
		);
	}
	
	printData() {
		console.log(this.schedules);
	}
}