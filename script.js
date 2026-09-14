/* =========================================================
   LEARNIX — ADVANCED JAVASCRIPT
   PART 3 — SECTION 1
   Core system, navigation, modal and theme
   ========================================================= */


/* =========================================================
   GLOBAL ELEMENTS
   ========================================================= */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const nameInput = document.getElementById("nameInput");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const heroProgress = document.getElementById("heroProgress");


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  loadTheme();
  loadProgress();
  setupNavigation();
  setupKeyboardControls();

});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function setupNavigation() {

  if (!navToggle || !nav) {
    return;
  }

  navToggle.addEventListener("click", function () {

    nav.classList.toggle("active");

    const isOpen = nav.classList.contains("active");

    navToggle.textContent = isOpen ? "✕" : "☰";

  });


  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      nav.classList.remove("active");

      navToggle.textContent = "☰";

    });

  });

}


/* =========================================================
   SCROLL TO SECTION
   ========================================================= */

function scrollToSection(sectionId) {

  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   THEME SYSTEM
   ========================================================= */

function toggleTheme() {

  document.body.classList.toggle("dark-mode");

  const darkMode =
    document.body.classList.contains("dark-mode");

  localStorage.setItem(
    "learnixTheme",
    darkMode ? "dark" : "light"
  );

  updateThemeButton();

}


function loadTheme() {

  const savedTheme =
    localStorage.getItem("learnixTheme");

  if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

  }

  updateThemeButton();

}


function updateThemeButton() {

  const themeButton =
    document.querySelector(".theme-btn");

  if (!themeButton) {
    return;
  }

  const darkMode =
    document.body.classList.contains("dark-mode");

  themeButton.textContent =
    darkMode ? "☀️" : "🌙";

  themeButton.setAttribute(
    "aria-label",
    darkMode
      ? "Switch to light mode"
      : "Switch to dark mode"
  );

}


/* =========================================================
   MODAL SYSTEM
   ========================================================= */

function showModal(title, text, content = "") {

  if (!modal) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  if (modalText) {
    modalText.innerHTML = text;
  }


  let contentBox =
    document.getElementById("dynamicModalContent");


  if (!contentBox) {

    contentBox =
      document.createElement("div");

    contentBox.id =
      "dynamicModalContent";

    contentBox.className =
      "modal-content";

    const input = document.getElementById("nameInput");

    if (input) {

      input.parentNode.insertBefore(
        contentBox,
        input
      );

    } else {

      const modalBox =
        modal.querySelector(".modal-box");

      if (modalBox) {
        modalBox.appendChild(contentBox);
      }

    }

  }


  contentBox.innerHTML = content;


  const input =
    document.getElementById("nameInput");

  const continueButton =
    document.querySelector(
      ".modal-box .full"
    );


  /*
     Hide the profile input when opening
     a normal feature.
  */

  if (input) {
    input.style.display = "none";
  }

  if (continueButton) {
    continueButton.style.display = "none";
  }


  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function openModal() {

  if (!modal) {
    return;
  }

  const savedName =
    localStorage.getItem("learnixName");

  if (modalTitle) {
    modalTitle.textContent =
      savedName
        ? `Welcome back, ${escapeHTML(savedName)}!`
        : "Welcome to Learnix";
  }

  if (modalText) {
    modalText.textContent =
      savedName
        ? "Continue exploring your free learning platform."
        : "Enter your name to start your Learnix learning journey.";
  }


  const contentBox =
    document.getElementById(
      "dynamicModalContent"
    );

  if (contentBox) {
    contentBox.innerHTML = "";
  }


  if (nameInput) {

    nameInput.style.display = "block";

    nameInput.value =
      savedName || "";

  }


  const continueButton =
    document.querySelector(
      ".modal-box .full"
    );

  if (continueButton) {
    continueButton.style.display = "block";
  }


  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  setTimeout(function () {

    if (nameInput) {
      nameInput.focus();
    }

  }, 100);

}


function closeModal() {

  if (!modal) {
    return;
  }

  modal.classList.remove("show");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   CONTINUE / PROFILE
   ========================================================= */

function continueAction() {

  if (!nameInput) {
    return;
  }

  const name =
    nameInput.value.trim();


  if (!name) {

    showToast(
      "Please enter your name."
    );

    nameInput.focus();

    return;
  }


  localStorage.setItem(
    "learnixName",
    name
  );


  closeModal();


  showToast(
    `Welcome to Learnix, ${name}! 🎉`
  );


  updateProgress(
    5
  );

}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function setupKeyboardControls() {

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeModal();
      }

    }
  );


  if (modal) {

    modal.addEventListener(
      "click",
      function (event) {

        if (event.target === modal) {
          closeModal();
        }

      }
    );

  }

}


/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */

function showToast(message) {

  const oldToast =
    document.querySelector(".toast");

  if (oldToast) {
    oldToast.remove();
  }


  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;


  document.body.appendChild(toast);


  setTimeout(function () {

    toast.style.opacity = "0";

    toast.style.transform =
      "translateY(10px)";

    setTimeout(function () {

      toast.remove();

    }, 250);

  }, 3000);

}


/* =========================================================
   PROGRESS SYSTEM
   ========================================================= */

function getProgress() {

  const saved =
    localStorage.getItem(
      "learnixProgress"
    );

  const number =
    parseInt(saved, 10);

  if (isNaN(number)) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, number)
  );

}


function loadProgress() {

  const progress =
    getProgress();

  updateProgressDisplay(
    progress
  );

}


function updateProgressDisplay(progress) {

  if (heroProgress) {

    heroProgress.textContent =
      progress + "%";

  }


  const ring =
    document.querySelector(
      ".progress-ring"
    );

  if (ring) {

    const degrees =
      Math.round(
        progress * 3.6
      );

    ring.style.background =
      `conic-gradient(
        var(--primary) ${degrees}deg,
        #e9e9f2 ${degrees}deg
      )`;

  }

}


function updateProgress(amount) {

  const current =
    getProgress();

  const newProgress =
    Math.min(
      100,
      current + amount
    );

  localStorage.setItem(
    "learnixProgress",
    newProgress
  );

  updateProgressDisplay(
    newProgress
  );

}


/* =========================================================
   FEATURE ROUTER
   ========================================================= */

function openFeature(feature) {

  switch (feature) {

    case "PDF → Notes":
      openPDFNotes();
      break;

    case "MCQ Generator":
      openMCQGenerator();
      break;

    case "Exam Answers":
      openExamAnswers();
      break;

    case "Coding Practice":
      openCodingPractice();
      break;

    case "English Speaking":
      openEnglishPractice();
      break;

    case "Communication":
      openCommunication();
      break;

    case "Resume Builder":
      openResumeBuilder();
      break;

    case "Mock Interview":
      openMockInterview();
      break;

    case "Job Preparation":
      openJobPreparation();
      break;

    case "Java Guide":
      openStudyGuide("Java Guide");
      break;

    case "DBMS Guide":
      openStudyGuide("DBMS Guide");
      break;

    case "Data Structures Guide":
      openStudyGuide(
        "Data Structures Guide"
      );
      break;

    case "Digital Logic Guide":
      openStudyGuide(
        "Digital Logic Guide"
      );
      break;

    case "Placement Guide":
      openStudyGuide(
        "Placement Guide"
      );
      break;

    case "Resume Guide":
      openStudyGuide(
        "Resume Guide"
      );
      break;

    case "Study Timer":
      openStudyTimer();
      break;

    case "Study Planner":
      openStudyPlanner();
      break;

    case "Bookmarks":
      openBookmarks();
      break;

    case "Achievements":
      openAchievements();
      break;

    default:

      showModal(
        feature,
        "This Learnix feature is being prepared.",
        `
          <p>
            More free learning functionality
            will be added here.
          </p>
        `
      );

  }

}


