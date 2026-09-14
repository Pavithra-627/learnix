// ===============================
// LEARNIX - MAIN JAVASCRIPT
// ===============================


// ===============================
// ELEMENTS
// ===============================

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const nameInput = document.getElementById("nameInput");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");


// ===============================
// MOBILE MENU
// ===============================

if (navToggle && nav) {

  navToggle.addEventListener("click", function () {

    nav.classList.toggle("open");

  });

}


// ===============================
// SCROLL
// ===============================

function scrollToSection(id) {

  const section = document.getElementById(id);

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }

  if (nav) {
    nav.classList.remove("open");
  }

}


// ===============================
// SHOW MODAL
// ===============================

function showModal() {

  if (!modal) return;

  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


// ===============================
// HIDE MAIN MODAL BUTTON
// ===============================

function hideMainModalButton() {

  if (nameInput) {
    nameInput.style.display = "none";
  }

  const button =
    document.querySelector(".modal-box > .primary");

  if (button) {

    button.style.display = "none";

  }

}


// ===============================
// OPEN MAIN MODAL
// ===============================

function openModal() {

  modalTitle.textContent =
    "Welcome to Learnix ✨";

  modalText.textContent =
    "Create your student profile to start exploring Learnix.";

  nameInput.value =
    localStorage.getItem("learnixName") || "";

  nameInput.style.display = "block";

  const mainButton =
    document.querySelector(".modal-box > .primary");

  if (mainButton) {

    mainButton.style.display = "block";

    mainButton.textContent =
      "Continue →";

    mainButton.onclick =
      continueAction;

  }

  showModal();

  setTimeout(function () {

    nameInput.focus();

  }, 100);

}


// ===============================
// LEARNING TUTOR
// ===============================

function openTutor() {

  modalTitle.textContent =
    "Learning Tutor 🤖";

  modalText.innerHTML = `

    <div class="tool-box">

      <label for="tutorQuestion">
        <strong>Ask a study question:</strong>
      </label>

      <textarea
        id="tutorQuestion"
        rows="5"
        placeholder="Example: Explain linked list in simple words"
        style="
          width:100%;
          margin-top:10px;
          padding:12px;
          border-radius:10px;
          border:1px solid #ccc;
          font-size:16px;
          box-sizing:border-box;
          resize:vertical;
        "
      ></textarea>

      <button
        class="primary full"
        onclick="askTutor()"
        style="margin-top:12px;"
      >
        Explain →
      </button>

      <div
        id="tutorAnswer"
        style="margin-top:18px;"
      ></div>

    </div>

  `;

  hideMainModalButton();

  showModal();

  setTimeout(function () {

    const question =
      document.getElementById("tutorQuestion");

    if (question) {
      question.focus();
    }

  }, 100);

}


// ===============================
// ASK TUTOR
// ===============================

function askTutor() {

  const questionElement =
    document.getElementById("tutorQuestion");

  const answerElement =
    document.getElementById("tutorAnswer");

  if (!questionElement || !answerElement) {
    return;
  }

  const question =
    questionElement.value.trim();

  if (!question) {

    answerElement.innerHTML = `

      <div style="
        padding:12px;
        border-radius:10px;
        background:#fff3cd;
      ">

        ⚠️ Please enter a question.

      </div>

    `;

    return;
  }

  const q =
    question.toLowerCase();


  // ===============================
  // LINKED LIST
  // ===============================

  if (
    q.includes("linked list") ||
    q.includes("linkedlist")
  ) {

    answerElement.innerHTML = `

      <div class="tool-box">

        <h3>
          📚 Linked List
        </h3>

        <p>
          A <strong>linked list</strong> is a linear
          data structure made up of nodes.
        </p>

        <p>
          Each node contains:
        </p>

        <ul>
          <li>Data</li>
          <li>A link to the next node</li>
        </ul>

        <p>
          Example:
        </p>

        <p>
          <strong>
            10 → 20 → 30 → NULL
          </strong>
        </p>

        <p>
          Here, each node points to the next node.
          The final node points to NULL.
        </p>

        <p>
          <strong>Easy definition:</strong>
          A linked list is a linear data structure
          where nodes are connected using links.
        </p>

      </div>

    `;

    return;
  }


  // ===============================
  // STACK
  // ===============================

  if (q.includes("stack")) {

    answerElement.innerHTML = `

      <div class="tool-box">

        <h3>
          📚 Stack
        </h3>

        <p>
          A stack is a linear data structure
          that works like a stack of plates.
        </p>

        <p>
          It follows:
        </p>

        <p>
          <strong>
            LIFO — Last In, First Out
          </strong>
        </p>

        <p>
          Example:
        </p>

        <p>
          10 → 20 → 30
        </p>

        <p>
          The last inserted element,
          30, is removed first.
        </p>

      </div>

    `;

    return;
  }
// ===============================
  // QUEUE
  // ===============================

  if (q.includes("queue")) {

    answerElement.innerHTML = `

      <div class="tool-box">

        <h3>
          📚 Queue
        </h3>

        <p>
          A queue is a linear data structure
          that works like a line of people.
        </p>

        <p>
          It follows:
        </p>

        <p>
          <strong>
            FIFO — First In, First Out
          </strong>
        </p>

        <p>
          The person who enters the queue first
          is served first.
        </p>

      </div>

    `;

    return;
  }


  // ===============================
  // ARRAY
  // ===============================

  if (q.includes("array")) {

    answerElement.innerHTML = `

      <div class="tool-box">

        <h3>
          📚 Array
        </h3>

        <p>
          An array stores multiple values
          using indexed positions.
        </p>

        <p>
          Example:
        </p>

        <p>
          <strong>
            int numbers[] = {10, 20, 30, 40, 50};
          </strong>
        </p>

        <p>
          The first element is accessed using
          index 0.
        </p>

      </div>

    `;

    return;
  }


  // ===============================
  // INHERITANCE
  // ===============================

  if (q.includes("inheritance")) {

    answerElement.innerHTML = `

      <div class="tool-box">

        <h3>
          ☕ Java Inheritance
        </h3>

        <p>
          Inheritance allows one class to acquire
          properties and methods of another class.
        </p>

        <p>
          The existing class is called the
          <strong>parent/superclass</strong>.
        </p>

        <p>
          The new class is called the
          <strong>child/subclass</strong>.
        </p>

        <p>
          Java supports single, multilevel and
          hierarchical inheritance through classes.
        </p>

      </div>

    `;

    return;
  }


  // ===============================
  // INTERFACE
  // ===============================

  if (q.includes("interface")) {

    answerElement.innerHTML = `

      <div class="tool-box">

        <h3>
          ☕ Java Interface
        </h3>

        <p>
          An interface defines a contract that
          implementing classes must follow.
        </p>

        <p>
          Interfaces are useful for abstraction
          and allow a class to implement multiple
          interfaces.
        </p>

        <p>
          Example:
        </p>

        <p>
          <strong>
            interface Animal { void sound(); }
          </strong>
        </p>

      </div>

    `;

    return;
  }


  // ===============================
  // DBMS
  // ===============================

  if (
    q.includes("dbms") ||
    q.includes("database")
  ) {

    answerElement.innerHTML = `

      <div class="tool-box">

        <h3>
          🗄️ DBMS
        </h3>

        <p>
          DBMS stands for
          <strong>Database Management System</strong>.
        </p>

        <p>
          It is software used to store,
          organize, retrieve and manage data.
        </p>

        <p>
          Examples of database concepts include
          tables, primary keys, foreign keys,
          SQL and relationships.
        </p>

      </div>

    `;

    return;
  }


  // ===============================
  // GENERIC TUTOR ANSWER
  // ===============================

  answerElement.innerHTML = `

    <div class="tool-box">

      <h3>
        🤖 Learnix Tutor
      </h3>

      <p>
        You asked:
      </p>

      <p>
        <strong>
          ${escapeHTML(question)}
        </strong>
      </p>

      <p>
        Start by learning the basic definition,
        important concepts and a simple example.
      </p>

      <p>
        💡 <strong>Study Tip:</strong>
        Break difficult topics into small parts
        and practice them one by one.
      </p>

      <p>
        This free version provides built-in
        explanations for selected topics.
      </p>

    </div>

  `;

}


// ===============================
// FEATURE HANDLER
// ===============================

function openFeature(feature) {


  // PDF NOTES

  if (feature === "PDF → Notes") {

    openPDFNotes();

    return;
  }


  // MCQ

  if (feature === "MCQ Generator") {

    openMCQGenerator();

    return;
  }


  // EXAM ANSWERS

  if (feature === "Exam Answers") {

    openExamAnswers();

    return;
  }


  // CODING

  if (feature === "Coding Practice") {

    openCodingPractice();

    return;
  }


  // ENGLISH

  if (feature === "English Speaking") {

    openEnglishPractice();

    return;
  }


  // COMMUNICATION

  if (feature === "Communication") {

    openCommunication();

    return;
  }


  // RESUME

  if (feature === "Resume Builder") {

    openResumeBuilder();

    return;
  }


  // INTERVIEW

  if (feature === "Mock Interview") {

    openMockInterview();

    return;
  }


  // JOB

  if (feature === "Job Preparation") {

    openJobPreparation();

    return;
  }


  // FREE STUDY GUIDES

  if (
    feature === "Java Guide" ||
    feature === "DBMS Guide" ||
    feature === "DSA Guide" ||
    feature === "Digital Logic Guide" ||
    feature === "Placement Guide" ||
    feature === "Resume Guide"
  ) {

    openStudyGuide(feature);

    return;
  }


  // DEFAULT

  modalTitle.textContent =
    feature;

  modalText.innerHTML = `

    <p>
      <strong>
        ${escapeHTML(feature)}
      </strong>
    </p>

    <p>
      This Learnix feature is available
      for students to explore.
    </p>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// PDF → NOTES
// ===============================

function openPDFNotes() {

  modalTitle.textContent =
    "PDF → Notes 📄";

  modalText.innerHTML = `

    <p>
      Select a study file and create
      simple revision notes.
    </p>

    <input
      type="file"
      id="pdfFile"
      accept=".pdf,.txt"
      style="
        width:100%;
        margin:15px 0;
      "
    >

    <button
      class="primary full"
      onclick="createNotes()"
    >
      Create Notes →
    </button>

    <div
      id="notesResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}
// ===============================
// CREATE NOTES
// ===============================

function createNotes() {

  const fileInput =
    document.getElementById("pdfFile");

  const result =
    document.getElementById("notesResult");

  if (
    !fileInput ||
    !fileInput.files.length
  ) {

    result.innerHTML =
      "<p>⚠️ Please select a file first.</p>";

    return;
  }

  const file =
    fileInput.files[0];


  if (
    file.name
      .toLowerCase()
      .endsWith(".txt")
  ) {

    const reader =
      new FileReader();

    reader.onload =
      function (event) {

        const text =
          event.target.result;

        result.innerHTML = `

          <div class="tool-box">

            <h3>
              📝 Notes
            </h3>

            <p>
              ${escapeHTML(text)}
            </p>

          </div>

        `;

      };

    reader.readAsText(file);

  }

  else {

    result.innerHTML = `

      <div class="tool-box">

        <h3>
          📄 PDF Selected
        </h3>

        <p>
          Your PDF was selected successfully.
        </p>

        <p>
          Browser-only PDF text extraction is
          not enabled in this free version.
        </p>

        <p>
          You can currently use TXT files
          for direct text reading.
        </p>

      </div>

    `;

  }

}


// ===============================
// MCQ GENERATOR
// ===============================

function openMCQGenerator() {

  modalTitle.textContent =
    "MCQ Generator 📝";

  modalText.innerHTML = `

    <p>
      Enter a study topic:
    </p>

    <input
      id="mcqTopic"
      type="text"
      placeholder="Example: Data Structures"
      style="
        width:100%;
        padding:12px;
        border-radius:10px;
        border:1px solid #ccc;
        box-sizing:border-box;
      "
    >

    <button
      class="primary full"
      onclick="generateMCQ()"
      style="margin-top:12px;"
    >
      Generate MCQs →
    </button>

    <div
      id="mcqResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// GENERATE MCQ
// ===============================

function generateMCQ() {

  const topicElement =
    document.getElementById("mcqTopic");

  const result =
    document.getElementById("mcqResult");

  if (!topicElement || !result) {
    return;
  }

  const topic =
    topicElement.value.trim();

  if (!topic) {

    result.innerHTML =
      "<p>⚠️ Please enter a topic.</p>";

    return;
  }

  const safeTopic =
    escapeHTML(topic);

  result.innerHTML = `

    <div class="tool-box">

      <h3>
        📝 Practice MCQs
      </h3>

      <p>
        <strong>
          1. What is ${safeTopic}?
        </strong>
      </p>

      <p>
        A) A programming concept<br>
        B) A data structure<br>
        C) An academic topic<br>
        D) All of the above
      </p>

      <p>
        <strong>
          Answer: D
        </strong>
      </p>

      <hr>

      <p>
        <strong>
          2. Why should students learn ${safeTopic}?
        </strong>
      </p>

      <p>
        A) To improve understanding<br>
        B) To prepare for exams<br>
        C) To improve practical knowledge<br>
        D) All of the above
      </p>

      <p>
        <strong>
          Answer: D
        </strong>
      </p>

      <hr>

      <p>
        <strong>
          3. What is a good way to learn ${safeTopic}?
        </strong>
      </p>

      <p>
        A) Read concepts<br>
        B) Practice examples<br>
        C) Revise regularly<br>
        D) All of the above
      </p>

      <p>
        <strong>
          Answer: D
        </strong>
      </p>

    </div>

  `;

}


// ===============================
// EXAM ANSWERS
// ===============================

function openExamAnswers() {

  modalTitle.textContent =
    "Exam Answers ✍️";

  modalText.innerHTML = `

    <p>
      Enter your exam question:
    </p>

    <textarea
      id="examQuestion"
      rows="5"
      placeholder="Example: Explain inheritance in Java"
      style="
        width:100%;
        padding:12px;
        border-radius:10px;
        border:1px solid #ccc;
        box-sizing:border-box;
      "
    ></textarea>

    <button
      class="primary full"
      onclick="generateExamAnswer()"
      style="margin-top:12px;"
    >
      Create Answer →
    </button>

    <div
      id="examResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// GENERATE EXAM ANSWER
