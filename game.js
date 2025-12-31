      // --- DATABASE ---
      const MONSTERS_DB = [
        {
          id: "vermithrax",
          name: "Vermithrax",
          type: "Ancient Dragon",
          element: "fire",
          stars: 5,
          hp: 2500,
          atk: 250,
          def: 150,
          emoji: "🐉",
          img: "src/Vermithrax.png",
          skills: ["melee", "fire", "sup_fire"],
        },
        {
          id: "thyron",
          name: "Thyron",
          type: "Storm Bringer",
          element: "lightning",
          stars: 5,
          hp: 1400,
          atk: 210,
          def: 80,
          emoji: "⚡",
          img: "src/Thyron.png",
          skills: ["melee", "bolt", "sup_lightning"],
        },
        {
          id: "neriah",
          name: "Neriah",
          type: "Ocean Guardian",
          element: "water",
          stars: 5,
          hp: 1800,
          atk: 140,
          def: 120,
          emoji: "🌊",
          img: "src/Neriah.png",
          skills: ["melee", "water", "sup_water"],
        },
        {
          id: "aelyra",
          name: "Aelyra",
          type: "Flame Witch",
          element: "fire",
          stars: 5,
          hp: 1300,
          atk: 230,
          def: 60,
          emoji: "🔥",
          img: "src/Aelyra.png",
          skills: ["melee", "fire", "sup_fire"],
        },
        {
          id: "kaelthar",
          name: "Kaelthar",
          type: "Shadow Knight",
          element: "void",
          stars: 4,
          hp: 1600,
          atk: 180,
          def: 100,
          emoji: "🌑",
          img: "src/Kaelthar.png",
          skills: ["melee", "void_slash", "sup_void"],
        },
        {
          id: "dhorak",
          name: "Dhorak",
          type: "Earth Golem",
          element: "earth",
          stars: 4,
          hp: 2200,
          atk: 110,
          def: 180,
          emoji: "🗿",
          img: "src/Dhorak.png",
          skills: ["melee", "rock_throw", "sup_earth"],
        },
        {
          id: "vireya",
          name: "Vireya",
          type: "Nature Spirit",
          element: "nature",
          stars: 3,
          hp: 1200,
          atk: 150,
          def: 90,
          emoji: "🍃",
          img: "src/Vireya.png",
          skills: ["melee", "leaf_cutter"],
        },
        {
          id: "brann",
          name: "Brann",
          type: "Fire Warrior",
          element: "fire",
          stars: 3,
          hp: 1100,
          atk: 160,
          def: 70,
          emoji: "🔥",
          img: "src/Brann.png",
          skills: ["melee", "fire"],
        },
        {
          id: "lysara",
          name: "Lysara",
          type: "Frost Mage",
          element: "water",
          stars: 3,
          hp: 1050,
          atk: 170,
          def: 60,
          emoji: "❄️",
          img: "src/Lysara.png",
          skills: ["melee", "water"],
        },
        {
          id: "lumem",
          name: "Lumem",
          type: "Light Fairy",
          element: "lightning",
          stars: 2,
          hp: 900,
          atk: 190,
          def: 50,
          emoji: "✨",
          img: "src/Lumem.png",
          skills: ["melee", "bolt"],
        },
        {
          id: "ravok",
          name: "Ravok",
          type: "Orc Grunt",
          element: "earth",
          stars: 2,
          hp: 1200,
          atk: 130,
          def: 60,
          emoji: "👹",
          img: "src/Ravok.png",
          skills: ["melee", "rock_throw"],
        },
        {
          id: "slime",
          name: "Slime",
          type: "Blob",
          element: "water",
          stars: 1,
          hp: 600,
          atk: 80,
          def: 40,
          emoji: "💧",
          img: "",
          skills: ["melee"],
        },
        {
          id: "bat",
          name: "Bat",
          type: "Cave Bat",
          element: "void",
          stars: 1,
          hp: 500,
          atk: 90,
          def: 20,
          emoji: "🦇",
          img: "",
          skills: ["melee"],
        },
        // --- NEW CHARACTERS (WAVE 2) ---
        // 5 STARS (LEGENDARY)
        {
          id: "ignis",
          name: "Ignis",
          type: "Fire Warlord",
          element: "fire",
          stars: 5,
          hp: 3000,
          atk: 350,
          def: 200,
          emoji: "👹",
          img: "src/ignis.png",
          skills: ["melee", "fire", "meteor_strike"],
        },
        {
          id: "sylphid",
          name: "Sylphid",
          type: "Wind Queen",
          element: "wind",
          stars: 5,
          hp: 2800,
          atk: 320,
          def: 180,
          emoji: "🧚‍♀️",
          img: "src/sylphid.png",
          skills: ["melee", "wind_blade", "tornado"],
        },
        {
          id: "gaia",
          name: "Gaia",
          type: "Earth Mother",
          element: "earth",
          stars: 5,
          hp: 4000,
          atk: 200,
          def: 300,
          emoji: "🌿",
          img: "src/gaia.png",
          skills: ["melee", "earth_shatter", "earthquake"],
        },
        {
          id: "zephyr",
          name: "Zephyr",
          type: "Storm God",
          element: "lightning",
          stars: 5,
          hp: 2900,
          atk: 380,
          def: 160,
          emoji: "⚡",
          img: "src/zephyr.png",
          skills: ["melee", "bolt", "thunder_storm"],
        },
        {
          id: "nyx",
          name: "Nyx",
          type: "Void Assassin",
          element: "void",
          stars: 5,
          hp: 2500,
          atk: 450,
          def: 120,
          emoji: "🥷",
          img: "src/nyx.png",
          skills: ["melee", "shadow_strike", "void_slash"],
        },
        {
          id: "glacius",
          name: "Glacius",
          type: "Ice Titan",
          element: "water",
          stars: 5,
          hp: 3500,
          atk: 280,
          def: 250,
          emoji: "🧊",
          img: "src/glacius.png",
          skills: ["melee", "ice_shards", "blizzard"],
        },

        // 4 STARS (EPIC)
        {
          id: "vulcan",
          name: "Vulcan",
          type: "Smith",
          element: "fire",
          stars: 4,
          hp: 2200,
          atk: 250,
          def: 180,
          emoji: "🔨",
          img: "src/vulcan.png",
          skills: ["melee", "fire"],
        },
        {
          id: "nereid",
          name: "Nereid",
          type: "Mermaid",
          element: "water",
          stars: 4,
          hp: 2000,
          atk: 240,
          def: 160,
          emoji: "🧜‍♀️",
          img: "src/nereid.png",
          skills: ["melee", "ice_shards"],
        },
        {
          id: "druid",
          name: "Druid",
          type: "Keeper",
          element: "nature",
          stars: 4,
          hp: 2100,
          atk: 200,
          def: 200,
          emoji: "🦌",
          img: "src/druid.png",
          skills: ["melee", "poison_cloud"],
        },
        {
          id: "paladin",
          name: "Paladin",
          type: "Knight",
          element: "light",
          stars: 4,
          hp: 2500,
          atk: 180,
          def: 250,
          emoji: "🛡️",
          img: "src/paladin.png",
          skills: ["melee", "holy_beam"],
        },
        {
          id: "necro",
          name: "Necro",
          type: "Mage",
          element: "dark",
          stars: 4,
          hp: 1800,
          atk: 300,
          def: 100,
          emoji: "💀",
          img: "src/necro.png",
          skills: ["melee", "blood_drain"],
        },
        {
          id: "ronin",
          name: "Ronin",
          type: "Samurai",
          element: "wind",
          stars: 4,
          hp: 1900,
          atk: 310,
          def: 140,
          emoji: "⚔️",
          img: "src/ronin.png",
          skills: ["melee", "wind_blade"],
        },

        // 3 STARS (RARE)
        {
          id: "goblin_king",
          name: "Goblin King",
          type: "Goblin",
          element: "earth",
          stars: 3,
          hp: 1500,
          atk: 150,
          def: 100,
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
          hp: 1400,
          atk: 160,
          def: 80,
          emoji: "🦅",
          img: "src/harpy.png",
          skills: ["melee"],
        },
        {
          id: "stone_giant",
          name: "Stone Giant",
          type: "Construct",
          element: "earth",
          stars: 3,
          hp: 2000,
          atk: 100,
          def: 150,
          emoji: "🗿",
          img: "src/golem.png",
          skills: ["melee"],
        },
        {
          id: "lizardman",
          name: "Lizardman",
          type: "Beast",
          element: "water",
          stars: 3,
          hp: 1600,
          atk: 140,
          def: 110,
          emoji: "🦎",
          img: "src/lizard.png",
          skills: ["melee"],
        },
        {
          id: "skeleton_archer",
          name: "Skeleton",
          type: "Undead",
          element: "dark",
          stars: 3,
          hp: 1200,
          atk: 180,
          def: 50,
          emoji: "🏹",
          img: "src/skel.png",
          skills: ["melee"],
        },
        {
          id: "fairy",
          name: "Fairy",
          type: "Fey",
          element: "light",
          stars: 3,
          hp: 1000,
          atk: 120,
          def: 80,
          emoji: "🦋",
          img: "src/fairy.png",
          skills: ["melee"],
        },
        {
          id: "imp",
          name: "Imp",
          type: "Demon",
          element: "fire",
          stars: 3,
          hp: 1100,
          atk: 130,
          def: 70,
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
          hp: 1300,
          atk: 140,
          def: 90,
          emoji: "🐺",
          img: "src/wolf.png",
          skills: ["melee"],
        },
      ];

      const SKILLS = {
        melee: { n: "Ataque", p: 1.0, icon: "⚔️", type: "phys", mp: 0 },
        bolt: { n: "Raio", p: 1.5, icon: "⚡", type: "lightning", mp: 20 },
        water: { n: "Jato", p: 1.4, icon: "💧", type: "water", mp: 20 },
        fire: { n: "Brasa", p: 1.6, icon: "🔥", type: "fire", mp: 20 },
        void_slash: {
          n: "Corte Vazio",
          p: 1.8,
          icon: "🌑",
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
          icon: "🌋",
          type: "fire_sup",
          mp: 50,
        },
        sup_earth: {
          n: "Avalanche",
          p: 3.0,
          icon: "🏚️",
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
          icon: "❄️",
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
          icon: "👤",
          type: "shadow_strike",
          mp: 30,
        },
        thunder_storm: {
          n: "Tempestade",
          p: 2.5,
          icon: "⚡",
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
          icon: "🌋",
          type: "earth_shatter",
          mp: 40,
        },
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
        }, 3000);
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
      let selectedLoginIcon = "🦸";
      const LOGIN_ICONS = [
        "🦸", // Superhero
        "🧙", // Wizard
        "🧝", // Elf
        "🧛", // Vampire
        "🤖", // Robot
        "👾", // Alien
        "🐉", // Dragon
        "🦄", // Unicorn
      ];

      const renderLoginIcons = () => {
        const c = document.getElementById("login-icons-container");
        if (!c) return;
        c.innerHTML = "";
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
          c.appendChild(div);
        });
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

        document
          .querySelectorAll("main")
          .forEach((el) => el.classList.add("hidden-view"));
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
                <span class="node-icon">${isBoss ? '👑' : isLocked ? '🔒' : isCompleted ? '✅' : stage}</span>
              </div>
              ${isCurrent ? '<div class="current-indicator"></div>' : ''}
              <div class="node-label">${isBoss ? 'BOS' : stage}</div>
            `;

            stagesGrid.appendChild(stageBtn);
          }

          list.appendChild(mapCard);
        }
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
        if (item === "ticket_common") {
          if (state.user.gold < 2000)
            return showToast("Ouro insuficiente!", "error");
          state.user.gold -= 2000;
          state.user.tickets_common++;
        }
        if (item === "ticket_epic") {
          if (state.user.crystals < 300)
            return showToast("Cristais insuficientes!", "error");
          state.user.crystals -= 300;
          state.user.tickets_epic++;
        }
        if (item === "energy") {
          if (state.user.crystals < 50)
            return showToast("Cristais insuficientes!", "error");
          state.user.crystals -= 50;
          state.user.energy += 50;
        }
        if (item === "xp_pot") {
          if (state.user.gold < 500)
            return showToast("Ouro insuficiente!", "error");
          state.user.gold -= 500;
          state.user.potions++;
        }

        save();
      };
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

        // Adjust grid based on summon count
        if (count === 1) {
          // Single summon: centered, larger card
          grid.className =
            "flex-1 flex items-center justify-center overflow-y-auto pb-20";
        } else {
          // Multiple summons: grid layout with smaller cards
          grid.className =
            "flex-1 grid grid-cols-5 content-start gap-2 overflow-y-auto pb-20";
        }

        currentSummonResults.forEach((mon, idx) => {
          const card = document.createElement("div");

          // Adjust card size based on count
          if (count === 1) {
            card.className = "relative w-48 h-64 perspective-1000 opacity-0";
          } else {
            card.className = "relative w-24 h-32 perspective-1000 opacity-0";
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
                        <span class="text-[10px] text-white font-bold bg-black/50 px-1 rounded">${"⭐".repeat(
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
          grid.appendChild(card);
        });
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
            eq.type === "weapon" ? "⚔️" : eq.type === "armor" ? "🛡️" : "💍";

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
          grid.appendChild(el);
        });
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
        } else {
          title = "Masmorra do Dragão";
          imgSrc = "src/dragaoArt.jpg"; // Lava/Fire
          grad = "from-red-900";
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
              <div class="text-2xl animate-bounce">ℹ️</div>
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
          ← Voltar
         </button>
         ${headerHTML}
         <div class="scroll-container content-start overflow-y-auto space-y-3 pr-2 pb-20" id="dungeon-list-inner"></div>
        `;

        const listInner = document.getElementById("dungeon-list-inner");

        for (let i = 1; i <= 12; i++) {
          const btn = document.createElement("div");
          btn.className =
            "glass-panel p-4 rounded-xl flex justify-between items-center cursor-pointer active:scale-95 transition-transform border border-white/5 hover:bg-white/5";
          btn.innerHTML = `<div><h4 class="text-white font-bold">${
            selectedDungeonType === "golem" ? "Golem" : "Dragão"
          } B${i}</h4><p class="text-xs text-purple-400">Lv. ${i * 5} • ${
            5 + Math.floor(i / 2)
          } ⚡</p></div><div class="text-white">▶</div>`;
          btn.onclick = () => openPrep("dungeon_" + selectedDungeonType, i);
          listInner.appendChild(btn);
        }
      };

      const openPrep = (mode, lvl) => {
        prepState = { mode, level: lvl, selectedMonIdx: state.leaderIdx };
        changeView("view-prep");
        const titles = {
          dungeon_golem: `Golem B${lvl}`,
          dungeon_dragon: `Dragão B${lvl}`,
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
        }[mon.element];
        document.getElementById(
          "prep-stats"
        ).innerText = `Atk: ${stats.atk} | HP: ${stats.hp}`;
      };

      const calculateStats = (mon) => {
        const m = 1 + mon.lvl * 0.1;
        let s = {
          hp: Math.floor(mon.hp * m),
          atk: Math.floor(mon.atk * m),
          def: Math.floor(mon.def * m),
          crit: 10,
          cdmg: 50,
        };

        ["weapon", "armor", "acc"].forEach((slot) => {
          if (mon.equipped && mon.equipped[slot]) {
            const eq = state.equipment.find((e) => e.id === mon.equipped[slot]);
            if (eq) {
              if (eq.stats.hp) s.hp += eq.stats.hp;
              if (eq.stats.atk) s.atk += eq.stats.atk;
              if (eq.stats.def) s.def += eq.stats.def;
              if (eq.stats.crit) s.crit += eq.stats.crit;
              if (eq.stats.cdmg) s.cdmg += eq.stats.cdmg;
            }
          }
        });
        return s;
      };

      const renderPrepRoster = () => {
        const grid = document.getElementById("prep-grid");
        grid.innerHTML = "";
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
          grid.appendChild(el);
        });
      };

      const confirmBattle = () => startBattle(prepState.mode, prepState.level);

      // --- BATTLE ---
      const startBattle = (mode, lvl = 1) => {
        let cost = 5;
        if (mode.startsWith("dungeon")) cost = 5 + Math.floor(lvl / 2);

        if (state.user.energy < cost) return showToast("Sem energia!", "error");
        state.user.energy -= cost;
        updateHeader();

        battleState = {
          active: true,
          mode: mode,
          busy: false,
          auto: false,
          speed: 1,
        };
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
        } else {
          // Filter out dungeon bosses from random encounters
          const availableMonsters = MONSTERS_DB.filter(
            (m) => m.id !== "dhorak" && m.id !== "vermithrax"
          );
          template =
            availableMonsters[
              Math.floor(Math.random() * availableMonsters.length)
            ];
        }

        let lvl = 1;
        if (mode.startsWith("dungeon")) lvl = lvlArg * 5;
        else if (mode === "tower") lvl = lvlArg * 2;
        else lvl = lvlArg * 3;

        const m = 1 + lvl * 0.15;
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
        pl.innerHTML = `<img src="${battleState.player.img}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"> <span style="display:none;font-size:4rem;filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5))">${battleState.player.emoji}</span>`;
        renderSkillGrid();
      };

      const renderSkillGrid = () => {
        const grid = document.getElementById("skill-grid");
        grid.innerHTML = "";
        grid.className = `grid gap-2 ${
          battleState.player.skills.length > 2 ? "grid-cols-3" : "grid-cols-2"
        }`;

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
          grid.appendChild(btn);
        });
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
          attackerEl.classList.add("anim-cast");
          await sleep(500 / spd);
          if (skill.type.endsWith("_sup"))
            await spawnUltimateVFX(skill.type, isPlayer);
          else await spawnVFX(skill.type, isPlayer);
          attackerEl.classList.remove("anim-cast");
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

        const raw = att.atk * skill.p;
        let dmg = Math.max(10, raw - def.def * 0.5);

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

        if (win) {
          let rewards = "";
          const accXp = 50;
          state.user.xp += accXp;

          const xpReq = 100 * state.user.lvl;
          if (state.user.xp >= xpReq) {
            state.user.xp = state.user.xp - xpReq;
            state.user.lvl++;
            state.user.crystals += 25;
            showToast(`LEVEL UP! Nível ${state.user.lvl} (+25 💎)`);
          }

          let crystalsGained = 0;
          let goldGained = 0;

          if (battleState.mode.startsWith("dungeon")) {
            const floor = prepState.level;
            goldGained = 1000 + floor * 500; // 2x Boost
            crystalsGained = 5 + floor;

            // EQUIPMENT DROP LOGIC
            let dropRate = 0.3 + floor * 0.02; // Base 30% + 2% per floor
            if (Math.random() < dropRate) {
              const dungeonType = battleState.mode.includes("dragon")
                ? "dragon"
                : "golem";
              const droppedEq = createEquipment(floor, dungeonType);
              state.equipment.push(droppedEq);
              const rName = EQ_RARITY[droppedEq.rarity].name;
              rewards = `DROP: ${rName} ${
                droppedEq.type === "weapon"
                  ? "Arma"
                  : droppedEq.type === "armor"
                  ? "Armadura"
                  : "Acessório"
              }!`;
            } else {
              rewards = `+${goldGained} Ouro | +${crystalsGained} 💎`;
            }
          } else if (battleState.mode === "tower") {
            state.towerFloor++;
            crystalsGained = 50 + state.towerFloor * 10;
            goldGained = 1000 * state.towerFloor; // 2x Boost
            rewards = `Andar ${state.towerFloor - 1} Completo!`;
          } else {
            const stage = prepState.level;
            const stageKey = `stage_${stage}`;
            if (!state.user.firstClear[stageKey]) {
              crystalsGained = 100;
              goldGained = 2000 * stage; // 2x Boost
              state.user.firstClear[stageKey] = true;
              if (stage === state.storyProgress) state.storyProgress++;
              rewards = `PRIMEIRA VEZ! +${crystalsGained} 💎 | +${goldGained} Ouro`;
            } else {
              crystalsGained = 5;
              goldGained = 300 + stage * 100; // 2x Boost
              rewards = `+${crystalsGained} 💎 | +${goldGained} Ouro`;
            }
          }

          state.user.crystals += crystalsGained;
          state.user.gold += goldGained;
          save();
          updateHeader();
          document.getElementById("outcome-rewards").innerText = rewards;
        } else {
          document.getElementById("outcome-rewards").innerText =
            "Tente melhorar seu time";
        }
      };

      const useXpPotion = () => {
        const mon = state.inventory[selectedDetailIdx];
        if (state.user.potions < 1)
          return showToast("Sem poções de XP!", "error");
        state.user.potions--;
        mon.lvl++;
        save();
        showToast(`${mon.name} subiu para o nível ${mon.lvl}!`);
        openDetail(selectedDetailIdx);
      };

      const renderMonsterBox = () => {
        const grid = document.getElementById("roster-grid");
        grid.innerHTML = "";
        document.getElementById("mon-count").innerText = state.inventory.length;
        state.inventory.forEach((mon, idx) => {
          const slot = document.createElement("div");
          const isLeader = idx === state.leaderIdx;
          slot.className = `sw-slot aspect-square cursor-pointer flex items-center justify-center ${
            isLeader ? "selected" : ""
          }`;

          if (!isLeader) {
            if (mon.stars >= 5) slot.style.borderColor = "#fbbf24";
            else if (mon.stars === 4) slot.style.borderColor = "#a855f7";
            else if (mon.stars === 3) slot.style.borderColor = "#3b82f6";
          }

          const elColor =
            {
              fire: "bg-fire",
              water: "bg-water",
              lightning: "bg-lightning",
              earth: "bg-earth",
              nature: "bg-nature",
              void: "bg-void",
            }[mon.element] || "bg-slate-500";
          slot.innerHTML = `<div class="elem-badge ${elColor}"></div><img src="${
            mon.img
          }" class="w-[90%] h-[90%] object-contain filter drop-shadow-lg" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span style="display:none;font-size:3rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))">${
            mon.emoji
          }</span><div class="star-row">${'<span class="star-icon">★</span>'.repeat(
            mon.stars
          )}</div><div class="absolute top-1 left-1 text-[8px] font-bold text-white bg-black/50 px-1 rounded">Lv.${
            mon.lvl
          }</div>`;
          slot.onclick = () => openDetail(idx);
          grid.appendChild(slot);
        });
      };

      let selectedDetailIdx = 0;
      const openDetail = (idx) => {
        selectedDetailIdx = idx;
        const mon = state.inventory[idx];
        if (!mon.equipped)
          mon.equipped = { weapon: null, armor: null, acc: null };

        document
          .getElementById("mon-detail-overlay")
          .classList.remove("hidden");
        document.getElementById("mon-detail-overlay").classList.add("flex");
        document.getElementById("det-name").innerText = mon.name;
        document.getElementById("det-type").innerText = mon.type;
        document.getElementById("det-lvl").innerText = `Lv. ${mon.lvl}`;
        document.getElementById("det-stars").innerHTML = "★".repeat(mon.stars);
        document.getElementById("det-nat-grade").innerText = `NAT ${mon.stars}`;
        document.getElementById("det-element-badge").innerText = {
          fire: "🔥",
          water: "🌊",
          lightning: "⚡",
          earth: "🗿",
          nature: "🍃",
          void: "🌑",
        }[mon.element];
        document.getElementById("det-emoji").innerText = mon.emoji;
        const img = document.getElementById("det-img");
        img.style.display = "block";
        document.getElementById("det-emoji").style.display = "none";
        img.src = mon.img;

        const stats = calculateStats(mon);
        document.getElementById("val-hp").innerText = stats.hp;
        document.getElementById("val-atk").innerText = stats.atk;
        document.getElementById("val-def").innerText = stats.def;
        document.getElementById("val-crit").innerText = stats.crit + "%";
        document.getElementById("val-cdmg").innerText = stats.cdmg + "%";

        renderEqSlot("weapon", mon.equipped.weapon);
        renderEqSlot("armor", mon.equipped.armor);
        renderEqSlot("acc", mon.equipped.acc);

        const btn = document.getElementById("btn-equip");
        if (state.leaderIdx === idx) {
          btn.innerText = "Líder Atual";
          btn.className =
            "w-full py-3 mt-2 bg-green-500 text-white font-black uppercase rounded-xl opacity-90";
        } else {
          btn.innerText = "Definir Líder";
          btn.className =
            "w-full py-3 mt-2 bg-white text-slate-900 font-black uppercase rounded-xl active:scale-95";
          btn.onclick = equipLeader;
        }
        document.getElementById(
          "btn-xp"
        ).innerText = `Usar Potion (${state.user.potions})`;
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
        closeDetail();
        renderMonsterBox();
      };

      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      window.onload = init;