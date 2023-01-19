const API = "https://api.thecatapi.com/v1";

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data;
}

const cat_one = async (urlAPI) => {
  try {
    const img = await fetchData(`${urlAPI}/images/search`);
    const imgHTML = document.querySelector("img");
    imgHTML.src = img[0].url;
  } catch (e) {
    console.log(e);
  }
};

const cats_aletorios = async (urlAPI) => {
  try {
    const data = await fetchData(
      `${urlAPI}/images/search?limit=5&api_key=live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06`
    );

    mostrarImagenes(data);
  } catch (e) {
    console.log(e);
  }
};

const cats_favorites = async (urlAPI) => {
  try {
    const data = await fetchData(
      `${urlAPI}/favourites?limit=50&api_key=live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06`
    );
    mostrar_favorites(data);
  } catch (e) {
    console.log(e);
  }
};

async function post_cat_favorite(urlAPI, id) {
  const response = await fetch(urlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // informacion que queremos transmitir a la APU
    body: JSON.stringify({
      image_id: id,
    }),
  });
  return response;
}

cat_one(API);
cats_aletorios(API);
cats_favorites(API);

function reload() {
  consume_API(API);
}

function mostrarImagenes(data) {
  console.log(data);
  const imgs = document.getElementById("imgs");
  imgs.innerHTML = "";
  let band = 1;
  for (let i = 0; i < data.length; i++) {
    createImg(data[i].id, data[i].url, imgs, band);
  }
}

function mostrar_favorites(data) {
  console.log(data);
  const cats_favorites = document.getElementById("cats-favorites");
  cats_favorites.innerHTML = "";
  let band = 0;

  for (let i = 0; i < data.length; i++) {
    createImg(data[i].id, data[i].image.url, cats_favorites, band);
  }
}

function createImg(id, url, imgs, band) {
  let img = new Image();
  img.src = url;
  img.setAttribute("id", `${id}`);

  img.width = "300";
  img.height = "200";

  imgs.appendChild(img);
  createBtn(id, imgs, band);
}

function createBtn(id, imgs, band) {
  let btn = document.createElement("button");

  btn.innerHTML = band ? "Añadir a Favoritos" : "Eliminar de Favoritos";
  btn.classList.add("btn");
  btn.classList.add(`${band ? "btn-success" : "btn-danger"}`);
  btn.setAttribute("id", `btn${id}`);
  btn.setAttribute(
    "onclick",
    `post_cat_favorite('${API}/favourites?api_key=live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06', '${id}')`
  );

  imgs.appendChild(btn);
}
