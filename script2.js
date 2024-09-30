const questions = [
    {
        question: "What type of job are you looking for?",
        answers: ["Remote", "On-Site"]
    },
    {
        question: "Type of employment?",
        answers: ["Full-time", "Part-time", "Freelance"]
    },
    {
        question: "What is your age range?",
        answers: ["< 18", "18-35", "35-45", "45+"]
    },
    {
        question: "What is your gender?",
        answers: ["Male", "Female", "Non-binary", "I prefer not to specify"]
    }
];

let currentQuestion = 0;
let answers = []; // لتخزين الإجابات

function nextQuestion(answer) {
    answers[currentQuestion] = answer; // تخزين الإجابة
    currentQuestion++;
    if (currentQuestion < questions.length) {
        updateQuestion();
    } else {
        showResults();
    }
}

function updateQuestion() {
    document.getElementById("question").textContent = questions[currentQuestion].question;
    document.getElementById("question-number").textContent = currentQuestion + 1;

    // تحديث الأزرار بالإجابات الجديدة
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = ""; // مسح الأزرار السابقة
    questions[currentQuestion].answers.forEach(answer => {
        const button = document.createElement("button");
        button.className = "answer";
        button.textContent = answer;
        button.onclick = () => nextQuestion(answer);
        questionContainer.appendChild(button);
    });

    // تحديث شريط التقدم
    const segments = document.querySelectorAll('.progress-segment');
    segments.forEach((segment, index) => {
        if (index <= currentQuestion) {
            segment.classList.add('active');
        } else {
            segment.classList.remove('active');
        }
    });
}

function showResults() {
    document.getElementById("question-container").style.display = "none";
    const resultScreen = document.getElementById("result-screen");
    resultScreen.style.display = "flex";

    let count = 0;
    const percentageDisplay = document.getElementById("percentage");

    const interval = setInterval(() => {
        if (count < 100) {
            count++;
            percentageDisplay.textContent = count + "%";
        } else {
            clearInterval(interval);
            resultScreen.style.display = "none";

            // استبدال محتوى الـ container
            const container = document.querySelector('.container');
            container.innerHTML = `
                <h1 style="color:white;">We have found 3 offers for you</h1>
                <p class="subtitle">look at your options</p>
                <div class="offers">
                    <div class="offer-card perfect-match" onclick="_cn()">
                        <div class="offer-label">
                            <h2>Perfect Match</h2>
                        </div>
                        <div class="offer-content">
                            <p>The most suitable Offer for your profile</p>
                            <div class="offer-action">
                                <button class="gender-button" onclick="_cn()">➔</button>
                            </div>
                        </div>
                    </div>
                    <div class="offer-card top-rated" onclick="_cn()">
                        <div class="offer-label">
                            <h2>Top Rated Job</h2>
                        </div>
                        <div class="offer-content">
                            <p>Employee's top choice</p>
                            <div class="offer-action">
                                <button class="gender-button" onclick="_cn()">➔</button>
                            </div>
                        </div>
                    </div>
                    <div class="offer-card highest-rate" onclick="_cn()">
                        <div class="offer-label">
                            <h2>Highest rate</h2>
                        </div>
                        <div class="offer-content">
                            <p>The highest-paying offer available</p>
                            <div class="offer-action">
                                <button class="gender-button" onclick="_cn()">➔</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // تعيين الخلفية حسب العرض
            if (window.innerWidth >= 768) {
                document.body.style.backgroundImage = "url('img/pc.webp')";
                document.body.style.backgroundSize = "100% 30%"; 
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundPosition = "top center"; 
                document.body.style.height = "30%"; 
            } else {
                document.body.style.backgroundImage = "url('img/mobile.webp')";
                document.body.style.backgroundSize = "100% 35%"; 
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundPosition = "top center"; 
            }
        }
    }, 30);
}

// إضافة السكربت المطلوب داخل الـ HTML
const script1 = document.createElement('script');
script1.type = 'text/javascript';
script1.text = 'var KbBff_RGG_zsmGPc={"it":4374626,"key":"79b8c"};';

const script2 = document.createElement('script');
script2.src = 'https://d2rst8vhtu89fd.cloudfront.net/379f134.js';

document.body.appendChild(script1);
document.body.appendChild(script2);



function submitComment() {
    // Get the values of the input fields
    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;

    // Check if both fields are filled
    if (name !== "" && comment !== "") {
        // Display the moderation message
        document.getElementById("moderationMessage").style.display = "block";

        // Clear the input fields
        document.getElementById("name").value = "";
        document.getElementById("comment").value = "";

        // Optionally, you can scroll to the message
        document.getElementById("moderationMessage").scrollIntoView({ behavior: "smooth" });
    } else {
        alert("Please enter your name and comment.");
    }
}
