This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Note: If there is no node_modules, Run
 
#### `npm install` (In both root and server directory)

*** User/Cient section ***
In the project directory (rootDirectory), you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Note: Change proxy in action based on which server you are using. If you use server with firebase then use 8080 as port, or use 8081 for server with mysql.


*** Server section with firebase database ***
In the project server directory (rootDirectory/server), you can run:

### `npm start` or `yarn start`

It will run with the port 8080. And you can access server api in postman using root access url (http://localhost:8080).


*** Server section with mysql database ***
In the project server directory (rootDirectory/server), you can run:

### `npm start` or `yarn start`

It will run with the port 8081. And you can access server api in postman using root access url (http://localhost:8081).


*** To test run ***
To run test run below commands in cmd
### `npm test` or `yarn test`