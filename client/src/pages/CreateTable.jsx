// src/pages/CreateTable.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultColumn = { name: '', type: 'VARCHAR2', length: '', notNull: false, primaryKey: false };

function CreateTable() {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([ { ...defaultColumn } ]);
  const [message, setMessage] = useState('');

  const handleAddColumn = () => setColumns([...columns, { ...defaultColumn }]);

  const handleRemoveColumn = (index) => {
    const newCols = [...columns];
    newCols.splice(index, 1);
    setColumns(newCols);
  };

  const handleChange = (index, field, value) => {
    const newCols = [...columns];
    newCols[index][field] = field === 'notNull' || field === 'primaryKey' ? value.target.checked : value;
    setColumns(newCols);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/createNewTable', {
        tableName,
        columns
      }, { withCredentials: true });

      setMessage(res.data.message || '테이블 생성 성공!');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || '에러 발생');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <h3 className="mb-4">🛠️ 새 테이블 만들기</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label className='col-sm-2 col-form-label'>테이블 이름</label>
          <div className="col-sm-10">
            <input className="col form-control" value={tableName} onChange={(e) => setTableName(e.target.value)} required />
          </div>
        </div>

        {columns.map((col, index) => (
          <div key={index} className="position-relative border p-3 mb-3 rounded">
            <button
              type="button"
              className="btn btn-sm btn-outline-black position-absolute"
              style={{ top: '2px', right: '2px', padding: '2px 6px' }}
              onClick={() => handleRemoveColumn(index)}
            >
              ×
            </button>
            <div className="row">
              <div className="col">
                <input className="form-control" placeholder="컬럼명" value={col.name} onChange={(e) => handleChange(index, 'name', e.target.value)} required />
              </div>
              <div className="col">
                <select className="form-select" value={col.type} onChange={(e) => handleChange(index, 'type', e.target.value)}>
                  <option>VARCHAR2</option>
                  <option>NUMBER</option>
                  <option>DATE</option>
                </select>
              </div>
              <div className="col">
                <input className="form-control" placeholder="길이 (예: 100)" value={col.length} onChange={(e) => handleChange(index, 'length', e.target.value)} disabled={col.type === 'DATE'} />
              </div>
            </div>
            <div className="form-check mt-2">
              <input className="form-check-input" type="checkbox" checked={col.notNull} onChange={(e) => handleChange(index, 'notNull', e)} id={`notnull-${index}`} />
              <label className="form-check-label" htmlFor={`notnull-${index}`}>Not Null</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={col.primaryKey} onChange={(e) => handleChange(index, 'primaryKey', e)} id={`pk-${index}`} />
              <label className="form-check-label" htmlFor={`pk-${index}`}>Primary Key</label>
            </div>
            <button type="button" className="btn btn-sm btn-danger mt-2" onClick={() => handleRemoveColumn(index)}>삭제</button>
          </div>
        ))}

        <button type="button" className="btn btn-secondary" onClick={handleAddColumn}>+ 컬럼 추가</button>
        <br /><br />
        <button type="submit" className="btn btn-primary">테이블 생성</button>
      </form>

      {message && <div className="alert alert-info mt-4">{message}</div>}
    </div>
  );
}

export default CreateTable;
