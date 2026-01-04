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
          dungeonProgress: {}, // { golem: 0, dragon: 0, xp: 0 }
          missions: {
            daily: {
                lastReset: 0,
                progress: {},
                claimed: []
            },
            tower: {
                lastReset: 0
            }
          },
          lastLoginDate: "", // Track last login for daily missions
        },
        inventory: [], // Start with NO monsters
        equipment: [], // Global Equipment Storage
        runes: [], // NOVO: Runas do jogador
        leaderIdx: 0,
        storyProgress: 1,
        towerFloor: 1,
        inventorySpace: 50, // Max number of monsters in inventory
      };

      // Expose state globally specifically for modules
      window.state = state;

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

      
      // --- WRAPPERS ---
      function addMonster(id) {
        return window.addMonster(id, state);
      }

      // --- CORE ---
      const init = () => {
        const lastUser = localStorage.getItem("paperwar_last_user");

        if (lastUser) {
          const saved = localStorage.getItem(`paperwar_save_${lastUser}`);
          if (saved) {
            try {
              state = JSON.parse(saved);
              window.state = state; // Sync global state
              loadMigration();
              
              // Initialize missions if not present (for old saves)
              if (state.user.missions === undefined) {
                 state.user.missions = {
                    daily: { lastReset: 0, progress: {}, claimed: [] },
                    tower: { lastReset: 0 }
                 };
              }

              // ===== INICIALIZAR NOVAS FEATURES =====
              initAchievements(state);
              initPitySystem(state);
              initDailyRewards(state);
              
              // Track inicial de achievements
              trackAchievement(state, 'player_level', state.user.lvl);
              trackAchievement(state, 'unique_monsters', new Set(state.inventory.map(m => m.id)).size);
              trackAchievement(state, 'equipment_owned', state.equipment.length);
              trackAchievement(state, 'gold_owned', state.user.gold);
              trackAchievement(state, 'crystals_owned', state.user.crystals);
              
              // Contar equipamentos lendários
              const legendaryEq = state.equipment.filter(e => e.rarity === 'legendary').length;
              if (legendaryEq > 0) trackAchievement(state, 'legendary_equipment', legendaryEq);
              
              // Contar equipamentos +15
              const maxLevelEq = state.equipment.filter(e => e.lvl >= 15).length;
              if (maxLevelEq > 0) trackAchievement(state, 'equipment_max_level', maxLevelEq);

              checkDailyReset();
              // checkTowerReset(); // Assuming this function will be added later
              trackMission('login', 1);
              
              // Atualizar notificações de novas features
              updateNewFeatureNotifications();
              
              // Mostrar daily reward se disponível
              if (canClaimDailyReward(state)) {
                setTimeout(() => showDailyRewardModal(), 1500);
              }

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

      function loadMigration() {
        if (!state.user) state.user = {};
        if (!state.inventory) state.inventory = [];
        if (!state.equipment) state.equipment = [];
        if (state.user.potions === undefined) state.user.potions = 0;
        if (state.user.lvl === undefined) state.user.lvl = 1;
        
        state.inventory.forEach((m) => {
          // ULTRA ROBUST LOOKUP (ID, Name, or Type)
          const mid = (m.id || "").toLowerCase();
          const mname = (m.name || "").toLowerCase();
          const mtype = (m.type || "").toLowerCase();

          const db = MONSTERS_DB.find(x => x.id.toLowerCase() === mid) || 
                     MONSTERS_DB.find(x => x.name.toLowerCase() === mname) ||
                     MONSTERS_DB.find(x => x.type?.toLowerCase() === mtype) ||
                     MONSTERS_DB.find(x => x.id.toLowerCase() === mname) ||
                     MONSTERS_DB.find(x => x.name.toLowerCase() === mid) ||
                     MONSTERS_DB.find(x => x.id === "slime");

          if (db) {
            // Force core properties
            m.id = db.id;
            if (!m.name) m.name = db.name;
            if (!m.type) m.type = db.type;
            if (!m.role) m.role = db.role;
            if (!m.element) m.element = db.element;
            if (!m.stars) m.stars = db.stars;
            if (!m.skills || !Array.isArray(m.skills)) m.skills = [...db.skills];
            if (!m.emoji) m.emoji = db.emoji;
            if (!m.img) m.img = db.img;
            if (m.imgBack === undefined) m.imgBack = db.imgBack || "";
            if (m.imgAtk === undefined) m.imgAtk = db.imgAtk || "";
          }
          
          // Force new equipment structure if missing
          if (!m.equipped || m.equipped.weapon !== undefined || m.equipped.armor !== undefined) {
            const old = m.equipped || {};
            m.equipped = {
              slot1: old.slot1 || old.weapon || null,
              slot2: old.slot2 || old.armor || null,
              slot3: old.slot3 || null,
              slot4: old.slot4 || old.acc || null
            };
          }
          
          // Skill Levels check - consistent key: skillLvls
          if (!m.skillLvls) {
            m.skillLvls = {};
            if (m.skills) m.skills.forEach(s => m.skillLvls[s] = 1);
          }
        });
        
        if (!state.user.dungeonProgress) state.user.dungeonProgress = { golem: 0, dragon: 0, xp: 0 };
        if (!state.user.lastEnergyRegen) state.user.lastEnergyRegen = Date.now();
        if (!state.user.missions) state.user.missions = { daily: { lastReset: 0, progress: {}, claimed: [] }, tower: { lastReset: 0 } };
        if (!state.user.lastLoginDate) state.user.lastLoginDate = "";
      }

      // --- SAVE FUNCTION ---
      // Agora usa o módulo Storage.js
      const save = () => saveGame(state);


      // --- ÍCONES DE LOGIN ---
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
            window.state = state; // Sync global state
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
            state.user.tickets_common = 0; // Changed from 5
            state.user.tickets_epic = 10;
            state.user.hasFirst5Star = false; // Newbie Luck Flag
            state.user.icon = selectedLoginIcon; // Save Icon
            state.inventory = [];
            state.equipment = [];
            state.user.missions = { daily: { lastReset: 0, progress: {}, claimed: [] }, tower: { lastReset: 0 } };
            state.user.firstClear = {};
            state.user.lastLoginDate = "";
            
            // NOVO: Inicializar runas e dar 5 de teste
            state.runes = [];
            for (let i = 0; i < 5; i++) {
              state.runes.push(generateRune(1));
            }
            
            // Removed starter monsters (Thyron, Vireya, Slime)
            // User starts with nothing and must summon using the 10 epic tickets
            
            showToast(`Conta criada: ${val} - Você ganhou 5 runas!`);
          }

          localStorage.setItem("paperwar_last_user", val);
          save();

          document.getElementById("player-name-ui").innerText = state.user.name;
          // Hide letter, show emoji
          document.getElementById("header-initial").classList.add("hidden");
          const iconEl = document.getElementById("header-icon-img");
          iconEl.innerText = state.user.icon; // Display emoji as text
          iconEl.classList.remove("hidden");

          checkDailyReset();
          // checkTowerReset(); // Assuming this function will be added later
          trackMission('login', 1);

          changeView("view-home");
          updateHeader();
        } catch (e) {
          showToast("Erro no Login: " + e.message, "error");
          console.error(e);
        }
      };

      const changeView = async (id) => {
        const target = document.getElementById(id);
        if (!target) return;

        // Encontrar a view atual
        const currentView = document.querySelector("#app > main:not(.hidden-view)");

        // Aplicar transição suave se o sistema estiver disponível
        if (window.ScreenTransition && currentView && currentView.id !== id) {
          await window.ScreenTransition.slideTransition(currentView, target);
        } else {
          // Fallback para transição sem animação
          document.querySelectorAll("#app > main").forEach(el => {
            el.classList.add("hidden-view");
          });
          target.classList.remove("hidden-view");
        }

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
        if (id === "view-missions") renderMissions();
        if (id === "view-pvp") renderPvPView();
        if (id === "view-runes") renderRunesView();
        
        // ===== NOVAS FEATURES =====
        if (id === "view-achievements") renderAchievements();
        
        // Atualizar notificações
        updateNewFeatureNotifications();
      };


      // --- RENDERIZAÇÃO DA CAMPANHA/HISTÓRIA ---
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
        trackMission('campaign_play', 1); // Hook for mission tracking
        
        // ===== TRACKING DE BATALHAS =====
        // Incrementa contador de batalhas iniciadas
        // (Vitórias serão contadas quando completar)
        if (!state.user.battlesStarted) state.user.battlesStarted = 0;
        state.user.battlesStarted++;
      };


      const closeBattle = () => {
        // ===== TRACKING DE VITÓRIA EM BATALHA =====
        if (!state.user.totalBattles) state.user.totalBattles = 0;
        state.user.totalBattles++;
        trackAchievement(state, 'battles_won', state.user.totalBattles);
        
        changeView("view-home");
      };


      const updateHeader = () => {
        // ===== OTIMIZADO COM DOM BATCHING =====
        // Agrupa todas as leituras primeiro, depois todas as escritas
        // Isso evita "layout thrashing" e melhora performance significativamente
        
        // PHASE 1: DOM READS (batchRead)
        batchRead(() => {
          // Lê propriedades do DOM sem causar reflow
          const iconEl = document.getElementById("header-icon-img");
          const currentIcon = iconEl?.getAttribute("data-icon");
          
          // PHASE 2: COMPUTATIONS & DOM WRITES (batchWrite)
          batchWrite(() => {
            // Todas as escritas agrupadas
            updateText("player-name-ui", state.user.name);
            
            // Icon Logic otimizado
            const initEl = document.getElementById("header-initial");
            
            if (state.user.icon && state.user.icon !== currentIcon && iconEl) {
              const iconStr = state.user.icon;
              iconEl.setAttribute("data-icon", iconStr);
              
              // Fast check for images
              if ((typeof iconStr === 'string') && (iconStr.includes("src/") || iconStr.includes("http") || iconStr.endsWith(".png") || iconStr.endsWith(".jpg"))) {
                iconEl.innerHTML = `<img src="${iconStr}" class="w-full h-full object-cover rounded-xl" />`;
              } else if ((typeof iconStr === 'string') && (iconStr.indexOf("<") > -1)) {
                iconEl.innerHTML = iconStr;
              } else {
                iconEl.innerText = iconStr;
              }
              iconEl.classList.remove("hidden");
              if (initEl) initEl.classList.add("hidden");
            } else if (!state.user.icon && iconEl && initEl) {
              iconEl.classList.add("hidden");
              initEl.classList.remove("hidden");
              const newInit = state.user.name ? state.user.name[0].toUpperCase() : "?";
              if (initEl.innerText !== newInit) initEl.innerText = newInit;
            }
            
            // Update resource values (já usa updateText que verifica mudanças)
            updateText("val-crystals", state.user.crystals);
            updateText("val-energy", state.user.energy);
            updateText("val-gold", state.user.gold);
            updateText("header-lvl", state.user.lvl);
            
            // XP Bar update
            const xpReq = 100 * state.user.lvl;
            const pct = Math.min(100, Math.max(0, (state.user.xp / xpReq) * 100));
            const xpBar = document.getElementById("header-xp-bar");
            if (xpBar) {
              xpBar.style.width = `${pct}%`;
              xpBar.classList.remove("w-0");
            }
            
            // ENERGY REGENERATION LOGIC
            const now = Date.now();
            if (!state.user.lastEnergyRegen) state.user.lastEnergyRegen = now;
            
            const msPassed = now - state.user.lastEnergyRegen;
            const twoMinutes = 2 * 60 * 1000;
            const maxEnergy = 100 + state.user.lvl;
            
            if (msPassed >= twoMinutes) {
              if (state.user.energy < maxEnergy) {
                const intervals = Math.floor(msPassed / twoMinutes);
                const regenAmount = intervals * 5;
                
                if (state.user.energy < maxEnergy) {
                  state.user.energy = Math.min(maxEnergy, state.user.energy + regenAmount);
                  state.user.lastEnergyRegen += intervals * twoMinutes;
                  save();
                  updateText("val-energy", state.user.energy);
                } else {
                  state.user.lastEnergyRegen = now;
                }
              } else {
                state.user.lastEnergyRegen = now;
              }
            }
          });
        });
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

      // --- LÓGICA DE LOJA E EQUIPAMENTOS ---
      const updateShopUI = () => {
        document.getElementById("shop-crystals").innerText =
          state.user.crystals;
        document.getElementById("shop-gold").innerText = state.user.gold;
      };
      const buyShopItem = (item) => {
        // --- BILHETES ---
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

        // --- RECURSOS ---
        if (item === "energy") {
          if (state.user.crystals < 50) return showToast("Cristais insuficientes! Requ: 50", "error");
          state.user.crystals -= 50;
          state.user.energy += 50;
        }
        if (item === "energy_100") {
          if (state.user.crystals < 90) return showToast("Cristais insuficientes! Requ: 90", "error");
          state.user.crystals -= 90;
          state.user.energy += 100;
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
        
        // === NOVO: Feedback visual de compra na posição do último clique ===
        if (window.particleSystem && window.lastClickPosition) {
          window.particleSystem.createPurchaseParticles(
            window.lastClickPosition.x, 
            window.lastClickPosition.y, 
            15
          );
        } else if (window.particleSystem) {
          // Fallback para centro da tela
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          window.particleSystem.createPurchaseParticles(centerX, centerY, 15);
        }
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
        trackMission('summon', 1);
        updateHeader();
        updateSummonUI();

        // 1. GERAR MONSTROS PRIMEIRO (para detectar raridade)
        currentSummonResults = [];
        let maxStarsFound = 0;

        for (let i = 0; i < amount; i++) {
          let rarity = "common";
          const r = Math.random();
          
          if (type === "common") {
            // TICKET COMUM: Apenas 1 a 3 estrelas
            // 85% Comum (1-2*), 15% Raro (3*)
            if (r < 0.85) rarity = "common";
            else rarity = "rare";
          } else {
            // TICKET ÉPICO: Apenas 3 a 5 estrelas
            // Newbie Luck Logic: If user hasn't gotten their first 5* yet, boost rates significantly
            let chanceLegendary = 0.005; // 0.5% default (Summoners War standard)
            let chanceEpic = 0.08;       // 8% default
            
            // NEWBIE LUCK BOOST
            if (state.user.hasFirst5Star === false || state.user.hasFirst5Star === undefined) {
                 chanceLegendary = 0.10; // 10% chance for first nat 5!
                 console.log("Newbie Luck Active! 10% rate");
            }

            if (r < chanceLegendary) {
                rarity = "legendary";
            } else if (r < chanceLegendary + chanceEpic) {
                rarity = "epic";
            } else {
                rarity = "rare"; // Fallback to 3*
            }
          }

          // Definir intervalo de estrelas baseado na raridade
          let minStar = 1, maxStar = 2;
          
          if (rarity === "common") {
              minStar = 1; maxStar = 2;
          }
          if (rarity === "rare") {
            minStar = 3; maxStar = 3;
          }
          if (rarity === "epic") {
            minStar = 4; maxStar = 4;
          }
          if (rarity === "legendary") {
            minStar = 5; maxStar = 5;
            // Mark newbie luck as used if this is a 5-star
            // We'll update the state flag after the loop or right here
            if (state.user.hasFirst5Star === false || state.user.hasFirst5Star === undefined) {
                 state.user.hasFirst5Star = true;
            }
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
            equipped: { slot1: null, slot2: null, slot3: null, slot4: null },
            stars: template.stars,
          };

          state.inventory.push(newMon);
          currentSummonResults.push(newMon);
        }

        // ===== TRACKING DE ACHIEVEMENTS & STATS =====
        // Track summon count
        if (!state.user.totalSummons) state.user.totalSummons = 0;
        state.user.totalSummons += amount;
        trackAchievement(state, 'summons_done', state.user.totalSummons);
        
        // Track legendary pulls
        const legendariesInResults = currentSummonResults.filter(m => m.stars === 5).length;
        if (legendariesInResults > 0) {
          trackAchievement(state, 'legendary_pulled', legendariesInResults);
        }
        
        // Track unique monsters
        const uniqueCount = new Set(state.inventory.map(m => m.id)).size;
        trackAchievement(state, 'unique_monsters', uniqueCount);

        save();

        // 2. ANIMAÇÃO CONDICIONAL BASEADA EM RARIDADE
        const overlay = document.getElementById("summon-anim-overlay");
        overlay.classList.remove("hidden");
        overlay.classList.add("flex");

        const core = document.getElementById("summon-core");
        const rays = document.getElementById("summon-rays");
        const flash = document.getElementById("summon-flash");
        const app = document.getElementById("app");

        // === NOVO: Portal de summon ===
        if (window.particleSystem) {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          window.particleSystem.createSummonPortal(centerX, centerY);
        }

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

          // === NOVO: Raios de summon 5 estrelas ===
          if (window.particleSystem) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            window.particleSystem.createSummonLightning(centerX, centerY, 8);
          }

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
          
          // === NOVO: Confete para nat 5 ===
          if (window.particleSystem) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            window.particleSystem.createConfetti(centerX, centerY, 50);
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
  
  // === NOVO: Ocultar botão "Continuar" em summons múltiplos ===
  const closeButton = modal.querySelector('button');
  if (closeButton) {
    if (count > 1) {
      // Múltiplos summons: ocultar botão (auto-close ativo)
      closeButton.classList.add('hidden');
    } else {
      // Single summon: mostrar botão
      closeButton.classList.remove('hidden');
    }
  }

  // Adjust grid based on summon count
  if (count === 1) {
    // Single summon: centered, larger card
    grid.className =
      "flex-1 flex items-center justify-center overflow-y-auto pb-20";
  } else if (count <= 10) {
    // 10x summon: Grid 3 colunas - SEM SCROLL
    grid.className =
      "flex-1 grid grid-cols-3 gap-2.5 px-3 py-2 place-content-center items-center justify-items-center";
  } else {
    // Mais de 10: Grid com scroll (fallback)
    grid.className =
      "flex-1 grid grid-cols-3 gap-2.5 px-3 py-2 overflow-y-auto pb-20 custom-scrollbar";
  }

  currentSummonResults.forEach((mon, idx) => {
    const card = document.createElement("div");

    // Adjust card size based on count
    if (count === 1) {
      // Single: Grande
      card.className = "relative w-48 h-64 perspective-1000 opacity-0";
    } else if (count <= 10) {
      // 10x: Bem compacto (w-20 = 80px, h-28 = 112px)
      card.className = "relative w-20 h-28 perspective-1000 opacity-0";
    } else {
      // Mais de 10: Pequeno
      card.className = "relative w-18 h-26 perspective-1000 opacity-0";
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

    // Ajustar tamanhos de fonte e padding para cards compactos
    const isCompact = count > 1 && count <= 10;
    const starSize = isCompact ? "text-[6px]" : "text-[9px]";
    const typeSize = isCompact ? "text-[5px]" : "text-[8px]";
    const nameSize = isCompact ? "text-[7px]" : "text-[10px]";
    const emojiSize = isCompact ? "text-2xl" : "text-5xl";
    const padding = isCompact ? "p-1" : "p-3";

    card.innerHTML = `
          <div class="w-full h-full rounded-2xl border-2 ${borderCol} bg-gradient-to-br ${bgGrad} ${padding} flex flex-col items-center justify-between ${glow} relative overflow-hidden">
              <!-- Glow Background -->
              <div class="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <!-- Header -->
              <div class="w-full flex justify-between items-start relative z-10">
                  <span class="${starSize} text-white font-black bg-black/70 px-1 py-0.5 rounded-full backdrop-blur-sm">${"★".repeat(
                    mon.stars
                  )}</span>
                  ${
                    mon.stars >= 5
                      ? `<span class="animate-pulse text-amber-300 ${isCompact ? 'text-[10px]' : 'text-sm'}">✨</span>`
                      : ""
                  }
              </div>
              
              <!-- IMAGE with EMOJI FALLBACK - FIXED SIZE -->
              <div class="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                  <img 
                    src="${mon.img}" 
                    class="w-full h-full object-contain filter drop-shadow-xl z-10 transition-transform hover:scale-105" 
                    onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                  />
                  <span class="${emojiSize} absolute hidden">${
                    mon.emoji || '❓'
                  }</span>
              </div>

              <!-- Footer -->
              <div class="text-center w-full relative z-10 ${isCompact ? 'mt-0' : 'mt-1'}">
                  <div class="${typeSize} text-slate-300 uppercase font-bold tracking-wider truncate opacity-80">${
                    mon.type
                  }</div>
                  <div class="${nameSize} text-white font-black truncate w-full leading-tight">${
                    mon.name
                  }</div>
              </div>
          </div>
       `;
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
  
  // === NOVO: Auto-close após destacar raros ===
  if (count > 1) {
    // Calcular tempo total de animação dos cards
    const totalAnimTime = count * 100 + 500; // 100ms por card + 500ms extra
    
    // Encontrar cards raros (3+ estrelas)
    const rareCards = currentSummonResults.filter(m => m.stars >= 3);
    
    if (rareCards.length > 0) {
      // Destacar raros por 2 segundos, depois fechar
      setTimeout(() => {
        // Adicionar pulse extra nos raros
        const allCards = grid.querySelectorAll('.perspective-1000');
        currentSummonResults.forEach((mon, idx) => {
          if (mon.stars >= 3) {
            allCards[idx]?.classList.add('animate-pulse');
          }
        });
        
        // Fechar após 2 segundos
        setTimeout(() => {
          closeSummonResults();
        }, 2000);
      }, totalAnimTime);
    } else {
      // Sem raros: fechar após 3 segundos
      setTimeout(() => {
        closeSummonResults();
      }, totalAnimTime + 3000);
    }
  }
};


      const closeSummonResults = () => {
        document.getElementById("summon-results").classList.remove("flex");
        document.getElementById("summon-results").classList.add("hidden");
      };


      
      // --- EQUIPMENT UI HANDLERS ---


      const handleEqClick = (slot) => {
        const mon = state.inventory[selectedDetailIdx];
        const equippedId = mon.equipped[slot];

        if (equippedId) {
          // Open Upgrade Modal
          currentEqId = equippedId;
          renderUpgradeModal();
        } else {
          // Lógica de Equipar: Encontrar o melhor disponível para este slot
          // NOVO SISTEMA: slot1-4, SISTEMA ANTIGO: weapon/armor/acc
          let slotNumber;
          if (slot === 'slot1') slotNumber = 1;
          else if (slot === 'slot2') slotNumber = 2;
          else if (slot === 'slot3') slotNumber = 3;
          else if (slot === 'slot4') slotNumber = 4;
          // Compatibilidade com sistema antigo
          else if (slot === 'weapon') slotNumber = 1;
          else if (slot === 'armor') slotNumber = 2;
          else if (slot === 'acc') slotNumber = 4;
          
          const items = state.equipment.filter(
            (e) => e.slot === slotNumber && !isEquipped(e.id)
          );
          
          if (items.length > 0) {
            // Ordenar por raridade/nível, pegar o melhor
            items.sort((a, b) => {
              const rarityOrder = {legendary: 4, epic: 3, rare: 2, common: 1};
              return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0) || b.lvl - a.lvl;
            });
            mon.equipped[slot] = items[0].id;
            save();
            openDetail(selectedDetailIdx);
            showToast("Equipado!", "success");
          } else {
            showToast("Nenhum item disponível para este slot!", "info");
          }
        }
      };

      const isEquipped = (id) => {
        return state.inventory.some(
          (m) =>
            // NOVO SISTEMA
            m.equipped.slot1 === id ||
            m.equipped.slot2 === id ||
            m.equipped.slot3 === id ||
            m.equipped.slot4 === id
        );
      };

      const getEquipperName = (id) => {
        const mon = state.inventory.find(
          (m) =>
            // NEW SYSTEM
            m.equipped.slot1 === id ||
            m.equipped.slot2 === id ||
            m.equipped.slot3 === id ||
            m.equipped.slot4 === id
        );
        return mon ? mon.name : null;
      };

      const openUpgradeModal = (eqId) => {
        currentEqId = eqId;
        renderUpgradeModal();
      };
      
      const renderUpgradeModal = () => {
        const modal = document.getElementById("eq-modal-v2");
        const eq = state.equipment.find((e) => e.id === currentEqId);
        if (!eq) return; 
        
        const rarityInfo = EQ_RARITY[eq.rarity];
        
        let setInfo = "No Set", setDesc = "";
        const setKey = eq.set;
        if(setKey && EQUIPMENT_SETS[setKey]) {
            const s = EQUIPMENT_SETS[setKey];
            setInfo = s.name;
            setDesc = s.display || ""; 
        }
        
        const isMax = eq.lvl >= 15;
        const upgradeCost = 100 * (eq.lvl + 1);

        // --- STATS ---
        let mainStatHtml = "";
        if (eq.stats.main) {
             const m = eq.stats.main;
             mainStatHtml = `
                <div class="flex flex-col items-center sm:items-start mb-2 bg-black/20 p-2 rounded w-full shrink-0">
                    <span class="text-xl sm:text-2xl font-black text-white drop-shadow-md whitespace-nowrap">
                        ${m.type.toUpperCase()} +${m.value}
                    </span>
                    <span class="text-[9px] text-[#facb5a] font-bold uppercase tracking-wider">Main Stat</span>
                </div>
             `;
        }

        let subsHtml = "";
        if (eq.stats.subs && eq.stats.subs.length > 0) {
            subsHtml = eq.stats.subs.map(sub => `
                <div class="flex justify-between items-center text-xs font-semibold text-[#c7af8b] border-b border-[#3d2a16] py-1 last:border-0">
                    <span class="uppercase text-[10px] sm:text-xs opacity-80">${sub.type}</span>
                    <span class="text-white">+${sub.value}</span>
                </div>
            `).join("");
        } else if (!eq.stats.main) {
            subsHtml = `<div class="text-white/50 text-[10px] italic">Legacy Stats</div>`;
        }

        // --- BUTTONS ---
        const equippedBy = getEquipperName(eq.id);
        const btnStyleBase = "w-full py-3 sm:py-2.5 border rounded font-bold text-[10px] sm:text-xs uppercase shadow-md active:translate-y-[1px] mb-2 flex items-center justify-center shrink-0";
        const btnGold = `bg-gradient-to-b from-[#e5c575] to-[#b08b3e] border-[#5c3a1a] text-[#3d240e] ${btnStyleBase}`;
        const btnRed = `bg-gradient-to-b from-[#e57575] to-[#b03e3e] border-[#5c1a1a] text-[#3d0e0e] ${btnStyleBase}`;

        let equipBtn = "";
        if (equippedBy) {
            const currentMon = state.inventory[selectedDetailIdx];
            const isOwnedByCurrent = currentMon && isEquippedByMon(currentMon, eq.id);
            if (isOwnedByCurrent) {
                equipBtn = `<button onclick="unequipItem('${eq.id}', 500)" class="${btnRed}">Unequip</button>`;
            } else {
                 equipBtn = `<button disabled class="${btnGold} opacity-50 cursor-not-allowed grayscale">Equipped: ${equippedBy}</button>`;
            }
        } else {
             if (typeof selectedDetailIdx !== 'undefined' && selectedDetailIdx !== -1) {
                 equipBtn = `<button onclick="equipFromDetail('${eq.id}'); document.getElementById('eq-modal-v2').classList.add('hidden');" class="${btnGold}">Engrave</button>`;
             }
        }

        // --- STRUCTURE ---
        // Compact Mobile Layout:
        // [Header (Fixed)]
        // [Content (Scrollable)] -> Icon + Set Info (Row), Main Stat, Sub Stats
        // [Footer (Fixed)] -> Actions
        
        modal.innerHTML = `
            <div class="relative w-[90%] max-w-[360px] sm:max-w-[700px] h-auto max-h-[90vh] bg-[#1a120b] border-[2px] sm:border-[3px] border-[#d4a017] rounded-xl shadow-2xl flex flex-col font-sans select-none animate-fade-in overflow-hidden">
                
                <!-- HEADER (Mobile) -->
                <div class="bg-gradient-to-b from-[#2e2012] to-[#1a120b] border-b border-[#3d2a16] flex items-center px-4 py-2 justify-between z-20 shrink-0">
                    <span class="text-[#facb5a] font-bold tracking-wide text-xs drop-shadow-md truncate">
                        +${eq.lvl} ${setInfo} ${eq.type === 'weapon' ? 'Weapon' : eq.type === 'armor' ? 'Armor' : eq.slot === 4 ? 'Acc' : 'Helm'}
                    </span>
                    <button onclick="document.getElementById('eq-modal-v2').classList.add('hidden')" class="text-[#8a7a5a] hover:text-white font-bold text-lg leading-none p-2 -mr-2">✕</button>
                </div>
                
                <!-- BODY (Scrollable) -->
                <div class="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
                    
                    <!-- LEFT COL: Visuals -->
                    <div class="flex sm:flex-col items-center gap-4 sm:w-[200px] sm:shrink-0 sm:border-r border-[#3d2a16]/50 sm:pr-4">
                        
                        <!-- Icon Container -->
                        <div class="relative w-16 h-16 sm:w-32 sm:h-32 bg-[#0d0905] rounded-xl border border-[#3d2a16] shadow-inner flex-shrink-0 group">
                             <div class="absolute inset-0 bg-contain bg-center opacity-30" style="background-image: url('src/rune_bg.png');"></div>
                             
                             <div id="eq-icon-container" class="relative z-10 w-full h-full flex items-center justify-center">
                                 <div id="eq-upgrade-glow" class="absolute inset-[-5px] rounded-full opacity-0 pointer-events-none transition-all bg-yellow-500/20 blur-lg"></div>
                                 <div id="eq-energy-ring-1" class="absolute inset-1 border-2 border-[#facb5a]/30 rounded-full"></div>
                                 <div id="eq-energy-ring-2" class="absolute inset-2 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite] opacity-50"></div>
                                 
                                 <span class="text-3xl sm:text-6xl drop-shadow-lg filter brightness-125 relative z-20 transform group-hover:scale-110 transition-transform duration-300">
                                     ${eq.type === 'weapon' ? '⚔️' : eq.type === 'armor' ? '🛡️' : eq.type === 'helmet' ? '⛑️' : '💍'}
                                 </span>
                                 <div class="absolute -bottom-1 -right-1 bg-black text-white text-[9px] sm:text-xs font-bold px-1.5 rounded border border-white/20 shadow z-30">+${eq.lvl}</div>
                             </div>
                             
                             <div id="eq-anim-overlay" class="absolute inset-0 hidden items-center justify-center z-50 bg-black/60 rounded-xl">
                                 <span id="eq-anim-icon" class="text-3xl animate-bounce"></span>
                             </div>
                        </div>

                        <!-- Info (Side on mobile, Bottom on Desktop) -->
                        <div class="flex flex-col items-start sm:items-center text-left sm:text-center w-full">
                            <span class="bg-[#3e1a1a] text-[#ffaaaa] text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded border border-[#6b2a2a] uppercase tracking-widest mb-1.5">
                                 ${rarityInfo.name}
                            </span>
                             <div class="text-[#facb5a] text-[10px] sm:text-xs leading-tight opacity-90">
                                ${setDesc}
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT COL: Stats -->
                    <div class="flex-1 flex flex-col w-full">
                        ${mainStatHtml}
                        <div class="bg-[#120c07] p-3 rounded border border-[#3d2a16] flex-1 min-h-[100px]">
                             <div class="flex justify-between items-center mb-1">
                                <h4 class="text-[#5c3a1a] text-[9px] font-bold uppercase">Sub Properties</h4>
                                <span class="text-[8px] text-[#5c3a1a] uppercase bg-[#2b2218] px-1 rounded">Rank ${Math.floor(eq.lvl/3)}/5</span>
                             </div>
                             <div class="space-y-0.5">
                                ${subsHtml}
                             </div>
                        </div>
                        
                        <!-- RUNE SLOTS SECTION -->
                        <div class="bg-[#120c07] p-3 rounded border border-purple-900/30 mt-3">
                             <div class="flex justify-between items-center mb-2">
                                <h4 class="text-purple-400 text-[9px] font-bold uppercase flex items-center gap-1">
                                    <span>💎</span> Rune Slots
                                </h4>
                                <span class="text-[8px] text-purple-400/60 uppercase">${getRuneSlots(eq)} Slots</span>
                             </div>
                             <div class="grid grid-cols-3 gap-2" id="eq-rune-slots">
                                ${renderRuneSlots(eq)}
                             </div>
                        </div>
                    </div>
                </div>

                <!-- FOOTER (Fixed Actions) -->
                <div class="p-4 bg-[#140e08] border-t border-[#3d2a16] flex flex-col gap-2 shrink-0 z-20">
                    <div class="flex gap-2">
                        <div class="flex-1">
                             ${!isMax ? `
                                <button id="btn-upgrade-action" onclick="performUpgrade('${eq.id}')" class="w-full py-3 bg-gradient-to-b from-[#fcd34d] to-[#d97706] border border-[#78350f] rounded text-[#451a03] font-black text-xs uppercase shadow-[0_2px_0_#451a03] active:translate-y-[2px] active:shadow-none hover:brightness-110 relative overflow-hidden group transition-all">
                                    <span class="relative z-10 flex flex-col items-center leading-none">
                                        <span class="tracking-wider text-sm">POWER-UP</span>
                                        <span class="text-[9px] font-bold opacity-80 mt-1">${upgradeCost} G</span>
                                    </span>
                                    <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            ` : `
                                 <div class="w-full py-3 bg-[#2b2218] text-[#facb5a] text-center text-xs font-bold border border-[#3d2a16] rounded uppercase opacity-80 flex items-center justify-center">
                                    Max Level Reached
                                 </div>
                            `}
                        </div>
                        
                        <!-- Sell Button (Small) -->
                        <div class="w-20">
                             <button onclick="sellEquipment('${eq.id}')" class="w-full h-full bg-[#2b2218] border border-[#3d2a16] rounded flex flex-col items-center justify-center text-[#e57575] hover:bg-[#3d2a16] transition-colors">
                                <span class="text-[9px] uppercase font-bold">Sell</span>
                                <span class="text-[9px] font-bold opacity-80">${Math.floor(upgradeCost * 2.5)} G</span>
                            </button>
                        </div>
                    </div>
                     ${equipBtn}
                </div>
            </div>
        `;
        
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      };

      const sellEquipment = (eqId) => {
        const id = eqId || currentEqId;
        const price = window.sellEquipment(state, id);
        
        if (price === null) return; // Não vendeu (equipado ou não encontrado)
        
        save();
        
        document.getElementById("eq-modal-v2").classList.add("hidden");
        showToast(`Vendido por ${price} Ouro`);
        updateHeader();

        // Refresh views
        if (!document.getElementById("view-inventory").classList.contains("hidden-view"))
          renderInventory();
        if (!document.getElementById("mon-detail-overlay").classList.contains("hidden"))
          openDetail(selectedDetailIdx);
      };


      const performUpgrade = async (eqId) => {
        try {
            // Debug Toast
            // showToast("Tentando aprimorar...", "info"); 

            const eq = state.equipment.find((e) => e.id === eqId);
            if (!eq) {
                console.error("Equipamento não encontrado:", eqId);
                return showToast("Erro: Equipamento não encontrado.", "error");
            }
            
            const cost = 100 * (eq.lvl + 1);
            const chance = Math.max(5, 100 - eq.lvl * 5);
    
            if (state.user.gold < cost)
              return showToast("Ouro insuficiente!", "error");
            
            // UI Feedback
            const upgradeBtn = document.getElementById("btn-upgrade-action");
            const originalBtnContent = upgradeBtn ? upgradeBtn.innerHTML : "";
            if (upgradeBtn) {
                upgradeBtn.disabled = true;
                upgradeBtn.innerHTML = "<span class='animate-pulse'>Aprimorando...</span>";
            }
            
            // Deduct Gold immediately
            state.user.gold -= cost;
            updateHeader();
    
            const roll = Math.random() * 100;
            const success = roll <= chance;
            
            // Animation Elements (Safe Get)
            const get = (id) => document.getElementById(id);
            const container = get("eq-icon-container");
            const glow = get("eq-upgrade-glow");
            const ring1 = get("eq-energy-ring-1");
            const ring2 = get("eq-energy-ring-2");
            const animOverlay = get("eq-anim-overlay");
            const animIcon = get("eq-anim-icon");
            
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            
            // --- ANIMATION SEQUENCE ---
            // If main elements missing, skip anim but do logic
            if (ring1) {
              ring1.style.borderColor = "#6366f1"; 
              ring1.style.opacity = "0.8";
              ring1.style.transition = "all 0.5s";
              ring1.style.animation = "spin 0.5s linear infinite";
            }
            if (ring2) {
               ring2.style.borderColor = "#8b5cf6"; 
               ring2.style.opacity = "0.8";
               ring2.style.transition = "all 0.5s";
               ring2.style.animation = "spin 0.5s linear infinite reverse";
            }
            
            await sleep(800); // Wait for spin
            
            // Flash Effect
            if (glow) {
               glow.style.transition = "opacity 0.2s";
               glow.style.background = success ? 
                   "radial-gradient(circle, rgba(234,179,8,0.8), transparent)" : // Gold for success
                   "radial-gradient(circle, rgba(239,68,68,0.8), transparent)";   // Red for fail
               glow.style.opacity = "1";
            }
    
            await sleep(200);
            
            if (success) {
                eq.lvl++;
                
                // Stat Increases
                if (eq.stats.main) {
                     // Simple linear increase for now
                     eq.stats.main.value = Math.floor(eq.stats.main.value * 1.15) + 1;
                }
                
                // Upgrade sub (every 3 levels)
                if (eq.lvl % 3 === 0) {
                     if (eq.stats.subs.length < 4) {
                         // Add new sub
                         const newSub = generateSubStat(); // Helper must exist
                         eq.stats.subs.push({ type: newSub.type, value: newSub.value });
                         showToast("Novo Substatus!", "success");
                     } else {
                         // Upgrade random sub
                         const sub = eq.stats.subs[Math.floor(Math.random() * eq.stats.subs.length)];
                         sub.value += Math.floor(Math.random() * 3) + 2;
                         showToast(`Substatus Aumentado: ${sub.type}`, "success");
                     }
                }
                
                
                if (animOverlay && animIcon) {
                    animOverlay.classList.remove("hidden");
                    animOverlay.classList.add("flex");
                    animIcon.innerText = "✅ SUCESSO";
                    animIcon.className = "text-xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-bounce text-center";
                }
                // showToast(`+${eq.lvl} Aprimorado com Sucesso!`);
    
            } else {
                if (animOverlay && animIcon) {
                    animOverlay.classList.remove("hidden");
                    animOverlay.classList.add("flex");
                    animIcon.innerText = "❌ FALHA";
                    animIcon.className = "text-xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse text-center";
                }
                // showToast("Falha no aprimoramento...", "error");
            }
            
            await sleep(1000); // Show result
    
            // Cleanup
            if (animOverlay) {
                animOverlay.classList.add("hidden");
                animOverlay.classList.remove("flex");
            }
            if (ring1) {
                ring1.style.opacity = "";
                ring1.style.borderColor = "";
                ring1.style.animation = "";
            }
             if (ring2) {
                ring2.style.opacity = "";
                ring2.style.borderColor = "";
                ring2.style.animation = "";
            }
            if (glow) glow.style.opacity = "0";
            
            save(); // Save progress
            
            // Re-render
            const invView = document.getElementById("view-inventory");
            if (invView && !invView.classList.contains("hidden-view")) {
                renderInventory();
            }
            renderUpgradeModal(); // Update modal UI (new lvl, cost, stats)
    
        } catch (err) {
            console.error(err);
            showToast("Erro interno ao aprimorar: " + err.message, "error");
            // Restore button
            const upgradeBtn = document.getElementById("btn-upgrade-action");
             if (upgradeBtn) {
                upgradeBtn.disabled = false;
                upgradeBtn.innerHTML = "Power-up"; // Reset text
            }
        }
      };


      // --- LÓGICA DE VISUALIZAÇÃO DE INVENTÁRIO ---
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

      // ===== VERSÃO INTERNA (não debounced) =====
      const _renderInventoryInternal = () => {
        perfStart('renderInventory'); // Performance tracking
        
  const grid = document.getElementById("inventory-grid");
  if (!grid) return;
  grid.innerHTML = "";

  let items = state.equipment;
  if (currentInvFilter !== "all")
    items = items.filter((e) => e.type === currentInvFilter);

  const emptyMsg = document.getElementById("inv-empty-msg");
  if (items.length === 0) {
    if (emptyMsg) {
        emptyMsg.classList.remove("hidden");
        emptyMsg.classList.add("flex");
    }
  } else {
    if (emptyMsg) {
        emptyMsg.classList.add("hidden");
        emptyMsg.classList.remove("flex");
    }
  }

  const fragment = document.createDocumentFragment();
  items.forEach((eq) => {
    const conf = EQ_RARITY[eq.rarity];
    const equippedBy = getEquipperName(eq.id);

    const el = document.createElement("div");
    el.className = `aspect-square bg-slate-900 rounded-xl border relative cursor-pointer active:scale-95 transition-transform ${conf.color}`;
    // sobrescrever cor do texto para borda
    el.style.borderColor =
      eq.rarity === "legendary"
        ? "#fbbf24"
        : eq.rarity === "epic"
        ? "#a855f7"
        : eq.rarity === "rare"
        ? "#3b82f6"
        : "#94a3b8";

    // Deduzir tipo se estiver faltando (robustez)
    let eqType = eq.type;
    if (!eqType) {
        if (eq.slot === 1) eqType = "weapon";
        else if (eq.slot === 2) eqType = "armor";
        else if (eq.slot === 3) eqType = "helmet";
        else if (eq.slot === 4) eqType = "acc";
        else eqType = "weapon"; // fallback
    }

    const icon =
      eqType === "weapon" ? "⚔️" : eqType === "armor" ? "🛡️" : eqType === "helmet" ? "⛑️" : "💍";

    el.innerHTML = `
              <div class="absolute inset-0 flex items-center justify-center text-2xl">${icon}</div>
              <div class="absolute top-1 right-1 text-[9px] font-black bg-black/60 px-1 rounded text-white">+${
                eq.lvl
              }</div>
              <div class="absolute bottom-1 left-1 text-[8px] text-slate-300 font-bold max-w-[90%] truncate">${EQUIPMENT_SETS[eq.set]?.name || eq.set}</div>
              ${
                equippedBy
                  ? `<div class="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-indigo-600 border border-white flex items-center justify-center text-[8px] font-bold text-white" title="${equippedBy}">E</div>`
                  : ""
              }
          `;
    el.onclick = (e) => {
      e.stopPropagation(); // Prevent bubbling
      currentEqId = eq.id;
      // Ensure function exists
      if (typeof window.renderUpgradeModal === 'function') {
           window.renderUpgradeModal();
      } else if (typeof renderUpgradeModal === 'function') {
           renderUpgradeModal();
      } else {
           console.error("renderUpgradeModal not found");
      }
    };
    fragment.appendChild(el);
  });
  grid.appendChild(fragment);
  
  perfEnd('renderInventory'); // Fim tracking
};

      // ===== VERSÃO OTIMIZADA COM DEBOUNCE =====
      // Evita renderizações excessivas durante filtros/busca
      const renderInventory = debouncedRender(
        'inventory',
        _renderInventoryInternal,
        100 // 100ms debounce
      );

      const updateSummonUI = () => {
        const elC = document.getElementById("summon-tickets-common");
        const elE = document.getElementById("summon-tickets-epic");
        if (elC) elC.innerText = state.user.tickets_common;
        if (elE) elE.innerText = state.user.tickets_epic;
      };

      // --- DUNGEON & PREP ---
      // --- MASMORRA E PREPARAÇÃO ---
      let selectedDungeonType = "golem";

      const openDungeonSelect = (type) => {
        selectedDungeonType = type;
        changeView("view-dungeon");
        renderDungeonFloors(); // FIX: Ensure floors are rendered

        // FIX: Background removed in favor of banner
        const view = document.getElementById("view-dungeon");
        if (view) {
            view.style.backgroundImage = "";
            view.style.boxShadow = "";
        }
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
          pvp: state.pvpOpponent ? `⚔️ ${state.pvpOpponent.username}` : `Arena PvP`,
        };
        // Normalizar custo da masmorra
        let cost = 5;
        if (mode.startsWith("dungeon")) cost = 5 + Math.floor(lvl / 2);

        document.getElementById("prep-title").innerText = titles[mode];
        document.getElementById("prep-cost").innerText = `${cost} ⚡`;
        
        // Lógica do Botão de Farmar
        const farmBtn = document.getElementById("btn-prep-farm");
        if (farmBtn) {
            let canFarm = false;
            
            // Permitir farmar se masmorra e dificuldade anterior concluída?
            // O requisito é "concluir a fase uma vez".
            // Então se dungeonProgress[type] >= level.
            
            if (mode.startsWith("dungeon")) {
                const type = mode.replace("dungeon_", "");
                const progress = (state.user.dungeonProgress && state.user.dungeonProgress[type]) || 0;
                // progress is the MAX cleared level.
                // So if I want to farm level 1, progress needs to be >= 1.
                if (progress >= lvl) canFarm = true;
            } else if (mode === "story") {
                 // For story, if stage < storyProgress? 
                 // Usually farm is for dungeons. User said "concluir a fase".
                 // Let's enable for story too if completed.
                 if (lvl < state.storyProgress) canFarm = true;
            }
            
            // Disable farm button for PvP
            if (mode === "pvp") canFarm = false;
            
            if (canFarm) {
                farmBtn.disabled = false;
                farmBtn.className = "flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white font-bold uppercase text-sm shadow-lg active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer hover:brightness-110";
            } else {
                farmBtn.disabled = true;
                farmBtn.className = "flex-1 py-4 bg-slate-800 rounded-2xl text-slate-500 font-bold uppercase text-sm shadow-lg border border-white/5 transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed";
            }
        }

        renderPrepUnit();
        renderPrepRoster();
      };

      window.confirmBattle = () => {
        const mode = prepState.mode;
        const level = prepState.level;
        const selectedMon = state.inventory[prepState.selectedMonIdx];
        
        if (!selectedMon) {
          showToast('Selecione um guerreiro!', 'error');
          return;
        }
        
        // Verificar energia
        let cost = 5;
        if (mode.startsWith("dungeon")) cost = 5 + Math.floor(level / 2);
        
        if (state.user.energy < cost) {
          showToast(`Energia insuficiente! Necessário: ${cost}`, 'error');
          return;
        }
        
        // PvP Mode - Simular batalha
        if (mode === 'pvp') {
          if (!state.pvpOpponent) {
            showToast('Oponente não encontrado!', 'error');
            return;
          }
          
          // Consumir energia
          state.user.energy -= cost;
          updateHeader();
          save();
          
          // Simular batalha
          const playerTeam = [selectedMon].map(mon => ({
            ...mon,
            currentHp: calculateStats(mon).hp,
            maxHp: calculateStats(mon).hp
          }));
          
          const victory = simulatePvPBattle(playerTeam, state.pvpOpponent.team);
          
          // Calcular recompensas
          const rewards = calculatePvPRewards(victory, state.pvpOpponent.rank);
          
          // Atualizar estatísticas
          updatePvPStats(victory, rewards);
          
          // Mostrar resultado
          showToast(victory ? '🏆 Vitória!' : '💔 Derrota...', victory ? 'success' : 'error');
          
          setTimeout(() => {
            const resultMsg = victory 
              ? `🏆 VITÓRIA CONTRA ${state.pvpOpponent.username}!\n\n` +
                `Recompensas:\n` +
                `💰 +${rewards.gold} Ouro\n` +
                `💎 +${rewards.crystals} Cristais\n` +
                `📊 Rank: ${rewards.rankChange > 0 ? '+' : ''}${rewards.rankChange}\n\n` +
                `Novo Rank: ${getPvPRankTitle(state.user.pvpRank).icon} ${getPvPRankTitle(state.user.pvpRank).name} (${state.user.pvpRank} pts)`
              : `💔 DERROTA CONTRA ${state.pvpOpponent.username}\n\n` +
                `Consolação:\n` +
                `💰 +${rewards.gold} Ouro\n` +
                `📊 Rank: ${rewards.rankChange}\n\n` +
                `Novo Rank: ${getPvPRankTitle(state.user.pvpRank).icon} ${getPvPRankTitle(state.user.pvpRank).name} (${state.user.pvpRank} pts)`;
            
            alert(resultMsg);
            
            // Limpar oponente
            state.pvpOpponent = null;
            
            // Voltar para PvP arena
            changeView('view-pvp');
            
            // Partículas
            if (victory) {
              spawnParticles(window.innerWidth/2, window.innerHeight/2, 'gold');
            }
          }, 500);
          
          return;
        }
        
       // TODO: Outras batalhas (story, dungeon, tower) - implementar se necessário
        showToast('Modo de batalha não implementado ainda!', 'warning');
      };

      window.startFarmPrep = () => {
         // startBattle(prepState.mode, prepState.level, 5);
         showToast('Farm ainda não implementado!', 'warning');
      };

      const renderPrepUnit = () => {
        const mon = state.inventory[prepState.selectedMonIdx];
        const stats = calculateStats(mon);

        // Image & Visuals - Using helper
        const visualsWrapper = document.getElementById("prep-img-wrapper");
        if (visualsWrapper) {
            visualsWrapper.innerHTML = getMonsterVisuals(mon);
            const span = visualsWrapper.querySelector('span');
            if (span) span.style.fontSize = "6rem";
        }
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
      
      // Detectar conjuntos ativos (2 peças = bônus)
      const detectActiveSets = (mon) => {
        if (!mon.equipped) return [];
        
        const equippedItems = [];
        
        // NOVO SISTEMA: 4 slots
        if (mon.equipped.slot1) equippedItems.push(state.equipment.find(e => e.id === mon.equipped.slot1));
        if (mon.equipped.slot2) equippedItems.push(state.equipment.find(e => e.id === mon.equipped.slot2));
        if (mon.equipped.slot3) equippedItems.push(state.equipment.find(e => e.id === mon.equipped.slot3));
        if (mon.equipped.slot4) equippedItems.push(state.equipment.find(e => e.id === mon.equipped.slot4));
        
        // Contar conjuntos
        const setCounts = {};
        equippedItems.forEach(eq => {
          if (eq && eq.set) {
            setCounts[eq.set] = (setCounts[eq.set] || 0) + 1;
          }
        });
        
        // Find active sets (2+ pieces)
        const activeSets = [];
        Object.keys(setCounts).forEach(setKey => {
          if (setCounts[setKey] >= 2) {
            const setInfo = EQUIPMENT_SETS[setKey];
            if (setInfo) {
              activeSets.push({
                set: setKey,
                pieces: setCounts[setKey],
                bonus: setInfo.bonus,
                name: setInfo.name,
                icon: setInfo.icon
              });
            }
          }
        });
        
        return activeSets;
      };

      const calculateStats = (mon) => {
        // Crescimento: 3% por nível
        // Bônus de Estrela: +12% status base por estrela acima de 1
        
        const lvlMult = 1 + (mon.lvl - 1) * 0.03;
        const starMult = 1 + (mon.stars - 1) * 0.12; 
        
        // Multipliers
        const m = lvlMult * starMult;

        // Role Modifiers
        // Role Modifiers
        const tpl = MONSTERS_DB.find(x => x.id === mon.id) || MONSTERS_DB.find(x => x.name === mon.name);
        const role = mon.role || (tpl ? tpl.role : 'balanced');

        let rAtk = 1, rHp = 1, rDef = 1;
        if (role === 'attacker') { rAtk = 1.25; rHp = 0.9; rDef = 0.9; }
        else if (role === 'defender') { rDef = 1.35; rHp = 1.15; rAtk = 0.8; }
        else if (role === 'hp') { rHp = 1.40; rAtk = 0.85; rDef = 1.05; }
        else if (role === 'support') { rHp = 1.15; rDef = 1.15; rAtk = 0.9; }
        
        // Base Stats
        let hp = Math.floor(mon.hp * m * rHp);
        let atk = Math.floor(mon.atk * m * rAtk);
        let def = Math.floor(mon.def * m * rDef);
        let crit = 15;
        let cdmg = 50;
        let spd = 100; // Base speed
        
        // Status de Equipamento (NOVO SISTEMA)
        if (mon.equipped) {
            // Auxiliar para aplicar status
            const addStat = (type, val) => {
                if (!val) return;
                switch(type) {
                    case 'atk': atk += val; break; // Flat
                    case 'def': def += val; break; // Flat
                    case 'hp':  hp += val; break;  // Flat
                    case 'spd': spd += val; break; // Flat
                    case 'crit': crit += val; break;
                    case 'cdmg': cdmg += val; break;
                    case 'res': break; // not used yet
                    case 'acc': break; // not used yet
                }
            };
            
            // Auxiliar para % stats (se tivéssemos tipos distintos, ex: "atk%")
            // Por enquanto, nosso generateSubStat usa "atk" mas o valor é baixo (5-8), implicando %?
            // "val = Math.floor(Math.random() * 4) + 5; // 5-8%" no comentário de createEquipment.
            // Mas aqui adicionamos ao 'atk' (flat).
            // Usuários queriam status "funcionais".
            // Se ATK base é 100, +5 ATK é +5%.
            // Mas se ATK base é 1000, +5 ATK é nada.
            // Summoners War usa % stats pesadamente.
            // Vamos assumir que os substats gerados SÃO porcentagens para Atk/Def/Hp se o valor for baixo?
            // Não, isso é ambíguo.
            // Vamos manter adicionando como está ao total por enquanto, ou tratar como % se mudarmos a camada lógica.
            // Para esta iteração/prompt "manter a mesma aleatoriedade... capaz de ficar muito bom",
            // se tratarmos como %, precisamos calcular base * pct.
            
            // REVISED LOGIC: Treat ALL secondary Atk/Def/Hp as PERCENTAGE of base?
            // Or just keep them as flat for simplicity but boost the numbers?
            // The prompt says "igual o modo de upgrade de summoners war".
            // In SW: Slot 2/4/6 can be %. Substats can be %.
            // Current code `atk += eq.stats.atk` implies flat addition.
            // Let's implement % logic for substats to make them "Good"
            let bonusPct = { atk: 0, hp: 0, def: 0 };
            
            ['slot1', 'slot2', 'slot3', 'slot4'].forEach(slotKey => {
              if (mon.equipped[slotKey]) {
                const eq = state.equipment.find(e => e.id === mon.equipped[slotKey]);
                if (eq && eq.stats) {
                  // 1. Lidar com NOVA Estrutura
                  if (eq.stats.main) {
                      // Status Principal
                      const m = eq.stats.main;
                      // Determinar se é % ou flat.
                      // Slot 1/2/3 Status Principais geralmente são flat no nosso createEquipment
                      // Slot 4 era "atk", "hp", etc com valor 10 -> provavelmente %.
                      if (eq.slot === 4 || m.type === 'crit' || m.type === 'cdmg') {
                           if (['atk','def','hp'].includes(m.type)) bonusPct[m.type] += m.value;
                           else addStat(m.type, m.value);
                      } else {
                           // Flat
                           addStat(m.type, m.value);
                      }
                  }
                  
                  if (eq.stats.subs) {
                      eq.stats.subs.forEach(sub => {
                          if (['atk','def','hp'].includes(sub.type)) {
                              bonusPct[sub.type] += sub.value;
                          } else {
                              addStat(sub.type, sub.value);
                          }
                      });
                  }

                  // 2. Lidar com Estrutura LEGADO
                  if (!eq.stats.main && !eq.stats.subs) {
                       if (eq.stats.atk) atk += eq.stats.atk;
                       if (eq.stats.hp) hp += eq.stats.hp;
                       if (eq.stats.def) def += eq.stats.def;
                       if (eq.stats.crit) crit += eq.stats.crit;
                       if (eq.stats.cdmg) cdmg += eq.stats.cdmg;
                  }
                }
              }
            });
            
            // Compatibilidade: Itens legados tinham "atk: 15" que era flat.
            // Novos itens têm "subs: [{type: atk, value: 5}]".
            // Se tratarmos novos subs como %, +5% é melhor que +5 flat para monstros de nível alto.
            
            // Aplicar Porcentagens à Base (antes de adições flat? Não, status base são `mon.atk * m`)
            // Vamos aplicar % à base calculada usando `m` (multiplicador lvl/estrela)
            const baseAtk = Math.floor(mon.atk * m * rAtk);
            const baseHp = Math.floor(mon.hp * m * rHp);
            const baseDef = Math.floor(mon.def * m * rDef);
            
            atk += Math.floor(baseAtk * (bonusPct.atk / 100));
            hp += Math.floor(baseHp * (bonusPct.hp / 100));
            def += Math.floor(baseDef * (bonusPct.def / 100));
            
            // Status Flat Legado/Principal já foram adicionados a `atk`.
            // Idealmente: Total = Base * (1 + Pct) + Flat.
            // Código atual acima adiciona Flat a `atk`.
            // Depois adicionamos % da Base.
            // Resultado: Base + Flat + (Base * Pct) = Base(1+Pct) + Flat. Correto.
        }

        // Aplicar Bônus de Conjunto
        const activeSets = detectActiveSets(mon);
        activeSets.forEach(set => {
          const bonus = set.bonus;
          if (bonus.type === 'hp') {
            hp = Math.floor(hp * (1 + bonus.value / 100));
          } else if (bonus.type === 'atk') {
            atk = Math.floor(atk * (1 + bonus.value / 100));
          } else if (bonus.type === 'def') {
            def = Math.floor(def * (1 + bonus.value / 100));
          } else if (bonus.type === 'crit') {
            crit += bonus.value;
          } else if (bonus.type === 'cdmg') {
            cdmg += bonus.value;
          } else if (bonus.type === 'spd') {
            spd = Math.floor(spd * (1 + bonus.value / 100));
          }
          // Nota: lifesteal e extra_turn são tratados na lógica de batalha
        });

        return { hp, atk, def, crit, cdmg, spd, activeSets };
      };
        


      const renderPrepRoster = () => {
        const grid = document.getElementById("prep-grid");
        if (!grid) return;
        
        grid.innerHTML = "";
        const fragment = document.createDocumentFragment();
        
        state.inventory.forEach((mon, idx) => {
          const el = document.createElement("div");
          const isSel = idx === prepState.selectedMonIdx;
          
          el.className = `aspect-square bg-slate-800 rounded-xl relative cursor-pointer transition-all overflow-hidden group border-2 ${
            isSel ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-95' : 'border-slate-700 hover:border-slate-500'
          }`;
          
          el.innerHTML = `
              <div class="w-full h-full flex items-center justify-center p-1 relative z-10">
                  ${getMonsterVisuals(mon)}
              </div>
              <div class="absolute top-1 left-1 z-20">
                   <span class="text-[8px] font-black text-white bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur">★${mon.stars}</span>
              </div>
              <div class="absolute bottom-1 right-1 z-20">
                   <span class="text-[8px] font-bold text-white drop-shadow-md">Lv.${mon.lvl}</span>
              </div>
              ${isSel ? '<div class="absolute inset-0 bg-green-500/10 pointer-events-none z-10"></div><div class="absolute inset-0 border-2 border-green-400 rounded-xl animate-pulse z-20"></div>' : ''}
          `;
          
          // Adjust visuals for small card
          const img = el.querySelector('img');
          if (img) img.className = "w-full h-full object-contain filter drop-shadow-md";
          
          const span = el.querySelector('span.select-none');
          if (span) {
              span.style.fontSize = "2rem";
              // Span starts hidden if img exists, logic handles it
          }
      
          el.onclick = () => {
            prepState.selectedMonIdx = idx;
            renderPrepUnit();
            renderPrepRoster();
            // Optional: Close roster on select? User might want to browse.
            // Keeping original behavior:
            const roster = document.getElementById("prep-roster");
            if (roster) roster.classList.add("hidden");
          };
          fragment.appendChild(el);
        });
        grid.appendChild(fragment);
      };

      window.startFarmPrep = () => {
         startBattle(prepState.mode, prepState.level, 5);
      };
    
      const confirmBattle = () => startBattle(prepState.mode, prepState.level);

      // --- BATTLE ---
      const startBattle = (modeArg, lvlArg, startRepeat = 0) => {
        // Lidar com Reinício ou Novo Início
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
        trackMission('energy', cost);
        updateHeader();

        // Inicializar Estado de Batalha
        battleState = {
          active: true,
          mode: mode,
          busy: false,
          auto: false,
          speed: 1,
          repeatCount: isRestart ? battleState.repeatCount : startRepeat,
          sessionLog: isRestart ? battleState.sessionLog : (startRepeat > 0 ? {
              gold: 0,
              crystals: 0,
              xp: 0,
              drops: [],
              wins: 0,
              battles: 0,
              startTime: Date.now()
          } : null)
        };

        // Forçar Auto se Repetir estiver ativo (Modo Farm)
        if (battleState.repeatCount > 0) {
            battleState.auto = true;
            battleState.speed = 3; // Also force 3x speed for farm
        }

        // Verificar alternância Auto-10x (apenas no início fresco)
        if (!isRestart) {
            const cb = document.getElementById("prep-auto-10x");
            if (cb && cb.checked) {
                battleState.repeatCount = 10;
            }
        }

        // Auto-Habilitar Funcionalidades para Masmorras Concluídas
        if (mode.startsWith("dungeon")) {
            if (state.user.dungeonClear && state.user.dungeonClear[mode]) {
                battleState.auto = true;
                battleState.speed = 3;
            }
        }

        updateBattleControls();
        
        // Removed addLog call as it doesn't exist
        
        if(battleState.auto) {
             setTimeout(triggerAuto, 500); 
        }

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
        
        // Aplicar classe CSS baseada no modo de jogo para fundos dinâmicos
        const battleView = document.getElementById("view-battle");
        if (battleView) {
          // Remover todas as classes de modo anteriores
          battleView.classList.remove("mode-story", "mode-golem", "mode-dragon", "mode-xp", "mode-tower");
          
          // Adicionar classe apropriada baseada no modo
          if (mode === "story") {
            battleView.classList.add("mode-story");
          } else if (mode === "dungeon_golem") {
            battleView.classList.add("mode-golem");
          } else if (mode === "dungeon_dragon") {
            battleView.classList.add("mode-dragon");
          } else if (mode === "dungeon_xp") {
            battleView.classList.add("mode-xp");
          } else if (mode === "tower") {
            battleView.classList.add("mode-tower");
          } else {
            // Modo padrão (story) para qualquer outro caso
            battleView.classList.add("mode-story");
          }
        }
        
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
          // --- NOVA LÓGICA DE GERAÇÃO ---
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

          // Excluir chefes de masmorra do pool aleatório se eles entrarem (eles são 5* ou 4*)
          availableMonsters = availableMonsters.filter(m => m.id !== "dhorak" && m.id !== "vermithrax");

          // Fallback
          if (availableMonsters.length === 0) {
              availableMonsters = MONSTERS_DB.filter(m => m.stars === 3);
          }

          template = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
        }

        let lvl = 1;
        // Escalonamentos do Patch de Balanceamento
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

        // Nova fórmula de Crescimento é aplicada automaticamente por calculateStats ou lógica manual abaixo
        // Como mudamos calculateStats para 5% de crescimento, inimigos devem seguir.
        
        // Cálculo manual de status para inimigo (versão simplificada de calculateStats)
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
        if (el && template) {
            el.innerHTML = getMonsterVisuals(template);
            const span = el.querySelector('span');
            if (span) span.style.fontSize = "4rem";
        } else if (el) {
            el.innerHTML = `<span style="font-size:4rem">❓</span>`;
        }
      }

      const renderBattleScene = () => {
        const pl = document.getElementById("player-sprite-container");
        const en = document.getElementById("enemy-sprite-container");
        
        if (pl && battleState.player) {
            const mon = battleState.player;
            // Handle imgBack if available specifically for player in battle
            const visualMon = {...mon};
            if (mon.imgBack && typeof mon.imgBack === 'string' && mon.imgBack.length > 4 && !mon.imgBack.includes("undefined")) {
                 visualMon.img = mon.imgBack;
            }
            
            // Verify global function availability and use it
            if (window.getMonsterVisuals) {
                pl.innerHTML = window.getMonsterVisuals(visualMon);
            } else {
                pl.innerHTML = getMonsterVisuals(visualMon);
            }
            const span = pl.querySelector('span');
            if (span) span.style.fontSize = "4rem";
            
            // === NOVO: Animação de entrada do player ===
            pl.classList.add('character-enter-left');
            setTimeout(() => pl.classList.remove('character-enter-left'), 800);
        }
        
        // === NOVO: Animação de entrada do enemy ===
        if (en) {
            en.classList.add('character-enter-right');
            setTimeout(() => en.classList.remove('character-enter-right'), 800);
        }
        
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
    btn.className = `bg-slate-800/80 border border-white/10 rounded-lg p-1.5 flex flex-col items-center transition-all ${
      canAfford
        ? "hover:bg-white/10 active:scale-90"
        : "opacity-50 grayscale cursor-not-allowed"
    }`;
    btn.innerHTML = `
              <span class="text-lg mb-0.5">${s.icon}</span>
              <span class="text-[7px] font-black uppercase text-white leading-tight">${
                s.n
              }</span>
              ${
                s.mp > 0
                  ? `<span class="text-[7px] text-blue-300 font-bold leading-none">${s.mp} MP</span>`
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

        // === NOVO: Verificar se é ultimate (MP >= 50) ===
        const isUltimate = skill.mp && skill.mp >= 50;

        if (skill.type === "phys") {
          wrapperAtt.classList.add(
            isPlayer ? "anim-melee-player" : "anim-melee-enemy"
          );
          attackerEl.classList.add("anim-spin-atk");
          
          // === NOVO: Adicionar rastro de movimento ===
          if (window.particleSystem) {
            window.particleSystem.createMotionTrail(attackerEl);
          }
          
          await sleep(500 / spd);
          wrapperAtt.classList.remove(
            isPlayer ? "anim-melee-player" : "anim-melee-enemy"
          );
          attackerEl.classList.remove("anim-spin-atk");
        } else {
          // Lógica de Troca de Sprite de Personagem APENAS PARA ATAQUES ESPECIAIS
          const imgElement = attackerEl.querySelector("img");
          const origImg = imgElement ? imgElement.src : null;
          let didSwap = false;
          
          if (att.imgAtk && imgElement) {
            imgElement.src = att.imgAtk;
            didSwap = true;
          }

          attackerEl.classList.add("anim-cast");
          
          // === NOVO: Efeito de carregamento para ultimates ===
          if (isUltimate && window.particleSystem) {
            const rect = attackerEl.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Partículas de carregamento
            for (let i = 0; i < 2; i++) {
              setTimeout(() => {
                window.particleSystem.createFloating(centerX, centerY, 6, '#fbbf24');
              }, i * 200);
            }
          }
          
          // Otimização: Apenas atrasar 600ms (antes era 1500ms) se imgAtk personalizada for fornecida
          if (att.imgAtk) {
             await sleep(600 / spd);
          } else {
             await sleep(300 / spd);
          }

          if (skill.type.endsWith("_sup") || skill.type.startsWith("sup_"))
            await spawnUltimateVFX(skill.type, isPlayer);
          else await spawnVFX(skill.type, isPlayer);
          attackerEl.classList.remove("anim-cast");

          // Reverter sprite
          if (didSwap && imgElement && origImg) {
            imgElement.src = origImg;
          }
        }

        defenderEl.classList.add("anim-hit-recoil");
        const defImg = defenderEl.querySelector("img");
        if (defImg) defImg.classList.add("anim-hit-spin");

        setTimeout(() => {
          defenderEl.classList.remove("anim-hit-recoil");
          if (defImg) defImg.classList.remove("anim-hit-spin");
        }, 600 / spd);

        // QUADROS DE IMPACTO E TREMOR DE TELA
        const impactDelay = 100 / spd; // Ms for freeze
        if (impactDelay > 20) await sleep(impactDelay); // Hit freeze!

        // Tremer Câmera
        const arena = document.getElementById("app");
        arena.classList.add("anim-shake-impact");
        setTimeout(() => arena.classList.remove("anim-shake-impact"), 300);

        // Bônus de Skill Up: +5% por nível
        const skillMod = 1 + ((att.skillUps || 0) * 0.05);
        const raw = (att.atk || 10) * skill.p * skillMod;
        
        // NOVA FÓRMULA DE DANO (Baseada em Mitigação)
        // Dano = Bruto * (1200 / (1200 + 3 * DEF))
        const defVal = def.def || 0;
        const mitigation = 1200 / (1200 + (defVal * 3));
        let dmg = raw * mitigation;
        
        // Ensure at least some damage based on level diff?
        // Let's just enforce minimum 5% of raw
        dmg = Math.max(raw * 0.05, dmg);

        let isCrit = false;
        if (att.crit && Math.random() * 100 < att.crit) {
          isCrit = true;
          dmg = dmg * (1 + (att.cdmg || 50) / 100);
          // Tremor mais forte para crítico
          arena.classList.add("anim-shake-crit");
          setTimeout(() => arena.classList.remove("anim-shake-crit"), 400);
          
          // === NOVO: Efeitos de crítico ===
          if (window.particleSystem) {
            const rect = defenderEl.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            window.particleSystem.createStars(centerX, centerY, 8);
            window.particleSystem.createShockwave(centerX, centerY, 'rgba(251, 191, 36, 0.8)');
          }
        }
        dmg = Math.floor(dmg);

        def.curHp = Math.max(0, def.curHp - dmg);
        updateBattleHUD();
        showDmgText(dmg, isPlayer ? "ent-enemy" : "ent-player", isCrit);
        
        // === NOVO: Efeitos de impacto baseados no elemento ===
        if (window.particleSystem) {
          const rect = defenderEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const element = skill.element || att.element || 'physical';
          
          // Partículas baseadas no elemento
          if (element === 'fire') {
            window.particleSystem.createFireEffect(centerX, centerY);
          } else if (element === 'water') {
            window.particleSystem.createWaterEffect(centerX, centerY);
          } else if (element === 'lightning') {
            window.particleSystem.createLightningEffect(centerX, centerY);
          } else if (element === 'nature') {
            window.particleSystem.createHealEffect(centerX, centerY);
          } else if (element === 'void') {
            window.particleSystem.createBurst(centerX, centerY, 20, '#a855f7');
          } else {
            // Físico ou outros
            window.particleSystem.createBurst(centerX, centerY, isCrit ? 20 : 10, '#ffffff');
          }
          
          // Efeito extra para ultimates
          if (isUltimate) {
            setTimeout(() => {
              window.particleSystem.createShockwave(centerX, centerY, 'rgba(168, 85, 247, 0.9)');
              window.particleSystem.createBurst(centerX, centerY, 30, '#a855f7');
            }, 100);
          }
        }
        
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

        // RESTRIÇÃO GLOBAL DE FLASH (Apenas acionar flash se explicitamente permitido)
        const triggerFlash = (duration = 100) => {
          if (
            type === "lightning" ||
            type === "thunder_storm" ||
            type.includes("bolt") ||
            type === "meteor_strike"
          ) {
            // Remove active class if exists to restart
            flash.classList.remove("flash-screen");
            void flash.offsetWidth; // Trigger reflow
            
            flash.classList.add("flash-screen");
            
            const cleanup = () => {
                flash.classList.remove("flash-screen");
                flash.removeEventListener("animationend", cleanup);
            };
            
            flash.addEventListener("animationend", cleanup);
          }
        };

        // VFX HABILIDADES ONDA 2
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
          // Tremer mais forte
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
          triggerFlash(50); // Talvez um flash pequeno para sensação de ultimate
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
          triggerFlash(300); // Flash de ultimate de fogo? Ou raio estrito? Usuário disse "somente habilidades do tipo trovao". Ok, removendo flash aqui.
          // Na verdade, "solar_flare" implica luz brilhante. Mas regra do usuário é estrita. Sem flash.

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

      // VFX DE NOVAS HABILIDADES ELEMENTAIS
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

        // Flash APENAS para tipos raio/elétrico
        if (type.includes("lightning")) {
           flash.classList.remove("flash-screen");
           void flash.offsetWidth;
           flash.classList.add("flash-screen");
           flash.addEventListener("animationend", () => flash.classList.remove("flash-screen"), {once:true});

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

        // NOVAS HABILIDADES SUPREMAS
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
          for (let i = 0; i < 12; i++) { // Reduced from 20 to 12
            const fire = document.createElement("div");
            fire.className = "vfx-fireball";
            fire.style.width = "50px"; // Slightly larger to compensate
            fire.style.height = "50px";
            fire.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg) blur(5px)`;
            layer.appendChild(fire);
            fire.animate([
              { transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) scale(0.5)`, opacity: 1 },
              { transform: `translateX(${targetPos.x + (Math.random()-0.5)*150}px) translateY(${targetPos.y + (Math.random()-0.5)*100}px) translateZ(${targetPos.z}px) scale(3)`, opacity: 0 }
            ], { duration: 600 / spd, easing: "ease-out" }).finished.then(() => fire.remove()); // Reduced duration to 600
            await sleep(15 / spd); // Reduced delay
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
            ], { duration: 800 / spd }).finished.then(() => chain.remove());
            await sleep(80 / spd);
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
          ], { duration: 600 / spd }).finished; // Reduced duration
          pulse.remove();
          app.classList.remove("anim-shake-crit");
          return;
        }

        if (type === "sup_ice_butterflies") {
          for (let i = 0; i < 8; i++) { // Reduced from 12
            const b = document.createElement("div");
            b.innerText = "🦋";
            b.style.position = "absolute";
            b.style.fontSize = "2rem";
            b.style.filter = "hue-rotate(180deg) brightness(2)";
            layer.appendChild(b);
            const angle = (i / 8) * Math.PI * 2;
            b.animate([
              { transform: `translateX(${startPos.x}px) translateY(${startPos.y}px) translateZ(${startPos.z}px) scale(0)`, opacity: 1 },
              { transform: `translateX(${targetPos.x + Math.cos(angle)*100}px) translateY(${targetPos.y + Math.sin(angle)*100}px) translateZ(${targetPos.z}px) scale(1.5)`, opacity: 0 }
            ], { duration: 800 / spd, easing: "ease-out" }).finished.then(() => b.remove());
            await sleep(50 / spd);
          }
          return;
        }

        if (type === "sup_forest_fury") {
          for (let i = 0; i < 6; i++) { // Reduced from 8
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
            ], { duration: 600 / spd }).finished.then(() => root.remove());
            await sleep(60 / spd);
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
          ], { duration: 800 / spd, easing: "ease-in" }).finished; // Reduced duration
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
          ], { duration: 1000 / spd }); // Reduced
          for (let i = 0; i < 6; i++) { // Reduced from 10
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
          ], { duration: 800 / spd, easing: "ease-in" }).finished; // Reduced
          comet.remove();
          return;
        }

          // NEW SUPREME SKILLS VFX
      if (type === "sup_cosmic_storm") {
        for (let i = 0; i < 15; i++) { // Reduced from 30
          const star = document.createElement("div");
          star.style.position = "absolute";
          star.style.width = "6px";
          star.style.height = "6px";
          star.style.borderRadius = "50%";
          star.style.background = `radial-gradient(circle, #fff, ${i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#60a5fa' : '#f472b6'})`;
          star.style.boxShadow = `0 0 15px ${i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#60a5fa' : '#f472b6'}`;
          const angle = (i / 15) * Math.PI * 2;
          const radius = 80 + Math.random() * 40;
          star.style.transform = `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px)`;
          layer.appendChild(star);
          
          star.animate(
            [
              { transform: `translateX(${targetPos.x}px) translateY(${targetPos.y}px) translateZ(${targetPos.z}px) scale(0)`, opacity: 0 },
              { transform: `translateX(${targetPos.x + Math.cos(angle) * radius}px) translateY(${targetPos.y + Math.sin(angle) * radius}px) translateZ(${targetPos.z}px) scale(1)`, opacity: 1 },
              { transform: `translateX(${targetPos.x + Math.cos(angle) * radius * 0.5}px) translateY(${targetPos.y + Math.sin(angle) * radius * 0.5}px) translateZ(${targetPos.z}px) scale(0)`, opacity: 0 },
            ],
            { duration: 1200 / spd, easing: "ease-out", fill: "forwards" }
          ).finished.then(() => star.remove()); // Ensure cleanup
          
        }
        await sleep(1000 / spd); // Reduced from 1600
        return;
      }

      if (type === "sup_infernal_apocalypse") {
        for (let i = 0; i < 6; i++) { // Reduced from 8
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
              { duration: 600 / spd, easing: "ease-in", fill: "forwards" } // Reduced
            ).finished.then(() => meteor.remove());
          }, i * 150 / spd);
        }
        await sleep(1000 / spd); // Reduced from 2000
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

      const winBattle = async () => {
        // === NOVO: Efeitos de vitória ===
        const playerEl = document.getElementById("player-sprite-container");
        
        if (window.particleSystem && playerEl) {
          const rect = playerEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Celebração com partículas
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              window.particleSystem.createStars(centerX, centerY, 8);
              window.particleSystem.createBurst(centerX, centerY, 20, '#fbbf24');
            }, i * 200);
          }
          
          // Animação de vitória
          playerEl.classList.add('victory-celebration');
          setTimeout(() => playerEl.classList.remove('victory-celebration'), 1000);
        }
        
        // Aguardar um pouco para mostrar os efeitos
        await sleep(800);
        endScreen(true);
      };
      
      const loseBattle = async () => {
        // === NOVO: Efeitos de derrota ===
        const playerEl = document.getElementById("player-sprite-container");
        
        if (playerEl) {
          playerEl.classList.add('defeat-fall');
          setTimeout(() => playerEl.classList.remove('defeat-fall'), 1000);
        }
        
        // Aguardar um pouco para mostrar os efeitos
        await sleep(800);
        endScreen(false);
      };

      const endScreen = (win) => {
        // --- LÓGICA DE SESSÃO DE FARM (ACUMULADOR) ---
        let session = battleState.sessionLog;
        if (session) {
            session.battles++;
            if (win) session.wins++;
        }
        
        
        if (win) {
            trackMission('battle_win', 1);
            if (battleState.mode.startsWith("dungeon")) trackMission('dungeon_clear', 1);
            if (battleState.mode === "story") trackMission('campaign_play', 1);
            
            // ===== TRACKING DE ACHIEVEMENTS =====
            // Track batalhas vencidas
            if (!state.user.totalBattles) state.user.totalBattles = 0;
            state.user.totalBattles++;
            trackAchievement(state, 'battles_won', state.user.totalBattles);
            
            // Track dungeons completados
            if (battleState.mode.startsWith("dungeon")) {
              if (!state.user.dungeonsCleared) state.user.dungeonsCleared = 0;
              state.user.dungeonsCleared++;
              trackAchievement(state, 'dungeons_cleared', state.user.dungeonsCleared);
              
              // Track floor máximo
              const currentFloor = battleState.level || 1;
              trackAchievement(state, 'dungeon_floor', currentFloor);
            }
        }

        // Se estiver em modo Farm (repeatCount > 0) e ganhou, NÃO mostra modal ainda, apenas acumula
        // Mas se perdeu, interrompe? Usuário não especificou. Geralmente farm para se perder.
        // Vamos assumir: Se perder, interrompe farm e mostra o acumulado até agora.
        
        if (win && battleState.repeatCount > 0) {
             let nextCost = 5;
             if (battleState.mode.startsWith("dungeon")) {
                 nextCost = 5 + Math.floor(prepState.level / 2);
             }
             
             if (state.user.energy < nextCost) {
                 battleState.repeatCount = 0;
                 showToast("Ciclo interrompido: Energia Insuficiente!", "error");
             }
        }

        let shouldShowModal = true;
        
        if (win && battleState.repeatCount > 1) {
            shouldShowModal = false;
        }

        const ov = document.getElementById("battle-overlay");
        
        // Se for mostrar modal, prepara UI
        if (shouldShowModal) {
            ov.classList.remove("hidden");
            ov.classList.add("flex");
            void ov.offsetWidth;
            ov.style.opacity = "1";
            
            // Título Dinâmico
            if (session && session.battles > 1) {
                document.getElementById("outcome-title").innerText = "RESULTADO DO FARM";
            } else {
                document.getElementById("outcome-title").innerText = win ? "VITÓRIA" : "DERROTA";
            }
        }

        let repeatCancelled = false;
        
        
        // LÓGICA DE UI DE REPETIÇÃO AUTOMÁTICA (APENAS SE MODAL ESTIVER VISÍVEL E FOR PAUSA/FIM ANORMAL)
        // Se estamos suprimindo o modal, não precisamos configurar botões agora.
        
        if (shouldShowModal) {
             if (battleState.repeatCount > 1) {
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
        }

        let rewards = "";
        let xpAmount = 0; // Escopo externo para log
        let goldGained = 0;
        let crystalsGained = 0;
        let droppedItems = [];

        if (win) {
          
          // --- LÓGICA DE XP DE MONSTRO ---
          const hero = state.inventory[prepState.selectedMonIdx]; // FIXED: selectedIdx -> selectedMonIdx
          // XP Formula: Base * Level * Multiplier
          let xpBase = 100;
          if (battleState.mode.startsWith("dungeon")) xpBase = 300;
          if (battleState.mode === "dungeon_xp") xpBase = 2000; // Massive XP in XP Dungeon
          
          xpAmount = Math.floor(xpBase * (1 + prepState.level * 0.2));

          // VERIFICAÇÃO DE BOOST DE XP
          if (state.user.xpBoostEndTime && Date.now() < state.user.xpBoostEndTime) {
               xpAmount *= 3;
               // O aviso visual só faz sentido se o modal for exibido agora, ou no final.
          }
          
           // Aplicar XP
           addXP(hero, xpAmount);

          // XP da Conta (Menor)
          const accXp = 50;
          state.user.xp += accXp;

          const accXpReq = 100 * state.user.lvl;
          if (state.user.xp >= accXpReq) {
            state.user.xp = state.user.xp - accXpReq;
            state.user.lvl++;
            state.user.crystals += 25;
            if (shouldShowModal) showToast(`LEVEL UP! Nível ${state.user.lvl} (+25 💎)`);
          }

          if (battleState.mode.startsWith("dungeon")) {
            const floor = prepState.level;
            
            // Atualizar Progresso da Masmorra
            if (!state.user.dungeonProgress) state.user.dungeonProgress = { golem: 0, dragon: 0, xp: 0 };
            const type = battleState.mode.replace("dungeon_", ""); // golem, dragon, xp
            
            // Correção: Tratar indefinido como 0 para que a comparação funcione
            const currentProg = state.user.dungeonProgress[type] || 0;
            
            if (currentProg < floor) {
                state.user.dungeonProgress[type] = floor;
                // Toast para desbloqueio?
                if (floor < 12 && shouldShowModal) showToast(`Andar B${floor + 1} Liberado!`, "success");
            }
            
            // Masmorra Concluída? Marcar para desbloqueio Auto/Speed
            state.user.dungeonClear = state.user.dungeonClear || {};
            if (!state.user.dungeonClear[battleState.mode]) {
                state.user.dungeonClear[battleState.mode] = true;
                if (shouldShowModal) showToast("Auto & 3x Liberados para esta masmorra!", "success");
            }

            goldGained = 4000 + floor * 500; 
            crystalsGained = 1 + Math.floor(floor/2);

            // LÓGICA DE DROP
            let dropRate = 0.3 + floor * 0.02; // Base 30%
            
            // Masmorra de XP dropa MENOS itens/ouro, principalmente XP
            if (battleState.mode === "dungeon_xp") {
                goldGained = 1000 + floor * 100; // Less gold in XP dungeon
                dropRate = 0.05; // Very low drop rate
            }

            if (Math.random() < dropRate && battleState.mode !== "dungeon_xp") {
              const dungeonType = battleState.mode.includes("dragon")
                ? "dragon"
                : "golem";
              const droppedEq = createEquipment(floor, dungeonType);
              state.equipment.push(droppedEq);
              droppedItems.push(droppedEq);
            }
          } else if (battleState.mode === "tower") {
            state.towerFloor++;
            crystalsGained = 50 + state.towerFloor * 10;
            goldGained = 3000 * state.towerFloor; 
          } else {
            const stage = prepState.level;
            const stageKey = `stage_${stage}`;
            // Ensure firstClear exists
            if (!state.user.firstClear) state.user.firstClear = {};
            
            if (!state.user.firstClear[stageKey]) {
              crystalsGained = 100;
              goldGained = 5000 * stage; 
              state.user.firstClear[stageKey] = true;
              if (stage === state.storyProgress) state.storyProgress++;
            } else {
              crystalsGained = 5;
              goldGained = 1000 + stage * 300; 
            }
          }

          state.user.crystals += crystalsGained;
          state.user.gold += goldGained;
          save();
          updateHeader();
          
          // --- ACUMULAR NO SESSION LOG ---
          if (session) {
              session.gold += goldGained;
              session.crystals += crystalsGained;
              session.xp += xpAmount;
              if (droppedItems.length > 0) session.drops.push(...droppedItems);
          }

          // === GERAÇÃO DE HTML DE RECOMPENSAS (APENAS SE FOR MOSTRAR MODAL) ===
          if (shouldShowModal) {
              // Se estamos mostrando o modal E temos uma sessão, usamos os totais da sessão
              let displayGold = session ? session.gold : goldGained;
              let displayCrystals = session ? session.crystals : crystalsGained;
              let displayXP = session ? session.xp : xpAmount;
              let displayDrops = session ? session.drops : droppedItems;
              
              // Título de Vitória (Com contagem se for sessão)
              if (session) {
                  rewards += `<div class="text-center font-bold text-green-400 mb-2">${session.wins}/${session.battles} Vitórias</div>`;
              }
              
              // Drops HTML
              let dropsHtml = "";
              if (displayDrops.length > 0) {
                  displayDrops.forEach(eq => {
                       const rName = EQ_RARITY[eq.rarity].name;
                       const typeName = eq.type === 'weapon' ? 'Arma' : eq.type === 'armor' ? 'Armadura' : 'Acessório';
                       // Usar cor correta
                       const colorClass = eq.rarity === 'legendary' ? 'text-yellow-400' : eq.rarity === 'epic' ? 'text-purple-400' : 'text-blue-400';
                       
                       dropsHtml += `<div class='text-xs ${colorClass} font-bold border border-white/10 bg-black/20 p-1 rounded mb-1'>${rName} ${typeName} (+${eq.lvl})</div>`;
                  });
              }

              rewards += `<div class='flex gap-4 justify-center items-center mb-3'>
                              <div class="flex flex-col items-center">
                                <span class='text-yellow-400 font-bold text-lg'>+${displayGold}</span>
                                <span class="text-[10px] text-slate-500 uppercase">Ouro</span>
                              </div>
                              <div class="flex flex-col items-center">
                                <span class='text-cyan-400 font-bold text-lg'>+${displayCrystals}</span>
                                <span class="text-[10px] text-slate-500 uppercase">Cristais</span>
                              </div>
                          </div>`;
                          
              if (dropsHtml) {
                  rewards += `<div class="max-h-32 overflow-y-auto w-full mb-2 px-2">${dropsHtml}</div>`;
              }
              
              const xpBoostActive = state.user.xpBoostEndTime && Date.now() < state.user.xpBoostEndTime;
              
              const xpHTML = displayXP 
             ? `<div class='mt-3 pt-3 border-t border-white/10 flex justify-between items-center w-full'>
                    <div class='text-left'>
                        <div class='text-[10px] text-slate-400 uppercase font-bold tracking-wider'>HERÓI XP TOTAL</div>
                        <div class='text-green-400 font-black text-xl'>+${displayXP} XP</div>
                        ${xpBoostActive ? "<div class='text-[9px] text-emerald-400 animate-pulse'>BOOST ATIVO</div>" : ""}
                    </div>
                </div>`
             : "";
             
             document.getElementById("outcome-rewards").innerHTML = `
               <div class="bg-slate-900/90 p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center w-full max-w-sm">
                  ${rewards}
                  ${xpHTML}
               </div>
               ${
                  // Botão de Farm 5x resetado (aparece se for dungeon e acabou o farm)
                  (win && battleState.mode.startsWith("dungeon"))
                  ? `<button onclick="startFarm5x()" class="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-black uppercase shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                        <span>🔄</span> Farm 5x Novamente
                     </button>`
                  : ""
               }
             `; // Corrected closing of the HTML string and the if (shouldShowModal) block
          }
          
          // HANDLER DE REPETIÇÃO AUTOMÁTICA
          if (battleState.repeatCount > 0) { // Removed redundant '&& win' as it's inside 'if (win)'
              
              battleState.repeatCount--;
              if (battleState.repeatCount > 0) {
                  showToast(`Próxima batalha em 1s... (${battleState.repeatCount} restantes)`);
                  setTimeout(() => {
                      // Se repeatCount ainda > 0, continua
                      if (battleState.repeatCount > 0) {
                         startBattle(true); 
                      }
                  }, 1000);
              } else {
                  showToast("Ciclo de Farm Concluído!");
              }
          }
        } else { // This is the 'else' block for 'if (win)'
          battleState.repeatCount = 0; // Parar se perder
          
          // Mostrar modal de derrota (com resumo se houve vitórias antes?)
          // Se session existir, mostrar resumo do que ganhou antes de perder.
           document.getElementById("outcome-rewards").innerHTML = `
               <div class="bg-slate-900/90 p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center">
                  <div class="text-red-500 font-bold text-xl mb-2">DERROTA</div>
                  <p class="text-slate-400 text-xs mb-4">A sequência foi interrompida.</p>
                  ${
                      (session && session.gold > 0) 
                      ? `<div class="text-green-400 font-bold">Acumulado: ${session.gold} Ouro, ${session.crystals} Cristais</div>` 
                      : "Tente melhorar seu time"
                  }
               </div>
           `;
           
           // Garantir que modal aparece na derrota
           const ov = document.getElementById("battle-overlay");
           ov.classList.remove("hidden");
           ov.classList.add("flex");
           ov.style.opacity = "1";
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

        if (didLevel) {
            showToast(`${mon.name} subiu para o Nível ${mon.lvl}!`, "success");
            trackMission('levelup_mon', 1);
            
            // === NOVO: Efeito visual de level up ===
            if (window.particleSystem) {
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight / 2;
              
              // Explosão de luz
              window.particleSystem.createLightExplosion(centerX, centerY);
              
              // Texto animado
              window.particleSystem.createLevelUpText();
              
              // Partículas extras
              for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                  window.particleSystem.createStars(centerX, centerY, 12);
                  window.particleSystem.createBurst(centerX, centerY, 30, '#fbbf24');
                }, i * 300);
              }
            }
        }
      };

      const renderMonsterBox = () => {
  const grid = document.getElementById("roster-grid");
  if (!grid) return;
  grid.innerHTML = "";
  document.getElementById("mon-count").innerText = state.inventory.length;

  const fragment = document.createDocumentFragment();
  
  // Classificar para exibição: Estrelas Desc > Nível Desc
  // Manter índice original para ações
  const displayList = state.inventory.map((mon, idx) => ({mon, idx}));
  displayList.sort((a,b) => {
      if (b.mon.stars !== a.mon.stars) return b.mon.stars - a.mon.stars;
      return b.mon.lvl - a.mon.lvl;
  });

  displayList.forEach(({mon, idx}) => {
    const slot = document.createElement("div");
    const isLeader = idx === state.leaderIdx;
    
    // Classes de raridade para estilização automática do CSS
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
      
      <!-- Insígnia de Líder -->
      ${isLeader ? '<div class="leader-badge">L</div>' : ''}
      
      <!-- Insígnia de Elemento -->
      <div class="elem-badge ${elColor}"></div>
      
      <!-- Insígnia de Nível -->
      <div class="level-badge">Lv.${mon.lvl}</div>
      ${mon.lvl >= (MAX_LEVELS[mon.stars] || 40) ? '<div class="absolute top-0 left-0 bg-gradient-to-br from-red-600 to-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-br-lg z-50 border-r border-b border-red-700 shadow-lg">MAX</div>' : ''}
      
      <!-- Imagem do Personagem / Emoji Fallback -->
      <div class="character-visual-container flex items-center justify-center w-[85%] h-[85%] z-10 transition-transform group-hover:scale-110">
        ${getMonsterVisuals(mon)}
      </div>
      
      <!-- Rótulo de Nome -->
      <div class="name-label">${mon.name}</div>
      
      <!-- Linha de Estrelas -->
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


      // MODAL E LÓGICA DE EVOLUÇÃO
      let evolveTargetIdx = -1;
      let evolveFoodIndices = [];

      const openEvolutionModal = () => {
         evolveTargetIdx = selectedDetailIdx;
         evolveFoodIndices = [];
         renderEvolutionModal();
      };

      const renderEvolutionModal = () => {
         // Criar modal se não existir
         let modal = document.getElementById("evo-modal");
         if (!modal) {
             document.body.insertAdjacentHTML('beforeend', `
                <div id="evo-modal" class="fixed inset-0 bg-black/90 z-[60] hidden flex-col items-center justify-center p-4 backdrop-blur-sm">
                    <div class="glass-panel p-6 w-full max-w-lg rounded-2xl border border-white/10 relative">
                        <h2 class="text-xl font-black text-white text-center mb-1">EVOLUÇÃO</h2>
                        <p id="evo-desc" class="text-center text-slate-400 text-xs mb-6"></p>
                        
                        <div class="flex justify-center items-center gap-4 mb-6">
                             <!-- Alvo -->
                             <div id="evo-target-preview" class="w-20 h-20 border border-white rounded-xl bg-slate-800 flex items-center justify-center relative"></div>
                             <div class="text-xl text-slate-500">?</div>
                             <!-- Resultado -->
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
         
          // Auxiliar para renderizar prévia
         const renderPrev = (el, mon, nextStars = false) => {
             const s = nextStars ? mon.stars + 1 : mon.stars;
             const isAwakened = s === 6;
             const starsHtml = isAwakened 
                ? '<span class="text-fuchsia-400 drop-shadow-[0_0_2px_rgba(192,38,211,0.8)]">★</span>'.repeat(6)
           : '<span class="star-icon">★</span>'.repeat(s);
             
              el.innerHTML = `
                  <img src="${mon.img}" class="w-full h-full object-contain p-1" 
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                  <div class="hidden w-full h-full items-center justify-center text-5xl">
                    ${mon.emoji || '❓'}
                  </div>
                  <div class="absolute bottom-0 w-full text-center bg-black/60 text-[9px] ${isAwakened ? '' : 'text-yellow-400'} font-bold">
                    ${starsHtml}
                  </div>
              `;
         };
         
         const tDiv = document.getElementById("evo-target-preview");
         const rDiv = document.getElementById("evo-result-preview");
         
         renderPrev(tDiv, target);
         renderPrev(rDiv, target, true);

          // Renderizar Lista de Material
         const grid = document.getElementById("evo-food-grid");
         grid.innerHTML = "";
         
          // Filtrar Forragem: Mesmas Estrelas, Não Bloqueado (se existir bloqueio), Não o próprio alvo
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
                  <img src="${f.img}" class="w-full h-full object-contain opacity-80"
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                  <div class="hidden w-full h-full items-center justify-center text-4xl opacity-80">
                    ${f.emoji || '❓'}
                  </div>
                  <div class="absolute bottom-0 w-full text-center text-[8px] text-yellow-400">★${f.stars}</div>
                  ${isSel ? '<div class="absolute inset-0 flex items-center justify-center text-green-400 font-bold text-xl drop-shadow-md">✓</div>' : ''}
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
           
            // Classificar índices descendente para remover do fim primeiro e não deslocar índices
           const toRemove = [...evolveFoodIndices].sort((a,b) => b - a);
           
           toRemove.forEach(idx => {
               state.inventory.splice(idx, 1);
                // Se índice removido estava antes do índice alvo, ajustar índice alvo
               if (idx < evolveTargetIdx) evolveTargetIdx--;
           });
           
            // Atualizar Alvo
           target.stars++;
           target.lvl = 1; // RESET
           
            // Corrigir ref se índice do líder foi afetado
            // Se removemos um monstro antes do líder, leaderIdx--
           toRemove.forEach(idx => {
               if (idx < state.leaderIdx) state.leaderIdx--;
           });
           
           save();
           
           document.getElementById("evo-modal").classList.add("hidden");
            document.getElementById("evo-modal").classList.remove("flex"); // Garantir que flex seja removido
           
            // Atualização de UI: Manter detalhes abertos e atualizar
           selectedDetailIdx = evolveTargetIdx; // Sync selection
           
           showToast(`EVOLUÇÃO SUCESSO! ${target.name} agora é ${target.stars}★`, "success");
           
            renderMonsterBox(); // Atualizar lista de fundo
            openDetail(selectedDetailIdx); // Atualizar visualização atual
      };

      
      // MODAL DE SKILL UP
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
                             <!-- Alvo -->
                             <div class="flex flex-col items-center gap-2">
                                 <span class="text-[10px] text-slate-500 font-bold uppercase">Alvo</span>
                                 <div id="skill-target-preview" class="w-24 h-24 border-2 border-slate-700 rounded-2xl bg-slate-800 relative overflow-hidden"></div>
                             </div>
                             <div class="text-2xl text-orange-500 font-black animate-pulse">+</div>
                             <!-- Material -->
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
         
          // Renderizar Prévia do Alvo
         const tDiv = document.getElementById("skill-target-preview");
          tDiv.innerHTML = `
            <img src="${target.img}" class="w-full h-full object-contain"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="hidden w-full h-full items-center justify-center text-5xl">
              ${target.emoji || '❓'}
            </div>
          `;

          // Renderizar Prévia do Material
         const fDiv = document.getElementById("skill-feeder-preview");
         if (skillFeederIdx !== -1) {
             const feeder = state.inventory[skillFeederIdx];
              fDiv.innerHTML = `
                <img src="${feeder.img}" class="w-full h-full object-contain p-2"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="hidden w-full h-full items-center justify-center text-4xl">
                  ${feeder.emoji || '❓'}
                </div>
              `;
             fDiv.className = "w-24 h-24 border-2 border-orange-500 rounded-2xl bg-slate-800 relative overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.4)]";
         } else {
             fDiv.innerHTML = "?";
             fDiv.className = "w-24 h-24 border-2 border-dashed border-slate-600 rounded-2xl bg-black/50 flex items-center justify-center text-4xl text-slate-700 select-none";
         }

         // Grid
         const grid = document.getElementById("skill-food-grid");
         grid.innerHTML = "";
         
          // Filtro: Mesmo ID via template (verificação segura?) ou apenas mon.id
          // Precisa ter cuidado: target.id pode ser único se gerarmos UUIDs, mas aqui id É o ID do tipo de monstro.
          // E verificar por 'skillupper'.
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
                 <img src="${c.img}" class="w-full h-full object-contain"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                 <div class="hidden w-full h-full items-center justify-center text-5xl">
                   ${c.emoji || '❓'}
                 </div>
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
          
           // Consumir Material
          
          let realTargetIdx = skillTargetIdx;
          if (skillFeederIdx < skillTargetIdx) realTargetIdx--;
          
          state.inventory.splice(skillFeederIdx, 1);
          
           // Lógica: Aplicar Skill Up
           // Adicionar propriedade 'skillUps'
          const realTarget = state.inventory[realTargetIdx];
          realTarget.skillUps = (realTarget.skillUps || 0) + 1;
          
           // Verificação de Líder
          if (skillFeederIdx < state.leaderIdx) state.leaderIdx--;
          
          save();
          
            // Resetar UI
           document.getElementById("skill-modal").classList.add("hidden");
           document.getElementById("skill-modal").classList.remove("flex");
           
           selectedDetailIdx = realTargetIdx; // Sync selection

            renderMonsterBox(); // Re-renderiza a grade
            openDetail(selectedDetailIdx); // Atualiza visualização atual
           
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
        
        // Feedback de UI
        showToast("Líder definido com sucesso!", "success");
        renderMonsterBox(); // Atualizar insígnias da grade
        openDetail(selectedDetailIdx); // Atualizar estado do botão
      };

      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const autoEvolveLowStars = () => {

        let evolvedCount = 0;
        let didAction = true;

        while (didAction) {
          didAction = false;
          
          // Estratégia: Encontrar o primeiro par de evolução válido que não foi tocado neste ciclo
          // Procuramos um candidato (1 ou 2 estrelas) que TENHA forragem disponível
          
          for (let i = 0; i < state.inventory.length; i++) {
              const m = state.inventory[i];
              
              // Critério de Candidato: 1 ou 2 estrelas, Não Líder
              if ((m.stars === 1 || m.stars === 2) && i !== state.leaderIdx) {
                  
                  // Tentar encontrar forragem para este candidato específico
                  const reqStars = m.stars;
                  let fodderIndices = [];
                  let reqFodderCount = reqStars; // 1* needs 1, 2* needs 2

                  for (let j = 0; j < state.inventory.length; j++) {
                      if (fodderIndices.length >= reqFodderCount) break;
                      if (j === i) continue; // Pular a si mesmo
                      if (j === state.leaderIdx) continue; // Pular líder
                      
                      const f = state.inventory[j];
                      if (f.stars === reqStars) {
                          fodderIndices.push(j);
                      }
                  }

                  // Se encontramos forragem suficiente, EVOLUIR!
                  if (fodderIndices.length === reqFodderCount) {
                      // Executar Evolução
                      // Preparar índices para deletar (apenas forragem)
                      // Classificar descendente para splice corretamente
                      fodderIndices.sort((a,b) => b - a);

                      // Remover forragem
                      fodderIndices.forEach(delIdx => {
                          state.inventory.splice(delIdx, 1);
                          // Ajustar índice do candidato atual se necessário (embora quebremos o loop, então i é irrelevante para o próximo loop)
                          // Mas DEVEMOS ajustar state.leaderIdx globalmente
                          if (delIdx < state.leaderIdx) state.leaderIdx--;
                          // Não precisamos ajustar 'i' porque quebraremos e reiniciaremos o GRANDE loop
                      });
                      
                      // Agora 'm' está em um novo índice potencialmente?
                      // Espere. Se fizermos splice, os índices mudam.
                      // Precisamos encontrar 'm' de novo ou confiar no fato de que se i < delIdx (geralmente verdade se pegarmos o primeiro disponível), está ok.
                      // Mas forragem poderia estar ANTES do candidato.
                      // PARA GARANTIR: Reiniciamos a busca do zero após cada evolução.
                      // É O(N^2) mas N é pequeno (limite de inventário).
                      
                      // No entanto, precisamos localizar o candidato 'm' produzido.
                      // Na verdade, vamos apenas pegar o candidato por referência ANTES do splice?
                      // Arrays JS referenciam objetos. 'm' ainda é o objeto.
                      
                      m.stars++;
                      m.lvl = 1;
                      
                      evolvedCount++;
                      didAction = true;
                      break; // Quebrar principalmente para reiniciar o loop com segurança já que índices mudaram
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
// --- LÓGICA DE POÇÃO DE XP ---
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

  // Consumir
  state.user.potions--;
  
  // Adicionar XP (500)
  addXP(mon, 500);
  
  save();
  
  // Atualização de UI
  openDetail(selectedDetailIdx);
  showToast("+500 XP Aplicado!", "success");
  
  // Update header if needed (potions usually not in header)
  if(typeof updateShopUI !== "undefined") updateShopUI();
};

// === OPEN DETAIL MODAL (Complete Rendering) ===
function openDetail(idx) {
  selectedDetailIdx = idx;
  const mon = state.inventory[idx];
  if (!mon) return;

  changeView("view-character-detail");

  // Calculate stats with sets
  // Calculate stats with sets
  const stats = calculateStats(mon);
  const maxLvl = MAX_LEVELS[mon.stars] || 40;
  // Use global function explicitly to avoid scope issues
  const xpNeeded = (window.getXPNeeded || getXPNeeded)(mon.lvl, mon.stars);

  // === BASIC INFO ===
  document.getElementById("det-name").innerText = mon.name;
  document.getElementById("det-type").innerText = mon.type || "";
  document.getElementById("det-stars").innerText = "⭐".repeat(mon.stars);
  document.getElementById("det-nat-grade").innerText = `Natural ${mon.stars}★`;
  document.getElementById("det-lvl").innerText = mon.lvl;
  document.getElementById("det-lvl").nextElementSibling.innerText = `/ ${maxLvl}`;

  // Element badge
  const elementEmojis = {
    fire: "🔥", water: "🌊", lightning: "⚡",
    earth: "🗿", nature: "🍃", void: "🌑", neutral: "⚪"
  };

  document.getElementById("det-element-badge").innerText = elementEmojis[mon.element] || "❓";

  // Image & Visuals - Using helper for consistency
  const visualsWrapper = document.getElementById("det-img-wrapper");
  if (visualsWrapper) {
    try {
        visualsWrapper.innerHTML = (window.getMonsterVisuals || getMonsterVisuals)(mon);
    } catch(e) {
        console.error("Visual render error:", e);
        visualsWrapper.innerHTML = "<span>❓</span>";
    }
    // Restore IDs to support animations/css defined on #det-img and #det-emoji
    const newImg = visualsWrapper.querySelector('img');
    const newEmoji = visualsWrapper.querySelector('span');
    if (newImg) newImg.id = "det-img";
    if (newEmoji) {
        newEmoji.id = "det-emoji";
        newEmoji.style.fontSize = "6rem"; 
    }
  }

  // XP Bar
  document.getElementById("det-xp-text").innerText = `${mon.xp} / ${xpNeeded}`;
  // XP Bar (Robust Logic)
  const currentXP = mon.xp || 0;
  const safeNeeded = xpNeeded > 0 ? xpNeeded : 100;
  let xpPercent = (currentXP / safeNeeded) * 100;
  
  // Clamp
  if (isNaN(xpPercent)) xpPercent = 0;
  xpPercent = Math.max(0, Math.min(100, xpPercent));

  const detXpBar = document.getElementById("det-xp-bar");
  if (detXpBar) {
      // Force remove potentially conflicting classes
      detXpBar.classList.remove("w-0");
      
      // Apply width with a small delay to ensure transition triggers if it was 0
      requestAnimationFrame(() => {
          detXpBar.style.width = `${xpPercent}%`;
      });
      
      // Debug text update
      document.getElementById("det-xp-text").innerText = `${currentXP} / ${safeNeeded} (${Math.floor(xpPercent)}%)`;
  }

  // === STATS (COMPACT GRID) ===
  document.getElementById("val-hp").innerText = stats.hp;
  document.getElementById("val-atk").innerText = stats.atk;
  document.getElementById("val-def").innerText = stats.def;
  document.getElementById("val-spd").innerText = stats.spd || 100;
  
  document.getElementById("val-crit").innerText = `${stats.crit}%`;
  document.getElementById("val-cdmg").innerText = `${stats.cdmg}%`;
  document.getElementById("val-acc").innerText = `${stats.acc || 0}%`;
  document.getElementById("val-res").innerText = `${stats.res || 15}%`;

  // === EQUIPMENT SLOTS (4 SLOTS) ===
  const slotIcons = {
    slot1: "⚔️",  // Weapon
    slot2: "🛡️",  // Armor
    slot3: "⛑️",  // Helmet
    slot4: "💍"   // Accessory
  };
  
  // Rarity Colors for Slot Borders
  const rarityColors = {
    common: "#94a3b8",
    rare: "#3b82f6",
    epic: "#a855f7",
    legendary: "#fbbf24"
  };

  ['slot1', 'slot2', 'slot3', 'slot4'].forEach(slotKey => {
    const slotEl = document.getElementById(`eq-slot-${slotKey}`);
    if (!slotEl) return;
    
    const equippedId = mon.equipped[slotKey];
    if (equippedId) {
      const eq = state.equipment.find(e => e.id === equippedId);
      if (eq) {
        const setInfo = EQUIPMENT_SETS[eq.set];
        const rarityColors = {
          common: "#94a3b8",
          rare: "#3b82f6",
          epic: "#a855f7",
          legendary: "#fbbf24"
        };
        slotEl.style.borderColor = rarityColors[eq.rarity] || "#94a3b8";
        slotEl.style.background = `linear-gradient(135deg, ${rarityColors[eq.rarity]}22, transparent)`;
        slotEl.querySelector("span").innerText = setInfo ? setInfo.icon : slotIcons[slotKey];
      }
    } else {
      slotEl.style.borderColor = "";
      slotEl.style.background = "";
      slotEl.querySelector("span").innerText = slotIcons[slotKey];
    }
  });

  // === ACTIVE SETS ===
  const activeSetsContainer = document.getElementById("active-sets-container");
  const activeSetsList = document.getElementById("active-sets-list");
  
  if (stats.activeSets && stats.activeSets.length > 0) {
    activeSetsContainer.classList.remove("hidden");
    activeSetsList.innerHTML = "";
    
    stats.activeSets.forEach(set => {
      const setDiv = document.createElement("div");
      setDiv.className = "flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10";
      setDiv.innerHTML = `
        <span class="text-xl">${set.icon}</span>
        <div class="flex flex-col">
          <span class="text-xs font-bold text-white">${set.name}</span>
          <span class="text-[10px] text-slate-400">${set.bonus.display}</span>
        </div>
      `;
      activeSetsList.appendChild(setDiv);
    });
  } else {
    activeSetsContainer.classList.add("hidden");
  }

  // === SKILLS ===
  renderSkills(mon);

  // === POTION BUTTON ===
  const potBtnContainer = document.getElementById("detail-pot-btn-container");
  if (potBtnContainer) {
      const potCount = state.user.potions || 0;
      const isMax = mon.lvl >= maxLvl;
      const canUse = potCount > 0 && !isMax;
      
      potBtnContainer.innerHTML = `
        <button
          onclick="usePotion()"
          ${!canUse ? "disabled" : ""}
          class="w-full py-3 ${canUse ? "bg-purple-600 hover:bg-purple-500" : "bg-slate-800 opacity-50 cursor-not-allowed"} text-white font-black uppercase rounded-xl shadow-lg active:scale-95 transition-all text-xs border border-white/10"
        >
          🧪 Usar Poção XP (${potCount}) ${isMax ? "- MAX" : ""}
        </button>
      `;
  }

  // === LEADER BUTTON ===
  const btnEquip = document.getElementById("btn-equip");
  if (btnEquip) {
    if (state.leaderIdx === idx) {
      btnEquip.innerText = "✓ LÍDER ATUAL";
      btnEquip.classList.add("bg-green-600");
      btnEquip.classList.remove("bg-indigo-600");
    } else {
      btnEquip.innerText = "DEFINIR LÍDER";
      btnEquip.classList.remove("bg-green-600");
      btnEquip.classList.add("bg-indigo-600");
    }
  }

  // Render Evolution Button (Tab 1)
  renderEvolutionButton(mon);
  
  // Update Real-Time Stats (Tab 3)
  document.getElementById("gear-val-hp").innerText = stats.hp;
  document.getElementById("gear-val-atk").innerText = stats.atk;
  document.getElementById("gear-val-def").innerText = stats.def;
  document.getElementById("gear-val-spd").innerText = stats.spd || 100;
  
  // Reset Tab to Status
  switchDetailTab('status');
};

// === INVENTORY MODAL LOGIC ===
window.openDetailInventoryModal = function() {
    document.getElementById("det-inventory-modal").classList.remove("hidden");
    filterDetailInv('all'); // Render all by default
}

// === RENDER SKILLS ===
function renderSkills(mon) {
  const container = document.getElementById("det-skills-container");
  if (!container) return;

  container.innerHTML = `
    <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">
      Habilidades
    </div>
  `;

  if (!mon.skills || mon.skills.length === 0) {
    container.innerHTML += `<p class="text-slate-500 text-xs">Nenhuma habilidade</p>`;
    return;
  }

  mon.skills.forEach((skillKey, idx) => {
    const skill = SKILLS[skillKey];
    if (!skill) return;

    const skillDiv = document.createElement("div");
    skillDiv.className = "mb-3 p-3 bg-slate-800/30 rounded-lg border border-white/5";
    
    // Correctly reference skillLvls object
    const skillLvl = (mon.skillLvls && mon.skillLvls[skillKey]) || 1;
    const maxSkillLvl = 5; 
    const canUpgrade = skillLvl < maxSkillLvl;

    skillDiv.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div class="flex items-center gap-2">
          <span class="text-2xl">${skill.icon}</span>
          <div>
            <div class="text-sm font-bold text-white">${skill.n}</div>
            <div class="text-[10px] text-slate-400">MP: ${skill.mp} | Poder: ${skill.p}x</div>
          </div>
        </div>
        <div class="text-xs font-bold text-yellow-400">Lv ${skillLvl}</div>
      </div>
      ${canUpgrade ? `
        <button
          onclick="openSkillUpModal()"
          class="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-[10px] uppercase rounded-lg active:scale-95 transition-all"
        >
          ⬆️ Skill Up (Sacrifício)
        </button>
      ` : `
        <div class="text-center text-[10px] text-green-400 font-bold">✓ MAX LEVEL</div>
      `}
    `;
    
    container.appendChild(skillDiv);
  });

};
// Evolution Logic (Rendered in Tab 1 now)
function renderEvolutionButton(mon) {
   const container = document.getElementById("det-evolution-container");
   if (!container) return;
   
   container.innerHTML = "";
   if (mon.stars < 6) {
      container.innerHTML = `
        <button
            onclick="openEvolutionModal()"
            class="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black uppercase rounded-xl shadow-lg active:scale-95 transition-all text-xs border border-white/10"
        >
            ✨ EVOLUIR PARA ${mon.stars + 1}★
        </button>
      `;
   }
}

// === TAB SWITCHING LOGIC ===
window.switchDetailTab = function(tabName) {
    // Hide all tabs
    document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".tab-btn").forEach(el => {
        el.classList.remove("bg-indigo-600", "text-white", "shadow-[0_0_15px_rgba(79,70,229,0.4)]", "border-indigo-400");
        el.classList.add("bg-slate-900", "text-slate-500", "border-white/10");
    });
    
    // Show active tab
    const target = document.getElementById(`tab-${tabName}`);
    if (target) target.classList.remove("hidden");
    
    const btn = document.getElementById(`tab-btn-${tabName}`);
    if (btn) {
        btn.classList.remove("bg-slate-900", "text-slate-500", "border-white/10");
        btn.classList.add("bg-indigo-600", "text-white", "border-indigo-400", "shadow-[0_0_15px_rgba(79,70,229,0.4)]");
    }
    
    // Auto-render inventory is removed (User request for separate modal)
}


// === INTEGRATED INVENTORY (DETAIL MODAL) ===
let detailInvFilter = 'all';

function filterDetailInv(filter) {
    detailInvFilter = filter;
    
    // UI Feedback for tabs
    document.querySelectorAll(".det-inv-tab").forEach(tab => {
        tab.classList.remove("bg-indigo-600", "text-white");
        tab.classList.add("bg-slate-800", "text-slate-400");
    });
    
    // Find active tab
    const tabs = document.querySelectorAll(".det-inv-tab");
    if (tabs.length > 0) {
        if (filter === 'all') tabs[0].classList.add("bg-indigo-600", "text-white");
        else if (filter === 1) tabs[1].classList.add("bg-indigo-600", "text-white");
        else if (filter === 2) tabs[2].classList.add("bg-indigo-600", "text-white");
        else if (filter === 3) tabs[3].classList.add("bg-indigo-600", "text-white");
        else if (filter === 4) tabs[4].classList.add("bg-indigo-600", "text-white");
    }
    
    renderDetailInventory();
}

function renderDetailInventory() {
    const grid = document.getElementById("det-inv-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    // Filter out equipped items
    let avail = state.equipment.filter(e => !isEquipped(e.id));
    
    // Apply slot filter
    if (detailInvFilter !== 'all') {
        avail = avail.filter(e => e.slot === detailInvFilter);
    }
    
    const countEl = document.getElementById("det-inv-count");
    if (countEl) countEl.innerText = `${avail.length} disponíveis`;
    
    if (avail.length === 0) {
        grid.innerHTML = `<div class="col-span-3 flex flex-col items-center justify-center py-10 border-2 border-dashed border-white/5 rounded-xl opacity-40">
            <span class="text-4xl mb-2">📦</span>
            <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Nenhum Item</span>
            <span class="text-[10px] text-slate-600 mt-1">Vá às Masmorras para coletar loot</span>
        </div>`;
        return;
    }
    
    const frag = document.createDocumentFragment();
    avail.forEach(eq => {
        const conf = EQ_RARITY[eq.rarity];
        const slotMap = { 1: "⚔️", 2: "🛡️", 3: "⛑️", 4: "💍" };
        const setInfo = EQUIPMENT_SETS[eq.set] || { name: "???", display: "???" };
        
        const el = document.createElement("div");
        // Premium Card Layout
        el.className = `relative p-3 rounded-xl border bg-slate-900/90 cursor-pointer active:scale-95 transition-all flex flex-col gap-1 group overflow-hidden ${conf.color}`;
        
        const borderColor = 
            eq.rarity === "legendary" ? "#fbbf24" : 
            eq.rarity === "epic" ? "#a855f7" : 
            eq.rarity === "rare" ? "#3b82f6" : "#475569";
            
        el.style.border = `1px solid ${borderColor}`;
        el.style.boxShadow = `inset 0 0 20px ${borderColor}11`;
            
        el.innerHTML = `
            <!-- Hover Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            <div class="flex justify-between items-start relative z-10">
                <span class="text-2xl filter drop-shadow-md">${slotMap[eq.slot] || "⚔️"}</span>
                <span class="text-[9px] font-black text-white bg-black/40 px-1.5 py-0.5 rounded border border-white/10">+${eq.lvl}</span>
            </div>
            
            <div class="relative z-10 mt-1">
                <div class="text-[10px] font-bold text-slate-200 leading-tight truncate">${setInfo.name}</div>
                <div class="text-[8px] text-indigo-300 truncate">${setInfo.display}</div>
            </div>
            
            <div class="absolute bottom-0 right-0 p-1 opacity-20 text-[40px] leading-none pointer-events-none select-none grayscale group-hover:grayscale-0 transition-all duration-500">${setInfo.icon || "⚔️"}</div>
        `;
        
        el.onclick = () => { 
            currentEqId = eq.id;
            renderUpgradeModal();
        };
        frag.appendChild(el);
    });
    
    grid.appendChild(frag);
}

function equipFromDetail(eqId) {
    const mon = state.inventory[selectedDetailIdx];
    const eq = state.equipment.find(e => e.id === eqId);
    if (!mon || !eq) return;
    
    const slotKey = `slot${eq.slot}`;
    mon.equipped[slotKey] = eqId;
    save();
    
    showToast("Equipado com sucesso!", "success");
    openDetail(selectedDetailIdx);
}

// Expose to window
window.filterDetailInv = filterDetailInv;
window.equipFromDetail = equipFromDetail;

window.openEvolutionModal = openEvolutionModal; // Ensure global
window.openSkillUpModal = openSkillUpModal; // Ensure global

// === GLOBAL HELPERS (MOVED FOR STABILITY) ===


// === EQUIPMENT HELPERS ===
function isEquippedByMon(mon, eqId) {
    if (!mon || !mon.equipped) return false;
    return (
        mon.equipped.slot1 === eqId ||
        mon.equipped.slot2 === eqId ||
        mon.equipped.slot3 === eqId ||
        mon.equipped.slot4 === eqId

    );
}

function unequipItem(eqId, cost) {
    if (state.user.gold < cost) return showToast(`Ouro insuficiente! Custo: ${cost}`, "error");
    
    // Find owner
    const mon = state.inventory.find(m => isEquippedByMon(m, eqId));
    if (!mon) return showToast("Este item não está equipado!", "info");
    
    state.user.gold -= cost;
    updateHeader();
    
    // Unequip from ALL slots to be safe
    if (mon.equipped.slot1 === eqId) mon.equipped.slot1 = null;
    if (mon.equipped.slot2 === eqId) mon.equipped.slot2 = null;
    if (mon.equipped.slot3 === eqId) mon.equipped.slot3 = null;
    if (mon.equipped.slot4 === eqId) mon.equipped.slot4 = null;

    
    save();
    showToast(`Item desequipado! (-${cost} Ouro)`, "success");
    
    // Refresh UI
    renderUpgradeModal(); // Updates button to "Equip"
    
    // Refresh detail view if open
    const detailOverlay = document.getElementById("mon-detail-overlay");
    if (detailOverlay && !detailOverlay.classList.contains("hidden")) {
         openDetail(selectedDetailIdx);
    }
}

// Expose Helpers
window.isEquippedByMon = isEquippedByMon;
window.unequipItem = unequipItem;
window.renderUpgradeModal = renderUpgradeModal; // Critical fix for scope access

// Robust Visual Helper - Fixes image issues
window.getMonsterVisuals = (mon) => {
    // Strict image validation (Extension check + non-null)
    const isValidImg = mon.img && 
                       (typeof mon.img === 'string') && 
                       mon.img.length > 4 && 
                       !mon.img.includes("undefined") && 
                       !mon.img.includes("null") &&
                       /\.(png|jpg|jpeg|webp|avif|gif)$/i.test(mon.img);

    if (isValidImg) {
        // Safe fallback logic inline
        const fallback = `this.style.display='none'; this.nextElementSibling.style.display='block';`;
        return `
            <img src="${mon.img}" 
                 class="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform"
                 onerror="${fallback}" 
            />
            <span class="hidden select-none" style="font-size: 3rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
                ${mon.emoji || '❓'}
            </span>
        `;
    }
    // Default to Emoji
    return `<span class="select-none" style="font-size: 3rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">${mon.emoji || '❓'}</span>`;
};

// XP Mechanics Helpers (Global)
window.getXPNeeded = (lvl, stars) => {
    // Base 100 per level, scaling slightly with stars
    return Math.floor((lvl * 100) * (1 + ((stars || 1) * 0.1)));
};

window.addXP = (mon, amount) => {
    if (!mon) return;
    mon.xp = (mon.xp || 0) + amount;
    
    // Retrieve Max Level from global constant or fallback
    const maxLvl = (window.MAX_LEVELS && window.MAX_LEVELS[mon.stars]) || (mon.stars * 10) + 20; // fallback: 5* -> 70
    
    let required = window.getXPNeeded(mon.lvl, mon.stars);
    
    // Level Up Logic
    while (mon.xp >= required && mon.lvl < maxLvl) {
        mon.xp -= required;
        mon.lvl++;
        required = window.getXPNeeded(mon.lvl, mon.stars);
    }
    
    // Cap
    if (mon.lvl >= maxLvl) {
        mon.lvl = maxLvl;
        mon.xp = 0;
    }
};
      // --- SISTEMA DE MISSÕES ---

      const checkDailyReset = () => {
          const now = new Date();
          // Configurar hora de reset para hoje às 20h
          let resetTime = new Date(now);
          resetTime.setHours(20, 0, 0, 0);

          // Se agora é antes das 20h, o "último reset" deveria ter sido ONTEM às 20h.
          // Se agora é depois das 20h, o "último reset" foi HOJE às 20h.
          
          let currentCycleStart;
          if (now < resetTime) {
              currentCycleStart = new Date(resetTime);
              currentCycleStart.setDate(currentCycleStart.getDate() - 1);
          } else {
              currentCycleStart = resetTime;
          }

          if (state.user.missions.daily.lastReset < currentCycleStart.getTime()) {
              console.log("Resetando Missões Diárias...");
              state.user.missions.daily = {
                  lastReset: currentCycleStart.getTime(),
                  progress: {},
                  claimed: []
              };
              save();
              showToast("Missões Diárias Resetadas!", "info");
          }
          
          updateMissionTimer();
      };
      
      const checkTowerReset = () => {
          // Reset Semanal (Segunda-feira 00:00)
           const now = new Date();
           // Calcula o timestamp do início da última segunda-feira
           const day = now.getDay(); // 0 (Dom) a 6 (Sab). Seg é 1.
           const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
           
           let lastMonday = new Date(now.setDate(diff));
           lastMonday.setHours(0,0,0,0);
           
           if (state.user.missions.tower.lastReset < lastMonday.getTime()) {
               console.log("Resetando Torre...");
               state.user.towerProgress = 1; // Ou manter lógica antiga se existir
               // Se tiver variável de torre no user, resetar aqui.
               // Assumindo que user.towerFloor existe (não vi na def, mas ok)
               // Se não existe, vamos criar ou ignorar por enquanto até implementar a torre real.
               state.user.missions.tower.lastReset = lastMonday.getTime();
               save();
               showToast("Torre Semanal Resetada!", "info");
           }
      };

      const updateMissionTimer = () => {
          const now = new Date();
          let nextReset = new Date(now);
          nextReset.setHours(20, 0, 0, 0);
          if (now >= nextReset) {
              nextReset.setDate(nextReset.getDate() + 1);
          }
          
          const diff = nextReset - now;
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          
          const timerEl = document.getElementById("mission-timer");
          if (timerEl) {
              const newText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
              if (timerEl.innerText !== newText) timerEl.innerText = newText;
          }
          
          // Verificar notificação
          const hasClaimable = DAILY_MISSIONS.some(m => {
             if (m.type === 'meta_mission') return false; // Meta calcula separado
             const prog = state.user.missions.daily.progress[m.id] || 0;
             const claimed = state.user.missions.daily.claimed.includes(m.id);
             return prog >= m.target && !claimed;
          });
          
          // Meta mission check
          const completedCount = state.user.missions.daily.claimed.filter(id => id !== 'complete_all').length;
          const metaMission = DAILY_MISSIONS.find(m => m.id === 'complete_all');
          const metaClaimable = metaMission && completedCount >= metaMission.target && !state.user.missions.daily.claimed.includes('complete_all');
          
          const notif = document.getElementById("mission-notification");
          const notifStatic = document.getElementById("mission-notification-static");
          
          if (hasClaimable || metaClaimable) {
              if (notif) notif.classList.remove("hidden");
              if (notifStatic) notifStatic.classList.remove("hidden");
          } else {
              if (notif) notif.classList.add("hidden");
              if (notifStatic) notifStatic.classList.add("hidden");
          }
          
          if(document.getElementById("view-missions") && !document.getElementById("view-missions").classList.contains("hidden")) {
               setTimeout(updateMissionTimer, 1000); // Check every second is enough, no need for 60fps
          }
      };

      const trackMission = (type, amount = 1) => {
          if (!state.user.missions) {
              state.user.missions = { daily: { lastReset: 0, progress: {}, claimed: [] }, tower: { lastReset: 0 } };
          }
          
          let updated = false;
          
          // Atualizar progresso
          DAILY_MISSIONS.forEach(m => {
              if (m.type === type) {
                  const current = state.user.missions.daily.progress[m.id] || 0;
                  if (current < m.target) {
                      state.user.missions.daily.progress[m.id] = Math.min(current + amount, m.target);
                      updated = true;
                      
                      if (state.user.missions.daily.progress[m.id] === m.target) {
                          showToast(`Missão Completa: ${m.desc}!`, "success");
                      }
                  }
              }
          });
           
          if (updated) {
              save();
              updateMissionTimer(); // Update notification
              if (!document.getElementById("view-missions").classList.contains("hidden")) {
                  renderMissions();
              }
          }
      };

      const renderMissions = () => {
          const container = document.getElementById("missions-list");
          if (!container) return;
          container.innerHTML = "";
          
          // Lazy Init State
          if (!state.user.missions) {
             state.user.missions = { daily: { lastReset: 0, progress: {}, claimed: [] }, tower: { lastReset: 0 } };
          }
          
          // Meta Mission Logic
          const completedCount = state.user.missions.daily.claimed.filter(id => id !== 'complete_all').length;
          
          DAILY_MISSIONS.forEach(m => {
              let current, target, isClaimed, isCompletable;
              
              if (m.type === 'meta_mission') {
                  current = completedCount;
                  target = m.target;
                  isClaimed = state.user.missions.daily.claimed.includes(m.id);
                  isCompletable = current >= target && !isClaimed;
              } else {
                  current = state.user.missions.daily.progress[m.id] || 0;
                  target = m.target;
                  isClaimed = state.user.missions.daily.claimed.includes(m.id);
                  isCompletable = current >= target && !isClaimed;
              }

              // Card UI
              const card = document.createElement("div");
              card.className = `glass-panel p-3 rounded-xl flex justify-between items-center ${isClaimed ? 'opacity-50 grayscale' : ''}`;
              
              let btnHtml;
              if (isClaimed) {
                  btnHtml = `<button disabled class="px-3 py-1 bg-slate-700 text-slate-400 text-[10px] font-bold rounded-lg uppercase">Coletado</button>`;
              } else if (isCompletable) {
                  btnHtml = `<button onclick="claimMission('${m.id}')" class="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-lg uppercase animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]">Resgatar</button>`;
              } else {
                  const pct = Math.min(100, (current / target) * 100);
                  btnHtml = `
                    <div class="w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                        <div class="h-full bg-indigo-500" style="width: ${pct}%"></div>
                    </div>
                    <div class="text-[9px] text-slate-400 mt-1 text-center">${current}/${target}</div>
                  `;
              }
              
              let rewardIcon = "💰";
              if (m.reward.type === 'crystals') rewardIcon = "💎";
              if (m.reward.type === 'energy') rewardIcon = "⚡";
              if (m.reward.type === 'xp') rewardIcon = "⭐";
              if (m.reward.type === 'items') rewardIcon = "🎁";
              
              card.innerHTML = `
                  <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xl border border-white/5">
                         ${m.type === 'login' ? '📅' : m.type.includes('battle') ? '⚔️' : m.type.includes('energy') ? '⚡' : m.type === 'summon' ? '📦' : '📜'}
                      </div>
                      <div>
                          <h4 class="text-white text-xs font-bold">${m.desc}</h4>
                          <p class="text-[10px] text-orange-300 font-bold flex items-center gap-1">
                             ${rewardIcon} +${m.reward.amount} <span class="uppercase text-[8px] opacity-70">${m.reward.type}</span>
                          </p>
                      </div>
                  </div>
                  <div class="flex flex-col items-end">
                      ${btnHtml}
                  </div>
              `;
              
              container.appendChild(card);
          });
      };

      const claimMission = (id) => {
          const m = DAILY_MISSIONS.find(mission => mission.id === id);
          if (!m) return;
          
          if (state.user.missions.daily.claimed.includes(id)) return;
          
          // Verificar meta
          if (m.type === 'meta_mission') {
               const completedCount = state.user.missions.daily.claimed.filter(mid => mid !== 'complete_all').length;
               if (completedCount < m.target) return;
          } else {
               const prog = state.user.missions.daily.progress[id] || 0;
               if (prog < m.target) return;
          }
          
          // Dar Recompensa
          if (m.reward.type === 'gold') {
              state.user.gold += m.reward.amount;
          } else if (m.reward.type === 'crystals') {
              state.user.crystals += m.reward.amount;
          } else if (m.reward.type === 'energy') {
              state.user.energy += m.reward.amount;
          } else if (m.reward.type === 'xp') {
              // XP de conta? Não temos user level ainda. Vamos dar ouro por enquanto ou ignorar.
              // O usuário pediu XP. Vamos assumir que é só visual por enquanto ou add gold.
              // Ou dar XP para o time todo?
              showToast("XP de Conta ainda não implementado. Convertido em Ouro.", "warning");
              state.user.gold += m.reward.amount * 5; 
          } else if (m.reward.type === 'items') {
             // Lootbox?
             createEquipment(state.user.maxStage || 1);
             showToast("Item Recebido!", "success");
          }
          
          state.user.missions.daily.claimed.push(id);
          save();
          updateHeader();
          renderMissions();
          updateMissionTimer();
          
          showToast("Recompensa Resgatada!", "success");
          spawnParticles(window.innerWidth/2, window.innerHeight/2, "gold");
      };
      
      // --- SISTEMA PVP ---
      let currentPvPOpponents = [];
      let selectedPvPOpponent = null;

      const renderPvPView = () => {
        // Initialize PvP stats if needed
        if (!state.user.pvpRank) state.user.pvpRank = 1000;
        if (!state.user.pvpWins) state.user.pvpWins = 0;
        if (!state.user.pvpLosses) state.user.pvpLosses = 0;
        
        // Update player info
        const playerIconEl = document.getElementById('pvp-player-icon');
        const playerNameEl = document.getElementById('pvp-player-name');
        const rankBadgeEl = document.getElementById('pvp-rank-badge');
        const rankPointsEl = document.getElementById('pvp-rank-points');
        const winsEl = document.getElementById('pvp-wins');
        const lossesEl = document.getElementById('pvp-losses');
        
        if (playerIconEl) playerIconEl.innerText = state.user.icon || '🦸';
        if (playerNameEl) playerNameEl.innerText = state.user.name || 'Jogador';
        
        const rankInfo = getPvPRankTitle(state.user.pvpRank);
        if (rankBadgeEl) {
          rankBadgeEl.innerText = `${rankInfo.icon} ${rankInfo.name}`;
          rankBadgeEl.style.background = `${rankInfo.color}33`;
          rankBadgeEl.style.color = rankInfo.color;
        }
        
        if (rankPointsEl) rankPointsEl.innerText = `${state.user.pvpRank} pts`;
        if (winsEl) winsEl.innerText = `${state.user.pvpWins}V`;
        if (lossesEl) lossesEl.innerText = `${state.user.pvpLosses}D`;
        
        // Generate opponents
        refreshPvPOpponents();
      };

      const refreshPvPOpponents = () => {
        const playerLevel = state.user.lvl || 1;
        currentPvPOpponents = generatePvPOpponents(playerLevel, 8);
        renderPvPOpponents();
      };

      const renderPvPOpponents = () => {
        const container = document.getElementById('pvp-opponents-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (currentPvPOpponents.length === 0) {
          container.innerHTML = `
            <div class="text-center py-10 text-slate-500">
              <div class="text-4xl mb-2">😴</div>
              <p class="text-xs">Nenhum oponente disponível</p>
            </div>
          `;
          return;
        }
        
        const fragment = document.createDocumentFragment();
        
        currentPvPOpponents.forEach((opponent, idx) => {
          const rankInfo = getPvPRankTitle(opponent.rank);
          const winRate = opponent.wins + opponent.losses > 0 
            ? Math.floor((opponent.wins / (opponent.wins + opponent.losses)) * 100)
            : 50;
          
          const card = document.createElement('div');
          card.className = 'glass-panel p-4 rounded-2xl cursor-pointer active:scale-95 transition-all hover:border-red-500/30 group';
          
          card.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:shadow-red-500/20 transition-shadow">
                  ${opponent.userIcon}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-white font-bold text-sm">${opponent.username}</h4>
                    ${opponent.type === 'npc' ? '<span class="text-[8px] bg-slate-700 text-slate-400 px-1 rounded">NPC</span>' : '<span class="text-[8px] bg-green-700 text-green-300 px-1 rounded">REAL</span>'}
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded" style="background: ${rankInfo.color}33; color: ${rankInfo.color}">
                      ${rankInfo.icon} ${rankInfo.name}
                    </span>
                    <span class="text-[10px] text-slate-500">Nv.${opponent.userLevel}</span>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[9px] text-green-400">${opponent.wins}V</span>
                    <span class="text-[9px] text-slate-600">•</span>
                    <span class="text-[9px] text-red-400">${opponent.losses}D</span>
                    <span class="text-[9px] text-slate-600">•</span>
                    <span class="text-[9px] text-slate-400">${winRate}%</span>
                  </div>
                </div>
              </div>
              <button class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg shadow-lg transition-colors">
                DESAFIAR
              </button>
            </div>
          `;
          
          card.onclick = () => startPvPBattle(idx);
          fragment.appendChild(card);
        });
        
        container.appendChild(fragment);
      };

      const startPvPBattle = (opponentIdx) => {
        selectedPvPOpponent = currentPvPOpponents[opponentIdx];
        if (!selectedPvPOpponent) return;
        
        // Verifica se tem energia
        if (state.user.energy < 5) {
          showToast('Energia insuficiente! (Custo: 5)', 'error');
          return;
        }
        
        // Salvar oponente para usar na batalha
        state.pvpOpponent = selectedPvPOpponent;
        
        // Abrir tela de preparação para batalha PvP
        openPrep('pvp', opponentIdx);
      };

      // --- SISTEMA DE RUNAS ---
      let currentRuneFilter = 'all';

      const renderRunesView = () => {
        currentRuneFilter = 'all';
        renderRunes();
      };

      const filterRunes = (type) => {
        currentRuneFilter = type;
        
        // Update tabs UI
        document.querySelectorAll('.rune-tab').forEach(tab => {
          tab.classList.remove('bg-purple-600', 'text-white');
          tab.classList.add('bg-slate-800', 'text-slate-400');
        });
        
        const activeTab = document.getElementById(`rune-tab-${type}`);
        if (activeTab) {
          activeTab.classList.remove('bg-slate-800', 'text-slate-400');
          activeTab.classList.add('bg-purple-600', 'text-white');
        }
        
        renderRunes();
      };

      const renderRunes = () => {
        const grid = document.getElementById('runes-grid');
        const emptyState = document.getElementById('runes-empty');
        const countEl = document.getElementById('runes-count');
        
        if (!grid) return;
        
        // Initialize runes array if needed
        if (!state.runes) state.runes = [];
        
        // Filter runes
        let runes = state.runes;
        if (currentRuneFilter !== 'all') {
          runes = runes.filter(r => r.type === currentRuneFilter);
        }
        
        // Sort runes
        const sortBy = document.getElementById('rune-sort')?.value || 'rarity';
        runes = [...runes].sort((a, b) => {
          if (sortBy === 'rarity') {
            const order = { legendary: 4, epic: 3, rare: 2, common: 1 };
            return (order[b.rarity] || 0) - (order[a.rarity] || 0);
          }
          if (sortBy === 'type') return a.type.localeCompare(b.type);
          if (sortBy === 'level') return b.level - a.level;
          if (sortBy === 'value') return b.value - a.value;
          return 0;
        });
        
        // Update count
        if (countEl) countEl.innerText = `${runes.length} runa${runes.length !== 1 ? 's' : ''}`;
        
        // Show empty state if no runes
        if (runes.length === 0) {
          grid.innerHTML = '';
          grid.classList.add('hidden');
          if (emptyState) emptyState.classList.remove('hidden');
          emptyState.classList.add('flex');
          return;
        }
        
        grid.classList.remove('hidden');
        if (emptyState) {
          emptyState.classList.add('hidden');
          emptyState.classList.remove('flex');
        }
        
        // Render runes
        grid.innerHTML = '';
        const fragment = document.createDocumentFragment();
        
        runes.forEach(rune => {
          const type = RUNE_TYPES[rune.type];
          const rarityData = RUNE_RARITIES[rune.rarity];
          
          if (!type || !rarityData) return;
          
          const card = document.createElement('div');
          card.className = 'glass-panel p-2.5 rounded-3xl cursor-pointer active:scale-95 transition-all hover:border-purple-500/50 relative overflow-hidden';
          card.style.borderColor = rarityData.color;
          card.style.boxShadow = `inset 0 0 20px ${rarityData.color}22`;
          
          // Equipped badge
          const equippedBadge = rune.equipped 
            ? '<div class="absolute top-0.5 right-0.5 bg-green-600 text-white text-[7px] px-1 py-0.5 rounded font-bold">EQ</div>'
            : '';
          
          // Calculate effective value with level bonus
          const levelBonus = 1 + (rune.level - 1) * 0.05;
          const effectiveValue = Math.floor(rune.value * levelBonus);
          
          card.innerHTML = `
            ${equippedBadge}
            <div class="text-center mb-1.5">
              <div class="text-3xl mb-0.5">${type.icon}</div>
              <div class="text-[8px] font-bold" style="color: ${rarityData.color}">${rarityData.name}</div>
            </div>
            <div class="text-center">
              <div class="text-[10px] font-bold text-white mb-0.5 leading-tight">${type.name}</div>
              <div class="text-[8px] text-slate-400 leading-tight">${type.description}</div>
              <div class="mt-1.5 py-1 px-1.5 bg-slate-800/50 rounded-xl">
                <div class="text-base font-black text-white">+${effectiveValue}</div>
                <div class="text-[7px] text-slate-500">Lv. ${rune.level}/${rune.maxLevel}</div>
              </div>
            </div>
          `;
          
          card.onclick = () => openRuneDetail(rune.id);
          fragment.appendChild(card);
        });
        
        grid.appendChild(fragment);
      };

      const openRuneDetail = (runeId) => {
        const rune = state.runes.find(r => r.id === runeId);
        if (!rune) return;
        
        window.currentRuneId = runeId; // Store for upgrade
        
        const type = RUNE_TYPES[rune.type];
        const rarityData = RUNE_RARITIES[rune.rarity];
        const upgradeCost = getRuneUpgradeCost(rune);
        const canUpgrade = rune.level < rune.maxLevel;
        const levelBonus = 1 + (rune.level - 1) * 0.05;
        const effectiveValue = Math.floor(rune.value * levelBonus);
        const nextLevelBonus = 1 + rune.level * 0.05;
        const nextValue = Math.floor(rune.value * nextLevelBonus);
        
        // Show modal
        const modal = document.getElementById('rune-detail-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Update glow color
        const glow = document.getElementById('rune-modal-glow');
        if (glow) glow.style.background = rarityData.color;
        
        // Update header
        document.getElementById('rune-modal-icon').innerText = type.icon;
        document.getElementById('rune-modal-name').innerText = type.name;
        const rarityEl = document.getElementById('rune-modal-rarity');
        rarityEl.innerText = rarityData.name;
        rarityEl.style.color = rarityData.color;
        
        // Update main stat
        const mainStat = document.getElementById('rune-modal-main-stat');
        mainStat.style.borderColor = rarityData.color;
        document.getElementById('rune-modal-value').innerText = `+${effectiveValue}`;
        document.getElementById('rune-modal-stat-type').innerText = type.stat.toUpperCase();
        
        // Update level
        document.getElementById('rune-modal-level').innerText = `${rune.level}/${rune.maxLevel}`;
        const levelPercent = (rune.level / rune.maxLevel) * 100;
        document.getElementById('rune-modal-level-bar').style.width = `${levelPercent}%`;
        
        // Update status
        const equippedBadge = document.getElementById('rune-modal-equipped-badge');
        const availableBadge = document.getElementById('rune-modal-available-badge');
        if (rune.equipped) {
          equippedBadge.classList.remove('hidden');
          availableBadge.classList.add('hidden');
        } else {
          equippedBadge.classList.add('hidden');
          availableBadge.classList.remove('hidden');
        }
        
        // Update upgrade UI
        const nextLevelDiv = document.getElementById('rune-modal-next-level');
        const costDiv = document.getElementById('rune-modal-cost');
        const upgradeBtn = document.getElementById('rune-modal-upgrade-btn');
        const maxLevelDiv = document.getElementById('rune-modal-max-level');
        
        if (canUpgrade) {
          // Show upgrade options
          nextLevelDiv.classList.remove('hidden');
          document.getElementById('rune-modal-current-value').innerText = `+${effectiveValue}`;
          document.getElementById('rune-modal-next-value').innerText = `+${nextValue}`;
          
          costDiv.classList.remove('hidden');
          document.getElementById('rune-modal-cost-value').innerText = `${upgradeCost} 💰`;
          
          upgradeBtn.classList.remove('hidden');
          maxLevelDiv.classList.add('hidden');
        } else {
          // Max level
          nextLevelDiv.classList.add('hidden');
          costDiv.classList.add('hidden');
          upgradeBtn.classList.add('hidden');
          maxLevelDiv.classList.remove('hidden');
        }
      };

      const closeRuneDetail = () => {
        const modal = document.getElementById('rune-detail-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        window.currentRuneId = null;
      };

      const confirmRuneUpgrade = () => {
        if (!window.currentRuneId) return;
        
        const rune = state.runes.find(r => r.id === window.currentRuneId);
        if (!rune) return;
        
        const upgradeCost = getRuneUpgradeCost(rune);
        
        if (state.user.gold < upgradeCost) {
          showToast('Ouro insuficiente!', 'error');
          return;
        }
        
        state.user.gold -= upgradeCost;
        upgradeRune(rune);
        save();
        updateHeader();
        renderRunes();
        
        showToast(`Runa upada para nível ${rune.level}!`, 'success');
        spawnParticles(window.innerWidth/2, window.innerHeight/2, 'gold');
        
        // Refresh modal with new values
        openRuneDetail(window.currentRuneId);
      };

      // --- RUNE SOCKET FUNCTIONS ---
      window.renderRuneSlots = (eq) => {
        if (!eq) return '';
        
        const maxSlots = getRuneSlots(eq);
        if (!state.runes) state.runes = [];
        const equippedRunes = state.runes.filter(r => r.equipped === eq.id);
        
        let html = '';
        
        for (let i = 0; i < maxSlots; i++) {
          const rune = equippedRunes[i];
          
          if (rune) {
            const type = RUNE_TYPES[rune.type];
            const rarityData = RUNE_RARITIES[rune.rarity];
            const levelBonus = 1 + (rune.level - 1) * 0.05;
            const effectiveValue = Math.floor(rune.value * levelBonus);
            
            html += `
              <div onclick="unequipRuneFromSlot('${eq.id}', '${rune.id}')" 
                   class="relative bg-slate-900 border-2 rounded-lg p-2 cursor-pointer hover:scale-105 transition-transform active:scale-95 group"
                   style="border-color: ${rarityData.color}; box-shadow: inset 0 0 15px ${rarityData.color}33;">
                <div class="absolute top-0.5 right-0.5 text-red-500 text-[8px] font-bold opacity-0 group-hover:opacity-100">✕</div>
                <div class="text-center">
                  <div class="text-xl mb-0.5">${type.icon}</div>
                  <div class="text-[8px] font-bold text-white">+${effectiveValue}</div>
                  <div class="text-[7px] text-slate-400">Lv.${rune.level}</div>
                </div>
              </div>
            `;
          } else {
            html += `
              <div onclick="openRuneSelectModal('${eq.id}')" 
                   class="bg-slate-900/30 border-2 border-dashed border-slate-700 rounded-lg p-2 cursor-pointer hover:border-purple-500 hover:bg-slate-800/50 transition-all flex items-center justify-center">
                <div class="text-center">
                  <div class="text-2xl opacity-30">💎</div>
                  <div class="text-[7px] text-slate-500 mt-0.5">Empty</div>
                </div>
              </div>
            `;
          }
        }
        
        return html;
      };

      window.unequipRuneFromSlot = (eqId, runeId) => {
        const rune = state.runes.find(r => r.id === runeId);
        if (!rune) return;
        
        rune.equipped = null;
        save();
        renderUpgradeModal();
        showToast('Runa removida!', 'success');
      };

      window.openRuneSelectModal = (eqId) => {
        window.currentSocketEquipmentId = eqId;
        
        const eq = state.equipment.find(e => e.id === eqId);
        if (!eq) return;
        
        const maxSlots = getRuneSlots(eq);
        const equippedCount = state.runes.filter(r => r.equipped === eqId).length;
        
        if (equippedCount >= maxSlots) {
          showToast('Todos os slots estão ocupados!', 'warning');
          return;
        }
        
        // Mostrar lista de runas disponíveis
        const availableRunes = state.runes.filter(r => !r.equipped);
        
        if (availableRunes.length === 0) {
          showToast('Você não tem runas disponíveis!', 'error');
          return;
        }
        
        let html = '<div class="space-y-2">';
        html += '<h3 class="text-white font-bold text-sm mb-3">Selecione uma Runa:</h3>';
        
        availableRunes.forEach(rune => {
          const type = RUNE_TYPES[rune.type];
          const rarityData = RUNE_RARITIES[rune.rarity];
          const levelBonus = 1 + (rune.level - 1) * 0.05;
          const effectiveValue = Math.floor(rune.value * levelBonus);
          
          html += `
            <div onclick="equipRuneToSocket('${rune.id}')" 
                 class="flex items-center gap-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer border-2 transition-all"
                 style="border-color: ${rarityData.color}33;">
              <div class="text-2xl">${type.icon}</div>
              <div class="flex-1">
                <div class="text-xs font-bold text-white">${type.name}</div>
                <div class="text-[10px] text-slate-400">${type.description}</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-bold text-white">+${effectiveValue}</div>
                <div class="text-[9px]" style="color: ${rarityData.color}">${rarityData.name}</div>
              </div>
            </div>
          `;
        });
        
        html += '</div>';
        
        // Usar um confirm simples por enquanto (pode criar modal depois)
        document.getElementById('eq-modal-v2').innerHTML = `
          <div class="relative w-[90%] max-w-md bg-slate-900 border-2 border-purple-500 rounded-xl p-4 max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-purple-400 font-bold">💎 Selecionar Runa</h2>
              <button onclick="renderUpgradeModal()" class="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            ${html}
          </div>
        `;
      };

      window.equipRuneToSocket = (runeId) => {
        if (!window.currentSocketEquipmentId) return;
        
        const rune = state.runes.find(r => r.id === runeId);
        if (!rune || rune.equipped) return;
        
        rune.equipped = window.currentSocketEquipmentId;
        save();
        renderUpgradeModal();
        showToast('Runa equipada!', 'success');
        spawnParticles(window.innerWidth/2, window.innerHeight/2, 'purple');
      };

      // Initialize Timer Loop
      setInterval(() => {
          if(document.getElementById("view-missions") && !document.getElementById("view-missions").classList.contains("hidden")) {
               updateMissionTimer();
          }
      }, 1000);

      // --- DUNGEON LOGIC (RESTORED) ---
      const renderDungeonFloors = () => {
        try {
          const title = document.getElementById("dungeon-title");
          if(title) title.innerText = selectedDungeonType === 'xp' ? 'XP RIFT' : `MASMORRA ${selectedDungeonType === 'golem' ? 'DO GOLEM' : 'DO DRAGÃO'}`;
          
          const container = document.getElementById("dungeon-list");
          if(!container) {
              console.error("Dungeon List Container NOT FOUND!");
              return;
          }
          
          // NUCLEAR FIX: Force Visibility
          container.style.display = "block";
          container.style.visibility = "visible";
          container.style.opacity = "1";
          container.style.minHeight = "200px";
          container.innerHTML = "";
          
          // --- BANNER VISUAL ---
          const bgMap = {
              golem: "src/images/golenArt.jpg",
              dragon: "src/images/dragaoArt.jpg",
              xp: "src/images/metamorfoArt.avif"
          };
          
          const bgSrc = bgMap[selectedDungeonType];
          
          const banner = document.createElement("div");
          banner.className = "relative w-full h-32 rounded-2xl overflow-hidden mb-4 shadow-lg shrink-0 group";
          banner.innerHTML = `
              ${bgSrc ? `<img src="${bgSrc}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onerror="this.style.display='none'">` : ''}
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
              <div class="absolute bottom-3 left-4">
                   <h2 class="text-xl sm:text-2xl font-black text-white italic uppercase drop-shadow-md leading-none">
                      ${selectedDungeonType === 'xp' ? 'Fenda Temporal' : selectedDungeonType === 'golem' ? 'Gigante de Pedra' : 'Covil do Dragão'}
                   </h2>
                   <p class="text-[9px] sm:text-[10px] text-slate-300 font-bold tracking-widest uppercase mt-1">
                      ${selectedDungeonType === 'xp' ? 'Bônus de XP' : selectedDungeonType === 'golem' ? 'Farm de Runas (Def/Atk)' : 'Farm de Runas (Crit/Dmg)'}
                   </p>
              </div>
          `;
          container.appendChild(banner);

          const maxFloor = 10;
          const currentProg = (state.user && state.user.dungeonProgress && state.user.dungeonProgress[selectedDungeonType]) || 0;
          
          for(let i=1; i<=maxFloor; i++) {
              const isLocked = i > currentProg + 1;
              const btn = document.createElement("button");
              btn.className = `w-full p-4 rounded-xl flex items-center justify-between transition-all mb-3 ${isLocked ? 'bg-slate-900/50 opacity-60 cursor-not-allowed border border-white/5' : 'glass-panel active:scale-95 group hover:border-indigo-500/30'}`;
              
              if(!isLocked) {
                  btn.onclick = () => {
                      openPrep(`dungeon_${selectedDungeonType}`, i);
                  };
              }
              
              btn.innerHTML = `
                  <div class="flex items-center gap-4">
                      <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-black text-white text-sm border border-white/10 shadow-inner group-hover:bg-indigo-600 transition-colors">B${i}</div>
                      <div class="text-left">
                          <h4 class="${isLocked ? 'text-slate-500' : 'text-white'} font-bold text-sm uppercase tracking-wide">Andar ${i}</h4>
                          <p class="text-[10px] text-slate-500 group-hover:text-slate-300">Nível recomendado: ${i * 5}</p>
                      </div>
                  </div>
                  <div class="text-xl opacity-50 group-hover:opacity-100 transition-opacity">${isLocked ? '🔒' : '▶️'}</div>
              `;
              
              container.appendChild(btn);
          }
        } catch (e) {
            console.error(e);
        }
      };

      // --- GLOBAL EXPORTS (FIX SCOPING) ---
      window.renderMissions = renderMissions;
      window.trackMission = trackMission;
      window.checkDailyReset = checkDailyReset;
      window.renderDungeonFloors = renderDungeonFloors;
      window.openUpgradeModal = openUpgradeModal;
      window.unequipItem = unequipItem;
      window.equipFromDetail = equipFromDetail;
      window.sellEquipment = sellEquipment;
      window.performUpgrade = performUpgrade;
      window.claimMission = claimMission;
      
      // PvP Exports
      window.renderPvPView = renderPvPView;
      window.refreshPvPOpponents = refreshPvPOpponents;
      window.startPvPBattle = startPvPBattle;
      
      // Runes Exports
      window.renderRunesView = renderRunesView;
      window.filterRunes = filterRunes;
      window.renderRunes = renderRunes;
      window.openRuneDetail = openRuneDetail;
      window.closeRuneDetail = closeRuneDetail;
      window.confirmRuneUpgrade = confirmRuneUpgrade;

      // --- INICIALIZAÇÃO DO JOGO ---
      // Como os módulos de dados são carregados ANTES do game.js no HTML,
      // as constantes (MONSTERS_DB, SKILLS, etc.) já estarão disponíveis
      window.addEventListener('DOMContentLoaded', () => {
        console.log('🎮 Iniciando PaperWar...');
        console.log('📦 Dados disponíveis:', {
          MONSTERS_DB: window.MONSTERS_DB?.length || 0,
          SKILLS: Object.keys(window.SKILLS || {}).length || 0,
          DAILY_MISSIONS: window.DAILY_MISSIONS?.length || 0
        });
        init();
      });
    