// ===============================

function generateExamAnswer() {

  const questionElement =
    document.getElementById("examQuestion");

  const result =
    document.getElementById("examResult");

  if (!questionElement || !result) {
    return;
  }

  const question =
    questionElement.value.trim();

  if (!question) {

    result.innerHTML =
      "<p>⚠️ Please enter a question.</p>";

    return;
  }

  result.innerHTML = `

    <div class="tool-box">

      <h3>
        📚 Exam Answer Structure
      </h3>

      <p>
        <strong>
          Question:
        </strong>
        ${escapeHTML(question)}
      </p>

      <h4>
        1. Introduction
      </h4>

      <p>
        Begin with a clear definition of the
        concept mentioned in the question.
      </p>

      <h4>
        2. Main Explanation
      </h4>

      <p>
        Explain the important concepts,
        characteristics, working process
        and relevant points.
      </p>

      <h4>
        3. Example
      </h4>

      <p>
        Give a simple real-world,
        programming or diagram-based example.
      </p>

      <h4>
        4. Advantages / Applications
      </h4>

      <p>
        Mention important advantages,
        uses or applications when relevant.
      </p>

      <h4>
        5. Conclusion
      </h4>

      <p>
        End with a short statement that
        summarizes the importance of the topic.
      </p>

      <p>
        💡 <strong>Exam Tip:</strong>
        Use headings, points, examples and
        diagrams wherever appropriate.
      </p>

    </div>

  `;

}
// ===============================
// CODING PRACTICE
// ===============================

