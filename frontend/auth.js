// ============================
// Criar Conta
// ============================
function createAccount(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const birthDate = document.getElementById("birthDate").value;
    const email = document.getElementById("email").value.toLowerCase();
    const pass = document.getElementById("newPass").value;

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Verifica se já existe o e-mail cadastrado
    if (accounts.some(acc => acc.email === email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Cria a conta completa
    accounts.push({
        firstName,
        lastName,
        birthDate,
        email,
        pass
    });

    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Conta criada com sucesso!");
    window.location.href = "index.html"; // vai para o login
}



// ============================
// Login
// ============================
function login(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.toLowerCase();
    const pass = document.getElementById("loginPass").value;

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    let match = accounts.find(acc =>
        acc.email === email && acc.pass === pass
    );

    if (match) {
        alert(`Bem-vindo(a), ${match.firstName}!`);
        // Exemplo de direcionamento após login:
        // window.location.href = "dashboard.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