/* =========================================================
   LEARNING TUTOR
   ========================================================= */

function openTutor() {

  showModal(
    "Learnix Learning Tutor 📚",
    "Choose a topic and learn it using a simple explanation.",
    `
      <div class="modal-content">

        <h3>Quick Topics</h3>

        <button
          class="secondary full"
          onclick="askTutor('linked list')">
          🔗 Linked List
        </button>

        <br>

        <button
          class="secondary full"
          onclick="askTutor('stack')">
          📚 Stack
        </button>

        <br>

        <button
          class="secondary full"
          onclick="askTutor('queue')">
          🚶 Queue
        </button>

        <br>

        <button
          class="secondary full"
          onclick="askTutor('array')">
          📦 Array
        </button>

        <br>

        <button
          class="secondary full"
          onclick="askTutor('inheritance')">
          ☕ Java Inheritance
        </button>

        <br>

        <button
          class="secondary full"
          onclick="askTutor('dbms')">
          🗄️ DBMS
        </button>

      </div>
    `
  );

}


function askTutor(topic) {

  const explanations = {

    "linked list": `
      <h3>Linked List</h3>

      <p>
        A linked list is a linear data structure
        made of nodes.
      </p>

      <p>
        Each node contains data and a link
        to the next node.
      </p>

      <div class="code-box">
Node
 ├── Data
 └── Next → Node
      </div>

      <h3>Advantages</h3>

      <ul>
        <li>Dynamic size</li>
        <li>Easy insertion and deletion</li>
        <li>No continuous memory required</li>
      </ul>
    `,


    "stack": `
      <h3>Stack</h3>

      <p>
        A stack is a linear data structure
        that follows LIFO.
      </p>

      <p>
        LIFO means
        <strong>Last In, First Out</strong>.
      </p>

      <div class="code-box">
Push → Add an element
Pop  → Remove the top element
Peek → View the top element
      </div>
    `,


    "queue": `
      <h3>Queue</h3>

      <p>
        A queue is a linear data structure
        that follows FIFO.
      </p>

      <p>
        FIFO means
        <strong>First In, First Out</strong>.
      </p>

      <div class="code-box">
Front → [10] [20] [30] ← Rear

Enqueue → Add
Dequeue → Remove
      </div>
    `,


    "array": `
      <h3>Array</h3>

      <p>
        An array stores multiple elements
        of the same type in an indexed structure.
      </p>

      <div class="code-box">
int[] marks = {90, 85, 78, 92};
      </div>

      <p>
        Array indexing normally starts from 0.
      </p>
    `,


    "inheritance": `
      <h3>Java Inheritance</h3>

      <p>
        Inheritance allows one class to acquire
        properties and methods of another class.
      </p>

      <div class="code-box">
class Animal {
    void sound() {
        System.out.println("Sound");
    }
}

class Dog extends Animal {
}
      </div>

      <p>
        The <strong>extends</strong> keyword is used
        for class inheritance.
      </p>
    `,


    "dbms": `
      <h3>DBMS</h3>

      <p>
        DBMS stands for Database Management System.
      </p>

      <p>
        It is software used to store, organize,
        manage and retrieve data.
      </p>

      <h3>Examples</h3>

      <ul>
        <li>MySQL</li>
        <li>Oracle Database</li>
        <li>PostgreSQL</li>
      </ul>
    `

  };


  const answer =
    explanations[topic] ||
    `
      <h3>Learnix Tutor</h3>

      <p>
        This topic does not have a built-in
        explanation yet.
      </p>

      <p>
        Try Java, DBMS, Array, Stack,
        Queue or Linked List.
      </p>
    `;


  showModal(
    "Learnix Tutor 📚",
    `Simple explanation for <strong>${escapeHTML(topic)}</strong>`,
    `
      <div class="modal-content">
        ${answer}
      </div>
    `
  );


  updateProgress(2);

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   PART 3 SECTION 1 COMPLETE
   ========================================================= */
/* =========================================================
   PART 3 — SECTION 2
   STUDY RESOURCES + PDF NOTES + MCQ GENERATOR
   ========================================================= */


/* =========================================================
   STUDY GUIDES
   ========================================================= */

function openStudyGuide(topic) {

  const guides = {

    "Java Guide": `
      <h3>☕ Java Basics</h3>

      <p><strong>1. Class:</strong> A class is a blueprint for objects.</p>

      <p><strong>2. Object:</strong> An object is an instance of a class.</p>

      <p><strong>3. Constructor:</strong> A special method used to initialize objects.</p>

      <p><strong>4. Inheritance:</strong> Acquiring properties and methods from another class.</p>

      <p><strong>5. Polymorphism:</strong> One name with multiple forms.</p>

      <div class="code-box">
class Student {
    int id;

    Student(int id) {
        this.id = id;
    }
}
      </div>

      <h4>Important Topics</h4>
      <ul>
        <li>Classes and Objects</li>
        <li>Constructors</li>
        <li>Inheritance</li>
        <li>Interfaces</li>
        <li>Exception Handling</li>
        <li>Method Overloading</li>
      </ul>
    `,


    "DBMS Guide": `
      <h3>🗄️ DBMS Basics</h3>

      <p>
        DBMS stands for Database Management System.
      </p>

      <h4>Important Topics</h4>

      <ul>
        <li>Database and DBMS</li>
        <li>Keys</li>
        <li>ER Model</li>
        <li>Relational Algebra</li>
        <li>Normalization</li>
        <li>SQL</li>
        <li>Transactions</li>
      </ul>

      <div class="code-box">
SELECT *
FROM STUDENT
WHERE Dept = 'CSE';
      </div>

      <p>
        SQL is used to create, retrieve,
        update and manage database data.
      </p>
    `,


    "Data Structures Guide": `
      <h3>🌳 Data Structures</h3>

      <p>
        Data structures are techniques used
        to organize and store data efficiently.
      </p>

      <h4>Linear Structures</h4>

      <ul>
        <li>Array</li>
        <li>Linked List</li>
        <li>Stack</li>
        <li>Queue</li>
      </ul>

      <h4>Non-Linear Structures</h4>

      <ul>
        <li>Tree</li>
        <li>Binary Search Tree</li>
        <li>AVL Tree</li>
        <li>Heap</li>
        <li>Graph</li>
      </ul>
    `,


    "Digital Logic Guide": `
      <h3>🔌 Digital Logic</h3>

      <h4>Basic Gates</h4>

      <ul>
        <li>AND</li>
        <li>OR</li>
        <li>NOT</li>
        <li>NAND</li>
        <li>NOR</li>
        <li>XOR</li>
        <li>XNOR</li>
      </ul>

      <h4>Important Topics</h4>

      <ul>
        <li>Boolean Algebra</li>
        <li>K-Maps</li>
        <li>Encoders</li>
        <li>Decoders</li>
        <li>Multiplexers</li>
        <li>Flip-Flops</li>
      </ul>
    `,


    "Placement Guide": `
      <h3>💼 Placement Preparation</h3>

      <h4>Prepare These Areas</h4>

      <ul>
        <li>Quantitative Aptitude</li>
        <li>Logical Reasoning</li>
        <li>Verbal Ability</li>
        <li>Data Structures</li>
        <li>Programming</li>
        <li>DBMS</li>
        <li>Operating Systems</li>
        <li>Computer Networks</li>
      </ul>

      <p>
        Practice coding problems regularly and
        revise important CS concepts.
      </p>
    `,


    "Resume Guide": `
      <h3>📄 Resume Preparation</h3>

      <h4>A good student resume should contain:</h4>

      <ol>
        <li>Name and contact details</li>
        <li>Career summary</li>
        <li>Education</li>
        <li>Technical skills</li>
        <li>Projects</li>
        <li>Internships</li>
        <li>Certifications</li>
        <li>Achievements</li>
      </ol>

      <p>
        Keep your resume simple, readable and
        focused on relevant skills.
      </p>
    `

  };


  const content =
    guides[topic] ||
    "<p>Study guide coming soon.</p>";


  showModal(
    topic,
    "Free Learnix study guide",
    `
      <div class="modal-content">
        ${content}

        <br>

        <button
          class="primary full"
          onclick="updateProgress(3); showToast('Study progress updated! 📚');">
          ✓ Mark as Studied
        </button>
      </div>
    `
  );

}


/* =========================================================
   PDF / TEXT NOTES
   ========================================================= */

function openPDFNotes() {

  showModal(
    "📄 PDF → Notes",
    "Upload a text file and turn it into simple study notes.",
    `
      <div class="modal-content">

        <label for="notesFile">
          <strong>Choose a TXT file</strong>
        </label>

        <input
          type="file"
          id="notesFile"
          accept=".txt"
          onchange="readNotesFile(event)"
        >

        <div id="notesResult">
          <p>
            TXT files are supported directly in this
            browser-based free version.
          </p>
        </div>

      </div>
    `
  );

}


function readNotesFile(event) {

  const file =
    event.target.files[0];

  if (!file) {
    return;
  }


  const reader =
    new FileReader();


  reader.onload = function (e) {

    const text =
      e.target.result || "";


    const cleanText =
      text.trim();


    if (!cleanText) {

      document.getElementById(
        "notesResult"
      ).innerHTML =
        "<p>No readable text found.</p>";

      return;
    }


    const sentences =
      cleanText
        .split(/[.!?]\s+/)
        .filter(Boolean);


    const important =
      sentences
        .slice(0, 8);


    const notesHTML =
      important
        .map(function (sentence) {
          return `<li>${escapeHTML(
            sentence.trim()
          )}</li>`;
        })
        .join("");


    document.getElementById(
      "notesResult"
    ).innerHTML = `

      <div class="notes-result">

        <h3>📝 Quick Notes</h3>

        <ul>
          ${notesHTML}
        </ul>

        <button
          class="primary full"
          onclick="updateProgress(5); showToast('Notes studied! 📚');">
          ✓ Mark as Completed
        </button>

      </div>

    `;

  };


  reader.readAsText(file);

}


/* =========================================================
   EXAM ANSWERS
   ========================================================= */

function openExamAnswers() {

  showModal(
    "📝 Exam Answer Helper",
    "Select a subject to get an exam-ready answer structure.",
    `
      <div class="modal-content">

        <button
          class="secondary full"
          onclick="showExamAnswer('Java')">
          ☕ Java
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showExamAnswer('DBMS')">
          🗄️ DBMS
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showExamAnswer('Data Structures')">
          🌳 Data Structures
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showExamAnswer('Digital Logic')">
          🔌 Digital Logic
        </button>

      </div>
    `
  );

}


function showExamAnswer(subject) {

  const answers = {

    "Java": `
      <h3>Java — Exam Answer Structure</h3>

      <ol>
        <li>Definition</li>
        <li>Explanation</li>
        <li>Features</li>
        <li>Syntax / Program</li>
        <li>Example</li>
        <li>Advantages</li>
        <li>Conclusion</li>
      </ol>
    `,

    "DBMS": `
      <h3>DBMS — Exam Answer Structure</h3>

      <ol>
        <li>Definition</li>
        <li>Components</li>
        <li>Working</li>
        <li>Diagram</li>
        <li>Example</li>
        <li>Advantages</li>
        <li>Conclusion</li>
      </ol>
    `,

    "Data Structures": `
      <h3>Data Structures — Exam Structure</h3>

      <ol>
        <li>Definition</li>
        <li>Types</li>
        <li>Operations</li>
        <li>Diagram</li>
        <li>Algorithm</li>
        <li>Example</li>
        <li>Complexity</li>
      </ol>
    `,

    "Digital Logic": `
      <h3>Digital Logic — Exam Structure</h3>

      <ol>
        <li>Definition</li>
        <li>Truth Table</li>
        <li>Boolean Expression</li>
        <li>Logic Diagram</li>
        <li>Working</li>
        <li>Example</li>
        <li>Conclusion</li>
      </ol>
    `

  };


  showModal(
    `${subject} — Exam Answer`,
    "Simple exam-ready structure",
    `
      <div class="modal-content">
        ${
          answers[subject] ||
          "<p>Answer structure unavailable.</p>"
        }
      </div>
    `
  );

}


/* =========================================================
   MCQ QUESTION BANK
   ========================================================= */

const questionBank = [

  {
    question:
      "Which data structure follows LIFO?",

    options: [
      "Queue",
      "Stack",
      "Array",
      "Graph"
    ],

    answer: 1
  },


  {
    question:
      "Which keyword is used for inheritance in Java?",

    options: [
      "implements",
      "inherits",
      "extends",
      "super"
    ],

    answer: 2
  },


  {
    question:
      "Which SQL command is used to retrieve data?",

    options: [
      "INSERT",
      "DELETE",
      "SELECT",
      "UPDATE"
    ],

    answer: 2
  },


  {
    question:
      "What does DBMS stand for?",

    options: [
      "Data Backup Management System",
      "Database Management System",
      "Digital Base Management System",
      "Database Memory System"
    ],

    answer: 1
  },


  {
    question:
      "Which data structure follows FIFO?",

    options: [
      "Stack",
      "Queue",
      "Tree",
      "Heap"
    ],

    answer: 1
  },


  {
    question:
      "Which symbol is used for a single-line comment in Java?",

    options: [
      "#",
      "//",
      "<!--",
      "/*/"
    ],

    answer: 1
  },


  {
    question:
      "Which is a non-linear data structure?",

    options: [
      "Array",
      "Stack",
      "Queue",
      "Tree"
    ],

    answer: 3
  },


  {
    question:
      "Which gate produces 1 only when both inputs are 1?",

    options: [
      "OR",
      "NOT",
      "AND",
      "XOR"
    ],

    answer: 2
  },


  {
    question:
      "Which keyword creates an object in Java?",

    options: [
      "class",
      "new",
      "object",
      "create"
    ],

    answer: 1
  },


  {
    question:
      "Which key uniquely identifies a row in a table?",

    options: [
      "Foreign Key",
      "Primary Key",
      "Candidate Value",
      "Index"
    ],

    answer: 1
  }

];


/* =========================================================
   QUIZ VARIABLES
   ========================================================= */

let quizQuestions = [];

let quizIndex = 0;

let quizScore = 0;

let quizAnswered = false;


/* =========================================================
   OPEN MCQ GENERATOR
   ========================================================= */

function openMCQGenerator() {

  showModal(
    "🎯 Learnix MCQ Quiz",
    "Test your computer science knowledge.",
    `
      <div class="modal-content">

        <h3>Choose Quiz</h3>

        <button
          class="primary full"
          onclick="startQuiz()">
          🚀 Start Quiz
        </button>

        <br>

        <p>
          Questions:
          <strong>${questionBank.length}</strong>
        </p>

        <p>
          Best Score:
          <strong>
            ${localStorage.getItem("learnixBestScore") || 0}
          </strong>
        </p>

      </div>
    `
  );

}


/* =========================================================
   START QUIZ
   ========================================================= */

function startQuiz() {

  quizQuestions =
    [...questionBank]
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(0, 5);


  quizIndex = 0;

  quizScore = 0;

  quizAnswered = false;


  showQuizQuestion();

}


/* =========================================================
   SHOW QUIZ QUESTION
   ========================================================= */

function showQuizQuestion() {

  if (quizIndex >= quizQuestions.length) {

    finishQuiz();

    return;
  }


  const question =
    quizQuestions[quizIndex];


  const progress =
    quizIndex + 1;


  const optionsHTML =
    question.options
      .map(function (option, index) {

        return `
          <button
            class="quiz-option"
            onclick="answerQuiz(${index})">

            ${escapeHTML(option)}

          </button>
        `;

      })
      .join("");


  showModal(
    `Question ${progress} / ${quizQuestions.length}`,
    "Choose the correct answer.",
    `

      <div class="quiz-container">

        <div class="quiz-progress">

          <div
            class="quiz-progress-bar"
            style="width:${(
              (quizIndex /
                quizQuestions.length) *
              100
            )}%">
          </div>

        </div>

        <h3>
          ${escapeHTML(
            question.question
          )}
        </h3>

        <div class="quiz-options">
          ${optionsHTML}
        </div>

      </div>

    `
  );


  quizAnswered = false;

}


/* =========================================================
   ANSWER QUIZ
   ========================================================= */

function answerQuiz(selected) {

  if (quizAnswered) {
    return;
  }


  quizAnswered = true;


  const question =
    quizQuestions[quizIndex];


  const buttons =
    document.querySelectorAll(
      ".quiz-option"
    );


  buttons.forEach(
    function (button, index) {

      button.disabled = true;


      if (
        index === question.answer
      ) {

        button.classList.add(
          "correct"
        );

      }


      if (
        index === selected &&
        selected !== question.answer
      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  if (
    selected === question.answer
  ) {

    quizScore++;

    showToast(
      "Correct! 🎉"
    );

  } else {

    showToast(
      "Not quite. Keep learning! 📚"
    );

  }


  setTimeout(
    function () {

      quizIndex++;

      showQuizQuestion();

    },
    900
  );

}


/* =========================================================
   FINISH QUIZ
   ========================================================= */

function finishQuiz() {

  const total =
    quizQuestions.length;


  const percentage =
    Math.round(
      (quizScore / total) * 100
    );


  const oldBest =
    parseInt(
      localStorage.getItem(
        "learnixBestScore"
      ) || "0",
      10
    );


  if (percentage > oldBest) {

    localStorage.setItem(
      "learnixBestScore",
      percentage
    );

  }


  updateProgress(5);


  showModal(
    "🏆 Quiz Completed!",
    "Great job! Here is your result.",
    `

      <div class="quiz-result">

        <div class="score-circle">
          ${percentage}%
        </div>

        <h3>
          You scored ${quizScore}
          out of ${total}
        </h3>

        <p>
          ${
            percentage >= 80
              ? "Excellent work! 🔥"
              : percentage >= 50
              ? "Good effort! Keep practicing. 💪"
              : "Keep learning and try again! 📚"
          }
        </p>

        <button
          class="primary full"
          onclick="startQuiz()">
          🔄 Try Again
        </button>

      </div>

    `
  );

}


/* =========================================================
   SECTION 2 COMPLETE
   ========================================================= */
/* =========================================================
   PART 3 — SECTION 3
   TIMER + PLANNER + BOOKMARKS + ACHIEVEMENTS
   ========================================================= */


/* =========================================================
   STUDY TIMER
   ========================================================= */

let timerInterval = null;
let timerSeconds = 25 * 60;
let timerRunning = false;


/* Open Timer */

function openStudyTimer() {

  showModal(
    "⏱️ Study Timer",
    "Use focused study sessions to improve your learning.",
    `
      <div class="timer-container">

        <div class="timer-display" id="timerDisplay">
          25:00
        </div>

        <div class="timer-presets">

          <button
            class="secondary"
            onclick="setTimer(15)">
            15 min
          </button>

          <button
            class="secondary"
            onclick="setTimer(25)">
            25 min
          </button>

          <button
            class="secondary"
            onclick="setTimer(45)">
            45 min
          </button>

          <button
            class="secondary"
            onclick="setTimer(60)">
            60 min
          </button>

        </div>

        <div class="timer-buttons">

          <button
            class="primary"
            onclick="startTimer()">
            ▶ Start
          </button>

          <button
            class="secondary"
            onclick="pauseTimer()">
            ⏸ Pause
          </button>

          <button
            class="secondary"
            onclick="resetTimer()">
            ↻ Reset
          </button>

        </div>

        <p id="timerStatus">
          Ready to study 📚
        </p>

      </div>
    `
  );


  updateTimerDisplay();

}


/* Set Timer */

function setTimer(minutes) {

  pauseTimer();

  timerSeconds =
    minutes * 60;

  updateTimerDisplay();

  const status =
    document.getElementById(
      "timerStatus"
    );

  if (status) {

    status.textContent =
      `${minutes} minute study session ready 📚`;

  }

}


/* Start Timer */

function startTimer() {

  if (timerRunning) {
    return;
  }


  timerRunning = true;


  const status =
    document.getElementById(
      "timerStatus"
    );

  if (status) {

    status.textContent =
      "Focus mode ON 🔥";

  }


  timerInterval =
    setInterval(
      function () {

        if (timerSeconds <= 0) {

          finishTimer();

          return;

        }


        timerSeconds--;

        updateTimerDisplay();

      },
      1000
    );

}


/* Pause Timer */

function pauseTimer() {

  timerRunning = false;


  if (timerInterval) {

    clearInterval(
      timerInterval
    );

    timerInterval = null;

  }


  const status =
    document.getElementById(
      "timerStatus"
    );

  if (status) {

    status.textContent =
      "Timer paused ⏸️";

  }

}


/* Reset Timer */

function resetTimer() {

  pauseTimer();

  timerSeconds =
    25 * 60;

  updateTimerDisplay();

  const status =
    document.getElementById(
      "timerStatus"
    );

  if (status) {

    status.textContent =
      "Ready to study 📚";

  }

}


/* Update Timer Display */

function updateTimerDisplay() {

  const display =
    document.getElementById(
      "timerDisplay"
    );

  if (!display) {
    return;
  }


  const minutes =
    Math.floor(
      timerSeconds / 60
    );


  const seconds =
    timerSeconds % 60;


  display.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

}


/* Timer Finished */

function finishTimer() {

  pauseTimer();

  timerSeconds = 0;

  updateTimerDisplay();


  showToast(
    "🎉 Study session completed!"
  );


  updateProgress(5);


  localStorage.setItem(
    "learnixTimerSessions",
    (
      parseInt(
        localStorage.getItem(
          "learnixTimerSessions"
        ) || "0",
        10
      ) + 1
    )
  );


  const status =
    document.getElementById(
      "timerStatus"
    );

  if (status) {

    status.textContent =
      "Session completed! Great work 🏆";

  }

}


/* =========================================================
   STUDY PLANNER
   ========================================================= */

function openStudyPlanner() {

  const savedPlan =
    localStorage.getItem(
      "learnixStudyPlan"
    ) || "";


  showModal(
    "📅 Study Planner",
    "Create a simple daily study plan.",
    `
      <div class="planner">

        <label>
          <strong>Today's main subject</strong>
        </label>

        <input
          type="text"
          id="planSubject"
          placeholder="Example: Java"
          value="${escapeHTML(savedPlan)}"
        >

        <br>

        <label>
          <strong>Study hours</strong>
        </label>

        <input
          type="number"
          id="planHours"
          min="1"
          max="12"
          placeholder="Example: 2"
        >

        <br>

        <label>
          <strong>Today's task</strong>
        </label>

        <textarea
          id="planTask"
          rows="4"
          placeholder="Example: Complete Java inheritance revision"
        ></textarea>

        <br>

        <button
          class="primary full"
          onclick="saveStudyPlan()">
          💾 Save Plan
        </button>

        <div id="plannerResult"></div>

      </div>
    `
  );

}


/* Save Plan */

function saveStudyPlan() {

  const subject =
    document.getElementById(
      "planSubject"
    ).value.trim();


  const hours =
    document.getElementById(
      "planHours"
    ).value;


  const task =
    document.getElementById(
      "planTask"
    ).value.trim();


  if (!subject || !hours || !task) {

    showToast(
      "Please complete your study plan."
    );

    return;

  }


  const plan = {

    subject: subject,

    hours: hours,

    task: task,

    date:
      new Date().toLocaleDateString()

  };


  localStorage.setItem(
    "learnixDailyPlan",
    JSON.stringify(plan)
  );


  localStorage.setItem(
    "learnixStudyPlan",
    subject
  );


  const result =
    document.getElementById(
      "plannerResult"
    );


  if (result) {

    result.innerHTML = `

      <div class="planner-result">

        <h3>✅ Plan Saved</h3>

        <p>
          <strong>Subject:</strong>
          ${escapeHTML(subject)}
        </p>

        <p>
          <strong>Study Time:</strong>
          ${escapeHTML(hours)} hour(s)
        </p>

        <p>
          <strong>Task:</strong>
          ${escapeHTML(task)}
        </p>

      </div>

    `;

  }


  updateProgress(3);

  showToast(
    "Study plan saved! 📅"
  );

}


/* =========================================================
   VIEW SAVED PLAN
   ========================================================= */

function getSavedPlan() {

  const saved =
    localStorage.getItem(
      "learnixDailyPlan"
    );


  if (!saved) {

    showToast(
      "No study plan saved yet."
    );

    return;

  }


  try {

    const plan =
      JSON.parse(saved);


    showModal(
      "📅 Your Study Plan",
      "Your saved learning plan.",
      `

        <div class="planner-result">

          <h3>
            ${escapeHTML(plan.subject)}
          </h3>

          <p>
            📚 ${escapeHTML(plan.hours)}
            hour(s)
          </p>

          <p>
            📝 ${escapeHTML(plan.task)}
          </p>

          <p>
            📅 ${escapeHTML(plan.date)}
          </p>

          <button
            class="primary full"
            onclick="updateProgress(2); showToast('Task completed! 🎉');">
            ✓ Mark Task Complete
          </button>

        </div>

      `
    );

  } catch (error) {

    showToast(
      "Could not load the saved plan."
    );

  }

}


/* =========================================================
   BOOKMARKS
   ========================================================= */

function getBookmarks() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "learnixBookmarks"
      ) || "[]"
    );

  } catch (error) {

    return [];

  }

}


