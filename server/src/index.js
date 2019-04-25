import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import employees from './routes/employees';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json({ limit: "50mb"}));
app.use(cors());

app.use("/api/employees", employees);

app.get("/*", (req, res) => {
    res.json("Page not found")
});

app.listen(8080, () => console.log("Listen port 8080"));