(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
    const Settings = GitHubNotifications.Settings;
    const Badge    = GitHubNotifications.Badge;
    const Util     = GitHubNotifications.Util;
    const AppCache = GitHubNotifications.AppCache;

    const formSettings = document.getElementById('form-settings');
    const btnCancel = document.getElementById('btn-cancel');
    const btnReset = document.getElementById('btn-reset');

    function showSettings() {
      const formAccessToken = formSettings.elements.namedItem('access-token');
      const formOnlyParticipating = formSettings.elements.namedItem('only-participating');

      formAccessToken.value = Settings.get('accessToken');
      formOnlyParticipating.checked = Settings.get('onlyParticipating');
    }

    showSettings();

    formSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const token = form.elements.namedItem('access-token').value;
      const onlyParticipating = form.elements.namedItem('only-participating').checked;

      Settings.set('accessToken', token);
      Settings.set('onlyParticipating', onlyParticipating);

      Util.updateCache(Badge.update.bind(Badge, AppCache.count));
      self.close();
    });

    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      self.close();
    });

    btnReset.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      self.close();
    });
  });
})();