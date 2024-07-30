<script>
  import { ColorTranslator } from "colortranslator";
  let { color = $bindable(), showControls } = $props();
  let options = { decimals: 0 };

  let initial = new ColorTranslator({R: color.R, G: color.G, B: color.B}, options);
  let hex = $state(initial.HEX);
  let HSL = $state(initial.HSLObject);
  let RGB = $state(initial.RGBObject);


  $effect(() => {
    const c = new ColorTranslator({R: color.R, G: color.G, B: color.B}, options);
    hex = c.HEX;
    HSL = c.HSLObject;
    RGB = c.RGBObject;
  });

  const updateColor = (e) => {
    const newValue = e.target.value;
    const name = e.target.name[0];
    let obj;
    if('HSL'.split('').includes(name)) {
      obj = name.length == 1 ? { ...HSL, [name]: parseInt(newValue) } : { ...HSL, [name.slice(0,1)]: parseInt(newValue) };
    } else if ('RGB'.split('').includes(name)) {
      obj = name.length == 1 ? { ...RGB, [name]: parseInt(newValue) } : { ...RGB, [name.slice(0,1)]: parseInt(newValue) };
    } else {
      obj = newValue;
    }
    color = { ...color, ...new ColorTranslator(obj, options).RGBObject };
  };


</script>

<div class="color-block">
  <label class="color-name" for="hex" title="click to edit color">{color.NAME}</label>
  <input type="color" name="hex" value={hex} onchange={updateColor}/>

  <!-- <div class="accordion" use:accordion={showControls}> -->
   {#if showControls}
    <div class="controls-hsl">
      <label for="H">h:
        <input type="range" name="H" min="0" max="359" value={HSL.H} oninput={updateColor} />
        <input type="number" name="H2" min="0" max="359" value={HSL.H} oninput={updateColor} />
      </label>
      <label for="S">s:
        <input type="range" name="S" min="0" max="100" value={HSL.S} oninput={updateColor} />
        <input type="number" name="S2" min="0" max="100" value={HSL.S} oninput={updateColor} />
      </label>
      <label for="L">l:
        <input type="range" name="L" min="0" max="100" value={HSL.L} oninput={updateColor} />
        <input type="number" name="L2" min="0" max="100" value={HSL.L} oninput={updateColor} />
      </label>
    </div>
    <div class="controls-rgb">
      <label for="R">r:
        <input type="range" name="R" min="0" max="255" value={RGB.R} oninput={updateColor} />
        <input type="number" name="R2" min="0" max="255" value={RGB.R} oninput={updateColor} />
      </label>
      <label for="G">g:
        <input type="range" name="G" min="0" max="255" value={RGB.G} oninput={updateColor} />
        <input type="number" name="G2" min="0" max="255" value={RGB.G} oninput={updateColor} />
      </label>
      <label for="B">b:
        <input type="range" name="B" min="0" max="255" value={RGB.B} oninput={updateColor} />
        <input type="number" name="B2" min="0" max="255" value={RGB.B} oninput={updateColor} />
      </label>
    </div>
    <div class="controls-hex">
      <label for="hex2">hex: <input class="hexinput" type="text" name="hex2" value={hex} onchange={updateColor}/></label>
    </div>
    {/if}
  <!-- </div> -->
</div>


<style>

  .color-block {
    min-width: 12%;
  }

  .controls-hsl, .controls-rgb, .controls-hex {
    margin-bottom: 1rem;
  }

  .controls-hsl label, .controls-rgb label {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  input {
    font-size: 0.75rem;
  }
  input[type="range"] {
    flex: 1;
    max-width: 50%;
  }
  input[type="number"] {
    width: 40px;
  }
  .hexinput {
    width: 56px;
  }


  input[type="color"] {
    display: block;
    width: 100%;
    height: 50px;
    border: 0;
    padding: 0;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  input[type="color"]::-moz-color-swatch {
    border: none;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
</style>