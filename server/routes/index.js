const express = require('express');
const router = express.Router();
const db = require('../db/oracle'); // Oracle 연결 (미리 설정)

router.post('/execute', async (req, res) => {
  const { sql } = req.body;
  try {
    const result = await db.executeSQL(sql);

    const plan = await db.getExecutionPlan(sql);

    res.json({ result, plan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
