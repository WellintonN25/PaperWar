/**
 * HELPER UTILITIES
 * Funções auxiliares gerais usadas em várias partes do jogo
 */
(function() {
  'use strict';
  
  /**
   * Função sleep para usar com async/await
   * @param {number} ms - Milissegundos para aguardar
   * @returns {Promise}
   */
  window.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Gera um ID único baseado em timestamp e random
   * @returns {string} ID único
   */
  window.generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  
  /**
   * Formata número com separadores de milhar
   * @param {number} num - Número a formatar
   * @returns {string} Número formatado
   */
  window.formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  /**
   * Clamp - limita um valor entre min e max
   * @param {number} value - Valor a limitar
   * @param {number} min - Valor mínimo
   * @param {number} max - Valor máximo
   * @returns {number} Valor limitado
   */
  window.clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };
  
  /**
   * Escolhe um item aleatório de um array
   * @param {Array} array - Array de onde escolher
   * @returns {*} Item escolhido
   */
  window.randomChoice = (array) => {
    if (!array || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  };
  
  /**
   * Randomiza um número entre min e max (inclusivo)
   * @param {number} min - Valor mínimo
   * @param {number} max - Valor máximo
   * @returns {number} Número aleatório
   */
  window.randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  /**
   * Embaralha um array (Fisher-Yates shuffle)
   * @param {Array} array - Array a embaralhar
   * @returns {Array} Array embaralhado
   */
  window.shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  
  console.log('✅ Helpers.js carregado');
})();
