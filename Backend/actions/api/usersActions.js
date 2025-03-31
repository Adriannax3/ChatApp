const express = require("express");
const { connectDB, connection } = require("../../db/mongodb");
const User = require("../../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config");
const invalidatedTokens = new Set();

connectDB();

class usersActions {

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: "Błąd podczas pobierania użytkowników: ", error})
        }
    }

    async addUser(req, res) {
        try {
            const { login, username, password, avatar } = req.body;

            if (!login || !username || !password || !avatar) {
                return res.status(400).json({ message: "Wszystkie pola są wymagane!" });
            }

            const checkLogin = await User.findOne({login});
            if (checkLogin) {
                return res.status(400).json({ message: "Istnieje już użytkownik o podanym loginie." });
            }

            const checkUsername = await User.findOne({username});
            if (checkUsername) {
                return res.status(400).json({ message: "Istnieje już użytkownik o podanej nazwie użytkownika." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = User({
                login,
                username,
                password: hashedPassword,
                avatar
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: "Błąd podczas dodawania użytkownika", error });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.body;
            const user = await User.findOne({id});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: "Błąd podczas pobierania użytkownika: ", error});
        }
    }

    async loginUser(req, res) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return res.status(400).json({ message: "Wszystkie pola są wymagane!" });
            }

            const checkUser = await User.findOne({login});
            if (!checkUser) {
                return res.status(400).json({ message: "Nie istnieje użytkownik o podanym loginie." });
            }

            const isValidPassword = await bcrypt.compare(password, checkUser.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Niepoprawne hasło." });
            }

            const token = jwt.sign({id: checkUser._id}, config.secretKey);
            res.json({token});

        } catch (error) {
            res.status(500).json({ message: "Błąd podczas logowania", error });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const id = req.user?.id;
            if(!id) {
                return res.status(401).json({ message: 'Brak autoryzacji.' });
            }
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Błąd podczas zbierania informacji ", error });
        }
    }

    verifyToken(req, res, next) {
        const authHeader = req.body.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Brak dostępu.' });
        }

        if (invalidatedTokens.has(token)) {
            return res.status(401).json({ message: 'Token wygasł.' });
        }
      
        try {
          const decoded = jwt.verify(token, config.secretKey);
          req.user = decoded;
          next();
        } catch (err) {
          res.status(401).json({ message: "Nieprawidłowy token." });
        }

    }

    logout(req, res) {
        const token = req.headers['Authorization'];
        if (!token) {
            return res.status(400).json({ message: 'Brak tokenu.' });
        }
        invalidatedTokens.add(token);
        res.status(200).json({ message: 'Wylogowano.' });
    }

}

module.exports = new usersActions();