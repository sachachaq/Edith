// ─── Checklist Data ───
const HOUSES = {
  'farm-house': {
    name: 'Farm House',
    sections: [
      {
        title: 'Kitchen',
        icon: '&#129379;',
        tasks: ['Wipe counters', 'Clean sink', 'Empty trash', 'Sweep and mop floor', 'Load/unload dishwasher']
      },
      {
        title: 'Living Room',
        icon: '&#128722;',
        tasks: ['Dust surfaces', 'Fluff pillows', 'Vacuum rugs', 'Tidy blankets']
      },
      {
        title: 'Bathrooms',
        icon: '&#128704;',
        tasks: ['Clean toilet', 'Clean mirrors', 'Wipe counters', 'Replace towels', 'Empty trash']
      },
      {
        title: 'Bedrooms',
        icon: '&#128716;',
        tasks: ['Make beds', 'Dust nightstands', 'Vacuum floor', 'Tidy surfaces']
      },
      {
        title: 'Laundry',
        icon: '&#129526;',
        tasks: ['Wash towels', 'Fold laundry', 'Put laundry away']
      }
    ]
  },
  '16-north-rd': {
    name: '16 North Rd',
    sections: [
      {
        title: 'Kitchen',
        icon: '&#129379;',
        tasks: ['Wipe counters', 'Clean sink', 'Empty trash', 'Sweep and mop floor', 'Load/unload dishwasher']
      },
      {
        title: 'Living Room',
        icon: '&#128722;',
        tasks: ['Dust surfaces', 'Fluff pillows', 'Vacuum rugs', 'Tidy blankets']
      },
      {
        title: 'Bathrooms',
        icon: '&#128704;',
        tasks: ['Clean toilet', 'Clean mirrors', 'Wipe counters', 'Replace towels', 'Empty trash']
      },
      {
        title: 'Bedrooms',
        icon: '&#128716;',
        tasks: ['Make beds', 'Dust nightstands', 'Vacuum floor', 'Tidy surfaces']
      },
      {
        title: 'Laundry',
        icon: '&#129526;',
        tasks: ['Wash towels', 'Fold laundry', 'Put laundry away']
      }
    ]
  }
};

let currentHouse = null;

// ─── Navigation ───
function openHouse(houseId) {
  currentHouse = houseId;
  const house = HOUSES[houseId];

  document.getElementById('house-title').textContent = house.name;
  renderChecklist(houseId);
  showPage('checklist');
}

function goHome() {
  currentHouse = null;
  showPage('landing');
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

// ─── Render Checklist ───
function renderChecklist(houseId) {
  const house = HOUSES[houseId];
  const saved = loadState(houseId);
  const body = document.getElementById('checklist-body');
  body.innerHTML = '';

  let taskIndex = 0;

  house.sections.forEach(section => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'section';

    sectionEl.innerHTML = `
      <div class="section-header">
        <span class="section-icon">${section.icon}</span>
        <span class="section-title">${section.title}</span>
      </div>
    `;

    const list = document.createElement('ul');
    list.className = 'task-list';

    section.tasks.forEach(task => {
      const idx = taskIndex++;
      const isChecked = saved[idx] || false;

      const li = document.createElement('li');
      li.className = 'task-item' + (isChecked ? ' checked' : '');
      li.onclick = (e) => {
        if (e.target.tagName !== 'INPUT') {
          const cb = li.querySelector('input');
          cb.checked = !cb.checked;
          cb.dispatchEvent(new Event('change'));
        }
      };

      li.innerHTML = `
        <input type="checkbox" class="task-checkbox" data-index="${idx}" ${isChecked ? 'checked' : ''}>
        <span class="task-label">${task}</span>
      `;

      const checkbox = li.querySelector('input');
      checkbox.addEventListener('change', () => {
        li.classList.toggle('checked', checkbox.checked);
        saveState(houseId);
        updateProgress(houseId);
      });

      list.appendChild(li);
    });

    sectionEl.appendChild(list);
    body.appendChild(sectionEl);
  });

  updateProgress(houseId);
}

// ─── Progress ───
function updateProgress(houseId) {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const total = checkboxes.length;
  const done = document.querySelectorAll('.task-checkbox:checked').length;

  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-text').textContent = `${done} of ${total} tasks complete`;
  document.getElementById('progress-fill').style.width = pct + '%';

  // Completion banner
  const existing = document.querySelector('.completion-banner');
  if (done === total && total > 0) {
    if (!existing) {
      const banner = document.createElement('div');
      banner.className = 'completion-banner';
      banner.innerHTML = `
        <div class="banner-icon">&#10024;</div>
        <p>All done! Beautiful work.</p>
      `;
      const body = document.getElementById('checklist-body');
      body.parentNode.insertBefore(banner, body);
    }
  } else if (existing) {
    existing.remove();
  }
}

// ─── LocalStorage ───
function storageKey(houseId) {
  return 'edith-checklist-' + houseId;
}

function saveState(houseId) {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const state = {};
  checkboxes.forEach(cb => {
    state[cb.dataset.index] = cb.checked;
  });
  localStorage.setItem(storageKey(houseId), JSON.stringify(state));
}

function loadState(houseId) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(houseId))) || {};
  } catch {
    return {};
  }
}

// ─── Reset ───
function resetChecklist() {
  if (!currentHouse) return;
  if (!confirm('Reset all tasks for this house?')) return;

  localStorage.removeItem(storageKey(currentHouse));
  renderChecklist(currentHouse);
}
