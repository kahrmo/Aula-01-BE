import { Request, Response } from "express";
import { Presenca } from "../models/Presenca";
import { Aluno } from "../models/Aluno";
import { Disciplina } from "../models/Disciplina";

// Listar todas as presenças
export const listarPresencas = async (req: Request, res: Response) => {
    try {
        const presencas = await Presenca.findAll({
            include: [Aluno, Disciplina]
        });
        return res.json(presencas);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar presenças.", error });
    }
};

// Cadastrar uma nova presença
export const cadastrarPresenca = async (req: Request, res: Response) => {
    const { alunoId, disciplinaId, data, presente } = req.body;

    try {
        const novaPresenca = await Presenca.create({
            alunoId,
            disciplinaId,
            data,
            presente
        });

        return res.status(201).json({ message: "Presença cadastrada com sucesso", novaPresenca });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao cadastrar presença.", error });
    }
};

// Atualizar uma presença
export const atualizarPresenca = async (req: Request, res: Response) => {
    const { presencaId } = req.params;
    const dadosAtualizados = req.body;

    try {
        const presenca = await Presenca.findByPk(presencaId);

        if (!presenca) {
            return res.status(404).json({ message: "Presença não encontrada" });
        }

        await presenca.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        return res.status(200).json({ message: "Presença atualizada com sucesso", presenca });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar presença.", error });
    }
};

// Deletar uma presença
export const deletarPresenca = async (req: Request, res: Response) => {
    const { presencaId } = req.params;

    try {
        const presenca = await Presenca.findByPk(presencaId);

        if (!presenca) {
            return res.status(404).json({ message: "Presença não encontrada" });
        }

        await presenca.destroy();
        return res.status(200).json({ message: "Presença deletada com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar presença.", error });
    }
};

// Buscar presença por ID
export const buscarPresencaPorId = async (req: Request, res: Response) => {
    const { presencaId } = req.params;

    try {
        const presenca = await Presenca.findByPk(presencaId, {
            include: [Aluno, Disciplina]
        });

        if (!presenca) {
            return res.status(404).json({ message: "Presença não encontrada" });
        }

        return res.status(200).json({ message: "Presença encontrada", presenca });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar presença.", error });
    }
};
