// ============================================================
// LEARNIX - COMPLETE SCRIPT
// ============================================================


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let currentQuiz = [];
let currentQuestion = 0;
let quizScore = 0;
let studyTimer = null;
let timerSeconds = 25 * 60;


// ============================================================
// PAGE START
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    loadTheme();
    loadProgress();
    updateDailyStreak();

    setupNavigation();

});


// ============================================================
// NAVIGATION
// ============================================================

function setupNavigation() {

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {

        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

    }

}


// ============================================================
// THEME
// ============================================================

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const darkMode = document.body.classList.contains("dark-mode");

    localStorage.setItem("learnixTheme", darkMode ? "dark" : "light");

    showToast(darkMode ? "Dark mode enabled 🌙" : "Light mode enabled ☀️");

}


function loadTheme() {

    const theme = localStorage.getItem("learnixTheme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }

}


// ============================================================
// MODAL
// ============================================================

function showModal(title, content) {

    const modal = document.getElementById("modal");

    if (!modal) return;

    const titleElement = modal.querySelector(".modal-title");
    const bodyElement = modal.querySelector(".modal-body");

    if (titleElement) {
        titleElement.textContent = title;
    }

    if (bodyElement) {
        bodyElement.innerHTML = content;
    }

    modal.classList.add("active");

}


function closeModal() {

    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.remove("active");
    }

}


// ============================================================
// CLOSE MODAL
// ============================================================

document.addEventListener("click", function (event) {

    if (
        event.target.classList.contains("modal-close") ||
        event.target.id === "closeModal"
    ) {
        closeModal();
    }

});


// ============================================================
// TOAST MESSAGE
// ============================================================

