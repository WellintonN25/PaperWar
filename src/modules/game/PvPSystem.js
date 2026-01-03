/**
 * PVP SYSTEM
 * Sistema completo de batalhas PvP (Player vs Player)
 */
(function() {
  'use strict';
  
  /**
   * Gera oponentes PvP baseados no nível do jogador
   * @param {number} playerLevel - Nível do jogador
   * @param {number} count - Quantidade de oponentes para gerar
   * @returns {Array} Lista de oponentes
   */
  window.generatePvPOpponents = (playerLevel, count = 5) => {
    const opponents = [];
    const savedUsers = getAllSavedUsers();
    
    // Tenta usar jogadores reais primeiro
    const realPlayers = savedUsers
      .filter(user => user.name !== state.user.name)
      .filter(user => {
        const userLvl = user.lvl || 1;
        return Math.abs(userLvl - playerLevel) <= 5; // ±5 níveis
      });
    
    // Adiciona jogadores reais
    realPlayers.slice(0, Math.min(3, count)).forEach(user => {
      const leader = user.inventory && user.inventory[user.leaderIdx || 0];
      if (leader) {
        opponents.push({
          type: 'real_player',
          username: user.name,
          userIcon: user.icon || '🦸',
          userLevel: user.lvl || 1,
          rank: user.pvpRank || 1000,
          wins: user.pvpWins || 0,
          losses: user.pvpLosses || 0,
          team: user.inventory.slice(0, 1).map(mon => ({
            ...mon,
            currentHp: calculateStats(mon).hp,
            maxHp: calculateStats(mon).hp,
            isEnemy: true
          }))
        });
      }
    });
    
    // Completa com NPCs se necessário
    const remaining = count - opponents.length;
    for (let i = 0; i < remaining; i++) {
      const npcLevel = playerLevel + Math.floor(Math.random() * 11) - 5; // ±5 níveis
      const npcRank = 1000 + Math.floor(Math.random() * 500) - 250;
      
      const npcNames = [
        'Dragão Sombrio', 'Mestre das Trevas', 'Cavaleiro Místico',
        'Feiticeiro Arcano', 'Guerreiro Lendário', 'Ninja Fantasma',
        'Samurai Celestial', 'Arqueiro Supremo', 'Paladino Divino'
      ];
      
      const npcIcons = ['⚔️', '🛡️', '🏹', '🔮', '⚡', '🔥', '❄️', '🌟', '💀'];
      
      // Gera um monstro forte para o NPC
      const monster = generateEnemy(Math.max(1, npcLevel), 5);
      if (monster) {
        monster.lvl = Math.max(1, npcLevel);
        monster.stars = Math.min(6, Math.max(3, Math.floor(npcLevel / 10) + 2));
        
        opponents.push({
          type: 'npc',
          username: randomChoice(npcNames),
          userIcon: randomChoice(npcIcons),
          userLevel: Math.max(1, npcLevel),
          rank: npcRank,
          wins: Math.floor(Math.random() * 50),
          losses: Math.floor(Math.random() * 30),
          team: [monster]
        });
      }
    }
    
    // Ordena por rank (maior primeiro)
    return opponents.sort((a, b) => b.rank - a.rank);
  };
  
  /**
   * Obtém todos os usuários salvos
   * @returns {Array} Lista de usuários
   */
  function getAllSavedUsers() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('paperwar_save_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data && data.user) {
            users.push(data.user);
          }
        } catch (e) {
          // Ignora saves corrompidos
        }
      }
    }
    return users;
  }
  
  /**
   * Calcula recompensas PvP baseadas no resultado
   * @param {boolean} victory - Se venceu
   * @param {number} opponentRank - Rank do oponente
   * @returns {Object} Recompensas
   */
  window.calculatePvPRewards = (victory, opponentRank) => {
    const baseGold = 100;
    const baseCrystals = 5;
    const baseRankChange = 10;
    
    if (victory) {
      // Vitória: recompensas normais + ajuste de rank
      return {
        gold: Math.floor(baseGold * (1 + opponentRank / 2000)),
        crystals: baseCrystals,
        rankChange: +baseRankChange,
        message: 'Vitória! 🏆'
      };
    } else {
      // Derrota: pequena recompensa + perda de rank
      return {
        gold: Math.floor(baseGold * 0.3),
        crystals: 0,
        rankChange: -Math.floor(baseRankChange / 2),
        message: 'Derrota... 💔'
      };
    }
  };
  
  /**
   * Atualiza estatísticas PvP do jogador
   * @param {boolean} victory - Se venceu
   * @param {Object} rewards - Recompensas recebidas
   */
  window.updatePvPStats = (victory, rewards) => {
    if (!state.user.pvpRank) state.user.pvpRank = 1000;
    if (!state.user.pvpWins) state.user.pvpWins = 0;
    if (!state.user.pvpLosses) state.user.pvpLosses = 0;
    
    // Atualiza rank
    state.user.pvpRank = Math.max(0, state.user.pvpRank + rewards.rankChange);
    
    // Atualiza vitórias/derrotas
    if (victory) {
      state.user.pvpWins++;
    } else {
      state.user.pvpLosses++;
    }
    
    // Adiciona recompensas
    state.user.gold += rewards.gold;
    state.user.crystals += rewards.crystals;
    
    save();
  };
  
  /**
   * Obtém o título do rank baseado na pontuação
   * @param {number} rank - Pontuação de rank
   * @returns {Object} Informações do título
   */
  window.getPvPRankTitle = (rank) => {
    if (rank >= 2000) return { name: 'Lenda', icon: '👑', color: '#fbbf24' };
    if (rank >= 1800) return { name: 'Mestre', icon: '💎', color: '#a855f7' };
    if (rank >= 1600) return { name: 'Diamante', icon: '💠', color: '#3b82f6' };
    if (rank >= 1400) return { name: 'Platina', icon: '⭐', color: '#06b6d4' };
    if (rank >= 1200) return { name: 'Ouro', icon: '🥇', color: '#f59e0b' };
    if (rank >= 1000) return { name: 'Prata', icon: '🥈', color: '#94a3b8' };
    return { name: 'Bronze', icon: '🥉', color: '#a16207' };
  };
  
  /**
   * Simula uma batalha PvP automática (para farm rápido)
   * @param {Object} playerTeam - Time do jogador
   * @param {Object} enemyTeam - Time do oponente
   * @returns {boolean} True se jogador venceu
   */
  window.simulatePvPBattle = (playerTeam, enemyTeam) => {
    if (!playerTeam || !enemyTeam || playerTeam.length === 0 || enemyTeam.length === 0) {
      return false;
    }
    
    // Calcula poder total de cada time
    const calculateTeamPower = (team) => {
      return team.reduce((total, mon) => {
        const stats = calculateStats(mon);
        return total + (stats.atk || 100) + (stats.def || 100) + (stats.hp || 500) / 10;
      }, 0);
    };
    
    const playerPower = calculateTeamPower(playerTeam);
    const enemyPower = calculateTeamPower(enemyTeam);
    
    // Adiciona um pouco de aleatoriedade (±20%)
    const playerRoll = playerPower * (0.8 + Math.random() * 0.4);
    const enemyRoll = enemyPower * (0.8 + Math.random() * 0.4);
    
    return playerRoll > enemyRoll;
  };
  
  console.log('✅ PvPSystem.js carregado');
})();
