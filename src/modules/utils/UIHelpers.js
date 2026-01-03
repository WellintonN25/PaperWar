/**
 * UI HELPERS
 * Funções auxiliares para manipulação e renderização de UI
 */
(function() {
  'use strict';
  
  /**
   * Obtém ou cria um elemento reutilizável de forma segura
   * @param {string} id - ID do elemento
   * @param {string} tag - Tag HTML se precisar criar
   * @returns {HTMLElement|null} Elemento ou null
   */
  window.safeGetElement = (id, tag = 'div') => {
    let el = document.getElementById(id);
    if (!el && tag) {
      el = document.createElement(tag);
      el.id = id;
    }
    return el;
  };
  
  /**
   * Mostra um elemento (remove hidden/hidden-view)
   * @param {string|HTMLElement} element - ID ou elemento
   */
  window.showElement = (element) => {
    const el = typeof element === 'string' ? document.getElementById(element) : element;
    if (!el) return;
    
    el.classList.remove('hidden', 'hidden-view');
    if (!el.classList.contains('flex') && !el.classList.contains('block')) {
      el.classList.add('flex');
    }
  };
  
  /**
   * Esconde um elemento (adiciona hidden)
   * @param {string|HTMLElement} element - ID ou elemento
   */
  window.hideElement = (element) => {
    const el = typeof element === 'string' ? document.getElementById(element) : element;
    if (!el) return;
    
    el.classList.add('hidden');
    el.classList.remove('flex', 'block');
  };
  
  /**
   * Toggle de visibilidade de elemento
   * @param {string|HTMLElement} element - ID ou elemento
   */
  window.toggleElement = (element) => {
    const el = typeof element === 'string' ? document.getElementById(element) : element;
    if (!el) return;
    
    if (el.classList.contains('hidden') || el.classList.contains('hidden-view')) {
      showElement(el);
    } else {
      hideElement(el);
    }
  };
  
  /**
   * Limpa o conteúdo de um elemento
   * @param {string|HTMLElement} element - ID ou elemento
   */
  window.clearElement = (element) => {
    const el = typeof element === 'string' ? document.getElementById(element) : element;
    if (el) el.innerHTML = '';
  };
  
  /**
   * Cria um elemento com classes e atributos
   * @param {string} tag - Tag HTML
   * @param {Object} options - {classes: [], id: '', innerHTML: '', attributes: {}}
   * @returns {HTMLElement} Elemento criado
   */
  window.createElement = (tag, options = {}) => {
    const el = document.createElement(tag);
    
    if (options.id) el.id = options.id;
    if (options.classes) el.className = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes;
    if (options.innerHTML) el.innerHTML = options.innerHTML;
    if (options.textContent) el.textContent = options.textContent;
    
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        el.setAttribute(key, value);
      });
    }
    
    if (options.style) {
      Object.assign(el.style, options.style);
    }
    
    if (options.onclick) el.onclick = options.onclick;
    
    return el;
  };
  
  /**
   * Atualiza texto de um elemento apenas se mudou (performance)
   * @param {string|HTMLElement} element - ID ou elemento
   * @param {string} text - Novo texto
   */
  window.updateText = (element, text) => {
    const el = typeof element === 'string' ? document.getElementById(element) : element;
    if (el && el.textContent !== text) {
      el.textContent = text;
    }
  };
  
  /**
   * Obtém a cor baseada em elemento
   * @param {string} element - Elemento do monstro
   * @returns {string} Cor hexadecimal
   */
  window.getElementColor = (element) => {
    const colors = {
      fire: '#ef4444',
      water: '#3b82f6',
      wind: '#22c55e',
      earth: '#a16207',
      lightning: '#eab308',
      nature: '#16a34a',
      void: '#7c3aed',
      light: '#fbbf24',
      dark: '#6b21a8'
    };
    return colors[element] || '#64748b';
  };
  
  /**
   * Obtém emoji baseado em elemento  
   * @param {string} element - Elemento do monstro
   * @returns {string} Emoji
   */
  window.getElementEmoji = (element) => {
    const emojis = {
      fire: '🔥',
      water: '💧',
      wind: '🌪️',
      earth: '🪨',
      lightning: '⚡',
      nature: '🍃',
      void: '🌑',
      light: '✨',
      dark: '🌙'
    };
    return emojis[element] || '❓';
  };
  
  /**
   * Formata nome de raridade com cor
   * @param {string} rarity - Raridade do item
   * @returns {Object} {name, color, textColor}
   */
  window.getRarityInfo = (rarity) => {
    const info = EQ_RARITY[rarity] || EQ_RARITY.common;
    const colors = {
      common: { bg: '#64748b', text: '#fff' },
      rare: { bg: '#3b82f6', text: '#fff' },
      epic: { bg: '#a855f7', text: '#fff' },
      legendary: { bg: '#fbbf24', text: '#000' }
    };
    
    return {
      name: info.name,
      color: colors[rarity]?.bg || '#64748b',
      textColor: colors[rarity]?.text || '#fff',
      mult: info.mult
    };
  };
  
  /**
   * Cria uma barra de progresso HTML
   * @param {number} current - Valor atual
   * @param {number} max - Valor máximo
   * @param {string} color - Cor da barra (tailwind class)
   * @returns {string} HTML da barra
   */
  window.createProgressBar = (current, max, color = 'bg-green-500') => {
    const percent = Math.min(100, Math.max(0, (current / max) * 100));
    return `
      <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
        <div class="${color} h-full transition-all duration-300" style="width: ${percent}%"></div>
      </div>
    `;
  };
  
  /**
   * Debounce function para evitar chamadas excessivas
   * @param {Function} func - Função a debounce
   * @param {number} wait - Tempo de espera em ms
   * @returns {Function} Função com debounce
   */
  window.debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  console.log('✅ UIHelpers.js carregado');
})();
