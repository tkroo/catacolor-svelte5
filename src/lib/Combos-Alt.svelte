<script>
	let {sorted = $bindable()} = $props();
  import contrast from 'get-contrast';

  const allNames = sorted.map((c) => c.NAME);

  const createCombos = (sorted) => {
    const array = [];
    for (const fg in sorted) {
      const fgColor = sorted[fg];
      for (const bg in sorted) {
        const bgColor = sorted[bg];
        const combo = [bgColor, fgColor];
        if (combo[0].NAME != combo[1].NAME) array.push(combo);
      }
    }
    return array;
  }

  const comboChunks = (sorted) => {
    const array = [];
    for (const name in allNames) {
      const array2 = [];
      for (const fg in sorted) {
        if (sorted[fg].NAME != sorted[name].NAME) array2.push([sorted[fg], sorted[name]]);
      }
      array.push(array2);
    }
    return array;
  }

  let cc = $derived(comboChunks(sorted));

  const myratio = (combo) => {
    let c1 = `rgb(${combo[0].R}, ${combo[0].G}, ${combo[0].B})`;
    let c2 = `rgb(${combo[1].R}, ${combo[1].G}, ${combo[1].B})`;
    return contrast.score(c1,c2)
  }

  let showWCAG = $state(false);


</script>

<p style="font-size: 0.75rem">A preview of foreground/background color combinations. <button class="btn" onclick={() => (showWCAG = !showWCAG)}>toggle contrast scores</button></p>

<div class="new-combos">
  {#each cc as chunk}
    <div class="chunk">
      {#each chunk as combo}
        <div class="combo" style="background-color: rgb({combo[1].R}, {combo[1].G}, {combo[1].B}); color: rgb({combo[0].R}, {combo[0].G}, {combo[0].B})">
          <span class="inner"><span class="XXfixed-width">{combo[0].NAME} on {combo[1].NAME}</span> You must prepare to face the many hardships to come.</span>
          {#if showWCAG}<span class={myratio(combo) == 'Fail' ? 'wcag fail' : 'wcag'}>{myratio(combo)}</span>{/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .wcag {
    color: #eee;
    background-color: #444;
    padding: 0 0.25rem;
    font-size: 0.6rem;
  }
  .fail {
    color: crimson;
  }

  .new-combos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .chunk {
    padding: 0.5rem;
  }
</style>