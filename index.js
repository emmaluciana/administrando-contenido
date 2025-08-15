function traerResultados(results) {
  console.log(results);
  results.items.forEach(item => {
    const titleEl = item.fields.titulo;
    const descriptionEl = item.fields.descripcion;
    const urlEl = item.fields.url;
    
    const imgId = item.fields.imagen.sys.id;
    const asset = results.includes.Asset.find(asset => asset.sys.id === imgId);
    const urlImgEl = asset ? asset.fields.file.url : ''; 
    
    mostrarResultados(titleEl, urlImgEl, descriptionEl, urlEl);
  })

}

function mostrarResultados(title, img, description, url) {
  const contenedor = document.querySelector(".container-results");
  const t = document.querySelector("#container-work-template");
  
  const clone = document.importNode(t.content, true);

  const titleEl = clone.querySelector(".container-title");
  titleEl.textContent = title; 

  const imgEl = clone.querySelector(".container-img");
  imgEl.src = img;
  
  const descriptionEl = clone.querySelector(".container-description");
  descriptionEl.textContent = description; 

  const urlEl = clone.querySelector(".container-ver-mas");
  urlEl.href = url; 

  contenedor.appendChild(clone);
}

function main() {
  fetch("https://preview.contentful.com/spaces/kb4lt80ycokt/environments/master/entries?access_token=ZXTePVFPxpDBoULbK3HTAHrATyRaVtHQQWYLL2KuTVc")
    .then(res => res.json())
    .then(data => traerResultados(data));
}

main();