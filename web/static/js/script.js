document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector(".search-button");
    const searchInput = document.getElementById("search");
    const resultsContainer = document.getElementById("results-container");

    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value;

        if (searchTerm) {
            fetch("http://localhost:8000/search?page=0&items_per_page=10", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ search_term: searchTerm })
            })
            .then(response => response.json())
            .then(data => {
                // Limpa os resultados anteriores
                resultsContainer.innerHTML = '';

                // Adiciona os novos resultados ao contêiner
                const resultsHtml = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
                resultsContainer.innerHTML = resultsHtml;
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
        } else {
            alert("Por favor, insira um termo de busca.");
        }
    });
});

function displayResults(results) {
    console.log('Resultados recebidos:', results); // Verifique se os dados estão corretos
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Limpa os resultados anteriores

    if (results.length === 0) {
        container.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';
    container.appendChild(cardsContainer);

    results.forEach(movie => {
        console.log('Criando card para o filme:', movie); // Verifique cada filme
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = movie.poster;
        img.alt = movie.title;
        img.className = 'card-img'; // Adiciona uma classe para estilizar a imagem
        card.appendChild(img);

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = movie.title;

        const genres = document.createElement('div');
        genres.className = 'card-genres';
        genres.textContent = `Gêneros: ${movie.genres.join(', ')}`;

        const year = document.createElement('div');
        year.className = 'card-year';
        year.textContent = `Ano: ${new Date(movie.release_date * 1000).getFullYear()}`;

        cardContent.appendChild(title);
        cardContent.appendChild(genres);
        cardContent.appendChild(year);
        card.appendChild(cardContent);

        cardsContainer.appendChild(card);
    });
}
