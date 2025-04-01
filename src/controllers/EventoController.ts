import { Request, Response } from "express";
import { Evento } from "../models/Evento";
import { EventoParticipante } from "../models/EventoParticipante";

//listar eventos
export const listarEventos = async (req: Request, res: Response) => {
    const eventos = await Evento.findAll();
    return res.json(eventos);
};

export const cadastrarEvennto = async(req: Request, res: Response) => {
    const {nome, local, data} = req.body;

    let novoEvento = await Evento.create({nome,local,data});

    res.status(201).json({
        message: "Evento cadastrado com sucesso",
        novoEvento
    });
};

export const atualizarEvento = async (req: Request, res: Response) => {
    try{
        const { eventoId } = req.params;
        const dadosAtualizados = req.body;

        const evento = await Evento.findByPk( eventoId );
        if(!evento) {
            return res.status(404).json({error: "Evento não encontrado"});
        }

        await evento.update(dadosAtualizados, {field: Object.keys(dadosAtualizados)});

        return res.status(200).json({ message: "Evento atualizado com sucesso", evento});
    }catch(error) {
        return res.status(500).json({ message: "Erro ao atualizar evento.", error});
    }
};

export const deletarEvento = async (req: Request, res: Response ) => {
    try{
        const { eventoId } = req.params;
        let evento = await Evento.findByPk(eventoId);
        
        if (!evento) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }

        //verificar se evento está vinculado a um participante
        let vinculadoAUmParticipante= await EventoParticipante.findOne({
            where: {eventoId}
        })

        if(vinculadoAUmParticipante){
            return res.status(400).json({ error: "Não foi possivel deletar. Evento está vinculado a um participante."})
        }

        await evento.destroy();
        return res.json({ message: "Evento deletado com sucesso"});

    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar evento.", error});
    }
};

export const buscarPeloId = async (req: Request, res: Response) => {
    const { eventoId } = req.params;
    let evento = await Evento.findByPk(eventoId);

    if(evento){
        return res.status(200).json({ message: "Evento encontrado", evento});
    }
        return res.status(404).json({ message: "Evento não encontrado"});
};