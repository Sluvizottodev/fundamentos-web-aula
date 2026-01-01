/* ==================== CONFIGURAÇÃO API ==================== */

const API_KEY = 'a84856bfc3e5c26197795407bc614b8a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

/* ==================== ELEMENTOS DO DOM ==================== */

const result = document.querySelector(".filmes");
const searchInput = document.querySelector("#searchInput");
const loadMoreBtn = document.querySelector("#loadMoreBtn");

/* ==================== VARIÁVEIS DE ESTADO ==================== */

let todosOsFilmes = [];
let filmesFiltrados = [];
let paginaAtual = 1;
let filmesCarregados = 20;

/* ==================== CARREGAMENTO INICIAL ==================== */

fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
  .then(res => res.json())
  .then(data => {
    todosOsFilmes = data.results;
    filmesFiltrados = [...todosOsFilmes];
    renderFilmes(filmesFiltrados.slice(0, filmesCarregados));
  })
  .catch(err => console.error('Erro ao buscar filmes:', err));

/* ==================== FUNÇÕES UTILITÁRIAS ==================== */

/**
 * Formata data para formato pt-BR
 */
function formatarData(data) {
  const date = new Date(data);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

/* ==================== CRIAÇÃO DE ELEMENTOS ==================== */

/**
 * Cria elemento HTML para cada filme
 */
function criarFilmeElement(filme) {
  const container = document.createElement("div");
  container.classList.add("filme");

  // Imagem
  const imagem = document.createElement("img");
  imagem.src = IMG_URL + filme.poster_path;
  imagem.alt = `Cartaz do filme ${filme.title}`;
  imagem.classList.add("filme-imagem");

  // Info container
  const info = document.createElement("div");
  info.classList.add("filme-info");

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = filme.title;

  // Resumo com "Ver mais"
  const resumo = document.createElement("p");
  let textoOriginal = filme.overview || "Sem descrição disponível.";
  
  if (textoOriginal.length > 150) {
    const textoCortado = textoOriginal.substring(0, 150) + "...";
    resumo.innerHTML = textoCortado;

    const botao = document.createElement("button");
    botao.textContent = "ver mais";
    botao.classList.add("ver-mais");
    botao.addEventListener("click", (e) => {
      e.stopPropagation();
      resumo.textContent = textoOriginal;
    });

    resumo.appendChild(botao);
  } else {
    resumo.textContent = textoOriginal;
  }

  // Nota/Rating
  const nota = document.createElement("p");
  const starIcon = document.createElement("i");
  starIcon.className = "fas fa-star";
  nota.className = "nota";
  nota.textContent = ` ${filme.vote_average.toFixed(1)}`;
  nota.insertBefore(starIcon, nota.firstChild);

  // Data de lançamento
  const dataLancamento = document.createElement("p");
  const calendarIcon = document.createElement("i");
  calendarIcon.className = "fas fa-calendar";
  const span = document.createElement("span");
  span.textContent = formatarData(filme.release_date);
  dataLancamento.appendChild(calendarIcon);
  dataLancamento.appendChild(document.createTextNode(" "));
  dataLancamento.appendChild(span);

  // Monta estrutura
  info.appendChild(titulo);
  info.appendChild(resumo);
  info.appendChild(nota);
  info.appendChild(dataLancamento);

  container.appendChild(imagem);
  container.appendChild(info);

  // Evento de clique para ir aos detalhes
  container.addEventListener("click", () => {
    window.location.href = `movie-detail.html?id=${filme.id}`;
  });

  return container;
}

/* ==================== RENDERIZAÇÃO ==================== */

/**
 * Renderiza filmes na tela
 */
function renderFilmes(filmes, adicionar = false) {
  if (!adicionar) {
    result.innerHTML = "";
  }

  filmes.forEach(filme => {
    result.appendChild(criarFilmeElement(filme));
  });

  // Atualiza estado do botão
  const totalExibido = result.children.length;
  if (totalExibido >= filmesFiltrados.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Todos os filmes carregados";
  } else {
    loadMoreBtn.disabled = false;
    loadMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i>Carregar mais filmes';
  }
}

/**
 * Carrega mais 20 filmes
 */
function carregarMaisFilmes() {
  const proximaFaixa = filmesFiltrados.slice(
    filmesCarregados,
    filmesCarregados + 20
  );

  if (proximaFaixa.length > 0) {
    filmesCarregados += 20;
    renderFilmes(proximaFaixa, true);
  }
}

/* ==================== EVENT LISTENERS ==================== */

loadMoreBtn.addEventListener("click", carregarMaisFilmes);

searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase();
  filmesFiltrados = todosOsFilmes.filter(filme =>
    filme.title.toLowerCase().includes(termo)
  );
  
  filmesCarregados = 20;
  renderFilmes(filmesFiltrados.slice(0, filmesCarregados));
});
