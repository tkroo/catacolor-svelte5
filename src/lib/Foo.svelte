<script>
  let { foo } = $props();

  let count = $state(0);

  function increment() {
    count += 1;
  }
</script>

<h1>{foo}</h1>
<button onclick={increment}>{count}</button>