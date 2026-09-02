const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const nameInput = document.getElementById("nameInput");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth"
  });
  nav.classList.remove("open");
}

function showModal(title, text, showName = false) {
  modalTitle.textContent = title;
  modalText.innerHTML = text;

  nameInput.style.display = showName ? "block" : "none";

  const button = document.querySelector(".modal-box .primary");
  button.style.display = showName ? "block" : "none";

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function openModal() {
  modalTitle.textContent = "Welcome to Learnix ✨";
  modalText.textContent =
    "Create your student profile to start exploring Learnix.";

  nameInput.value = localStorage.getItem("learnixName") || "";
  nameInput.style.display = "block";

  const button = document.querySelector(".modal-box .primary");
  button.style.display = "block";
  button.textContent = "Continue →";
  button.onclick = continueAction;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  setTimeout(() => nameInput.focus(), 100);
}

function openTutor() {
  showModal(
    "AI Tutor 🤖",
    `
      <p><strong>Ask a question:</strong></p>
      <textarea id="toolInput" placeholder="Example: Explain linked lists in simple words..." 
      style="width:100%;min-height:110px;padding:12px;border-radius:10px;border:1px solid #ddd;"></textarea>
      <button class="primary full" onclick="tutorAnswer()" style="margin-top:12px;">
        Get Explanation
      </button>
      <div id="toolResult" style="margin-top:15px;"></div>
    `
  );
}

function tutorAnswer() {
  const input = document.getElementById("toolInput");
  const result = document.getElementById("toolResult");

  if (!input.value.trim()) {
    result.innerHTML = "<p>Please enter a question.</p>";
    return;
  }

  result.innerHTML = `
    <div style="padding:15px;border-radius:10px;background:#f5f3ff;">
      <strong>Learnix Tutor:</strong>
      <p>
        Your question is: <b>${escapeHTML(input.value)}</b>
      </p>
      <p>
        This browser version can provide study guidance and structured
        explanations. A real AI answer requires connecting Learnix to an AI API.
      </p>
    </div>
  `;
}

function openFeature(feature) {
  if (feature === "PDF → Notes") {
    openPDFNotes();
    return;
  }

  if (feature === "MCQ Generator") {
    openMCQ();
    return;
  }

  if (feature === "Exam Answers") {
    openExamAnswers();
    return;
  }

  if (feature === "Coding Practice") {
    openCoding();
    return;
  }

  if (feature === "English Speaking") {
    openSpeaking();
    return;
  }

  if (feature === "Communication") {
    openCommunication();
    return;
  }

  if (feature === "Resume Builder") {
    openResume();
    return;
  }

  if (feature === "Mock Interview") {
    openInterview();
    return;
  }

  if (feature === "Job Preparation") {
    openJobPreparation();
    return;
  }

  showModal(
    feature,
    `<p>${escapeHTML(feature)} is ready to use.</p>`
  );
}

function openPDFNotes() {
  showModal(
    "PDF → Notes 📄",
    `
      <p>Upload your study material.</p>

      <input type="file" id="pdfFile" accept=".pdf,.txt"
      style="width:100%;margin:10px 0;">

      <button class="primary full" onclick="createNotes()">
        Create Notes
      </button>

      <div id="notesResult" style="margin-top:15px;"></div>
    `
  );
}

function createNotes() {
  const file = document.getElementById("pdfFile").files[0];
  const result = document.getElementById("notesResult");

  if (!file) {
    result.innerHTML = "<p>Please select a file.</p>";
    return;
  }

  if (file.type === "text/plain") {
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;

      result.innerHTML = `
        <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
          <h3>Study Notes</h3>
          <p>${createSimpleNotes(text)}</p>
        </div>
      `;
    };

    reader.readAsText(file);
  } else {
    result.innerHTML = `
      <div style="padding:15px;background:#fff7ed;border-radius:10px;">
        <strong>PDF selected successfully.</strong>
        <p>
          PDF text extraction requires a PDF reader library or AI backend.
          The file upload interface is working, but automatic PDF summarization
          is not yet connected.
        </p>
      </div>
    `;
  }
}

function createSimpleNotes(text) {
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  if (!sentences.length) {
    return "No readable text was found.";
  }

  return sentences.map(s => "• " + escapeHTML(s)).join("<br>");
}

function openMCQ() {
  showModal(
    "MCQ Generator 📝",
    `
      <input id="mcqTopic" type="text"
      placeholder="Enter subject or topic"
      style="width:100%;padding:12px;border-radius:10px;border:1px solid #ddd;">

      <button class="primary full" onclick="generateMCQ()" style="margin-top:12px;">
        Generate MCQs
      </button>

      <div id="mcqResult" style="margin-top:15px;"></div>
    `
  );
}

