;(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
    const Settings = GitHubNotifications.Settings;

    const formSettings = document.getElementById('form-settings');
    const btnCancel = document.getElementById('btn-cancel');
    const btnReset = document.getElementById('btn-reset');
    const formAccessToken = formSettings.elements.namedItem('access-token');
    const formOnlyParticipating = formSettings.elements.namedItem('only-participating');
    const formNotificationsEnabled = formSettings.elements.namedItem('notifications-enabled');
    const formGithubEnterpriseEnabled = formSettings.elements.namedItem('github-enterprise-enabled');
    const formGithubEnterpriseUrl = formSettings.elements.namedItem('github-enterprise-url');
    const formGithubEnterpriseUrlGroup = document.getElementById('github-enterprise-url-group');

    function showSettings() {
      formAccessToken.value = Settings.get('accessToken');
      formOnlyParticipating.checked = Settings.get('onlyParticipating');
      formNotificationsEnabled.checked = Settings.get('notificationsEnabled');
      formGithubEnterpriseEnabled.checked = Settings.get('githubEnterpriseEnabled');
      formGithubEnterpriseUrl.value = Settings.get('baseUrl');

      if (formGithubEnterpriseEnabled.checked) {
        formGithubEnterpriseUrlGroup.style.display = 'block';
      } else {
        formGithubEnterpriseUrlGroup.style.display = 'none';
      }
    }

    showSettings();

    formGithubEnterpriseEnabled.addEventListener('change', (e) => {
      debugger;
      if (e.currentTarget.checked) {
        formGithubEnterpriseUrlGroup.style.display = 'block';
      } else {
        formGithubEnterpriseUrlGroup.style.display = 'none';
      }
      formGithubEnterpriseUrl.value = '';
    });

    formSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const token = formAccessToken.value;
      const onlyParticipating = formOnlyParticipating.checked;
      const notificationsEnabled = formNotificationsEnabled.checked;
      const githubEnterpriseEnabled = formNotificationsEnabled.checked;
      const githubEnterpriseUrl = formGithubEnterpriseUrl.value;

      if (githubEnterpriseEnabled && githubEnterpriseUrl.trim() !== '') {
        Settings.set('githubEnterpriseEnabled', true);
        Settings.set('baseUrl', githubEnterpriseUrl);
      } else {
        Settings.set('githubEnterpriseEnabled', false);
      }

      Settings.set('accessToken', token);
      Settings.set('onlyParticipating', onlyParticipating);
      Settings.set('notificationsEnabled', notificationsEnabled);

      self.close();
    });

    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      self.close();
    });

    btnReset.addEventListener('click', (e) => {
      e.preventDefault();

      Settings.reset();
      showSettings();

      formSettings.value
    });
  });
})();
