// ============================
// Criar Conta
// ============================
function createAccount(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value;
    const usuario = document.getElementById("usuario").value.toLowerCase();
    const senha = document.getElementById("senha").value;
    fetch("http://localhost:1880/usuario/criar",{
        method:"POST",
        body:JSON.stringify({nome,sobrenome,nascimento,email,usuario,senha})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then((usuario)=>{
        alert("Enviado e recebido")
        window.location.href = "usuario.html";
    })
}



// ============================
// Login
// ============================

async function logar(e){
    e.preventDefault();

    let input_email = document.getElementById('email');
    let input_senha = document.getElementById('senha');

    if(!input_email || !input_senha){
        alert("Inputs não encontrados")
        return;
    }

    let email = input_email.value;
    let senha = input_senha.value;

    try{

        let resposta = await fetch("http://localhost:1880/Autenticar",{
            method:'POST',
            body:JSON.stringify({email,senha})
            //body:{email,senha}
        })

        if(resposta.status == 200){
            alert("Entrou");
            window.location.href = "./bancadas/bancadas.html";
        }else{
            alert("Usuário ou senha inválidos")
        }
    }catch(erro){
        alert("Erro ao buscar, confira o console para ver mais detalhes.")
        console.error(erro);
    }
}