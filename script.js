// ===============================
// LEARNIX - MAIN JAVASCRIPT
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
  navToggle.addEventListener("click", () => {
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
// OPEN MAIN MODAL
// ===============================

function openModal() {
  modalTitle.textContent = "Welcome to Learnix ✨";

  modalText.textContent =
    "Create your student profile to start exploring Learnix.";

  nameInput.value =
    localStorage.getItem("learnixName") || "";

  nameInput.style.display = "block";

  const mainButton =
    document.querySelector(".modal-box .primary");

  if (mainButton) {
    mainButton.style.display = "block";
    mainButton.textContent = "Continue →";
    mainButton.onclick = continueAction;
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    nameInput.focus();
  }, 100);
}


// ===============================
// AI TUTOR
// ===============================

function openTutor() {
  modalTitle.textContent = "AI Tutor 🤖";

  modalText.innerHTML = `
    <div class="tool-box">

      <label for="tutorQuestion">
        <strong>Ask a question:</strong>
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
        Ask AI →
      </button>

      <div
        id="tutorAnswer"
        style="margin-top:18px;"
      ></div>

    </div>
  `;

  nameInput.style.display = "none";

  const mainButton =
    document.querySelector(".modal-box > .primary");

  if (mainButton) {
    mainButton.style.display = "none";
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    const question =
      document.getElementById("tutorQuestion");

    if (question) {
      question.focus();
    }
  }, 100);
}


// ===============================
// ASK AI TUTOR
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

  const q = question.toLowerCase();

  // Linked List
  if (
    q.includes("linked list") ||
    q.includes("linkedlist")
  ) {
    answerElement.innerHTML = `
      <div style="
        padding:15px;
        border-radius:12px;
        background:#f5f5ff;
      ">

        <h3>📚 Linked List — Simple Explanation</h3>

        <p>
          A <strong>linked list</strong> is a collection of
          small boxes called <strong>nodes</strong>.
        </p>

        <p>
          Each node contains:
        </p>

        <ul>
          <li>Data</li>
          <li>A link to the next node</li>
        </ul>

        <p>
          Think of it like a chain 🔗.
          Each part of the chain is connected to the next part.
        </p>

        <p>
          <strong>Example:</strong>
        </p>

        <p>
          10 → 20 → 30 → NULL
        </p>

        <p>
          Here, 10 points to 20, 20 points to 30,
          and 30 points to NULL.
        </p>

        <p>
          <strong>Easy definition:</strong>
          A linked list is a linear data structure where
          nodes are connected using links.
        </p>

      </div>
    `;

    return;
  }


  // Stack
  if (q.includes("stack")) {
    answerElement.innerHTML = `
      <div style="
        padding:15px;
        border-radius:12px;
        background:#f5f5ff;
      ">

        <h3>📚 Stack — Simple Explanation</h3>

        <p>
          A stack is a data structure that works like
          a stack of plates.
        </p>

        <p>
          The last item added is the first item removed.
        </p>

        <p>
          This is called <strong>LIFO</strong>:
          Last In, First Out.
        </p>

        <p>
          Example:
        </p>

        <p>
          10 → 20 → 30
        </p>

        <p>
          30 will be removed first.
        </p>

      </div>
    `;

    return;
  }


  // Queue
  if (q.includes("queue")) {
    answerElement.innerHTML = `
      <div style="
        padding:15px;
        border-radius:12px;
        background:#f5f5ff;
      ">

        <h3>📚 Queue — Simple Explanation</h3>

        <p>
          A queue works like a line of people waiting
          for a bus.
        </p>

        <p>
          The first person entering the line is the
          first person served.
        </p>

        <p>
          This is called <strong>FIFO</strong>:
          First In, First Out.
        </p>

      </div>
    `;

    return;
  }


  // Array
  if (q.includes("array")) {
    answerElement.innerHTML = `
      <div style="
        padding:15px;
        border-radius:12px;
        background:#f5f5ff;
      ">

        <h3>📚 Array — Simple Explanation</h3>

        <p>
          An array stores multiple values of the same type
          in a continuous memory location.
        </p>

        <p>
          Example:
        </p>

        <p>
          int numbers[5] = {10, 20, 30, 40, 50};
        </p>

        <p>
          Each value can be accessed using an index.
        </p>

      </div>
    `;

    return;
  }


  // Generic answer
  answerElement.innerHTML = `
    <div style="
      padding:15px;
      border-radius:12px;
      background:#f5f5ff;
    ">

      <h3>🤖 Learnix Tutor</h3>

      <p>
        You asked:
        <strong>${escapeHTML(question)}</strong>
      </p>

      <p>
        Let's understand this topic step by step.
        Start with the basic definition, learn a simple
        example, and then practice a few questions.
      </p>

      <p>
        💡 <strong>Study Tip:</strong>
        Break difficult topics into small parts.
      </p>

      <p>
        For a detailed AI-generated answer to any question,
        Learnix needs a real AI backend/API connection.
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

  // DEFAULT
  modalTitle.textContent = feature;

  modalText.innerHTML = `
    <p>
      <strong>${escapeHTML(feature)}</strong>
      is available in Learnix.
    </p>

    <p>
      Choose this tool to start learning and practicing.
    </p>
  `;

  nameInput.style.display = "none";

  const button =
    document.querySelector(".modal-box > .primary");

  if (button) {
    button.style.display = "none";
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}


// ===============================
// PDF → NOTES
// ===============================

function openPDFNotes() {

  modalTitle.textContent = "PDF → Notes 📄";

  modalText.innerHTML = `
    <p>
      Upload your study material and create simple notes.
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

    <div id="notesResult" style="margin-top:15px;"></div>
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

  if (!fileInput || !fileInput.files.length) {

    result.innerHTML = `
      <p>⚠️ Please select a file first.</p>
    `;

    return;
  }

  const file =
    fileInput.files[0];

  if (file.name.toLowerCase().endsWith(".txt")) {

    const reader = new FileReader();

    reader.onload = function(event) {

      const text =
        event.target.result;

      result.innerHTML = `
        <div style="
          padding:15px;
          background:#f5f5ff;
          border-radius:12px;
        ">

          <h3>📝 Notes</h3>

          <p>
            ${escapeHTML(text)}
          </p>

        </div>
      `;
    };

    reader.readAsText(file);

  } else {

    result.innerHTML = `
      <div style="
        padding:15px;
        background:#fff3cd;
        border-radius:12px;
      ">

        <h3>📄 PDF Selected</h3>

        <p>
          Your PDF was selected successfully.
        </p>

        <p>
          Full PDF text extraction needs a PDF processing
          library/backend.
        </p>

      </div>
    `;
  }
}


