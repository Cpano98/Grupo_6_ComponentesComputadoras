/* Validación FrontEnd de los formularios de productos
 * 1.- capturar formularios con querySelector, recordar cambiar las vistas con id's
 * 2.- asignar eventos on focus con pequeñas instrucciones
 * 3.- onChange al conseguir superar el error
 * 4.- Solicitud de campos no vacios
 * 5.- evento onSubmit
 * 6.- prevenir el envio
 * 7.- Tirar lista de errores en front y agregar sus espacios de error/alertas
 * 8.- Permirit envio si no hay errores
 */

//Nombramientos
let formulario  = document.querySelector("form")
let campos      = document.querySelectorAll("div.campo-ind")
let boton       = document.querySelector("button#boton_submit")
let nombre      = document.querySelector("div.campo-ind#name")
let descripcion = document.querySelector("div.campo-ind#description")
let imagen      = document.querySelector("div.campo-ind#image")
const tiposValidos = ['jpg','gif','jpeg','png','webp'];
//Nombramiento de errores de la vista:
let erroresVista = document.querySelector('div.errores')
erroresVista.style.display  = "none"

let errores = {}; //Porque los usaré en las alertas igual



// Foctusin/Focusout, a todos los elementos del formulario*, hacer con for*
campos.forEach( (campo)=>{
  campo.addEventListener('focusin', (e)=>{
    campo.style.borderColor = 'black'
    campo.style.borderStyle = 'ridge'
    campo.style.borderWidth = '3px'
  })
  campo.addEventListener('focusout', (e)=>{
    campo.style.borderColor = '#ced4da'
    campo.style.borderStyle = 'solid'
    campo.style.borderWidth = '1px'
  })
} )

//Revisión expecifica de contenido de los campos:

// Change
nombre.addEventListener('change',(e)=>{
  //CUIDADO, hay que usar los childen, debido al div***
  console.log(nombre.children[1].value)
  let val = nombre.children[1].value.length
  if(val< 5){
    errores.nombre = 'Nombre muy corto, al menos 5 caracteres'
    alert(errores.nombre);
   
  }
})

descripcion.addEventListener('change',(e)=>{
  //CUIDADO, hay que usar los childen, debido al div***
  console.log(descripcion.children[1].value)
  let val = descripcion.children[1].value.length
  if(val< 20){
    errores.descripcion = 'Descripción muy corta, al menos 20 caracteres'
    alert(errores.descripcion);
  }
})
imagen.addEventListener('change',(e)=>{
  //CUIDADO, hay que usar los childen, debido al div***
  let val = imagen.children[1].value
  if(val!=''){
    let tipo = val.split('.').pop()

    if(!tiposValidos.includes(tipo) ){
      errores.imagen = 'Formato de imagén no valido';
      alert(errores.imagen);
    }
  }
})
boton.addEventListener('click',(e)=>{



  //Revisamos si hay inputs vacias, 
  let num = 0
  campos.forEach( (campo)=>{
    
    let val = campo.children[1].value
    
    if(val==''){
      campo.style.borderColor = 'red'
      campo.style.borderStyle = 'ridge'
      campo.style.borderWidth = '2px'
      num = num + 1;
      errores.campo = ' Tienes '+num+' campos vacios remarcados en rojo.'
    }
  })

  if(Object.keys(errores).length>0){
    e.preventDefault();
    console.log(errores)
    
    erroresVista.innerText = "Revisar los siguientes errores:"
    Object.keys(errores).forEach(key =>{
      erroresVista.innerText += "\n"+errores[key];
    })
    erroresVista.style.display = "block"
  }else{
    console.log('Enviando')
    formulario.submit()
  }

})


