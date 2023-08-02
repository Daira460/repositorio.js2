const daysElement = document.getElementById('calendarDays');
const monthYearElement = document.getElementById('monthYear');
const modal = document.getElementById('modal');
const reservationForm = document.getElementById('reservationForm');
const nameInput = document.getElementById('name');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const reservations = [
  { date: '2023-07-10', time: '14:00', name: 'Juan Perez' },
  { date: '2023-07-15', time: '19:30', name: 'María Gómez' },
  // Agregar más reservas aquí en el formato { date: 'YYYY-MM-DD', time: 'HH:mm', name: 'Nombre Cliente' }
];

function updateCalendar() {
  daysElement.innerHTML = '';
  monthYearElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  let dayOfWeek = firstDayOfMonth.getDay();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${padZero(currentMonth + 1)}-${padZero(day)}`;
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day;

    if (isToday(currentYear, currentMonth, day)) {
      dayElement.classList.add('today');
    }

    if (isReserved(dateStr)) {
      dayElement.classList.add('reserved');
      const reservation = reservations.find(r => r.date === dateStr);
      dayElement.title = `Reservado por: ${reservation.name} a las ${reservation.time}`;
    } else {
      dayElement.classList.add('available');
    }

    daysElement.appendChild(dayElement);
    dayOfWeek = (dayOfWeek + 1) % 7;
  }
}

function getMonthName(monthIndex) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthIndex];
}

function isToday(year, month, day) {
  const today = new Date();
  return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
}

function isReserved(dateStr) {
  return reservations.some(r => r.date === dateStr);
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}

updateCalendar();

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

reservationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  if (name !== '' && date !== '' && time !== '') {
    const reservation = { date, time, name };
    reservations.push(reservation);
    updateCalendar();
    closeModal();

    // Mostrar la reserva en la consola
    console.log('Reserva realizada:');
    console.log('Nombre:', reservation.name);
    console.log('Fecha:', reservation.date);
    console.log('Hora:', reservation.time);
  }
});