import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SQLPlayground from './pages/SQLPlayground';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SQLPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