function generateMCQ() {
  const topic = document.getElementById("mcqTopic").value.trim();
  const result = document.getElementById("mcqResult");

  if (!topic) {
    result.innerHTML = "<p>Please enter a topic.</p>";
    return;
  }

  result.innerHTML = `
    <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
      <h3>Practice MCQs: ${escapeHTML(topic)}</h3>

      <p><strong>1. What is the main purpose of ${escapeHTML(topic)}?</strong></p>
      <label><input type="radio" name="q1"> Understanding and applying concepts</label><br>
      <label><input type="radio" name="q1"> Only memorizing numbers</label><br>
      <label><input type="radio" name="q1"> Avoiding practice</label>

      <p><strong>2. Which is the best way to learn ${escapeHTML(topic)}?</strong></p>
      <label><input type="radio" name="q2"> Practice and revision</label><br>
      <label><input type="radio" name="q2"> Never reviewing</label><br>
      <label><input type="radio" name="q2"> Skipping examples</label>

      <p><strong>3. What improves understanding?</strong></p>
      <label><input type="radio" name="q3"> Solving examples</label><br>
      <label><input type="radio" name="q3"> Avoiding questions</label><br>
      <label><input type="radio" name="q3"> Skipping practice</label>
    </div>
  `;
}

function openExamAnswers() {
  showModal(
    "Exam Answers ✍️",
    `
      <textarea id="examQuestion"
      placeholder="Enter your exam question..."
      style="width:100%;min-height:120px;padding:12px;border-radius:10px;border:1px solid #ddd;"></textarea>

      <button class="primary full" onclick="generateExamAnswer()" style="margin-top:12px;">
        Prepare Answer
      </button>

      <div id="examResult" style="margin-top:15px;"></div>
    `
  );
}

function generateExamAnswer() {
  const question = document.getElementById("examQuestion").value.trim();
  const result = document.getElementById("examResult");

  if (!question) {
    result.innerHTML = "<p>Please enter your question.</p>";
    return;
  }

  result.innerHTML = `
    <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
      <h3>Answer Structure</h3>
      <p><strong>Question:</strong> ${escapeHTML(question)}</p>
      <p><strong>Introduction:</strong> Start by defining the main concept.</p>
      <p><strong>Main Points:</strong> Explain the important concepts with suitable examples.</p>
      <p><strong>Conclusion:</strong> Summarize the key points clearly.</p>
      <p><em>For a subject-specific answer, connect Learnix to an AI API.</em></p>
    </div>
  `;
}

function openCoding() {
  showModal(
    "Coding Practice 💻",
    `
      <h3>Beginner Challenge</h3>
      <p>Write a program to find the largest number in an array.</p>

      <textarea id="codeAnswer"
      placeholder="Write your solution here..."
      style="width:100%;min-height:140px;padding:12px;border-radius:10px;border:1px solid #ddd;font-family:monospace;"></textarea>

      <button class="primary full" onclick="checkCoding()" style="margin-top:12px;">
        Check Answer
      </button>

      <div id="codeResult" style="margin-top:15px;"></div>
    `
  );
}

function checkCoding() {
  const answer = document.getElementById("codeAnswer").value.trim();
  const result = document.getElementById("codeResult");

  if (!answer) {
    result.innerHTML = "<p>Please write your solution first.</p>";
    return;
  }

  result.innerHTML = `
    <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
      <strong>Practice submitted ✓</strong>
      <p>Your solution has been entered successfully.</p>
      <p>Automatic code evaluation can be added later with a coding execution service.</p>
    </div>
  `;
}

function openSpeaking() {
  showModal(
    "English Speaking 🗣️",
    `
      <p>Practice speaking this sentence:</p>

      <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
        "My name is Pavithra. I am studying Computer Science and I enjoy coding."
      </div>

      <button class="primary full" onclick="startSpeaking()" style="margin-top:12px;">
        🎤 Start Speaking
      </button>

      <div id="speechResult" style="margin-top:15px;"></div>
    `
  );
}

function startSpeaking() {
  const result = document.getElementById("speechResult");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    result.innerHTML =
      "<p>Speech recognition is not supported by this browser.</p>";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;

    result.innerHTML = `
      <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
        <strong>You said:</strong>
        <p>${escapeHTML(text)}</p>
      </div>
    `;
  };
}

function openCommunication() {
  showModal(
    "Communication Practice 🎤",
    `
      <h3>Practice Topic</h3>
      <p>Explain: "Why is communication important for students?"</p>

      <textarea id="communicationAnswer"
      placeholder="Write your answer..."
      style="width:100%;min-height:120px;padding:12px;border-radius:10px;border:1px solid #ddd;"></textarea>

      <button class="primary full" onclick="checkCommunication()" style="margin-top:12px;">
        Check Practice
      </button>

      <div id="communicationResult" style="margin-top:15px;"></div>
    `
  );
}

