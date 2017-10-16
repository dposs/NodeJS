module.exports = () => {
  class Result {

    constructor(data) {
      this._error = [];
      this._data = data;
    }

    catch(error) {
      this._error.push(error);
      return this;
    }

    get hasErrors() {
      return this._error.length > 0;
    }

    get data() {
      return this._data;
    }

    get error() {
      if (this.hasErrors) {
        return this._error[0];
      }
      return null;
    }

    get errors() {
      return this._errors;
    }
  }

  return Result;
}
