/* Permite la visualización de la contraseña tras encontrar
 * un id "passwordCheck" donde se marca si se quiere ver o no la contraseña
 * y un name "password" 
 */ 

let checkBox = document.querySelector('#passwordCheck input')
let password = document.getElementsByName('password')
let passwordVal = document.getElementsByName('passwordVal')

checkBox.addEventListener('click',(e)=>{
  checkBox.checked ? password[0].type='text' : password[0].type='password';
  checkBox.checked ? passwordVal[0].type='text' : passwordVal[0].type='password';
 
})

