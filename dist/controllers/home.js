"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = exports.index = void 0;
/**
 * Home page.
 * @route GET /
 */
const index = (req, res) => {
    res.send('Hello Index Page!');
};
exports.index = index;
const home = (req, res) => {
    res.render("home", {
        title: "home"
    });
};
exports.home = home;
//# sourceMappingURL=home.js.map