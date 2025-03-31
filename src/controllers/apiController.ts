import { Request, Response } from 'express';

export const apiSaudacao = (req: Request, res: Response) => {
    return res.json ({ mensagem: "Olá, bem vindo à API"});
};

