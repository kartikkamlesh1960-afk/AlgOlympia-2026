// Mock Data for Hackathon Presentation
const mockSymptoms = [
    "Cramps", "Bloating", "Headache", "Acne", "Backache", 
    "Tender Breasts", "Nausea", "Fatigue", "Cravings", 
    "Anxiety", "Mood Swings", "Irritability"
];

const phaseExplanations = {
    menstrual: {
        title: "Rest & Recover",
        desc: "Estrogen and progesterone are at their lowest. Your uterine lining is shedding, which can cause cramps and fatigue.",
        stats: "82% of users experience fatigue on Day 1-2.",
        remedies: [
            { icon: "cup-soda", text: "Chamomile Tea" },
            { icon: "flame", text: "Heat Pad" }
        ],
        fitness: {
            title: "Restorative Flow & Stretch",
            desc: "Energy is typically lowest now. Focus on gentle movements that relieve pelvic tension.",
            metrics: ["15 Mins", "Low Intensity", "Flexibility"],
            exercises: [
                { name: "Child's Pose", duration: 60 },
                { name: "Cat-Cow Stretch", duration: 60 },
                { name: "Supine Twist", duration: 60 },
                { name: "Deep Belly Breathing", duration: 60 }
            ]
        }
    },
    follicular: {
        title: "Rising Energy",
        desc: "Estrogen levels are rising, boosting your mood, energy, and cognitive function.",
        stats: "75% of users report their highest energy levels this week.",
        remedies: [
            { icon: "sun", text: "Get Sunlight" },
            { icon: "brain", text: "Start Projects" }
        ],
        fitness: {
            title: "Cardio & Mat Pilates",
            desc: "Your energy is bouncing back. It's a great time for moderate cardio and building core strength.",
            metrics: ["30 Mins", "Medium Intensity", "Core & Cardio"],
            exercises: [
                { name: "Brisk Walk / Jog", duration: 300 },
                { name: "Pilates Hundreds", duration: 60 },
                { name: "Glute Bridges", duration: 60 },
                { name: "Plank Variations", duration: 60 }
            ]
        }
    },
    ovulatory: {
        title: "Peak Performance",
        desc: "Estrogen peaks and testosterone rises slightly. You might feel highly sociable and energetic.",
        stats: "68% of users feel most confident during ovulation.",
        remedies: [
            { icon: "droplets", text: "Hydrate" },
            { icon: "activity", text: "Socialize" }
        ],
        fitness: {
            title: "High Energy HIIT",
            desc: "Your body is primed for high-intensity exercise and heavy lifting. Capitalize on this peak energy!",
            metrics: ["25 Mins", "High Intensity", "Full Body"],
            exercises: [
                { name: "Jumping Jacks", duration: 45 },
                { name: "Squat Jumps", duration: 45 },
                { name: "Mountain Climbers", duration: 45 },
                { name: "Burpees", duration: 30 }
            ]
        }
    },
    luteal: {
        title: "Wind Down & Nurture",
        desc: "Progesterone rises and peaks. It has a sedating effect, which can lead to lower energy, bloating, or PMS symptoms.",
        stats: "89% of users notice mood shifts or cravings in the late luteal phase.",
        remedies: [
            { icon: "moon", text: "Prioritize Sleep" },
            { icon: "cookie", text: "Magnesium Rich Foods" }
        ],
        fitness: {
            title: "Low-Impact Resistance",
            desc: "As energy drops, switch to low-impact strength training or steady-state walks to avoid spiking cortisol.",
            metrics: ["20 Mins", "Low-Medium Intensity", "Strength"],
            exercises: [
                { name: "Bodyweight Squats", duration: 60 },
                { name: "Resistance Band Rows", duration: 60 },
                { name: "Walking Lunges", duration: 60 },
                { name: "Standing Core Twists", duration: 45 }
            ]
        }
    }
};

window.AuraMockData = {
    symptoms: mockSymptoms,
    phases: phaseExplanations
};
