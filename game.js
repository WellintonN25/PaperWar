      // --- DATABASE ---
      const MONSTERS_DB = [
        {
          id: "vermithrax",
          name: "Vermithrax",
          type: "Ancient Dragon",
          role: "attacker",
          element: "fire",
          stars: 5,
          hp: 4200,
          atk: 350,
          def: 250,
          emoji: "🐲",
          img: "src/Vermithrax.png",
          imgAtk: "src/Vermithrax_atk.webp",
          skills: ["melee", "fire", "sup_fire"],
        },
        {
          id: "thyron",
          name: "Thyron",
          type: "Storm Bringer",
          role: "attacker",
          element: "lightning",
          stars: 5,
          hp: 3800,
          atk: 400,
          def: 200,
          emoji: "⚡",
          img: "src/Thyron.png",
          imgBack: "src/backThyron.png",
          imgAtk: "",
          skills: ["melee", "bolt", "sup_lightning"],
        },
        {
          id: "neriah",
          name: "Neriah",
          type: "Ocean Guardian",
          role: "hp",
          element: "water",
          stars: 5,
          hp: 4000,
          atk: 280,
          def: 300,
          emoji: "🧜‍♀️",
          img: "src/Neriah.png",
          imgAtk: "src/Neriah_atk.webp",
          skills: ["melee", "water", "sup_water"],
        },
        {
          id: "aelyra",
          name: "Aelyra",
          type: "Flame Witch",
          role: "attacker",
          element: "fire",
          stars: 5,
          hp: 3600,
          atk: 420,
          def: 180,
          emoji: "🧙‍♀️",
          img: "src/Aelyra.png",
          imgAtk: "src/Aelyra_atk.webp",
          skills: ["melee", "fire", "sup_fire"],
        },
        {
          id: "kaelthar",
          name: "Kaelthar",
          type: "Shadow Knight",
          role: "attacker",
          element: "void",
          stars: 4,
          hp: 3200,
          atk: 320,
          def: 220,
          emoji: "🥷",
          img: "src/Kaelthar.png",
          imgBack: "src/backKaelthar.png",
          imgAtk: "src/atkKaelthar.webp",
          skills: ["melee", "void_slash", "sup_void"],
        },
        {
          id: "dhorak",
          name: "Dhorak",
          type: "Earth Golem",
          role: "defender",
          element: "earth",
          stars: 4,
          hp: 4000,
          atk: 180,
          def: 400,
          emoji: "🗿",
          img: "src/Dhorak.png",
          imgBack: "src/backDhorak.png",
          imgAtk: "src/atkDhorak.webp",
          skills: ["melee", "rock_throw", "sup_earth"],
        },
        {
          id: "vireya",
          name: "Vireya",
          type: "Nature Spirit",
          role: "support",
          element: "nature",
          stars: 3,
          hp: 2000,
          atk: 180,
          def: 140,
          emoji: "🧚‍♀️",
          img: "src/Vireya.png",
          skills: ["melee", "leaf_cutter"],
        },
        {
          id: "brann",
          name: "Brann",
          type: "Fire Warrior",
          role: "attacker",
          element: "fire",
          stars: 3,
          hp: 1900,
          atk: 200,
          def: 120,
          emoji: "🛡️",
          img: "src/Brann.png",
          skills: ["melee", "fire"],
        },
        {
          id: "lysara",
          name: "Lysara",
          type: "Frost Mage",
          role: "attacker",
          element: "water",
          stars: 3,
          hp: 1850,
          atk: 210,
          def: 110,
          emoji: "❄️",
          img: "src/Lysara.png",
          skills: ["melee", "water"],
        },
        {
          id: "lumem",
          name: "Lumem",
          type: "Light Fairy",
          role: "support",
          element: "lightning",
          stars: 2,
          hp: 1500,
          atk: 120,
          def: 80,
          emoji: "🧚",
          img: "src/Lumem.png",
          skills: ["melee", "bolt"],
        },
        {
          id: "ravok",
          name: "Ravok",
          type: "Orc Grunt",
          role: "hp",
          element: "earth",
          stars: 2,
          hp: 1600,
          atk: 110,
          def: 90,
          emoji: "👹",
          img: "src/Ravok.png",
          skills: ["melee", "rock_throw"],
        },
        {
          id: "slime",
          name: "Slime",
          type: "Blob",
          role: "hp",
          element: "water",
          stars: 1,
          hp: 1000,
          atk: 80,
          def: 50,
          emoji: "💧",
          img: "",
          skills: ["melee"],
        },
        {
          id: "bat",
          name: "Bat",
          type: "Cave Bat",
          role: "attacker",
          element: "void",
          stars: 1,
          hp: 800,
          atk: 90,
          def: 30,
          emoji: "🦇",
          img: "",
        },
        // SKILL UP UNIT
        {
          id: "skillupper",
          name: "Skillupper",
          type: "Skill Master",
          role: "support",
          element: "void",
          stars: 5,
          hp: 1,
          atk: 0,
          def: 0,
          emoji: "👿",
          img: "src/devilmon.png",
          skills: ["melee"],
          description: "Use para aumentar o nível de habilidade de qualquer monstro."
        },
        // --- NEW CHARACTERS (WAVE 2) ---
        // 5 STARS (LEGENDARY)
        {
          id: "ignis",
          name: "Ignis",
          type: "Fire Warlord",
          role: "attacker",
          element: "fire",
          stars: 5,
          hp: 4300,
          atk: 380,
          def: 220,
          emoji: "🔥",
          img: "src/ignis.png",
          imgAtk: "src/ignis_atk.webp",
          skills: ["melee", "fire", "meteor_strike"],
        },
        {
          id: "sylphid",
          name: "Sylphid",
          type: "Wind Queen",
          role: "attacker",
          element: "wind",
          stars: 5,
          hp: 3900,
          atk: 370,
          def: 210,
          emoji: "🧚‍♀️",
          img: "src/sylphid.png",
          imgAtk: "src/sylphid_atk.webp",
          skills: ["melee", "wind_blade", "tornado"],
        },
        {
          id: "gaia",
          name: "Gaia",
          type: "Earth Mother",
          role: "hp",
          element: "earth",
          stars: 5,
          hp: 4800,
          atk: 250,
          def: 350,
          emoji: "🌍",
          img: "src/gaia.png",
          imgAtk: "src/gaia_atk.webp",
          skills: ["melee", "earth_shatter", "earthquake"],
        },
        {
          id: "zephyr",
          name: "Zephyr",
          type: "Storm God",
          role: "attacker",
          element: "lightning",
          stars: 5,
          hp: 4100,
          atk: 400,
          def: 180,
          emoji: "🌪️",
          img: "src/zephyr.png",
          imgAtk: "src/zephyr_atk.webp",
          skills: ["melee", "bolt", "thunder_storm"],
        },
        {
          id: "nyx",
          name: "Nyx",
          type: "Void Assassin",
          role: "attacker",
          element: "void",
          stars: 5,
          hp: 3500,
          atk: 500,
          def: 150,
          emoji: "🌙",
          img: "src/nyx.png",
          imgAtk: "src/nyx_atk.webp",
          skills: ["melee", "shadow_strike", "void_slash"],
        },
        {
          id: "glacius",
          name: "Glacius",
          type: "Ice Titan",
          role: "defender",
          element: "water",
          stars: 5,
          hp: 4500,
          atk: 320,
          def: 300,
          emoji: "🧊",
          img: "src/glacius.png",
          imgAtk: "src/glacius_atk.webp",
          skills: ["melee", "ice_shards", "blizzard"],
        },
        {
          id: "metamorph",
          name: "Metamorfo",
          type: "Shapeshifter",
          role: "hp",
          element: "void",
          stars: 5,
          hp: 6000,
          atk: 250,
          def: 200,
          emoji: "🦠",
          img: "src/metamorph.png", 
          skills: ["melee", "sup_void"],
        },

        // 4 STARS (EPIC)
        {
          id: "vulcan",
          name: "Vulcan",
          type: "Smith",
          role: "attacker",
          element: "fire",
          stars: 4,
          hp: 3400,
          atk: 300,
          def: 250,
          emoji: "🔨",
          img: "src/vulcan.png",
          skills: ["melee", "fire"],
        },
        {
          id: "nereid",
          name: "Nereid",
          type: "Mermaid",
          role: "support",
          element: "water",
          stars: 4,
          hp: 3200,
          atk: 290,
          def: 210,
          emoji: "🧜",
          img: "src/nereid.png",
          skills: ["melee", "ice_shards"],
        },
        {
          id: "druid",
          name: "Druid",
          type: "Keeper",
          role: "support",
          element: "nature",
          stars: 4,
          hp: 3500,
          atk: 260,
          def: 260,
          emoji: "🐻",
          img: "src/druid.png",
          skills: ["melee", "poison_cloud"],
        },
        {
          id: "paladin",
          name: "Paladin",
          type: "Knight",
          role: "defender",
          element: "lightning",
          stars: 4,
          hp: 3800,
          atk: 240,
          def: 300,
          emoji: "⚔️",
          img: "src/paladin.png",
          skills: ["melee", "holy_beam"],
        },
        {
          id: "necro",
          name: "Necro",
          type: "Mage",
          role: "attacker",
          element: "void",
          stars: 4,
          hp: 2800,
          atk: 350,
          def: 150,
          emoji: "💀",
          img: "src/necro.png",
          skills: ["melee", "blood_drain"],
        },
        {
          id: "ronin",
          name: "Ronin",
          type: "Samurai",
          role: "attacker",
          element: "wind",
          stars: 4,
          hp: 2900,
          atk: 360,
          def: 180,
          emoji: "🗡️",
          img: "src/ronin.png",
          skills: ["melee", "wind_blade"],
        },

        // 3 STARS (RARE)
        {
          id: "goblin_king",
          name: "Goblin King",
          type: "Goblin",
          role: "attacker",
          element: "earth",
          stars: 3,
          hp: 2200,
          atk: 180,
          def: 150,
          emoji: "👺",
          img: "src/goblin.png",
          skills: ["melee"],
        },
        {
          id: "harpy",
          name: "Harpy",
          type: "Beast",
          element: "wind",
          stars: 3,
          hp: 2000,
          atk: 220,
          def: 110,
          emoji: "🦅",
          img: "src/harpy.png",
          skills: ["melee"],
        },
        {
          id: "stone_giant",
          name: "Stone Giant",
          type: "Construct",
          role: "defender",
          element: "earth",
          stars: 3,
          hp: 2500,
          atk: 150,
          def: 220,
          emoji: "🪨",
          img: "src/golem.png",
          skills: ["melee"],
        },
        {
          id: "lizardman",
          name: "Lizardman",
          type: "Beast",
          element: "water",
          stars: 3,
          hp: 2300,
          atk: 190,
          def: 160,
          emoji: "🦎",
          img: "src/lizard.png",
          skills: ["melee"],
        },
        {
          id: "skeleton_archer",
          name: "Skeleton",
          type: "Undead",
          role: "attacker",
          element: "void",
          stars: 3,
          hp: 1800,
          atk: 240,
          def: 80,
          emoji: "🦴",
          img: "src/skel.png",
          skills: ["melee"],
        },
        {
          id: "fairy",
          name: "Fairy",
          type: "Fey",
          role: "support",
          element: "lightning",
          stars: 3,
          hp: 1600,
          atk: 150,
          def: 120,
          emoji: "🦋",
          img: "src/fairy.png",
          skills: ["melee"],
        },
        {
          id: "imp",
          name: "Imp",
          type: "Demon",
          role: "attacker",
          element: "fire",
          stars: 3,
          hp: 1700,
          atk: 180,
          def: 100,
          emoji: "😈",
          img: "src/imp.png",
          skills: ["melee"],
        },
        {
          id: "wolf",
          name: "Wolf",
          type: "Beast",
          element: "nature",
          stars: 3,
          hp: 2100,
          atk: 170,
          def: 140,
          emoji: "🐺",
          img: "src/wolf.png",
          skills: ["melee"],
        },
      ];

      const SKILLS = {
        melee: { n: "Ataque", p: 1.0, icon: "🗡️", type: "phys", mp: 0 },
        bolt: { n: "Raio", p: 1.5, icon: "⚡", type: "lightning", mp: 20 },
        water: { n: "Jato", p: 1.4, icon: "💧", type: "water", mp: 20 },
        fire: { n: "Brasa", p: 1.6, icon: "🔥", type: "fire", mp: 20 },
        void_slash: {
          n: "Corte Vazio",
          p: 1.8,
          icon: "🟣",
          type: "void",
          mp: 25,
        },
        rock_throw: { n: "Rocha", p: 1.5, icon: "🪨", type: "earth", mp: 20 },
        leaf_cutter: { n: "Folha", p: 1.4, icon: "🍃", type: "nature", mp: 20 },
        sup_lightning: {
          n: "Tempestade",
          p: 3.0,
          icon: "🌩️",
          type: "lightning_sup",
          mp: 50,
        },
        sup_water: {
          n: "Tsunami",
          p: 2.8,
          icon: "🌊",
          type: "water_sup",
          mp: 50,
        },
        sup_fire: {
          n: "Chuva Meteoros",
          p: 3.2,
          icon: "☄️",
          type: "fire_sup",
          mp: 50,
        },
        sup_earth: {
          n: "Avalanche",
          p: 3.0,
          icon: "🌋",
          type: "earth_sup",
          mp: 50,
        },
        sup_void: {
          n: "Devastação",
          p: 3.5,
          icon: "⚫",
          type: "void_sup",
          mp: 60,
        },
        // NEW PREMIUM SKILLS
        ice_shards: {
          n: "Estilhaços",
          p: 1.8,
          icon: "🧊",
          type: "ice_shards",
          mp: 25,
        },
        poison_cloud: {
          n: "Nuvem Tóxica",
          p: 1.5,
          icon: "☠️",
          type: "poison_cloud",
          mp: 30,
        },
        holy_beam: {
          n: "Luz Divina",
          p: 3.0,
          icon: "✨",
          type: "holy_beam",
          mp: 45,
        },
        blood_drain: {
          n: "Drenar Vida",
          p: 1.6,
          icon: "🩸",
          type: "blood_drain",
          mp: 35,
        },
        shadow_strike: {
          n: "Golpe Sombrio",
          p: 2.2,
          icon: "🧛",
          type: "shadow_strike",
          mp: 30,
        },
        thunder_storm: {
          n: "Tempestade",
          p: 2.5,
          icon: "⛈️",
          type: "thunder_storm",
          mp: 50,
        },
        wind_blade: {
          n: "Lâmina de Vento",
          p: 1.7,
          icon: "🌪️",
          type: "wind_blade",
          mp: 25,
        },
        meteor_strike: {
          n: "Meteoro",
          p: 3.2,
          icon: "☄️",
          type: "meteor_strike",
          mp: 55,
        },
        arcane_barrage: {
          n: "Mísseis Arcanos",
          p: 2.0,
          icon: "🔮",
          type: "arcane_barrage",
          mp: 35,
        },
        earth_shatter: {
          n: "Tremor",
          p: 2.1,
          icon: "🧱",
          type: "earth_shatter",
          mp: 40,
        },
        sup_silver_rain: {
          n: "Chuva de Prata",
          p: 3.5,
          icon: "🌧️",
          type: "sup_silver_rain",
          mp: 60,
        },
        sup_black_lotus: {
          n: "Lótus Negra",
          p: 3.8,
          icon: "🪷",
          type: "sup_black_lotus",
          mp: 70,
        },
        sup_dragon_breath: {
          n: "Hálito Dragão",
          p: 4.0,
          icon: "🐲",
          type: "sup_dragon_breath",
          mp: 80,
        },
        sup_ether_chains: {
          n: "Cadeias Éter",
          p: 3.2,
          icon: "⛓️",
          type: "sup_ether_chains",
          mp: 55,
        },
        sup_gravity_pulse: {
          n: "Pulso Gravitacional",
          p: 3.6,
          icon: "🪐",
          type: "sup_gravity_pulse",
          mp: 65,
        },
        sup_ice_butterflies: {
          n: "Butterflies Ice",
          p: 3.4,
          icon: "🦋",
          type: "sup_ice_butterflies",
          mp: 60,
        },
        sup_forest_fury: {
          n: "Fúria Florestal",
          p: 3.7,
          icon: "🌲",
          type: "sup_forest_fury",
          mp: 65,
        },
        sup_celestial_judgement: {
          n: "Julgamento",
          p: 4.5,
          icon: "⚖️",
          type: "sup_celestial_judgement",
          mp: 90,
        },
        sup_plasma_vortex: {
          n: "Vórtice Plasma",
          p: 3.9,
          icon: "🌀",
          type: "sup_plasma_vortex",
          mp: 75,
        },
        sup_dark_comet: {
          n: "Cometa Sombrio",
          p: 4.2,
          icon: "🌠",
          type: "sup_dark_comet",
          mp: 85,
        },
        // NEW ELEMENTAL SKILLS (4)
        crystal_spear: {
          n: "Lança de Cristal",
          p: 1.9,
          icon: "💎",
          type: "crystal_spear",
          mp: 30,
        },
        lava_burst: {
          n: "Erupção de Lava",
          p: 2.0,
          icon: "🌋",
          type: "lava_burst",
          mp: 35,
        },
        chain_lightning: {
          n: "Raio em Cadeia",
          p: 1.75,
          icon: "🔗",
          type: "chain_lightning",
          mp: 28,
        },
        spectral_blade: {
          n: "Lâmina Espectral",
          p: 1.95,
          icon: "👻",
          type: "spectral_blade",
          mp: 32,
        },
        // NEW SUPREME SKILLS (5)
        sup_cosmic_storm: {
          n: "Tempestade Cósmica",
          p: 3.9,
          icon: "🌌",
          type: "sup_cosmic_storm",
          mp: 70,
        },
        sup_infernal_apocalypse: {
          n: "Apocalipse Infernal",
          p: 4.3,
          icon: "👺",
          type: "sup_infernal_apocalypse",
          mp: 85,
        },
        sup_frozen_eternity: {
          n: "Eternidade Congelada",
          p: 4.0,
          icon: "🥶",
          type: "sup_frozen_eternity",
          mp: 75,
        },
        sup_natures_wrath: {
          n: "Ira da Natureza",
          p: 3.8,
          icon: "🥀",
          type: "sup_natures_wrath",
          mp: 68,
        },
        sup_void_collapse: {
          n: "Colapso do Vazio",
          p: 4.6,
          icon: "🕳️",
          type: "sup_void_collapse",
          mp: 95,
        },
      };

      const MAX_LEVELS = {
        1: 5,
        2: 10,
        3: 20,
        4: 30,
        5: 40,
        6: 50,
      };
      
      const MAP_DATA = [
        { name: "Floresta do Alvorecer", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
        { name: "Pântano Sombrio", img: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&q=80&w=800" },
        { name: "Deserto de Oblívio", img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=800" },
        { name: "Picos de Gelo", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
        { name: "Vulcão de Enfra", img: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=800" },
        { name: "Vale dos Ventos", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800" },
        { name: "Ruínas de Aether", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
        { name: "Caverna Abissal", img: "https://images.unsplash.com/photo-1524334220913-91136e0d9b43?auto=format&fit=crop&q=80&w=800" },
        { name: "Santuário Celeste", img: "https://images.unsplash.com/photo-1444491741275-3747c33cc99b?auto=format&fit=crop&q=80&w=800" },
        { name: "Domínio do Chaos", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000" }
      ];

      const EQ_RARITY = {
        common: { name: "Comum", mult: 1, color: "rarity-common" },
        rare: { name: "Raro", mult: 1.5, color: "rarity-rare" },
        epic: { name: "Épico", mult: 2.2, color: "rarity-epic" },
        legendary: { name: "Lendário", mult: 3.5, color: "rarity-legendary" },
      };

      let state = {
        user: {
          name: "",
          crystals: 200,
          energy: 100,
          gold: 5000, // Start with some gold
          tickets_common: 0,
          tickets_epic: 10, // Start with 10 epic tickets!
          lvl: 1,
          xp: 0,
          potions: 0,
          firstClear: {},
        },
        inventory: [], // Start with NO monsters
        equipment: [], // Global Equipment Storage
        leaderIdx: 0,
        storyProgress: 1,
        towerFloor: 1,
      };

      let battleState = {
        active: false,
        busy: false,
        mode: "dungeon",
        auto: false,
        speed: 1,
      };
      let prepState = { mode: "", level: 1, selectedMonIdx: 0 };
      let currentEqId = null; // for modal
      let currentInvFilter = "all";

      // --- TOAST SYSTEM ---
      const showToast = (message, type = "success") => {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");

        let icon = "✅";
        if (type === "error") icon = "❌";
        if (type === "info") icon = "ℹ️";

        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
          toast.style.animation = "toast-fade 0.3s ease-in forwards";
          setTimeout(() => toast.remove(), 300);
        }, 1000);
      };

      const addMonster = (id) => {
        const template = MONSTERS_DB.find((m) => m.id === id);
        if (!template) {
          console.error("Monster ID not found:", id);
          return;
        }

        const newMon = {
          ...template,
          instanceId: Date.now() + Math.random().toString(),
          xp: 0,
          lvl: 1,
          equipped: { weapon: null, armor: null, acc: null },
          stars: template.stars, // Ensure stars from DB
        };

        state.inventory.push(newMon);
      };

      // --- CORE ---
      // --- CORE ---
      const init = () => {
        const lastUser = localStorage.getItem("paperwar_last_user");

        if (lastUser) {
          const saved = localStorage.getItem(`paperwar_save_${lastUser}`);
          if (saved) {
            try {
              state = JSON.parse(saved);
              loadMigration();
              changeView("view-home");
              updateHeader();
              return;
            } catch (e) {
              console.error("Corrupted save", e);
            }
          }
        }

        // No user found, show login
        changeView("view-login");
        renderLoginIcons(); // Init login icons
      };

      const loadMigration = () => {
        if (!state.equipment) state.equipment = [];
        if (state.user.potions === undefined) state.user.potions = 0;
        if (state.user.lvl === undefined) state.user.lvl = 1;
        if (state.user.icon === undefined)
          state.user.icon =
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"; // Default

        state.inventory.forEach((m) => {
          const db = MONSTERS_DB.find((x) => x.id === m.id);
          if (db) {
            if (!m.img) m.img = db.img;
            if (!m.imgBack) m.imgBack = db.imgBack || "";
            if (!m.imgAtk) m.imgAtk = db.imgAtk || "";
            if (!m.emoji) m.emoji = db.emoji;
            m.skills = db.skills;
            m.stars = db.stars;
          }
          if (!m.equipped)
            m.equipped = { weapon: null, armor: null, acc: null };
        });
      };

      const save = () => {
        if (!state.user.name) return;
        localStorage.setItem(
          `paperwar_save_${state.user.name}`,
          JSON.stringify(state)
        );
      };

      // --- LOGIN ICONS ---
      let selectedLoginIcon = "??";
      const LOGIN_ICONS = [
        "🦸", // Superhero
        "🧙", // Wizard
        "🧝", // Elf
        "🧛", // Vampire
        "🤖", // Robot
        "👽", // Alien
        "🐲", // Dragon
        "🦄", // Unicorn
      ];

      const renderLoginIcons = () => {
  const c = document.getElementById("login-icons-container");
  if (!c) return;
  c.innerHTML = "";
  const fragment = document.createDocumentFragment();
  LOGIN_ICONS.forEach((emoji) => {
    const div = document.createElement("div");
    div.innerText = emoji;
    div.className = `w-14 h-14 text-3xl rounded-full border-2 cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
      selectedLoginIcon === emoji
        ? "border-indigo-500 scale-110 shadow-[0_0_15px_#6366f1] bg-indigo-900/30"
        : "border-slate-600 opacity-60 bg-slate-800/30"
    }`;
    div.onclick = () => {
      selectedLoginIcon = emoji;
      renderLoginIcons();
    };
    fragment.appendChild(div);
  });
  c.appendChild(fragment);
};

      const handleLogin = () => {
        try {
          const val = document.getElementById("login-name").value.trim();
          if (!val) {
            showToast("Por favor, digite um nome!", "error");
            return;
          }

          // Check if user exists
          const saved = localStorage.getItem(`paperwar_save_${val}`);
          if (saved) {
            state = JSON.parse(saved);
            loadMigration();
            // If they want to change icon on re-login, un-comment below. For now, strict load.
            // state.user.icon = selectedLoginIcon;
            showToast(`Bem-vindo de volta, ${val}!`);
          } else {
            // Create New
            state.user.name = val;
            state.user.crystals = 200;
            state.user.gold = 0;
            state.user.lvl = 1;
            state.user.tickets_common = 5;
            state.user.tickets_epic = 10;
            state.user.icon = selectedLoginIcon; // Save Icon
            state.inventory = [];
            state.equipment = [];
            addMonster("thyron");
            addMonster("vireya");
            addMonster("slime");
            showToast(`Conta criada: ${val}`);
          }

          localStorage.setItem("paperwar_last_user", val);
          save();

          document.getElementById("player-name-ui").innerText = state.user.name;
          // Hide letter, show emoji
          document.getElementById("header-initial").classList.add("hidden");
          const iconEl = document.getElementById("header-icon-img");
          iconEl.innerText = state.user.icon; // Display emoji as text
          iconEl.classList.remove("hidden");

          changeView("view-home");
          updateHeader();
        } catch (e) {
          showToast("Erro no Login: " + e.message, "error");
          console.error(e);
        }
      };

      const changeView = (id) => {
        const target = document.getElementById(id);
        if (!target) return;

        // Hide ALL main views inside #app
        document.querySelectorAll("#app > main").forEach(el => {
            el.classList.add("hidden-view");
        });
        
        target.classList.remove("hidden-view");

        const h = document.getElementById("ui-header");
        if (h) {
          if (
            [
              "view-login",
              "view-battle",
              "view-summon",
              "view-shop",
              "view-prep",
            ].includes(id)
          ) {
            h.classList.remove("flex");
            h.classList.add("hidden");
          } else {
            h.classList.remove("hidden");
            h.classList.add("flex");
          }
        }

        if (id === "view-collection") renderMonsterBox();
        if (id === "view-story") renderStory();
        if (id === "view-summon") updateSummonUI();
        if (id === "view-shop") updateShopUI();
        if (id === "view-dungeon") renderDungeonFloors();
        if (id === "view-inventory") {
          currentInvFilter = "all";
          renderInventory();
        }
        if (id === "view-tower")
          document.getElementById("tower-floor-display").innerText =
            state.towerFloor;
      };

      // --- STORY/CAMPAIGN RENDERING ---
const renderStory = () => {
  const list = document.getElementById("story-list");
  if (!list) return;
  list.innerHTML = "";

  const totalMaps = 10;
  const stagesPerMap = 8;
  const fragment = document.createDocumentFragment();

  for (let mapNum = 1; mapNum <= totalMaps; mapNum++) {
    const mapInfo = MAP_DATA[mapNum - 1];
    const mapCard = document.createElement("div");
    mapCard.className = "map-card group";
    
    // Map Background & Info
    mapCard.innerHTML = `
      <div class="map-banner">
        <img src="${mapInfo.img}" class="map-bg-img" />
        <div class="map-overlay"></div>
        <div class="map-content">
          <p class="map-chapter">Capítulo ${mapNum}</p>
          <h3 class="map-title">${mapInfo.name}</h3>
        </div>
      </div>
      <div class="stages-grid-container px-4 py-4">
        <div class="stages-grid"></div>
      </div>
    `;

    const stagesGrid = mapCard.querySelector(".stages-grid");
    const stagesFragment = document.createDocumentFragment();
    
    for (let stage = 1; stage <= stagesPerMap; stage++) {
      const stageNum = (mapNum - 1) * stagesPerMap + stage;
      const isBoss = stage === stagesPerMap;
      const isLocked = stageNum > (state.storyProgress || 1);
      const isCompleted = stageNum < (state.storyProgress || 1);
      const isCurrent = stageNum === (state.storyProgress || 1);

      const stageBtn = document.createElement("button");
      stageBtn.className = `stage-node ${isLocked ? 'locked' : isBoss ? 'boss' : 'normal'} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
      
      if (!isLocked) {
        stageBtn.onclick = () => startStoryBattle(stageNum, isBoss);
      }

      stageBtn.innerHTML = `
        <div class="node-content">
          <span class="node-icon">${isBoss ? '☠️' : isLocked ? '🔒' : isCompleted ? '✅' : stage}</span>
        </div>
        ${isCurrent ? '<div class="current-indicator"></div>' : ''}
        <div class="node-label">${mapNum}-${stage}</div>
      `;

      stagesFragment.appendChild(stageBtn);
    }
    stagesGrid.appendChild(stagesFragment);
    fragment.appendChild(mapCard);
  }
  list.appendChild(fragment);
};

      const startStoryBattle = (stageNum, isBoss) => {
        // Call openPrep just like tower does
        openPrep("story", stageNum);
      };

      const closeBattle = () => {
        changeView("view-home");
      };

      const updateHeader = () => {
        document.getElementById("player-name-ui").innerText = state.user.name;

        // Icon Logic
        const iconEl = document.getElementById("header-icon-img");
        const initEl = document.getElementById("header-initial");
        if (state.user.icon) {
          iconEl.innerText = state.user.icon; // Display emoji as text
          iconEl.classList.remove("hidden");
          initEl.classList.add("hidden");
        } else {
          iconEl.classList.add("hidden");
          initEl.classList.remove("hidden");
          initEl.innerText = state.user.name[0].toUpperCase();
        }

        document.getElementById("val-crystals").innerText = state.user.crystals;
        document.getElementById("val-energy").innerText = state.user.energy;
        document.getElementById("val-gold").innerText = state.user.gold;
        document.getElementById("header-lvl").innerText = state.user.lvl;

        const xpReq = 100 * state.user.lvl;
        const pct = Math.min(100, (state.user.xp / xpReq) * 100);
        document.getElementById("header-xp-bar").style.width = `${pct}%`;
      };

      const logout = () => {
        document.getElementById(
          "logout-username"
        ).innerText = `Deseja sair da conta ${state.user.name}?`;
        document.getElementById("logout-modal").classList.remove("hidden");
        document.getElementById("logout-modal").classList.add("flex");
      };

      const cancelLogout = () => {
        document.getElementById("logout-modal").classList.add("hidden");
        document.getElementById("logout-modal").classList.remove("flex");
      };

      const confirmLogout = () => {
        localStorage.removeItem("paperwar_last_user");
        location.reload();
      };

      // --- SHOP & EQUIPMENT LOGIC ---
      const updateShopUI = () => {
        document.getElementById("shop-crystals").innerText =
          state.user.crystals;
        document.getElementById("shop-gold").innerText = state.user.gold;
      };
      const buyShopItem = (item) => {
        // --- TICKETS ---
        if (item === "ticket_common") {
          if (state.user.gold < 1000) return showToast("Ouro insuficiente! Requ: 1.000", "error");
          state.user.gold -= 1000;
          state.user.tickets_common++;
        }
        if (item === "ticket_common_11") {
          if (state.user.gold < 10000) return showToast("Ouro insuficiente! Requ: 10.000", "error");
          state.user.gold -= 10000;
          state.user.tickets_common += 11;
        }

        if (item === "ticket_epic") {
          if (state.user.crystals < 100) return showToast("Cristais insuficientes! Requ: 100", "error");
          state.user.crystals -= 100;
          state.user.tickets_epic++;
        }
        if (item === "ticket_epic_11") {
          if (state.user.crystals < 1000) return showToast("Cristais insuficientes! Requ: 1.000", "error");
          state.user.crystals -= 1000;
          state.user.tickets_epic += 11;
        }
        if (item === "skillupper") {
          if (state.user.crystals < 1000) return showToast("Cristais insuficientes! Requ: 1.000", "error");
          state.user.crystals -= 1000;
          addMonster("skillupper");
        }

        // --- RESOURCES ---
        if (item === "energy") {
          if (state.user.crystals < 50) return showToast("Cristais insuficientes! Requ: 50", "error");
          state.user.crystals -= 50;
          state.user.energy += 50;
        }
        
        if (item === "xp_pot") {
          if (state.user.gold < 500) return showToast("Ouro insuficiente! Requ: 500", "error");
          state.user.gold -= 500;
          state.user.potions++;
        }
        if (item === "xp_pot_10") {
          if (state.user.gold < 5000) return showToast("Ouro insuficiente! Requ: 5.000", "error");
          state.user.gold -= 5000;
          state.user.potions += 10;
        }

        if (item === "xp_boost") {
            if (state.user.crystals < 150) return showToast("Cristais insuficientes! Requ: 150", "error");
            state.user.crystals -= 150;
            
            // Add 7 minutes (7 * 60 * 1000 ms)
            const now = Date.now();
            const boostTime = 7 * 60 * 1000;
            
            // Extend if already active
            if (state.user.xpBoostEndTime && state.user.xpBoostEndTime > now) {
                state.user.xpBoostEndTime += boostTime;
            } else {
                state.user.xpBoostEndTime = now + boostTime;
            }
            showToast("Bônus XP Ativado! (3x por 7m)", "success");
        }

        save();
        updateShopUI();
        updateHeader();
        showToast("Compra realizada com sucesso!", "success");
      };
      // Expose to window for HTML onclick logic
      window.buyShopItem = buyShopItem;
      let currentSummonResults = [];

      const playSummonAnim = async (type) => {
        if (type === "preview") {
          // Just a fun interaction
          const gate = document.getElementById("summon-gate");
          gate.classList.add("scale-110");
          await sleep(100);
          gate.classList.remove("scale-110");
          return;
        }
      };

      const doSummon = async (type = "common", amount = 1) => {
        // Validation
        let cost = 1 * amount;
        let tType = type === "epic" ? "tickets_epic" : "tickets_common";

        if (state.user[tType] < cost) {
          return showToast("Bilhetes insuficientes!", "error");
        }

        // Deduct
        state.user[tType] -= cost;
        updateHeader();
        updateSummonUI();

        // 1. GENERATE MONSTERS FIRST (to detect rarity)
        currentSummonResults = [];
        let maxStarsFound = 0;

        for (let i = 0; i < amount; i++) {
          let rarity = "common";
          const r = Math.random();

          if (type === "common") {
            // Common Ticket: Mostly 1-2 stars, rare chance for 3-4
            if (r < 0.75) rarity = "common"; // 75% - nat 1-2
            else if (r < 0.97) rarity = "rare"; // 22% - nat 3
            else if (r < 0.995) rarity = "epic"; // 2.5% - nat 4
            else rarity = "legendary"; // 0.5% - nat 5 (Summoners War rate!)
          } else {
            // Epic Ticket: Guaranteed 3+ stars
            if (r < 0.925) rarity = "rare"; // 92.5% - nat 3
            else if (r < 0.995) rarity = "epic"; // 7% - nat 4
            else rarity = "legendary"; // 0.5% - nat 5 (Summoners War rate!)
          }

          let minStar = 1,
            maxStar = 2;
          if (rarity === "rare") {
            minStar = 3;
            maxStar = 3;
          }
          if (rarity === "epic") {
            minStar = 4;
            maxStar = 4;
          }
          if (rarity === "legendary") {
            minStar = 5;
            maxStar = 5;
          }

          const pool = MONSTERS_DB.filter(
            (m) => m.stars >= minStar && m.stars <= maxStar
          );

          // Fallback if pool is empty (safety)
          let template;
          if (pool.length === 0) {
            console.warn("Empty pool for", rarity, minStar, maxStar);
            template = MONSTERS_DB[0]; // Fallback to first mon
          } else {
            template = pool[Math.floor(Math.random() * pool.length)];
          }

          if (template.stars > maxStarsFound) maxStarsFound = template.stars;

          const newMon = {
            ...template,
            instanceId: Date.now() + Math.random().toString() + i, // unique
            xp: 0,
            lvl: 1,
            equipped: { weapon: null, armor: null, acc: null },
            stars: template.stars,
          };

          state.inventory.push(newMon);
          currentSummonResults.push(newMon);
        }

        save();

        // 2. CONDITIONAL ANIMATION BASED ON RARITY
        const overlay = document.getElementById("summon-anim-overlay");
        overlay.classList.remove("hidden");
        overlay.classList.add("flex");

        const core = document.getElementById("summon-core");
        const rays = document.getElementById("summon-rays");
        const flash = document.getElementById("summon-flash");
        const app = document.getElementById("app");

        // Reset state
        core.style.transform = "scale(1)";
        rays.style.opacity = "0";
        flash.style.opacity = "0";
        flash.className =
          "absolute inset-0 bg-white opacity-0 pointer-events-none";

        const hasNat5 = maxStarsFound >= 5;

        if (hasNat5) {
          // === NAT 5 ANIMATION (EPIC) ===
          // Charge
          core.style.transform = "scale(0.5)";
          await sleep(500);

          // Spin
          rays.style.opacity = "1";
          await sleep(1500);

          // LIGHTNING STRIKE EFFECT
          const lightning = document.createElement("div");
          lightning.className = "vfx-lightning-strike";
          lightning.style.left = "50%";
          lightning.style.top = "0";
          lightning.style.height = "100%";
          lightning.style.width = "20px";
          lightning.style.zIndex = "100";
          overlay.appendChild(lightning);

          // Flash/Explode
          flash.style.transition = "opacity 0.1s";
          flash.style.opacity = "1";

          // Screen Shake
          app.classList.add("anim-shake-crit");

          await sleep(150);
          lightning.remove();
          app.classList.remove("anim-shake-crit");

          // Hide anim elements while white screen is up
          core.style.opacity = "0";
          rays.style.opacity = "0";

          await sleep(200);

          // EXTRA 5-STAR FX (Multiple bolts)
          for (let k = 0; k < 5; k++) {
            const bolt = document.createElement("div");
            bolt.className = "vfx-lightning-strike";
            bolt.style.left = 20 + Math.random() * 60 + "%";
            bolt.style.animationDuration = "0.2s";
            overlay.appendChild(bolt);
            setTimeout(() => bolt.remove(), 200);
            await sleep(100);
          }
        } else {
          // === STANDARD ANIMATION (NAT 1-4) - SIMPLE ===
          // Quick pulse
          core.style.transform = "scale(1.2)";
          rays.style.opacity = "0.3";
          await sleep(300);

          core.style.transform = "scale(1)";
          rays.style.opacity = "0";

          // Subtle flash (no white screen)
          flash.style.transition = "opacity 0.2s";
          flash.style.opacity = "0.3";
          await sleep(100);
          flash.style.opacity = "0";
          await sleep(200);
        }

        // 3. SHOW RESULTS
        renderSummonResults(); // Build DOM first

        flash.style.opacity = "0"; // Fade out white
        await sleep(300);

        overlay.classList.remove("flex");
        overlay.classList.add("hidden");

        // Cleanup Anim
        core.style.opacity = "1";
        core.style.transform = "scale(1)";
        rays.style.opacity = "0";
      };

      const renderSummonResults = () => {
  const modal = document.getElementById("summon-results");
  const grid = document.getElementById("summon-grid");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  grid.innerHTML = "";

  const count = currentSummonResults.length;
  const fragment = document.createDocumentFragment();

  // Adjust grid based on summon count
  if (count === 1) {
    // Single summon: centered, larger card
    grid.className =
      "flex-1 flex items-center justify-center overflow-y-auto pb-20";
  } else {
    // Multiple summons: 2 Columns for vertical scrolling, centered items
    grid.className =
      "flex-1 grid grid-cols-2 place-content-start justify-items-center gap-6 overflow-y-auto pb-20 pt-10 custom-scrollbar";
  }

  currentSummonResults.forEach((mon, idx) => {
    const card = document.createElement("div");

    // Adjust card size based on count
    if (count === 1) {
      card.className = "relative w-48 h-64 perspective-1000 opacity-0";
    } else {
      // 10x: Larger cards (w-32 ˜ 128px, h-44 ˜ 176px)
      card.className = "relative w-32 h-44 perspective-1000 opacity-0";
    }

    card.style.animation = `card-flip 0.5s ease-out ${
      idx * 0.1
    }s forwards`;

    // Rarity Style
    let borderCol = "border-slate-600";
    let bgGrad = "from-slate-700 to-slate-900";
    let glow = "";

    if (mon.stars >= 3) {
      borderCol = "border-blue-500";
      bgGrad = "from-blue-900 to-slate-900";
    }
    if (mon.stars >= 4) {
      borderCol = "border-purple-500";
      bgGrad = "from-purple-900 to-slate-900";
      glow = "shadow-[0_0_15px_#a855f7]";
    }
    if (mon.stars >= 5) {
      borderCol = "border-amber-400 animate-pulse";
      bgGrad = "from-amber-900 to-slate-900";
      glow = "shadow-[0_0_30px_#fbbf24] animate-pulse";
    }

    card.innerHTML = `
          <div class="w-full h-full rounded-xl border-2 ${borderCol} bg-gradient-to-br ${bgGrad} p-2 flex flex-col items-center justify-between ${glow}">
              <div class="w-full flex justify-between items-start">
                  <span class="text-[10px] text-white font-bold bg-black/50 px-1 rounded">${"★".repeat(
                    mon.stars
                  )}</span>
                  ${
                    mon.stars >= 5
                      ? '<span class="animate-pulse text-amber-300">✨</span>'
                      : ""
                  }
              </div>
               <!-- IMAGE with EMOJI FALLBACK -->
              <div class="relative w-full flex-1 flex items-center justify-center my-1 overflow-hidden">
                  <img 
                    src="${mon.img}" 
                    class="w-full h-full object-contain filter drop-shadow-lg z-10" 
                    onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                  />
                  <span class="text-5xl absolute hidden animate-bounce">${
                    mon.emoji
                  }</span>
              </div>

              <div class="text-center w-full relative z-20">
                  <div class="text-[8px] text-slate-400 uppercase font-bold tracking-wider truncate">${
                    mon.type
                  }</div>
                  <div class="text-[10px] text-white font-black truncate w-full">${
                    mon.name
                  }</div>
              </div>
          </div>
       `;
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
};

      const closeSummonResults = () => {
        document.getElementById("summon-results").classList.remove("flex");
        document.getElementById("summon-results").classList.add("hidden");
      };

      const createEquipment = (floorLevel = 1, dungeonType = "golem") => {
        let types = ["weapon", "armor", "acc"];
        if (dungeonType === "golem") types = ["weapon", "armor"];
        if (dungeonType === "dragon") types = ["acc"];

        const type = types[Math.floor(Math.random() * types.length)];

        // Logic for Rarity based on Floor Level (Dungeon)
        // Floors: 1-12
        let rarity = "common";
        const r = Math.random();

        let chanceCommon = 0.8;
        let chanceRare = 0.99;
        let chanceEpic = 1.0;

        if (floorLevel <= 3) {
          // 1-3: Mostly common
          chanceCommon = 0.8;
          chanceRare = 0.99;
        } else if (floorLevel <= 6) {
          // 4-6: Better
          chanceCommon = 0.5;
          chanceRare = 0.9;
          chanceEpic = 0.99;
        } else if (floorLevel <= 9) {
          // 7-9: Good
          chanceCommon = 0.3;
          chanceRare = 0.8;
          chanceEpic = 0.95;
        } else {
          // 10-12: High tier
          chanceCommon = 0.1;
          chanceRare = 0.5;
          chanceEpic = 0.85;
        }

        if (r < chanceCommon) rarity = "common";
        else if (r < chanceRare) rarity = "rare";
        else if (r < chanceEpic) rarity = "epic";
        else rarity = "legendary";

        const base = EQ_RARITY[rarity];
        const eq = {
          id: "eq_" + Date.now() + Math.random().toString(36).substr(2, 9),
          type: type,
          rarity: rarity,
          lvl: 0,
          stats: { atk: 0, def: 0, crit: 0, cdmg: 0 },
        };

        // Stat Generation
        if (type === "weapon") eq.stats.atk = Math.floor(10 * base.mult);
        if (type === "armor") {
          eq.stats.def = Math.floor(5 * base.mult);
          eq.stats.hp = Math.floor(50 * base.mult);
        }
        if (type === "acc") {
          eq.stats.crit = Math.floor(2 * base.mult);
          eq.stats.cdmg = Math.floor(5 * base.mult);
        }

        // Random Substats
        const subStatCount =
          rarity === "legendary"
            ? 3
            : rarity === "epic"
            ? 2
            : rarity === "rare"
            ? 1
            : 0;
        for (let i = 0; i < subStatCount; i++) {
          const sub = Math.random();
          if (sub < 0.25)
            eq.stats.atk = (eq.stats.atk || 0) + Math.floor(5 * base.mult);
          else if (sub < 0.5)
            eq.stats.def = (eq.stats.def || 0) + Math.floor(3 * base.mult);
          else if (sub < 0.75) eq.stats.crit = (eq.stats.crit || 0) + 1;
          else eq.stats.cdmg = (eq.stats.cdmg || 0) + 2;
        }

        return eq;
      };

      const handleEqClick = (slot) => {
        const mon = state.inventory[selectedDetailIdx];
        const equippedId = mon.equipped[slot];

        if (equippedId) {
          // Open Upgrade Modal
          currentEqId = equippedId;
          renderUpgradeModal();
        } else {
          // Equip Logic: Find best available or just list
          const items = state.equipment.filter(
            (e) => e.type === slot && !isEquipped(e.id)
          );
          if (items.length > 0) {
            // Sort by rarity/stats ideally, but just take first for now
            mon.equipped[slot] = items[0].id;
            save();
            openDetail(selectedDetailIdx);
            showToast("Equipado!");
          } else {
            showToast("Nenhum item disponível no Baú!", "info");
          }
        }
      };

      const isEquipped = (id) => {
        return state.inventory.some(
          (m) =>
            m.equipped.weapon === id ||
            m.equipped.armor === id ||
            m.equipped.acc === id
        );
      };

      const getEquipperName = (id) => {
        const mon = state.inventory.find(
          (m) =>
            m.equipped.weapon === id ||
            m.equipped.armor === id ||
            m.equipped.acc === id
        );
        return mon ? mon.name : null;
      };

      const renderUpgradeModal = () => {
        const eq = state.equipment.find((e) => e.id === currentEqId);
        if (!eq) return;

        const modal = document.getElementById("eq-modal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        const conf = EQ_RARITY[eq.rarity];
        document.getElementById("eq-modal-title").innerText = `${
          conf.name
        } ${eq.type.toUpperCase()}`;
        document.getElementById(
          "eq-modal-title"
        ).className = `text-xl font-bold mb-2 ${conf.color.replace(
          "border-color:",
          "text-"
        )}`;
        document.getElementById("eq-modal-level").innerText = `+${eq.lvl}`;

        document.getElementById("eq-stat-atk").innerText = eq.stats.atk || 0;
        document.getElementById("eq-stat-def").innerText = eq.stats.def || 0;
        document.getElementById("eq-stat-crit").innerText =
          (eq.stats.crit || 0) + "%";
        document.getElementById("eq-stat-cdmg").innerText =
          (eq.stats.cdmg || 0) + "%";

        const cost = 100 * (eq.lvl + 1);
        const chance = Math.max(5, 100 - eq.lvl * 5);
        const sellPrice = 50 * (eq.lvl + 1) * conf.mult;

        const btn = document.getElementById("btn-upgrade");
        document.getElementById("upg-cost").innerText = cost;
        document.getElementById("sell-price").innerText = Math.floor(sellPrice);
        document.getElementById("upg-chance").innerText = `Sucesso: ${chance}%`;

        const equippedBy = getEquipperName(eq.id);
        const ownerTxt = document.getElementById("eq-equipped-by");
        if (equippedBy) {
          ownerTxt.innerText = `Equipado em: ${equippedBy}`;
          ownerTxt.classList.remove("hidden");
          document.getElementById("btn-sell").disabled = true;
          document
            .getElementById("btn-sell")
            .classList.add("opacity-50", "grayscale");
        } else {
          ownerTxt.classList.add("hidden");
          document.getElementById("btn-sell").disabled = false;
          document
            .getElementById("btn-sell")
            .classList.remove("opacity-50", "grayscale");
        }

        btn.onclick = () => performUpgrade(eq, cost, chance);
      };

      const sellEquipment = () => {
        const eq = state.equipment.find((e) => e.id === currentEqId);
        if (!eq) return;
        if (getEquipperName(eq.id))
          return showToast("Desequipe antes de vender!", "error");

        const conf = EQ_RARITY[eq.rarity];
        const price = Math.floor(50 * (eq.lvl + 1) * conf.mult);

        state.user.gold += price;
        state.equipment = state.equipment.filter((e) => e.id !== currentEqId);
        save();

        document.getElementById("eq-modal").classList.add("hidden");
        showToast(`Vendido por ${price} Ouro`);
        updateHeader();

        // Refresh views
        if (
          !document
            .getElementById("view-inventory")
            .classList.contains("hidden-view")
        )
          renderInventory();
        if (
          !document
            .getElementById("mon-detail-overlay")
            .classList.contains("hidden")
        )
          openDetail(selectedDetailIdx);
      };

      const performUpgrade = (eq, cost, chance) => {
        if (state.user.gold < cost)
          return showToast("Ouro insuficiente!", "error");
        state.user.gold -= cost;

        const roll = Math.random() * 100;
        if (roll <= chance) {
          eq.lvl++;
          // Boost Stats
          if (eq.stats.atk) eq.stats.atk += Math.ceil(eq.stats.atk * 0.1) + 2;
          if (eq.stats.def) eq.stats.def += Math.ceil(eq.stats.def * 0.1) + 1;
          if (eq.stats.crit) eq.stats.crit += 1;
          if (eq.stats.cdmg) eq.stats.cdmg += 2;

          showToast("Upgrade Sucesso! +" + eq.lvl, "success");
        } else {
          showToast("Falha no Upgrade...", "error");
          document.getElementById("eq-modal").classList.add("animate-shake");
          setTimeout(
            () =>
              document
                .getElementById("eq-modal")
                .classList.remove("animate-shake"),
            500
          );
        }
        save();
        updateHeader();
        renderUpgradeModal();
        // Refresh views underneath
        if (
          !document
            .getElementById("view-inventory")
            .classList.contains("hidden-view")
        )
          renderInventory();
        if (
          !document
            .getElementById("mon-detail-overlay")
            .classList.contains("hidden")
        )
          openDetail(selectedDetailIdx);
      };

      // --- INVENTORY VIEW LOGIC ---
      const filterInventory = (type) => {
        currentInvFilter = type;
        document.querySelectorAll(".inv-tab").forEach((b) => {
          b.classList.remove("bg-indigo-600", "text-white");
          b.classList.add("bg-slate-800", "text-slate-400");
        });
        const activeBtn = document.getElementById(`tab-${type}`);
        activeBtn.classList.remove("bg-slate-800", "text-slate-400");
        activeBtn.classList.add("bg-indigo-600", "text-white");
        renderInventory();
      };

      const renderInventory = () => {
  const grid = document.getElementById("inventory-grid");
  grid.innerHTML = "";

  let items = state.equipment;
  if (currentInvFilter !== "all")
    items = items.filter((e) => e.type === currentInvFilter);

  if (items.length === 0) {
    document.getElementById("inv-empty-msg").classList.remove("hidden");
    document.getElementById("inv-empty-msg").classList.add("flex");
  } else {
    document.getElementById("inv-empty-msg").classList.add("hidden");
    document.getElementById("inv-empty-msg").classList.remove("flex");
  }

  const fragment = document.createDocumentFragment();
  items.forEach((eq) => {
    const conf = EQ_RARITY[eq.rarity];
    const equippedBy = getEquipperName(eq.id);

    const el = document.createElement("div");
    el.className = `aspect-square bg-slate-900 rounded-xl border relative cursor-pointer active:scale-95 transition-transform ${conf.color}`;
    // override text color for border
    el.style.borderColor =
      eq.rarity === "legendary"
        ? "#fbbf24"
        : eq.rarity === "epic"
        ? "#a855f7"
        : eq.rarity === "rare"
        ? "#3b82f6"
        : "#94a3b8";

    const icon =
      eq.type === "weapon" ? "??" : eq.type === "armor" ? "???" : "??";

    el.innerHTML = `
              <div class="absolute inset-0 flex items-center justify-center text-2xl">${icon}</div>
              <div class="absolute top-1 right-1 text-[9px] font-black bg-black/60 px-1 rounded text-white">+${
                eq.lvl
              }</div>
              ${
                equippedBy
                  ? `<div class="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-indigo-600 border border-white flex items-center justify-center text-[8px] font-bold text-white" title="${equippedBy}">E</div>`
                  : ""
              }
          `;
    el.onclick = () => {
      currentEqId = eq.id;
      renderUpgradeModal();
    };
    fragment.appendChild(el);
  });
  grid.appendChild(fragment);
};
      const updateSummonUI = () => {
        const elC = document.getElementById("summon-tickets-common");
        const elE = document.getElementById("summon-tickets-epic");
        if (elC) elC.innerText = state.user.tickets_common;
        if (elE) elE.innerText = state.user.tickets_epic;
      };

      // --- DUNGEON & PREP ---
      // --- DUNGEON & PREP ---
      let selectedDungeonType = "golem";

      const openDungeonSelect = (type) => {
        selectedDungeonType = type;
        changeView("view-dungeon");
      };

      const renderDungeonFloors = () => {
  let title = "";
  let imgSrc = "";
  let grad = "";

  if (selectedDungeonType === "golem") {
    title = "Masmorra do Golem";
    imgSrc = "src/golenArt.jpg"; // Stony/Cave
    grad = "from-stone-900";
  } else if (selectedDungeonType === "dragon") {
    title = "Masmorra do Dragão";
    imgSrc = "src/dragaoArt.jpg"; // Lava/Fire
    grad = "from-red-900";
  } else if (selectedDungeonType === "xp") {
    title = "Fenda Dimensional (XP)";
    imgSrc = "https://www.transparenttextures.com/patterns/cubes.png"; // Placeholder
    grad = "from-indigo-900";
  }

  // Inject Hero Header
  const headerHTML = `
     <div class="relative w-full h-40 rounded-[2rem] overflow-hidden shadow-2xl mb-6 shrink-0">
        <img src="${imgSrc}" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <div class="absolute bottom-6 left-6">
          <p class="text-white/70 font-bold text-[10px] uppercase tracking-widest mb-1">Masmorra de Cairos</p>
          <h2 class="text-3xl font-black text-white italic uppercase leading-none break-words max-w-[200px]">${title}</h2>
        </div>
     </div>
     <div class="flex items-center gap-3 mb-4 px-2">
        <div class="text-2xl animate-bounce">💎</div>
         <p class="text-[10px] text-slate-300 leading-tight">
          Ultrapasse andares para aumentar chances de <span class="text-purple-400 font-bold">Épicos</span> e <span class="text-yellow-400 font-bold">Lendários</span>.
        </p>
     </div>
  `;

  // Clear previous manually added "h2" if any, we are replacing the top part logic
  const container = document.getElementById("view-dungeon");
  if (!container) return; // Safety check

  // Remove ALL children to rebuild properly
  container.innerHTML = `
   <button
    onclick="changeView('view-home')"
    class="mb-4 px-4 py-2 bg-slate-900 rounded-full border border-white/10 text-white text-xs font-bold w-max shrink-0"
   >
    ⬅️ Voltar
   </button>
   ${headerHTML}
   <div class="scroll-container content-start overflow-y-auto space-y-3 pr-2 pb-20" id="dungeon-list-inner"></div>
  `;

  const listInner = document.getElementById("dungeon-list-inner");
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= 12; i++) {
    const btn = document.createElement("div");
    btn.className =
      "glass-panel p-4 rounded-xl flex justify-between items-center cursor-pointer active:scale-95 transition-transform border border-white/5 hover:bg-white/5";
    btn.innerHTML = `<div><h4 class="text-white font-bold">${
      selectedDungeonType === "golem"
        ? "Golem"
        : selectedDungeonType === "dragon"
        ? "Dragão"
        : "Fenda XP"
    } B${i}</h4><p class="text-xs text-purple-400">Lv. ${i * 5} • ${
      5 + Math.floor(i / 2)
    } ⚡</p></div><div class="text-white">▶️</div>`;
    btn.onclick = () => openPrep("dungeon_" + selectedDungeonType, i);
    fragment.appendChild(btn);
  }
  listInner.appendChild(fragment);
};
      const openPrep = (mode, lvl) => {
        prepState = { mode, level: lvl, selectedMonIdx: state.leaderIdx };
        changeView("view-prep");
        const titles = {
          dungeon_golem: `Golem B${lvl}`,
          dungeon_dragon: `Dragão B${lvl}`,
          dungeon_xp: `Fenda XP B${lvl}`,
          tower: `Torre Andar ${lvl}`,
          story: `Campanha Fase ${lvl}`,
        };
        // Normalize dungeon cost
        let cost = 5;
        if (mode.startsWith("dungeon")) cost = 5 + Math.floor(lvl / 2);

        document.getElementById("prep-title").innerText = titles[mode];
        document.getElementById("prep-cost").innerText = `${cost} ⚡`;
        renderPrepUnit();
        renderPrepRoster();
      };

      const renderPrepUnit = () => {
        const mon = state.inventory[prepState.selectedMonIdx];
        const stats = calculateStats(mon);

        document.getElementById("prep-img").src = mon.img;
        document.getElementById("prep-name").innerText = mon.name;
        document.getElementById("prep-el").innerText = {
          fire: "🔥",
          water: "🌊",
          lightning: "⚡",
          earth: "🗿",
          nature: "🍃",
          void: "🌑",
          neutral: "⚪"
        }[mon.element] || "❓";
        document.getElementById(
          "prep-stats"
        ).innerText = `Atk: ${stats.atk} | HP: ${stats.hp}`;
      };

      const calculateStats = (mon) => {
        // Growth: 3% per level
        // Star Bonus: +12% base stats per star above 1
        
        const lvlMult = 1 + (mon.lvl - 1) * 0.03;
        const starMult = 1 + (mon.stars - 1) * 0.12; 
        
        // Multipliers
        const m = lvlMult * starMult;

        // Role Modifiers
        // Fetch role from DB if not in mon object (Legacy save support)
        const tpl = MONSTERS_DB.find(x => x.id === mon.id);
        const role = mon.role || (tpl ? tpl.role : 'balanced');

        let rAtk = 1, rHp = 1, rDef = 1;
        if (role === 'attacker') { rAtk = 1.25; rHp = 0.9; rDef = 0.9; }
        else if (role === 'defender') { rDef = 1.35; rHp = 1.15; rAtk = 0.8; }
        else if (role === 'hp') { rHp = 1.40; rAtk = 0.85; rDef = 1.05; }
        else if (role === 'support') { rHp = 1.15; rDef = 1.15; rAtk = 0.9; }
        
        // Base Stats (from DB or Mon)
        // If mon has stats (it does), apply m.
        // But base stats are in MONSTERS_DB.
        // 'mon' object usually has saved stats? No, 'calculateStats' returns calculated.
        // Wait. 'mon' passed here usually has 'atk', 'hp', 'def' properties.
        // Are those BASE or Current?
        // In `addMonster`, we do `...template`. So `mon.atk` IS `template.atk` (Base).
        // Unless we overwrite them.
        // Let's assume `mon` properties are BASE.
        
        let hp = Math.floor(mon.hp * m * rHp);
        let atk = Math.floor(mon.atk * m * rAtk);
        let def = Math.floor(mon.def * m * rDef);
        let crit = 15;
        let cdmg = 50;
        
        // Equipment
        if (mon.equipped) {
            if (mon.equipped.weapon) {
                const eq = state.equipment.find(e => e.id === mon.equipped.weapon);
                if (eq) { atk += eq.mainVal; crit += eq.subVal; }
            }
            if (mon.equipped.armor) {
                const eq = state.equipment.find(e => e.id === mon.equipped.armor);
                if (eq) { hp += eq.mainVal; def += eq.subVal; } // Armor gives HP + Def
            }
            if (mon.equipped.acc) {
                const eq = state.equipment.find(e => e.id === mon.equipped.acc);
                if (eq) { crit += eq.mainVal; cdmg += eq.subVal; }
            }
        }

        return { hp, atk, def, crit, cdmg };
      };
        


      const renderPrepRoster = () => {
  const grid = document.getElementById("prep-grid");
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  state.inventory.forEach((mon, idx) => {
    const el = document.createElement("div");
    const isSel = idx === prepState.selectedMonIdx;
    el.className = `aspect-square bg-slate-800 rounded-lg p-1 border-2 cursor-pointer ${
      isSel ? "border-green-500" : "border-transparent"
    }`;
    el.innerHTML = `<img src="${mon.img}" class="w-full h-full object-contain">`;
    el.onclick = () => {
      prepState.selectedMonIdx = idx;
      renderPrepUnit();
      renderPrepRoster();
      document.getElementById("prep-roster").classList.add("hidden");
    };
    fragment.appendChild(el);
  });
  grid.appendChild(fragment);
};

      const confirmBattle = () => startBattle(prepState.mode, prepState.level);

      // --- BATTLE ---
      const startBattle = (modeArg, lvlArg) => {
        // Handle Restart or Fresh Start
        const isRestart = modeArg === true;
        const mode = isRestart ? prepState.mode : modeArg;
        const lvl = isRestart ? prepState.level : (lvlArg || 1);

        let cost = 5;
        if (mode.startsWith("dungeon")) cost = 5 + Math.floor(lvl / 2);

        if (state.user.energy < cost) {
             battleState.repeatCount = 0; // Stop auto
             return showToast("Sem energia!", "error");
        }
        state.user.energy -= cost;
        updateHeader();

        // Initialize Battle State
        battleState = {
          active: true,
          mode: mode,
          busy: false,
          auto: false,
          speed: 1,
          repeatCount: isRestart ? battleState.repeatCount : 0 
        };

        // Check Auto-10x toggle (only on fresh start)
        if (!isRestart) {
            const cb = document.getElementById("prep-auto-10x");
            if (cb && cb.checked) {
                battleState.repeatCount = 10;
            }
        }

        // Auto-Enable Features for Cleared Dungeons
        if (mode.startsWith("dungeon")) {
            if (state.user.dungeonClear && state.user.dungeonClear[mode]) {
                battleState.auto = true;
                battleState.speed = 3;
            }
        }

        updateBattleControls();

        const pBase = state.inventory[prepState.selectedMonIdx];
        const stats = calculateStats(pBase);

        battleState.player = {
          ...pBase,
          curHp: stats.hp,
          maxHp: stats.hp,
          atk: stats.atk,
          def: stats.def,
          crit: stats.crit,
          cdmg: stats.cdmg,
          mp: 50,
          maxMp: 100,
        };

        setupEnemy(mode, lvl);
        changeView("view-battle");
        renderBattleScene();
        document.getElementById("battle-overlay").classList.add("hidden");
        document.getElementById("battle-overlay").style.opacity = "0";
      };

      const setupEnemy = (mode, lvlArg) => {
        let template;
        if (mode === "dungeon_golem") {
          template = MONSTERS_DB.find((m) => m.id === "dhorak");
        } else if (mode === "dungeon_dragon") {
          template = MONSTERS_DB.find((m) => m.id === "vermithrax");
        } else if (mode === "dungeon_xp") {
          template = MONSTERS_DB.find((m) => m.id === "metamorph");
        } else {
          // --- NEW GENERATION LOGIC ---
          let availableMonsters = [];
          
          if (mode === "tower") {
             // Tower: Harder scaling
             // 1-19: 2-3 stars
             // 20-49: 3-4 stars
             // 50+: 4-5 stars
             if (lvlArg >= 50) {
                 availableMonsters = MONSTERS_DB.filter(m => m.stars >= 4 && m.stars <= 5);
             } else if (lvlArg >= 20) {
                 availableMonsters = MONSTERS_DB.filter(m => m.stars >= 3 && m.stars <= 4);
             } else {
                 availableMonsters = MONSTERS_DB.filter(m => m.stars >= 2 && m.stars <= 3);
             }
          } else {
             // Story (Campanha)
             // Normal: 2-3 stars
             // Bosses (Every 8th or 10th level): 4 stars
             const isBoss = lvlArg % 8 === 0 || lvlArg % 10 === 0;
             if (isBoss) {
                 availableMonsters = MONSTERS_DB.filter(m => m.stars === 4);
             } else {
                 availableMonsters = MONSTERS_DB.filter(m => m.stars >= 2 && m.stars <= 3);
             }
          }

          // Exclude Dungeons bosses from random pool if they slipped in (they are 5* or 4*)
          availableMonsters = availableMonsters.filter(m => m.id !== "dhorak" && m.id !== "vermithrax");

          // Fallback
          if (availableMonsters.length === 0) {
              availableMonsters = MONSTERS_DB.filter(m => m.stars === 3);
          }

          template = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
        }

        let lvl = 1;
        // Balance Patch Scalings
        if (mode.startsWith("dungeon")) {
            // Dungeon: Floor 1 = Lv 3, Floor 10 = Lv 30
            lvl = Math.max(1, lvlArg * 3);
        } else if (mode === "tower") {
            // Tower: Floor 1 = Lv 1, Floor 100 = Lv 100
            lvl = lvlArg;
        } else {
            // Story: Stage 1 = Lv 1, Stage 10 = Lv 10
            lvl = lvlArg;
        }

        // New Growth formula is applied automatically by calculateStats or manual logic below
        // Since we changed calculateStats to 5% growth, enemies should follow.
        
        // Manual stat calculation for enemy (simplified version of calculateStats)
        const m = 1 + (lvl - 1) * 0.05; // 5% per level
        
        battleState.enemy = {
          ...template,
          lvl: lvl,
          curHp: Math.floor(template.hp * m),
          maxHp: Math.floor(template.hp * m),
          atk: Math.floor(template.atk * m),
          def: Math.floor(template.def * m),
          crit: 5,
          cdmg: 50,
        };

        updateBattleHUD();
        const el = document.getElementById("enemy-sprite-container");
        el.innerHTML = `<img src="${template.img}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"> <span style="display:none;font-size:4rem;filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5))">${template.emoji}</span>`;
      };

      const renderBattleScene = () => {
        const pl = document.getElementById("player-sprite-container");
        const sprite = battleState.player.imgBack || battleState.player.img;
        pl.innerHTML = `<img src="${sprite}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"> <span style="display:none;font-size:4rem;filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5))">${battleState.player.emoji}</span>`;
        renderSkillGrid();
      };

      const renderSkillGrid = () => {
  const grid = document.getElementById("skill-grid");
  grid.innerHTML = "";
  grid.className = `grid gap-2 ${
    battleState.player.skills.length > 2 ? "grid-cols-3" : "grid-cols-2"
  }`;

  const fragment = document.createDocumentFragment();
  battleState.player.skills.forEach((k) => {
    const s = SKILLS[k];
    if (!s) return;
    const canAfford = battleState.player.mp >= s.mp;
    const btn = document.createElement("button");
    btn.className = `bg-slate-800/80 border border-white/10 rounded-xl p-2 flex flex-col items-center transition-all ${
      canAfford
        ? "hover:bg-white/10 active:scale-90"
        : "opacity-50 grayscale cursor-not-allowed"
    }`;
    btn.innerHTML = `
              <span class="text-xl mb-1">${s.icon}</span>
              <span class="text-[8px] font-black uppercase text-white">${
                s.n
              }</span>
              ${
                s.mp > 0
                  ? `<span class="text-[8px] text-blue-300 font-bold">${s.mp} MP</span>`
                  : ""
              }
          `;
    btn.onclick = () => {
      if (canAfford) doPlayerTurn(k);
    };
    fragment.appendChild(btn);
  });
  grid.appendChild(fragment);
};

      const doPlayerTurn = async (skillKey) => {
        if (battleState.busy) return;
        battleState.busy = true;
        try {
          const skill = SKILLS[skillKey];
          battleState.player.mp -= skill.mp;
          updateBattleHUD();
          renderSkillGrid();

          await executeAction(
            battleState.player,
            battleState.enemy,
            skillKey,
            true
          );
          if (battleState.enemy.curHp <= 0) winBattle();
          else {
            document.getElementById("combat-log").innerText = "Turno Inimigo";
            setTimeout(doEnemyTurn, 1000 / battleState.speed);
          }
        } catch (e) {
          console.error(e);
          battleState.busy = false;
        }
      };

      const doEnemyTurn = async () => {
        try {
          const skills = battleState.enemy.skills;
          await executeAction(
            battleState.enemy,
            battleState.player,
            skills[Math.floor(Math.random() * skills.length)],
            false
          );

          battleState.player.mp = Math.min(
            battleState.player.maxMp,
            battleState.player.mp + 10
          );
          updateBattleHUD();
          renderSkillGrid();

          if (battleState.player.curHp <= 0) loseBattle();
          else {
            document.getElementById("combat-log").innerText = "Sua Vez!";
            battleState.busy = false;
            if (battleState.auto) triggerAuto();
          }
        } catch (e) {
          console.error(e);
          battleState.busy = false;
        }
      };

      const triggerAuto = () => {
        const skills = battleState.player.skills;
        for (let i = skills.length - 1; i >= 0; i--) {
          if (battleState.player.mp >= SKILLS[skills[i]].mp) {
            doPlayerTurn(skills[i]);
            return;
          }
        }
        doPlayerTurn("melee");
      };

      const toggleAuto = () => {
        if (state.user.lvl < 2)
          return showToast("Auto libera no Nível 2!", "info");
        battleState.auto = !battleState.auto;
        updateBattleControls();
        if (battleState.auto && !battleState.busy) triggerAuto();
      };
      const toggleSpeed = () => {
        if (state.user.lvl < 5)
          return showToast("3x libera no Nível 5!", "info");
        battleState.speed = battleState.speed === 1 ? 3 : 1;
        updateBattleControls();
      };
      const updateBattleControls = () => {
        const btnA = document.getElementById("btn-auto");
        const btnS = document.getElementById("btn-speed");
        btnA.className = `w-10 h-10 rounded-full border border-white/20 text-xs font-bold text-white flex items-center justify-center transition-all ${
          battleState.auto
            ? "bg-green-600 opacity-100"
            : "bg-slate-900/80 opacity-50"
        }`;
        btnS.className = `w-10 h-10 rounded-full border border-white/20 text-xs font-bold text-white flex items-center justify-center transition-all ${
          battleState.speed > 1
            ? "bg-yellow-600 opacity-100"
            : "bg-slate-900/80 opacity-50"
        }`;
        btnS.innerText = battleState.speed + "x";
      };

      const executeAction = async (att, def, skKey, isPlayer) => {
        const skill = SKILLS[skKey];
        const spd = battleState.speed;
        document.getElementById(
          "combat-log"
        ).innerText = `${att.name} usou ${skill.n}!`;
        const attackerEl = document.getElementById(
          isPlayer ? "player-sprite-container" : "enemy-sprite-container"
        );
        const defenderEl = document.getElementById(
          isPlayer ? "enemy-sprite-container" : "player-sprite-container"
        );
        const wrapperAtt = document.getElementById(
          isPlayer ? "ent-player" : "ent-enemy"
        );

        if (skill.type === "phys") {
          wrapperAtt.classList.add(
            isPlayer ? "anim-melee-player" : "anim-melee-enemy"
          );
          attackerEl.classList.add("anim-spin-atk");
          await sleep(500 / spd);
          wrapperAtt.classList.remove(
            isPlayer ? "anim-melee-player" : "anim-melee-enemy"
          );
          attackerEl.classList.remove("anim-spin-atk");
        } else {
          // Character Sprite Swap Logic for SPECIAL ATTACKS ONLY
          const imgElement = attackerEl.querySelector("img");
          const origImg = imgElement ? imgElement.src : null;
          let didSwap = false;
          
          if (att.imgAtk && imgElement) {
            imgElement.src = att.imgAtk;
            didSwap = true;
          }

          attackerEl.classList.add("anim-cast");
          await sleep(1500 / spd); // Increased from 500 to 1500 for full animation
          if (skill.type.endsWith("_sup") || skill.type.startsWith("sup_"))
            await spawnUltimateVFX(skill.type, isPlayer);
          else await spawnVFX(skill.type, isPlayer);
          attackerEl.classList.remove("anim-cast");

          // Revert sprite
          if (didSwap && imgElement && origImg) {
            imgElement.src = origImg;
          }
        }

        defenderEl.classList.add("anim-hit-recoil");
        defenderEl.querySelector("img").classList.add("anim-hit-spin");

        setTimeout(() => {
          defenderEl.classList.remove("anim-hit-recoil");
          defenderEl.querySelector("img").classList.remove("anim-hit-spin");
        }, 600 / spd);

        // IMPACT FRAMES & SCREEN SHAKE
        const impactDelay = 100 / spd; // Ms for freeze
        if (impactDelay > 20) await sleep(impactDelay); // Hit freeze!

        // Shake Camera
        const arena = document.getElementById("app");
        arena.classList.add("anim-shake-impact");
        setTimeout(() => arena.classList.remove("anim-shake-impact"), 300);

        // Skill Up Bonus: +5% per level
        const skillMod = 1 + ((att.skillUps || 0) * 0.05);
        const raw = att.atk * skill.p * skillMod;
        
        // NEW DAMAGE FORMULA (Mitigation based)
        // Damage = Raw * (1200 / (1200 + 3 * DEF))
        // This resembles Summoners War / LoL damage reduction logic
        const mitigation = 1200 / (1200 + (def.def * 3));
        let dmg = raw * mitigation;
        
        // Ensure at least some damage based on level diff?
        // Let's just enforce minimum 5% of raw
        dmg = Math.max(raw * 0.05, dmg);

        let isCrit = false;
        if (att.crit && Math.random() * 100 < att.crit) {
          isCrit = true;
          dmg = dmg * (1 + (att.cdmg || 50) / 100);
          // Stronger shake for crit
          arena.classList.add("anim-shake-crit");
          setTimeout(() => arena.classList.remove("anim-shake-crit"), 400);
        }
        dmg = Math.floor(dmg);

        def.curHp = Math.max(0, def.curHp - dmg);
        updateBattleHUD();
        showDmgText(dmg, isPlayer ? "ent-enemy" : "ent-player", isCrit);
        await sleep(300 / spd);
      };

      const spawnVFX = async (type, fromPlayer) => {
        const spd = battleState.speed;
        const layer = document.getElementById("effect-layer");
        const pPos = { x: 35, y: 60, z: 250 };
        const ePos = { x: -35, y: -100, z: -450 };
        const start = fromPlayer ? pPos : ePos;
        const end = fromPlayer ? ePos : pPos;
        const targetPos = end;
        const startPos = start;
        const flash = document.getElementById("screen-flash");

        // GLOBAL FLASH RESTRICTION (Only trigger flash if explicitly allowed)
        const triggerFlash = (duration = 100) => {
          if (
            type === "lightning" ||
            type === "thunder_storm" ||
            type.includes("bolt") ||
            type === "meteor_strike"
          ) {
            flash.className = "flash-screen";
            setTimeout(() => (flash.className = "hidden"), duration / spd);
          }
        };

        // WAVE 2 SKILLS VFX
        if (type === "tornado") {
          const wind = document.createElement("div");
          wind.style.position = "absolute";
          wind.style.width = "40px";
          wind.style.height = "100px";
          wind.style.background =
            "linear-gradient(to right, transparent, #a5f3fc, transparent)";
          wind.style.opacity = "0.5";
          wind.style.filter = "blur(4px)";
          layer.appendChild(wind);

          const anim = wind.animate(
            [
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scaleY(0) rotateY(0deg)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${
                  targetPos.y - 200
                }px) translateZ(${targetPos.z}px) scaleY(2) rotateY(1080deg)`,
              },
            ],
            { duration: 1000 / spd }
          );
          await anim.finished;
          wind.remove();
          return;
        }

        if (type === "earthquake") {
          const ground = document.querySelector(".ground-plane");
          const app = document.getElementById("app");
          // Shake harder
          app.classList.add("anim-shake-impact");
          setTimeout(() => app.classList.remove("anim-shake-impact"), 800);

          for (let i = 0; i < 10; i++) {
            const rock = document.createElement("div");
            rock.className = "vfx-rock";
            rock.style.width = 30 + Math.random() * 40 + "px";
            rock.style.height = rock.style.width;
            rock.style.background = "#78350f";
            layer.appendChild(rock);
            const anim = rock.animate(
              [
                {
                  transform: `translateX(${
                    targetPos.x + (Math.random() - 0.5) * 200
                  }px) translateY(${targetPos.y + 100}px) translateZ(${
                    targetPos.z + (Math.random() - 0.5) * 100
                  }px) scale(0)`,
                },
                {
                  transform: `translateX(${
                    targetPos.x + (Math.random() - 0.5) * 200
                  }px) translateY(${
                    targetPos.y - Math.random() * 150
                  }px) translateZ(${
                    targetPos.z + (Math.random() - 0.5) * 100
                  }px) scale(1)`,
                },
              ],
              { duration: 500 / spd, easing: "ease-out" }
            );
            anim.finished.then(() => rock.remove());
          }
          return;
        }

        if (type === "blizzard") {
          triggerFlash(50); // Maybe a tiny flash for ultimate feel
          for (let i = 0; i < 20; i++) {
            const snow = document.createElement("div");
            snow.style.position = "absolute";
            snow.innerText = "❄️";
            snow.style.fontSize = "20px";
            layer.appendChild(snow);

            const anim = snow.animate(
              [
                {
                  transform: `translateX(${
                    targetPos.x + (Math.random() - 0.5) * 300
                  }px) translateY(-500px) translateZ(${
                    targetPos.z + (Math.random() - 0.5) * 200
                  }px)`,
                },
                {
                  transform: `translateX(${
                    targetPos.x + (Math.random() - 0.5) * 100
                  }px) translateY(${targetPos.y}px) translateZ(${
                    targetPos.z
                  }px)`,
                },
              ],
              { duration: (500 + Math.random() * 500) / spd, easing: "linear" }
            );

            anim.finished.then(() => snow.remove());
            await sleep(20 / spd);
          }
          return;
        }

        if (type === "tidal_wave") {
          const wave = document.createElement("div");
          wave.style.position = "absolute";
          wave.style.width = "200px";
          wave.style.height = "100px";
          wave.style.background = "linear-gradient(180deg, #60a5fa, #1e3a8a)";
          wave.style.borderRadius = "50% 50% 0 0";
          wave.style.opacity = "0.8";
          layer.appendChild(wave);

          const anim = wave.animate(
            [
              {
                transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) scale(0.1)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1.5)`,
              },
            ],
            { duration: 800 / spd, easing: "ease-out" }
          );
          await anim.finished;
          wave.remove();
          return;
        }

        if (type === "solar_flare") {
          triggerFlash(300); // Fire ultimate flash? Or strict lightning? User said "somente habilidades do tipo trovao". Okay, removing flash here.
          // Actually, "solar_flare" implies bright light. But user rule is strict. No flash.

          const sun = document.createElement("div");
          sun.className = "vfx-fireball";
          sun.style.width = "150px";
          sun.style.height = "150px";
          sun.style.background = "radial-gradient(circle, #fef08a, #f97316)";
          layer.appendChild(sun);

          const anim = sun.animate(
            [
              {
                transform: `translateX(${targetPos.x}px) translateY(${
                  targetPos.y - 300
                }px) translateZ(${targetPos.z}px) scale(0.1)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1.5)`,
              },
            ],
            { duration: 1000 / spd, easing: "ease-in" }
          );

          await anim.finished;
          sun.remove();
          return;
        }

        if (type === "ice_shards") {
          for (let i = 0; i < 3; i++) {
            const p = document.createElement("div");
            p.className = "projectile";
            p.style.background = "linear-gradient(45deg, #fff, #a5f3fc)";
            p.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
            p.style.width = "20px";
            p.style.height = "40px";
            layer.appendChild(p);
            await sleep(100 / spd);
            const anim = p.animate(
              [
                {
                  transform: `translateX(${startPos.x}px) translateY(${
                    startPos.y
                  }px) translateZ(${startPos.z}px) rotate(${180 + i * 30}deg)`,
                },
                {
                  transform: `translateX(${targetPos.x}px) translateY(${
                    targetPos.y
                  }px) translateZ(${targetPos.z}px) rotate(${
                    180 + i * 120
                  }deg)`,
                },
              ],
              { duration: 400 / spd, easing: "ease-out", fill: "forwards" }
            );
            anim.finished.then(() => p.remove());
          }
          return;
        }

        if (type === "poison_cloud") {
          const cloud = document.createElement("div");
          cloud.style.position = "absolute";
          cloud.style.width = "100px";
          cloud.style.height = "100px";
          cloud.style.background =
            "radial-gradient(circle, rgba(74,222,128,0.8), transparent 70%)";
          cloud.style.filter = "blur(10px)";
          layer.appendChild(cloud);
          const anim = cloud.animate(
            [
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`,
                opacity: 0,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${
                  targetPos.y - 50
                }px) translateZ(${targetPos.z}px) scale(2)`,
                opacity: 1,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${
                  targetPos.y - 80
                }px) translateZ(${targetPos.z}px) scale(2.5)`,
                opacity: 0,
              },
            ],
            { duration: 1500 / spd, easing: "ease-out", fill: "forwards" }
          );
          await anim.finished;
          cloud.remove();
          return;
        }

        if (type === "holy_beam") {
          const beam = document.createElement("div");
          beam.style.position = "absolute";
          beam.style.width = "60px";
          beam.style.height = "1000px";
          beam.style.background =
            "linear-gradient(90deg, transparent, #fef08a, #fff, #fef08a, transparent)";
          beam.style.transformOrigin = "bottom center";
          beam.style.zIndex = "150";
          layer.appendChild(beam);
          flash.className = "flash-screen";
          setTimeout(() => (flash.className = "hidden"), 100 / spd);
          const anim = beam.animate(
            [
              {
                transform: `translateX(${targetPos.x}px) translateY(${
                  targetPos.y - 500
                }px) translateZ(${targetPos.z}px) scaleX(0)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${
                  targetPos.y - 500
                }px) translateZ(${targetPos.z}px) scaleX(1.5)`,
                offset: 0.1,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${
                  targetPos.y - 500
                }px) translateZ(${targetPos.z}px) scaleX(0)`,
              },
            ],
            { duration: 800 / spd, easing: "ease-out", fill: "forwards" }
          );
          await sleep(300 / spd);
          await anim.finished;
          beam.remove();
          return;
        }

        if (type === "blood_drain") {
          for (let i = 0; i < 10; i++) {
            const p = document.createElement("div");
            p.style.position = "absolute";
            p.style.width = "8px";
            p.style.height = "8px";
            p.style.background = "#ef4444";
            p.style.borderRadius = "50%";
            p.style.boxShadow = "0 0 5px red";
            layer.appendChild(p);
            const rndX = (Math.random() - 0.5) * 50;
            const rndY = (Math.random() - 0.5) * 50;
            const anim = p.animate(
              [
                {
                  transform: `translateX(${targetPos.x + rndX}px) translateY(${
                    targetPos.y + rndY
                  }px) translateZ(${targetPos.z}px)`,
                },
                {
                  transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px)`,
                },
              ],
              {
                duration: (500 + Math.random() * 300) / spd,
                easing: "ease-in-out",
                fill: "forwards",
              }
            );
            anim.finished.then(() => p.remove());
            await sleep(50 / spd);
          }
          return;
        }

        if (type === "shadow_strike") {
          const attacker = document.getElementById(
            fromPlayer ? "player-sprite-container" : "enemy-sprite-container"
          );
          attacker.style.opacity = "0";
          attacker.style.filter = "blur(5px)";
          await sleep(200 / spd);
          const shadow = attacker.cloneNode(true);
          layer.appendChild(shadow);
          shadow.style.position = "absolute";
          shadow.style.opacity = "0.7";
          shadow.style.filter = "grayscale(100%) brightness(0)";
          const anim = shadow.animate(
            [
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1.2)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1.4)`,
                opacity: 0,
              },
            ],
            { duration: 300 / spd }
          );
          await anim.finished;
          shadow.remove();
          attacker.style.opacity = "1";
          attacker.style.filter = "none";
          return;
        }

        if (type === "thunder_storm") {
          for (let i = 0; i < 5; i++) {
            const strike = document.createElement("div");
            strike.className = "vfx-lightning-strike";
            const offX = (Math.random() - 0.5) * 200;
            const offZ = (Math.random() - 0.5) * 100;
            strike.style.height = "800px";
            strike.style.transform = `translateX(${
              targetPos.x + offX
            }px) translateY(${targetPos.y - 400}px) translateZ(${
              targetPos.z + offZ
            }px) skewX(-10deg)`;
            layer.appendChild(strike);
            setTimeout(() => strike.remove(), 150 / spd);
            await sleep(100 / spd);
          }
          return;
        }

        if (type === "wind_blade") {
          const blade = document.createElement("div");
          blade.style.position = "absolute";
          blade.style.width = "60px";
          blade.style.height = "60px";
          blade.style.border = "4px solid #a5f3fc";
          blade.style.borderRadius = "50%";
          blade.style.boxShadow = "0 0 10px #fff";
          layer.appendChild(blade);
          const anim = blade.animate(
            [
              {
                transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) rotate(0deg) scale(0.5)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) rotate(720deg) scale(1.5)`,
              },
            ],
            { duration: 600 / spd, easing: "ease-in", fill: "forwards" }
          );
          await anim.finished;
          blade.remove();
          return;
        }

        if (type === "meteor_strike") {
          const meteor = document.createElement("div");
          meteor.className = "projectile vfx-fireball";
          meteor.style.width = "100px";
          meteor.style.height = "100px";
          layer.appendChild(meteor);
          const anim = meteor.animate(
            [
              {
                transform: `translateX(${
                  targetPos.x + 50
                }px) translateY(-500px) translateZ(${targetPos.z - 200}px)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px)`,
              },
            ],
            { duration: 800 / spd, easing: "ease-in", fill: "forwards" }
          );
          await anim.finished;
          meteor.style.transform = "scale(2)";
          meteor.style.opacity = "0";
          flash.className = "flash-screen";
          setTimeout(() => (flash.className = "hidden"), 200 / spd);
          meteor.remove();
          return;
        }

        if (type === "arcane_barrage") {
          for (let i = 0; i < 3; i++) {
            const p = document.createElement("div");
            p.className = "projectile vfx-void";
            p.style.width = "20px";
            p.style.height = "20px";
            p.style.background = "#d8b4fe";
            p.style.boxShadow = "0 0 10px #a855f7";
            layer.appendChild(p);
            const midX =
              (startPos.x + targetPos.x) / 2 + (Math.random() - 0.5) * 200;
            const midY = Math.min(startPos.y, targetPos.y) - 200;
            const anim = p.animate(
              [
                {
                  transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px)`,
                },
                {
                  transform: `translateX(${midX}px) translateY(${midY}px) translateZ(${
                    (startPos.z + targetPos.z) / 2
                  }px)`,
                  offset: 0.5,
                },
                {
                  transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px)`,
                },
              ],
              { duration: 600 / spd, easing: "ease-in-out", fill: "forwards" }
            );
            anim.finished.then(() => p.remove());
            await sleep(150 / spd);
          }
          return;
        }

        if (type === "earth_shatter") {
          for (let i = 0; i < 8; i++) {
            const rock = document.createElement("div");
            rock.className = "vfx-rock";
            rock.style.position = "absolute";
            rock.style.width = 20 + Math.random() * 30 + "px";
            rock.style.height = rock.style.width;
            layer.appendChild(rock);
            const anim = rock.animate(
              [
                {
                  transform: `translateX(${targetPos.x}px) translateY(${
                    targetPos.y + 50
                  }px) translateZ(${targetPos.z}px) scale(0)`,
                },
                {
                  transform: `translateX(${
                    targetPos.x + (Math.random() - 0.5) * 100
                  }px) translateY(${
                    targetPos.y - 100 - Math.random() * 100
                  }px) translateZ(${targetPos.z}px) scale(1) rotate(${
                    Math.random() * 360
                  }deg)`,
                },
                {
                  transform: `translateX(${
                    targetPos.x + (Math.random() - 0.5) * 120
                  }px) translateY(${targetPos.y + 50}px) translateZ(${
                    targetPos.z
                  }px) scale(1) rotate(${Math.random() * 360}deg)`,
                  opacity: 0,
                },
              ],
              { duration: 1000 / spd, easing: "cubic-bezier(0,1.5,1,1)" }
            );
            anim.finished.then(() => rock.remove());
          }
          return;
        }

        if (type === "lightning") {
          const flash = document.getElementById("screen-flash");
          flash.className = "flash-screen";
          const strike = document.createElement("div");
          strike.className = "vfx-lightning-strike";
          const tx = fromPlayer ? -35 : 35;
          const ty = fromPlayer ? -100 : 60;
          strike.style.transform = `translateX(${tx}px) translateY(${ty}px) skewX(-5deg)`;
          layer.appendChild(strike);
          setTimeout(() => {
            flash.className = "hidden";
            strike.remove();
          }, 300 / spd);
          await sleep(300 / spd);
          return;
        }

        const proj = document.createElement("div");
        proj.className = "projectile";
        if (type.includes("fire")) proj.classList.add("vfx-fireball");
        else if (type.includes("water")) proj.classList.add("vfx-waterball");
        else if (type.includes("earth")) proj.classList.add("vfx-rock");
        else if (type.includes("nature")) proj.classList.add("vfx-leaf");
        else if (type.includes("void")) proj.classList.add("vfx-void");
        else proj.classList.add("vfx-fireball");

        layer.appendChild(proj);
        const anim = proj.animate(
          [
            {
              transform: `translateX(${start.x}px) translateY(${start.y}px) translateZ(${start.z}px) scale(0.5)`,
            },
            {
              transform: `translateX(${end.x}px) translateY(${end.y}px) translateZ(${end.z}px) scale(1)`,
            },
          ],
          {
            duration: 500 / spd,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fill: "forwards",
          }
        );
        await anim.finished;
        proj.remove();

      // NEW ELEMENTAL SKILLS VFX
      if (type === "crystal_spear") {
        for (let i = 0; i < 8; i++) {
          const crystal = document.createElement("div");
          crystal.style.position = "absolute";
          crystal.style.width = "8px";
          crystal.style.height = "30px";
          crystal.style.background = "linear-gradient(135deg, #60a5fa, #a5f3fc, #fff)";
          crystal.style.boxShadow = "0 0 15px #60a5fa, 0 0 30px #a5f3fc";
          crystal.style.clipPath = "polygon(50% 0%, 100% 100%, 0% 100%)";
          crystal.style.transform = `translateX(${start.x}px) translateY(${start.y}px) translateZ(${start.z}px) rotate(${i * 45}deg)`;
          layer.appendChild(crystal);
          
          setTimeout(() => {
            crystal.animate(
              [
                { transform: `translateX(${start.x}px) translateY(${start.y}px) translateZ(${start.z}px) rotate(${i * 45}deg)` },
                { transform: `translateX(${end.x}px) translateY(${end.y}px) translateZ(${end.z}px) rotate(${i * 45 + 360}deg)` },
              ],
              { duration: 600 / spd, easing: "ease-out", fill: "forwards" }
            );
          }, i * 50 / spd);
          
          setTimeout(() => crystal.remove(), 700 / spd);
        }
        await sleep(700 / spd);
      }

      if (type === "lava_burst") {
        for (let i = 0; i < 12; i++) {
          const lava = document.createElement("div");
          lava.style.position = "absolute";
          lava.style.width = "20px";
          lava.style.height = "20px";
          lava.style.borderRadius = "50%";
          lava.style.background = i % 2 === 0 
            ? "radial-gradient(circle, #ff4500, #ff6347, #8b0000)" 
            : "radial-gradient(circle, #ffa500, #ff8c00, #654321)";
          lava.style.boxShadow = "0 0 20px #ff4500";
          const angle = (i / 12) * Math.PI * 2;
          const radius = 50;
          lava.style.transform = `translateX(${end.x}px) translateY(${end.y - 50}px) translateZ(${end.z}px)`;
          layer.appendChild(lava);
          
          lava.animate(
            [
              { transform: `translateX(${end.x}px) translateY(${end.y - 50}px) translateZ(${end.z}px) scale(0)`, opacity: 1 },
              { transform: `translateX(${end.x + Math.cos(angle) * radius}px) translateY(${end.y + Math.sin(angle) * radius - 30}px) translateZ(${end.z}px) scale(1.5)`, opacity: 0.5 },
            ],
            { duration: 800 / spd, easing: "ease-out", fill: "forwards" }
          );
          
          setTimeout(() => lava.remove(), 850 / spd);
        }
        await sleep(850 / spd);
      }

      if (type === "chain_lightning") {
        for (let i = 0; i < 5; i++) {
          const bolt = document.createElement("div");
          bolt.style.position = "absolute";
          bolt.style.width = "4px";
          bolt.style.height = "60px";
          bolt.style.background = "linear-gradient(to bottom, #fff, #60a5fa, #3b82f6)";
          bolt.style.boxShadow = "0 0 20px #60a5fa, 0 0 40px #3b82f6";
          const offsetX = (Math.random() - 0.5) * 40;
          const offsetY = (Math.random() - 0.5) * 40;
          bolt.style.transform = `translateX(${start.x + offsetX}px) translateY(${start.y + offsetY}px) translateZ(${start.z}px) rotate(${Math.random() * 30 - 15}deg)`;
          layer.appendChild(bolt);
          
          triggerFlash(80);
          
          setTimeout(() => {
            bolt.animate(
              [
                { opacity: 1, transform: `translateX(${start.x + offsetX}px) translateY(${start.y + offsetY}px) translateZ(${start.z}px) rotate(${Math.random() * 30 - 15}deg)` },
                { opacity: 1, transform: `translateX(${end.x + offsetX}px) translateY(${end.y + offsetY}px) translateZ(${end.z}px) rotate(${Math.random() * 30 - 15}deg)` },
                { opacity: 0, transform: `translateX(${end.x + offsetX}px) translateY(${end.y + offsetY}px) translateZ(${end.z}px) rotate(${Math.random() * 30 - 15}deg)` },
              ],
              { duration: 200 / spd, easing: "linear", fill: "forwards" }
            );
          }, i * 100 / spd);
          
          setTimeout(() => bolt.remove(), (i * 100 + 250) / spd);
        }
        await sleep(700 / spd);
      }

      if (type === "spectral_blade") {
        for (let i = 0; i < 3; i++) {
          const blade = document.createElement("div");
          blade.style.position = "absolute";
          blade.style.width = "60px";
          blade.style.height = "8px";
          blade.style.background = "linear-gradient(90deg, transparent, #a78bfa, #8b5cf6, transparent)";
          blade.style.boxShadow = "0 0 20px #a78bfa, 0 0 40px #8b5cf6";
          blade.style.transform = `translateX(${start.x}px) translateY(${start.y + i * 15}px) translateZ(${start.z}px) rotate(-45deg)`;
          layer.appendChild(blade);
          
          setTimeout(() => {
            blade.animate(
              [
                { transform: `translateX(${start.x}px) translateY(${start.y + i * 15}px) translateZ(${start.z}px) rotate(-45deg)`, opacity: 0.8 },
                { transform: `translateX(${end.x}px) translateY(${end.y + i * 15}px) translateZ(${end.z}px) rotate(-45deg)`, opacity: 1 },
                { transform: `translateX(${end.x + 30}px) translateY(${end.y + i * 15}px) translateZ(${end.z}px) rotate(-45deg)`, opacity: 0 },
              ],
              { duration: 500 / spd, easing: "ease-in-out", fill: "forwards" }
            );
          }, i * 100 / spd);
          
          setTimeout(() => blade.remove(), (i * 100 + 550) / spd);
        }
        await sleep(650 / spd);
      }
      };

      const spawnUltimateVFX = async (type, fromPlayer) => {
        const spd = battleState.speed;
        const layer = document.getElementById("effect-layer");
        const flash = document.getElementById("screen-flash");
        const pPos = { x: 35, y: 60, z: 250 };
        const ePos = { x: -35, y: -100, z: -450 };
        const targetPos = fromPlayer ? ePos : pPos;
        const startPos = fromPlayer ? pPos : ePos;

        // Flash ONLY for lightning/electric types
        if (type.includes("lightning")) {
          flash.className = "flash-screen";
          setTimeout(() => (flash.className = "hidden"), 300 / spd);

          for (let i = 0; i < 6; i++) {
            const strike = document.createElement("div");
            strike.className = "vfx-lightning-strike";
            const offX = (Math.random() - 0.5) * 100;
            strike.style.transform = `translateX(${
              targetPos.x + offX
            }px) translateY(${targetPos.y}px) translateZ(${
              targetPos.z
            }px) skewX(-5deg)`;
            layer.appendChild(strike);
            setTimeout(() => strike.remove(), 200 / spd);
            await sleep(80 / spd);
          }
          return;
        }
        if (type.includes("fire")) {
          const projectiles = [];
          for (let i = 0; i < 8; i++) {
            const p = document.createElement("div");
            p.className = "projectile vfx-fireball";
            p.style.width = "60px";
            p.style.height = "60px";
            layer.appendChild(p);
            const sX = startPos.x + (Math.random() - 0.5) * 100;
            const eX = targetPos.x + (Math.random() - 0.5) * 80;
            const anim = p.animate(
              [
                {
                  transform: `translateX(${sX}px) translateY(${
                    startPos.y - 200
                  }px) translateZ(${startPos.z}px) scale(0.5)`,
                },
                {
                  transform: `translateX(${eX}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1.2)`,
                },
              ],
              {
                duration: (400 + Math.random() * 200) / spd,
                easing: "ease-in",
                fill: "forwards",
              }
            );
            projectiles.push({ el: p, anim: anim });
            await sleep(50 / spd);
          }
          await Promise.all(projectiles.map((p) => p.anim.finished));
          projectiles.forEach((p) => p.el.remove());
          return;
        }
        if (type.includes("water")) {
          const projectiles = [];
          for (let i = 0; i < 10; i++) {
            const p = document.createElement("div");
            p.className = "projectile vfx-waterball";
            layer.appendChild(p);
            const eX = targetPos.x + (Math.random() - 0.5) * 120;
            const anim = p.animate(
              [
                {
                  transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) scale(0.2)`,
                },
                {
                  transform: `translateX(${eX}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1)`,
                },
              ],
              {
                duration: 600 / spd,
                easing: "cubic-bezier(0,0.5,0.5,1)",
                fill: "forwards",
              }
            );
            projectiles.push({ el: p, anim: anim });
            await sleep(30 / spd);
          }
          await sleep(500 / spd);
          projectiles.forEach((p) => p.el.remove());
          return;
        }
        if (type.includes("earth")) {
          const projectiles = [];
          for (let i = 0; i < 5; i++) {
            const p = document.createElement("div");
            p.className = "projectile vfx-rock";
            p.style.width = "70px";
            p.style.height = "70px";
            layer.appendChild(p);
            const sX = startPos.x + (Math.random() - 0.5) * 150;
            const eX = targetPos.x + (Math.random() - 0.5) * 50;
            const anim = p.animate(
              [
                {
                  transform: `translateX(${sX}px) translateY(${
                    startPos.y - 150
                  }px) translateZ(${startPos.z}px) scale(0.5) rotate(0deg)`,
                },
                {
                  transform: `translateX(${eX}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1.5) rotate(360deg)`,
                },
              ],
              { duration: 700 / spd, easing: "ease-in", fill: "forwards" }
            );
            projectiles.push({ el: p, anim: anim });
            await sleep(100 / spd);
          }
          await sleep(600 / spd);
          projectiles.forEach((p) => p.el.remove());
          return;
        }
        if (type.includes("void")) {
          const p = document.createElement("div");
          p.className = "vfx-blackhole";
          layer.appendChild(p);

          const anim = p.animate(
            [
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`,
              },
              {
                transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(8)`,
              },
            ],
            { duration: 1500 / spd, easing: "ease-out", fill: "forwards" }
          );

          await anim.finished;
          p.style.transition = "opacity 0.2s";
          p.style.opacity = 0;
          await sleep(200 / spd);
          p.remove();
          return;
        }

        // NEW SUPREME SKILLS
        if (type === "sup_silver_rain") {
          for (let i = 0; i < 15; i++) {
            const beam = document.createElement("div");
            beam.style.position = "absolute";
            beam.style.width = "4px";
            beam.style.height = "100px";
            beam.style.background = "linear-gradient(to bottom, transparent, #fff, #fef08a)";
            beam.style.boxShadow = "0 0 10px #fff";
            layer.appendChild(beam);
            const x = targetPos.x + (Math.random() - 0.5) * 150;
            const z = targetPos.z + (Math.random() - 0.5) * 100;
            beam.animate([
              { transform: `translateX(${x}px) translateY(${targetPos.y - 1000}px) translateZ(${z}px) scaleY(2)`, opacity: 0 },
              { transform: `translateX(${x}px) translateY(${targetPos.y}px) translateZ(${z}px) scaleY(1)`, opacity: 1, offset: 0.8 },
              { transform: `translateX(${x}px) translateY(${targetPos.y}px) translateZ(${z}px) scaleY(0)`, opacity: 0 }
            ], { duration: 400 / spd, easing: "ease-in" }).finished.then(() => beam.remove());
            await sleep(50 / spd);
          }
          return;
        }

        if (type === "sup_black_lotus") {
          const flower = document.createElement("div");
          flower.style.position = "absolute";
          flower.innerText = "🪷";
          flower.style.fontSize = "8rem";
          flower.style.filter = "drop-shadow(0 0 20px #a855f7) hue-rotate(280deg)";
          layer.appendChild(flower);
          await flower.animate([
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0) rotate(0deg)`, opacity: 0 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(2) rotate(360deg)`, opacity: 1, offset: 0.5 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(4)`, opacity: 0 }
          ], { duration: 1200 / spd, easing: "ease-out" }).finished;
          flower.remove();
          return;
        }

        if (type === "sup_dragon_breath") {
          for (let i = 0; i < 20; i++) {
            const fire = document.createElement("div");
            fire.className = "vfx-fireball";
            fire.style.width = "40px";
            fire.style.height = "40px";
            fire.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg) blur(5px)`;
            layer.appendChild(fire);
            fire.animate([
              { transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) scale(0.5)`, opacity: 1 },
              { transform: `translateX(${targetPos.x + (Math.random()-0.5)*150}px) translateY(${targetPos.y + (Math.random()-0.5)*100}px) translateZ(${targetPos.z}px) scale(3)`, opacity: 0 }
            ], { duration: 800 / spd, easing: "ease-out" }).finished.then(() => fire.remove());
            await sleep(20 / spd);
          }
          return;
        }

        if (type === "sup_ether_chains") {
          for (let i = 0; i < 4; i++) {
            const chain = document.createElement("div");
            chain.style.position = "absolute";
            chain.style.width = "400px";
            chain.style.height = "2px";
            chain.style.background = "cyan";
            chain.style.boxShadow = "0 0 10px blue";
            layer.appendChild(chain);
            chain.animate([
              { transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) rotate(${i * 45}deg) scaleX(0)`, opacity: 0 },
              { transform: `translateX(${(startPos.x+targetPos.x)/2}px) translateY(${(startPos.y+targetPos.y)/2}px) translateZ(${(startPos.z+targetPos.z)/2}px) rotate(${i * 45}deg) scaleX(1)`, opacity: 1 },
              { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) rotate(${i * 45}deg) scaleX(0)`, opacity: 0 }
            ], { duration: 1000 / spd }).finished.then(() => chain.remove());
            await sleep(100 / spd);
          }
          return;
        }

        if (type === "sup_gravity_pulse") {
          const app = document.getElementById("app");
          app.classList.add("anim-shake-crit");
          const pulse = document.createElement("div");
          pulse.style.position = "absolute";
          pulse.style.width = "200px";
          pulse.style.height = "200px";
          pulse.style.border = "10px solid #7c3aed";
          pulse.style.borderRadius = "50%";
          pulse.style.filter = "blur(10px)";
          layer.appendChild(pulse);
          await pulse.animate([
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`, opacity: 1 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(5)`, opacity: 0 }
          ], { duration: 800 / spd }).finished;
          pulse.remove();
          app.classList.remove("anim-shake-crit");
          return;
        }

        if (type === "sup_ice_butterflies") {
          for (let i = 0; i < 12; i++) {
            const b = document.createElement("div");
            b.innerText = "🦋";
            b.style.position = "absolute";
            b.style.fontSize = "2rem";
            b.style.filter = "hue-rotate(180deg) brightness(2)";
            layer.appendChild(b);
            const angle = (i / 12) * Math.PI * 2;
            b.animate([
              { transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) scale(0)`, opacity: 1 },
              { transform: `translateX(${targetPos.x + Math.cos(angle)*100}px) translateY(${targetPos.y + Math.sin(angle)*100}px) translateZ(${targetPos.z}px) scale(1.5)`, opacity: 0 }
            ], { duration: 1000 / spd, easing: "ease-out" }).finished.then(() => b.remove());
            await sleep(50 / spd);
          }
          return;
        }

        if (type === "sup_forest_fury") {
          for (let i = 0; i < 8; i++) {
            const root = document.createElement("div");
            root.style.position = "absolute";
            root.style.width = "30px";
            root.style.height = "150px";
            root.style.background = "linear-gradient(#422006, #15803d)";
            root.style.borderRadius = "50% 50% 0 0";
            layer.appendChild(root);
            const x = targetPos.x + (Math.random() - 0.5) * 120;
            const z = targetPos.z + (Math.random() - 0.5) * 60;
            root.animate([
              { transform: `translateX(${x}px) translateY(${targetPos.y + 100}px) translateZ(${z}px) scaleY(0)`, opacity: 1 },
              { transform: `translateX(${x}px) translateY(${targetPos.y - 50}px) translateZ(${z}px) scaleY(1.5)`, opacity: 1, offset: 0.7 },
              { transform: `translateX(${x}px) translateY(${targetPos.y}px) translateZ(${z}px) scaleY(0)`, opacity: 0 }
            ], { duration: 800 / spd }).finished.then(() => root.remove());
            await sleep(80 / spd);
          }
          return;
        }

        if (type === "sup_celestial_judgement") {
          flash.className = "flash-screen";
          setTimeout(() => (flash.className = "hidden"), 200 / spd);
          const sword = document.createElement("div");
          sword.style.position = "absolute";
          sword.innerText = "🗡️";
          sword.style.fontSize = "15rem";
          sword.style.filter = "drop-shadow(0 0 30px #fff) brightness(2)";
          layer.appendChild(sword);
          await sword.animate([
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y - 1000}px) translateZ(${targetPos.z}px) rotate(180deg)`, opacity: 0 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) rotate(180deg)`, opacity: 1, offset: 0.8 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(2) rotate(180deg)`, opacity: 0 }
          ], { duration: 1000 / spd, easing: "ease-in" }).finished;
          sword.remove();
          return;
        }

        if (type === "sup_plasma_vortex") {
          const vortex = document.createElement("div");
          vortex.style.position = "absolute";
          vortex.style.width = "100px";
          vortex.style.height = "100px";
          vortex.style.background = "radial-gradient(circle, #fff, #3b82f6, transparent)";
          vortex.style.borderRadius = "50%";
          vortex.style.filter = "blur(10px) contrast(2)";
          layer.appendChild(vortex);
          const anim = vortex.animate([
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(1) rotate(0deg)` },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(4) rotate(1080deg)`, opacity: 0 }
          ], { duration: 1500 / spd });
          for (let i = 0; i < 10; i++) {
            const spark = document.createElement("div");
            spark.className = "vfx-lightning-strike";
            spark.style.height = "100px";
            spark.style.width = "2px";
            layer.appendChild(spark);
            spark.style.transform = `translateX(${targetPos.x + (Math.random()-0.5)*200}px) translateY(${targetPos.y + (Math.random()-0.5)*100}px) translateZ(${targetPos.z}px)`;
            setTimeout(() => spark.remove(), 100 / spd);
            await sleep(100 / spd);
          }
          await anim.finished;
          vortex.remove();
          return;
        }

        if (type === "sup_dark_comet") {
          const comet = document.createElement("div");
          comet.style.position = "absolute";
          comet.style.width = "80px";
          comet.style.height = "80px";
          comet.style.background = "radial-gradient(circle, #a855f7, #000)";
          comet.style.borderRadius = "50%";
          comet.style.boxShadow = "0 0 40px #7e22ce, 0 0 100px #000";
          layer.appendChild(comet);
          await comet.animate([
            { transform: `translateX(${targetPos.x + 400}px) translateY(${targetPos.y - 600}px) translateZ(${targetPos.z - 200}px) scale(0.5)`, opacity: 0 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(2)`, opacity: 1, offset: 0.9 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(5)`, opacity: 0 }
          ], { duration: 1200 / spd, easing: "ease-in" }).finished;
          comet.remove();
          return;
        }

          // NEW SUPREME SKILLS VFX
      if (type === "sup_cosmic_storm") {
        for (let i = 0; i < 30; i++) {
          const star = document.createElement("div");
          star.style.position = "absolute";
          star.style.width = "6px";
          star.style.height = "6px";
          star.style.borderRadius = "50%";
          star.style.background = `radial-gradient(circle, #fff, ${i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#60a5fa' : '#f472b6'})`;
          star.style.boxShadow = `0 0 15px ${i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#60a5fa' : '#f472b6'}`;
          const angle = (i / 30) * Math.PI * 2;
          const radius = 80 + Math.random() * 40;
          star.style.transform = `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px)`;
          layer.appendChild(star);
          
          star.animate(
            [
              { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`, opacity: 0 },
              { transform: `translateX(${targetPos.x + Math.cos(angle) * radius}px) translateY(${targetPos.y + Math.sin(angle) * radius}px) translateZ(${targetPos.z}px) scale(1)`, opacity: 1 },
              { transform: `translateX(${targetPos.x + Math.cos(angle) * radius * 0.5}px) translateY(${targetPos.y + Math.sin(angle) * radius * 0.5}px) translateZ(${targetPos.z}px) scale(0)`, opacity: 0 },
            ],
            { duration: 1500 / spd, easing: "ease-out", fill: "forwards" }
          );
          
          setTimeout(() => star.remove(), 1600 / spd);
        }
        await sleep(1600 / spd);
        return;
      }

      if (type === "sup_infernal_apocalypse") {
        for (let i = 0; i < 8; i++) {
          const meteor = document.createElement("div");
          meteor.style.position = "absolute";
          meteor.style.width = "30px";
          meteor.style.height = "30px";
          meteor.style.borderRadius = "50%";
          meteor.style.background = "radial-gradient(circle, #fff, #ff4500, #8b0000)";
          meteor.style.boxShadow = "0 0 30px #ff4500, 0 0 60px #ff6347";
          const offsetX = (Math.random() - 0.5) * 100;
          const offsetY = (Math.random() - 0.5) * 100;
          meteor.style.transform = `translateX(${targetPos.x + offsetX}px) translateY(${targetPos.y + offsetY - 200}px) translateZ(${targetPos.z}px)`;
          layer.appendChild(meteor);
          
          setTimeout(() => {
            meteor.animate(
              [
                { transform: `translateX(${targetPos.x + offsetX}px) translateY(${targetPos.y + offsetY - 200}px) translateZ(${targetPos.z}px) scale(0.5)`, opacity: 1 },
                { transform: `translateX(${targetPos.x + offsetX}px) translateY(${targetPos.y + offsetY}px) translateZ(${targetPos.z}px) scale(2)`, opacity: 1 },
                { transform: `translateX(${targetPos.x + offsetX}px) translateY(${targetPos.y + offsetY + 20}px) translateZ(${targetPos.z}px) scale(0)`, opacity: 0 },
              ],
              { duration: 800 / spd, easing: "ease-in", fill: "forwards" }
            );
          }, i * 150 / spd);
          
          setTimeout(() => meteor.remove(), (i * 150 + 850) / spd);
        }
        await sleep(2000 / spd);
        return;
      }

      if (type === "sup_frozen_eternity") {
        for (let i = 0; i < 20; i++) {
          const ice = document.createElement("div");
          ice.style.position = "absolute";
          ice.style.width = "15px";
          ice.style.height = "15px";
          ice.style.background = "linear-gradient(135deg, #a5f3fc, #60a5fa, #fff)";
          ice.style.boxShadow = "0 0 20px #60a5fa, 0 0 40px #a5f3fc";
          ice.style.clipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
          const angle = (i / 20) * Math.PI * 2;
          const radius = 60;
          ice.style.transform = `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`;
          layer.appendChild(ice);
          
          ice.animate(
            [
              { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0) rotate(0deg)`, opacity: 0 },
              { transform: `translateX(${targetPos.x + Math.cos(angle) * radius}px) translateY(${targetPos.y + Math.sin(angle) * radius}px) translateZ(${targetPos.z}px) scale(1.5) rotate(360deg)`, opacity: 1 },
            ],
            { duration: 1200 / spd, easing: "ease-out", fill: "forwards" }
          );
          
          setTimeout(() => ice.remove(), 1300 / spd);
        }
        await sleep(1300 / spd);
        return;
      }

      if (type === "sup_natures_wrath") {
        for (let i = 0; i < 15; i++) {
          const vine = document.createElement("div");
          vine.style.position = "absolute";
          vine.style.width = "8px";
          vine.style.height = "80px";
          vine.style.background = "linear-gradient(to bottom, #22c55e, #16a34a, #15803d)";
          vine.style.boxShadow = "0 0 15px #22c55e";
          vine.style.borderRadius = "4px";
          const angle = (i / 15) * Math.PI * 2;
          const radius = 50;
          vine.style.transform = `translateX(${targetPos.x}px) translateY(${targetPos.y + 50}px) translateZ(${targetPos.z}px) scale(0)`;
          layer.appendChild(vine);
          
          setTimeout(() => {
            vine.animate(
              [
                { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y + 50}px) translateZ(${targetPos.z}px) scale(0) rotate(0deg)`, opacity: 0 },
                { transform: `translateX(${targetPos.x + Math.cos(angle) * radius}px) translateY(${targetPos.y - 30}px) translateZ(${targetPos.z}px) scale(1) rotate(${angle * 180 / Math.PI}deg)`, opacity: 1 },
              ],
              { duration: 1000 / spd, easing: "ease-out", fill: "forwards" }
            );
          }, i * 50 / spd);
          
          setTimeout(() => vine.remove(), (i * 50 + 1100) / spd);
        }
        await sleep(1800 / spd);
        return;
      }

      if (type === "sup_void_collapse") {
        const blackHole = document.createElement("div");
        blackHole.style.position = "absolute";
        blackHole.style.width = "100px";
        blackHole.style.height = "100px";
        blackHole.style.borderRadius = "50%";
        blackHole.style.background = "radial-gradient(circle, #000, #1a1a2e, #16213e)";
        blackHole.style.boxShadow = "0 0 50px #8b5cf6, 0 0 100px #6366f1, inset 0 0 50px #000";
        blackHole.style.transform = `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`;
        layer.appendChild(blackHole);
        
        blackHole.animate(
          [
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`, opacity: 0 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(2)`, opacity: 1 },
            { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0.1)`, opacity: 0 },
          ],
          { duration: 1500 / spd, easing: "ease-in-out", fill: "forwards" }
        );
        
        for (let i = 0; i < 25; i++) {
          const particle = document.createElement("div");
          particle.style.position = "absolute";
          particle.style.width = "4px";
          particle.style.height = "4px";
          particle.style.borderRadius = "50%";
          particle.style.background = "#a78bfa";
          particle.style.boxShadow = "0 0 10px #a78bfa";
          const angle = (i / 25) * Math.PI * 2;
          const startRadius = 120;
          particle.style.transform = `translateX(${targetPos.x + Math.cos(angle) * startRadius}px) translateY(${targetPos.y + Math.sin(angle) * startRadius}px) translateZ(${targetPos.z}px)`;
          layer.appendChild(particle);
          
          particle.animate(
            [
              { transform: `translateX(${targetPos.x + Math.cos(angle) * startRadius}px) translateY(${targetPos.y + Math.sin(angle) * startRadius}px) translateZ(${targetPos.z}px)`, opacity: 1 },
              { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px)`, opacity: 0 },
            ],
            { duration: 1200 / spd, easing: "ease-in", fill: "forwards" }
          );
          
          setTimeout(() => particle.remove(), 1250 / spd);
        }
        
        setTimeout(() => blackHole.remove(), 1600 / spd);
        await sleep(1600 / spd);
        return;
    }
      };

      const showDmgText = (val, targetId, isCrit) => {
        const el = document.createElement("div");
        el.className = "dmg-text";
        if (isCrit) el.classList.add("dmg-crit");
        el.innerText = val + (isCrit ? "!" : "");
        document.getElementById(targetId).appendChild(el);
        setTimeout(() => el.remove(), 800 / battleState.speed);
      };

      const updateBattleHUD = () => {
        const pPct =
          (battleState.player.curHp / battleState.player.maxHp) * 100;
        const mPct = (battleState.player.mp / battleState.player.maxMp) * 100;
        const ePct = (battleState.enemy.curHp / battleState.enemy.maxHp) * 100;
        document.getElementById("hud-p-hp-bar").style.width = `${pPct}%`;
        document.getElementById("hud-p-hp-txt").innerText =
          Math.ceil(pPct) + "%";
        document.getElementById("hud-p-mp-bar").style.width = `${mPct}%`;
        document.getElementById("hud-e-hp-bar").style.width = `${ePct}%`;
        document.getElementById("hud-e-hp-txt").innerText =
          Math.ceil(ePct) + "%";
        document.getElementById("hud-e-name").innerText =
          battleState.enemy.name;
      };

      const winBattle = () => endScreen(true);
      const loseBattle = () => endScreen(false);

      const endScreen = (win) => {
        const ov = document.getElementById("battle-overlay");
        ov.classList.remove("hidden");
        ov.classList.add("flex");
        void ov.offsetWidth;
        ov.style.opacity = "1";
        document.getElementById("outcome-title").innerText = win
          ? "VITÓRIA"
          : "DERROTA";

        let repeatCancelled = false;
        
        // AUTO REPEAT LOGIC UI
        if (battleState.repeatCount > 0) {
             const btn = document.querySelector("#battle-overlay button");
             if (btn) btn.innerText = `Parar Auto (${battleState.repeatCount})`;
             btn.onclick = () => {
                 battleState.repeatCount = 0;
                 btn.innerText = "Continuar";
                 btn.onclick = closeBattle;
             };
        } else {
             const btn = document.querySelector("#battle-overlay button");
             if (btn) {
                 btn.innerText = "Continuar";
                 btn.onclick = closeBattle;
             }
        }

        if (win) {
          let rewards = "";
          
          // --- MONSTER XP LOGIC ---
          const hero = state.inventory[prepState.selectedMonIdx]; // FIXED: selectedIdx -> selectedMonIdx
          // XP Formula: Base * Level * Multiplier
          let xpBase = 100;
          if (battleState.mode.startsWith("dungeon")) xpBase = 300;
          if (battleState.mode === "dungeon_xp") xpBase = 2000; // Massive XP in XP Dungeon
          
          let xpAmount = Math.floor(xpBase * (1 + prepState.level * 0.2));

          // XP BOOST CHECK
          if (state.user.xpBoostEndTime && Date.now() < state.user.xpBoostEndTime) {
               xpAmount *= 3;
               rewards += `<div class='text-emerald-400 font-bold text-xs mt-1 animate-pulse'>XP BOOST ATIVO (3x)!</div>`;
          }
          
           // Apply XP
           addXP(hero, xpAmount);

          // Account XP (Minor)
          const accXp = 50;
          state.user.xp += accXp;

          const accXpReq = 100 * state.user.lvl;
          if (state.user.xp >= accXpReq) {
            state.user.xp = state.user.xp - accXpReq;
            state.user.lvl++;
            state.user.crystals += 25;
            showToast(`LEVEL UP! Nível ${state.user.lvl} (+25 💎)`);
          }

          let crystalsGained = 0;
          let goldGained = 0;

          if (battleState.mode.startsWith("dungeon")) {
            const floor = prepState.level;
            
            // Dungeon Cleared? Mark it for Auto/Speed unlock
            state.user.dungeonClear = state.user.dungeonClear || {};
            if (!state.user.dungeonClear[battleState.mode]) {
                state.user.dungeonClear[battleState.mode] = true;
                showToast("Auto & 3x Liberados para esta masmorra!", "success");
            }

            goldGained = 4000 + floor * 500; 
            crystalsGained = 1 + Math.floor(floor/2);

            // DROP LOGIC
            let dropRate = 0.3 + floor * 0.02; // Base 30%
            
            // XP Dungeon drops LESS items/gold, mostly XP
            if (battleState.mode === "dungeon_xp") {
                goldGained = 1000 + floor * 100; // Less gold in XP dungeon
                dropRate = 0.05; // Very low drop rate
                rewards = `XP: ${xpAmount} | Ouro: ${goldGained}`;
            }

            if (Math.random() < dropRate && battleState.mode !== "dungeon_xp") {
              const dungeonType = battleState.mode.includes("dragon")
                ? "dragon"
                : "golem";
              const droppedEq = createEquipment(floor, dungeonType);
              state.equipment.push(droppedEq);
              const rName = EQ_RARITY[droppedEq.rarity].name;
              rewards = `<div class='text-sm text-yellow-300 font-bold mb-1'>DROP RARO!</div>
                         <div class='text-xs text-white'>${rName} ${droppedEq.type === 'weapon' ? 'Arma' : droppedEq.type === 'armor' ? 'Armadura' : 'Acessório'}</div>`;
            } else {
              rewards = rewards || `<div class='flex gap-4 justify-center'>
                                      <div class='text-yellow-400 font-bold text-sm'>+${goldGained} Ouro</div>
                                      <div class='text-cyan-400 font-bold text-sm'>+${crystalsGained} 💎</div>
                                    </div>`;
            }
          } else if (battleState.mode === "tower") {
            state.towerFloor++;
            crystalsGained = 50 + state.towerFloor * 10;
            goldGained = 3000 * state.towerFloor; 
            rewards = `<div class='text-green-400 font-bold text-lg'>Andar ${state.towerFloor - 1} Completo!</div>
                       <div class='flex gap-4 justify-center mt-2'>
                          <span class='text-yellow-400'>+${goldGained} Ouro</span>
                          <span class='text-cyan-400'>+${crystalsGained} 💎</span>
                       </div>`;
          } else {
            const stage = prepState.level;
            const stageKey = `stage_${stage}`;
            if (!state.user.firstClear[stageKey]) {
              crystalsGained = 100;
              goldGained = 5000 * stage; 
              state.user.firstClear[stageKey] = true;
              if (stage === state.storyProgress) state.storyProgress++;
              rewards = `<div class='text-purple-400 font-black text-lg animate-pulse'>PRIMEIRA VEZ!</div>
                         <div class='flex gap-4 justify-center mt-2'>
                            <span class='text-yellow-400 font-bold'>+${goldGained} 🪙</span>
                            <span class='text-cyan-400 font-bold'>+${crystalsGained} 💎</span>
                         </div>`;
            } else {
              crystalsGained = 5;
              goldGained = 1000 + stage * 300; 
              rewards = `<div class='flex gap-4 justify-center'>
                            <span class='text-yellow-400 font-bold'>+${goldGained} 🪙</span>
                            <span class='text-cyan-400 font-bold'>+${crystalsGained} 💎</span>
                         </div>`;
            }
          }

          state.user.crystals += crystalsGained;
          state.user.gold += goldGained;
          save();
          updateHeader();
          
          const xpHTML = xpAmount 
             ? `<div class='mt-3 pt-3 border-t border-white/10 flex justify-between items-center'>
                    <div class='text-left'>
                        <div class='text-[10px] text-slate-400 uppercase font-bold tracking-wider'>HERÓI XP</div>
                        <div class='text-green-400 font-black text-xl'>+${xpAmount} XP</div>
                    </div>
                    <div class='text-right'>
                         <div class='text-[10px] text-slate-400 uppercase font-bold tracking-wider'>RANK XP</div>
                         <div class='text-blue-400 font-black text-xl'>+50</div>
                    </div>
                </div>`
             : "";

          document.getElementById("outcome-rewards").innerHTML = `
              <div class="bg-slate-900/90 p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md">
                 ${rewards}
                 ${xpHTML}
              </div>
          `;
          
          // AUTO REPEAT HANDLER
          if (battleState.repeatCount > 0) {
              battleState.repeatCount--;
              if (battleState.repeatCount > 0) {
                  showToast(`Próxima batalha em 2s... (${battleState.repeatCount} restantes)`);
                  setTimeout(() => {
                      if (!document.getElementById("battle-overlay").classList.contains("hidden")) { // Check if not closed manually
                        startBattle(true); // Restart
                      }
                  }, 2000);
              } else {
                  showToast("Ciclo de Farm Concluído!");
              }
          }
          
        } else {
          battleState.repeatCount = 0; // Stop on lose
          document.getElementById("outcome-rewards").innerText =
            "Tente melhorar seu time";
        }
      };



      const addXP = (mon, xpAmount) => {
        const maxLvl = MAX_LEVELS[mon.stars] || 40;
        if (mon.lvl >= maxLvl) return;

        mon.curXp = mon.curXp || 0;
        mon.curXp += xpAmount;

        let xpReq = Math.floor(500 * Math.pow(mon.lvl, 1.1));
        let didLevel = false;

        while (mon.curXp >= xpReq && mon.lvl < maxLvl) {
          mon.curXp -= xpReq;
          mon.lvl++;
          didLevel = true;
          xpReq = Math.floor(500 * Math.pow(mon.lvl, 1.1));
        }

        if (didLevel) showToast(`${mon.name} subiu para o Nível ${mon.lvl}!`, "success");
      };

      const renderMonsterBox = () => {
  const grid = document.getElementById("roster-grid");
  if (!grid) return;
  grid.innerHTML = "";
  document.getElementById("mon-count").innerText = state.inventory.length;

  const fragment = document.createDocumentFragment();
  
  // Sort for display: Stars Desc > Level Desc
  // Maintain original index for actions
  const displayList = state.inventory.map((mon, idx) => ({mon, idx}));
  displayList.sort((a,b) => {
      if (b.mon.stars !== a.mon.stars) return b.mon.stars - a.mon.stars;
      return b.mon.lvl - a.mon.lvl;
  });

  displayList.forEach(({mon, idx}) => {
    const slot = document.createElement("div");
    const isLeader = idx === state.leaderIdx;
    
    // Rarity classes for automatic styling from CSS
    let rarityClass = "rarity-common";
    if (mon.stars === 5) rarityClass = "rarity-legendary";
    else if (mon.stars === 4) rarityClass = "rarity-epic";
    else if (mon.stars === 3) rarityClass = "rarity-rare";

    slot.className = `sw-slot aspect-square cursor-pointer flex items-center justify-center relative ${rarityClass} ${
      isLeader ? "selected" : ""
    }`;

    const elColor =
      {
        fire: "bg-fire",
        water: "bg-water",
        lightning: "bg-lightning",
        earth: "bg-earth",
        nature: "bg-nature",
        void: "bg-void",
      }[mon.element] || "bg-slate-500";

    const elGradient = `bg-${mon.element || 'slate'}-gradient`;

    slot.innerHTML = `
      <!-- Element Background Glow -->
      <div class="element-glow ${elGradient}"></div>
      
      <!-- Leader Badge -->
      ${isLeader ? '<div class="leader-badge">L</div>' : ''}
      
      <!-- Element Badge -->
      <div class="elem-badge ${elColor}"></div>
      
      <!-- Level Badge -->
      <div class="level-badge">Lv.${mon.lvl}</div>
      ${mon.lvl >= (MAX_LEVELS[mon.stars] || 40) ? '<div class="absolute top-0 left-0 bg-gradient-to-br from-red-600 to-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-br-lg z-50 border-r border-b border-red-700 shadow-lg">MAX</div>' : ''}
      
      <!-- Character Image / Emoji Fallback -->
      <img src="${mon.img}" class="w-[85%] h-[85%] object-contain filter drop-shadow-lg z-10 transition-transform group-hover:scale-110" 
           onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
      <span style="display:none;font-size:2.5rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));z-index:10;">${mon.emoji}</span>
      
      <!-- Name Label -->
      <div class="name-label">${mon.name}</div>
      
      <!-- Star Row -->
      <div class="star-row">
        ${
           mon.stars === 6 
           ? '<span class="star-icon text-fuchsia-400 drop-shadow-[0_0_2px_rgba(192,38,211,0.8)]">★</span>'.repeat(6)
           : '<span class="star-icon">★</span>'.repeat(mon.stars)
        }
      </div>
    `;
    
    slot.onclick = () => openDetail(idx);
    fragment.appendChild(slot);
  });
  grid.appendChild(fragment);
};
      let selectedDetailIdx = 0;

      const openDetail = (idx) => {
  selectedDetailIdx = idx;
  const mon = state.inventory[idx];
  if (!mon) return;

  const tpl = MONSTERS_DB.find(m => m.id === mon.id) || {};
  const safeMon = { 
      name: "Unknown", 
      role: "fighter", 
      type: "Normal", 
      element: "neutral", 
      stars: 1, 
      img: "", 
      emoji: "❓",
      skills: [],
      ...tpl, 
      ...mon 
  };
  
  if(!safeMon.name && mon.id) safeMon.name = mon.id.toUpperCase();

  changeView("view-character-detail");

  document.getElementById("det-name").innerText = safeMon.name || "Unknown";
  document.getElementById("det-type").innerText = (safeMon.role ? `[${safeMon.role.toUpperCase()}] ` : "") + (safeMon.type || "Unknown Type");
  
  const maxLvl = MAX_LEVELS[safeMon.stars] || 40;
  
  const starContainer = document.getElementById("det-stars");
  if(starContainer) {
      if(safeMon.stars === 6) {
          starContainer.innerHTML = '<span class="text-fuchsia-400 drop-shadow-[0_0_2px_rgba(192,38,211,0.8)]">★</span>'.repeat(6);
      } else {
          starContainer.innerHTML = "★".repeat(Math.max(1, safeMon.stars || 1));
      }
  }

  document.getElementById("det-nat-grade").innerText = `NAT ${safeMon.stars || 1}`;
  
  const elMap = {
    fire: "🔥",
    water: "🌊",
    lightning: "⚡",
    earth: "🗿",
    nature: "🍃",
    void: "🌑",
    neutral: "⚪"
  };
  document.getElementById("det-element-badge").innerText = elMap[safeMon.element] || "❓";
  
  const imgEL = document.getElementById("det-img");
  const emojiEL = document.getElementById("det-emoji");
  if (safeMon.img && safeMon.img !== "") {
     imgEL.style.display = "block";
     emojiEL.style.display = "none";
     imgEL.src = safeMon.img;
  } else {
     imgEL.style.display = "none";
     emojiEL.style.display = "block";
     emojiEL.innerText = safeMon.emoji || "❓";
  }

  const stats = calculateStats(safeMon);
  document.getElementById("val-hp").innerText = Math.floor(stats.hp);
  document.getElementById("val-atk").innerText = Math.floor(stats.atk);
  document.getElementById("val-def").innerText = Math.floor(stats.def);
  document.getElementById("val-spd").innerText = 100;
  document.getElementById("val-crit").innerText = (stats.crit||0) + "%";
  document.getElementById("val-cdmg").innerText = (stats.cdmg||0) + "%";

  document.getElementById("bar-hp").style.width = Math.min(100, (stats.hp / 30000) * 100) + "%";
  document.getElementById("bar-atk").style.width = Math.min(100, (stats.atk / 4000) * 100) + "%";
  document.getElementById("bar-def").style.width = Math.min(100, (stats.def / 2000) * 100) + "%";

  if(safeMon.equipped) {
      renderEqSlot("weapon", safeMon.equipped.weapon);
      renderEqSlot("armor", safeMon.equipped.armor);
      renderEqSlot("acc", safeMon.equipped.acc);
  }

  const btn = document.getElementById("btn-equip");
  if (state.leaderIdx === idx) {
    btn.innerText = "Líder Atual";
    btn.className = "w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold uppercase rounded-lg opacity-90 cursor-default shadow-md";
    btn.onclick = null;
  } else {
    btn.innerText = "Definir Líder";
    btn.className = "w-full py-2 mt-2 bg-white text-slate-900 text-sm font-bold uppercase rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition-all";
    btn.onclick = () => { equipLeader(idx); };
  }
  
  const lvlEl = document.getElementById("det-lvl");
  if (lvlEl && lvlEl.parentNode) {
       lvlEl.parentNode.innerHTML = `
          <span id="det-lvl" class="text-3xl font-black text-white leading-none">${safeMon.lvl}</span>
          <span class="text-xs text-slate-500">/ ${maxLvl}</span>
          ${safeMon.lvl >= maxLvl ? '<span class="ml-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-red-400">MAX</span>' : ''}
       `;
  }

  const xpReq = Math.floor(500 * Math.pow(safeMon.lvl, 1.1));
  const curXp = safeMon.curXp || 0;
  const xpPct = Math.min(100, (curXp / xpReq) * 100);
  
  const bar = document.getElementById("det-xp-bar");
  if(bar) bar.style.width = `${xpPct}%`;
  
  const txt = document.getElementById("det-xp-text");
  if(txt) txt.innerText = `${Math.floor(curXp)} / ${xpReq} XP`;

  const potBtnContainer = document.getElementById("detail-pot-btn-container");
  if(potBtnContainer) {
     potBtnContainer.innerHTML = `
       <button onclick="usePotion()" class="w-full bg-slate-800 border border-purple-500/30 rounded-xl px-4 py-3 flex items-center justify-between group active:scale-95 transition-all">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-lg text-purple-400">🧪</div>
            <div class="text-left">
              <div class="text-white font-bold text-xs uppercase">Usar Poção</div>
              <div class="text-purple-300 text-[10px]">+500 XP</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-white font-black text-sm">x${state.user.potions || 0}</div>
          </div>
       </button>
     `;
  }

  const skillCont = document.getElementById("det-skills-container");
  if (skillCont) {
      skillCont.innerHTML = "";
      const header = document.createElement("div");
      header.className = "text-[10px] uppercase font-bold text-slate-400 mb-2";
      header.innerText = `Habilidades (Bônus: +${(safeMon.skillUps||0)*5}%)`;
      skillCont.appendChild(header);

      if(safeMon.skills) {
          const sGrid = document.createElement("div");
          sGrid.className = "flex flex-col gap-2";
          safeMon.skills.forEach(sid => {
              const s = SKILLS[sid];
              if(!s) return;
              const row = document.createElement("div");
              row.className = "flex items-center gap-2 bg-slate-800 p-2 rounded-lg relative overflow-hidden border border-white/5";
              row.innerHTML = `
                  <div class="text-2xl">${s.icon}</div>
                  <div class="flex-1">
                      <div class="text-xs font-bold text-white">${s.n}</div>
                      <div class="text-[9px] text-slate-400">Poder: ${Math.floor(s.p*100)}% | MP: ${s.mp}</div>
                  </div>
                  <div class="text-[9px] text-slate-500 absolute right-2 top-2 opacity-50 capitalize">${s.type ? s.type.replace("_", " ") : ""}</div>
              `;
              sGrid.appendChild(row);
          });
          skillCont.appendChild(sGrid);
      }
  }


        // EVOLUTION & SKILL UP BUTTONS
        // Fix: Use btn-equip parent as anchor since btn-xp is gone
        const acts = btn.parentNode;
        
        // Remove old dynamic containers if any
        const oldEvo = document.getElementById("evo-container");
        if(oldEvo) oldEvo.remove();
        
        const evoContainer = document.createElement("div");
        evoContainer.id = "evo-container";
        evoContainer.className = "w-full mt-2 grid grid-cols-2 gap-2";
        
        // Evolve Button
        if (safeMon.stars < 6) {
             const evolveBtn = document.createElement("button");
             evolveBtn.onclick = openEvolutionModal;
             evolveBtn.className = "py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs uppercase rounded-lg border border-fuchsia-400 shadow-[0_0_10px_rgba(192,38,211,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1";
             evolveBtn.innerHTML = `<span>🌟</span> Evoluir`;
             evoContainer.appendChild(evolveBtn);
        }
        
        // Skill Up Button
        const skillBtn = document.createElement("button");
        skillBtn.onclick = () => openSkillUpModal();
        skillBtn.className = "py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs uppercase rounded-lg border border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1";
        skillBtn.innerHTML = `<span>✨</span> Evoluir Skill`;
        evoContainer.appendChild(skillBtn);

        acts.appendChild(evoContainer);
      };

      // EVOLUTION MODAL & LOGIC
      let evolveTargetIdx = -1;
      let evolveFoodIndices = [];

      const openEvolutionModal = () => {
         evolveTargetIdx = selectedDetailIdx;
         evolveFoodIndices = [];
         renderEvolutionModal();
      };

      const renderEvolutionModal = () => {
         // Create modal if not exists
         let modal = document.getElementById("evo-modal");
         if (!modal) {
             document.body.insertAdjacentHTML('beforeend', `
                <div id="evo-modal" class="fixed inset-0 bg-black/90 z-[60] hidden flex-col items-center justify-center p-4 backdrop-blur-sm">
                    <div class="glass-panel p-6 w-full max-w-lg rounded-2xl border border-white/10 relative">
                        <h2 class="text-xl font-black text-white text-center mb-1">EVOLUÇÃO</h2>
                        <p id="evo-desc" class="text-center text-slate-400 text-xs mb-6"></p>
                        
                        <div class="flex justify-center items-center gap-4 mb-6">
                             <!-- Target -->
                             <div id="evo-target-preview" class="w-20 h-20 border border-white rounded-xl bg-slate-800 flex items-center justify-center relative"></div>
                             <div class="text-xl text-slate-500">?</div>
                             <!-- Result -->
                             <div id="evo-result-preview" class="w-20 h-20 border border-fuchsia-500 rounded-xl bg-slate-800 flex items-center justify-center relative shadow-[0_0_15px_rgba(192,38,211,0.3)]"></div>
                        </div>

                        <div class="text-white text-sm font-bold mb-2">Materiais (<span id="evo-scount">0</span>/<span id="evo-req">2</span>)</div>
                        <div id="evo-food-grid" class="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 bg-black/40 rounded-xl mb-6"></div>

                        <div class="flex gap-3">
                            <button onclick="document.getElementById('evo-modal').classList.add('hidden')" class="flex-1 py-2 bg-slate-700 text-white text-sm font-bold rounded-lg hover:bg-slate-600 transition-colors">Cancelar</button>
                            <button id="btn-confirm-evo" onclick="confirmEvolution()" class="flex-1 py-2 bg-fuchsia-600 text-white text-sm font-bold rounded-lg disabled:opacity-50 disabled:grayscale hover:bg-fuchsia-500 transition-colors">EVOLUIR</button>
                        </div>
                    </div>
                </div>
             `);
             modal = document.getElementById("evo-modal");
         }
         
         modal.classList.remove("hidden");
         modal.classList.add("flex");

         const target = state.inventory[evolveTargetIdx];
         const reqAmount = target.stars;

         document.getElementById("evo-desc").innerText = `Selecione ${reqAmount} monstro(s) de ${target.stars}? para sacrificar.`;
         document.getElementById("evo-req").innerText = reqAmount;
         
         // Helper to render preview
         const renderPrev = (el, mon, nextStars = false) => {
             const s = nextStars ? mon.stars + 1 : mon.stars;
             const isAwakened = s === 6;
             const starsHtml = isAwakened 
                ? '<span class="text-fuchsia-400 drop-shadow-[0_0_2px_rgba(192,38,211,0.8)]">★</span>'.repeat(6)
                : "★".repeat(s);
             
             el.innerHTML = `
                 <img src="${mon.img}" class="w-full h-full object-contain p-1">
                 <div class="absolute bottom-0 w-full text-center bg-black/60 text-[9px] ${isAwakened ? '' : 'text-yellow-400'} font-bold">
                   ${starsHtml}
                 </div>
             `;
         };
         
         const tDiv = document.getElementById("evo-target-preview");
         const rDiv = document.getElementById("evo-result-preview");
         
         renderPrev(tDiv, target);
         renderPrev(rDiv, target, true);

         // Render Food List
         const grid = document.getElementById("evo-food-grid");
         grid.innerHTML = "";
         
         // Filter Fodder: Same Stars, Not Locked (if lock exists), Not the target itself
         const fodder = state.inventory.map((m, i) => ({...m, idx: i})).filter(m => 
             m.idx !== evolveTargetIdx && 
             m.stars === target.stars &&
             m.idx !== state.leaderIdx // Cannot feed leader
         );

         fodder.forEach(f => {
             const isSel = evolveFoodIndices.includes(f.idx);
             const el = document.createElement("div");
             el.className = `aspect-square bg-slate-800 rounded border cursor-pointer relative transition-all ${isSel ? 'border-green-500 bg-green-900/20 scale-95' : 'border-slate-600 hover:border-slate-400'}`;
             el.innerHTML = `
                 <img src="${f.img}" class="w-full h-full object-contain opacity-80">
                 <div class="absolute bottom-0 w-full text-center text-[8px] text-yellow-400">★${f.stars}</div>
                 ${isSel ? '<div class="absolute inset-0 flex items-center justify-center text-green-400 font-bold text-xl drop-shadow-md">?</div>' : ''}
             `;
             el.onclick = () => toggleFood(f.idx);
             grid.appendChild(el);
         });
         
         updateEvoUI();
      };

      const toggleFood = (idx) => {
          const target = state.inventory[evolveTargetIdx];
          const req = target.stars;

          if (evolveFoodIndices.includes(idx)) {
              evolveFoodIndices = evolveFoodIndices.filter(i => i !== idx);
          } else {
              if (evolveFoodIndices.length < req) evolveFoodIndices.push(idx);
          }
          renderEvolutionModal(); // Re-render to update styles
      };

      const updateEvoUI = () => {
           const target = state.inventory[evolveTargetIdx];
           const req = target ? target.stars : 2;
           
           document.getElementById("evo-scount").innerText = evolveFoodIndices.length;
           const btn = document.getElementById("btn-confirm-evo");
           if (evolveFoodIndices.length === req) {
               btn.disabled = false;
               btn.innerText = "EVOLUIR (Reset Lv.1)";
           } else {
               btn.disabled = true;
               btn.innerText = `Selecione ${req}`;
           }
      };

      const confirmEvolution = () => {
           const target = state.inventory[evolveTargetIdx];
           const req = target.stars;

           if (evolveFoodIndices.length !== req) return;
           
           // Sort indices descending to remove from end first and not shift indices
           const toRemove = [...evolveFoodIndices].sort((a,b) => b - a);
           
           toRemove.forEach(idx => {
               state.inventory.splice(idx, 1);
               // If removed index was before target index, adjust target index
               if (idx < evolveTargetIdx) evolveTargetIdx--;
           });
           
           // Update Target
           target.stars++;
           target.lvl = 1; // RESET
           
           // Fix ref if leader index was affected
           // If we removed a mon before leader, leaderIdx--
           toRemove.forEach(idx => {
               if (idx < state.leaderIdx) state.leaderIdx--;
           });
           
           save();
           
           document.getElementById("evo-modal").classList.add("hidden");
           document.getElementById("evo-modal").classList.remove("flex"); // Ensure flex is removed
           
           // UI Update: Keep detail open and refresh it
           selectedDetailIdx = evolveTargetIdx; // Sync selection
           
           showToast(`EVOLUÇÃO SUCESSO! ${target.name} agora é ${target.stars}★`, "success");
           
           renderMonsterBox(); // Update background list
           openDetail(selectedDetailIdx); // Refresh current view
      };

      
      // SKILL UP MODAL
      let skillTargetIdx = -1;
      let skillFeederIdx = -1;

      const openSkillUpModal = () => {
         skillTargetIdx = selectedDetailIdx;
         skillFeederIdx = -1;
         renderSkillUpModal();
      };

      const selectSkillFood = (idx) => {
         skillFeederIdx = (skillFeederIdx === idx) ? -1 : idx;
         renderSkillUpModal();
      };

      const renderSkillUpModal = () => {
         let modal = document.getElementById("skill-modal");
         if (!modal) {
             document.body.insertAdjacentHTML('beforeend', `
                <div id="skill-modal" class="fixed inset-0 bg-black/95 z-[60] hidden flex-col items-center justify-center p-4 backdrop-blur-md">
                    <div class="bg-slate-900 border border-orange-500/30 p-6 w-full max-w-lg rounded-2xl relative shadow-[0_0_50px_rgba(249,115,22,0.2)]">
                        <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 text-center mb-4 uppercase italic">Skill Power Up</h2>
                        <p class="text-center text-slate-400 text-xs mb-8">Sacrifique um monstro idêntico ou um <span class="text-white font-bold">Skillupper</span>.</p>
                        
                        <div class="flex justify-center items-center gap-6 mb-8">
                             <!-- Target -->
                             <div class="flex flex-col items-center gap-2">
                                 <span class="text-[10px] text-slate-500 font-bold uppercase">Alvo</span>
                                 <div id="skill-target-preview" class="w-24 h-24 border-2 border-slate-700 rounded-2xl bg-slate-800 relative overflow-hidden"></div>
                             </div>
                             <div class="text-2xl text-orange-500 font-black animate-pulse">+</div>
                             <!-- Feeder -->
                             <div class="flex flex-col items-center gap-2">
                                 <span class="text-[10px] text-slate-500 font-bold uppercase">Material</span>
                                 <div id="skill-feeder-preview" class="w-24 h-24 border-2 border-dashed border-slate-600 rounded-2xl bg-black/50 flex items-center justify-center text-4xl text-slate-700 select-none">?</div>
                             </div>
                        </div>

                        <div class="text-white text-sm font-bold mb-2 uppercase tracking-wider">Selecione o Material</div>
                        <div id="skill-food-grid" class="grid grid-cols-5 gap-3 max-h-48 overflow-y-auto p-3 bg-black/60 rounded-xl mb-8 border border-white/5"></div>

                        <div class="flex gap-4">
                            <button onclick="document.getElementById('skill-modal').classList.add('hidden')" class="flex-1 py-3 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-700 transition-colors">CANCELAR</button>
                            <button id="btn-confirm-skill" onclick="confirmSkillUp()" class="flex-1 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-bold rounded-xl disabled:opacity-50 disabled:grayscale hover:brightness-110 shadow-lg transition-all">CONFIRMAR</button>
                        </div>
                    </div>
                </div>
             `);
             modal = document.getElementById("skill-modal");
         }
         
         modal.classList.remove("hidden");
         modal.classList.add("flex");

         const target = state.inventory[skillTargetIdx];
         
         // Render Target Preview
         const tDiv = document.getElementById("skill-target-preview");
         tDiv.innerHTML = `<img src="${target.img}" class="w-full h-full object-contain">`;

         // Render Feeder Preview
         const fDiv = document.getElementById("skill-feeder-preview");
         if (skillFeederIdx !== -1) {
             const feeder = state.inventory[skillFeederIdx];
             fDiv.innerHTML = `<img src="${feeder.img}" class="w-full h-full object-contain p-2">`;
             fDiv.className = "w-24 h-24 border-2 border-orange-500 rounded-2xl bg-slate-800 relative overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.4)]";
         } else {
             fDiv.innerHTML = "?";
             fDiv.className = "w-24 h-24 border-2 border-dashed border-slate-600 rounded-2xl bg-black/50 flex items-center justify-center text-4xl text-slate-700 select-none";
         }

         // Grid
         const grid = document.getElementById("skill-food-grid");
         grid.innerHTML = "";
         
         // Filter: Same ID via template (safeMon check?) or just mon.id
         // Need to be careful: target.id might be unique if we generated UUIDs, but here id IS the monster type ID.
         // And check for 'skillupper'.
         const candidates = state.inventory.map((m, i) => ({...m, idx: i})).filter(m => 
             m.idx !== skillTargetIdx &&
             m.idx !== state.leaderIdx &&
             (m.id === target.id || m.id === "skillupper")
         );
         
         if (candidates.length === 0) {
             grid.innerHTML = `<div class="col-span-5 text-center text-slate-500 text-xs py-4">Nenhum monstro compatível encontrado.</div>`;
         }

         candidates.forEach(c => {
             const isSel = (skillFeederIdx === c.idx);
             const el = document.createElement("div");
             el.className = `aspect-square bg-slate-800 rounded-xl border-2 cursor-pointer relative transition-all overflow-hidden ${isSel ? 'border-orange-500 opacity-100 scale-95' : 'border-slate-700 hover:border-slate-500 opacity-80'}`;
             el.innerHTML = `
                 <img src="${c.img}" class="w-full h-full object-contain">
                 <div class="absolute top-0 right-0 p-1 bg-black/50 backdrop-blur rounded-bl-lg">
                     <div class="text-[8px] font-bold text-white">${c.id === "skillupper" ? "SKILL" : "★"+c.stars}</div>
                 </div>
                 ${isSel ? '<div class="absolute inset-0 bg-orange-500/20 animate-pulse"></div>' : ''}
             `;
             el.onclick = () => selectSkillFood(c.idx);
             grid.appendChild(el);
         });

         const btn = document.getElementById("btn-confirm-skill");
         btn.disabled = (skillFeederIdx === -1);
      };

      const confirmSkillUp = () => {
          if (skillFeederIdx === -1) return;
          
          const target = state.inventory[skillTargetIdx];
          const feeder = state.inventory[skillFeederIdx];
          
          // Consume Feeder
          
          let realTargetIdx = skillTargetIdx;
          if (skillFeederIdx < skillTargetIdx) realTargetIdx--;
          
          state.inventory.splice(skillFeederIdx, 1);
          
          // Logic: Apply Skill Up
          // Add 'skillUps' property
          const realTarget = state.inventory[realTargetIdx];
          realTarget.skillUps = (realTarget.skillUps || 0) + 1;
          
          // Leader Check
          if (skillFeederIdx < state.leaderIdx) state.leaderIdx--;
          
          save();
          
           // UI Reset
           document.getElementById("skill-modal").classList.add("hidden");
           document.getElementById("skill-modal").classList.remove("flex");
           
           selectedDetailIdx = realTargetIdx; // Sync selection

           renderMonsterBox(); // Re-renders the grid
           openDetail(selectedDetailIdx); // Refresh current view
           
           showToast(`✨ Habilidade Melhorada! Total: +${realTarget.skillUps}`, "success");
      };

      const renderEqSlot = (type, id) => {
        const el = document.getElementById(`eq-slot-${type}`);
        if (id) {
          const eq = state.equipment.find((e) => e.id === id);
          if (eq) {
            el.className = `eq-slot filled ${EQ_RARITY[eq.rarity].color}`;
            el.innerHTML = `<span class="text-xs font-bold absolute bottom-0 right-1">+${
              eq.lvl
            }</span>${
              type === "weapon" ? "⚔️" : type === "armor" ? "🛡️" : "💍"
            }`;
            return;
          }
        }
        el.className = "eq-slot";
        el.innerHTML = `<span class="opacity-20">${
          type === "weapon" ? "⚔️" : type === "armor" ? "🛡️" : "💍"
        }</span>`;
      };

      const closeDetail = () =>
        document.getElementById("mon-detail-overlay").classList.add("hidden");
      const equipLeader = () => {
        state.leaderIdx = selectedDetailIdx;
        save();
        
        // UI Feedback
        showToast("Líder definido com sucesso!", "success");
        renderMonsterBox(); // Update grid badges
        openDetail(selectedDetailIdx); // Refresh button state
      };

      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const autoEvolveLowStars = () => {

        let evolvedCount = 0;
        let didAction = true;

        while (didAction) {
          didAction = false;
          
          // Strategy: Find the first valid evolution pair that hasn't been touched this cycle
          // We look for a candidate (1 or 2 stars) that HAS available fodder
          
          for (let i = 0; i < state.inventory.length; i++) {
              const m = state.inventory[i];
              
              // Candidate Criteria: 1 or 2 stars, Not Leader
              if ((m.stars === 1 || m.stars === 2) && i !== state.leaderIdx) {
                  
                  // Try to find fodder for this specific candidate
                  const reqStars = m.stars;
                  let fodderIndices = [];
                  let reqFodderCount = reqStars; // 1* needs 1, 2* needs 2

                  for (let j = 0; j < state.inventory.length; j++) {
                      if (fodderIndices.length >= reqFodderCount) break;
                      if (j === i) continue; // Skip self
                      if (j === state.leaderIdx) continue; // Skip leader
                      
                      const f = state.inventory[j];
                      if (f.stars === reqStars) {
                          fodderIndices.push(j);
                      }
                  }

                  // If we found enough fodder, EVOLVE!
                  if (fodderIndices.length === reqFodderCount) {
                      // Execute Evolution
                      // Prepare indices to delete (fodder only)
                      // Sort descending to splice correctly
                      fodderIndices.sort((a,b) => b - a);

                      // Remove fodder
                      fodderIndices.forEach(delIdx => {
                          state.inventory.splice(delIdx, 1);
                          // Adjust current candidate index if needed (though we break after this, so i is irrelevant for next loop)
                          // But we MUST adjust state.leaderIdx globally
                          if (delIdx < state.leaderIdx) state.leaderIdx--;
                          // We don't need to adjust 'i' because we will break and restart the BIG loop
                      });
                      
                      // Now 'm' is at a new index potentially? 
                      // Wait. If we splice, indices shift. 
                      // We need to find 'm' again or rely on the fact that if i < delIdx (usually true if we picked first available), it's fine.
                      // But fodder could be BEFORE candidate.
                      // TO BE SAFE: We restart the search from scratch after every evolution. 
                      // It's O(N^2) but N is small (inventory limit).
                      
                      // However, we need to locate the candidate 'm' produced.
                      // Actually, let's just grab the candidate by reference BEFORE splice? 
                      // JS arrays reference objects. 'm' is still the object.
                      
                      m.stars++;
                      m.lvl = 1;
                      
                      evolvedCount++;
                      didAction = true;
                      break; // Break mostly to safely restart the loop since indices shifted
                  }
              }
          }
        }

        if (evolvedCount > 0) {
          save();
          renderMonsterBox();
          const msg = `Auto Evolução: ${evolvedCount} monstros evoluídos!`;
          showToast(msg, "success");
        } else {
          showToast("Nenhum par (Max Lv + Material) encontrado.", "info");
        }
      };

      window.onload = init;
// --- XP POTION LOGIC ---
const usePotion = () => {
  const mon = state.inventory[selectedDetailIdx];
  if (!mon) return;

  if ((state.user.potions || 0) <= 0) {
      return showToast("Você não tem poções de XP!", "error");
  }

  const maxLvl = MAX_LEVELS[mon.stars] || 40;
  if (mon.lvl >= maxLvl) {
      return showToast("Este monstro já está no nível máximo!", "info");
  }

  // Consume
  state.user.potions--;
  
  // Add XP (500)
  addXP(mon, 500);
  
  save();
  
  // UI Update
  openDetail(selectedDetailIdx);
  showToast("+500 XP Aplicado!", "success");
  
  // Update header if needed (potions usually not in header)
  if(typeof updateShopUI !== "undefined") updateShopUI();
};




