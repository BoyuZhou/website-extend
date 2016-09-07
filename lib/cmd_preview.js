var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var fs = require('fs');
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
    html: true,
    langPrefix: 'code-'
});

module.exports = function (dir) {
    dir = dir || '.';

    var app = express();
    var router = express.Router();
    app.use('/assets', serveStatic(path.resolve(dir, 'assets')));
    app.use(router);

    router.get('/posts/*', function (req, res, next) {
        var name = stripExtname(req.params[0]);
        var file = path.resolve(dir, 'posts', name + '.md');
        fs.readFile(file, function (err, content) {
            if (err) return next(err);
            var html = markdownToHTML(content.toString());
            res.end(html);
        });
    });

    router.get('/', function (req, res, next) {
        res.end('ндубап╠М');
    });

    app.listen(3000);


};

function stripExtname (name) {
    var i = 0 - path.extname(name).length;
    if (i === 0) i = name.length;
    return name.slice(0, i);
}

function markdownToHTML (content) {
    return md.render(content || "");
}

function parseSourceContent (data) {
    var split = '---\n';
    var i = data.indexOf(split);
}