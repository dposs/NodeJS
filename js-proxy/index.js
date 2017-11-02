var TestService = require("./service/TestService");
var Proxy = require("./service/util/Proxy");

//var testService = new TestService();
//testService.create();

//var testService = new TestService();
//testService.create();

var testService = Proxy.create("TestService");

testService.call = function (done) {
    return done();
}

//testService.create();

testService.update("aa", "bb").then(r => {console.log(r)});