/* Add Bookmark */

function addBookmark(title, section) {

  const bookmarks =
    getBookmarks();


  const exists =
    bookmarks.some(
      function (item) {

        return item.title === title;

      }
    );


  if (exists) {

    showToast(
      "Already bookmarked 🔖"
    );

    return;

  }


  bookmarks.push({

    title: title,

    section: section,

    date:
      new Date().toLocaleDateString()

  });


  localStorage.setItem(
    "learnixBookmarks",
    JSON.stringify(bookmarks)
  );


  showToast(
    "Added to bookmarks 🔖"
  );

}


/* Open Bookmarks */

function openBookmarks() {

  const bookmarks =
    getBookmarks();


  if (bookmarks.length === 0) {

    showModal(
      "🔖 Bookmarks",
      "Save useful Learnix topics here.",
      `
        <div class="modal-content">

          <p>
            You don't have any bookmarks yet.
          </p>

          <p>
            Start exploring resources and
            save topics you want to revisit.
          </p>

        </div>
      `
    );

    return;

  }


  const list =
    bookmarks
      .map(
        function (item, index) {

          return `

            <div class="bookmark-item">

              <h3>
                🔖 ${escapeHTML(item.title)}
              </h3>

              <p>
                ${escapeHTML(item.section)}
              </p>

              <small>
                Saved: ${escapeHTML(item.date)}
              </small>

              <button
                class="secondary"
                onclick="removeBookmark(${index})">
                Remove
              </button>

            </div>

          `;

        }
      )
      .join("");


  showModal(
    "🔖 My Bookmarks",
    `${bookmarks.length} saved topic(s)`,
    `
      <div class="bookmarks-list">

        ${list}

      </div>
    `
  );

}


