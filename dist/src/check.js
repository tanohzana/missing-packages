"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Checks all for packages in file(s)
function check(path) {
  var packages = [];
  var isDir = fs.lstatSync(path).isDirectory();

  // Passing an empty array to initiate recursivity or search one file
  packages = isDir ? checkDirectoryRecursive(path, packages) : checkFile(path, packages);

  return packages;
}

exports.default = check;