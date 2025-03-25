import { Request, Response } from "express";
import { Disciplina } from "../models/Disciplina";

export const listarDisciplinas = async (req: Request, res: Response) => {
    const disciplinas = await Disciplina.findAll();
    return res.json(disciplinas);
};

export const cadastrarDisciplina = async (req: Request, res: Response) => {
    const {nome} = req.body;

    if(nome){
        let disciplinaExistente = await Disciplina.findOne({where: {nome}});
        if (!disciplinaExistente) {        
            let novaDisciplina = await Disciplina.create({nome});

            res.status(201).json({
                message: "Disciplina cadastrada com sucesso",
                novaDisciplina
            });
        } else {
            return res.status(400).json({ error: "Nome da disciplina já existe."})
        }

    }

    return res.status(400).json({ error: "Nome da disciplina não enviado." });

};