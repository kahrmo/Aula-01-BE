import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController';
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';
import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('/atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/buscarAluno/:alunoId', AlunoController.buscarPeloId);

router.get('/listarDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.get('/buscarDisciplina/:disciplinaId', DisciplinaController.buscarPeloId);

router.get('/listarDisciplinasDoAluno/:alunoId', AlunoDisciplinaController.listarDisciplinasDoAluno);
router.post('/vincularAlunoADisciplina', AlunoDisciplinaController.vincularAlunoADisciplina);
router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController.deletarDisciplina);


export default router;
