const CACHE_NAME = 'paperwar-v1.2.6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './game.js',
  './visual-effects.js',
  './ui-feedback.js',
  './manifest.json',
  './icon.svg',
  './src/modules/data/Monsters.js',
  './src/modules/data/Skills.js',
  './src/modules/data/Missions.js',
  './src/modules/data/GameConstants.js',
  './src/modules/data/Runes.js',
  './src/modules/utils/Helpers.js',
  './src/modules/utils/Toast.js',
  './src/modules/utils/Storage.js',
  './src/modules/utils/StatsCalculator.js',
  './src/modules/utils/UIHelpers.js',
  './src/modules/utils/Performance.js',
  './src/modules/utils/Logger.js',
  './src/modules/utils/CloudStorage.js',
  './src/modules/ui/NewFeaturesUI.js',
  './src/modules/ui/SettingsModal.js',
  './src/modules/ui/ConfirmationModal.js',
  './src/modules/game/MonsterManager.js',
  './src/modules/game/EquipmentManager.js',
  './src/modules/game/Achievements.js',
  './src/modules/game/PitySystem.js',
  './src/modules/game/PvPSystem.js',
  './src/modules/battle/BattleHelpers.js',
  './src/modules/battle/BattleVisualEffects.js'
];

self.addEventListener('install', (event) => {
  console.log('👷 Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Service Worker: Cacheando arquivos...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('👷 Service Worker: Ativo');
  // Limpar caches antigos
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('🗑️ Service Worker: Removendo cache antigo', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Estratégia: Stale-While-Revalidate
  // Tenta servir do cache, mas busca na rede em background para atualizar
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => {
          // Fallback offline se necessário
      });
      return cachedResponse || fetchPromise;
    })
  );
});
