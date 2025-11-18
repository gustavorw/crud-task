import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    await json(req, res)
    const route = routes.find(route => route.method === method && route.path.test(url));

    if (route) {
        const queryParams = req.url.match(route.path);
        const {query, ...params} = queryParams.groups;
        req.query = query ? extractQueryParams(query) : {};
        req.params = params;
        return route.handler(req, res);
    }
    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'Not found' }));

});


server.listen(3000)