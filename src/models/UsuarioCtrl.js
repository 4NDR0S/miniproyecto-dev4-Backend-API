// import { pool } from '../config/db.js'
// import bcrypt from 'bcrypt'

// // Crear usuario
// export const crearUsuario = async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required' })
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const result = await pool.execute('INSERT INTO usuarios (email, password) VALUES (?, ?)', [email, hashedPassword])
//         const newUser = {
//             id_usuario: result.insertId,
//             email,
//             password: hashedPassword
//         }
//         res.status(201).json(newUser)
//     } catch (error) {
//         console.error('Error al crear usuario:', error)
//         res.status(500).json({ error: 'Error al crear usuario' })
//     }
// }

// // Logear usuario
// export const logearUsuario = async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required' })
//     }

//     try {
//         const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email])
//         if (rows.length === 0) {
//             return res.status(401).json({ error: 'Invalid email or password' })
//         }

//         const user = rows[0]
//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) {
//             return res.status(401).json({ error: 'Invalid email or password' })
//         }

//         res.status(200).json({ message: 'Logged in successfully', userId: user.id_usuario })
//     } catch (error) {
//         console.error('Error al logear usuario:', error)
//         res.status(500).json({ error: 'Error al logearte a la pagina' })
//     }
// }


import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import { DB_SECRET_KEY } from '../config/config.js'


// funcion para encontrar usuario por email
const findUsuarioByEmail = async (email) => {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
};


//funcion para obtener el usuario
const verifyUsuario = async (id) => {
    const [usuario] = await pool.execute(
      'SELECT id_usuario, email, name, phone, bio FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return usuario[0];
};



// Crear usuario
export const crearUsuario = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }

    try {
        // Verificar si el email ya existe
        const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email])
        if (rows.length > 0) {
            return res.status(409).json({ error: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const [result] = await pool.execute('INSERT INTO usuarios (email, password) VALUES (?, ?)', [email, hashedPassword])
        
        // Acceder al insertId del resultado
        const newUser = {
            id_usuario: result.insertId,  // Asegúrate de que insertId está disponible en el resultado
            email,
            password: hashedPassword
        }
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error al crear usuario:', error)
        res.status(500).json({ error: 'Error al crear usuario' })
    }
}

// Logear usuario
export const logearUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await findUsuarioByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ usuarioId: user.id_usuario }, DB_SECRET_KEY, { expiresIn: '30m' });
        res.json({ token });
    } catch (error) {
        console.error('Error al logear usuario:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};



// obtener usuario
export const getUsuario = async (req, res) => {
    try {
        const usuario = await verifyUsuario(req.user.usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener información del usuario' });
    }
};


// editar un usuario

const updateUsuario = async (id, email, password, name, phone, bio) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      `UPDATE usuarios 
       SET email = ?, password = ?, name = ?, phone = ?, bio = ? 
       WHERE id_usuario = ?`,
      [email, hashedPassword, name, phone, bio, id]
    );
    return result;
};


// actualizar usuario
export const updateUsuarioController = async (req, res) => {
    try {
        const { email, password, name, phone, bio } = req.body;
        const result = await updateUsuario(req.user.usuarioId, email, password, name, phone, bio);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};
