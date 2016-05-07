System.register(['angular2/core', './httpservice'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, httpservice_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpservice_1_1) {
                httpservice_1 = httpservice_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_httpService) {
                    this._httpService = _httpService;
                    this.schedules = null;
                    this.arrayed = false;
                    this.visible = false;
                    this.d = new Date();
                    this.day = this.d.getDay();
                    this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
                    this.date = this.d.toDateString();
                    this.debug = null;
                    this.tick = null;
                    this.pollTime();
                }
                AppComponent.prototype.getOldData = function () {
                    var _this = this;
                    this.visible = false;
                    this.arrayed = false;
                    this.schedules = null;
                    this._httpService.getJSONData()
                        .subscribe(function (data) { return _this.schedules = data; }, function (error) { return console.log(error); }, function () { return console.log("Request Complete"); });
                    this.arrayed = false;
                    this.visible = true;
                };
                AppComponent.prototype.getArrayedData = function () {
                    var _this = this;
                    this.visible = false;
                    this.arrayed = false;
                    this.schedules = null;
                    this._httpService.getFormattedJSONData()
                        .subscribe(function (data) { return _this.schedules = data; }, function (error) { return console.log(error); }, function () { return console.log("Request Complete"); });
                    this.arrayed = true;
                    this.visible = true;
                };
                AppComponent.prototype.printData = function () {
                    console.log(this.schedules);
                };
                AppComponent.prototype.getCurrentDay = function (place) {
                    for (var i = 0; i < place.times.length; i++) {
                        if (this.day >= place.times[i].openDay && this.day <= place.times[i].closeDay) {
                            return i;
                        }
                    }
                };
                AppComponent.prototype.getCurrentHours = function (place, day) {
                    for (var i = 0; i < place.times[day].hours.length; i++) {
                        if (this.hour >= place.times[day].hours[i].open && this.hour < place.times[day].hours[i].close) {
                            return i;
                        }
                        else if (place.times[day].hours[i].open > place.times[day].hours[i].close && (this.hour >= place.times[day].hours[i].open || this.hour < place.times[day].hours[i].close)) {
                            return i;
                        }
                    }
                };
                AppComponent.prototype.generateHours = function (place, open) {
                    var dayIndex = this.getCurrentDay(place);
                    var hoursIndex = this.getCurrentHours(place, dayIndex);
                    if (open == true) {
                        return this.convertToReadableTime(place.times[dayIndex].hours[hoursIndex].open);
                    }
                    else if (open == false) {
                        return this.convertToReadableTime(place.times[dayIndex].hours[hoursIndex].close);
                    }
                };
                AppComponent.prototype.isOpen = function (place) {
                    if (this.getCurrentDay(place) == null) {
                        return false;
                    }
                    if (this.getCurrentHours(place, this.getCurrentDay(place)) == null) {
                        return false;
                    }
                    return true;
                };
                AppComponent.prototype.convertToReadableTime = function (time) {
                    var hours = Math.floor(time / 60);
                    var minutes = time % 60;
                    var ending;
                    if (hours < 12) {
                        ending = "AM";
                    }
                    else if (hours >= 12) {
                        ending = "PM";
                        hours = hours - 12;
                    }
                    if (hours == 12) {
                        ending = "PM";
                    }
                    else if (hours == 0) {
                        hours = hours + 12;
                        ending = "AM";
                    }
                    if (minutes >= 10) {
                        return hours.toString() + ":" + minutes.toString() + " " + ending;
                    }
                    else {
                        return hours.toString() + ":0" + minutes.toString() + " " + ending;
                    }
                };
                AppComponent.prototype.pollTime = function () {
                    var _this = this;
                    // Update the time every 60 seconds
                    this.tick = setInterval(function () { return _this.timeTick(); }, 60000);
                };
                AppComponent.prototype.debugTime = function () {
                    var _this = this;
                    //Stop polling time
                    clearInterval(this.tick);
                    this.tick = null;
                    // Increment time by 1 minute every 25 ms
                    this.debug = setInterval(function () { return _this.timeTick(); }, 25);
                };
                AppComponent.prototype.timeTick = function () {
                    this.d.setTime(this.d.getTime() + 60000);
                    this.day = this.d.getDay();
                    this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
                    this.date = this.d.toDateString();
                };
                AppComponent.prototype.resetTime = function () {
                    clearInterval(this.debug);
                    this.debug = null;
                    this.d = new Date();
                    this.day = this.d.getDay();
                    this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
                    this.date = this.d.toDateString();
                    this.pollTime();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'partials/main.html',
                        providers: [httpservice_1.HTTPService]
                    }), 
                    __metadata('design:paramtypes', [httpservice_1.HTTPService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map