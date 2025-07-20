const API_KEY = 'a84856bfc3e5c26197795407bc614b8a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const result = document.querySelector(".filmes");
const searchInput = document.querySelector("#searchInput");
let todosOsFilmes = [];

fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
  .then(res => res.json())
  .then(data => {
    todosOsFilmes = data.results;
    renderFilmes(todosOsFilmes);
  })
  .catch(err => console.error('Erro ao buscar filmes:', err));

function formatarData(data) {
  const date = new Date(data);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

function renderFilmes(filmes) {
  result.innerHTML = "";
  filmes.forEach(filme => {
    const container = document.createElement("div");
    container.classList.add("filme");

    const imagem = document.createElement("img");
    imagem.src = IMG_URL + filme.poster_path;
    imagem.alt = `Cartaz do filme ${filme.title}`;
    imagem.classList.add("filme-imagem");

    const info = document.createElement("div");
    info.classList.add("filme-info");

    const titulo = document.createElement("h2");
    titulo.textContent = filme.title;

    const resumo = document.createElement("p");
    let textoOriginal = filme.overview || "Sem descrição disponível.";
    if (textoOriginal.length > 150) {
      const textoCortado = textoOriginal.substring(0, 150) + "...";
      resumo.innerHTML = textoCortado;

      const botao = document.createElement("button");
      botao.textContent = "ver mais";
      botao.classList.add("ver-mais");
      botao.addEventListener("click", () => {
        resumo.textContent = textoOriginal;
      });

      resumo.appendChild(botao);
    } else {
      resumo.textContent = textoOriginal;
    }

    const nota = document.createElement("p");
    nota.innerHTML = `<span class="nota">⭐ ${filme.vote_average}</span>`;

    const dataLancamento = document.createElement("p");
    dataLancamento.textContent = `Lançamento: ${formatarData(filme.release_date)}`;

    info.appendChild(titulo);
    info.appendChild(resumo);
    info.appendChild(nota);
    info.appendChild(dataLancamento);

    container.appendChild(imagem);
    container.appendChild(info);
    result.appendChild(container);
  });
}

searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase();
  const filtrados = todosOsFilmes.filter(filme =>
    filme.title.toLowerCase().includes(termo)
  );
  renderFilmes(filtrados);
});
