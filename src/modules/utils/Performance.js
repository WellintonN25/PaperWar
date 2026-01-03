/**
 * PERFORMANCE OPTIMIZATION MODULE
 * Lazy loading, caching, debouncing e otimizações de animação
 */
(function() {
  'use strict';
  
  // ===== LAZY LOADING DE IMAGENS =====
  
  /**
   * Sistema de lazy loading para imagens
   */
  const ImageLoader = {
    observer: null,
    loadedImages: new Set(),
    
    init() {
      // Intersection Observer para lazy loading
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
            }
          });
        }, {
          rootMargin: '50px' // Começa a carregar 50px antes
        });
      }
    },
    
    loadImage(img) {
      if (this.loadedImages.has(img)) return;
      
      const src = img.dataset.src;
      if (!src) return;
      
      // Criar nova imagem para pré-carregar
      const tempImg = new Image();
      tempImg.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        this.loadedImages.add(img);
      };
      tempImg.onerror = () => {
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
      };
      tempImg.src = src;
      
      if (this.observer) {
        this.observer.unobserve(img);
      }
    },
    
    observe(img) {
      if (this.observer) {
        this.observer.observe(img);
      } else {
        // Fallback para browsers sem IntersectionObserver
        this.loadImage(img);
      }
    }
  };
  
  /**
   * Cria uma imagem com lazy loading
   * @param {string} src - URL da imagem
   * @param {string} alt - Texto alternativo
   * @param {string} classes - Classes CSS
   * @returns {HTMLImageElement} Elemento img
   */
  window.createLazyImage = (src, alt = '', classes = '') => {
    const img = document.createElement('img');
    img.dataset.src = src;
    img.alt = alt;
    img.className = classes;
    
    // Placeholder enquanto carrega
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%2318181b" width="100" height="100"/%3E%3C/svg%3E';
    
    ImageLoader.observe(img);
    return img;
  };
  
  // ===== CACHE DE CÁLCULOS =====
  
  /**
   * Sistema de cache para cálculos pesados
   */
  const CalculationCache = {
    cache: new Map(),
    maxSize: 1000,
    hits: 0,
    misses: 0,
    
    // Gera chave única para cache
    generateKey(prefix, ...args) {
      return `${prefix}_${args.map(a => 
        typeof a === 'object' ? JSON.stringify(a) : String(a)
      ).join('_')}`;
    },
    
    get(key) {
      if (this.cache.has(key)) {
        this.hits++;
        return this.cache.get(key);
      }
      this.misses++;
      return null;
    },
    
    set(key, value) {
      // Limpa cache se muito grande
      if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      this.cache.set(key, value);
    },
    
    clear() {
      this.cache.clear();
      this.hits = 0;
      this.misses = 0;
    },
    
    getStats() {
      const total = this.hits + this.misses;
      const hitRate = total > 0 ? (this.hits / total * 100).toFixed(2) : 0;
      return {
        size: this.cache.size,
        hits: this.hits,
        misses: this.misses,
        hitRate: `${hitRate}%`
      };
    }
  };
  
  /**
   * Wrapper para cachear resultados de funções
   * @param {Function} fn - Função a cachear
   * @param {string} prefix - Prefixo para chave de cache
   * @returns {Function} Função com cache
   */
  window.cached = (fn, prefix = 'fn') => {
    return function(...args) {
      const key = CalculationCache.generateKey(prefix, ...args);
      const cached = CalculationCache.get(key);
      
      if (cached !== null) {
        return cached;
      }
      
      const result = fn.apply(this, args);
      CalculationCache.set(key, result);
      return result;
    };
  };
  
  /**
   * Limpa o cache
   */
  window.clearCache = () => {
    CalculationCache.clear();
  };
  
  /**
   * Obtém estatísticas do cache
   */
  window.getCacheStats = () => {
    return CalculationCache.getStats();
  };
  
  // ===== DEBOUNCED RENDERS =====
  
  const DebouncedFunctions = new Map();
  
  /**
   * Cria versão debounced de uma função de renderização
   * @param {string} name - Nome único da função
   * @param {Function} fn - Função a debounce
   * @param {number} wait - Tempo de espera (ms)
   * @returns {Function} Função com debounce
   */
  window.debouncedRender = (name, fn, wait = 150) => {
    if (DebouncedFunctions.has(name)) {
      return DebouncedFunctions.get(name);
    }
    
    const debouncedFn = debounce(fn, wait);
    DebouncedFunctions.set(name, debouncedFn);
    return debouncedFn;
  };
  
  // ===== OTIMIZAÇÃO DE ANIMAÇÕES =====
  
  /**
   * Request Animation Frame com fallback
   */
  const raf = window.requestAnimationFrame || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame || 
              ((cb) => setTimeout(cb, 16));
  
  window.requestFrame = raf.bind(window);
  
  /**
   * Executa animação otimizada usando RAF
   * @param {Function} callback - Função a executar
   */
  window.optimizedAnimate = (callback) => {
    requestFrame(() => {
      callback();
    });
  };
  
  /**
   * Batch de updates do DOM para melhor performance
   */
  const DOMBatcher = {
    reads: [],
    writes: [],
    scheduled: false,
    
    measureRead(fn) {
      this.reads.push(fn);
      this.schedule();
    },
    
    mutateWrite(fn) {
      this.writes.push(fn);
      this.schedule();
    },
    
    schedule() {
      if (this.scheduled) return;
      this.scheduled = true;
      
      requestFrame(() => {
        // Executa todas as leituras primeiro (evita layout thrashing)
        this.reads.forEach(fn => fn());
        this.reads = [];
        
        // Depois todas as escritas
        this.writes.forEach(fn => fn());
        this.writes = [];
        
        this.scheduled = false;
      });
    }
  };
  
  /**
   * Lê propriedades do DOM de forma otimizada
   * @param {Function} readFn - Função de leitura
   */
  window.batchRead = (readFn) => {
    DOMBatcher.measureRead(readFn);
  };
  
  /**
   * Escreve no DOM de forma otimizada
   * @param {Function} writeFn - Função de escrita
   */
  window.batchWrite = (writeFn) => {
    DOMBatcher.mutateWrite(writeFn);
  };
  
  /**
   * Otimiza elemento para animações CSS
   * @param {HTMLElement} element - Elemento a otimizar
   */
  window.optimizeForAnimation = (element) => {
    if (!element) return;
    
    element.style.willChange = 'transform, opacity';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
    
    // Remove otimização após animação terminar
    element.addEventListener('transitionend', function handler() {
      element.style.willChange = 'auto';
      element.removeEventListener('transitionend', handler);
    }, { once: true });
  };
  
  /**
   * Virtual Scrolling para listas grandes
   */
  window.createVirtualList = (container, items, renderItem, itemHeight = 100) => {
    const visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
    let scrollTop = 0;
    
    const virtualContainer = createElement('div', {
      style: {
        height: `${items.length * itemHeight}px`,
        position: 'relative'
      }
    });
    
    const updateVisibleItems = debounce(() => {
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
      const endIndex = Math.min(items.length, startIndex + visibleCount);
      
      // Limpa container
      virtualContainer.innerHTML = '';
      
      // Renderiza apenas itens visíveis
      for (let i = startIndex; i < endIndex; i++) {
        const item = items[i];
        const el = renderItem(item, i);
        el.style.position = 'absolute';
        el.style.top = `${i * itemHeight}px`;
        el.style.height = `${itemHeight}px`;
        virtualContainer.appendChild(el);
      }
    }, 50);
    
    container.addEventListener('scroll', () => {
      scrollTop = container.scrollTop;
      updateVisibleItems();
    });
    
    container.appendChild(virtualContainer);
    updateVisibleItems();
    
    return {
      update: (newItems) => {
        items = newItems;
        virtualContainer.style.height = `${items.length * itemHeight}px`;
        updateVisibleItems();
      }
    };
  };
  
  /**
   * Throttle para eventos de scroll/resize
   */
  window.throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // ===== PERFORMANCE MONITORING =====
  
  const PerformanceMonitor = {
    marks: new Map(),
    
    start(name) {
      this.marks.set(name, performance.now());
    },
    
    end(name) {
      const start = this.marks.get(name);
      if (!start) return 0;
      
      const duration = performance.now() - start;
      this.marks.delete(name);
      
      if (duration > 16) { // Mais de 1 frame (60fps)
        console.warn(`⚠️ Performance: ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
  };
  
  /**
   * Marca início de medição de performance
   */
  window.perfStart = (name) => {
    PerformanceMonitor.start(name);
  };
  
  /**
   * Marca fim e retorna duração
   */
  window.perfEnd = (name) => {
    return PerformanceMonitor.end(name);
  };
  
  // ===== INICIALIZAÇÃO =====
  
  // Inicializa lazy loading quando DOM carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ImageLoader.init();
    });
  } else {
    ImageLoader.init();
  }
  
  console.log('✅ Performance.js carregado - Otimizações ativas!');
  
  // Expor stats para debug
  window.getPerformanceStats = () => {
    return {
      cache: CalculationCache.getStats(),
      imagesLoaded: ImageLoader.loadedImages.size
    };
  };
  
})();
