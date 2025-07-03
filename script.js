const section = document.querySelector("section");
const API_KEY = "d5af395b4be1c79f620c2434de653f06";
const BASE_URL = "https://api.themoviedb.org/3";

const urls = {
    popular: BASE_URL + "/movie/popular?api_key=" + API_KEY + "&language=en-US&page=1",
    upcoming: BASE_URL + "/movie/upcoming?api_key=" + API_KEY + "&language=en-US&page=1",
    originals: BASE_URL + "/discover/tv?api_key=" + API_KEY + "&with_networks=213",
    trending: BASE_URL + "/trending/movie/day?language=en-US&api_key=" + API_KEY,
    topRated: BASE_URL + "/movie/top_rated?language=en-US&page=1&api_key=" + API_KEY,
    actionMovies: BASE_URL + "/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=28&api_key=" + API_KEY,
    comedyMovies: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=35",
    horrorMovies: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=27",
    romanticMovies: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=10749",
    documentaries: BASE_URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=99"
};


function setRandomBanner(movies) {
    const banner = document.getElementById("banner");

    if (!movies || movies.length === 0) return;

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    banner.style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + randomMovie.backdrop_path;

    const data=document.createElement("div");
    data.classList.add("fire")
    const title = document.createElement("h1");
    const para = document.createElement("p");
    title.textContent = randomMovie.title
    para.textContent = randomMovie.overview
    data.append(title,para)
    console.log(title);
    banner.append(data);


    console.log(movies);

}

async function fetchAllCategories() {
    try {
        const responses = await Promise.all(Object.values(urls).map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));

        const categories = Object.keys(urls);

        categories.forEach((category, index) => {
            const results = data[index].results;
            if (category === "popular") {
                setRandomBanner(results);
            }
            showData(results, category);
        });

    } catch (error) {
        console.error("Error fetching movie categories:", error);
    }
}

function showData(movies, category) {
    const heading = document.createElement("h1");
    heading.textContent = category.toUpperCase();
    section.appendChild(heading);

    const container = document.createElement("div");
    container.classList.add("category");

    movies.forEach((movie) => {
        const parent = document.createElement("div");
        parent.classList.add("movies");

        const anchor = document.createElement("a");
        anchor.href = "single.html?id=" + (movie.id || "");

        const img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        img.alt = movie.title || movie.name;

        const title = document.createElement("h2");
        title.textContent = movie.title || movie.name;

        const language = document.createElement("p");
        language.textContent = "Language: " + movie.original_language;

        anchor.append(img);
        parent.append(anchor, title, language);
        container.append(parent);
    });

    section.append(container);
}


fetchAllCategories();
