// ============================================
// SISTEMA DE EFEITOS VISUAIS AVANÇADOS
// ============================================

// === LOADING SCREEN SYSTEM ===
class LoadingScreen {
  constructor() {
    this.element = null;
    this.progressBar = null;
    this.init();
  }

  init() {
    // Create loading screen element
    this.element = document.createElement('div');
    this.element.className = 'loading-screen';
    this.element.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Carregando...</div>
      <div class="loading-progress">
        <div class="loading-progress-bar"></div>
      </div>
    `;
    document.body.appendChild(this.element);
    this.progressBar = this.element.querySelector('.loading-progress-bar');
  }

  show(text = 'Carregando...') {
    this.element.querySelector('.loading-text').textContent = text;
    this.element.classList.add('active');
    this.setProgress(0);
  }

  hide() {
    this.element.classList.remove('active');
  }

  setProgress(percent) {
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    }
  }
}

// === PARTICLE SYSTEM ===
class ParticleSystem {
  constructor(container) {
    this.container = container || document.body;
  }

  // Criar partículas de explosão
  createBurst(x, y, count = 20, color = '#fbbf24') {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle particle-burst';
      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: ${color};
        --tx: ${(Math.random() - 0.5) * 200}px;
        --ty: ${(Math.random() - 0.5) * 200}px;
      `;
      this.container.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  }

