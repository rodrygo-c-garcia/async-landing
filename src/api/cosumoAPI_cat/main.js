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
      `${urlAPI}/favourites?limit=10&api_key=live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06`
    );
    mostrarImagenes(data);
  } catch (e) {
    console.log(e);
  }
};

cat_one(API);
cats_aletorios(API);

function reload() {
  consume_API(API);
}

function mostrarImagenes(data) {
  const imgs = document.getElementById("imgs");
  imgs.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    createImg(i + 1, data[i].url, imgs);
    createBtn(i + 1, imgs);
  }
}

function createImg(id, link, imgs) {
  let img = new Image();
  img.src = link;
  img.setAttribute("id", `img${id}`);

  img.width = "300";
  img.height = "200";

  imgs.appendChild(img);
}

function createBtn(id, imgs) {
  let btn = document.createElement("button");

  btn.innerHTML = "Añadir a Favoritos";
  btn.classList.add("btn-success");
  btn.setAttribute("id", `btn${id}`);
  btn.setAttribute("onclick", `addFavorites(${id})`);

  imgs.appendChild(btn);
}

function addFavorites(id) {
  let btn = document.createElement("button");
  btn.innerHTML = "Eliminar de Favoritos";
  btn.classList.add("btn-danger");
  btn.setAttribute("id", `btn${id}`);
  btn.setAttribute("onclick", `deleteFavorites(${id})`);

  const cats_favorites = document.getElementById("cats-favorites");
  const imgFavorite = document.getElementById(`img${id}`);
  cats_favorites.appendChild(imgFavorite);

  const btn_rm = document.getElementById(`btn${id}`);
  btn_rm.remove();
  cats_favorites.appendChild(btn);
}

function deleteFavorites(id) {
  const cats_delete = document.getElementById(`img${id}`);
  const imgs = document.getElementById("imgs");
  imgs.appendChild(cats_delete);
}
