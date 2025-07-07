function gerarSenhaAleatoria(){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]';
    let senha = '';
    const MAX = 8
    for(let i = 0; i < MAX; i++){
        const indice = Math.floor(Math.random()* chars.length);
        senha += chars[indice];
    }
    return senha;
}

// teste
console.log("Senha gerada:", gerarSenhaAleatoria());