<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import type { GalgjeBlock } from "@src/payload-types";  // Importeer het type GalgjeBlock
  import { onMount } from 'svelte';

  // Zet de initialisatie voor de woordlijst
  let wordList = [];  
  let inputLetter = '';
  let guessedLetters: string[] = [];  // Array van geraden letters
  let score = 0;  // Score variabele
  let currentWord = '';  // Zet de waarde in een lege string totdat de woordenlijst is opgehaald
  let displayWord = '';  // Stel het weergegeven woord in zodra de woordenlijst is geladen
  let mistakes = 0;  // Variable om het aantal fouten bij te houden
  const maxMistakes = 13;  // Maximum aantal fouten

  // Ophalen van de woordenlijst van de API
  onMount(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/pages/66e15c78e1bd5923be8a4772?locale=nl&draft=true&depth=4');
      const data = await response.json();
      console.log(data);  // Controleer de structuur van de API respons

      // Controleer of de 'wordList' bestaat binnen 'defaultTemplate.blocks[0]'
      if (data?.defaultTemplate?.blocks?.[0]?.wordList) {
        wordList = data.defaultTemplate.blocks[0].wordList.map(item => item.word);
        currentWord = getRandomWord();
        displayWord = getDisplayWord();
      } else {
        console.error('wordList is niet gevonden in de API-respons');
      }
    } catch (error) {
      console.error('Fout bij het ophalen van de woordenlijst:', error);
    }
  });

  async function sendCurrentWordToBackend(word) {
  try {
    const response = await fetch('http://localhost:4000/api/save-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentWord: word }),
    });

    if (!response.ok) {
      throw new Error('Fout bij het opslaan van het huidige woord');
    }
    console.log('Huidige woord succesvol opgeslagen op de server');
  } catch (error) {
    console.error('Fout bij het verzenden van het woord naar de server:', error);
  }
}

  // Functie voor het invoeren van een gok
  function gok(event) {
    if (event.key === 'Enter') {
      if (mistakes >= maxMistakes) {
        inputLetter = "Je hebt verloren!";
        score = 0;
        setTimeout(() => resetGame(), 2000);
        return;
      }

      const value = (event.target as HTMLInputElement).value.toLowerCase();
      if (/^[a-z]$/.test(value)) {
        inputLetter = value;
        if (!guessedLetters.includes(value)) {
          guessedLetters = [...guessedLetters, value];
          
          if (!currentWord.includes(value)) {
            mistakes += 1;
          } else if (currentWord.split('').every(letter => guessedLetters.includes(letter))) {
            score += 1;
            alert("Gefeliciteerd! Je hebt het woord geraden.");
            resetGame();
          }

          displayWord = getDisplayWord();
        }
      } else {
        inputLetter = 'dat is geen letter';
      }
      (event.target as HTMLInputElement).value = '';
    }
  }

  // Functie om een willekeurig woord uit de woordenlijst te kiezen
  function getRandomWord() {
    if (wordList.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      let goodword = wordList[randomIndex].toLowerCase();
      sendCurrentWordToBackend(goodword);
      return goodword;
    }
    return '';
  }

  // Functie om het weergegeven woord samen te stellen
  function getDisplayWord() {
    return currentWord.split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
  }

  // Functie om het spel te resetten
  function resetGame() {
    guessedLetters = [];
    mistakes = 0;
    currentWord = getRandomWord();
    displayWord = getDisplayWord();
    inputLetter = '';
  }
</script>

<section class="website">
  <Container>
    {#if wordList.length > 0}
    <div class="galgje">
      <div class="hangmanwood">
        <div class="height">
          <div class="hangmanwoods">
            <!-- Voeg dynamisch een class toe op basis van de fouten -->
            <div class="hangmanwood__1 {mistakes >= 6 ? 'visible' : ''}"></div>
            <div class="hangmanwood__2 {mistakes >= 4 ? 'visible' : ''}"></div>
            <div class="hangmanwood__3 {mistakes >= 5 ? 'visible' : ''}"></div>
            <div class="hangmanwood__4 {mistakes >= 3 ? 'visible' : ''}"></div>
            <div class="hangmanwood__5 {mistakes >= 2 ? 'visible' : ''}"></div>
            <div class="hangmanwood__6 {mistakes >= 1 ? 'visible' : ''}"></div>
          </div>
          <div class="hangmanrope">
            <div class="hangmanrope__1 {mistakes >= 7 ? 'visible' : ''}">
          </div>
          </div>
          <div class="man">
            <div class="man__1 {mistakes >= 8 ? 'visible' : ''}"></div>
            <div class="man__2 {mistakes >= 9 ? 'visible' : ''}"></div>
            <div class="man__3 {mistakes >= 10 ? 'visible' : ''}"></div>
            <div class="man__4 {mistakes >= 11 ? 'visible' : ''}"></div>
            <div class="man__5 {mistakes >= 12 ? 'visible' : ''}"></div>
            <div class="man__6 {mistakes >= 13 ? 'visible' : ''}"></div>
          </div>
          <div class="heuvel">
              <img src="./icon/heuvel.svg" alt="heuvel" class="svg">
              <input type="text" on:keypress={gok} maxlength="1">
              <p>Score: {score}</p>
              <p>Ingevoerde letter: {inputLetter}</p>
              <p>Geraden letters: {guessedLetters.join(', ')}</p>
              <p>Woord: {displayWord}</p>
              <p>{currentWord}</p>
            </div>
        </div>
      </div>
    </div>
    {:else}
      <p>Er is geen woordenlijst gevonden</p>
    {/if}
  </Container>
</section>

<style lang="scss">
  @import "./galgje.scss";
</style>
