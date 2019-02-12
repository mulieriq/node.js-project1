const path = require('path');

exports.error = (req, res, next) => {
    res.status(404).render(path.join(__dirname,'../', "views", "html", "404"));
}