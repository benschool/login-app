const mongoose = require('mongoose');
const LOCAL_URL = 'mongodb://localhost:27017/simple_login';
const crypto = require('crypto');

mongoose.connect(LOCAL_URL);
mongoose.connection.on('open', () => { console.log('Connected to the database') });

const LoginsSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Login = mongoose.model('Logins', LoginsSchema);

module.exports = { Login };