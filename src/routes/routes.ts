import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController';
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';
import * as ApiController from '../controllers/apiController';

const router = Router();

//TESTES
router.get('/saudacao', ApiController.apiSaudacao)

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);

router.get('/listarDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);

router.get('/listarDisciplinasDoAluno/:alunoId', AlunoDisciplinaController.listarDisciplinasDoAluno);
router.post('/vincularAlunoADisciplina', AlunoDisciplinaController.vincularAlunoADisciplina);

export default router;
