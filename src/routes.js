import { db } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';
import path from 'node:path';

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
            const { search } = req.query;
            const tasks = await db.select('tasks', search ? { title: search, description: search } : null);
            res.writeHead(200);
            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: async (req, res) => {
            const { id } = req.params;
            if (!id) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'ID is required' }));
            }
            const { title, description, completed_at } = req.body || {};
            if (title === undefined && description === undefined) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'Invalid body' }));
            }
            const task = await db.update('tasks', id, { title, description, completed_at });
            if (task) {
                res.writeHead(200);
                return res.end(JSON.stringify(task));
            }
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'Task not found' }));


        }

    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: async (req, res) => {
            const { id } = req.params;
            if (!id) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'ID is required' }));
            }
            const isDeleted = await db.delete('tasks', id);
            if (isDeleted) {
                res.writeHead(204);
                return res.end();
            }
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'Task not found' }));
        }
    }, {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: async (req, res) => {
            const { id } = req.params;
            if (!id) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'ID is required' }));
            }
            

            const task = await db.update('tasks', id, { completed_at: new Date().toISOString() });
            if (task) {
                res.writeHead(200);
                return res.end(JSON.stringify(task));
            }
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'Task not found' }));
        }
    }
];