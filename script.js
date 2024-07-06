document.addEventListener('DOMContentLoaded', () => {
  let userTheme = localStorage.userTheme;
  let systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const themes = ['dark', 'light'];
  document.body.setAttribute('system-theme', systemTheme);
  document.body.setAttribute('user-theme', userTheme);
  document.body.setAttribute('theme', userTheme ?? systemTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    systemTheme = event.matches ? 'dark' : 'light';
    document.body.setAttribute('system-theme', systemTheme);
    document.body.setAttribute('theme', userTheme ?? systemTheme);
  });

  window.cycleTheme = function() {
    userTheme = document.body.getAttribute('user-theme');
    let nextIndex = (themes.indexOf(userTheme) + 1) % themes.length;
    userTheme = themes[nextIndex];
    localStorage.userTheme = userTheme;
    document.body.setAttribute('user-theme', userTheme);
    document.body.setAttribute('theme', userTheme ?? systemTheme);
  };
});
