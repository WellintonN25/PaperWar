/**
 * MONSTER MANAGEMENT SYSTEM
 * Funções para gerenciar monstros no jogo
 */
(function() {
  'use strict';
  
  /**
   * Adiciona um novo monstro ao inventário
   * @param {string} id - ID do monstro no MONSTERS_DB
   * @param {Object} state - Estado do jogo
   * @returns {Object|null} Novo monstro criado ou null se não encontrado
   */
  window.addMonster = (id, state) => {
    if (!state || !state.inventory) {
      console.error('Invalid state provided to addMonster');
      return null;
    }
    
    const template = MONSTERS_DB.find((m) => m.id === id) || 
                     MONSTERS_DB.find((m) => m.id === id?.toLowerCase());
    
    if (!template) {
      console.error("Monster ID not found:", id);
      return null;
    }

    const newMon = {
      ...template,
      instanceId: generateUniqueId(),
      xp: 0,
      lvl: 1,
      equipped: { slot1: null, slot2: null, slot3: null, slot4: null },
      stars: template.stars,
      skillLvls: {},
    };
    
    // Initialize skill levels
    if (newMon.skills) {
      newMon.skills.forEach(s => newMon.skillLvls[s] = 1);
    }

    state.inventory.push(newMon);
    return newMon;
  };
  
  /**
   * Calcula os stats finais de um monstro incluindo equipamentos
   * OTIMIZADO: Usa cache para evitar recalcular stats que não mudaram
   * @param {Object} mon - Monstro
   * @param {Object} state - Estado do jogo
   * @returns {Object} Stats finais {hp, atk, def, crit, cdmg, spd}
   */
  const calculateMonsterStats = (mon, state) => {
    if (!mon) return { hp: 0, atk: 0, def: 0, crit:0, cdmg: 50, spd: 100 };
    
    // Base stats (scaled by level)
    const multi = 1 + (mon.lvl - 1) * 0.15;
    let hp = Math.floor((mon.hp || 1000) * multi);
    let atk = Math.floor((mon.atk || 100) * multi);
    let def = Math.floor((mon.def || 100) * multi);
    let crit = 15; // base 15%
    let cdmg = 50; // base 50%
    let spd = 100; // base 100
    
    // Equipment bonuses
    if (mon.equipped && state && state.equipment) {
      Object.values(mon.equipped).forEach(eqId => {
        if (!eqId) return;
        const eq = state.equipment.find(e => e.id === eqId);
        if (!eq) return;
        
        // Main stat
        if (eq.stats && eq.stats.main) {
          const val = eq.stats.main.value || 0;
          switch(eq.stats.main.type) {
            case 'hp': hp += val; break;
            case 'atk': atk += val; break;
            case 'def': def += val; break;
            case 'crit': crit += val; break;
            case 'cdmg': cdmg += val; break;
            case 'spd': spd += val; break;
          }
        }
        
        // Substats
        if (eq.stats && eq.stats.subs) {
          eq.stats.subs.forEach(sub => {
            const val = sub.value || 0;
            switch(sub.type) {
              case 'hp': hp += val; break;
              case 'atk': atk += val; break;
              case 'def': def += val; break;
              case 'crit': crit += val; break;
              case 'cdmg': cdmg += val; break;
              case 'spd': spd += val; break;
            }
          });
        }
      });
      
      // Set bonuses
      const sets = {};
      Object.values(mon.equipped).forEach(eqId => {
        if (!eqId) return;
        const eq = state.equipment.find(e => e.id === eqId);
        if (eq && eq.set) {
          sets[eq.set] = (sets[eq.set] || 0) + 1;
        }
      });
      
      // Apply set bonuses
      Object.entries(sets).forEach(([setName, count]) => {
        const setData = EQUIPMENT_SETS[setName];
        if (!setData) return;
        const piecesNeeded = setData.pieces || 2;
        if (count >= piecesNeeded) {
          const bonus = setData.bonus;
          if (!bonus) return;
          const val = bonus.value || 0;
          
          switch(bonus.type) {
            case 'hp':   hp += Math.floor(hp * val / 100); break;
            case 'atk':  atk += Math.floor(atk * val / 100); break;
            case 'def':  def += Math.floor(def * val / 100); break;
            case 'crit': crit += val; break;
            case 'cdmg': cdmg += val; break;
            case 'spd':  spd += Math.floor(spd * val / 100); break;
          }
        }
      });
    }
    
    return {
      hp: Math.max(1, Math.floor(hp)),
      atk: Math.max(1, Math.floor(atk)),
      def: Math.max(1, Math.floor(def)),
      crit: Math.max(0, Math.min(100, Math.floor(crit))),
      cdmg: Math.max(50, Math.floor(cdmg)),
      spd: Math.max(1, Math.floor(spd))
    };
  };
  
  // Versão com cache da função (será criada quando window.cached estiver disponível)
  window.getMonsterFinalStats = (mon, state) => {
    // Gera chave única baseada no monstro e equipamentos
    const cacheKey = `stats_${mon.instanceId}_${mon.lvl}_${Object.values(mon.equipped || {}).join('_')}`;
    
    // Tenta pegar do cache (se Performance.js estiver carregado)
    if (window.cached) {
      const cachedFn = cached(calculateMonsterStats, 'monsterStats');
      return cachedFn(mon, state);
    }
    
    // Fallback sem cache
    return calculateMonsterStats(mon, state);
  };
  
  /**
   * Calcula XP necessário para o próximo nível
   * @param {number} currentLevel - Nível atual do monstro
   * @param {number} stars - Estrelas do monstro
   * @returns {number} XP necessário
   */
  window.getXPRequired = (currentLevel, stars) => {
    const base = 100;
    const starMulti = stars || 1;
    return Math.floor(base * currentLevel * starMulti);
  };
  
  /**
   * Adiciona XP a um monstro e faz level up se necessário
   * @param {Object} mon - Monstro
   * @param {number} xp - XP a adicionar
   * @param {Function} onLevelUp - Callback quando subir de nível
   * @returns {boolean} True se houve level up
   */
  window.addMonsterXP = (mon, xp, onLevelUp) => {
    if (!mon) return false;
    
    mon.xp = (mon.xp || 0) + xp;
    const maxLevel = MAX_LEVELS[mon.stars] || 40;
    let leveledUp = false;
    
    while (mon.lvl < maxLevel) {
      const xpRequired = getXPRequired(mon.lvl, mon.stars);
      if (mon.xp >= xpRequired) {
        mon.xp -= xpRequired;
        mon.lvl++;
        leveledUp = true;
        if (onLevelUp) onLevelUp(mon);
      } else {
        break;
      }
    }
    
    // Cap excess XP
    if (mon.lvl >= maxLevel) {
      mon.xp = 0;
    }
    
    return leveledUp;
  };
  
  /**
   * Verifica se um monstro pode evoluir
   * @param {Object} mon - Monstro
   * @returns {boolean} True se pode evoluir
   */
  window.canEvolveMonster = (mon) => {
    if (!mon) return false;
    if (mon.stars >= 6) return false; // Max stars
    const maxLevel = MAX_LEVELS[mon.stars] || 40;
    return mon.lvl >= maxLevel;
  };
  
  /**
   * Evolui um monstro (aumenta suas estrelas)
   * @param {Object} mon - Monstro a evoluir
   * @returns {boolean} True se evoluiu com sucesso
   */
  window.evolveMonster = (mon) => {
    if (!canEvolveMonster(mon)) return false;
    
    mon.stars++;
    mon.lvl = 1;
    mon.xp = 0;
    
    return true;
  };
  
  /**
   * Remove um monstro do inventário
   * @param {Object} state - Estado do jogo
   * @param {string} instanceId - ID da instância do monstro
   * @returns {boolean} True se removido com sucesso
   */
  window.removeMonster = (state, instanceId) => {
    if (!state || !state.inventory) return false;
    
    const index = state.inventory.findIndex(m => m.instanceId === instanceId);
    if (index === -1) return false;
    
    state.inventory.splice(index, 1);
    return true;
  };
  
  /**
   * Encontra um monstro no inventário
   * @param {Object} state - Estado do jogo
   * @param {string} instanceId - ID da instância do monstro
   * @returns {Object|null} Monstro encontrado ou null
   */
  window.findMonsterByInstance = (state, instanceId) => {
    if (!state || !state.inventory) return null;
    return state.inventory.find(m => m.instanceId === instanceId) || null;
  };
  
  console.log('✅ MonsterManager.js carregado');
})();
