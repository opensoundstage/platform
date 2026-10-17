document.getElementById('year').textContent = new Date().getFullYear();
const button = document.getElementById('demo-button');
button?.addEventListener('click', () => {
  const title = document.getElementById('song-name').value.trim();
  document.getElementById('demo-output').textContent = title ? `▶ Your BUILD is ready: “${title}” is in the example show and linked to its creator. (Demo only — no audio plays.)` : 'First, GET a song by entering its title.';
});
