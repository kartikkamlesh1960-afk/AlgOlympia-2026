// App Logic, Navigation, and State Management

// DOM Elements
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const symptomPicker = document.getElementById('symptom-picker');
const logForm = document.getElementById('period-log-form');
const energySlider = document.getElementById('energy-slider');
const energyVal = document.getElementById('energy-val');
const smartInsightResult = document.getElementById('smart-insight-result');
const smartAnalysisText = document.getElementById('smart-analysis-text');

// State
let selectedSymptoms = [];
let currentPhaseKey = 'luteal'; // Default for demo

// Navigation Logic
function openSection(targetId) {
    sections.forEach(sec => sec.classList.remove('section-active', 'fade-in'));
    sections.forEach(sec => sec.classList.add('section-hidden'));
    
    const target = document.getElementById(targetId);
    if(target) {
        target.classList.remove('section-hidden');
        target.classList.add('section-active', 'fade-in');
    }

    navLinks.forEach(link => {
        if(link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openSection(e.target.getAttribute('data-target'));
    });
});

window.openLogModal = () => openSection('log');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Populate Date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);

    // Populate Symptoms
    AuraMockData.symptoms.forEach(sym => {
        const chip = document.createElement('div');
        chip.className = 'symptom-chip';
        chip.textContent = sym;
        chip.onclick = () => toggleSymptom(chip, sym);
        symptomPicker.appendChild(chip);
    });

    // Default Date for form
    document.getElementById('last-period').value = new Date(new Date().setDate(new Date().getDate() - 22)).toISOString().split('T')[0];

    updateDashboard(currentPhaseKey);
});

// Interactions
function toggleSymptom(chip, symptom) {
    chip.classList.toggle('selected');
    if (selectedSymptoms.includes(symptom)) {
        selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    } else {
        selectedSymptoms.push(symptom);
    }
}

energySlider.addEventListener('input', (e) => {
    const labels = ["Exhausted", "Low", "Moderate", "Good", "High"];
    energyVal.textContent = labels[e.target.value - 1];
});

// Form Submission & Reassurance Engine
logForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate AI / Smart Analysis processing
    const btn = logForm.querySelector('button');
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Analyzing...`;
    
    // Determine Phase based on input (Mock logic)
    const startDate = new Date(document.getElementById('last-period').value);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const cycleLength = parseInt(document.getElementById('cycle-length').value);
    
    let phase = 'menstrual';
    if(diffDays > 5 && diffDays <= 13) phase = 'follicular';
    if(diffDays > 13 && diffDays <= 16) phase = 'ovulatory';
    if(diffDays > 16) phase = 'luteal';

    currentPhaseKey = phase;

    setTimeout(() => {
        updateDashboard(phase);
        generateSmartInsight(phase);
        
        // Reinitialize icons inside new HTML
        lucide.createIcons();

        // Add New History Record
        const notes = document.getElementById('log-notes').value || 'No notes provided.';
        const statusVal = document.getElementById('log-status').value;
        
        let badgeClass = 'badge-review';
        if(statusVal.includes('Acted')) badgeClass = 'badge-acted';
        if(statusVal.includes('Escalated')) badgeClass = 'badge-escalated';
        if(statusVal.includes('Resolved')) badgeClass = 'badge-resolved';

        const energy = document.getElementById('energy-val').textContent;
        const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const symps = selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'None';

        const newRecordHtml = `
            <div class="glass-card history-record fade-in" style="border-left-color: var(--clr-rose-gold);">
                <div class="record-header">
                    <h4>${dateStr}</h4>
                    <span class="status-badge ${badgeClass}">${statusVal}</span>
                </div>
                <div class="record-body">
                    <p><strong>Symptoms:</strong> ${symps}</p>
                    <p><strong>Energy:</strong> ${energy}</p>
                    <p><strong>Notes:</strong> ${notes}</p>
                </div>
            </div>
        `;

        document.getElementById('history-records-container').insertAdjacentHTML('afterbegin', newRecordHtml);

        btn.innerHTML = `<i data-lucide="check"></i> Logged Successfully`;
        setTimeout(() => { btn.innerHTML = `Save Log & Get Insights`; }, 2000);
    }, 800);
});

function generateSmartInsight(phaseKey) {
    const data = AuraMockData.phases[phaseKey];
    let symptomContext = "";
    
    if(selectedSymptoms.length > 0) {
        symptomContext = `You noted feeling <strong>${selectedSymptoms.join(', ')}</strong>. `;
    }

    const html = `
        <p>${symptomContext}${data.desc}</p>
        <p class="highlight" style="font-weight: 600;">${data.stats} It is completely normal!</p>
        <div class="remedy-tags mt-6">
            ${data.remedies.map(r => `<span class="tag"><i data-lucide="${r.icon}"></i> ${r.text}</span>`).join('')}
        </div>
    `;

    smartAnalysisText.innerHTML = html;
    smartInsightResult.classList.remove('hidden');
}

function updateDashboard(phaseKey) {
    const data = AuraMockData.phases[phaseKey];
    const colors = {
        menstrual: 'var(--phase-menstrual)',
        follicular: 'var(--phase-follicular)',
        ovulatory: 'var(--phase-ovulatory)',
        luteal: 'var(--phase-luteal)'
    };

    // Update Ring
    const ring = document.getElementById('cycle-progress-ring');
    ring.style.stroke = colors[phaseKey];
    
    // Demo calculation for ring fill
    const offset = 565 - (565 * 0.7); // Just a visual mock (70%)
    ring.style.strokeDashoffset = offset;

    // Update Text
    document.getElementById('current-phase').textContent = phaseKey.charAt(0).toUpperCase() + phaseKey.slice(1);
    
    // Update Insight Card
    document.getElementById('daily-insight').innerHTML = `
        <div class="insight-illustration" style="background: ${colors[phaseKey]}33;">
            <i data-lucide="${getPhaseIcon(phaseKey)}" class="large-icon" style="color: ${colors[phaseKey]}"></i>
        </div>
        <h4>${data.title}</h4>
        <p>${data.desc} <strong>${data.stats}</strong></p>
        <div class="remedy-tags">
            ${data.remedies.map(r => `<span class="tag"><i data-lucide="${r.icon}"></i> ${r.text}</span>`).join('')}
        </div>
    `;

    // Trigger Fitness Update
    if(window.updateFitnessModule) {
        window.updateFitnessModule(phaseKey);
    }
    
    lucide.createIcons();
}

function getPhaseIcon(phase) {
    const icons = {
        menstrual: 'droplet',
        follicular: 'sun',
        ovulatory: 'flame',
        luteal: 'moon-star'
    };
    return icons[phase] || 'heart';
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = false;

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        themeToggle.innerHTML = isDarkMode ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
        lucide.createIcons();
    });
}

// Aesthetic Cursor Glow
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    
    if (cursorGlow) {
        cursorGlow.style.transform = `translate(calc(${glowX}px - 50%), calc(${glowY}px - 50%))`;
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();
