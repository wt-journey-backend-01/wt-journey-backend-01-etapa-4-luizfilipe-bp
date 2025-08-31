const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const secret = process.env.JWT_SECRET || 'secret';

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(
            new ApiError(401, 'Token não fornecido', {
                token: 'O token de autenticação é necessário',
            })
        );
    }

    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        next();
    } catch (err) {
        return next(
            new ApiError(401, 'Token inválido ou expirado', {
                token: 'O token de autenticação é inválido ou expirou',
            })
        );
    }
}

module.exports = { authenticateToken };
