// Tools functionality for Digital Footprint website

// Google Yourself Challenge
function performSearch(type) {
    const fullName = document.getElementById('full-name').value.trim();
    const location = document.getElementById('location').value.trim();
    const school = document.getElementById('school').value.trim();
    
    if (!fullName) {
        alert('Please enter your full name first');
        return;
    }
    
    let searchQuery = '';
    
    switch(type) {
        case 'exact':
            searchQuery = `"${fullName}"`;
            break;
        case 'location':
            searchQuery = location ? `"${fullName}" "${location}"` : `"${fullName}"`;
            break;
        case 'school':
            searchQuery = school ? `"${fullName}" "${school}"` : `"${fullName}"`;
            break;
        case 'images':
            searchQuery = `"${fullName}"`;
            break;
    }
    
    const baseUrl = type === 'images' 
        ? 'https://www.google.com/search?tbm=isch&q=' 
        : 'https://www.google.com/search?q=';
    
    const searchUrl = baseUrl + encodeURIComponent(searchQuery);
    window.open(searchUrl, '_blank');
}

// Privacy Checkup functionality
document.addEventListener('DOMContentLoaded', function() {
    const privacyCheckboxes = document.querySelectorAll('.privacy-checkbox');
    const assessmentCheckboxes = document.querySelectorAll('.assessment-checkbox');
    
    if (privacyCheckboxes.length > 0) {
        privacyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updatePrivacyScores);
        });
        updatePrivacyScores();
    }
    
    if (assessmentCheckboxes.length > 0) {
        assessmentCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateAssessmentResult);
        });
    }
    
    // Password strength checker
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
    
    // Initialize quiz if present
    if (document.getElementById('quiz-container')) {
        initializeQuiz();
    }
});

function updatePrivacyScores() {
    const platforms = ['facebook', 'instagram', 'twitter'];
    let totalScore = 0;
    let maxScore = 0;
    
    platforms.forEach(platform => {
        const checkboxes = document.querySelectorAll(`[data-platform="${platform}"]`);
        const checkedBoxes = document.querySelectorAll(`[data-platform="${platform}"]:checked`);
        const score = checkedBoxes.length;
        const max = checkboxes.length;
        
        maxScore += max;
        totalScore += score;
        
        const scoreElement = document.getElementById(`${platform}-score`);
        if (scoreElement) {
            scoreElement.textContent = `Score: ${score}/${max}`;
            scoreElement.className = `platform-score ${getScoreClass(score, max)}`;
        }
    });
    
    updateOverallScore(totalScore, maxScore);
}

function updateOverallScore(score, maxScore) {
    const overallScore = document.getElementById('overall-score');
    const scoreMessage = document.getElementById('score-message');
    const recommendations = document.getElementById('recommendations');
    
    if (overallScore) {
        overallScore.textContent = `${score}/${maxScore}`;
        overallScore.className = `overall-score ${getScoreClass(score, maxScore)}`;
    }
    
    const percentage = (score / maxScore) * 100;
    
    if (scoreMessage) {
        if (percentage >= 80) {
            scoreMessage.textContent = 'Excellent! Your privacy settings are well configured.';
            scoreMessage.className = 'score-message excellent';
        } else if (percentage >= 60) {
            scoreMessage.textContent = 'Good progress! A few more adjustments will improve your privacy.';
            scoreMessage.className = 'score-message good';
        } else if (percentage >= 40) {
            scoreMessage.textContent = 'Fair. Your privacy could use some improvement.';
            scoreMessage.className = 'score-message fair';
        } else {
            scoreMessage.textContent = 'Your privacy settings need significant improvement.';
            scoreMessage.className = 'score-message poor';
        }
    }
    
    if (recommendations) {
        const uncheckedItems = document.querySelectorAll('.privacy-checkbox:not(:checked)');
        if (uncheckedItems.length > 0) {
            let recText = '<h4>Recommendations:</h4><ul>';
            uncheckedItems.forEach(item => {
                const label = item.parentElement.textContent.trim();
                recText += `<li>${label}</li>`;
            });
            recText += '</ul>';
            recommendations.innerHTML = recText;
        } else {
            recommendations.innerHTML = '<h4>🎉 All privacy settings optimized!</h4>';
        }
    }
}

