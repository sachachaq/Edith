// ─── Checklist Data ───
const HOUSES = {
  'farm-house': {
    name: 'Farm House',
    cadences: {
      daily: [
        {
          room: 'Kitchen',
          icon: '&#129379;',
          tasks: ['Wipe counters', 'Empty trash', 'Load/unload dishwasher', 'Clean sink', 'Sweep floor']
        },
        {
          room: 'Bathrooms',
          icon: '&#128704;',
          tasks: ['Refresh towels', 'Wipe sink', 'Quick toilet wipe', 'Empty trash']
        },
        {
          room: 'Living Room',
          icon: '&#128722;',
          tasks: ['Tidy pillows', 'Straighten blankets', 'Clear surfaces', 'Quick vacuum high-traffic areas']
        },
        {
          room: 'Bedrooms',
          icon: '&#128716;',
          tasks: ['Make beds', 'Tidy nightstands', 'Put away clothes']
        }
      ],
      weekly: [
        {
          room: 'Kitchen',
          icon: '&#129379;',
          tasks: ['Deep clean counters', 'Clean appliance fronts', 'Mop floor', 'Clean inside microwave', 'Wipe cabinet handles']
        },
        {
          room: 'Bathrooms',
          icon: '&#128704;',
          tasks: ['Scrub toilet', 'Clean shower/tub', 'Clean mirrors', 'Mop floor', 'Replace towels']
        },
        {
          room: 'Bedrooms',
          icon: '&#128716;',
          tasks: ['Change bed linens', 'Dust surfaces', 'Vacuum floor', 'Wipe mirrors']
        },
        {
          room: 'Floors',
          icon: '&#129529;',
          tasks: ['Vacuum all rooms', 'Mop hard floors', 'Shake out rugs']
        },
        {
          room: 'Laundry',
          icon: '&#129526;',
          tasks: ['Wash towels', 'Wash bed linens', 'Fold and put away']
        }
      ],
      monthly: [
        {
          room: 'Baseboards',
          icon: '&#128207;',
          tasks: ['Wipe all baseboards', 'Clean door frames', 'Dust vents']
        },
        {
          room: 'Windows',
          icon: '&#127744;',
          tasks: ['Clean window glass', 'Wipe window sills', 'Dust blinds/curtains']
        },
        {
          room: 'Pantry',
          icon: '&#127858;',
          tasks: ['Check expiration dates', 'Wipe shelves', 'Reorganise items']
        },
        {
          room: 'Guest Rooms',
          icon: '&#128715;',
          tasks: ['Dust all surfaces', 'Vacuum thoroughly', 'Fresh linens', 'Restock toiletries']
        },
        {
          room: 'Deep Cleaning',
          icon: '&#10024;',
          tasks: ['Clean behind appliances', 'Wash walls/spots', 'Clean light fixtures', 'Descale taps/showerheads']
        }
      ]
    }
  },
  '16-north-rd': {
    name: '16 North Rd',
    cadences: {
      daily: [
        {
          room: 'Kitchen',
          icon: '&#129379;',
          tasks: ['Wipe counters', 'Empty trash', 'Load/unload dishwasher', 'Clean sink', 'Sweep floor']
        },
        {
          room: 'Bathrooms',
          icon: '&#128704;',
          tasks: ['Refresh towels', 'Wipe sink', 'Quick toilet wipe', 'Empty trash']
        },
        {
          room: 'Living Room',
          icon: '&#128722;',
          tasks: ['Tidy pillows', 'Straighten blankets', 'Clear surfaces', 'Quick vacuum high-traffic areas']
        },
        {
          room: 'Bedrooms',
          icon: '&#128716;',
          tasks: ['Make beds', 'Tidy nightstands', 'Put away clothes']
        }
      ],
      weekly: [
        {
          room: 'Kitchen',
          icon: '&#129379;',
          tasks: ['Deep clean counters', 'Clean appliance fronts', 'Mop floor', 'Clean inside microwave', 'Wipe cabinet handles']
        },
        {
          room: 'Bathrooms',
          icon: '&#128704;',
          tasks: ['Scrub toilet', 'Clean shower/tub', 'Clean mirrors', 'Mop floor', 'Replace towels']
        },
        {
          room: 'Bedrooms',
          icon: '&#128716;',
          tasks: ['Change bed linens', 'Dust surfaces', 'Vacuum floor', 'Wipe mirrors']
        },
        {
          room: 'Floors',
          icon: '&#129529;',
          tasks: ['Vacuum all rooms', 'Mop hard floors', 'Shake out rugs']
        },
        {
          room: 'Laundry',
          icon: '&#129526;',
          tasks: ['Wash towels', 'Wash bed linens', 'Fold and put away']
        }
      ],
      monthly: [
        {
          room: 'Baseboards',
          icon: '&#128207;',
          tasks: ['Wipe all baseboards', 'Clean door frames', 'Dust vents']
        },
        {
          room: 'Windows',
          icon: '&#127744;',
          tasks: ['Clean window glass', 'Wipe window sills', 'Dust blinds/curtains']
        },
        {
          room: 'Pantry',
          icon: '&#127858;',
          tasks: ['Check expiration dates', 'Wipe shelves', 'Reorganise items']
        },
        {
          room: 'Guest Rooms',
          icon: '&#128715;',
          tasks: ['Dust all surfaces', 'Vacuum thoroughly', 'Fresh linens', 'Restock toiletries']
        },
        {
          room: 'Deep Cleaning',
          icon: '&#10024;',
          tasks: ['Clean behind appliances', 'Wash walls/spots', 'Clean light fixtures', 'Descale taps/showerheads']
        }
      ]
    }
  }
};

