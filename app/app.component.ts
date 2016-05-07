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
	tick = null;	
	
	constructor (private _httpService:HTTPService) {
		this.pollTime();
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
		for(var i = 0; i < place.times.length; i++) {
			if(this.day >= place.times[i].openDay && this.day <= place.times[i].closeDay) {
				return i;
			}
		}
	}
	
	getCurrentHours(place, day) {
		for(var i = 0; i < place.times[day].hours.length; i++) {
			
			if (this.hour >= place.times[day].hours[i].open && this.hour < place.times[day].hours[i].close) {
				return i;
			} else if (place.times[day].hours[i].open > place.times[day].hours[i].close && (this.hour >= place.times[day].hours[i].open || this.hour < place.times[day].hours[i].close)) {
				return i;
			}
			
		}
	}
	
	generateHours(place, open) {
			
		var dayIndex = this.getCurrentDay(place);
		var hoursIndex = this.getCurrentHours(place, dayIndex);
		
		if(open == true){
			return this.convertToReadableTime(place.times[dayIndex].hours[hoursIndex].open);
		} else if (open == false) {
			return this.convertToReadableTime(place.times[dayIndex].hours[hoursIndex].close);
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
		
		if(minutes >= 10){
			return hours.toString() + ":" + minutes.toString() + " " + ending;
		} else {
			return hours.toString() + ":0" + minutes.toString() + " " + ending;
		}
	}
	
	pollTime() {
		// Update the time every 60 seconds
		this.tick = setInterval(() => this.timeTick(), 60000);
	}
	
	debugTime() {
		//Stop polling time
		clearInterval(this.tick);
		this.tick = null;
		
		// Increment time by 1 minute every 25 ms
		this.debug = setInterval(() => this.timeTick(), 25);
	}
	
	timeTick(){ 
		this.d.setTime(this.d.getTime() + 60000);
		this.day = this.d.getDay();
		this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
		this.date = this.d.toDateString();
	}
	
	resetTime(){
		clearInterval(this.debug);
		this.debug = null;
		this.d = new Date();
		this.day = this.d.getDay();
		this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
		this.date = this.d.toDateString();
		this.pollTime();
	}
	
	
	
		
}