// ===============================
// MCQ GENERATOR
// ===============================

function openMCQGenerator() {

  modalTitle.textContent = "MCQ Generator 📝";

  modalText.innerHTML = `
    <p>Enter a topic:</p>

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

    <div id="mcqResult" style="margin-top:15px;"></div>
  `;

  hideMainModalButton();
  showModal();
}


// ===============================
// GENERATE MCQ
// ===============================

function generateMCQ() {

  const topic =
    document.getElementById("mcqTopic").value.trim();

  const result =
    document.getElementById("mcqResult");

  if (!topic) {
    result.innerHTML =
      "<p>⚠️ Please enter a topic.</p>";
    return;
  }

  result.innerHTML = `
    <div style="
      padding:15px;
      background:#f5f5ff;
      border-radius:12px;
    ">

      <h3>📝 Practice MCQs</h3>

      <p>
        <strong>1. What is ${escapeHTML(topic)}?</strong>
      </p>

      <p>
        A) A programming concept<br>
        B) A data structure<br>
        C) A useful academic topic<br>
        D) All of the above
      </p>

      <p>
        <strong>Answer: D</strong>
      </p>

      <hr>

      <p>
        <strong>2. Why should students learn ${escapeHTML(topic)}?</strong>
      </p>

      <p>
        A) To improve understanding<br>
        B) To prepare for exams<br>
        C) To improve practical knowledge<br>
        D) All of the above
      </p>

      <p>
        <strong>Answer: D</strong>
      </p>

    </div>
  `;
}


// ===============================
// EXAM ANSWERS
// ===============================

function openExamAnswers() {

  modalTitle.textContent = "Exam Answers ✍️";

  modalText.innerHTML = `
    <p>Enter your question:</p>

    <textarea
      id="examQuestion"
      rows="5"
      placeholder="Enter your exam question..."
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

    <div id="examResult" style="margin-top:15px;"></div>
  `;

  hideMainModalButton();
  showModal();
}


// ===============================
// GENERATE EXAM ANSWER
// ===============================

