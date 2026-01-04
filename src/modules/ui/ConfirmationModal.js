/**
 * Módulo de Modal de Confirmação
 * Um substituto moderno e bonito para o window.confirm nativo
 */

window.ConfirmationModal = (() => {
  let modalElement = null;
  let confirmCallback = null;
  let cancelCallback = null;

  const init = () => {
    if (!document.getElementById('confirmation-modal-container')) {
      createModalHTML();
    }
  };

  const createModalHTML = () => {
    const html = `
      <div id="confirmation-modal" class="fixed inset-0 z-[100000] hidden flex items-center justify-center p-4 transition-opacity duration-300 opacity-0" style="background-color: rgba(0, 0, 0, 0.85); backdrop-filter: blur(4px);">
        <div class="bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl max-w-sm w-full p-6 transform scale-95 transition-transform duration-300 flex flex-col gap-4 relative overflow-hidden">
          
          <!-- Background Decoration -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

          <!-- Icon & Title -->
          <div class="text-center space-y-2 z-10">
            <div id="confirm-icon" class="text-5xl mb-2 animate-bounce">⚠️</div>
            <h3 id="confirm-title" class="text-xl font-black text-white uppercase tracking-wider">Confirmação</h3>
          </div>

          <!-- Message -->
          <div id="confirm-message" class="text-slate-300 text-sm text-center leading-relaxed z-10 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            Tem certeza que deseja prosseguir?
          </div>

          <!-- Actions -->
          <div class="grid grid-cols-2 gap-3 mt-2 z-10">
            <button id="confirm-btn-cancel" class="py-3 px-4 rounded-xl font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 transition-colors uppercase text-xs tracking-wider">
              Cancelar
            </button>
            <button id="confirm-btn-ok" class="py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2">
              <span>Confirmar</span>
            </button>
          </div>

        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.id = 'confirmation-modal-container';
    container.innerHTML = html;
    document.body.appendChild(container);

    modalElement = document.getElementById('confirmation-modal');

    // Bind events
    document.getElementById('confirm-btn-cancel').onclick = () => onCancel();
    document.getElementById('confirm-btn-ok').onclick = () => onConfirm();
  };

  const show = (options = {}) => {
    init(); // Ensure created

    const {
      title = "Confirmação",
      message = "Tem certeza?",
      icon = "⚠️",
      confirmText = "Confirmar",
      cancelText = "Cancelar",
      confirmColor = "indigo", // indigo, red, green, amber
      onConfirm: onConfirmFn = () => {},
      onCancel: onCancelFn = () => {}
    } = options;

    confirmCallback = onConfirmFn;
    cancelCallback = onCancelFn;

    // Update UI
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').innerHTML = message.replace(/\n/g, '<br>');
    document.getElementById('confirm-icon').textContent = icon;
    
    // Update Button Text
    const okBtn = document.getElementById('confirm-btn-ok');
    okBtn.querySelector('span').textContent = confirmText;
    document.getElementById('confirm-btn-cancel').textContent = cancelText;

    // Update Button Color
    okBtn.className = okBtn.className.replace(/bg-\w+-600/, `bg-${confirmColor}-600`)
                                     .replace(/hover:bg-\w+-500/, `hover:bg-${confirmColor}-500`)
                                     .replace(/shadow-\w+-500\/20/, `shadow-${confirmColor}-500/20`);

    // Show
    modalElement.classList.remove('hidden');
    requestAnimationFrame(() => {
      modalElement.classList.remove('opacity-0');
      modalElement.firstElementChild.classList.remove('scale-95');
      modalElement.firstElementChild.classList.add('scale-100');
    });
  };

  const hide = () => {
    if (!modalElement) return;

    modalElement.classList.add('opacity-0');
    modalElement.firstElementChild.classList.remove('scale-100');
    modalElement.firstElementChild.classList.add('scale-95');

    setTimeout(() => {
      modalElement.classList.add('hidden');
    }, 300);
  };

  const onConfirm = () => {
    hide();
    if (confirmCallback) confirmCallback();
  };

  const onCancel = () => {
    hide();
    if (cancelCallback) cancelCallback();
  };

  return { show };
})();