function checkCommunication() {
  const answer =
    document.getElementById("communicationAnswer").value.trim();

  const result = document.getElementById("communicationResult");

  if (!answer) {
    result.innerHTML = "<p>Please write something first.</p>";
    return;
  }

  result.innerHTML = `
    <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
      <strong>Good start! 👍</strong>
      <p>Try to speak clearly, use short sentences, and give one or two examples.</p>
    </div>
  `;
}

function openResume() {
  showModal(
    "Resume Builder 📄",
    `
      <input id="resumeName" placeholder="Full Name"
      style="width:100%;padding:10px;margin:5px 0;">

      <input id="resumeRole" placeholder="Target Job Role"
      style="width:100%;padding:10px;margin:5px 0;">

      <input id="resumeEducation" placeholder="Education"
      style="width:100%;padding:10px;margin:5px 0;">

      <input id="resumeSkills" placeholder="Skills"
      style="width:100%;padding:10px;margin:5px 0;">

      <button class="primary full" onclick="buildResume()" style="margin-top:12px;">
        Create Resume
      </button>

      <div id="resumeResult" style="margin-top:15px;"></div>
    `
  );
}

function buildResume() {
  const name = document.getElementById("resumeName").value.trim();
  const role = document.getElementById("resumeRole").value.trim();
  const education = document.getElementById("resumeEducation").value.trim();
  const skills = document.getElementById("resumeSkills").value.trim();

  const result = document.getElementById("resumeResult");

  if (!name) {
    result.innerHTML = "<p>Please enter your name.</p>";
    return;
  }

  result.innerHTML = `
    <div style="padding:18px;background:white;border:1px solid #ddd;border-radius:10px;">
      <h2>${escapeHTML(name)}</h2>
      <h4>${escapeHTML(role || "Student / Graduate")}</h4>
      <hr>
      <h3>Education</h3>
      <p>${escapeHTML(education || "Add your education details.")}</p>
      <h3>Skills</h3>
      <p>${escapeHTML(skills || "Add your skills.")}</p>
      <h3>Profile</h3>
      <p>Motivated student seeking opportunities to learn, contribute and grow.</p>
    </div>
  `;
}

function openInterview() {
  showModal(
    "Mock Interview 🎙️",
    `
      <h3>Interview Question</h3>
      <p><strong>Tell me about yourself.</strong></p>

      <textarea id="interviewAnswer"
      placeholder="Type your answer..."
      style="width:100%;min-height:120px;padding:12px;border-radius:10px;border:1px solid #ddd;"></textarea>

      <button class="primary full" onclick="checkInterview()" style="margin-top:12px;">
        Submit Answer
      </button>

      <div id="interviewResult" style="margin-top:15px;"></div>
    `
  );
}

function checkInterview() {
  const answer = document.getElementById("interviewAnswer").value.trim();
  const result = document.getElementById("interviewResult");

  if (!answer) {
    result.innerHTML = "<p>Please answer the question.</p>";
    return;
  }

  result.innerHTML = `
    <div style="padding:15px;background:#f5f3ff;border-radius:10px;">
      <strong>Interview feedback:</strong>
      <p>✓ You submitted your answer.</p>
      <p>Tip: Keep your introduction clear, confident and around 30–60 seconds.</p>
    </div>
  `;
}

function openJobPreparation() {
  showModal(
    "Job Preparation 🚀",
    `
      <h3>Student Career Checklist</h3>
      <label><input type="checkbox"> Build a strong resume</label><br><br>
      <label><input type="checkbox"> Practice coding</label><br><br>
      <label><input type="checkbox"> Improve communication</label><br><br>
      <label><input type="checkbox"> Practice interviews</label><br><br>
      <label><input type="checkbox"> Prepare common HR questions</label><br><br>
      <label><input type="checkbox"> Apply for internships/jobs</label>
    `
  );
}

function continueAction() {
  const name = nameInput.value.trim();

  if (name) {
    localStorage.setItem("learnixName", name);

    modalTitle.textContent = `Welcome, ${escapeHTML(name)}! 🎉`;
    modalText.textContent =
      "Your Learnix profile has been saved on this browser. Explore the Study, Skills and Career sections.";

    nameInput.style.display = "none";

    const button = document.querySelector(".modal-box .primary");
    button.textContent = "Start Learning →";
    button.onclick = () => {
      closeModal();
      scrollToSection("study");
    };
  } else {
    nameInput.focus();
    nameInput.placeholder = "Please enter your name";
  }
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  nameInput.style.display = "block";

  const button = document.querySelector(".modal-box .primary");
  button.style.display = "block";
  button.textContent = "Continue →";
  button.onclick = continueAction;
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