function generateExamAnswer() {

  const question =
    document.getElementById("examQuestion").value.trim();

  const result =
    document.getElementById("examResult");

  if (!question) {
    result.innerHTML =
      "<p>⚠️ Please enter a question.</p>";
    return;
  }

  result.innerHTML = `
    <div style="
      padding:15px;
      background:#f5f5ff;
      border-radius:12px;
    ">

      <h3>📚 Exam Answer</h3>

      <p>
        <strong>Question:</strong>
        ${escapeHTML(question)}
      </p>

      <h4>Introduction</h4>

      <p>
        This topic is an important concept in computer science
        and should be understood using simple definitions and examples.
      </p>

      <h4>Main Explanation</h4>

      <p>
        Explain the concept clearly using its definition,
        important points, working process and examples.
      </p>

      <h4>Example</h4>

      <p>
        Add a suitable real-world or programming example
        to make the answer easier to understand.
      </p>

      <h4>Conclusion</h4>

      <p>
        Therefore, understanding this concept helps students
        improve their theoretical and practical knowledge.
      </p>

    </div>
  `;
}


// ===============================
// CODING PRACTICE
// ===============================

function openCodingPractice() {

  modalTitle.textContent = "Coding Practice 👨‍💻";

  modalText.innerHTML = `
    <p>
      Write a small piece of code:
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

    <div id="codeResult" style="margin-top:15px;"></div>
  `;

  hideMainModalButton();
  showModal();
}


// ===============================
// CHECK CODE
// ===============================

function checkCode() {

  const code =
    document.getElementById("codeInput").value.trim();

  const result =
    document.getElementById("codeResult");

  if (!code) {
    result.innerHTML =
      "<p>⚠️ Please write some code.</p>";
    return;
  }

  result.innerHTML = `
    <div style="
      padding:15px;
      background:#f5f5ff;
      border-radius:12px;
    ">

      <h3>✅ Code Submitted</h3>

      <p>
        Your code has been received.
      </p>

      <p>
        💡 Tip: Check syntax, logic, input,
        output and edge cases.
      </p>

    </div>
  `;
}


// ===============================
// ENGLISH SPEAKING
// ===============================

