let layer = 1; // Current layer (starting at Alpha)
let count = 0; // Numbers in the current layer
let speed = 1; // Base speed
let lastUpdateTime = 0;
let layerNames = [
  "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω",
  "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"
];
let isSuperLayer = false;
let currentSuper = "";
let storedGame;

// Save/Load Functions
function saveGame() {
  let gameData = { layer, count, speed, isSuperLayer, currentSuper };
  localStorage.setItem("omegaMetaZeroSave", JSON.stringify(gameData));
}

function loadGame() {
  let savedData = localStorage.getItem("omegaMetaZeroSave");
  if (savedData) {
    let gameData = JSON.parse(savedData);
    layer = gameData.layer;
    count = gameData.count;
    speed = gameData.speed;
    isSuperLayer = gameData.isSuperLayer;
    currentSuper = gameData.currentSuper;
  }
}

// Speed Calculation
function getSpeed() {
  let baseSpeed = 0.5; // Base 1 per 0.5 seconds
  if (layer >= 5) baseSpeed *= Math.pow(2, layer - 4); // Doubling every layer after Delta
  if (layerNames[layer - 1] === "π") return baseSpeed + 3;
  if (layerNames[layer - 1] === "τ") return baseSpeed + 6;
  if (layerNames[layer - 1] === "Α") return baseSpeed + 9;
  return baseSpeed;
}

// Color Assignment
function getColor(layerIndex) {
  let colors = [
    "gray", "lightgray", "yellow", "green", "turquoise", "blue", "purple", "pink", "red", "orange"
  ];
  if (layerIndex < colors.length) return colors[layerIndex % colors.length];
  return colors[(layerIndex - 4) % colors.length];
}

// Drawing the Layers
function drawLayer(layerIndex) {
  fill(getColor(layerIndex));
  textAlign(CENTER);
  textSize(64);
  text(
    isSuperLayer
      ? `Ω^${currentSuper}${layerNames[layerIndex % layerNames.length]}`
      : layerNames[layerIndex % layerNames.length],
    width / 2,
    height / 2 - 100
  );
  textSize(32);
  text(`Count: ${count}`, width / 2, height / 2 - 50);
}

// Main Game Function
function updateGame() {
  let now = millis();
  let elapsedTime = now - lastUpdateTime;
  if (elapsedTime >= 1000 / getSpeed()) {
    count++;
    if (count >= 100) {
      if (layer < 48) {
        layer++;
      } else {
        isSuperLayer = true;
        currentSuper = currentSuper ? `Ω^${currentSuper}` : "Ω^";
        layer = 1;
      }
      count = 0; // Reset count on layer up
    }
    lastUpdateTime = now;
  }
}

// Easter Egg Button
function addEasterEgg() {
  let button = createButton("Easter Egg?");
  button.position(20, 20);
  button.mousePressed(() => {
    alert("You found the Easter Egg! Pi > Tau, Alpha > Omega! Infinite recursion awaits!");
  });
}

// P5.js Setup
function setup() {
  createCanvas(800, 600);
  loadGame();
  addEasterEgg();
}

// P5.js Draw Loop
function draw() {
  background(0); // Black background
  drawLayer(layer - 1);
  updateGame();
  saveGame();
}
