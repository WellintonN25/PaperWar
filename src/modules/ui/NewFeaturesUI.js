/**
 * NEW FEATURES UI
 * Renderização de Achievements, Daily Rewards e Pity
 */
(function() {
  'use strict';
  
  // ===== ACHIEVEMENTS =====
  
  window.renderAchievements = () => {
    const stats = getAchievementStats(state);
    const byCategory = getAchievementsByCategory();
    
    // Stats
    document.getElementById('achievement-stats').innerHTML = `
      <div class="glass-panel p-4 rounded-xl text-center">
        <div class="text-4xl font-black text-white">${stats.completed}/${stats.total}</div>
        <div class="text-slate-400 text-sm">Completadas (${stats.percent}%)</div>
        ${stats.unclaimed > 0 ? `<div class="text-yellow-400 mt-2">🎁 ${stats.unclaimed} Recompensas!</div>` : ''}
      </div>
    `;
    
    // List
    let html = '';
    Object.entries(byCategory).forEach(([category, achievements]) => {
      const catInfo = ACHIEVEMENT_CATEGORIES[category];
      html += `<div class="mb-4">
        <h3 class="text-white font-bold mb-2">${catInfo.icon} ${catInfo.name}</h3>`;
      
      achievements.forEach(ach => {
        const progress = getAchievementProgress(state, ach.id);
        const percent = progress.percent;
        const isCompleted = progress.completed;
        const isClaimed = progress.claimed;
        
        html += `
          <div class="glass-panel p-3 rounded-xl mb-2 ${isClaimed ? 'opacity-50' : ''}">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">${ach.icon}</span>
                  <div>
                    <div class="text-white font-bold text-sm">${ach.name}</div>
                    <div class="text-slate-400 text-xs">${ach.desc}</div>
                  </div>
                </div>
                <div class="mt-2">
                  <div class="bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div class="bg-gradient-to-r from-amber-500 to-yellow-500 h-full transition-all" 
                      style="width: ${percent}%"></div>
                  </div>
                  <div class="text-xs text-slate-400 mt-1">${progress.current}/${progress.target}</div>
                </div>
              </div>
              ${isCompleted && !isClaimed ? `
                <button onclick="claimAchievementReward('${ach.id}')"
                  class="ml-3 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold rounded-lg text-xs">
                  Resgatar
                </button>
              ` : isClaimed ? `<span class="text-green-500 text-2xl">✓</span>` : ''}
            </div>
          </div>
        `;
      });
      
      html += '</div>';
    });
    
    document.getElementById('achievement-list').innerHTML = html;
  };
  
  window.claimAchievementReward = (achId) => {
    const result = claimAchievement(state, achId);
    if (result.success) {
      showToast(result.message, 'success');
      save();
      updateHeader();
      renderAchievements();
    } else {
      showToast(result.message, 'error');
    }
  };
  
  // ===== DAILY REWARDS =====
  
  window.showDailyRewardModal = () => {
    if (!canClaimDailyReward(state)) {
      showToast('Já reivindicado hoje!', 'info');
      return;
    }
    
    const result = claimDailyReward(state);
    if (!result.success) {
      showToast(result.message, 'error');
      return;
    }
    
    const modal = document.getElementById('daily-reward-modal');
    const content = document.getElementById('daily-reward-content');
    
    content.innerHTML = `
      <div class="text-center ${result.isSpecial ? 'animate-pulse' : ''}">
        <div class="text-5xl mb-3">${result.isSpecial ? '🌟' : '📦'}</div>
        <div class="text-3xl font-black text-white mb-2">Dia ${result.day}</div>
        ${result.isSpecial ? '<div class="text-yellow-400 font-bold mb-2">✨ ESPECIAL!</div>' : ''}
        ${result.isFinal ? '<div class="text-pink-400 font-bold mb-2">🎉 RECOMPENSA FINAL!</div>' : ''}
        <div class="text-lg text-slate-300">${result.message}</div>
      </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    save();
    updateHeader();
    
    if (result.isSpecial || result.isFinal) {
      // Confete!
      setTimeout(() => {
        showToast('🎉 Recompensa especial!', 'success');
      }, 500);
    }
  };
  
  // ===== PITY INDICATOR =====
  
  window.updatePityIndicator = () => {
    const pityInfo = getPityInfo(state);
    const indicator = document.getElementById('pity-indicator');
    
    if (!indicator) return;
    
    indicator.innerHTML = `
      <div class="text-xs text-slate-400 space-y-1">
        <div class="flex justify-between">
          <span>5★ Pity:</span>
          <span class="text-yellow-400">${pityInfo.legendary.current}/${pityInfo.legendary.guarantee}</span>
        </div>
        <div class="flex justify-between">
          <span>4★+ Pity:</span>
          <span class="text-purple-400">${pityInfo.epic.current}/${pityInfo.epic.guarantee}</span>
        </div>
        <div class="text-yellow-400 text-center">Bonus: +${pityInfo.legendary.bonusRate}</div>
      </div>
    `;
  };
  
  // ===== NOTIFICATIONS =====
  
  window.updateNewFeatureNotifications = () => {
    // Achievement notification
    const stats = getAchievementStats(state);
    const achNotif = document.getElementById('achievement-notification');
    if (achNotif) {
      if (stats.unclaimed > 0) {
        achNotif.classList.remove('hidden');
      } else {
        achNotif.classList.add('hidden');
      }
    }
    
    // Daily notification
    const dailyNotif = document.getElementById('daily-notification');
    if (dailyNotif) {
      if (canClaimDailyReward(state)) {
        dailyNotif.classList.remove('hidden');
      } else {
        dailyNotif.classList.add('hidden');
      }
    }
  };
  
  console.log('✅ NewFeaturesUI.js carregado');
})();
