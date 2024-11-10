document.addEventListener("DOMContentLoaded", function() {
    fetchStudents(); // Carrega os alunos ao carregar a página
});

// Função para exibir o formulário de adicionar aluno
function showAddStudentForm() {
    // Limpar os campos do formulário quando abrir
    document.getElementById('name').value = '';
    document.getElementById('course').value = '';
    document.getElementById('year').value = '';
    
    document.getElementById('addStudentForm').style.display = 'block';
}

// Função para ocultar o formulário de adicionar aluno
function hideAddStudentForm() {
    document.getElementById('addStudentForm').style.display = 'none';
}

// Função para adicionar um aluno
function addStudent(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const year = document.getElementById('year').value;

    const student = {
        id: Date.now(), // Gerar ID único com base no timestamp
        name,
        course,
        year
    };

    // Enviar os dados para o servidor (API)
    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(() => {
        hideAddStudentForm();
        fetchStudents(); // Recarregar a lista de alunos após adicionar
    });
}

// Função para editar um aluno (diretamente na tabela)
function editStudent(id) {
    const row = document.getElementById(id);
    const name = row.querySelector('.name').textContent;
    const course = row.querySelector('.course').textContent;
    const year = row.querySelector('.year').textContent;

    // Substituir as células da linha pela edição
    row.innerHTML = `
        <td>${id}</td>
        <td><input type="text" value="${name}" class="edit-name"></td>
        <td><input type="text" value="${course}" class="edit-course"></td>
        <td><input type="number" value="${year}" class="edit-year"></td>
        <td>
            <button onclick="saveStudent(${id})">Salvar</button>
            <button onclick="fetchStudents()">Cancelar</button>
        </td>
    `;
}

// Função para salvar as edições de um aluno
function saveStudent(id) {
    const row = document.getElementById(id);
    const name = row.querySelector('.edit-name').value;
    const course = row.querySelector('.edit-course').value;
    const year = row.querySelector('.edit-year').value;

    const student = { id, name, course, year };

    // Atualizar o aluno no servidor
    fetch(`/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(() => fetchStudents()); // Recarregar a lista de alunos
}

// Função para remover um aluno
function removeStudent(id) {
    fetch(`/students/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => fetchStudents()); // Recarregar a lista de alunos após remoção
}

// Função para buscar os alunos e preencher a tabela
function fetchStudents() {
    fetch('/students')
        .then(response => response.json())
        .then(students => {
            const tbody = document.querySelector('#studentsTable tbody');
            tbody.innerHTML = ''; // Limpar a tabela antes de adicionar os alunos
            students.forEach(student => {
                const row = document.createElement('tr');
                row.id = student.id;
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td class="name">${student.name}</td>
                    <td class="course">${student.course}</td>
                    <td class="year">${student.year}</td>
                    <td>
                        <button onclick="editStudent(${student.id})">Editar</button>
                        <button onclick="removeStudent(${student.id})">Remover</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}
