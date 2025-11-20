document.addEventListener('DOMContentLoaded', () => {
    const bookGrid = document.querySelector('.book-grid');
    const searchButton = document.getElementById('botao-busca');

    let allBooks = [];

    // Função para renderizar os livros na tela
    function renderBooks(books) {
        bookGrid.innerHTML = ''; // Limpa a grade antes de adicionar novos livros
        books.forEach(book => {
            const bookCard = document.createElement('article');
            bookCard.classList.add('book-card');

            bookCard.innerHTML = `
                <img src="${book.image_url}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>${book.description}</p>
                <a href="#">Leia mais</a>
            `;

            bookGrid.appendChild(bookCard);
        });
    }

    // Carrega os dados dos livros do JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allBooks = data.books;
            renderBooks(allBooks); // Renderiza todos os livros inicialmente
        })
        .catch(error => console.error('Error loading book data:', error));

    // Função de busca
    function search() {
        const searchTerm = document.querySelector('input[type="text"]').value.toLowerCase();
        const filteredBooks = allBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.description.toLowerCase().includes(searchTerm)
        );
        renderBooks(filteredBooks);
    }

    // Adiciona o evento de clique ao botão de busca
    searchButton.addEventListener('click', search);
});