function openCodingPractice() {

  modalTitle.textContent =
    "Coding Practice 👨‍💻";

  modalText.innerHTML = `

    <p>
      Write a small piece of code and
      check some basic coding practices.
    </p>

    <textarea
      id="codeInput"
      rows="10"
      placeholder="Write your code here..."
      style="
        width:100%;
        padding:12px;
        border-radius:10px;
        border:1px solid #ccc;
        box-sizing:border-box;
        font-family:monospace;
      "
    ></textarea>

    <button
      class="primary full"
      onclick="checkCode()"
      style="margin-top:12px;"
    >
      Check Code →
    </button>

    <div
      id="codeResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// CHECK CODE
// ===============================

function checkCode() {

  const codeElement =
    document.getElementById("codeInput");

  const result =
    document.getElementById("codeResult");

  if (!codeElement || !result) {
    return;
  }

  const code =
    codeElement.value.trim();

  if (!code) {

    result.innerHTML =
      "<p>⚠️ Please write some code.</p>";

    return;
  }


  const lines =
    code.split("\n").length;

  const hasSemicolon =
    code.includes(";");

  const hasBraces =
    code.includes("{") &&
    code.includes("}");


  result.innerHTML = `

    <div class="tool-box">

      <h3>
        ✅ Code Review
      </h3>

      <p>
        Your code contains approximately
        <strong>${lines}</strong> line(s).
      </p>

      <p>
        ${hasBraces
          ? "✅ Curly braces were detected."
          : "💡 Check whether your code needs curly braces."}
      </p>

      <p>
        ${hasSemicolon
          ? "✅ Statement separators were detected."
          : "💡 Check statement syntax depending on your programming language."}
      </p>

      <p>
        💡 Review syntax, logic, input,
        output and edge cases.
      </p>

      <p>
        This is a basic browser-based checker,
        not a full compiler.
      </p>

    </div>

  `;

}


// ===============================
// ENGLISH SPEAKING
// ===============================

function openEnglishPractice() {

  modalTitle.textContent =
    "English Speaking 🗣️";

  modalText.innerHTML = `

    <p>
      Read this sentence aloud:
    </p>

    <div class="tool-box">

      <p>
        "Hello, my name is Pavithra.
        I am studying Computer Science and
        I want to become a software engineer."
      </p>

    </div>

    <button
      class="primary full"
      onclick="startSpeaking()"
      style="margin-top:12px;"
    >
      🎤 Start Speaking
    </button>

    <div
      id="speakingResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// SPEECH RECOGNITION
// ===============================

function startSpeaking() {

  const result =
    document.getElementById("speakingResult");

  if (!result) {
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (!SpeechRecognition) {

    result.innerHTML = `

      <p>
        ⚠️ Speech recognition is not supported
        in this browser.
      </p>

    `;

    return;
  }


  const recognition =
    new SpeechRecognition();

  recognition.lang =
    "en-US";

  recognition.interimResults =
    false;

  recognition.maxAlternatives =
    1;


  result.innerHTML =
    "<p>🎤 Listening...</p>";


  try {

    recognition.start();

  }

  catch (error) {

    result.innerHTML =
      "<p>⚠️ Please try again.</p>";

  }


  recognition.onresult =
    function (event) {

      const text =
        event.results[0][0].transcript;

      result.innerHTML = `

        <div class="tool-box">

          <h3>
            🗣️ You said:
          </h3>

          <p>
            ${escapeHTML(text)}
          </p>

          <p>
            ✅ Good practice!
            Keep speaking regularly.
          </p>

        </div>

      `;

    };


  recognition.onerror =
    function () {

      result.innerHTML =
        "<p>⚠️ Could not hear you. Please try again.</p>";

    };

}


// ===============================
// COMMUNICATION
// ===============================

function openCommunication() {

  modalTitle.textContent =
    "Communication Practice 🎤";

  modalText.innerHTML = `

    <h3>
      🎯 Practice Topic
    </h3>

    <p>
      <strong>
        Introduce yourself in an interview.
      </strong>
    </p>

    <textarea
      id="communicationInput"
      rows="7"
      placeholder="Write your answer..."
      style="
        width:100%;
        padding:12px;
        border-radius:10px;
        border:1px solid #ccc;
        box-sizing:border-box;
      "
    ></textarea>

    <button
      class="primary full"
      onclick="checkCommunication()"
      style="margin-top:12px;"
    >
      Check Answer →
    </button>

    <div
      id="communicationResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// CHECK COMMUNICATION
// ===============================

function checkCommunication() {

  const input =
    document.getElementById("communicationInput");

  const result =
    document.getElementById("communicationResult");

  if (!input || !result) {
    return;
  }

  const answer =
    input.value.trim();

  if (!answer) {

    result.innerHTML =
      "<p>⚠️ Please write your answer.</p>";

    return;
  }


  const words =
    answer.split(/\s+/).filter(Boolean).length;


  result.innerHTML = `

    <div class="tool-box">

      <h3>
        ✅ Communication Feedback
      </h3>

      <p>
        Your response contains approximately
        <strong>${words}</strong> words.
      </p>

      <p>
        💡 Keep your introduction clear,
        confident and organized.
      </p>

      <p>
        Try to include your education,
        technical skills, projects,
        strengths and career interests.
      </p>

      <p>
        Practice speaking slowly and
        clearly.
      </p>

    </div>

  `;

}


// ===============================
// RESUME BUILDER
// ===============================

function openResumeBuilder() {

  modalTitle.textContent =
    "Resume Builder 📄";

  modalText.innerHTML = `

    <input
      id="resumeName"
      placeholder="Full Name"
      style="
        width:100%;
        padding:10px;
        margin:5px 0;
        box-sizing:border-box;
      "
    >

    <input
      id="resumeEmail"
      placeholder="Email"
      style="
        width:100%;
        padding:10px;
        margin:5px 0;
        box-sizing:border-box;
      "
    >

    <input
      id="resumeEducation"
      placeholder="Education"
      style="
        width:100%;
        padding:10px;
        margin:5px 0;
        box-sizing:border-box;
      "
    >

    <input
      id="resumeSkills"
      placeholder="Skills"
      style="
        width:100%;
        padding:10px;
        margin:5px 0;
        box-sizing:border-box;
      "
    >

    <input
      id="resumeProjects"
      placeholder="Projects"
      style="
        width:100%;
        padding:10px;
        margin:5px 0;
        box-sizing:border-box;
      "
    >

    <button
      class="primary full"
      onclick="generateResume()"
      style="margin-top:12px;"
    >
      Generate Resume →
    </button>

    <div
      id="resumeResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// GENERATE RESUME
// ===============================

function generateResume() {

  const name =
    document.getElementById("resumeName").value.trim();

  const email =
    document.getElementById("resumeEmail").value.trim();

  const education =
    document.getElementById("resumeEducation").value.trim();

  const skills =
    document.getElementById("resumeSkills").value.trim();

  const projects =
    document.getElementById("resumeProjects").value.trim();

  const result =
    document.getElementById("resumeResult");


  if (!name) {

    result.innerHTML =
      "<p>⚠️ Please enter your name.</p>";

    return;
  }


  result.innerHTML = `

    <div style="
      padding:18px;
      background:white;
      border:1px solid #ddd;
      border-radius:12px;
    ">

      <h2>
        ${escapeHTML(name)}
      </h2>

      <p>
        ${escapeHTML(email || "Add your email")}
      </p>

      <hr>

      <h3>
        Education
      </h3>

      <p>
        ${escapeHTML(
          education || "Add your education"
        )}
      </p>

      <h3>
        Skills
      </h3>

      <p>
        ${escapeHTML(
          skills || "Add your skills"
        )}
      </p>

      <h3>
        Projects
      </h3>

      <p>
        ${escapeHTML(
          projects || "Add your projects"
        )}
      </p>

    </div>

  `;

}


// ===============================
// MOCK INTERVIEW
// ===============================

function openMockInterview() {

  modalTitle.textContent =
    "Mock Interview 🎙️";

  modalText.innerHTML = `

    <h3>
      Question 1
    </h3>

    <p>
      Tell me about yourself.
    </p>

    <textarea
      id="interviewAnswer"
      rows="7"
      placeholder="Type your answer..."
      style="
        width:100%;
        padding:12px;
        border-radius:10px;
        border:1px solid #ccc;
        box-sizing:border-box;
      "
    ></textarea>

    <button
      class="primary full"
      onclick="checkInterview()"
      style="margin-top:12px;"
    >
      Submit Answer →
    </button>

    <div
      id="interviewResult"
      style="margin-top:15px;">
    </div>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// CHECK INTERVIEW
// ===============================

function checkInterview() {

  const input =
    document.getElementById("interviewAnswer");

  const result =
    document.getElementById("interviewResult");

  if (!input || !result) {
    return;
  }

  const answer =
    input.value.trim();

  if (!answer) {

    result.innerHTML =
      "<p>⚠️ Please enter your answer.</p>";

    return;
  }


  const words =
    answer.split(/\s+/).filter(Boolean).length;


  result.innerHTML = `

    <div class="tool-box">

      <h3>
        🎯 Interview Feedback
      </h3>

      <p>
        Your answer contains approximately
        <strong>${words}</strong> words.
      </p>

      <p>
        Try to include:
      </p>

      <ul>
        <li>Your education</li>
        <li>Technical skills</li>
        <li>Projects</li>
        <li>Strengths</li>
        <li>Career interests</li>
      </ul>

      <p>
        💡 Keep your introduction around
        60–90 seconds when speaking.
      </p>

    </div>

  `;

}
// ===============================
// JOB PREPARATION
// ===============================

function openJobPreparation() {

  modalTitle.textContent =
    "Job Preparation 🚀";

  modalText.innerHTML = `

    <h3>
      🎯 Preparation Checklist
    </h3>

    <label>
      <input type="checkbox">
      Build a professional resume
    </label>

    <br><br>

    <label>
      <input type="checkbox">
      Practice coding problems
    </label>

    <br><br>

    <label>
      <input type="checkbox">
      Improve communication skills
    </label>

    <br><br>

    <label>
      <input type="checkbox">
      Practice HR interview questions
    </label>

    <br><br>

    <label>
      <input type="checkbox">
      Prepare technical interview topics
    </label>

    <br><br>

    <label>
      <input type="checkbox">
      Build projects for your portfolio
    </label>

    <br><br>

    <p>
      💡 Complete these steps one by one
      to become interview-ready.
    </p>

  `;

  hideMainModalButton();

  showModal();

}


// ===============================
// FREE STUDY GUIDES
// ===============================

function openStudyGuide(feature) {

  const guides = {


    // ===========================
    // JAVA
    // ===========================

    "Java Guide": {

      title: "Java Basics ☕",

      content: `

        <h3>
          What is Java?
        </h3>

        <p>
          Java is a high-level, object-oriented
          programming language used to develop
          many types of software applications.
        </p>

        <h3>
          Important Java Topics
        </h3>

        <ul>
          <li>Classes and Objects</li>
          <li>Constructors</li>
          <li>Methods</li>
          <li>Encapsulation</li>
          <li>Inheritance</li>
          <li>Polymorphism</li>
          <li>Abstraction</li>
          <li>Interfaces</li>
          <li>Exception Handling</li>
          <li>Arrays</li>
        </ul>

        <h3>
          Class and Object
        </h3>

        <p>
          A class is a blueprint used to create
          objects. An object is an instance of
          a class.
        </p>

        <h3>
          Inheritance
        </h3>

        <p>
          Inheritance allows a child class to
          acquire properties and methods from
          a parent class.
        </p>

        <h3>
          Interface
        </h3>

        <p>
          An interface defines a contract that
          implementing classes follow. Interfaces
          are useful for abstraction.
        </p>

        <h3>
          Exception Handling
        </h3>

        <p>
          Exception handling manages runtime
          errors using constructs such as
          try, catch, finally, throw and throws.
        </p>

        <h3>
          Exam Tip
        </h3>

        <p>
          Learn the definition, syntax,
          example and advantages of every
          important Java concept.
        </p>

      `
    },


    // ===========================
    // DBMS
    // ===========================

    "DBMS Guide": {

      title: "DBMS Basics 🗄️",

      content: `

        <h3>
          What is DBMS?
        </h3>

        <p>
          DBMS stands for Database Management System.
          It is software used to create, store,
          organize, retrieve and manage data.
        </p>

        <h3>
          Important DBMS Topics
        </h3>

        <ul>
          <li>Database</li>
          <li>Tables</li>
          <li>Records</li>
          <li>Primary Key</li>
          <li>Foreign Key</li>
          <li>SQL</li>
          <li>ER Model</li>
          <li>Normalization</li>
          <li>Transactions</li>
        </ul>

        <h3>
          Primary Key
        </h3>

        <p>
          A primary key uniquely identifies
          each record in a table.
        </p>

        <h3>
          Foreign Key
        </h3>

        <p>
          A foreign key is used to create a
          relationship between tables.
        </p>

        <h3>
          SQL
        </h3>

        <p>
          SQL is used to communicate with
          relational databases.
        </p>

        <p>
          Common SQL commands include
          SELECT, INSERT, UPDATE and DELETE.
        </p>

        <h3>
          Normalization
        </h3>

        <p>
          Normalization organizes data to reduce
          unnecessary duplication and improve
          database consistency.
        </p>

        <h3>
          Exam Tip
        </h3>

        <p>
          Practice SQL queries, ER diagrams,
          relational algebra and normalization.
        </p>

      `
    },
    // ===========================
    // DSA
    // ===========================

    "DSA Guide": {

      title: "Data Structures Basics 🌳",

      content: `

        <h3>
          What are Data Structures?
        </h3>

        <p>
          Data structures are ways of organizing
          and storing data so that it can be
          processed efficiently.
        </p>

        <h3>
          Important Topics
        </h3>

        <ul>
          <li>Arrays</li>
          <li>Linked Lists</li>
          <li>Stacks</li>
          <li>Queues</li>
          <li>Trees</li>
          <li>Binary Search Trees</li>
          <li>AVL Trees</li>
          <li>Heaps</li>
          <li>Hashing</li>
        </ul>

        <h3>
          Array
        </h3>

        <p>
          An array stores elements using
          indexed positions.
        </p>

        <h3>
          Linked List
        </h3>

        <p>
          A linked list contains nodes where
          each node stores data and a link
          to another node.
        </p>

        <p>
          Example:
          <strong>
            10 → 20 → 30 → NULL
          </strong>
        </p>

        <h3>
          Stack
        </h3>

        <p>
          Stack follows LIFO:
          Last In, First Out.
        </p>

        <h3>
          Queue
        </h3>

        <p>
          Queue follows FIFO:
          First In, First Out.
        </p>

        <h3>
          Trees
        </h3>

        <p>
          A tree is a non-linear data structure
          consisting of nodes connected by edges.
        </p>

        <h3>
          Hashing
        </h3>

        <p>
          Hashing uses a hash function to map
          keys to positions in a hash table.
        </p>

        <h3>
          Exam Tip
        </h3>

        <p>
          Practice diagrams and step-by-step
          insertion, deletion, searching and
          traversal operations.
        </p>

      `
    },


    // ===========================
    // DIGITAL LOGIC
    // ===========================

    "Digital Logic Guide": {

      title: "Digital Logic Basics 🔢",

      content: `

        <h3>
          What is Digital Logic?
        </h3>

        <p>
          Digital logic deals with circuits that
          operate using binary values, usually
          represented by 0 and 1.
        </p>

        <h3>
          Important Topics
        </h3>

        <ul>
          <li>Number Systems</li>
          <li>Logic Gates</li>
          <li>Boolean Algebra</li>
          <li>Truth Tables</li>
          <li>Karnaugh Maps</li>
          <li>Encoders</li>
          <li>Decoders</li>
          <li>Multiplexers</li>
          <li>Demultiplexers</li>
          <li>Sequential Circuits</li>
        </ul>

        <h3>
          Basic Logic Gates
        </h3>

        <p>
          AND, OR and NOT are basic logic gates.
        </p>

        <p>
          NAND and NOR are known as
          universal gates.
        </p>

        <h3>
          Boolean Algebra
        </h3>

        <p>
          Boolean algebra is used to represent
          and simplify logical expressions.
        </p>

        <h3>
          K-Map
        </h3>

        <p>
          A Karnaugh map is a graphical method
          used to simplify Boolean expressions.
        </p>

        <h3>
          Exam Tip
        </h3>

        <p>
          Practice truth tables, Boolean laws
          and K-map grouping regularly.
        </p>

      `
    },


    // ===========================
    // PLACEMENT
    // ===========================

    "Placement Guide": {

      title: "Placement Preparation 🎯",

      content: `

        <h3>
          What is Placement Preparation?
        </h3>

        <p>
          Placement preparation helps students
          develop the technical, aptitude and
          communication skills needed for recruitment.
        </p>

        <h3>
          Important Areas
        </h3>

        <ul>
          <li>Quantitative Aptitude</li>
          <li>Logical Reasoning</li>
          <li>Verbal Ability</li>
          <li>Coding</li>
          <li>Data Structures</li>
          <li>DBMS</li>
          <li>Operating Systems</li>
          <li>Computer Networks</li>
          <li>Resume Preparation</li>
          <li>HR Interviews</li>
          <li>Technical Interviews</li>
        </ul>

        <h3>
          Simple Preparation Plan
        </h3>

        <ol>
          <li>
            Strengthen basic programming.
          </li>

          <li>
            Practice aptitude questions.
          </li>

          <li>
            Learn important computer science subjects.
          </li>

          <li>
            Solve coding problems regularly.
          </li>

          <li>
            Prepare a clear resume.
          </li>

          <li>
            Practice common interview questions.
          </li>
        </ol>

        <h3>
          Interview Tip
        </h3>

        <p>
          Practice your self-introduction,
          project explanation and common HR questions.
        </p>

      `
    },


    // ===========================
    // RESUME
    // ===========================

    "Resume Guide": {

      title: "Resume Preparation 📄",

      content: `

        <h3>
          What is a Resume?
        </h3>

        <p>
          A resume is a short document that
          presents your education, skills,
          projects, experience and achievements.
        </p>

        <h3>
          Important Sections
        </h3>

        <ul>
          <li>Name and Contact Information</li>
          <li>Professional Summary</li>
          <li>Education</li>
          <li>Technical Skills</li>
          <li>Projects</li>
          <li>Internships</li>
          <li>Achievements</li>
          <li>Certifications</li>
        </ul>

        <h3>
          Student Resume
        </h3>

        <p>
          Students with limited work experience
          can highlight academic projects,
          technical skills, certifications and
          relevant achievements.
        </p>

        <h3>
          Resume Tips
        </h3>

        <ul>
          <li>Keep the layout simple.</li>
          <li>Use clear headings.</li>
          <li>Check spelling and grammar.</li>
          <li>Highlight relevant skills.</li>
          <li>Describe projects clearly.</li>
          <li>Avoid unnecessary information.</li>
        </ul>

        <h3>
          Important
        </h3>

        <p>
          Customize your resume according to
          the position you are applying for.
        </p>

      `
    }

  };


  const guide =
    guides[feature];


  if (!guide) {
    return;
  }


  modalTitle.textContent =
    guide.title;


  modalText.innerHTML = `

    <div style="
      line-height:1.7;
      text-align:left;
    ">

      ${guide.content}

    </div>

  `;


  hideMainModalButton();

  showModal();

}

// ===============================
// PROFILE CONTINUE
// ===============================

function continueAction() {

  const name =
    nameInput.value.trim();


  if (!name) {

    nameInput.focus();

    nameInput.placeholder =
      "Please enter your name";

    return;
  }


  localStorage.setItem(
    "learnixName",
    name
  );


  modalTitle.textContent =
    `Welcome, ${escapeHTML(name)}! 🎉`;


  modalText.textContent =
    "Your Learnix profile has been saved on this browser. Explore the Study, Skills, Resources and Career sections.";


  nameInput.style.display =
    "none";


  const button =
    document.querySelector(".modal-box > .primary");


  if (button) {

    button.style.display =
      "block";

    button.textContent =
      "Start Learning →";


    button.onclick =
      function () {

        closeModal();

        scrollToSection("study");

      };

  }

}


// ===============================
// CLOSE MODAL
// ===============================

function closeModal() {

  if (!modal) return;

  modal.classList.remove("show");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  if (nameInput) {
    nameInput.style.display =
      "block";
  }


  const button =
    document.querySelector(".modal-box > .primary");


  if (button) {

    button.style.display =
      "block";

    button.textContent =
      "Continue →";

    button.onclick =
      continueAction;

  }

}


// ===============================
// CLICK OUTSIDE MODAL
// ===============================

if (modal) {

  modal.addEventListener(
    "click",
    function (event) {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


// ===============================
// ESC KEY
// ===============================

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}

