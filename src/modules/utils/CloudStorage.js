/**
 * Módulo de Mock Cloud Storage
 * Permite gerar códigos de recuperação (Cloud Codes) para backup manual
 */

window.CloudStorage = (() => {
    
    // Converte objeto para Base64 seguro
    const generateCloudCode = (state) => {
        try {
            if (!state || !state.user) throw new Error("Estado inválido");
            
            const saveData = {
                v: '1.2.4',
                d: Date.now(),
                data: state
            };
            
            const jsonStr = JSON.stringify(saveData);
            // Simples Base64 encode (para produção real usaria LZString para comprimir)
            return btoa(unescape(encodeURIComponent(jsonStr)));
        } catch (e) {
            window.Logger?.error("Erro ao gerar Cloud Code", e);
            return null;
        }
    };
    
    // Restaura de Base64
    const parseCloudCode = (code) => {
        try {
            if (!code) return null;
            
            const jsonStr = decodeURIComponent(escape(atob(code)));
            const container = JSON.parse(jsonStr);
            
            return container.data || container; // Suporte legado se houver
        } catch (e) {
            window.Logger?.error("Código inválido", e);
            return null;
        }
    };
    
    // Copiar para clipboard
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            window.showToast?.("Código copiado para a área de transferência!", "success");
            return true;
        } catch (err) {
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            window.showToast?.("Código copiado!", "success");
            return true;
        }
    };
    
    // Colar do clipboard e importar
    const importFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (!text) {
                window.showToast?.("Área de transferência vazia!", "error");
                return;
            }
            
            const data = parseCloudCode(text);
            if (data && data.user) {
                confirmImport(data);
            } else {
                window.showToast?.("Código inválido ou corrompido!", "error");
            }
        } catch (err) {
            window.showToast?.("Erro ao ler área de transferência. Tente colar manualmente.", "error");
        }
    };
    
    const confirmImport = (data) => {
        if (window.ConfirmationModal) {
            window.ConfirmationModal.show({
                title: 'Restaurar da Nuvem',
                icon: '☁️',
                message: `Encontrado backup de:\n<strong class="text-indigo-400">${data.user.name}</strong> (Nível ${data.user.lvl})\n\nDeseja restaurar?`,
                confirmText: 'Restaurar',
                confirmColor: 'indigo',
                onConfirm: () => {
                    localStorage.setItem(`paperwar_save_${data.user.name}`, JSON.stringify(data));
                    localStorage.setItem('paperwar_last_user', data.user.name);
                    window.location.reload();
                }
            });
        }
    };

    return {
        generateCloudCode,
        copyCode: async () => {
            const code = generateCloudCode(window.state);
            if (code) await copyToClipboard(code);
        },
        importCode: importFromClipboard,
        manualImport: (code) => {
             const data = parseCloudCode(code);
             if (data) confirmImport(data);
             else window.showToast?.("Código inválido!", "error");
        }
    };
})();
