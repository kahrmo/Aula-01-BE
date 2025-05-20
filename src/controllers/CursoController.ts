import { Request, Response } from "express";
import { Curso } from "../models/Curso";

export const listarCursos = async (req: Request, res: Response) => {
    const cursos = Curso.findAll();
    return res.json(cursos);
}

export const cadastrarCurso = async (req: Request, res: Response) => {
    const { nome, descricao} = req.body;

    let novoCurso = await Curso.create({nome, descricao});
    res.status(201).json({message: "Curso cadastrado com sucesso!.", novoCurso});
}

export const atualizarCurso = async (req: Request, res: Response) =>  {
    try{
        const { cursoId } = req.params;
        const dadosAtualizados = req.body;

        const curso = await Curso.findByPk(cursoId);
        if(!curso){
            return res.status(404).json({message: "Curso não encontrado"});
        }
        await curso.update(dadosAtualizados, {field: Object.keys(dadosAtualizados)});

        return res.status(200).json({message: "Curso atualizado com sucesso", curso});
    }catch(error){
        return res.status(500).json({ message: "Erro ao atualizar curso.", error});
    }
}

export const deletarCurso = async (req: Request, res: Response) => {
    try{
        const { cursoId } = req.params;
        let curso = await Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ error: "Curso não encontrado" });
        }

        await curso.destroy();
        return res.json({ message: "Curso deletado com sucesso"});

    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar curso.", error});
    }
}

export const buscarPeloId = async (req: Request, res: Response) => {
    const { cursoId } = req.params;
    let curso = await Curso.findByPk(cursoId);

    if(curso){
        return res.status(200).json({ message: "Curso encontrado", curso});
    }
        return res.status(404).json({ message: "Curso não encontrado"});
};