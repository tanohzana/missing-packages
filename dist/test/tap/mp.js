"use strict";

var common = require("../common-tap.js");
var path = require("path");
var mr = require('npm-registry-mock');
var fs = require('graceful-fs');
var test = require("tap").test;
var rimraf = require("rimraf");
var basePath = path.resolve(__dirname, path.basename(__filename, ".js"));
var fixturePath = path.resolve(basePath, "test-files");
var testDirPath = path.resolve(fixturePath, "test-mp");
var Tacks = require("tacks");
var File = Tacks.File;
var Dir = Tacks.Dir;

var jsFile1 = "require('uninstalledDep1')";
var jsFile2 = "require('dep1'); require('dep2')";
var jsFile3 = "require('dep1'); require('dep3')";
var jsFile4 = "require('underscore')";
var jsFile5 = "import x from 'underscore'";
var jsFile6 = "import { x, y, z } from \"underscore\"";

var server = void 0;

var cleanup = function cleanup() {
  rimraf.sync(basePath);
};

var withFixture = function withFixture(t, fixture, tester) {
  fixture.create(fixturePath);

  var removeAndDone = function removeAndDone(err) {
    if (err) throw err;
    fixture.remove(fixturePath);
    rimraf.sync(basePath);
    t.end();
  };

  tester(removeAndDone);
};

test("setup", function (t) {
  cleanup();

  mr({ port: common.port }, function (err, s) {
    t.ifError(err);
    server = s;
    t.end();
  });
});

test("mp check simple file", function (t) {
  var fixture = new Tacks(Dir({
    "test-mp": Dir({
      "package.json": File({
        name: "test-mp",
        version: "1.0.0",
        dependencies: {
          dep1: "installedDep1"
        }
      }),
      "file1.js": File(jsFile1)
    })
  }));

  withFixture(t, fixture, function (done) {
    common.mp(["check", "./file1.js"], {
      cwd: testDirPath
    }, function (err, code, stdout, stderr) {
      t.ifErr(err, "mp succeeded");
      t.equal(code, 0, "exit 0 on mp");
      // Removes special characters and emojis
      var message = stdout.trim().substr(3);
      t.same(message, "Package(s) to install: uninstalledDep1");
      done();
    });
  });
});

test("mp check simple file with es6 import default", function (t) {
  var fixture = new Tacks(Dir({
    "test-mp": Dir({
      "package.json": File({
        name: "test-mp",
        version: "1.0.0",
        dependencies: {
          dep1: "installedDep1"
        }
      }),
      "file5.js": File(jsFile5)
    })
  }));

  withFixture(t, fixture, function (done) {
    common.mp(["check", "./file5.js"], {
      cwd: testDirPath
    }, function (err, code, stdout, stderr) {
      t.ifErr(err, "mp succeeded");
      t.equal(code, 0, "exit 0 on mp");
      // Removes special characters and emojis
      var message = stdout.trim().substr(3);
      t.same(message, "Package(s) to install: underscore");
      done();
    });
  });
});

test("mp check simple file with es6 import", function (t) {
  var fixture = new Tacks(Dir({
    "test-mp": Dir({
      "package.json": File({
        name: "test-mp",
        version: "1.0.0",
        dependencies: {
          dep1: "installedDep1"
        }
      }),
      "file6.js": File(jsFile6)
    })
  }));

  withFixture(t, fixture, function (done) {
    common.mp(["check", "./file6.js"], {
      cwd: testDirPath
    }, function (err, code, stdout, stderr) {
      t.ifErr(err, "mp succeeded");
      t.equal(code, 0, "exit 0 on mp");
      // Removes special characters and emojis
      var message = stdout.trim().substr(3);
      t.same(message, "Package(s) to install: underscore");
      done();
    });
  });
});

test("mp c (check) simple file", function (t) {
  var fixture = new Tacks(Dir({
    "test-mp": Dir({
      "package.json": File({
        name: "test-mp",
        version: "1.0.0",
        dependencies: {
          dep1: "installedDep1"
        }
      }),
      "file1.js": File(jsFile1)
    })
  }));

  withFixture(t, fixture, function (done) {
    common.mp(["c", "./file1.js"], {
      cwd: testDirPath
    }, function (err, code, stdout, stderr) {
      t.ifErr(err, "mp succeeded");
      t.equal(code, 0, "exit 0 on mp");
      // Removes special characters and emojis
      var message = stdout.trim().substr(3);
      t.same(message, "Package(s) to install: uninstalledDep1");
      done();
    });
  });
});

test("mp check folder", function (t) {
  var fixture = new Tacks(Dir({
    "test-mp": Dir({
      "package.json": File({
        name: "test-mp",
        version: "1.0.0",
        dependencies: {
          dep1: "installedDep1"
        }
      }),
      "file2.js": File(jsFile2),
      "file3.js": File(jsFile3)
    })
  }));

  withFixture(t, fixture, function (done) {
    common.mp(["check", "."], {
      cwd: testDirPath
    }, function (err, code, stdout, stderr) {
      t.ifErr(err, "mp succeeded");
      t.equal(code, 0, "exit 0 on mp");
      // Removes special characters and emojis
      var message = stdout.trim().substr(3);
      t.same(message, "Package(s) to install: dep2,dep3");
      done();
    });
  });
});

test("mp check folder but all installed", function (t) {
  var fixture = new Tacks(Dir({
    "test-mp": Dir({
      "package.json": File({
        name: "test-mp",
        version: "1.0.0",
        dependencies: {
          dep1: "installedDep1",
          dep2: "installedDep2",
          dep3: "installedDep3"
        }
      }),
      "file2.js": File(jsFile2),
      "file3.js": File(jsFile3)
    })
  }));

  withFixture(t, fixture, function (done) {
    common.mp(["check", "."], {
      cwd: testDirPath
    }, function (err, code, stdout, stderr) {
      t.ifErr(err, "mp succeeded");
      t.equal(code, 0, "exit 0 on mp");
      // Removes special characters and emojis
      var message = stdout.trim().substr(2);
      t.same(message, "No package to install");
      done();
    });
  });
});

test("mp install missing deps in file", function (t) {
  var runner = void 0;

  var fixture = new Tacks(Dir({
    "test-mp": Dir({
      "package.json": File({
        name: "test-mp",
        version: "1.0.0",
        dependencies: {
          dep1: "installedDep1"
        }
      }),
      "file4.js": File(jsFile4)
    })
  }));

  withFixture(t, fixture, function (done) {
    runner = common.mp(["install", "file4.js"], {
      cwd: testDirPath
    }, function (err, code, stdout, stderr) {
      t.ifErr(err, "mp install succeeded");
      t.equal(code, 0, "exit 0 on mp install");
      var packageJsonPath = path.resolve(testDirPath, "package.json");
      var installedDeps = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")).dependencies;
      var expected = ["dep1", "underscore"];

      t.same(Object.keys(installedDeps), expected);
      done();
    });

    var remaining = 3;

    runner.stdout.on("data", function (chunk) {
      remaining--;

      if (remaining === 2) {
        runner.stdin.write("y");
        runner.stdin.end();
      } else if (remaining === 0) {
        // Removes special characters and emojis
        var message = chunk.toString('utf8').trim().substr(2);
        t.equal(message, "Packages installed !");
      }
    });
  });
});

test("cleanup", function (t) {
  server.close();
  cleanup();
  t.end();
});