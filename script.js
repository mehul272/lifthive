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

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (glow) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});

const counterElements = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = Number(entry.target.dataset.target || '0');
      const duration = 1200;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        entry.target.textContent = value;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counterElements.forEach((counter) => counterObserver.observe(counter));

const journeyPath = document.querySelector('.journey-svg path');
if (journeyPath) {
  const pathLength = journeyPath.getTotalLength();
  journeyPath.style.strokeDasharray = `${pathLength}`;
  journeyPath.style.strokeDashoffset = `${pathLength}`;

  const pathObserver = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      journeyPath.animate(
        [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
        { duration: 1800, easing: 'ease-in-out' }
      );
      pathObserver.disconnect();
    }
  }, { threshold: 0.3 });

  pathObserver.observe(journeyPath);
}

const ecosystemCards = document.querySelectorAll('.eco-card');
const ecoTitle = document.getElementById('ecoTitle');
const ecoText = document.getElementById('ecoText');

const ecoContent = {
  users: {
    title: 'Users',
    text: 'Every workout becomes a signal that helps the platform recommend the next best step.'
  },
  gyms: {
    title: 'Gyms',
    text: 'Discovery, check-ins, memberships, retention, and CRM all live inside one operating layer.'
  },
  trainers: {
    title: 'Trainers',
    text: 'A trusted marketplace for coaching, bookings, influence, and long-term growth.'
  },
  brands: {
    title: 'Brands',
    text: 'Commerce and partnerships turn engagement into recurring business value.'
  }
};

ecosystemCards.forEach((card) => {
  card.addEventListener('click', () => {
    ecosystemCards.forEach((item) => item.classList.remove('active'));
    card.classList.add('active');

    const key = card.dataset.eco;
    if (ecoTitle && ecoText && ecoContent[key]) {
      ecoTitle.textContent = ecoContent[key].title;
      ecoText.textContent = ecoContent[key].text;
    }
  });
});
