<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import type { GalgjeBlock } from "@src/payload-types";  // Importeer het type GalgjeBlock

  // Ontvang de wordlist vanuit props (bijvoorbeeld via payload)
  export let wordsList: GalgjeBlock;  // Definieer de wordList via props van type GalgjeBlock

  let inputLetter = '';
  let wordList = wordsList?.wordList;
  let guessedLetters: string[] = [];  // Array van geraden letters
  let score = 0;  // Score variabele
  let currentWord = getRandomWord();  // Kies een willekeurig woord bij het laden
  let displayWord = getDisplayWord();  // Stel het weergegeven woord in bij het laden
  let mistakes = 0;  // Variable to track the number of wrong guesses
  const maxMistakes = 13;  // Maximum aantal fouten

  console.log(wordsList);
  

  // Functie voor het invoeren van een gok
  function gok(event) {
    if (event.key === 'Enter') {
      // Stop verdere invoer als het maximale aantal fouten is bereikt
      if (mistakes >= maxMistakes) {
        inputLetter = "Je hebt verloren!";  // Optioneel: Toon een bericht dat het spel voorbij is
        return;
      }

      const value = (event.target as HTMLInputElement).value.toLowerCase();  // Maak de invoer lowercase
      if (/^[a-z]$/.test(value)) {  // Controleer of de invoer een letter is
        inputLetter = value;
        if (!guessedLetters.includes(value)) {  // Voeg de letter toe als deze nog niet is geraden
          guessedLetters = [...guessedLetters, value];  // Werk guessedLetters bij en trigger reactiviteit
          
          // Controleer of de gegokte letter in het woord zit
          if (!currentWord.includes(value)) {
            mistakes += 1;  // Verhoog fouten als de letter niet in het woord zit
            console.log('fouten:', mistakes);
          } else if (currentWord.split('').every(letter => guessedLetters.includes(letter) || letter === value)) {
            score += 1;  // Verhoog de score als het woord volledig geraden is
            alert("Gefeliciteerd! Je hebt het woord geraden.");
            resetGame();  // Start een nieuw spel na het raden van het woord
          }

          displayWord = getDisplayWord();  // Update displayWord direct nadat guessedLetters zijn bijgewerkt
        }
      } else {
        inputLetter = 'dat is geen letter';  // Foutmelding bij ongeldige invoer
      }
      (event.target as HTMLInputElement).value = ''; // Reset het invoerveld
    }
  }

  // Functie om een willekeurig woord uit de woordenlijst te kiezen
  function getRandomWord() {
    // Controleer of de `wordList` een array met woorden bevat
    if (wordList?.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordList?.length);
      return wordList[randomIndex]?.word.toLowerCase();
    }
    return '';  // Geef een lege string terug als er geen woorden zijn
  }

  // Functie om het weergegeven woord samen te stellen
  function getDisplayWord() {
    return currentWord.split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')  // Vul de geraden letters in, vervang de overige door "_"
      .join(' ');  // Voeg spaties toe tussen de letters
  }

  // Functie om het spel te resetten (nieuw woord en fouten resetten)
  function resetGame() {
    guessedLetters = [];  // Reset de geraden letters
    mistakes = 0;  // Reset het aantal fouten
    currentWord = getRandomWord();  // Kies een nieuw willekeurig woord
    displayWord = getDisplayWord();  // Werk het weergegeven woord bij
    inputLetter = '';  // Reset de ingevoerde letter
  }
</script>




<section class="website">
  <Container>
    {#if wordList?.length > 0}
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
              <p>score: {score}</p>
              <p>Ingevoerde letter: {inputLetter}</p>
              <p>Geraden letters: {guessedLetters?.join(', ')}</p>
              <p>Woord: {displayWord}</p>
            </div>
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