/* Remove Bookmark */

function removeBookmark(index) {

  const bookmarks =
    getBookmarks();


  bookmarks.splice(
    index,
    1
  );


  localStorage.setItem(
    "learnixBookmarks",
    JSON.stringify(bookmarks)
  );


  openBookmarks();

  showToast(
    "Bookmark removed."
  );

}


/* =========================================================
   QUICK BOOKMARKS
   ========================================================= */

function bookmarkTopic(title) {

  addBookmark(
    title,
    "Learnix Study Resource"
  );

}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function getAchievements() {

  const progress =
    getProgress();


  const quizBest =
    parseInt(
      localStorage.getItem(
        "learnixBestScore"
      ) || "0",
      10
    );


  const timerSessions =
    parseInt(
      localStorage.getItem(
        "learnixTimerSessions"
      ) || "0",
      10
    );


  return [

    {
      icon: "🌱",
      title: "Getting Started",
      description:
        "Start your Learnix journey.",
      unlocked:
        progress >= 5
    },

    {
      icon: "📚",
      title: "Study Starter",
      description:
        "Reach 20% learning progress.",
      unlocked:
        progress >= 20
    },

    {
      icon: "🎯",
      title: "Quiz Master",
      description:
        "Score at least 80% in a quiz.",
      unlocked:
        quizBest >= 80
    },

    {
      icon: "⏱️",
      title: "Focus Student",
      description:
        "Complete 3 study timer sessions.",
      unlocked:
        timerSessions >= 3
    },

    {
      icon: "🔥",
      title: "Learning Streak",
      description:
        "Reach 50% learning progress.",
      unlocked:
        progress >= 50
    },

    {
      icon: "🏆",
      title: "Learnix Champion",
      description:
        "Reach 100% learning progress.",
      unlocked:
        progress >= 100
    }

  ];

}


