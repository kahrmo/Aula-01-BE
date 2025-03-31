import { Request, Response } from "express";
import { Disciplina } from "../models/Disciplina";
import { AlunoDisciplina } from "../models/AlunoDisciplina";

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

            res.status(200).json({
                message: "Disciplina cadastrada com sucesso",
                novaDisciplina
            });
        } else {
            return res.status(400).json({ error: "Nome da disciplina já existe."})
        }

    }

    return res.status(400).json({ error: "Nome da disciplina não enviado." });

};

export const atualizarDisciplina = async (req: Request, res: Response) => {
    try{
        const { disciplinaId } = req.params;
        const dadosAtualizados = req.body;

        const disciplina = await Disciplina.findByPk( disciplinaId );
        if(!disciplina) {
            return res.status(404).json({error: "Disciplina não encontrada"});
        }

        await disciplina.update(dadosAtualizados, {field: Object.keys(dadosAtualizados)});

        return res.status(200).json({ message: "Disciplina atualizado com sucesso", disciplina});
    }catch(error) {
        return res.status(500).json({ message: "Erro ao atualizar aluno.", error});
    }

};

export const deletarDisciplina = async (req: Request, res: Response ) => {
    try{
        const { disciplinaId } = req.params;
        let disciplina = await Disciplina.findByPk(disciplinaId);
        
        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada" });
        }

        //verificar se aluno está vinculado a uma disciplina
        let vinculadoAUmAluno = await AlunoDisciplina.findOne({
            where: {disciplinaId}
        })

        if(vinculadoAUmAluno){
            return res.status(400).json({ error: "Não foi possivel deletar disciplina. Disciplina vinculada a um aluno."})
        }

        await disciplina.destroy();

        return res.json({ message: "Disciplina deletada com sucesso"});
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar disciplina."});
    }
};

export const buscarPeloId = async (req: Request, res: Response) => {
    const { disciplinaId } = req.params;
    let disciplina = await Disciplina.findByPk(disciplinaId);

    if(disciplina){
        return res.status(200).json({ message: "Disciplina encontrada", disciplina});
    }
        return res.status(404).json({ message: "Disciplina não encontrada"});
};