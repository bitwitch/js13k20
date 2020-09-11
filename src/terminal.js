var pad_l = 20;
var pad_t = 30;

var terminal_lines = [
  "load platform_1",
  "success",
  "load platxrfmor_2",
  "Error: 404 Not Found: platxrfmor_2",
  "load platform_3",
  "success",
];

var max_terminal_lines = 22;

function terminalUpdate() {
  drawTerminal();
}

function drawTerminal() {

  var x = c.canvas.width * 0.25;
  var y = c.canvas.height * 0.1;
  var w = c.canvas.width * 0.5;
  var h = c.canvas.height * 0.8;

  c.strokeStyle = "#DDDDDD";
  c.lineWidth = 25;
  c.strokeRect(x, y, w, h);

  //c.fillStyle = "#450EACEA";
  c.fillStyle = "#111A15EA";
  c.fillRect(x, y, w, h);

  // draw text history
  c.fillStyle = "#0AFF0E";
  c.font = '16px monospace';

  for (i=0; i<terminal_lines.length; i++) {
    c.fillText(terminal_lines[i].toUpperCase(), x + pad_l, y + pad_t + (i * 20) );
  }

  // draw prompt & user input
  prompt_line = "> " + text_input;
  c.fillText(prompt_line, x + pad_l, y + h - 20);

  if ( ~~(elapsed / 500) % 2 == 0 ) { 
    c.fillRect(x + pad_l + c.measureText(prompt_line).width, y + h - 33, 12, 16);
  }

}

function terminal_execute() {
  terminal_write(text_input);

  var args = text_input.toLowerCase().split(" ");

  text_input = "";

  if (args[0] == "help") {
    terminal_write("");
    terminal_write("Commands:");
    terminal_write("load <platform_name>    loads a platform");
    return;
  }

  if (args[0] != "load") {
    terminal_write("Error: Unknown command " + args[0]);
    return;
  }
  
  if (args[1] != "platform_2") {
    terminal_write("Error: 404 Not Found: " + args[1]);
    return;
  }

  current_level = 1;
  terminal_write("success");

}

function terminal_write(s) {
  terminal_lines.push(s);
  if (terminal_lines.length > max_terminal_lines) {
    terminal_lines = terminal_lines.slice(1);    
  }
}

//function terminalListenDown(e) {
//}

//function terminalListenUp(e) {
  //if (!terminal_active) return;

  //if (e.keyCode >= 97 && e.keyCode <= 122) {
    //text_input += e.key;
  //} else if (e.key == "BACKSPACE" || e.key == "DELETE") {
    //text_input = text_input.slice(0, -1);
  //}
//}