/* Open Achievements */

function openAchievements() {

  const achievements =
    getAchievements();


  const unlocked =
    achievements.filter(
      function (item) {
        return item.unlocked;
      }
    ).length;


  const html =
    achievements
      .map(
        function (item) {

          return `

            <div
              class="achievement-item
              ${item.unlocked ? "unlocked" : "locked"}">

              <div class="achievement-icon">
                ${item.icon}
              </div>

              <div>

                <h3>
                  ${escapeHTML(item.title)}
                </h3>

                <p>
                  ${escapeHTML(item.description)}
                </p>

                <strong>
                  ${
                    item.unlocked
                      ? "✓ Unlocked"
                      : "🔒 Locked"
                  }
                </strong>

              </div>

            </div>

          `;

        }
      )
      .join("");


  showModal(
    "🏆 Achievements",
    `${unlocked} of ${achievements.length} unlocked`,
    `
      <div class="achievements-list">

        ${html}

      </div>
    `
  );

}


/* =========================================================
   SECTION 3 COMPLETE
   ========================================================= */
/* =========================================================
   PART 3 — SECTION 4
   CAREER TOOLS
   ========================================================= */


/* =========================================================
   CODING PRACTICE
   ========================================================= */

function openCodingPractice() {

  showModal(
    "💻 Coding Practice",
    "Practice simple programming problems.",
    `
      <div class="modal-content">

        <h3>Choose a Problem</h3>

        <button
          class="secondary full"
          onclick="showCodingProblem('sum')">
          ➕ Sum of Two Numbers
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showCodingProblem('even')">
          🔢 Check Even or Odd
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showCodingProblem('largest')">
          📊 Find Largest Number
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showCodingProblem('reverse')">
          🔄 Reverse a String
        </button>

      </div>
    `
  );

}


