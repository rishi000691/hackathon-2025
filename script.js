// User Storage (using localStorage for demo purposes)
function saveUser(username, password) {
    let users = JSON.parse(localStorage.getItem('packpal-users')) || {};
    if (users[username]) {
        return false; // User already exists
    }
    users[username] = password;
    localStorage.setItem('packpal-users', JSON.stringify(users));
    return true;
}

function checkUser(username, password) {
    let users = JSON.parse(localStorage.getItem('packpal-users')) || {};
    return users[username] === password;
}

// Signup Logic
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const signupMessage = document.getElementById('signupMessage');

    if (!username || !password || !confirmPassword) {
        signupMessage.textContent = 'Please fill in all fields.';
        signupMessage.style.color = '#e74c3c';
        return;
    }

    if (password !== confirmPassword) {
        signupMessage.textContent = 'Passwords do not match.';
        signupMessage.style.color = '#e74c3c';
        return;
    }

    if (saveUser(username, password)) {
        signupMessage.textContent = 'Sign up successful! Redirecting to login...';
        signupMessage.style.color = '#2ecc71';
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 1000);
    } else {
        signupMessage.textContent = 'Username already exists.';
        signupMessage.style.color = '#e74c3c';
    }
});

// Login Logic
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    if (checkUser(username, password)) {
        loginMessage.textContent = 'Login successful! Redirecting...';
        loginMessage.style.color = '#2ecc71';
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1000);
    } else {
        loginMessage.textContent = 'Invalid username or password.';
        loginMessage.style.color = '#e74c3c';
    }
});

// Checklist Logic
let items = [];

function addItem() {
    const category = document.getElementById('category').value;
    const itemName = document.getElementById('item-name').value;
    const assignedTo = document.getElementById('assigned-to').value;

    if (!itemName || !assignedTo) {
        alert('Please enter item name and assignee.');
        return;
    }

    const item = {
        id: Date.now(),
        name: itemName,
        category: category,
        assignedTo: assignedTo,
        packed: false
    };

    items.push(item);
    document.getElementById('item-name').value = '';
    document.getElementById('assigned-to').value = '';
    renderChecklist();
    updateProgress();
}

function togglePacked(id) {
    items = items.map(item => 
        item.id === id ? { ...item, packed: !item.packed } : item
    );
    renderChecklist();
    updateProgress();
}

function renderChecklist() {
    const checklist = document.getElementById('checklist');
    checklist.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <input type="checkbox" ${item.packed ? 'checked' : ''} 
                   onchange="togglePacked(${item.id})">
            <span>
                <i class="fas fa-suitcase-rolling"></i>
                ${item.name} <span class="category">${item.category}</span>
            </span>
            <span class="assigned"><i class="fas fa-user"></i> ${item.assignedTo}</span>
        `;
        checklist.appendChild(div);
    });
}

function updateProgress() {
    const total = items.length;
    const packed = items.filter(item => item.packed).length;
    const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);
    document.getElementById('progress-text').textContent = 
        `Progress: ${packed}/${total} (${percentage}%)`;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('PackPal Packing List', 10, 10);

    let y = 20;
    items.forEach(item => {
        doc.setFontSize(12);
        const status = item.packed ? '[X]' : '[ ]';
        doc.text(`${status} ${item.name} (${item.category}) - Assigned to: ${item.assignedTo}`, 10, y);
        y += 10;
    });

    doc.save('PackPal_List.pdf');
}
