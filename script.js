const students = [

    {
        id: 101,
        name: "Ajay",
        roll: "22A91A0501",
        phone: "9876543210",
        status: "Present"
    },

    {
        id: 102,
        name: "Rahul",
        roll: "22A91A0502",
        phone: "9876543211",
        status: "Absent"
    },

    {
        id: 103,
        name: "Sai",
        roll: "22A91A0503",
        phone: "9876543212",
        status: "Present"
    },

    {
        id: 104,
        name: "Kiran",
        roll: "22A91A0504",
        phone: "9876543213",
        status: "Absent"
    }
];

// LOGIN

function login(){

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if(username === "admin" && password === "1234"){

        localStorage.setItem("students", JSON.stringify(students));

        window.location.href = "dashboard.html";

    }else{

        alert("Invalid Credentials");
    }
}

// GET STUDENTS

function getStudents(){

    return JSON.parse(localStorage.getItem("students")) || students;
}

// DASHBOARD DATA

if(window.location.pathname.includes("dashboard.html")){

    loadDashboard();
}

function loadDashboard(){

    const studentData = getStudents();

    const totalStudents = studentData.length;

    const presentStudents = studentData.filter(
        student => student.status === "Present"
    );

    const absentStudents = studentData.filter(
        student => student.status === "Absent"
    );

    document.getElementById("totalStudents").innerText = totalStudents;

    document.getElementById("presentCount").innerText =
    presentStudents.length;

    document.getElementById("absentCount").innerText =
    absentStudents.length;

    const presentList = document.getElementById("presentList");

    const absentList = document.getElementById("absentList");

    presentList.innerHTML = "";

    absentList.innerHTML = "";

    presentStudents.forEach(student => {

        presentList.innerHTML += `
            <li>
                ${student.name} - Present
            </li>
        `;
    });

    absentStudents.forEach(student => {

        absentList.innerHTML += `
            <li>
                ${student.name} - Absent
            </li>
        `;
    });
}

// STUDENT PAGE

function renderStudents(){

    const studentList = document.getElementById("studentList");

    const studentData = getStudents();

    studentList.innerHTML = "";

    studentData.forEach((student,index)=>{

        studentList.innerHTML += `

            <div class="student-card">

                <h2>${student.name}</h2>

                <p>
                    <strong>Roll Number:</strong>
                    ${student.roll}
                </p>

                <p>
                    <strong>ID:</strong>
                    ${student.id}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${student.phone}
                </p>

                <p class="status ${student.status === "Present"
                ? "present"
                : "absent"}">

                    ${student.status}

                </p>

                <select onchange="updateStatus(${index},this.value)">

                    <option value="Present"
                    ${student.status === "Present"
                    ? "selected"
                    : ""}>
                    Present
                    </option>

                    <option value="Absent"
                    ${student.status === "Absent"
                    ? "selected"
                    : ""}>
                    Absent
                    </option>

                </select>

            </div>
        `;
    });
}

// UPDATE STATUS

function updateStatus(index,value){

    const studentData = getStudents();

    studentData[index].status = value;

    localStorage.setItem(
        "students",
        JSON.stringify(studentData)
    );

    renderStudents();
}

// PAGE NAVIGATION

function goStudentsPage(){

    window.location.href = "students.html";
}

function goDashboard(){

    window.location.href = "dashboard.html";
}

function goLogin(){

    window.location.href = "index.html";
}

function goBack(){

    history.back();
}