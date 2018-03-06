#! /usr/bin/env node

const fs = require("fs");
const shell = require("shelljs");
const inquirer = require("inquirer");
const program = require("commander");

let packages = [];
let gblPath = "";
let args = [];
let recursive = false;
let programVersion = "1.4.1";

// Prompts the user before installing missing packages
let installPackages = function(packages, installed) {
	let toInstallQuestions = [];

	packages.forEach(p => {
		if (!installed.includes(p)) {
			toInstallQuestions.push({
				type: "confirm",
				name: p,
				message: "Install package \x1b[32m" + p + "\x1b[0m ?",
				default: false
			});
		}
	});

	inquirer.prompt(toInstallQuestions).then(answers => {
		for (let p in answers) {
			if (answers[p]) {
				installOnePackage(p);
			}
		}
	});
};

// Displays packages given in parameters
let displayPackages = function(packagesToShow, installed) {
	let display = [];

	packagesToShow.forEach(p => {
		if (!installed.includes(p)) {
			display.push(p);
		}
	});

	console.log("Packages to install: ", display);
};

// Installs a single package
let installOnePackage = function(uniquePackage) {
	shell.exec("npm install --save " + uniquePackage);
};

// Finds all packages to install in a file
let extractPackagesToInstall = function(fileContent) {
	let packages2 = fileContent.match(/require\(["'][A-Za-z0-9_-]+['"]\)/gi);

	if (packages2 && packages2.length > 0) {
		for (let i in packages2) {
			packages2[i] = packages2[i].substr(9, packages2[i].length - 11);
		}
	} else {
		console.log("No packages to install");
	}

	return packages2;
};

// Checks all files in a directory
let checkDirectory = function(path, cb) {
	try {
		if (fs.lstatSync(path).isDirectory()) {
			fs.readdirSync(path).forEach(file => {
				if (file.match(/\.js/g) && !file.match(/\.json/g)) {
					let file2 = fs.readFileSync(path + "/" + file, "utf8");

					let newPackages = extractPackagesToInstall(file2);

					if (newPackages) {
						newPackages.forEach(p => {
							if (!packages.includes(p)) {
								packages.push(p);
							}
						});
					}
				} else if (
					fs.lstatSync(path + "/" + file).isDirectory() &&
                    file != "node_modules"
				) {
					if (recursive) {
						checkDirectory(path + "/" + file, cb);
					}
				}
			});

			if (path == gblPath) {
				getPackageJson("package.json", packages, 0, cb);
			}
		} else {
			fs.readFile(path, "utf8", (err, file) => {
				if (err) {
					console.log(err);
				} else {
					let packages = extractPackagesToInstall(file);
					getPackageJson("package.json", packages, 0, cb);
				}
			});
		}
	} catch (e) {
		if (e.message.substr(0, 6) == "ENOENT") {
			console.log("No such file or directory");
		} else {
			console.log(e);
		}
	}
};

// Does everything it can to find a package.json, even in parent dirs
let getPackageJson = function(packagePath, packages, cpt, cb) {
	fs.readFile(process.cwd() + "/" + packagePath, "utf8", (err, file2) => {
		if (err) {
			cpt++;
			if (cpt < 5) {
				getPackageJson("../" + packagePath, packages, cpt, cb);
			} else {
				console.log("No package.json");
			}
		} else {
			let installed = JSON.parse(file2).dependencies || { "": "" };
			cb(packages, Object.keys(installed));
		}
	});
};

// Checks a file before deciding weither to install or display
let checkFile = function(cb) {
	fs.readFile(process.cwd() + "/package.json", "utf8", (err, file2) => {
		if (err) {
			console.log(
				"\nIt seems like the file was not found. Stop messing with me please :-)\n\n",
				err
			);
		} else {
			let installed = JSON.parse(file2).dependencies || {};
			let main = JSON.parse(file2).main || "";

			if (installed && main) {
				let path = process.cwd() + "/" + main;

				fs.readFile(path, "utf8", (err, file) => {
					if (err) {
						console.log(
							"\nIt seems like the file was not found. Stop messing with me please :-)\n\n",
							err
						);
					} else {
						let packages = extractPackagesToInstall(file);
						cb(packages, Object.keys(installed));
					}
				});
			}
		}
	});
};


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
			gblPath = process.cwd() + "/" + file;
			recursive = true;
			checkDirectory(process.cwd() + "/" + file, installPackages);
		}else if (program.install) {
			gblPath = process.cwd() + "/" + file;
			checkDirectory(process.cwd() + "/" + args[1], installPackages);
		} else if (program.check && program.recursive) {
			gblPath = process.cwd() + "/" + file;
			recursive = true;
			checkDirectory(process.cwd() + "/" + file, displayPackages);
		}else if (program.check) {
			gblPath = process.cwd() + "/" + file;
			checkDirectory(process.cwd() + "/" + file, displayPackages);
		}else{
			checkFile(displayPackages);//installPackages);
		}
	})
	.parse(process.argv);
