let names = [];
let currentAngle = 0;
let selectedIndex = -1;

document.getElementById('nameInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addName();
    }
});

function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        updateNamesList();
        drawWheel();
        nameInput.value = '';
    }
}

function updateNamesList() {
    const namesList = document.getElementById('namesList');
    namesList.innerHTML = '';
    names.forEach((name, index) => {
        const div = document.createElement('div');
        div.textContent = `${index + 1}. ${name}`;
        namesList.appendChild(div);
    });
}

function drawWheel() {
    const wheel = document.getElementById('wheel');
    wheel.innerHTML = '';
    const numberOfNames = names.length;
    const angleStep = 360 / numberOfNames;
    names.forEach((name, index) => {
        const segment = document.createElement('div');
        segment.className = 'nameSegment';
        segment.style.transform = `rotate(${index * angleStep}deg)`;
        segment.style.backgroundColor = `hsl(${index * angleStep}, 70%, 50%)`;
        segment.textContent = name;
        wheel.appendChild(segment);
    });
}

function spin() {
    if (names.length === 0) return;
    const randomAngle = Math.floor(Math.random() * 360) + 1440; // Spin at least 4 full turns
    currentAngle += randomAngle;
    const wheel = document.getElementById('wheel');
    wheel.style.transform = `rotate(${currentAngle}deg)`;
    setTimeout(() => {
        const selectedAngle = currentAngle % 360;
        selectedIndex = Math.floor((360 - selectedAngle) / (360 / names.length)) % names.length;
        document.getElementById('result').textContent = `Pemenang: ${names[selectedIndex]}`;
        document.getElementById('deleteButton').style.display = 'block';
    }, 4000); // Match the transition time
}

function deleteSelectedName() {
    if (selectedIndex >= 0) {
        names.splice(selectedIndex, 1);
        updateNamesList();
        drawWheel();
        document.getElementById('result').textContent = '';
        document.getElementById('deleteButton').style.display = 'none';
        selectedIndex = -1;
    }
}
