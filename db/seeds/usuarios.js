const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('usuarios').del();
    await knex('usuarios').insert([
        {
            nome: 'Luiz Filipe',
            email: 'luizf@gmail.com',
            senha: await bcrypt.hash(
                'Senha123.',
                await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
            ),
        },
        
        {
            nome: 'Maria Silva',
            email: 'marias@gmail.com',
            senha: await bcrypt.hash(
                'sEnha123-',
                await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
            ),
        },
        {
            nome: 'João Souza',
            email: 'joaos@gmail.com',
            senha: await bcrypt.hash(
                'senhA123*',
                await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
            ),
        },
    ]);
};
