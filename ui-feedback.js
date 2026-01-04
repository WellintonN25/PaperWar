/**
 * UI FEEDBACK HELPERS
 * Funções auxiliares para aplicar feedbacks visuais em elementos da UI
 */
(function() {
  'use strict';
  
  // === RASTREAMENTO DE POSIÇÃO DE CLIQUE ===
  window.lastClickPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  // Rastrear todos os cliques globalmente
  document.addEventListener('click', function(e) {
    window.lastClickPosition = {
      x: e.clientX || e.pageX || window.innerWidth / 2,
      y: e.clientY || e.pageY || window.innerHeight / 2
    };
  }, true); // Use capture para pegar antes de outros handlers
  
  // === RIPPLE EFFECT EM BOTÕES ===
  window.addRippleEffect = (element) => {
    if (!element) return;
    
    element.addEventListener('click', function(e) {
      if (window.particleSystem) {
        window.particleSystem.createRipple(this, e.clientX, e.clientY);
      }
      
      // Adicionar classe de feedback
      this.classList.add('click-feedback');
      setTimeout(() => this.classList.remove('click-feedback'), 200);
    });
  };
  
  // Aplicar ripple em todos os botões automaticamente
  window.initRippleEffects = () => {
    const buttons = document.querySelectorAll('button, .btn, [onclick]');
    buttons.forEach(btn => {
      if (!btn.hasAttribute('data-ripple-init')) {
        window.addRippleEffect(btn);
        btn.setAttribute('data-ripple-init', 'true');
      }
    });
  };
  
  // === FEEDBACK DE COMPRA ===
  window.showPurchaseFeedback = (element) => {
    if (!element || !window.particleSystem) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Animação do elemento
    element.classList.add('purchase-success');
    setTimeout(() => element.classList.remove('purchase-success'), 600);
    
    // Partículas
    window.particleSystem.createPurchaseParticles(centerX, centerY, 15);
  };
  
  // === FEEDBACK DE SUMMON ===
  window.showSummonPortal = () => {
    if (!window.particleSystem) return;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    window.particleSystem.createSummonPortal(centerX, centerY);
  };
  
  window.showLegendarySummon = () => {
    if (!window.particleSystem) return;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Raios
    window.particleSystem.createSummonLightning(centerX, centerY, 8);
    
    // Confete
    setTimeout(() => {
      window.particleSystem.createConfetti(centerX, centerY, 50);
    }, 800);
  };
  
  // === FEEDBACK DE LEVEL UP ===
  window.showLevelUpFeedback = (characterElement) => {
    if (!window.particleSystem) return;
    
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    if (characterElement) {
      const rect = characterElement.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
    }
    
    // Explosão de luz
    window.particleSystem.createLightExplosion(centerX, centerY);
    
    // Texto animado
    window.particleSystem.createLevelUpText();
    
    // Partículas extras
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        window.particleSystem.createStars(centerX, centerY, 12);
        window.particleSystem.createBurst(centerX, centerY, 30, '#fbbf24');
      }, i * 300);
    }
  };
  
  // === FEEDBACK DE EQUIPAMENTO ===
  window.showEquipFeedback = (element) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Brilho
    element.classList.add('equipment-shine');
    setTimeout(() => element.classList.remove('equipment-shine'), 1000);
    
    // Partículas
    if (window.particleSystem) {
      window.particleSystem.createUpgradeParticles(centerX, centerY, 20);
    }
  };
  
  window.showUpgradeSuccess = (element) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Brilho intenso
    element.classList.add('equipment-shine');
    setTimeout(() => element.classList.remove('equipment-shine'), 1000);
    
    // Partículas douradas
    if (window.particleSystem) {
      window.particleSystem.createUpgradeParticles(centerX, centerY, 30);
      window.particleSystem.createStars(centerX, centerY, 8);
      window.particleSystem.createBurst(centerX, centerY, 20, '#fbbf24');
    }
  };
  
  window.showUpgradeFail = (element) => {
    if (!element) return;
    
    // Shake
    element.classList.add('upgrade-fail-shake');
    setTimeout(() => element.classList.remove('upgrade-fail-shake'), 500);
  };
  
  // === FEEDBACK DE NAVEGAÇÃO ===
  window.showTabSwitchFeedback = (tabElement) => {
    if (!tabElement || !window.particleSystem) return;
    
    const rect = tabElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    window.particleSystem.createTabSwitchParticles(centerX, centerY, 10);
  };
  
  window.addNotificationGlow = (element) => {
    if (!element) return;
    element.classList.add('notification-glow');
  };
  
  window.removeNotificationGlow = (element) => {
    if (!element) return;
    element.classList.remove('notification-glow');
  };
  
  window.addNewItemPulse = (element) => {
    if (!element) return;
    element.classList.add('new-item-pulse');
  };
  
  window.removeNewItemPulse = (element) => {
    if (!element) return;
    element.classList.remove('new-item-pulse');
  };
  
  // === HOVER GLOW ===
  window.addHoverGlow = (element) => {
    if (!element) return;
    element.classList.add('hover-glow');
  };
  
  // === BUTTON GLOW ===
  window.addButtonGlow = (element) => {
    if (!element) return;
    element.classList.add('btn-glow');
  };
  
  window.activateButtonGlow = (element) => {
    if (!element) return;
    element.classList.add('btn-glow-active');
  };
  
  window.deactivateButtonGlow = (element) => {
    if (!element) return;
    element.classList.remove('btn-glow-active');
  };
  
  // === AUTO-INICIALIZAÇÃO ===
  // Inicializar ripple effects quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => window.initRippleEffects(), 500);
    });
  } else {
    setTimeout(() => window.initRippleEffects(), 500);
  }
  
  // Re-inicializar ripple effects quando novos elementos forem adicionados
  const observer = new MutationObserver(() => {
    window.initRippleEffects();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('✅ UI Feedback Helpers carregado');
})();
