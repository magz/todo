"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
/**
 * Home page.
 * @route GET /home
 */
const home = (req, res) => {
    res.render("home", {
        title: "home"
    });
};
exports.home = home;
//# sourceMappingURL=home.js.map