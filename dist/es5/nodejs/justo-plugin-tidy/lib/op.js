"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _path = require("path");var _path2 = _interopRequireDefault(_path);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args = [], res;


  if (params.length === 0) {
    params = { src: [] };} else 
  if (params.length >= 1) {
    params = params[0];}


  if (typeof params.src == "string") params.src = [params.src];
  if (typeof params.ignore == "string") params.ignore = [params.ignore];
  if (!params.hasOwnProperty("output")) params.output = true;


  if (/^win/.test(_os2.default.platform())) cmd = "tidy.exe";else 
  cmd = "tidy";

  if (params.path) cmd = _path2.default.join(params.path, cmd);

  if (params.modify) args.push("-modify");else 
  args.push("-errors");

  if (params.config) {
    args.push("-config");
    args.push(params.config);}var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {



    for (var _iterator = params.src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var file = _step.value;
      var entry = fs.entry(file);

      if (entry instanceof fs.File) res = checkFile(entry);else 
      if (entry instanceof fs.Dir) res = checkDir(entry);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



  return res.status;


  function checkFile(entry) {
    var res;


    if (params.ignore) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = params.ignore[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var i = _step2.value;
          if (_path2.default.normalize(entry.path).startsWith(_path2.default.normalize(i))) return;}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}




    res = _child_process2.default.spawnSync(cmd, args.concat(entry.path));

    if (params.output) {
      var msg = undefined;

      msg = res.stdout.toString();
      if (msg !== "") console.log(msg);

      msg = res.stderr.toString();
      if (msg !== "") {
        var header = false;var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {

          for (var _iterator3 = msg.split("\n")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var line = _step3.value;
            if (/^line .+/.test(line)) {
              if (!header) {
                console.log(">", entry.path);
                header = true;}


              console.log(line);}}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}}






    return res;}


  function checkDir(entry) {
    var res = undefined;var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {

      for (var _iterator4 = entry.entries[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var e = _step4.value;
        if (e instanceof fs.File) res = checkFile(e);else 
        if (e instanceof fs.Dir) res = checkDir(e);}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}


    return res;}}