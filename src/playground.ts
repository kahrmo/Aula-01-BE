import { contarPalavras, converterParaBinario, ehPar, mediaArray, validarCEP, verificarSenhaForte} from './controllers/apiController';

console.log("Verificar Senha Forte:")
verificarSenhaForte("12345678")
verificarSenhaForte("1234567")

ehPar(4); // true
ehPar(3); // false

mediaArray([5, 5, 5]) //5

converterParaBinario(2); // = 10

console.log(validarCEP("12345678")); // true
console.log(validarCEP("1234567a")); // false (tem letra)
console.log(validarCEP("123456789")); // false (9 dígitos)
 

console.log(contarPalavras("Jesus is coming")); //3 palavras