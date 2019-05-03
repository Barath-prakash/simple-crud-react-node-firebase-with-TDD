import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import employees from './routes/employees';

import SERVER from './schema.js';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({ limit: "50mb"}));
app.use(cors());

app.use("/api/employees", employees);

// Middleware: GraphQL
SERVER.applyMiddleware({ app: app });

app.get("/*", (req, res) => {
    res.json("Page not found")
});

app.listen(8080, () => console.log("Listen port 8080"));