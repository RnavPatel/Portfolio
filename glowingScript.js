document.addEventListener('DOMContentLoaded', () => {
    const h2 = document.querySelector('.interactive-text');
    const letters = h2.textContent.split('');
    h2.innerHTML = letters.map(letter => {
      if (letter === ' ') {
        return '<span class="space">&nbsp;</span>';
      }
      return `<span>${letter}</span>`;
    }).join('');
    const spans = h2.querySelectorAll('span');
  
    h2.addEventListener('mousemove', (e) => {
      spans.forEach(span => {
        const rect = span.getBoundingClientRect();
        const spanX = rect.left + rect.width / 2;
        const spanY = rect.top + rect.height / 2;
        const distance = Math.hypot(spanX - e.clientX, spanY - e.clientY);
        const maxDistance = 100; // Adjust this value to control the sensitivity
        const minDistance = 10; // Adjust this value to set the minimum distance
        const proximity = Math.min(maxDistance, Math.max(minDistance, distance));
        const intensity = 1 - (proximity - minDistance) / (maxDistance - minDistance);
  
        // Define the RGB values for the furthest color (#7F7F7F)
        const furthestColor = { r: 127, g: 127, b: 127 };
        const colorValue = Math.floor(intensity * 255);
        
        // Interpolate between the furthest color and white
        const r = Math.floor(furthestColor.r + intensity * (255 - furthestColor.r));
        const g = Math.floor(furthestColor.g + intensity * (255 - furthestColor.g));
        const b = Math.floor(furthestColor.b + intensity * (255 - furthestColor.b));
  
        span.style.color = `rgb(${r}, ${g}, ${b})`;
      });
    });
  });
  