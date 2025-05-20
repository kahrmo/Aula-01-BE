import { Request, Response } from "express";
import { Professor } from "../models/Professor";
import { Disciplina } from "../models/Disciplina";

export const listarProfessores = async (req: Request, res: Response) => {
    const professores = await Professor.findAll();
    return res.json(professores);
}

export const cadastrarProfessor = async (req: Request, res: Response) => {
    const {nome,email,matricula} = req.body;
    const novoProfessor = await Professor.create({nome,email,matricula});
    res.status(201).json({
        message: "Professor cadastrado com sucesso",
        novoProfessor
    });
}

export const atualizarProfessor = async (req: Request, res: Response) => {
    try{
        const {professorId} = req.params;
        const dadosAtualizados = req.body;

        const professor = await Professor.findByPk(professorId);
        if(!professor){
            return res.status(404).json({error: "Professor não encontrado"});
        }
        await professor.update(dadosAtualizados, {field: dadosAtualizados});

        return res.status(202).json({message: "Professor atualizado com sucesso"});
    }catch(error){
        return res.status(500).json({message: "erro ao atualizar professor", error});
    }
}

export const deletarProfessor = async (req: Request, res: Response ) => {
    try{
        const { professorId } = req.params;
        let professor = await Professor.findByPk(professorId);
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado" });
        }
        // Verificar se está vinculado a alguma disciplina
        const vinculadoAUmaDisciplina = await Disciplina.findOne({
            where: { professorId }
        });

        if(vinculadoAUmaDisciplina) {
            return res.status(400).json({message: "Não é possivel deletar professor. Professor está ministrando uma disciplina"})
        }

        await professor.destroy();
        return res.json({ message: "professor deletado com sucesso"});

    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar professor.", error});
    }
};
