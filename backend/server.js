const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const MENU_FILE = path.join(__dirname, 'menu.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// ✅ استرجاع عناصر المنيو
app.get('/api/menu', (req, res) => {
  const data = fs.readFileSync(MENU_FILE);
  res.json(JSON.parse(data));
});

// ✅ إضافة عنصر جديد
app.post('/api/menu', (req, res) => {
  const newItem = req.body;
  const data = JSON.parse(fs.readFileSync(MENU_FILE));
  data.push(newItem);
  fs.writeFileSync(MENU_FILE, JSON.stringify(data, null, 2));
  res.json({ message: 'تمت الإضافة بنجاح' });
});

// ✅ تعديل عنصر
app.put('/api/menu/:id', (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  let data = JSON.parse(fs.readFileSync(MENU_FILE));
  data = data.map(item => (item.id === id ? updatedItem : item));
  fs.writeFileSync(MENU_FILE, JSON.stringify(data, null, 2));
  res.json({ message: 'تم التعديل بنجاح' });
});

// ✅ حذف عنصر
app.delete('/api/menu/:id', (req, res) => {
  const id = req.params.id;
  let data = JSON.parse(fs.readFileSync(MENU_FILE));
  data = data.filter(item => item.id !== id);
  fs.writeFileSync(MENU_FILE, JSON.stringify(data, null, 2));
  res.json({ message: 'تم الحذف بنجاح' });
});

// ✅ تسجيل دخول الإدمن
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'بيانات خاطئة' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