function getScoreClass(score, max) {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'fair';
    return 'poor';
}

function updateAssessmentResult() {
    const checkboxes = document.querySelectorAll('.assessment-checkbox');
    const checkedBoxes = document.querySelectorAll('.assessment-checkbox:checked');
    const result = document.getElementById('assessment-result');
    
    if (result && checkedBoxes.length > 0) {
        let message = '<div class="assessment-feedback">';
        message += '<h4>Assessment Results:</h4>';
        
        if (checkedBoxes.length >= 3) {
            message += '<p class="feedback-warning">⚠️ You found several concerning items. Consider using our cleanup guide to address these issues.</p>';
        } else if (checkedBoxes.length >= 1) {
            message += '<p class="feedback-caution">⚡ You found some items that need attention. Review our management strategies.</p>';
        }
        
        message += '<div class="next-actions">';
        message += '<a href="cleanup-guide.html" class="btn btn-primary btn-small">Start Cleanup</a>';
        message += '<a href="action-steps.html" class="btn btn-secondary btn-small">Action Plan</a>';
        message += '</div>';
        message += '</div>';
        
        result.innerHTML = message;
    }
}

// Password Strength Checker
function checkPasswordStrength() {
    const password = document.getElementById('password-input').value;
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Update criteria indicators
    Object.keys(criteria).forEach(criterion => {
        const element = document.getElementById(`${criterion}-criteria`);
        if (element) {
            const icon = element.querySelector('i');
            if (criteria[criterion]) {
                element.classList.add('met');
                icon.className = 'fas fa-check';
            } else {
                element.classList.remove('met');
                icon.className = 'fas fa-times';
            }
        }
    });
    
    // Calculate strength
    const metCriteria = Object.values(criteria).filter(Boolean).length;
    let strength = 0;
    let strengthLabel = '';
    let strengthClass = '';
    
    if (password.length === 0) {
        strengthLabel = 'Enter a password';
        strengthClass = 'empty';
    } else if (metCriteria <= 2) {
        strength = 25;
        strengthLabel = 'Weak';
        strengthClass = 'weak';
    } else if (metCriteria <= 3) {
        strength = 50;
        strengthLabel = 'Fair';
        strengthClass = 'fair';
    } else if (metCriteria <= 4) {
        strength = 75;
        strengthLabel = 'Good';
        strengthClass = 'good';
    } else {
        strength = 100;
        strengthLabel = 'Strong';
        strengthClass = 'strong';
    }
    
    if (strengthFill) {
        strengthFill.style.width = strength + '%';
        strengthFill.className = `strength-fill ${strengthClass}`;
    }
    
    if (strengthText) {
        strengthText.textContent = strengthLabel;
        strengthText.className = `strength-text ${strengthClass}`;
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password-input');
    const eyeIcon = document.getElementById('password-eye');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        eyeIcon.className = 'fas fa-eye';
    }
}