  // Criar partículas flutuantes
  createFloating(x, y, count = 10, color = '#6366f1') {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 50}px;
        top: ${y}px;
        width: ${3 + Math.random() * 6}px;
        height: ${3 + Math.random() * 6}px;
        background: ${color};
        animation-delay: ${Math.random() * 0.5}s;
      `;
      this.container.appendChild(particle);
      setTimeout(() => particle.remove(), 2000);
    }
  }

  // Criar partículas de estrelas
  createStars(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      star.textContent = '✨';
      const angle = (Math.PI * 2 * i) / count;
      const distance = 50 + Math.random() * 30;
      star.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        --tx: ${Math.cos(angle) * distance}px;
        --ty: ${Math.sin(angle) * distance}px;
      `;
      this.container.appendChild(star);
      setTimeout(() => star.remove(), 1000);
    }
  }

  // Criar onda de choque
  createShockwave(x, y, color = 'rgba(255, 255, 255, 0.8)') {
    const wave = document.createElement('div');
    wave.className = 'shockwave';
    wave.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      border-color: ${color};
      margin-left: -10px;
      margin-top: -10px;
    `;
    this.container.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
  }

  // Criar rastro de movimento
  createMotionTrail(element) {
    const trail = element.cloneNode(true);
    trail.className = 'motion-trail';
    element.parentElement.insertBefore(trail, element);
    setTimeout(() => trail.remove(), 300);
  }

  // Efeito de fogo
  createFireEffect(x, y) {
    for (let i = 0; i < 15; i++) {
      const flame = document.createElement('div');
      flame.className = 'particle';
      const colors = ['#ff4500', '#ff6347', '#ffa500', '#ffff00'];
      flame.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 40}px;
        top: ${y}px;
        width: ${8 + Math.random() * 12}px;
        height: ${8 + Math.random() * 12}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50% 50% 0 0;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      this.container.appendChild(flame);
      setTimeout(() => flame.remove(), 2000);
    }
  }

  // Efeito de água
  createWaterEffect(x, y) {
    for (let i = 0; i < 12; i++) {
      const drop = document.createElement('div');
      drop.className = 'particle';
      drop.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 60}px;
        top: ${y}px;
        width: ${4 + Math.random() * 8}px;
        height: ${6 + Math.random() * 12}px;
        background: linear-gradient(180deg, #60a5fa, #2563eb);
        border-radius: 50% 50% 50% 0;
        animation-delay: ${Math.random() * 0.2}s;
      `;
      this.container.appendChild(drop);
      setTimeout(() => drop.remove(), 2000);
    }
  }

  // Efeito de raio
  createLightningEffect(x, y) {
    const lightning = document.createElement('div');
    lightning.className = 'vfx-lightning-strike lightning-strike-effect';
    lightning.style.cssText = `
      left: ${x}px;
      top: 0;
      height: ${y}px;
    `;
    this.container.appendChild(lightning);
    setTimeout(() => lightning.remove(), 300);
  }

  // Efeito de cura
  createHealEffect(x, y) {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 40}px;
        top: ${y + Math.random() * 50}px;
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        background: #22c55e;
        box-shadow: 0 0 10px #22c55e;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      this.container.appendChild(particle);
      setTimeout(() => particle.remove(), 2000);
    }
  }

  // === NOVOS FEEDBACKS VISUAIS ===

  // Ripple effect (botões)
  createRipple(element, x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x - rect.left - size / 2}px;
      top: ${y - rect.top - size / 2}px;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  // Confete (summons lendários)
  createConfetti(x, y, count = 50) {
    const colors = ['#fbbf24', '#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#ec4899'];
    
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 100}px;
        top: ${y}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-delay: ${Math.random() * 0.5}s;
      `;
      this.container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  // Portal de summon
  createSummonPortal(x, y) {
    const portal = document.createElement('div');
    portal.className = 'summon-portal';
    portal.style.cssText = `
      left: ${x - 100}px;
      top: ${y - 100}px;
    `;
    this.container.appendChild(portal);
    setTimeout(() => portal.remove(), 2000);
  }

  // Raios de summon 5 estrelas
  createSummonLightning(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const lightning = document.createElement('div');
        lightning.className = 'summon-lightning';
        lightning.style.cssText = `
          left: ${x + (Math.random() - 0.5) * 200}px;
          top: 0;
        `;
        this.container.appendChild(lightning);
        setTimeout(() => lightning.remove(), 300);
      }, i * 100);
    }
  }

  // Explosão de luz (level up)
  createLightExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'light-explosion';
    explosion.style.cssText = `
      left: ${x - 150}px;
      top: ${y - 150}px;
    `;
    this.container.appendChild(explosion);
    setTimeout(() => explosion.remove(), 1000);
  }

  // Texto de level up
  createLevelUpText() {
    const text = document.createElement('div');
    text.className = 'levelup-text';
    text.textContent = 'LEVEL UP!';
    this.container.appendChild(text);
    setTimeout(() => text.remove(), 2000);
  }

  // Partículas de upgrade (equipamento)
  createUpgradeParticles(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'upgrade-particle';
      particle.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 60}px;
        top: ${y}px;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      this.container.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  }

  // Partículas de compra
  createPurchaseParticles(x, y, count = 15) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'purchase-particles';
      const angle = (Math.PI * 2 * i) / count;
      const distance = 50 + Math.random() * 30;
      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        --tx: ${Math.cos(angle) * distance}px;
        --ty: ${Math.sin(angle) * distance}px;
      `;
      this.container.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  }

  // Partículas de troca de aba
  createTabSwitchParticles(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'tab-switch-particle';
      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        --tx: ${(Math.random() - 0.5) * 100}px;
        --ty: ${(Math.random() - 0.5) * 100}px;
      `;
      this.container.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  }
}

// === SCREEN TRANSITION SYSTEM ===
class ScreenTransition {
  static async fadeTransition(fromView, toView, duration = 300) {
    return new Promise((resolve) => {
      if (fromView) {
        fromView.style.opacity = '1';
        fromView.style.transition = `opacity ${duration}ms ease`;
        fromView.style.opacity = '0';
        
        setTimeout(() => {
          fromView.classList.add('hidden-view');
          if (toView) {
            toView.classList.remove('hidden-view');
            toView.style.opacity = '0';
            toView.style.transition = `opacity ${duration}ms ease`;
            setTimeout(() => {
              toView.style.opacity = '1';
              resolve();
            }, 10);
          } else {
            resolve();
          }
        }, duration);
      } else if (toView) {
        toView.classList.remove('hidden-view');
        toView.style.opacity = '0';
        toView.style.transition = `opacity ${duration}ms ease`;
        setTimeout(() => {
          toView.style.opacity = '1';
          resolve();
        }, 10);
      } else {
        resolve();
      }
    });
  }

  static async slideTransition(fromView, toView, direction = 'up') {
    return new Promise((resolve) => {
      if (fromView) {
        fromView.classList.add('view-transition-exit');
        setTimeout(() => {
          fromView.classList.add('hidden-view');
          fromView.classList.remove('view-transition-exit');
          
          if (toView) {
            toView.classList.remove('hidden-view');
            toView.classList.add('view-transition-enter');
            setTimeout(() => {
              toView.classList.remove('view-transition-enter');
              resolve();
            }, 400);
          } else {
            resolve();
          }
        }, 300);
      } else if (toView) {
        toView.classList.remove('hidden-view');
        toView.classList.add('view-transition-enter');
        setTimeout(() => {
          toView.classList.remove('view-transition-enter');
          resolve();
        }, 400);
      } else {
        resolve();
      }
    });
  }
}

// === BATTLE ANIMATION SYSTEM ===
class BattleAnimations {
  constructor(particleSystem) {
    this.particles = particleSystem;
  }

  // Animação de ataque básico
  async basicAttack(attackerEl, targetEl, element = 'physical') {
    if (!attackerEl || !targetEl) return;

    // Criar rastro de movimento
    this.particles.createMotionTrail(attackerEl);

    // Animação de ataque
    attackerEl.classList.add('attack-slash');
    
    await this.delay(250);

    // Efeito no alvo
    const targetRect = targetEl.getBoundingClientRect();
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;

    // Partículas baseadas no elemento
    if (element === 'fire') {
      this.particles.createFireEffect(centerX, centerY);
    } else if (element === 'water') {
      this.particles.createWaterEffect(centerX, centerY);
    } else if (element === 'lightning') {
      this.particles.createLightningEffect(centerX, centerY);
    } else {
      this.particles.createBurst(centerX, centerY, 15, '#ffffff');
    }

    targetEl.classList.add('anim-hit-recoil');

    await this.delay(400);

    attackerEl.classList.remove('attack-slash');
    targetEl.classList.remove('anim-hit-recoil');
  }

  // Animação de crítico
  async criticalHit(attackerEl, targetEl) {
    if (!attackerEl || !targetEl) return;

    attackerEl.classList.add('attack-spin');
    
    await this.delay(300);

    const targetRect = targetEl.getBoundingClientRect();
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;

    // Efeitos múltiplos
    this.particles.createShockwave(centerX, centerY, 'rgba(251, 191, 36, 0.8)');
    this.particles.createBurst(centerX, centerY, 30, '#fbbf24');
    this.particles.createStars(centerX, centerY, 12);

    targetEl.classList.add('critical-hit');

    await this.delay(500);

    attackerEl.classList.remove('attack-spin');
    targetEl.classList.remove('critical-hit');
  }

  // Animação de ultimate
  async ultimateSkill(attackerEl, targetEl, element = 'void') {
    if (!attackerEl || !targetEl) return;

    // Fase 1: Carregamento
    attackerEl.classList.add('ultimate-charge');
    
    const attackerRect = attackerEl.getBoundingClientRect();
    const centerX = attackerRect.left + attackerRect.width / 2;
    const centerY = attackerRect.top + attackerRect.height / 2;

    // Partículas de carregamento
    for (let i = 0; i < 3; i++) {
      await this.delay(300);
      this.particles.createFloating(centerX, centerY, 8, '#fbbf24');
    }

    await this.delay(200);

    // Fase 2: Liberação
    attackerEl.classList.remove('ultimate-charge');
    attackerEl.classList.add('ultimate-release');

    const targetRect = targetEl.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    // Efeito massivo no alvo
    this.particles.createShockwave(targetX, targetY, 'rgba(168, 85, 247, 0.9)');
    this.particles.createBurst(targetX, targetY, 50, '#a855f7');
    
    if (element === 'fire') {
      this.particles.createFireEffect(targetX, targetY);
      this.particles.createFireEffect(targetX, targetY);
    } else if (element === 'water') {
      this.particles.createWaterEffect(targetX, targetY);
      this.particles.createWaterEffect(targetX, targetY);
    } else if (element === 'lightning') {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => this.particles.createLightningEffect(targetX, targetY), i * 100);
      }
    }

    targetEl.classList.add('critical-hit');

    await this.delay(800);

    attackerEl.classList.remove('ultimate-release');
    targetEl.classList.remove('critical-hit');
  }

  // Animação de cura
  async healEffect(targetEl) {
    if (!targetEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;

    targetEl.classList.add('heal-effect');
    this.particles.createHealEffect(centerX, centerY);
    this.particles.createStars(centerX, centerY, 6);

    await this.delay(1000);

    targetEl.classList.remove('heal-effect');
  }

  // Animação de vitória
  async victoryAnimation(winnerEl) {
    if (!winnerEl) return;

    const rect = winnerEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    winnerEl.classList.add('victory-celebration');
    
    // Efeitos de celebração
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.particles.createStars(centerX, centerY, 8);
        this.particles.createBurst(centerX, centerY, 20, '#fbbf24');
      }, i * 200);
    }

    await this.delay(1000);

    winnerEl.classList.remove('victory-celebration');
  }

  // Animação de derrota
  async defeatAnimation(loserEl) {
    if (!loserEl) return;

    loserEl.classList.add('defeat-fall');

    await this.delay(1000);

    loserEl.classList.remove('defeat-fall');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// === INICIALIZAÇÃO GLOBAL ===
window.loadingScreen = new LoadingScreen();
window.particleSystem = new ParticleSystem(document.body);
window.battleAnimations = new BattleAnimations(window.particleSystem);
window.ScreenTransition = ScreenTransition;

// Expor funções globais para fácil acesso
window.showLoading = (text) => window.loadingScreen.show(text);
window.hideLoading = () => window.loadingScreen.hide();
window.setLoadingProgress = (percent) => window.loadingScreen.setProgress(percent);

console.log('✨ Sistema de Efeitos Visuais Carregado!');
