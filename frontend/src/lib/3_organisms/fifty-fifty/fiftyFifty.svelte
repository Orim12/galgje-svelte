<script lang="ts">
  import { onMount } from 'svelte';
  export let content;

  let word: string = '';

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/get-word');
      const data = await response.json();
      if (response.ok) {
        word = data.data.word; 
        console.log('Fetched word:', word);
        
      } else {
        console.error('Error fetching word:', data.message);
      }
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  });

  function refresh() {
    location.reload();
  }
</script>

<section class="fifty-fifty">
  <h1>het word is: {word}</h1>
  <button on:click={refresh}>refres</button>
</section>

<style lang="scss">
  @import "./fiftyFifty.scss";
</style>