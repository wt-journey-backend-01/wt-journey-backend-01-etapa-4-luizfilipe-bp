const db = require('../db/db');
const ApiError = require('../utils/ApiError');

async function create(user) {
    try {
        const [createdUser] = await db('usuarios').insert(user, ['*']);
        return createdUser;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível cadastrar o usuário');
    }
}

async function findUserByEmail(email) {
    try {
        const user = await db('usuarios').where({ email: email }).first();
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível encontrar o usuário pelo seu email');
    }
}

async function remove(id) {
    try {
        const deletedUser = await db('usuarios').where({ id: id }).del();
        return deletedUser > 0;
    } catch {
        throw new ApiError(500, 'Não foi possível deletar o usuário');
    }
}

module.exports = {
    create,
    remove,
    findUserByEmail,
};
