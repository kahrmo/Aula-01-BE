import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';

const router = Router();

router.get('/listarAlunos', AlunoController.listarAlunos);

router


export default router;
