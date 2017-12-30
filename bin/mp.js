#! /usr/bin/env node

var fs = require('fs');
var shell = require('shelljs');
var inquirer = require('inquirer');

var packagesToAbsInstall = [];

var installPackages = function(packages, installed){
	let toInstallQuestions = [];

	packages.forEach(async (p) => {
		if(!installed.includes(p)){
			toInstallQuestions.push({
			    type: 'confirm',
			    name: p,
			    message: 'Install package \x1b[32m'+p+'\x1b[0m ?',
			    default: false
			});
		}
	})

	inquirer.prompt(toInstallQuestions).then(answers => {
		let toInstall = [];

		for(let p in answers){
			if(answers[p]){
				installOnePackage(p)
			}
		}
	});
}

var displayPackages = function(packages, installed){
	let display = [];

	packages.forEach(async (p) => {
		if(!installed.includes(p)){
			display.push(p);
		}
	})

	console.log("Packages to install: ",display);
}

var installOnePackage = function(package){
	shell.exec('npm install --save '+package);
}

var extractPackagesToInstall = function(fileContent){
	
	let packages2 = fileContent.match(/require\(["'][A-Za-z0-9_-]+['"]\)/gi);

	if(packages2 && packages2.length > 0){
		for(let i in packages2){
			packages2[i] = packages2[i].substr(9,packages2[i].length-11);
		}
	}else{
		console.log("No packages to install");
	}

	return packages2;
}

var checkDirectory = function(args, cb){
	let path = process.cwd()+"/"+args[1];
	let packages = [];

	try{
		if(fs.lstatSync(path).isDirectory()){
			fs.readdirSync(path).forEach(file => {
				if(file.match(/.js/g) && !file.match(/.json/g)){
					console.log("Checking "+path+"/"+file);
				  	let file2 = fs.readFileSync(path+"/"+file,'utf8');

				  	let newPackages = extractPackagesToInstall(file2);

				  	if(newPackages)
						packages = packages.concat(newPackages);
				}
			});

			getPackageJson("package.json", packages, 0, cb);
		}else{
			fs.readFile(path,'utf8', (err, file) => {
				if(err){
					console.log(err);
				}else{
					let packages = extractPackagesToInstall(file);
					getPackageJson("package.json", packages, 0, cb);
				}
			});
		}
	}catch(e){
		if(e.message.substr(0,6) == "ENOENT"){
			console.log("No such file or directory");
		}else{
			console.log(e);
		}
	}
}


var getPackageJson = function(packagePath, packages, cpt, cb){
	fs.readFile(process.cwd()+"/"+packagePath,'utf8', (err, file2) => {
		if(err){
			console.log("Going up ..");
			cpt++;
			if(cpt<5){
				getPackageJson("../"+packagePath, packages, cpt, cb)
			}else{
				console.log("No package.json");
			}
		}else{
			let installed = JSON.parse(file2).dependencies || {'':''};
			cb(packages, Object.keys(installed));
		}
	});
}


var checkFile = function(cb){
	fs.readFile(process.cwd()+"/package.json",'utf8', (err, file2) => {
		if(err){
			console.log(err);
		}else{
			let installed = JSON.parse(file2).dependencies || {};
			let main = JSON.parse(file2).main || '';

			if(installed && main){
				let path = process.cwd()+"/"+main;

				fs.readFile(path,'utf8', (err, file) => {
					if(err){
						console.log(err);
					}else{
						let packages = extractPackagesToInstall(file);
						cb(packages, Object.keys(installed));
					}
				})
			}
		}
	});
}

var run = function(){
	var args = process.argv.slice(2);

	if(args[0] == "--install" || args[0] == "-i"){
		if(args[1]){
			checkDirectory(args, installPackages)
		}else{
			checkFile(installPackages)
		}
	}else if(args[0] == "--check" || args[0] == "-c"){
		if(args[1]){
			checkDirectory(args, displayPackages)
		}else{
			checkFile(displayPackages)
		}
	}else{
		checkFile(installPackages);
	}
}

run();