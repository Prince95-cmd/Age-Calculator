window.addEventListener("DOMContentLoaded", () => {

    // inputs
    const dayInput = document.getElementById("days");
    const monthInput = document.getElementById("months");
    const yearInput = document.getElementById("years");

    // error message
    const dayErrorMessage = document.getElementById("dayError");
    const monthErrorMessage = document.getElementById("monthError");
    const yearErrorMessage = document.getElementById("yearError");

    // result
    const dayResult = document.getElementById("dayRes");
    const monthResult = document.getElementById("monthRes");
    const yearResult = document.getElementById("yearRes");

    // labels
    const labels = document.querySelectorAll(".inputName")

    // Submit button
    const submitButton = document.getElementById("arrow");

    // inputs active
    const inputsActive = document.querySelectorAll(".contain");
    inputsActive.forEach(input => {
        input.addEventListener("focus", ()=> {
            submitButton.style.backgroundColor = "var(--color1";
        })

        // Reset to original
        input.addEventListener('blur', () => {
            submitButton.style.backgroundColor = ''; 
        });
    });

    //current date
    const currentDate = new Date();

    // function evaluates and gives the difference in years
    function ageInYears(birthDate) {
        let yearDifference = currentDate.getFullYear() - birthDate.getFullYear();
        
        // Check if the birthday hasn't occurred yet this year
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        if (birthDate.getMonth() + 1 > currentMonth || (birthDate.getMonth() + 1 === currentMonth && birthDate.getDate() > currentDay)){
            yearDifference--;
        }

        return yearDifference;
    }

    // function to evaluate months left after years is counted
    function ageInMonths(birthDate) {
        let months = (currentDate.getMonth() + 1) - (birthDate.getMonth() + 1);
        
        // If the current month is before the birth month, wrap around the year
        if (months < 0) {
            months += 12;
        }
    
        // Check if the birthday this month hasn't occurred yet (check days)
        if (currentDate.getDate() < birthDate.getDate()) {
            months--;  // Reduce month count if the birthday hasn't occurred yet in the current month
        }
    
        // Ensure months don't go negative, adjust to remaining months for next birthday
        if (months < 0) {
            months += 12;
        }
    
        return months;
    }
    
    // function to evaluate the days left after months is counted
    function ageInDays(birthDate) {
        let days = currentDate.getDate() - birthDate.getDate();
        
        // If days are negative, go back to the previous month and adjust the days
        if (days < 0) {
            // Last day of the previous month
            const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0); 
            days += previousMonth.getDate();
        }
    
        return days;
    }

    // function to check if day exists in a month
    function isValidDate(day, month, year) {
        // Create a date object with the provided values
        const testDate = new Date(year, month - 1, day);  // Month is zero-based (0 = January)
        
        // Check if the date object has the same day, month, and year as the inputs
        // If the day exceeds the limit for the month, it will overflow into the next month.
        return (
            testDate.getDate() === day && 
            testDate.getMonth() === month - 1 && 
            testDate.getFullYear() === year
        );
    }
    
    
    // event listener for form submission
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        const day = Number(dayInput.value);
        const month = Number(monthInput.value);
        const year = Number(yearInput.value);


        // Input validation
        if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year > currentDate.getFullYear()) {

            // Show error messages if the inputs are empty
            if(!day){
                dayErrorMessage.style.opacity = '1';
                labels[0].style.color = "var(--color5)";
            }
            if(!month){
                monthErrorMessage.style.opacity = '1';
                labels[1].style.color = "var(--color5)";
            }
            if(!year){
                yearErrorMessage.style.opacity = '1';
                labels[2].style.color = "var(--color5)";
            }

            // Show error messages if the inputs are invalid            
            if ( day > 31){
                dayErrorMessage.textContent = "Must be a valid day";
                dayErrorMessage.style.opacity = '1';
                labels[0].style.color = "var(--color5)";
            }
                
            if (month > 12){
                monthErrorMessage.textContent = "Must be a valid month";
                monthErrorMessage.style.opacity = '1';
                labels[1].style.color = "var(--color5)";
            }
                
            if (year > currentDate.getFullYear()){
                yearErrorMessage.textContent = "Must be in the past";
                yearErrorMessage.style.opacity = '1';
                labels[2].style.color = "var(--color5)";
            } 
                
            return;
        }

        if (!isValidDate(day, month, year)) {
            dayErrorMessage.textContent = "Must be a valid date";
            dayErrorMessage.style.opacity = '1';
            labels[0].style.color = "var(--color5)";
            labels[1].style.color = "var(--color5)";
            labels[2].style.color = "var(--color5)";
            return;
        }

        // Create a birthdate object
        const birthDate = new Date(year, month - 1, day);

        // Clear error messages and reset back to original colors
        dayErrorMessage.style.opacity = "0";
        labels[0].style.color = "var(--color3)";

        monthErrorMessage.style.opacity = "0";
        labels[1].style.color = "var(--color3)";

        yearErrorMessage.style.opacity = "0";
        labels[2].style.color = "var(--color3)";

        // Display results
        yearResult.innerHTML = ageInYears(birthDate);
        monthResult.innerHTML = ageInMonths(birthDate);
        dayResult.innerHTML = ageInDays(birthDate);
    });
});




