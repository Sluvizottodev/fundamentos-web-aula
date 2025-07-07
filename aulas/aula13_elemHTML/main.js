
const result = document.querySelector(".receitas")
receitas.forEach(function (receita){

    console.log(receita)
    result.appendChild(criaItem("h3", "textContent", receita.nome))
    result.appendChild(criaItem("p", "textContent", receita.descricao))
    result.appendChild(criaItem("img", "src", receita.foto))
    result.appendChild(criaItem("li", "textContent", receita.ingredientes));
    result.appendChild(criaItem("p", "textContent", receita.preparo))
})