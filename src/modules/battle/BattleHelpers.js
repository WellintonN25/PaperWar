/**
 * BATTLE HELPERS
 * Funções auxiliares para cálculos e lógica de batalha
 */
(function() {
  'use strict';
  
  /**
   * Calcula o dano de um ataque
   * @param {Object} attacker - Monstro atacante com stats
   * @param {Object} defender - Monstro defensor com stats
   * @param {Object} skill - Habilidade usada
   * @returns {number} Dano calculado
   */
  window.calculateDamage = (attacker, defender, skill) => {
    if (!attacker || !defender || !skill) return 0;
    
    const baseDamage = attacker.atk || 100;
    const skillPower = skill.p || 1.0;
    const defense = defender.def || 100;
    
    // Fórmula de dano básica
    // DMG = (ATK * SkillMultiplier) * (1000 / (1000 + DEF * 3))
    let damage = (baseDamage * skillPower) * (1000 / (1000 + defense * 3));
    
    // Variação aleatória (±10%)
    const variance = 0.9 + (Math.random() * 0.2);
    damage *= variance;
    
    // Critical hit chance
    const critChance = attacker.crit || 15;
    const isCrit = Math.random() * 100 < critChance;
    
    if (isCrit) {
      const critDmg = attacker.cdmg || 50;
      damage *= (1 + critDmg / 100);
    }
    
    return {
      damage: Math.max(1, Math.floor(damage)),
      isCrit: isCrit
    };
  };
  
  /**
   * Calcula a ordem de turno baseada em velocidade
   * @param {Array} units - Array de unidades com stats
   * @returns {Array} Unidades ordenadas por velocidade
   */
  window.calculateTurnOrder = (units) => {
    if (!units || units.length === 0) return [];
    
    // Copia e ordena por velocidade (maior primeiro)
    return [...units].sort((a, b) => {
      const spdA = a.spd || 100;
      const spdB = b.spd || 100;
      return spdB - spdA;
    });
  };
  
  /**
   * Verifica vantagem de elemento
   * @param {string} attackerElement - Elemento do atacante
   * @param {string} defenderElement - Elemento do defensor
   * @returns {number} Multiplicador de dano (0.5, 1.0, 1.5)
   */
  window.getElementAdvantage = (attackerElement, defenderElement) => {
    if (!attackerElement || !defenderElement) return 1.0;
    
    const advantages = {
      fire: ['wind', 'nature'],
      water: ['fire'],
      wind: ['water'],
      earth: ['lightning'],
      lightning: ['water'],
      nature: ['earth'],
      void: [], // Neutro
      light: ['dark'],
      dark: ['light']
    };
    
    const disadvantages = {
      fire: ['water'],
      water: ['wind', 'lightning'],
      wind: ['fire'],
      earth: ['nature'],
      lightning: ['earth'],
      nature: ['fire'],
      light: ['dark'],
      dark: ['light']
    };
    
    if (advantages[attackerElement]?.includes(defenderElement)) {
      return 1.5; // Vantagem
    }
    
    if (disadvantages[attackerElement]?.includes(defenderElement)) {
      return 0.5; // Desvantagem
    }
    
    return 1.0; // Neutro
  };
  
  /**
   * Verifica se um monstro está morto
   * @param {Object} unit - Unidade a verificar
   * @returns {boolean} True se morto
   */
  window.isUnitDead = (unit) => {
    if (!unit) return true;
    return (unit.currentHp || 0) <= 0;
  };
  
  /**
   * Calcula HP percentual
   * @param {Object} unit - Unidade
   * @returns {number} Percentual de HP (0-100)
   */
  window.getHPPercent = (unit) => {
    if (!unit || !unit.maxHp) return 0;
    const current = unit.currentHp || 0;
    const max = unit.maxHp || 1;
    return Math.max(0, Math.min(100, (current / max) * 100));
  };
  
  /**
   * Calcula ganho de XP baseado em diferença de nível
   * @param {number} playerLevel - Nível do jogador
   * @param {number} enemyLevel - Nível do inimigo
   * @param {number} baseXP - XP base
   * @returns {number} XP final
   */
  window.calculateXPGain = (playerLevel, enemyLevel, baseXP = 50) => {
    const levelDiff = enemyLevel - playerLevel;
    let multiplier = 1.0;
    
    if (levelDiff > 5) multiplier = 1.5; // Inimigo muito mais forte
    else if (levelDiff > 0) multiplier = 1.2; // Inimigo um pouco mais forte
    else if (levelDiff < -5) multiplier = 0.5; // Inimigo muito mais fraco
    else if (levelDiff < 0) multiplier = 0.8; // Inimigo um pouco mais fraco
    
    return Math.floor(baseXP * multiplier);
  };
  
  /**
   * Calcula recompensa de ouro
   * @param {number} enemyLevel - Nível do inimigo
   * @param {boolean} isBoss - Se é boss
   * @returns {number} Ouro ganho
   */
  window.calculateGoldReward = (enemyLevel, isBoss = false) => {
    const base = 50 + (enemyLevel * 10);
    const multiplier = isBoss ? 3 : 1;
    const variance = 0.8 + (Math.random() * 0.4); // ±20%
    
    return Math.floor(base * multiplier * variance);
  };
  
  /**
   * Gera um inimigo aleatório para campanha/dungeon
   * @param {number} level - Nível desejado
   * @param {number} stars - Estrelas máximas
   * @returns {Object} Monstro inimigo
   */
  window.generateEnemy = (level, stars = 3) => {
    const pool = MONSTERS_DB.filter(m => m.stars <= stars);
    if (pool.length === 0) return null;
    
    const template = randomChoice(pool);
    if (!template) return null;
    
    // Scaling baseado no nível
    const multi = 1 + (level - 1) * 0.15;
    
    return {
      ...template,
      instanceId: generateUniqueId(),
      lvl: level,
      hp: Math.floor(template.hp * multi),
      atk: Math.floor(template.atk * multi),
      def: Math.floor(template.def * multi),
      currentHp: Math.floor(template.hp * multi),
      maxHp: Math.floor(template.hp * multi),
      equipped: { slot1: null, slot2: null, slot3: null, slot4: null },
      isEnemy: true
    };
  };
  
  /**
   * Escolhe uma skill aleatória para IA usar
   * @param {Object} enemy - Monstro inimigo
   * @param {number} currentMana - Mana atual
   * @returns {string} Nome da skill
   */
  window.chooseEnemySkill = (enemy, currentMana = 100) => {
    if (!enemy || !enemy.skills || enemy.skills.length === 0) return 'melee';
    
    // Filtra skills que pode usar (tem mana suficiente)
    const usableSkills = enemy.skills.filter(skillName => {
      const skill = SKILLS[skillName];
      return skill && (skill.mp || 0) <= currentMana;
    });
    
    if (usableSkills.length === 0) return 'melee';
    
    // 70% chance de usar skill mais forte disponível
    if (Math.random() < 0.7) {
      // Ordena por power
      usableSkills.sort((a, b) => {
        const skillA = SKILLS[a];
        const skillB = SKILLS[b];
        return (skillB.p || 0) - (skillA.p || 0);
      });
      return usableSkills[0];
    }
    
    // 30% chance de usar skill aleatória
    return randomChoice(usableSkills);
  };
  
  console.log('✅ BattleHelpers.js carregado');
})();
