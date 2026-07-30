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
  fightVitals: document.getElementById("fightVitals"),
  playerFightMeter: document.getElementById("playerFightMeter"),
  playerFightText: document.getElementById("playerFightText"),
  rivalFightMeter: document.getElementById("rivalFightMeter"),
  rivalFightText: document.getElementById("rivalFightText"),
  rivalFightName: document.getElementById("rivalFightName"),
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
  "Warehouse": [
    "North loading hangar", "Dispatch office", "Machine workshop", "Tool shed",
    "Vehicle garage", "Fire-watch tower", "Pallet warehouse", "Storm shelter",
    "South loading hangar", "Freight office", "Generator workshop", "Parts shed",
    "Forklift garage", "Water tower", "Cold-storage warehouse", "Security bunker"
  ],
  "Forest": [
    "Ranger cabin", "Hunting lodge", "Maintenance shed", "Fire lookout",
    "Trail shelter", "Field research tent", "Equipment barn", "Creek cabin",
    "Trapper cabin", "Visitor lodge", "Wood shed", "Observation tower",
    "Emergency tent", "Forestry tent", "Timber barn", "Lakeside cabin"
  ],
  "Small city block": [
    "Corner grocery", "Brick apartments", "Auto repair garage", "Corner cafe",
    "Bus-stop kiosk", "Furniture warehouse", "Walk-in clinic", "Bicycle workshop",
    "Pharmacy", "Residential apartments", "Parking garage", "Bakery",
    "News kiosk", "Delivery depot", "Dental clinic", "Hardware workshop"
  ],
  "Space station": [
    "Crew habitat module", "Science pod", "Cargo airlock", "Command module",
    "Observation dome", "Radiation shelter", "Communications mast", "Shuttle hangar",
    "Life-support module", "Medical pod", "Service airlock", "Navigation module",
    "Hydroponics dome", "Emergency bunker", "Sensor mast", "Rover hangar"
  ],
  "Desert military base": [
    "Forward bunker", "Radio watchtower", "Supply depot", "Troop barracks",
    "Vehicle hangar", "Perimeter tower", "Field hospital tent", "Ammunition bunker",
    "Command bunker", "Water tower", "Fuel depot", "Mess barracks",
    "Aircraft hangar", "Gate tower", "Operations tent", "Emergency bunker"
  ],
  "Abandoned village": [
    "Stone cottage", "Old chapel", "Blacksmith shop", "Dairy barn",
    "Village tavern", "Schoolhouse", "Horse stable", "Grain mill",
    "Weaver cottage", "Bell chapel", "Carpenter shop", "Hay barn",
    "Roadside inn", "Village hall", "Cart stable", "Water mill"
  ],
  "Mall": [
    "Security office", "Video arcade", "Clothing store", "Coffee kiosk",
    "Cinema entrance", "Sports store", "Information kiosk", "Maintenance room",
    "Electronics store", "Family arcade", "Bookstore", "Snack kiosk",
    "Second cinema lobby", "Pharmacy", "Customer service kiosk", "Loading service room"
  ],
  "High-rise office": [
    "Main lobby", "Open-plan office", "North tower", "Utility service room",
    "Broadcast studio", "Records archive", "Parking garage", "East annex",
    "Reception lobby", "Executive office", "South tower", "Electrical service room",
    "Design studio", "Document archive", "Underground garage", "Conference annex"
  ]
};

const structureTypesByMap = {
  "Warehouse": [
    "hangar", "office", "workshop", "shed", "garage", "tower", "warehouse", "bunker",
    "hangar", "office", "workshop", "shed", "garage", "tower", "warehouse", "bunker"
  ],
  "Forest": [
    "cabin", "lodge", "shed", "tower", "tent", "tent", "barn", "cabin",
    "cabin", "lodge", "shed", "tower", "tent", "tent", "barn", "cabin"
  ],
  "Small city block": [
    "storefront", "apartment", "garage", "storefront", "kiosk", "warehouse", "clinic", "workshop",
    "storefront", "apartment", "garage", "storefront", "kiosk", "warehouse", "clinic", "workshop"
  ],
  "Space station": [
    "module", "pod", "airlock", "module", "dome", "bunker", "tower", "hangar",
    "module", "pod", "airlock", "module", "dome", "bunker", "tower", "hangar"
  ],
  "Desert military base": [
    "bunker", "tower", "depot", "barracks", "hangar", "tower", "tent", "bunker",
    "bunker", "tower", "depot", "barracks", "hangar", "tower", "tent", "bunker"
  ],
  "Abandoned village": [
    "house", "chapel", "workshop", "barn", "tavern", "school", "stable", "mill",
    "house", "chapel", "workshop", "barn", "tavern", "school", "stable", "mill"
  ],
  "Mall": [
    "service", "arcade", "storefront", "kiosk", "cinema", "storefront", "kiosk", "service",
    "storefront", "arcade", "storefront", "kiosk", "cinema", "storefront", "kiosk", "service"
  ],
  "High-rise office": [
    "lobby", "office", "highrise", "service", "studio", "archive", "garage", "annex",
    "lobby", "office", "highrise", "service", "studio", "archive", "garage", "annex"
  ]
};

const structureMaterialsByMap = {
  "Warehouse": [
    "corrugated", "concrete", "brick", "corrugated", "concrete", "steel", "corrugated", "concrete",
    "corrugated", "concrete", "brick", "corrugated", "concrete", "steel", "corrugated", "concrete"
  ],
  "Forest": [
    "timber", "timber", "timber", "timber", "canvas", "canvas", "timber", "timber",
    "timber", "timber", "timber", "timber", "canvas", "canvas", "timber", "timber"
  ],
  "Small city block": [
    "brick", "brick", "concrete", "brick", "steel", "brick", "stucco", "brick",
    "brick", "brick", "concrete", "brick", "steel", "brick", "stucco", "brick"
  ],
  "Space station": [
    "alloy", "alloy", "alloy", "alloy", "alloy", "concrete", "steel", "alloy",
    "alloy", "alloy", "alloy", "alloy", "alloy", "concrete", "steel", "alloy"
  ],
  "Desert military base": [
    "concrete", "steel", "concrete", "stucco", "corrugated", "steel", "canvas", "concrete",
    "concrete", "steel", "concrete", "stucco", "corrugated", "steel", "canvas", "concrete"
  ],
  "Abandoned village": [
    "stone", "stone", "timber", "timber", "stone", "stone", "timber", "stone",
    "stone", "stone", "timber", "timber", "stone", "stone", "timber", "stone"
  ],
  "Mall": [
    "panel", "panel", "glass", "steel", "panel", "glass", "steel", "panel",
    "glass", "panel", "glass", "steel", "panel", "glass", "steel", "panel"
  ],
  "High-rise office": [
    "glass", "glass", "glass", "concrete", "glass", "concrete", "concrete", "glass",
    "glass", "glass", "glass", "concrete", "glass", "concrete", "concrete", "glass"
  ]
};

const structureDimensions = {
  tent: [190, 112],
  tower: [145, 235],
  bunker: [270, 115],
  hangar: [310, 155],
  garage: [260, 140],
  warehouse: [285, 165],
  dome: [240, 145],
  pod: [190, 150],
  kiosk: [165, 110],
  chapel: [200, 205],
  barn: [255, 170],
  stable: [270, 140],
  mill: [220, 190],
  cabin: [210, 155],
  lodge: [250, 175],
  shed: [185, 130],
  storefront: [235, 170],
  apartment: [220, 245],
  clinic: [245, 170],
  workshop: [245, 165],
  module: [265, 150],
  airlock: [205, 145],
  highrise: [215, 275],
  office: [235, 185],
  lobby: [275, 180],
  cinema: [285, 190],
  arcade: [245, 170],
  service: [205, 145],
  barracks: [285, 155],
  depot: [270, 150],
  annex: [255, 180],
  archive: [230, 170],
  studio: [250, 185]
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

const interiorFurnitureByStructure = {
  hangar: ["crate", "locker", "barrel", "workbench", "crate", "rack", "radio", "bench", "toolbox", "barrel", "locker", "crate"],
  office: ["desk", "chair", "cabinet", "plant", "desk", "chair", "bookshelf", "monitor", "bench", "plant", "cabinet", "table"],
  workshop: ["workbench", "toolbox", "rack", "crate", "workbench", "chair", "locker", "barrel", "shelf", "radio", "crate", "bench"],
  shed: ["shelf", "toolbox", "crate", "barrel", "workbench", "rack", "crate", "bench", "cabinet", "crate", "shelf", "barrel"],
  garage: ["workbench", "toolbox", "locker", "barrel", "rack", "crate", "workbench", "bench", "radio", "barrel", "cabinet", "crate"],
  tower: ["radio", "chair", "locker", "console", "bench", "crate", "cabinet", "table", "radio", "chair", "shelf", "crate"],
  warehouse: ["rack", "crate", "crate", "forklift", "rack", "barrel", "locker", "crate", "workbench", "crate", "rack", "barrel"],
  bunker: ["locker", "ammoRack", "radio", "crate", "cot", "locker", "table", "bench", "ammoRack", "barrel", "cabinet", "crate"],
  cabin: ["table", "chair", "cot", "bookshelf", "stove", "chair", "cabinet", "bench", "crate", "table", "shelf", "barrel"],
  lodge: ["table", "chair", "bed", "bookshelf", "stove", "chair", "cabinet", "bench", "plant", "table", "shelf", "crate"],
  tent: ["cot", "crate", "radio", "table", "cot", "locker", "medical", "bench", "crate", "chair", "cabinet", "water"],
  barn: ["crate", "barrel", "workbench", "rack", "crate", "bench", "shelf", "barrel", "feedBin", "crate", "toolbox", "rack"],
  storefront: ["checkout", "shelf", "shelf", "display", "counter", "chair", "cabinet", "display", "shelf", "plant", "checkout", "shelf"],
  apartment: ["table", "chair", "bed", "cabinet", "sofa", "chair", "bookshelf", "plant", "desk", "chair", "shelf", "table"],
  kiosk: ["checkout", "shelf", "display", "counter", "chair", "cabinet", "shelf", "display", "checkout", "shelf", "crate", "chair"],
  clinic: ["medical", "cabinet", "desk", "chair", "shelf", "medical", "bed", "bench", "plant", "desk", "locker", "table"],
  module: ["console", "locker", "pod", "crate", "monitor", "bench", "locker", "console", "pod", "chair", "cabinet", "server"],
  pod: ["medical", "console", "pod", "locker", "monitor", "bench", "cabinet", "console", "pod", "chair", "server", "table"],
  airlock: ["locker", "locker", "console", "crate", "suitRack", "bench", "suitRack", "console", "crate", "chair", "cabinet", "server"],
  dome: ["console", "plant", "monitor", "pod", "hydroponics", "bench", "hydroponics", "console", "plant", "chair", "server", "table"],
  barracks: ["cot", "locker", "cot", "locker", "table", "crate", "cot", "bench", "radio", "ammoRack", "cabinet", "crate"],
  depot: ["rack", "crate", "barrel", "crate", "rack", "locker", "workbench", "bench", "radio", "barrel", "cabinet", "crate"],
  house: ["table", "chair", "bed", "bookshelf", "stove", "bench", "cabinet", "barrel", "table", "chair", "crate", "shelf"],
  chapel: ["pew", "pew", "pew", "pew", "table", "bench", "bookshelf", "cabinet", "pew", "pew", "chair", "table"],
  tavern: ["table", "chair", "counter", "barrel", "table", "chair", "cabinet", "bench", "barrel", "table", "chair", "shelf"],
  school: ["desk", "chair", "bookshelf", "desk", "chair", "cabinet", "bench", "table", "bookshelf", "desk", "chair", "shelf"],
  stable: ["feedBin", "barrel", "rack", "bench", "crate", "feedBin", "shelf", "barrel", "workbench", "crate", "toolbox", "rack"],
  mill: ["grainSack", "barrel", "workbench", "gearbox", "grainSack", "bench", "shelf", "barrel", "gearbox", "crate", "toolbox", "rack"],
  arcade: ["arcade", "arcade", "arcade", "bench", "arcade", "chair", "counter", "arcade", "arcade", "bench", "checkout", "arcade"],
  cinema: ["cinemaSeat", "cinemaSeat", "cinemaSeat", "cinemaSeat", "counter", "bench", "cinemaSeat", "cinemaSeat", "display", "cinemaSeat", "cinemaSeat", "cabinet"],
  service: ["workbench", "locker", "cabinet", "toolbox", "shelf", "chair", "radio", "bench", "crate", "barrel", "cabinet", "table"],
  lobby: ["desk", "chair", "sofa", "plant", "sofa", "chair", "display", "bench", "plant", "table", "cabinet", "monitor"],
  highrise: ["desk", "chair", "cabinet", "plant", "desk", "chair", "monitor", "sofa", "desk", "plant", "server", "table"],
  studio: ["desk", "chair", "monitor", "camera", "console", "chair", "cabinet", "bench", "lightStand", "monitor", "locker", "table"],
  archive: ["rack", "fileCabinet", "rack", "fileCabinet", "desk", "chair", "bookshelf", "bench", "rack", "fileCabinet", "locker", "table"],
  annex: ["desk", "chair", "cabinet", "plant", "table", "chair", "bookshelf", "monitor", "bench", "plant", "locker", "table"]
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
const DASH_DISTANCE = 155;
const DASH_STAMINA_COST = 12;
const DASH_COOLDOWN = 2.1;
const GUARD_EXHAUSTION_RATE = 8;
const MELEE_RANGE = 135;
const MELEE_DAMAGE = 16;
const MELEE_COOLDOWN = .48;
const TEAM_COLORS = {
  Blue: "#2f82b7",
  Red: "#9c3d43",
  Yellow: "#c49a35",
  Green: "#43865a"
};

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
  dashCooldown: 0,
  dashFlash: 0,
  meleeCooldown: 0,
  meleeSwing: 0,
  guardFlash: 0,
  comboHits: 0,
  comboTimer: 0,
  playerTeam: "Blue",
  playerRespawnTimer: 0,
  player: { x: 0, y: 0, angle: 0, pitch: 0, health: 150, stamina: 150, exhausted: false, z: 0, vz: 0, reload: 0, shootCd: 0, trapped: 0, guarding: false, alive: true, team: "Blue" },
  weaponRank: 1,
  armorRank: 1,
  ammo: 1,
  enemies: [],
  beds: [],
  traps: [],
  props: [],
  tracers: [],
  particles: [],
  bulletMarks: [],
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
  if (state.mode.includes("4v4")) return 7;
  if (state.mode.includes("6v6")) return 11;
  if (state.mode.includes("8")) return 7;
  if (state.mode.includes("Bedwars")) return 11;
  return 5;
}

function isRivalDuel() {
  return state.mode.includes("Rival Duel");
}

function isFightMode() {
  return isRivalDuel() || state.mode.includes("1v1");
}

function isTeamBattle() {
  return state.mode.includes("Team battle");
}

function isFreeForAll() {
  return state.mode.includes("Free for all");
}

function isBedwars() {
  return state.mode.includes("Bedwars");
}

function usesTeams() {
  return isTeamBattle() || isBedwars();
}

function teamForEnemyIndex(index) {
  if (state.mode.includes("4v4")) return index < 3 ? "Blue" : "Red";
  if (state.mode.includes("6v6")) return index < 5 ? "Blue" : "Red";
  if (isBedwars()) {
    if (index < 2) return "Blue";
    if (index < 5) return "Red";
    if (index < 8) return "Yellow";
    return "Green";
  }
  if (isFreeForAll()) return `Solo ${index + 1}`;
  return "Red";
}

function playerIsPresent() {
  return state.player.alive !== false && state.playerRespawnTimer <= 0;
}

function enemyIsOpponent(enemy) {
  return !usesTeams() || enemy.team !== state.playerTeam;
}

function areCombatantsHostile(first, second) {
  if (!usesTeams()) return first !== second;
  const firstTeam = first === state.player ? state.playerTeam : first.team;
  const secondTeam = second === state.player ? state.playerTeam : second.team;
  return firstTeam !== secondTeam;
}

function aliveOpponents() {
  return state.enemies.filter(enemy => enemy.alive && enemyIsOpponent(enemy));
}

function aliveAllies() {
  return state.enemies.filter(enemy => enemy.alive && !enemyIsOpponent(enemy));
}

function teamBed(team) {
  return state.beds.find(bed => bed.team === team) || null;
}

function basePositionForTeam(team, size) {
  const bases = {
    Blue: { x: -size * .34, y: 0, angle: 0 },
    Red: { x: size * .34, y: 0, angle: Math.PI },
    Yellow: { x: 0, y: -size * .34, angle: Math.PI / 2 },
    Green: { x: 0, y: size * .34, angle: -Math.PI / 2 }
  };
  return bases[team] || { x: 0, y: 0, angle: 0 };
}

function createBedwarsBeds(size) {
  return ["Blue", "Red", "Yellow", "Green"].map(team => {
    const base = basePositionForTeam(team, size);
    return {
      id: `bed-${team.toLowerCase()}`,
      kind: "bed",
      team,
      x: base.x,
      y: base.y,
      health: 120,
      maxHealth: 120,
      alive: true,
      radius: 68
    };
  });
}

function arenaSize() {
  if (isRivalDuel()) return 3200;
  if (state.mode.includes("1v1")) return 3000;
  if (state.mode.includes("8") || state.mode.includes("6v6") || state.mode.includes("Bedwars")) return 6800;
  if (state.mode.includes("4v4")) return 5400;
  return 4800;
}

function mapBuildings() {
  const style = buildingThemes[state.map.name] || buildingThemes.Forest;
  const names = buildingNames[state.map.name] || buildingNames.Forest;
  const structureTypes = structureTypesByMap[state.map.name] || structureTypesByMap.Forest;
  const materials = structureMaterialsByMap[state.map.name] || structureMaterialsByMap.Forest;
  const size = arenaSize();
  const positions = [
    [-size * .29, size * .28],
    [size * .29, size * .28],
    [-size * .29, -size * .28],
    [size * .29, -size * .28],
    [-size * .42, 0],
    [size * .42, 0],
    [0, size * .42],
    [0, -size * .42],
    [-size * .25, size * .105],
    [size * .25, size * .105],
    [-size * .25, -size * .105],
    [size * .25, -size * .105],
    [-size * .105, size * .25],
    [size * .105, size * .25],
    [-size * .105, -size * .25],
    [size * .105, -size * .25]
  ];
  const buildingScales = [
    1.08, .96, 1.03, .93, .91, .91, .95, .95,
    .88, .92, .86, .9, .84, .84, .87, .87
  ];
  return positions.map(([x, y], index) => {
    const baseName = names[index % names.length];
    const structureType = structureTypes[index % structureTypes.length];
    const material = materials[index % materials.length];
    const dimensions = structureDimensions[structureType] || [220, 155];
    const width = Math.round(dimensions[0] * buildingScales[index]);
    const height = Math.round(dimensions[1] * buildingScales[index]);
    return {
      ...style,
      id: `${state.map.name}-${index}`,
      index,
      scene: (backgroundThemes[state.map.name] || backgroundThemes.Forest).scene,
      structureType,
      material,
      name: baseName,
      x,
      y,
      width,
      height,
      interactionRadius: Math.max(108, Math.round(width * .54)),
      autoEnterRadius: 54
    };
  });
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
  const types = interiorFurnitureByStructure[building.structureType]
    || interiorFurnitureTypes[building.scene]
    || interiorFurnitureTypes.forest;
  const positions = [
    [-166, -78], [166, -72], [-154, -8], [154, -4],
    [-148, 48], [148, 52], [-160, 132], [160, 136],
    [-145, 184], [-52, 178], [52, 178], [145, 184]
  ];
  const sizeByType = {
    shelf: [29, 105], locker: [27, 98], cabinet: [30, 86], console: [34, 68],
    desk: [42, 54], counter: [44, 64], table: [39, 50], chair: [21, 44],
    bed: [46, 38], pod: [42, 72], bench: [37, 36], plant: [24, 68],
    crate: [29, 53], barrel: [23, 55], radio: [28, 74],
    workbench: [46, 58], toolbox: [25, 38], rack: [32, 112], forklift: [48, 72],
    ammoRack: [31, 104], cot: [46, 38], bookshelf: [30, 106], stove: [31, 72],
    medical: [48, 48], water: [24, 58], checkout: [45, 64], display: [32, 86],
    sofa: [50, 48], monitor: [34, 68], server: [31, 108], suitRack: [33, 110],
    hydroponics: [39, 82], feedBin: [42, 48], pew: [48, 42], grainSack: [28, 46],
    gearbox: [35, 74], arcade: [36, 98], cinemaSeat: [27, 49],
    camera: [28, 94], lightStand: [24, 108], fileCabinet: [31, 96]
  };
  const visualType = {
    workbench: "table", toolbox: "crate", rack: "shelf", forklift: "forklift",
    ammoRack: "shelf", cot: "bed", bookshelf: "shelf", stove: "stove",
    medical: "bed", water: "barrel", checkout: "counter", display: "shelf",
    sofa: "bench", monitor: "console", server: "server", suitRack: "locker",
    hydroponics: "plant", feedBin: "counter", pew: "bench", grainSack: "grainSack",
    gearbox: "gearbox", arcade: "arcade", cinemaSeat: "chair",
    camera: "camera", lightStand: "lightStand", fileCabinet: "cabinet"
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
      type: visualType[type] || type,
      detailType: type,
      tint: index % 3 === 0 ? building.accent : index % 2 ? building.trim : building.exterior
    };
  });
}

