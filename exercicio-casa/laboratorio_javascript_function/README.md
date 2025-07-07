# 💻 Laboratório de JavaScript: Explorando Funções

**Disciplina:** Fundamentos da Web  
**Período:** 3º período  
**Curso:** Bacharelado em Sistemas de Informação  
---

## 🎯 Objetivos do Laboratório

- Compreender a sintaxe e uso de funções em JavaScript  
- Criar funções com e sem parâmetros, com e sem retorno  
- Modularizar código através de funções  
- Aplicar lógica de programação em situações reais  

---

## 📁 Estrutura do Projeto

Crie os seguintes arquivos na mesma pasta:

### `index.html`

Crie um arquivo HTML básico com um título e um `<script>` apontando para o arquivo `script.js`. Ele servirá como ponto de entrada no navegador.

### `script.js`

Implemente todos os exercícios descritos abaixo neste arquivo.

---

## 🧪 Etapas do Laboratório

### 🔹 Parte 1 – Funções Simples 

- Crie uma função `saudacao()` que imprime uma mensagem de boas-vindas no console.
- **Desafio:** Crie uma função `mostrarHora()` que imprime a hora atual usando `new Date()`.

---

### 🔹 Parte 2 – Funções com Parâmetros

- Crie uma função `saudacaoPersonalizada(nome)` que imprime uma saudação personalizada.
- **Desafio:** Crie uma função `calcularAreaRetangulo(largura, altura)` que imprime a área do retângulo.

---

### 🔹 Parte 3 – Funções com Retorno 

- Crie uma função `somar(a, b)` que retorna a soma de dois números.
- Armazene o resultado em uma variável e exiba no console.
- **Desafio:** Crie uma função `ehPar(numero)` que retorna `true` se o número for par e `false` caso contrário.

---

### 🔹 Parte 4 – Mini-projeto: Sistema de Notas

- Crie uma função `calcularMedia(n1, n2, n3)` que retorna a média entre três notas.
- Crie uma função `verificarSituacao(media)` que retorna:
  - `"Aprovado"` se a média for maior ou igual a 7;
  - `"Em recuperação"` se for entre 5 e 6.9;
  - `"Reprovado"` se for menor que 5.
- Calcule a média e exiba a situação no console.
- **Desafio Bônus:** Crie uma função `avaliarAluno(nome, n1, n2, n3)` que imprime o nome, a média e a situação do aluno.

---

## ✅ Avaliação Formativa

- O aluno consegue declarar e utilizar funções corretamente?  
- Usa parâmetros e retornos de forma adequada?  
- Aplica lógica na resolução de problemas?

---

## 🧩 Extensões (opcional)
 
2. Crie uma função `gerarSenhaAleatoria()` que retorna uma senha de 8 caracteres aleatórios.

---

## ▶️ Instruções de Execução

### 🔸 No Navegador

1. Abra o arquivo `index.html` em um navegador.
2. Pressione `F12` para abrir o console e visualizar os resultados.

### 🔸 No Terminal com Node.js

1. Certifique-se de que o Node.js está instalado.
2. Execute o arquivo `script.js` com o comando:

```bash
node <<path/...>>/script.js
