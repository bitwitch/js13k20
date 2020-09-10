function loop(t) {
  if (!start) start = t;
  elapsed = t - start;

  if (!quit_game) {
    requestAnimationFrame(loop); 
  }

  draw_level(level_data);
  player.update(); // draws player also

  if (terminal_active) {
    terminalUpdate();
  }

  frame++;
}

// loads level from url hash
/*
Return Format:
d = {
  t: // tile size in px
  w: // level width in tiles,
  h: // level height in tiles,
  z: // use tile zero by default
  tiles[h][w]: // 2d-array of tile_ids
}
*/

function load_level_hash(b) {
  d={};
  d.t=b.codePointAt(0)-32;
  d.w=b.codePointAt(1)-32;
  d.h=b.codePointAt(2)-32;
  d.z=+b[3];
  d.m=[];

  d.tiles=[];
  for(j=0; j<d.h; j++) {
    var row = []; 
    for(i=0; i<d.w; i++) {
      row.push(0);
    }
    d.tiles.push(row);
  }

  for(i=4;i<b.length;i+=3) {
    d.tiles[b.codePointAt(i+1)-32][b.codePointAt(i)-32] = b.codePointAt(i+2)-32;
    //d.m.push([ b.codePointAt(i)-32, b.codePointAt(i+1)-32, b.codePointAt(i+2)-32 ]);
  }

  return d;
}


function load_level(str) {
  var rows = str.split('\n');

  d={};
  //d.t=b.codePointAt(0)-32;
  d.w=rows[0].length;
  d.h=rows.length;
  //d.z=+b[3];
  d.tiles=[];
  for(j=0; j<d.h; j++) {
    var row = []; 
    for(i=0; i<d.w; i++) {
      row.push(0);
    }
    d.tiles.push(row);
  }

  for(j=0; j<rows.length; j++) {
    for(i=0; i<rows[0].length; i++) {
      d.tiles[j][i] = rows[j].codePointAt(i) - 32;
    }
  }
  return d;
}


function tileAt (x, y) {
  if(!level_data.tiles[~~(y / 32)]){
    return 0;
  }
  return level_data.tiles[~~(y / 32)][~~(x / 32)] || 0;
}

function isSolid(id) {
  return tileSolidity[id];
}

function isTerminal(id) {
  return id == 7;
}
