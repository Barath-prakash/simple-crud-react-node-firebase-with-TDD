import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import UsersRoute from './routes/usersRoute'

let app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())

app.use("/api/employees", UsersRoute)

app.use((req, res) => {
	res.status(404).json({
		errors: {
			global: "Page Not Found."
		}
	})
})

// require('../src/routes/students.js')(app);

let port = process.env.PORT || 8081;

app.listen(port, () => console.log('Running on localhost:'+port));
// module.exports = app;
