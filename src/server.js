import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    await json(req, res)
    const route = routes.find(route => route.method === method && route.path === url);

    if (route) {
        return route.handler(req, res);
    }
    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'Not found' }));

});


server.listen(3000)