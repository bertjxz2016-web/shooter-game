const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ui = {
  healthMeter: document.getElementById("healthMeter"),
  staminaMeter: document.getElementById("staminaMeter"),
  healthText: document.getElementById("healthText"),
  staminaText: document.getElementById("staminaText"),
  clockText: document.getElementById("clockText"),
  resourceText: document.getElementById("resourceText"),
  modeText: document.getElementById("modeText"),
  mapText: document.getElementById("mapText"),
  enemyText: document.getElementById("enemyText"),
  difficultyText: document.getElementById("difficultyText"),
  weaponText: document.getElementById("weaponText"),
  ammoText: document.getElementById("ammoText"),
  trapText: document.getElementById("trapText"),
  rewardText: document.getElementById("rewardText"),
  loadoutText: document.getElementById("loadoutText"),
  chatLog: document.getElementById("chatLog"),
  inventoryGrid: document.getElementById("inventoryGrid"),
  overlay: document.getElementById("overlay"),
  overlayTitle: document.getElementById("overlayTitle"),
  overlayBody: document.getElementById("overlayBody"),
  startBtn: document.getElementById("startBtn"),
  restartBtn: document.getElementById("restartBtn"),
  spinMapBtn: document.getElementById("spinMapBtn"),
  modeSelect: document.getElementById("modeSelect"),
  wheel: document.getElementById("wheel"),
  wheelLabel: document.getElementById("wheelLabel"),
  shopBtn: document.getElementById("shopBtn"),
  dailyBtn: document.getElementById("dailyBtn"),
  shopOverlay: document.getElementById("shopOverlay"),
  closeShopBtn: document.getElementById("closeShopBtn"),
  gunList: document.getElementById("gunList"),
  armorList: document.getElementById("armorList"),
  hitFlash: document.getElementById("hitFlash"),
  duelHud: document.getElementById("duelHud"),
  playerRoundScore: document.getElementById("playerRoundScore"),
  rivalRoundScore: document.getElementById("rivalRoundScore"),
  roundLabel: document.getElementById("roundLabel"),
  roundBanner: document.getElementById("roundBanner"),
  difficultyButtons: [...document.querySelectorAll("[data-difficulty]")]
};

const maps = [
  { name: "Warehouse", sky: "#34404d", ground: "#56514b", wall: "#8b9097", prop: "#d08f42" },
  { name: "Forest", sky: "#618a7b", ground: "#31472a", wall: "#755a36", prop: "#7bc779" },
  { name: "Small city block", sky: "#627991", ground: "#3b3f46", wall: "#a1a8b3", prop: "#e2b857" },
  { name: "Space station", sky: "#151a34", ground: "#273142", wall: "#b9c7d8", prop: "#69e1ff" },
  { name: "Desert military base", sky: "#c89558", ground: "#a9763e", wall: "#6f745e", prop: "#d6c16f" },
  { name: "Abandoned village", sky: "#8d7b65", ground: "#5c4a3d", wall: "#8e705c", prop: "#b8584d" },
  { name: "Mall", sky: "#7b92a5", ground: "#e6d8bd", wall: "#d7d9df", prop: "#f08cb0" },
  { name: "High-rise office", sky: "#506d91", ground: "#29303a", wall: "#c3ccd5", prop: "#84c8ff" }
];

const backgroundThemes = {
  "Warehouse": {
    scene: "warehouse", skyTop: "#111820", skyMid: "#2a333b", skyHorizon: "#626b70",
    groundFar: "#55524c", groundNear: "#17191c", haze: "rgba(199, 210, 213, .2)",
    light: "#ffd79c", cloud: "rgba(222, 230, 232, .2)"
  },
  "Forest": {
    scene: "forest", skyTop: "#315666", skyMid: "#6f988d", skyHorizon: "#c0c5a8",
    groundFar: "#40583a", groundNear: "#101d13", haze: "rgba(198, 218, 190, .22)",
    light: "#ffe0a1", cloud: "rgba(239, 242, 224, .42)"
  },
  "Small city block": {
    scene: "city", skyTop: "#384f68", skyMid: "#7790a3", skyHorizon: "#c6b9a5",
    groundFar: "#555b60", groundNear: "#181b1e", haze: "rgba(210, 214, 216, .24)",
    light: "#ffd7a3", cloud: "rgba(232, 237, 239, .36)"
  },
  "Space station": {
    scene: "space", skyTop: "#02040d", skyMid: "#0a1024", skyHorizon: "#1d2945",
    groundFar: "#313b4a", groundNear: "#090d14", haze: "rgba(105, 179, 218, .18)",
    light: "#75dfff", cloud: "rgba(255, 255, 255, 0)"
  },
  "Desert military base": {
    scene: "desert", skyTop: "#4f7fa2", skyMid: "#b6a37e", skyHorizon: "#e2b06e",
    groundFar: "#a87945", groundNear: "#3a291b", haze: "rgba(241, 200, 139, .3)",
    light: "#ffe0a0", cloud: "rgba(241, 229, 204, .24)"
  },
  "Abandoned village": {
    scene: "village", skyTop: "#45576a", skyMid: "#8a8174", skyHorizon: "#c39a73",
    groundFar: "#665242", groundNear: "#211813", haze: "rgba(207, 187, 167, .24)",
    light: "#ffd0a0", cloud: "rgba(222, 218, 209, .3)"
  },
  "Mall": {
    scene: "mall", skyTop: "#29343e", skyMid: "#788a94", skyHorizon: "#d7d5ca",
    groundFar: "#d1c7b6", groundNear: "#403d3b", haze: "rgba(232, 235, 230, .2)",
    light: "#fff0c2", cloud: "rgba(255, 255, 255, 0)"
  },
  "High-rise office": {
    scene: "office", skyTop: "#324c69", skyMid: "#7592a9", skyHorizon: "#d1c5b5",
    groundFar: "#414951", groundNear: "#12171c", haze: "rgba(214, 222, 224, .24)",
    light: "#ffd6a4", cloud: "rgba(235, 240, 242, .28)"
  }
};

const buildingThemes = {
  "Warehouse": {
    name: "Operations room", exterior: "#59636b", roof: "#242b31",
    wall: "#65717a", floor: "#30363b", ceiling: "#20262b", trim: "#d59a4d", accent: "#ffd17f"
  },
  "Forest": {
    name: "Ranger cabin", exterior: "#624a35", roof: "#29372d",
    wall: "#765b42", floor: "#372a20", ceiling: "#30271f", trim: "#9b744a", accent: "#f2cb81"
  },
  "Small city block": {
    name: "Corner store", exterior: "#777f88", roof: "#30373e",
    wall: "#737d85", floor: "#343b40", ceiling: "#252c32", trim: "#d9b85c", accent: "#ffe190"
  },
  "Space station": {
    name: "Habitat module", exterior: "#566578", roof: "#182233",
    wall: "#5d6c7c", floor: "#202936", ceiling: "#121a27", trim: "#52bfdc", accent: "#8be9ff"
  },
  "Desert military base": {
    name: "Field bunker", exterior: "#77745f", roof: "#42463d",
    wall: "#797763", floor: "#423f35", ceiling: "#32342f", trim: "#bdab68", accent: "#f0d789"
  },
  "Abandoned village": {
    name: "Stone house", exterior: "#756454", roof: "#43332e",
    wall: "#75675b", floor: "#3b302a", ceiling: "#302724", trim: "#9e7760", accent: "#edba82"
  },
  "Mall": {
    name: "Security office", exterior: "#a7adb1", roof: "#596168",
    wall: "#a8afb2", floor: "#686b6b", ceiling: "#555d61", trim: "#d77896", accent: "#ffd6e3"
  },
  "High-rise office": {
    name: "Lobby suite", exterior: "#697986", roof: "#2b3540",
    wall: "#78858e", floor: "#363e44", ceiling: "#252d34", trim: "#6db0d0", accent: "#a8e3ff"
  }
};

const buildingNames = {
  "Warehouse": ["Operations room", "Loading office", "Tool room", "Storage annex"],
  "Forest": ["Ranger cabin", "Hunting lodge", "Supply hut", "Fire lookout"],
  "Small city block": ["Corner store", "Apartment lobby", "Repair shop", "Cafe"],
  "Space station": ["Habitat module", "Research pod", "Cargo airlock", "Command room"],
  "Desert military base": ["Field bunker", "Radio post", "Supply depot", "Barracks"],
  "Abandoned village": ["Stone house", "Old chapel", "Blacksmith shop", "Farmhouse"],
  "Mall": ["Security office", "Arcade", "Back-room store", "Food court shop"],
  "High-rise office": ["Lobby suite", "Conference room", "Executive office", "Server room"]
};

const interiorFurnitureTypes = {
  warehouse: ["shelf", "crate", "locker", "crate", "desk", "chair", "shelf", "console", "bench", "crate", "locker", "barrel"],
  forest: ["table", "chair", "bed", "shelf", "crate", "chair", "cabinet", "bench", "plant", "table", "crate", "barrel"],
  city: ["counter", "shelf", "table", "chair", "cabinet", "crate", "bench", "plant", "desk", "chair", "shelf", "barrel"],
  space: ["console", "locker", "console", "crate", "pod", "bench", "locker", "console", "crate", "chair", "cabinet", "barrel"],
  desert: ["crate", "locker", "table", "chair", "bed", "crate", "shelf", "bench", "radio", "barrel", "cabinet", "crate"],
  village: ["table", "chair", "bed", "shelf", "crate", "bench", "cabinet", "barrel", "table", "chair", "crate", "shelf"],
  mall: ["counter", "shelf", "bench", "table", "chair", "plant", "cabinet", "crate", "counter", "chair", "shelf", "plant"],
  office: ["desk", "chair", "cabinet", "plant", "desk", "chair", "shelf", "console", "bench", "plant", "locker", "table"]
};

const INTERIOR_BOUNDS = {
  minX: -210,
  maxX: 210,
  minY: -200,
  maxY: 210,
  doorHalfWidth: 72
};

const difficultySettings = {
  Easy: {
    duelSpeedFactor: .62, roamingSpeed: [40, 62], accuracy: .68,
    minAccuracy: .1, maxAccuracy: .58, fireDelay: 1.45, damage: .78,
    playerFocus: .42, reaction: 1.3
  },
  Medium: {
    duelSpeedFactor: .81, roamingSpeed: [58, 88], accuracy: .92,
    minAccuracy: .16, maxAccuracy: .82, fireDelay: 1, damage: 1,
    playerFocus: .55, reaction: 1
  },
  Hard: {
    duelSpeedFactor: 1, roamingSpeed: [90, 130], accuracy: 1.18,
    minAccuracy: .24, maxAccuracy: .94, fireDelay: .72, damage: 1.22,
    playerFocus: .72, reaction: .72
  }
};

const weapons = [
  ["Slingshot", 1, 1.3, 280, 1, 0, 1],
  ["Pocket Pistol", 1.5, 2.5, 330, 7, 0, 1],
  ["Revolver", 2.5, 1.6, 420, 6, 1, 1],
  ["Light Pistol", 4, 2.7, 440, 10, 3, 1],
  ["Machine Pistol", 6, 5.5, 310, 18, 5, 1],
  ["SMG", 9, 6.5, 330, 24, 7, 1],
  ["Compact SMG", 11, 6.8, 340, 26, 13, 1],
  ["Burst SMG", 13.5, 4.4, 480, 24, 20, 1],
  ["Tactical Shotgun", 16, 1.4, 220, 6, 23, 2],
  ["Pump Shotgun", 20, 0.9, 210, 5, 30, 2],
  ["Auto Shotgun", 23, 2.2, 250, 8, 35, 3],
  ["Carbine Rifle", 26.5, 3.3, 560, 20, 45, 3],
  ["Assault Rifle", 30, 3.4, 600, 24, 48, 3],
  ["Burst Rifle", 35, 2.6, 720, 18, 53, 4],
  ["Heavy Assault Rifle", 41, 2.3, 760, 20, 58, 4],
  ["Battle Rifle", 49.5, 1.8, 800, 12, 65, 4],
  ["DMR", 54, 1.5, 930, 10, 74, 5],
  ["Crossbow", 59, 0.85, 730, 1, 90, 5],
  ["Sniper Rifle", 68, 0.7, 1050, 5, 100, 6],
  ["Anti-Materiel Rifle", 76, 0.55, 1150, 3, 130, 7],
  ["Grenade Launcher", 83, 1, 520, 4, 150, 7],
  ["Flamethrower", 90, 3.6, 260, 30, 180, 8],
  ["Minigun", 99, 7, 620, 60, 220, 8],
  ["Railgun", 107, 0.75, 1150, 2, 280, 10],
  ["Laser Rifle", 120, 2.8, 850, 16, 300, 10],
  ["Plasma Cannon", 133, 1.15, 820, 5, 340, 14],
  ["Rocket Launcher", 140, 0.7, 780, 3, 380, 18],
  ["Homing Missile Launcher", 149, 0.65, 920, 3, 500, 22],
  ["Orbital Strike Beacon", 170, 0.35, 9999, 1, 900, 50],
  ["Experimental Singularity Cannon", 250, 0.25, 980, 1, 6741, 219]
].map((w, i) => ({ rank: i + 1, name: w[0], damage: w[1], rate: w[2], range: w[3], magazine: w[4], diamonds: w[5], level: w[6] }));

const armors = [
  ["Cloth Shirt", 0, 1, "None", 0, 1],
  ["Leather Vest", .06, .99, "Light protection", 10, 2],
  ["Reinforced Jacket", .09, .96, "Small bullet resistance", 20, 2],
  ["Kevlar Vest", .14, .95, "Better bullet protection", 30, 2],
  ["Security Armor", .17, .94, "Extra durability", 40, 3],
  ["Tactical Vest", .2, .93, "More inventory confidence", 50, 4],
  ["Combat Armor", .24, .88, "Balanced defense", 65, 5],
  ["Heavy Tactical Armor", .29, .84, "Reduced explosive damage", 80, 7],
  ["Riot Armor", .32, .78, "High trap resistance", 100, 8],
  ["Military Body Armor", .34, .84, "All-around protection", 120, 9],
  ["Advanced Combat Armor", .37, .86, "Faster health regeneration", 140, 10],
  ["Juggernaut Armor", .45, .76, "Very high defense", 160, 11],
  ["Nano-Fiber Suit", .31, 1.06, "Faster movement", 190, 12],
  ["Stealth Armor", .3, 1.03, "Harder to detect", 220, 13],
  ["Exo Suit", .38, 1.02, "Increased jump height", 260, 14],
  ["Power Armor", .48, .84, "Greatly increased health", 410, 17],
  ["Energy Shield Armor", .46, .96, "Rechargeable shield", 490, 19],
  ["Titan Armor", .58, .72, "Extremely high resistance", 540, 21],
  ["Quantum Armor", .52, 1.08, "Speed bursts and shield", 800, 60],
  ["Omega Armor", .64, .9, "Massive protection", 4000, 167]
].map((a, i) => ({ rank: i + 1, name: a[0], protection: a[1], speed: a[2], effect: a[3], diamonds: a[4], level: a[5] }));

const keys = new Set();
const pointer = { locked: false };
let lastTime = performance.now();
let wheelTurns = 0;
let audioContext = null;
const EXHAUSTION_RECOVERY = 20;
const MOVE_EXHAUSTION_RATE = 2;
const SPRINT_EXHAUSTION_RATE = 3;
const REST_EXHAUSTION_RATE = 2;
const CHARACTER_WORLD_HEIGHT = 118;