function interiorWallSegments(building = activeBuilding()) {
  const roomKind = interiorKindFor(building);
  const dividerY = 88;
  const doorwayHalfWidth = roomKind === "industrial" ? 64 : roomKind === "space" ? 58 : 52;
  const outerEdge = INTERIOR_BOUNDS.maxX - 12;
  const segmentWidth = outerEdge - doorwayHalfWidth;
  const wallHeight = roomKind === "industrial" ? 142 : 132;
  return [
    {
      id: `${building.id}-partition-left`,
      x: -(doorwayHalfWidth + segmentWidth / 2),
      y: dividerY,
      width: segmentWidth,
      depth: 18,
      height: wallHeight,
      side: "left",
      solid: true,
      roomKind
    },
    {
      id: `${building.id}-partition-right`,
      x: doorwayHalfWidth + segmentWidth / 2,
      y: dividerY,
      width: segmentWidth,
      depth: 18,
      height: wallHeight,
      side: "right",
      solid: true,
      roomKind
    },
    {
      id: `${building.id}-partition-header`,
      x: 0,
      y: dividerY,
      width: doorwayHalfWidth * 2,
      depth: 18,
      height: 28,
      baseLift: wallHeight - 28,
      side: "header",
      solid: false,
      roomKind
    }
  ];
}

function resolveInteriorWallCollision(currentX, currentY, nextX, nextY, wall, entityRadius) {
  const minX = wall.x - wall.width / 2 - entityRadius;
  const maxX = wall.x + wall.width / 2 + entityRadius;
  const minY = wall.y - wall.depth / 2 - entityRadius;
  const maxY = wall.y + wall.depth / 2 + entityRadius;
  if (nextX <= minX || nextX >= maxX || nextY <= minY || nextY >= maxY) {
    return { x: nextX, y: nextY };
  }

  if (currentY <= minY) return { x: nextX, y: minY };
  if (currentY >= maxY) return { x: nextX, y: maxY };
  if (currentX <= minX) return { x: minX, y: nextY };
  if (currentX >= maxX) return { x: maxX, y: nextY };

  const edges = [
    { gap: Math.abs(nextX - minX), x: minX, y: nextY },
    { gap: Math.abs(maxX - nextX), x: maxX, y: nextY },
    { gap: Math.abs(nextY - minY), x: nextX, y: minY },
    { gap: Math.abs(maxY - nextY), x: nextX, y: maxY }
  ];
  return edges.reduce((nearest, edge) => edge.gap < nearest.gap ? edge : nearest, edges[0]);
}

