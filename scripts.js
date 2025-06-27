document.addEventListener('DOMContentLoaded', () => {
  // SLIDER CARROSSEL
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const items = document.querySelectorAll('.item');
  const dots = document.querySelectorAll('.dot');
  const numbersIndicator = document.querySelector('.numbers');
  const container = document.querySelector('.container');

  if (items.length > 0) {
    let activeIndex = 0;
    const totalItems = items.length;

    const showSlide = (index) => {
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      if (numbersIndicator) {
        numbersIndicator.textContent = String(index + 1).padStart(2, '0');
      }
    };

    const nextSlide = () => {
      activeIndex = (activeIndex + 1) % totalItems;
      showSlide(activeIndex);
    };

    const prevSlide = () => {
      activeIndex = (activeIndex - 1 + totalItems) % totalItems;
      showSlide(activeIndex);
    };

    let slideInterval = setInterval(nextSlide, 7000);

    const resetInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 7000);
    };

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });
    }

    container?.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    container?.addEventListener('mouseleave', () => {
      resetInterval();
    });

    showSlide(activeIndex);
  }

  // MENU HAMBÚRGUER
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('menu-aberto');
    mobileMenu?.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-menu-container a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-aberto');
      mobileMenu?.classList.remove('active');
    });
  });
});
