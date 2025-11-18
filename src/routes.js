import { db } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: async (req, res) => {
            const { title, description, } = req.body || {};

            if (!title || !description) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'Invalid body' }));
            }

            const task = await db.insert('tasks', { id: randomUUID(), title, description });

            res.writeHead(201);
            return res.end(JSON.stringify(task));
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: async (req, res) => {
            const {search} = req.query;
            const tasks = await db.select('tasks', search ? {title: search, description: search } : null);
            res.writeHead(200);
            return res.end(JSON.stringify(tasks));
        }
    },
];