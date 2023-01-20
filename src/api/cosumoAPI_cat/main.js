// creamos una instancia de axios
const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

api.defaults.headers.common["X-API-KEY"] =
  "live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06";

const API = "https://api.thecatapi.com/v1";

async function fetchData(urlAPI) {
  const response = await fetch(urlAPI, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY":
        "live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06",
    },
  });
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
    const data = await fetchData(`${urlAPI}/images/search?limit=5`);

    mostrarImagenes(data);
  } catch (e) {
    console.log(e);
  }
};

const cats_favorites = async (urlAPI) => {
  try {
    const data = await fetchData(`${urlAPI}/favourites`);
    mostrar_favorites(data);
  } catch (e) {
    console.log(e);
  }
};

async function post_cat_favorite(id) {
  try {
    const { res, status } = await api.post("/favourites", {
      image_id: id,
    });

    cats_favorites(API);
    return res;
  } catch (e) {
    console.log(e);
  }
}

async function delete_cat_favorite(urlAPI) {
  try {
    const res = await api.delete(urlAPI);

    // const response = await fetch(urlAPI, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-API-KEY":
    //       "live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06",
    //   },
    // });
    cats_favorites(API);
    return res;
  } catch (e) {
    console.log(e);
  }
}

cat_one(API);
cats_aletorios(API);
cats_favorites(API);

function reload() {
  cat_one(API);
}

function mostrarImagenes(data) {
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
    let article = document.createElement("article");
    createImg(data[i].id, data[i].image.url, cats_favorites, band, article);
  }
}

function createImg(id, url, imgs, band, article) {
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
  btn.classList.add(`${band ? "btn-primary" : "btn-danger"}`);
  btn.setAttribute("id", `${id}`);
  if (band) {
    btn.setAttribute("onclick", `post_cat_favorite('${id}')`);
  } else {
    btn.setAttribute(
      "onclick",
      `delete_cat_favorite('${API}/favourites/${id}')`
    );
  }
  imgs.appendChild(btn);
}

async function post_upload_cat(urlAPI, formData) {
  try {
    const data = await fetch(`${urlAPI}/images/upload`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        "X-API-KEY":
          "live_PAs3CkLL5AcTBdXr2mTeb0zM87ICxpNtorBSThzJB3P3mB3z70BDbjaHt8R3gm06",
      },
      body: formData,
    });
    const cat_upload = await data.json();
    console.log("Foto de michi subido");

    post_cat_favorite(`${API}/favourites`, cat_upload.id);
  } catch (e) {
    console.log(e);
  }
}

function upload_photo() {
  const form = document.getElementById("uploading");
  const formData = new FormData(form);

  console.log(formData.get("file"));
  post_upload_cat(API, formData);
}
