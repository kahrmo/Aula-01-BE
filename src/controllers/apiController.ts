// import { Request, Response } from 'express';

export function verificarSenhaForte(senha: string): boolean {
    if (senha.length >= 8) {
        console.log(`Senha " ${senha}" possui 8 digitos: Forte`)
        return true;
    }
    console.log(`Senha "${senha}" possui 8 digitos: Fraca`)
    return false;
}

export function mediaArray(numeros: number[]): number {
    const somaDosNumeros = numeros.reduce((valorTotal, valorAtual) =>
        valorTotal += valorAtual, 0);
    const media = somaDosNumeros / numeros.length;
    console.log(media)
    return media;
}

export function ehPar(numero: number): boolean {
    if (numero % 2 == 0) {
        console.log(`Verificando se ${numero} é par: Verdadeiro`)
        return true
    }
    console.log(`Verificando se ${numero} é par: Falso`)
    return false;
}

export function converterParaBinario(numero: number): string {
    const numeroBinario = numero.toString(2);
    console.log(numeroBinario)
    return numeroBinario;
}

export function validarCEP(cep: string): boolean {
    return /^\d{8}$/.test(cep);
}

export function contarPalavras(frase: string): number {
    var palavras = frase.trim().split(/\s+/);
    return palavras.length;
}
