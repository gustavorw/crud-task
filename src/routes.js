import { db } from './database.js';
import { randomUUID } from 'node:crypto';

export const routes = [
    {
        method: 'POST',
        path: '/tasks',
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
        path: '/tasks',
        handler: async (req, res) => {
            const tasks = await db.select('tasks');
            res.writeHead(200);
            return res.end(JSON.stringify(tasks));
        }
    },
];