import React from "react";

const problems = [
  { id: 1, title: "IT 부서 직원 조회", difficulty: "쉬움" },
  { id: 2, title: "고객 주문 내역 집계", difficulty: "보통" },
];

export default function ProblemList() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SQL 튜닝 문제 목록</h1>
      <ul className="space-y-2">
        {problems.map((p) => (
          <li key={p.id} className="border p-2 rounded shadow-sm">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-500">난이도: {p.difficulty}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