function resolveInteriorPosition(currentX, currentY, nextX, nextY, entityRadius = 18) {
  let x = clamp(nextX, INTERIOR_BOUNDS.minX + 24, INTERIOR_BOUNDS.maxX - 24);
  let y = clamp(nextY, INTERIOR_BOUNDS.minY + 8, INTERIOR_BOUNDS.maxY - 24);
  for (const wall of interiorWallSegments().filter(segment => segment.solid)) {
    const resolved = resolveInteriorWallCollision(currentX, currentY, x, y, wall, entityRadius);
    x = resolved.x;
    y = resolved.y;
  }
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
  for (const wall of interiorWallSegments().filter(segment => segment.solid)) {
    const resolved = resolveInteriorWallCollision(currentX, currentY, x, y, wall, entityRadius);
    x = resolved.x;
    y = resolved.y;
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
  if (!state.running || !playerIsPresent() || state.insideBuilding || state.buildingCooldown > 0 || !nearExteriorEntrance()) return false;
  const building = activeBuilding();
  const p = state.player;
  for (const enemy of state.enemies) {
    if (!enemy.buildingExitPending || !enemy.buildingExitPoint) continue;
    enemy.x = enemy.buildingExitPoint.x;
    enemy.y = enemy.buildingExitPoint.y;
    enemy.angle = enemy.buildingExitPoint.angle;
    enemy.buildingExitPending = false;
    enemy.buildingExitTimer = 0;
    enemy.buildingExitPoint = null;
  }
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
  livingEnemies.forEach((enemy, index) => {
    const approachDistance = Math.max(0, dist(enemy, building) - building.interactionRadius);
    enemy.buildingEntryPending = true;
    enemy.buildingEntryTimer = clamp(approachDistance / Math.max(70, enemy.speed), 1.25, 8.5) + index * .55;
    enemy.buildingDoorOffset = ((index % 3) - 1) * 28;
    enemy.buildingEntered = false;
    enemy.buildingExitPending = false;
    enemy.buildingExitTimer = 0;
    enemy.buildingExitPoint = null;
    enemy.shootCd = Math.max(enemy.shootCd, 1);
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

  let emergingEnemyIndex = 0;
  for (const enemy of state.enemies) {
    const enemyReturn = saved?.enemies.find(item => item.id === enemy.id);
    if (!enemyReturn) continue;
    if (enemy.buildingEntered && enemy.alive) {
      const sideOffset = ((emergingEnemyIndex % 3) - 1) * 34;
      const lateralX = -awayY / awayLength;
      const lateralY = awayX / awayLength;
      enemy.buildingExitPending = true;
      enemy.buildingExitTimer = .7 + emergingEnemyIndex * .45;
      enemy.buildingExitPoint = {
        x: clamp(
          building.x + awayX / awayLength * (building.interactionRadius + 30) + lateralX * sideOffset,
          -size / 2 + 36,
          size / 2 - 36
        ),
        y: clamp(
          building.y + awayY / awayLength * (building.interactionRadius + 30) + lateralY * sideOffset,
          -size / 2 + 36,
          size / 2 - 36
        ),
        angle: Math.atan2(awayY, awayX)
      };
      emergingEnemyIndex += 1;
    } else {
      enemy.x = enemyReturn.x;
      enemy.y = enemyReturn.y;
      enemy.angle = enemyReturn.angle;
      enemy.buildingExitPending = false;
      enemy.buildingExitTimer = 0;
      enemy.buildingExitPoint = null;
    }
    enemy.buildingEntryPending = false;
    enemy.buildingEntryTimer = 0;
    enemy.buildingEntered = false;
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

  const buildings = mapBuildings();
  const propCount = clamp(Math.round(size / 45), 56, 125);
  for (let i = 0; i < propCount; i++) {
    let p = randomPoint(size);
    for (let attempt = 0; attempt < 12; attempt++) {
      const clearOfBuildings = buildings.every(building => (
        dist(p, building) > building.width * .65 + 70
      ));
      if (clearOfBuildings) break;
      p = randomPoint(size);
    }
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

function createTrap(point, type, depth = 0, seed = Math.random() * 1000) {
  const radii = { mine: 32, snare: 31, hole: 38, pitfall: 46 };
  return {
    ...point,
    type,
    radius: radii[type] || 34,
    depth,
    seed,
    active: true
  };
}

function generateTraps(size) {
  state.traps = [];
  if (isRivalDuel()) {
    const mirroredLayout = [
      [-.08, .15, "mine"],
      [.11, .2, "snare"],
      [-.16, .06, "hole"],
      [.02, .27, "pitfall"],
      [.18, .13, "mine"],
      [-.13, .24, "snare"]
    ];
    for (const [xRatio, yRatio, type] of mirroredLayout) {
      const depth = type === "hole"
        ? Math.floor(rand(5, 12))
        : type === "pitfall"
          ? Math.floor(rand(7, 14))
          : 0;
      const seed = Math.random() * 1000;
      const point = { x: size * xRatio, y: size * yRatio };
      state.traps.push(createTrap(point, type, depth, seed));
      state.traps.push(createTrap({ x: -point.x, y: -point.y }, type, depth, seed));
    }
    return;
  }

  const buildings = mapBuildings();
  const density = clamp(Math.round(size / 950), 4, 8);
  const trapPoint = () => {
    let point = randomPoint(size);
    for (let attempt = 0; attempt < 18; attempt++) {
      const clearOfBuildings = buildings.every(building => (
        dist(point, building) > building.width * .62 + 80
      ));
      if (clearOfBuildings) return point;
      point = randomPoint(size);
    }
    return point;
  };
  const addTraps = (type, count, depthRange = null) => {
    for (let index = 0; index < count; index++) {
      const depth = depthRange ? Math.floor(rand(depthRange[0], depthRange[1])) : 0;
      state.traps.push(createTrap(trapPoint(), type, depth));
    }
  };
  addTraps("mine", density * 3);
  addTraps("snare", density * 3);
  addTraps("hole", density * 4, [2, 16]);
  addTraps("pitfall", density * 2, [6, 16]);
}

function spawnEnemies(size) {
  const names = ["Ridge", "Bolt", "Echo", "Mako", "Vex", "Shade", "Pixel", "Drift", "Nova", "Jett", "Orbit"];
  const botDifficulty = difficulty();
  state.enemies = [];
  for (let i = 0; i < modeEnemyCount(); i++) {
    const team = teamForEnemyIndex(i);
    const teamBase = basePositionForTeam(team, size);
    const p = usesTeams()
      ? {
          x: teamBase.x + rand(-150, 150),
          y: teamBase.y + rand(-210, 210)
        }
      : randomPoint(size);
    const rank = isRivalDuel()
      ? state.weaponRank
      : clamp(Math.floor(state.level / 2) + 1 + Math.floor(rand(0, 4)), 1, weapons.length);
    const health = isRivalDuel()
      ? (state.armorRank >= 16 ? 190 : 150)
      : 46 + state.level * 4 + rand(0, 22);
    state.enemies.push({
      id: names[i],
      ...p,
      team,
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
      guardTimer: 0,
      targetCd: rand(0, .8),
      targetId: null,
      supplyCd: 0,
      supplies: { water: 1, apple: 1, sandwich: 1 },
      alive: true,
      trapped: 0,
      buildingEntryPending: false,
      buildingEntryTimer: 0,
      buildingEntered: false,
      buildingExitPending: false,
      buildingExitTimer: 0,
      buildingExitPoint: null,
      spawnX: p.x,
      spawnY: p.y,
      respawnTimer: 0
    });
  }
}

function resetCombatants(regenerateArena = true) {
  const size = arenaSize();
  state.insideBuilding = false;
  state.currentBuildingId = null;
  state.buildingReturn = null;
  state.buildingCooldown = 0;
  state.dashCooldown = 0;
  state.dashFlash = 0;
  state.meleeCooldown = 0;
  state.meleeSwing = 0;
  state.guardFlash = 0;
  state.comboHits = 0;
  state.comboTimer = 0;
  state.playerRespawnTimer = 0;
  state.player = { x: 0, y: 0, angle: 0, pitch: 0, health: 150, stamina: 150, exhausted: false, z: 0, vz: 0, reload: 0, shootCd: 0, trapped: 0, guarding: false, alive: true, team: state.playerTeam };
  state.inventory = createStarterInventory();
  if (state.armorRank >= 16) state.player.health = 190;
  state.ammo = weapon().magazine;
  state.tracers = [];
  state.particles = [];
  if (regenerateArena) state.bulletMarks = [];
  state.casings = [];
  state.floatText = [];
  state.hitMarker = 0;
  state.shake = 0;
  state.recoil = 0;
  state.muzzleFlash = 0;
  state.damageArc = { life: 0, angle: 0 };
  if (regenerateArena) generateProps(size);
  if (isRivalDuel()) {
    generateTraps(size);
  } else if (regenerateArena) {
    generateTraps(size);
  }
  state.beds = isBedwars() ? createBedwarsBeds(size) : [];
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
  } else if (state.mode.includes("1v1")) {
    state.player.x = -size * .28;
    state.player.y = 0;
    state.player.angle = 0;
    const opponent = state.enemies[0];
    opponent.x = size * .28;
    opponent.y = 0;
    opponent.spawnX = opponent.x;
    opponent.spawnY = opponent.y;
    opponent.angle = Math.PI;
    opponent.targetId = "player";
  } else if (usesTeams()) {
    const playerBase = basePositionForTeam(state.playerTeam, size);
    state.player.x = playerBase.x + 90;
    state.player.y = playerBase.y;
    state.player.angle = playerBase.angle;
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

function startSingleFight() {
  resetCombatants(true);
  state.running = false;
  state.duelPhase = "singleCountdown";
  state.phaseTimer = 3.2;
  state.roundMessage = "";
  addChat(`You versus ${state.enemies[0].id}.`);
}

function modeObjectiveText() {
  if (isRivalDuel()) return "Win 5 rounds before your rival.";
  if (state.mode.includes("1v1")) return "Eliminate the rival before they eliminate you.";
  if (isTeamBattle()) return "Fight with the Blue team and eliminate the Red team.";
  if (isFreeForAll()) return "Be the last player standing.";
  if (isBedwars()) return "Protect the Blue bed, break the other beds, and eliminate every enemy team.";
  return "Eliminate every opponent.";
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
  } else if (state.mode.includes("1v1")) {
    startSingleFight();
    addChat(`${state.mode} started on ${state.map.name} at ${state.difficulty} difficulty.`);
  } else {
    state.duelPhase = "off";
    state.running = true;
    resetCombatants(true);
    addChat(`${state.mode} started on ${state.map.name} at ${state.difficulty} difficulty.`);
    addChat(modeObjectiveText());
  }
}

function finishDuelRound(playerWon, reason) {
  if (!isRivalDuel() || state.duelPhase !== "playing") return;
  state.running = false;
  state.player.guarding = false;
  state.duelPhase = "roundEnd";
  state.phaseTimer = 2.25;
  if (playerWon) state.playerRounds += 1;
  else state.rivalRounds += 1;
  state.roundMessage = playerWon ? "ROUND WON" : "ROUND LOST";
  addChat(`${state.roundMessage}. Score: ${state.playerRounds}-${state.rivalRounds}${reason ? ` (${reason})` : ""}.`);
}

function eliminateEnemy(enemy, message, playerKill = false) {
  if (!enemy.alive) return false;
  enemy.alive = false;
  enemy.targetId = null;
  enemy.targetCd = 0;
  state.lastNoKillCheck = state.time;
  if (playerKill) {
    state.kills += 1;
    state.diamonds += 2;
  }
  const bed = isBedwars() ? teamBed(enemy.team) : null;
  enemy.respawnTimer = bed?.alive ? 4 : 0;
  addChat(message);
  if (enemy.respawnTimer > 0) addChat(`${enemy.id} will respawn while the ${enemy.team} bed is standing.`);
  handleAllEnemiesDefeated(`${enemy.id} eliminated`);
  return true;
}

function respawnEnemy(enemy) {
  const size = arenaSize();
  const base = basePositionForTeam(enemy.team, size);
  enemy.x = enemy.spawnX ?? base.x;
  enemy.y = enemy.spawnY ?? base.y;
  enemy.angle = base.angle;
  enemy.health = enemy.maxHealth;
  enemy.stamina = 150;
  enemy.exhausted = false;
  enemy.trapped = 0;
  enemy.guardTimer = 0;
  enemy.alive = true;
  enemy.respawnTimer = 0;
  enemy.targetId = null;
  enemy.targetCd = 0;
  enemy.shootCd = 1;
  enemy.supplies = { water: 1, apple: 1, sandwich: 1 };
  addChat(`${enemy.id} respawned for the ${enemy.team} team.`);
}

function respawnPlayer() {
  const base = basePositionForTeam(state.playerTeam, arenaSize());
  const maximumHealth = state.armorRank >= 16 ? 190 : 150;
  state.player.x = base.x + 90;
  state.player.y = base.y;
  state.player.angle = base.angle;
  state.player.pitch = 0;
  state.player.z = 0;
  state.player.vz = 0;
  state.player.health = maximumHealth;
  state.player.stamina = 150;
  state.player.exhausted = false;
  state.player.trapped = 0;
  state.player.reload = 0;
  state.player.shootCd = 0;
  state.player.guarding = false;
  state.player.alive = true;
  state.playerRespawnTimer = 0;
  state.ammo = weapon().magazine;
  addChat("You respawned at the Blue bed.");
}

function updateBedwarsRespawns(dt) {
  if (!isBedwars()) return;
  if (!state.player.alive && state.playerRespawnTimer > 0) {
    if (teamBed(state.playerTeam)?.alive) {
      state.playerRespawnTimer = Math.max(0, state.playerRespawnTimer - dt);
      if (state.playerRespawnTimer <= 0) respawnPlayer();
    } else {
      state.playerRespawnTimer = 0;
      endMatch(false, "Your bed was destroyed, so you could not respawn.");
      return;
    }
  }
  if (state.insideBuilding) return;
  for (const enemy of state.enemies) {
    if (enemy.alive || enemy.respawnTimer <= 0) continue;
    if (!teamBed(enemy.team)?.alive) {
      enemy.respawnTimer = 0;
      continue;
    }
    enemy.respawnTimer = Math.max(0, enemy.respawnTimer - dt);
    if (enemy.respawnTimer <= 0) respawnEnemy(enemy);
  }
}

function damageBed(bed, amount, attacker) {
  if (!bed?.alive || !isBedwars()) return false;
  bed.health = clamp(bed.health - amount, 0, bed.maxHealth);
  spawnImpact(bed.x, bed.y, "#ffd166", 16);
  spawnFloatingText(bed.x, bed.y, `-${amount.toFixed(0)}`, "#ffd166", .8, 46);
  if (bed.health > 0) return false;
  bed.alive = false;
  for (const enemy of state.enemies) {
    if (enemy.team === bed.team && !enemy.alive) enemy.respawnTimer = 0;
  }
  addChat(`${attacker} destroyed the ${bed.team} bed. That team can no longer respawn.`);
  handleAllEnemiesDefeated(`${bed.team} bed destroyed`);
  return true;
}

function handlePlayerDefeat(reason) {
  state.player.guarding = false;
  if (isBedwars() && state.player.alive && teamBed(state.playerTeam)?.alive) {
    if (state.insideBuilding) {
      state.buildingCooldown = 0;
      exitBuilding(true);
    }
    state.player.alive = false;
    state.player.health = 0;
    state.playerRespawnTimer = 4;
    addChat(`${reason || "You were eliminated."} Respawning in 4 seconds.`);
    return;
  }
  if (isRivalDuel()) finishDuelRound(false, reason);
  else endMatch(false, reason);
}

function handleAllEnemiesDefeated(reason = "Rival eliminated") {
  if (isRivalDuel()) {
    if (state.enemies.every(enemy => !enemy.alive)) finishDuelRound(true, reason);
    return;
  }
  if (!state.running) return;
  if (isBedwars()) {
    const enemyTeams = ["Red", "Yellow", "Green"];
    const enemyTeamActive = enemyTeams.some(team => (
      teamBed(team)?.alive || state.enemies.some(enemy => enemy.team === team && enemy.alive)
    ));
    if (!enemyTeamActive) endMatch(true, reason);
    return;
  }
  if (isTeamBattle()) {
    if (aliveOpponents().length === 0) endMatch(true, reason);
    return;
  }
  if (state.enemies.every(enemy => !enemy.alive)) endMatch(true, reason);
}

function endMatch(won, reason) {
  state.running = false;
  state.player.guarding = false;
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
  if (!state.running || !playerIsPresent()) return;
  const attacker = state.enemies.find(enemy => enemy.id === source);
  const incomingAngle = attacker
    ? Math.atan2(attacker.y - state.player.y, attacker.x - state.player.x)
    : state.player.angle + Math.PI;
  const guarded = Boolean(
    attacker
    && state.player.guarding
    && Math.abs(angleDiff(incomingAngle, state.player.angle)) < 1.2
  );
  const reduced = amount * (1 - armor().protection) * (guarded ? .3 : 1);
  state.player.health = clamp(state.player.health - reduced, 0, 220);
  if (guarded) {
    state.player.stamina = clamp(state.player.stamina - Math.max(3, amount * .28), 0, 150);
    state.guardFlash = .2;
    spawnFloatingText(state.player.x, state.player.y, "BLOCK", "#74d7ff", .7, 62);
  } else {
    state.comboHits = 0;
    state.comboTimer = 0;
  }
  if (attacker) {
    state.damageArc = { life: .48, angle: incomingAngle };
  } else {
    state.damageArc = { life: .35, angle: state.player.angle + Math.PI };
  }
  state.shake = Math.max(state.shake, guarded ? .13 : .34);
  playImpactSound(true);
  const warningPoint = shotEndpoint(state.player, state.damageArc.angle, 170);
  spawnFloatingText(warningPoint.x + rand(-20, 20), warningPoint.y + rand(-20, 20), `-${reduced.toFixed(0)}`, "#ff6b6b", 1.15, 56);
  ui.hitFlash.classList.add("active");
  setTimeout(() => ui.hitFlash.classList.remove("active"), 130);
  if (source) {
    addChat(guarded
      ? `You guarded ${source}'s attack and took ${reduced.toFixed(0)} XP.`
      : `${source} hit you for ${reduced.toFixed(0)} XP.`);
  }
  if (state.player.health <= 0) handlePlayerDefeat(source ? `${source} eliminated you.` : "You were eliminated.");
}

function shotEndpoint(origin, angle, range) {
  return {
    x: origin.x + Math.cos(angle) * range,
    y: origin.y + Math.sin(angle) * range
  };
}

function impactAreaKey() {
  return state.insideBuilding
    ? `inside:${state.currentBuildingId || activeBuilding().id}`
    : `outside:${state.map.name}`;
}

function rayCircleDistance(origin, directionX, directionY, object, radius, maxDistance) {
  const offsetX = origin.x - object.x;
  const offsetY = origin.y - object.y;
  const inside = offsetX * offsetX + offsetY * offsetY < radius * radius;
  if (inside) return null;
  const along = offsetX * directionX + offsetY * directionY;
  const discriminant = along * along - (offsetX * offsetX + offsetY * offsetY - radius * radius);
  if (discriminant < 0) return null;
  const distance = -along - Math.sqrt(discriminant);
  return distance > 18 && distance <= maxDistance ? distance : null;
}

function rayRectDistance(origin, directionX, directionY, rectangle, maxDistance) {
  const halfWidth = rectangle.width / 2;
  const halfDepth = rectangle.depth / 2;
  const minX = rectangle.x - halfWidth;
  const maxX = rectangle.x + halfWidth;
  const minY = rectangle.y - halfDepth;
  const maxY = rectangle.y + halfDepth;

  const nearX = Math.abs(directionX) < .0001
    ? (origin.x >= minX && origin.x <= maxX ? -Infinity : Infinity)
    : Math.min((minX - origin.x) / directionX, (maxX - origin.x) / directionX);
  const farX = Math.abs(directionX) < .0001
    ? (origin.x >= minX && origin.x <= maxX ? Infinity : -Infinity)
    : Math.max((minX - origin.x) / directionX, (maxX - origin.x) / directionX);
  const nearY = Math.abs(directionY) < .0001
    ? (origin.y >= minY && origin.y <= maxY ? -Infinity : Infinity)
    : Math.min((minY - origin.y) / directionY, (maxY - origin.y) / directionY);
  const farY = Math.abs(directionY) < .0001
    ? (origin.y >= minY && origin.y <= maxY ? Infinity : -Infinity)
    : Math.max((minY - origin.y) / directionY, (maxY - origin.y) / directionY);

  const near = Math.max(nearX, nearY);
  const far = Math.min(farX, farY);
  if (far < Math.max(near, 0)) return null;
  const distance = near > 18 ? near : far > 18 ? far : null;
  return distance !== null && distance <= maxDistance ? distance : null;
}

function impactMaterialFor(object = null) {
  const type = object?.type || "";
  const name = object?.name || "";
  const structureType = object?.structureType || "";
  const structureMaterial = object?.material || "";
  const scene = object?.scene || (backgroundThemes[state.map.name] || backgroundThemes.Forest).scene;
  if (structureType === "tent" || structureMaterial === "canvas") return "fabric";
  if (["corrugated", "steel", "alloy", "panel"].includes(structureMaterial)) return "metal";
  if (structureMaterial === "timber") return "wood";
  if (["brick", "concrete", "stucco", "stone", "glass"].includes(structureMaterial)) return "concrete";
  if (["barrel", "locker", "console", "radio", "pod", "server", "arcade", "camera", "lightStand", "forklift", "antenna"].includes(type)
    || ["car", "forklift", "antenna"].includes(name)) return "metal";
  if (["crate", "shelf", "desk", "chair", "table", "bed", "bench", "cabinet", "counter", "grainSack"].includes(type)
    || ["tree", "log", "cart"].includes(name)) return "wood";
  if (["rock", "ruin", "well", "barrier", "pillar"].includes(name)) return "concrete";
  if (["space", "warehouse"].includes(scene)) return "metal";
  if (["forest", "village"].includes(scene)) return "wood";
  if (["desert"].includes(scene)) return "earth";
  return "concrete";
}

function traceSurfaceImpact(origin, angle, range, pitch = 0) {
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  const eyeHeight = 58 + (origin.z || 0);
  const pitchSlope = Math.tan(pitch || 0);
  const building = state.insideBuilding ? activeBuilding() : null;
  let distance = range;
  let surface = "ground";
  let height = 2;
  let material = impactMaterialFor();
  let surfaceColor = building?.floor || state.map.ground;

  if (pitchSlope > .035) {
    const groundDistance = eyeHeight / pitchSlope;
    if (groundDistance > 18 && groundDistance < distance) distance = groundDistance;
  }

  if (state.insideBuilding) {
    if (pitchSlope < -.035) {
      const ceilingDistance = (188 - eyeHeight) / -pitchSlope;
      if (ceilingDistance > 18 && ceilingDistance < distance) {
        distance = ceilingDistance;
        surface = "ceiling";
        height = 188;
        surfaceColor = building.ceiling;
      }
    }

    const distanceX = directionX > .001
      ? (INTERIOR_BOUNDS.maxX - origin.x) / directionX
      : directionX < -.001
        ? (INTERIOR_BOUNDS.minX - origin.x) / directionX
        : Infinity;
    const distanceY = directionY > .001
      ? (INTERIOR_BOUNDS.maxY - origin.y) / directionY
      : directionY < -.001
        ? (INTERIOR_BOUNDS.minY - origin.y) / directionY
        : Infinity;
    const wallDistance = Math.min(distanceX, distanceY);
    const wallHeight = eyeHeight - pitchSlope * wallDistance;
    if (wallDistance > 18 && wallDistance < distance && wallHeight >= 8 && wallHeight <= 188) {
      distance = wallDistance;
      surface = "wall";
      height = wallHeight;
      material = impactMaterialFor(building);
      surfaceColor = building.wall;
    }

    for (const partition of interiorWallSegments(building).filter(segment => segment.solid)) {
      const partitionDistance = rayRectDistance(
        origin,
        directionX,
        directionY,
        partition,
        distance
      );
      if (partitionDistance === null) continue;
      const partitionHeight = eyeHeight - pitchSlope * partitionDistance;
      if (partitionHeight < 7 || partitionHeight > partition.height) continue;
      distance = partitionDistance;
      surface = "wall";
      height = partitionHeight;
      material = impactMaterialFor(building);
      surfaceColor = building.wall;
    }
  }

  const obstacles = state.insideBuilding
    ? interiorProps()
    : [...state.props, ...mapBuildings()];
  for (const object of obstacles) {
    const radius = object.radius || object.width * .42 || 34;
    const objectDistance = rayCircleDistance(origin, directionX, directionY, object, radius, distance);
    if (objectDistance === null) continue;
    const objectHeight = object.height || 90;
    const impactHeight = eyeHeight - pitchSlope * objectDistance;
    if (impactHeight < 7 || impactHeight > objectHeight) continue;
    distance = objectDistance;
    surface = "object";
    height = impactHeight;
    material = impactMaterialFor(object);
    surfaceColor = object.tint || object.exterior || object.wall || surfaceColor;
  }

  return {
    x: origin.x + directionX * Math.max(18, distance - (surface === "ground" ? 0 : 2)),
    y: origin.y + directionY * Math.max(18, distance - (surface === "ground" ? 0 : 2)),
    distance,
    height,
    surface,
    material,
    surfaceColor,
    angle
  };
}

function mixHexColors(base, overlay, amount) {
  const parse = color => {
    const match = /^#([0-9a-f]{6})$/i.exec(color || "");
    if (!match) return null;
    return [
      Number.parseInt(match[1].slice(0, 2), 16),
      Number.parseInt(match[1].slice(2, 4), 16),
      Number.parseInt(match[1].slice(4, 6), 16)
    ];
  };
  const from = parse(base);
  const to = parse(overlay);
  if (!from || !to) return overlay;
  const channel = index => Math.round(from[index] + (to[index] - from[index]) * amount)
    .toString(16)
    .padStart(2, "0");
  return `#${channel(0)}${channel(1)}${channel(2)}`;
}

function colorWithAlpha(color, alpha) {
  const match = /^#([0-9a-f]{6})$/i.exec(color || "");
  if (!match) return color;
  const value = match[1];
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function spawnSurfaceImpact(impact, incoming = false) {
  const palettes = {
    metal: { particle: "#ffc85d", smoke: "#8b959d", rim: "#aeb8bf" },
    wood: { particle: "#d4a065", smoke: "#8d735e", rim: "#b88958" },
    concrete: { particle: "#c4c2b8", smoke: "#92918b", rim: "#aaa89f" },
    earth: { particle: "#ba8756", smoke: "#8a684c", rim: "#9d714c" },
    fabric: { particle: "#d7c59b", smoke: "#8f897a", rim: "#b8aa87" }
  };
  const palette = palettes[impact.material] || palettes.concrete;
  const surfaceColor = impact.surfaceColor || state.map.wall;
  const life = rand(28, 42);
  state.bulletMarks.push({
    ...impact,
    area: impactAreaKey(),
    size: rand(incoming ? 4.2 : 4.8, incoming ? 6.2 : 7.2),
    seed: Math.random() * 1000,
    rim: mixHexColors(surfaceColor, palette.rim, impact.material === "metal" ? .34 : .2),
    soot: mixHexColors(surfaceColor, "#050708", .72),
    life,
    maxLife: life
  });
  if (state.bulletMarks.length > 84) state.bulletMarks.splice(0, state.bulletMarks.length - 84);
  spawnImpact(
    impact.x,
    impact.y,
    palette.particle,
    impact.material === "metal" ? 13 : 9,
    impact.height,
    impact.material,
    palette.smoke,
    true
  );
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

function spawnImpact(
  x,
  y,
  color = "#ffd166",
  count = 13,
  height = 18,
  material = "metal",
  smokeColor = "#9da5ae",
  surfaceEffect = false
) {
  const effectArea = surfaceEffect ? impactAreaKey() : null;
  const sparkCount = material === "metal" ? count : Math.max(4, Math.ceil(count * .55));
  for (let i = 0; i < sparkCount; i++) {
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
      kind: material === "metal" ? "spark" : "debris",
      height,
      surfaceEffect,
      area: effectArea
    });
  }
  state.particles.push({
    x, y, vx: 0, vy: 0, size: 16, color,
    life: .22, maxLife: .22, drag: 1, kind: "ring", height,
    surfaceEffect, area: effectArea
  });
  for (let i = 0; i < (material === "metal" ? 4 : 7); i++) {
    state.particles.push({
      x: x + rand(-8, 8),
      y: y + rand(-8, 8),
      vx: rand(-18, 18),
      vy: rand(-18, 18),
      size: rand(material === "metal" ? 7 : 9, material === "metal" ? 13 : 18),
      color: smokeColor,
      life: rand(.38, .7),
      maxLife: .7,
      drag: .96,
      kind: "smoke",
      height,
      surfaceEffect,
      area: effectArea
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
  if (!item || item.count <= 0 || !state.running || !playerIsPresent()) return;
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

function registerComboHit() {
  state.comboHits = state.comboTimer > 0 ? state.comboHits + 1 : 1;
  state.comboTimer = 1.35;
}

function botIsGuardingAgainst(enemy, attacker) {
  if (enemy.guardTimer <= 0) return false;
  const incomingAngle = Math.atan2(attacker.y - enemy.y, attacker.x - enemy.x);
  return Math.abs(angleDiff(incomingAngle, enemy.angle)) < 1.25;
}

function resolveCombatPosition(entity, nextX, nextY, radius) {
  if (state.insideBuilding) {
    return resolveInteriorPosition(entity.x, entity.y, nextX, nextY, radius);
  }
  const size = arenaSize();
  return {
    x: clamp(nextX, -size / 2 + radius + 16, size / 2 - radius - 16),
    y: clamp(nextY, -size / 2 + radius + 16, size / 2 - radius - 16)
  };
}

function playerDash() {
  const p = state.player;
  if (!state.running || !playerIsPresent() || p.exhausted || p.trapped > 0 || p.guarding || keys.has("c")) return false;
  if (state.dashCooldown > 0 || p.stamina < DASH_STAMINA_COST) return false;

  const forward = keys.has("w") || keys.has("arrowup") ? 1 : 0;
  const back = keys.has("s") || keys.has("arrowdown") ? 1 : 0;
  const left = keys.has("a") || keys.has("arrowleft") ? 1 : 0;
  const right = keys.has("d") || keys.has("arrowright") ? 1 : 0;
  let directionX = Math.cos(p.angle) * (forward - back)
    + Math.cos(p.angle + Math.PI / 2) * (right - left);
  let directionY = Math.sin(p.angle) * (forward - back)
    + Math.sin(p.angle + Math.PI / 2) * (right - left);
  const directionLength = Math.hypot(directionX, directionY);
  if (directionLength < .1) {
    directionX = Math.cos(p.angle);
    directionY = Math.sin(p.angle);
  } else {
    directionX /= directionLength;
    directionY /= directionLength;
  }

  const origin = { x: p.x, y: p.y };
  const resolved = resolveCombatPosition(
    p,
    p.x + directionX * DASH_DISTANCE,
    p.y + directionY * DASH_DISTANCE,
    18
  );
  p.x = resolved.x;
  p.y = resolved.y;
  p.stamina = clamp(p.stamina - DASH_STAMINA_COST, 0, 150);
  state.dashCooldown = DASH_COOLDOWN;
  state.dashFlash = .24;
  state.shake = Math.max(state.shake, .12);
  spawnFloatingText(origin.x, origin.y, "DASH", "#74d7ff", .42, 34);
  return true;
}

function findMeleeTarget() {
  const p = state.player;
  let best = null;
  let bestDistance = Infinity;
  for (const enemy of state.enemies) {
    if (!enemyIsPresent(enemy) || !enemyIsOpponent(enemy)) continue;
    const distance = dist(p, enemy);
    if (distance > MELEE_RANGE || distance >= bestDistance) continue;
    const angle = Math.atan2(enemy.y - p.y, enemy.x - p.x);
    if (Math.abs(angleDiff(angle, p.angle)) > .72) continue;
    best = enemy;
    bestDistance = distance;
  }
  if (isBedwars() && !state.insideBuilding) {
    for (const bed of state.beds) {
      if (!bed.alive || bed.team === state.playerTeam) continue;
      const distance = dist(p, bed);
      if (distance > MELEE_RANGE || distance >= bestDistance) continue;
      const angle = Math.atan2(bed.y - p.y, bed.x - p.x);
      if (Math.abs(angleDiff(angle, p.angle)) > .8) continue;
      best = bed;
      bestDistance = distance;
    }
  }
  return best;
}

function meleeAttack() {
  const p = state.player;
  if (!state.running || !playerIsPresent() || p.guarding || keys.has("c") || state.meleeCooldown > 0) return false;
  state.meleeCooldown = MELEE_COOLDOWN;
  state.meleeSwing = .3;
  p.shootCd = Math.max(p.shootCd, .2);
  state.shake = Math.max(state.shake, .1);
  const target = findMeleeTarget();
  if (!target) return true;

  if (target.kind === "bed") {
    damageBed(target, MELEE_DAMAGE * .8, "You");
    spawnFloatingText(target.x, target.y, "BASH", "#ffd166", .65, 48);
    return true;
  }

  const enemyArmor = armors[target.armor - 1] || armors[0];
  const guarded = botIsGuardingAgainst(target, p);
  const damage = MELEE_DAMAGE
    * (1 - enemyArmor.protection * .35)
    * (guarded ? .28 : 1);
  target.health -= damage;
  if (!guarded) registerComboHit();
  state.hitMarker = .22;
  spawnImpact(target.x, target.y, guarded ? "#74d7ff" : "#ffd27a", guarded ? 7 : 18);
  spawnFloatingText(
    target.x,
    target.y,
    guarded ? "BLOCK" : damage.toFixed(0),
    guarded ? "#74d7ff" : "#ffe37a",
    .75,
    56
  );
  if (!guarded) {
    const knockback = resolveCombatPosition(
      target,
      target.x + Math.cos(p.angle) * 46,
      target.y + Math.sin(p.angle) * 46,
      20
    );
    target.x = knockback.x;
    target.y = knockback.y;
    target.targetId = "player";
    target.targetCd = 3;
  }
  if (target.health <= 0 && target.alive) {
    spawnFloatingText(target.x, target.y, "K.O.", "#67e08a", 1.2, 84);
    eliminateEnemy(target, `${target.id} was knocked out. +2 diamonds.`, true);
  }
  return true;
}

function reload() {
  if (!state.running || !playerIsPresent() || state.player.reload > 0 || state.ammo === weapon().magazine) return;
  state.player.reload = 1.1;
  addChat(`Reloading ${weapon().name}. Ammo is infinite.`);
}

function shoot() {
  if (!state.running || !playerIsPresent() || state.player.guarding || keys.has("c") || state.player.shootCd > 0 || state.player.reload > 0) return;
  const w = weapon();
  if (state.ammo <= 0) {
    reload();
    return;
  }
  state.ammo -= 1;
  state.player.shootCd = 1 / w.rate;
  playShotSound(state.weaponRank);
  const aimedTarget = findTargetInCrosshair(w.range);
  const aimAngle = state.player.angle + rand(-.018, .018);
  const surfaceImpact = traceSurfaceImpact(state.player, aimAngle, w.range, state.player.pitch);
  const targetDistance = aimedTarget ? dist(state.player, aimedTarget) : Infinity;
  const hit = aimedTarget && targetDistance <= surfaceImpact.distance + 18 ? aimedTarget : null;
  const muzzle = {
    x: state.player.x + Math.cos(state.player.angle) * 46 + Math.cos(state.player.angle + Math.PI / 2) * 14,
    y: state.player.y + Math.sin(state.player.angle) * 46 + Math.sin(state.player.angle + Math.PI / 2) * 14
  };
  const shotEnd = hit ? { x: hit.x, y: hit.y } : surfaceImpact;
  spawnTracer(muzzle, shotEnd, hit ? "#ffe37a" : "#96e8ff", Boolean(hit), false, false, state.player.pitch);
  ejectCasing();
  state.recoil = Math.max(state.recoil, .34);
  state.muzzleFlash = .075;
  state.shake = Math.max(state.shake, .11);
  if (hit) {
    const hitBed = hit.kind === "bed";
    const guarded = !hitBed && botIsGuardingAgainst(hit, state.player);
    const enemyArmor = hitBed ? armors[0] : armors[hit.armor - 1] || armors[0];
    const damage = hitBed
      ? w.damage * 5.5
      : w.damage * 4.5 * (1 - enemyArmor.protection * .55) * (guarded ? .32 : 1);
    if (hitBed) {
      damageBed(hit, damage, "You");
    } else {
      hit.health -= damage;
      if (!guarded) registerComboHit();
      if (hit.health > 0) {
        hit.targetId = "player";
        hit.targetCd = 4;
        hit.strafeDir *= -1;
        hit.tacticCd = 0;
      }
    }
    state.hitMarker = .22;
    playImpactSound(false);
    spawnImpact(hit.x, hit.y, guarded ? "#74d7ff" : "#ffd27a", guarded ? 7 : 19);
    spawnFloatingText(
      hit.x,
      hit.y,
      guarded ? "BLOCK" : damage.toFixed(0),
      guarded ? "#74d7ff" : "#ffe37a",
      .9,
      58
    );
    addChat(`You hit ${hitBed ? `${hit.team} bed` : hit.id} with ${w.name} for ${damage.toFixed(1)} XP.`);
    if (!hitBed && hit.health <= 0 && hit.alive) {
      spawnImpact(hit.x, hit.y, "#67e08a", 30);
      spawnFloatingText(hit.x, hit.y, "ELIM", "#67e08a", 1.2, 84);
      eliminateEnemy(hit, `${hit.id} was eliminated. +2 diamonds.`, true);
    }
  } else {
    spawnSurfaceImpact(surfaceImpact);
    playImpactSound(false);
  }
  if (state.ammo <= 0) reload();
}

function angleDiff(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function enemyIsPresent(enemy) {
  return enemy.alive && !enemy.buildingEntryPending && !enemy.buildingExitPending;
}

function findTargetInCrosshair(range) {
  let best = null;
  let bestDistance = Infinity;
  const p = state.player;
  for (const e of state.enemies) {
    if (!enemyIsPresent(e) || !enemyIsOpponent(e)) continue;
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
  if (isBedwars() && !state.insideBuilding) {
    for (const bed of state.beds) {
      if (!bed.alive || bed.team === state.playerTeam) continue;
      const dx = bed.x - p.x;
      const dy = bed.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d > range || d >= bestDistance) continue;
      const angle = Math.atan2(dy, dx);
      const spread = clamp(bed.radius / d, .035, .18);
      const horizontallyAimed = Math.abs(angleDiff(angle, p.angle)) < spread;
      const verticallyAimed = Math.abs(p.pitch) < clamp(55 / d, .035, .14);
      if (horizontallyAimed && verticallyAimed) {
        best = bed;
        bestDistance = d;
      }
    }
  }
  return best;
}

function chooseEnemyTarget(enemy) {
  const rivals = state.enemies.filter(candidate => (
    enemyIsPresent(candidate)
    && candidate !== enemy
    && areCombatantsHostile(enemy, candidate)
  ));
  const hostileBeds = isBedwars() && !state.insideBuilding
    ? state.beds.filter(bed => bed.alive && bed.team !== enemy.team)
    : [];
  const botDifficulty = difficulty();
  const canTargetPlayer = playerIsPresent() && areCombatantsHostile(enemy, state.player);
  const targetPlayer = canTargetPlayer
    && (!rivals.length || Math.random() < botDifficulty.playerFocus);
  let target = targetPlayer ? state.player : null;

  if (!target && hostileBeds.length && (rivals.length === 0 || Math.random() < .3)) {
    target = hostileBeds
      .map(bed => ({ bed, score: dist(enemy, bed) * rand(.9, 1.12) }))
      .sort((a, b) => a.score - b.score)[0].bed;
  }
  if (!target && rivals.length) {
    target = rivals
      .map(candidate => ({
        candidate,
        score: dist(enemy, candidate)
          * (.65 + clamp(candidate.health / candidate.maxHealth, 0, 1) * .55)
          * rand(.82, 1.18)
      }))
      .sort((a, b) => a.score - b.score)[0].candidate;
  }
  if (!target && hostileBeds.length) {
    target = hostileBeds
      .map(bed => ({ bed, score: dist(enemy, bed) }))
      .sort((a, b) => a.score - b.score)[0].bed;
  }
  if (!target && canTargetPlayer) target = state.player;
  if (!target) {
    enemy.targetId = null;
    enemy.targetCd = .6;
    return null;
  }
  enemy.targetId = target === state.player ? "player" : target.id;
  enemy.targetCd = (target === state.player ? rand(1.5, 3) : rand(.85, 1.9)) * botDifficulty.reaction;
  return target;
}

function resolveEnemyTarget(enemy) {
  if (enemy.targetId === "player") {
    return playerIsPresent() && areCombatantsHostile(enemy, state.player) ? state.player : null;
  }
  const bed = state.beds.find(candidate => candidate.alive && candidate.id === enemy.targetId);
  if (bed) return bed.team !== enemy.team && !state.insideBuilding ? bed : null;
  return state.enemies.find(candidate => (
    enemyIsPresent(candidate)
    && candidate.id === enemy.targetId
    && areCombatantsHostile(enemy, candidate)
  )) || null;
}

function enemyShoot(enemy, target, dt) {
  if (!enemyIsPresent(enemy) || enemy.trapped > 0 || !target) return;
  const targetIsBed = target.kind === "bed";
  if (target !== state.player && !targetIsBed && !enemyIsPresent(target)) return;
  if (!areCombatantsHostile(enemy, target)) return;
  enemy.shootCd -= dt;
  if (enemy.guardTimer > 0) return;
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
    const intendedHit = Math.random() < accuracy;
    const intendedTarget = intendedHit
      ? { x: target.x, y: target.y }
      : { x: target.x + rand(-150, 150), y: target.y + rand(-150, 150) };
    const shotAngle = Math.atan2(intendedTarget.y - enemy.y, intendedTarget.x - enemy.x);
    const shotDistance = Math.min(w.range, dist(enemy, intendedTarget));
    const surfaceImpact = traceSurfaceImpact(enemy, shotAngle, shotDistance);
    const blocked = surfaceImpact.distance < shotDistance - 22;
    const didHit = intendedHit && !blocked;
    const shotTarget = didHit ? { x: target.x, y: target.y } : surfaceImpact;
    spawnTracer(enemy, shotTarget, didHit ? "#ff7b72" : "#ffb86b", didHit, targetIsPlayer, true);
    playShotSound(enemy.weaponRank, true);
    if (didHit) {
      spawnImpact(target.x, target.y, targetIsPlayer ? "#ff7b72" : "#ffd27a", 9);
      if (targetIsPlayer) {
        takeDamage(w.damage * rand(.22, .44) * botDifficulty.damage, enemy.id);
      } else if (targetIsBed) {
        damageBed(target, w.damage * rand(.9, 1.35) * botDifficulty.damage, enemy.id);
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
          enemy.targetCd = 0;
          spawnImpact(target.x, target.y, "#67e08a", 24);
          spawnFloatingText(target.x, target.y, "ELIM", "#67e08a", 1.1, 78);
          eliminateEnemy(target, `${enemy.id} eliminated ${target.id}.`);
        }
      }
    } else {
      spawnSurfaceImpact(surfaceImpact, true);
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
  if (!playerIsPresent()) return;
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
  p.guarding = keys.has("c") && !p.exhausted && p.trapped <= 0 && p.stamina > 0;
  let moving = wantsToMove && !p.exhausted && p.trapped <= 0;
  let sprinting = keys.has("shift") && moving && !p.guarding && p.stamina > 0;
  if (p.guarding) {
    p.stamina = clamp(p.stamina - GUARD_EXHAUSTION_RATE * dt, 0, 150);
  } else if (moving) {
    const drainRate = sprinting ? SPRINT_EXHAUSTION_RATE : MOVE_EXHAUSTION_RATE;
    p.stamina = clamp(p.stamina - drainRate * dt, 0, 150);
  } else {
    p.stamina = clamp(p.stamina + REST_EXHAUSTION_RATE * dt, 0, 150);
  }
  updateExhaustionState(p, true);

  if (p.trapped > 0) {
    p.guarding = false;
    p.trapped -= dt;
    return;
  }

  moving = wantsToMove && !p.exhausted;
  sprinting = keys.has("shift") && moving && !p.guarding && p.stamina > 0;
  const tired = p.exhausted ? 0 : p.stamina < 25 ? .52 : 1;
  const speed = 185 * armor().speed * tired * (sprinting ? 1.38 : 1) * (p.guarding ? .46 : 1);
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

  if (!p.exhausted && !p.guarding && keys.has(" ") && p.z === 0) {
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
    eliminateEnemy(enemy, `${enemy.id} ran out of health.`);
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

function updateEnemyBuildingTransition(enemy, dt) {
  if (state.insideBuilding && enemy.buildingEntryPending) {
    enemy.buildingEntryTimer -= dt;
    if (enemy.buildingEntryTimer > 0) return true;

    const doorwayX = clamp(
      enemy.buildingDoorOffset || 0,
      -INTERIOR_BOUNDS.doorHalfWidth + 22,
      INTERIOR_BOUNDS.doorHalfWidth - 22
    );
    const doorwayY = INTERIOR_BOUNDS.minY + 30;
    const resolved = resolveInteriorPosition(doorwayX, doorwayY, doorwayX, doorwayY, 20);
    enemy.x = resolved.x;
    enemy.y = resolved.y;
    enemy.angle = Math.PI / 2;
    enemy.buildingEntryPending = false;
    enemy.buildingEntryTimer = 0;
    enemy.buildingEntered = true;
    enemy.shootCd = Math.max(enemy.shootCd, 1);
    enemy.targetId = "player";
    enemy.targetCd = 1.2;
    addChat(`${enemy.id} entered through the doorway.`);
    return false;
  }

  if (!state.insideBuilding && enemy.buildingExitPending) {
    enemy.buildingExitTimer -= dt;
    if (enemy.buildingExitTimer > 0) return true;

    const exitPoint = enemy.buildingExitPoint;
    if (exitPoint) {
      enemy.x = exitPoint.x;
      enemy.y = exitPoint.y;
      enemy.angle = exitPoint.angle;
    }
    enemy.buildingExitPending = false;
    enemy.buildingExitTimer = 0;
    enemy.buildingExitPoint = null;
    enemy.shootCd = Math.max(enemy.shootCd, .8);
    enemy.targetCd = 0;
    addChat(`${enemy.id} came out through the entrance.`);
  }

  return false;
}

function updateEnemies(dt) {
  const size = arenaSize();
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (updateEnemyBuildingTransition(e, dt)) continue;
    if (!updateEnemySupplies(e, dt)) continue;
    e.guardTimer = Math.max(0, e.guardTimer - dt);
    if (e.trapped > 0) {
      e.trapped -= dt;
      continue;
    }
    e.targetCd -= dt;
    let target = resolveEnemyTarget(e);
    if (!target || e.targetCd <= 0 || dist(e, target) > weapons[e.weaponRank - 1].range * 1.15) {
      target = chooseEnemyTarget(e);
    }
    if (!target) continue;
    e.tacticCd -= dt;
    if (e.tacticCd <= 0) {
      if (Math.random() < .42) e.strafeDir *= -1;
      if (dist(e, target) < 210 && Math.random() < .28 * difficulty().accuracy) {
        e.guardTimer = rand(.32, .72);
      }
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
      if (!enemyIsPresent(other) || other === e) continue;
      const gap = Math.max(1, dist(e, other));
      if (gap >= 70) continue;
      const force = (70 - gap) / 70 * 1.3;
      moveX += (e.x - other.x) / gap * force;
      moveY += (e.y - other.y) / gap * force;
    }

    const movementLength = Math.hypot(moveX, moveY) || 1;
    const tired = e.exhausted ? 0 : e.stamina < 25 ? .52 : 1;
    const guarding = e.guardTimer > 0 ? .42 : 1;
    const caution = healthRatio < .3 ? 1.16 : 1;
    const enemyNextX = e.x + moveX / movementLength * e.speed * tired * guarding * caution * dt;
    const enemyNextY = e.y + moveY / movementLength * e.speed * tired * guarding * caution * dt;
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

function applyTrapDamage(entity, isPlayer, amount, source) {
  if (isPlayer) {
    takeDamage(amount, source);
    return;
  }
  entity.health -= amount;
  if (entity.health > 0 || !entity.alive) return;
  eliminateEnemy(entity, `${entity.id} was eliminated by ${source}.`);
}

function checkEntityTraps(entity, isPlayer) {
  for (const trap of state.traps) {
    if (!trap.active) continue;
    if (Math.hypot(entity.x - trap.x, entity.y - trap.y) > trap.radius) continue;
    const name = isPlayer ? "You" : entity.id;
    if (trap.type === "mine") {
      trap.active = false;
      addChat(`${name} stepped on a buried mine.`);
      applyTrapDamage(entity, isPlayer, 30, "a buried mine");
    }
    if (trap.type === "snare") {
      trap.active = false;
      entity.trapped = Math.max(entity.trapped, 2.4);
      addChat(`${name} triggered a steel snare.`);
      applyTrapDamage(entity, isPlayer, 12, "a steel snare");
    }
    if (trap.type === "hole") {
      trap.active = false;
      entity.trapped = 1.4 + trap.depth * .08;
      addChat(`${name} fell into a ${trap.depth}-block hole and mined out.`);
      applyTrapDamage(entity, isPlayer, Math.floor(trap.depth / 3) + 1, "a hole fall");
    }
    if (trap.type === "pitfall") {
      trap.active = false;
      entity.trapped = 1.8;
      addChat(`${name} triggered a pitfall with spikes.`);
      applyTrapDamage(entity, isPlayer, 40 + Math.floor(trap.depth / 3), "a spike pit");
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
    for (let i = 0; i < 3; i++) state.traps.push(createTrap(randomPoint(size), "mine"));
    for (let i = 0; i < 3; i++) state.traps.push(createTrap(randomPoint(size), "snare"));
    for (let i = 0; i < 4; i++) {
      state.traps.push(createTrap(randomPoint(size), "hole", Math.floor(rand(1, 16))));
    }
    for (let i = 0; i < 2; i++) {
      state.traps.push(createTrap(randomPoint(size), "pitfall", Math.floor(rand(6, 16))));
    }
    if (minute >= 17) {
      for (let i = 0; i < 5; i++) state.traps.push(createTrap(randomPoint(size), "mine"));
      for (let i = 0; i < 5; i++) state.traps.push(createTrap(randomPoint(size), "snare"));
      for (let i = 0; i < 7; i++) {
        state.traps.push(createTrap(randomPoint(size), "hole", Math.floor(rand(1, 16))));
      }
      for (let i = 0; i < 3; i++) {
        state.traps.push(createTrap(randomPoint(size), "pitfall", Math.floor(rand(6, 16))));
      }
    }
  }
  if (state.time - state.lastNoKillCheck > 240) {
    const alive = state.enemies.filter(e => e.alive);
    if (alive.length) {
      const unlucky = alive[Math.floor(Math.random() * alive.length)];
      eliminateEnemy(unlucky, `No eliminations for 4 minutes. The server removed ${unlucky.id}.`);
    }
  }
}

function update(dt) {
  if (state.duelPhase === "singleCountdown") {
    state.phaseTimer -= dt;
    updateVisualEffects(dt);
    if (state.phaseTimer <= 0) {
      state.duelPhase = "singleFight";
      state.running = true;
      state.phaseTimer = .65;
      state.roundMessage = "FIGHT!";
    }
    return;
  }
  if (state.duelPhase === "singleFight" && state.phaseTimer > 0) {
    state.phaseTimer = Math.max(0, state.phaseTimer - dt);
  }
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
  updateBedwarsRespawns(dt);
  if (!state.running) return;
  updatePlayer(dt);
  if (!state.running) return;
  updateEnemies(dt);
  if (!state.running) return;
  if (!state.insideBuilding && playerIsPresent()) checkEntityTraps(state.player, true);
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
  state.dashCooldown = Math.max(0, state.dashCooldown - dt);
  state.dashFlash = Math.max(0, state.dashFlash - dt);
  state.meleeCooldown = Math.max(0, state.meleeCooldown - dt);
  state.meleeSwing = Math.max(0, state.meleeSwing - dt);
  state.guardFlash = Math.max(0, state.guardFlash - dt);
  state.comboTimer = Math.max(0, state.comboTimer - dt);
  if (state.comboTimer <= 0) state.comboHits = 0;
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
  state.bulletMarks = state.bulletMarks
    .map(mark => ({ ...mark, life: mark.life - dt }))
    .filter(mark => mark.life > 0);
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

  drawGroundBulletMarks(width, horizon);
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
  const horizonGround = mixHexColors(theme.skyHorizon, theme.groundFar, .68);
  const middleGround = mixHexColors(theme.groundFar, state.map.ground, .62);
  const ground = ctx.createLinearGradient(0, horizon, 0, height);
  ground.addColorStop(0, horizonGround);
  ground.addColorStop(.14, theme.groundFar);
  ground.addColorStop(.54, middleGround);
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
  const bridgeColor = mixHexColors(theme.skyHorizon, theme.groundFar, .64);
  const horizonBridge = ctx.createLinearGradient(0, horizon - 64, 0, horizon + 24);
  horizonBridge.addColorStop(0, colorWithAlpha(bridgeColor, 0));
  horizonBridge.addColorStop(.7, colorWithAlpha(bridgeColor, .62));
  horizonBridge.addColorStop(1, colorWithAlpha(theme.groundFar, .88));
  ctx.fillStyle = horizonBridge;
  ctx.fillRect(0, horizon - 64, width, 88);

  if (theme.scene === "forest") {
    drawRidge(
      width,
      horizon,
      pan * .3,
      horizon - 2,
      58,
      mixHexColors(theme.groundFar, "#415f4f", .62),
      4,
      110
    );
    drawRidge(
      width,
      horizon,
      pan * .55,
      horizon + 5,
      40,
      mixHexColors(theme.groundFar, "#233d2e", .72),
      8,
      76
    );
    const spacing = 42;
    const offset = -wrapScreen(pan, spacing);
    const firstIndex = Math.floor(pan / spacing) - 2;
    for (let i = -1; i <= Math.ceil(width / spacing) + 2; i++) {
      const index = firstIndex + i;
      const x = offset + i * spacing;
      const treeHeight = 38 + hashNoise(index, 12) * 64;
      ctx.fillStyle = "#17271d";
      ctx.fillRect(x - 2, horizon - treeHeight * .48, 4, treeHeight * .5);
      ctx.fillStyle = index % 2
        ? mixHexColors(theme.groundFar, "#24412d", .72)
        : mixHexColors(theme.groundFar, "#1c3526", .76);
      ctx.beginPath();
      ctx.moveTo(x, horizon - treeHeight);
      ctx.lineTo(x - treeHeight * .25, horizon - treeHeight * .18);
      ctx.lineTo(x + treeHeight * .25, horizon - treeHeight * .18);
      ctx.closePath();
      ctx.fill();
    }
  } else if (theme.scene === "city" || theme.scene === "office") {
    drawBuildingLine(
      width,
      horizon,
      pan * .45,
      mixHexColors(theme.groundFar, "#34434f", .66),
      "#ffd9a1",
      17,
      .72
    );
    drawBuildingLine(
      width,
      horizon,
      pan * .72,
      mixHexColors(theme.groundFar, "#222c34", .76),
      "#9ed8e9",
      26,
      1
    );
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
    drawRidge(
      width,
      horizon,
      pan * .24,
      horizon + 2,
      92,
      mixHexColors(theme.groundFar, "#8b6547", .58),
      31,
      132
    );
    drawRidge(
      width,
      horizon,
      pan * .52,
      horizon + 8,
      54,
      mixHexColors(theme.groundFar, "#5e4936", .7),
      37,
      94
    );
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
    drawRidge(
      width,
      horizon,
      pan * .3,
      horizon + 3,
      62,
      mixHexColors(theme.groundFar, "#5d5143", .68),
      48,
      118
    );
    const spacing = 92;
    const offset = -wrapScreen(pan * .68, spacing);
    const firstIndex = Math.floor(pan * .68 / spacing) - 2;
    for (let i = -1; i <= Math.ceil(width / spacing) + 2; i++) {
      const index = firstIndex + i;
      const x = offset + i * spacing;
      const houseHeight = 24 + hashNoise(index, 52) * 24;
      const houseWidth = 48 + hashNoise(index, 55) * 28;
      ctx.fillStyle = index % 2
        ? mixHexColors(theme.groundFar, "#493932", .74)
        : mixHexColors(theme.groundFar, "#59443a", .68);
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
    drawBuildingLine(
      width,
      horizon,
      pan * .4,
      mixHexColors(theme.groundFar, "#3c464b", .68),
      "#f7d88f",
      61,
      .55
    );
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
  const blendedTerrain = mixHexColors(theme.skyHorizon, theme.groundFar, .72);
  const terrainBlend = ctx.createLinearGradient(0, horizon - 48, 0, horizon + height * .28);
  terrainBlend.addColorStop(0, colorWithAlpha(blendedTerrain, 0));
  terrainBlend.addColorStop(.24, colorWithAlpha(blendedTerrain, .44));
  terrainBlend.addColorStop(.56, colorWithAlpha(theme.groundFar, .24));
  terrainBlend.addColorStop(1, colorWithAlpha(theme.groundFar, 0));
  ctx.fillStyle = terrainBlend;
  ctx.fillRect(0, horizon - 48, width, height * .36);

  const haze = ctx.createLinearGradient(0, horizon - 72, 0, horizon + height * .34);
  haze.addColorStop(0, "rgba(255, 255, 255, 0)");
  haze.addColorStop(.34, theme.haze);
  haze.addColorStop(.72, theme.haze);
  haze.addColorStop(1, "rgba(8, 12, 16, 0)");
  ctx.globalAlpha = .72;
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon - 72, width, height * .44);
  ctx.globalAlpha = 1;
}

function interiorKindFor(building) {
  const type = building.structureType || "office";
  if (type === "tent") return "canvas";
  if (building.scene === "space" || ["module", "pod", "airlock", "dome"].includes(type)) return "space";
  if (["cabin", "lodge", "shed", "barn", "house", "chapel", "tavern", "school", "stable", "mill"].includes(type)) {
    return "rustic";
  }
  if (["bunker", "barracks", "depot"].includes(type)) return "military";
  if (["hangar", "garage", "warehouse", "workshop", "tower"].includes(type)) return "industrial";
  if (["storefront", "kiosk", "clinic", "arcade", "cinema", "service"].includes(type) || building.scene === "mall") {
    return "retail";
  }
  if (["office", "highrise", "lobby", "studio", "archive", "annex", "apartment"].includes(type)) return "office";
  return building.scene === "village" ? "rustic" : "industrial";
}

function interiorPaletteFor(building, kind) {
  const palettes = {
    canvas: { wall: "#736d53", wallLow: "#39372d", ceiling: "#55523f", floor: "#302c22", line: "rgba(225, 211, 165, .2)" },
    rustic: { wall: "#6b5039", wallLow: "#2f261f", ceiling: "#30261e", floor: "#39291d", line: "rgba(223, 190, 139, .18)" },
    industrial: { wall: "#59636a", wallLow: "#242b30", ceiling: "#22292e", floor: "#292d30", line: "rgba(215, 225, 225, .14)" },
    military: { wall: "#66685b", wallLow: "#292d28", ceiling: "#262a27", floor: "#33352f", line: "rgba(222, 216, 174, .15)" },
    space: { wall: "#526273", wallLow: "#182332", ceiling: "#111a27", floor: "#18222e", line: "rgba(111, 222, 245, .2)" },
    retail: { wall: "#8b9294", wallLow: "#3d4346", ceiling: "#444d51", floor: "#4e5151", line: "rgba(239, 243, 236, .18)" },
    office: { wall: "#6f7d87", wallLow: "#2c343b", ceiling: "#29323a", floor: "#343b40", line: "rgba(202, 225, 234, .17)" }
  };
  const palette = palettes[kind] || palettes.industrial;
  return {
    ...palette,
    wall: mixHexColors(palette.wall, building.wall, .36),
    ceiling: mixHexColors(palette.ceiling, building.ceiling, .32),
    floor: mixHexColors(palette.floor, building.floor, .32)
  };
}

function drawBuildingInterior(width, height, horizon, building) {
  const roomHorizon = clamp(horizon, height * .3, height * .67);
  const vanishX = width / 2 - Math.sin(state.player.angle) * width * .08;
  const backLeft = width * .2;
  const backRight = width * .8;
  const backTop = roomHorizon * .28;
  const backBottom = roomHorizon + height * .1;
  const roomKind = interiorKindFor(building);
  const palette = interiorPaletteFor(building, roomKind);
  ctx.save();

  ctx.fillStyle = palette.wallLow;
  ctx.fillRect(0, 0, width, height);
  const backWall = ctx.createLinearGradient(0, backTop, 0, backBottom);
  backWall.addColorStop(0, palette.wall);
  backWall.addColorStop(1, palette.wallLow);
  ctx.fillStyle = backWall;
  ctx.fillRect(backLeft, backTop, backRight - backLeft, backBottom - backTop);

  const ceiling = ctx.createLinearGradient(0, 0, 0, roomHorizon);
  ceiling.addColorStop(0, palette.ceiling);
  ceiling.addColorStop(1, mixHexColors(palette.ceiling, palette.wall, .48));
  ctx.fillStyle = ceiling;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(backRight, backTop);
  ctx.lineTo(backLeft, backTop);
  ctx.closePath();
  ctx.fill();

  const leftWall = ctx.createLinearGradient(0, 0, backLeft, 0);
  leftWall.addColorStop(0, mixHexColors(palette.wallLow, "#05080a", .64));
  leftWall.addColorStop(1, mixHexColors(palette.wall, palette.wallLow, .42));
  ctx.fillStyle = leftWall;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(backLeft, backTop);
  ctx.lineTo(backLeft, backBottom);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  const rightWall = ctx.createLinearGradient(width, 0, backRight, 0);
  rightWall.addColorStop(0, mixHexColors(palette.wallLow, "#05080a", .64));
  rightWall.addColorStop(1, mixHexColors(palette.wall, palette.wallLow, .42));
  ctx.fillStyle = rightWall;
  ctx.beginPath();
  ctx.moveTo(width, 0);
  ctx.lineTo(backRight, backTop);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = colorWithAlpha(building.trim, .38);
  ctx.lineWidth = 1.5;
  for (let panel = 1; panel < 4; panel++) {
    const amount = panel / 4;
    const leftX = backLeft * amount;
    const rightX = width - backLeft * amount;
    const topY = backTop * amount;
    const bottomY = height - (height - backBottom) * amount;
    ctx.beginPath();
    ctx.moveTo(leftX, topY);
    ctx.lineTo(leftX, bottomY);
    ctx.moveTo(rightX, topY);
    ctx.lineTo(rightX, bottomY);
    ctx.stroke();
  }

  const floor = ctx.createLinearGradient(0, roomHorizon, 0, height);
  floor.addColorStop(0, palette.floor);
  floor.addColorStop(1, "rgba(10, 13, 15, .98)");
  ctx.fillStyle = floor;
  ctx.beginPath();
  ctx.moveTo(backLeft, backBottom);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = colorWithAlpha(building.trim, .82);
  ctx.lineWidth = Math.max(4, width * .005);
  ctx.beginPath();
  ctx.moveTo(backLeft, backTop);
  ctx.lineTo(backLeft, backBottom);
  ctx.lineTo(0, height);
  ctx.moveTo(backRight, backTop);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(width, height);
  ctx.moveTo(backLeft, backTop);
  ctx.lineTo(0, 0);
  ctx.moveTo(backRight, backTop);
  ctx.lineTo(width, 0);
  ctx.stroke();

  ctx.strokeStyle = colorWithAlpha(building.trim, .66);
  ctx.lineWidth = Math.max(5, height * .009);
  ctx.beginPath();
  ctx.moveTo(0, height - 5);
  ctx.lineTo(backLeft, backBottom);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(width, height - 5);
  ctx.stroke();

  ctx.fillStyle = colorWithAlpha(building.trim, .72);
  ctx.fillRect(backLeft - 5, backTop, 10, backBottom - backTop);
  ctx.fillRect(backRight - 5, backTop, 10, backBottom - backTop);
  ctx.fillRect(backLeft, backTop - 4, backRight - backLeft, 8);
  ctx.fillRect(backLeft, backBottom - 6, backRight - backLeft, 12);

  if (roomKind === "rustic") {
    ctx.strokeStyle = "rgba(34, 23, 15, .34)";
    ctx.lineWidth = 1;
    for (let board = 1; board < 8; board++) {
      const boardY = backTop + (backBottom - backTop) * board / 8;
      ctx.beginPath();
      ctx.moveTo(backLeft, boardY);
      ctx.lineTo(backRight, boardY);
      ctx.stroke();
    }
  } else if (roomKind === "industrial" || roomKind === "military" || roomKind === "space") {
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1;
    for (let seam = 1; seam < 5; seam++) {
      const seamX = backLeft + (backRight - backLeft) * seam / 5;
      ctx.beginPath();
      ctx.moveTo(seamX, backTop);
      ctx.lineTo(seamX, backBottom);
      ctx.stroke();
    }
  }

  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 1;
  for (let i = -7; i <= 7; i++) {
    ctx.beginPath();
    ctx.moveTo(vanishX, backBottom);
    ctx.lineTo(vanishX + i * width * .13, height);
    ctx.stroke();
  }
  for (let i = 1; i < 10; i++) {
    const amount = i / 9;
    const y = backBottom + Math.pow(amount, 1.65) * (height - backBottom);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const panelShift = Math.sin(state.player.angle) * width * .06;
  if (["space", "office", "retail"].includes(roomKind)) {
    for (let i = 0; i < 4; i++) {
      const panelWidth = (backRight - backLeft) * .17;
      const x = backLeft + (i + .5) * (backRight - backLeft) / 4 - panelWidth / 2 + panelShift;
      const y = backTop + (backBottom - backTop) * .22;
      ctx.fillStyle = roomKind === "office" ? "rgba(78, 111, 124, .44)" : "rgba(9, 15, 19, .58)";
      ctx.fillRect(x, y, panelWidth, (backBottom - backTop) * .48);
      ctx.strokeStyle = i % 2 ? building.trim : building.accent;
      ctx.globalAlpha = .48;
      ctx.strokeRect(x, y, panelWidth, (backBottom - backTop) * .48);
    }
  } else if (roomKind === "rustic") {
    ctx.strokeStyle = colorWithAlpha(building.trim, .55);
    ctx.lineWidth = Math.max(4, width * .006);
    for (let beam = 0; beam < 5; beam++) {
      const beamX = backLeft + beam * (backRight - backLeft) / 4 + panelShift;
      ctx.beginPath();
      ctx.moveTo(beamX, backTop);
      ctx.lineTo(beamX, backBottom);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(backLeft, backTop + (backBottom - backTop) * .28);
    ctx.lineTo(backRight, backTop + (backBottom - backTop) * .28);
    ctx.stroke();
  } else if (roomKind === "canvas") {
    ctx.strokeStyle = colorWithAlpha(building.trim, .7);
    ctx.lineWidth = Math.max(2, width * .003);
    ctx.beginPath();
    ctx.moveTo(vanishX, 0);
    ctx.lineTo(vanishX, backBottom);
    ctx.moveTo(backLeft, backTop);
    ctx.lineTo(vanishX, 0);
    ctx.lineTo(backRight, backTop);
    ctx.stroke();
    for (let seam = 1; seam < 4; seam++) {
      const seamY = backTop + (backBottom - backTop) * seam / 4;
      ctx.beginPath();
      ctx.moveTo(backLeft, seamY);
      ctx.lineTo(backRight, seamY);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = "rgba(13, 18, 18, .38)";
    for (let bay = 0; bay < 5; bay++) {
      const bayX = backLeft + bay * (backRight - backLeft) / 4 + panelShift;
      ctx.fillRect(bayX - 5, backTop, 10, backBottom - backTop);
    }
    ctx.strokeStyle = colorWithAlpha(building.trim, .56);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(backLeft, backTop + 18);
    ctx.lineTo(backRight, backTop + 18);
    ctx.stroke();
    if (roomKind === "military") {
      ctx.fillStyle = "#d3b45e";
      for (let stripe = 0; stripe < 7; stripe++) {
        ctx.save();
        ctx.translate(backLeft + 30 + stripe * 34, backBottom - 12);
        ctx.rotate(-.55);
        ctx.fillRect(-4, -20, 8, 40);
        ctx.restore();
      }
    }
  }
  ctx.globalAlpha = 1;

  for (let i = 0; i < 4; i++) {
    const amount = (i + 1) / 5;
    const lightY = 18 + amount * Math.max(28, backTop - 30);
    const lightWidth = 110 - amount * 48;
    ctx.shadowColor = roomKind === "rustic" || roomKind === "canvas" ? "#ffd28b" : building.accent;
    ctx.shadowBlur = 16;
    ctx.fillStyle = roomKind === "rustic" || roomKind === "canvas" ? "#ffd28b" : building.accent;
    ctx.globalAlpha = .38 + amount * .34;
    if (roomKind === "rustic" || roomKind === "canvas") {
      ctx.beginPath();
      ctx.arc(vanishX, lightY, Math.max(4, 9 - i), 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(vanishX - lightWidth / 2, lightY, lightWidth, 6);
    }
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
    for (const wall of interiorWallSegments()) {
      sprites.push({ kind: "interiorWall", obj: wall, depth: project(wall).z });
    }
    for (const furniture of interiorProps()) {
      sprites.push({ kind: "interiorProp", obj: furniture, depth: project(furniture).z });
    }
  } else {
    for (const building of mapBuildings()) {
      sprites.push({ kind: "building", obj: building, depth: project(building).z });
    }
    for (const prop of state.props) sprites.push({ kind: "prop", obj: prop, depth: project(prop).z });
    for (const trap of state.traps) if (trap.active) sprites.push({ kind: "trap", obj: trap, depth: project(trap).z });
    for (const bed of state.beds) if (bed.alive) sprites.push({ kind: "bed", obj: bed, depth: project(bed).z });
  }
  for (const mark of state.bulletMarks) {
    if (mark.area === impactAreaKey() && mark.surface !== "ground") {
      sprites.push({ kind: "bulletMark", obj: mark, depth: project(mark).z });
    }
  }
  for (const enemy of state.enemies) if (enemyIsPresent(enemy)) sprites.push({ kind: "enemy", obj: enemy, depth: project(enemy).z });
  sprites.sort((a, b) => b.depth - a.depth);

  for (const sprite of sprites) {
    const point = project(sprite.obj);
    if (point.z < 26) continue;
    const screenX = width / 2 + point.x / point.z * 560;
    if (screenX < -120 || screenX > width + 120) continue;
    const scale = 620 / point.z;
    const baseLift = sprite.kind === "interiorWall" ? (sprite.obj.baseLift || 0) : 0;
    const base = horizon + 28000 / point.z - baseLift * scale;
    if (sprite.kind === "building") drawBuildingExterior(screenX, base, scale, sprite.obj, width, height);
    if (sprite.kind === "exitDoor") drawInteriorExit(screenX, base, scale, sprite.obj, width, height);
    if (sprite.kind === "interiorWall") drawInteriorWall(screenX, base, scale, sprite.obj, activeBuilding(), width, height);
    if (sprite.kind === "interiorProp") drawInteriorProp(screenX, base, scale, sprite.obj);
    if (sprite.kind === "bulletMark") {
      const markY = base - sprite.obj.height * scale;
      if (!surfaceEffectOccludedByEnemy(screenX, markY, point.z, width, horizon)) {
        drawBulletMark(screenX, markY, scale, sprite.obj);
      }
    }
    if (sprite.kind === "prop") drawProp(screenX, base, scale, sprite.obj);
    if (sprite.kind === "trap") drawTrap(screenX, base, scale, sprite.obj);
    if (sprite.kind === "bed") drawBed(screenX, base, scale, sprite.obj);
    if (sprite.kind === "enemy") drawEnemy(screenX, base, scale, sprite.obj);
  }

}

function surfaceEffectOccludedByEnemy(x, y, effectDepth, width, horizon) {
  for (const enemy of state.enemies) {
    if (!enemyIsPresent(enemy)) continue;
    const enemyPoint = project(enemy);
    if (enemyPoint.z < 26 || enemyPoint.z >= effectDepth - 2) continue;
    const enemyX = width / 2 + enemyPoint.x / enemyPoint.z * 560;
    const enemyBase = horizon + 28000 / enemyPoint.z;
    const enemyScale = 620 / enemyPoint.z;
    const enemyHeight = characterScreenHeight(enemyScale);
    const enemyWidth = enemyHeight * .34;
    const insideHorizontal = x >= enemyX - enemyWidth * .84 && x <= enemyX + enemyWidth * 1.68;
    const insideVertical = y >= enemyBase - enemyHeight - 16 && y <= enemyBase + 7;
    if (insideHorizontal && insideVertical) return true;
  }
  return false;
}

function drawGroundBulletMarks(width, horizon) {
  const area = impactAreaKey();
  const visibleMarks = state.bulletMarks
    .filter(mark => mark.area === area && mark.surface === "ground")
    .map(mark => ({ mark, point: screenPoint(mark, width, horizon) }))
    .filter(item => item.point && item.point.x > -40 && item.point.x < width + 40)
    .sort((a, b) => b.point.depth - a.point.depth);
  for (const { mark, point } of visibleMarks) {
    drawBulletMark(point.x, point.y, point.scale, mark, true);
  }
}

function drawBulletMark(x, y, scale, mark, ground = false) {
  const fade = mark.life < 7 ? mark.life / 7 : 1;
  const size = clamp(mark.size * scale, 2.2, ground ? 15 : 18);
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = fade;

  if (ground) {
    ctx.rotate(mark.angle - state.player.angle);
    ctx.fillStyle = mark.soot || "rgba(4, 5, 5, .68)";
    ctx.globalAlpha = fade * .68;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 1.32, size * .4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = mark.rim;
    ctx.globalAlpha = fade * .36;
    ctx.lineWidth = Math.max(1, size * .1);
    ctx.stroke();
    ctx.fillStyle = "rgba(1, 2, 2, .74)";
    ctx.globalAlpha = fade * .82;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * .55, size * .2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.fillStyle = mark.rim;
  ctx.globalAlpha = fade * .42;
  ctx.beginPath();
  for (let pointIndex = 0; pointIndex < 12; pointIndex += 1) {
    const pointAngle = pointIndex / 12 * Math.PI * 2;
    const radius = size * (.72 + hashNoise(pointIndex, mark.seed) * .28);
    const pointX = Math.cos(pointAngle) * radius;
    const pointY = Math.sin(pointAngle) * radius;
    if (pointIndex === 0) ctx.moveTo(pointX, pointY);
    else ctx.lineTo(pointX, pointY);
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = mark.soot || "rgba(1, 2, 3, .84)";
  ctx.globalAlpha = fade * .86;
  ctx.beginPath();
  ctx.arc(0, 0, size * .52, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.1)";
  ctx.globalAlpha = fade * .7;
  ctx.beginPath();
  ctx.arc(-size * .16, -size * .17, Math.max(.8, size * .1), 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = mark.soot || "rgba(8, 9, 9, .72)";
  ctx.globalAlpha = fade * .56;
  ctx.lineWidth = Math.max(.8, size * .075);
  for (let crackIndex = 0; crackIndex < 6; crackIndex += 1) {
    const crackAngle = hashNoise(crackIndex, mark.seed + 7) * Math.PI * 2;
    const crackLength = size * (.95 + hashNoise(crackIndex, mark.seed + 13) * .65);
    ctx.beginPath();
    ctx.moveTo(Math.cos(crackAngle) * size * .48, Math.sin(crackAngle) * size * .48);
    ctx.lineTo(Math.cos(crackAngle) * crackLength, Math.sin(crackAngle) * crackLength);
    ctx.stroke();
  }
  ctx.restore();
}

function drawExteriorDoor(x, baseY, doorW, doorH, building, nearEntrance) {
  const doorX = x - doorW / 2;
  const doorY = baseY - doorH;
  ctx.fillStyle = "rgba(8, 12, 14, .96)";
  ctx.fillRect(doorX, doorY, doorW, doorH);
  ctx.strokeStyle = building.accent;
  ctx.globalAlpha = nearEntrance ? .98 : .54;
  ctx.lineWidth = Math.max(2, doorW * .035);
  ctx.strokeRect(doorX, doorY, doorW, doorH);
  ctx.fillStyle = building.accent;
  ctx.fillRect(
    doorX + doorW * .72,
    doorY + doorH * .5,
    Math.max(3, doorW * .06),
    Math.max(3, doorW * .06)
  );
  ctx.globalAlpha = 1;
}

function drawExteriorWindow(centerX, top, width, height, scale) {
  const glass = ctx.createLinearGradient(0, top, 0, top + height);
  glass.addColorStop(0, "rgba(144, 204, 219, .68)");
  glass.addColorStop(1, "rgba(24, 42, 50, .9)");
  ctx.fillStyle = glass;
  ctx.fillRect(centerX - width / 2, top, width, height);
  ctx.strokeStyle = "rgba(224, 238, 239, .38)";
  ctx.lineWidth = Math.max(1, scale * .7);
  ctx.strokeRect(centerX - width / 2, top, width, height);
  ctx.beginPath();
  ctx.moveTo(centerX, top);
  ctx.lineTo(centerX, top + height);
  ctx.stroke();
}

function drawFacadeTexture(x, y, w, h, building, scale) {
  const material = building.material || "concrete";
  ctx.save();
  ctx.beginPath();
  ctx.rect(x - w / 2, y - h, w, h);
  ctx.clip();
  ctx.lineWidth = Math.max(1, scale * .7);

  if (material === "timber") {
    ctx.strokeStyle = "rgba(31, 22, 16, .42)";
    for (let row = 1; row < 9; row++) {
      const lineY = y - h + h * row / 9;
      ctx.beginPath();
      ctx.moveTo(x - w / 2, lineY);
      ctx.lineTo(x + w / 2, lineY);
      ctx.stroke();
    }
    ctx.fillStyle = colorWithAlpha(building.trim, .56);
    ctx.fillRect(x - w * .47, y - h, w * .055, h);
    ctx.fillRect(x + w * .415, y - h, w * .055, h);
  } else if (material === "brick" || material === "stone") {
    const rows = material === "stone" ? 6 : 9;
    ctx.strokeStyle = material === "stone" ? "rgba(27, 24, 21, .4)" : "rgba(231, 218, 198, .24)";
    for (let row = 0; row <= rows; row++) {
      const lineY = y - h + h * row / rows;
      ctx.beginPath();
      ctx.moveTo(x - w / 2, lineY);
      ctx.lineTo(x + w / 2, lineY);
      ctx.stroke();
      if (row === rows) continue;
      const columns = material === "stone" ? 5 : 8;
      const offset = row % 2 ? .5 : 0;
      for (let col = 0; col < columns; col++) {
        const lineX = x - w / 2 + w * (col + offset) / columns;
        ctx.beginPath();
        ctx.moveTo(lineX, lineY);
        ctx.lineTo(lineX, lineY + h / rows);
        ctx.stroke();
      }
    }
  } else if (["corrugated", "steel", "alloy", "panel"].includes(material)) {
    ctx.strokeStyle = material === "alloy"
      ? colorWithAlpha(building.accent, .3)
      : "rgba(226, 235, 234, .2)";
    const ribs = material === "corrugated" ? 14 : 9;
    for (let rib = 1; rib < ribs; rib++) {
      const lineX = x - w / 2 + w * rib / ribs;
      ctx.beginPath();
      ctx.moveTo(lineX, y - h);
      ctx.lineTo(lineX, y);
      ctx.stroke();
    }
    if (material === "alloy" || material === "panel") {
      for (let row = 1; row < 4; row++) {
        const lineY = y - h + h * row / 4;
        ctx.beginPath();
        ctx.moveTo(x - w / 2, lineY);
        ctx.lineTo(x + w / 2, lineY);
        ctx.stroke();
      }
    }
  } else if (material === "glass") {
    const sheen = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0);
    sheen.addColorStop(0, "rgba(22, 44, 57, .42)");
    sheen.addColorStop(.35, "rgba(124, 181, 201, .25)");
    sheen.addColorStop(.5, "rgba(231, 241, 240, .17)");
    sheen.addColorStop(.7, "rgba(69, 115, 139, .28)");
    sheen.addColorStop(1, "rgba(13, 29, 40, .48)");
    ctx.fillStyle = sheen;
    ctx.fillRect(x - w / 2, y - h, w, h);
    ctx.strokeStyle = "rgba(206, 227, 232, .26)";
    for (let col = 1; col < 5; col++) {
      const lineX = x - w / 2 + w * col / 5;
      ctx.beginPath();
      ctx.moveTo(lineX, y - h);
      ctx.lineTo(lineX, y);
      ctx.stroke();
    }
    for (let row = 1; row < 5; row++) {
      const lineY = y - h + h * row / 5;
      ctx.beginPath();
      ctx.moveTo(x - w / 2, lineY);
      ctx.lineTo(x + w / 2, lineY);
      ctx.stroke();
    }
  } else {
    ctx.strokeStyle = "rgba(224, 229, 219, .13)";
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x, y);
    ctx.moveTo(x - w / 2, y - h * .52);
    ctx.lineTo(x + w / 2, y - h * .52);
    ctx.stroke();
    ctx.fillStyle = "rgba(24, 20, 15, .08)";
    ctx.beginPath();
    ctx.ellipse(x - w * .28, y - h * .22, w * .13, h * .34, -.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawBuildingSign(x, y, w, h, building) {
  const signW = w * .58;
  const signH = clamp(h * .09, 13, 28);
  const signY = y - h * .94;
  ctx.fillStyle = "rgba(8, 12, 14, .86)";
  ctx.fillRect(x - signW / 2, signY, signW, signH);
  ctx.strokeStyle = colorWithAlpha(building.accent, .68);
  ctx.lineWidth = 1;
  ctx.strokeRect(x - signW / 2, signY, signW, signH);
  ctx.fillStyle = "#eef2ef";
  ctx.font = `700 ${clamp(signH * .48, 7, 13)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(building.name.toUpperCase(), x, signY + signH * .53, signW - 10);
}

function drawHighRiseExterior(x, y, w, h, building, nearEntrance, scale) {
  drawExteriorSideDepth(x, y, w, h, building);
  const facade = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0);
  facade.addColorStop(0, "#172b38");
  facade.addColorStop(.42, building.exterior);
  facade.addColorStop(.7, "#55798b");
  facade.addColorStop(1, "#13232d");
  ctx.fillStyle = facade;
  ctx.fillRect(x - w / 2, y - h, w, h);
  drawFacadeTexture(x, y, w, h, { ...building, material: "glass" }, scale);

  ctx.strokeStyle = "rgba(221, 236, 238, .28)";
  ctx.lineWidth = Math.max(1, scale);
  for (let floor = 1; floor < 8; floor++) {
    const floorY = y - h + h * floor / 8;
    ctx.beginPath();
    ctx.moveTo(x - w / 2, floorY);
    ctx.lineTo(x + w / 2, floorY);
    ctx.stroke();
  }
  ctx.fillStyle = building.roof;
  ctx.fillRect(x - w * .54, y - h * 1.04, w * 1.08, h * .05);
  ctx.fillStyle = "rgba(17, 25, 29, .9)";
  ctx.fillRect(x - w * .18, y - h * 1.12, w * .36, h * .08);
  ctx.strokeStyle = building.accent;
  ctx.beginPath();
  ctx.moveTo(x, y - h * 1.12);
  ctx.lineTo(x, y - h * 1.3);
  ctx.stroke();
  drawExteriorDoor(x, y, w * .26, h * .18, building, nearEntrance);
  drawBuildingSign(x, y - h * .02, w, h * .32, building);
}

function drawSpaceModuleExterior(x, y, w, h, building, nearEntrance, scale) {
  const left = x - w * .48;
  const right = x + w * .48;
  const top = y - h * .88;
  const shoulder = h * .18;
  ctx.fillStyle = "rgba(7, 12, 17, .86)";
  ctx.fillRect(x - w * .4, y - h * .12, w * .8, h * .15);
  for (const legX of [x - w * .31, x + w * .31]) {
    ctx.fillStyle = building.roof;
    ctx.fillRect(legX - w * .035, y - h * .06, w * .07, h * .14);
    ctx.fillStyle = "rgba(16, 22, 25, .96)";
    ctx.fillRect(legX - w * .08, y + h * .055, w * .16, h * .035);
  }
  const body = ctx.createLinearGradient(left, 0, right, 0);
  body.addColorStop(0, "#243241");
  body.addColorStop(.28, building.exterior);
  body.addColorStop(.7, "#728496");
  body.addColorStop(1, "#1a2633");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(left + shoulder, top);
  ctx.lineTo(right - shoulder, top);
  ctx.quadraticCurveTo(right, top, right, top + shoulder);
  ctx.lineTo(right, y - shoulder);
  ctx.quadraticCurveTo(right, y, right - shoulder, y);
  ctx.lineTo(left + shoulder, y);
  ctx.quadraticCurveTo(left, y, left, y - shoulder);
  ctx.lineTo(left, top + shoulder);
  ctx.quadraticCurveTo(left, top, left + shoulder, top);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = colorWithAlpha(building.trim, .55);
  ctx.lineWidth = Math.max(2, scale);
  for (let rib = 1; rib < 6; rib++) {
    const ribX = left + (right - left) * rib / 6;
    ctx.beginPath();
    ctx.moveTo(ribX, top + 4);
    ctx.lineTo(ribX, y - 4);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(12, 25, 34, .92)";
  ctx.fillRect(x - w * .36, y - h * .68, w * .17, h * .2);
  ctx.fillRect(x + w * .19, y - h * .68, w * .17, h * .2);
  ctx.strokeStyle = colorWithAlpha(building.accent, .7);
  ctx.strokeRect(x - w * .36, y - h * .68, w * .17, h * .2);
  ctx.strokeRect(x + w * .19, y - h * .68, w * .17, h * .2);

  if (building.structureType === "airlock") {
    ctx.fillStyle = "rgba(9, 16, 22, .96)";
    ctx.beginPath();
    ctx.arc(x, y - h * .34, w * .19, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = nearEntrance ? building.accent : colorWithAlpha(building.trim, .72);
    ctx.lineWidth = Math.max(3, w * .025);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - w * .13, y - h * .34);
    ctx.lineTo(x + w * .13, y - h * .34);
    ctx.moveTo(x, y - h * .47);
    ctx.lineTo(x, y - h * .21);
    ctx.stroke();
  } else {
    drawExteriorDoor(x, y, w * .18, h * .48, building, nearEntrance);
  }
  drawBuildingSign(x, y - h * .02, w, h * .9, building);
}

function drawTentExterior(x, y, w, h, building, nearEntrance) {
  ctx.fillStyle = building.roof;
  ctx.beginPath();
  ctx.moveTo(x - w * .55, y);
  ctx.lineTo(x, y - h);
  ctx.lineTo(x + w * .55, y);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = colorWithAlpha(building.exterior, .88);
  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.lineTo(x + w * .55, y);
  ctx.lineTo(x + w * .08, y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = colorWithAlpha(building.trim, .82);
  ctx.lineWidth = Math.max(2, w * .012);
  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.lineTo(x - w * .7, y + 5);
  ctx.moveTo(x, y - h);
  ctx.lineTo(x + w * .7, y + 5);
  ctx.stroke();
  ctx.fillStyle = building.trim;
  ctx.fillRect(x - w * .72, y + 2, w * .06, Math.max(3, h * .035));
  ctx.fillRect(x + w * .66, y + 2, w * .06, Math.max(3, h * .035));

  ctx.fillStyle = "rgba(8, 11, 10, .9)";
  ctx.beginPath();
  ctx.moveTo(x, y - h * .6);
  ctx.lineTo(x - w * .13, y);
  ctx.lineTo(x + w * .13, y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = building.accent;
  ctx.globalAlpha = nearEntrance ? .98 : .58;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = colorWithAlpha(building.trim, .38);
  ctx.lineWidth = Math.max(1, w * .008);
  ctx.beginPath();
  ctx.moveTo(x - w * .28, y - h * .5);
  ctx.lineTo(x, y - h);
  ctx.moveTo(x + w * .28, y - h * .5);
  ctx.lineTo(x, y - h);
  ctx.stroke();
  ctx.fillStyle = "rgba(53, 48, 36, .48)";
  ctx.fillRect(x - w * .5, y - h * .08, w, h * .08);

  const placardW = w * .34;
  ctx.fillStyle = "rgba(17, 20, 17, .84)";
  ctx.fillRect(x + w * .17, y - h * .37, placardW, h * .13);
  ctx.fillStyle = "#edf0df";
  ctx.font = `700 ${clamp(h * .055, 7, 12)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(building.name.toUpperCase(), x + w * .34, y - h * .305, placardW - 6);
}

function drawTowerExterior(x, y, w, h, building, nearEntrance, scale) {
  const platformY = y - h * .48;
  ctx.strokeStyle = building.roof;
  ctx.lineWidth = Math.max(5, w * .07);
  ctx.beginPath();
  ctx.moveTo(x - w * .3, y);
  ctx.lineTo(x - w * .2, platformY);
  ctx.moveTo(x + w * .3, y);
  ctx.lineTo(x + w * .2, platformY);
  ctx.moveTo(x - w * .27, y - h * .12);
  ctx.lineTo(x + w * .23, y - h * .34);
  ctx.moveTo(x + w * .27, y - h * .12);
  ctx.lineTo(x - w * .23, y - h * .34);
  ctx.stroke();

  ctx.fillStyle = building.roof;
  ctx.fillRect(x - w * .48, platformY, w * .96, Math.max(5, h * .055));
  ctx.fillStyle = building.exterior;
  ctx.fillRect(x - w * .37, y - h * .86, w * .74, h * .38);
  ctx.fillStyle = building.roof;
  ctx.fillRect(x - w * .44, y - h * .94, w * .88, h * .09);
  ctx.strokeStyle = colorWithAlpha(building.trim, .72);
  ctx.lineWidth = Math.max(2, w * .018);
  ctx.strokeRect(x - w * .5, y - h * .98, w, h * .53);
  drawExteriorWindow(x - w * .2, y - h * .78, w * .18, h * .12, scale);
  drawExteriorWindow(x + w * .2, y - h * .78, w * .18, h * .12, scale);
  drawExteriorDoor(x, platformY, w * .22, h * .26, building, nearEntrance);

  ctx.strokeStyle = building.accent;
  ctx.globalAlpha = .64;
  ctx.lineWidth = Math.max(2, w * .025);
  ctx.beginPath();
  ctx.moveTo(x - w * .08, platformY);
  ctx.lineTo(x - w * .08, y);
  ctx.moveTo(x + w * .08, platformY);
  ctx.lineTo(x + w * .08, y);
  for (let rung = 1; rung < 7; rung++) {
    const rungY = platformY + (y - platformY) * rung / 7;
    ctx.moveTo(x - w * .08, rungY);
    ctx.lineTo(x + w * .08, rungY);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = colorWithAlpha(building.trim, .72);
  ctx.lineWidth = Math.max(2, scale);
  ctx.beginPath();
  ctx.moveTo(x - w * .48, y - h * .98);
  ctx.lineTo(x - w * .48, y - h * 1.08);
  ctx.moveTo(x + w * .48, y - h * .98);
  ctx.lineTo(x + w * .48, y - h * 1.08);
  ctx.moveTo(x - w * .48, y - h * 1.06);
  ctx.lineTo(x + w * .48, y - h * 1.06);
  ctx.stroke();
}

function drawBunkerExterior(x, y, w, h, building, nearEntrance) {
  ctx.fillStyle = "rgba(17, 21, 20, .72)";
  ctx.beginPath();
  ctx.moveTo(x + w * .31, y - h * .88);
  ctx.lineTo(x + w * .5, y - h * .69);
  ctx.lineTo(x + w * .57, y - h * .08);
  ctx.lineTo(x + w * .52, y);
  ctx.lineTo(x + w * .46, y - h * .62);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = building.exterior;
  ctx.beginPath();
  ctx.moveTo(x - w * .52, y);
  ctx.lineTo(x - w * .46, y - h * .62);
  ctx.lineTo(x - w * .31, y - h * .88);
  ctx.lineTo(x + w * .31, y - h * .88);
  ctx.lineTo(x + w * .46, y - h * .62);
  ctx.lineTo(x + w * .52, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = building.roof;
  ctx.fillRect(x - w * .34, y - h * .92, w * .68, h * .09);
  ctx.strokeStyle = "rgba(229, 224, 203, .18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y - h * .88);
  ctx.lineTo(x, y);
  ctx.moveTo(x - w * .48, y - h * .34);
  ctx.lineTo(x + w * .48, y - h * .34);
  ctx.stroke();
  ctx.fillStyle = "rgba(6, 10, 12, .86)";
  ctx.fillRect(x - w * .42, y - h * .6, w * .23, Math.max(5, h * .09));
  ctx.fillRect(x + w * .19, y - h * .6, w * .23, Math.max(5, h * .09));
  drawExteriorDoor(x, y, w * .18, h * .58, building, nearEntrance);
  for (const side of [-1, 1]) {
    ctx.fillStyle = colorWithAlpha(building.trim, .72);
    for (let bag = 0; bag < 3; bag++) {
      ctx.beginPath();
      ctx.ellipse(
        x + side * (w * .2 + bag * w * .08),
        y - h * .04,
        w * .075,
        h * .07,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }
  drawBuildingSign(x, y - h * .02, w * .72, h * .72, building);
}

function drawDomeExterior(x, y, w, h, building, nearEntrance) {
  ctx.fillStyle = "rgba(10, 17, 21, .92)";
  ctx.beginPath();
  ctx.ellipse(x, y - h * .02, w * .55, h * .12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = building.exterior;
  ctx.beginPath();
  ctx.moveTo(x - w * .52, y);
  ctx.quadraticCurveTo(x - w * .46, y - h, x, y - h * 1.04);
  ctx.quadraticCurveTo(x + w * .46, y - h, x + w * .52, y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = colorWithAlpha(building.trim, .58);
  ctx.lineWidth = Math.max(1.5, w * .01);
  for (let band = 1; band <= 3; band++) {
    const bandY = y - h * band * .2;
    ctx.beginPath();
    ctx.moveTo(x - w * (.5 - band * .05), bandY);
    ctx.quadraticCurveTo(x, bandY - h * .16, x + w * (.5 - band * .05), bandY);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(x, y - h * 1.03);
  ctx.lineTo(x, y);
  ctx.stroke();
  for (const side of [-1, 1]) {
    ctx.fillStyle = "rgba(17, 38, 50, .9)";
    ctx.beginPath();
    ctx.arc(x + side * w * .24, y - h * .48, w * .075, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colorWithAlpha(building.accent, .62);
    ctx.stroke();
  }
  drawExteriorDoor(x, y, w * .18, h * .46, building, nearEntrance);
  drawBuildingSign(x, y - h * .02, w * .76, h * .88, building);
}

function drawExteriorFoundation(x, y, w, h, building, type) {
  ctx.save();
  if (type === "tent") {
    ctx.fillStyle = "rgba(28, 26, 20, .72)";
    ctx.beginPath();
    ctx.moveTo(x - w * .58, y - h * .03);
    ctx.lineTo(x + w * .58, y - h * .03);
    ctx.lineTo(x + w * .48, y + h * .06);
    ctx.lineTo(x - w * .48, y + h * .06);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    return;
  }

  if (type === "tower") {
    ctx.fillStyle = "rgba(47, 49, 46, .96)";
    for (const side of [-1, 1]) {
      ctx.fillRect(x + side * w * .28 - w * .09, y - h * .05, w * .18, h * .11);
    }
    ctx.restore();
    return;
  }

  const slab = ctx.createLinearGradient(0, y - h * .04, 0, y + h * .1);
  slab.addColorStop(0, mixHexColors(building.roof, "#a5a39a", .34));
  slab.addColorStop(1, "rgba(28, 31, 31, .98)");
  ctx.fillStyle = slab;
  ctx.beginPath();
  ctx.moveTo(x - w * .54, y - h * .035);
  ctx.lineTo(x + w * .54, y - h * .035);
  ctx.lineTo(x + w * .48, y + h * .07);
  ctx.lineTo(x - w * .48, y + h * .07);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(233, 237, 226, .16)";
  ctx.stroke();

  ctx.fillStyle = "rgba(39, 42, 41, .98)";
  ctx.fillRect(x - w * .16, y, w * .32, h * .08);
  ctx.fillStyle = "rgba(82, 83, 77, .92)";
  ctx.fillRect(x - w * .12, y + h * .035, w * .24, h * .055);
  ctx.restore();
}

function drawExteriorSideDepth(x, y, w, h, building) {
  const direction = building.index % 2 === 0 ? 1 : -1;
  const depth = clamp(w * .115, 11, 42);
  const edgeX = x + direction * w / 2;
  const offsetX = direction * depth;
  const offsetY = -depth * .34;
  const side = ctx.createLinearGradient(edgeX, 0, edgeX + offsetX, 0);
  side.addColorStop(0, mixHexColors(building.exterior, "#11171a", .48));
  side.addColorStop(1, "rgba(12, 17, 20, .98)");
  ctx.fillStyle = side;
  ctx.beginPath();
  ctx.moveTo(edgeX, y - h);
  ctx.lineTo(edgeX + offsetX, y - h + offsetY);
  ctx.lineTo(edgeX + offsetX, y + offsetY);
  ctx.lineTo(edgeX, y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(229, 236, 234, .14)";
  ctx.lineWidth = 1;
  for (let seam = 1; seam < 4; seam++) {
    const seamY = y - h + h * seam / 4;
    ctx.beginPath();
    ctx.moveTo(edgeX, seamY);
    ctx.lineTo(edgeX + offsetX, seamY + offsetY);
    ctx.stroke();
  }
}

function drawExteriorWeathering(x, y, w, h, building) {
  const dirt = ctx.createLinearGradient(0, y - h * .24, 0, y);
  dirt.addColorStop(0, "rgba(28, 24, 18, 0)");
  dirt.addColorStop(1, "rgba(24, 21, 17, .42)");
  ctx.fillStyle = dirt;
  ctx.fillRect(x - w / 2, y - h * .24, w, h * .24);

  ctx.strokeStyle = "rgba(22, 24, 22, .24)";
  ctx.lineWidth = Math.max(1, w * .006);
  const seed = building.index + building.name.length;
  for (let stain = 0; stain < 3; stain++) {
    const stainX = x - w * .4 + w * (((seed * 17 + stain * 31) % 79) / 100);
    const stainTop = y - h * (.78 - stain * .17);
    ctx.beginPath();
    ctx.moveTo(stainX, stainTop);
    ctx.lineTo(stainX + w * .015, stainTop + h * (.1 + stain * .025));
    ctx.lineTo(stainX - w * .01, stainTop + h * (.18 + stain * .025));
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(235, 237, 224, .1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - w * .49, y - h * .12);
  ctx.lineTo(x + w * .49, y - h * .12);
  ctx.stroke();
}

function drawBuildingExterior(x, y, scale, building, screenWidth, screenHeight) {
  const w = clamp(building.width * scale, 100, screenWidth * .86);
  const h = clamp(building.height * scale, 82, screenHeight * .76);
  const nearest = activeBuilding();
  const nearEntrance = nearest.id === building.id
    && dist(state.player, building) <= building.interactionRadius;
  const type = building.structureType || "office";
  ctx.save();
  ctx.fillStyle = "rgba(4, 7, 9, .42)";
  ctx.beginPath();
  ctx.ellipse(x, y + 5, w * .48, Math.max(10, h * .08), 0, 0, Math.PI * 2);
  ctx.fill();
  drawExteriorFoundation(x, y, w, h, building, type);

  if (nearEntrance) {
    ctx.shadowColor = building.accent;
    ctx.shadowBlur = 22;
  }

  if (type === "tent") {
    drawTentExterior(x, y, w, h, building, nearEntrance);
    ctx.restore();
    return;
  }
  if (type === "highrise") {
    drawHighRiseExterior(x, y, w, h, building, nearEntrance, scale);
    ctx.restore();
    return;
  }
  if (type === "module" || type === "airlock") {
    drawSpaceModuleExterior(x, y, w, h, building, nearEntrance, scale);
    ctx.restore();
    return;
  }
  if (type === "tower") {
    drawTowerExterior(x, y, w, h, building, nearEntrance, scale);
    ctx.restore();
    return;
  }
  if (type === "bunker") {
    drawBunkerExterior(x, y, w, h, building, nearEntrance);
    ctx.restore();
    return;
  }
  if (type === "dome" || type === "pod") {
    drawDomeExterior(x, y, w, h, building, nearEntrance);
    ctx.restore();
    return;
  }

  drawExteriorSideDepth(x, y, w, h, building);
  const facade = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0);
  facade.addColorStop(0, "rgba(25, 31, 34, .98)");
  facade.addColorStop(.18, building.exterior);
  facade.addColorStop(.72, building.exterior);
  facade.addColorStop(1, "rgba(20, 25, 29, .98)");
  ctx.fillStyle = facade;
  ctx.fillRect(x - w / 2, y - h, w, h);
  drawFacadeTexture(x, y, w, h, building, scale);
  drawExteriorWeathering(x, y, w, h, building);
  ctx.shadowBlur = 0;

  const pitchedRoof = [
    "cabin", "lodge", "shed", "barn", "house", "chapel",
    "workshop", "tavern", "school", "stable", "mill", "barracks", "depot"
  ].includes(type);
  if (pitchedRoof) {
    ctx.fillStyle = building.roof;
    ctx.beginPath();
    ctx.moveTo(x - w * .58, y - h);
    ctx.lineTo(x, y - h * 1.28);
    ctx.lineTo(x + w * .58, y - h);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = mixHexColors(building.roof, "#080b0d", .45);
    ctx.beginPath();
    ctx.moveTo(x - w * .58, y - h);
    ctx.lineTo(x + w * .58, y - h);
    ctx.lineTo(x + w * .54, y - h * .94);
    ctx.lineTo(x - w * .54, y - h * .94);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = building.roof;
    ctx.fillRect(x - w * .54, y - h * 1.08, w * 1.08, h * .12);
    ctx.fillStyle = mixHexColors(building.roof, "#080b0d", .42);
    ctx.fillRect(x - w * .54, y - h, w * 1.08, h * .055);
    ctx.fillStyle = building.trim;
    ctx.globalAlpha = .54;
    ctx.fillRect(x - w * .5, y - h, w, Math.max(4, h * .035));
    ctx.globalAlpha = 1;
  }

  const wideEntrance = ["hangar", "garage", "warehouse", "stable"].includes(type);
  const retailFront = ["storefront", "clinic", "arcade", "cinema", "lobby"].includes(type);
  if (type === "apartment") {
    for (let floor = 0; floor < 3; floor++) {
      for (let column = -1; column <= 1; column++) {
        drawExteriorWindow(
          x + column * w * .27,
          y - h * (.84 - floor * .23),
          w * .14,
          h * .14,
          scale
        );
      }
    }
  } else if (retailFront) {
    drawExteriorWindow(x - w * .27, y - h * .58, w * .27, h * .38, scale);
    drawExteriorWindow(x + w * .27, y - h * .58, w * .27, h * .38, scale);
  } else if (!wideEntrance) {
    drawExteriorWindow(x - w * .27, y - h * .68, w * .18, h * .2, scale);
    drawExteriorWindow(x + w * .27, y - h * .68, w * .18, h * .2, scale);
  } else {
    drawExteriorWindow(x - w * .38, y - h * .72, w * .1, h * .16, scale);
    drawExteriorWindow(x + w * .38, y - h * .72, w * .1, h * .16, scale);
  }

  drawExteriorDoor(
    x,
    y,
    w * (wideEntrance ? .48 : .2),
    h * (wideEntrance ? .58 : .52),
    building,
    nearEntrance
  );
  if (wideEntrance) {
    ctx.strokeStyle = colorWithAlpha(building.trim, .4);
    ctx.lineWidth = Math.max(1, scale);
    for (let panel = -1; panel <= 1; panel++) {
      ctx.beginPath();
      ctx.moveTo(x + panel * w * .12, y - h * .56);
      ctx.lineTo(x + panel * w * .12, y - h * .03);
      ctx.stroke();
    }
  }

  ctx.fillStyle = building.trim;
  ctx.fillRect(x - w * .18, y - h * .94, w * .36, Math.max(5, h * .055));
  if (type === "kiosk" || retailFront) {
    ctx.fillStyle = building.accent;
    ctx.globalAlpha = .56;
    ctx.fillRect(x - w * .55, y - h * .58, w * 1.1, Math.max(6, h * .1));
    ctx.globalAlpha = 1;
  }
  if (["cabin", "lodge", "house", "tavern", "school"].includes(type)) {
    ctx.fillStyle = "#2a2621";
    ctx.fillRect(x + w * .27, y - h * 1.22, w * .11, h * .3);
    ctx.fillStyle = "rgba(203, 210, 203, .18)";
    ctx.beginPath();
    ctx.ellipse(x + w * .325, y - h * 1.29, w * .07, h * .11, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  if (["office", "service", "annex", "archive", "cinema"].includes(type)) {
    ctx.fillStyle = "rgba(19, 27, 31, .94)";
    ctx.fillRect(x + w * .2, y - h * 1.18, w * .22, h * .1);
    ctx.strokeStyle = "rgba(222, 235, 235, .22)";
    for (let vent = 1; vent < 4; vent++) {
      const ventX = x + w * (.2 + vent * .055);
      ctx.beginPath();
      ctx.moveTo(ventX, y - h * 1.17);
      ctx.lineTo(ventX, y - h * 1.09);
      ctx.stroke();
    }
  }
  if (type === "chapel") {
    ctx.fillStyle = building.roof;
    ctx.beginPath();
    ctx.moveTo(x - w * .14, y - h * 1.12);
    ctx.lineTo(x, y - h * 1.52);
    ctx.lineTo(x + w * .14, y - h * 1.12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(7, 9, 10, .82)";
    ctx.beginPath();
    ctx.arc(x, y - h * 1.24, w * .045, 0, Math.PI * 2);
    ctx.fill();
  }
  if (type === "mill") {
    const hubX = x + w * .27;
    const hubY = y - h * .8;
    ctx.strokeStyle = building.roof;
    ctx.lineWidth = Math.max(3, w * .025);
    for (let blade = 0; blade < 4; blade++) {
      const angle = blade * Math.PI / 2 + .4;
      ctx.beginPath();
      ctx.moveTo(hubX, hubY);
      ctx.lineTo(hubX + Math.cos(angle) * w * .32, hubY + Math.sin(angle) * w * .32);
      ctx.stroke();
    }
    ctx.fillStyle = building.trim;
    ctx.beginPath();
    ctx.arc(hubX, hubY, Math.max(4, w * .045), 0, Math.PI * 2);
    ctx.fill();
  }
  drawBuildingSign(x, y, w, h, building);
  ctx.strokeStyle = "rgba(255,255,255,.16)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x - w / 2, y - h, w, h);
  ctx.restore();
}

function drawInteriorWall(x, y, scale, wall, building, screenWidth, screenHeight) {
  const width = clamp(wall.width * scale, 34, screenWidth * .78);
  const height = clamp(wall.height * scale, 28, screenHeight * .78);
  const depth = clamp(wall.depth * scale, 5, 34);
  const left = x - width / 2;
  const top = y - height;
  const palette = interiorPaletteFor(building, wall.roomKind || interiorKindFor(building));

  ctx.save();
  ctx.fillStyle = "rgba(3, 6, 8, .36)";
  ctx.fillRect(left + depth * .28, top + depth * .36, width, height);

  const face = ctx.createLinearGradient(left, 0, left + width, 0);
  face.addColorStop(0, mixHexColors(palette.wallLow, palette.wall, .3));
  face.addColorStop(.16, palette.wall);
  face.addColorStop(.82, palette.wall);
  face.addColorStop(1, palette.wallLow);
  ctx.fillStyle = face;
  ctx.fillRect(left, top, width, height);

  ctx.fillStyle = mixHexColors(palette.wallLow, building.ceiling, .35);
  if (wall.side === "left") {
    ctx.beginPath();
    ctx.moveTo(left + width, top);
    ctx.lineTo(left + width + depth, top + depth * .35);
    ctx.lineTo(left + width + depth, y);
    ctx.lineTo(left + width, y);
    ctx.closePath();
    ctx.fill();
  } else if (wall.side === "right") {
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left - depth, top + depth * .35);
    ctx.lineTo(left - depth, y);
    ctx.lineTo(left, y);
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = palette.line;
  ctx.lineWidth = Math.max(1, scale * .55);
  if (wall.roomKind === "rustic") {
    for (let board = 1; board < 6; board++) {
      const boardY = top + height * board / 6;
      ctx.beginPath();
      ctx.moveTo(left, boardY);
      ctx.lineTo(left + width, boardY);
      ctx.stroke();
    }
    ctx.fillStyle = colorWithAlpha(building.trim, .64);
    ctx.fillRect(left, top, Math.max(5, width * .045), height);
    ctx.fillRect(left + width - Math.max(5, width * .045), top, Math.max(5, width * .045), height);
  } else if (wall.roomKind === "space") {
    for (let panel = 1; panel < 4; panel++) {
      const panelX = left + width * panel / 4;
      ctx.beginPath();
      ctx.moveTo(panelX, top);
      ctx.lineTo(panelX, y);
      ctx.stroke();
    }
    ctx.strokeStyle = colorWithAlpha(building.accent, .48);
    ctx.strokeRect(left + width * .04, top + height * .08, width * .92, height * .82);
  } else if (wall.roomKind === "industrial" || wall.roomKind === "military") {
    for (let panel = 1; panel < 5; panel++) {
      const panelX = left + width * panel / 5;
      ctx.beginPath();
      ctx.moveTo(panelX, top);
      ctx.lineTo(panelX, y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(12, 17, 18, .32)";
    ctx.fillRect(left, top + height * .42, width, Math.max(4, height * .08));
  } else {
    ctx.strokeRect(left + width * .045, top + height * .08, width * .91, height * .82);
    ctx.beginPath();
    ctx.moveTo(x, top + height * .08);
    ctx.lineTo(x, y - height * .1);
    ctx.stroke();
  }

  const trimHeight = clamp(height * .055, 5, 16);
  ctx.fillStyle = colorWithAlpha(building.trim, .82);
  ctx.fillRect(left, y - trimHeight, width, trimHeight);
  ctx.fillStyle = colorWithAlpha(building.ceiling, .9);
  ctx.fillRect(left, top, width, Math.max(4, trimHeight * .65));

  if (wall.side === "left" || wall.side === "right") {
    const frameWidth = clamp(depth * .7, 5, 18);
    const frameX = wall.side === "left" ? left + width - frameWidth : left;
    ctx.fillStyle = building.trim;
    ctx.fillRect(frameX, top, frameWidth, height);
    ctx.fillStyle = colorWithAlpha(building.accent, .5);
    ctx.fillRect(
      wall.side === "left" ? frameX - 2 : frameX + frameWidth,
      top,
      2,
      height
    );
  }

  ctx.strokeStyle = "rgba(238, 244, 241, .2)";
  ctx.lineWidth = 1;
  ctx.strokeRect(left, top, width, height);
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
    if (prop.detailType === "toolbox") {
      ctx.fillStyle = "rgba(20, 25, 27, .9)";
      ctx.fillRect(left + width * .28, top - height * .08, width * .44, height * .12);
      ctx.fillStyle = "rgba(227, 214, 168, .74)";
      ctx.fillRect(left + width * .15, top + height * .45, width * .7, Math.max(2, height * .08));
    }
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
  } else if (prop.type === "forklift") {
    ctx.fillStyle = "#c99b35";
    ctx.fillRect(left, top + height * .46, width * .78, height * .44);
    ctx.fillStyle = "rgba(16, 21, 23, .96)";
    ctx.fillRect(left + width * .2, top + height * .16, width * .48, height * .34);
    ctx.fillStyle = "#20272c";
    for (const wheelX of [left + width * .18, left + width * .66]) {
      ctx.beginPath();
      ctx.arc(wheelX, top + height * .9, width * .14, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "#252d31";
    ctx.lineWidth = Math.max(3, width * .07);
    ctx.beginPath();
    ctx.moveTo(left + width * .82, top + height * .06);
    ctx.lineTo(left + width * .82, top + height);
    ctx.moveTo(left + width * .95, top + height * .06);
    ctx.lineTo(left + width * .95, top + height);
    ctx.stroke();
    ctx.lineWidth = Math.max(2, width * .04);
    ctx.beginPath();
    ctx.moveTo(left + width * .82, top + height * .84);
    ctx.lineTo(left + width * 1.18, top + height * .84);
    ctx.stroke();
  } else if (prop.type === "stove") {
    ctx.fillStyle = "rgba(25, 28, 27, .98)";
    ctx.fillRect(left, top + height * .18, width, height * .82);
    ctx.fillStyle = "rgba(8, 10, 10, .96)";
    ctx.fillRect(left + width * .14, top + height * .38, width * .72, height * .4);
    ctx.strokeStyle = "rgba(231, 225, 200, .3)";
    ctx.strokeRect(left + width * .14, top + height * .38, width * .72, height * .4);
    ctx.fillStyle = "rgba(207, 96, 42, .48)";
    ctx.fillRect(left + width * .25, top + height * .5, width * .5, height * .13);
    ctx.fillStyle = "#22282a";
    ctx.fillRect(x - width * .09, top - height * .2, width * .18, height * .38);
  } else if (prop.type === "server") {
    ctx.fillStyle = "rgba(11, 16, 21, .98)";
    ctx.fillRect(left, top, width, height);
    ctx.strokeStyle = "rgba(205, 222, 228, .22)";
    for (let rack = 1; rack < 8; rack++) {
      const rackY = top + height * rack / 8;
      ctx.beginPath();
      ctx.moveTo(left + width * .08, rackY);
      ctx.lineTo(left + width * .92, rackY);
      ctx.stroke();
    }
    for (let led = 0; led < 6; led++) {
      ctx.fillStyle = led % 3 === 0 ? "#ffbc55" : buildingThemes["Space station"].accent;
      ctx.fillRect(left + width * (.18 + (led % 2) * .45), top + height * (.15 + Math.floor(led / 2) * .24), 3, 3);
    }
  } else if (prop.type === "grainSack") {
    ctx.fillStyle = light;
    ctx.beginPath();
    ctx.moveTo(x - width * .34, top + height * .16);
    ctx.quadraticCurveTo(left, top + height * .5, x - width * .4, y);
    ctx.lineTo(x + width * .4, y);
    ctx.quadraticCurveTo(left + width, top + height * .5, x + width * .34, top + height * .16);
    ctx.quadraticCurveTo(x, top, x - width * .34, top + height * .16);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(64, 48, 29, .54)";
    ctx.beginPath();
    ctx.moveTo(x - width * .3, top + height * .18);
    ctx.lineTo(x + width * .3, top + height * .18);
    ctx.stroke();
  } else if (prop.type === "gearbox") {
    ctx.fillStyle = "rgba(24, 30, 32, .98)";
    ctx.fillRect(left, top + height * .24, width, height * .76);
    ctx.strokeStyle = light;
    ctx.lineWidth = Math.max(2, scale);
    for (const [gearX, gearY, gearR] of [[.35, .55, .2], [.68, .66, .16]]) {
      ctx.beginPath();
      ctx.arc(left + width * gearX, top + height * gearY, width * gearR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(left + width * gearX, top + height * gearY, width * gearR * .3, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (prop.type === "arcade") {
    ctx.fillStyle = "rgba(21, 20, 29, .98)";
    ctx.beginPath();
    ctx.moveTo(left + width * .08, top);
    ctx.lineTo(left + width * .92, top);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = light;
    ctx.shadowBlur = 9;
    ctx.fillStyle = light;
    ctx.fillRect(left + width * .16, top + height * .16, width * .68, height * .34);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(10, 12, 17, .92)";
    ctx.fillRect(left + width * .12, top + height * .58, width * .76, height * .13);
    ctx.fillStyle = "#f04f68";
    ctx.beginPath();
    ctx.arc(left + width * .66, top + height * .64, width * .06, 0, Math.PI * 2);
    ctx.fill();
  } else if (prop.type === "camera") {
    ctx.strokeStyle = "rgba(30, 36, 39, .98)";
    ctx.lineWidth = Math.max(3, width * .07);
    ctx.beginPath();
    ctx.moveTo(x, top + height * .35);
    ctx.lineTo(left + width * .18, y);
    ctx.moveTo(x, top + height * .35);
    ctx.lineTo(left + width * .82, y);
    ctx.moveTo(x, top + height * .35);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(18, 23, 27, .98)";
    ctx.fillRect(left + width * .12, top, width * .76, height * .32);
    ctx.fillStyle = light;
    ctx.beginPath();
    ctx.arc(left + width * .82, top + height * .16, width * .14, 0, Math.PI * 2);
    ctx.fill();
  } else if (prop.type === "lightStand") {
    ctx.strokeStyle = "rgba(31, 37, 39, .98)";
    ctx.lineWidth = Math.max(3, width * .08);
    ctx.beginPath();
    ctx.moveTo(x, top + height * .18);
    ctx.lineTo(x, y);
    ctx.moveTo(x, y - height * .2);
    ctx.lineTo(left + width * .16, y);
    ctx.moveTo(x, y - height * .2);
    ctx.lineTo(left + width * .84, y);
    ctx.stroke();
    ctx.fillStyle = light;
    ctx.shadowColor = light;
    ctx.shadowBlur = 14;
    ctx.fillRect(left + width * .05, top, width * .9, height * .22);
    ctx.shadowBlur = 0;
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
      if (prop.detailType === "ammoRack") {
        ctx.fillStyle = "#b59046";
        for (let ammo = 0; ammo < 6; ammo++) {
          ctx.fillRect(
            left + width * (.14 + (ammo % 3) * .27),
            top + height * (.18 + Math.floor(ammo / 3) * .42),
            width * .1,
            height * .18
          );
        }
      }
      if (prop.detailType === "bookshelf" || prop.detailType === "fileCabinet") {
        const colors = ["#8e4d3e", "#546f87", "#aa8e4d", "#496a55"];
        for (let book = 0; book < 8; book++) {
          ctx.fillStyle = colors[book % colors.length];
          ctx.fillRect(
            left + width * (.12 + (book % 4) * .2),
            top + height * (.17 + Math.floor(book / 4) * .48),
            width * .12,
            height * .19
          );
        }
      }
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
      if (prop.detailType === "checkout") {
        ctx.fillStyle = "rgba(15, 20, 22, .96)";
        ctx.fillRect(left + width * .55, top - height * .22, width * .28, height * .25);
        ctx.fillStyle = light;
        ctx.fillRect(left + width * .61, top - height * .18, width * .16, height * .1);
      }
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
    if (prop.detailType === "medical") {
      ctx.fillStyle = "#f4f1e9";
      ctx.fillRect(left + width * .16, top + height * .35, width * .2, height * .07);
      ctx.fillRect(left + width * .225, top + height * .285, width * .07, height * .2);
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
    const point = screenPoint(particle, width, horizon, particle.height ?? 18);
    if (!point) continue;
    if (particle.surfaceEffect) {
      if (particle.area !== impactAreaKey()) continue;
      if (surfaceEffectOccludedByEnemy(point.x, point.y, point.depth, width, horizon)) continue;
    }
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

  if (state.dashFlash > 0) {
    const alpha = clamp(state.dashFlash / .24, 0, 1);
    ctx.save();
    ctx.strokeStyle = `rgba(116, 215, 255, ${alpha * .72})`;
    ctx.lineWidth = 2;
    for (let line = 0; line < 12; line++) {
      const side = line % 2 === 0 ? -1 : 1;
      const y = height * (.18 + (line % 6) * .13);
      const outerX = side < 0 ? 0 : width;
      const innerX = width / 2 + side * width * (.25 + (line % 3) * .04);
      ctx.beginPath();
      ctx.moveTo(outerX, y);
      ctx.lineTo(innerX, y + (line % 2 ? 12 : -12));
      ctx.stroke();
    }
    ctx.restore();
  }

  if (state.player.guarding || state.guardFlash > 0) {
    const alpha = state.player.guarding ? .48 : clamp(state.guardFlash / .2, 0, 1) * .7;
    ctx.save();
    ctx.strokeStyle = `rgba(116, 215, 255, ${alpha})`;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) * .18, Math.PI * 1.12, Math.PI * 1.88);
    ctx.stroke();
    ctx.restore();
  }

  if (state.comboHits >= 2 && state.comboTimer > 0) {
    const alpha = clamp(state.comboTimer / .35, 0, 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffe37a";
    ctx.font = "900 30px sans-serif";
    ctx.shadowColor = "rgba(0,0,0,.75)";
    ctx.shadowBlur = 12;
    ctx.fillText(`${state.comboHits} HIT COMBO`, width * .72, height * .42);
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

function drawBed(x, y, scale, bed) {
  const width = clamp(112 * scale, 24, 150);
  const height = clamp(48 * scale, 14, 70);
  const teamColor = TEAM_COLORS[bed.team] || "#8f3438";
  const healthRatio = clamp(bed.health / bed.maxHealth, 0, 1);
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, .38)";
  ctx.beginPath();
  ctx.ellipse(x, y + 3, width * .58, height * .22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#20262c";
  ctx.fillRect(x - width * .5, y - height * .55, width, height * .54);
  ctx.fillStyle = teamColor;
  ctx.fillRect(x - width * .46, y - height * .86, width * .92, height * .48);
  ctx.fillStyle = "rgba(255,255,255,.3)";
  ctx.fillRect(x - width * .4, y - height * .79, width * .26, height * .22);
  ctx.fillStyle = "#161b20";
  ctx.fillRect(x - width * .44, y - height * .08, width * .11, height * .3);
  ctx.fillRect(x + width * .33, y - height * .08, width * .11, height * .3);
  ctx.strokeStyle = "rgba(255,255,255,.24)";
  ctx.lineWidth = Math.max(1, scale * 2);
  ctx.strokeRect(x - width * .5, y - height * .86, width, height * .82);
  ctx.fillStyle = "rgba(0,0,0,.65)";
  ctx.fillRect(x - width * .5, y - height - 10, width, 6);
  ctx.fillStyle = healthRatio > .45 ? "#67e08a" : "#ff6b6b";
  ctx.fillRect(x - width * .5 + 1, y - height - 9, (width - 2) * healthRatio, 4);
  ctx.fillStyle = "#eef5f7";
  ctx.font = `700 ${clamp(12 * scale, 9, 15)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(`${bed.team.toUpperCase()} BED`, x, y - height - 15);
  ctx.restore();
}

function drawTrap(x, y, scale, trap) {
  const r = clamp(trap.radius * scale, 8, 48);
  ctx.save();
  if (trap.type === "mine") {
    ctx.fillStyle = "rgba(0, 0, 0, .32)";
    ctx.beginPath();
    ctx.ellipse(x, y + r * .1, r * .88, r * .34, 0, 0, Math.PI * 2);
    ctx.fill();
    const mine = ctx.createRadialGradient(x - r * .2, y - r * .28, 1, x, y, r * .72);
    mine.addColorStop(0, "#69737b");
    mine.addColorStop(.48, "#30383e");
    mine.addColorStop(1, "#11171b");
    ctx.fillStyle = mine;
    ctx.beginPath();
    ctx.ellipse(x, y - r * .08, r * .72, r * .52, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(218, 226, 226, .38)";
    ctx.lineWidth = Math.max(1, r * .07);
    ctx.stroke();
    ctx.fillStyle = "#9da6a9";
    for (let bolt = 0; bolt < 4; bolt++) {
      const angle = bolt / 4 * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(
        x + Math.cos(angle) * r * .42,
        y - r * .08 + Math.sin(angle) * r * .27,
        Math.max(1.2, r * .055),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.fillStyle = "#ff5d63";
    ctx.beginPath();
    ctx.arc(x, y - r * .42, Math.max(2, r * .11), 0, Math.PI * 2);
    ctx.fill();
  } else if (trap.type === "snare") {
    ctx.fillStyle = "rgba(0, 0, 0, .34)";
    ctx.beginPath();
    ctx.ellipse(x, y + r * .12, r, r * .34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#9da3a3";
    ctx.lineWidth = Math.max(2, r * .12);
    ctx.beginPath();
    ctx.arc(x - r * .34, y, r * .48, -.95, .95);
    ctx.arc(x + r * .34, y, r * .48, Math.PI - .95, Math.PI + .95);
    ctx.stroke();
    ctx.fillStyle = "#555e62";
    ctx.beginPath();
    ctx.ellipse(x, y, r * .36, r * .2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c3c8c6";
    for (const side of [-1, 1]) {
      for (let tooth = -2; tooth <= 2; tooth++) {
        const toothY = y + tooth * r * .13;
        ctx.beginPath();
        ctx.moveTo(x + side * r * .2, toothY);
        ctx.lineTo(x + side * r * .46, toothY - r * .07);
        ctx.lineTo(x + side * r * .46, toothY + r * .07);
        ctx.closePath();
        ctx.fill();
      }
    }
  } else {
    ctx.fillStyle = trap.type === "pitfall" ? "#69523f" : "#625346";
    ctx.globalAlpha = .78;
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.12, r * .5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    const pit = ctx.createRadialGradient(x, y - r * .05, 1, x, y, r);
    pit.addColorStop(0, "#020304");
    pit.addColorStop(.66, trap.type === "pitfall" ? "#10090a" : "#111315");
    pit.addColorStop(1, "#302820");
    ctx.fillStyle = pit;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * .42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(205, 181, 148, .42)";
    ctx.lineWidth = Math.max(1, r * .06);
    ctx.stroke();
    if (trap.type === "pitfall") {
      ctx.fillStyle = "#d5d8d4";
      for (let spike = -2; spike <= 2; spike++) {
        const spikeX = x + spike * r * .28;
        const spikeHeight = r * (.4 + hashNoise(spike, trap.seed) * .22);
        ctx.beginPath();
        ctx.moveTo(spikeX - r * .08, y + r * .12);
        ctx.lineTo(spikeX, y - spikeHeight);
        ctx.lineTo(spikeX + r * .08, y + r * .12);
        ctx.closePath();
        ctx.fill();
      }
    } else {
      ctx.strokeStyle = "rgba(128, 110, 91, .5)";
      ctx.lineWidth = Math.max(1, r * .05);
      ctx.beginPath();
      ctx.ellipse(x, y + r * .04, r * .7, r * .25, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function characterScreenHeight(scale) {
  const maxHeight = clamp(canvas.clientHeight * .78, 180, 560);
  return clamp(CHARACTER_WORLD_HEIGHT * scale, 18, maxHeight);
}

function drawEnemy(x, y, scale, enemy) {
  const h = characterScreenHeight(scale);
  const w = h * .34;
  const armorColor = enemy.trapped > 0
    ? "#d4a743"
    : usesTeams()
      ? TEAM_COLORS[enemy.team] || "#8f3438"
      : "#8f3438";
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
  if (enemy.guardTimer > 0) {
    ctx.strokeStyle = "rgba(116, 215, 255, .72)";
    ctx.lineWidth = Math.max(2, w * .08);
    ctx.beginPath();
    ctx.arc(x, y - h * .54, w * .9, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWeapon(width, height) {
  const w = weapon();
  const moving = keys.has("w") || keys.has("a") || keys.has("s") || keys.has("d");
  const bob = moving && state.running ? Math.sin(state.time * 9) : 0;
  const swingProgress = state.meleeSwing > 0 ? 1 - state.meleeSwing / .3 : 0;
  const meleePose = state.meleeSwing > 0 ? Math.sin(swingProgress * Math.PI) : 0;
  const guardPose = state.player.guarding ? 1 : 0;
  const x = width * .64 + state.recoil * 26 + bob * 3 - meleePose * 112 - guardPose * 72;
  const y = height * .82 + state.recoil * 38 + Math.abs(bob) * 3 + meleePose * 42 - guardPose * 48;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-.1 - state.recoil * .09 + bob * .004 + meleePose * .76 + guardPose * .3);
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
  ui.healthText.textContent = state.playerRespawnTimer > 0
    ? `RESPAWN ${Math.ceil(state.playerRespawnTimer)}`
    : Math.ceil(p.health);
  ui.staminaText.textContent = p.exhausted ? "REST" : Math.ceil(p.stamina);
  const minutes = Math.floor(state.time / 60).toString().padStart(2, "0");
  const seconds = Math.floor(state.time % 60).toString().padStart(2, "0");
  ui.clockText.textContent = `${minutes}:${seconds}`;
  ui.resourceText.textContent = `Diamonds ${state.diamonds} | Level ${state.level} | Shards ${state.shards}`;
  ui.modeText.textContent = `Mode: ${state.mode}`;
  ui.mapText.textContent = state.insideBuilding
    ? `Map: ${state.map.name} | ${activeBuilding().name}`
    : `Map: ${state.map.name}`;
  if (isRivalDuel()) {
    ui.enemyText.textContent = `Rival: ${state.enemies[0]?.id || "Waiting"}`;
  } else if (usesTeams()) {
    ui.enemyText.textContent = `Enemies: ${aliveOpponents().length} | Allies: ${aliveAllies().length}`;
  } else {
    ui.enemyText.textContent = `Opponents: ${state.enemies.filter(e => e.alive).length}`;
  }
  ui.difficultyText.textContent = `Difficulty: ${state.difficulty}`;
  ui.weaponText.textContent = `Weapon: ${weapon().name}`;
  ui.ammoText.textContent = state.player.reload > 0 ? "Reloading..." : `Ammo: ${state.ammo} / ${weapon().magazine}`;
  const trapSummary = `Mines ${countTraps("mine")} | Snares ${countTraps("snare")} | Holes ${countTraps("hole")} | Spikes ${countTraps("pitfall")}`;
  const bedSummary = isBedwars()
    ? ` | Beds ${state.beds.filter(bed => bed.alive).map(bed => bed.team[0]).join("/") || "none"}`
    : "";
  ui.trapText.textContent = isRivalDuel()
    ? `Mirrored traps | ${trapSummary}`
    : `${trapSummary}${bedSummary}`;
  ui.loadoutText.textContent = `${weapon().name} + ${armor().name}`;

  const fightRival = state.enemies.find(enemy => enemyIsOpponent(enemy)) || state.enemies[0];
  if (isFightMode() && fightRival) {
    ui.fightVitals.classList.remove("hidden");
    ui.playerFightMeter.max = state.armorRank >= 16 ? 190 : 150;
    ui.playerFightMeter.value = p.health;
    ui.playerFightText.textContent = Math.ceil(p.health);
    ui.rivalFightMeter.max = fightRival.maxHealth;
    ui.rivalFightMeter.value = Math.max(0, fightRival.health);
    ui.rivalFightText.textContent = Math.max(0, Math.ceil(fightRival.health));
    ui.rivalFightName.textContent = fightRival.id.toUpperCase();
  } else {
    ui.fightVitals.classList.add("hidden");
  }

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
    let fightBanner = "";
    if (state.mode.includes("1v1")) {
      if (state.duelPhase === "singleCountdown") {
        fightBanner = Math.min(3, Math.max(1, Math.ceil(state.phaseTimer)));
      }
      if (state.duelPhase === "singleFight" && state.phaseTimer > 0) fightBanner = state.roundMessage;
    }
    if (fightBanner) {
      ui.roundBanner.textContent = fightBanner;
      ui.roundBanner.classList.remove("hidden");
    } else {
      ui.roundBanner.classList.add("hidden");
    }
    ui.rewardText.textContent = modeObjectiveText();
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
  if (key === "q" && !event.repeat) playerDash();
  if (key === "v" && !event.repeat) meleeAttack();
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
  ui.overlayTitle.textContent = "Enter the arena";
  ui.overlayBody.textContent = modeObjectiveText();
  addChat(`Mode set to ${state.mode}.`);
  updateUi();
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
