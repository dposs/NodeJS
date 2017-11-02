
/**
 * Proxy.
 * 
 * @class Proxy
 */
class Proxy {

    /**
     * Create an instance of Proxy.
     * 
     * @static
     * @param {string} className Class Name to be proxified.
     * @param {function} className Wrapper function.
     * @returns {Proxy} Proxy
     * @memberof Proxy
     */
    static create(className, wrapper) {

        const proxy = new Proxy();
        const instance = new (require("../" + className))();
        
        if (wrapper) {
            proxy.call = wrapper;
        }

        proxy.load(instance);

        return proxy;
    }

    /**
     * Load the instance on this Proxy.
     * 
     * @param {Object} instance Instance
     * @param {Function[]} functions Functions array
     * @memberof Proxy
     */
    load(instance) {

        const functions = Proxy.getFunctions(instance);

        for (let functionName of functions) {
            const fn = instance[functionName];
           
            this[functionName] = function () {
                let params = Array.prototype.slice.call(arguments);
                return this.call(() => fn.apply(instance, params));
            };
        }
    }

    /**
     * Function Wrapper.
     * 
     * @param {function} execute Function that will execute on instance.
     * @returns {Object} Function returns
     * @memberof Proxy
     */
    call(execute) {

        try {

            var returned = execute();

            if (returned instanceof Promise) {
                returned.catch(error => {
                    console.log("ERRO NA PROMISE: ", error);
                });
            }

            return returned;
                
        } catch (error) {
            console.log("ERRO NA FUNCAO: ", error);
            throw error;
        }
    }

    /**
     * Returns all functions of the instance.
     * 
     * @static
     * @param {Object} instance Instance
     * @returns {function[]} Functions array
     * @memberof Proxy
     */
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

module.exports = Proxy;