const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCva_RPO2fxdLfO4bmJFZRzA&part=snippet%2Cid&order=date&maxResults=5";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b18d0af76cmsh234ce4ea38fdf18p120e05jsn09095eac39be",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  return data;
}

// funcion que se ejecuta cuando cargar nuestro archivo
(async () => {
  try {
    const videos = await fetchData(API);

    // template, para iterar los videos
    let view = `
    ${videos.items
      .map(
        (video) => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `
      )
      // mostrar 4 elementos (de 0 a 4)
      .slice(0, 4)
      // unimos todos los elementos
      .join("")}
    `;

    // mostramos en el HTML
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
