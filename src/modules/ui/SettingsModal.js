/**
 * Módulo de Modal de Configurações
 * Gerencia a criação, exibição e interação com o modal de configurações
 * Anexa o modal diretamente ao body para evitar problemas de z-index e transform
 */

window.SettingsModal = (() => {
  // Elemento do modal
  let modalElement = null;
  
  // Inicialização
  const init = () => {
    // Criar o modal se não existir
    if (!document.getElementById('settings-modal')) {
      createModal();
    }
    
    // Iniciar observador para anexar evento de clique ao nome do jogador
    startPlayerNameObserver();
    
    console.log('✅ SettingsModal inicializado');
  };
  
  // Criar o HTML do modal dinamicamente (Layout Compacto)
  const createModal = () => {
    const modalHTML = `
      <div
        id="settings-modal"
        class="fixed inset-0 z-[99999] hidden flex items-center justify-center p-4 transition-opacity duration-300 opacity-0"
        style="background-color: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);"
      >
        <div
          class="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm w-full relative transform scale-95 transition-transform duration-300 overflow-hidden"
          onclick="event.stopPropagation()"
        >
          <!-- Header Compacto -->
          <div
            class="bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md px-4 py-3 border-b border-slate-700/50 flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <span class="text-xl filter drop-shadow">⚙️</span>
              <h2 class="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 uppercase tracking-wide">Configurações</h2>
            </div>
            <button
              id="close-settings-btn"
              class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95"
            >
              <span class="text-white text-lg leading-none">&times;</span>
            </button>
          </div>
  
          <!-- Content Compacto -->
          <div class="p-4 space-y-4">
            
            <!-- GRID DE AÇÕES (2x2) -->
            <div class="grid grid-cols-2 gap-2.5">
                <!-- Exportar Arquivo -->
                <button
                  onclick="triggerExport()"
                  class="group relative overflow-hidden bg-gradient-to-br from-emerald-900/40 to-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500/50 hover:from-emerald-900/60 rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                >
                  <div class="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="text-2xl mb-1 filter drop-shadow group-hover:scale-110 transition-transform">📥</span>
                  <span class="text-xs font-bold text-emerald-100 uppercase tracking-wider">Salvar Arquivo</span>
                  <span class="text-[9px] text-emerald-400/60">Backup Local (.json)</span>
                </button>
  
                <!-- Importar Arquivo -->
                <button
                  onclick="window.openImportDialog()"
                  class="group relative overflow-hidden bg-gradient-to-br from-blue-900/40 to-blue-950/40 border border-blue-500/20 hover:border-blue-500/50 hover:from-blue-900/60 rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                >
                  <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="text-2xl mb-1 filter drop-shadow group-hover:scale-110 transition-transform">📤</span>
                  <span class="text-xs font-bold text-blue-100 uppercase tracking-wider">Carregar Arquivo</span>
                  <span class="text-[9px] text-blue-400/60">Restaurar Backup</span>
                </button>
  
                <!-- Copiar Nuvem -->
                <button
                  onclick="window.CloudStorage.copyCode()"
                  class="group relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-indigo-950/40 border border-indigo-500/20 hover:border-indigo-500/50 hover:from-indigo-900/60 rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                >
                  <div class="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="text-2xl mb-1 filter drop-shadow group-hover:scale-110 transition-transform">☁️</span>
                  <span class="text-xs font-bold text-indigo-100 uppercase tracking-wider">Copiar Código</span>
                  <span class="text-[9px] text-indigo-400/60">Salvar na Nuvem</span>
                </button>
  
                <!-- Colar Nuvem -->
                <button
                  onclick="window.CloudStorage.importCode()"
                  class="group relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-purple-500/20 hover:border-purple-500/50 hover:from-purple-900/60 rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                >
                  <div class="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="text-2xl mb-1 filter drop-shadow group-hover:scale-110 transition-transform">📋</span>
                  <span class="text-xs font-bold text-purple-100 uppercase tracking-wider">Colar Código</span>
                  <span class="text-[9px] text-purple-400/60">Restaurar da Nuvem</span>
                </button>
            </div>
  
            <!-- Info Player Compacta -->
            <div class="bg-slate-800/40 border border-slate-700/50 rounded-lg px-3 py-2 flex justify-between items-center">
                 <div class="flex items-center gap-3">
                    <div class="flex flex-col">
                        <span class="text-[9px] text-slate-500 uppercase font-bold">Jogador</span>
                        <span class="text-emerald-400 font-bold text-xs" id="settings-player-name">-</span>
                    </div>
                    <div class="w-px h-6 bg-slate-700"></div>
                     <div class="flex flex-col">
                        <span class="text-[9px] text-slate-500 uppercase font-bold">Nível</span>
                        <span class="text-amber-400 font-bold text-xs" id="settings-player-level">-</span>
                    </div>
                 </div>
                 <div class="flex flex-col items-end">
                    <span class="text-[9px] text-slate-500 uppercase font-bold">Versão</span>
                    <span class="text-slate-300 font-mono text-[10px]">v1.2.4</span>
                 </div>
            </div>
            
            <!-- Footer / Logs -->
             <div class="flex justify-between items-center pt-2 border-t border-slate-800/50">
               <button onclick="window.Logger.exportLogs()" class="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-800 transition-colors group">
                    <span class="text-xs opacity-50 group-hover:opacity-100">🐞</span>
                    <span class="text-[10px] text-slate-500 group-hover:text-slate-300 font-bold">Debug Logs</span>
               </button>
              
              <p class="text-[9px] text-slate-600 font-medium">
                PaperWar &copy; 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Converter string para elemento DOM
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = modalHTML;
    modalElement = tempDiv.firstElementChild;
    
    // Adicionar eventos
    modalElement.addEventListener('click', (e) => {
      if (e.target === modalElement) closeModal();
    });
    
    const closeBtn = modalElement.querySelector('#close-settings-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Anexar ao body
    document.body.appendChild(modalElement);
  };

  // Função Global de Exportação
  window.triggerExport = () => {
      console.log('📥 Iniciando exportação...');
      
      if (!window.exportSave) {
          console.error('❌ Função exportSave não encontrada!');
          window.showToast?.('Erro interno: exportSave não disponível', 'error');
          return;
      }
      
      if (!window.state) {
          console.error('❌ Estado do jogo não encontrado!');
          window.showToast?.('Erro: Estado do jogo não carregado', 'error');
          return;
      }

      try {
          window.exportSave(window.state);
          
          // Efeito visual
          if (window.particleSystem) {
              const btn = document.activeElement;
              let x = window.innerWidth / 2;
              let y = window.innerHeight / 2;
              
              if (btn && btn.tagName === 'BUTTON') {
                  const rect = btn.getBoundingClientRect();
                  x = rect.left + rect.width / 2;
                  y = rect.top + rect.height / 2;
              }
              
              window.particleSystem.createBurst(x, y, 20, '#22c55e');
          }
      } catch (e) {
          console.error('❌ Erro ao exportar:', e);
          window.showToast?.('Erro crítico ao exportar save', 'error');
      }
  };
   
  
  // Abrir o modal
  const openModal = () => {
    if (!modalElement) createModal();
    
    // Atualizar dados
    if (window.state && window.state.user) {
      const nameEl = document.getElementById("settings-player-name");
      const lvlEl = document.getElementById("settings-player-level");
      if (nameEl) nameEl.textContent = window.state.user.name || "-";
      if (lvlEl) lvlEl.textContent = window.state.user.lvl || "-";
    }
    
    // Mostrar com animação
    modalElement.classList.remove('hidden');
    // Pequeno delay para permitir que o navegador renderize o elemento antes de aplicar a opacidade
    requestAnimationFrame(() => {
        modalElement.classList.remove('opacity-0');
        const content = modalElement.querySelector('div');
        if (content) {
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }
    });
    
    // Partículas
    if (window.particleSystem && window.lastClickPosition) {
       window.particleSystem.createTabSwitchParticles(
         window.lastClickPosition.x, 
         window.lastClickPosition.y, 
         15
       );
    }
  };
  
  // Fechar o modal
  const closeModal = () => {
    if (!modalElement) return;
    
    // Animação de saída
    modalElement.classList.add('opacity-0');
    const content = modalElement.querySelector('div');
    if (content) {
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
    }
    
    setTimeout(() => {
      modalElement.classList.add('hidden');
    }, 300);
  };
  
  // Observador para o nome do jogador
  const startPlayerNameObserver = () => {
    // Tentar encontrar imediatamente
    attachClickEvent();
    
    // Observar o app para mudanças (ex: login, navegação)
    const app = document.getElementById('app');
    if (!app) return;
    
    const observer = new MutationObserver(() => {
        attachClickEvent();
    });
    
    observer.observe(app, { childList: true, subtree: true });
  };
  
  // Função para anexar o evento de clique
  const attachClickEvent = () => {
    if (!window.state || !window.state.user || !window.state.user.name) return;
    
    // Encontrar elementos que contêm o nome do jogador
    // Estratégia: Procurar divs/spans/p que tenham exatamente o nome do usuário
    const userName = window.state.user.name;
    // Adicionando 'p' e buscando explicitamente o ID conhecido
    const allElements = document.querySelectorAll('#app span, #app div, #app h3, #app p, #player-name-ui'); 
    
    let found = false;
    for (const el of allElements) {
        // Se for o elemento específico por ID, já é um match forte
        const isTargetId = el.id === 'player-name-ui';
        
        // Verificar se é o elemento de nome (texto exato ou contém e é curto)
        // Ignorar scripts, styles, ou containers muito grandes
        // Para o ID específico, aceitamos mesmo que o texto não seja exato (pode ter espaços ou estar carregando)
        if (isTargetId || (el.children.length === 0 && el.textContent.trim() === userName)) {
            
            // Verificar se já tem o evento
            if (el.getAttribute('data-settings-linked') === 'true') {
                found = true;
                continue;
            }
            
            // Adicionar evento
            el.style.cursor = 'pointer';
            el.title = 'Abrir Configurações';
            el.setAttribute('data-settings-linked', 'true');
            
            // Adicionar classes hover se não tiver
            el.classList.add('hover:text-indigo-400', 'transition-colors', 'duration-300');
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                // Armazenar posição do clique para partículas
                if (window.lastClickPosition) {
                    window.lastClickPosition.x = e.clientX;
                    window.lastClickPosition.y = e.clientY;
                }
                openModal();
            });
            
            // Também adicionar ao container pai imediato se for pequeno (para aumentar área de clique)
            const parent = el.parentElement;
            if (parent && (parent.tagName === 'DIV' || parent.tagName === 'SPAN') && parent.children.length <= 3) {
                 parent.style.cursor = 'pointer';
                 parent.title = 'Abrir Configurações';
                 parent.onclick = (e) => {
                     e.stopPropagation();
                     openModal();
                 }
            }
            
            found = true;
            console.log('✅ Configurações vinculadas ao nome do jogador:', el.id || el.tagName);
        }
    }
  };

  return {
    init,
    open: openModal,
    close: closeModal
  };
})();

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.SettingsModal.init());
} else {
    // Pequeno delay para garantir que outros scripts carregaram
    setTimeout(() => window.SettingsModal.init(), 500);
}

// Compatibilidade
window.toggleSettingsModal = () => window.SettingsModal.open();
