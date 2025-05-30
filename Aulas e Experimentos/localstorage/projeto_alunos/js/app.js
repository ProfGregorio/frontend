let alunos = [];
  const form = document.getElementById("form-aluno");
  const listaAlunos = document.getElementById("lista-alunos");

if (localStorage.getItem("jsonCarregado")!='true'){
        carregarDadosIniciais();
}else{
    renderizarAlunos();
}

async function carregarDadosIniciais() {
    if (!localStorage.getItem("alunos")) {
      const response = await fetch("dados/alunos.json");
      const dadosIniciais = await response.json();
      localStorage.setItem("jsonCarregado", 'true');    
      localStorage.setItem("alunos", JSON.stringify(dadosIniciais));
    }
    if (!localStorage.getItem("hobbies")) {
      const responseHobbies = await fetch("dados/hobbies.json");
      const hobbiesIniciais = await responseHobbies.json();
      localStorage.setItem("jsonCarregado", 'true');    
      localStorage.setItem("hobbies", JSON.stringify(hobbiesIniciais));
    }
    renderizarAlunos();    
    location.reload();

}

function salvarAlunos() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

function carregarAlunos() {
    const data = localStorage.getItem("alunos");
    alunos = data ? JSON.parse(data) : [];
    renderizarAlunos();
}

function renderizarAlunos() {
    const lista = document.getElementById('listaAlunos');
    lista.innerHTML = "";

    alunos.forEach(aluno => {
        const card = document.createElement('div');
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${aluno.img || 'https://i.pinimg.com/originals/12/ed/1e/12ed1e7dfd0fe16bbde044fc216ff813.jpg'}" class="card-img-top" alt="${aluno.nome}">
                <div class="card-body">
                    <h5 class="card-title">${aluno.nome}</h5>
                    <p class="card-text">${aluno.sobre}</p>
                    <p class="card-text"><strong>Nascimento:</strong> ${aluno.data_nasc || 'N/A'}</p>
                    <p class="card-text"><strong>WhatsApp:</strong> ${aluno.whatsapp || 'N/A'}</p>
                    <p class="card-text"><strong>Hobbies:</strong> ${aluno.hobbies ? aluno.hobbies.join(", ") : 'Nenhum'}</p>
                    <button class="btn btn-primary" onclick="editarAluno(${aluno.id})">Editar</button>
                </div>
            </div>
        `;
        lista.appendChild(card);
    });
}

function editarAluno(id) {
    renderizarCheckboxHobbies();
    const aluno = alunos.find(a => a.id === id);
    document.getElementById('alunoId').textContent = aluno ? aluno.id : "";
    document.getElementById('nomeAluno').value = aluno ? aluno.nome : "";
    document.getElementById('sobreAluno').value = aluno ? aluno.sobre : "";
    document.getElementById('imgAluno').value = aluno ? aluno.img || "" : "";
    document.getElementById('dataNascAluno').value = aluno ? aluno.data_nasc || "" : "";
    document.getElementById('whatsappAluno').value = aluno ? aluno.whatsapp || "" : "";

    document.querySelectorAll('#formAluno input[type="checkbox"]').forEach(cb => cb.checked = false);
    if (aluno && Array.isArray(aluno.hobbies)) {
        aluno.hobbies.forEach(hobby => {
            const checkbox = document.querySelector(`#formAluno input[type="checkbox"][value="${hobby}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    new bootstrap.Modal(document.getElementById('modalAluno')).show();
}

function adicionarAluno() {
    const id = document.getElementById('alunoId').textContent;
    const nome = document.getElementById('nomeAluno').value.trim();
    const sobre = document.getElementById('sobreAluno').value.trim();
    const img = document.getElementById('imgAluno').value.trim();
    const data_nasc = document.getElementById('dataNascAluno').value;
    const whatsapp = document.getElementById('whatsappAluno').value.trim();
    const hobbies = Array.from(document.querySelectorAll('#formAluno input[type="checkbox"]:checked')).map(cb => cb.value);

    const novoAluno = {
        id: id ? parseInt(id) : Date.now(),
        nome, sobre, img, data_nasc, whatsapp, hobbies
    };

    const index = alunos.findIndex(a => a.id === novoAluno.id);
    if (index !== -1) alunos[index] = novoAluno;
    else alunos.push(novoAluno);

    salvarAlunos();
    renderizarAlunos();
    bootstrap.Modal.getInstance(document.getElementById('modalAluno')).hide();
}

function renderizarCheckboxHobbies() {
    const container = document.getElementById("hobbiesContainer");
    container.innerHTML = ""; // limpa qualquer conteúdo anterior

    // Busca hobbies na localStorage
    const hobbies = JSON.parse(localStorage.getItem("hobbies")) || [];

    hobbies.forEach(hobby => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.value = hobby;

      label.appendChild(checkbox);
      label.append(` ${hobby}`);
      container.appendChild(label);
      container.appendChild(document.createElement("br"));
    });
}
function exportarConteudoJSON() {
    const alunos = JSON.parse(localStorage.getItem("alunos"));
    const blob = new Blob([JSON.stringify(alunos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "alunos.json";  // Nome do arquivo de download
    a.click();
    URL.revokeObjectURL(url);
}

function excluirLocalStorage(){
    localStorage.clear();
    window.location.reload();
}

// Inicialização
window.onload = carregarAlunos;