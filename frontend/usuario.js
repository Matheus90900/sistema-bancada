window.onload = () => {
    buscarUsuarios()
}

let _usuarios = []
let _usuario_editado = null;

// ============================
// Criar Conta
// ============================
function salvar(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value;
    const usuario = document.getElementById("usuario").value.toLowerCase();
    const senha = document.getElementById("senha").value;

    if (_usuario_editado) {
        //Está alterando
        fetch("http://localhost:1880/alterar/usuario", {
        method: "PATCH",
        body: JSON.stringify({ nome, sobrenome, nascimento, email, usuario, senha,id:_usuario_editado })
    }).then(()=>{
        _usuario_editado = null
    })



    } else {
        //Está criando

        fetch("http://localhost:1880/usuario/criar", {
            method: "POST",
            body: JSON.stringify({ nome, sobrenome, nascimento, email, usuario, senha })
        }).then((resposta) => {
            console.log(resposta)
            if (resposta.ok) {
                resposta.json()
            }
        }).then((usuario) => {
            alert("Enviado e recebido")
            window.location.href = "usuario.html";
        })



    }

}

async function buscarUsuarios() {
    try {
        let resposta = await fetch("http://localhost:1880/buscar/usuario");
        if (!resposta.ok) {
            throw new Error("Erro ao buscar")
        }
        let dados = await resposta.json()
        console.log(dados)
        _usuarios = dados;
        listaUsuarios(dados)
    } catch (e) {
        console.error(e)
    }
}

function listaUsuarios(usuarios) {

    let tabela = document.getElementById("listaUsuarios")

    usuarios.forEach((usuario) => {

        let data = new Date(usuario.dt_nascimento);

        let linha = `
        <tr>
            <td>${usuario.nome}</td>
            <td>${usuario.sobrenome}</td>
            <td>${data.toLocaleDateString('pt-br')}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.email}</td>
            <td><button onclick="carregarDados(${usuario.id})">Alterar</button></td>
            <td><button onclick="excluirDados(${usuario.id})">Excluir</td>
        </tr>
        `

        tabela.innerHTML += linha
    })

}

function carregarDados(id) {

    _usuario_editado = id;

    _usuarios.forEach(usuario=>{
        if(usuario.id == id){
            document.getElementById('nome').value = usuario.nome;
            document.getElementById("sobrenome").value = usuario.sobrenome
            let data = new Date(usuario.dt_nascimento)
            document.getElementById("nascimento").value = data
            document.getElementById("email").value = usuario.email
            document.getElementById("usuario").value = usuario.usuario
        }
    })

    
}

function excluirDados(id) {


    if (confirm("Deseja realmente excluir essa conta?")) {
        console.log("Conta excluída");
        fetch("http://localhost:1880/excluir/usuario", {
            method: "DELETE",
            body: JSON.stringify({ id })
        })
    } else {
        console.log("Ação cancelada");
    }
}

// ============================
// Login
// ============================

async function logar(e) {
    e.preventDefault();

    let input_email = document.getElementById('email');
    let input_senha = document.getElementById('senha');

    if (!input_email || !input_senha) {
        alert("Inputs não encontrados")
        return;
    }

    let email = input_email.value;
    let senha = input_senha.value;

    try {

        let resposta = await fetch("http://localhost:1880/Autenticar", {
            method: 'POST',
            body: JSON.stringify({ email, senha })
            //body:{email,senha}
        })

        if (resposta.status == 200) {
            alert("Entrou");
            window.location.href = "./bancadas/bancadas.html";
        } else {
            alert("Usuário ou senha inválidos")
        }
    } catch (erro) {
        alert("Erro ao buscar, confira o console para ver mais detalhes.")
        console.error(erro);
    }
}