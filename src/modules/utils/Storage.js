/**
 * STORAGE UTILITIES
 * Funções auxiliares para salvar e carregar dados do localStorage
 */
(function() {
  'use strict';
  
  /**
   * Salva o estado do jogo no localStorage
   * @param {Object} state - Estado completo do jogo
   */
  window.saveGame = (state) => {
    if (!state || !state.user || !state.user.name) {
      console.warn('Cannot save: invalid state or no user name');
      return false;
    }
    
    try {
      localStorage.setItem(
        `paperwar_save_${state.user.name}`,
        JSON.stringify(state)
      );
      return true;
    } catch (e) {
      console.error('Error saving game:', e);
      return false;
    }
  };
  
  /**
   * Carrega o save de um usuário específico
   * @param {string} username - Nome do usuário
   * @returns {Object|null} Estado salvo ou null se não encontrado
   */
  window.loadGame = (username) => {
    if (!username) return null;
    
    try {
      const saved = localStorage.getItem(`paperwar_save_${username}`);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error loading game:', e);
      return null;
    }
  };
  
  /**
   * Obtém o último usuário que fez login
   * @returns {string|null} Nome do último usuário ou null
   */
  window.getLastUser = () => {
    return localStorage.getItem("paperwar_last_user");
  };
  
  /**
   * Define o último usuário que fez login
   * @param {string} username - Nome do usuário
   */
  window.setLastUser = (username) => {
    if (username) {
      localStorage.setItem("paperwar_last_user", username);
    }
  };
  
  /**
   * Remove o registro do último usuário
   */
  window.clearLastUser = () => {
    localStorage.removeItem("paperwar_last_user");
  };
  
  console.log('✅ Storage.js carregado');
})();
