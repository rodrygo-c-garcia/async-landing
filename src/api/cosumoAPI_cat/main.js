const API = "https://api.thecatapi.com/v1/images/search";

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data;
}

const consume_API = async (urlAPI) => {
  try {
    const img = await fetchData(`${urlAPI}`);
    const imgHTML = document.querySelector("img");
    imgHTML.src = img[0].url;
    // mostramos en la consola
    console.log(img[0].url);
  } catch (e) {
    console.log(e);
  }
};

consume_API(API);

function reload() {
  consume_API(API);
}
