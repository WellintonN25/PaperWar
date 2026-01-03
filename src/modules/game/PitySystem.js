/**
 * PITY SYSTEM & DAILY REWARDS
 * Sistema de garantia para summons e recompensas diárias progressivas
 */
(function() {
  'use strict';
  
  // ===== PITY SYSTEM =====
  
  /**
   * Configuração do Pity System
   */
  const PITY_CONFIG = {
    epic: {
      guarantee: 10, // Garante 4★+ a cada 10 summons
      increaseRate: 0.05 // +5% de chance a cada summon sem sucesso
    },
    legendary: {
      guarantee: 50, // Garante 5★ a cada 50 summons
      increaseRate: 0.02 // +2% de chance a cada summon sem sucesso
    }
  };
  
  /**
   * Inicializa o pity system no state
   */
  window.initPitySystem = (state) => {
    if (!state.pity) {
      state.pity = {
        epic: 0,      // Contador para 4★
        legendary: 0,  // Contador para 5★
        bonusRate: {
          epic: 0,
          legendary: 0
        }
      };
    }
    return state.pity;
  };
  
  /**
   * Calcula se deve dar pity (garantia)
   */
  window.checkPity = (state, type = 'legendary') => {
    const pity = initPitySystem(state);
    const config = PITY_CONFIG[type];
    
    if (!config) return false;
    
    // Verifica se atingiu o limite de garantia
    if (pity[type] >= config.guarantee - 1) {
      return true; // GARANTIA!
    }
    
    return false;
  };
  
  /**
   * Obtém taxa de chance aumentada pelo pity
   */
  window.getPityBonus = (state, type = 'legendary') => {
    const pity = initPitySystem(state);
    const config = PITY_CONFIG[type];
    
    if (!config) return 0;
    
    // Calcula bonus baseado em quantos summons sem sucesso
    return pity[type] * config.increaseRate;
  };
  
  /**
   * Reset pity counter quando consegue o item
   */
  window.resetPity = (state, type) => {
    const pity = initPitySystem(state);
    pity[type] = 0;
    pity.bonusRate[type] = 0;
  };
  
  /**
   * Incrementa pity counter
   */
  window.incrementPity = (state, type) => {
    const pity = initPitySystem(state);
    pity[type]++;
    
    // Atualiza bonus rate
    const config = PITY_CONFIG[type];
    if (config) {
      pity.bonusRate[type] = pity[type] * config.increaseRate;
    }
  };
  
  /**
   * Obtém informações de pity para UI
   */
  window.getPityInfo = (state) => {
    const pity = initPitySystem(state);
    
    return {
      epic: {
        current: pity.epic,
        guarantee: PITY_CONFIG.epic.guarantee,
        remaining: PITY_CONFIG.epic.guarantee - pity.epic,
        bonusRate: (pity.bonusRate.epic * 100).toFixed(1) + '%'
      },
      legendary: {
        current: pity.legendary,
        guarantee: PITY_CONFIG.legendary.guarantee,
        remaining: PITY_CONFIG.legendary.guarantee - pity.legendary,
        bonusRate: (pity.bonusRate.legendary * 100).toFixed(1) + '%'
      }
    };
  };
  
  // ===== DAILY LOGIN REWARDS =====
  
  /**
   * Configuração de recompensas diárias (28 dias)
   */
  const DAILY_LOGIN_REWARDS = [
    // Semana 1
    { day: 1, reward: { gold: 5000 }, icon: '🪙' },
    { day: 2, reward: { crystals: 50 }, icon: '💎' },
    { day: 3, reward: { energy: 50 }, icon: '⚡' },
    { day: 4, reward: { gold: 10000 }, icon: '🪙' },
    { day: 5, reward: { crystals: 100 }, icon: '💎' },
    { day: 6, reward: { tickets_common: 5 }, icon: '🎫' },
    { day: 7, reward: { tickets_epic: 2, crystals: 200 }, icon: '🎟️', special: true },
    
    // Semana 2
    { day: 8, reward: { gold: 15000 }, icon: '🪙' },
    { day: 9, reward: { crystals: 150 }, icon: '💎' },
    { day: 10, reward: { energy: 100 }, icon: '⚡' },
    { day: 11, reward: { gold: 20000 }, icon: '🪙' },
    { day: 12, reward: { crystals: 200 }, icon: '💎' },
    { day: 13, reward: { tickets_common: 10 }, icon: '🎫' },
    { day: 14, reward: { tickets_epic: 3, crystals: 300 }, icon: '🎟️', special: true },
    
    // Semana 3
    { day: 15, reward: { gold: 25000 }, icon: '🪙' },
    { day: 16, reward: { crystals: 250 }, icon: '💎' },
    { day: 17, reward: { energy: 150 }, icon: '⚡' },
    { day: 18, reward: { gold: 30000 }, icon: '🪙' },
    { day: 19, reward: { crystals: 300 }, icon: '💎' },
    { day: 20, reward: { tickets_common: 15 }, icon: '🎫' },
    { day: 21, reward: { tickets_epic: 5, crystals: 500 }, icon: '🎟️', special: true },
    
    // Semana 4
    { day: 22, reward: { gold: 35000 }, icon: '🪙' },
    { day: 23, reward: { crystals: 350 }, icon: '💎' },
    { day: 24, reward: { energy: 200 }, icon: '⚡' },
    { day: 25, reward: { gold: 40000 }, icon: '🪙' },
    { day: 26, reward: { crystals: 400 }, icon: '💎' },
    { day: 27, reward: { tickets_common: 20 }, icon: '🎫' },
    { day: 28, reward: { tickets_epic: 10, crystals: 1000, gold: 50000 }, icon: '🎁', special: true, final: true }
  ];
  
  /**
   * Inicializa daily login rewards no state
   */
  window.initDailyRewards = (state) => {
    if (!state.dailyRewards) {
      state.dailyRewards = {
        currentDay: 0,
        lastClaim: null,
        claimed: []
      };
    }
    return state.dailyRewards;
  };
  
  /**
   * Verifica se pode reclamar daily reward
   */
  window.canClaimDailyReward = (state) => {
    const daily = initDailyRewards(state);
    const now = new Date();
    const today = now.toDateString();
    
    // Se nunca reivindicou ou último claim foi em outro dia
    if (!daily.lastClaim || daily.lastClaim !== today) {
      return true;
    }
    
    return false;
  };
  
  /**
   * Reclama daily reward
   */
  window.claimDailyReward = (state) => {
    const daily = initDailyRewards(state);
    
    if (!canClaimDailyReward(state)) {
      return { success: false, message: 'Já reivindicado hoje!' };
    }
    
    const now = new Date();
    const today = now.toDateString();
    
    // Incrementa dia (reseta após 28 dias)
    daily.currentDay = (daily.currentDay % 28) + 1;
    daily.lastClaim = today;
    
    const dayData = DAILY_LOGIN_REWARDS.find(d => d.day === daily.currentDay);
    if (!dayData) {
      return { success: false, message: 'Erro ao obter recompensa' };
    }
    
    // Dar recompensas
    const reward = dayData.reward;
    if (reward.gold) state.user.gold += reward.gold;
    if (reward.crystals) state.user.crystals += reward.crystals;
    if (reward.energy) state.user.energy += reward.energy;
    if (reward.tickets_common) state.user.tickets_common += reward.tickets_common;
    if (reward.tickets_epic) state.user.tickets_epic += reward.tickets_epic;
    
    daily.claimed.push(daily.currentDay);
    
    return {
      success: true,
      day: daily.currentDay,
      reward: reward,
      isSpecial: dayData.special,
      isFinal: dayData.final,
      message: formatDailyReward(reward)
    };
  };
  
  /**
   * Formata recompensa diária
   */
  function formatDailyReward(reward) {
    const parts = [];
    if (reward.gold) parts.push(`${reward.gold.toLocaleString()} 🪙`);
    if (reward.crystals) parts.push(`${reward.crystals} 💎`);
    if (reward.energy) parts.push(`${reward.energy} ⚡`);
    if (reward.tickets_common) parts.push(`${reward.tickets_common} 🎫`);
    if (reward.tickets_epic) parts.push(`${reward.tickets_epic} 🎟️`);
    return parts.join(', ');
  }
  
  /**
   * Obtém preview de recompensas (próximos 7 dias)
   */
  window.getDailyRewardsPreview = (state) => {
    const daily = initDailyRewards(state);
    const currentDay = daily.currentDay;
    
    return DAILY_LOGIN_REWARDS.slice(currentDay, currentDay + 7);
  };
  
  /**
   * Obtém todas as recompensas do mês
   */
  window.getAllDailyRewards = () => {
    return DAILY_LOGIN_REWARDS;
  };
  
  // Expor configurações
  window.DAILY_LOGIN_REWARDS = DAILY_LOGIN_REWARDS;
  window.PITY_CONFIG = PITY_CONFIG;
  
  console.log('✅ PitySystem.js carregado - Pity + Daily Rewards');
})();
