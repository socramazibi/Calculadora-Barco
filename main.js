document.addEventListener('DOMContentLoaded', () => {
  const distanceInput = document.getElementById('distance');
  const speedInput = document.getElementById('speed');
  const calculateButton = document.getElementById('calculate');
  const clearButton = document.getElementById('clear');
  const timeResult = document.getElementById('time-result');
  const currentTimeDisplay = document.getElementById('current-time');
  const arrivalTimeDisplay = document.getElementById('arrival-time');
  const historyList = document.getElementById('history-list');
  const clearHistoryButton = document.getElementById('clear-history');

  let travelHistory = [];

  /* ---------- Funciones de tiempo ---------- */
  function updateCurrentTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
    const formattedTime = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    currentTimeDisplay.textContent = `${formattedDate} ${formattedTime}`;
  }
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  /* ---------- Historial ---------- */
  function renderHistory() {
    historyList.innerHTML = '';
    if (travelHistory.length === 0) {
      historyList.innerHTML = '<li>No hay viajes registrados</li>';
    } else {
      travelHistory.forEach(item => {
        const li = document.createElement('li');

        // Hora de llegada fija
        const arrivalDate = new Date(item.arrival);
        const arrivalText = arrivalDate.toLocaleDateString('es-ES', {
          day: '2-digit', month: '2-digit', year: '2-digit'
        }) + ' ' + arrivalDate.toLocaleTimeString('es-ES', {
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        // Contenedor para tiempo restante
        const remainingSpan = document.createElement('span');
        remainingSpan.classList.add('remaining-time');
        remainingSpan.dataset.arrival = item.arrival;

        li.innerHTML = `
          <strong>Distancia:</strong> ${item.distance} MN<br>
          <strong>Velocidad:</strong> ${item.speed} nudos<br>
          <strong>Tiempo estimado:</strong> ${item.timeText}<br>
          <strong>Llegada prevista:</strong> ${arrivalText}<br>
        `;
        li.appendChild(remainingSpan);
        historyList.appendChild(li);
      });
    }
  }

  function saveHistory() {
    localStorage.setItem('nauticalHistory', JSON.stringify(travelHistory));
  }

  function loadHistory() {
    const stored = localStorage.getItem('nauticalHistory');
    if (stored) {
      travelHistory = JSON.parse(stored);
    }
    renderHistory();
  }

  function updateHistory(distance, speed, timeText, arrivalDateObj) {
    const record = {
      distance,
      speed,
      timeText,
      arrival: arrivalDateObj.getTime() // guardamos timestamp
    };
    travelHistory.unshift(record);
    travelHistory = travelHistory.slice(0, 2); // solo 2 últimos
    renderHistory();
    saveHistory();
  }

  // 🔄 Actualizador de tiempos restantes en tiempo real
  function updateRemainingTimes() {
    const now = Date.now();
    document.querySelectorAll('.remaining-time').forEach(span => {
      const arrival = parseInt(span.dataset.arrival);
      const diff = Math.max(0, arrival - now);

      if (diff <= 0) {
        span.textContent = "Tiempo restante: Llegado ✅";
      } else {
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        span.textContent = `Tiempo restante: ${hours}h ${minutes}m ${seconds}s`;
      }
    });
  }
  setInterval(updateRemainingTimes, 1000);

  /* ---------- Cálculo ---------- */
  function calculateTime() {
    const distance = parseFloat(distanceInput.value);
    const speed = parseFloat(speedInput.value);

    if (isNaN(distance) || isNaN(speed) || distance <= 0 || speed <= 0) {
      timeResult.textContent = 'Ingrese valores válidos';
      arrivalTimeDisplay.textContent = '--/--/---- --:--:--';
      return;
    }

    const timeInSeconds = (distance / speed) * 3600;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    timeResult.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const now = new Date();
    const arrivalTime = new Date(now.getTime() + timeInSeconds * 1000);

    const arrivalDate = arrivalTime.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
    const arrivalFormattedTime = arrivalTime.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    arrivalTimeDisplay.textContent = `${arrivalDate} ${arrivalFormattedTime}`;

    updateHistory(distance, speed, timeResult.textContent, arrivalTime);
  }

  function clearInputs() {
    distanceInput.value = '';
    speedInput.value = '';
    timeResult.textContent = '--:--:--';
    arrivalTimeDisplay.textContent = '--/--/---- --:--:--';
  }

  function clearHistory() {
    travelHistory = [];
    localStorage.removeItem('nauticalHistory');
    renderHistory();
  }

  /* ---------- Eventos ---------- */
  calculateButton.addEventListener('click', calculateTime);
  clearButton.addEventListener('click', clearInputs);
  clearHistoryButton.addEventListener('click', clearHistory);

  [distanceInput, speedInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateTime();
      }
    });
  });

  // Cargar historial al iniciar
  loadHistory();
});
