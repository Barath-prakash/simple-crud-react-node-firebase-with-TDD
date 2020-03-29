var mysql = require('mysql');
var connection = mysql.createConnection({
				  host: 'localhost',
				  user: 'root',
				  password: '1234@test',
				  database: 'testDatabase'
				});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;