function createStarterInventory() {
  return [
    { name: "Apple", type: "food", count: 1, heal: 22 },
    { name: "Water", type: "water", count: 1 },
    { name: "Sandwich", type: "food", count: 1, heal: 36 },
    null, null, null, null, null, null
  ];
}

const state = {
  running: false,
  won: false,
  selectedMap: null,
  map: maps[0],
  mode: "Rival Duel (first to 5)",
  difficulty: "Medium",
  time: 0,
  lastNoKillCheck: 0,
  lastTrapMinute: 0,
  insideBuilding: false,
  currentBuildingId: null,
  buildingReturn: null,
  buildingCooldown: 0,
  diamonds: 12,
  level: 1,
  shards: 0,
  kills: 0,
  playerRounds: 0,
  rivalRounds: 0,
  roundNumber: 1,
  duelPhase: "menu",
  phaseTimer: 0,
  roundMessage: "",
  player: { x: 0, y: 0, angle: 0, pitch: 0, health: 150, stamina: 150, exhausted: false, z: 0, vz: 0, reload: 0, shootCd: 0, trapped: 0 },
  weaponRank: 1,
  armorRank: 1,
  ammo: 1,
  enemies: [],
  traps: [],
  props: [],
  tracers: [],
  particles: [],
  casings: [],
  floatText: [],
  hitMarker: 0,
  shake: 0,
  recoil: 0,
  muzzleFlash: 0,
  damageArc: { life: 0, angle: 0 },
  chat: [],
  inventory: createStarterInventory()
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function getAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  if (audioContext?.state === "suspended") audioContext.resume();
  return audioContext;
}

function playShotSound(rank = 1, incoming = false) {
  const audio = getAudioContext();
  if (!audio) return;
  const now = audio.currentTime;
  const duration = incoming ? .09 : .14;
  const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * duration), audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const envelope = Math.pow(1 - i / data.length, incoming ? 3.8 : 2.4);
    data[i] = (Math.random() * 2 - 1) * envelope;
  }
  const noise = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  noise.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(incoming ? 1900 : 1200 + Math.min(rank, 18) * 45, now);
  gain.gain.setValueAtTime(incoming ? .055 : .11, now);
  gain.gain.exponentialRampToValueAtTime(.001, now + duration);
  noise.connect(filter).connect(gain).connect(audio.destination);
  noise.start(now);

  if (!incoming) {
    const thump = audio.createOscillator();
    const thumpGain = audio.createGain();
    thump.type = "triangle";
    thump.frequency.setValueAtTime(105 - Math.min(rank, 20) * 1.8, now);
    thump.frequency.exponentialRampToValueAtTime(42, now + .11);
    thumpGain.gain.setValueAtTime(.16, now);
    thumpGain.gain.exponentialRampToValueAtTime(.001, now + .12);
    thump.connect(thumpGain).connect(audio.destination);
    thump.start(now);
    thump.stop(now + .13);
  }
}

