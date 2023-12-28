document.addEventListener('DOMContentLoaded', function () {
    // Obtener los enlaces de imágenes desde el parámetro en el URL
    const urlParams = new URLSearchParams(window.location.search);
    const imageLinksParam = urlParams.get('imageLinks');
  
    // Convertir la cadena JSON a un array de enlaces
    const imageLinks = imageLinksParam ? JSON.parse(decodeURIComponent(imageLinksParam)) : [];
  
    // Generar dinámicamente los elementos de las diapositivas y los puntos
    const glideSlides = document.querySelector('.glide__slides');
    const dotsContainer = document.querySelector('.dots');
  
    imageLinks.forEach((link, index) => {
      const slide = document.createElement('li');
      slide.classList.add('glide__slide');
      slide.innerHTML = `<img src="${link}" alt="Imagen ${index + 1}">`;
      glideSlides.appendChild(slide);
  
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('data-glide-dir', `=${index}`);
      dotsContainer.appendChild(dot);
    });
  
    // Configuración de Glide.js
    const glideInstance = new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      focusAt: 'center',
      gap: 0,
     // autoplay: 5000, // Cambiar cada 5 segundos
    });
  
    // Montar Glide.js después de la configuración
    glideInstance.mount();
  
    // Actualizar el estado de los puntos cuando cambia la diapositiva
    glideInstance.on('run', (move) => {
      const activeDot = document.querySelector('.dot.active');
      if (activeDot) activeDot.classList.remove('active');
  
      const newActiveDot = document.querySelector(`.dot[data-glide-dir*="${move.direction}"]`);
      if (newActiveDot) newActiveDot.classList.add('active');
    });

  });
  