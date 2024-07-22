
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { DB_SECRET_KEY } from './config/config.js';
import jwt from 'jsonwebtoken';

import { manejarErrorArchivo } from './helper.js'

import { crearUsuario, logearUsuario, getUsuario, updateUsuarioController } from './models/UsuarioCtrl.js'

const app = express()
app.use(cors())

app.use(express.json())

app.post('/signup', crearUsuario, manejarErrorArchivo)

app.post('/login', logearUsuario)



const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token' });
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  jwt.verify(token, DB_SECRET_KEY, (err, decoded) => {
      if (err) {
          if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ message: 'Token expirado' });
          }
          return res.status(401).json({ message: 'Token inválido' });
      }
      req.user = decoded;
      next();
  });
};

app.get('/me', verifyToken, getUsuario)



app.put('/usuario',verifyToken, updateUsuarioController);


app.listen(8081, ()=> {
  console.log("Server running on http://localhost:8081");
})