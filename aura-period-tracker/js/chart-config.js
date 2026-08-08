// Chart.js Configuration for Peer Insights

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('symptomsChart');
    if (!ctx) return;

    // Chart Global Defaults
    Chart.defaults.color = '#6B5C7D';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cramps', 'Bloating', 'Fatigue', 'Cravings', 'Headache'],
            datasets: [
                {
                    label: 'Menstrual',
                    data: [85, 60, 80, 45, 55],
                    backgroundColor: '#E89CAE',
                    borderRadius: 4
                },
                {
                    label: 'Luteal',
                    data: [30, 82, 70, 85, 40],
                    backgroundColor: '#B5A8CE',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 31, 61, 0.9)',
                    padding: 12,
                    titleFont: { size: 14, family: 'Outfit' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}% of users`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(181, 168, 206, 0.2)' },
                    ticks: { callback: function(value) { return value + "%" } }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
});
