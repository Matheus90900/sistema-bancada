// ============================
// Criar Conta
// ============================
function createAccount(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const nascimento = document.getElementById("nascimento").value;
    const usuario = document.getElementById("usuario").value.toLowerCase();
    const senha = document.getElementById("senha").value;
    fetch("http://localhost:1880/usuario/criar",{
        method:"POST",
        body:JSON.stringify({nome,sobrenome,nascimento,usuario,senha})
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
function login(e){
    //Prevenir o recarregamento da página
    e.preventDefault();


    //Busca os inputs do HTML
    let input_usuario = document.getElementById("usuario");
    let input_senha = document.getElementById("senha");

    //Tratamento de erros, caso não tiver esses elementos
    if(!input_usuario || !input_senha){
        return;
    }

    console.log(input_usuario)

    //Se chegou até aqui, conseguiu coletar usuário e senha
    let usuario = input_usuario.value;
    let senha = input_senha.value;

    //Com o usuário e senha, podemos tentar o login
    fetch("http://localhost:1880/autenticacao/autenticar",{
        method:"POST",
        body:JSON.stringify({usuario,senha})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then((usuario)=>{
        window.location.href = "usuario.html";
    })


}
const lista = document.getElementById("listaUsuarios");
const form = document.getElementById("formCadastro");

const nomeInput = document.getElementById("nome");
const sobrenomeInput = document.getElementById("sobrenome");
const nascimentoInput = document.getElementById("nascimento");
const usuarioInput = document.getElementById("usuario");

let usuarios = [
    { nome: "Lucas", sobrenome: "Silva", nascimento: "2002-04-12", usuario: "lucas.s" },
    { nome: "Ana", sobrenome: "Pereira", nascimento: "2001-09-28", usuario: "ana.p" },
    { nome: "Mateus", sobrenome: "Oliveira", nascimento: "2003-01-03", usuario: "mateus.o" },
    { nome: "Beatriz", sobrenome: "Ramos", nascimento: "2002-07-19", usuario: "bia.r" }
];

let editIndex = null;

/* Renderiza tabela */
function renderUsuarios() {
    lista.innerHTML = `
        <div class="row header">
            <span>NOME</span>
            <span>SOBRENOME</span>
            <span>DATA NASC.</span>
            <span>USUÁRIO</span>
            <span>ALTERAR</span>
            <span>EXCLUIR</span>
        </div>
    `;

    usuarios.forEach((u, index) => {
        lista.innerHTML += `
            <div class="row">
                <span>${u.nome}</span>
                <span>${u.sobrenome}</span>
                <span>${formatarData(u.nascimento)}</span>
                <span>${u.usuario}</span>
                <button class="btn edit" onclick="editarUsuario(${index})">Alterar</button>
                <button class="btn delete" onclick="excluirUsuario(${index})">Excluir</button>
            </div>
        `;
    });
}

/* Formatar data */
function formatarData(data) {
    return data.split("-").reverse().join("/");
}

/* Editar */
function editarUsuario(index) {
    const u = usuarios[index];

    nomeInput.value = u.nome;
    sobrenomeInput.value = u.sobrenome;
    nascimentoInput.value = u.nascimento;
    usuarioInput.value = u.usuario;

    editIndex = index;
}

function excluirUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios[index];

    console.log("Enviando:", usuario);

    fetch("http://localhost:1880/usuario/excluir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(res => {
        console.log("Resposta Node-RED:", res.status);
        if (!res.ok) throw new Error("Falha no envio");
        return res.json();
    })
    .then(() => {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        renderUsuarios();
    })
    .catch(err => {
        console.error("ERRO:", err);
        alert("Erro ao enviar para o Node-RED");
    });
}

const usuarios = [
    { nome: "João", sobrenome: "Silva", nascimento: "2001-05-10", usuario: "joaos" },
    { nome: "Maria", sobrenome: "Oliveira", nascimento: "1999-08-22", usuario: "mariao" },
    { nome: "Pedro", sobrenome: "Santos", nascimento: "2003-02-14", usuario: "pedros" },
    { nome: "Ana", sobrenome: "Costa", nascimento: "2000-11-30", usuario: "anac" }
];

function renderUsuarios() {
    const container = document.getElementById("listaUsuarios");
    container.innerHTML = "";

    // Cabeçalho
    container.innerHTML += `
        <div class="row header">
            <div>Nome</div>
            <div>Sobrenome</div>
            <div>Nascimento</div>
            <div>Usuário</div>
            <div>Ações</div>
        </div>
    `;

    usuarios.forEach((u, index) => {
        container.innerHTML += `
            <div class="row">
                <div>${u.nome}</div>
                <div>${u.sobrenome}</div>
                <div>${u.nascimento}</div>
                <div>${u.usuario}</div>
                <div>
                    <button onclick="alterarUsuario(${index})">Alterar</button>
                    <button onclick="excluirUsuario(${index})">Excluir</button>
                </div>
            </div>
        `;
    });
}

function alterarUsuario(index) {
    alert("Alterar usuário: " + usuarios[index].usuario);
}

function excluirUsuario(index) {
    alert("Excluir usuário: " + usuarios[index].usuario);
}

// GARANTE QUE CARREGA
document.addEventListener("DOMContentLoaded", renderUsuarios);


