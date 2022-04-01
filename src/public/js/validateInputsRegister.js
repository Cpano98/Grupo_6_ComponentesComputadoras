window.addEventListener("load", function () {
  //Nombramientos
  var form = document.getElementById("formRegister");
  let inputs = document.querySelectorAll("div.campo-ind");
  let boton = document.querySelector("button#boton_submit");
  let password = document.querySelector("div.campo-ind#password")
  let passwordComplexity = document.querySelector("#passwordComplexity")
  passwordComplexity.style.display="none"
  //Nombramiento de errores de la vista:
  let erroresVista = document.querySelector("div.errores");
  erroresVista.style.display = "none";

  inputs.forEach((campo) => {
    campo.addEventListener("focusin", (e) => {
      campo.style.borderColor = "black";
      campo.style.borderStyle = "ridge";
      campo.style.borderWidth = "3px";
    });
    campo.addEventListener("focusout", (e) => {
      campo.style.borderColor = "#ced4da";
      campo.style.borderStyle = "solid";
      campo.style.borderWidth = "1px";
      passwordComplexity.style.display="none"
    });
  });

  //Revisión expecifica de contenido de los campos:
  //Sin revisión especifica, de esta full back

  boton.addEventListener("click", function (event) {
		let errores = {}; 
    //Revisión de inputs vacias
    let num = 0;
    for (var i = 0; i < inputs.length; i++) {
      //Revisamos las entradas del formulario, barriendo todas
			
      if (inputs[i].children[1].value == "") {
        inputs[i].style.border = "1px solid red";
        inputs[i].placeholder = "Campo vacío";
        num = num + 1;
        errores.campo = " Tienes " + num + " entradas vacias remarcadas en rojo.";
      }
    }
		
    //Revisión del objeto errores
    if (Object.keys(errores).length > 0) {
      event.preventDefault();
      console.log(errores);

      erroresVista.innerText = "Revisar los siguientes errores: ";
			
      Object.keys(errores).forEach((key) => {
        erroresVista.innerText += "\n";
        erroresVista.innerText += errores[key];
      });
      erroresVista.style.display = "block";
    } else {
      console.log("Enviando");
    }
  });

  //Termometro de complejidad de password
  password.addEventListener('input',(e)=>{
    //Declaraciones para evaluar la complejidad
    var strength = 0;
    const value =password.children[1].value

    new RegExp("(?=.{8,})").test(value) ? strength+= 1 : null;
    new RegExp("(?=.*[A-Z])").test(value) ? strength+= 1 : null;
    new RegExp("(?=.*[a-z])").test(value) ? strength+= 1 : null;
    new RegExp("(?=.*[0-9])").test(value) ? strength+= 1 : null;
    new RegExp("([^A-Za-z0-9])").test(value) ? strength+= 1 : null;
    
    passwordComplexity.style.color='white'
    passwordComplexity.style.textAlign='center'
    passwordComplexity.style.display="block"
    
    if(strength>=0){
      passwordComplexity.textContent='Vulnerable'
      passwordComplexity.style.backgroundColor='red'
    }
    if(strength>=2){
      passwordComplexity.textContent='Débil'
      passwordComplexity.style.backgroundColor='orange'
    }
    if(strength>=3){
      passwordComplexity.textContent='Intermedia'
      passwordComplexity.style.backgroundColor='blue'
    }
    if(strength>=5){
      passwordComplexity.textContent='Fuerte'
      passwordComplexity.style.backgroundColor='green'
    }



  })
});
