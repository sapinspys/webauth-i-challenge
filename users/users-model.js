const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

// SESSIONS
function find() {
  return db('users').select('id', 'username').orderBy("id");
}

// JWT
// function find(department) {
//   const query = db('users').select('id', 'username', 'department');

//   if (department) {
//     query.where({ department });
//   }

//   return query;
// }

function findBy(filter) {
  return db('users').where(filter).then(user => {
    if(user.length) {
      return user[0]
    } else {
      return null
    }
  });
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
