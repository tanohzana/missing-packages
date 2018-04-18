#! /usr/bin/env node

const program = require("commander");
require("pkginfo")(module, "version");

let recursive = false;
let programVersion = module.exports.version;

const displayPackages = require("../src/displayPackages");
const installPackages = require("../src/install");
const checkDirectory = require("../src/checkDirectory");
const checkFile = require("../src/checkFile");

program
	.version(programVersion, "-v, --version")
	.usage("[options] <file/directory>")
	.option("-i, --install", "install missing packages in a file or directory")
	.option("-c, --check", "check missing packages in a file or directory")
	.option("-r, --recursive", "check or install missing packages in directories recursively")
	.arguments("<file>")
	.action((file) => {
		if (program.install && program.check) {
			console.log("\033[0;31mStop fooling around please !\033[0m");
			console.log("Read the doc ! ---> mp -h");
		}else if (program.install && program.recursive) {
			recursive = true;
			checkDirectory(process.cwd() + "/" + file, recursive, installPackages);
		}else if (program.install) {
			checkDirectory(process.cwd() + "/" + file, recursive, installPackages);
		} else if (program.check && program.recursive) {
			recursive = true;
			checkDirectory(process.cwd() + "/" + file, recursive, displayPackages);
		}else if (program.check) {
			checkDirectory(process.cwd() + "/" + file, recursive, displayPackages);
		}else{
			checkFile(displayPackages);
		}
	})
	.parse(process.argv);