/* Show Coding Problem */

function showCodingProblem(type) {

  const problems = {

    sum: {
      title: "Sum of Two Numbers",
      question:
        "Write a program to find the sum of two numbers.",
      code:
`int a = 10;
int b = 20;

int sum = a + b;

System.out.println(sum);`
    },

    even: {
      title: "Check Even or Odd",
      question:
        "Write a program to check whether a number is even or odd.",
      code:
`int n = 10;

if (n % 2 == 0)
    System.out.println("Even");
else
    System.out.println("Odd");`
    },

    largest: {
      title: "Find Largest Number",
      question:
        "Write a program to find the largest of two numbers.",
      code:
`int a = 25;
int b = 40;

if (a > b)
    System.out.println(a);
else
    System.out.println(b);`
    },

    reverse: {
      title: "Reverse a String",
      question:
        "Write a program to reverse a string.",
      code:
`String text = "Learnix";

String reversed = "";

for (int i = text.length() - 1; i >= 0; i--) {
    reversed += text.charAt(i);
}

System.out.println(reversed);`
    }

  };


  const problem =
    problems[type];


  if (!problem) {
    return;
  }


  showModal(
    `💻 ${problem.title}`,
    problem.question,
    `
      <div class="modal-content">

        <div class="code-box">
${escapeHTML(problem.code)}
        </div>

        <button
          class="primary full"
          onclick="updateProgress(3); showToast('Coding practice completed! 💻');">
          ✓ Mark as Practiced
        </button>

      </div>
    `
  );

}


/* =========================================================
   ENGLISH SPEAKING PRACTICE
   ========================================================= */

function openEnglishPractice() {

  showModal(
    "🗣️ English Speaking Practice",
    "Practice speaking clearly and confidently.",
    `
      <div class="modal-content">

        <h3>Today's Speaking Topics</h3>

        <button
          class="secondary full"
          onclick="showSpeakingTopic('self')">
          👤 Self Introduction
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showSpeakingTopic('college')">
          🎓 My College
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showSpeakingTopic('technology')">
          💻 Technology
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showSpeakingTopic('career')">
          💼 My Career
        </button>

      </div>
    `
  );

}


/* Speaking Topic */

function showSpeakingTopic(type) {

  const topics = {

    self: `
      <h3>👤 Self Introduction</h3>

      <p>
        Speak for 60 seconds about:
      </p>

      <ul>
        <li>Your name</li>
        <li>Your education</li>
        <li>Your technical skills</li>
        <li>Your hobbies</li>
        <li>Your career interest</li>
      </ul>

      <p>
        <strong>Tip:</strong>
        Speak slowly and maintain confidence.
      </p>
    `,

    college: `
      <h3>🎓 My College</h3>

      <p>
        Speak about your college, department,
        subjects, friends and learning experience.
      </p>

      <p>
        Try to speak continuously for one minute.
      </p>
    `,

    technology: `
      <h3>💻 Technology</h3>

      <p>
        Explain one technology you like.
      </p>

      <ul>
        <li>What is it?</li>
        <li>How does it work?</li>
        <li>Where is it used?</li>
        <li>Why is it useful?</li>
      </ul>
    `,

    career: `
      <h3>💼 My Career</h3>

      <p>
        Explain the type of software career
        you are preparing for.
      </p>

      <ul>
        <li>Skills you are learning</li>
        <li>Projects you are building</li>
        <li>Companies you are interested in</li>
        <li>How you are preparing</li>
      </ul>
    `

  };


  showModal(
    "🗣️ Speaking Practice",
    "Practice speaking without memorizing every sentence.",
    `
      <div class="modal-content">
        ${topics[type]}

        <br>

        <button
          class="primary full"
          onclick="updateProgress(2); showToast('Speaking practice completed! 🗣️');">
          ✓ Mark as Practiced
        </button>
      </div>
    `
  );

}


/* =========================================================
   COMMUNICATION PRACTICE
   ========================================================= */

function openCommunication() {

  showModal(
    "💬 Communication Practice",
    "Improve your communication skills with simple exercises.",
    `
      <div class="modal-content">

        <h3>Practice Areas</h3>

        <button
          class="secondary full"
          onclick="showCommunication('conversation')">
          🤝 Conversation
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showCommunication('presentation')">
          🎤 Presentation
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showCommunication('group')">
          👥 Group Discussion
        </button>

        <br>

        <button
          class="secondary full"
          onclick="showCommunication('interview')">
          💼 Interview Communication
        </button>

      </div>
    `
  );

}


/* Communication Topics */

function showCommunication(type) {

  const content = {

    conversation: `
      <h3>🤝 Conversation</h3>

      <p>
        Practice starting a conversation politely.
      </p>

      <div class="code-box">
Hello! How are you?

What are you currently learning?

That's interesting. Tell me more about it.
      </div>
    `,

    presentation: `
      <h3>🎤 Presentation</h3>

      <p>
        Use this simple structure:
      </p>

      <ol>
        <li>Introduction</li>
        <li>Topic explanation</li>
        <li>Example</li>
        <li>Conclusion</li>
      </ol>
    `,

    group: `
      <h3>👥 Group Discussion</h3>

      <p>
        Remember these points:
      </p>

      <ul>
        <li>Listen carefully.</li>
        <li>Speak clearly.</li>
        <li>Respect other opinions.</li>
        <li>Give useful examples.</li>
        <li>Do not interrupt unnecessarily.</li>
      </ul>
    `,

    interview: `
      <h3>💼 Interview Communication</h3>

      <p>
        Answer questions clearly and directly.
      </p>

      <p>
        Use examples from your projects,
        education and learning experience.
      </p>
    `

  };


  showModal(
    "💬 Communication Practice",
    "Simple techniques for better communication.",
    `
      <div class="modal-content">
        ${content[type]}

        <br>

        <button
          class="primary full"
          onclick="updateProgress(2); showToast('Communication practice completed! 💬');">
          ✓ Mark as Practiced
        </button>
      </div>
    `
  );

}


/* =========================================================
   MOCK INTERVIEW
   ========================================================= */

const interviewQuestions = [

  "Tell me about yourself.",

  "Why should we hire you?",

  "What are your strengths?",

  "What is your weakness?",

  "Explain one of your projects.",

  "Where do you see yourself in the future?",

  "Why did you choose Computer Science?",

  "What programming languages do you know?",

  "What is your favorite technical subject?",

  "How do you handle difficult problems?"

];


let interviewIndex = 0;


/* Open Mock Interview */

function openMockInterview() {

  interviewIndex = 0;

  showInterviewQuestion();

}


/* Show Interview Question */

function showInterviewQuestion() {

  if (
    interviewIndex >=
    interviewQuestions.length
  ) {

    finishInterview();

    return;

  }


  const question =
    interviewQuestions[
      interviewIndex
    ];


  showModal(
    `🎤 Mock Interview ${
      interviewIndex + 1
    }/${interviewQuestions.length}`,
    "Think about your answer before continuing.",
    `
      <div class="modal-content">

        <h3>
          ${escapeHTML(question)}
        </h3>

        <textarea
          id="interviewAnswer"
          rows="6"
          placeholder="Type your answer here..."
        ></textarea>

        <br>

        <button
          class="primary full"
          onclick="nextInterviewQuestion()">
          Next Question →
        </button>

      </div>
    `
  );

}


