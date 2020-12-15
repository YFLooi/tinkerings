//The shorthand way to export modules
//Cannot use in same file with vanilla way to export modules, i.e. with modules.export={...}
exports.add = (a, b) => {
    return a+b;
}
exports.multiply = (a, b) => {
    return a*b;
}