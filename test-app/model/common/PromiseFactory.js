module.exports = () => {

  class PromiseFactory {

    constructor() {
      this._resolve;
      this._reject;
      this._promise;
      this._fn;
    }

    create(fn) {
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
        this._fn = fn;
      });
      return this;
    }

    get then() {
      return this._promise.then;
    }

    catchh(fnCatch) {
      return this._promise.catch;
    }

    promise() {
      return this._promise;
    }
  }

  return PromiseFactory;
}
