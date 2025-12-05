function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const container = document.getElementById("listaUsuarios");
    container.innerHTML = "";

    usuarios.forEach((usuario, index) => {
        const linha = document.createElement("div");
        linha.classList.add("user-linha");

        linha.innerHTML = `
            <span>${usuario.nome}</span>
            <span>${usuario.sobrenome || "-"}</span>
            <span>${usuario.nascimento || "-"}</span>
            <span>${usuario.email}</span>
            <button class="delete-btn" onclick="excluirUsuario(${index})">Excluir</button>
        `;

        container.appendChild(linha);
    });
}

function excluirUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios();
}


carregarUsuarios();
