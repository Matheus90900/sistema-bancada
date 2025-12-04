async function carregarBancadasCards() {
    const res = await fetch("http://localhost:3000/bancada");
    const lista = await res.json();

    const container = document.getElementById("cardsBancadas");
    container.innerHTML = "";

    lista.forEach(b => {
        container.innerHTML += `
            <div class="bancada-card">
                <h3>${b.nome}</h3>
                <span class="${b.status === 'livre' ? 'bancada-livre' : 'bancada-ocupada'}">
                    ${b.status}
                </span>
            </div>
        `;
    });
}

carregarBancadasCards();

