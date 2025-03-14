document.addEventListener('DOMContentLoaded', () => {
  const distanceInput = document.getElementById('distance');
  const speedInput = document.getElementById('speed');
  const calculateButton = document.getElementById('calculate');
  const clearButton = document.getElementById('clear');
  const timeResult = document.getElementById('time-result');
  const currentTimeDisplay = document.getElementById('current-time');
  const arrivalTimeDisplay = document.getElementById('arrival-time');

  function updateCurrentTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
      year: 'numeric'
    });

    const arrivalFormattedTime = arrivalTime.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    arrivalTimeDisplay.textContent = `${arrivalDate} ${arrivalFormattedTime}`;
  }

  function clearInputs() {
    distanceInput.value = '';
    speedInput.value = '';
    timeResult.textContent = '--:--:--';
    arrivalTimeDisplay.textContent = '--/--/---- --:--:--';
  }

  calculateButton.addEventListener('click', calculateTime);
  clearButton.addEventListener('click', clearInputs);

  [distanceInput, speedInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateTime();
      }
    });
  });
});