let currentHouse = null;
let currentCadence = 'daily';

// ─── Navigation ───
function openHouse(houseId) {
  currentHouse = houseId;
  currentCadence = 'daily';
  const house = HOUSES[houseId];

  document.getElementById('house-title').textContent = house.name;
  renderTabs();
  renderChecklist();
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

// ─── Tabs ───
function renderTabs() {
  const container = document.getElementById('cadence-tabs');
  const cadences = ['daily', 'weekly', 'monthly'];

  container.innerHTML = cadences.map(c =>
    `<button class="tab-btn ${c === currentCadence ? 'active' : ''}" onclick="switchCadence('${c}')">${capitalize(c)}</button>`
  ).join('');
}

function switchCadence(cadence) {
  currentCadence = cadence;
  renderTabs();
  renderChecklist();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── Render Checklist ───
function renderChecklist() {
  const house = HOUSES[currentHouse];
  const rooms = house.cadences[currentCadence];
  const saved = loadState(currentHouse, currentCadence);
  const body = document.getElementById('checklist-body');
  body.innerHTML = '';

  rooms.forEach((room, roomIndex) => {
    const card = document.createElement('div');
    card.className = 'room-card';

    const isOpen = roomIndex === 0;
    const roomKey = room.room;

    // Count completed tasks for this room
    const roomDone = room.tasks.filter((_, ti) => saved[`${roomKey}:${ti}`]).length;
    const roomTotal = room.tasks.length;

    card.innerHTML = `
      <button class="room-header ${isOpen ? 'open' : ''}" onclick="toggleRoom(this)" aria-expanded="${isOpen}">
        <span class="room-icon">${room.icon}</span>
        <span class="room-title">${room.room}</span>
        <span class="room-count">${roomDone}/${roomTotal}</span>
        <span class="room-chevron"></span>
      </button>
      <div class="room-body" ${isOpen ? '' : 'style="display:none"'}>
        <ul class="task-list">
          ${room.tasks.map((task, ti) => {
            const key = `${roomKey}:${ti}`;
            const checked = saved[key] || false;
            return `
              <li class="task-item ${checked ? 'checked' : ''}" onclick="toggleTask(this, '${roomKey}', ${ti})">
                <input type="checkbox" class="task-checkbox" ${checked ? 'checked' : ''} tabindex="-1">
                <span class="task-label">${task}</span>
              </li>`;
          }).join('')}
        </ul>
      </div>
    `;

    body.appendChild(card);
  });

  updateProgress();
}

// ─── Room Toggle ───
function toggleRoom(headerEl) {
  const isOpen = headerEl.classList.toggle('open');
  headerEl.setAttribute('aria-expanded', isOpen);
  const body = headerEl.nextElementSibling;
  body.style.display = isOpen ? '' : 'none';
}

// ─── Task Toggle ───
function toggleTask(li, roomKey, taskIndex) {
  const cb = li.querySelector('input');
  cb.checked = !cb.checked;
  li.classList.toggle('checked', cb.checked);
  saveTaskState(roomKey, taskIndex, cb.checked);
  updateProgress();
  updateRoomCount(li.closest('.room-card'));
}

function updateRoomCount(card) {
  const total = card.querySelectorAll('.task-checkbox').length;
  const done = card.querySelectorAll('.task-checkbox:checked').length;
  card.querySelector('.room-count').textContent = `${done}/${total}`;
}

// ─── Progress ───
function updateProgress() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const total = checkboxes.length;
  const done = document.querySelectorAll('.task-checkbox:checked').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const label = capitalize(currentCadence);
  document.getElementById('progress-text').textContent = `${label}: ${done} of ${total} complete`;
  document.getElementById('progress-fill').style.width = pct + '%';
}

// ─── LocalStorage ───
function storageKey(houseId, cadence) {
  return `edith-v2-${houseId}-${cadence}`;
}

function saveTaskState(roomKey, taskIndex, checked) {
  const state = loadState(currentHouse, currentCadence);
  state[`${roomKey}:${taskIndex}`] = checked;
  localStorage.setItem(storageKey(currentHouse, currentCadence), JSON.stringify(state));
}

function loadState(houseId, cadence) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(houseId, cadence))) || {};
  } catch {
    return {};
  }
}

// ─── Reset ───
function resetChecklist() {
  if (!currentHouse) return;
  if (!confirm(`Reset all ${currentCadence} tasks for this house?`)) return;

  localStorage.removeItem(storageKey(currentHouse, currentCadence));
  renderChecklist();
}
