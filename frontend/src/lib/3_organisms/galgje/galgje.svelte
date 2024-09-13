<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Input from "@src/lib/1_atoms/input/input.svelte";
  import { onMount } from "svelte";

  let wordList = [];
  let inputLetter = "";
  let guessedLetters: string[] = [];
  let score = 0;
  let currentWord = "";
  let displayWord = "";
  let mistakes = 0;
  const maxMistakes = 13;
  let higscores = 0;
  let player = "";

  onMount(async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/pages/66e15c78e1bd5923be8a4772?locale=nl&draft=true&depth=4"
      );
      const data = await response.json();
      console.log(data); // Controleer de structuur van de API respons

      if (data?.defaultTemplate?.blocks?.[0]?.wordList) {
        wordList = data.defaultTemplate.blocks[0].wordList.map(
          (item) => item.word
        );
        currentWord = getRandomWord();
        displayWord = getDisplayWord();
      } else {
        console.error("wordList is niet gevonden in de API-respons");
      }
    } catch (error) {
      console.error("Fout bij het ophalen van de woordenlijst:", error);
    }
  });

  async function sendCurrentWordToBackend(words) {
    try {
      const response = await fetch("http://localhost:4000/api/save-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: words }),
      });

      if (!response.ok) {
        throw new Error("Fout bij het opslaan van het huidige woord");
      }
      console.log("Huidige woord succesvol opgeslagen op de server");
    } catch (error) {
      console.error(
        "Fout bij het verzenden van het woord naar de server:",
        error
      );
    }
  }

  async function sendScoreToBackend(scores, plrName) {
    try {
      scores = scores + 1;

      if (scores === 1) {
        console.log("Score is 1, niet verzenden naar de backend");
        return;
      }
      const response = await fetch("http://localhost:4000/api/save-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: scores, plrname: plrName }),
      });

      getscore();

      if (!response.ok) {
        throw new Error("Fout bij het opslaan van het huidige score");
      }

      console.log("Huidige score succesvol opgeslagen op de server");
    } catch (error) {
      console.log(scores);
      console.error(
        "Fout bij het verzenden van het score naar de server:",
        error
      );
    }
  }
  async function getscore() {
    try {
      const response = await fetch("http://localhost:4000/api/get-score");
      const contentType = response.headers.get("content-type");

      console.log("Response content-type:", contentType);
      const text = await response.text();
      console.log("Response text:", text);

      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(text);
        console.log("Parsed data:", data);

        if (response.ok) {
          const scoresArray = data.data;
          if (Array.isArray(scoresArray) && scoresArray.length > 0) {
            const scoreData = scoresArray[0];
            if (scoreData && scoreData.score !== undefined) {
              higscores = scoreData.score;
              console.log("Fetched score:", score);
              higscores = higscores - 1;
              console.log("Modified score:", score);
            } else {
              console.error(
                "Score data is undefined or does not contain score"
              );
            }
          } else {
            console.error("Scores array is empty or not an array");
          }
        } else {
          console.error("Error fetching score:", data.message);
        }
      } else {
        console.error("Response is not JSON");
      }
    } catch (error) {
      console.error("Error fetching score:", error);
    }
  }
  function gok(event) {
    if (event.key === "Enter") {
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
          } else if (
            currentWord
              .split("")
              .every((letter) => guessedLetters.includes(letter))
          ) {
            score += 1;
            alert("Gefeliciteerd! Je hebt het woord geraden.");
            resetGame();
          }

          displayWord = getDisplayWord();
        }
      } else {
        inputLetter = "dat is geen letter";
      }
      (event.target as HTMLInputElement).value = "";
    }
  }

  function getRandomWord() {
    if (wordList.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      let goodword = wordList[randomIndex].toLowerCase();
      sendCurrentWordToBackend(goodword);
      getscore();
      return goodword;
    }
    return "";
  }

  function getDisplayWord() {
    return currentWord
      .split("")
      .map((letter) =>
      guessedLetters.includes(letter) ? `<span class="guessed">${letter}</span>` : `<span class="not-guessed">_</span>`
      )
      .join(" ");
  }

  function resetGame() {
    guessedLetters = [];
    mistakes = 0;
    currentWord = getRandomWord();
    displayWord = getDisplayWord();
    inputLetter = "";
  }
  function reset_score() {
    score = 0;
    sendScoreToBackend(score, "");
  }
  function set_name(event) {
    if (event.key === "Enter") {
      player = (event.target as HTMLInputElement).value;
      (event.target as HTMLInputElement).value = "";
      if (player === "") {
        player = "No name";
      } else if (player === "player name") {
        player = "No name";
      }
    }
  }
  function sendScoreToBackendbefore() {
    sendScoreToBackend(score, player);
  }
  function redirect() {
    window.location.href = "/galgje/highscores";
  }
</script>

<section class="website">
  <Container>
    {#if wordList.length > 0}
      <div class="galgje">
        <div class="hangmanwood">
          <div class="height">
            <div class="hangmanwoods">
              <div
                class="hangmanwood__1 {mistakes >= 6 ? 'visible' : ''}"
              ></div>
              <div
                class="hangmanwood__2 {mistakes >= 4 ? 'visible' : ''}"
              ></div>
              <div
                class="hangmanwood__3 {mistakes >= 5 ? 'visible' : ''}"
              ></div>
              <div
                class="hangmanwood__4 {mistakes >= 3 ? 'visible' : ''}"
              ></div>
              <div
                class="hangmanwood__5 {mistakes >= 2 ? 'visible' : ''}"
              ></div>
              <div
                class="hangmanwood__6 {mistakes >= 1 ? 'visible' : ''}"
              ></div>
            </div>
            <div class="hangmanrope">
              <div
                class="hangmanrope__1 {mistakes >= 7 ? 'visible' : ''}"
              ></div>
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
              <img src="./icon/heuvel.svg" alt="heuvel" class="svg" />
              <input
                type="text"
                on:keypress={gok}
                maxlength="1"
                aria-label={currentWord}
                value="input letter"
              />
              <input
                type="text"
                on:keypress={set_name}
                class="name"
                value="player name"
              />
              <p>Score: {score}</p>
              <p>Highscore: {higscores}</p>
              <p>Ingevoerde letter: {inputLetter}</p>
              <p>Geraden letters: {guessedLetters.join(", ")}</p>
              <span class="woord">{@html displayWord}</span>
              <p>name: {player}</p>
              <button on:click={redirect}>highscores</button>
              <button on:click={reset_score}>reset score</button>
              <button on:click={sendScoreToBackendbefore}>publish score</button>
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