// Quiz functionality
const quizQuestions = [
    {
        question: "What percentage of employers check social media profiles before hiring?",
        options: ["A) 30%", "B) 50%", "C) 70%", "D) 90%"],
        correct: "C",
        explanation: "According to recent studies, approximately 70% of employers check candidates' social media profiles during the hiring process."
    },
    {
        question: "How long can deleted social media posts remain on company servers?",
        options: ["A) 24 hours", "B) 1 week", "C) 30-90 days", "D) Forever"],
        correct: "C",
        explanation: "Most social media companies retain deleted content for 30-90 days in their backup systems before permanent deletion."
    },
    {
        question: "What is a passive digital footprint?",
        options: ["A) Posts you make intentionally", "B) Data collected without your knowledge", "C) Your email address", "D) Your profile picture"],
        correct: "B",
        explanation: "A passive digital footprint consists of data collected about you without your direct knowledge, such as tracking cookies and browsing history."
    },
    {
        question: "Which privacy setting is most important for teenagers on social media?",
        options: ["A) Public profile", "B) Private/Friends only", "C) Location sharing on", "D) Accept all friend requests"],
        correct: "B",
        explanation: "Setting your profile to private or friends-only is the most important privacy setting to control who can see your content."
    },
    {
        question: "What should you do if you're being cyberbullied?",
        options: ["A) Fight back online", "B) Ignore it completely", "C) Document, block, and report", "D) Delete all your accounts"],
        correct: "C",
        explanation: "The best response to cyberbullying is to document the harassment, block the bully, report to the platform, and seek help from trusted adults."
    },
    {
        question: "How often should you Google yourself?",
        options: ["A) Never", "B) Once a year", "C) Monthly", "D) Daily"],
        correct: "C",
        explanation: "It's recommended to Google yourself monthly to monitor your online presence and address any issues quickly."
    },
    {
        question: "What is the 'right to be forgotten'?",
        options: ["A) Deleting your browser history", "B) Legal right to have personal data removed", "C) Forgetting your password", "D) Private browsing mode"],
        correct: "B",
        explanation: "The 'right to be forgotten' is a legal concept that allows individuals to request removal of personal information from search results and databases."
    },
    {
        question: "Which of these is NOT a good password practice?",
        options: ["A) Using unique passwords for each account", "B) Including personal information", "C) Using two-factor authentication", "D) Using a password manager"],
        correct: "B",
        explanation: "Including personal information in passwords makes them easier to guess and less secure."
    },
    {
        question: "What percentage of colleges review applicants' social media?",
        options: ["A) 10%", "B) 25%", "C) 36%", "D) 50%"],
        correct: "C",
        explanation: "Studies show that approximately 36% of college admissions officers review applicants' social media profiles."
    },
    {
        question: "What is the best way to handle an inappropriate photo of you posted by someone else?",
        options: ["A) Ignore it", "B) Post a negative comment", "C) Contact the person and report to platform", "D) Share it yourself"],
        correct: "C",
        explanation: "The best approach is to contact the person who posted it, ask them to remove it, and report it to the platform if necessary."
    }
];

let currentQuestion = 0;
let userAnswers = [];
let quizScore = 0;

function initializeQuiz() {
    displayQuestion();
}

function displayQuestion() {
    const questionContainer = document.getElementById('quiz-question');
    const question = quizQuestions[currentQuestion];
    
    if (questionContainer && question) {
        questionContainer.innerHTML = `
            <h4>Question ${currentQuestion + 1} of ${quizQuestions.length}</h4>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => 
                    `<button class="quiz-option" onclick="selectAnswer(${currentQuestion}, '${option.charAt(0)}')">${option}</button>`
                ).join('')}
            </div>
        `;
    }
    
    updateQuizProgress();
    updateNavigationButtons();
}

