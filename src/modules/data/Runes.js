/**
 * RUNES SYSTEM
 * Sistema de runas para melhorar equipamentos
 */
(function() {
  'use strict';
  
  /**
   * Tipos de Runas disponíveis
   */
  window.RUNE_TYPES = {
    // Runas Básicas
    power: {
      id: 'power',
      name: 'Runa de Poder',
      icon: '⚡',
      color: '#f59e0b',
      stat: 'atk',
      description: 'Aumenta o ATK'
    },
    vitality: {
      id: 'vitality',
      name: 'Runa da Vitalidade',
      icon: '❤️',
      color: '#ef4444',
      stat: 'hp',
      description: 'Aumenta o HP'
    },
    guard: {
      id: 'guard',
      name: 'Runa da Guarda',
      icon: '🛡️',
      color: '#3b82f6',
      stat: 'def',
      description: 'Aumenta a DEF'
    },
    swift: {
      id: 'swift',
      name: 'Runa da Velocidade',
      icon: '💨',
      color: '#06b6d4',
      stat: 'spd',
      description: 'Aumenta a SPD'
    },
    
    // Runas Avançadas
    blade: {
      id: 'blade',
      name: 'Runa da Lâmina',
      icon: '⚔️',
      color: '#dc2626',
      stat: 'crit',
      description: 'Aumenta Critical Rate'
    },
    rage: {
      id: 'rage',
      name: 'Runa da Fúria',
      icon: '💢',
      color: '#991b1b',
      stat: 'cdmg',
      description: 'Aumenta Critical Damage'
    },
    energy: {
      id: 'energy',
      name: 'Runa da Energia',
      icon: '✨',
      color: '#8b5cf6',
      stat: 'res',
      description: 'Aumenta Resistência'
    },
    focus: {
      id: 'focus',
      name: 'Runa do Foco',
      icon: '🎯',
      color: '#a855f7',
      stat: 'acc',
      description: 'Aumenta Acurácia'
    }
  };
  
  /**
   * Configuração de raridades de runas
   */
  window.RUNE_RARITIES = {
    common: {
      name: 'Comum',
      color: '#94a3b8',
      multiplier: 1.0,
      dropRate: 0.50, // 50%
      minValue: 5,
      maxValue: 15
    },
    rare: {
      name: 'Rara',
      color: '#3b82f6',
      multiplier: 1.5,
      dropRate: 0.30, // 30%
      minValue: 15,
      maxValue: 30
    },
    epic: {
      name: 'Épica',
      color: '#a855f7',
      multiplier: 2.0,
      dropRate: 0.15, // 15%
      minValue: 30,
      maxValue: 50
    },
    legendary: {
      name: 'Lendária',
      color: '#fbbf24',
      multiplier: 3.0,
      dropRate: 0.05, // 5%
      minValue: 50,
      maxValue: 100
    }
  };
  
  /**
   * Gera uma runa aleatória
   * @param {number} dungeonLevel - Nível da dungeon (afeta raridade)
   * @returns {Object} Runa gerada
   */
  window.generateRune = (dungeonLevel = 1) => {
    // Chance de raridade aumenta com nível da dungeon
    const rarityBonus = Math.min(dungeonLevel * 0.02, 0.3); // Max +30%
    const rand = Math.random();
    
    let rarity = 'common';
    if (rand < 0.05 + rarityBonus * 0.05) rarity = 'legendary';
    else if (rand < 0.20 + rarityBonus * 0.15) rarity = 'epic';
    else if (rand < 0.50 + rarityBonus * 0.30) rarity = 'rare';
    
    // Selecionar tipo aleatório
    const types = Object.keys(RUNE_TYPES);
    const typeId = types[Math.floor(Math.random() * types.length)];
    const type = RUNE_TYPES[typeId];
    const rarityData = RUNE_RARITIES[rarity];
    
    // Calcular valor da runa
    const baseValue = rarityData.minValue + 
                     Math.floor(Math.random() * (rarityData.maxValue - rarityData.minValue + 1));
    
    // Valor final com scaling de nível
    const levelScaling = 1 + (dungeonLevel - 1) * 0.1;
    const finalValue = Math.floor(baseValue * levelScaling);
    
    return {
      id: `rune_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: typeId,
      rarity: rarity,
      value: finalValue,
      level: 1,
      maxLevel: 15,
      equipped: null, // ID do equipamento onde está encaixada
      createdAt: Date.now()
    };
  };
  
  /**
   * Calcula quantos slots de runa um equipamento tem
   * @param {Object} equipment - Equipamento
   * @returns {number} Número de slots
   */
  window.getRuneSlots = (equipment) => {
    if (!equipment) return 0;
    
    const slotsPerRarity = {
      common: 1,
      rare: 2,
      epic: 2,
      legendary: 3
    };
    
    return slotsPerRarity[equipment.rarity] || 1;
  };
  
  /**
   * Calcula o bônus total de todas as runas em um equipamento
   * @param {Object} equipment - Equipamento
   * @param {Array} allRunes - Array com todas as runas do jogador
   * @returns {Object} Bônus totais por stat
   */
  window.calculateRuneBonus = (equipment, allRunes) => {
    if (!equipment || !allRunes) return {};
    
    const bonus = {
      atk: 0,
      def: 0,
      hp: 0,
      spd: 0,
      crit: 0,
      cdmg: 0,
      res: 0,
      acc: 0
    };
    
    // Pegar runas encaixadas neste equipamento
    const equippedRunes = allRunes.filter(r => r.equipped === equipment.id);
    
    equippedRunes.forEach(rune => {
      const type = RUNE_TYPES[rune.type];
      if (type && type.stat) {
        // Valor base da runa + scaling por level
        const levelBonus = 1 + (rune.level - 1) * 0.05; // +5% por nível
        bonus[type.stat] += Math.floor(rune.value * levelBonus);
      }
    });
    
    return bonus;
  };
  
  /**
   * Custo para upar uma runa
   * @param {Object} rune - Runa
   * @returns {number} Custo em ouro
   */
  window.getRuneUpgradeCost = (rune) => {
    if (!rune) return 0;
    
    const baseCost = {
      common: 100,
      rare: 250,
      epic: 500,
      legendary: 1000
    };
    
    const cost = baseCost[rune.rarity] || 100;
    return Math.floor(cost * Math.pow(1.5, rune.level - 1));
  };
  
  /**
   * Faz upgrade de uma runa
   * @param {Object} rune - Runa para upar
   * @returns {boolean} Success
   */
  window.upgradeRune = (rune) => {
    if (!rune || rune.level >= rune.maxLevel) return false;
    
    rune.level++;
    return true;
  };
  
  /**
   * Remove runa de um equipamento (custo de ouro)
   * @param {Object} rune - Runa
   * @returns {number} Custo para remover
   */
  window.getRuneRemoveCost = (rune) => {
    if (!rune || !rune.equipped) return 0;
    
    const baseCost = {
      common: 50,
      rare: 150,
      epic: 300,
      legendary: 500
    };
    
    return baseCost[rune.rarity] || 50;
  };
  
  console.log('✅ Runes.js carregado');
})();
