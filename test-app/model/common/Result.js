module.exports = () => {
  class Result {

    constructor(data) {
      this._errors = [];
      this._data = data;
    }

    exception(error) {
      this._errors.push(error);
      return this;
    }

    get hasErrors() {
      return this._errors.length > 0;
    }

    get data() {
      return this._data;
    }

    get error() {
      if (this.hasErrors) {
        return this._errors[this._errors.length - 1];
      }
      return null;
    }

    get errors() {
      return this._errors;
    }
  }

  return Result;
}
