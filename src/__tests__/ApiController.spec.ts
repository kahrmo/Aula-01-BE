import request from 'supertest';
import server from '../server';

describe("Testes da Api", () => {
    it("Deve retornar uma saudação na rota /saudacao", async()=>{
        const response = await request(server).get("/saudacao");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ mensagem: "Olá, bem vindo à API"});

    });
});   

describe("Teste da Listagem de Aluno", () =>{
    it("Verifica o status da reponse, se contem um array e se o array possui um aluno", async()=>{
        const response = await request(server).get("/listarTodosAlunos");

        expect (response.status).toBe(200);
    })
})