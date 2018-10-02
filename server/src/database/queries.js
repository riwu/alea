const mysql = require('promise-mysql');

const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'alea',
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = {
  getUser: email => conn.query('SELECT id, password FROM User WHERE email = ?', email).then(user => user[0]),
  addUser: user => conn.query('INSERT INTO User SET ?', user),
  updateUser: (userId, user) => conn.query('UPDATE User SET ? WHERE id = ?', [
    {
      ...user,
      adaptabilities: JSON.stringify(user.adaptabilities),
    },
    userId,
  ]),
  getUserInfo: userId => conn.query('SELECT displayName, adaptabilities FROM User WHERE id = ?', userId).then(rows => ({
    ...rows[0],
    adaptabilities: JSON.parse((rows[0] || {}).adaptabilities || null),
  })),

  getHacks: () => conn.query('SELECT text, categories FROM Hack').then(rows => rows.map(row => ({
    ...row,
    categories: JSON.parse(row.categories),
  }))),
  submitHack: (userId, hack) => conn.query('INSERT INTO Hack SET User_id = ?, text = ?, categories = ?', [
    userId,
    hack.text,
    JSON.stringify(hack.categories),
  ]),

  addTeamMember: (userId, member) => conn.query('INSERT INTO TeamMember SET ?', { ...member, User_id: userId }),
  getTeamMembers: userId => conn.query('SELECT id, name, email FROM TeamMember WHERE User_id = ?', userId),
};
