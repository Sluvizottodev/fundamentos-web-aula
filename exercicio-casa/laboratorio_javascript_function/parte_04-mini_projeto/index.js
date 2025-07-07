function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}


function verificarSituacao(media) {

    if (media >= 7) return "Aprovado";
    if (media >= 5) return "Em recuperação";
    return "Reprovado";

}


function avaliarAluno (nome, n1, n2, n3){
    const media = calcularMedia (n1, n2, n3);
    const situacao = verificarSituacao (media);
    console.log(`Aluno: ${nome} - Média: ${media.toFixed(2)} - Situação: ${situacao}`)
}

// Teste
avaliarAluno("Lucas", 6.5, 8.0, 7.0);