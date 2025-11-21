document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.querySelector('.book-container');
    const searchButton = document.getElementById('botao-busca');
    const searchInput = document.querySelector('input[type="text"]');

    let allSeries = [];

    // Função para renderizar os livros na tela
    function renderSeries(series) {
        bookContainer.innerHTML = ''; // Limpa o container antes de adicionar novos dados
        series.forEach(serie => {
            const seriesSection = document.createElement('section');
            seriesSection.classList.add('series-section');

            const seriesTitle = document.createElement('h2');
            seriesTitle.textContent = serie.title;
            seriesSection.appendChild(seriesTitle);

            const bookGrid = document.createElement('div');
            bookGrid.classList.add('book-grid');

            serie.books.forEach(book => {
                const bookCard = document.createElement('article');
                bookCard.classList.add('book-card');

                bookCard.innerHTML = `
                    <img src="${book.image_url}" alt="${book.title}">
                    <div class="book-card-content">
                        <h3>${book.title}</h3>
                        <p>${book.description}</p>
                        <a href="#">Leia mais</a>
                    </div>
                `;
                bookGrid.appendChild(bookCard);
            });

            seriesSection.appendChild(bookGrid);
            bookContainer.appendChild(seriesSection);
        });
    }

    // Carrega os dados dos livros do JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allSeries = data.series;
            renderSeries(allSeries); // Renderiza todas as séries inicialmente
        })
        .catch(error => console.error('Error loading book data:', error));

    // Função de busca
    function search() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            renderSeries(allSeries);
            return;
        }

        const filteredSeries = allSeries.map(series => {
            const filteredBooks = series.books.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.description.toLowerCase().includes(searchTerm)
            );
            return { ...series, books: filteredBooks };
        }).filter(series => series.books.length > 0);

        renderSeries(filteredSeries);
    }

    // Adiciona o evento de clique ao botão de busca
    searchButton.addEventListener('click', search);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            search();
        }
    });
});