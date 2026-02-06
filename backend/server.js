const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','frontend')));
const DATA_DIR = path.join(__dirname,'data');

function readJSON(name){ try{ const p = path.join(DATA_DIR,name+'.json'); if(!fs.existsSync(p)) return []; return JSON.parse(fs.readFileSync(p)); } catch(e){ return []; } }
function writeJSON(name, data){ const p = path.join(DATA_DIR,name+'.json'); fs.writeFileSync(p, JSON.stringify(data, null, 2)); }

app.post('/api/login', (req,res)=>{
  const {email,password} = req.body;
  // Very simple: if a user with that email exists, accept, otherwise create
  let users = readJSON('users');
  let user = users.find(u=>u.email===email);
  if(!user){
    user = {id: Date.now(), email, name: email.split('@')[0]};
    users.push(user); writeJSON('users', users);
  }
  res.json({user});
});

app.get('/api/profile',(req,res)=>{
  const users = readJSON('users');
  res.json(users[0] || {});
});

// Generic endpoints for tasks, skills, reminders, blogs, rewards
const collections = ['tasks','skills','reminders','blogs','rewards'];
collections.forEach(col=>{
  app.get('/api/'+col, (req,res)=>{
    res.json(readJSON(col));
  });
  app.post('/api/'+col, (req,res)=>{
    const arr = readJSON(col);
    const item = Object.assign({id: Date.now()}, req.body);
    arr.push(item);
    writeJSON(col, arr);
    res.json(item);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on port', PORT));
