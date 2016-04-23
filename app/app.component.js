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
                    this.d = new Date();
                    this.day = this.d.getDay();
                    this.hour = (this.d.getHours() * 60) + this.d.getMinutes();
                }
                AppComponent.prototype.getOldData = function () {
                    var _this = this;
                    this.arrayed = false;
                    this.schedules = null;
                    this._httpService.getJSONData()
                        .subscribe(function (data) { return _this.schedules = data; }, function (error) { return console.log(error); }, function () { return console.log("Request Complete"); });
                    this.arrayed = false;
                };
                AppComponent.prototype.getArrayedData = function () {
                    var _this = this;
                    this.arrayed = false;
                    this.schedules = null;
                    this._httpService.getFormattedJSONData()
                        .subscribe(function (data) { return _this.schedules = data; }, function (error) { return console.log(error); }, function () { return console.log("Request Complete"); });
                    this.arrayed = true;
                };
                AppComponent.prototype.printData = function () {
                    console.log(this.schedules);
                };
                AppComponent.prototype.getCurrentDay = function (place) {
                    //console.log(place);
                    for (var i = 0; i < place.times.length; i++) {
                        for (var j = 0; j < place.times[i].days.length; j++) {
                            if (this.day == place.times[i].days[j]) {
                                //console.log(i);
                                return i;
                            }
                        }
                    }
                };
                AppComponent.prototype.getCurrentHours = function (place, day) {
                    //console.log("Starting Hour Calc");
                    //console.log(place);
                    //console.log(day);
                    //console.log(this.hour);
                    for (var i = 0; i < place.times[day].hours.length; i++) {
                        if (this.hour >= place.times[day].hours[i].open && this.hour < place.times[day].hours[i].close) {
                            //console.log("Finished Hour Calc");
                            //console.log(i);
                            return i;
                        }
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
                    else if (hours == 12) {
                        ending = "PM";
                    }
                    else if (hours == 0) {
                        hours = hours + 12;
                        ending = "AM";
                    }
                    else {
                        ending = "PM";
                        hours = hours - 12;
                    }
                    //console.log(hours);
                    //console.log(minutes);
                    //console.log(ending);
                    if (minutes >= 10) {
                        return hours.toString() + ":" + minutes.toString() + " " + ending;
                    }
                    else {
                        return hours.toString() + ":0" + minutes.toString() + " " + ending;
                    }
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