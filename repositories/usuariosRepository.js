const db = require('../db/db');
const ApiError = require('../utils/ApiError');

async function create(user) {
    try {
        const [createdUsuario] = await db('usuarios').insert(user, ['*']);
        return createdUsuario;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível cadastrar o usuário');
    }
}

async function findUserByEmail(email) {
    try {
        const usuario = await db('usuarios').where({ email: email }).first();
        if (!usuario) {
            return null;
        }
        return usuario;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível encontrar o usuário pelo seu email');
    }
}

async function findById(id) {
    try {
        const usuario = await db('usuarios').where({ id: id }).first();
        if (!usuario) {
            return null;
        }
        return usuario;
    } catch (err) {
        throw new ApiError(500, 'Não foi possível encontrar o usuário pelo seu ID');
    }
}

async function remove(id) {
    try {
        const deletedUsuario = await db('usuarios').where({ id: id }).del();
        return deletedUsuario > 0;
    } catch {
        throw new ApiError(500, 'Não foi possível deletar o usuário');
    }
}

module.exports = {
    create,
    remove,
    findUserByEmail,
    findById,
};
