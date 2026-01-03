/**
 * GAME CONSTANTS
 * Define globalmente: window.MAX_LEVELS, window.MAP_DATA, window.EQ_RARITY, window.EQUIPMENT_SETS
 */
(function() {
  'use strict';
  
  window.MAX_LEVELS = {
    1: 5,
    2: 10,
    3: 20,
    4: 30,
    5: 40,
    6: 50,
  };

  window.MAP_DATA = [
    { name: "Floresta do Alvorecer", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
    { name: "Pântano Sombrio", img: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&q=80&w=800" },
    { name: "Deserto de Oblívio", img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=800" },
    { name: "Picos de Gelo", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { name: "Vulcão de Enfra", img: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=800" },
    { name: "Vale dos Ventos", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800" },
    { name: "Ruínas de Aether", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
    { name: "Caverna Abissal", img: "https://images.unsplash.com/photo-1524334220913-91136e0d9b43?auto=format&fit=crop&q=80&w=800" },
    { name: "Santuário Celeste", img: "https://images.unsplash.com/photo-1444491741275-3747c33cc99b?auto=format&fit=crop&q=80&w=800" },
    { name: "Domínio do Chaos", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000" }
  ];

  window.EQ_RARITY = {
    common: { name: "Comum", mult: 1, color: "rarity-common" },
    rare: { name: "Raro", mult: 1.5, color: "rarity-rare" },
    epic: { name: "Épico", mult: 2.2, color: "rarity-epic" },
    legendary: { name: "Lendário", mult: 3.5, color: "rarity-legendary" },
  };

  window.EQUIPMENT_SETS = {
    energy: { name: "Energy", icon: "💚", color: "#22c55e", pieces: 2, bonus: { type: "hp", value: 15, display: "+15% HP" }, display: "HP +15%" },
    guard: { name: "Guard", icon: "🛡️", color: "#3b82f6", pieces: 2, bonus: { type: "def", value: 15, display: "+15% DEF" }, display: "DEF +15%" },
    blade: { name: "Blade", icon: "⚔️", color: "#ef4444", pieces: 2, bonus: { type: "crit", value: 12, display: "+12% CRIT" }, display: "CRIT +12%" },
    rage: { name: "Rage", icon: "💢", color: "#dc2626", pieces: 2, bonus: { type: "cdmg", value: 40, display: "+40% CDMG" }, display: "CDMG +40%" },
    swift: { name: "Swift", icon: "💨", color: "#06b6d4", pieces: 2, bonus: { type: "spd", value: 25, display: "+25% SPD" }, display: "SPD +25%" },
    fatal: { name: "Fatal", icon: "🔥", color: "#f97316", pieces: 2, bonus: { type: "atk", value: 35, display: "+35% ATK" }, display: "ATK +35%" },
    vampire: { name: "Vampire", icon: "🧛", color: "#7c3aed", pieces: 2, bonus: { type: "lifesteal", value: 35, display: "Recupera 35% do dano" }, display: "Life Steal +35%" },
    violent: { name: "Violent", icon: "⚡", color: "#a855f7", pieces: 2, bonus: { type: "extra_turn", value: 22, display: "22% turno extra" }, display: "Turno Extra 22%" }
  };
  
  console.log('✅ GameConstants.js carregado');
})();
