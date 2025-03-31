import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { AlunoDisciplina } from "../models/AlunoDisciplina";
//listar alunos
export const listarAlunos = async (req: Request, res: Response) => {
    const alunos = await Aluno.findAll();
    return res.json(alunos);
};

export const cadastrarAluno = async(req: Request, res: Response) => {
    const {nome, email, matricula} = req.body;

    let novoAluno = await Aluno.create({nome,email,matricula});

    res.status(201).json({
        message: "Aluno cadastrado com sucesso",
        novoAluno
    });
};

export const atualizarAluno = async (req: Request, res: Response) => {
    try{
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;

        const aluno = await Aluno.findByPk( alunoId );
        if(!aluno) {
            return res.status(404).json({error: "Aluno não encontrado"});
        }

        await aluno.update(dadosAtualizados, {field: Object.keys(dadosAtualizados)});

        return res.status(200).json({ message: "Aluno atualizado com sucesso", aluno});
    }catch(error) {
        return res.status(500).json({ message: "Erro ao atualizar aluno.", error});
    }
};

export const deletarAluno = async (req: Request, res: Response ) => {
    try{
        const { alunoId } = req.params;
        let aluno = await Aluno.findByPk(alunoId);
        
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }

        //verificar se aluno está vinculado a uma disciplina
        let vinculadoAUmaDisciplina = await AlunoDisciplina.findOne({
            where: {alunoId}
        })

        if(vinculadoAUmaDisciplina){
            return res.status(400).json({ error: "Não foi possivel deletar. Aluno vinculado a uma disciplina."})
        }

        await aluno.destroy();
        return res.json({ message: "Aluno deletado com sucesso"});

    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar aluno.", error});
    }
};

export const buscarPeloId = async (req: Request, res: Response) => {
    const { alunoId } = req.params;
    let aluno = await Aluno.findByPk(alunoId);

    if(aluno){
        return res.status(200).json({ message: "Aluno encontrado", aluno});
    }
        return res.status(404).json({ message: "Aluno não encontrado"});
};