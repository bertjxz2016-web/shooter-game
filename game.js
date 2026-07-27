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
  hitFlash: document.getElementById("hitFlash")
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

const state = {
  running: false,
  won: false,
  selectedMap: null,
  map: maps[0],
  mode: "Free for all (6 people)",
  time: 0,
  lastNoKillCheck: 0,
  lastTrapMinute: 0,
  diamonds: 12,
  level: 1,
  shards: 0,
  kills: 0,
  player: { x: 0, y: 0, angle: 0, health: 150, stamina: 150, z: 0, vz: 0, reload: 0, shootCd: 0, trapped: 0 },
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
  inventory: [
    { name: "Apple", type: "food", count: 5, heal: 22 },
    { name: "Water", type: "water", count: 3 },
    { name: "Sandwich", type: "food", count: 2, heal: 36 },
    null, null, null, null, null, null
  ]
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

function addChat(text) {
  const minutes = Math.floor(state.time / 60).toString().padStart(2, "0");
  const seconds = Math.floor(state.time % 60).toString().padStart(2, "0");
  state.chat.push({ time: `${minutes}:${seconds}`, text });
  state.chat = state.chat.slice(-10);
  ui.chatLog.innerHTML = state.chat.map(line => `<div class="chat-line"><span>${line.time}</span> ${line.text}</div>`).join("");
}

function modeEnemyCount() {
  if (state.mode.includes("1v1")) return 1;
  if (state.mode.includes("4v4")) return 4;
  if (state.mode.includes("6v6")) return 6;
  if (state.mode.includes("8")) return 7;
  if (state.mode.includes("Bedwars")) return 11;
  return 5;
}

function arenaSize() {
  if (state.mode.includes("1v1")) return 950;
  if (state.mode.includes("8") || state.mode.includes("6v6") || state.mode.includes("Bedwars")) return 1700;
  if (state.mode.includes("4v4")) return 1450;
  return 1300;
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
  for (let i = 0; i < 32; i++) {
    const p = randomPoint(size);
    const type = i % 7 === 0 ? "ramp" : i % 5 === 0 ? "buildWall" : i % 3 === 0 ? "cover" : "crate";
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
  state.enemies = [];
  for (let i = 0; i < modeEnemyCount(); i++) {
    const p = randomPoint(size);
    const rank = clamp(Math.floor(state.level / 2) + 1 + Math.floor(rand(0, 4)), 1, weapons.length);
    const health = 46 + state.level * 4 + rand(0, 22);
    state.enemies.push({
      id: names[i],
      ...p,
      angle: rand(0, Math.PI * 2),
      health,
      maxHealth: health,
      weaponRank: rank,
      armor: clamp(Math.floor(rank / 2), 1, armors.length),
      speed: rand(42, 75),
      shootCd: rand(.2, 1.6),
      pathCd: 0,
      targetCd: rand(0, .8),
      targetId: null,
      alive: true,
      trapped: 0
    });
  }
}

function resetMatch() {
  const size = arenaSize();
  state.time = 0;
  state.kills = 0;
  state.won = false;
  state.running = true;
  state.player = { x: 0, y: 0, angle: 0, health: 150, stamina: 150, z: 0, vz: 0, reload: 0, shootCd: 0, trapped: 0 };
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
  generateProps(size);
  generateTraps(size);
  spawnEnemies(size);
  addChat(`${state.mode} started on ${state.map.name}.`);
  addChat("Eliminate every opponent before they eliminate you.");
  ui.overlay.classList.add("hidden");
}

function endMatch(won, reason) {
  state.running = false;
  state.won = won;
  if (won) {
    const diamonds = 10 + state.kills * 4 + Math.floor(state.time / 60);
    state.diamonds += diamonds;
    if (state.kills >= 3) state.level += 1;
    if (state.time > 2400) state.shards += 1;
    ui.overlayTitle.textContent = "Victory";
    ui.overlayBody.textContent = `You won on ${state.map.name}. Reward: ${diamonds} diamonds${state.kills >= 3 ? " and 1 level" : ""}.`;
    addChat(`You won and earned ${diamonds} diamonds.`);
  } else {
    ui.overlayTitle.textContent = "Defeat";
    ui.overlayBody.textContent = reason || "You were eliminated. Restart to try a new battle.";
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
  if (state.player.health <= 0) endMatch(false, source ? `${source} eliminated you.` : "You were eliminated.");
}

function shotEndpoint(origin, angle, range) {
  return {
    x: origin.x + Math.cos(angle) * range,
    y: origin.y + Math.sin(angle) * range
  };
}

function spawnTracer(from, to, color, hit, incoming = false, worldShot = incoming) {
  const lifetime = incoming ? .34 : .24;
  state.tracers.push({
    from: { ...from },
    to: { ...to },
    color,
    hit,
    incoming,
    worldShot,
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
  spawnTracer(muzzle, shotEnd, hit ? "#ffe37a" : "#96e8ff", Boolean(hit));
  ejectCasing();
  state.recoil = Math.max(state.recoil, .34);
  state.muzzleFlash = .075;
  state.shake = Math.max(state.shake, .11);
  if (hit) {
    const enemyArmor = armors[hit.armor - 1] || armors[0];
    const damage = w.damage * 4.5 * (1 - enemyArmor.protection * .55);
    hit.health -= damage;
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
      if (state.enemies.every(e => !e.alive)) endMatch(true);
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
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.x - state.player.x;
    const dy = e.y - state.player.y;
    const d = Math.hypot(dx, dy);
    if (d > range) continue;
    const angle = Math.atan2(dy, dx);
    const spread = clamp(35 / d, .025, .13);
    if (Math.abs(angleDiff(angle, state.player.angle)) < spread && d < bestDistance) {
      best = e;
      bestDistance = d;
    }
  }
  return best;
}

function chooseEnemyTarget(enemy) {
  const rivals = state.enemies.filter(candidate => candidate.alive && candidate !== enemy);
  const pool = rivals.length && Math.random() < .72
    ? rivals
    : [state.player, ...rivals];
  const target = pool
    .map(candidate => ({
      candidate,
      score: dist(enemy, candidate) * rand(.78, 1.28)
    }))
    .sort((a, b) => a.score - b.score)[0]?.candidate || state.player;
  enemy.targetId = target === state.player ? "player" : target.id;
  enemy.targetCd = rand(.85, 1.9);
  return target;
}

function resolveEnemyTarget(enemy) {
  if (enemy.targetId === "player") return state.player;
  return state.enemies.find(candidate => candidate.alive && candidate.id === enemy.targetId) || null;
}

function enemyShoot(enemy, target, dt) {
  if (!enemy.alive || enemy.trapped > 0 || !target) return;
  enemy.shootCd -= dt;
  const targetIsPlayer = target === state.player;
  const d = dist(enemy, target);
  const w = weapons[enemy.weaponRank - 1];
  if (d < w.range * .75 && enemy.shootCd <= 0) {
    enemy.shootCd = rand(.65, 1.4) + 1 / w.rate;
    const didHit = Math.random() > clamp(d / w.range, .12, .82);
    const shotTarget = didHit
      ? { x: target.x, y: target.y }
      : { x: target.x + rand(-150, 150), y: target.y + rand(-150, 150) };
    spawnTracer(enemy, shotTarget, didHit ? "#ff7b72" : "#ffb86b", didHit, targetIsPlayer, true);
    playShotSound(enemy.weaponRank, true);
    if (didHit) {
      spawnImpact(target.x, target.y, targetIsPlayer ? "#ff7b72" : "#ffd27a", 9);
      if (targetIsPlayer) {
        takeDamage(w.damage * rand(.22, .44), enemy.id);
      } else {
        const targetArmor = armors[target.armor - 1] || armors[0];
        const damage = w.damage * rand(.28, .52) * (1 - targetArmor.protection * .55);
        target.health -= damage;
        spawnFloatingText(target.x, target.y, damage.toFixed(0), "#ffb86b", .65, 44);
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

function updatePlayer(dt) {
  const p = state.player;
  p.shootCd = Math.max(0, p.shootCd - dt);
  p.reload = Math.max(0, p.reload - dt);
  if (p.reload === 0 && state.ammo < weapon().magazine) state.ammo = weapon().magazine;
  if (p.trapped > 0) {
    p.trapped -= dt;
    return;
  }

  const forward = keys.has("w") || keys.has("arrowup") ? 1 : 0;
  const back = keys.has("s") || keys.has("arrowdown") ? 1 : 0;
  const left = keys.has("a") || keys.has("arrowleft") ? 1 : 0;
  const right = keys.has("d") || keys.has("arrowright") ? 1 : 0;
  const moving = forward || back || left || right;
  const tired = p.stamina < 25 ? .52 : 1;
  const speed = 185 * armor().speed * tired;
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

  const size = arenaSize();
  p.x = clamp(p.x + vx * dt, -size / 2 + 36, size / 2 - 36);
  p.y = clamp(p.y + vy * dt, -size / 2 + 36, size / 2 - 36);

  if (moving) {
    p.stamina = clamp(p.stamina - (150 / 240) * dt, 0, 150);
  } else {
    p.stamina = clamp(p.stamina + 7 * dt, 0, 150);
    if (state.armorRank === 11 && p.health < 150) p.health = clamp(p.health + 1.5 * dt, 0, 150);
  }

  if (keys.has(" ") && p.z === 0) {
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

function updateEnemies(dt) {
  const size = arenaSize();
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (e.trapped > 0) {
      e.trapped -= dt;
      continue;
    }
    e.targetCd -= dt;
    let target = resolveEnemyTarget(e);
    if (!target || e.targetCd <= 0 || dist(e, target) > weapons[e.weaponRank - 1].range * 1.15) {
      target = chooseEnemyTarget(e);
    }
    e.pathCd -= dt;
    if (e.pathCd <= 0) {
      e.angle = Math.atan2(target.y - e.y, target.x - e.x) + rand(-.62, .62);
      e.pathCd = rand(.5, 1.6);
    }
    const d = dist(e, target);
    const desired = d > 280 ? 1 : d < 170 ? -1 : .2;
    e.x = clamp(e.x + Math.cos(e.angle) * e.speed * desired * dt, -size / 2 + 34, size / 2 - 34);
    e.y = clamp(e.y + Math.sin(e.angle) * e.speed * desired * dt, -size / 2 + 34, size / 2 - 34);
    enemyShoot(e, target, dt);
    checkEntityTraps(e, false);
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
      if (state.enemies.every(e => !e.alive)) endMatch(true);
    }
  }
}

function update(dt) {
  if (!state.running) return;
  state.time += dt;
  updatePlayer(dt);
  updateEnemies(dt);
  checkEntityTraps(state.player, true);
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
  const horizon = height * .47 - state.player.z * .12 + state.recoil * 10;
  const m = state.map;
  ctx.save();
  ctx.translate(shakeX, shakeY);
  ctx.clearRect(0, 0, width, height);
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, m.sky);
  sky.addColorStop(.58, "#25354a");
  sky.addColorStop(1, "#111721");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, horizon);
  drawAtmosphere(width, height, horizon);
  const ground = ctx.createLinearGradient(0, horizon, 0, height);
  ground.addColorStop(0, m.ground);
  ground.addColorStop(.45, "#2a3729");
  ground.addColorStop(1, "#07090d");
  ctx.fillStyle = ground;
  ctx.fillRect(0, horizon, width, height - horizon);
  const haze = ctx.createLinearGradient(0, horizon - 25, 0, horizon + height * .28);
  haze.addColorStop(0, "rgba(215,230,236,.16)");
  haze.addColorStop(1, "rgba(10,13,17,0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon - 25, width, height * .32);

  drawArenaWalls(width, height, horizon);
  drawGroundGrid(width, height, horizon);
  drawSprites(width, height, horizon);
  drawTracers(width, height, horizon);
  drawParticles(width, height, horizon);
  drawFloatingText(width, height, horizon);
  drawCasings();
  drawWeapon(width, height);
  ctx.restore();
  drawCombatOverlay(width, height);
}

function drawAtmosphere(width, height, horizon) {
  ctx.save();
  ctx.globalAlpha = .22;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 7; i++) {
    const x = (i * 211 + state.time * 9) % (width + 240) - 120;
    const y = 42 + (i % 3) * 34;
    ctx.beginPath();
    ctx.ellipse(x, y, 90, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 55, y + 8, 70, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = .18;
  const glow = ctx.createRadialGradient(width * .78, horizon * .28, 20, width * .78, horizon * .28, width * .38);
  glow.addColorStop(0, "#ffe37a");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, horizon);
  ctx.restore();
}

function drawArenaWalls(width, height, horizon) {
  const size = arenaSize();
  const corners = [
    { x: -size / 2, y: -size / 2 },
    { x: size / 2, y: -size / 2 },
    { x: size / 2, y: size / 2 },
    { x: -size / 2, y: size / 2 }
  ];
  ctx.strokeStyle = state.map.wall;
  ctx.lineWidth = 5;
  for (let i = 0; i < corners.length; i++) {
    const a = project(corners[i]);
    const b = project(corners[(i + 1) % corners.length]);
    if (a.z < 30 && b.z < 30) continue;
    const za = Math.max(30, a.z);
    const zb = Math.max(30, b.z);
    const ax = width / 2 + a.x / za * 560;
    const bx = width / 2 + b.x / zb * 560;
    const ay = horizon + 28000 / za;
    const by = horizon + 28000 / zb;
    const ah = 58000 / za;
    const bh = 58000 / zb;
    ctx.beginPath();
    ctx.moveTo(ax, ay - ah);
    ctx.lineTo(bx, by - bh);
    ctx.lineTo(bx, by);
    ctx.lineTo(ax, ay);
    ctx.closePath();
    ctx.globalAlpha = .55;
    ctx.fillStyle = state.map.wall;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.stroke();
  }
}

function drawGroundGrid(width, height, horizon) {
  ctx.strokeStyle = "rgba(255,255,255,.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 16; i++) {
    const y = horizon + Math.pow(i / 15, 1.65) * (height - horizon);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawSprites(width, height, horizon) {
  const sprites = [];
  for (const prop of state.props) sprites.push({ kind: "prop", obj: prop, depth: project(prop).z });
  for (const trap of state.traps) if (trap.active) sprites.push({ kind: "trap", obj: trap, depth: project(trap).z });
  for (const enemy of state.enemies) if (enemy.alive) sprites.push({ kind: "enemy", obj: enemy, depth: project(enemy).z });
  sprites.sort((a, b) => b.depth - a.depth);

  for (const sprite of sprites) {
    const point = project(sprite.obj);
    if (point.z < 26) continue;
    const screenX = width / 2 + point.x / point.z * 560;
    if (screenX < -120 || screenX > width + 120) continue;
    const base = horizon + 28000 / point.z;
    const scale = 620 / point.z;
    if (sprite.kind === "prop") drawProp(screenX, base, scale, sprite.obj);
    if (sprite.kind === "trap") drawTrap(screenX, base, scale, sprite.obj);
    if (sprite.kind === "enemy") drawEnemy(screenX, base, scale, sprite.obj);
  }

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
    const to = screenPoint(tracer.to, width, horizon, tracer.hit ? 54 : 10);
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
  } else if (prop.type === "buildWall") {
    ctx.fillStyle = "rgba(111, 197, 255, .62)";
    ctx.fillRect(x - w * .72, y - h, w * 1.44, h);
    ctx.strokeRect(x - w * .72, y - h, w * 1.44, h);
    ctx.strokeStyle = "rgba(255,255,255,.22)";
    ctx.beginPath();
    ctx.moveTo(x - w * .72, y - h * .5);
    ctx.lineTo(x + w * .72, y - h * .5);
    ctx.moveTo(x, y - h);
    ctx.lineTo(x, y);
    ctx.stroke();
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

function drawEnemy(x, y, scale, enemy) {
  const h = clamp(115 * scale, 24, 185);
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
  ui.staminaText.textContent = Math.ceil(p.stamina);
  const minutes = Math.floor(state.time / 60).toString().padStart(2, "0");
  const seconds = Math.floor(state.time % 60).toString().padStart(2, "0");
  ui.clockText.textContent = `${minutes}:${seconds}`;
  ui.resourceText.textContent = `Diamonds ${state.diamonds} | Level ${state.level} | Shards ${state.shards}`;
  ui.modeText.textContent = `Mode: ${state.mode}`;
  ui.mapText.textContent = `Map: ${state.map.name}`;
  ui.enemyText.textContent = `Opponents: ${state.enemies.filter(e => e.alive).length}`;
  ui.weaponText.textContent = `Weapon: ${weapon().name}`;
  ui.ammoText.textContent = state.player.reload > 0 ? "Reloading..." : `Ammo: ${state.ammo} / ${weapon().magazine}`;
  ui.trapText.textContent = `Mines ${countTraps("mine")} | Holes ${countTraps("hole")} | Pitfalls ${countTraps("pitfall")}`;
  ui.loadoutText.textContent = `${weapon().name} + ${armor().name}`;
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
  if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) event.preventDefault();
});
window.addEventListener("keyup", event => keys.delete(event.key.toLowerCase()));
canvas.addEventListener("click", () => canvas.requestPointerLock?.());
document.addEventListener("pointerlockchange", () => pointer.locked = document.pointerLockElement === canvas);
document.addEventListener("mousemove", event => {
  if (pointer.locked && state.running) state.player.angle += event.movementX * .0025;
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
renderInventory();
renderShop();
spinMap();
drawWorld();
updateUi();
requestAnimationFrame(gameLoop);
