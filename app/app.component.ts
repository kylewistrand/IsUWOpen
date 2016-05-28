import {Component} from 'angular2/core';
import {HTTPService} from './httpservice';
import {TimeService} from './timeservice';

@Component({
    selector: 'my-app',
    templateUrl: 'partials/main.html',
	providers: [HTTPService, TimeService]
})
export class AppComponent { 

	schedules = null;
	arrayed = false;
	visible = false;
	
	d = new Date();
	day = this.d.getDay();
	hour = (this.d.getHours() * 60) + this.d.getMinutes();
	date = this.d.toDateString();
	
	tick = null;
	polling = false;
	
	constructor (private _httpService:HTTPService, private _timeService:TimeService) {
		this.toggleTick();
		console.log(this.hour);
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
			if(this.day >= place.times[i].openDay && this.day <= place.times[i].closeDay
			   || (place.times[i].openDay > place.times[i].closeDay && (this.day == place.times[i].openDay 
			   || this.day == place.times[i].closeDay))) {
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
			return this._timeService.convertToReadableTime(place.times[dayIndex].hours[hoursIndex].open);
		} else if (open == false) {
			return this._timeService.convertToReadableTime(place.times[dayIndex].hours[hoursIndex].close);
		}
	}
	
	isOpen(place) {
		
		var dayIndex = this.getCurrentDay(place);
		if(dayIndex == null){
			return false;
		}
		
		var hoursIndex = this.getCurrentHours(place, dayIndex);
		if(hoursIndex == null){
			return false;
		}
				
		return true;
	}
	
	convertToReadableTime(time) {
		return this._timeService.convertToReadableTime(time);
	}
	
	toggleTick() {
		if(!this.polling) {
			clearInterval(this.tick);
			this.tick = null;
			this.resetTime();
			this.tick = setInterval(() => this.timeTick(), 60000);
			this.polling = true;
		} else {
			clearInterval(this.tick);
			this.tick = null;
			this.resetTime();
			this.tick = setInterval(() => this.timeTick(), 25);
			this.polling = false;
		}
	}
	
	timeTick(){ 
		this.d.setTime(this.d.getTime() + 60000);
		this.day = this.d.getDay();
		this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
		this.date = this.d.toDateString();
	}
	
	resetTime(){
		this.d = new Date();
		this.day = this.d.getDay();
		this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
		this.date = this.d.toDateString();
	}
		
}