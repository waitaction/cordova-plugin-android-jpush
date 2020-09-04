/**非官方补充 */
var JPushPack = function () {
    var self = this;
    this.registerCallback = null;
    this.registerNewCallback = null;
    document.addEventListener('deviceready', function () {
        window.JPush.init();
        window.JPush.setDebugMode(true);
        setTimeout(() => {
            if (window.JPush.setStatisticsOpen) {
                window.JPush.setStatisticsOpen(true);
            }
        }, 3000);

        self.getRegistrationID();
        document.addEventListener("jpush.receiveRegistrationId", function (event) {
            console.log("receiveRegistrationId" + JSON.stringify(event));
            console.log(event.registrationId)
            self.registerCallback(registrationId);
        }, false);

        document.addEventListener("jpush.openNotification", function (event) {
            try {
                var alertContent;
                if (device.platform == "Android") {
                    alertContent = event.extras["cn.jpush.android.EXTRA"];
                }  
                console.log(event);
                console.log("open Notification:" + alertContent);
                cordova.fireDocumentEvent('messageReceived', alertContent);
            } catch (exception) {
                console.log("JPushPlugin:onOpenNotification" + exception);
            }
        }, false);

        document.addEventListener("jpush.receiveNotification", function (event) {
            try {
                var alertContent;
                if (device.platform == "Android") {
                    alertContent = event.extras["cn.jpush.android.EXTRA"];
                }  
                console.log(event);
                console.log(alertContent);
                cordova.fireDocumentEvent('messageReceived', alertContent);
            } catch (exception) {
                console.log(exception)
            }
        }, false);

        document.addEventListener("jpush.receiveMessage", function (event) {
            try {
                var message;
                if (device.platform == "Android") {
                    message = event.extras["cn.jpush.android.EXTRA"];
                }  
 
                cordova.fireDocumentEvent('messageReceived', message);
            } catch (exception) {
                console.log("JPushPlugin:onReceiveMessage-->" + exception);
            }
        }, false);

        document.addEventListener("resume", function (event) {
            try {
            } catch (exception) {
                console.log("onResume-->" + exception);
            }
        }, false);


    }, false);


};

JPushPack.prototype.register = function (callback) {
    this.registerCallback = callback;
}

JPushPack.prototype.onNewToken = function (callback) {
    this.registerNewCallback = callback;
}

JPushPack.prototype.getRegistrationID = function () {
    let self = this;
    document.addEventListener('deviceready', function () {
        window.JPush.getRegistrationID(function (token) {
            try {
                console.log(token);
                if (token.length == 0) {
                    window.setTimeout(self.getRegistrationID, 120000);
                } else {
                    if (self.registerNewCallback) {
                        self.registerNewCallback(token);
                    }

                }
            } catch (exception) {
                console.log(exception);
            }
        });
    }, false);
}
module.exports = new JPushPack();
