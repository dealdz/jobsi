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
                    <div class="offer-card perfect-match" onclick="showPopup()">
                        <div class="offer-label">
                            <h2>Perfect Match</h2>
                        </div>
                        <div class="offer-content">
                            <p>The most suitable Offer for your profile</p>
                            <div class="offer-action">
                                <button class="gender-button" onclick="showPopup()">➔</button>
                            </div>
                        </div>
                    </div>
                    <div class="offer-card top-rated" onclick="showPopup()">
                        <div class="offer-label">
                            <h2>Top Rated Job</h2>
                        </div>
                        <div class="offer-content">
                            <p>Employee's top choice</p>
                            <div class="offer-action">
                                <button class="gender-button" onclick="showPopup()">➔</button>
                            </div>
                        </div>
                    </div>
                    <div class="offer-card highest-rate" onclick="showPopup()">
                        <div class="offer-label">
                            <h2>Highest rate</h2>
                        </div>
                        <div class="offer-content">
                            <p>The highest-paying offer available</p>
                            <div class="offer-action">
                                <button class="gender-button" onclick="showPopup()">➔</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // تعيين الخلفية حسب العرض
            if (window.innerWidth >= 768) {
                document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/dealdz/jobsi/main/uploads/pc.webp')";
                document.body.style.backgroundSize = "100% 30%"; 
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundPosition = "top center"; 
                document.body.style.height = "30%"; 
            } else {
                document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/dealdz/jobsi/main/uploads/mobile.webp')";
                document.body.style.backgroundSize = "100% 35%"; 
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundPosition = "top center"; 
            }
        }
    }, 30);
}

function showPopup() {
    const popup = document.createElement('div');
    popup.id = 'email-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Unlock Your Job Opportunity!</h2>
            <p>To secure this position, please verify you're not a robot by completing a quick task.</p>
            <p>Click the button below to get started!</p>
            <button onclick="window.location.href='https://www.google.com';">Verify Now</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Adding CSS to style the pop-up
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)'; // Center the popup
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.zIndex = '1000';
    popup.style.maxWidth = '90%'; // Max width for responsive design
    popup.style.width = '400px'; // Fixed width
    popup.style.height = 'auto'; // Automatic height
    popup.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)'; // Add permanent shadow

    // Disable scrolling when the pop-up is open
    document.body.style.overflow = 'hidden';

    // Add event listener to shake the popup when clicking outside
    window.addEventListener('click', (event) => {
        if (!popup.contains(event.target)) {
            shakePopup(popup);
        }
    });
}

function shakePopup(popup) {
    popup.style.animation = 'shake 0.5s'; // Add shake animation
    popup.style.transform = 'translate(-50%, -50%)'; // Ensure it stays centered
    setTimeout(() => {
        popup.style.animation = ''; // Remove animation after it's done
    }, 500);
}



function verifyEmail() {
    const emailInput = document.getElementById("email");
    if (emailInput.value) {
        alert(`Email ${emailInput.value} has been verified!`);
        document.getElementById('email-popup').remove();
    } else {
        alert("Please enter a valid email.");
    }
}



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
