/**
 * @constructor
 */
var PrintPDF = function () {
  this.METHOD = "printDocument";
  this.IS_AVAILABLE_METHOD = "isPrintingAvailable";
  this.DISMISS_METHOD = "dismissPrintDialog";
  this.SAVE_METHOD = "save";
  this.CLASS = "PrintPDF";
};

PrintPDF.prototype.print = function (options) {
  options = options || {};

  var data = options.data; // print data, base64 string (required)

  var type = options.type || "Data"; // type of document

  var title = options.title || "Print Document"; // title of document

  // make sure callbacks are functions or reset to null
  var successCallback =
    options.success && typeof options.success === "function"
      ? options.success
      : this.defaultCallback;

  var errorCallback =
    options.error && typeof options.error === "function"
      ? options.error
      : this.defaultCallback;

  // make sure data is set
  if (!data) {
    if (errorCallback) {
      errorCallback({
        success: false,
        error: "Parameter 'data' is required.",
      });
    }
    return false;
  }

  var args = [data];
  args.push(type);
  args.push(title);

  // make the call
  cordova.exec(successCallback, errorCallback, this.CLASS, this.METHOD, args);
};

PrintPDF.prototype.isPrintingAvailable = function (callback) {
  // make sure callbacks are functions or reset to null
  var successCallback =
    callback && typeof callback === "function"
      ? callback
      : this.defaultCallback;

  cordova.exec(successCallback, null, this.CLASS, this.IS_AVAILABLE_METHOD, []);
};

PrintPDF.prototype.dismiss = function () {
};

PrintPDF.prototype.save = function (options) {
  options = options || {};

  var data = options.data; // print data, base64 string (required)

  var title = options.title || "Print Document"; // title of document

  // make sure callbacks are functions or reset to null
  var successCallback =
    options.success && typeof options.success === "function"
      ? options.success
      : this.defaultCallback;

  var errorCallback =
    options.error && typeof options.error === "function"
      ? options.error
      : this.defaultCallback;

  // make sure data is set
  if (!data) {
    if (errorCallback) {
      errorCallback({
        success: false,
        error: "Parameter 'data' is required.",
      });
    }
    return false;
  }

  var args = [data];
  args.push(title);

  cordova.exec(
    successCallback,
    errorCallback,
    this.CLASS,
    this.SAVE_METHOD,
    args
  );
};

PrintPDF.prototype.defaultCallback = null;

// Plug in to Cordova
cordova.addConstructor(function () {
  if (!window.Cordova) {
    window.Cordova = cordova;
  }

  if (!window.plugins) window.plugins = {};
  window.plugins.PrintPDF = new PrintPDF();
});
