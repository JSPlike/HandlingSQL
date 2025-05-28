import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProblemDetail() {
  const { id } = useParams();
  const [sql, setSql] = useState('');
  const [result, setResult] = useState(null);

  const executeSQL = async () => {
    const res = await axios.post('http://localhost:4000/api/execute', { sql });
    setResult(res.data);
  };

  return (
    <div>
      <textarea value={sql} onChange={e => setSql(e.target.value)} />
      <button onClick={executeSQL}>실행</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
