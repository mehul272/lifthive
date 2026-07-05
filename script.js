const ns = document.getElementById('ns');
const navToggle = document.querySelector('.nav-toggle');

window.addEventListener('scroll', () => {
  ns?.classList.toggle('sticky', window.scrollY > 55);
});

navToggle?.addEventListener('click', () => {
  const isOpen = ns?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    ns?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const card = document.getElementById('appCard');
const hero = document.querySelector('.hero');

if (card && hero) {
  hero.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const rotateX = -((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10;
    const rotateY = ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 14;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  hero.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.d || '0', 10);
      setTimeout(() => entry.target.classList.add('on'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealItems.forEach((element, index) => {
  element.dataset.d = String((index % 5) * 70);
  revealObserver.observe(element);
});

const barChart = document.getElementById('barChart');
const barObserver = new IntersectionObserver((entries) => {
  if (entries[0]?.isIntersecting) {
    document.querySelectorAll('.bar').forEach((bar) => {
      bar.style.height = `${bar.dataset.h}%`;
    });
    barObserver.disconnect();
  }
}, { threshold: 0.4 });

if (barChart) {
  barObserver.observe(barChart);
}

document.querySelectorAll('.f-card').forEach((featureCard) => {
  featureCard.addEventListener('mousemove', (event) => {
    const rect = featureCard.getBoundingClientRect();
    const rotateX = -((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 5;
    const rotateY = ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 7;
    featureCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
  });

  featureCard.addEventListener('mouseleave', () => {
    featureCard.style.transform = '';
  });
});
