/**
 * Portfolio Dashboard - CRUD logic (Firebase Firestore)
 */
(function () {
  let data = DataStore.getDefaults();
  let saveTimeout = null;

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  async function save() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
      saveTimeout = null;
      try {
        const ok = await DataStore.save(data);
        showToast(ok ? 'Saved successfully' : 'Failed to save');
      } catch (e) {
        showToast('Failed to save');
      }
    }, 400);
  }

  function getUrlForContact(type, value) {
    if (type === 'phone') return `tel:${value}`;
    if (type === 'email') return `mailto:${value}`;
    return value;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function applyData(d) {
    data = d || DataStore.getDefaults();
  }

  // Hero
  function bindHero() {
    ['name', 'tagline', 'location', 'resumeUrl'].forEach((key) => {
      const el = document.getElementById(`hero-${key}`);
      if (el) {
        el.value = data.hero[key] || '';
        el.addEventListener('input', () => {
          data.hero[key] = el.value;
          save();
        });
      }
    });
  }

  // Summary
  function bindSummary() {
    const el = document.getElementById('summary-text');
    if (el) {
      el.value = data.summary || '';
      el.addEventListener('input', () => {
        data.summary = el.value;
        save();
      });
    }
  }

  // Contact
  function renderContact() {
    const list = document.getElementById('contact-list');
    list.innerHTML = '';
    (data.contact || []).forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'list-item';
      div.dataset.index = i;
      div.innerHTML = `
        <select class="contact-type">
          <option value="phone" ${item.type === 'phone' ? 'selected' : ''}>Phone</option>
          <option value="email" ${item.type === 'email' ? 'selected' : ''}>Email</option>
          <option value="linkedin" ${item.type === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
          <option value="website" ${item.type === 'website' ? 'selected' : ''}>Website</option>
        </select>
        <input type="text" class="contact-value" placeholder="Value" value="${escapeHtml(item.value)}">
        <input type="text" class="contact-label" placeholder="Display label" value="${escapeHtml(item.label)}">
        <button type="button" class="btn-icon btn-delete" title="Delete"><i class="fas fa-trash"></i></button>
      `;
      const typeSel = div.querySelector('.contact-type');
      const valueInp = div.querySelector('.contact-value');
      const labelInp = div.querySelector('.contact-label');
      const delBtn = div.querySelector('.btn-delete');

      const update = () => {
        const type = typeSel.value;
        const value = valueInp.value.trim();
        const label = labelInp.value.trim() || value;
        data.contact[i] = { type, value, label, url: getUrlForContact(type, value) };
        save();
      };

      typeSel.addEventListener('change', update);
      valueInp.addEventListener('input', update);
      labelInp.addEventListener('input', update);
      delBtn.addEventListener('click', () => {
        data.contact.splice(i, 1);
        renderContact();
        save();
      });
      list.appendChild(div);
    });
  }

  document.getElementById('add-contact').addEventListener('click', () => {
    data.contact = data.contact || [];
    data.contact.push({ type: 'phone', value: '', label: '', url: '' });
    renderContact();
    save();
  });

  // Skills
  function bindSkills() {
    const topEl = document.getElementById('skills-top');
    const langEl = document.getElementById('skills-languages');
    if (topEl) {
      topEl.value = (data.skills?.top || []).join(', ');
      topEl.addEventListener('input', () => {
        data.skills = data.skills || {};
        data.skills.top = topEl.value.split(',').map((s) => s.trim()).filter(Boolean);
        save();
      });
    }
    if (langEl) {
      langEl.value = (data.skills?.languages || []).join(', ');
      langEl.addEventListener('input', () => {
        data.skills = data.skills || {};
        data.skills.languages = langEl.value.split(',').map((s) => s.trim()).filter(Boolean);
        save();
      });
    }
  }

  // Experience
  function renderExperience() {
    const list = document.getElementById('experience-list');
    list.innerHTML = '';
    (data.experience || []).forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'list-item exp-item-editor';
      div.dataset.index = i;
      const bullets = (item.bullets || []).join('\n');
      div.innerHTML = `
        <input type="text" class="exp-title" placeholder="Job title" value="${escapeHtml(item.title)}">
        <input type="text" class="exp-meta" placeholder="Company · Period" value="${escapeHtml(item.meta)}">
        <textarea class="exp-desc" placeholder="Description (optional)" rows="3">${escapeHtml(item.description || '')}</textarea>
        <input type="text" class="exp-bullets" placeholder="Bullet points (one per line, optional)" value="${escapeHtml(bullets)}">
        <button type="button" class="btn-icon btn-delete" title="Delete"><i class="fas fa-trash"></i></button>
      `;
      const titleInp = div.querySelector('.exp-title');
      const metaInp = div.querySelector('.exp-meta');
      const descInp = div.querySelector('.exp-desc');
      const bulletsInp = div.querySelector('.exp-bullets');
      const delBtn = div.querySelector('.btn-delete');

      const update = () => {
        data.experience[i] = {
          title: titleInp.value.trim(),
          meta: metaInp.value.trim(),
          description: descInp.value.trim(),
          bullets: bulletsInp.value.split('\n').map((s) => s.trim()).filter(Boolean)
        };
        save();
      };

      [titleInp, metaInp, descInp, bulletsInp].forEach((el) => el.addEventListener('input', update));
      delBtn.addEventListener('click', () => {
        data.experience.splice(i, 1);
        renderExperience();
        save();
      });
      list.appendChild(div);
    });
  }

  document.getElementById('add-experience').addEventListener('click', () => {
    data.experience = data.experience || [];
    data.experience.push({ title: '', meta: '', description: '', bullets: [] });
    renderExperience();
    save();
  });

  // Education
  function bindEducation() {
    ['degree', 'school', 'period'].forEach((key) => {
      const el = document.getElementById(`edu-${key}`);
      if (el) {
        el.value = data.education?.[key] || '';
        el.addEventListener('input', () => {
          data.education = data.education || {};
          data.education[key] = el.value;
          save();
        });
      }
    });
  }

  // Certifications
  function renderCertifications() {
    const list = document.getElementById('certifications-list');
    list.innerHTML = '';
    (data.certifications || []).forEach((cert, i) => {
      const div = document.createElement('div');
      div.className = 'list-item cert-item-editor';
      div.innerHTML = `
        <input type="text" placeholder="Certification name" value="${escapeHtml(cert)}">
        <button type="button" class="btn-icon btn-delete" title="Delete"><i class="fas fa-trash"></i></button>
      `;
      const inp = div.querySelector('input');
      const delBtn = div.querySelector('.btn-delete');
      inp.addEventListener('input', () => {
        data.certifications[i] = inp.value.trim();
        save();
      });
      delBtn.addEventListener('click', () => {
        data.certifications.splice(i, 1);
        renderCertifications();
        save();
      });
      list.appendChild(div);
    });
  }

  document.getElementById('add-certification').addEventListener('click', () => {
    data.certifications = data.certifications || [];
    data.certifications.push('');
    renderCertifications();
    save();
  });

  // Footer
  function bindFooter() {
    ['year', 'linkedin', 'email'].forEach((key) => {
      const el = document.getElementById(`footer-${key}`);
      if (el) {
        el.value = data.footer?.[key] ?? '';
        el.addEventListener('input', () => {
          data.footer = data.footer || {};
          data.footer[key] = key === 'year' ? parseInt(el.value, 10) || new Date().getFullYear() : el.value;
          save();
        });
      }
    });
  }

  function bindAll() {
    bindHero();
    bindSummary();
    renderContact();
    bindSkills();
    renderExperience();
    bindEducation();
    renderCertifications();
    bindFooter();
  }

  // Reset
  document.getElementById('reset-btn').addEventListener('click', async () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      try {
        data = await DataStore.reset();
        applyData(data);
        bindAll();
        showToast('Reset to defaults');
      } catch (e) {
        showToast('Reset failed');
      }
    }
  });

  // Init - load from Firebase/localStorage then bind
  async function init() {
    const main = document.querySelector('.dashboard-main');
    if (main) main.style.opacity = '0.5';
    try {
      data = await DataStore.get();
      bindAll();
    } catch (e) {
      showToast('Failed to load data');
      data = DataStore.getDefaults();
      bindAll();
    }
    if (main) main.style.opacity = '1';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
