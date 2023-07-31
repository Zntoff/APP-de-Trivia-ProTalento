const apiUrl = 'https://opentdb.com/api.php?amount=1&category=15&type=multiple';
let score = 0;

function fetchTriviaQuestions() {
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const question = data.results[0].question;
                const incorrectAnswers = data.results[0].incorrect_answers;
                const correctAnswer = data.results[0].correct_answer;

                showQuestion(question, correctAnswer, incorrectAnswers);
            } else {
                console.log('No se encontraron preguntas.');
            }
        })
        .catch(error => console.error('Error al obtener preguntas:', error));
}

function showQuestion(question, correctAnswer, incorrectAnswers) {
    // Mostrar la pregunta y las opciones de respuesta en la interfaz
    const questionElement = document.getElementById('question');
    questionElement.innerText = question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Mezclar las respuestas (correcta e incorrectas) para mostrarlas aleatoriamente
    const allOptions = [...incorrectAnswers, correctAnswer];
    allOptions.sort(() => Math.random() - 0.5);

    allOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerText = option;
        optionElement.addEventListener('click', handleAnswer);

        optionsContainer.appendChild(optionElement);
    });
}

function handleAnswer(event) {
    const selectedOption = event.target.innerText;
    const correctAnswer = data.results[0].correct_answer;

    // Decodificar las respuestas para compararlas correctamente
    const tempElement = document.createElement('div');
    tempElement.innerHTML = correctAnswer;
    const decodedCorrectAnswer = tempElement.innerText;

    if (selectedOption === decodedCorrectAnswer) {
        score += 100;
        updateScore();
    }

    fetchTriviaQuestions();
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = score;
}

document.getElementById('submit-btn').addEventListener('click', fetchTriviaQuestions);

document.getElementById('restart-btn').addEventListener('click', () => {
    // Reiniciar el puntaje y cargar una nueva pregunta
    score = 0;
    updateScore();
    fetchTriviaQuestions();
});

// Cargar la primera pregunta al cargar la página
fetchTriviaQuestions();