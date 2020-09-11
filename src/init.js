// globals
//
var c = a.getContext("2d"),

  i,j,k,

  player, mouse_x, mouse_y, left, right, jump,

  text_input = "",

  prompt_line = "> ",

  start = 0,

  elapsed = 0,

  friction = 0.9,

  grav = 0.4,

  frame = 0,

  terminal_active = false,

  current_level = 0,
  level_data = {},
  level_data_1 = {},

  levels_data = [], // temp delete me

  quit_game = false,

  game_state = 0, // 0 normal, 1 terminal, 2 menu


  collision_layers = [
     //[4,26], // wall, player
  ],

  tileSolidity = [ 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

  levels = [
`#                                       
#                                       
#                                       
!!!                                     
"""!!!!                          !!!!!!!
"""""""!!!  '                    """""""
""""""""""!!!!!                  """""""
"""""""""""""""                   """"""
"""""""""""""""                    """""
"""""""""""""""                     """"
"""""""""""""""                     """"
"""""""""""""""                      """
"""""""""""""                        """
"""""""""""                          """
""""""""""                           """
""""""""""                           """
""""""""""                           """
""""""""""                            ""
"""""""""                             ""
""""""""                               "`,




`#                                       
#                                       
#                                       
!!!                                     
"""!!!!                     !!   !!!!!!!
"""""""!!!  '         !!!!!!""   """""""
""""""""""!!!!!  !!!!!""""""""   """""""
"""""""""""""""  """""""""""""    """"""
"""""""""""""""  """""""""""""     """""
"""""""""""""""  """""""""""""      """"
"""""""""""""""  """"""""""""       """"
"""""""""""""""   """""""""""        """
"""""""""""""     """""""""""        """
"""""""""""         """""""""        """
""""""""""          """"""""         """
""""""""""          """"""""         """
""""""""""            """"""         """
""""""""""            """"""          ""
"""""""""             """"""          ""
""""""""               """""           "`,


``,
``,

];

//platform1 = `
//!!!            
//"""!!!!        
//"""""""!!!   ' 
//""""""""""!!!!!
//"""""""""""""""
//"""""""""""""""
//"""""""""""""""
//"""""""""""""""
//"""""""""""""""
//"""""""""""""  
//"""""""""""    
//""""""""""     
//""""""""""     
//""""""""""     
//""""""""""     
//"""""""""      
//""""""""
//`;

//platform2 = `
//!!!!!!!
//"""""""
//"""""""
 //""""""
  //"""""
   //""""
   //""""
    //"""
    //"""
    //"""
    //"""
    //"""
    //"""
     //""
     //""
      //"
//`;


// input event listeners
// 
a.onmousemove = e=>{ 
  mouse_x = e.clientX - a.offsetLeft; 
  mouse_y = e.clientY - a.offsetTop; 
};

document.onkeydown = e => { 
  if (e.key == "ArrowRight")
    right = true;
  if (e.key == "ArrowLeft")
    left = true;
  if (e.key == "ArrowUp")
    jump = true;

  // terminal input
  if (!terminal_active) return;

  if (e.key == "Enter")
    terminal_execute();

}

document.onkeyup = e => { 
  if (e.key == "ArrowRight")
    right = false;
  if (e.key == "ArrowLeft")
    left = false;
  if (e.key == "ArrowUp")
    jump = false;

  // terminal input
  if (!terminal_active) return;

  if (e.keyCode >= 48 && e.keyCode <= 90 || e.key == " " || e.key == "_") {
    text_input += e.key;
  } else if (e.key == "Backspace" || e.key == "Delete") {
    text_input = text_input.slice(0, -1);
  }

};


// FPS Calculator 
(function (){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();
