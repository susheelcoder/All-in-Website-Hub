 const trails = [...document.querySelectorAll('.trail')];
    window.addEventListener('mousemove', e => {
      trails.forEach((el, i) => {
        const delay = i * 40;
        setTimeout(() => {
          el.style.left = e.clientX + 'px';
          el.style.top = e.clientY + 'px';
          el.style.opacity = 1 - i*0.25;
        }, delay);
      });
    });
    // fade out when mouse leaves
    window.addEventListener('mouseleave', ()=> trails.forEach((el)=> el.style.opacity=0));

