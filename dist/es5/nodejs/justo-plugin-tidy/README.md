Clean up your Web pages with *HTML TIDY*.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-tidy
```

Dependencies:

- *TIDY* must be installed.

## Task

To use TIDY, we must invoke the task as follows:

```
tidy(opts, config)
```

The `config` options:

- `src` (string or string[]). The source files.
- `path` (string). Directory where TIDY is installed if not in PATH.
- `config` (string). Configuration file.
- `modify` (boolean). Modify the source files. Default: `false`.
- `ignore` (string or string[]). Exclude the specified files.
- `output` (boolean). Show the TIDY output. Default: `true`.

Example:

```
const tidy = require("justo-plugin-tidy");

tidy("Check HTML code", {
  src: "app/",
  path: "C:\\opt\\tidy\\bin\\"
});
```
