const { z } = require('zod');

const baseUsuarioSchema = z.object({
    nome: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo nome é obrigatório'
                    : 'O campo nome deve ser uma string',
        })
        .min(1, 'O campo nome é obrigatório'),
    email: z.email({
        error: (issue) =>
            issue.input === undefined
                ? 'O campo email é obrigatório'
                : 'O campo email deve ser um email válido',
    }),
    senha: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo senha é obrigatório'
                    : 'O campo senha deve ser uma string',
        })
        .min(8, 'O campo senha deve ter pelo menos 8 caracteres')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, {
            message:
                'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
        }),
});

const loginUsuarioSchema = z
    .object({
        email: z.email({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo email é obrigatório'
                    : 'O campo email deve ser um email válido',
        }),
        senha: z.string({
            error: (issue) =>
                issue.input === undefined
                    ? 'O campo senha é obrigatório'
                    : 'O campo senha deve ser uma string',
        }),
    })
    .strict();

const registerUsuarioSchema = baseUsuarioSchema.strict();

module.exports = {
    registerUsuarioSchema,
    loginUsuarioSchema,
};
