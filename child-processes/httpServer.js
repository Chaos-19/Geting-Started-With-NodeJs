const http = require("http");
const { fork } = require("child_process");

const host = "localhost";
const port = 8000;

const slowFunction = () => {
    let counter = 0;
    while (counter < 5000000000) {
        counter++;
    }
    return counter;
};

const requestListener = function (req, res) {
    if (req.url === "/total") {
        const child = fork(__dirname + "/getCount.js");

        child.on("message", message => {
            console.log("Returning /total results");
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(message);
        });
        child.send("START");
    } else if (req.url === "/hello") {
        console.log("Returning /hello results");
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(`{"message":"hello"}`);
    }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
