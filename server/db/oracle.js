const oracledb = require('oracledb');

const dbConfig = {
  user: 'app',
  password: 'app123',
  connectString: 'localhost:1521/XEPDB1',
};

async function executeSQL(sql) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (e) {
        console.error(e);
      }
    }
  }
}

module.exports = { executeSQL };