function playImpactSound(hitPlayer = false) {
  const audio = getAudioContext();
  if (!audio) return;
  const now = audio.currentTime;
  const ping = audio.createOscillator();
  const gain = audio.createGain();
  ping.type = hitPlayer ? "sawtooth" : "square";
  ping.frequency.setValueAtTime(hitPlayer ? 92 : 780, now);
  ping.frequency.exponentialRampToValueAtTime(hitPlayer ? 48 : 260, now + .08);
  gain.gain.setValueAtTime(hitPlayer ? .09 : .045, now);
  gain.gain.exponentialRampToValueAtTime(.001, now + .09);
  ping.connect(gain).connect(audio.destination);
  ping.start(now);
  ping.stop(now + .1);
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function weapon() {
  return weapons[state.weaponRank - 1];
}

function armor() {
  return armors[state.armorRank - 1];
}

function difficulty() {
  return difficultySettings[state.difficulty] || difficultySettings.Medium;
}

function addChat(text) {
  const minutes = Math.floor(state.time / 60).toString().padStart(2, "0");
  const seconds = Math.floor(state.time % 60).toString().padStart(2, "0");
  state.chat.push({ time: `${minutes}:${seconds}`, text });
  state.chat = state.chat.slice(-10);
  ui.chatLog.innerHTML = state.chat.map(line => `<div class="chat-line"><span>${line.time}</span> ${line.text}</div>`).join("");
}

function modeEnemyCount() {
  if (isRivalDuel()) return 1;
  if (state.mode.includes("1v1")) return 1;
  if (state.mode.includes("4v4")) return 4;
  if (state.mode.includes("6v6")) return 6;
  if (state.mode.includes("8")) return 7;
  if (state.mode.includes("Bedwars")) return 11;
  return 5;
}

function isRivalDuel() {
  return state.mode.includes("Rival Duel");
}

function arenaSize() {
  if (isRivalDuel()) return 980;
  if (state.mode.includes("1v1")) return 950;
  if (state.mode.includes("8") || state.mode.includes("6v6") || state.mode.includes("Bedwars")) return 1700;
  if (state.mode.includes("4v4")) return 1450;
  return 1300;
}

function mapBuildings() {
  const style = buildingThemes[state.map.name] || buildingThemes.Forest;
  const names = buildingNames[state.map.name] || buildingNames.Forest;
  const size = arenaSize();
  const xSpread = Math.min(320, size * .22);
  const ySpread = Math.min(390, size * .28);
  const positions = [
    [-xSpread, ySpread],
    [xSpread, ySpread],
    [-xSpread, -ySpread],
    [xSpread, -ySpread]
  ];
  return positions.map(([x, y], index) => ({
    ...style,
    id: `${state.map.name}-${index}`,
    index,
    scene: (backgroundThemes[state.map.name] || backgroundThemes.Forest).scene,
    name: names[index],
    x,
    y,
    width: 220,
    height: 155,
    interactionRadius: 128,
    autoEnterRadius: 54
  }));
}

function activeBuilding() {
  const buildings = mapBuildings();
  if (state.currentBuildingId) {
    const selected = buildings.find(building => building.id === state.currentBuildingId);
    if (selected) return selected;
  }
  return buildings.reduce((nearest, building) => (
    dist(state.player, building) < dist(state.player, nearest) ? building : nearest
  ), buildings[0]);
}

function interiorProps(building = activeBuilding()) {
  const types = interiorFurnitureTypes[building.scene] || interiorFurnitureTypes.forest;
  const positions = [
    [-166, -78], [166, -72], [-170, 18], [170, 22],
    [-166, 112], [166, 116], [-145, 178], [-55, 178],
    [42, 178], [138, 178], [-92, 78], [96, 82]
  ];
  const sizeByType = {
    shelf: [29, 105], locker: [27, 98], cabinet: [30, 86], console: [34, 68],
    desk: [42, 54], counter: [44, 64], table: [39, 50], chair: [21, 44],
    bed: [46, 38], pod: [42, 72], bench: [37, 36], plant: [24, 68],
    crate: [29, 53], barrel: [23, 55], radio: [28, 74]
  };
  return positions.map(([x, y], index) => {
    const type = types[(index + building.index * 2) % types.length];
    const [radius, height] = sizeByType[type] || [28, 52];
    return {
      id: `${building.id}-furniture-${index}`,
      x: building.index % 2 ? -x : x,
      y,
      radius,
      height,
      type,
      tint: index % 3 === 0 ? building.accent : index % 2 ? building.trim : building.exterior
    };
  });
}

function resolveInteriorPosition(currentX, currentY, nextX, nextY, entityRadius = 18) {
  let x = clamp(nextX, INTERIOR_BOUNDS.minX + 24, INTERIOR_BOUNDS.maxX - 24);
  let y = clamp(nextY, INTERIOR_BOUNDS.minY + 8, INTERIOR_BOUNDS.maxY - 24);
  for (const furniture of interiorProps()) {
    const minDistance = furniture.radius + entityRadius;
    const gapX = x - furniture.x;
    const gapY = y - furniture.y;
    const gap = Math.hypot(gapX, gapY);
    if (gap >= minDistance) continue;
    if (gap < 1) {
      x = currentX;
      y = currentY;
      continue;
    }
    x = furniture.x + gapX / gap * minDistance;
    y = furniture.y + gapY / gap * minDistance;
  }
  return {
    x: clamp(x, INTERIOR_BOUNDS.minX + 24, INTERIOR_BOUNDS.maxX - 24),
    y: clamp(y, INTERIOR_BOUNDS.minY + 8, INTERIOR_BOUNDS.maxY - 24)
  };
}

function nearExteriorEntrance() {
  const building = activeBuilding();
  return dist(state.player, building) <= building.interactionRadius;
}

function nearInteriorExit() {
  const p = state.player;
  return p.y <= INTERIOR_BOUNDS.minY + 92
    && Math.abs(p.x) <= INTERIOR_BOUNDS.doorHalfWidth + 24;
}

function clearBuildingTransitionEffects() {
  state.tracers = [];
  state.particles = [];
  state.casings = [];
  state.floatText = [];
  state.hitMarker = 0;
  state.shake = 0;
  state.recoil = 0;
  state.muzzleFlash = 0;
  state.damageArc = { life: 0, angle: 0 };
}

function enterBuilding() {
  if (!state.running || state.insideBuilding || state.buildingCooldown > 0 || !nearExteriorEntrance()) return false;
  const building = activeBuilding();
  const p = state.player;
  state.buildingReturn = {
    buildingId: building.id,
    player: { x: p.x, y: p.y, angle: p.angle, pitch: p.pitch },
    enemies: state.enemies.map(enemy => ({
      id: enemy.id,
      x: enemy.x,
      y: enemy.y,
      angle: enemy.angle
    }))
  };
  state.currentBuildingId = building.id;
  state.insideBuilding = true;
  state.buildingCooldown = .8;
  p.x = 0;
  p.y = -105;
  p.angle = Math.PI / 2;
  p.pitch = 0;
  p.z = 0;
  p.vz = 0;

  const livingEnemies = state.enemies.filter(enemy => enemy.alive);
  const enemyEntryPoints = [
    [-112, 28], [112, 28], [-34, 82], [34, 82],
    [-122, 148], [122, 148], [0, 156], [-62, 16],
    [62, 16], [0, 112], [-72, 132], [72, 132]
  ];
  livingEnemies.forEach((enemy, index) => {
    const spawn = enemyEntryPoints[index % enemyEntryPoints.length];
    const resolved = resolveInteriorPosition(spawn[0], spawn[1], spawn[0], spawn[1], 20);
    enemy.x = resolved.x;
    enemy.y = resolved.y;
    enemy.angle = -Math.PI / 2;
    enemy.shootCd = Math.max(enemy.shootCd, .8);
    enemy.targetCd = 0;
  });
  clearBuildingTransitionEffects();
  addChat(`You entered the ${building.name}.`);
  return true;
}

function exitBuilding(ignoreDoor = false) {
  if (!state.insideBuilding || state.buildingCooldown > 0) return false;
  if (!ignoreDoor && !nearInteriorExit()) return false;
  const building = activeBuilding();
  const saved = state.buildingReturn;
  const p = state.player;
  const savedPlayer = saved?.player || {
    x: building.x,
    y: building.y - building.interactionRadius,
    angle: -Math.PI / 2,
    pitch: 0
  };
  let awayX = savedPlayer.x - building.x;
  let awayY = savedPlayer.y - building.y;
  let awayLength = Math.hypot(awayX, awayY);
  if (awayLength < 1) {
    awayX = 0;
    awayY = -1;
    awayLength = 1;
  }
  const exitDistance = building.interactionRadius + 24;
  const size = arenaSize();
  p.x = clamp(building.x + awayX / awayLength * exitDistance, -size / 2 + 36, size / 2 - 36);
  p.y = clamp(building.y + awayY / awayLength * exitDistance, -size / 2 + 36, size / 2 - 36);
  p.angle = savedPlayer.angle;
  p.pitch = savedPlayer.pitch;
  p.z = 0;
  p.vz = 0;

  for (const enemy of state.enemies) {
    const enemyReturn = saved?.enemies.find(item => item.id === enemy.id);
    if (!enemyReturn) continue;
    enemy.x = enemyReturn.x;
    enemy.y = enemyReturn.y;
    enemy.angle = enemyReturn.angle;
    enemy.shootCd = Math.max(enemy.shootCd, .6);
    enemy.targetCd = 0;
  }
  state.insideBuilding = false;
  state.currentBuildingId = null;
  state.buildingReturn = null;
  state.buildingCooldown = .8;
  clearBuildingTransitionEffects();
  addChat(`You left the ${building.name}.`);
  return true;
}

function toggleBuilding() {
  if (state.insideBuilding) exitBuilding();
  else enterBuilding();
}

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function randomPoint(size) {
  return { x: rand(-size * .43, size * .43), y: rand(-size * .43, size * .43) };
}

function generateProps(size) {
  const names = {
    "Warehouse": ["crate", "forklift", "rack"],
    "Forest": ["tree", "rock", "log"],
    "Small city block": ["car", "kiosk", "barrier"],
    "Space station": ["console", "pod", "antenna"],
    "Desert military base": ["sandbags", "tower", "jeep"],
    "Abandoned village": ["well", "ruin", "cart"],
    "Mall": ["shop", "fountain", "bench"],
    "High-rise office": ["desk", "pillar", "plant"]
  }[state.map.name] || ["cover"];

  state.props = [];
  if (isRivalDuel()) return;

  for (let i = 0; i < 32; i++) {
    const p = randomPoint(size);
    const type = i % 7 === 0 ? "ramp" : i % 3 === 0 ? "cover" : "crate";
    state.props.push({
      ...p,
      radius: rand(24, 58),
      height: rand(45, 130),
      name: names[i % names.length],
      type,
      tint: i % 2 ? state.map.prop : state.map.wall
    });
  }
}

function generateTraps(size) {
  state.traps = [];
  for (let i = 0; i < 5; i++) state.traps.push({ ...randomPoint(size), type: "mine", radius: 32, active: true });
  for (let i = 0; i < 8; i++) state.traps.push({ ...randomPoint(size), type: "hole", radius: 38, depth: Math.floor(rand(1, 16)), active: true });
  for (let i = 0; i < 3; i++) state.traps.push({ ...randomPoint(size), type: "pitfall", radius: 46, depth: Math.floor(rand(6, 16)), active: true });
}

function spawnEnemies(size) {
  const names = ["Ridge", "Bolt", "Echo", "Mako", "Vex", "Shade", "Pixel", "Drift", "Nova", "Jett", "Orbit"];
  const botDifficulty = difficulty();
  state.enemies = [];
  for (let i = 0; i < modeEnemyCount(); i++) {
    const p = randomPoint(size);
    const rank = isRivalDuel()
      ? state.weaponRank
      : clamp(Math.floor(state.level / 2) + 1 + Math.floor(rand(0, 4)), 1, weapons.length);
    const health = isRivalDuel()
      ? (state.armorRank >= 16 ? 190 : 150)
      : 46 + state.level * 4 + rand(0, 22);
    state.enemies.push({
      id: names[i],
      ...p,
      angle: rand(0, Math.PI * 2),
      health,
      maxHealth: health,
      stamina: 150,
      exhausted: false,
      weaponRank: rank,
      armor: isRivalDuel() ? state.armorRank : clamp(Math.floor(rank / 2), 1, armors.length),
      speed: isRivalDuel()
        ? 185 * armor().speed * botDifficulty.duelSpeedFactor
        : rand(...botDifficulty.roamingSpeed),
      shootCd: rand(.2, 1.6) * botDifficulty.fireDelay,
      tacticCd: rand(.3, 1.1),
      strafeDir: Math.random() < .5 ? -1 : 1,
      targetCd: rand(0, .8),
      targetId: null,
      supplyCd: 0,
      supplies: { water: 1, apple: 1, sandwich: 1 },
      alive: true,
      trapped: 0
    });
  }
}

function resetCombatants(regenerateArena = true) {
  const size = arenaSize();
  state.insideBuilding = false;
  state.currentBuildingId = null;
  state.buildingReturn = null;
  state.buildingCooldown = 0;
  state.player = { x: 0, y: 0, angle: 0, pitch: 0, health: 150, stamina: 150, exhausted: false, z: 0, vz: 0, reload: 0, shootCd: 0, trapped: 0 };
  state.inventory = createStarterInventory();
  if (state.armorRank >= 16) state.player.health = 190;
  state.ammo = weapon().magazine;
  state.tracers = [];
  state.particles = [];
  state.casings = [];
  state.floatText = [];
  state.hitMarker = 0;
  state.shake = 0;
  state.recoil = 0;
  state.muzzleFlash = 0;
  state.damageArc = { life: 0, angle: 0 };
  if (regenerateArena) generateProps(size);
  if (isRivalDuel()) {
    state.traps = [];
  } else if (regenerateArena) {
    generateTraps(size);
  }
  spawnEnemies(size);

  if (isRivalDuel()) {
    state.player.x = -size * .31;
    state.player.y = 0;
    state.player.angle = 0;
    const rival = state.enemies[0];
    rival.x = size * .31;
    rival.y = 0;
    rival.angle = Math.PI;
    rival.targetId = "player";
    rival.targetCd = 4;
  }

  renderInventory();
  ui.overlay.classList.add("hidden");
}

function startDuelRound(regenerateArena = false) {
  resetCombatants(regenerateArena);
  state.running = false;
  state.duelPhase = "countdown";
  state.phaseTimer = 3.2;
  state.roundMessage = "";
  addChat(`Round ${state.roundNumber}: you versus ${state.enemies[0].id}.`);
}

function resetMatch() {
  state.time = 0;
  state.kills = 0;
  state.won = false;
  state.playerRounds = 0;
  state.rivalRounds = 0;
  state.roundNumber = 1;

  if (isRivalDuel()) {
    startDuelRound(true);
    addChat(`${state.mode} started on ${state.map.name} at ${state.difficulty} difficulty. First to 5 rounds wins.`);
  } else {
    state.duelPhase = "off";
    state.running = true;
    resetCombatants(true);
    addChat(`${state.mode} started on ${state.map.name} at ${state.difficulty} difficulty.`);
    addChat("Eliminate every opponent before they eliminate you.");
  }
}

function finishDuelRound(playerWon, reason) {
  if (!isRivalDuel() || state.duelPhase !== "playing") return;
  state.running = false;
  state.duelPhase = "roundEnd";
  state.phaseTimer = 2.25;
  if (playerWon) state.playerRounds += 1;
  else state.rivalRounds += 1;
  state.roundMessage = playerWon ? "ROUND WON" : "ROUND LOST";
  addChat(`${state.roundMessage}. Score: ${state.playerRounds}-${state.rivalRounds}${reason ? ` (${reason})` : ""}.`);
}

function handlePlayerDefeat(reason) {
  if (isRivalDuel()) finishDuelRound(false, reason);
  else endMatch(false, reason);
}

function handleAllEnemiesDefeated(reason = "Rival eliminated") {
  if (!state.enemies.every(enemy => !enemy.alive)) return;
  if (isRivalDuel()) finishDuelRound(true, reason);
  else endMatch(true);
}

function endMatch(won, reason) {
  state.running = false;
  state.won = won;
  if (isRivalDuel()) state.duelPhase = "matchEnd";
  if (won) {
    const diamonds = 10 + state.kills * 4 + Math.floor(state.time / 60);
    state.diamonds += diamonds;
    if (state.kills >= 3) state.level += 1;
    if (state.time > 2400) state.shards += 1;
    ui.overlayTitle.textContent = isRivalDuel() ? "Duel Victory" : "Victory";
    ui.overlayBody.textContent = isRivalDuel()
      ? `You won ${state.playerRounds}-${state.rivalRounds} on ${state.map.name}. Reward: ${diamonds} diamonds.`
      : `You won on ${state.map.name}. Reward: ${diamonds} diamonds${state.kills >= 3 ? " and 1 level" : ""}.`;
    addChat(`You won and earned ${diamonds} diamonds.`);
  } else {
    ui.overlayTitle.textContent = isRivalDuel() ? "Duel Defeat" : "Defeat";
    ui.overlayBody.textContent = isRivalDuel()
      ? `Your rival won ${state.rivalRounds}-${state.playerRounds}. ${reason || "Restart for a rematch."}`
      : reason || "You were eliminated. Restart to try a new battle.";
    addChat("You were eliminated.");
  }
  ui.overlay.classList.remove("hidden");
}

function takeDamage(amount, source) {
  if (!state.running) return;
  const reduced = amount * (1 - armor().protection);
  state.player.health = clamp(state.player.health - reduced, 0, 220);
  const attacker = state.enemies.find(enemy => enemy.id === source);
  if (attacker) {
    state.damageArc = { life: .48, angle: Math.atan2(attacker.y - state.player.y, attacker.x - state.player.x) };
  } else {
    state.damageArc = { life: .35, angle: state.player.angle + Math.PI };
  }
  state.shake = Math.max(state.shake, .34);
  playImpactSound(true);
  const warningPoint = shotEndpoint(state.player, state.damageArc.angle, 170);
  spawnFloatingText(warningPoint.x + rand(-20, 20), warningPoint.y + rand(-20, 20), `-${reduced.toFixed(0)}`, "#ff6b6b", 1.15, 56);
  ui.hitFlash.classList.add("active");
  setTimeout(() => ui.hitFlash.classList.remove("active"), 130);
  if (source) addChat(`${source} hit you for ${reduced.toFixed(0)} XP.`);
  if (state.player.health <= 0) handlePlayerDefeat(source ? `${source} eliminated you.` : "You were eliminated.");
}

function shotEndpoint(origin, angle, range) {
  return {
    x: origin.x + Math.cos(angle) * range,
    y: origin.y + Math.sin(angle) * range
  };
}

function spawnTracer(from, to, color, hit, incoming = false, worldShot = incoming, aimPitch = null) {
  const lifetime = incoming ? .34 : .24;
  state.tracers.push({
    from: { ...from },
    to: { ...to },
    color,
    hit,
    incoming,
    worldShot,
    aimPitch,
    life: lifetime,
    maxLife: lifetime,
    width: incoming ? 4 : 5
  });
}

function spawnImpact(x, y, color = "#ffd166", count = 13) {
  for (let i = 0; i < count; i++) {
    state.particles.push({
      x,
      y,
      vx: rand(-118, 118),
      vy: rand(-118, 118),
      size: rand(1.4, 4.2),
      color: i % 4 === 0 ? "#ffffff" : color,
      life: rand(.16, .38),
      maxLife: .38,
      drag: .86,
      kind: "spark"
    });
  }
  state.particles.push({
    x, y, vx: 0, vy: 0, size: 16, color,
    life: .22, maxLife: .22, drag: 1, kind: "ring"
  });
  for (let i = 0; i < 4; i++) {
    state.particles.push({
      x: x + rand(-8, 8),
      y: y + rand(-8, 8),
      vx: rand(-18, 18),
      vy: rand(-18, 18),
      size: rand(7, 13),
      color: "#9da5ae",
      life: rand(.38, .7),
      maxLife: .7,
      drag: .96,
      kind: "smoke"
    });
  }
}

function ejectCasing() {
  state.casings.push({
    x: canvas.clientWidth * .7,
    y: canvas.clientHeight * .76,
    vx: rand(130, 210),
    vy: rand(-250, -170),
    rotation: rand(0, Math.PI * 2),
    spin: rand(8, 15),
    life: .75,
    maxLife: .75
  });
}

function spawnFloatingText(x, y, text, color, life = .8, lift = 44) {
  state.floatText.push({ x, y, text, color, life, maxLife: life, lift });
}

function useSlot(index) {
  const item = state.inventory[index];
  if (!item || item.count <= 0 || !state.running) return;
  if (item.type === "food") {
    state.player.health = clamp(state.player.health + item.heal, 0, state.armorRank >= 16 ? 190 : 150);
    addChat(`You ate ${item.name} and restored ${item.heal} health.`);
  }
  if (item.type === "water") {
    state.player.stamina = clamp(state.player.stamina + 60, 0, 150);
    addChat("You drank water and restored 60 exhaustion XP.");
  }
  item.count -= 1;
  if (item.count <= 0) state.inventory[index] = null;
  renderInventory();
}

function reload() {
  if (!state.running || state.player.reload > 0 || state.ammo === weapon().magazine) return;
  state.player.reload = 1.1;
  addChat(`Reloading ${weapon().name}. Ammo is infinite.`);
}

function shoot() {
  if (!state.running || state.player.shootCd > 0 || state.player.reload > 0) return;
  const w = weapon();
  if (state.ammo <= 0) {
    reload();
    return;
  }
  state.ammo -= 1;
  state.player.shootCd = 1 / w.rate;
  playShotSound(state.weaponRank);
  const hit = findTargetInCrosshair(w.range);
  const muzzle = {
    x: state.player.x + Math.cos(state.player.angle) * 46 + Math.cos(state.player.angle + Math.PI / 2) * 14,
    y: state.player.y + Math.sin(state.player.angle) * 46 + Math.sin(state.player.angle + Math.PI / 2) * 14
  };
  const shotEnd = hit ? { x: hit.x, y: hit.y } : shotEndpoint(state.player, state.player.angle + rand(-.018, .018), w.range);
  spawnTracer(muzzle, shotEnd, hit ? "#ffe37a" : "#96e8ff", Boolean(hit), false, false, state.player.pitch);
  ejectCasing();
  state.recoil = Math.max(state.recoil, .34);
  state.muzzleFlash = .075;
  state.shake = Math.max(state.shake, .11);
  if (hit) {
    const enemyArmor = armors[hit.armor - 1] || armors[0];
    const damage = w.damage * 4.5 * (1 - enemyArmor.protection * .55);
    hit.health -= damage;
    if (hit.health > 0) {
      hit.targetId = "player";
      hit.targetCd = 4;
      hit.strafeDir *= -1;
      hit.tacticCd = 0;
    }
    state.hitMarker = .22;
    playImpactSound(false);
    spawnImpact(hit.x, hit.y, "#ffd27a", 19);
    spawnFloatingText(hit.x, hit.y, damage.toFixed(0), "#ffe37a", .9, 58);
    addChat(`You hit ${hit.id} with ${w.name} for ${damage.toFixed(1)} XP.`);
    if (hit.health <= 0 && hit.alive) {
      hit.alive = false;
      state.kills += 1;
      state.diamonds += 2;
      spawnImpact(hit.x, hit.y, "#67e08a", 30);
      spawnFloatingText(hit.x, hit.y, "ELIM", "#67e08a", 1.2, 84);
      addChat(`${hit.id} was eliminated. +2 diamonds.`);
      state.lastNoKillCheck = state.time;
      handleAllEnemiesDefeated(`${hit.id} eliminated`);
    }
  } else {
    spawnImpact(shotEnd.x, shotEnd.y, "#96e8ff", 6);
  }
  if (state.ammo <= 0) reload();
}

function angleDiff(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function findTargetInCrosshair(range) {
  let best = null;
  let bestDistance = Infinity;
  const p = state.player;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.x - p.x;
    const dy = e.y - p.y;
    const d = Math.hypot(dx, dy);
    if (d > range) continue;
    const angle = Math.atan2(dy, dx);
    const spread = clamp(35 / d, .025, .13);
    const targetPitch = Math.atan2(p.z, d);
    const verticalSpread = clamp(45 / d, .025, .12);
    const horizontallyAimed = Math.abs(angleDiff(angle, p.angle)) < spread;
    const verticallyAimed = Math.abs(targetPitch - p.pitch) < verticalSpread;
    if (horizontallyAimed && verticallyAimed && d < bestDistance) {
      best = e;
      bestDistance = d;
    }
  }
  return best;
}

function chooseEnemyTarget(enemy) {
  const rivals = state.enemies.filter(candidate => candidate.alive && candidate !== enemy);
  const botDifficulty = difficulty();
  const targetPlayer = !rivals.length || Math.random() < botDifficulty.playerFocus;
  const target = targetPlayer
    ? state.player
    : rivals
      .map(candidate => ({
        candidate,
        score: dist(enemy, candidate)
          * (.65 + clamp(candidate.health / candidate.maxHealth, 0, 1) * .55)
          * rand(.82, 1.18)
      }))
      .sort((a, b) => a.score - b.score)[0].candidate;
  enemy.targetId = target === state.player ? "player" : target.id;
  enemy.targetCd = (target === state.player ? rand(1.5, 3) : rand(.85, 1.9)) * botDifficulty.reaction;
  return target;
}

function resolveEnemyTarget(enemy) {
  if (enemy.targetId === "player") return state.player;
  return state.enemies.find(candidate => candidate.alive && candidate.id === enemy.targetId) || null;
}

function enemyShoot(enemy, target, dt) {
  if (!enemy.alive || enemy.trapped > 0 || !target) return;
  enemy.shootCd -= dt;
  const botDifficulty = difficulty();
  const targetIsPlayer = target === state.player;
  const d = dist(enemy, target);
  const w = weapons[enemy.weaponRank - 1];
  if (d < w.range * .75 && enemy.shootCd <= 0) {
    enemy.shootCd = (rand(.65, 1.4) + 1 / w.rate) * botDifficulty.fireDelay;
    const rangeRatio = clamp(d / (w.range * .75), 0, 1);
    const fatiguePenalty = enemy.stamina < 25 ? .72 : 1;
    const accuracy = clamp(
      (.84 - rangeRatio * .54) * fatiguePenalty * botDifficulty.accuracy,
      botDifficulty.minAccuracy,
      botDifficulty.maxAccuracy
    );
    const didHit = Math.random() < accuracy;
    const shotTarget = didHit
      ? { x: target.x, y: target.y }
      : { x: target.x + rand(-150, 150), y: target.y + rand(-150, 150) };
    spawnTracer(enemy, shotTarget, didHit ? "#ff7b72" : "#ffb86b", didHit, targetIsPlayer, true);
    playShotSound(enemy.weaponRank, true);
    if (didHit) {
      spawnImpact(target.x, target.y, targetIsPlayer ? "#ff7b72" : "#ffd27a", 9);
      if (targetIsPlayer) {
        takeDamage(w.damage * rand(.22, .44) * botDifficulty.damage, enemy.id);
      } else {
        const targetArmor = armors[target.armor - 1] || armors[0];
        const damage = w.damage * rand(.28, .52) * (1 - targetArmor.protection * .55) * botDifficulty.damage;
        target.health -= damage;
        spawnFloatingText(target.x, target.y, damage.toFixed(0), "#ffb86b", .65, 44);
        if (target.health > 0) {
          target.targetId = enemy.id;
          target.targetCd = 3;
          target.strafeDir *= -1;
          target.tacticCd = 0;
        }
        if (target.health <= 0 && target.alive) {
          target.alive = false;
          enemy.targetCd = 0;
          state.lastNoKillCheck = state.time;
          spawnImpact(target.x, target.y, "#67e08a", 24);
          spawnFloatingText(target.x, target.y, "ELIM", "#67e08a", 1.1, 78);
          addChat(`${enemy.id} eliminated ${target.id}.`);
        }
      }
    } else {
      spawnImpact(shotTarget.x, shotTarget.y, "#ffb86b", 5);
    }
  }
}

function updateExhaustionState(entity, isPlayer) {
  if (!entity.exhausted && entity.stamina <= 0) {
    entity.exhausted = true;
    spawnFloatingText(entity.x, entity.y, "EXHAUSTED", "#ff9a62", 1.1, 68);
    addChat(isPlayer
      ? "You are exhausted and cannot move. Rest or drink water."
      : `${entity.id} is exhausted and cannot move.`);
  } else if (entity.exhausted && entity.stamina >= EXHAUSTION_RECOVERY) {
    entity.exhausted = false;
    spawnFloatingText(entity.x, entity.y, "READY", "#74d7ff", .8, 54);
    if (isPlayer) addChat("You recovered enough exhaustion to move.");
  }
}

function updatePlayer(dt) {
  const p = state.player;
  state.buildingCooldown = Math.max(0, state.buildingCooldown - dt);
  p.shootCd = Math.max(0, p.shootCd - dt);
  p.reload = Math.max(0, p.reload - dt);
  p.health = clamp(p.health - .5 * dt, 0, 220);
  if (p.health <= 0) {
    handlePlayerDefeat("You lost all health over time.");
    return;
  }
  if (p.reload === 0 && state.ammo < weapon().magazine) state.ammo = weapon().magazine;

  const forward = keys.has("w") || keys.has("arrowup") ? 1 : 0;
  const back = keys.has("s") || keys.has("arrowdown") ? 1 : 0;
  const left = keys.has("a") || keys.has("arrowleft") ? 1 : 0;
  const right = keys.has("d") || keys.has("arrowright") ? 1 : 0;
  const wantsToMove = Boolean(forward || back || left || right);
  let moving = wantsToMove && !p.exhausted && p.trapped <= 0;
  let sprinting = keys.has("shift") && moving && p.stamina > 0;
  if (moving) {
    const drainRate = sprinting ? SPRINT_EXHAUSTION_RATE : MOVE_EXHAUSTION_RATE;
    p.stamina = clamp(p.stamina - drainRate * dt, 0, 150);
  } else {
    p.stamina = clamp(p.stamina + REST_EXHAUSTION_RATE * dt, 0, 150);
  }
  updateExhaustionState(p, true);

  if (p.trapped > 0) {
    p.trapped -= dt;
    return;
  }

  moving = wantsToMove && !p.exhausted;
  sprinting = keys.has("shift") && moving && p.stamina > 0;
  const tired = p.exhausted ? 0 : p.stamina < 25 ? .52 : 1;
  const speed = 185 * armor().speed * tired * (sprinting ? 1.38 : 1);
  let vx = 0;
  let vy = 0;

  if (forward) {
    vx += Math.cos(p.angle) * speed;
    vy += Math.sin(p.angle) * speed;
  }
  if (back) {
    vx -= Math.cos(p.angle) * speed * .75;
    vy -= Math.sin(p.angle) * speed * .75;
  }
  if (left) {
    vx += Math.cos(p.angle - Math.PI / 2) * speed * .82;
    vy += Math.sin(p.angle - Math.PI / 2) * speed * .82;
  }
  if (right) {
    vx += Math.cos(p.angle + Math.PI / 2) * speed * .82;
    vy += Math.sin(p.angle + Math.PI / 2) * speed * .82;
  }

  const nextX = p.x + vx * dt;
  const nextY = p.y + vy * dt;
  if (state.insideBuilding) {
    const walkingThroughExit = nextY < INTERIOR_BOUNDS.minY
      && Math.abs(nextX) <= INTERIOR_BOUNDS.doorHalfWidth;
    if (walkingThroughExit && exitBuilding(true)) return;
    const resolved = resolveInteriorPosition(p.x, p.y, nextX, nextY, 18);
    p.x = resolved.x;
    p.y = resolved.y;
  } else {
    const size = arenaSize();
    p.x = clamp(nextX, -size / 2 + 36, size / 2 - 36);
    p.y = clamp(nextY, -size / 2 + 36, size / 2 - 36);
    if (dist(p, activeBuilding()) <= activeBuilding().autoEnterRadius && enterBuilding()) return;
  }

  if (!moving) {
    if (state.armorRank === 11 && p.health < 150) p.health = clamp(p.health + 1.5 * dt, 0, 150);
  }

  if (!p.exhausted && keys.has(" ") && p.z === 0) {
    p.vz = state.armorRank === 15 ? 390 : 285;
  }
  p.vz -= 760 * dt;
  p.z += p.vz * dt;
  if (p.z <= 0) {
    if (p.vz < -650) takeDamage(Math.floor(Math.abs(p.vz) / 90), "fall damage");
    p.z = 0;
    p.vz = 0;
  }
}

function updateEnemySupplies(enemy, dt) {
  enemy.stamina = clamp(enemy.stamina - dt, 0, 150);
  updateExhaustionState(enemy, false);
  enemy.health = clamp(enemy.health - .5 * dt, 0, enemy.maxHealth);
  if (enemy.health <= 0) {
    enemy.alive = false;
    state.lastNoKillCheck = state.time;
    addChat(`${enemy.id} ran out of health.`);
    handleAllEnemiesDefeated(`${enemy.id} ran out of health`);
    return false;
  }
  enemy.supplyCd = Math.max(0, enemy.supplyCd - dt);
  if (enemy.supplyCd > 0) return true;

  let item = null;
  let amount = 0;
  if (enemy.health <= enemy.maxHealth * .45 && enemy.supplies.sandwich > 0) {
    item = "sandwich";
    amount = 36;
  } else if (enemy.health <= enemy.maxHealth * .72 && enemy.supplies.apple > 0) {
    item = "apple";
    amount = 22;
  } else if (enemy.stamina <= 90 && enemy.supplies.water > 0) {
    enemy.supplies.water -= 1;
    enemy.stamina = clamp(enemy.stamina + 60, 0, 150);
    updateExhaustionState(enemy, false);
    enemy.supplyCd = 1.2;
    spawnFloatingText(enemy.x, enemy.y, "+60 EXH", "#74d7ff", .8, 54);
    addChat(`${enemy.id} drank their water.`);
    return true;
  }

  if (item) {
    enemy.supplies[item] -= 1;
    enemy.health = clamp(enemy.health + amount, 0, enemy.maxHealth);
    enemy.supplyCd = 1.2;
    spawnFloatingText(enemy.x, enemy.y, `+${amount}`, "#67e08a", .8, 54);
    addChat(`${enemy.id} ate their ${item}.`);
  }
  return true;
}

function updateEnemies(dt) {
  const size = arenaSize();
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (!updateEnemySupplies(e, dt)) continue;
    if (e.trapped > 0) {
      e.trapped -= dt;
      continue;
    }
    e.targetCd -= dt;
    let target = resolveEnemyTarget(e);
    if (!target || e.targetCd <= 0 || dist(e, target) > weapons[e.weaponRank - 1].range * 1.15) {
      target = chooseEnemyTarget(e);
    }
    e.tacticCd -= dt;
    if (e.tacticCd <= 0) {
      if (Math.random() < .42) e.strafeDir *= -1;
      e.tacticCd = rand(.65, 1.45);
    }

    const w = weapons[e.weaponRank - 1];
    const d = dist(e, target);
    const targetAngle = Math.atan2(target.y - e.y, target.x - e.x);
    const idealRange = clamp(w.range * .48, 150, 420);
    const healthRatio = clamp(e.health / e.maxHealth, 0, 1);
    let radial = d > idealRange * 1.12 ? 1 : d < idealRange * .72 ? -1 : 0;
    if (healthRatio < .3) radial = -1;
    const strafe = d < idealRange * 1.6 ? e.strafeDir * .68 : 0;
    let moveX = Math.cos(targetAngle) * radial + Math.cos(targetAngle + Math.PI / 2) * strafe;
    let moveY = Math.sin(targetAngle) * radial + Math.sin(targetAngle + Math.PI / 2) * strafe;

    for (const trap of state.traps) {
      if (!trap.active) continue;
      const gap = Math.max(1, dist(e, trap));
      const dangerRange = trap.radius + 95;
      if (gap >= dangerRange) continue;
      const force = (dangerRange - gap) / dangerRange * 2.4;
      moveX += (e.x - trap.x) / gap * force;
      moveY += (e.y - trap.y) / gap * force;
    }
    for (const other of state.enemies) {
      if (!other.alive || other === e) continue;
      const gap = Math.max(1, dist(e, other));
      if (gap >= 70) continue;
      const force = (70 - gap) / 70 * 1.3;
      moveX += (e.x - other.x) / gap * force;
      moveY += (e.y - other.y) / gap * force;
    }

    const movementLength = Math.hypot(moveX, moveY) || 1;
    const tired = e.exhausted ? 0 : e.stamina < 25 ? .52 : 1;
    const caution = healthRatio < .3 ? 1.16 : 1;
    const enemyNextX = e.x + moveX / movementLength * e.speed * tired * caution * dt;
    const enemyNextY = e.y + moveY / movementLength * e.speed * tired * caution * dt;
    if (state.insideBuilding) {
      const resolved = resolveInteriorPosition(e.x, e.y, enemyNextX, enemyNextY, 20);
      e.x = resolved.x;
      e.y = resolved.y;
    } else {
      e.x = clamp(enemyNextX, -size / 2 + 34, size / 2 - 34);
      e.y = clamp(enemyNextY, -size / 2 + 34, size / 2 - 34);
    }
    e.angle = targetAngle;
    enemyShoot(e, target, dt);
    if (!state.insideBuilding) checkEntityTraps(e, false);
  }
}

