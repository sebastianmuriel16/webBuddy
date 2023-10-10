import { getEjercicios } from "./firebase.js";

const contenedorPadre = document.querySelector(".contenedorPadre");


function backInicio(){
    contenedorPadre.innerHTML = "";
    contenedorPadre.setAttribute("class","contenedorPadre");
    botones();
}

function irVideo(ejercicio){
    contenedorPadre.innerHTML = "";
    contenedorPadre.setAttribute("class","contenedorVideo");
    
    const video = document.createElement("div");
    const divbutton = document.createElement("div");
    const divDescription = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");


    video.setAttribute("id","player");
    video.setAttribute("data-plyr-provider", "youtube");
    video.setAttribute("data-plyr-embed-id", ejercicio.idUrl);

    //boton retroceder
    const btnback = document.createElement("button");
    const span = document.createElement("span");

    //asignacion de clases
    btnback.setAttribute("class","button");
    divbutton.setAttribute("class","divbutton");
    divDescription.setAttribute("class","divDescription");

    //informacion de firebase
    span.textContent = 'Volver';
    h2.innerHTML = 'Ejercicio: ' + ejercicio.nombre;
    p.innerHTML = ejercicio.Descripcion;

    btnback.appendChild(span);
    divbutton.appendChild(btnback);
    btnback.onclick = () => backInicio();
    contenedorPadre.appendChild(h2);
    contenedorPadre.appendChild(video);
    divDescription.appendChild(p);
    contenedorPadre.appendChild(divDescription);
    contenedorPadre.appendChild(divbutton);
    const plyr = new Plyr(video);
}

async function botones(){
    const queryEjercicios = await getEjercicios();
    const arr =[]
    queryEjercicios.forEach((Ejercicio) => {
        const ejercicio = Ejercicio.data();
        const btnvideo = document.createElement("button");
        const span = document.createElement("span");

        //asignacion de clases
        btnvideo.setAttribute("class","button");

        //informacion de firebase
        span.textContent = ejercicio.nombre;


        btnvideo.appendChild(span);
        arr.push(btnvideo);
        btnvideo.onclick = () => irVideo(ejercicio);
    }
)
    contenedorPadre.append(...arr);
}  

botones()
