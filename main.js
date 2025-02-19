document.addEventListener('DOMContentLoaded', () => {
  const distanceInput = document.getElementById('distance');
  const speedInput = document.getElementById('speed');
  const calculateButton = document.getElementById('calculate');
  const timeResult = document.getElementById('time-result');

  calculateButton.addEventListener('click', calculateTime);
  
  function calculateTime() {
    const distance = parseFloat(distanceInput.value);
    const speed = parseFloat(speedInput.value);

    if (isNaN(distance) || isNaN(speed)) {
      timeResult.textContent = 'Ingrese valores válidos';
      return;
    }

    if (speed <= 0) {
      timeResult.textContent = 'La velocidad debe ser mayor a 0';
      return;
    }

    // Calculate time in hours
    const timeInHours = distance / speed;
    
    // Convert to hours and minutes
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);

    // Format the result
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    
    timeResult.textContent = `${formattedHours}:${formattedMinutes}`;
  }

  // Allow Enter key to trigger calculation
  [distanceInput, speedInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateTime();
      }
    });
  });
});