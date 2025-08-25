const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const secret = process.env.JWT_SECRET || 'secret';

async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new ApiError(401, 'Token não fornecido', {
            token: 'O token de autenticação é necessário',
        });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return next(new ApiError(401, 'Token inválido ou expirado'));
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
