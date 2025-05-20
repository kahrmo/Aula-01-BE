import { Request, Response } from "express";
import { Nota } from "../models/Nota";

// Listar todas as notas
export const listarNotas = async (req: Request, res: Response) => {
    const notas = await Nota.findAll();
    return res.json(notas);
};

// Cadastrar uma nova nota
export const cadastrarNota = async (req: Request, res: Response) => {
    const { alunoId, disciplinaId, nota, data_avaliacao } = req.body;

    try {
        const novaNota = await Nota.create({
            alunoId,
            disciplinaId,
            nota,
            data_avaliacao
        });

        return res.status(201).json({ message: "Nota cadastrada com sucesso", novaNota });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao cadastrar nota.", error });
    }
};

// Atualizar uma nota existente
export const atualizarNota = async (req: Request, res: Response) => {
    const { notaId } = req.params;
    const dadosAtualizados = req.body;

    try {
        const nota = await Nota.findByPk(notaId);

        if (!nota) {
            return res.status(404).json({ message: "Nota não encontrada" });
        }

        await nota.update(dadosAtualizados, { fields: Object.keys(dadosAtualizados) });

        return res.status(200).json({ message: "Nota atualizada com sucesso", nota });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar nota.", error });
    }
};

// Deletar uma nota
export const deletarNota = async (req: Request, res: Response) => {
    const { notaId } = req.params;

    try {
        const nota = await Nota.findByPk(notaId);

        if (!nota) {
            return res.status(404).json({ message: "Nota não encontrada" });
        }

        await nota.destroy();
        return res.status(200).json({ message: "Nota deletada com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar nota.", error });
    }
};

