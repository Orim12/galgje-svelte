<script lang="ts">
  import { onMount } from 'svelte';
  import type { FiftyFiftyBlock } from "@src/payload-types";
  export let content: FiftyFiftyBlock;

  let word: string = '';

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/get-word');
      const data = await response.json();
      if (response.ok) {
        word = data.data.word; // Veronderstel dat het woord in data.data.word zit
        console.log('Fetched word:', word);
        
      } else {
        console.error('Error fetching word:', data.message);
      }
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  });
</script>

<section class="fifty-fifty">
  <h1>het word is: {word}</h1>
</section>

<style lang="scss">
  @import "./fiftyFifty.scss";
</style>