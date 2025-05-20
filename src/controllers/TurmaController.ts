import { Request, Response } from "express";
import { Turma } from "../models/Turma";
import { Aluno } from "../models/Aluno";
//listar alunos
export const listarTurmas = async (req: Request, res: Response) => {
    const turmas = await Turma.findAll();
    return res.json(turmas);
};

export const cadastrarTurma = async(req: Request, res: Response) => {
    const {nome, periodo, id_curso} = req.body;

    let novaTurma = await Turma.create({nome,periodo,id_curso});

    res.status(201).json({ message: "Turma cadastrado com sucesso", novaTurma });
};

export const atualizarTurma= async (req: Request, res: Response) => {
    try{
        const { turmaId } = req.params;
        const dadosAtualizados = req.body;

        const turma = await Turma.findByPk( turmaId );
        if(!turma) {
            return res.status(404).json({error: "Turma não encontrada"});
        }

        await turma.update(dadosAtualizados, {field: Object.keys(dadosAtualizados)});

        return res.status(200).json({ message: "Turma atualizado com sucesso", turma});
    }catch(error) {
        return res.status(500).json({ message: "Erro ao atualizar turma.", error});
    }
};

export const deletarTurrma = async (req: Request, res: Response ) => {
    try{
        const { id_turma } = req.params;
        let turma = await Turma.findByPk(id_turma);
        
        if (!turma) {
            return res.status(404).json({ error: "Turma não encontrado" });
        }

        //verificar se possui aluno vinculado na turma
        let possuiAlunoVinculadoATurma = await Aluno.findOne({
            where: {id_turma}
        })

        if(possuiAlunoVinculadoATurma){
            return res.status(400).json({ error: "Não foi possivel deletar turma. Aluno vinculado a uma turma."})
        }

        await turma.destroy();
        return res.json({ message: "Turma deletada com sucesso"});

    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar aluno.", error});
    }
};

export const buscarPeloId = async (req: Request, res: Response) => {
    const { turmaId } = req.params;
    let turma = await Turma.findByPk(turmaId);

    if(turma){
        return res.status(200).json({ message: "Turma encontrada", turma});
    }
        return res.status(404).json({ message: "Turma não encontrada"});
};