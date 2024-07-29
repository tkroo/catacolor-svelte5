import hexRgb from "hex-rgb";


const extractFromDFcolors2 = async (inputString) => {
  let lines = inputString.split('\n').filter(line => line.trim() !== '').filter(line => line.match(/^\[.*\]$/gm))
  .map(line => line.replace(/^\[|\]$/g, ''));
  const colorObject = {};
  for(let i = 0; i < lines.length; i+=3) {
    let name_string = lines[i].split("_")[0];
    if(name_string == 'LGRAY') name_string = 'GRAY'; // explicit color name for LGRAY
    for(let j = 0; j < 3; j++) {
      colorObject[name_string] = colorObject[name_string] || []; // Create array if not exists
      colorObject[name_string].push(parseInt(lines[i+j].split(":")[1])); // Add color value to array
    }
  };
  return colorObject;
}

const GoghTranslateObj = {
color_01: 'BLACK',
color_02: 'RED',
color_03: 'GREEN',
color_04: 'BROWN',
color_05: 'BLUE',
color_06: 'MAGENTA',
color_07: 'CYAN',
color_08: 'GRAY',
color_09: 'DGRAY',
color_10: 'LRED',
color_11: 'LGREEN',
color_12: 'YELLOW',
color_13: 'LBLUE',
color_14: 'LMAGENTA',
color_15: 'LCYAN',
color_16: 'WHITE'};

const extractFromGoghColors = async (input) => {
  delete input.foreground;
  delete input.background;
  delete input.name;
  delete input.hash;
  delete input.cursor;
  let result = {};
  for (const property in input) {
    let rgb = hexRgb(input[property]);
    result[GoghTranslateObj[property]] = [rgb.red, rgb.green, rgb.blue];
  }
  return result;   
}

const ordered = [ 'BLACK', 'RED', 'GREEN', 'BROWN', 'BLUE', 'MAGENTA', 'CYAN', 'GRAY', 'DGRAY', 'LRED', 'LGREEN', 'YELLOW', 'LBLUE', 'LMAGENTA', 'LCYAN', 'WHITE' ];

	// let sorted = colors.sort( (a, b) => ordered.indexOf(a.NAME) - ordered.indexOf(b.NAME) );


const mapColorObject = (obj) => {
  console.log('mapColorObject(obj) : ', obj)
  const result = [];
  const { type } = obj;
  console.log('type : ', type)
  for (const color in obj) {
    if (color !== 'type') {
      result.push({ NAME: color, R: obj[color][0], G: obj[color][1], B: obj[color][2] });
    }
  }
  if (type) result.unshift({ type });
  return result.sort( (a, b) => ordered.indexOf(a.NAME) - ordered.indexOf(b.NAME) )
};


export const detectThemeFormat = async (data, file) => {
  data = data.trim();
  let colors = [];
  let file_type = 'unknown';

  if (file.type == 'text/plain') {
    const obj = await extractFromDFcolors2(data);
    file_type = 'Dwarf Fortress';
    colors = mapColorObject(obj);
  } else if (file.type == 'application/json' && Array.isArray(JSON.parse(data))) {
    const j = JSON.parse(data);
    if(j[0].type == 'colordef') {
      file_type = 'Cataclysm';
    }
    delete j[0].type;
    colors = mapColorObject(j[0]);
  } else if (file.type == 'application/json' && typeof JSON.parse(data) == 'object') {
    const j = JSON.parse(data); 
    if('color_01' in j) {
      const obj = await extractFromGoghColors(j);
      file_type = 'Gogh';
      colors = mapColorObject(obj);
    }
  }
  return {colors, file_type};
}


export function accordion(node, isOpen) {
  let initialHeight = 220;
  node.style.height = isOpen ? 'auto' : 0;
  node.style.opacity = isOpen ? 1 : 0;
  node.style.overflow = "hidden";
  return {
    update(isOpen) {
      let animation = node.animate(
        [
          {
            opacity: 1,
            height: initialHeight + 'px',
            overflow: 'hidden'
          },
          {
            opacity: 0,
            height: 0,
            overflow: 'hidden'
          }
        ],
        { duration: 200, fill: 'both' }
      );
      animation.pause();
      if (!isOpen) {
        animation.play();
      } else {
        animation.reverse();
      }
    }
  };
}