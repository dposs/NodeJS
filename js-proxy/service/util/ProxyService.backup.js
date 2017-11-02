class ProxyService {

    static createInstance(className) {

        let instance = new (require("../" + className))();
        let functions = ProxyService.getFunctions(instance);
        
        for (var i = 0; i < functions.length; i++) {

            var functionName = functions[i];
            var fn = instance[functionName];
           
            instance[functionName] = function () {
                var params = arguments;

                params = Object.keys(params).map(k => {
                    return arguments[k];
                });
    
                try {
                    fn.apply(instance, params);
                } catch(e) {
                    console.log("Erro tratado: " + e.message);
                }
            };
        }

        return instance;
    }

    static getFunctions(instance) {
        let properties = [];
        let object = instance;

        do {
            properties = properties.concat(Object.getOwnPropertyNames(instance));
        } while (instance = Object.getPrototypeOf(instance));

        return properties.sort().filter(function(e, i, arr) {
            return typeof object[e] == 'function';
        });
    }
}

module.exports = ProxyService;