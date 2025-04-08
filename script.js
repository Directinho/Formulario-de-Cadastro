const form = document.getElementById("formCadastro");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const lista = document.getElementById("listaUsuarios");
const msg = document.getElementById("mensagemErro");
const mostrarPassword = document.getElementById('mostrarPassword');
const passwordInput = document.getElementById('senha');
const senhaFeedback = document.getElementById('senhaFeedback');
const colorPicker = document.getElementById('colorbg');
const contador = document.querySelector('.contador');

const emojis = ['🐱', '🐶', '🐰', '🐻', '🍎', '🍕', '🚀', '🎮', '😺', '😎', '🌟', '🎉'];
const colors = ['yellow', 'lightgreen', 'lightblue', 'lightpink'];

function setError(input, hasError) {
    if (hasError) {
        input.classList.add('error', 'shake');
        setTimeout(() => input.classList.remove('shake'), 300); // Remove a animação após 0.3s
    } else {
        input.classList.remove('error');
    }
}

function carregarUsuarios() {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios') || '[]');
    contador.textContent = usuariosSalvos.length;
    
    usuariosSalvos.forEach(usuario => {
        const postit = document.createElement("div");
        postit.classList.add("postit", usuario.color);
        postit.innerHTML = `
            <div class="emoji">${usuario.emoji}</div>
            <p>Nome: ${usuario.nome}</p>
            <p>Email: ${usuario.email}</p>
            <p>Senha: <span class="spoiler">
                <span class="spoiler-text">mostrar senha super secreta</span>
                <span class="senha">${usuario.senha}</span>
            </span></p>
        `;
        lista.appendChild(postit);
    });
}

function salvarUsuario(usuario) {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuariosSalvos.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
}

carregarUsuarios();

colorPicker.addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});

mostrarPassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁 Mostrar senha' : '👁 Esconder senha';
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.value);
    
    msg.classList.add('d-none');
    senhaFeedback.classList.add('d-none');

    let hasError = false;

    if (nome.value.trim() === "") {
        msg.textContent = "😡O nome é obrigatório";
        msg.classList.remove('d-none');
        setError(nome, true);
        hasError = true;
    } else {
        setError(nome, false);
    }
    
    if (!isEmailValid) {
        msg.textContent = "😡Email inválido";
        msg.classList.remove('d-none');
        setError(email, true);
        hasError = true;
    } else {
        setError(email, false);
    }
    
    if (senha.value.length < 8) {
        senhaFeedback.classList.remove('d-none');
        setError(senha, true);
        hasError = true;
    } else {
        setError(senha, false);
    }

    if (hasError) return;

    const usuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
    };

    const postit = document.createElement("div");
    postit.classList.add("postit", usuario.color);
    postit.innerHTML = `
        <div class="emoji">${usuario.emoji}</div>
        <p>Nome: ${usuario.nome}</p>
        <p>Email: ${usuario.email}</p>
        <p>Senha: <span class="spoiler">
            <span class="spoiler-text">mostrar senha super secreta</span>
            <span class="senha">${usuario.senha}</span>
        </span></p>
    `;
    
    lista.appendChild(postit);
    
    salvarUsuario(usuario);
    
    const currentCount = parseInt(contador.textContent);
    contador.textContent = currentCount + 1;
    
    form.reset();
});

senha.addEventListener('input', function() {
    if (this.value.length < 8) {
        senhaFeedback.classList.remove('d-none');
        setError(this, true);
    } else {
        senhaFeedback.classList.add('d-none');
        setError(this, false);
    }
});

nome.addEventListener('input', function() {
    if (this.value.trim() === "") {
        setError(this, true);
    } else {
        setError(this, false);
    }
});

email.addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
        setError(this, true);
    } else {
        setError(this, false);
    }
});
