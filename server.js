var http = require('http');
const app = require('./app.js')

const PORT = process.env.PORT || 3000;

var httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
