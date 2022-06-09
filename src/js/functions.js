function cambiaImagen(index){
    var imgs=document.getElementsByClassName("lineup-imagen");

    for(i=0;i<imgs.length;i++){
        if(imgs[i].getAttribute("data-index")==index){
            imgs[i].style.display="block";
            imgs[i].classList.add("activo");
        }
        else{
            imgs[i].style.display="none";
            imgs[i].classList.remove("activo");
        }
    }

    imgs=document.getElementsByClassName("lineup-header-item");
    
    for(i=0;i<imgs.length;i++){
        if(i==index){
            imgs[i].classList.add("activo");
            aux=imgs[i].innerText;

        }
        else{
            imgs[i].classList.remove("activo");
        }
    }
    
    var estilos=document.styleSheets;
    var encontrado=false;
    var i=0;

    while(!encontrado && i<estilos.length){
        if(estilos[i].href!=null && estilos[i].href!=""){
            if(estilos[i].href.includes("mod_lineup")){
                encontrado=true;

                for(j=0;j<estilos[i].rules.length;j++){
                    var regla=estilos[i].rules[j];
                
                    if(regla.cssText.includes(":root")){                        
                        regla.style.cssText="--contenido-artwork:\""+aux+"\";";
                        break;
                    }
                }

            }
        }
        i++;
    }
    
}



//Estas funciones sirven para redimensionar el div contenedor a la altura de la imagen una vez renderizada
//After image loaded it will be rendered during the next animation frame. So if you wait two animation frame your image will be rendered.


//Imagen ya renderizada, redimensionar div
function paso2(index){    
    //console.log("3"); 
    //console.log("4");

    return nada;
}

//Esperar un animationframe
function paso1(index){
    //console.log("2");
    requestAnimationFrame(paso2(index));
    //console.log("5");

    return nada;
}

//Llamar a imagenCargada(index) en el evento load de la imagen
function imagenCargada(index){    
    //console.log("1");
    requestAnimationFrame(paso1(index));

    //La imagen está renderizada
    //console.log("6");
    cambiarAltura(index);
}

function nada(){
    //Funcion vacia para usar como callback de requestAnimationFrame()
}

function cambiarAltura(index){
    var imgDOM=document.getElementById("lineup-imagen-"+index);
    var altoImagenRenderizada=imgDOM.clientHeight;   
    var aux2=altoImagenRenderizada+"px";

    var div=document.getElementById("lineup-outer-wrapper");    
    var minimoAltoDiv=div.style.minHeight;

    if(minimoAltoDiv==""){
        minimoAltoDiv=0;
    }

    if(altoImagenRenderizada>minimoAltoDiv){
        div.style.minHeight=aux2;
    }
}

function redimensionar(){    
    
    var aux=document.getElementsByClassName("activo");

    var encontrado=false;
    var i=0;
    while(!encontrado){
        if(aux[i].tagName=="IMG"){
            encontrado=true;
        }
        else{
            i++;
        }
    }
    
    document.getElementById("lineup-outer-wrapper").style.minHeight=aux[i].clientHeight+"px";

}

module.exports = {
    cambiaImagen: cambiaImagen,
    imagenCargada: imagenCargada,
    redimensionar: redimensionar
};