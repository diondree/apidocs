const { task, src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const render = require("gulp-nunjucks-render");
const nunjucks = require("gulp-nunjucks");

function generateHtml() {
    return src(`./src/templates/doc.njk`)
        .pipe(nunjucks.compile({ title: "Testing" }))
        .pipe(
            render({
                path: `./`
            })
        )
        .pipe(dest("output"));
}

function styles() {
    return src(`./src/templates/css/*.css`).pipe(dest("output/css"));
}

function scripts() {
    return src("./src/templates/js/*.js")
        .pipe(uglify())
        .pipe(dest("output/js"));
}

module.exports = async function(json) {
    try {
        task("clean", () => del(["output"]));
        task(generateHtml());
        task(styles());
        task(scripts());

        console.log("done");
    } catch (err) {
        console.log(err);
        throw err;
    }
};