function selectAnswer(questionIndex, answer) {
    userAnswers[questionIndex] = answer;
    
    // Highlight selected answer
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('selected');
        if (option.textContent.startsWith(answer)) {
            option.classList.add('selected');
        }
    });
    
    // Enable next button
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    
    if (currentQuestion === quizQuestions.length - 1) {
        if (finishBtn) finishBtn.style.display = 'inline-block';
        if (nextBtn) nextBtn.style.display = 'none';
    } else {
        if (nextBtn) nextBtn.disabled = false;
    }
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function updateQuizProgress() {
    const progressFill = document.getElementById('quiz-progress-fill');
    const progressText = document.getElementById('quiz-progress-text');
    
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${currentQuestion + 1} of ${quizQuestions.length}`;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = !userAnswers[currentQuestion];
        nextBtn.style.display = currentQuestion === quizQuestions.length - 1 ? 'none' : 'inline-block';
    }
    
    if (finishBtn) {
        finishBtn.style.display = currentQuestion === quizQuestions.length - 1 && userAnswers[currentQuestion] ? 'inline-block' : 'none';
    }
}

function finishQuiz() {
    // Calculate score
    quizScore = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i].correct) {
            quizScore++;
        }
    }
    
    // Hide quiz container and show results
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const scoreElement = document.getElementById('quiz-score');
    const feedbackElement = document.getElementById('quiz-feedback');
    
    if (quizContainer) quizContainer.style.display = 'none';
    if (quizResults) quizResults.style.display = 'block';
    
    if (scoreElement) {
        scoreElement.textContent = `Your Score: ${quizScore}/${quizQuestions.length}`;
        scoreElement.className = `quiz-score ${getQuizScoreClass(quizScore, quizQuestions.length)}`;
    }
    
    if (feedbackElement) {
        const percentage = (quizScore / quizQuestions.length) * 100;
        let feedback = '';
        
        if (percentage >= 80) {
            feedback = '🎉 Excellent! You have a strong understanding of digital footprints and online privacy.';
        } else if (percentage >= 60) {
            feedback = '👍 Good job! You understand the basics, but there\'s room for improvement.';
        } else if (percentage >= 40) {
            feedback = '📚 Fair. Consider reviewing our educational content to improve your knowledge.';
        } else {
            feedback = '📖 You might benefit from reading through our learning materials to better understand digital footprints.';
        }
        
        feedback += '<div class="quiz-recommendations">';
        feedback += '<h4>Recommended Next Steps:</h4>';
        feedback += '<ul>';
        
        if (percentage < 60) {
            feedback += '<li><a href="what-is-digital-footprint.html">Learn about digital footprints</a></li>';
            feedback += '<li><a href="how-its-formed.html">Understand how they\'re formed</a></li>';
        }
        
        if (percentage < 80) {
            feedback += '<li><a href="consequences.html">Learn about consequences</a></li>';
            feedback += '<li><a href="how-to-manage.html">Discover management strategies</a></li>';
        }
        
        feedback += '<li><a href="action-steps.html">Start your action plan</a></li>';
        feedback += '</ul></div>';
        
        feedbackElement.innerHTML = feedback;
    }
}

function getQuizScoreClass(score, total) {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'fair';
    return 'poor';
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    quizScore = 0;
    
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    
    if (quizContainer) quizContainer.style.display = 'block';
    if (quizResults) quizResults.style.display = 'none';
    
    displayQuestion();
}

// Extension download functionality
function downloadExtension(version) {
    if (version === 'basic') {
        // Simulate extension download for basic version
        alert('DigitalGuard Basic Extension\n\nThank you for your interest! The extension is currently in development.\n\nFeatures included:\n• Core tracking of online footprint\n• Basic notifications and reminders\n• Limited educational tips\n• Privacy settings shortcuts\n\nWe\'ll notify you when it\'s available for download.');
    } else if (version === 'premium') {
        // Simulate extension download for premium version
        alert('DigitalGuard Premium Extension\n\nThank you for your interest in the premium version!\n\nPremium features include:\n• All basic features\n• Advanced monitoring tools\n• Detailed insights and reports\n• Personalized guidance\n• Real-time risk assessment\n• Priority support\n\nPrice: $4.99/month\n\nWe\'ll notify you when it\'s available for purchase.');
    }
}

// Video functionality for resources page
function openVideo(videoUrl) {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
}

// Infographic viewer functionality
function viewFullSize(imageUrl, title) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeImageModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeImageModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="${imageUrl}" alt="${title}" class="modal-image">
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="downloadImage('${imageUrl}', '${title}')">
                        <i class="fas fa-download"></i>
                        Download
                    </button>
                    <button class="btn btn-outline" onclick="closeImageModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function downloadImage(imageUrl, title) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}