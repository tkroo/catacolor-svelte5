<script>
  import { detectThemeFormat } from '$lib/utils';
  import ColorBlock from "$lib/ColorBlock.svelte";
  let message = $state(null);
	let success = $state(false);
  let showControls = $state(false);
  
  let colors = $state([
    { NAME: 'BLACK', R: 36, G: 31, B: 40 },
    { NAME: 'RED', R: 192, G: 28, B: 40 },
		{ NAME: 'GREEN', R: 24, G: 139, B: 24 },
		{ NAME: 'BROWN', R: 99, G: 69, B: 44 },
		{ NAME: 'BLUE', R: 26, G: 95, B: 180 },
		{ NAME: 'MAGENTA', R: 179, G: 45, B: 145 },
		{ NAME: 'CYAN', R: 0, G: 164, B: 164 },
		{ NAME: 'GRAY', R: 185, G: 185, B: 185 },
		{ NAME: 'DGRAY', R: 127, G: 127, B: 127 },
		{ NAME: 'LRED', R: 251, G: 115, B: 115 },
		{ NAME: 'LGREEN', R: 15, G: 198, B: 61 },
		{ NAME: 'YELLOW', R: 255, G: 201, B: 60 },
		{ NAME: 'LBLUE', R: 98, G: 160, B: 234 },
		{ NAME: 'LMAGENTA', R: 229, G: 126, B: 213 },
		{ NAME: 'LCYAN', R: 84, G: 244, B: 254 },
		{ NAME: 'WHITE', R: 255, G: 255, B: 255 }
  ]);

  const prefix = '[\n  {\n    "type": "colordef",';
	const suffix = '\n  }\n]';
	const prefix_file = prefix+'\n';
	const suffix_file = suffix;

  let outputString = $derived(`[
  {
    "type": "colordef",
${colors.map(c => `    "${c.NAME}": [ ${c.R}, ${c.G}, ${c.B} ]`).join(',\n')}
  } 
]`);

const writeToFile = () => {
		const blob = new Blob([prefix_file, output, suffix_file], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'base_colors-untitled.json';
		a.click();
	};

	const readFile = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = async(event) => {
			const data = event.target.result;
			let tmp = await detectThemeFormat(data, file);
			if (tmp.file_type != 'unknown') {
				message = `LOADED ${tmp.file_type} theme: '${file.name}'`;
				success = true;
				colors = [...tmp.colors];
			} else {
				success = false;
				message = `ERROR: unexpected format ${tmp.file_type} ${file.name}`;
			}
		}
		reader.readAsText(file);
	}

</script>
<div class="col-adjust">

  <h2 class="f-light">Adjust</h2>
  
  <p style="font-size: 0.75rem">
		Click the colors for the native color picker or <button class="btn" onclick={() => showControls = !showControls}>{showControls ? 'hide controls' : 'show controls'}</button>
	</p>
</div>

<div class="color-blocks">
  {#each colors as _, i}
  <ColorBlock bind:color={colors[i]} {showControls} />
  {/each}
</div>

<div class="controls">
  <!-- <div class="smaller">
    optional: load a {#each $formats as format, i}
    <a href="{format.url}">{format.name}</a>{#if i < $formats.length - 1}&nbsp;or&nbsp;{/if}
    {/each}
    theme. <a href="/about">(more info)</a>
  </div> -->
  <label for="file-upload" class="btn custom-file-upload">load theme
  <input
    id="file-upload"
    type="file"
    class="input"
    name="file-upload"
    onchange={readFile}/>
  </label>
  {#if message}<span class="{success ? 'success' : 'error'}">{message}</span>{/if}
</div>

<div>
<textarea readonly rows="22" cols="40">
{outputString}
</textarea>
</div>


<style>
  .color-blocks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>