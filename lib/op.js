//imports
import os from "os";
import path from "path";
import child_process from "child_process";
import * as fs from "justo-fs";

/**
 * Task operation.
 */
export default function op(params) {
  var cmd, args = [], res;

  //(1) arguments
  if (params.length === 0) {
    params = {src: []};
  } else if (params.length >= 1) {
    params = params[0];
  }

  if (typeof(params.src) == "string") params.src = [params.src];
  if (typeof(params.ignore) == "string") params.ignore = [params.ignore];
  if (!params.hasOwnProperty("output")) params.output = true;

  //(2) determine command
  if (/^win/.test(os.platform())) cmd = "tidy.exe";
  else cmd = "tidy";

  if (params.path) cmd = path.join(params.path, cmd);

  if (params.modify) args.push("-modify");
  else args.push("-errors");

  if (params.config) {
    args.push("-config");
    args.push(params.config);
  }

  //(3) run
  for (let file of params.src) {
    let entry = fs.entry(file);

    if (entry instanceof fs.File) res = checkFile(entry);
    else if (entry instanceof fs.Dir) res = checkDir(entry);
  }

  //(4) return
  return res.status;

  //helper
  function checkFile(entry) {
    var res;

    //(1) pre
    if (params.ignore) {
      for (let i of params.ignore) {
        if (path.normalize(entry.path).startsWith(path.normalize(i))) return;
      }
    }

    //(2) check
    res = child_process.spawnSync(cmd, args.concat(entry.path));

    if (params.output) {
      let msg;

      msg = res.stdout.toString();
      if (msg !== "") console.log(msg);

      msg = res.stderr.toString();
      if (msg !== "") {
        let header = false;

        for (let line of msg.split("\n")) {
          if (/^line .+/.test(line)) {
            if (!header) {
              console.log(">", entry.path);
              header = true;
            }

            console.log(line);
          }
        }
      }
    }

    //(3) return
    return res;
  }

  function checkDir(entry) {
    let res;

    for (let e of entry.entries) {
      if (e instanceof fs.File) res = checkFile(e);
      else if (e instanceof fs.Dir) res = checkDir(e);
    }

    return res;
  }
}
