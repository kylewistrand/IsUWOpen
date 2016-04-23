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
	visible = false;
	d = new Date();
	day = this.d.getDay();
	hour = (this.d.getHours() * 60) + this.d.getMinutes();
	date = this.d.toDateString();
	
	debug = null;
	
	
	constructor (private _httpService:HTTPService) {
		//this.pollTime();
	}
	
	getOldData() {
		this.visible = false;
		this.arrayed = false;
		this.schedules = null;
		
		this._httpService.getJSONData()
		.subscribe(
			data => this.schedules = data,
			error => console.log(error),
			() => console.log("Request Complete")
		);
		
		this.arrayed = false;
		this.visible = true;
	}
	
	getArrayedData() {
		this.visible = false;
		this.arrayed = false;
		this.schedules = null;
		
		this._httpService.getFormattedJSONData()
		.subscribe(
			data => this.schedules = data,
			error => console.log(error),
			() => console.log("Request Complete")
		);
		
		this.arrayed = true;
		this.visible = true;
	}
	
	printData() {
		console.log(this.schedules);
	}
	
	getCurrentDay(place) {
		//console.log(place);
		for(var i = 0; i < place.times.length; i++) {
			for(var j = 0; j < place.times[i].days.length; j++) {
				if(this.day == place.times[i].days[j]) {
					//console.log(i);
					return i;
				}
			}
		}
	}
	
	getCurrentHours(place, day) {
		//console.log("Starting Hour Calc");
		//console.log(place);
		//console.log(day);
		//console.log(this.hour);
		for(var i = 0; i < place.times[day].hours.length; i++) {
			if(this.hour >= place.times[day].hours[i].open && this.hour < place.times[day].hours[i].close || 
			   place.times[day].hours[i].open > place.times[day].hours[i].close && (this.hour >= place.times[day].hours[i].open || this.hour < place.times[day].hours[i].close)) {
				//console.log("Finished Hour Calc");
				//console.log(i);
				return i;
			}
		}
	}
	
	isOpen(place) {
		if(this.getCurrentDay(place) == null){
			return false;
		}
		if(this.getCurrentHours(place, this.getCurrentDay(place)) == null){
			return false;
		}
		return true;
	}
	
	convertToReadableTime(time) {
		var hours = Math.floor(time/60);
		var minutes = time % 60;
		var ending;
		console.log(hours);
		console.log("Minutes:" + minutes);
		if(hours < 12){
			ending = "AM";
		} else if (hours >= 12) {
			ending = "PM";
			hours = hours - 12;
		}
		
		if (hours == 12) {
			ending = "PM";
		} else if (hours == 0) {
			hours = hours + 12;
			ending = "AM";
		}
		//console.log(hours);
		//console.log(minutes);
		//console.log(ending);
		
		if(minutes >= 10){
			return hours.toString() + ":" + minutes.toString() + " " + ending;
		} else {
			return hours.toString() + ":0" + minutes.toString() + " " + ending;
		}
	}
	
	pollTime() {
		setInterval(function(){ 
		
		this.day = this.d.getDay();
		this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
		this.date = this.d.toDateString(); 
		 
		}, 60000);
		
		// Update the time every one minute
	}
	
	debugTime() {
		this.debug = setInterval(() => this.timeTick(), 50);
	}
	
	timeTick(){ 
			
		//console.log(this.d);
		
		// Add 1 minute to the time every quarter second
		this.d.setTime(this.d.getTime() + 60000);
		this.day = this.d.getDay();
		this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
	}
	
	resetTime(){
		clearInterval(this.debug);
		this.debug = null;
		this.d = new Date();
		this.day = this.d.getDay();
		this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
		this.date = this.d.toDateString();
	}
	
	
	
		
}