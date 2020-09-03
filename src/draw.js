function draw_level(d) {
  c.fillStyle = "#000000";
  c.fillRect(0,0,1280,640);

  for (j=0; j<d.h; j++) {
    for (i=0; i<d.w; i++) {
      draw_tile(d.tiles[j][i], i, j);
    }
  }
}

function draw_tile(id, tile_x, tile_y) {
  c.drawImage(tileset, id * 16, 0, 16, 16, tile_x * 32, tile_y * 32, 32, 32);
}

