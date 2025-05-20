import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { AlunoDisciplina } from "../models/AlunoDisciplina";
import { Nota } from "../models/Nota";
import { Disciplina } from "../models/Disciplina";
import Jwt  from "jsonwebtoken";


export const loginAluno = async (req: Request, res: Response): Promise<any> => {
    const {email, matricula} = req.body;

    console.log('Requisição de login recebida');
    console.log('Dados recebidos', {email, matricula})

    if (!email || !matricula){
        console.warn('Email ou matricula não informados')
        return res.status(400).json({ error: "Informe e-mail e matrícula" })
    }

    try {
        console.log('Buscando aluno no banco de dados...')
        const aluno = await Aluno.findOne({ where: { email, matricula }})

        if(!aluno){
            console.warn('Aluno não encontrado ou dados invalidos')
            return res.status(401).json({ error: 'Aluno não encontrado ou dados inválidos' })
        }
        console.log('Aluno encontrado:', aluno.dataValues);

        //Payload do token com os dados do aluno
        const payload = {
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email,
            matricula: aluno.matricula,
        }

        const JWT_SECRET = 'minha_chave_super_secreta';

        console.log('Gerando token com payload:',payload)
        const token = Jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })

        console.log('Token gerado com sucesso')
        return res.json({
            token,
            mensagem: 'Aluno logado com sucesso'
        })
    } catch (error) {
        console.error('Erro ao realizar login', error)
        return res.status(500).json({error: 'Erro ao realizar login' })
    }
} 

//listar alunos
export const listarAlunos = async (req: Request, res: Response) => {
    const alunos = await Aluno.findAll();
    return res.json(alunos);
};

export const cadastrarAluno = async (req: Request, res: Response) => {
    const { nome, email, matricula, id_turma } = req.body;

    let novoAluno = await Aluno.create({ nome, email, matricula, id_turma });

    res.status(201).json({
        message: "Aluno cadastrado com sucesso",
        novoAluno
    });
};

export const atualizarAluno = async (req: Request, res: Response) => {
    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;

        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }

        await aluno.update(dadosAtualizados, { field: Object.keys(dadosAtualizados) });

        return res.status(200).json({ message: "Aluno atualizado com sucesso", aluno });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar aluno.", error });
    }
};

export const deletarAluno = async (req: Request, res: Response) => {
    try {
        const { alunoId } = req.params;
        let aluno = await Aluno.findByPk(alunoId);

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }

        //verificar se aluno está vinculado a uma disciplina
        let vinculadoAUmaDisciplina = await AlunoDisciplina.findOne({
            where: { alunoId }
        })

        if (vinculadoAUmaDisciplina) {
            return res.status(400).json({ error: "Não foi possivel deletar. Aluno vinculado a uma disciplina." })
        }

        await aluno.destroy();
        return res.json({ message: "Aluno deletado com sucesso" });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar aluno.", error });
    }
};

export const buscarPeloId = async (req: Request, res: Response) => {
    const { alunoId } = req.params;
    let aluno = await Aluno.findByPk(alunoId);

    if (aluno) {
        return res.status(200).json({ message: "Aluno encontrado", aluno });
    }
    return res.status(404).json({ message: "Aluno não encontrado" });
};

//Listar Notas do Aluno

export const listarNotasDoAlunoComMedia = async (req: Request, res: Response) => {
    const { alunoId } = req.params;
  
    if (!alunoId) {
      return res.status(400).json({ error: 'Aluno ID é obrigatório' });
    }
  
    // Buscar todas as notas do aluno
    const notas = await Nota.findAll({
      where: { alunoId }
    });
  
    const mediasPorDisciplina: { [disciplinaId: string]: { soma: number, quantidade: number } } = {};
    notas.forEach((nota: any) => {
        const disciplinaId = nota.disciplinaId;
        const valorNota = nota.nota;
    
        if (!mediasPorDisciplina[disciplinaId]) {
          mediasPorDisciplina[disciplinaId] = { soma: 0, quantidade: 0 };
        }
    
        mediasPorDisciplina[disciplinaId].soma += valorNota;
        mediasPorDisciplina[disciplinaId].quantidade += 1;
      });
      
      const resultado = Object.keys(mediasPorDisciplina).map(disciplinaId => {
        const { soma, quantidade } = mediasPorDisciplina[disciplinaId];
        const media = soma / quantidade;
        
        return {
          media: media
        };
      });
    
      // Retornar o resultado
      return res.status(200).json({
        alunoId,
        medias: resultado
      });
    };

  export const listarFrequenciaDeAlunoPorDisciplina = async (req: Request, res: Response) => {
    
  }