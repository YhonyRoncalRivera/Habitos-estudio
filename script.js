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
const continueRoutineBtn = document.getElementById('continue-routine-btn');

// Mostrar el puntaje máximo al cargar
if (maxScoreValue) {
    maxScoreValue.textContent = maxScore;
}

// Verificar si existe una rutina guardada al cargar la página
function checkSavedRoutine() {
    const savedRoutine = localStorage.getItem('studyRoutine');
    const savedUserData = localStorage.getItem('userData');
    
    if (savedRoutine && savedUserData) {
        // Verificar si el usuario actual coincide con el guardado
        const userData = JSON.parse(savedUserData);
        const currentUserName = usernameInput.value.trim() || "Estudiante";
        const currentUserAvatar = avatarSelect.value;
        
        if (userData.name === currentUserName && userData.avatar === currentUserAvatar) {
            continueRoutineBtn.classList.remove('hidden');
        } else {
            continueRoutineBtn.classList.add('hidden');
        }
    } else {
        continueRoutineBtn.classList.add('hidden');
    }
}

// Función para limpiar completamente los datos
function clearAllData() {
    localStorage.removeItem('studyRoutine');
    localStorage.removeItem('userData');
    localStorage.removeItem('maxScore');
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    routineData = null;
    currentRoutine = null;
}

// Llamar a la función al cargar la página
checkSavedRoutine();

// Event listeners para detectar cambios en el usuario
usernameInput.addEventListener('input', checkSavedRoutine);
avatarSelect.addEventListener('change', checkSavedRoutine);

// Cambia el avatar de la pantalla de bienvenida al seleccionar
avatarSelect.onchange = () => {
    avatarImg.src = avatarSelect.value;
};

