document.addEventListener("DOMContentLoaded", () => {
  // Garante que o script só será executado após o carregamento completo do HTML da página.
  const bookContainer = document.querySelector(".book-container"); // Seleciona o contêiner principal onde os livros serão exibidos.
  const searchInput = document.querySelector('input[type="text"]'); // Seleciona o campo de busca.
  const loadingIndicator = document.querySelector(".loading-indicator"); // Seleciona o elemento que mostra a mensagem "Carregando...".
  const modal = document.getElementById("book-modal"); // Seleciona a janela modal pelo seu ID.
  const closeModalButton = document.querySelector(".close-button"); // Seleciona o botão de fechar ('X') do modal.
  const backToTopButton = document.getElementById("back-to-top-btn"); // Seleciona o botão "Voltar ao Topo".

  let allSeries = []; // Declara um array vazio que armazenará todos os dados dos livros após serem carregados do JSON.

  const showLoading = (isLoading) => {
    // Função para mostrar ou esconder o indicador de carregamento.
    loadingIndicator.style.display = isLoading ? "block" : "none"; // Se isLoading for verdadeiro, mostra o indicador; senão, esconde.
  };

  const openModal = (book) => {
    // Função para abrir e preencher o modal com as informações de um livro específico.
    document.getElementById("modal-book-image").src = book.image_url; // Define a imagem do modal com a URL da imagem do livro.
    document.getElementById("modal-book-title").textContent = book.title; // Define o título do modal com o título do livro.

    const synopsisElement = document.getElementById("modal-book-synopsis"); // Seleciona o elemento da sinopse no modal.
    if (book.sinopse) {
      // Verifica se o livro possui uma sinopse.
      synopsisElement.innerHTML = book.sinopse.replace(/\n\n/g, "<br><br>"); // Insere a sinopse, trocando quebras de linha por tags <br> para formatação.
      synopsisElement.style.display = "block"; // Mostra o elemento da sinopse.
    } else {
      // Se não houver sinopse...
      synopsisElement.style.display = "none"; // Esconde o elemento da sinopse.
    }

    modal.style.display = "block"; // Torna o modal visível.
    document.body.style.overflow = "hidden"; // Impede a rolagem do corpo da página enquanto o modal estiver aberto.
  };

  const closeModal = () => {
    // Função para fechar o modal.
    modal.style.display = "none"; // Esconde o modal.
    document.body.style.overflow = "auto"; // Permite a rolagem do corpo da página novamente.
  };

  const scrollToTop = () => {
    // Função para rolar a página suavemente de volta ao topo.
    window.scrollTo({ top: 0, behavior: "smooth" }); // Executa a rolagem para a posição 0 (topo) com uma animação suave.
  };

  window.onscroll = () => {
    // Evento que é acionado sempre que o usuário rola a página.
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      // Verifica se a rolagem vertical é maior que 20 pixels.
      backToTopButton.style.display = "block"; // Se for, mostra o botão "Voltar ao Topo".
    } else {
      // Senão...
      backToTopButton.style.display = "none"; // Esconde o botão.
    }
  };

  const renderSeries = (series) => {
    // Função principal que renderiza (desenha) as séries e os livros na tela.
    bookContainer.innerHTML = ""; // Limpa o contêiner de livros para evitar conteúdo duplicado.
    if (series.length === 0) {
      // Verifica se não há séries para exibir (ex: resultado de busca vazio).
      bookContainer.innerHTML =
        '<p class="no-results">Nenhum resultado encontrado.</p>'; // Exibe uma mensagem de "nenhum resultado".
      return; // Encerra a função.
    }
    series.forEach((serie) => {
      // Itera sobre cada objeto de série no array.
      const seriesSection = document.createElement("section"); // Cria um elemento <section> para a série.
      seriesSection.classList.add("series-section"); // Adiciona a classe CSS para estilização.

      const seriesTitle = document.createElement("h2"); // Cria um elemento <h2> para o título da série.
      seriesTitle.textContent = serie.title; // Define o texto do título.
      seriesSection.appendChild(seriesTitle); // Adiciona o título à seção da série.

      const bookGrid = document.createElement("div"); // Cria uma <div> para a grade de livros.
      bookGrid.classList.add("book-grid"); // Adiciona a classe CSS para o layout de grade.

      serie.books.forEach((book) => {
        // Itera sobre cada livro dentro da série.
        const bookCard = document.createElement("article"); // Cria um <article> para o card do livro.
        bookCard.classList.add("book-card"); // Adiciona a classe CSS para estilização do card.

        const shortDescription =
          book.description.length > 100
            ? book.description.substring(0, 100) + "..."
            : book.description; // Cria uma descrição curta (máximo 100 caracteres).

        bookCard.innerHTML = ` // Preenche o conteúdo do card usando um template literal.
                    <img src="${book.image_url}" alt="${book.title}">
                    <div class="book-card-content">
                        <h3>${book.title}</h3>
                        <p class="book-description">${shortDescription}</p>
                        <a href="#" class="read-more">Saiba mais</a>
                    </div>
                `;
        bookCard.querySelector(".read-more").addEventListener("click", (e) => {
          // Adiciona um evento de clique ao link "Saiba mais".
          e.preventDefault(); // Impede que o link recarregue a página.
          openModal(book); // Chama a função para abrir o modal com os dados deste livro.
        });
        bookGrid.appendChild(bookCard); // Adiciona o card do livro à grade.
      });

      seriesSection.appendChild(bookGrid); // Adiciona a grade de livros à seção da série.
      bookContainer.appendChild(seriesSection); // Adiciona a seção da série completa ao contêiner principal.
    });
  };

  const search = () => {
    // Função para filtrar os livros com base no termo de busca.
    const searchTerm = searchInput.value.toLowerCase().trim(); // Pega o valor do campo de busca, converte para minúsculas e remove espaços extras.
    if (searchTerm === "") {
      // Se o campo de busca estiver vazio...
      renderSeries(allSeries); // Renderiza todas as séries novamente.
      return; // Encerra a função.
    }

    const filteredSeries = allSeries
      .map((series) => {
        // Mapeia cada série para uma nova versão filtrada.
        const filteredBooks = series.books.filter(
          (
            book // Filtra os livros de cada série.
          ) =>
            book.title.toLowerCase().includes(searchTerm) || // Verifica se o título do livro inclui o termo de busca.
            book.description.toLowerCase().includes(searchTerm) || // Verifica se a descrição inclui o termo de busca.
            (book.sinopse && book.sinopse.toLowerCase().includes(searchTerm)) // Verifica se a sinopse (se existir) inclui o termo de busca.
        );
        return { ...series, books: filteredBooks }; // Retorna uma cópia da série, mas com a lista de livros filtrada.
      })
      .filter((series) => series.books.length > 0); // Filtra as séries para remover aquelas que ficaram sem livros após a busca.

    renderSeries(filteredSeries); // Renderiza na tela apenas as séries e livros que passaram no filtro.
  };

  showLoading(true); // Mostra o indicador de carregamento antes de buscar os dados.
  fetch("data.json") // Inicia a busca pelo arquivo 'data.json'.
    .then((response) => response.json()) // Quando a resposta chegar, converte o corpo da resposta para o formato JSON.
    .then((data) => {
      // Quando a conversão para JSON estiver completa...
      allSeries = data.series; // Armazena os dados das séries na variável global 'allSeries'.
      renderSeries(allSeries); // Renderiza todas as séries na tela pela primeira vez.
      showLoading(false); // Esconde o indicador de carregamento.
    })
    .catch((error) => {
      // Se ocorrer qualquer erro durante o fetch ou a conversão...
      console.error("Error loading book data:", error); // Exibe o erro no console do navegador.
      showLoading(false); // Esconde o indicador de carregamento.
      bookContainer.innerHTML =
        '<p class="error">Erro ao carregar os dados.</p>'; // Mostra uma mensagem de erro para o usuário.
    });

  searchInput.addEventListener("input", search); // Adiciona um evento que chama a função 'search' toda vez que o usuário digita algo no campo de busca.
  closeModalButton.addEventListener("click", closeModal); // Adiciona um evento de clique no botão 'X' do modal para fechá-lo.
  window.addEventListener("click", (event) => {
    // Adiciona um evento de clique na janela inteira.
    if (event.target === modal) {
      // Verifica se o local clicado foi a área de fundo do modal (fora do conteúdo).
      closeModal(); // Se sim, fecha o modal.
    }
  });
  window.addEventListener("keydown", (event) => {
    // Adiciona um evento que escuta as teclas pressionadas.
    if (event.key === "Escape") {
      // Verifica se a tecla pressionada foi 'Escape'.
      closeModal(); // Se sim, fecha o modal.
    }
  });
  backToTopButton.addEventListener("click", scrollToTop); // Adiciona um evento de clique no botão "Voltar ao Topo" para executar a rolagem.
});