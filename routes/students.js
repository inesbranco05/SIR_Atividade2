export default function studentsRoutes(app, db) {
    // Rota para obter todos os alunos
    app.get('/students', (req, res) => {
      res.json(db.data.students);
    });
  
    // Rota para adicionar um novo aluno
    app.post('/students', (req, res) => {
      const { name, course, year } = req.body;
      const newStudent = {
        id: Date.now(), // Usando o timestamp como ID único
        name,
        course,
        year
      };
      db.data.students.push(newStudent);
      db.write(); // Salva as alterações no banco
      res.status(201).json(newStudent);
    });
  
    // Rota para editar um aluno
    app.put('/students/:id', (req, res) => {
      const studentId = parseInt(req.params.id);
      const { name, course, year } = req.body;
      
      const student = db.data.students.find(stud => stud.id === studentId);
      if (student) {
        student.name = name || student.name;
        student.course = course || student.course;
        student.year = year || student.year;
        db.write(); // Salva as alterações no banco
        res.json(student);
      } else {
        res.status(404).send('Aluno não encontrado');
      }
    });
  
// Rota para deletar um aluno
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    
    // Filtra o aluno com o ID que será removido
    db.data.students = db.data.students.filter(student => student.id !== parseInt(id));  // Parse para número
    db.write();  // Atualiza o banco de dados
    
    res.status(200).json({ message: 'Aluno removido com sucesso!' });
});
  }
  