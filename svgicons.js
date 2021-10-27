const fs = require("fs"),
    path = require("path"),
    svgstore = require("svgstore");

const sprites = svgstore({ copyAttrs: true });
const prefix = "./website/static/img";
//passsing directoryPath and callback function
fs.readdir(prefix + "/icons", function (err, files) {
    //handling error
    if (err) {
        return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        sprites.add(
            path.basename(file, ".svg"),
            fs.readFileSync(prefix + "/icons/" + file, "utf8")
        );
    });

    fs.writeFileSync(prefix + "/sprites.svg", sprites.toString());
});
