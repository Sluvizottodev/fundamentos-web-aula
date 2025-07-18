// P2 Fundamentos Web (ANTIGA): Exercícios Organizados

// 1. Objetos literais de produtos com método para calcular valor de estoque
const produto1 = {
  nome: "Notebook",
  preco: 3500.00,
  quantidade: 10,
  calcularValorEstoque() {
    return this.preco * this.quantidade;
  }
};

const produto2 = {
  nome: "Smartphone",
  preco: 2000.00,
  quantidade: 5,
  calcularValorEstoque() {
    return this.preco * this.quantidade;
  }
};

// 2. Função para exibir informações formatadas de um produto
function mostrarInformacoesProduto(prod) {
  return `Produto: ${prod.nome}\n` +
         `Preço: R$ ${prod.preco.toFixed(2)}\n` +
         `Quantidade em Estoque: ${prod.quantidade}\n` +
         `Valor Total em Estoque: R$ ${prod.calcularValorEstoque().toFixed(2)}`;
}

// 3. Exibindo informações dos produtos no console
console.log(mostrarInformacoesProduto(produto1));
console.log('--------------------------');
console.log(mostrarInformacoesProduto(produto2));

// 4. Função assíncrona para buscar e filtrar usuários da API
async function buscarUsuarios() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios = await response.json();

    // Filtra empresas com nome maior que 10 caracteres
    const filtrados = usuarios.filter(u => u.company.name.length > 10);

    console.log("Usuários filtrados:");
    filtrados.forEach(u => {
      console.log(`Nome: ${u.name}`);
      console.log(`Empresa: ${u.company.name}`);
      console.log('--------------------------');
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

// 5. Chamando a função de busca
buscarUsuarios();

/*
  Dicas para reproduzir questões similares na P2 de Fundamentos Web:

  1. Objetos e Métodos
     - Crie objetos literais representando entidades reais (p.ex., produto, usuário).
     - Adicione métodos para operações comuns (cálculo de estoque, formatação de dados).

  2. Funções de Utilidade
     - Escreva funções puras que recebam parâmetros e retornem valores formatados.
     - Utilize template strings para facilitar a montagem de saída.

  3. Consumo de API com fetch
     - Pratique chamadas assíncronas usando async/await.
     - Trate erros com try/catch.
     - Aplique filter/map/reduce para transformar dados.

  4. Estrutura e Organização
     - Separe o código em seções claras: definição de dados, funções e execução.
     - Use nomes descritivos e consistentes.

  5. Formatação e Boa Prática
     - Formate valores numéricos com toFixed.
     - Exiba saídas no console de forma legível.
*/
