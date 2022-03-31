window.addEventListener("load", function () {
    var form = document.getElementById("formRegister");
    
    form.addEventListener("submit", function (event) {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                event.preventDefault();
                inputs[i].style.border = "1px solid red";
                inputs[i].placeholder = "Campo vacío";
            }
        }
    });
});
