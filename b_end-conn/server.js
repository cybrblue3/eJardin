require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt"); // ← "bcrypt" estaba mal escrito como "bycrypt"
const jwt = require("jsonwebtoken");
const { Pool } = require("pg"); // ← Corregido "pool" por "Pool"

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ejardinalpha',
    password: '18febrero2004',
    port: 5432,
});

app.use(cors());
app.use(express.json());

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Acceso denegado" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token no validado" });
    }
};

//INSERSION DE DATOS
const registerUser = async (username, nameu, password, rol) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = ('INSERT INTO users(username, nameu, password, rol) VALUES($1,$2,$3,$4) RETURNING *');
        const values = [username, nameu, hashedPassword, rol];

        const result = await pool.query(query, values);
        console.log('Usuario registrado; ', result.rows[0]);
        return result.rows[0];
    }catch(error){
        console.error('Error al registrar usuario: ', error);
        throw error;
    }
};



// Ruta del login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// Ruta protegida para obtener datos del usuario
app.get("/user", verifyToken, async (req, res) => {
    try {
      const result = await pool.query("SELECT username FROM users WHERE id = $1", [req.user.id]);
  
      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
  
      res.json(result.rows[0]); // ✅ Solo devuelve username
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  });
  

const PORT = process.env.PORT || 5000; // ← Corregido "proccess.env" a "process.env"
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
