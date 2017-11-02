var GenericService = require("./common/GenericService");

class TestService extends GenericService {
    
    create(test) {
        console.log("This create: " + this);
        console.log("test: " + test);
    }
    
    update(test, where) {
        console.log("This update: " + this);
        console.log("where: " + where);
        console.log("test: " + test);
        return Promise.resolve("resultado de teste");
    }
    
    delete(where) {
        console.log("This delete: " + this);
        console.log("where: " + where);
    }
}

module.exports = TestService;