document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault(); // previne envio automático

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    let msg = document.getElementById("msg");

    // Usuário e senha corretos
    if(usuario === "Matheus" && senha === "senai") {
        msg.style.color = "green";
        msg.innerText = "Login realizado com sucesso!";

        // Redireciona para outra tela (dashboard.html) após 1 segundo
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } else {
        msg.style.color = "red";
        msg.innerText = "Usuário ou senha incorretos!";
    }
});