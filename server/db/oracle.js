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

async function getExecutionPlan(sql) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // 1. 실행 계획을 PLAN_TABLE에 저장
    await connection.execute(`EXPLAIN PLAN FOR ${sql}`);

    // 2. 저장된 실행 계획 출력
    const planResult = await connection.execute(
      `SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY())`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return planResult.rows.map(row => Object.values(row).join(' ')).join('\n');

  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { executeSQL, getExecutionPlan};
