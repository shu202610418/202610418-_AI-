const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
// 조건 6: PORT 3418 설정 완료
const PORT = process.env.PORT || 3418;

app.use(express.urlencoded({ extended: true }));
// POST /todo/1?_method=PUT → PUT /todo/1 로 처리
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// 메모리 저장 (서버 재시작 시 초기화)
let todos = [
  { id: 1, text: '아침 운동하기' },
  { id: 2, text: '이메일 확인하기' },
  { id: 3, text: '장보기' },
];
let nextId = 4;

// GET: 할 일 목록 조회
app.get('/todo', (req, res) => {
  res.json(todos);
});

// POST: 할 일 추가
app.post('/todo', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) todos.push({ id: nextId++, text });
  res.redirect('/');
});

// 조건 7: PUT 라우트 (수정)
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const text = (req.body.text || '').trim();
  const todo = todos.find((t) => t.id === id);

  if (todo && text) {
    todo.text = text;
  }
  res.redirect('/');
});

// 조건 8: DELETE 라우트 (삭제)
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  todos = todos.filter((t) => t.id !== id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});