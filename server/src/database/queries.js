const mysql = require('promise-mysql');

const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'alea',
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = {
  getUser: email => conn.query('SELECT id, password FROM user WHERE email = ?', email).then(user => user[0]),
  addUser: user => conn.query('INSERT INTO user SET ?', user),

  getHacks: () => conn.query('SELECT text, categories FROM hack').then(rows => rows.map(row => ({
    ...row,
    categories: JSON.parse(row.categories),
  }))),
  submitHack: (userId, hack) => conn.query('INSERT INTO hack SET user_id = ?, text = ?, categories = ?', [
    userId,
    hack.text,
    JSON.stringify(hack.categories),
  ]),
};