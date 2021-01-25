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

let curr = new Date();

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
  }
  return week;
}

function getTitle() {
  const week = getDateGrid();
  let title = "";
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
    title = `${months[first.m]} ${first.d}, ${first.y} - ${months[last.m]} ${
      last.d
    }, ${last.y}`;
  } else {
    if (first.m !== last.m) {
      title = `${months[first.m]} ${first.d} - ${months[last.m]} ${last.d}, ${
        last.y
      }`;
    } else {
      title = `${months[first.m]} ${first.d} - ${last.d}, ${last.y}`;
    }
  }
  return title;
}

let weekCnt = 0;

function render() {
  const calendar = document.querySelector(".calendar");
  calendar.innerHTML = `
    <div class="calendar-nav">
      <h2>${getTitle()}</h2>
      <button id="prevWeek">Prev</button>
      <button id="nextWeek">Next</button>
      <button id="todayWeek">Today</button>
    </div>
    <div class="calendar-date-grid">
      <div></div>
      ${getDateGrid()
        .map(
          (week) =>
            `<div>${daysOfWeek[week.day]} ${week.month + 1}/${week.date}</div>`
        )
        .join("")}
    </div>
  `;
}

function showCalendar(prevNextInd) {
  curr.setDate(curr.getDate() + prevNextInd);
  weekCnt -= prevNextInd;
  render();
}

function init() {
  showCalendar(0);
  console.log;

  document.addEventListener("click", function (event) {
    if (event.target.id === "prevWeek") {
      showCalendar(-7);
    } else if (event.target.id === "nextWeek") {
      showCalendar(7);
    } else if (event.target.id === "todayWeek") {
      showCalendar(weekCnt);
    }
  });
}

init();
