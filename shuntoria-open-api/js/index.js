const resultContainer = document.getElementById("result");
const sectionTitle = document.getElementById("section-title");
const sectionDescription = document.getElementById("section-description");
const navButtons = document.querySelectorAll(".nav-button");

const views = {
  character: {
    title: "Main Character",
    description: "Loading character details from the Star Wars API.",
    url: "https://www.swapi.tech/api/people/1",
    render: renderCharacter,
  },
  film: {
    title: "Film Information",
    description: "Loading film details from the Star Wars API.",
    url: "https://www.swapi.tech/api/films/1",
    render: renderFilm,
  },
};

function showLoadingMessage() {
  resultContainer.innerHTML = '<p class="status-message">Loading data...</p>';
}

function showErrorMessage(message) {
  resultContainer.innerHTML = `<p class="status-message error">${message}</p>`;
}

function createCard(titleText) {
  const card = document.createElement("article");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = titleText;
  card.appendChild(title);

  return card;
}

function createDetail(label, value) {
  const item = document.createElement("p");
  item.classList.add("detail");

  const labelText = document.createElement("strong");
  labelText.textContent = `${label}:`;

  item.appendChild(labelText);
  item.append(` ${value}`);

  return item;
}

function renderCharacter(data) {
  const person = data.result.properties;
  const card = createCard(person.name);

  card.appendChild(createDetail("Height", `${person.height} cm`));
  card.appendChild(createDetail("Mass", `${person.mass} kg`));
  card.appendChild(createDetail("Birth year", person.birth_year));
  card.appendChild(createDetail("Gender", person.gender));
  card.appendChild(createDetail("Eye color", person.eye_color));

  resultContainer.innerHTML = "";
  resultContainer.appendChild(card);
}

function renderFilm(data) {
  const film = data.result.properties;
  const card = createCard(film.title);

  card.appendChild(createDetail("Episode", film.episode_id));
  card.appendChild(createDetail("Director", film.director));
  card.appendChild(createDetail("Producer", film.producer));
  card.appendChild(createDetail("Release date", film.release_date));

  const openingCrawl = document.createElement("p");
  openingCrawl.classList.add("crawl");
  openingCrawl.textContent = film.opening_crawl;
  card.appendChild(openingCrawl);

  resultContainer.innerHTML = "";
  resultContainer.appendChild(card);
}

function setActiveButton(viewName) {
  navButtons.forEach((button) => {
    const isActive = button.dataset.view === viewName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function loadView(viewName) {
  const view = views[viewName];

  if (!view) {
    return;
  }

  sectionTitle.textContent = view.title;
  sectionDescription.textContent = view.description;
  setActiveButton(viewName);
  showLoadingMessage();

  fetch(view.url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(`SWAPI ${viewName} response:`, data);
      view.render(data);
    })
    .catch((error) => {
      console.error(`Error fetching ${viewName} data:`, error);
      showErrorMessage(`Could not load ${viewName} data right now.`);
    });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loadView(button.dataset.view);
  });
});

loadView("character");
