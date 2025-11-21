document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.querySelector('.book-container');
    const searchInput = document.querySelector('input[type="text"]');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const modal = document.getElementById('book-modal');
    const closeModalButton = document.querySelector('.close-button');
    const backToTopButton = document.getElementById('back-to-top-btn');

    let allSeries = [];

    const showLoading = (isLoading) => {
        loadingIndicator.style.display = isLoading ? 'block' : 'none';
    };

    const openModal = (book) => {
        document.getElementById('modal-book-image').src = book.image_url;
        document.getElementById('modal-book-title').textContent = book.title;
        
        const synopsisElement = document.getElementById('modal-book-synopsis');
        if (book.sinopse) {
            synopsisElement.innerHTML = book.sinopse.replace(/\n\n/g, '<br><br>');
            synopsisElement.style.display = 'block';
        } else {
            synopsisElement.style.display = 'none';
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    const renderSeries = (series) => {
        bookContainer.innerHTML = '';
        if (series.length === 0) {
            bookContainer.innerHTML = '<p class="no-results">Nenhum resultado encontrado.</p>';
            return;
        }
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

                const shortDescription = book.description.length > 100 ? book.description.substring(0, 100) + '...' : book.description;

                bookCard.innerHTML = `
                    <img src="${book.image_url}" alt="${book.title}">
                    <div class="book-card-content">
                        <h3>${book.title}</h3>
                        <p class="book-description">${shortDescription}</p>
                        <a href="#" class="read-more">Saiba mais</a>
                    </div>
                `;
                bookCard.querySelector('.read-more').addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal(book);
                });
                bookGrid.appendChild(bookCard);
            });

            seriesSection.appendChild(bookGrid);
            bookContainer.appendChild(seriesSection);
        });
    };

    const search = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            renderSeries(allSeries);
            return;
        }

        const filteredSeries = allSeries.map(series => {
            const filteredBooks = series.books.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.description.toLowerCase().includes(searchTerm) ||
                (book.sinopse && book.sinopse.toLowerCase().includes(searchTerm))
            );
            return { ...series, books: filteredBooks };
        }).filter(series => series.books.length > 0);

        renderSeries(filteredSeries);
    };

    showLoading(true);
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allSeries = data.series;
            renderSeries(allSeries);
            showLoading(false);
        })
        .catch(error => {
            console.error('Error loading book data:', error);
            showLoading(false);
            bookContainer.innerHTML = '<p class="error">Erro ao carregar os dados.</p>';
        });

    searchInput.addEventListener('input', search);
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    backToTopButton.addEventListener('click', scrollToTop);
});