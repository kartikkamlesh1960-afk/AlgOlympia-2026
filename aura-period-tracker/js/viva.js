// Viva Practice Records - Mock Data with Rich Review Packets
const vivaRecords = [
    { 
        id: 1, 
        title: "Luteal Phase Progesterone Surge", 
        topic: "Hormones", 
        difficulty: "Hard", 
        source: "Clinical Guidelines", 
        status: "Needs Review", 
        notes: "Focus on corpus luteum degeneration and mood shifts.",
        packet: {
            keyQuestions: ["What triggers the degeneration of the corpus luteum?", "How does progesterone affect basal body temperature?", "Explain the mechanism of PMS symptoms in late luteal phase."],
            weakAreas: "Understanding the exact negative feedback loop of LH suppression.",
            evidence: "Williams Gynecology, 4th Ed., Chapter 15.",
            careerFields: "OB/GYN Residency, Reproductive Endocrinology",
            resumeChanges: "Added 'Advanced Endocrine Pathology' to Clinical Skills section.",
            nextAction: "Review LH/FSH feedback loop diagrams. Schedule a mock viva with Dr. Smith next week."
        }
    },
    { 
        id: 2, 
        title: "Endometriosis Pathology", 
        topic: "Pathology", 
        difficulty: "Medium", 
        source: "Medical Journal", 
        status: "Needs Review", 
        notes: "Review the Sampson's theory of retrograde menstruation.",
        packet: {
            keyQuestions: ["What is Sampson's theory?", "How do endometriomas form on the ovaries?", "What are the first-line medical treatments?"],
            weakAreas: "Differentiating deep infiltrating endometriosis from superficial implants.",
            evidence: "ACOG Practice Bulletin No. 114.",
            careerFields: "Gynecologic Surgery Fellowship",
            resumeChanges: "Highlight participation in 'Endometriosis Diagnostic Seminar'.",
            nextAction: "Create flashcards for medical vs surgical treatment protocols."
        }
    },
    { 
        id: 3, 
        title: "Pelvic Anatomy Walkthrough", 
        topic: "Anatomy", 
        difficulty: "Easy", 
        source: "Anatomy Textbook", 
        status: "Mastered", 
        notes: "Identify broad ligament and round ligament clearly.",
        packet: {
            keyQuestions: ["What structures are contained within the broad ligament?", "Describe the course of the uterine artery."],
            weakAreas: "None major. Slight hesitation on the ureter's relationship to the uterine artery.",
            evidence: "Netter's Atlas of Human Anatomy.",
            careerFields: "General Surgery, Pelvic Reconstruction",
            resumeChanges: "Added 'High-Yield Anatomy Peer Tutor' to extracurriculars.",
            nextAction: "Maintain mastery. Move on to complex vascular supply."
        }
    },
    { 
        id: 4, 
        title: "Estrogen Peak Symptoms", 
        topic: "Hormones", 
        difficulty: "Easy", 
        source: "Patient Data", 
        status: "Mastered", 
        notes: "Clear understanding of the follicular phase peak benefits.",
        packet: {
            keyQuestions: ["How does an estrogen peak affect cervical mucus?", "What is the role of estrogen in bone density?"],
            weakAreas: "None. Excellent clinical correlation provided during practice.",
            evidence: "Clinical Endocrinology Review 2025.",
            careerFields: "Women's Health Nurse Practitioner",
            resumeChanges: "Updated patient education competency to include hormonal counseling.",
            nextAction: "Review patient case study #4 to apply these concepts practically."
        }
    }
];

