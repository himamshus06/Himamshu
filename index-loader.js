/**
 * Loads portfolio content from Firebase/localStorage and updates the DOM.
 */
(function () {
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getUrlForContact(item) {
    if (item.type === 'phone') return `tel:${item.value}`;
    if (item.type === 'email') return `mailto:${item.value}`;
    return item.value || item.url || '#';
  }

  function getContactIcon(type) {
    const icons = { phone: 'fas fa-phone', email: 'fas fa-envelope', linkedin: 'fab fa-linkedin-in', website: 'fas fa-globe' };
    return icons[type] || 'fas fa-link';
  }

  function render(data) {
    // Hero
    const heroName = document.querySelector('.hero-name');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroLocation = document.querySelector('.hero-location');
    const resumeBtn = document.getElementById('resume-btn');
    const navLogo = document.querySelector('.nav-logo');

    if (heroName) heroName.textContent = data.hero.name;
    if (heroTagline) heroTagline.textContent = data.hero.tagline;
    if (heroLocation) {
      heroLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${escapeHtml(data.hero.location)}`;
    }
    if (resumeBtn && data.hero.resumeUrl) resumeBtn.href = data.hero.resumeUrl;
    if (navLogo) navLogo.textContent = data.hero.name;

    // Summary
    const aboutText = document.querySelector('.about-text');
    if (aboutText) aboutText.textContent = data.summary;

    // Contact grid
    const contactGrid = document.querySelector('.contact .contact-grid');
    if (contactGrid && data.contact?.length) {
      contactGrid.innerHTML = data.contact
        .filter((c) => c.value)
        .map(
          (c) => `
        <a href="${escapeHtml(getUrlForContact(c))}" class="contact-card" ${c.type === 'website' ? `title="${escapeHtml(c.value)}"` : ''} ${c.type === 'linkedin' || c.type === 'website' ? 'target="_blank" rel="noopener"' : ''}>
          <i class="${getContactIcon(c.type)}"></i>
          <span>${escapeHtml(c.label || c.value)}</span>
        </a>
      `
        )
        .join('');
    }

    // Skills
    const skillsTopRow = document.querySelector('.skills .skills-row:first-of-type');
    const skillsLangRow = document.querySelector('.skills .section-title-sub')?.nextElementSibling;
    if (skillsTopRow && data.skills?.top?.length) {
      skillsTopRow.innerHTML = data.skills.top.map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('');
    }
    if (skillsLangRow && data.skills?.languages?.length) {
      skillsLangRow.innerHTML = data.skills.languages.map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('');
    }

    // Experience
    const expList = document.querySelector('.experience-list');
    if (expList && data.experience?.length) {
      expList.innerHTML = data.experience
        .filter((e) => e.title)
        .map(
          (e) => `
        <article class="exp-item">
          <div class="exp-header">
            <h3>${escapeHtml(e.title)}</h3>
            <span class="exp-meta">${escapeHtml(e.meta)}</span>
          </div>
          ${e.description ? `<p class="exp-desc">${escapeHtml(e.description)}</p>` : ''}
          ${e.bullets?.length ? `<ul class="exp-list">${e.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
        </article>
      `
        )
        .join('');
    }

    // Education
    const eduItem = document.querySelector('.edu-item');
    if (eduItem && data.education) {
      eduItem.innerHTML = `
        <h3>${escapeHtml(data.education.degree)}</h3>
        <p class="edu-school">${escapeHtml(data.education.school)}</p>
        <p class="edu-period">${escapeHtml(data.education.period)}</p>
      `;
    }

    // Certifications
    const certList = document.querySelector('.cert-list');
    if (certList && data.certifications?.length) {
      certList.innerHTML = data.certifications
        .filter((c) => c)
        .map((c) => `<div class="cert-item">${escapeHtml(c)}</div>`)
        .join('');
    }

    // Footer
    const footerText = document.querySelector('.footer p');
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerText && data.footer) {
      footerText.textContent = `© ${data.footer.year || new Date().getFullYear()} ${data.hero?.name || 'Himamshu S'}`;
    }
    if (footerLinks.length >= 2 && data.footer) {
      if (data.footer.linkedin) footerLinks[0].href = data.footer.linkedin;
      if (data.footer.email) footerLinks[1].href = `mailto:${data.footer.email}`;
    }
  }

  async function load() {
    try {
      const data = await DataStore.get();
      render(data);
    } catch (e) {
      console.warn('Failed to load portfolio data:', e);
      render(DataStore.getDefaults());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