/* Next Interview Question */

function nextInterviewQuestion() {

  const answer =
    document.getElementById(
      "interviewAnswer"
    );


  if (
    !answer ||
    !answer.value.trim()
  ) {

    showToast(
      "Try writing an answer first."
    );

    return;

  }


  interviewIndex++;

  updateProgress(1);

  showInterviewQuestion();

}


/* Finish Interview */

function finishInterview() {

  showModal(
    "🏆 Mock Interview Complete",
    "You completed the practice interview.",
    `
      <div class="modal-content">

        <h3>Well done! 🎉</h3>

        <p>
          You practiced
          ${interviewQuestions.length}
          interview questions.
        </p>

        <p>
          Remember: good answers should be
          clear, relevant and supported with examples.
        </p>

        <button
          class="primary full"
          onclick="openMockInterview()">
          🔄 Practice Again
        </button>

      </div>
    `
  );

}


/* =========================================================
   RESUME BUILDER
   ========================================================= */

function openResumeBuilder() {

  const savedResume =
    localStorage.getItem(
      "learnixResume"
    );


  let resume = {

    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    projects: "",
    summary: ""

  };


  if (savedResume) {

    try {

      resume =
        JSON.parse(savedResume);

    } catch (error) {

      console.log(
        "Resume data could not be loaded."
      );

    }

  }


  showModal(
    "📄 Free Resume Builder",
    "Create a simple student resume directly in your browser.",
    `
      <div class="resume-form">

        <label>Full Name</label>

        <input
          id="resumeName"
          value="${escapeHTML(resume.name)}"
          placeholder="Your name"
        >

        <label>Email</label>

        <input
          id="resumeEmail"
          value="${escapeHTML(resume.email)}"
          placeholder="your@email.com"
        >

        <label>Phone</label>

        <input
          id="resumePhone"
          value="${escapeHTML(resume.phone)}"
          placeholder="Phone number"
        >

        <label>Education</label>

        <textarea
          id="resumeEducation"
          rows="3"
          placeholder="B.Tech in Computer Science..."
        >${escapeHTML(resume.education)}</textarea>

        <label>Skills</label>

        <textarea
          id="resumeSkills"
          rows="3"
          placeholder="Java, Python, HTML, CSS..."
        >${escapeHTML(resume.skills)}</textarea>

        <label>Projects</label>

        <textarea
          id="resumeProjects"
          rows="4"
          placeholder="Project name and short description..."
        >${escapeHTML(resume.projects)}</textarea>

        <label>Profile Summary</label>

        <textarea
          id="resumeSummary"
          rows="4"
          placeholder="Write a short professional summary..."
        >${escapeHTML(resume.summary)}</textarea>

        <br>

        <button
          class="primary full"
          onclick="generateResume()">
          ✨ Generate Resume
        </button>

      </div>
    `
  );

}


/* Generate Resume */

function generateResume() {

  const resume = {

    name:
      document.getElementById(
        "resumeName"
      ).value.trim(),

    email:
      document.getElementById(
        "resumeEmail"
      ).value.trim(),

    phone:
      document.getElementById(
        "resumePhone"
      ).value.trim(),

    education:
      document.getElementById(
        "resumeEducation"
      ).value.trim(),

    skills:
      document.getElementById(
        "resumeSkills"
      ).value.trim(),

    projects:
      document.getElementById(
        "resumeProjects"
      ).value.trim(),

    summary:
      document.getElementById(
        "resumeSummary"
      ).value.trim()

  };


  if (!resume.name) {

    showToast(
      "Please enter your name."
    );

    return;

  }


  localStorage.setItem(
    "learnixResume",
    JSON.stringify(resume)
  );


  showResumePreview(
    resume
  );


  updateProgress(5);

}


/* Resume Preview */

function showResumePreview(resume) {

  showModal(
    "📄 Resume Preview",
    "Your resume has been generated.",
    `
      <div class="resume-preview">

        <h1>
          ${escapeHTML(resume.name)}
        </h1>

        <p>
          ${escapeHTML(resume.email)}
          ${
            resume.phone
              ? " • " +
                escapeHTML(resume.phone)
              : ""
          }
        </p>

        <hr>

        ${
          resume.summary
            ? `
              <h3>PROFILE</h3>
              <p>
                ${escapeHTML(
                  resume.summary
                )}
              </p>
            `
            : ""
        }

        ${
          resume.education
            ? `
              <h3>EDUCATION</h3>
              <p>
                ${escapeHTML(
                  resume.education
                )}
              </p>
            `
            : ""
        }

        ${
          resume.skills
            ? `
              <h3>SKILLS</h3>
              <p>
                ${escapeHTML(
                  resume.skills
                )}
              </p>
            `
            : ""
        }

        ${
          resume.projects
            ? `
              <h3>PROJECTS</h3>
              <p>
                ${escapeHTML(
                  resume.projects
                )}
              </p>
            `
            : ""
        }

        <br>

        <button
          class="primary full"
          onclick="printResume()">
          🖨️ Print / Save as PDF
        </button>

      </div>
    `
  );

}


/* Print Resume */

function printResume() {

  const resumeData =
    localStorage.getItem(
      "learnixResume"
    );


  if (!resumeData) {

    showToast(
      "Create a resume first."
    );

    return;

  }


  let resume;


  try {

    resume =
      JSON.parse(resumeData);

  } catch (error) {

    showToast(
      "Resume data unavailable."
    );

    return;

  }


  const printWindow =
    window.open(
      "",
      "_blank"
    );


  if (!printWindow) {

    showToast(
      "Please allow pop-ups to print your resume."
    );

    return;

  }


  printWindow.document.write(`

    <!DOCTYPE html>

    <html>

    <head>

      <title>
        ${escapeHTML(resume.name)} - Resume
      </title>

      <style>

        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          line-height: 1.6;
          color: #222;
        }

        h1 {
          margin-bottom: 5px;
        }

        h3 {
          margin-top: 25px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }

      </style>

    </head>

    <body>

      <h1>
        ${escapeHTML(resume.name)}
      </h1>

      <p>
        ${escapeHTML(resume.email)}
        ${
          resume.phone
            ? " | " +
              escapeHTML(resume.phone)
            : ""
        }
      </p>

      ${
        resume.summary
          ? `
            <h3>PROFILE</h3>
            <p>${escapeHTML(
              resume.summary
            )}</p>
          `
          : ""
      }

      ${
        resume.education
          ? `
            <h3>EDUCATION</h3>
            <p>${escapeHTML(
              resume.education
            )}</p>
          `
          : ""
      }

      ${
        resume.skills
          ? `
            <h3>SKILLS</h3>
            <p>${escapeHTML(
              resume.skills
            )}</p>
          `
          : ""
      }

      ${
        resume.projects
          ? `
            <h3>PROJECTS</h3>
            <p>${escapeHTML(
              resume.projects
            )}</p>
          `
          : ""
      }

    </body>

    </html>

  `);


  printWindow.document.close();


  setTimeout(
    function () {

      printWindow.print();

    },
    500
  );

}


/* =========================================================
   JOB PREPARATION
   ========================================================= */

