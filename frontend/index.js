const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particlesArray = [];
const particleCount = 200; // pode aumentar ou diminuir

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 5; // horizontal suave
        this.speedY = (Math.random() - 0.5) * 5; // vertical suave
        this.color = `rgba(255, 255, 255, 0.8)`; // branco translúcido
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // reinicia do outro lado se sair da tela
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

initParticles();
animate();

// function logar(e){
//     //Prevenir o recarregamento da página
//     e.preventDefault();


//     //Busca os inputs do HTML
//     let input_usuario = document.getElementById("usuario");
//     let input_senha = document.getElementById("senha");

//     //Tratamento de erros, caso não tiver esses elementos
//     if(!input_usuario || !input_senha){
//         return;
//     }

//     console.log(input_usuario)

//     //Se chegou até aqui, conseguiu coletar usuário e senha
//     let usuario = input_usuario.value;
//     let senha = input_senha.value;

//     //Com o usuário e senha, podemos tentar o login
//     fetch("http://localhost:1880/autenticacao/autenticar",{
//         method:"POST",
//         body:JSON.stringify({usuario,senha})
//     }).then((resposta)=>{
//         console.log(resposta)
//         if(resposta.ok){
//             resposta.json()
//         }
//     }).then((usuario)=>{
//         window.location.href = "bancada/bancada.html";
//     })


// }


