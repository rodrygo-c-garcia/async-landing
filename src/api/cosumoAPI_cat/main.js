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

    const imgQueryParameters = await fetchData(
      `${urlAPI}?limit=10&'api_key=live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06'`
    );
    mostrarImagenes(imgQueryParameters);
  } catch (e) {
    console.log(e);
  }
};

consume_API(API);

function reload() {
  consume_API(API);
}

function mostrarImagenes(data) {
  console.log(data);
  const imgs = document.getElementById("imgs");
  imgs.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    // Crear una nueva imagen
    let img = new Image();

    // Establecer la URL de la imagen
    img.src = data[i].url;

    // Establecer el ancho y alto de la imagen
    img.width = "300";
    img.height = "200";
    // Agregar la imagen al documento
    imgs.appendChild(img);
  }
}
