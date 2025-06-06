import { useState } from 'react';
import axios from 'axios';
import '../static/css/SqlPlayground.css';

export default function SQLPlayground() {
  const [sql, setSql] = useState('SELECT * FROM TEST_USERS FETCH FIRST 100 ROWS ONLY');
  const [result, setResult] = useState(null);
  const [plan, setPlan] = useState(null); // 실행계획 저장용
  const [error, setError] = useState(null);

  const execute = async () => {
    try {
      console.log("쿼리 실행 ===");
      const res = await axios.post('http://localhost:4000/api/execute', { sql }, { withCredentials: true });
      const dataToSets = res.data.result|| res.data;
      const dataPlan = res.data.plan;

      console.log(res.data.plan)
      setResult(dataToSets);
      setPlan(dataPlan);  // 실행계획 저장
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setResult(null);
    }
  };

    function renderTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return <div>데이터가 없습니다.</div>;
    }

    const keys = Object.keys(data[0]);

    return (
      <table className="result-table">
        <thead>
          <tr>
            {keys.map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {keys.map(key => (
                <td key={key}>{row[key]?.toString() || ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    
    <div className="container">
      <h2>SQL 실행</h2>
      <textarea 
        className="sql-textarea"
        placeholder="SQL 쿼리를 입력하세요..."
        value={sql}
        onChange={e => setSql(e.target.value)}
        rows={6}
      />
      <button className="execute-btn" onClick={execute}>실행</button>
      
      <div className="result-section">
        <p className="section-title">Data to JSON</p>
        {result && <pre className="json-box">{JSON.stringify(result, null, 2)}</pre>}
      </div>
      
      <div className="result-section">
        <p className="section-title">Data to Table</p>
        {result && <div className="table-box">{renderTable(result)}</div>}
      </div>
      
      <div className="result-section">
        <p className="section-title">실행 계획 (Execution Plan)</p>
        {plan && <pre className="plan-box">{plan}</pre>}
      </div>
      
      {error && <div className="error-box">{error}</div>}

    </div>

  );
}
