const guestForm = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');
const categorySelect = document.getElementById('guest-category');

let guests = [];

guestForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = guestInput.value.trim();
  const category = categorySelect.value;

  if (!name) return;

  if (guests.length >= 10) {
    alert("Guest list limit of 10 reached.");
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    category,
    rsvp: false,
    timeAdded: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  renderGuests();
  guestForm.reset();
});

function renderGuests() {
  guestList.innerHTML = '';
  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = `category-${guest.category}`;
    li.innerHTML = `
      <span>
        <strong>${guest.name}</strong> (${guest.category}) - ${guest.rsvp ? '✅ Attending' : '❌ Not Attending'} 
        <small>${guest.timeAdded}</small>
      </span>
      <span>
        <button onclick="toggleRSVP(${guest.id})">Toggle RSVP</button>
        <button onclick="editGuest(${guest.id})">Edit</button>
        <button onclick="removeGuest(${guest.id})">Remove</button>
      </span>
    `;
    guestList.appendChild(li);
  });
}

window.toggleRSVP = function(id) {
  guests = guests.map(g => g.id === id ? { ...g, rsvp: !g.rsvp } : g);
  renderGuests();
};

window.removeGuest = function(id) {
  guests = guests.filter(g => g.id !== id);
  renderGuests();
};

window.editGuest = function(id) {
  const guest = guests.find(g => g.id === id);
  const newName = prompt("Edit guest name:", guest.name);
  if (newName && newName.trim()) {
    guest.name = newName.trim();
    renderGuests();
  }
};
