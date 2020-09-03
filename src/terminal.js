var pad_l = 20;
var pad_t = 30;

var terminal_lines = [
  "Twas brillig and the slithy tove",
  "Did gyre and gimbal in the wabe.",
  "All mimsy were the borogoves",
  "And the momeraths outgrabe.",
];

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
  c.fillStyle = "#09080FEA";
  c.fillRect(x, y, w, h);

  // draw text
  c.fillStyle = "#9B69FF";
  c.font = '16px monospace';

  for (i=0; i<terminal_lines.length; i++) {
    c.fillText(terminal_lines[i], x + pad_l, y + pad_t + (i * 20) );
  }

}
