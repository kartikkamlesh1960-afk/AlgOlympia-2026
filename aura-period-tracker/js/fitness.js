// Fitness Module Logic

let currentWorkoutExercises = [];
let currentExerciseIndex = 0;
let timerInterval;
let timeLeft = 0;
let isPaused = false;

window.updateFitnessModule = function(phaseKey) {
    const fitnessData = window.AuraMockData.phases[phaseKey].fitness;
    currentWorkoutExercises = fitnessData.exercises;

    // Update UI elements
    document.getElementById('fitness-phase-badge').textContent = `${phaseKey.charAt(0).toUpperCase() + phaseKey.slice(1)} Phase`;
    document.getElementById('workout-title').textContent = fitnessData.title;
    document.getElementById('workout-desc').textContent = fitnessData.desc;

    // Update Metrics
    const metricsContainer = document.querySelector('.workout-metrics');
    metricsContainer.innerHTML = `
        <div class="metric"><i data-lucide="clock"></i> ${fitnessData.metrics[0]}</div>
        <div class="metric"><i data-lucide="flame"></i> ${fitnessData.metrics[1]}</div>
        <div class="metric"><i data-lucide="accessibility"></i> ${fitnessData.metrics[2]}</div>
    `;

    // Update List
    const routineList = document.getElementById('routine-list');
    routineList.innerHTML = '';
    
    fitnessData.exercises.forEach((ex, index) => {
        const li = document.createElement('li');
        const mins = Math.floor(ex.duration / 60);
        const secs = ex.duration % 60;
        const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        
        li.innerHTML = `
            <div class="step-num">${index + 1}</div>
            <div style="flex:1;">
                <h4 style="margin:0">${ex.name}</h4>
            </div>
            <div style="font-weight:600; color:var(--text-muted);">${timeStr}</div>
        `;
        routineList.appendChild(li);
    });

    // Reinit icons
    lucide.createIcons();
}

// Workout Player Controls
const startBtn = document.getElementById('start-workout-btn');
const overlay = document.getElementById('workout-overlay');
const closeBtn = document.getElementById('close-workout');
const timerDisplay = document.getElementById('workout-timer');
const progressBar = document.getElementById('workout-progress');
const exName = document.getElementById('active-exercise-name');
const toggleBtn = document.getElementById('toggle-timer');

startBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    currentExerciseIndex = 0;
    startExercise();
});

closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    clearInterval(timerInterval);
});

document.getElementById('next-exercise').addEventListener('click', () => {
    if(currentExerciseIndex < currentWorkoutExercises.length - 1) {
        currentExerciseIndex++;
        startExercise();
    }
});

document.getElementById('prev-exercise').addEventListener('click', () => {
    if(currentExerciseIndex > 0) {
        currentExerciseIndex--;
        startExercise();
    }
});

toggleBtn.addEventListener('click', () => {
    if(isPaused) {
        isPaused = false;
        toggleBtn.innerHTML = `<i data-lucide="pause"></i>`;
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        isPaused = true;
        toggleBtn.innerHTML = `<i data-lucide="play"></i>`;
        clearInterval(timerInterval);
    }
    lucide.createIcons();
});

function startExercise() {
    clearInterval(timerInterval);
    isPaused = false;
    toggleBtn.innerHTML = `<i data-lucide="pause"></i>`;
    lucide.createIcons();
    
    const ex = currentWorkoutExercises[currentExerciseIndex];
    exName.textContent = ex.name;
    timeLeft = ex.duration;
    
    updateDisplay();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(timerInterval);
        // Move to next exercise automatically
        if(currentExerciseIndex < currentWorkoutExercises.length - 1) {
            currentExerciseIndex++;
            startExercise();
        } else {
            exName.textContent = "Workout Complete!";
            timerDisplay.textContent = "Great job!";
            progressBar.style.width = "100%";
            toggleBtn.style.display = "none";
        }
    }
}

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const total = currentWorkoutExercises[currentExerciseIndex].duration;
    const progress = ((total - timeLeft) / total) * 100;
    progressBar.style.width = `${progress}%`;
}
