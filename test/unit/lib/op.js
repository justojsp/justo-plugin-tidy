//imports
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../dist/es5/nodejs/justo-plugin-tidy/lib/op").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";

  test("op(config) - valid file", function() {
    op([{
      src: path.join(DATA, "valid/page1.html"),
      path: "C:\\opt\\tidy\\bin\\"
    }]).must.be.eq(0);
  });

  test("op(config) - one invalid file", function() {
    op([{
      src: path.join(DATA, "invalid/page1.html"),
      path: "C:\\opt\\tidy\\bin\\"
    }]).must.be.eq(1);
  });

  test("op(config) - several invalid files", function() {
    op([{
      src: [path.join(DATA, "invalid/page1.html"), path.join(DATA, "invalid/page2.html")],
      path: "C:\\opt\\tidy\\bin\\"
    }]).must.be.eq(1);
  });

  test("op(config) - dir", function() {
    op([{
      src: path.join(DATA, "invalid"),
      path: "C:\\opt\\tidy\\bin\\"
    }]).must.be.eq(1);
  });

  test("op(config) - output:false", function() {
    op([{
      src: path.join(DATA, "invalid"),
      path: "C:\\opt\\tidy\\bin\\",
      output: false
    }]).must.be.eq(1);
  });

  test("op(config) - ignore", function() {
    op([{
      path: "C:\\opt\\tidy\\bin\\",
      src: path.join(DATA, "invalid"),
      ignore: path.join(DATA, "invalid/page1.html")
    }]).must.be.eq(1);
  });

  test("op(config) - tidy.conf (show-warnings: no)", function() {
    op([{
      path: "C:\\opt\\tidy\\bin\\",
      src: path.join(DATA, "invalid"),
      config: path.join(DATA, "tidy.conf")
    }]).must.be.eq(1);
  });
})();
