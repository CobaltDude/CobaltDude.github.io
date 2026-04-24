function updateWin98Clock() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  document.getElementById('win98-clock').textContent =
    (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
}

updateWin98Clock();
setInterval(updateWin98Clock, 10000);