function openEnglishPractice() {

  modalTitle.textContent = "English Speaking 🗣️";

  modalText.innerHTML = `
    <p>
      Read this sentence aloud:
    </p>

    <div style="
      padding:15px;
      background:#f5f5ff;
      border-radius:12px;
    ">
      "Hello, my name is Pavithra.
      I am studying Computer Science and
      I want to become a software engineer."
    </div>

    <button
      class="primary full"
      onclick="startSpeaking()"
      style="margin-top:12px;"
    >
      🎤 Start Speaking
    </button>

    <div id="speakingResult" style="margin-top:15px;"></div>
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

  recognition.lang = "en-US";
  recognition.interimResults = false;

  result.innerHTML =
    "<p>🎤 Listening...</p>";

  recognition.start();

  recognition.onresult = function(event) {

    const text =
      event.results[0][0].transcript;

    result.innerHTML = `
      <div style="
        padding:15px;
        background:#f5f5ff;
        border-radius:12px;
      ">

        <h3>🗣️ You said:</h3>

        <p>
          ${escapeHTML(text)}
        </p>

        <p>
          ✅ Good practice! Keep speaking regularly.
        </p>

      </div>
    `;
  };

  recognition.onerror = function() {

    result.innerHTML =
      "<p>⚠️ Could not hear you. Please try again.</p>";
  };
}


// ===============================
// COMMUNICATION
// ===============================

function openCommunication() {

  modalTitle.textContent = "Communication Practice 🎤";

  modalText.innerHTML = `
    <h3>🎯 Practice Topic</h3>

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

    <div id="communicationResult" style="margin-top:15px;"></div>
  `;

  hideMainModalButton();
  showModal();
}


// ===============================
// CHECK COMMUNICATION
// ===============================

function checkCommunication() {

  const answer =
    document.getElementById("communicationInput").value.trim();

  const result =
    document.getElementById("communicationResult");

  if (!answer) {
    result.innerHTML =
      "<p>⚠️ Please write your answer.</p>";
    return;
  }

  result.innerHTML = `
    <div style="
      padding:15px;
      background:#f5f5ff;
      border-radius:12px;
    ">

      <h3>✅ Feedback</h3>

      <p>
        Your answer has a clear starting point.
      </p>

      <p>
        💡 Try to speak slowly, maintain confidence,
        and keep your answer short and clear.
      </p>

    </div>
  `;
}


// ===============================
// RESUME BUILDER
// ===============================

function openResumeBuilder() {

  modalTitle.textContent = "Resume Builder 📄";

  modalText.innerHTML = `
    <input
      id="resumeName"
      placeholder="Full Name"
      style="width:100%;padding:10px;margin:5px 0;
      box-sizing:border-box;"
      >
      <input
      id="resumeEmail"
      placeholder="Email"
      style="width:100%;padding:10px;margin:5px 0;box-sizing:border-box;"
    >

    <input
      id="resumeEducation"
      placeholder="Education"
      style="width:100%;padding:10px;margin:5px 0;box-sizing:border-box;"
    >

    <input
      id="resumeSkills"
      placeholder="Skills"
      style="width:100%;padding:10px;margin:5px 0;box-sizing:border-box;"
    >

    <input
      id="resumeProjects"
      placeholder="Projects"
      style="width:100%;padding:10px;margin:5px 0;box-sizing:border-box;"
    >

    <button
      class="primary full"
      onclick="generateResume()"
      style="margin-top:12px;"
    >
      Generate Resume →
    </button>

    <div id="resumeResult" style="margin-top:15px;"></div>
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

      <h2>${escapeHTML(name)}</h2>

      <p>${escapeHTML(email)}</p>

      <hr>

      <h3>Education</h3>
      <p>${escapeHTML(education || "Add your education")}</p>

      <h3>Skills</h3>
      <p>${escapeHTML(skills || "Add your skills")}</p>

      <h3>Projects</h3>
      <p>${escapeHTML(projects || "Add your projects")}</p>

    </div>
  `;
}


// ===============================
// MOCK INTERVIEW
// ===============================

function openMockInterview() {

  modalTitle.textContent = "Mock Interview 🎙️";

  modalText.innerHTML = `
    <h3>Question 1</h3>

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

    <div id="interviewResult" style="margin-top:15px;"></div>
  `;

  hideMainModalButton();
  showModal();
}
// ===============================
// CHECK INTERVIEW
// ===============================

function checkInterview() {

  const answer =
    document.getElementById("interviewAnswer").value.trim();

  const result =
    document.getElementById("interviewResult");

  if (!answer) {
    result.innerHTML =
      "<p>⚠️ Please enter your answer.</p>";
    return;
  }

  result.innerHTML = `
    <div style="
      padding:15px;
      background:#f5f5ff;
      border-radius:12px;
    ">

      <h3>🎯 Interview Feedback</h3>

      <p>
        Good start!
      </p>

      <p>
        Try to include your education, technical skills,
        projects, strengths and career interests.
      </p>

      <p>
        Keep the answer around 60–90 seconds.
      </p>

    </div>
  `;
}


// ===============================
// JOB PREPARATION
// ===============================

function openJobPreparation() {

  modalTitle.textContent = "Job Preparation 🚀";

  modalText.innerHTML = `
    <h3>🎯 Preparation Checklist</h3>

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
      💡 Complete these steps one by one to become
      interview-ready.
    </p>
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
    "Your Learnix profile has been saved on this browser. Explore the Study, Skills and Career sections.";

  nameInput.style.display = "none";

  const button =
    document.querySelector(".modal-box .primary");

  if (button) {

    button.style.display = "block";

    button.textContent =
      "Start Learning →";

    button.onclick = function() {

      closeModal();

      scrollToSection("study");
      };
  }
}


// ===============================
// MODAL HELPERS
// ===============================

function showModal() {

  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );
}


function hideMainModalButton() {

  nameInput.style.display = "none";

  const button =
    document.querySelector(".modal-box > .primary");

  if (button) {
    button.style.display = "none";
  }
}


// ===============================
// CLOSE MODAL
// ===============================

function closeModal() {

  modal.classList.remove("show");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  nameInput.style.display = "block";

  const button =
    document.querySelector(".modal-box > .primary");

  if (button) {

    button.style.display = "block";

    button.textContent =
      "Continue →";

    button.onclick =
      continueAction;
  }
}


// ===============================
// CLICK OUTSIDE MODAL
// ===============================

modal.addEventListener("click", function(event) {

  if (event.target === modal) {
    closeModal();
  }

});


// ===============================
// ESC KEY
// ===============================

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeModal();
  }

});


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
