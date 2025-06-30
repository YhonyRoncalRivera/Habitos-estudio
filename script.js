const questions = [
    {
        question: "¿Estudias en un lugar libre de distracciones?",
        options: ["Siempre", "A veces", "Nunca"],
        answer: 0,
        medium: 1,
        explanation: "Estudiar sin distracciones mejora la concentración y el rendimiento."
    },
    {
        question: "¿Tienes un horario fijo para estudiar?",
        options: ["Sí", "No", "Depende del día"],
        answer: 0,
        medium: 2,
        explanation: "Tener un horario fijo ayuda a crear un hábito y aprovechar mejor el tiempo."
    },
    {
        question: "¿Tomas descansos durante tus sesiones de estudio?",
        options: ["Sí, regularmente", "Solo cuando me canso", "No, estudio de corrido"],
        answer: 0,
        medium: 1,
        explanation: "Los descansos cortos mejoran la retención y evitan el agotamiento."
    },
    {
        question: "¿Sueles repasar lo aprendido después de clase?",
        options: ["Sí, siempre", "A veces", "No"],
        answer: 0,
        medium: 1,
        explanation: "Repasar refuerza la memoria y ayuda a identificar dudas a tiempo."
    },
    {
        question: "¿Tienes conocimientos sobre los hábitos de estudio?",
        options: ["Sí, bastante", "Un poco", "No mucho"],
        answer: 0,
        medium: 1,
        explanation: "Conocer sobre hábitos de estudio te ayuda a mejorar tu rendimiento académico." 
    },
    {
        question: "¿Cuánto tiempo estudias semanalmente?",
        options: ["Más de 10 horas", "Entre 5 y 10 horas", "Menos de 5 horas"],
        answer: 0,
        medium: 1,
        explanation: "Estudiar más de 10 horas a la semana suele ser ideal para un buen desempeño." 
    },
    {
        question: "¿Prefieres estudiar de día o de noche?",
        options: ["De día", "De noche", "Ambos"],
        answer: 0,
        medium: 2,
        explanation: "Estudiar de día suele ser más efectivo por la luz natural y menos fatiga." 
    },
    {
        question: "¿Cuánto tiempo puedes durar sin distracciones?",
        options: ["Más de 1 hora", "30 minutos", "Menos de 30 minutos"],
        answer: 0,
        medium: 1,
        explanation: "Poder concentrarse más de una hora seguida es una gran habilidad para el estudio." 
    },
    {
        question: "¿Cuántas horas libres al día tienes?",
        options: ["Más de 4 horas", "2-4 horas", "Menos de 2 horas"],
        answer: 0,
        medium: 1,
        explanation: "Tener tiempo libre suficiente ayuda a organizar mejor el estudio y el descanso." 
    },
    {
        question: "¿Qué tan frecuente tomas apuntes?",
        options: ["Siempre", "A veces", "Nunca"],
        answer: 0,
        medium: 1,
        explanation: "Tomar apuntes frecuentemente mejora la retención y comprensión de los temas." 
    },
    {
        question: "¿Tienes un lugar fijo de estudio?",
        options: ["Sí", "No", "A veces"],
        answer: 0,
        medium: 2,
        explanation: "Tener un lugar fijo ayuda a asociar ese espacio con concentración y estudio." 
    },
    {
        question: "¿Qué acción fortalece la memoria?",
        options: ["Repasar y practicar", "Solo leer una vez", "No hacer nada especial"],
        answer: 0,
        medium: 1,
        explanation: "Repasar y practicar refuerza la memoria a largo plazo." 
    },
    {
        question: "¿Por qué es importante dormir bien?",
        options: ["Porque consolida el aprendizaje", "Solo para descansar", "No es tan importante"],
        answer: 0,
        medium: 1,
        explanation: "Dormir bien ayuda a consolidar lo aprendido y mejora el rendimiento." 
    },
    {
        question: "¿Qué hacer si no se entiende un tema?",
        options: ["Buscar ayuda o recursos", "Ignorarlo", "Esperar a la siguiente clase"],
        answer: 0,
        medium: 2,
        explanation: "Buscar ayuda o recursos permite aclarar dudas y avanzar en el aprendizaje." 
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let userName = "";
let userAvatar = "";
let maxScore = parseInt(localStorage.getItem('maxScore')) || 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const startBtn = document.getElementById('start-btn');
const usernameInput = document.getElementById('username');
const avatarSelect = document.getElementById('avatar-select');
const avatarImg = document.getElementById('avatar-img');
const quizContainer = document.getElementById('quiz-container');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const userInfo = document.getElementById('user-info');
const userAvatarImg = document.getElementById('user-avatar');
const userNameSpan = document.getElementById('user-name');
const maxScoreValue = document.getElementById('max-score-value');
const footerText = document.getElementById('footer-text');

// Mostrar el puntaje máximo al cargar
if (maxScoreValue) {
    maxScoreValue.textContent = maxScore;
}

// Cambia el avatar de la pantalla de bienvenida al seleccionar
avatarSelect.onchange = () => {
    avatarImg.src = avatarSelect.value;
};

startBtn.onclick = () => {
    userName = usernameInput.value.trim() || "Estudiante";
    userAvatar = avatarSelect.value;
    welcomeScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    progressBarContainer.classList.remove('hidden');
    userAvatarImg.src = userAvatar;
    userNameSpan.textContent = userName;
    userAvatarImg.alt = "Avatar de " + userName;
    showQuestion();
    updateProgressBar();
    nextBtn.focus();
    if (typeof footerText !== 'undefined' && footerText !== null) {
        footerText.classList.add('hidden');
    }
};

function showQuestion() {
    // Animación de desvanecimiento
    questionEl.style.opacity = 0;
    setTimeout(() => {
        const q = questions[currentQuestion];
        questionEl.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}: ${q.question}`;
        optionsEl.innerHTML = '';
        selectedOption = null;
        nextBtn.disabled = true;

        q.options.forEach((option, idx) => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.setAttribute('tabindex', 0);
            btn.setAttribute('aria-label', option);
            btn.onclick = () => selectOption(idx, btn);
            btn.onkeyup = (e) => {
                if (e.key === "Enter" || e.key === " ") btn.click();
            };
            optionsEl.appendChild(btn);
        });

        questionEl.style.opacity = 1;
    }, 200);
    updateProgressBar();
}

function selectOption(idx, btn) {
    if (selectedOption !== null) return; // Evita doble selección

    selectedOption = idx;
    nextBtn.disabled = false;

    // Retroalimentación visual
    Array.from(optionsEl.children).forEach((b, i) => {
        b.classList.remove('selected', 'correct', 'incorrect', 'medium');
        if (i === questions[currentQuestion].answer) {
            b.classList.add('correct');
        } else if (i === questions[currentQuestion].medium) {
            b.classList.add('medium');
        }
        if (i === selectedOption && i !== questions[currentQuestion].answer && i !== questions[currentQuestion].medium) {
            b.classList.add('incorrect');
        }
        if (i === selectedOption) {
            b.classList.add('selected');
        }
        b.disabled = true; // Desactiva botones tras selección
    });

    // Muestra explicación
    const exp = document.createElement('div');
    exp.textContent = questions[currentQuestion].explanation;
    exp.style.marginTop = "10px";
    exp.style.fontStyle = "italic";
    exp.style.opacity = 0;
    exp.setAttribute('aria-live', 'polite');
    optionsEl.appendChild(exp);
    setTimeout(() => { exp.style.opacity = 1; }, 100);
}

nextBtn.onclick = () => {
    if (selectedOption === questions[currentQuestion].answer) {
        score += 100;
    } else if (selectedOption === questions[currentQuestion].medium) {
        score += 50;
    } // incorrecta suma 0
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizContainer.classList.add('hidden');
    resultEl.classList.remove('hidden');
    progressBarContainer.classList.add('hidden');
    resultEl.innerHTML = `
        <img src="${userAvatar}" alt="Avatar resultado" width="60" height="60" style="border-radius:50%;border:2px solid #0077cc;margin-bottom:10px;">
        <br>
        <b>¡Juego terminado, ${userName}!</b><br>
        Tu puntaje es <b>${score}</b> de <b>${questions.length * 100}</b>.<br>
        <span style="font-size:1.1em;">${getResultMessage(score)}</span>
    `;
    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem('maxScore', maxScore);
        if (maxScoreValue) {
            maxScoreValue.textContent = maxScore;
        }
    }
    restartBtn.classList.remove('hidden');
    restartBtn.focus();
    if (typeof footerText !== 'undefined' && footerText !== null) {
        footerText.classList.remove('hidden');
    }
}

function getResultMessage(score) {
    if (score >= 1300) {
        return `¡Excelente! Tienes hábitos de estudio ejemplares. Sigue así, mantén tu constancia y busca siempre nuevos retos para potenciar tu aprendizaje. Recuerda compartir tus buenas prácticas con tus compañeros. 🎉`;
    } else if (score >= 900) {
        return `¡Muy bien! Tus hábitos de estudio son sólidos, pero aún puedes perfeccionarlos. Intenta organizar mejor tu tiempo, mantén un lugar fijo de estudio y no olvides tomar descansos activos. Considera explorar nuevas técnicas de memorización y repaso para avanzar aún más. 👍`;
    } else if (score >= 450) {
        return `¡Bien! Vas por buen camino, pero hay áreas que puedes mejorar. Te recomendamos establecer un horario regular, evitar distracciones, tomar apuntes y buscar ayuda cuando lo necesites. Intenta repasar lo aprendido cada día y prioriza dormir bien para consolidar tus conocimientos. 💡`;
    } else if (score >= 100) {
        return `¡Ánimo! Es un buen momento para fortalecer tus hábitos de estudio. Empieza por crear un espacio fijo y libre de distracciones, organiza tu tiempo, toma apuntes y repasa frecuentemente. No dudes en pedir ayuda si algo no queda claro y recuerda que la constancia es clave para mejorar. 🚀`;
    } else {
        return `¡Vamos! Es importante que trabajes en tus hábitos de estudio. Intenta establecer rutinas, buscar un lugar adecuado, evitar distracciones y pedir apoyo cuando lo necesites. Cada pequeño cambio suma para tu aprendizaje.`;
    }
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add('hidden');
    restartBtn.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    progressBarContainer.classList.add('hidden');
    quizContainer.classList.add('hidden');
    usernameInput.value = "";
    usernameInput.focus();
    if (typeof footerText !== 'undefined' && footerText !== null) {
        footerText.classList.remove('hidden');
    }
}

restartBtn.onclick = restartGame;

function updateProgressBar() {
    const percent = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = percent + "%";
    progressText.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
}