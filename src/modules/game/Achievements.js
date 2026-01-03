/**
 * ACHIEVEMENTS SYSTEM
 * Sistema completo de conquistas com categorias, progresso e recompensas
 */
(function() {
  'use strict';
  
  /**
   * Definição de todas as conquistas do jogo
   */
  const ACHIEVEMENTS = {
    // CATEGORIA: Coleção
    collector_bronze: {
      id: 'collector_bronze',
      name: 'Colecionador Iniciante',
      desc: 'Tenha 10 monstros diferentes',
      category: 'collection',
      icon: '📚',
      requirement: { type: 'unique_monsters', target: 10 },
      reward: { crystals: 50, gold: 1000 }
    },
    collector_silver: {
      id: 'collector_silver',
      name: 'Colecionador Experiente',
      desc: 'Tenha 20 monstros diferentes',
      category: 'collection',
      icon: '📚',
      requirement: { type: 'unique_monsters', target: 20 },
      reward: { crystals: 150, gold: 5000 }
    },
    collector_gold: {
      id: 'collector_gold',
      name: 'Mestre Colecionador',
      desc: 'Tenha todos os monstros do jogo',
      category: 'collection',
      icon: '📚',
      requirement: { type: 'unique_monsters', target: 32 },
      reward: { crystals: 500, tickets_epic: 5 }
    },
    
    // CATEGORIA: Batalha
    warrior_100: {
      id: 'warrior_100',
      name: 'Guerreiro Novato',
      desc: 'Vença 100 batalhas',
      category: 'battle',
      icon: '⚔️',
      requirement: { type: 'battles_won', target: 100 },
      reward: { crystals: 100, gold: 2000 }
    },
    warrior_500: {
      id: 'warrior_500',
      name: 'Guerreiro Veterano',
      desc: 'Vença 500 batalhas',
      category: 'battle',
      icon: '⚔️',
      requirement: { type: 'battles_won', target: 500 },
      reward: { crystals: 300, tickets_epic: 3 }
    },
    warrior_1000: {
      id: 'warrior_1000',
      name: 'Lenda de Batalha',
      desc: 'Vença 1000 batalhas',
      category: 'battle',
      icon: '⚔️',
      requirement: { type: 'battles_won', target: 1000 },
      reward: { crystals: 1000, tickets_epic: 10 }
    },
    
    // CATEGORIA: Summons
    summoner_10: {
      id: 'summoner_10',
      name: 'Invocador Iniciante',
      desc: 'Realize 10 invocações',
      category: 'summon',
      icon: '🔮',
      requirement: { type: 'summons_done', target: 10 },
      reward: { crystals: 50 }
    },
    summoner_100: {
      id: 'summoner_100',
      name: 'Invocador Mestre',
      desc: 'Realize 100 invocações',
      category: 'summon',
      icon: '🔮',
      requirement: { type: 'summons_done', target: 100 },
      reward: { crystals: 500, tickets_epic: 5 }
    },
    legendary_pull: {
      id: 'legendary_pull',
      name: 'Sorte Radiante!',
      desc: 'Invoque seu primeiro monstro 5★',
      category: 'summon',
      icon: '⭐',
      requirement: { type: 'legendary_pulled', target: 1 },
      reward: { crystals: 200, gold: 5000 }
    },
    
    // CATEGORIA: Dungeons
    dungeon_master_10: {
      id: 'dungeon_master_10',
      name: 'Explorador de Masmorras',
      desc: 'Complete 10 masmorras',
      category: 'dungeon',
      icon: '🏰',
      requirement: { type: 'dungeons_cleared', target: 10 },
      reward: { crystals: 100, gold: 3000 }
    },
    dungeon_master_50: {
      id: 'dungeon_master_50',
      name: 'Conquistador de Masmorras',
      desc: 'Complete 50 masmorras',
      category: 'dungeon',
      icon: '🏰',
      requirement: { type: 'dungeons_cleared', target: 50 },
      reward: { crystals: 500, tickets_epic: 3 }
    },
    floor_10: {
      id: 'floor_10',
      name: 'Desafiante do Andar 10',
      desc: 'Complete o andar 10 de qualquer masmorra',
      category: 'dungeon',
      icon: '🏆',
      requirement: { type: 'dungeon_floor', target: 10 },
      reward: { crystals: 300, tickets_epic: 2 }
    },
    
    // CATEGORIA: Equipamentos
    equipment_collector: {
      id: 'equipment_collector',
      name: 'Coletor de Equipamentos',
      desc: 'Tenha 50 equipamentos',
      category: 'equipment',
      icon: '⚔️',
      requirement: { type: 'equipment_owned', target: 50 },
      reward: { crystals: 100, gold: 5000 }
    },
    legendary_equipment: {
      id: 'legendary_equipment',
      name: 'Equipamento Lendário!',
      desc: 'Obtenha seu primeiro equipamento lendário',
      category: 'equipment',
      icon: '✨',
      requirement: { type: 'legendary_equipment', target: 1 },
      reward: { crystals: 200, gold: 10000 }
    },
    max_upgrade: {
      id: 'max_upgrade',
      name: 'Mestre Ferreiro',
      desc: 'Melhore um equipamento ao nível máximo (+15)',
      category: 'equipment',
      icon: '🔨',
      requirement: { type: 'equipment_max_level', target: 1 },
      reward: { crystals: 300, gold: 15000 }
    },
    
    // CATEGORIA: Progressão
    level_10: {
      id: 'level_10',
      name: 'Nível 10',
      desc: 'Alcance o nível 10',
      category: 'progression',
      icon: '📈',
      requirement: { type: 'player_level', target: 10 },
      reward: { crystals: 100, energy: 50 }
    },
    level_25: {
      id: 'level_25',
      name: 'Nível 25',
      desc: 'Alcance o nível 25',
      category: 'progression',
      icon: '📈',
      requirement: { type: 'player_level', target: 25 },
      reward: { crystals: 300, tickets_epic: 3 }
    },
    level_50: {
      id: 'level_50',
      name: 'Nível 50',
      desc: 'Alcance o nível 50',
      category: 'progression',
      icon: '📈',
      requirement: { type: 'player_level', target: 50 },
      reward: { crystals: 1000, tickets_epic: 10 }
    },
    
    // CATEGORIA: Riqueza
    millionaire: {
      id: 'millionaire',
      name: 'Milionário',
      desc: 'Tenha 100.000 de ouro ao mesmo tempo',
      category: 'wealth',
      icon: '💰',
      requirement: { type: 'gold_owned', target: 100000 },
      reward: { crystals: 500 }
    },
    crystal_hoarder: {
      id: 'crystal_hoarder',
      name: 'Acumulador de Cristais',
      desc: 'Tenha 1.000 cristais ao mesmo tempo',
      category: 'wealth',
      icon: '💎',
      requirement: { type: 'crystals_owned', target: 1000 },
      reward: { gold: 50000 }
    }
  };
  
  /**
   * Categorias de achievements
   */
  const ACHIEVEMENT_CATEGORIES = {
    collection: { name: 'Coleção', icon: '📚', color: '#3b82f6' },
    battle: { name: 'Batalha', icon: '⚔️', color: '#ef4444' },
    summon: { name: 'Invocação', icon: '🔮', color: '#a855f7' },
    dungeon: { name: 'Masmorras', icon: '🏰', color: '#f59e0b' },
    equipment: { name: 'Equipamentos', icon: '⚔️', color: '#10b981' },
    progression: { name: 'Progressão', icon: '📈', color: '#06b6d4' },
    wealth: { name: 'Riqueza', icon: '💰', color: '#fbbf24' }
  };
  
  /**
   * Inicializa os achievements no state
   */
  window.initAchievements = (state) => {
    if (!state.achievements) {
      state.achievements = {
        completed: [],
        claimed: [],
        progress: {}
      };
    }
    return state.achievements;
  };
  
  /**
   * Atualiza progresso de um achievement
   */
  window.trackAchievement = (state, type, value = 1) => {
    const achievements = initAchievements(state);
    
    // Encontra achievements do tipo
    Object.values(ACHIEVEMENTS).forEach(ach => {
      if (ach.requirement.type !== type) return;
      if (achievements.completed.includes(ach.id)) return;
      
      // Atualiza progresso
      if (!achievements.progress[ach.id]) {
        achievements.progress[ach.id] = 0;
      }
      
      achievements.progress[ach.id] = Math.max(
        achievements.progress[ach.id],
        value
      );
      
      // Verifica se completou
      if (achievements.progress[ach.id] >= ach.requirement.target) {
        achievements.completed.push(ach.id);
        showToast(`🏆 Achievement: ${ach.name}!`, 'success');
      }
    });
  };
  
  /**
   * Reivindica recompensa de achievement
   */
  window.claimAchievement = (state, achievementId) => {
    const achievements = initAchievements(state);
    const ach = ACHIEVEMENTS[achievementId];
    
    if (!ach) return { success: false, message: 'Achievement não encontrado' };
    if (!achievements.completed.includes(achievementId)) {
      return { success: false, message: 'Achievement não completado' };
    }
    if (achievements.claimed.includes(achievementId)) {
      return { success: false, message: 'Recompensa já reivindicada' };
    }
    
    // Dar recompensas
    if (ach.reward.crystals) state.user.crystals += ach.reward.crystals;
    if (ach.reward.gold) state.user.gold += ach.reward.gold;
    if (ach.reward.energy) state.user.energy += ach.reward.energy;
    if (ach.reward.tickets_common) state.user.tickets_common += ach.reward.tickets_common;
    if (ach.reward.tickets_epic) state.user.tickets_epic += ach.reward.tickets_epic;
    
    achievements.claimed.push(achievementId);
    
    return {
      success: true,
      reward: ach.reward,
      message: `Recompensa reivindicada: ${formatReward(ach.reward)}`
    };
  };
  
  /**
   * Formata recompensa para exibição
   */
  function formatReward(reward) {
    const parts = [];
    if (reward.crystals) parts.push(`${reward.crystals} 💎`);
    if (reward.gold) parts.push(`${reward.gold} 🪙`);
    if (reward.energy) parts.push(`${reward.energy} ⚡`);
    if (reward.tickets_common) parts.push(`${reward.tickets_common} 🎫`);
    if (reward.tickets_epic) parts.push(`${reward.tickets_epic} 🎟️`);
    return parts.join(', ');
  }
  
  /**
   * Obtém progresso de um achievement
   */
  window.getAchievementProgress = (state, achievementId) => {
    const achievements = initAchievements(state);
    const ach = ACHIEVEMENTS[achievementId];
    
    if (!ach) return { current: 0, target: 0, percent: 0 };
    
    const current = achievements.progress[achievementId] || 0;
    const target = ach.requirement.target;
    const percent = Math.min(100, (current / target) * 100);
    
    return {
      current,
      target,
      percent,
      completed: achievements.completed.includes(achievementId),
      claimed: achievements.claimed.includes(achievementId)
    };
  };
  
  /**
   * Obtém todos achievements por categoria
   */
  window.getAchievementsByCategory = () => {
    const byCategory = {};
    
    Object.values(ACHIEVEMENTS).forEach(ach => {
      if (!byCategory[ach.category]) {
        byCategory[ach.category] = [];
      }
      byCategory[ach.category].push(ach);
    });
    
    return byCategory;
  };
  
  /**
   * Obtém estatísticas de achievements
   */
  window.getAchievementStats = (state) => {
    const achievements = initAchievements(state);
    const total = Object.keys(ACHIEVEMENTS).length;
    const completed = achievements.completed.length;
    const claimed = achievements.claimed.length;
    const unclaimed = completed - claimed;
    
    return {
      total,
      completed,
      claimed,
      unclaimed,
      percent: Math.floor((completed / total) * 100)
    };
  };
  
  // Expor achievements
  window.ACHIEVEMENTS = ACHIEVEMENTS;
  window.ACHIEVEMENT_CATEGORIES = ACHIEVEMENT_CATEGORIES;
  
  console.log('✅ Achievements.js carregado:', Object.keys(ACHIEVEMENTS).length, 'conquistas');
})();
