import request from 'supertest';
import server from '../server';

//Testes para aluno
    describe("teste de cadastro de aluno", () =>{
        it("deve cadastrar um aluno na rota /cadastrarAluno", async()=>{
            const novoAluno = {
                nome: "João da Silva Junior",
                email: "joão@123.com",
                matricula: "786"
            };
            
            const response = await request(server).post("/cadastrarAluno").send(novoAluno);
            //verifica se o status é 201 (created)
            expect(response.status).toBe(201);
            //verifica se a mensagem é a mesma de sucesso
            expect(response.body.message).toBe("Aluno cadastrado com sucesso");
            //verifica se o aluno está com as mesmas propriedades
            expect(response.body.novoAluno).toHaveProperty("nome", novoAluno.nome);
            expect(response.body.novoAluno).toHaveProperty("email", novoAluno.email);
            expect(response.body.novoAluno).toHaveProperty("matricula", novoAluno.matricula);
        });
    });

    describe("Teste da Listagem de Aluno", () =>{
        it("Verifica o status da reponse, se contem um array e se o array possui um aluno", async()=>{
            const response = await request(server).get("/listarTodosAlunos");
            expect (response.status).toBe(200);
            //verifica se a resposta possui um array de alunos
            expect(Array.isArray(response.body)).toBe(true);
            //verifica se o array possui ao menos um aluno 
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe("testes da API de alunos - Atualizar", () =>{
        it("Deve atualizar um aluno na rota /atualizarAluno/:alunoId", async () => {
            const alunoId = 1;
            const dadosAtualizados ={
                nome: "João Atualizado",
                email: "joãoatualizado@silva.com",        
            };
            
            const response = await request(server).put(`/atualizarAluno/${alunoId}`).send(dadosAtualizados);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Aluno atualizado com sucesso");
            expect(response.body.aluno).toHaveProperty("nome", dadosAtualizados.nome);
            expect(response.body.aluno).toHaveProperty("email", dadosAtualizados.email);
        });
    });

    describe("testes da api de alunos - deletar", ()=>{
        it("deve deletar um aluno na rota /deletarAluno/:alunoId", async () => {
            const alunoId = 2

            const response = await request(server).delete(`/deletarAluno/${alunoId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Aluno deletado com sucesso")
        });
    });
    
    describe("testes da api de alunos - deletar aluno vinculado a uma disciplina", ()=>{
        it("Não deve deletar um aluno vinculado a uma disciplina", async () => {
            const alunoId = 1

            const response = await request(server).delete(`/deletarAluno/${alunoId}`);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Não foi possivel deletar. Aluno vinculado a uma disciplina.");
        });
    });

    describe("Testes da Api de Alunos - buscar pelo id", ()=> {
        it("Deve buscar um aluno na rota /buscarAluno/:alunoId", async()=>{
            const alunoId = 1;

            const response = await request(server).get(`/buscarAluno/${alunoId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Aluno encontrado");
            expect(response.body.aluno).toHaveProperty("id", alunoId);
        });
    });
    
//Testes para disciplinas

    describe("teste de cadastro de disciplina", () =>{
        it("deve cadastrar uma disciplina na rota /cadastrarDisciplina", async()=>{
            const novaDisciplina= {
                nome: "espanhol",
            };
            
            const response = await request(server).post("/cadastrarDisciplina").send(novaDisciplina);
            //verifica se o status é 201 (created)
            expect(response.status).toBe(201);
            //verifica se a mensagem é a mesma de sucesso
            expect(response.body.message).toBe("Disciplina cadastrada com sucesso");
            //verifica se o evento está com as mesmas propriedades
            expect(response.body.novaDisciplina).toHaveProperty("nome", novaDisciplina.nome);
        });
    });

    describe("Teste da Listagem de Disciplinas", () =>{
        it("Verifica o status da reponse, se contem um array e se o array possui uma disciplina", async()=>{
            const response = await request(server).get("/listarDisciplinas");
            expect (response.status).toBe(200);
            //verifica se a resposta possui um array de alunos
            expect(Array.isArray(response.body)).toBe(true);
            //verifica se o array possui ao menos um aluno 
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe("testes da API de disciplinas - Atualizar", () =>{
        it("Deve atualizar um aluno na rota /atualizarDisciplina/:disciplinaId", async () => {
            const disciplinaId = 1;
            const dadosAtualizados ={
                nome: "ferrovia",        
            };
            
            const response = await request(server).put(`/atualizarDisciplina/${disciplinaId}`).send(dadosAtualizados);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Disciplina atualizado com sucesso");
            expect(response.body.disciplina).toHaveProperty("nome", dadosAtualizados.nome);
        });
    });

    describe("testes da api de disciplina - deletar", ()=>{
        it("deve deletar um aluno na rota /deletarDisciplina/:disciplinaId", async () => {
            const disciplinaId = 2

            const response = await request(server).delete(`/deletarDisciplina/${disciplinaId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Disciplina deletada com sucesso")
        });
    });

    describe("testes da api de disciplina - deletar disciplina vinculado a um aluno", ()=>{
        it("Não deve deletar uma disciplina vinculada a um aluno", async () => {
            const disciplinaId = 1

            const response = await request(server).delete(`/deletarDisciplina/${disciplinaId}`);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Não foi possivel deletar disciplina. Disciplina vinculada a um aluno.");
        });
    });

    describe("Testes da Api de Disciplina - buscar pelo id", ()=> {
        it("Deve buscar um aluno na rota /buscarDisciplina/:disciplinaId", async()=>{
            const disciplinaId = 1;

            const response = await request(server).get(`/buscarDisciplina/${disciplinaId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Disciplina encontrada");
            expect(response.body.disciplina).toHaveProperty("id", disciplinaId);
        });
    });
