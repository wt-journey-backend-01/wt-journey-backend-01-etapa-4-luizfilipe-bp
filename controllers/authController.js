const usuariosRepository = require('../repositories/usuariosRepository');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const createdUser = await usuariosRepository.create(user);
    res.status(201).json(createdUser);
}

async function login(req, res) {
    const user = req.body;

    const existingUser = await usuariosRepository.findUserByEmail(user.email);
    if (!existingUser) {
        throw new ApiError(404, 'Usuário não encontrado', {
            email: 'Não foi encontrado um usuário com este email',
        });
    }

    const isPasswordValid = await bcrypt.compare(user.senha, existingUser.senha);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Credenciais inválidas', {
            senha: 'Senha incorreta',
        });
    }

    const token = jwt.sign(
        { id: existingUser.id, nome: existingUser.nome, email: existingUser.email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );

    return res.status(200).json({ access_token: token });
}

async function logout(req, res) {
    return res.status(204).send();
}

async function deleteUser(req, res) {
    const id = req.params.id;

    const deletedUser = await usuariosRepository.remove(id);
    if (!deletedUser) {
        throw new ApiError(404, 'Não foi possível deletar o usuário');
    }

    return res.status(204).send();
}

module.exports = {
    register,
    login,
    logout,
    deleteUser,
};
