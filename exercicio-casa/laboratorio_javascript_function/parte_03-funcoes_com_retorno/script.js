function somar(a, b){
    return a + b;
}

function ehPar(n){
    return n%2 == 0;
}

let resultado = somar (5, 3);
console.log("Soma" , resultado);

if (ehPar(resultado)) {
    console.log("O resultado é par.");
} else {
    console.log("O resultado é ímpar.");
}