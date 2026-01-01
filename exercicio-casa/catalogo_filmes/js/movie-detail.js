/* ==================== CONFIGURAÇÃO API ==================== */

const API_KEY = 'a84856bfc3e5c26197795407bc614b8a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

/* ==================== ELEMENTOS DO DOM ==================== */

const backBtn = document.querySelector("#backBtn");
const loadingSpinner = document.querySelector("#loadingSpinner");

/* ==================== VALIDAÇÃO URL ==================== */

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (!movieId) {
  window.location.href = 'index.html';
}

/* ==================== FUNÇÕES UTILITÁRIAS ==================== */

/**
 * Formata valor em moeda USD
 */
function formatarMoeda(valor) {
  if (!valor || valor === 0) return '-';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(valor);
}

/**
 * Formata data para formato pt-BR
 */
function formatarData(data) {
  if (!data) return '-';
  const date = new Date(data);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Formata duração em minutos
 */
function formatarDuracao(minutos) {
  if (!minutos) return '-';
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return horas > 0 ? `${horas}h ${mins}min` : `${mins}min`;
}

/* ==================== BUSCA DE DADOS ==================== */

/**
 * Fetch dos dados do filme via API
 */
async function fetchMovieDetails() {
  try {
    loadingSpinner.style.display = 'flex';
    
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`
    );
    const data = await response.json();
    
    renderMovieDetails(data);
    loadingSpinner.style.display = 'none';
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
    loadingSpinner.style.display = 'none';
    alert('Erro ao carregar detalhes do filme');
  }
}

/* ==================== RENDERIZAÇÃO ==================== */

/**
 * Renderiza todos os dados do filme na página
 */
function renderMovieDetails(movie) {
  // ===== POSTER =====
  const posterImg = document.querySelector("#moviePoster");
  posterImg.src = IMG_URL + movie.poster_path;
  posterImg.alt = `Cartaz de ${movie.title}`;

  // ===== INFORMAÇÕES BÁSICAS =====
  document.querySelector("#movieTitle").textContent = movie.title;
  document.querySelector("#ratingValue").textContent = movie.vote_average.toFixed(1);

  // ===== METADADOS =====
  document.querySelector("#movieReleaseDate").textContent = formatarData(movie.release_date);
  document.querySelector("#movieDuration").textContent = formatarDuracao(movie.runtime);
  document.querySelector("#movieLanguage").textContent = movie.original_language.toUpperCase();

  // ===== GÊNEROS =====
  const genresContainer = document.querySelector("#movieGenres");
  if (movie.genres && movie.genres.length > 0) {
    genresContainer.innerHTML = movie.genres
      .map(genre => `<span class="genre-badge">${genre.name}</span>`)
      .join('');
  } else {
    genresContainer.innerHTML = '<span class="genre-badge">Sem categoria</span>';
  }

  // ===== SINOPSE =====
  const overview = movie.overview || 'Sinopse não disponível para este filme.';
  document.querySelector("#movieOverview").textContent = overview;

  // ===== DETALHES FINANCEIROS E ESTATÍSTICOS =====
  document.querySelector("#movieBudget").textContent = formatarMoeda(movie.budget);
  document.querySelector("#movieRevenue").textContent = formatarMoeda(movie.revenue);
  document.querySelector("#movieVotes").textContent = movie.vote_count.toLocaleString('pt-BR');

  // ===== PAÍS =====
  const country = movie.production_countries && movie.production_countries[0]
    ? movie.production_countries[0].name
    : '-';
  document.querySelector("#movieCountry").textContent = country;

  // ===== PRODUTORAS =====
  if (movie.production_companies && movie.production_companies.length > 0) {
    document.querySelector("#companhiasSection").style.display = 'block';
    const companiesHtml = movie.production_companies
      .map(company => `
        <div class="company-item">
          ${company.logo_path ? `<img src="${IMG_URL}${company.logo_path}" alt="${company.name}">` : '<i class="fas fa-film"></i>'}
          <span>${company.name}</span>
        </div>
      `)
      .join('');
    document.querySelector("#movieCompanies").innerHTML = companiesHtml;
  } else {
    document.querySelector("#companhiasSection").style.display = 'none';
  }

  // ===== ELENCO E DIREÇÃO =====
  if (movie.credits) {
    const director = movie.credits.crew?.find(person => person.job === 'Director');
    const cast = movie.credits.cast?.slice(0, 8) || [];

    if (director || cast.length > 0) {
      document.querySelector("#directoresSection").style.display = 'block';
      
      let castHtml = '';
      
      // Adiciona diretor em primeiro lugar
      if (director) {
        castHtml += `
          <div class="cast-item director">
            <div class="cast-avatar">
              ${director.profile_path ? 
                `<img src="${IMG_URL}${director.profile_path}" alt="${director.name}">` : 
                '<i class="fas fa-user"></i>'}
            </div>
            <div class="cast-info">
              <strong>${director.name}</strong>
              <small>Diretor(a)</small>
            </div>
          </div>
        `;
      }

      // Adiciona elenco
      cast.forEach(person => {
        castHtml += `
          <div class="cast-item">
            <div class="cast-avatar">
              ${person.profile_path ? 
                `<img src="${IMG_URL}${person.profile_path}" alt="${person.name}">` : 
                '<i class="fas fa-user"></i>'}
            </div>
            <div class="cast-info">
              <strong>${person.name}</strong>
              <small>${person.character || 'Elenco'}</small>
            </div>
          </div>
        `;
      });

      document.querySelector("#movieCast").innerHTML = castHtml;
    } else {
      document.querySelector("#directoresSection").style.display = 'none';
    }
  }
}

/* ==================== EVENT LISTENERS ==================== */

/**
 * Botão voltar
 */
backBtn.addEventListener('click', () => {
  window.history.back();
});

/**
 * Botão favoritar
 */
document.querySelector("#favoriteBtn").addEventListener('click', function() {
  this.classList.toggle('active');
  const icon = this.querySelector('i');
  if (this.classList.contains('active')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    this.innerHTML = '<i class="fas fa-heart"></i>Adicionado aos favoritos';
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    this.innerHTML = '<i class="far fa-heart"></i>Favoritar';
  }
});

/**
 * Botão compartilhar
 */
document.querySelector("#shareBtn").addEventListener('click', function() {
  if (navigator.share) {
    navigator.share({
      title: document.querySelector("#movieTitle").textContent,
      text: 'Confira este filme no Catálogo de Filmes!',
      url: window.location.href
    }).catch(err => console.log('Erro ao compartilhar:', err));
  } else {
    // Fallback para copiar URL
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copiada para a área de transferência!');
    }).catch(() => {
      alert('URL: ' + url);
    });
  }
});

/* ==================== INICIALIZAÇÃO ==================== */

fetchMovieDetails();
