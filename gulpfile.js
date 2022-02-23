const del = require("del");
const { task, series, watch, src, dest } = require("gulp");
const rollup = require("gulp-rollup");

task("clean", () => del(["dist/*"]));

task(
  "build",
  series([
    "clean",
    () =>
      src("src/*")
        .pipe(
          rollup({
            input: "src/index.mjs",
            output: {
              format: "es",
              file: "index.mjs",
            },
          })
        )
        .pipe(dest("dist")),
  ])
);

task(
  "default",
  series([
    "build",
    () => {
      watch(["src/*"], series(["build"]));
    },
  ])
);
