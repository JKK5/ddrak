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
  "December",
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const state = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
};

function getDateGrid(year, month) {
  const dates = [];
  const firstDay = new Date(year, month).getDay();
  const totalDaysPrevMonth = new Date(year, month, 0).getDate();
  const totalDaysThisMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= firstDay; i++) {
    const prevMonthDate = totalDaysPrevMonth - firstDay + i;
    const key = new Date(year, month - 1, prevMonthDate);
    dates.push({ key: key, date: prevMonthDate, monthClass: "prev" });
  }

  const today = new Date();
  for (let i = 1; i <= totalDaysThisMonth; i++) {
    const key = new Date(year, month, i);
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dates.push({
        key: key,
        date: i,
        monthClass: "current",
        todayClass: "today",
      });
    } else {
      dates.push({ key: key, date: i, monthClass: "current" });
    }
  }

  const gridsLeft = 42 - dates.length;
  for (let i = 1; i <= gridsLeft; i++) {
    const key = new Date(year, month, i);
    dates.push({ key: key, date: i, monthClass: "next" });
  }
  return dates;
}

let monthCnt = 0;

function render() {
  const calendar = document.querySelector(".calendar");
  calendar.innerHTML = `
    <div class="calendar-switch">
      <form action="index.html">
        <input type="submit" value="Monthly" />
      </form>
      <form action="index2.html">
        <input type="submit" value="Weekly" />
      </form>
    </div>
    <div class="calendar-nav">
      <h2>${months[state.month]} ${state.year}</h2>
      <button id="prevMonth">Prev</button>
      <button id="nextMonth">Next</button>
      <button id="todayMonth" ${monthCnt === 0 ? "disabled" : ""}>Today</button>
    </div>
    <div class="calendar-day-grid">
      ${daysOfWeek.map((day) => `<div>${day}</div>`).join("")}
    </div>
    <div class="calendar-date-grid">
      ${getDateGrid(state.year, state.month)
        .map(
          (date) =>
            `<div class="${date.monthClass} ${
              date.todayClass ? date.todayClass : ""
            }">${date.date}</div>`
        )
        .join("")}
    </div>
  `;
}

function showCalendar(prevNextInd) {
  const date = new Date(state.year, state.month + prevNextInd);
  state.month = date.getMonth();
  state.year = date.getFullYear();
  monthCnt -= prevNextInd;
  render();
}

function init() {
  showCalendar(0);

  document.addEventListener("click", function (event) {
    if (event.target.id === "prevMonth") {
      showCalendar(-1);
    } else if (event.target.id === "nextMonth") {
      showCalendar(1);
    } else if (event.target.id === "todayMonth") {
      showCalendar(monthCnt);
    }
  });
}

init();
