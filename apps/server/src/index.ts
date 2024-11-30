import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import db from './db.js';

const app = new Hono();

const store = {
    count: 0
}

app.get('/', (c) => {
    return c.json({
        data: store.count,
    });
});
app.post('/', (c) => {
    store.count++;
    return c.json({
        data: store.count,
    });
});


app.post('/email', async (c) => {
    const res = await db.user.create({
        data: {
            email: 'daqidaqi@qq.com',
            name: 'daqidaqi',
        }
    })
    return c.json({
        data: res,
    });
});

app.get('/emails', async (c) => {
    const allUsers = await db.user.findMany();
    const emails = allUsers.map((x) => x.email);
    return c.json({
        data: emails,
    });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