function checkEntityTraps(entity, isPlayer) {
  for (const trap of state.traps) {
    if (!trap.active) continue;
    if (Math.hypot(entity.x - trap.x, entity.y - trap.y) > trap.radius) continue;
    const name = isPlayer ? "You" : entity.id;
    if (trap.type === "mine") {
      trap.active = false;
      addChat(`${name} stepped on a buried mine.`);
      if (isPlayer) takeDamage(30, "buried mine");
      else {
        entity.health -= 30;
        if (entity.health <= 0) {
          entity.alive = false;
          addChat(`${entity.id} was eliminated by a mine.`);
        }
      }
    }
    if (trap.type === "hole") {
      trap.active = false;
      entity.trapped = 1.4 + trap.depth * .08;
      addChat(`${name} fell into a ${trap.depth}-block hole and mined out.`);
      if (isPlayer) takeDamage(Math.floor(trap.depth / 3) + 1, "hole fall");
      else entity.health -= Math.floor(trap.depth / 3) + 1;
    }
    if (trap.type === "pitfall") {
      trap.active = false;
      entity.trapped = 1.8;
      addChat(`${name} triggered a pitfall with spikes.`);
      if (isPlayer) takeDamage(40 + Math.floor(trap.depth / 3), "spikes");
      else entity.health -= 40 + Math.floor(trap.depth / 3);
    }
  }
}

function updateTrapsByTime() {
  if (isRivalDuel()) return;
  const minute = Math.floor(state.time / 60);
  if (minute >= 5 && minute !== state.lastTrapMinute) {
    state.lastTrapMinute = minute;
    const size = arenaSize();
    addChat(`${minute} minutes: the arena added more traps.`);
    for (let i = 0; i < 3; i++) state.traps.push({ ...randomPoint(size), type: "mine", radius: 32, active: true });
    for (let i = 0; i < 4; i++) state.traps.push({ ...randomPoint(size), type: "hole", radius: 38, depth: Math.floor(rand(1, 16)), active: true });
    for (let i = 0; i < 2; i++) state.traps.push({ ...randomPoint(size), type: "pitfall", radius: 46, depth: Math.floor(rand(6, 16)), active: true });
    if (minute >= 17) {
      for (let i = 0; i < 5; i++) state.traps.push({ ...randomPoint(size), type: "mine", radius: 32, active: true });
      for (let i = 0; i < 7; i++) state.traps.push({ ...randomPoint(size), type: "hole", radius: 38, depth: Math.floor(rand(1, 16)), active: true });
      for (let i = 0; i < 3; i++) state.traps.push({ ...randomPoint(size), type: "pitfall", radius: 46, depth: Math.floor(rand(6, 16)), active: true });
    }
  }
  if (state.time - state.lastNoKillCheck > 240) {
    const alive = state.enemies.filter(e => e.alive);
    if (alive.length) {
      const unlucky = alive[Math.floor(Math.random() * alive.length)];
      unlucky.alive = false;
      addChat(`No eliminations for 4 minutes. The server removed ${unlucky.id}.`);
      state.lastNoKillCheck = state.time;
      handleAllEnemiesDefeated(`${unlucky.id} was removed`);
    }
  }
}

function update(dt) {
  if (isRivalDuel()) {
    if (state.duelPhase === "countdown") {
      state.phaseTimer -= dt;
      updateVisualEffects(dt);
      if (state.phaseTimer <= 0) {
        state.duelPhase = "playing";
        state.running = true;
        state.phaseTimer = .65;
        state.roundMessage = "FIGHT!";
      }
      return;
    }
    if (state.duelPhase === "roundEnd") {
      state.phaseTimer -= dt;
      updateVisualEffects(dt);
      if (state.phaseTimer <= 0) {
        if (state.playerRounds >= 5 || state.rivalRounds >= 5) {
          const won = state.playerRounds >= 5;
          endMatch(won, won ? "First to five rounds." : "Your rival reached five rounds first.");
        } else {
          state.roundNumber += 1;
          startDuelRound(false);
        }
      }
      return;
    }
    if (state.duelPhase === "matchEnd" || state.duelPhase === "menu") return;
    if (state.duelPhase === "playing" && state.phaseTimer > 0) {
      state.phaseTimer = Math.max(0, state.phaseTimer - dt);
    }
  }
  if (!state.running) return;
  state.time += dt;
  updatePlayer(dt);
  if (!state.running) return;
  updateEnemies(dt);
  if (!state.running) return;
  if (!state.insideBuilding) checkEntityTraps(state.player, true);
  updateTrapsByTime();
  updateVisualEffects(dt);
  if (state.time > 1200 && state.time - dt <= 1200) {
    state.diamonds += 10;
    addChat("20 minutes reached. Everyone gets 10 diamonds.");
  }
  if (state.time > 1800 && state.time - dt <= 1800) {
    state.level += 1;
    addChat("30 minutes reached. Everyone gains 1 level.");
  }
  if (state.time > 2400 && state.time - dt <= 2400) {
    state.shards += 1;
    addChat("40 minutes reached. Everyone gets 1 shard.");
  }
}

