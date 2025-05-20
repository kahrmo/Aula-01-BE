import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController';
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';
import * as ApiController from '../controllers/apiController';
import * as ProfessorController from '../controllers/ProfessorController';
import * as CursoController from '../controllers/CursoController';
import * as TurmaController from '../controllers/TurmaController';
import * as NotaController from '../controllers/NotaController';

const router = Router();

router.get('/gerar-token', ApiController.gerarToken);
router.post('/login', AlunoController.loginAluno);

//-------------- ROTAS CURSOS ---------------
 
router.get('/listarTodosCursos', CursoController.listarCursos);
router.post('/cadastrarCurso', CursoController.cadastrarCurso);
router.put('/atualizarCurso/:cursoId', CursoController.atualizarCurso);
router.delete('/deletarCurso/:cursoId', CursoController.deletarCurso);
router.get('/buscarCurso/:cursoId', CursoController.buscarPeloId);

//-------------- ROTAS TURMAS ---------------

router.get('/listarTodasTurmas', TurmaController.listarTurmas);
router.post('/cadastrarTurma', TurmaController.cadastrarTurma);

//-------------- ROTAS ALUNOS ---------------

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/buscarAluno/:alunoId', AlunoController.buscarPeloId);
router.get('/listarNotasDeAluno/:alunoId/notas', AlunoController.listarNotasDoAlunoComMedia);

//-------------- ROTAS DISCIPLINAS ---------------

router.get('/listarDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.get('/buscarDisciplina/:disciplinaId', DisciplinaController.buscarPeloId);
router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController.deletarDisciplina);

//-------------- ROTAS ALUNODISCIPLINA ---------------

router.get('/listarDisciplinasDoAluno/:alunoId', AlunoDisciplinaController.listarDisciplinasDoAluno);
router.post('/vincularAlunoADisciplina', AlunoDisciplinaController.vincularAlunoADisciplina);

//---------------- ROTAS PROFESSORES ----------------

router.get('/listarTodosProfessores', ProfessorController.listarProfessores);
router.post('/cadastrarProfessor', ProfessorController.cadastrarProfessor);

//------------------ ROTAS NOTAS --------------------

router.get('/listarTodasNotas', NotaController.listarNotas);
router.post('/cadastrarNota', NotaController.cadastrarNota);
router.put('/atualizarNota/:notaId', NotaController.atualizarNota);
router.delete('/deletarNota/:notaId', NotaController.deletarNota);


export default router;
