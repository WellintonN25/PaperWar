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
  
  // Criar o HTML do modal dinamicamente
  const createModal = () => {
    const modalHTML = `
      <div
        id="settings-modal"
        class="fixed inset-0 z-[99999] hidden flex items-center justify-center p-4 transition-opacity duration-300 opacity-0"
        style="background-color: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);"
      >
        <div
          class="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm w-full max-h-[85vh] overflow-y-auto relative transform scale-95 transition-transform duration-300"
          onclick="event.stopPropagation()"
        >
          <!-- Header -->
          <div
            class="sticky top-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md p-4 border-b border-slate-700/50 flex items-center justify-between z-10"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl filter drop-shadow">⚙️</span>
              <h2 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">Configurações</h2>
            </div>
            <button
              id="close-settings-btn"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95"
            >
              <span class="text-white text-xl leading-none">&times;</span>
            </button>
          </div>
  
          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Seção: Gerenciar Save -->
            <div class="space-y-3">
              <h3 class="text-base font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wide text-xs">
                <span>💾</span>
                <span>Gerenciar Progresso</span>
              </h3>
  
              <div class="grid grid-cols-1 gap-3">
                <!-- Botão Export -->
                <button
                  onclick="triggerExport()"
                  class="group w-full py-3 px-4 bg-gradient-to-r from-emerald-600/20 to-emerald-600/10 hover:from-emerald-600/30 hover:to-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/50 text-white rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-4"
                >
                  <div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    📥
                  </div>
                  <div class="text-left flex-1">
                    <div class="text-sm font-bold text-emerald-100">Exportar Save</div>
                    <div class="text-[10px] text-emerald-300/70">Baixar arquivo de backup (.json)</div>
                  </div>
                </button>
  
                <!-- Botão Import -->
                <button
                  onclick="window.openImportDialog()"
                  class="group w-full py-3 px-4 bg-gradient-to-r from-blue-600/20 to-blue-600/10 hover:from-blue-600/30 hover:to-blue-600/20 border border-blue-500/30 hover:border-blue-500/50 text-white rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-4"
                >
                  <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    📤
                  </div>
                  <div class="text-left flex-1">
                    <div class="text-sm font-bold text-blue-100">Importar Save</div>
                    <div class="text-[10px] text-blue-300/70">Carregar backup existente</div>
                  </div>
                </button>
              </div>
            </div>
  
            <!-- Seção: Informações -->
            <div class="space-y-3 pt-2 border-t border-slate-800">
               <h3 class="text-base font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wide text-xs">
                <span>ℹ️</span>
                <span>Sobre</span>
              </h3>
  
              <div class="space-y-2 text-xs">
                <div class="flex justify-between items-center p-2.5 bg-slate-800/40 rounded-lg border border-slate-700/30">
                  <span class="text-slate-400">Versão</span>
                  <span class="text-white font-mono bg-slate-700/50 px-2 py-0.5 rounded text-[10px]">v1.2.2</span>
                </div>
                
                <div class="flex justify-between items-center p-2.5 bg-slate-800/40 rounded-lg border border-slate-700/30">
                  <span class="text-slate-400">Jogador</span>
                  <span class="text-emerald-400 font-bold" id="settings-player-name">-</span>
                </div>
                
                <div class="flex justify-between items-center p-2.5 bg-slate-800/40 rounded-lg border border-slate-700/30">
                  <span class="text-slate-400">Nível</span>
                  <span class="text-amber-400 font-bold" id="settings-player-level">-</span>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
             <div class="pt-4 mt-2 border-t border-slate-800 text-center">
              <p class="text-[10px] text-slate-600">
                PaperWar &copy; 2026 &bull; Desenvolvido com <span class="text-red-500">❤️</span>
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
              // Tenta pegar posição do botão
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
