
//ANIME API SEARCH

document.getElementById("fetch-button").addEventListener("click", fetchData);
const typeAnime = document.getElementById("type-anime");
const statusAnime = document.getElementById("status-anime");
const ratingAnime = document.getElementById("rating-anime");


async function fetchData() {

    let input_raiting = ratingAnime.value;
    let input_status = statusAnime.value;
    let input_type = typeAnime.value;



    renderLoadingState();
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${input_raiting}&q=${input_status}&q=${input_type}`);
        if (!response.ok) {
            throw new Error("El api no está bien");
        }
        const data = await response.json();
        renderData(data)
    } catch (error) {
        renderErrorState();
    }
}

function renderErrorState() {
    const container = document.getElementById("data-container");
    container.innerHTML = "";
    container.innerHTML = "<p>Error al cargar la data</p>";
    console.log("Error al cargar el contenido");
}

function renderLoadingState() {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; 
    container.innerHTML = "<p>Cargando...</p>";
    console.log("Cargando...");
}

function renderData(animeData) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous data

    animeData.data.forEach((anime) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h2>${anime.title}</h2>
        <p><b>Year:</b> ${anime.year}</p>
        <p><b>Type:</b> ${anime.type}</p>
        <p><b><Status:/b> ${anime.status}</p>
        <p><b>Episodes:</b> ${anime.episodes}</p>
        <p><b>Duration:</b> ${anime.duration}</p>
        <p><b>Rating:</b> ${anime.rating}</p>
      `;
      container.appendChild(card);
    });
}

// FREE API 1 CAT

const buttonGetCatFact = document.getElementById("get-data").addEventListener("click", getCatFact);

async function getCatFact() {
    renderLoadingState("facts");
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json();
    renderCatFact(data);
    const resultsPFact = document.querySelector(".facts .results");
    resultsPFact.innerHTML= ""
      
    } catch (error) {
      renderErrorState("facts");
    }
  }

  const renderCatFact = (data) => {
    const containerFact = document.querySelector(".fact");
    containerFact.innerHTML = "";

    const factText = document.createElement("h4");
    factText.className = "fact-text";
    factText.textContent = `${data?.fact}`;
    containerFact.appendChild(factText);
}

// FREE API GET ACTIVITY

const buttonGetActivity = document.getElementById("get-data-activity").addEventListener("click", getActivity);

async function getActivity() {
    renderLoadingState("activities");
    try {
      const response = await fetch("https://bored.api.lewagon.com/api/activity");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json();
    renderActivity(data);
    
    const resultsPActivity = document.querySelector(".activities .results");
    resultsPActivity.innerHTML= ""
      
    } catch (error) {
      renderErrorState("activities");
    }
  }

  const renderActivity = (data) => {
    const containerActivity = document.querySelector(".activity");
    containerActivity.innerHTML = "";

    const activityContent = document.createElement("div");
    activityContent.className = "activity-content";
    activityContent.innerHTML = `
        <h4><b>Name:</b> ${data?.activity}</h4>
        <p><b>Type:</b> ${data?.type}</p>
        <p><b>Participants:</b> ${data?.participants}</p>
        <p><b>Price:</b> ${data?.price}</p>
    `;
    containerActivity.appendChild(activityContent);
}
