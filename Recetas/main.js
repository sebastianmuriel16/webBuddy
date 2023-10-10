import { getRecetas } from "./firebase.js";
  
const contenedorPadre = document.querySelector('.Contenedor-Padre')
let flag = false
async function  RenderTarjetas(){
  // esta funcion le asigna la estructura html a cada elemento traido desde firebase
  const queryReceta = await getRecetas()
    const arr = []
    queryReceta.forEach((Receta) =>{ 
      const receta = Receta.data()
      const div = document.createElement('div')
      const divPhoto = document.createElement('div')
      const divInstrucciones = document.createElement('div')
      const h2 =document.createElement('h2')
      const img = document.createElement('img')
      const p = document.createElement('p')

      div.setAttribute('class', 'Contenedor-Tarjeta')
      div.onclick = () => mostrarReceta(divInstrucciones)
      divPhoto.setAttribute('class', 'Photo-Receta')
      divInstrucciones.setAttribute('class', 'Instrucciones')
      img.setAttribute('src', receta.img)
      const pText = document.createTextNode(receta.instrucciones)
      const h2Text =document.createTextNode(receta.titulo)

      p.appendChild(pText)
      h2.appendChild(h2Text)
      divPhoto.appendChild(img)
      divPhoto.appendChild(h2)
      divInstrucciones.appendChild(p)
      div.appendChild(divPhoto)
      div.appendChild(divInstrucciones)

      arr.push(div)
    })
    contenedorPadre.append(...arr)
}
function mostrarReceta(contenedor){
  flag = !flag
  flag ? contenedor.style.display = 'block' : contenedor.style.display = 'none';
}
RenderTarjetas()
