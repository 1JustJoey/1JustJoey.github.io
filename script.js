document.addEventListener('DOMContentLoaded', () => {
      // Theme logic
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

      window.cycleTheme = function () {
        userTheme = document.body.getAttribute('user-theme');
        let nextIndex = (themes.indexOf(userTheme) + 1) % themes.length;
        userTheme = themes[nextIndex];
        localStorage.userTheme = userTheme;
        document.body.setAttribute('user-theme', userTheme);
        document.body.setAttribute('theme', userTheme ?? systemTheme);
      };

      document.getElementById('toggle-btn').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
      });

      document.getElementById('toggle-btn2').addEventListener('click', window.cycleTheme);

      // YouTube API
      const apiKey = "AIzaSyAVCX3weVh6o-UfWLeU2a1rpnS80OFe_vs";
      const channelId = "UCrtgYpVkJJwHbTozLYnLnRQ";

      async function loadLatestVideo() {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=1`
          );
          const data = await response.json();
          const videoId = data.items[0].id.videoId;

          const embedHtml = `
            <div class="responsive-iframe">
              <iframe
                src="https://www.youtube.com/embed/${videoId}"
                title="Latest YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
          `;

          document.getElementById('videoContainer').innerHTML = embedHtml;
        } catch (error) {
          console.error('Error fetching YouTube video:', error);
          document.getElementById('videoContainer').textContent = 'Failed to load video.';
        }
      }

      loadLatestVideo();
    });