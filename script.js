
const API_URL = 'https://jsonplaceholder.typicode.com/users';
const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

let editingId = null;
let localStudents = []; 
async function fetchStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  localStudents = students.slice(0, 10); 
  displayStudents();
}

function displayStudents() {
  studentList.innerHTML = '';
  localStudents.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>
        <button class="edit" onclick="editStudent(${student.id})">Edit</button>
        <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    studentList.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (editingId) {
    const index = localStudents.findIndex(s => s.id === editingId);
    if (index !== -1) {
      localStudents[index] = { id: editingId, name, email, phone };
    }
    editingId = null;
  } else {
    const newStudent = {
      id: Date.now(), 
      name,
      email,
      phone
    };
    localStudents.push(newStudent);
  }

  form.reset();
  displayStudents();
});

function editStudent(id) {
  const student = localStudents.find(s => s.id === id);
  if (student) {
    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    editingId = id;
  }
}

function deleteStudent(id) {
  localStudents = localStudents.filter(s => s.id !== id);
  displayStudents();
}

fetchStudents();
