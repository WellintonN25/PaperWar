/**
 * Módulo de Logger Avançado
 * Melhora a visibilidade do desenvolvimento e ajuda no debug
 */

window.Logger = (() => {
    const MAX_LOGS = 200;
    const history = [];
    let isDebugMode = true; // Pode ser alterado via console
  
    const styles = {
      info: 'color: #3b82f6; font-weight: bold;',
      success: 'color: #22c55e; font-weight: bold;',
      warn: 'color: #f59e0b; font-weight: bold;',
      error: 'color: #ef4444; font-weight: bold; font-size: 1.1em;',
      system: 'color: #a855f7; font-style: italic;',
      battle: 'color: #ef4444; background: #fee2e2; padding: 2px 4px; border-radius: 2px;'
    };
  
    const getTimestamp = () => {
      const now = new Date();
      return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    };
  
    const pushToHistory = (type, message, data) => {
      history.push({
        timestamp: new Date().toISOString(),
        type,
        message,
        data: data ? JSON.parse(JSON.stringify(data)) : null // Clone data safely
      });
      
      if (history.length > MAX_LOGS) {
        history.shift();
      }
    };
  
    // Métodos públicos
    const info = (msg, ...args) => {
      if (!isDebugMode) return;
      console.log(`%cℹ️ ${getTimestamp()} ${msg}`, styles.info, ...args);
      pushToHistory('info', msg, args);
    };
  
    const success = (msg, ...args) => {
      if (!isDebugMode) return;
      console.log(`%c✅ ${getTimestamp()} ${msg}`, styles.success, ...args);
      pushToHistory('success', msg, args);
    };
  
    const warn = (msg, ...args) => {
      console.warn(`%c⚠️ ${getTimestamp()} ${msg}`, styles.warn, ...args);
      pushToHistory('warn', msg, args);
    };
  
    const error = (msg, ...args) => {
      console.error(`%c❌ ${getTimestamp()} ${msg}`, styles.error, ...args);
      pushToHistory('error', msg, args);
      // Opcional: Mostrar toast de erro para o usuário se for crítico
    };
    
    const battle = (msg, ...args) => {
        if (!isDebugMode) return;
        console.log(`%c⚔️ ${getTimestamp()} ${msg}`, styles.battle, ...args);
        pushToHistory('battle', msg, args);
    };
  
    // Exportar logs para análise
    const exportLogs = () => {
      const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `debug_logs_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const getLogs = () => history;
  
    return {
      info,
      success,
      warn,
      error,
      battle,
      exportLogs,
      getLogs
    };
  })();
  
  // Sobrescrever console padrão para capturar erros não tratados (opcional, mas recomendado)
  /*
  const originalError = console.error;
  console.error = (...args) => {
      window.Logger.error(...args);
      originalError.apply(console, args);
  };
  */
