/**
 * SKILLS DATABASE
 * Define globalmente: window.SKILLS
 */
(function() {
  'use strict';
  
  window.SKILLS = {
    melee: { n: "Ataque", p: 1.0, icon: "🗡️", type: "phys", mp: 0 },
    // TIER 2 (LOW) - 20 MP
    bolt: { n: "Raio", p: 1.5, icon: "⚡", type: "lightning", mp: 20 },
    water: { n: "Jato", p: 1.4, icon: "💧", type: "water", mp: 20 },
    fire: { n: "Brasa", p: 1.6, icon: "🔥", type: "fire", mp: 20 },
    void_slash: { n: "Corte Vazio", p: 1.8, icon: "🟣", type: "void", mp: 25 },
    rock_throw: { n: "Rocha", p: 1.5, icon: "🪨", type: "earth", mp: 20 },
    leaf_cutter: { n: "Folha", p: 1.4, icon: "🍃", type: "nature", mp: 20 },
    wind_blade: { n: "Lâmina de Vento", p: 1.7, icon: "🌪️", type: "wind_blade", mp: 25 },
    
    // TIER 3 (MID) - 30-40 MP
    flame_burst: { n: "Explosão", p: 2.1, icon: "💥", type: "fire", mp: 35 },
    ice_shards: { n: "Estilhaços", p: 1.8, icon: "🧊", type: "ice_shards", mp: 25 },
    poison_cloud: { n: "Nuvem Tóxica", p: 1.5, icon: "☠️", type: "poison_cloud", mp: 30 },
    shadow_strike: { n: "Golpe Sombrio", p: 2.2, icon: "🧛", type: "shadow_strike", mp: 30 },
    blood_drain: { n: "Drenar Vida", p: 1.6, icon: "🩸", type: "blood_drain", mp: 35 },
    earth_shatter: { n: "Tremor", p: 2.1, icon: "🧱", type: "earth_shatter", mp: 40 },
    chain_lightning: { n: "Raio em Cadeia", p: 1.75, icon: "🔗", type: "chain_lightning", mp: 30 },
    lava_burst: { n: "Tsunami de Lava", p: 2.2, icon: "🌋", type: "lava_burst", mp: 35 },
    spectral_blade: { n: "Lâmina Espectral", p: 1.95, icon: "👻", type: "spectral_blade", mp: 32 },
    crystal_spear: { n: "Lança de Cristal", p: 1.9, icon: "💎", type: "crystal_spear", mp: 30 },

    // TIER 4 (HIGH) - 45-55 MP
    tornado: { n: "Tornado", p: 2.5, icon: "🌪️", type: "wind_blade", mp: 45 },
    tidal_wave: { n: "Maremoto", p: 2.4, icon: "🌊", type: "water", mp: 45 },
    boulder_crash: { n: "Desmoronamento", p: 2.6, icon: "🪨", type: "earth", mp: 50 },
    thunder_storm: { n: "Tempestade", p: 2.5, icon: "⛈️", type: "thunder_storm", mp: 50 },
    holy_beam: { n: "Luz Divina", p: 3.0, icon: "✨", type: "holy_beam", mp: 45 },
    meteor_strike: { n: "Meteoro", p: 3.2, icon: "☄️", type: "meteor_strike", mp: 55 },
    arcane_barrage: { n: "Mísseis Arcanos", p: 2.0, icon: "🔮", type: "arcane_barrage", mp: 35 },

    // TIER 5 (ULTIMATE/SUPREME) - 60+ MP
    sup_lightning: { n: "Julgamento", p: 3.0, icon: "🌩️", type: "lightning_sup", mp: 50 },
    sup_water: { n: "Tsunami", p: 2.8, icon: "🌊", type: "water_sup", mp: 50 },
    sup_fire: { n: "Chuva Meteoros", p: 3.2, icon: "☄️", type: "fire_sup", mp: 50 },
    sup_earth: { n: "Avalanche", p: 3.0, icon: "🌋", type: "earth_sup", mp: 50 },
    sup_void: { n: "Devastação", p: 3.5, icon: "⚫", type: "void_sup", mp: 60 },
    sup_dragon_breath: { n: "Hálito Dragão", p: 4.0, icon: "🐲", type: "sup_dragon_breath", mp: 80 },
    sup_celestial_judgement: { n: "Espada Celestial", p: 4.5, icon: "⚖️", type: "sup_celestial_judgement", mp: 90 },
    sup_forest_fury: { n: "Fúria Florestal", p: 3.7, icon: "🌲", type: "sup_forest_fury", mp: 65 },
    sup_frozen_eternity: { n: "Eternidade Congelada", p: 4.0, icon: "🥶", type: "sup_frozen_eternity", mp: 75 },
    sup_infernal_apocalypse: { n: "Apocalipse Infernal", p: 4.3, icon: "👺", type: "sup_infernal_apocalypse", mp: 85 },
    sup_void_collapse: { n: "Colapso do Vazio", p: 4.6, icon: "🕳️", type: "sup_void_collapse", mp: 95 },
    sup_plasma_vortex: { n: "Vórtice Plasma", p: 3.9, icon: "🌀", type: "sup_plasma_vortex", mp: 75 },
    sup_black_lotus: { n: "Lótus Negra", p: 3.8, icon: "🪷", type: "sup_black_lotus", mp: 70 },
    sup_silver_rain: { n: "Chuva de Prata", p: 3.5, icon: "🌧️", type: "sup_silver_rain", mp: 60 },
    sup_ether_chains: { n: "Cadeias Éter", p: 3.2, icon: "⛓️", type: "sup_ether_chains", mp: 55 },
    sup_gravity_pulse: { n: "Pulso Gravitacional", p: 3.6, icon: "🪐", type: "sup_gravity_pulse", mp: 65 },
    sup_ice_butterflies: { n: "Butterflies Ice", p: 3.4, icon: "🦋", type: "sup_ice_butterflies", mp: 60 },
    sup_dark_comet: { n: "Cometa Sombrio", p: 4.2, icon: "🌠", type: "sup_dark_comet", mp: 85 },
    sup_cosmic_storm: { n: "Tempestade Cósmica", p: 3.9, icon: "🌌", type: "sup_cosmic_storm", mp: 70 },
    sup_natures_wrath: { n: "Ira da Natureza", p: 3.8, icon: "🥀", type: "sup_natures_wrath", mp: 68 },
  };
  
  console.log('✅ Skills.js carregado:', Object.keys(window.SKILLS).length, 'habilidades');
})();
