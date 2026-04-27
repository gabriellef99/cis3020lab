// Letterkenny Fan Page - Interactive JavaScript Features

// FEATURE 1: Character Quiz on Home Page
function initCharacterQuiz() {
    const quizContainer = document.getElementById('character-quiz');
    if (!quizContainer) return;

    const questions = [
        {
            question: "What's your ideal weekend activity?",
            answers: [
                { text: "Working on the farm", character: "Wayne" },
                { text: "Playing hockey", character: "Shoresy" },
                { text: "Helping animals", character: "Rosie" },
                { text: "Going to a party", character: "Katy" },
                { text: "Telling stories with friends", character: "Squirrelly Dan" }
            ]
        },
        {
            question: "How do you handle conflict?",
            answers: [
                { text: "Stand my ground, protect what I love", character: "Wayne" },
                { text: "Trash talk and wit", character: "Shoresy" },
                { text: "Find a peaceful solution", character: "Rosie" },
                { text: "Speak my mind directly", character: "Katy" },
                { text: "Try to lighten the mood", character: "Squirrelly Dan" }
            ]
        },
        {
            question: "What's most important to you?",
            answers: [
                { text: "Loyalty and family", character: "Wayne" },
                { text: "Being the best at what I do", character: "Shoresy" },
                { text: "Kindness and compassion", character: "Rosie" },
                { text: "Independence and fun", character: "Katy" },
                { text: "Good friends and good times", character: "Squirrelly Dan" }
            ]
        }
    ];

    let currentQuestion = 0;
    let characterScores = {
        "Wayne": 0,
        "Shoresy": 0,
        "Rosie": 0,
        "Katy": 0,
        "Squirrelly Dan": 0
    };

    function displayQuestion() {
        const q = questions[currentQuestion];
        let html = `
            <div class="quiz-question">
                <h4>Question ${currentQuestion + 1} of ${questions.length}</h4>
                <p class="question-text">${q.question}</p>
                <div class="quiz-answers">
        `;

        q.answers.forEach((answer, index) => {
            html += `
                <button class="quiz-answer-btn" data-character="${answer.character}">
                    ${answer.text}
                </button>
            `;
        });

        html += `</div></div>`;
        quizContainer.innerHTML = html;

        // Add event listeners to answer buttons
        document.querySelectorAll('.quiz-answer-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const character = this.getAttribute('data-character');
                characterScores[character]++;
                currentQuestion++;

                if (currentQuestion < questions.length) {
                    displayQuestion();
                } else {
                    showResults();
                }
            });
        });
    }

    function showResults() {
        let maxScore = 0;
        let resultCharacter = "";

        for (let character in characterScores) {
            if (characterScores[character] > maxScore) {
                maxScore = characterScores[character];
                resultCharacter = character;
            }
        }

        const characterDescriptions = {
            "Wayne": "You're Wayne! Tough, loyal, and protective. You have a strong moral code and always stand up for what's right.",
            "Shoresy": "You're Shoresy! Witty, competitive, and always ready with a comeback. You never back down from a challenge.",
            "Rosie": "You're Rosie! Kind-hearted, compassionate, and always willing to help those in need. Animals love you!",
            "Katy": "You're Katy! Independent, fun-loving, and not afraid to speak your mind. You know what you want.",
            "Squirrelly Dan": "You're Squirrelly Dan! Friendly, humorous, and always there for your pals. You bring joy wherever you go."
        };

        quizContainer.innerHTML = `
            <div class="quiz-result">
                <h3>Your Result: ${resultCharacter}!</h3>
                <p>${characterDescriptions[resultCharacter]}</p>
                <button class="quiz-restart-btn" onclick="location.reload()">Take Quiz Again</button>
            </div>
        `;
    }

    displayQuestion();
}

// FEATURE 2: Dynamic Theme Switcher
function initThemeSwitcher() {
    // Always apply saved theme on page load (even if switcher isn't on this page)
    const savedTheme = localStorage.getItem('letterkenny-theme') || 'default';
    applyTheme(savedTheme);
    
    const themeSwitcher = document.getElementById('theme-switcher');
    if (!themeSwitcher) return; // Exit if no switcher on this page, but theme is still applied
 
    themeSwitcher.addEventListener('change', function() {
        const selectedTheme = this.value;
        applyTheme(selectedTheme);
        localStorage.setItem('letterkenny-theme', selectedTheme);
    });
 
    // Set the select to the saved theme
    themeSwitcher.value = savedTheme;
}
 
function applyTheme(theme) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('theme-default', 'theme-dark', 'theme-hockey');
    
    // Add selected theme class
    body.classList.add(`theme-${theme}`);
}

// FEATURE 3: Form Validation and Enhancement 
function initFormValidation() {
    const form = document.querySelector('.comment-form form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentInput = document.getElementById('comment');

    // Character counter for comment field
    if (commentInput) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.textContent = '0 characters';
        commentInput.parentNode.appendChild(charCounter);

        commentInput.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
            
            if (length > 500) {
                charCounter.style.color = '#D2691E';
            } else {
                charCounter.style.color = '#666';
            }
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        let errorMessages = [];

        // Validate name
        if (nameInput.value.trim() === '') {
            isValid = false;
            errorMessages.push('Name is required');
            nameInput.style.borderColor = 'red';
        } else {
            nameInput.style.borderColor = '#D2691E';
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            isValid = false;
            errorMessages.push('Please enter a valid email address');
            emailInput.style.borderColor = 'red';
        } else {
            emailInput.style.borderColor = '#D2691E';
        }

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <p>✓ Thanks for your comment, ${nameInput.value}! Your feedback has been received.</p>
            `;
            form.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                successMessage.remove();
                if (charCounter) charCounter.textContent = '0 characters';
            }, 3000);
        } else {
            // Show error message
            let existingError = form.querySelector('.form-error');
            if (existingError) existingError.remove();
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.innerHTML = `<p>⚠ ${errorMessages.join('<br>')}</p>`;
            form.insertBefore(errorDiv, form.firstChild);
            
            setTimeout(() => errorDiv.remove(), 5000);
        }
    });
}

// FEATURE 4: Scroll to Top Button 
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.title = 'Back to Top';
    document.body.appendChild(scrollBtn);
 
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
 
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize All Features on Page Load 
document.addEventListener('DOMContentLoaded', function() {
    initCharacterQuiz();
    initThemeSwitcher();
    initImageGallery();
    initFormValidation();
    initCharacterComparison();
    initScrollToTop();
    
    console.log('Letterkenny Fan Page JavaScript loaded successfully!');
});
