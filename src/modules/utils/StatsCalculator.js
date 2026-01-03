/**
 * STATS CALCULATOR
 * Sistema para calcular stats finais de monstros incluindo equipamentos e runas
 */
(function() {
  'use strict';
  
  /**
   * Calcula os stats finais de um monstro
   * Inclui: Base stats + Equipment + Runes
   * @param {Object} monster - Monstro com equipamentos
   * @param {Array} allEquipment - Array de todos equipamentos do jogador
   * @param {Array} allRunes - Array de todas runas do jogador
   * @returns {Object} Stats finais
   */
  window.calculateStats = (monster, allEquipment = [], allRunes = []) => {
    if (!monster) return {};
    
    // Stats base do monstro
    const baseStats = {
      hp: monster.hp || 500,
      atk: monster.atk || 100,
      def: monster.def || 100,
      spd: monster.spd || 100,
      crit: monster.crit || 15,
      cdmg: monster.cdmg || 50,
      res: monster.res || 0,
      acc: monster.acc || 0
    };
    
    // Aplicar multiplicador de nível
    const levelMulti = 1 + ((monster.lvl || 1) - 1) * 0.08;
    let finalStats = {
      hp: Math.floor(baseStats.hp * levelMulti),
      atk: Math.floor(baseStats.atk * levelMulti),
      def: Math.floor(baseStats.def * levelMulti),
      spd: baseStats.spd,
      crit: baseStats.crit,
      cdmg: baseStats.cdmg,
      res: baseStats.res,
      acc: baseStats.acc
    };
    
    // Se não tem equipamentos, retorna stats base
    if (!monster.equipped || !allEquipment || allEquipment.length === 0) {
      return finalStats;
    }
    
    // Calcular bônus de equipamentos
    const equippedItems = Object.values(monster.equipped)
      .filter(eqId => eqId)
      .map(eqId => allEquipment.find(e => e.id === eqId))
      .filter(eq => eq);
    
    equippedItems.forEach(eq => {
      // Stats principais
      if (eq.stats && eq.stats.main) {
        const main = eq.stats.main;
        const value = calculateEquipmentStatValue(main, eq.lvl);
        
        if (finalStats.hasOwnProperty(main.type)) {
          finalStats[main.type] += value;
        }
      }
      
      // Substats
      if (eq.stats && eq.stats.subs) {
        eq.stats.subs.forEach(sub => {
          if (finalStats.hasOwnProperty(sub.type)) {
            finalStats[sub.type] += sub.value || 0;
          }
        });
      }
      
      // NOVO: Bônus de Runas
      if (allRunes && allRunes.length > 0) {
        const runeBonus = calculateRuneBonus(eq, allRunes);
        
        Object.keys(runeBonus).forEach(stat => {
          if (finalStats.hasOwnProperty(stat) && runeBonus[stat] > 0) {
            finalStats[stat] += runeBonus[stat];
          }
        });
      }
    });
    
    // Garantir valores mínimos
    finalStats.hp = Math.max(100, Math.floor(finalStats.hp));
    finalStats.atk = Math.max(10, Math.floor(finalStats.atk));
    finalStats.def = Math.max(10, Math.floor(finalStats.def));
    finalStats.spd = Math.max(50, Math.floor(finalStats.spd));
    finalStats.crit = Math.max(0, Math.min(100, Math.floor(finalStats.crit)));
    finalStats.cdmg = Math.max(0, Math.floor(finalStats.cdmg));
    finalStats.res = Math.max(0, Math.min(100, Math.floor(finalStats.res)));
    finalStats.acc = Math.max(0, Math.min(100, Math.floor(finalStats.acc)));
    
    return finalStats;
  };
  
  /**
   * Calcula o valor de um stat de equipamento baseado no nível
   * @param {Object} stat - Stat principal {type, value}
   * @param {number} equipLevel - Nível do equipamento
   * @returns {number} Valor final do stat
   */
  const calculateEquipmentStatValue = (stat, equipLevel = 0) => {
    if (!stat || !stat.value) return 0;
    
    // Cada nível adiciona 4% ao valor base
    const levelBonus = 1 + (equipLevel * 0.04);
    return Math.floor(stat.value * levelBonus);
  };
  
  console.log('✅ StatsCalculator.js carregado');
})();
