onload = () => {




// load level
// if there is a level hash, play it 
//level_data = load_level(decodeURIComponent(location.hash.slice(1)));
level_data = load_level(levels[0]);

player = new Player();

// platformer mode
if (game_state == 0) {
  requestAnimationFrame(loop);

// terminal mode
//} else if (game_state == 1) {
  //requestAnimationFrame(terminalLoop);

// menu
} else if (game_state == 2) {
  requestAnimationFrame(menuLoop);

}





}
