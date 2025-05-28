import { useState } from 'react';
import axios from 'axios';

export default function SQLPlayground() {
  const [sql, setSql] = useState('SELECT * FROM users');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const execute = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/execute', { sql });
      setResult(res.data.rows);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SQL 실행</h2>
      <textarea rows={6} value={sql} onChange={e => setSql(e.target.value)} style={{ width: '100%' }} />
      <button onClick={execute}>실행</button>
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
      {error && (
        <div style={{ color: 'red' }}>{error}</div>
      )}
    </div>
  );
}