function updateVisualEffects(dt) {
  state.tracers = state.tracers.map(t => ({ ...t, life: t.life - dt })).filter(t => t.life > 0);
  state.particles = state.particles
    .map(p => ({
      ...p,
      x: p.x + p.vx * dt,
      y: p.y + p.vy * dt,
      vx: p.vx * (p.drag ?? .9),
      vy: p.vy * (p.drag ?? .9),
      life: p.life - dt
    }))
    .filter(p => p.life > 0);
  state.casings = state.casings
    .map(casing => ({
      ...casing,
      x: casing.x + casing.vx * dt,
      y: casing.y + casing.vy * dt,
      vx: casing.vx * .985,
      vy: casing.vy + 620 * dt,
      rotation: casing.rotation + casing.spin * dt,
      life: casing.life - dt
    }))
    .filter(casing => casing.life > 0 && casing.y < canvas.clientHeight + 30);
  state.floatText = state.floatText.map(t => ({ ...t, life: t.life - dt })).filter(t => t.life > 0);
  state.hitMarker = Math.max(0, state.hitMarker - dt);
  state.shake = Math.max(0, state.shake - dt * 1.8);
  state.recoil = Math.max(0, state.recoil - dt * 4.2);
  state.muzzleFlash = Math.max(0, state.muzzleFlash - dt);
  state.damageArc.life = Math.max(0, state.damageArc.life - dt);
}

function project(point) {
  const p = state.player;
  const dx = point.x - p.x;
  const dy = point.y - p.y;
  const sin = Math.sin(p.angle);
  const cos = Math.cos(p.angle);
  const x = -dx * sin + dy * cos;
  const z = dx * cos + dy * sin;
  return { x, z };
}

function drawWorld() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const shakePower = state.shake > 0 ? state.shake * 16 : 0;
  const shakeX = rand(-shakePower, shakePower);
  const shakeY = rand(-shakePower, shakePower);
  const horizon = clamp(
    height * .47 - state.player.pitch * height * .52 - state.player.z * .12 + state.recoil * 10,
    height * .08,
    height * .9
  );
  const theme = backgroundThemes[state.map.name] || backgroundThemes.Forest;
  ctx.save();
  ctx.translate(shakeX, shakeY);
  ctx.clearRect(0, 0, width, height);
  if (state.insideBuilding) {
    drawBuildingInterior(width, height, horizon, activeBuilding());
  } else {
    drawSky(width, horizon, theme);
    drawGroundSurface(width, height, horizon, theme);
    drawDistantScenery(width, horizon, theme);
    drawGroundDetail(width, height, horizon, theme);
    drawHorizonHaze(width, height, horizon, theme);
  }

  drawSprites(width, height, horizon);
  drawTracers(width, height, horizon);
  drawParticles(width, height, horizon);
  drawFloatingText(width, height, horizon);
  drawCasings();
  drawWeapon(width, height);
  drawBuildingInteraction(width, height);
  ctx.restore();
  drawEnvironmentalVignette(width, height);
  drawCombatOverlay(width, height);
}

function hashNoise(index, seed = 0) {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function wrapScreen(value, span) {
  return ((value % span) + span) % span;
}

function backgroundPan(width, factor = 1) {
  return (state.player.angle / (Math.PI * 2) * width + (state.player.x + state.player.y) * .018) * factor;
}

function drawSky(width, horizon, theme) {
  ctx.save();
  const sky = ctx.createLinearGradient(0, 0, 0, Math.max(1, horizon));
  sky.addColorStop(0, theme.skyTop);
  sky.addColorStop(.56, theme.skyMid);
  sky.addColorStop(1, theme.skyHorizon);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, horizon);

  if (theme.scene === "space") {
    const pan = backgroundPan(width, .12);
    for (let i = 0; i < 90; i++) {
      const x = wrapScreen(hashNoise(i, 2) * width - pan, width);
      const y = hashNoise(i, 5) * horizon * .9;
      const radius = hashNoise(i, 9) > .88 ? 1.5 : .7;
      ctx.globalAlpha = .28 + hashNoise(i, 11) * .68;
      ctx.fillStyle = i % 11 === 0 ? "#8fe8ff" : "#f4f7ff";
      ctx.fillRect(x, y, radius, radius);
    }
    ctx.globalAlpha = 1;
    const planetX = width * .78 - Math.sin(state.player.angle * .45) * width * .12;
    const planetY = horizon * .4;
    const planetRadius = Math.max(44, horizon * .22);
    const planet = ctx.createRadialGradient(
      planetX - planetRadius * .32,
      planetY - planetRadius * .3,
      4,
      planetX,
      planetY,
      planetRadius
    );
    planet.addColorStop(0, "#9fdfff");
    planet.addColorStop(.42, "#315b88");
    planet.addColorStop(.78, "#142440");
    planet.addColorStop(1, "rgba(5, 8, 18, 0)");
    ctx.fillStyle = planet;
    ctx.beginPath();
    ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  const outdoor = !["warehouse", "mall"].includes(theme.scene);
  if (outdoor) {
    const sunX = width * .73 - Math.sin(state.player.angle * .5) * width * .17;
    const sunY = Math.max(34, horizon * .28);
    const glow = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, Math.max(90, width * .16));
    glow.addColorStop(0, "rgba(255, 244, 194, .82)");
    glow.addColorStop(.18, "rgba(255, 214, 142, .28)");
    glow.addColorStop(1, "rgba(255, 214, 142, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, horizon);
    ctx.fillStyle = theme.light;
    ctx.globalAlpha = .78;
    ctx.beginPath();
    ctx.arc(sunX, sunY, Math.max(8, horizon * .026), 0, Math.PI * 2);
    ctx.fill();

    const span = width + 420;
    const cloudPan = backgroundPan(width, .22) - state.time * 1.6;
    ctx.filter = "blur(1px)";
    for (let i = 0; i < 7; i++) {
      const x = wrapScreen(i * span / 6 - cloudPan, span) - 210;
      const y = horizon * (.13 + hashNoise(i, 21) * .38);
      const size = .58 + hashNoise(i, 29) * .62;
      ctx.globalAlpha = .14 + hashNoise(i, 33) * .18;
      ctx.fillStyle = "rgba(32, 42, 51, .42)";
      ctx.beginPath();
      ctx.ellipse(x + 8, y + 9, 104 * size, 22 * size, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 76 * size, y + 13, 74 * size, 17 * size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = theme.cloud;
      ctx.beginPath();
      ctx.ellipse(x, y, 100 * size, 22 * size, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 58 * size, y - 8 * size, 70 * size, 25 * size, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 112 * size, y + 3 * size, 62 * size, 18 * size, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.filter = "none";
  }
  ctx.restore();
}

function drawGroundSurface(width, height, horizon, theme) {
  const ground = ctx.createLinearGradient(0, horizon, 0, height);
  ground.addColorStop(0, theme.groundFar);
  ground.addColorStop(.5, state.map.ground);
  ground.addColorStop(1, theme.groundNear);
  ctx.fillStyle = ground;
  ctx.fillRect(0, horizon, width, height - horizon);
}

function drawRidge(width, horizon, pan, baseY, amplitude, color, seed, spacing = 92) {
  const offset = -wrapScreen(pan, spacing);
  const firstIndex = Math.floor(pan / spacing) - 2;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-spacing, horizon + 24);
  for (let i = -1; i <= Math.ceil(width / spacing) + 2; i++) {
    const x = offset + i * spacing;
    const peak = hashNoise(firstIndex + i, seed);
    const shoulder = hashNoise(firstIndex + i, seed + 3);
    ctx.lineTo(x, baseY - peak * amplitude);
    ctx.lineTo(x + spacing * .48, baseY - shoulder * amplitude * .52);
  }
  ctx.lineTo(width + spacing, horizon + 24);
  ctx.closePath();
  ctx.fill();
}

function drawBuildingLine(width, horizon, pan, color, windowColor, seed, scale = 1) {
  const spacing = 68 * scale;
  const offset = -wrapScreen(pan, spacing);
  const firstIndex = Math.floor(pan / spacing) - 2;
  for (let i = -1; i <= Math.ceil(width / spacing) + 2; i++) {
    const index = firstIndex + i;
    const x = offset + i * spacing;
    const buildingWidth = spacing * (.58 + hashNoise(index, seed) * .34);
    const buildingHeight = (48 + hashNoise(index, seed + 2) * 96) * scale;
    ctx.fillStyle = color;
    ctx.fillRect(x, horizon - buildingHeight, buildingWidth, buildingHeight + 4);
    ctx.fillStyle = windowColor;
    ctx.globalAlpha = .2 + hashNoise(index, seed + 4) * .28;
    const rows = Math.max(2, Math.floor(buildingHeight / (20 * scale)));
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < 3; column++) {
        if (hashNoise(index * 17 + row * 3 + column, seed + 7) < .36) continue;
        ctx.fillRect(
          x + buildingWidth * (.13 + column * .27),
          horizon - buildingHeight + 10 * scale + row * 18 * scale,
          Math.max(2, buildingWidth * .12),
          Math.max(2, 5 * scale)
        );
      }
    }
    ctx.globalAlpha = 1;
  }
}

function drawDistantScenery(width, horizon, theme) {
  const pan = backgroundPan(width, .38);
  ctx.save();

  if (theme.scene === "forest") {
    drawRidge(width, horizon, pan * .3, horizon - 2, 58, "#415f4f", 4, 110);
    drawRidge(width, horizon, pan * .55, horizon + 5, 40, "#233d2e", 8, 76);
    const spacing = 42;
    const offset = -wrapScreen(pan, spacing);
    const firstIndex = Math.floor(pan / spacing) - 2;
    for (let i = -1; i <= Math.ceil(width / spacing) + 2; i++) {
      const index = firstIndex + i;
      const x = offset + i * spacing;
      const treeHeight = 38 + hashNoise(index, 12) * 64;
      ctx.fillStyle = "#17271d";
      ctx.fillRect(x - 2, horizon - treeHeight * .48, 4, treeHeight * .5);
      ctx.fillStyle = index % 2 ? "#24412d" : "#1c3526";
      ctx.beginPath();
      ctx.moveTo(x, horizon - treeHeight);
      ctx.lineTo(x - treeHeight * .25, horizon - treeHeight * .18);
      ctx.lineTo(x + treeHeight * .25, horizon - treeHeight * .18);
      ctx.closePath();
      ctx.fill();
    }
  } else if (theme.scene === "city" || theme.scene === "office") {
    drawBuildingLine(width, horizon, pan * .45, "#34434f", "#ffd9a1", 17, .72);
    drawBuildingLine(width, horizon, pan * .72, "#222c34", "#9ed8e9", 26, 1);
    if (theme.scene === "office") {
      ctx.strokeStyle = "rgba(14, 21, 28, .48)";
      ctx.lineWidth = 12;
      for (let x = 0; x <= width; x += Math.max(160, width / 6)) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, horizon + 8);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(225, 235, 238, .18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, horizon * .16);
      ctx.lineTo(width, horizon * .16);
      ctx.stroke();
    }
  } else if (theme.scene === "desert") {
    drawRidge(width, horizon, pan * .24, horizon + 2, 92, "#8b6547", 31, 132);
    drawRidge(width, horizon, pan * .52, horizon + 8, 54, "#5e4936", 37, 94);
    ctx.fillStyle = "#353a36";
    for (let i = 0; i < 5; i++) {
      const x = wrapScreen(i * width * .28 - pan * .65, width + 180) - 90;
      const towerHeight = 34 + hashNoise(i, 43) * 28;
      ctx.fillRect(x - 3, horizon - towerHeight, 6, towerHeight);
      ctx.fillRect(x - 20, horizon - towerHeight, 40, 5);
      ctx.strokeStyle = "#353a36";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 18, horizon);
      ctx.lineTo(x, horizon - towerHeight);
      ctx.lineTo(x + 18, horizon);
      ctx.stroke();
    }
  } else if (theme.scene === "village") {
    drawRidge(width, horizon, pan * .3, horizon + 3, 62, "#5d5143", 48, 118);
    const spacing = 92;
    const offset = -wrapScreen(pan * .68, spacing);
    const firstIndex = Math.floor(pan * .68 / spacing) - 2;
    for (let i = -1; i <= Math.ceil(width / spacing) + 2; i++) {
      const index = firstIndex + i;
      const x = offset + i * spacing;
      const houseHeight = 24 + hashNoise(index, 52) * 24;
      const houseWidth = 48 + hashNoise(index, 55) * 28;
      ctx.fillStyle = index % 2 ? "#493932" : "#59443a";
      ctx.fillRect(x - houseWidth / 2, horizon - houseHeight, houseWidth, houseHeight + 3);
      ctx.fillStyle = "#2a2422";
      ctx.beginPath();
      ctx.moveTo(x - houseWidth * .62, horizon - houseHeight);
      ctx.lineTo(x, horizon - houseHeight - 24);
      ctx.lineTo(x + houseWidth * .62, horizon - houseHeight);
      ctx.closePath();
      ctx.fill();
      if (index % 3 === 0) ctx.fillRect(x + houseWidth * .22, horizon - houseHeight - 36, 7, 18);
    }
  } else if (theme.scene === "warehouse") {
    ctx.fillStyle = "rgba(8, 12, 16, .72)";
    ctx.fillRect(0, 0, width, horizon * .3);
    ctx.strokeStyle = "rgba(184, 198, 204, .28)";
    ctx.lineWidth = 5;
    for (let x = -width; x < width * 2; x += 170) {
      const shifted = x - wrapScreen(pan * .3, 170);
      ctx.beginPath();
      ctx.moveTo(width / 2, horizon);
      ctx.lineTo(shifted, 0);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255, 232, 181, .18)";
    for (let x = 42; x < width; x += 190) ctx.fillRect(x, 18, 86, 12);
  } else if (theme.scene === "mall") {
    ctx.fillStyle = "rgba(18, 23, 28, .6)";
    ctx.fillRect(0, 0, width, horizon * .18);
    ctx.strokeStyle = "rgba(232, 239, 236, .25)";
    ctx.lineWidth = 3;
    for (let x = 0; x <= width; x += Math.max(90, width / 10)) {
      ctx.beginPath();
      ctx.moveTo(width / 2, horizon);
      ctx.lineTo(x, 0);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255, 244, 205, .28)";
    for (let x = 28; x < width; x += 138) ctx.fillRect(x, 24, 74, 8);
    drawBuildingLine(width, horizon, pan * .4, "#3c464b", "#f7d88f", 61, .55);
  } else if (theme.scene === "space") {
    ctx.strokeStyle = "rgba(114, 210, 244, .32)";
    ctx.lineWidth = 4;
    for (let x = -80; x < width + 120; x += 180) {
      const shifted = x - wrapScreen(pan * .45, 180);
      ctx.beginPath();
      ctx.moveTo(shifted, horizon);
      ctx.lineTo(shifted + 90, horizon - 86);
      ctx.lineTo(shifted + 180, horizon);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(21, 31, 48, .9)";
    ctx.fillRect(0, horizon - 16, width, 18);
    ctx.fillStyle = "rgba(105, 225, 255, .52)";
    for (let x = 18; x < width; x += 84) ctx.fillRect(x, horizon - 11, 36, 3);
  }
  ctx.restore();
}

