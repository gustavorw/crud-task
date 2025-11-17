import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

class Database {
    async read() {
        try {
            const data = await fs.readFile(databasePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            throw err;
        }
    }

    async write(data) {
        await fs.writeFile(databasePath, JSON.stringify(data, null, 2));
    }
    async insert(table, data) {
        const db = await this.read();

        if (!db[table]) db[table] = [];

        const row = { ...data, created_at: new Date().toISOString(), completed_at: null, updated_at: null };

        db[table].push(row);

        await this.write(db);

        return row;
    }
    async select(table) {
        const db = await this.read();
        return db[table] || [];
    }
}

const db = new Database();

export { db };