function openJobPreparation() {

  showModal(
    "💼 Job Preparation",
    "Prepare step-by-step for software placements.",
    `
      <div class="modal-content">

        <h3>🚀 Placement Roadmap</h3>

        <div class="roadmap-step">
          <strong>1. Programming</strong>
          <p>
            Practice Java, Python or another
            programming language.
          </p>
        </div>

        <div class="roadmap-step">
          <strong>2. Data Structures</strong>
          <p>
            Learn arrays, linked lists, stacks,
            queues, trees and graphs.
          </p>
        </div>

        <div class="roadmap-step">
          <strong>3. Core CS</strong>
          <p>
            Revise DBMS, OS, Computer Networks
            and OOP.
          </p>
        </div>

        <div class="roadmap-step">
          <strong>4. Aptitude</strong>
          <p>
            Practice quantitative aptitude,
            logical reasoning and verbal ability.
          </p>
        </div>

        <div class="roadmap-step">
          <strong>5. Projects</strong>
          <p>
            Build projects and understand
            every project on your resume.
          </p>
        </div>

        <div class="roadmap-step">
          <strong>6. Interview</strong>
          <p>
            Practice technical and HR questions.
          </p>
        </div>

        <button
          class="primary full"
          onclick="updateProgress(5); showToast('Placement preparation started! 🚀');">
          🚀 Start Preparation
        </button>

      </div>
    `
  );

}


/* =========================================================
   SECTION 4 COMPLETE
   ========================================================= */
/* =========================================================
   PART 3 — SECTION 5
   FINAL SETUP + DAILY STREAK + RESOURCE BOOKMARKS
   ========================================================= */


/* =========================================================
   DAILY LEARNING STREAK
   ========================================================= */

function updateDailyStreak() {

  const today =
    new Date().toISOString().split("T")[0];

  const lastVisit =
    localStorage.getItem(
      "learnixLastVisit"
    );

  let streak =
    parseInt(
      localStorage.getItem(
        "learnixStreak"
      ) || "0",
      10
    );


  if (!lastVisit) {

    streak = 1;

  } else if (lastVisit !== today) {

    const lastDate =
      new Date(lastVisit);

    const currentDate =
      new Date(today);

    const difference =
      Math.floor(
        (
          currentDate -
          lastDate
        ) /
        (1000 * 60 * 60 * 24)
      );


    if (difference === 1) {

      streak++;

    } else if (difference > 1) {

      streak = 1;

    }

  }


  localStorage.setItem(
    "learnixLastVisit",
    today
  );

  localStorage.setItem(
    "learnixStreak",
    streak
  );


  return streak;

}


/* =========================================================
   WELCOME MESSAGE
   ========================================================= */

function showWelcomeMessage() {

  const name =
    localStorage.getItem(
      "learnixName"
    );


  const streak =
    parseInt(
      localStorage.getItem(
        "learnixStreak"
      ) || "1",
      10
    );


  if (name) {

    setTimeout(
      function () {

        showToast(
          `Welcome back, ${name}! 🔥 ${streak} day streak`
        );

      },
      1200
    );

  }

}


/* =========================================================
   RESOURCE BOOKMARK BUTTONS
   ========================================================= */

function bookmarkResource(title) {

  addBookmark(
    title,
    "Free Learnix Resource"
  );

}


/* =========================================================
   QUICK BOOKMARK BUTTON
   ========================================================= */

function saveCurrentTopic(title) {

  bookmarkResource(
    title
  );

}


/* =========================================================
   LEARNING STATISTICS
   ========================================================= */

function getLearningStats() {

  const progress =
    getProgress();


  const streak =
    parseInt(
      localStorage.getItem(
        "learnixStreak"
      ) || "0",
      10
    );


  const quizBest =
    parseInt(
      localStorage.getItem(
        "learnixBestScore"
      ) || "0",
      10
    );


  const timerSessions =
    parseInt(
      localStorage.getItem(
        "learnixTimerSessions"
      ) || "0",
      10
    );


  const bookmarks =
    getBookmarks();


  return {

    progress: progress,

    streak: streak,

    quizBest: quizBest,

    timerSessions: timerSessions,

    bookmarks:
      bookmarks.length

  };

}


/* =========================================================
   LEARNING DASHBOARD
   ========================================================= */

function openLearningDashboard() {

  const stats =
    getLearningStats();


  showModal(
    "📊 My Learning Dashboard",
    "Your Learnix learning statistics.",
    `
      <div class="stats-dashboard">

        <div class="stat-box">

          <span class="stat-icon">
            📈
          </span>

          <strong>
            ${stats.progress}%
          </strong>

          <small>
            Progress
          </small>

        </div>


        <div class="stat-box">

          <span class="stat-icon">
            🔥
          </span>

          <strong>
            ${stats.streak}
          </strong>

          <small>
            Day Streak
          </small>

        </div>


        <div class="stat-box">

          <span class="stat-icon">
            🎯
          </span>

          <strong>
            ${stats.quizBest}%
          </strong>

          <small>
            Best Quiz
          </small>

        </div>


        <div class="stat-box">

          <span class="stat-icon">
            ⏱️
          </span>

          <strong>
            ${stats.timerSessions}
          </strong>

          <small>
            Study Sessions
          </small>

        </div>


        <div class="stat-box">

          <span class="stat-icon">
            🔖
          </span>

          <strong>
            ${stats.bookmarks}
          </strong>

          <small>
            Bookmarks
          </small>

        </div>

      </div>


      <br>

      <button
        class="primary full"
        onclick="openAchievements()">
        🏆 View Achievements
      </button>
    `
  );

}


/* =========================================================
   FEATURE QUICK ACTIONS
   ========================================================= */

function quickAction(feature) {

  openFeature(
    feature
  );

}


/* =========================================================
   RESET LEARNIX DATA
   ========================================================= */

function resetLearnixData() {

  const confirmed =
    confirm(
      "Reset your Learnix progress, bookmarks, quiz scores and saved data?"
    );


  if (!confirmed) {
    return;
  }


  const keys = [

    "learnixName",
    "learnixProgress",
    "learnixTheme",
    "learnixStudyPlan",
    "learnixDailyPlan",
    "learnixBookmarks",
    "learnixBestScore",
    "learnixTimerSessions",
    "learnixLastVisit",
    "learnixStreak",
    "learnixResume"

  ];


  keys.forEach(
    function (key) {

      localStorage.removeItem(
        key
      );

    }
  );


  showToast(
    "Learnix data reset successfully."
  );


  setTimeout(
    function () {

      location.reload();

    },
    800
  );

}


/* =========================================================
   SERVICE WORKER UPDATE
   ========================================================= */

function registerServiceWorker() {

  if (
    "serviceWorker" in navigator
  ) {

    window.addEventListener(
      "load",
      function () {

        navigator.serviceWorker
          .register(
            "service-worker.js"
          )
          .then(
            function (registration) {

              console.log(
                "Learnix service worker registered."
              );


              registration.addEventListener(
                "updatefound",
                function () {

                  const newWorker =
                    registration.installing;


                  if (!newWorker) {
                    return;
                  }


                  newWorker.addEventListener(
                    "statechange",
                    function () {

                      if (
                        newWorker.state ===
                        "installed"
                      ) {

                        if (
                          navigator
                            .serviceWorker
                            .controller
                        ) {

                          showToast(
                            "New Learnix version available. Refresh the page."
                          );

                        }

                      }

                    }
                  );

                }
              );

            }
          )
          .catch(
            function (error) {

              console.log(
                "Service worker registration failed:",
                error
              );

            }
          );

      }
    );

  }

}


/* =========================================================
   FINAL STARTUP
   ========================================================= */

function initializeLearnix() {

  try {

    updateDailyStreak();

    loadTheme();

    loadProgress();

    updateThemeButton();

    registerServiceWorker();

    showWelcomeMessage();

    console.log(
      "Learnix initialized successfully 🚀"
    );

  } catch (error) {

    console.log(
      "Learnix startup error:",
      error
    );

  }

}


/* =========================================================
   START LEARNIX
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeLearnix
  );

} else {

  initializeLearnix();

}


/* =========================================================
   PART 3 COMPLETE 🎉
   ========================================================= */
