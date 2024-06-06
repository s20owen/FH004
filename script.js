
const calculateButton = document.getElementById('calculate-button');

document.getElementById('end-date').addEventListener('input', function() {
    document.getElementById('results-container').style.display = 'none';
    calculateButton.disabled = false;
});

document.getElementById('leave-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const endDate = new Date(document.getElementById('end-date').value);
    const today = new Date();
    const leaveDays = parseInt(document.getElementById('leave-days').value);
    const additionalDays = parseInt(document.getElementById('additional-days').value) || 0;
    const earnedPerMonth = 2.5; // Earned days per month

    const resultElement = document.getElementById('result');
    const earnedDaysElement = document.getElementById('earned-days');

    // Check if the selected date is in the future
    if (endDate <= today) {
        resultElement.innerText = 'Please select a date in the future.';
        return;
    }

    // Calculate the number of months from October to the terminal date
    let monthsCount = 0;
    const startYear = today.getFullYear();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth(); // 0-indexed (0 = January, 9 = October)

    if (endYear === startYear) {
        if (endMonth >= 9) { // If the end month is October (9) or later in the same year
            monthsCount = endMonth - 9 + 1; // Months from October to the end month inclusive
        }
    } else {
        // Calculate months from October to December in the start year
        monthsCount += 3; // October, November, December

        // Calculate months from January to terminal month in the terminal year
        monthsCount += endMonth + 1; // +1 because months are 0-indexed

        // Calculate full years in between
        monthsCount += (endYear - startYear - 1) * 12; // Full years in between
    }

    const earnedDays = monthsCount * earnedPerMonth;

    console.log("Months from October to selected date:", monthsCount);
    console.log("Earned Days:", earnedDays);

    // Update earned days input field
    earnedDaysElement.value = earnedDays.toFixed(1);

    // Calculate total leave days
    let totalLeaveDays = leaveDays + additionalDays + earnedDays;

    // Calculate the start date by subtracting the total leave days from the terminal date
    let startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - totalLeaveDays);

    resultElement.innerText = `Your Terminal leave starts on ${startDate.toDateString()} and ends on ${endDate.toDateString()} for a total of ${totalLeaveDays.toFixed(1)} days, including ${earnedDays.toFixed(1)} earned days.`;

    // Show the results container
    document.getElementById('results-container').style.display = 'block';

    // Disable the calculate button
    calculateButton.disabled = true;

    // Confetti effect for funsies
     confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});