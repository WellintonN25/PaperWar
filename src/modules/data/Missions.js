/**
 * MISSIONS DATABASE
 * Define globalmente: window.DAILY_MISSIONS
 */
(function() {
  'use strict';
  
  window.DAILY_MISSIONS = [
    { id: 'login', desc: "Check-in Diário", type: "login", target: 1, reward: { type: "crystals", amount: 10 } },
    { id: 'battle_1', desc: "Vença 1 Batalha", type: "battle_win", target: 1, reward: { type: "gold", amount: 500 } },
    { id: 'battle_5', desc: "Vença 5 Batalhas", type: "battle_win", target: 5, reward: { type: "gold", amount: 2000 } },
    { id: 'battle_15', desc: "Vença 15 Batalhas", type: "battle_win", target: 15, reward: { type: "crystals", amount: 20 } },
    { id: 'energy_10', desc: "Gaste 10 Energia", type: "energy", target: 10, reward: { type: "xp", amount: 100 } },
    { id: 'energy_50', desc: "Gaste 50 Energia", type: "energy", target: 50, reward: { type: "energy", amount: 20 } },
    { id: 'summon_1', desc: "Realize 1 Invocação", type: "summon", target: 1, reward: { type: "gold", amount: 1000 } },
    { id: 'upgrade_1', desc: "Melhore 1 Equipamento", type: "upgrade", target: 1, reward: { type: "gold", amount: 500 } },
    { id: 'dungeon_1', desc: "Complete 1 Masmorra", type: "dungeon_clear", target: 1, reward: { type: "crystals", amount: 5 } },
    { id: 'dungeon_5', desc: "Complete 5 Masmorras", type: "dungeon_clear", target: 5, reward: { type: "items", id: "lootbox_common", amount: 1 } },
    { id: 'campaign_1', desc: "Jogue a Campanha", type: "campaign_play", target: 1, reward: { type: "gold", amount: 300 } },
    { id: 'levelup_1', desc: "Upe 1 Monstro", type: "levelup_mon", target: 1, reward: { type: "gold", amount: 500 } },
    { id: 'sell_1', desc: "Venda 1 Equipamento", type: "sell_eq", target: 1, reward: { type: "gold", amount: 200 } },
    { id: 'skillup_1', desc: "Melhore 1 Habilidade", type: "skillup", target: 1, reward: { type: "crystals", amount: 10 } },
    { id: 'complete_all', desc: "Complete 14 Missões", type: "meta_mission", target: 14, reward: { type: "crystals", amount: 100 } }
  ];
  
  console.log('✅ Missions.js carregado:', window.DAILY_MISSIONS.length, 'missões');
})();