function drawGroundDetail(width, height, horizon, theme) {
  ctx.save();
  const hardSurface = ["warehouse", "city", "space", "mall", "office"].includes(theme.scene);
  const vanishX = width / 2;
  if (hardSurface) {
    ctx.strokeStyle = theme.scene === "space"
      ? "rgba(101, 214, 255, .15)"
      : "rgba(238, 239, 234, .11)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 15; i++) {
      const amount = i / 14;
      const y = horizon + Math.pow(amount, 1.72) * (height - horizon);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (let i = -9; i <= 9; i++) {
      ctx.beginPath();
      ctx.moveTo(vanishX, horizon);
      ctx.lineTo(vanishX + i * width * .14, height);
      ctx.stroke();
    }
  } else {
    const shift = state.player.x * .05 + state.player.y * .08 + backgroundPan(width, .12);
    ctx.strokeStyle = theme.scene === "desert"
      ? "rgba(255, 222, 164, .18)"
      : theme.scene === "forest"
        ? "rgba(141, 177, 124, .15)"
        : "rgba(216, 190, 159, .14)";
    ctx.lineCap = "round";
    for (let i = 0; i < 92; i++) {
      const amount = (i + 1) / 92;
      const y = horizon + Math.pow(amount, 1.62) * (height - horizon);
      const x = wrapScreen(hashNoise(i, 72) * width - shift * (1 + amount), width);
      const length = 2 + amount * 16;
      ctx.globalAlpha = .18 + amount * .68;
      ctx.lineWidth = .6 + amount * 2;
      ctx.beginPath();
      ctx.moveTo(x - length * .5, y);
      ctx.lineTo(x + length * .5, y + amount * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function drawHorizonHaze(width, height, horizon, theme) {
  const haze = ctx.createLinearGradient(0, horizon - 34, 0, horizon + height * .25);
  haze.addColorStop(0, "rgba(255, 255, 255, 0)");
  haze.addColorStop(.3, theme.haze);
  haze.addColorStop(1, "rgba(8, 12, 16, 0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon - 34, width, height * .31);
}

function drawBuildingInterior(width, height, horizon, building) {
  const roomHorizon = clamp(horizon, height * .3, height * .67);
  const vanishX = width / 2 - Math.sin(state.player.angle) * width * .08;
  const backLeft = width * .2;
  const backRight = width * .8;
  const backTop = roomHorizon * .28;
  const backBottom = roomHorizon + height * .1;
  ctx.save();

  const backWall = ctx.createLinearGradient(0, backTop, 0, backBottom);
  backWall.addColorStop(0, building.wall);
  backWall.addColorStop(1, "rgba(29, 34, 37, .98)");
  ctx.fillStyle = backWall;
  ctx.fillRect(0, 0, width, backBottom);

  const ceiling = ctx.createLinearGradient(0, 0, 0, roomHorizon);
  ceiling.addColorStop(0, building.ceiling);
  ceiling.addColorStop(1, "rgba(54, 62, 66, .96)");
  ctx.fillStyle = ceiling;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(backRight, backTop);
  ctx.lineTo(backLeft, backTop);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(20, 25, 28, .48)";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(backLeft, backTop);
  ctx.lineTo(backLeft, backBottom);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(width, 0);
  ctx.lineTo(backRight, backTop);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  const floor = ctx.createLinearGradient(0, roomHorizon, 0, height);
  floor.addColorStop(0, building.floor);
  floor.addColorStop(1, "rgba(10, 13, 15, .98)");
  ctx.fillStyle = floor;
  ctx.beginPath();
  ctx.moveTo(backLeft, backBottom);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(225, 232, 229, .12)";
  ctx.lineWidth = 1;
  for (let i = -7; i <= 7; i++) {
    ctx.beginPath();
    ctx.moveTo(vanishX, roomHorizon);
    ctx.lineTo(vanishX + i * width * .13, height);
    ctx.stroke();
  }
  for (let i = 1; i < 10; i++) {
    const amount = i / 9;
    const y = roomHorizon + Math.pow(amount, 1.65) * (height - roomHorizon);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const panelShift = Math.sin(state.player.angle) * width * .06;
  for (let i = 0; i < 4; i++) {
    const panelWidth = (backRight - backLeft) * .17;
    const x = backLeft + (i + .5) * (backRight - backLeft) / 4 - panelWidth / 2 + panelShift;
    const y = backTop + (backBottom - backTop) * .22;
    ctx.fillStyle = "rgba(9, 15, 19, .58)";
    ctx.fillRect(x, y, panelWidth, (backBottom - backTop) * .48);
    ctx.strokeStyle = i % 2 ? building.trim : building.accent;
    ctx.globalAlpha = .48;
    ctx.strokeRect(x, y, panelWidth, (backBottom - backTop) * .48);
  }
  ctx.globalAlpha = 1;

  for (let i = 0; i < 4; i++) {
    const amount = (i + 1) / 5;
    const lightY = 18 + amount * Math.max(28, backTop - 30);
    const lightWidth = 110 - amount * 48;
    ctx.shadowColor = building.accent;
    ctx.shadowBlur = 16;
    ctx.fillStyle = building.accent;
    ctx.globalAlpha = .38 + amount * .34;
    ctx.fillRect(vanishX - lightWidth / 2, lightY, lightWidth, 6);
  }
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(8, 12, 14, .5)";
  ctx.fillRect(backLeft + 12, backBottom - 34, 76, 34);
  ctx.fillRect(backRight - 104, backBottom - 48, 92, 48);
  ctx.fillStyle = building.trim;
  ctx.globalAlpha = .5;
  ctx.fillRect(backLeft + 18, backBottom - 30, 64, 5);
  ctx.fillRect(backRight - 98, backBottom - 43, 80, 5);
  ctx.restore();
}

function drawBuildingInteraction(width, height) {
  if (!state.running) return;
  const available = state.insideBuilding ? nearInteriorExit() : nearExteriorEntrance();
  if (!available) return;
  const building = activeBuilding();
  const label = state.insideBuilding ? "EXIT" : `ENTER ${building.name.toUpperCase()}`;
  ctx.save();
  ctx.font = "700 14px sans-serif";
  const promptWidth = clamp(ctx.measureText(label).width + 72, 142, Math.min(280, width * .58));
  const promptHeight = 40;
  const x = width / 2 - promptWidth / 2;
  const y = height * .72;
  ctx.fillStyle = "rgba(7, 11, 14, .84)";
  ctx.fillRect(x, y, promptWidth, promptHeight);
  ctx.strokeStyle = building.accent;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, promptWidth, promptHeight);
  ctx.fillStyle = building.accent;
  ctx.fillRect(x + 7, y + 6, 29, 28);
  ctx.fillStyle = "#10161b";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("E", x + 21.5, y + 20);
  ctx.fillStyle = "#f2f5f3";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 48, y + 21);
  ctx.restore();
}

function drawEnvironmentalVignette(width, height) {
  ctx.save();
  const vignette = ctx.createRadialGradient(
    width / 2,
    height * .46,
    Math.min(width, height) * .2,
    width / 2,
    height * .48,
    Math.max(width, height) * .72
  );
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(.72, "rgba(0, 0, 0, .08)");
  vignette.addColorStop(1, "rgba(0, 0, 0, .48)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
  const topShade = ctx.createLinearGradient(0, 0, 0, height);
  topShade.addColorStop(0, "rgba(4, 8, 12, .26)");
  topShade.addColorStop(.2, "rgba(4, 8, 12, 0)");
  topShade.addColorStop(1, "rgba(4, 8, 12, .12)");
  ctx.fillStyle = topShade;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawSprites(width, height, horizon) {
  const sprites = [];
  if (state.insideBuilding) {
    const exitDoor = { ...activeBuilding(), x: 0, y: INTERIOR_BOUNDS.minY + 8 };
    sprites.push({ kind: "exitDoor", obj: exitDoor, depth: project(exitDoor).z });
    for (const furniture of interiorProps()) {
      sprites.push({ kind: "interiorProp", obj: furniture, depth: project(furniture).z });
    }
  } else {
    for (const building of mapBuildings()) {
      sprites.push({ kind: "building", obj: building, depth: project(building).z });
    }
    for (const prop of state.props) sprites.push({ kind: "prop", obj: prop, depth: project(prop).z });
    for (const trap of state.traps) if (trap.active) sprites.push({ kind: "trap", obj: trap, depth: project(trap).z });
  }
  for (const enemy of state.enemies) if (enemy.alive) sprites.push({ kind: "enemy", obj: enemy, depth: project(enemy).z });
  sprites.sort((a, b) => b.depth - a.depth);

  for (const sprite of sprites) {
    const point = project(sprite.obj);
    if (point.z < 26) continue;
    const screenX = width / 2 + point.x / point.z * 560;
    if (screenX < -120 || screenX > width + 120) continue;
    const base = horizon + 28000 / point.z;
    const scale = 620 / point.z;
    if (sprite.kind === "building") drawBuildingExterior(screenX, base, scale, sprite.obj, width, height);
    if (sprite.kind === "exitDoor") drawInteriorExit(screenX, base, scale, sprite.obj, width, height);
    if (sprite.kind === "interiorProp") drawInteriorProp(screenX, base, scale, sprite.obj);
    if (sprite.kind === "prop") drawProp(screenX, base, scale, sprite.obj);
    if (sprite.kind === "trap") drawTrap(screenX, base, scale, sprite.obj);
    if (sprite.kind === "enemy") drawEnemy(screenX, base, scale, sprite.obj);
  }

}

function drawBuildingExterior(x, y, scale, building, screenWidth, screenHeight) {
  const w = clamp(building.width * scale, 100, screenWidth * .86);
  const h = clamp(building.height * scale, 82, screenHeight * .76);
  const nearest = activeBuilding();
  const nearEntrance = nearest.id === building.id
    && dist(state.player, building) <= building.interactionRadius;
  ctx.save();
  ctx.fillStyle = "rgba(4, 7, 9, .42)";
  ctx.beginPath();
  ctx.ellipse(x, y + 5, w * .48, Math.max(10, h * .08), 0, 0, Math.PI * 2);
  ctx.fill();

  if (nearEntrance) {
    ctx.shadowColor = building.accent;
    ctx.shadowBlur = 22;
  }
  const facade = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0);
  facade.addColorStop(0, "rgba(25, 31, 34, .98)");
  facade.addColorStop(.18, building.exterior);
  facade.addColorStop(.72, building.exterior);
  facade.addColorStop(1, "rgba(20, 25, 29, .98)");
  ctx.fillStyle = facade;
  ctx.fillRect(x - w / 2, y - h, w, h);
  ctx.shadowBlur = 0;

  const pitchedRoof = ["Forest", "Abandoned village"].includes(state.map.name);
  if (pitchedRoof) {
    ctx.fillStyle = building.roof;
    ctx.beginPath();
    ctx.moveTo(x - w * .58, y - h);
    ctx.lineTo(x, y - h * 1.28);
    ctx.lineTo(x + w * .58, y - h);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = building.roof;
    ctx.fillRect(x - w * .54, y - h * 1.08, w * 1.08, h * .12);
    ctx.fillStyle = building.trim;
    ctx.globalAlpha = .54;
    ctx.fillRect(x - w * .5, y - h, w, Math.max(4, h * .035));
    ctx.globalAlpha = 1;
  }

  const windowY = y - h * .68;
  const windowW = w * .18;
  const windowH = h * .2;
  for (const side of [-1, 1]) {
    const windowX = x + side * w * .27 - windowW / 2;
    const glass = ctx.createLinearGradient(0, windowY, 0, windowY + windowH);
    glass.addColorStop(0, "rgba(144, 204, 219, .66)");
    glass.addColorStop(1, "rgba(24, 42, 50, .88)");
    ctx.fillStyle = glass;
    ctx.fillRect(windowX, windowY, windowW, windowH);
    ctx.strokeStyle = "rgba(224, 238, 239, .38)";
    ctx.lineWidth = Math.max(1, scale * .7);
    ctx.strokeRect(windowX, windowY, windowW, windowH);
    ctx.beginPath();
    ctx.moveTo(windowX + windowW / 2, windowY);
    ctx.lineTo(windowX + windowW / 2, windowY + windowH);
    ctx.stroke();
  }

  const doorW = w * .2;
  const doorH = h * .52;
  const doorX = x - doorW / 2;
  const doorY = y - doorH;
  ctx.fillStyle = "rgba(8, 12, 14, .96)";
  ctx.fillRect(doorX, doorY, doorW, doorH);
  ctx.strokeStyle = building.accent;
  ctx.globalAlpha = nearEntrance ? .95 : .5;
  ctx.lineWidth = Math.max(2, scale);
  ctx.strokeRect(doorX, doorY, doorW, doorH);
  ctx.fillStyle = building.accent;
  ctx.fillRect(doorX + doorW * .72, doorY + doorH * .5, Math.max(3, doorW * .06), Math.max(3, doorW * .06));
  ctx.globalAlpha = 1;

  ctx.fillStyle = building.trim;
  ctx.fillRect(x - w * .18, y - h * .94, w * .36, Math.max(5, h * .055));
  ctx.strokeStyle = "rgba(255,255,255,.16)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x - w / 2, y - h, w, h);
  ctx.restore();
}

function drawInteriorExit(x, y, scale, building, screenWidth, screenHeight) {
  const w = clamp(92 * scale, 46, screenWidth * .3);
  const h = clamp(156 * scale, 78, screenHeight * .68);
  const nearExit = nearInteriorExit();
  ctx.save();
  if (nearExit) {
    ctx.shadowColor = building.accent;
    ctx.shadowBlur = 20;
  }
  ctx.fillStyle = "rgba(7, 11, 14, .98)";
  ctx.fillRect(x - w / 2, y - h, w, h);
  ctx.shadowBlur = 0;
  ctx.strokeStyle = building.accent;
  ctx.globalAlpha = nearExit ? .95 : .55;
  ctx.lineWidth = Math.max(2, scale);
  ctx.strokeRect(x - w / 2, y - h, w, h);
  ctx.fillStyle = building.accent;
  ctx.fillRect(x + w * .26, y - h * .5, Math.max(3, w * .055), Math.max(3, w * .055));
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(220, 235, 232, .2)";
  ctx.fillRect(x - w * .32, y - h * .86, w * .64, h * .06);
  ctx.restore();
}

function drawInteriorProp(x, y, scale, prop) {
  const width = clamp(prop.radius * scale * 1.65, 16, 150);
  const height = clamp(prop.height * scale, 20, 220);
  const left = x - width / 2;
  const top = y - height;
  const dark = "rgba(12, 17, 20, .96)";
  const edge = "rgba(236, 243, 240, .28)";
  const light = prop.tint;

  ctx.save();
  ctx.fillStyle = "rgba(3, 5, 7, .42)";
  ctx.beginPath();
  ctx.ellipse(x, y + 3, width * .54, Math.max(4, width * .13), 0, 0, Math.PI * 2);
  ctx.fill();

  if (prop.type === "crate") {
    ctx.fillStyle = light;
    ctx.fillRect(left, top, width, height);
    ctx.fillStyle = "rgba(18, 22, 23, .34)";
    ctx.fillRect(left + width * .12, top + height * .12, width * .76, height * .76);
    ctx.strokeStyle = "rgba(250, 242, 216, .48)";
    ctx.lineWidth = Math.max(1.5, scale * 1.2);
    ctx.beginPath();
    ctx.moveTo(left + width * .13, top + height * .14);
    ctx.lineTo(left + width * .87, top + height * .86);
    ctx.moveTo(left + width * .87, top + height * .14);
    ctx.lineTo(left + width * .13, top + height * .86);
    ctx.stroke();
  } else if (prop.type === "barrel") {
    const gradient = ctx.createLinearGradient(left, 0, left + width, 0);
    gradient.addColorStop(0, dark);
    gradient.addColorStop(.45, light);
    gradient.addColorStop(1, "rgba(15, 21, 23, .96)");
    ctx.fillStyle = gradient;
    ctx.fillRect(left, top + height * .08, width, height * .84);
    ctx.beginPath();
    ctx.ellipse(x, top + height * .08, width / 2, width * .14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = edge;
    ctx.lineWidth = Math.max(1, scale);
    for (const lineY of [top + height * .22, top + height * .72]) {
      ctx.beginPath();
      ctx.moveTo(left, lineY);
      ctx.lineTo(left + width, lineY);
      ctx.stroke();
    }
  } else if (["shelf", "locker", "cabinet"].includes(prop.type)) {
    ctx.fillStyle = dark;
    ctx.fillRect(left, top, width, height);
    ctx.fillStyle = light;
    ctx.globalAlpha = .7;
    ctx.fillRect(left + width * .08, top + height * .05, width * .84, height * .9);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = edge;
    ctx.lineWidth = Math.max(1, scale);
    if (prop.type === "shelf") {
      for (let row = 1; row < 4; row += 1) {
        const shelfY = top + height * row / 4;
        ctx.beginPath();
        ctx.moveTo(left + width * .08, shelfY);
        ctx.lineTo(left + width * .92, shelfY);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(237, 193, 91, .62)";
      ctx.fillRect(left + width * .18, top + height * .56, width * .25, height * .14);
      ctx.fillStyle = "rgba(105, 145, 132, .72)";
      ctx.fillRect(left + width * .57, top + height * .31, width * .22, height * .18);
    } else {
      ctx.beginPath();
      ctx.moveTo(x, top + height * .06);
      ctx.lineTo(x, top + height * .94);
      ctx.stroke();
      ctx.fillStyle = "rgba(225, 235, 232, .72)";
      ctx.fillRect(x - width * .16, top + height * .5, width * .07, Math.max(2, height * .03));
      ctx.fillRect(x + width * .09, top + height * .5, width * .07, Math.max(2, height * .03));
    }
  } else if (["console", "radio"].includes(prop.type)) {
    ctx.fillStyle = dark;
    ctx.fillRect(left, top + height * .18, width, height * .82);
    ctx.fillStyle = "rgba(7, 17, 21, .98)";
    ctx.fillRect(left + width * .1, top + height * .08, width * .8, height * .43);
    ctx.shadowColor = light;
    ctx.shadowBlur = 10;
    ctx.fillStyle = light;
    ctx.fillRect(left + width * .16, top + height * .14, width * .68, height * .28);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(7, 12, 14, .72)";
    ctx.fillRect(left + width * .23, top + height * .21, width * .42, Math.max(2, height * .035));
    ctx.fillStyle = "#f4d36e";
    for (let button = 0; button < 3; button += 1) {
      ctx.fillRect(left + width * (.2 + button * .2), top + height * .67, Math.max(3, width * .07), Math.max(3, width * .07));
    }
  } else if (["desk", "counter", "table", "bench"].includes(prop.type)) {
    const topHeight = Math.max(6, height * .18);
    ctx.fillStyle = light;
    ctx.fillRect(left, top, width, topHeight);
    ctx.fillStyle = dark;
    if (prop.type === "counter") {
      ctx.fillRect(left + width * .06, top + topHeight, width * .88, height - topHeight);
      ctx.fillStyle = "rgba(238, 241, 232, .18)";
      ctx.fillRect(left + width * .14, top + height * .38, width * .72, height * .42);
    } else {
      const legWidth = Math.max(4, width * .11);
      ctx.fillRect(left + width * .1, top + topHeight, legWidth, height - topHeight);
      ctx.fillRect(left + width * .79, top + topHeight, legWidth, height - topHeight);
      if (prop.type === "desk") {
        ctx.fillStyle = "rgba(11, 16, 18, .9)";
        ctx.fillRect(left + width * .26, top + topHeight, width * .48, height * .45);
      }
    }
  } else if (prop.type === "chair") {
    const seatY = top + height * .58;
    ctx.fillStyle = light;
    ctx.fillRect(left + width * .08, top, width * .84, height * .5);
    ctx.fillRect(left, seatY, width, Math.max(5, height * .16));
    ctx.fillStyle = dark;
    ctx.fillRect(left + width * .12, seatY + height * .13, width * .13, height * .29);
    ctx.fillRect(left + width * .75, seatY + height * .13, width * .13, height * .29);
  } else if (["bed", "pod"].includes(prop.type)) {
    ctx.fillStyle = dark;
    ctx.fillRect(left, top + height * .34, width, height * .66);
    ctx.fillStyle = light;
    ctx.fillRect(left + width * .05, top + height * .24, width * .9, height * .5);
    ctx.fillStyle = "rgba(230, 239, 232, .68)";
    ctx.fillRect(left + width * .62, top + height * .3, width * .27, height * .18);
    if (prop.type === "pod") {
      ctx.strokeStyle = "rgba(130, 232, 255, .74)";
      ctx.lineWidth = Math.max(2, scale);
      ctx.strokeRect(left + width * .05, top + height * .24, width * .9, height * .5);
    }
  } else if (prop.type === "plant") {
    ctx.fillStyle = "rgba(105, 78, 55, .98)";
    ctx.fillRect(left + width * .27, top + height * .65, width * .46, height * .35);
    ctx.fillStyle = "#4f8b5c";
    for (const [leafX, leafY, leafSize] of [[.5, .2, .28], [.28, .4, .23], [.72, .42, .24], [.46, .48, .3]]) {
      ctx.beginPath();
      ctx.ellipse(left + width * leafX, top + height * leafY, width * leafSize, height * .16, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = edge;
  ctx.lineWidth = 1;
  ctx.strokeRect(left, top, width, height);
  ctx.restore();
}

function screenPoint(point, width, horizon, lift = 0) {
  const projected = project(point);
  if (projected.z < 20) return null;
  const scale = 620 / projected.z;
  return {
    x: width / 2 + projected.x / projected.z * 560,
    y: horizon + 28000 / projected.z - lift * scale,
    scale,
    depth: projected.z
  };
}

function drawTracers(width, height, horizon) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.globalCompositeOperation = "lighter";
  for (const tracer of state.tracers) {
    const alpha = clamp(tracer.life / tracer.maxLife, 0, 1);
    const progress = clamp(1 - alpha, 0, 1);
    const from = tracer.worldShot
      ? screenPoint(tracer.from, width, horizon, 46)
      : { x: width * .69, y: height * .74 - state.recoil * 36, scale: 1 };
    const to = tracer.aimPitch !== null && !tracer.hit
      ? { x: width / 2, y: height / 2, scale: 1 }
      : screenPoint(tracer.to, width, horizon, tracer.hit ? 54 : 10);
    if (!from || !to) continue;
    const head = clamp(progress * 1.45, 0, 1);
    const tail = clamp(head - (tracer.incoming ? .28 : .2), 0, 1);
    const headPoint = {
      x: from.x + (to.x - from.x) * head,
      y: from.y + (to.y - from.y) * head
    };
    const tailPoint = {
      x: from.x + (to.x - from.x) * tail,
      y: from.y + (to.y - from.y) * tail
    };
    const gradient = ctx.createLinearGradient(tailPoint.x, tailPoint.y, headPoint.x, headPoint.y);
    gradient.addColorStop(0, `rgba(255,255,255,${.95 * alpha})`);
    gradient.addColorStop(.42, tracer.color);
    gradient.addColorStop(1, `rgba(255,255,255,${.9 * alpha})`);
    ctx.strokeStyle = `rgba(255,210,122,${.24 * alpha})`;
    ctx.lineWidth = Math.max(5, tracer.width * 2.4 * alpha);
    ctx.beginPath();
    ctx.moveTo(tailPoint.x, tailPoint.y);
    ctx.lineTo(headPoint.x, headPoint.y);
    ctx.stroke();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = Math.max(1.5, tracer.width * .72 * alpha);
    ctx.beginPath();
    ctx.moveTo(tailPoint.x, tailPoint.y);
    ctx.lineTo(headPoint.x, headPoint.y);
    ctx.stroke();
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(headPoint.x, headPoint.y, Math.max(2.5, tracer.width * alpha), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawParticles(width, height, horizon) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const particle of state.particles) {
    const point = screenPoint(particle, width, horizon, 18);
    if (!point) continue;
    const alpha = clamp(particle.life / particle.maxLife, 0, 1);
    if (particle.kind === "ring") {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = Math.max(1.5, 3 * alpha);
      ctx.beginPath();
      ctx.arc(point.x, point.y, particle.size * (1.8 - alpha) * clamp(point.scale, .3, 1.4), 0, Math.PI * 2);
      ctx.stroke();
    } else if (particle.kind === "smoke") {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = alpha * .38;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, clamp(particle.size * point.scale * (1.4 - alpha * .35), 3, 18), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "lighter";
    } else {
      ctx.strokeStyle = particle.color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = clamp(particle.size * point.scale, 1, 4);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x - particle.vx * .035 * point.scale, point.y - particle.vy * .035 * point.scale);
      ctx.stroke();
    }
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawCasings() {
  ctx.save();
  for (const casing of state.casings) {
    const alpha = clamp(casing.life / casing.maxLife, 0, 1);
    ctx.save();
    ctx.translate(casing.x, casing.y);
    ctx.rotate(casing.rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#d4a846";
    ctx.fillRect(-5, -2, 10, 4);
    ctx.fillStyle = "#f3d681";
    ctx.fillRect(-4, -1.5, 6, 1.5);
    ctx.fillStyle = "#57401d";
    ctx.fillRect(3, -2, 2, 4);
    ctx.restore();
  }
  ctx.restore();
}

function drawFloatingText(width, height, horizon) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "700 16px sans-serif";
  ctx.shadowColor = "rgba(0,0,0,.65)";
  ctx.shadowBlur = 8;
  for (const item of state.floatText) {
    const progress = 1 - item.life / item.maxLife;
    const point = screenPoint(item, width, horizon, item.lift + progress * 70);
    if (!point) continue;
    ctx.globalAlpha = clamp(item.life / item.maxLife, 0, 1);
    ctx.fillStyle = item.color;
    ctx.fillText(item.text, point.x, point.y);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawCombatOverlay(width, height) {
  if (state.hitMarker > 0) {
    const alpha = clamp(state.hitMarker / .22, 0, 1);
    ctx.save();
    ctx.strokeStyle = `rgba(255, 227, 122, ${alpha})`;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    const cx = width / 2;
    const cy = height / 2;
    for (const dir of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(cx + dir * 10, cy - 10);
      ctx.lineTo(cx + dir * 26, cy - 26);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + dir * 10, cy + 10);
      ctx.lineTo(cx + dir * 26, cy + 26);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (state.damageArc.life > 0) {
    const alpha = clamp(state.damageArc.life / .48, 0, 1);
    const relative = angleDiff(state.damageArc.angle, state.player.angle);
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * .36;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(relative);
    ctx.strokeStyle = `rgba(255, 76, 86, ${alpha})`;
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(0, 0, radius, -.34, .34);
    ctx.stroke();
    ctx.restore();
  }
}

function drawProp(x, y, scale, prop) {
  const w = clamp(prop.radius * scale, 12, 110);
  const h = clamp(prop.height * scale, 18, 190);
  ctx.save();
  ctx.globalAlpha = .92;
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = 1.5;
  if (prop.type === "ramp") {
    ctx.fillStyle = "rgba(111, 197, 255, .72)";
    ctx.beginPath();
    ctx.moveTo(x - w * .7, y);
    ctx.lineTo(x + w * .7, y);
    ctx.lineTo(x + w * .42, y - h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.2)";
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x - w * .56 + i * w * .25, y - i * h * .22);
      ctx.lineTo(x + w * .52, y - i * h * .22);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = prop.tint || state.map.prop;
    ctx.fillRect(x - w / 2, y - h, w, h);
    ctx.fillStyle = "rgba(255,255,255,.12)";
    ctx.fillRect(x - w / 2 + 3, y - h + 3, w * .28, h - 6);
    ctx.fillStyle = "rgba(0,0,0,.28)";
    ctx.fillRect(x - w / 2, y - h, w, Math.max(4, h * .16));
    ctx.strokeRect(x - w / 2, y - h, w, h);
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawTrap(x, y, scale, trap) {
  const r = clamp(trap.radius * scale, 8, 48);
  if (trap.type === "mine") {
    ctx.fillStyle = "#2b3038";
    ctx.beginPath();
    ctx.arc(x, y - r * .2, r * .7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff5d63";
    ctx.fillRect(x - 3, y - r, 6, 5);
  } else {
    ctx.fillStyle = trap.type === "pitfall" ? "#190f12" : "#11151b";
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * .42, 0, 0, Math.PI * 2);
    ctx.fill();
    if (trap.type === "pitfall") {
      ctx.strokeStyle = "#d8dce3";
      ctx.beginPath();
      ctx.moveTo(x - r * .45, y);
      ctx.lineTo(x, y - r * .55);
      ctx.lineTo(x + r * .45, y);
      ctx.stroke();
    }
  }
}

function characterScreenHeight(scale) {
  const maxHeight = clamp(canvas.clientHeight * .78, 180, 560);
  return clamp(CHARACTER_WORLD_HEIGHT * scale, 18, maxHeight);
}

function drawEnemy(x, y, scale, enemy) {
  const h = characterScreenHeight(scale);
  const w = h * .34;
  const armorColor = enemy.trapped > 0 ? "#d4a743" : "#8f3438";
  ctx.save();
  ctx.globalAlpha = clamp(.45 + scale * .35, .58, 1);
  ctx.fillStyle = "rgba(0,0,0,.32)";
  ctx.beginPath();
  ctx.ellipse(x, y + 2, w * 1.05, h * .09, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#242a30";
  ctx.lineWidth = Math.max(3, w * .28);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - w * .2, y - h * .36);
  ctx.lineTo(x - w * .34, y - h * .03);
  ctx.moveTo(x + w * .2, y - h * .36);
  ctx.lineTo(x + w * .38, y - h * .03);
  ctx.stroke();

  const vest = ctx.createLinearGradient(x - w, 0, x + w, 0);
  vest.addColorStop(0, "#32191b");
  vest.addColorStop(.45, armorColor);
  vest.addColorStop(1, "#4d2024");
  ctx.fillStyle = vest;
  ctx.beginPath();
  ctx.moveTo(x - w * .58, y - h * .76);
  ctx.lineTo(x + w * .56, y - h * .76);
  ctx.lineTo(x + w * .45, y - h * .32);
  ctx.lineTo(x - w * .42, y - h * .32);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = Math.max(1, w * .04);
  ctx.stroke();

  ctx.strokeStyle = "#663034";
  ctx.lineWidth = Math.max(3, w * .24);
  ctx.beginPath();
  ctx.moveTo(x - w * .48, y - h * .69);
  ctx.lineTo(x - w * .72, y - h * .43);
  ctx.moveTo(x + w * .48, y - h * .68);
  ctx.lineTo(x + w * .75, y - h * .49);
  ctx.stroke();

  ctx.fillStyle = "#c58f70";
  ctx.beginPath();
  ctx.arc(x, y - h * .86, w * .43, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#272d32";
  ctx.beginPath();
  ctx.arc(x, y - h * .9, w * .49, Math.PI, Math.PI * 2);
  ctx.lineTo(x + w * .49, y - h * .84);
  ctx.lineTo(x - w * .49, y - h * .84);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.28)";
  ctx.fillRect(x - w * .22, y - h * .88, w * .44, Math.max(1, h * .025));

  ctx.strokeStyle = "#141a20";
  ctx.lineWidth = Math.max(3, w * .18);
  ctx.beginPath();
  ctx.moveTo(x + w * .18, y - h * .58);
  ctx.lineTo(x + w * 1.18, y - h * .48);
  ctx.stroke();
  ctx.fillStyle = "#313a43";
  ctx.fillRect(x + w * .52, y - h * .54, w * .86, Math.max(3, h * .07));
  ctx.fillStyle = "#0d1115";
  ctx.fillRect(x + w * 1.28, y - h * .53, w * .3, Math.max(2, h * .045));

  ctx.fillStyle = "rgba(0,0,0,.55)";
  ctx.fillRect(x - w, y - h - 12, w * 2, 6);
  const healthRatio = clamp(enemy.health / enemy.maxHealth, 0, 1);
  ctx.fillStyle = healthRatio > .5 ? "#67e08a" : healthRatio > .25 ? "#ffd166" : "#ff5d63";
  ctx.fillRect(x - w + 1, y - h - 11, (w * 2 - 2) * healthRatio, 4);
  ctx.fillStyle = "rgba(0,0,0,.55)";
  ctx.fillRect(x - w, y - h - 5, w * 2, 4);
  ctx.fillStyle = enemy.stamina < 25 ? "#ff9a62" : "#74d7ff";
  ctx.fillRect(x - w + 1, y - h - 4, (w * 2 - 2) * clamp(enemy.stamina / 150, 0, 1), 2);
  ctx.restore();
}

function drawWeapon(width, height) {
  const w = weapon();
  const moving = keys.has("w") || keys.has("a") || keys.has("s") || keys.has("d");
  const bob = moving && state.running ? Math.sin(state.time * 9) : 0;
  const x = width * .64 + state.recoil * 26 + bob * 3;
  const y = height * .82 + state.recoil * 38 + Math.abs(bob) * 3;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-.1 - state.recoil * .09 + bob * .004);
  ctx.fillStyle = "rgba(0,0,0,.42)";
  ctx.beginPath();
  ctx.moveTo(-82, -3);
  ctx.lineTo(105, -3);
  ctx.lineTo(112, 31);
  ctx.lineTo(-58, 39);
  ctx.closePath();
  ctx.fill();

  const receiver = ctx.createLinearGradient(0, -30, 0, 25);
  receiver.addColorStop(0, "#4f5c68");
  receiver.addColorStop(.26, "#252e37");
  receiver.addColorStop(1, "#0d1319");
  ctx.fillStyle = receiver;
  ctx.beginPath();
  ctx.moveTo(-70, -29);
  ctx.lineTo(73, -29);
  ctx.lineTo(94, -13);
  ctx.lineTo(75, 11);
  ctx.lineTo(-54, 17);
  ctx.lineTo(-78, 3);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.16)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#10171d";
  ctx.fillRect(62, -23, 92, 17);
  ctx.fillStyle = "#707c84";
  ctx.fillRect(72, -20, 82, 4);
  ctx.fillStyle = "#080c10";
  ctx.fillRect(146, -25, 26, 21);
  ctx.fillStyle = "#313b44";
  ctx.fillRect(-40, -37, 67, 9);
  ctx.fillStyle = "#151c23";
  ctx.fillRect(-31, 9, 31, 61);
  ctx.fillStyle = "#2f3941";
  ctx.beginPath();
  ctx.moveTo(8, 8);
  ctx.lineTo(40, 7);
  ctx.lineTo(31, 57);
  ctx.lineTo(4, 54);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#9d7937";
  ctx.fillRect(14, 12, 15, 39);
  ctx.fillStyle = "#171e25";
  ctx.fillRect(-84, -18, 24, 32);
  ctx.fillStyle = "rgba(255,255,255,.23)";
  ctx.fillRect(-55, -23, 91, 3);
  ctx.fillStyle = "#d9e1ea";
  ctx.font = "700 12px sans-serif";
  ctx.fillText(w.name, -62, -38);

  if (state.muzzleFlash > 0) {
    const alpha = clamp(state.muzzleFlash / .075, 0, 1);
    ctx.globalCompositeOperation = "lighter";
    const flash = ctx.createRadialGradient(176, -15, 0, 176, -15, 82);
    flash.addColorStop(0, `rgba(255,255,255,${alpha})`);
    flash.addColorStop(.22, `rgba(255,226,106,${alpha})`);
    flash.addColorStop(1, "rgba(255,111,64,0)");
    ctx.fillStyle = flash;
    ctx.beginPath();
    ctx.arc(176, -15, 82, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(255, 244, 190, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(167, -15);
    ctx.lineTo(222, -47);
    ctx.lineTo(204, -16);
    ctx.lineTo(230, 10);
    ctx.lineTo(194, -2);
    ctx.lineTo(205, 31);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function updateUi() {
  const p = state.player;
  ui.healthMeter.max = state.armorRank >= 16 ? 190 : 150;
  ui.healthMeter.value = p.health;
  ui.staminaMeter.value = p.stamina;
  ui.healthText.textContent = Math.ceil(p.health);
  ui.staminaText.textContent = p.exhausted ? "REST" : Math.ceil(p.stamina);
  const minutes = Math.floor(state.time / 60).toString().padStart(2, "0");
  const seconds = Math.floor(state.time % 60).toString().padStart(2, "0");
  ui.clockText.textContent = `${minutes}:${seconds}`;
  ui.resourceText.textContent = `Diamonds ${state.diamonds} | Level ${state.level} | Shards ${state.shards}`;
  ui.modeText.textContent = `Mode: ${state.mode}`;
  ui.mapText.textContent = state.insideBuilding
    ? `Map: ${state.map.name} | ${activeBuilding().name}`
    : `Map: ${state.map.name}`;
  ui.enemyText.textContent = isRivalDuel()
    ? `Rival: ${state.enemies[0]?.id || "Waiting"}`
    : `Opponents: ${state.enemies.filter(e => e.alive).length}`;
  ui.difficultyText.textContent = `Difficulty: ${state.difficulty}`;
  ui.weaponText.textContent = `Weapon: ${weapon().name}`;
  ui.ammoText.textContent = state.player.reload > 0 ? "Reloading..." : `Ammo: ${state.ammo} / ${weapon().magazine}`;
  ui.trapText.textContent = isRivalDuel()
    ? "Fair arena | Traps disabled"
    : `Mines ${countTraps("mine")} | Holes ${countTraps("hole")} | Pitfalls ${countTraps("pitfall")}`;
  ui.loadoutText.textContent = `${weapon().name} + ${armor().name}`;

  if (isRivalDuel()) {
    ui.duelHud.classList.remove("hidden");
    ui.playerRoundScore.textContent = state.playerRounds;
    ui.rivalRoundScore.textContent = state.rivalRounds;
    ui.roundLabel.textContent = `ROUND ${state.roundNumber}`;
    let banner = "";
    if (state.duelPhase === "countdown") banner = Math.min(3, Math.max(1, Math.ceil(state.phaseTimer)));
    if (state.duelPhase === "roundEnd") banner = state.roundMessage;
    if (state.duelPhase === "playing" && state.phaseTimer > 0) banner = state.roundMessage;
    if (banner) {
      ui.roundBanner.textContent = banner;
      ui.roundBanner.classList.remove("hidden");
    } else {
      ui.roundBanner.classList.add("hidden");
    }
    ui.rewardText.textContent = "Win 5 rounds before your rival.";
  } else {
    ui.duelHud.classList.add("hidden");
    ui.roundBanner.classList.add("hidden");
    ui.rewardText.textContent = "Win: diamonds, level XP, and survival bonuses.";
  }
}

function renderDifficultyButtons() {
  ui.difficultyButtons.forEach(button => {
    const selected = button.dataset.difficulty === state.difficulty;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", selected);
  });
}

function countTraps(type) {
  return state.traps.filter(t => t.active && t.type === type).length;
}

function renderInventory() {
  ui.inventoryGrid.innerHTML = "";
  state.inventory.forEach((item, i) => {
    const slot = document.createElement("button");
    slot.className = "slot";
    slot.type = "button";
    slot.innerHTML = item
      ? `<small>${i + 1}</small><b>${item.name}</b><small>x${item.count}</small>`
      : `<small>${i + 1}</small><b>Empty</b><small>-</small>`;
    slot.addEventListener("click", () => useSlot(i));
    ui.inventoryGrid.append(slot);
  });
}

function renderShop() {
  ui.gunList.innerHTML = "";
  for (const gun of weapons) {
    const row = document.createElement("div");
    row.className = "shop-item";
    const owned = gun.rank <= state.weaponRank;
    row.innerHTML = `<div><strong>${gun.rank}. ${gun.name}</strong><small>${gun.damage} XP damage | ${gun.range} range | ${gun.diamonds || "Free"} diamonds | level ${gun.level}</small></div>`;
    const btn = document.createElement("button");
    btn.textContent = owned ? (gun.rank === state.weaponRank ? "Equipped" : "Equip") : "Buy";
    btn.addEventListener("click", () => buyWeapon(gun));
    row.append(btn);
    ui.gunList.append(row);
  }

  ui.armorList.innerHTML = "";
  for (const item of armors) {
    const row = document.createElement("div");
    row.className = "shop-item";
    const owned = item.rank <= state.armorRank;
    row.innerHTML = `<div><strong>${item.rank}. ${item.name}</strong><small>${Math.round(item.protection * 100)}% protection | ${item.effect} | ${item.diamonds || "Free"} diamonds | level ${item.level}</small></div>`;
    const btn = document.createElement("button");
    btn.textContent = owned ? (item.rank === state.armorRank ? "Equipped" : "Equip") : "Buy";
    btn.addEventListener("click", () => buyArmor(item));
    row.append(btn);
    ui.armorList.append(row);
  }
}

function buyWeapon(gun) {
  if (gun.rank <= state.weaponRank) {
    state.weaponRank = gun.rank;
    state.ammo = weapon().magazine;
    addChat(`Equipped ${gun.name}.`);
  } else if (state.diamonds >= gun.diamonds && state.level >= gun.level) {
    state.diamonds -= gun.diamonds;
    state.weaponRank = gun.rank;
    state.ammo = weapon().magazine;
    addChat(`Bought ${gun.name}.`);
  } else {
    addChat("Gain more diamonds and levels, you do not have enough.");
  }
  renderShop();
}

function buyArmor(item) {
  if (item.rank <= state.armorRank) {
    state.armorRank = item.rank;
    addChat(`Equipped ${item.name}.`);
  } else if (state.diamonds >= item.diamonds && state.level >= item.level) {
    state.diamonds -= item.diamonds;
    state.armorRank = item.rank;
    addChat(`Bought ${item.name}.`);
  } else {
    addChat("Gain more diamonds and levels, you do not have enough.");
  }
  renderShop();
}

function dailySpin() {
  const roll = Math.random() * 100;
  let text = "You missed.";
  if (roll < 5) text = "You missed.";
  else if (roll < 15) { state.diamonds += 5; text = "Daily spin: +5 diamonds."; }
  else if (roll < 50) { state.diamonds += 10; text = "Daily spin: +10 diamonds."; }
  else if (roll < 83) { state.diamonds += 25; text = "Daily spin: +25 diamonds."; }
  else if (roll < 98) { state.level += 1; text = "Daily spin: +1 level."; }
  else if (roll < 99.99999999) { state.diamonds += 100; text = "Daily spin jackpot: +100 diamonds."; }
  else { state.level += 50; text = "Impossible spin: +50 levels."; }
  addChat(text);
}

function spinMap() {
  if (state.insideBuilding) {
    state.buildingCooldown = 0;
    exitBuilding(true);
  }
  const index = Math.floor(Math.random() * maps.length);
  state.selectedMap = maps[index];
  state.map = state.selectedMap;
  wheelTurns += 1440 + index * 45 + Math.floor(rand(0, 35));
  ui.wheel.style.transform = `rotate(${wheelTurns}deg)`;
  ui.wheelLabel.textContent = maps[index].name;
  addChat(`Wheel selected ${maps[index].name}.`);
  updateUi();
}

function gameLoop(now) {
  const dt = Math.min(.05, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  drawWorld();
  updateUi();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", event => {
  const key = event.key.toLowerCase();
  keys.add(key);
  if (key >= "1" && key <= "9") useSlot(Number(key) - 1);
  if (key === "r") reload();
  if (key === "f") shoot();
  if (key === "e" && !event.repeat) toggleBuilding();
  if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) event.preventDefault();
});
window.addEventListener("keyup", event => keys.delete(event.key.toLowerCase()));
canvas.addEventListener("click", () => canvas.requestPointerLock?.());
document.addEventListener("pointerlockchange", () => pointer.locked = document.pointerLockElement === canvas);
document.addEventListener("mousemove", event => {
  if (pointer.locked && state.running) {
    state.player.angle += event.movementX * .0025;
    state.player.pitch = clamp(state.player.pitch + event.movementY * .0019, -.62, .62);
  }
});
canvas.addEventListener("contextmenu", event => {
  event.preventDefault();
  shoot();
});
canvas.addEventListener("mousedown", event => {
  if (event.button === 0 || event.button === 2) shoot();
});

ui.spinMapBtn.addEventListener("click", spinMap);
ui.modeSelect.addEventListener("change", () => {
  state.mode = ui.modeSelect.value;
  addChat(`Mode set to ${state.mode}.`);
});
ui.difficultyButtons.forEach(button => {
  button.addEventListener("click", () => {
    state.difficulty = button.dataset.difficulty;
    renderDifficultyButtons();
    addChat(`Robot difficulty set to ${state.difficulty}.`);
    updateUi();
  });
});
ui.startBtn.addEventListener("click", () => {
  if (!state.selectedMap) spinMap();
  if (state.mode.includes("Bedwars") && (state.diamonds < 100 || state.level < 2)) {
    addChat("Gain more diamonds and levels, you do not have enough.");
    return;
  }
  if (state.mode.includes("Bedwars")) {
    state.diamonds -= 100;
    state.level -= 2;
    state.shards += 1;
    addChat("Bedwars entry paid. One shard found in your starter chest.");
  }
  resetMatch();
});
ui.restartBtn.addEventListener("click", resetMatch);
ui.shopBtn.addEventListener("click", () => {
  renderShop();
  ui.shopOverlay.classList.remove("hidden");
});
ui.closeShopBtn.addEventListener("click", () => ui.shopOverlay.classList.add("hidden"));
ui.dailyBtn.addEventListener("click", dailySpin);

resize();
renderDifficultyButtons();
renderInventory();
renderShop();
spinMap();
drawWorld();
updateUi();
requestAnimationFrame(gameLoop);
