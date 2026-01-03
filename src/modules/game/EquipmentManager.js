/**
 * EQUIPMENT MANAGEMENT SYSTEM
 * Funções para gerenciar equipamentos no jogo
 */
(function() {
  'use strict';
  
  /**
   * Gera um substatus aleatório para equipamento
   * @param {Array} excludeTypes - Tipos de stats a excluir
   * @returns {Object} Substatus {type, value}
   */
  window.generateSubStat = (excludeTypes = []) => {
    const types = ["atk", "def", "hp", "crit", "cdmg", "spd", "res", "acc"].filter(t => !excludeTypes.includes(t));
    const type = types[Math.floor(Math.random() * types.length)];
    
    let val = 0;
    switch(type) {
      case "atk": val = Math.floor(Math.random() * 4) + 5; break; // 5-8%
      case "def": val = Math.floor(Math.random() * 4) + 5; break;
      case "hp":  val = Math.floor(Math.random() * 4) + 5; break;
      case "crit": val = Math.floor(Math.random() * 3) + 4; break; // 4-6%
      case "cdmg": val = Math.floor(Math.random() * 4) + 4; break; // 4-7%
      case "spd": val = Math.floor(Math.random() * 3) + 4; break; // 4-6
      case "res": val = Math.floor(Math.random() * 4) + 4; break;
      case "acc": val = Math.floor(Math.random() * 4) + 4; break;
    }
    return { type, value: val };
  };
  
  /**
   * Cria um novo equipamento
   * @param {number} floorLevel - Nível do dungeon (afeta raridade)
   * @param {string} dungeonType - Tipo: 'golem', 'dragon', etc
   * @returns {Object} Novo equipamento criado
   */
  window.createEquipment = (floorLevel = 1, dungeonType = "golem") => {
    // Seleção de Slot baseado no tipo de dungeon
    let slot;
    if (dungeonType === "golem") slot = [1, 2, 3][Math.floor(Math.random() * 3)];
    else if (dungeonType === "dragon") slot = [2, 3, 4][Math.floor(Math.random() * 3)];
    else slot = Math.floor(Math.random() * 4) + 1;

    // Set selection baseado no tipo
    let availableSets;
    if (dungeonType === "golem") availableSets = ["energy", "guard", "swift"];
    else if (dungeonType === "dragon") availableSets = ["rage", "blade", "fatal", "violent"];
    else availableSets = Object.keys(EQUIPMENT_SETS);
    
    const set = availableSets[Math.floor(Math.random() * availableSets.length)];

    // Lógica de Raridade baseada no floor
    const r = Math.random();
    let rarity = "common";
    let chanceLegend = 0.01 + (floorLevel * 0.005); // Max ~7% at floor 12
    let chanceEpic = 0.05 + (floorLevel * 0.02);    // Max ~29%
    let chanceRare = 0.2 + (floorLevel * 0.05);     // Max ~80%
    
    if (r < chanceLegend) rarity = "legendary";
    else if (r < chanceLegend + chanceEpic) rarity = "epic";
    else if (r < chanceLegend + chanceEpic + chanceRare) rarity = "rare";
    else rarity = "common";

    const eq = {
      id: "eq_" + generateUniqueId(),
      slot: slot,
      set: set,
      rarity: rarity,
      lvl: 0,
      stats: {
        main: {},
        subs: []
      }
    };

    // Definição de Status Principal baseado no slot
    if (slot === 1) {
      eq.type = "weapon";
      eq.stats.main = { type: "atk", value: 100 };
    } else if (slot === 2) {
      eq.type = "armor";
      eq.stats.main = { type: "def", value: 70 };
    } else if (slot === 3) {
      eq.type = "helmet";
      eq.stats.main = { type: "hp", value: 300 };
    } else if (slot === 4) {
      eq.type = "acc";
      const opts = ["crit", "cdmg", "atk", "hp", "def", "spd"];
      const pick = opts[Math.floor(Math.random() * opts.length)];
      
      let val = 0;
      if (pick === "crit") val = 7;
      else if (pick === "cdmg") val = 11;
      else if (pick === "spd") val = 7;
      else val = 10; // atk/def/hp %
      
      eq.stats.main = { type: pick, value: val };
    }

    // Geração de Substatus baseado na raridade
    let subCount = 0;
    if (rarity === "legendary") subCount = 4;
    else if (rarity === "epic") subCount = 3;
    else if (rarity === "rare") subCount = 2;
    
    const existingTypes = [eq.stats.main.type];
    
    for(let i=0; i<subCount; i++) {
      const sub = generateSubStat(existingTypes);
      eq.stats.subs.push(sub);
      existingTypes.push(sub.type);
    }

    return eq;
  };
  
  /**
   * Vende um equipamento
   * @param {Object} state - Estado do jogo
   * @param {string} eqId - ID do equipamento
   * @returns {number|null} Preço de venda ou null se não vendeu
   */
  window.sellEquipment = (state, eqId) => {
    if (!state || !state.equipment) return null;
    
    const eq = state.equipment.find(e => e.id === eqId);
    if (!eq) return null;
    
    // Check if equipped
    const equippedBy = state.inventory.find(mon => 
      mon.equipped && Object.values(mon.equipped).includes(eq.id)
    );
    
    if (equippedBy) {
      showToast("Desequipe antes de vender!", "error");
      return null;
    }

    const conf = EQ_RARITY[eq.rarity];
    const price = Math.floor(50 * (eq.lvl + 1) * conf.mult);

    state.user.gold += price;
    state.equipment = state.equipment.filter(e => e.id !== eqId);

    return price;
  };
  
  /**
   * Equipa um item em um monstro
   * @param {Object} state - Estado do jogo
   * @param {string} monsterInstanceId - ID da instância do monstro
   * @param {string} equipmentId - ID do equipamento
   * @returns {boolean} True se equipou com sucesso
   */
  window.equipItem = (state, monsterInstanceId, equipmentId) => {
    if (!state) return false;
    
    const monster = findMonsterByInstance(state, monsterInstanceId);
    const equipment = state.equipment.find(e => e.id === equipmentId);
    
    if (!monster || !equipment) return false;
    
    // Verifica se o equipamento já está equipado em outro monstro
    const currentOwner = state.inventory.find(m => 
      m.equipped && Object.values(m.equipped).includes(equipmentId)
    );
    
    // Se equipado em outro, desequipa primeiro
    if (currentOwner && currentOwner.instanceId !== monsterInstanceId) {
      Object.keys(currentOwner.equipped).forEach(slot => {
        if (currentOwner.equipped[slot] === equipmentId) {
          currentOwner.equipped[slot] = null;
        }
      });
    }
    
    // Equipa no slot correto
    const slotKey = `slot${equipment.slot}`;
    
    // Se já tem algo equipado nesse slot, guarda o ID para retornar ao inventário
    const oldEquipId = monster.equipped[slotKey];
    
    monster.equipped[slotKey] = equipmentId;
    
    return true;
  };
  
  /**
   * Desequipa um item de um monstro
   * @param {Object} state - Estado do jogo
   * @param {string} monsterInstanceId - ID da instância do monstro
   * @param {number} slot - Slot do equipamento (1-4)
   * @returns {boolean} True se desequipou com sucesso
   */
  window.unequipItem = (state, monsterInstanceId, slot) => {
    if (!state) return false;
    
    const monster = findMonsterByInstance(state, monsterInstanceId);
    if (!monster || !monster.equipped) return false;
    
    const slotKey = `slot${slot}`;
    
    if (!monster.equipped[slotKey]) return false;
    
    monster.equipped[slotKey] = null;
    return true;
  };
  
  /**
   * Verifica se um equipamento está equipado
   * @param {Object} state - Estado do jogo
   * @param {string} equipmentId - ID do equipamento
   * @returns {Object|null} Monstro que está usando ou null
   */
  window.getEquipmentOwner = (state, equipmentId) => {
    if (!state || !state.inventory) return null;
    
    return state.inventory.find(mon => 
      mon.equipped && Object.values(mon.equipped).includes(equipmentId)
    ) || null;
  };
  
  /**
   * Faz upgrade em um equipamento
   * @param {Object} eq - Equipamento a fazer upgrade
   * @param {Object} state - Estado do jogo
   * @returns {Object} Resultado {success: boolean, newLevel: number, goldCost: number}
   */
  window.upgradeEquipment = (eq, state) => {
    if (!eq || !state) return { success: false };
    
    const maxLvl = 15;
    if (eq.lvl >= maxLvl) {
      return { success: false, message: "Nível máximo atingido!" };
    }
    
    // Custo de upgrade
    const baseCost = 500;
    const rarityMult = EQ_RARITY[eq.rarity]?.mult || 1;
    const goldCost = Math.floor(baseCost * (eq.lvl + 1) * rarityMult);
    
    if (state.user.gold < goldCost) {
      return { success: false, message: "Ouro insuficiente!" };
    }
    
    // Deduz o custo
    state.user.gold -= goldCost;
    
    // Aumenta o nível
    eq.lvl++;
    
    // A cada 3 níveis, melhora um substatus aleatório ou adiciona um novo (se houver espaço)
    if (eq.lvl % 3 === 0) {
      if (eq.stats.subs.length < 4) {
        // Adiciona novo substatus
        const existingTypes = [eq.stats.main.type, ...eq.stats.subs.map(s => s.type)];
        const newSub = generateSubStat(existingTypes);
        eq.stats.subs.push(newSub);
      } else {
        // Melhora substatus existente
        const randomSub = eq.stats.subs[Math.floor(Math.random() * eq.stats.subs.length)];
        randomSub.value += randomInt(2, 5);
      }
    }
    
    return {
      success: true,
      newLevel: eq.lvl,
      goldCost: goldCost,
      substatUpgrade: eq.lvl % 3 === 0
    };
  };
  
  /**
   * Gera recompensas de dungeon (equipamento + runas)
   * @param {number} floorLevel - Nível do dungeon
   * @param {string} dungeonType - Tipo: 'golem', 'dragon'
   * @returns {Object} Recompensas { equipment: Array, runes: Array }
   */
  window.generateDungeonRewards = (floorLevel = 1, dungeonType = "golem") => {
    const rewards = {
      equipment: [],
      runes: []
    };
    
    // Sempre dropa 1 equipamento
    rewards.equipment.push(createEquipment(floorLevel, dungeonType));
    
    // Chance de dropar runas (aumenta com o nível)
    const runeDropChance = Math.min(0.5 + (floorLevel * 0.05), 1.0); // 50% base, até 100%
    const runeCount = Math.random() < runeDropChance ? 1 : 0;
    
    // Chance de bonus rune em níveis altos
    if (floorLevel >= 7 && Math.random() < 0.3) {
      rewards.runes.push(generateRune(floorLevel));
    }
    
    // Dropar runas
    for (let i = 0; i < runeCount; i++) {
      rewards.runes.push(generateRune(floorLevel));
    }
    
    return rewards;
  };
  
  console.log('✅ EquipmentManager.js carregado');
})();
