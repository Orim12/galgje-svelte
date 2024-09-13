<script>
  import { onMount } from 'svelte';

  export let content;

  let highscores = [];
  let names = [];

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/get-score');
      const contentType = response.headers.get('content-type');
      
      console.log('Response content-type:', contentType);
      const text = await response.text();
      console.log('Response text:', text);

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(text);
        console.log('Parsed data:', data);

        if (response.ok) {
          let scoresArray = Array.isArray(data.data) ? data.data : [data.data];
          highscores = scoresArray.map(item => item.score);
          names = scoresArray.map(item => item.plrname);
          console.log('Fetched scores:', highscores);
          console.log('Fetched names:', names);
          
          // Modify each score
          highscores = highscores.map(score => score - 1);
          console.log('Modified scores:', highscores);
        } else {
          console.error('Error fetching scores:', data.message);
        }
      } else {
        console.error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    }

    if (names.length === 0) {
      names.push('No name');
    }
  });
</script>

<section class="go-to-block">
  {#if highscores.length === 0}
    <h3>No scores found</h3>
  {:else}
    {#each highscores as score, index}
      <h3>{names[index]}: {score}</h3>
    {/each}
  {/if}
</section>