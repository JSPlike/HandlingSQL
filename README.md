# HandlingSQL

## 기본 쿼리 테스트 가이드

### 화면구성

![image](https://github.com/user-attachments/assets/debfde74-b4a0-4433-900c-ca7341103e75)


![image](https://github.com/user-attachments/assets/3b785e79-b920-4a66-babf-d6af4d956439)


![image](https://github.com/user-attachments/assets/2ad55ccb-b905-46ff-ba3a-5fcf2fb956ab)


![image](https://github.com/user-attachments/assets/e63a2d74-95be-495e-aa36-4af33adf4c0d)


------

✅ 1. 테스트용 테이블 생성 & 데이터 삽입

```
CREATE TABLE employee (
  id NUMBER PRIMARY KEY,
  name VARCHAR2(100),
  department VARCHAR2(50),
  salary NUMBER
);
```

-- 더미 데이터 삽입
```
BEGIN
  FOR i IN 1..10000 LOOP
    INSERT INTO employee VALUES (
      i,
      'User_' || i,
      CASE 
        WHEN MOD(i, 3) = 0 THEN 'IT'
        WHEN MOD(i, 3) = 1 THEN 'HR'
        ELSE 'FINANCE'
      END,
      3000 + MOD(i, 1000)
    );
  END LOOP;
  COMMIT;
END;
```

✅ 2. 인덱스 없이 쿼리 실행계획 보기

```
EXPLAIN PLAN FOR
SELECT * FROM employee WHERE department = 'IT';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());
```

✅ 3. 인덱스 생성 후 다시 실행

```
CREATE INDEX idx_emp_dept ON employee(department);
```

✅ 4. 실행계획 비교 포인트

|항목|인덱스 없음|인덱스 있음|
|------|-------------|----------------|
|Access Type|TABLE ACCESS FULL|INDEX RANGE SCAN|
|Cost|높음|낮음|
|Rows|동일|동일|
|Filtered|10000 중 일부|	10000 중 일부|

✅ 5. 정렬, 그룹핑 등 추가 조건 실험

예: ORDER BY, GROUP BY, JOIN, SUBQUERY, IN, EXISTS 등

-- 예제 1: ORDER BY
```
EXPLAIN PLAN FOR
SELECT * FROM employee WHERE department = 'IT' ORDER BY salary;
```

-- 예제 2: GROUP BY
```
EXPLAIN PLAN FOR
SELECT department, COUNT(*) FROM employee GROUP BY department;
```

✅ 6. AUTOTRACE 기능처럼 실행 시간 확인하기

Oracle에서는 SET AUTOTRACE ON이 있는데,
DBeaver에선 하단 탭에서 Query Statistics (쿼리 시간, fetch time 등) 확인 가능.


## 앱 구성

1. react 환경구성

  1. node 설치확인
  ```
  node -v
  npm -v
  ```

  2. react app 생성
  ```
  npx create-react-app HandlingSQL
  ```

