//Not actually a server, but using to clear a port binding issue on Heroku
var http = require('http');
http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('it is running\n'); })
.listen(process.env.PORT || 5000);

setInterval(function() {
    http.get("http://calm-meadow-67261.herokuapp.com");
}, 300000);