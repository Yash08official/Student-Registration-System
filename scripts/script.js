// Get the form and table elements
const form = document.getElementById("student-form");
const tableBody = document.getElementById("table-body");

// Initialize an empty array to store student records
let students = [];

// Function to add a new student record
function addStudent(student) {
  students.push(student);
  displayStudents();
}

// Function to display student records
function displayStudents() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contactNo}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

// Function to edit a student record
function editStudent(index, student) {
  students[index] = student;
  displayStudents();
}

// Function to delete a student record
function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents();
}

// Form submission event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const studentId = document.getElementById("student-id").value;
  const email = document.getElementById("email").value;
  const contactNo = document.getElementById("contact-no").value;

  // Validate input fields
  if (name && studentId && email && contactNo) {
    const student = {
      name,
      studentId,
      email,
      contactNo,
    };
    addStudent(student);
    form.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

// Edit button event listener
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const index = e.target.dataset.index;
    const student = students[index];
    const nameInput = document.getElementById("name");
    const studentIdInput = document.getElementById("student-id");
    const emailInput = document.getElementById("email");
    const contactNoInput = document.getElementById("contact-no");

    nameInput.value = student.name;
    studentIdInput.value = student.studentId;
    emailInput.value = student.email;
    contactNoInput.value = student.contactNo;

    // Add a save button to the form
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    form.appendChild(saveBtn);

    // Save button event listener
    saveBtn.addEventListener("click", () => {
      const updatedStudent = {
        name: nameInput.value,
        studentId: studentIdInput.value,
        email: emailInput.value,
        contactNo: contactNoInput.value,
      };
      editStudent(index, updatedStudent);
      form.reset();
    });
  }
});

// Delete button event listener
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    deleteStudent(index);
  }
});

