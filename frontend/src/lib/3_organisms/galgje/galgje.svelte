<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import type { GalgjeBlock } from "@src/payload-types";

  let inputLetter = '';
  let guessedLetters: string[] = [];  // Array van geraden letters
  let content = {
    wordList: ['voorbeeld']  // Lijst met woorden
  };
  let currentWord = content.wordList[0].toLowerCase();  // Zorg ervoor dat het te raden woord lowercase is
  let displayWord = getDisplayWord();  // Stel het weergegeven woord in bij het laden
  let mistakes = 0;  // Variable to track the number of wrong guesses

  // Functie voor het invoeren van een gok
  function gok(event) {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value.toLowerCase();  // Maak de invoer lowercase
      if (/^[a-z]$/.test(value)) {  // Controleer of de invoer een letter is
        inputLetter = value;
        if (!guessedLetters.includes(value)) {  // Voeg de letter toe als deze nog niet is geraden
          guessedLetters = [...guessedLetters, value];  // Werk guessedLetters bij en trigger reactiviteit
          
          // Controleer of de gegokte letter in het woord zit
          if (!currentWord.includes(value)) {
            mistakes += 1;  // Verhoog fouten als de letter niet in het woord zit
            console.log('fouten:', mistakes);
          }

          displayWord = getDisplayWord();  // Update displayWord direct nadat guessedLetters zijn bijgewerkt
        }
      } else {
        inputLetter = 'dat is geen letter';  // Foutmelding bij ongeldige invoer
      }
      (event.target as HTMLInputElement).value = ''; // Reset het invoerveld
    }
  }

  // Functie om het weergegeven woord samen te stellen
  function getDisplayWord() {
    return currentWord.split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')  // Vul de geraden letters in, vervang de overige door "_"
      .join(' ');  // Voeg spaties toe tussen de letters
  }
</script>



<section class="website">
  <Container>
    {#if Array.isArray(content?.wordList) && content.wordList.length > 0}
      <div class="galgje">
        <div class="hangmanwood">
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
            <p class="e1">Ingevoerde letter: {inputLetter}</p>
            <p class="e2">Geraden letters: {guessedLetters.join(', ')}</p>
            <p class="e3">Woord: {displayWord}</p>
          </div>
        </div>
      </div>
    {:else}
      <p>Er is geen woorden lijst gevonden</p>
    {/if}
  </Container>
</section>


<style lang="scss">
  @import "./galgje.scss";
</style>