function showToast(message) {

    let toast = document.getElementById("learnixToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "learnixToast";

        toast.style.position = "fixed";
        toast.style.bottom = "25px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.padding = "12px 20px";
        toast.style.background = "#111827";
        toast.style.color = "white";
        toast.style.borderRadius = "12px";
        toast.style.zIndex = "99999";
        toast.style.fontSize = "14px";

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    setTimeout(function () {
        toast.remove();
    }, 2500);

}


// ============================================================
// FEATURE ROUTER
// ============================================================

function openFeature(feature) {

    switch (feature) {

        case "Learning Tutor":
            openTutor();
            break;

        case "PDF Notes":
            openPDFNotes();
            break;

        case "MCQ Generator":
            startQuiz();
            break;

        case "Exam Answers":
            openExamAnswers();
            break;

        case "Java Guide":
            openStudyGuide("Java Basics", `
                <h3>Java Basics</h3>
                <p>Java is an object-oriented programming language.</p>

                <h4>Main Topics</h4>

                <ul>
                    <li>Classes and Objects</li>
                    <li>Constructors</li>
                    <li>Inheritance</li>
                    <li>Interfaces</li>
                    <li>Method Overloading</li>
                    <li>Exception Handling</li>
                </ul>

                <h4>Example</h4>

                <pre>
class Student {
    int id;

    Student(int id) {
        this.id = id;
    }

    void display() {
        System.out.println(id);
    }
}
                </pre>
            `);
            break;

        case "DBMS Guide":
            openStudyGuide("DBMS Basics", `
                <h3>DBMS Basics</h3>

                <p>DBMS is software used to store, manage and retrieve data.</p>

                <h4>Main Topics</h4>

                <ul>
                    <li>Database</li>
                    <li>Tables</li>
                    <li>Primary Key</li>
                    <li>Foreign Key</li>
                    <li>SQL</li>
                    <li>ER Diagram</li>
                    <li>Normalization</li>
                </ul>
            `);
            break;

        case "Data Structures Guide":
            openStudyGuide("Data Structures", `
                <h3>Data Structures</h3>

                <p>Data structures organize data efficiently.</p>

                <ul>
                    <li>Arrays</li>
                    <li>Linked Lists</li>
                    <li>Stacks</li>
                    <li>Queues</li>
                    <li>Trees</li>
                    <li>Graphs</li>
                    <li>Hashing</li>
                </ul>
            `);
            break;

        case "Digital Logic Guide":
            openStudyGuide("Digital Logic", `
                <h3>Digital Logic</h3>

                <ul>
                    <li>Boolean Algebra</li>
                    <li>Logic Gates</li>
                    <li>K-Maps</li>
                    <li>Encoders</li>
                    <li>Decoders</li>
                    <li>Multiplexers</li>
                    <li>Digital Circuits</li>
                </ul>
            `);
            break;

        case "Placement Guide":
            openStudyGuide("Placement Preparation", `
                <h3>Placement Preparation</h3>

                <h4>Prepare these areas:</h4>

                <ul>
                    <li>Aptitude</li>
                    <li>Logical Reasoning</li>
                    <li>Programming</li>
                    <li>Data Structures</li>
                    <li>DBMS</li>
                    <li>Operating Systems</li>
                    <li>Technical Interview</li>
                    <li>HR Interview</li>
                </ul>
            `);
            break;

        case "Resume Guide":
            openStudyGuide("Resume Preparation", `
                <h3>Resume Preparation</h3>

                <p>A student resume should be simple, clear and professional.</p>

                <h4>Include:</h4>

                <ul>
                    <li>Name and contact information</li>
                    <li>Career objective</li>
                    <li>Education</li>
                    <li>Technical skills</li>
                    <li>Projects</li>
                    <li>Certifications</li>
                    <li>Achievements</li>
                </ul>
            `);
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

        case "Coding Practice":
            openCodingPractice();
            break;

        case "English Speaking":
            openEnglishPractice();
            break;

        case "Communication":
            openCommunicationPractice();
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

        default:
            showToast("Feature coming soon 🚀");
    }

}


// ============================================================
// LEARNING TUTOR
// ============================================================

function openTutor() {

    showModal("🤖 Learning Tutor", `

        <div class="tutor-box">

            <p><strong>Ask me a study question.</strong></p>

            <input
                type="text"
                id="tutorQuestion"
                placeholder="Example: Explain linked list simply"
                style="width:100%;padding:12px;margin:10px 0;border-radius:8px;border:1px solid #ccc;"
            >

            <button onclick="answerTutor()" class="primary-btn">
                Explain
            </button>

            <div id="tutorAnswer" style="margin-top:20px;"></div>

        </div>

    `);

}


function answerTutor() {

    const input = document.getElementById("tutorQuestion");

    const answer = document.getElementById("tutorAnswer");

    if (!input || !answer) return;

    const question = input.value.toLowerCase();

    let text = `
        <h4>Simple Explanation</h4>
        <p>
        Try breaking the topic into definition, example and important points.
        Then practice one or two questions.
        </p>
    `;

    if (question.includes("linked list")) {

        text = `
            <h4>Linked List</h4>

            <p>
            A linked list is a data structure where elements are connected
            using links called pointers or references.
            </p>

            <p>
            Each node normally contains data and a link to the next node.
            </p>
        `;

    }

    if (question.includes("java")) {

        text = `
            <h4>Java</h4>

            <p>
            Java is an object-oriented programming language used to build
            applications, websites, enterprise software and more.
            </p>
        `;

    }

    answer.innerHTML = text;

    updateProgress(2);

}


// ============================================================
// STUDY GUIDES
// ============================================================

function openStudyGuide(title, content) {

    showModal(title, `

        <div class="study-guide">

            ${content}

            <hr>

            <button
                class="primary-btn"
                onclick="updateProgress(3); showToast('Topic marked as studied 📚')"
            >
                ✓ Mark as Studied
            </button>

        </div>

    `);

}


// ============================================================
// PDF → NOTES
// ============================================================

let pdfLibraryLoaded = false;
let pdfLibraryLoading = false;
let pdfLibraryCallbacks = [];


function loadPDFLibrary(callback) {

    if (pdfLibraryLoaded) {

        callback();
        return;

    }

    pdfLibraryCallbacks.push(callback);

    if (pdfLibraryLoading) {
        return;
    }

    pdfLibraryLoading = true;

    const script = document.createElement("script");

    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";

    script.onload = function () {

        pdfLibraryLoaded = true;
        pdfLibraryLoading = false;

        if (window.pdfjsLib) {

            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        }

        const callbacks = [...pdfLibraryCallbacks];

        pdfLibraryCallbacks = [];

        callbacks.forEach(function (fn) {
            fn();
        });

    };

    script.onerror = function () {

        pdfLibraryLoading = false;

        showToast("Unable to load PDF reader. Check internet connection.");

    };

    document.head.appendChild(script);

}


function openPDFNotes() {

    showModal("📄 PDF → Notes", `

        <div class="pdf-notes-box">

            <p>
                Upload a PDF and Learnix will extract the readable text
                and create simple revision notes.
            </p>

            <input
                type="file"
                id="pdfFile"
                accept=".pdf"
                style="width:100%;margin:15px 0;"
            >

            <button
                class="primary-btn"
                onclick="processPDF()"
            >
                📖 Create Notes
            </button>

            <div id="pdfStatus" style="margin-top:15px;"></div>

            <div
                id="pdfNotesResult"
                style="margin-top:20px;"
            ></div>

        </div>

    `);

}


async function processPDF() {

    const fileInput = document.getElementById("pdfFile");

    const status = document.getElementById("pdfStatus");

    const result = document.getElementById("pdfNotesResult");

    if (!fileInput || !fileInput.files.length) {

        showToast("Please select a PDF file first 📄");

        return;
    }

    const file = fileInput.files[0];

    if (file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")) {

        showToast("Please select a PDF file.");

        return;
    }

    status.innerHTML = "⏳ Loading PDF reader...";

    loadPDFLibrary(async function () {

        try {

            status.innerHTML = "⏳ Reading PDF...";

            const arrayBuffer = await file.arrayBuffer();

            const typedArray = new Uint8Array(arrayBuffer);

            const pdf = await window.pdfjsLib.getDocument({
                data: typedArray
            }).promise;

            let fullText = "";

            const maxPages = Math.min(pdf.numPages, 50);

            for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {

                status.innerHTML =
                    `⏳ Reading page ${pageNumber} of ${pdf.numPages}...`;

                const page = await pdf.getPage(pageNumber);

                const textContent = await page.getTextContent();

                const pageText = textContent.items
                    .map(function (item) {
                        return item.str;
                    })
                    .join(" ");

                fullText +=
                    `\n\n--- Page ${pageNumber} ---\n\n${pageText}`;

            }

            fullText = fullText.trim();

            if (!fullText) {

                result.innerHTML = `
                    <div class="card">
                        <h3>⚠️ No readable text found</h3>
                        <p>
                        This PDF may contain scanned images instead of
                        selectable text.
                        </p>
                    </div>
                `;

                status.innerHTML = "";

                return;
            }

            const notes = createSimpleNotes(fullText);

            result.innerHTML = `

                <div class="card">

                    <h3>📝 Quick Notes</h3>

                    <p>
                        <strong>File:</strong>
                        ${escapeHTML(file.name)}
                    </p>

                    <p>
                        <strong>Pages:</strong>
                        ${pdf.numPages}
                    </p>

                    <hr>

                    <div class="notes-output">
                        ${notes}
                    </div>

                    <br>

                    <button
                        class="primary-btn"
                        onclick="copyPDFNotes()"
                    >
                        📋 Copy Notes
                    </button>

                </div>

            `;

            window.lastPDFNotes = stripHTML(notes);

            status.innerHTML =
                `✅ PDF processed successfully.`;

            updateProgress(5);

        } catch (error) {

            console.error(error);

            status.innerHTML = "";

            result.innerHTML = `

                <div class="card">

                    <h3>❌ Unable to read PDF</h3>

                    <p>
                    The PDF could not be processed.
                    Please try another PDF file.
                    </p>

                </div>

            `;

        }

    });

}


// ============================================================
// CREATE SIMPLE NOTES
// ============================================================

function createSimpleNotes(text) {

    let cleanText = text
        .replace(/\s+/g, " ")
        .trim();

    const sentences = cleanText
        .split(/(?<=[.!?])\s+/)
        .filter(sentence => sentence.length > 20);

    const selected = sentences.slice(0, 30);

    let html = "<h4>Important Points</h4><ul>";

    selected.forEach(function (sentence) {

        html += `<li>${escapeHTML(sentence)}</li>`;

    });

    html += "</ul>";

    if (selected.length === 0) {

        html = `
            <p>
                Text was extracted, but automatic note creation
                could not identify clear sentences.
            </p>

            <pre style="white-space:pre-wrap;">
${escapeHTML(cleanText.substring(0, 5000))}
            </pre>
        `;

    }

    return html;

}


// ============================================================
// COPY PDF NOTES
// ============================================================

function copyPDFNotes() {

    if (!window.lastPDFNotes) {

        showToast("No notes available.");

        return;
    }

    navigator.clipboard.writeText(window.lastPDFNotes)
        .then(function () {

            showToast("Notes copied 📋");

        })
        .catch(function () {

            showToast("Copy failed. Please select the notes manually.");

        });

}


// ============================================================
// EXAM ANSWERS
// ============================================================

function openExamAnswers() {

    showModal("✍️ Exam Answers", `

        <h3>Exam Answer Structure</h3>

        <p>Use this simple structure when writing long answers.</p>

        <ol>
            <li>Definition / Introduction</li>
            <li>Main concept</li>
            <li>Explanation</li>
            <li>Example</li>
            <li>Diagram if required</li>
            <li>Advantages / Applications</li>
            <li>Conclusion</li>
        </ol>

        <h4>For 2 Marks</h4>
        <p>Definition + one important point.</p>

        <h4>For 5 Marks</h4>
        <p>Definition + explanation + example.</p>

        <h4>For 7 Marks</h4>
        <p>
            Introduction + detailed explanation + diagram/example
            + advantages + conclusion.
        </p>

    `);

}


// ============================================================
// MCQ DATABASE
// ============================================================

const questionBank = [

    {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        answer: "extends"
    },

    {
        question: "Which data structure follows LIFO?",
        options: ["Queue", "Stack", "Array", "Tree"],
        answer: "Stack"
    },

    {
        question: "Which key uniquely identifies a row in a table?",
        options: ["Foreign Key", "Primary Key", "Candidate Key", "Normal Key"],
        answer: "Primary Key"
    },

    {
        question: "Which gate gives output 1 only when both inputs are 1?",
        options: ["OR", "NOT", "AND", "XOR"],
        answer: "AND"
    },

    {
        question: "Which language is Java based on?",
        options: ["Object-oriented programming", "Only procedural programming", "Machine language", "Assembly"],
        answer: "Object-oriented programming"
    },

    {
        question: "Which keyword is used to create an object in Java?",
        options: ["class", "new", "object", "create"],
        answer: "new"
    },

    {
        question: "Which SQL command is used to retrieve data?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        answer: "SELECT"
    },

    {
        question: "Which data structure uses FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue"
    },

    {
        question: "What does DBMS stand for?",
        options: [
            "Database Management System",
            "Data Basic Management Software",
            "Database Machine System",
            "Data Management Service"
        ],
        answer: "Database Management System"
    },

    {
        question: "Which tree is self-balancing?",
        options: ["Binary Tree", "AVL Tree", "Simple Tree", "Heap Tree"],
        answer: "AVL Tree"
    },

    {
        question: "Which symbol represents logical AND?",
        options: ["||", "&&", "!", "=="],
        answer: "&&"
    },

    {
        question: "Which Java feature allows multiple inheritance of type?",
        options: ["Classes", "Interfaces", "Constructors", "Packages"],
        answer: "Interfaces"
    }

];
// ============================================================
// START QUIZ
// ============================================================

function startQuiz() {

    currentQuiz = [...questionBank]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    currentQuestion = 0;
    quizScore = 0;

    showQuizQuestion();

}


// ============================================================
// SHOW QUIZ QUESTION
// ============================================================

function showQuizQuestion() {

    if (currentQuestion >= currentQuiz.length) {

        finishQuiz();

        return;
    }

    const q = currentQuiz[currentQuestion];

    let optionsHTML = "";

    q.options.forEach(function (option) {

        optionsHTML += `

            <button
                class="quiz-option"
                onclick="answerQuiz('${escapeAttribute(option)}')"
            >
                ${escapeHTML(option)}
            </button>

        `;

    });

    showModal("🎯 Learnix Quiz", `

        <div class="quiz-container">

            <p>
                Question ${currentQuestion + 1}
                of ${currentQuiz.length}
            </p>

            <h3>${escapeHTML(q.question)}</h3>

            <div>
                ${optionsHTML}
            </div>

        </div>

    `);

}


// ============================================================
// ANSWER QUIZ
// ============================================================

function answerQuiz(answer) {

    const correct = currentQuiz[currentQuestion].answer;

    if (answer === correct) {

        quizScore++;

        showToast("Correct! 🎉");

    } else {

        showToast("Not correct. Keep learning 💪");

    }

    currentQuestion++;

    setTimeout(showQuizQuestion, 600);

}


// ============================================================
// FINISH QUIZ
// ============================================================

function finishQuiz() {

    const bestScore =
        Number(localStorage.getItem("learnixBestQuizScore") || 0);

    if (quizScore > bestScore) {

        localStorage.setItem(
            "learnixBestQuizScore",
            quizScore
        );

    }

    updateProgress(5);

    showModal("🏆 Quiz Complete", `

        <div class="quiz-result">

            <h2>${quizScore} / ${currentQuiz.length}</h2>

            <p>
                ${getQuizMessage(quizScore)}
            </p>

            <button
                class="primary-btn"
                onclick="startQuiz()"
            >
                Try Again
            </button>

        </div>

    `);

}


function getQuizMessage(score) {

    if (score === 5) {
        return "Excellent! 🌟";
    }

    if (score >= 3) {
        return "Good job! Keep practicing 👍";
    }

    return "Keep learning and try again 💪";

}


// ============================================================
// STUDY TIMER
// ============================================================

function openStudyTimer() {

    showModal("⏱️ Study Timer", `

        <div class="timer-container">

            <h1 id="timerDisplay">25:00</h1>

            <button
                class="primary-btn"
                onclick="startTimer()"
            >
                Start
            </button>

            <button
                class="secondary-btn"
                onclick="pauseTimer()"
            >
                Pause
            </button>

            <button
                class="secondary-btn"
                onclick="resetTimer()"
            >
                Reset
            </button>

        </div>

    `);

    updateTimerDisplay();

}


function startTimer() {

    if (studyTimer) return;

    studyTimer = setInterval(function () {

        if (timerSeconds <= 0) {

            clearInterval(studyTimer);
            studyTimer = null;

            showToast("Study session complete 🎉");

            updateProgress(3);

            return;
        }

        timerSeconds--;

        updateTimerDisplay();

    }, 1000);

}


function pauseTimer() {

    clearInterval(studyTimer);

    studyTimer = null;

}


function resetTimer() {

    pauseTimer();

    timerSeconds = 25 * 60;

    updateTimerDisplay();

}


function updateTimerDisplay() {

    const display = document.getElementById("timerDisplay");

    if (!display) return;

    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;
   display.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


// ============================================================
// STUDY PLANNER
// ============================================================

function openStudyPlanner() {

    showModal("✅ Study Planner", `

        <div>

            <input
                type="text"
                id="studyTask"
                placeholder="Enter study task"
                style="width:100%;padding:12px;"
            >

            <br><br>

            <button
                class="primary-btn"
                onclick="addStudyTask()"
            >
                Add Task
            </button>

            <div id="studyTaskList" style="margin-top:20px;"></div>

        </div>

    `);

    renderStudyTasks();

}


function addStudyTask() {

    const input = document.getElementById("studyTask");

    if (!input || !input.value.trim()) {

        showToast("Enter a study task.");

        return;
    }

    const tasks =
        JSON.parse(
            localStorage.getItem("learnixTasks") || "[]"
        );

    tasks.push({
        text: input.value.trim(),
        done: false
    });

    localStorage.setItem(
        "learnixTasks",
        JSON.stringify(tasks)
    );

    input.value = "";

    renderStudyTasks();

}


function renderStudyTasks() {

    const container =
        document.getElementById("studyTaskList");

    if (!container) return;

    const tasks =
        JSON.parse(
            localStorage.getItem("learnixTasks") || "[]"
        );

    if (!tasks.length) {

        container.innerHTML =
            "<p>No study tasks yet.</p>";

        return;
    }

    container.innerHTML = tasks.map(function (task, index) {

        return `

            <div style="padding:10px;border-bottom:1px solid #ddd;">

                <input
                    type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="toggleStudyTask(${index})"
                >

                <span style="${task.done ? "text-decoration:line-through;" : ""}">
                    ${escapeHTML(task.text)}
                </span>

            </div>

        `;

    }).join("");

}


function toggleStudyTask(index) {

    const tasks =
        JSON.parse(
            localStorage.getItem("learnixTasks") || "[]"
        );

    tasks[index].done = !tasks[index].done;

    localStorage.setItem(
        "learnixTasks",
        JSON.stringify(tasks)
    );

    renderStudyTasks();

    updateProgress(1);

}


// ============================================================
// BOOKMARKS
// ============================================================

function openBookmarks() {

    const bookmarks =
        JSON.parse(
            localStorage.getItem("learnixBookmarks") || "[]"
        );

    let html = `
        <h3>🔖 Saved Topics</h3>
    `;

    if (!bookmarks.length) {

        html += `
            <p>No bookmarks yet.</p>
        `;

    } else {

        html += "<ul>";

        bookmarks.forEach(function (item) {

            html += `
                <li>${escapeHTML(item)}</li>
            `;

        });

        html += "</ul>";

    }

    html += `

        <input
            id="bookmarkInput"
            placeholder="Add a topic"
            style="width:100%;padding:10px;"
        >

        <br><br>

        <button
            class="primary-btn"
            onclick="addBookmark()"
        >
            Save Topic
        </button>

    `;

    showModal("🔖 Bookmarks", html);

}


function addBookmark() {

    const input =
        document.getElementById("bookmarkInput");

    if (!input || !input.value.trim()) {

        showToast("Enter a topic.");

        return;
    }

    const bookmarks =
        JSON.parse(
            localStorage.getItem("learnixBookmarks") || "[]"
        );

    bookmarks.push(input.value.trim());

    localStorage.setItem(
        "learnixBookmarks",
        JSON.stringify(bookmarks)
    );

    showToast("Topic bookmarked 🔖");

    openBookmarks();

}


// ============================================================
// ACHIEVEMENTS
// ============================================================

function openAchievements() {

    const progress =
        Number(
            localStorage.getItem("learnixProgress") || 0
        );

    const bestScore =
        Number(
            localStorage.getItem("learnixBestQuizScore") || 0
        );

    const streak =
        Number(
            localStorage.getItem("learnixStreak") || 0
        );

    showModal("🏆 Achievements", `

        <div class="stats-grid">

            <div class="stat-box">
                <h3>${progress}%</h3>
                <p>Progress</p>
            </div>

            <div class="stat-box">
                <h3>${bestScore}/5</h3>
                <p>Best Quiz</p>
            </div>

            <div class="stat-box">
                <h3>${streak}</h3>
                <p>Day Streak</p>
            </div>

        </div>

        <br>

        <h3>Milestones</h3>

        <p>
            ${progress >= 10 ? "🏅 Learning Starter unlocked" : "🔒 Study more to unlock Learning Starter"}
        </p>

        <p>
            ${bestScore >= 5 ? "🏆 Quiz Master unlocked" : "🔒 Get 5/5 to unlock Quiz Master"}
        </p>

        <p>
            ${streak >= 3 ? "🔥 3 Day Streak unlocked" : "🔒 Study for 3 days"}
        </p>

    `);

}


// ============================================================
// CODING PRACTICE
// ============================================================

function openCodingPractice() {

    showModal("👨‍💻 Coding Practice", `

        <h3>Beginner Coding Questions</h3>

        <ol>

            <li>Print "Hello World" in Java.</li>

            <li>Find the largest number in an array.</li>

            <li>Check whether a number is even or odd.</li>

            <li>Reverse a string.</li>

            <li>Find factorial of a number.</li>

        </ol>

        <p>
            Practice these questions regularly to improve
            problem-solving skills.
        </p>

    `);

}


// ============================================================
// ENGLISH SPEAKING
// ============================================================

function openEnglishPractice() {

    showModal("🗣️ English Speaking", `

        <h3>Daily Speaking Practice</h3>

        <p>Speak for 1 minute on each topic.</p>

        <ul>

            <li>Introduce yourself.</li>

            <li>Describe your college.</li>

            <li>Talk about your favourite hobby.</li>

            <li>Explain your project.</li>

            <li>Describe your career plans.</li>

        </ul>

        <p>
            Focus on clear pronunciation and simple sentences.
        </p>

    `);

}


// ============================================================
// COMMUNICATION PRACTICE
// ============================================================

function openCommunicationPractice() {

    showModal("🎤 Communication Practice", `

        <h3>Professional Communication</h3>

        <ul>

            <li>How to introduce yourself</li>

            <li>How to participate in a group discussion</li>

            <li>How to give a seminar</li>

            <li>How to answer interview questions</li>

            <li>How to communicate confidently</li>

        </ul>

    `);

}


// ============================================================
// MOCK INTERVIEW
// ============================================================

const interviewQuestions = [

    "Tell me about yourself.",

    "Why should we hire you?",

    "What are your strengths?",

    "What is your weakness?",

    "Explain your project.",

    "Where do you see yourself in five years?"

];

let interviewIndex = 0;


function openMockInterview() {

    interviewIndex = 0;

    showInterviewQuestion();

}


function showInterviewQuestion() {

    const question =
        interviewQuestions[interviewIndex];

    showModal("🎙️ Mock Interview", `

        <h3>Question ${interviewIndex + 1}</h3>

        <p>
            <strong>${escapeHTML(question)}</strong>
        </p>

        <textarea
            id="interviewAnswer"
            rows="6"
            placeholder="Type your answer here..."
            style="width:100%;padding:12px;"
        ></textarea>

        <br><br>

        <button
            class="primary-btn"
            onclick="nextInterviewQuestion()"
        >
            Next Question →
        </button>

    `);

}


function nextInterviewQuestion() {

    const answer =
        document.getElementById("interviewAnswer");

    if (!answer || !answer.value.trim()) {

        showToast("Write an answer first.");

        return;
    }

    interviewIndex++;

    updateProgress(2);

    if (interviewIndex >= interviewQuestions.length) {

        showModal("🎉 Interview Complete", `

            <h3>Good work!</h3>

            <p>
                You completed the mock interview practice.
            </p>

            <button
                class="primary-btn"
                onclick="openMockInterview()"
            >
                Practice Again
            </button>

        `);

        return;
    }

    showInterviewQuestion();

}


// ============================================================
// RESUME BUILDER
// ============================================================

function openResumeBuilder() {

    showModal("📄 Resume Builder", `

        <div class="resume-form">

            <input
                id="resumeName"
                placeholder="Full Name"
                style="width:100%;padding:10px;margin:5px 0;"
            >

            <input
                id="resumeEmail"
                placeholder="Email"
                style="width:100%;padding:10px;margin:5px 0;"
            >

            <input
                id="resumePhone"
                placeholder="Phone"
                style="width:100%;padding:10px;margin:5px 0;"
            >

            <input
                id="resumeEducation"
                placeholder="Education"
                style="width:100%;padding:10px;margin:5px 0;"
            >

            <input
                id="resumeSkills"
                placeholder="Skills"
                style="width:100%;padding:10px;margin:5px 0;"
            >

            <textarea
                id="resumeProjects"
                placeholder="Projects"
                rows="4"
                style="width:100%;padding:10px;margin:5px 0;"
            ></textarea>

            <button
                class="primary-btn"
                onclick="generateResume()"
            >
                Generate Resume
            </button>

        </div>

    `);

}


function generateResume() {

    const name =
        document.getElementById("resumeName").value;

    const email =
        document.getElementById("resumeEmail").value;

    const phone =
        document.getElementById("resumePhone").value;

    const education =
        document.getElementById("resumeEducation").value;

    const skills =
        document.getElementById("resumeSkills").value;

    const projects =
        document.getElementById("resumeProjects").value;

    if (!name) {

        showToast("Enter your name.");

        return;
    }

    showModal("📄 Resume Preview", `

        <div class="resume-preview">

            <h1>${escapeHTML(name)}</h1>

            <p>
                ${escapeHTML(email)}
                ${email && phone ? " | " : ""}
                ${escapeHTML(phone)}
            </p>

            <hr>

            <h3>Education</h3>
            <p>${escapeHTML(education)}</p>

            <h3>Skills</h3>
            <p>${escapeHTML(skills)}</p>

            <h3>Projects</h3>
            <p>${escapeHTML(projects)}</p>

            <br>

            <button
                class="primary-btn"
                onclick="window.print()"
            >
                🖨️ Print / Save PDF
            </button>

        </div>

    `);

    updateProgress(5);

}


// ============================================================
// JOB PREPARATION
// ============================================================

function openJobPreparation() {

    showModal("🚀 Job Preparation", `

        <h3>Student Placement Roadmap</h3>

        <ol>

            <li>Build programming fundamentals</li>

            <li>Practice Data Structures and Algorithms</li>

            <li>Learn DBMS and Operating Systems</li>

            <li>Build 2–3 good projects</li>

            <li>Create a professional resume</li>

            <li>Practice aptitude</li>

            <li>Practice technical interviews</li>

            <li>Practice HR questions</li>

        </ol>

        <p>
            Consistent daily practice is more important than
            studying everything at once.
        </p>

    `);

}


// ============================================================
// PROGRESS
// ============================================================

function updateProgress(amount) {

    let progress =
        Number(
            localStorage.getItem("learnixProgress") || 0
        );

    progress += amount;

    if (progress > 100) {
        progress = 100;
    }

    localStorage.setItem(
        "learnixProgress",
        progress
    );

    loadProgress();

}


function loadProgress() {

    const progress =
        Number(
            localStorage.getItem("learnixProgress") || 0
        );

    const progressElements =
        document.querySelectorAll(
            "#heroProgress, .progress-value"
        );

    progressElements.forEach(function (element) {

        element.textContent =
            progress + "%";

    });

}


// ============================================================
// DAILY STREAK
// ============================================================

function updateDailyStreak() {

    const today =
        new Date().toLocaleDateString();

    const lastDate =
        localStorage.getItem("learnixLastVisit");

    let streak =
        Number(
            localStorage.getItem("learnixStreak") || 0
        );

    if (lastDate !== today) {

        streak++;

        localStorage.setItem(
            "learnixStreak",
            streak
        );

        localStorage.setItem(
            "learnixLastVisit",
            today
        );

    }

}


// ============================================================
// HTML SAFETY
// ============================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, "&quot;");

}


function stripHTML(html) {

    const temp =
        document.createElement("div");

    temp.innerHTML = html;

    return temp.textContent || temp.innerText || "";

}


// ============================================================
// SERVICE WORKER
// ============================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("service-worker.js")
            .then(function () {

                console.log(
                    "Learnix service worker registered."
                );

            })
            .catch(function (error) {

                console.log(
                    "Service worker registration failed:",
                    error
                );

            });

    });

}


// ============================================================
// KEYBOARD ESCAPE
// ============================================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal();

    }

});


// ============================================================
// PART 3 COMPLETE 🎉
// ============================================================
