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

  getFeedbackRequesterInfo: userId => conn.query('SELECT displayName, email FROM User WHERE id = ?', userId).then(rows => rows[0]),
  createFeedbackToken: memberId => conn
    .query('INSERT INTO FeedbackToken SET TeamMember_id = ?', memberId)
    .then(({ insertId }) => conn.query('SELECT token, TeamMember_id AS id FROM FeedbackToken WHERE id = ?', insertId))
    .then(rows => rows[0]),

  getMemberEmails: (userId, ids) => conn.query('SELECT id, email FROM TeamMember WHERE User_id = ? AND id IN (?)', [userId, ids]),

  getFeedbackRequestInfo: token => conn
    .query(
      `SELECT User.displayName AS requesterName, User.email AS requesterEmail, TeamMember.name AS teamMemberName, TeamMember.email AS teamMemberEmail 
       FROM FeedbackToken
       JOIN TeamMember ON FeedbackToken.TeamMember_id = TeamMember.id 
       JOIN User ON TeamMember.User_id = User.id
       WHERE FeedbackToken.token = ?`,
      token,
    )
    .then(rows => rows[0]),

  postFeedback: (token, adaptabilities, comments) => conn.query(
    `INSERT INTO Feedback SET adaptabilities = ?, comments = ?, TeamMember_id = 
     (SELECT TeamMember_id FROM FeedbackToken WHERE token = ?)`,
    [JSON.stringify(adaptabilities), comments, token],
  ),

  getFeedback: userId => conn
    .query(
      `SELECT Feedback.id, Feedback.adaptabilities FROM Feedback
       JOIN TeamMember ON Feedback.TeamMember_id = TeamMember.id 
       JOIN User ON TeamMember.User_id = User.id AND User.id = ?`,
      userId,
    )
    .then(rows => rows.map(row => ({
      ...row,
      adaptabilities: JSON.parse(row.adaptabilities),
    }))),

  deleteFeedbackToken: token => conn.query('DELETE FROM FeedbackToken WHERE token = ?', token),

  getHacks: () => conn.query('SELECT id, text, categories, User_id AS userId FROM Hack').then(rows => rows.map(row => ({
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
  deleteTeamMembers: (userId, memberIds) => conn.query('DELETE FROM TeamMember WHERE User_id = ? AND id IN (?)', [userId, memberIds]),
  getScores: () => conn.query(
    `SELECT User.id, COALESCE(JSON_LENGTH(User.adaptabilities), 0) + COALESCE(SUM(JSON_LENGTH(Feedback.adaptabilities)), 0) AS score 
     FROM User 
     JOIN TeamMember ON User.id = TeamMember.User_id
     JOIN Feedback ON TeamMember.id = Feedback.TeamMember_id 
     GROUP BY User.id`,
  ),
};
