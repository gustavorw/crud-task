import { parse } from "csv-parse";
import { parseCsvToTasks } from "../utils/parser-csv-to-taks.js";

async function json(req, res) {
    const contentType = req.headers['content-type'] ?? '';
    if (contentType.startsWith('text/csv')) {
        const buffer = []

        for await (const chunk of req) {
            buffer.push(chunk)
        }
        const csvString = Buffer.concat(buffer).toString('utf-8');
        const body =  await parseCsvToTasks(csvString);
        req.body = body
    } else {

        const buffer = []

        for await (const chunk of req) {
            buffer.push(chunk)
        }
        try {
            req.body = JSON.parse(Buffer.concat(buffer).toString())
        } catch {
            req.body = null;
        }
    }

    res.setHeader('Content-Type', 'application/json');
}


export { json };