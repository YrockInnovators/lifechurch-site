// Pop It Up (Tweet Quote social share links, etc.)
function popitup(url) {
  newwindow=window.open(url,'name','height=300,width=550');
  if (window.focus) {
    newwindow.focus()
  }
  return false;
}
