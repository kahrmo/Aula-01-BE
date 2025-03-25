import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { Disciplina } from "../models/Disciplina";

export const listarDisciplinasDoAluno = async (req: Request, res: Response) => {
    const { alunoId } = req.params;
    
    const aluno = await Aluno.findByPk(alunoId, {
        include: {model: Disciplina}, //inclui todas as disciplinas do aluno;
    });

    if(aluno){
        return res.json(aluno); //retorna de forma crua
    }
    
    return res.status(404).json({error: "aluno não encontrado."});
};

export const vincularAlunoADisciplina = async (req: Request, res: Response) => {
    const {alunoId, disciplinaId} = req.body;

    //buscar aluno e displina no banco de dados
    const aluno = await Aluno.findByPk(alunoId);
    const disciplina = await Disciplina.findByPk(disciplinaId);

    if(!aluno || !disciplina) {
        return res.status(404).json({ error: "Aluno ou disciplina não encontrados"})
    }

    await (aluno as any).addDisciplina(disciplina);

    return res.json({ message: "Aluno vinculado à disciplina com sucesso"});
};