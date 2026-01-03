/**
 * BATTLE VISUAL EFFECTS INTEGRATION
 * Integra o sistema de efeitos visuais com a lógica de batalha
 */
(function() {
  'use strict';
  
  /**
   * Mostra efeito visual de ataque
   * @param {HTMLElement} attackerEl - Elemento do atacante
   * @param {HTMLElement} targetEl - Elemento do alvo
   * @param {Object} skill - Skill usada
   * @param {boolean} isCrit - Se foi crítico
   */
  window.showAttackEffect = async (attackerEl, targetEl, skill, isCrit = false) => {
    if (!window.battleAnimations || !attackerEl || !targetEl) return;
    
    const element = skill?.element || 'physical';
    
    if (isCrit) {
      await window.battleAnimations.criticalHit(attackerEl, targetEl);
    } else if (skill?.mp && skill.mp >= 50) {
      // Ultimate skill
      await window.battleAnimations.ultimateSkill(attackerEl, targetEl, element);
    } else {
      // Basic attack
      await window.battleAnimations.basicAttack(attackerEl, targetEl, element);
    }
  };
  
  /**
   * Mostra efeito de dano flutuante
   * @param {HTMLElement} targetEl - Elemento do alvo
   * @param {number} damage - Quantidade de dano
   * @param {boolean} isCrit - Se foi crítico
   */
  window.showDamageNumber = (targetEl, damage, isCrit = false) => {
    if (!targetEl || !window.particleSystem) return;
    
    const rect = targetEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Criar texto de dano
    const dmgText = document.createElement('div');
    dmgText.className = `dmg-text ${isCrit ? 'dmg-crit' : ''}`;
    dmgText.textContent = Math.floor(damage);
    dmgText.style.left = `${centerX}px`;
    dmgText.style.top = `${centerY}px`;
    
    document.body.appendChild(dmgText);
    setTimeout(() => dmgText.remove(), 800);
    
    // Partículas adicionais para crítico
    if (isCrit) {
      window.particleSystem.createStars(centerX, centerY, 8);
    }
  };
  
  /**
   * Mostra efeito de cura
   * @param {HTMLElement} targetEl - Elemento do alvo
   * @param {number} amount - Quantidade curada
   */
  window.showHealEffect = async (targetEl, amount) => {
    if (!targetEl || !window.battleAnimations) return;
    
    await window.battleAnimations.healEffect(targetEl);
    
    // Mostrar número de cura
    const rect = targetEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const healText = document.createElement('div');
    healText.className = 'dmg-text';
    healText.style.color = '#22c55e';
    healText.style.textShadow = '2px 2px 0px #000, 0 0 10px #22c55e';
    healText.textContent = `+${Math.floor(amount)}`;
    healText.style.left = `${centerX}px`;
    healText.style.top = `${centerY}px`;
    
    document.body.appendChild(healText);
    setTimeout(() => healText.remove(), 800);
  };
  
  /**
   * Mostra efeito de buff
   * @param {HTMLElement} targetEl - Elemento do alvo
   * @param {string} buffType - Tipo de buff
   */
  window.showBuffEffect = (targetEl, buffType = 'buff') => {
    if (!targetEl) return;
    
    // Criar aura de buff
    const aura = document.createElement('div');
    aura.className = buffType === 'debuff' ? 'debuff-aura' : 'buff-aura';
    
    targetEl.style.position = 'relative';
    targetEl.appendChild(aura);
    
    // Remover após 2 segundos
    setTimeout(() => aura.remove(), 2000);
  };
  
  /**
   * Mostra efeito de vitória
   * @param {HTMLElement} winnerEl - Elemento do vencedor
   */
  window.showVictoryEffect = async (winnerEl) => {
    if (!winnerEl || !window.battleAnimations) return;
    
    await window.battleAnimations.victoryAnimation(winnerEl);
  };
  
  /**
   * Mostra efeito de derrota
   * @param {HTMLElement} loserEl - Elemento do perdedor
   */
  window.showDefeatEffect = async (loserEl) => {
    if (!loserEl || !window.battleAnimations) return;
    
    await window.battleAnimations.defeatAnimation(loserEl);
  };
  
  /**
   * Mostra efeito de entrada de personagem na batalha
   * @param {HTMLElement} characterEl - Elemento do personagem
   * @param {string} side - 'left' ou 'right'
   */
  window.showCharacterEntrance = (characterEl, side = 'left') => {
    if (!characterEl) return;
    
    characterEl.classList.add(side === 'left' ? 'character-enter-left' : 'character-enter-right');
    
    setTimeout(() => {
      characterEl.classList.remove('character-enter-left', 'character-enter-right');
    }, 800);
  };
  
  /**
   * Mostra efeito de combo
   * @param {number} comboCount - Número do combo
   */
  window.showComboEffect = (comboCount) => {
    if (comboCount <= 1) return;
    
    const comboText = document.createElement('div');
    comboText.className = 'combo-flash';
    comboText.style.cssText = `
      position: fixed;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 3rem;
      font-weight: 900;
      color: #fbbf24;
      text-shadow: 0 0 20px #fbbf24, 2px 2px 0 #000;
      z-index: 1000;
      pointer-events: none;
      animation: combo-flash 0.5s ease-out;
    `;
    comboText.textContent = `${comboCount}x COMBO!`;
    
    document.body.appendChild(comboText);
    setTimeout(() => comboText.remove(), 500);
  };
  
  /**
   * Mostra efeito de level up
   * @param {HTMLElement} characterEl - Elemento do personagem
   */
  window.showLevelUpEffect = async (characterEl) => {
    if (!characterEl || !window.particleSystem) return;
    
    const rect = characterEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    characterEl.classList.add('levelup-glow');
    
    // Efeitos de partículas
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        window.particleSystem.createStars(centerX, centerY, 12);
        window.particleSystem.createBurst(centerX, centerY, 30, '#fbbf24');
      }, i * 300);
    }
    
    // Texto de level up
    const levelUpText = document.createElement('div');
    levelUpText.style.cssText = `
      position: fixed;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2.5rem;
      font-weight: 900;
      color: #fbbf24;
      text-shadow: 0 0 30px #fbbf24, 3px 3px 0 #000;
      z-index: 1000;
      pointer-events: none;
      animation: levelup-glow 2s ease-out;
    `;
    levelUpText.textContent = 'LEVEL UP!';
    
    document.body.appendChild(levelUpText);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    characterEl.classList.remove('levelup-glow');
    levelUpText.remove();
  };
  
  /**
   * Mostra efeito de summon épico
   * @param {HTMLElement} summonEl - Elemento do summon
   */
  window.showEpicSummonEffect = (summonEl) => {
    if (!summonEl) return;
    
    const aura = document.createElement('div');
    aura.className = 'summon-epic-aura';
    
    summonEl.style.position = 'relative';
    summonEl.appendChild(aura);
    
    setTimeout(() => aura.remove(), 3000);
  };
  
  /**
   * Mostra screen flash
   * @param {string} color - Cor do flash
   * @param {number} duration - Duração em ms
   */
  window.showScreenFlash = (color = 'white', duration = 150) => {
    const flash = document.getElementById('screen-flash');
    if (!flash) return;
    
    flash.style.background = color;
    flash.classList.remove('hidden');
    flash.classList.add('flash-screen');
    
    setTimeout(() => {
      flash.classList.add('hidden');
      flash.classList.remove('flash-screen');
    }, duration);
  };
  
  /**
   * Mostra loading screen com progresso
   * @param {string} text - Texto do loading
   * @param {Function} task - Tarefa assíncrona a executar
   */
  window.showLoadingWithProgress = async (text, task) => {
    if (!window.showLoading || !window.hideLoading) {
      // Fallback se sistema não estiver disponível
      return await task();
    }
    
    window.showLoading(text);
    
    try {
      const result = await task();
      window.hideLoading();
      return result;
    } catch (error) {
      window.hideLoading();
      throw error;
    }
  };
  
  console.log('✅ BattleVisualEffects.js carregado');
})();
