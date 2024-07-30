<script>
  import { formats } from "$lib/formats";
</script>

<a href="/">&larr; back</a>
<div class="wrap">
  <h1>Info</h1>
  <p>CataColor is a color theme editor for the game <a href="https://cataclysmdda.org/">Cataclysm: Dark Days Ahead</a>.</p>
  
  <a id="instructions"><h2>Instructions</h2></a>
  <p>Copy and paste the output code into: <code>&lt;CDDA_PATH&gt;/config/base_colors.json</code></p>
  <p>If you're using Catapult launcher, the file might be here: <code>&lt;CDDA_PATH&gt;/dda/userdata/config/base_colors.json</code></p>
  <p class="or">Or</p>
  <p>Download as a .json file</p>
  <ol>
    <li>Put the .json file here:<br><code>&lt;CDDA_PATH&gt;/data/raw/color_themes/base_colors-YOURTHEME.json</code></li>
    <li>Launch Cataclysm</li>
    <li>In the start menu, choose <code>[Settings]</code></li>
    <li>Choose <code>&gt;&gt; Colors</code></li>
    <li>Press <code>C</code> and choose your theme from the list.</li>
  </ol>
  <p>You may need to relaunch the game to see the changes.</p>

  <h2>Importing</h2>
  <p>This tool can (optionally) import color theme files from:</p>
  <ul>
    {#each formats as format}
    <li>{format.name} <a href="{format.url}">link to themes</a></li>
    {/each}
  </ul>
  <p>If importing an existing theme, the tool will try to automatically detect the format, and then conversion is attempted.</p>
  <p class="warning">The format detection is not very robust, so if the format is not as expected, theme import may fail.</p>
</div>


<style>
  .wrap {
    --ml: 1rem;
    margin: 0 0 0 var(--ml);
  }
  p {
    margin: 0;
    padding: 0;
  }
  .or {
    margin: 0.5rem 0;
    text-transform: uppercase;
    font-weight: bold;
  }
  h1, h2 {
    margin: 2rem 0 0 calc(var(--ml)*-1);
  }
  h1 {
    margin-top: 1rem;
  }
  ul, ol {
    margin-top: 0;
    padding: 0 0 0 2rem;
  }
  .warning {
    font-weight: 400;
    font-style: italic;
    color: orange;
  }
  #instructions {
    color: #eee;
  }
</style>
