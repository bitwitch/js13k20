onload = () => {

// load level
// if there is a level hash, play it 
//level_data = load_level_hash(decodeURIComponent(location.hash.slice(1)));

level_data = load_level(levels[0]);
level_data_1 = load_level(levels[1]);
levels_data = [level_data, level_data_1];

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
