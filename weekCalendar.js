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
  date: new Date().getDate(),
};

const curr = new Date();

function getDateGrid() {
  const week = [];

  for (let i = 0; i < 7; i++) {
    const weekDate = curr.getDate() - curr.getDay() + i;
    const key = new Date(curr.setDate(weekDate));
    week.push({
      key: key,
      year: key.getFullYear(),
      month: key.getMonth(),
      date: key.getDate(),
      day: i,
    });
    console.log(week);
  }
  return week;
}

function getTitle() {
  const week = getDateGrid();
  const first = {
    y: week[0].year,
    m: week[0].month,
    d: week[0].date,
  };
  const last = {
    y: week[6].year,
    m: week[6].month,
    d: week[6].date,
  };
  if (first.y !== last.y) {
    return `${months[first.m]} ${first.d}, ${first.y} - ${months[last.m]} ${
      last.d
    }, ${last.y}`;
  } else {
    if (first.m !== last.m) {
      return `${months[first.m]} ${first.d} - ${months[last.m]} ${last.d}, ${
        last.y
      }`;
    } else {
      return `${months[first.m]} ${first.d} - ${last.d}, ${last.y}`;
    }
  }
}

function render() {
  const calendar = document.querySelector(".calendar");
  calendar.innerHTML = `
    <div class="calendar-nav">
      <h2>${getTitle()}</h2>
      <button id="prevMonth">Prev</button>
      <button id="nextMonth">Next</button>
      <button id="todayMonth">Today</button>
    </div>
    <div class="calendar-date-grid">
      ${getDateGrid()
        .map(
          (week) =>
            `<div>${daysOfWeek[week.day]} ${week.month + 1}/${week.date}</div>`
        )
        .join("")}
    </div>
  `;
}

render();