startBtn.onclick = () => {
    userName = usernameInput.value.trim() || "Estudiante";
    userAvatar = avatarSelect.value;
    
    // Limpiar datos del cuestionario anterior
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    
    // Guardar datos del usuario
    const userData = {
        name: userName,
        avatar: userAvatar
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
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
        <b>¡Desafío Académico terminado, ${userName}!</b><br>
        Tu puntaje es <b>${score}</b> de <b>${questions.length * 100}</b>.<br>
        <span style="font-size:1.1em;">${getResultMessage(score)}</span>
        <br><br>
        <button id="start-routine-btn" style="margin-top: 20px; padding: 12px 24px; border: 3px solid #fff; background: #6c63ff; color: #fff; font-family: 'Press Start 2P', cursive, Arial, sans-serif; font-size: 0.8em; cursor: pointer; transition: all 0.2s ease; outline: none; text-shadow: 2px 2px 0 #000; box-shadow: 0 0 0 4px #181825, 0 0 8px #6c63ff; border-radius: 5px;">
            <span>📚</span> Ver mi rutina de estudio personalizada
        </button>
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
    
    // Agregar event listener al botón de rutina
    setTimeout(() => {
        const startRoutineBtn = document.getElementById('start-routine-btn');
        if (startRoutineBtn) {
            startRoutineBtn.addEventListener('click', showRoutine);
        }
    }, 100);
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
    selectedOption = null;
    resultEl.classList.add('hidden');
    restartBtn.classList.add('hidden');
    studyRoutineEl.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    progressBarContainer.classList.add('hidden');
    quizContainer.classList.add('hidden');
    usernameInput.value = "";
    usernameInput.focus();
    
    // Limpiar opciones seleccionadas
    if (optionsEl) {
        optionsEl.innerHTML = '';
    }
    
    // Verificar si hay rutina guardada para mostrar el botón
    checkSavedRoutine();
    
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

// ===== SISTEMA DE RUTINAS DE ESTUDIO =====

// Elementos del DOM para rutinas
const studyRoutineEl = document.getElementById('study-routine');
const routineAvatar = document.getElementById('routine-avatar');
const routineScore = document.getElementById('routine-score');
const completionPercentage = document.getElementById('completion-percentage');
const completedDays = document.getElementById('completed-days');
const remainingDays = document.getElementById('remaining-days');
const calendarGrid = document.getElementById('calendar-grid');
const markTodayBtn = document.getElementById('mark-today-btn');
const resetRoutineBtn = document.getElementById('reset-routine-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const finalResult = document.getElementById('final-result');
const finalPercentage = document.getElementById('final-percentage');
const finalMessage = document.getElementById('final-message');
const newRoutineBtn = document.getElementById('new-routine-btn');

// Datos de rutinas
let currentRoutine = null;
let routineData = null;

// Rutinas personalizadas basadas en puntaje
const routineTemplates = {
    excellent: {
        name: "Rutina Avanzada",
        description: "Para estudiantes con excelentes hábitos",
        objectives: [
            "Estudiar 3 horas - Repasar temas complejos",
            "Estudiar 3 horas - Practicar ejercicios avanzados",
            "Estudiar 2.5 horas - Crear mapas conceptuales",
            "Estudiar 3 horas - Resolver problemas difíciles",
            "Estudiar 2.5 horas - Enseñar conceptos a otros",
            "Estudiar 3 horas - Investigar temas adicionales",
            "Estudiar 2.5 horas - Preparar presentaciones",
            "Estudiar 3 horas - Simular exámenes",
            "Estudiar 2.5 horas - Crear resúmenes avanzados",
            "Estudiar 3 horas - Practicar técnicas de memorización",
            "Estudiar 2.5 horas - Analizar casos de estudio",
            "Estudiar 3 horas - Desarrollar proyectos",
            "Estudiar 2.5 horas - Revisar literatura adicional",
            "Estudiar 3 horas - Practicar habilidades críticas",
            "Estudiar 2.5 horas - Crear material didáctico",
            "Estudiar 3 horas - Participar en debates académicos",
            "Estudiar 2.5 horas - Escribir ensayos",
            "Estudiar 3 horas - Realizar experimentos",
            "Estudiar 2.5 horas - Preparar conferencias",
            "Estudiar 3 horas - Evaluar progreso",
            "Estudiar 2.5 horas - Día final"
        ]
    },
    good: {
        name: "Rutina Intermedia",
        description: "Para estudiantes con buenos hábitos",
        objectives: [
            "Estudiar 2.5 horas - Repasar temas principales",
            "Estudiar 2.5 horas - Practicar ejercicios básicos",
            "Estudiar 2 horas - Crear apuntes organizados",
            "Estudiar 2.5 horas - Resolver problemas",
            "Estudiar 2 horas - Explicar conceptos",
            "Estudiar 2.5 horas - Investigar dudas",
            "Estudiar 2 horas - Preparar resúmenes",
            "Estudiar 2.5 horas - Practicar exámenes",
            "Estudiar 2 horas - Crear mapas mentales",
            "Estudiar 2.5 horas - Revisar material anterior",
            "Estudiar 2 horas - Buscar recursos adicionales",
            "Estudiar 2.5 horas - Practicar técnicas de estudio",
            "Estudiar 2 horas - Organizar información",
            "Estudiar 2.5 horas - Resolver dudas complejas",
            "Estudiar 2 horas - Crear fichas de estudio",
            "Estudiar 2.5 horas - Participar en grupos de estudio",
            "Estudiar 2 horas - Escribir reflexiones",
            "Estudiar 2.5 horas - Realizar autoevaluaciones",
            "Estudiar 2 horas - Planificar próximos temas",
            "Estudiar 2.5 horas - Día final"
        ]
    },
    basic: {
        name: "Rutina Básica",
        description: "Para estudiantes que necesitan fortalecer hábitos",
        objectives: [
            "Estudiar 2 horas - Crear espacio de estudio",
            "Estudiar 2 horas - Establecer horario fijo",
            "Estudiar 1.5 horas - Tomar apuntes básicos",
            "Estudiar 2 horas - Repasar temas simples",
            "Estudiar 1.5 horas - Practicar concentración",
            "Estudiar 2 horas - Buscar lugar tranquilo",
            "Estudiar 1.5 horas - Crear rutina diaria",
            "Estudiar 2 horas - Eliminar distracciones",
            "Estudiar 1.5 horas - Tomar descansos regulares",
            "Estudiar 2 horas - Repasar lo aprendido",
            "Estudiar 1.5 horas - Pedir ayuda cuando sea necesario",
            "Estudiar 2 horas - Practicar técnicas básicas",
            "Estudiar 1.5 horas - Organizar material",
            "Estudiar 2 horas - Crear resúmenes simples",
            "Estudiar 1.5 horas - Establecer metas pequeñas",
            "Estudiar 2 horas - Celebrar logros",
            "Estudiar 1.5 horas - Mantener constancia",
            "Estudiar 2 horas - Evaluar progreso",
            "Estudiar 1.5 horas - Planificar siguiente semana",
            "Estudiar 2 horas - Día final"
        ]
    },
    beginner: {
        name: "Rutina Inicial",
        description: "Para estudiantes que están comenzando",
        objectives: [
            "Estudiar 1 hora - Encontrar lugar de estudio",
            "Estudiar 1 hora - Establecer horario básico",
            "Estudiar 45 min - Eliminar distracciones",
            "Estudiar 1 hora - Crear ambiente tranquilo",
            "Estudiar 45 min - Tomar apuntes simples",
            "Estudiar 1 hora - Repasar temas básicos",
            "Estudiar 45 min - Practicar concentración",
            "Estudiar 1 hora - Establecer rutina",
            "Estudiar 45 min - Tomar descansos",
            "Estudiar 1 hora - Repasar lo aprendido",
            "Estudiar 45 min - Pedir ayuda",
            "Estudiar 1 hora - Practicar técnicas simples",
            "Estudiar 45 min - Organizar material",
            "Estudiar 1 hora - Crear resúmenes básicos",
            "Estudiar 45 min - Establecer metas pequeñas",
            "Estudiar 1 hora - Celebrar progreso",
            "Estudiar 45 min - Mantener constancia",
            "Estudiar 1 hora - Evaluar avance",
            "Estudiar 45 min - Planificar siguiente paso",
            "Estudiar 1 hora - Día final"
        ]
    }
};

// Función para generar rutina basada en puntaje
function generateRoutine(score) {
    let template;
    if (score >= 1300) {
        template = routineTemplates.excellent;
    } else if (score >= 900) {
        template = routineTemplates.good;
    } else if (score >= 450) {
        template = routineTemplates.basic;
    } else {
        template = routineTemplates.beginner;
    }

    const startDate = new Date();
    const routine = {
        template: template,
        startDate: startDate.toISOString(),
        completedDays: [],
        currentDay: 0
    };

    return routine;
}

// Función para mostrar la rutina
function showRoutine() {
    resultEl.classList.add('hidden');
    studyRoutineEl.classList.remove('hidden');
    
    // Guardar datos del usuario si no están guardados
    const userData = {
        name: userName,
        avatar: userAvatar
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    routineAvatar.src = userAvatar;
    routineScore.textContent = score;
    
    // Crear nueva rutina basada en el puntaje actual
    currentRoutine = generateRoutine(score);
    routineData = currentRoutine;
    localStorage.setItem('studyRoutine', JSON.stringify(routineData));
    
    updateRoutineDisplay();
    createCalendar();
}

// Función para actualizar la visualización de la rutina
function updateRoutineDisplay() {
    const completedCount = routineData.completedDays.length;
    const totalDays = 21;
    const percentage = Math.round((completedCount / totalDays) * 100);
    
    completionPercentage.textContent = `${percentage}%`;
    completedDays.textContent = completedCount;
    remainingDays.textContent = totalDays - completedCount;
    
    // Actualizar círculo de progreso
    const progressCircle = document.querySelector('.progress-circle');
    progressCircle.style.background = `conic-gradient(#4caf50 0deg, #4caf50 ${percentage * 3.6}deg, #333 ${percentage * 3.6}deg)`;
    
    // Verificar si la rutina está completada
    if (completedCount >= totalDays) {
        showFinalResult();
    }
}

// Función auxiliar para obtener el objetivo del día
function getDayObjective(day) {
    if (currentRoutine.template && currentRoutine.template.objectives) {
        return currentRoutine.template.objectives[day - 1] || 'Día final';
    } else if (currentRoutine.objectives) {
        return currentRoutine.objectives[day - 1] || 'Día final';
    }
    return 'Día final';
}

// Función para crear el calendario
function createCalendar() {
    calendarGrid.innerHTML = '';
    
    for (let day = 1; day <= 21; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.setAttribute('data-day', day);
        
        const isCompleted = routineData.completedDays.includes(day);
        const isToday = day === routineData.currentDay + 1;
        
        if (isCompleted) {
            dayElement.classList.add('completed');
        } else if (isToday) {
            dayElement.classList.add('today');
        }
        
        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-objective">${getDayObjective(day)}</div>
        `;
        
        dayElement.addEventListener('click', () => toggleDay(day));
        calendarGrid.appendChild(dayElement);
    }
}

// Función para marcar/desmarcar un día
function toggleDay(day) {
    const dayIndex = routineData.completedDays.indexOf(day);
    
    if (dayIndex === -1) {
        // Marcar como completado
        routineData.completedDays.push(day);
        routineData.completedDays.sort((a, b) => a - b);
    } else {
        // Desmarcar
        routineData.completedDays.splice(dayIndex, 1);
    }
    
    localStorage.setItem('studyRoutine', JSON.stringify(routineData));
    updateRoutineDisplay();
    createCalendar();
}

// Función para marcar el día actual
function markToday() {
    const today = routineData.currentDay + 1;
    if (!routineData.completedDays.includes(today)) {
        routineData.completedDays.push(today);
        routineData.completedDays.sort((a, b) => a - b);
        localStorage.setItem('studyRoutine', JSON.stringify(routineData));
        updateRoutineDisplay();
        createCalendar();
        
        // Mostrar confirmación
        markTodayBtn.textContent = '✅ ¡Completado!';
        setTimeout(() => {
            markTodayBtn.innerHTML = '<span>✅</span> Marcar día actual como completado';
        }, 2000);
    }
}

// Función para reiniciar la rutina
function resetRoutine() {
    if (confirm('¿Estás seguro de que quieres reiniciar la rutina? Se perderá todo el progreso.')) {
        routineData = generateRoutine(score);
        localStorage.setItem('studyRoutine', JSON.stringify(routineData));
        currentRoutine = routineData.template;
        updateRoutineDisplay();
        createCalendar();
        finalResult.classList.add('hidden');
    }
}

// Función para mostrar resultado final
function showFinalResult() {
    const completedCount = routineData.completedDays.length;
    const percentage = Math.round((completedCount / 21) * 100);
    
    finalPercentage.textContent = `${percentage}%`;
    
    let message = '';
    if (percentage >= 90) {
        message = '¡Excelente! Has demostrado una constancia excepcional. Eres un ejemplo de disciplina y dedicación. 🎉';
    } else if (percentage >= 70) {
        message = '¡Muy bien! Has mostrado un buen compromiso con tu rutina. Sigue así y verás grandes resultados. 👍';
    } else if (percentage >= 50) {
        message = '¡Bien! Has completado más de la mitad de la rutina. Con un poco más de esfuerzo lograrás excelentes resultados. 💪';
    } else {
        message = 'Has completado parte de la rutina. Recuerda que la constancia es clave para formar hábitos sólidos. ¡No te rindas! 🌟';
    }
    
    finalMessage.textContent = message;
    finalResult.classList.remove('hidden');
}

// Función para comenzar nueva rutina
function startNewRoutine() {
    routineData = generateRoutine(score);
    localStorage.setItem('studyRoutine', JSON.stringify(routineData));
    currentRoutine = routineData.template;
    finalResult.classList.add('hidden');
    updateRoutineDisplay();
    createCalendar();
}

// Event listeners para rutinas
markTodayBtn.addEventListener('click', markToday);
resetRoutineBtn.addEventListener('click', resetRoutine);
newRoutineBtn.addEventListener('click', startNewRoutine);

// Función para volver al menú principal
function backToMenu() {
    studyRoutineEl.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    checkSavedRoutine();
    if (typeof footerText !== 'undefined' && footerText !== null) {
        footerText.classList.remove('hidden');
    }
}

// Event listener para volver al menú
backToMenuBtn.addEventListener('click', backToMenu);

// Función para acceder directamente a la rutina
function continueRoutine() {
    const savedRoutine = localStorage.getItem('studyRoutine');
    const savedUserData = localStorage.getItem('userData');
    
    if (savedRoutine && savedUserData) {
        routineData = JSON.parse(savedRoutine);
        currentRoutine = routineData.template;
        
        // Verificar si es el mismo usuario
        const userData = JSON.parse(savedUserData);
        const currentUserName = usernameInput.value.trim() || "Estudiante";
        const currentUserAvatar = avatarSelect.value;
        
        // Si es un usuario diferente, limpiar la rutina anterior
        if (userData.name !== currentUserName || userData.avatar !== currentUserAvatar) {
            // Limpiar rutina anterior y crear nueva
            localStorage.removeItem('studyRoutine');
            alert('Usuario diferente detectado. Se creará una nueva rutina después del cuestionario.');
            return;
        }
        
        userName = userData.name;
        userAvatar = userData.avatar;
        
        welcomeScreen.classList.add('hidden');
        studyRoutineEl.classList.remove('hidden');
        routineAvatar.src = userAvatar;
        routineScore.textContent = "Rutina existente";
        
        updateRoutineDisplay();
        createCalendar();
        
        if (typeof footerText !== 'undefined' && footerText !== null) {
            footerText.classList.add('hidden');
        }
    }
}

// Event listener para el botón de continuar rutina
continueRoutineBtn.addEventListener('click', continueRoutine);