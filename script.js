document.addEventListener('DOMContentLoaded', () => {
    
    const difficulties = {
        easy: [
            { question: "Скільки буде 1+1?", answers: ["2", "3", "1", "6"], correctAnswer: "2" },
            { question: "Скільки буде 5-2?", answers: ["2", "3", "4", "1"], correctAnswer: "3" },
            { question: "Скільки буде 4+3?", answers: ["7", "6", "8", "5"], correctAnswer: "7" },
            { question: "Скільки буде 8-4?", answers: ["2", "6", "4", "5"], correctAnswer: "4" },
            { question: "Скільки буде 6+2?", answers: ["7", "8", "9", "6"], correctAnswer: "8" },
            { question: "Скільки буде 9-5?", answers: ["3", "5", "4", "6"], correctAnswer: "4" },
            { question: "Скільки буде 3+4?", answers: ["6", "8", "7", "5"], correctAnswer: "7" },
            { question: "Скільки буде 10-3?", answers: ["6", "7", "8", "5"], correctAnswer: "7" },
            { question: "Скільки буде 2+5?", answers: ["7", "8", "6", "9"], correctAnswer: "7" },
            { question: "Скільки буде 7-2?", answers: ["4", "6", "5", "3"], correctAnswer: "5" }
        ],
        medium: [
            { question: "Скільки буде 45+15?", answers: ["50", "65", "60", "55"], correctAnswer: "60" },
            { question: "Скільки буде 72-18?", answers: ["54", "64", "56", "44"], correctAnswer: "54" },
            { question: "Скільки буде 6 * 7?", answers: ["42", "36", "48", "40"], correctAnswer: "42" },
            { question: "Скільки буде 8 * 9?", answers: ["64", "72", "81", "56"], correctAnswer: "72" },
            { question: "Скільки буде 54+26?", answers: ["70", "80", "85", "75"], correctAnswer: "80" },
            { question: "Скільки буде 90-35?", answers: ["55", "65", "45", "60"], correctAnswer: "55" },
            { question: "Скільки буде 5 * 5?", answers: ["20", "30", "25", "35"], correctAnswer: "25" },
            { question: "Скільки буде 4 * 9?", answers: ["32", "36", "40", "28"], correctAnswer: "36" },
            { question: "Скільки буде 33+47?", answers: ["70", "80", "90", "75"], correctAnswer: "80" },
            { question: "Скільки буде 7 * 8?", answers: ["54", "56", "64", "49"], correctAnswer: "56" }
        ],
        hard: [
            { question: "Скільки буде 12 * 5?", answers: ["50", "60", "55", "65"], correctAnswer: "60" },
            { question: "Скільки буде 81 / 9?", answers: ["7", "8", "9", "6"], correctAnswer: "9" },
            { question: "Скільки буде 15 * 4?", answers: ["50", "60", "45", "55"], correctAnswer: "60" },
            { question: "Скільки буде 72 / 8?", answers: ["8", "9", "7", "6"], correctAnswer: "9" },
            { question: "Скільки буде 14 * 3?", answers: ["42", "38", "46", "44"], correctAnswer: "42" },
            { question: "Скільки буде 96 / 6?", answers: ["14", "18", "16", "12"], correctAnswer: "16" },
            { question: "Скільки буде 25 * 4?", answers: ["100", "75", "125", "90"], correctAnswer: "100" },
            { question: "Скільки буде 64 / 4?", answers: ["14", "16", "18", "12"], correctAnswer: "16" },
            { question: "Скільки буде 18 * 3?", answers: ["52", "56", "54", "48"], correctAnswer: "54" },
            { question: "Скільки буде 105 / 5?", answers: ["21", "25", "19", "23"], correctAnswer: "21" }
        ]
    };
    
    let questions = [];
    
    const startScreen = document.querySelector('#start-screen');
    const difficultyScreen = document.querySelector('#difficulty-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const diffButtons = document.querySelectorAll('.diff-btn');
    
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display');
    const timerDisplay = document.querySelector('#timer');
    
    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;
    
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hide');
        difficultyScreen.classList.remove('hide');
    });
    
    diffButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const diff = e.target.getAttribute('data-difficulty');
            questions = shuffle([...difficulties[diff]]);
            startGame();
        });
    });
    
    function showQuestion(qObj) {
        clearInterval(interval);
        startTimer();
        
        answersContainer.innerHTML = '';
        questionText.innerText = qObj.question;
        scoreDisplay.innerText = `Бали: ${score}`;
        
        let shuffledAnswers = [...qObj.answers];
        shuffle(shuffledAnswers);

        shuffledAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, answer, qObj.correctAnswer));
            answersContainer.appendChild(button);
        });
    }
    
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }
    
    function checkAnswer(button, selectedAnswer, correctAnswer){
        clearInterval(interval);
        
        if (selectedAnswer === correctAnswer) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
            document.querySelectorAll('.answer-btn').forEach(btn => {
                if (btn.innerText === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }
        
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        setTimeout(nextQuestion, 1200);
    }
    
    function startGame() {
        difficultyScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        
        questionIndex = 0;
        score = 0;
        
        showQuestion(questions[questionIndex]);
    }
    
    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }
    
    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }
    
    restartBtn.addEventListener('click', () => {
        resultScreen.classList.add('hide');
        startScreen.classList.remove('hide');
    });

});
