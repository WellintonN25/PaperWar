/**
 * TOAST NOTIFICATION SYSTEM
 * Sistema de notificações toast para feedback visual ao usuário
 */
(function() {
  'use strict';
  
  /**
   * Exibe uma mensagem toast na tela
   * @param {string} message - Mensagem a ser exibida
   * @param {string} type - Tipo de toast: 'success', 'error', 'info'
   */
  window.showToast = (message, type = "success") => {
    const container = document.getElementById("toast-container");
    if (!container) {
      console.warn('Toast container not found');
      return;
    }
    
    const toast = document.createElement("div");

    let icon = "✅";
    if (type === "error") icon = "❌";
    if (type === "info") icon = "ℹ️";

    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toast-fade 0.3s ease-in forwards";
      setTimeout(() => toast.remove(), 300);
    }, 1000);
  };
  
  console.log('✅ Toast.js carregado');
})();
