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
  
  // === EXPORT/IMPORT DE SAVE ===
  
  /**
   * Exporta o save atual como arquivo JSON
   * @param {Object} state - Estado completo do jogo
   */
  window.exportSave = (state) => {
    if (!state || !state.user || !state.user.name) {
      window.showToast?.('Erro: Nenhum save para exportar!', 'error');
      return;
    }
    
    try {
      // Criar objeto com metadados
      const saveData = {
        version: '1.2.2',
        exportDate: new Date().toISOString(),
        playerName: state.user.name,
        playerLevel: state.user.lvl,
        data: state
      };
      
      // Converter para JSON
      const jsonString = JSON.stringify(saveData, null, 2);
      
      // Criar blob
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Criar link de download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `paperwar_${state.user.name}_${Date.now()}.json`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      URL.revokeObjectURL(url);
      
      window.showToast?.('Save exportado com sucesso!', 'success');
      
      // Adicionar partículas de sucesso
      if (window.particleSystem && window.lastClickPosition) {
        window.particleSystem.createBurst(
          window.lastClickPosition.x,
          window.lastClickPosition.y,
          20,
          '#22c55e'
        );
      }
    } catch (e) {
      console.error('Erro ao exportar save:', e);
      window.showToast?.('Erro ao exportar save!', 'error');
    }
  };
  
  /**
   * Importa um save de arquivo JSON
   * @param {File} file - Arquivo JSON do save
   * @param {Function} callback - Callback com o estado importado
   */
  window.importSave = (file, callback) => {
    if (!file) {
      window.showToast?.('Nenhum arquivo selecionado!', 'error');
      return;
    }
    
    if (!file.name.endsWith('.json')) {
      window.showToast?.('Arquivo inválido! Use um arquivo .json', 'error');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const saveData = JSON.parse(content);
        
        // Validar estrutura
        if (!saveData.data || !saveData.data.user || !saveData.data.user.name) {
          throw new Error('Arquivo de save inválido!');
        }
        
        // Confirmar importação
        const playerName = saveData.data.user.name;
        const playerLevel = saveData.data.user.lvl || 1;
        const exportDate = saveData.exportDate ? new Date(saveData.exportDate).toLocaleDateString() : 'Desconhecida';
        
        const processImport = () => {
             // Salvar no localStorage
            localStorage.setItem(
              `paperwar_save_${playerName}`,
              JSON.stringify(saveData.data)
            );
            
            // Definir como último usuário
            localStorage.setItem('paperwar_last_user', playerName);
            
            window.showToast?.('Save importado! Recarregando...', 'success');
            
            // Adicionar partículas de sucesso
            if (window.particleSystem) {
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight / 2;
              window.particleSystem.createBurst(centerX, centerY, 30, '#22c55e');
              window.particleSystem.createStars(centerX, centerY, 12);
            }
            
            // Recarregar página após 1 segundo
            setTimeout(() => {
              if (callback) callback(saveData.data);
              else location.reload();
            }, 1000);
        };

        if (window.ConfirmationModal) {
            window.ConfirmationModal.show({
                title: 'Importar Save',
                icon: '📤',
                message: `Deseja sobrescrever seu save atual com este?\n\n<span class="text-indigo-400 font-bold">${playerName}</span> (Lvl ${playerLevel})\nData: ${exportDate}`,
                confirmText: 'Importar',
                confirmColor: 'emerald',
                onConfirm: processImport,
                onCancel: () => {
                    window.showToast?.('Importação cancelada', 'info');
                }
            });
        } else {
            // Fallback
             const confirmed = confirm(
              `Importar save?\n\n` +
              `Jogador: ${playerName}\n` +
              `Nível: ${playerLevel}\n` +
              `Data de Export: ${exportDate}\n\n` +
              `ATENÇÃO: Isso irá substituir seu save atual!`
            );
            
            if (confirmed) processImport();
            else window.showToast?.('Importação cancelada', 'info');
        }
        
      } catch (e) {
        console.error('Erro ao importar save:', e);
        window.showToast?.('Erro ao importar save: ' + e.message, 'error');
      }
    };
    
    reader.onerror = () => {
      window.showToast?.('Erro ao ler arquivo!', 'error');
    };
    
    reader.readAsText(file);
  };
  
  /**
   * Abre diálogo para selecionar arquivo de import
   */
  window.openImportDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        window.importSave(file);
      }
    };
    
    input.click();
  };
  
  console.log('✅ Storage.js carregado');
})();
