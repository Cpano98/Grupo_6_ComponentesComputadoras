/* Permite la visualización de la contraseña tras encontrar
 * un id "passwordCheck" donde se marca si se quiere ver o no la contraseña
 * y un name "password" 
 */ 

let checkBox = document.querySelector('#passwordCheck input')
let passwords = document.querySelectorAll('input[type=password]')

console.log(passwords[0])
checkBox.addEventListener('click',(e)=>{
  passwords.forEach( (pass) =>{
    checkBox.checked ? pass.type='text' : pass.type='password';
  }) 
})

