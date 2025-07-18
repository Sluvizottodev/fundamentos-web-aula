const API_KEY = 'a84856bfc3e5c26197795407bc614b8a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const result = document.querySelector(".filmes");
const searchInput = document.querySelector("#searchInput");
let todosOsFilmes = [];

fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then(response => response.json())
    .then(data => {
        todosOsFilmes = data.results;
        renderFilmes(todosOsFilmes);
    })
    .catch(error => console.error('Erro ao buscar filmes:', error));

function renderFilmes(filmes) {
    result.innerHTML = "";
    filmes.forEach(filme => {
        const filmeContainer = document.createElement("div");
        filmeContainer.classList.add("filme");

        const imagem = document.createElement("img");
        imagem.src = IMG_URL + filme.poster_path;
        imagem.alt = filme.title;
        imagem.classList.add("filme-imagem");

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("filme-info");

        const titulo = document.createElement("h2");
        titulo.textContent = filme.title;

        const resumo = document.createElement("p");
        resumo.textContent = filme.overview || "Sem descrição disponível.";

        const nota = document.createElement("p");
        nota.innerHTML = `Nota: <strong>${filme.vote_average}</strong> ⭐`;

        const dataLancamento = document.createElement("p");
        dataLancamento.textContent = `Lançamento: ${filme.release_date}`;

        infoContainer.appendChild(titulo);
        infoContainer.appendChild(resumo);
        infoContainer.appendChild(nota);
        infoContainer.appendChild(dataLancamento);

        filmeContainer.appendChild(imagem);
        filmeContainer.appendChild(infoContainer);
        result.appendChild(filmeContainer);
    });
}

searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();
    const filtrados = todosOsFilmes.filter(filme =>
        filme.title.toLowerCase().includes(termo)
    );
    renderFilmes(filtrados);
});