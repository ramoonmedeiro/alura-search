document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');

    if (searchTerm) {
        document.getElementById('search').value = searchTerm;
        performSearch(searchTerm);
    }

    document.getElementById('search-button').addEventListener('click', function() {
        const newSearchTerm = document.getElementById('search').value;
        performSearch(newSearchTerm);
    });

    document.getElementById('search').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const newSearchTerm = document.getElementById('search').value;
            performSearch(newSearchTerm);
        }
    });
});

function performSearch(searchTerm) {
    fetch(`http://localhost:8000/search?page=0&items_per_page=14`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search_term: searchTerm })
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';

        if (data && data.length > 0) {
            displayResults(data);
        } else {
            resultsContainer.textContent = 'No results found';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('results-container').textContent = 'Error to find results.';
    });
}

function displayResults(results) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Limpa os resultados anteriores

    if (results.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    results.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = movie.id; // Adiciona o ID do filme como um atributo de dados

        const img = document.createElement('img');
        img.src = movie.poster;
        img.alt = movie.title;
        img.className = 'card-image';

        const title = document.createElement('h3');
        title.textContent = movie.title;

        card.appendChild(img);
        card.appendChild(title);
        cardsContainer.appendChild(card);

        // Adiciona o ouvinte de evento de clique ao cartão
        card.addEventListener('click', function() {
            fetchMovieDetails(movie.id);
        });
    });

    container.appendChild(cardsContainer);
}

function fetchMovieDetails(movieId) {
    fetch(`http://localhost:8000/search_index?idx=${movieId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        expandCard(data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function expandCard(movie) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Limpa os resultados anteriores

    const expandedCard = document.createElement('div');
    expandedCard.className = 'expanded-card';

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', function() {
        performSearch(document.getElementById('search').value);
    });

    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = movie.title;
    img.className = 'expanded-card-image';

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const year = document.createElement('p');
    const releaseDate = new Date(movie.release_date * 1000); // Converte a data de lançamento
    year.textContent = `Year: ${releaseDate.getFullYear()}`;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    expandedCard.appendChild(closeButton);
    expandedCard.appendChild(img);
    expandedCard.appendChild(title);
    expandedCard.appendChild(year);
    expandedCard.appendChild(overview);

    container.appendChild(expandedCard);
}