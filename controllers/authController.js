const usuariosRepository = require('../repositories/usuariosRepository');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

async function register(req, res) {
    const user = req.body;

    if (await usuariosRepository.findUserByEmail(user.email)) {
        throw new ApiError(400, 'Usuário já cadastrado', {
            email: 'O email fornecido já está sendo utilizado',
        });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 10);
    const hashedPassword = await bcrypt.hash(user.senha, salt);

    user.senha = hashedPassword;
    const createdUsuario = await usuariosRepository.create(user);

    delete createdUsuario.senha;
    res.status(201).json(createdUsuario);
}

async function login(req, res) {
    const user = req.body;

    const existingUsuario = await usuariosRepository.findUserByEmail(user.email);
    if (!existingUsuario) {
        throw new ApiError(404, 'Usuário não encontrado', {
            email: 'Não foi encontrado um usuário com este email',
        });
    }

    const isPasswordValid = await bcrypt.compare(user.senha, existingUsuario.senha);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Credenciais inválidas', {
            senha: 'Senha incorreta',
        });
    }

    const token = jwt.sign({ nome: existingUsuario.nome, email: existingUsuario.email }, secret, {
        expiresIn: '1h',
    });

    return res.status(200).json({ access_token: token });
}

async function logout(req, res) {
    return res.status(204).json();
}

module.exports = {
    register,
    login,
    logout,
};
