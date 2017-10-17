module.exports = () => {

  class PromiseFactory {

    constructor() {
      this._resolve;
      this._reject;
      this._promise;
      this._fn;
    }

    create() {
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
      return this;
    }

    resolve(result) {
      this._resolve(result);
    }

    reject(error) {
      this._reject(error);
    }

    promise() {
      return this._promise;
    }
  }

  return PromiseFactory;
}
