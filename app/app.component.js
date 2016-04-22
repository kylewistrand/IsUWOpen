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