// Export Packet Logic
window.exportPacket = function(recordId) {
    const record = vivaRecords.find(r => r.id === recordId);
    if(!record || !record.packet) return;
    
    // Generate structured packet content
    const packetContent = `
===================================================
      VIVA BUDDY - PERSONALIZED REVIEW PACKET
===================================================

SESSION TITLE: ${record.title}
TOPIC: ${record.topic} | DIFFICULTY: ${record.difficulty}
DATE EXPORTED: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

---------------------------------------------------
[1] EDUCATION & CAREER TARGETS
---------------------------------------------------
${record.packet.careerFields}

---------------------------------------------------
[2] KEY QUESTIONS REVIEWED
---------------------------------------------------
${record.packet.keyQuestions.map(q => " • " + q).join('\n')}

---------------------------------------------------
[3] WEAK AREAS IDENTIFIED
---------------------------------------------------
${record.packet.weakAreas}

---------------------------------------------------
[4] SUPPORTING EVIDENCE & SOURCES
---------------------------------------------------
Source Type: ${record.source}
Reference: ${record.packet.evidence}

---------------------------------------------------
[5] TAILORED RESUME/KNOWLEDGE CHANGES
---------------------------------------------------
${record.packet.resumeChanges}

---------------------------------------------------
[6] NEXT RECOMMENDED ACTION (From Viva Buddy)
---------------------------------------------------
${record.packet.nextAction}

===================================================
"Keep up the great work! You're making progress." 
- Your Viva Buddy AI
===================================================
    `;

    // Trigger Download
    const blob = new Blob([packetContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Viva_Review_Packet_${record.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show a quick visual confirmation (optional if alert is too intrusive, but simple is good here)
    const btn = event.currentTarget;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" style="width:14px; margin-right:4px;"></i> Exported!`;
    lucide.createIcons();
    setTimeout(() => {
        btn.innerHTML = originalHtml;
        lucide.createIcons();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('viva-search');
    const topicFilter = document.getElementById('viva-topic');
    const diffFilter = document.getElementById('viva-difficulty');
    const statusFilter = document.getElementById('viva-status');
    const resetBtn = document.getElementById('viva-reset');
    
    const resultsContainer = document.getElementById('viva-results');
    const emptyState = document.getElementById('viva-empty');

    function renderViva() {
        if(!resultsContainer) return;

        const term = searchInput.value.toLowerCase();
        const topic = topicFilter.value;
        const diff = diffFilter.value;
        const status = statusFilter.value;

        const filtered = vivaRecords.filter(r => {
            const matchesSearch = r.title.toLowerCase().includes(term) || r.notes.toLowerCase().includes(term);
            const matchesTopic = topic === "" || r.topic === topic;
            const matchesDiff = diff === "" || r.difficulty === diff;
            const matchesStatus = status === "" || r.status === status;
            return matchesSearch && matchesTopic && matchesDiff && matchesStatus;
        });

        resultsContainer.innerHTML = '';

        if(filtered.length === 0) {
            resultsContainer.classList.add('hidden');
            emptyState.classList.remove('hidden');
        } else {
            resultsContainer.classList.remove('hidden');
            emptyState.classList.add('hidden');

            filtered.forEach(r => {
                let diffColor = r.difficulty === 'Hard' ? '#FF6B6B' : (r.difficulty === 'Medium' ? '#FFC107' : '#28A745');
                const cardHtml = `
                    <div class="glass-card viva-card fade-in">
                        <div class="viva-card-left">
                            <h4>${r.title}</h4>
                            <p>${r.notes}</p>
                            <div class="viva-tags">
                                <span class="viva-tag"><i data-lucide="book-open" style="width:14px; margin-right: 4px;"></i> ${r.source}</span>
                                <span class="viva-tag" style="color: ${diffColor};"><i data-lucide="bar-chart-2" style="width:14px; margin-right: 4px;"></i> ${r.difficulty}</span>
                            </div>
                        </div>
                        <div class="viva-card-right" style="display:flex; flex-direction:column; gap:1rem; align-items:flex-end;">
                            <span class="status-badge ${r.status === 'Mastered' ? 'badge-acted' : 'badge-review'}">${r.status}</span>
                            <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="exportPacket(${r.id})">
                                <i data-lucide="download" style="width:14px; margin-right:4px;"></i> Export Packet
                            </button>
                        </div>
                    </div>
                `;
                resultsContainer.insertAdjacentHTML('beforeend', cardHtml);
            });
        }
        
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    if(searchInput) {
        searchInput.addEventListener('input', renderViva);
        topicFilter.addEventListener('change', renderViva);
        diffFilter.addEventListener('change', renderViva);
        statusFilter.addEventListener('change', renderViva);

        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            topicFilter.value = '';
            diffFilter.value = '';
            statusFilter.value = '';
            renderViva();
        });

        // Initial render
        renderViva();
    }
});
