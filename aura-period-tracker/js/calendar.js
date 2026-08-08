// Calendar Module Logic

let currentCalDate = new Date(); // Tracks the currently viewed month

document.addEventListener('DOMContentLoaded', () => {
    // Check if on calendar page
    renderCalendar();

    document.getElementById('prev-month').addEventListener('click', () => {
        currentCalDate.setMonth(currentCalDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentCalDate.setMonth(currentCalDate.getMonth() + 1);
        renderCalendar();
    });
});

// Using mocked user data for predictions
// Real app would fetch this from state/backend
const getMockUserData = () => {
    return {
        lastPeriod: new Date(new Date().setDate(new Date().getDate() - 22)), // 22 days ago
        cycleLength: 28,
        periodDuration: 5
    };
};

function renderCalendar() {
    const monthYearStr = currentCalDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    document.getElementById('calendar-month-year').textContent = monthYearStr;

    const daysContainer = document.getElementById('calendar-days');
    daysContainer.innerHTML = '';

    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    // First day of the month (0 = Sunday)
    const firstDay = new Date(year, month, 1).getDay();
    // Number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill blank days before 1st of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-day empty';
        daysContainer.appendChild(emptyDiv);
    }

    // Logic setup for predictions
    const userData = getMockUserData();
    
    // We will generate the last 3 periods and next 3 predicted periods based on cycle length
    const pastPeriods = [];
    const futurePeriods = [];
    
    // Let's create an array of period start dates
    let start = new Date(userData.lastPeriod);
    
    // Push some past periods
    for(let i=1; i<=3; i++) {
        let past = new Date(start);
        past.setDate(past.getDate() - (userData.cycleLength * i));
        pastPeriods.push(past);
    }
    pastPeriods.push(new Date(start)); // Current/last actual period
    
    // Future predictions
    for(let i=1; i<=6; i++) {
        let future = new Date(start);
        future.setDate(future.getDate() + (userData.cycleLength * i));
        futurePeriods.push(future);
    }

    // Helper to check if a calendar date matches a period block
    const getDayStatus = (cellDate) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const cd = new Date(cellDate);
        cd.setHours(0,0,0,0);

        let status = { isLogged: false, isPredicted: false, isFertile: false };

        // Check logged/past periods
        pastPeriods.forEach(pDate => {
            let pStart = new Date(pDate);
            pStart.setHours(0,0,0,0);
            let pEnd = new Date(pStart);
            pEnd.setDate(pEnd.getDate() + userData.periodDuration - 1);
            
            if (cd >= pStart && cd <= pEnd) status.isLogged = true;
            
            // Calculate fertile window for past periods (around day 14 of cycle)
            let fStart = new Date(pStart);
            fStart.setDate(fStart.getDate() + 10);
            let fEnd = new Date(pStart);
            fEnd.setDate(fEnd.getDate() + 15);
            
            if (cd >= fStart && cd <= fEnd) status.isFertile = true;
        });

        // Check future/predicted periods
        futurePeriods.forEach(pDate => {
            let pStart = new Date(pDate);
            pStart.setHours(0,0,0,0);
            let pEnd = new Date(pStart);
            pEnd.setDate(pEnd.getDate() + userData.periodDuration - 1);
            
            if (cd >= pStart && cd <= pEnd) status.isPredicted = true;
            
            // Fertile window for future periods
            let fStart = new Date(pStart);
            fStart.setDate(fStart.getDate() + 10);
            let fEnd = new Date(pStart);
            fEnd.setDate(fEnd.getDate() + 15);
            
            if (cd >= fStart && cd <= fEnd) status.isFertile = true;
        });
        
        return status;
    };

    const todayObj = new Date();

    // Populate actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const status = getDayStatus(dateObj);

        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;

        // Is today?
        if (dateObj.getDate() === todayObj.getDate() && dateObj.getMonth() === todayObj.getMonth() && dateObj.getFullYear() === todayObj.getFullYear()) {
            dayDiv.classList.add('today');
        }

        // Apply classes based on status
        if (status.isPredicted) {
            dayDiv.classList.add('predicted');
        } else if (status.isLogged) {
            dayDiv.classList.add('logged');
        } else if (status.isFertile) {
            dayDiv.classList.add('fertile');
        }

        daysContainer.appendChild(dayDiv);
    }

    if (window.lucide) {
        lucide.createIcons();
    }
}
