let events = [];
let todayEvents = [];
 

// Add Event Button
const openButton = document.getElementById("openModal");
const closeButton = document.getElementById("closeModal");
const modal = document.getElementById("modal");

// Calendar Popup Button
const openBC = document.getElementById("openBigChungus");
const closeBC = document.getElementById("closeBigChungus");
const bigChungus = document.getElementById("bigChungus");

let eventDateInput = document.getElementById("eventDate");
let eventTitleInput = document.getElementById("eventTitle");
let eventStartInput = document.getElementById("startTime");
let eventEndInput = document.getElementById("endTime");

// Used for creating new IDs
let eventIdCounter = 1;
let eventList = document.getElementById("eventList");

// Used for Logic behind Popups.
let isPlus = true;
let calendarOpen = false;

let todaysList = document.getElementById("todaysList");


const todaysDate = new Date();
let month = todaysDate.getMonth();
let currentYear = todaysDate.getFullYear(); // Track the current year
const day = document.querySelector(".calendar-days");
const currdate = document.querySelector(".calender-navigation span");

// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let calendarYearElement = document.getElementById("calendarYear");
calendarYearElement.textContent = currentYear; // Set the initial year to display

// Function to update the displayed year
function updateCalendarYear() {
    calendarYearElement.textContent = currentYear;
    displayEventsForYear(currentYear);
}
let nextYearButton = document.getElementById("nextYear"); // Button to move forward a year
let prevYearButton = document.getElementById("prevYear"); // Button to move backward a year

// Move forward by one year
nextYearButton.addEventListener("click", () => {
    currentYear += 1;
    updateCalendarYear();
});

// Move backward by one year
prevYearButton.addEventListener("click", () => {
    currentYear -= 1;
    updateCalendarYear();
});


openButton.addEventListener("click", () => {
    if (isPlus) {
        openButton.classList.add("closeCool");
        openButton.classList.remove("openCool");
        modal.classList.add("open");
        isPlus = false;
    }

    else {
        openButton.classList.remove("closeCool");
        openButton.classList.add("openCool");
        modal.classList.remove("open");
        isPlus = true;
    }

});

closeButton.addEventListener("click", () => {
    modal.classList.remove("open");
    openButton.classList.remove("closeCool");
    modal.readOnly = true;  
});

openBC.addEventListener("click", () => {
    if (!calendarOpen){
        bigChungus.classList.add("open");
        calendarOpen = true;
        openButton.classList.remove("open");
    }
    else {
        bigChungus.classList.remove("open");
        calendarOpen = false;
    }
})


function addEvent() {

    let date = eventDateInput.value;
    let title = eventTitleInput.value;
    let startTime = eventStartInput.value;
    let endTime = eventEndInput.value;

    if (date && title) {
        let eventId = eventIdCounter++;
        events.push ({
            id: eventId, 
            date: date,
            title: title,
            startTime: startTime,
            endTime: endTime
        });
    }
    eventDateInput.value = "";
    eventTitleInput.value = "";
    eventStartInput.value = "";
    eventEndInput.value = "";
    events.sort();
    displayEvents();
}

function removeEvent(id) {
    let index = events.findIndex((event) => 
        event.id === id);
    if (index != -1) {
        events.splice(index, 1);
        displayEvents();
    }
}

function displayEvents() {
    eventList.innerHTML = "";
    todaysList.innerHTML = "";
    for (let i = 0; i < events.length; i++){
        let event = events[i];
        
        if (withinThisWeek(event)) {
            let list = document.createElement("li");
            list.classList.add("appointment");
            list.innerHTML = 
                `<strong>${event.title}</strong> - 
                Appointment on ${event.date} from ${event.startTime} - ${event.endTime}`;

            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.onclick = function () {removeEvent(event.id);}
            deleteButton.textContent = "Delete";

            list.appendChild(deleteButton);
            eventList.appendChild(list);
        }

        if (isToday(event)) {
            let list = document.createElement("li");
            list.classList.add("appointment");
            list.innerHTML = 
                `<strong>${event.title}</strong> - 
                Appointment on ${event.date} from ${event.startTime} - ${event.endTime}`;

            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.onclick = function () {removeEvent(event.id);}
            deleteButton.textContent = "Delete";

            list.appendChild(deleteButton); // attach button to each element
            todaysList.appendChild(list); // attach each element to schedule.
        }

    }

    checkUpcomingEvents();
}

function isToday(event) {
    const eventDate = new Date(`${event.date}T${event.startTime}`);
    const tomorrow = new Date(todaysDate.getTime() + 24 * 60 * 60 * 1000); // Current Time + 1 day
    
    return (todaysDate <= eventDate && eventDate <= tomorrow);
}

//todo: within this week toggle (see more...)
function withinThisWeek(event) {
    const eventDate = new Date(`${event.date}T${event.startTime}`);
    const oneWeekLater = new Date(todaysDate.getTime() + 168 * 60 * 60 * 1000); // Current time + 1 week 

    return (todaysDate < eventDate && eventDate <= oneWeekLater);    
}

// Function to display notifications of events coming up 
function checkUpcomingEvents() {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // Current time + 1 hour
    events.forEach(event => {
        const eventDateTime = new Date(`${event.date}T${event.startTime}`);
        if (eventDateTime > now && eventDateTime <= oneHourLater) {
            // Trigger a notification for the upcoming event
            alert(`Reminder: Appointment with "${event.title}" is happening within the next hour from ${event.startTime} to ${event.endTime}!`);
        }
    });
}

//generate calendar
const cal_gel = () => {
    //get day one, last day of this month
    let firstday = new Date (currentYear, month, 1).getDate();
    let lastday = new Date (currentYear, month + 1, 0).getDate();

    //get last day of month, last month
    let lastmonthlastday = new Date (year, month, 0).getDate();


    let lit = "";
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
    //add curr month dates
    for (let i = 0; i < lastday; i++) {

    }
    //check if its today
    let isToday = i === date.getDate() 
                                    && month === new Date().getMonth()
                                    && year === newDate().getFullYear()
                                    ? "active"
                                    : "";
                                lit += `<li class="${isToday}">${i}</li>`;
    }
    //add first dates of next month
    for (let i = lastday; i < 6; i++){
        lit += `<li class="inactive">${i - dayend + 1}</li>`;
    }
    //update current date text with current month and year
    currdate.innerText = `${months[month]} ${year}`;
    //update html of dates with generated cal
    day.innerHTML = lit;

cal_gel();
//update it if its cooked
if (month < 0 || month > 11){
    date = new Date(currentYear, month. newDate().getDate());
    currentYear = Date.getFullYear();
    month=Date.getMonth();
}

cal_gel();
// Call the function every minute to check for upcoming events
setInterval(checkUpcomingEvents, 60000); // 60,000 ms = 1 minute
