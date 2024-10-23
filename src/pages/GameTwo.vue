<template>
	<div
		v-if="characters.length > 0"
		class="container d-flex justify-content-center">
		<!-- Selezione del personaggio o battaglia -->
		<div v-if="!gameStarted" class="character-selection text-center">
			<h2>Seleziona il tuo personaggio</h2>
			<div class="card">
				<img
					:src="`/img/character_images/${characters[currentIndex].name}.webp`"
					:alt="characters[currentIndex].name" />
				<div class="card-body text-center">
					<h5 class="card-title">{{ characters[currentIndex].name }}</h5>
					<p class="card-text">{{ characters[currentIndex].description }}</p>
					<div>Difesa: {{ characters[currentIndex].defence }}</div>
					<div>Intelligenza: {{ characters[currentIndex].intelligence }}</div>
					<div>Vita: {{ characters[currentIndex].life }}</div>
					<div>Velocità: {{ characters[currentIndex].speed }}</div>
					<div>Forza: {{ characters[currentIndex].strength }}</div>
					<div>
						Abilità:
						{{
							characters[currentIndex].ability
								? characters[currentIndex].ability.name
								: "Nessuna Abilità"
						}}
					</div>
				</div>
			</div>
			<div class="button-group text-center">
				<button class="prev" @click="prevCharacter">&lt;</button>
				<button class="next" @click="nextCharacter">&gt;</button>
			</div>
			<button class="start-game" @click="selectCharacter">
				Seleziona e Inizia
			</button>
		</div>

		<!-- Schermata di battaglia -->
		<div v-if="gameStarted" class="battle-screen container text-center">
			<div class="players d-flex justify-content-center">
				<div class="player-info">
					<h3>{{ selectedCharacter.name }}</h3>
					<img
						:src="`/img/character_images/${selectedCharacter.name}.webp`"
						:alt="selectedCharacter.name" />
					<p>
						Vita: {{ selectedCharacter.life }} / {{ selectedCharacter.maxLife }}
					</p>
					<div
						class="progress"
						role="progressbar"
						:aria-valuenow="selectedCharacter.life"
						aria-valuemin="0"
						:aria-valuemax="selectedCharacter.maxLife">
						<div
							class="progress-bar bg-danger"
							:style="{
								width:
									(selectedCharacter.life / selectedCharacter.maxLife) * 100 +
									'%',
							}"></div>
					</div>
				</div>
				<div class="enemy-info">
					<h3>{{ enemyCharacter.name }}</h3>
					<img
						:src="`/img/character_images/${enemyCharacter.name}.webp`"
						:alt="enemyCharacter.name" />
					<p>Vita: {{ enemyCharacter.life }} / {{ enemyCharacter.maxLife }}</p>
					<div
						class="progress"
						role="progressbar"
						:aria-valuenow="enemyCharacter.life"
						aria-valuemin="0"
						:aria-valuemax="enemyCharacter.maxLife">
						<div
							class="progress-bar bg-primary"
							:style="{
								width:
									(enemyCharacter.life / enemyCharacter.maxLife) * 100 + '%',
							}"></div>
					</div>
				</div>
			</div>

			<div class="actions text-center">
				<button @click="attack" :disabled="gameOver">Inizia</button>
				<!-- Altri pulsanti possono essere aggiunti qui -->
			</div>

			<div v-if="battleResult" class="battle-result">
				<h3>{{ battleResult }}</h3>
			</div>

			<!-- Log delle azioni -->
			<div class="action-log">
				<h4>Log delle azioni</h4>
				<div ref="actionLogContainer" class="action-log-container">
					<div v-for="(log, index) in actionLog" :key="index">
						{{ log }}
					</div>
				</div>
			</div>

			<!-- Bottone reset posizionato sotto il log delle azioni -->
			<button @click="resetGame" class="reset-button text-center">
				Nuova Partita
			</button>
		</div>
	</div>

	<!-- Messaggio se non ci sono personaggi -->
	<div v-else>
		<h2>Nessun personaggio disponibile!</h2>
	</div>
</template>

<script>
import axios from "axios"; // Assicurati di aver importato Axios
import { store } from "../store"; // Il tuo store

export default {
	data() {
		return {
			characters: [], // Personaggi dal store
			currentIndex: 0, // Indice del personaggio selezionato
			selectedCharacter: null, // Personaggio selezionato
			enemyCharacter: null, // Nemico selezionato casualmente
			gameStarted: false, // Stato di inizio del gioco
			battleResult: null, // Risultato della battaglia
			gameOver: false, // Stato della partita
			actionLog: [], // Log delle azioni
			evadeUsed: false, // Stato della schivata
			enemyEvadeUsed: false, // Stato della schivata dell'avversario
			intervalId: null, // Intervallo
		};
	},
	created() {
		this.getCharacters(); // Carica i personaggi quando il componente viene creato
	},
	methods: {
		getCharacters() {
			// Chiamata API per ottenere i personaggi
			axios
				.get("http://127.0.0.1:8000/api/characters")
				.then((response) => {
					store.characters = response.data.results; // Salva i personaggi nel store

					// Assicurati che ogni personaggio abbia un'abilità
					this.characters = store.characters.map((character) => {
						return {
							...character,
							ability: character.ability || {
								name: "Nessuna Abilità",
								description: "Questo personaggio non ha abilità speciali.",
								damage: 0,
								uses: 0,
							},
							maxLife: character.life, // Assicurati di avere la vita massima
						};
					});
				})
				.catch((error) => {
					console.error("Errore nel caricamento dei personaggi:", error); // Gestione errori
				});
		},
		nextCharacter() {
			this.currentIndex = (this.currentIndex + 1) % this.characters.length;
		},
		prevCharacter() {
			this.currentIndex =
				(this.currentIndex - 1 + this.characters.length) %
				this.characters.length;
		},
		selectCharacter() {
			this.selectedCharacter = { ...this.characters[this.currentIndex] };

			// Se non c'è abilità, fornisci un valore predefinito
			if (!this.selectedCharacter.ability) {
				this.selectedCharacter.ability = {
					name: "Nessuna Abilità",
					description: "Questo personaggio non ha abilità speciali.",
					damage: 0,
					uses: 0,
				};
			}

			this.startGame();
		},
		startGame() {
			const randomIndex = Math.floor(Math.random() * this.characters.length);
			this.enemyCharacter = { ...this.characters[randomIndex] };
			this.gameStarted = true;
			this.selectedCharacter.life = this.selectedCharacter.maxLife; // Reset vita
			this.enemyCharacter.life = this.enemyCharacter.maxLife; // Reset vita
			this.battleResult = null;
			this.gameOver = false;
			this.actionLog = []; // Resetta il log delle azioni
		},

		attack() {
			// Avvia la battaglia
			this.intervalId = setInterval(() => {
				this.executeTurn();
			}, 1000);
		},
		executeTurn() {
			const playerRandomFactor = this.randomFactor(); // Fattore casuale per il giocatore
			const enemyRandomFactor = this.randomFactor(); // Fattore casuale per il nemico

			// Calcola la possibilità di schivata
			const evadeChance = Math.random() < 0.5; // 50% di probabilità di schivare
			const critHitChance = Math.random() < 0.2; // 20% di probabilità di brutto colpo

			// Attacco del giocatore
			if (!this.enemyEvadeUsed && !evadeChance) {
				const playerDamage = Math.max(
					0,
					this.selectedCharacter.strength -
						this.enemyCharacter.defence +
						playerRandomFactor
				);

				// Aggiungi il moltiplicatore se c'è un brutto colpo
				const totalDamage = critHitChance ? playerDamage * 2 : playerDamage;
				this.enemyCharacter.life = Math.max(
					0,
					this.enemyCharacter.life - totalDamage
				);

				// Log dell'attacco
				this.actionLog.push(
					`${
						this.selectedCharacter.name
					} attacca e infligge ${totalDamage} danni a ${
						this.enemyCharacter.name
					}. ${critHitChance ? "(Brutto colpo!)" : ""}`
				);
			} else {
				this.actionLog.push(`${this.enemyCharacter.name} schiva l'attacco!`);
			}

			// Attacco del nemico
			if (!this.evadeUsed && !evadeChance) {
				const enemyDamage = Math.max(
					0,
					this.enemyCharacter.strength -
						this.selectedCharacter.defence +
						enemyRandomFactor
				);
				this.selectedCharacter.life = Math.max(
					0,
					this.selectedCharacter.life - enemyDamage
				);

				// Log dell'attacco del nemico
				this.actionLog.push(
					`${this.enemyCharacter.name} attacca e infligge ${enemyDamage} danni a ${this.selectedCharacter.name}.`
				);
			} else {
				this.actionLog.push(
					`${this.selectedCharacter.name} schiva l'attacco del nemico!`
				);
			}

			this.checkGameOver();
		},
		specialAttack() {
			if (this.selectedCharacter.ability.uses > 0) {
				const playerRandomFactor = this.randomFactor(); // Fattore casuale per il giocatore
				const enemyRandomFactor = this.randomFactor(); // Fattore casuale per il nemico

				// Se l'attacco speciale colpisce
				if (!this.enemyEvadeUsed) {
					const playerDamage =
						this.selectedCharacter.ability.damage + playerRandomFactor;

					// Aggiungi il moltiplicatore se c'è un brutto colpo
					const totalDamage =
						Math.random() < 0.2 ? playerDamage * 2 : playerDamage;
					this.enemyCharacter.life = Math.max(
						0,
						this.enemyCharacter.life - totalDamage
					);

					// Usa l'abilità
					this.selectedCharacter.ability.uses -= 1;

					// Log dell'attacco speciale
					this.actionLog.push(
						`${this.selectedCharacter.name} usa ${
							this.selectedCharacter.ability.name
						} e infligge ${totalDamage} danni a ${this.enemyCharacter.name}. ${
							totalDamage === playerDamage * 2 ? "(Brutto colpo!)" : ""
						}`
					);
				} else {
					this.actionLog.push(
						`${this.enemyCharacter.name} schiva l'attacco speciale!`
					);
				}

				this.checkGameOver();
			} else {
				this.actionLog.push(
					`${this.selectedCharacter.name} non ha più usi per l'abilità ${this.selectedCharacter.ability.name}.`
				);
			}
		},
		evade() {
			// Log della schivata
			this.evadeUsed = Math.random() < 0.5; // 50% di possibilità di schivare
			if (this.evadeUsed) {
				this.actionLog.push(`${this.selectedCharacter.name} schiva l'attacco!`);
			} else {
				// Se fallisce la schivata, subisce danni
				const enemyDamage = Math.max(
					0,
					this.enemyCharacter.strength -
						this.selectedCharacter.defence +
						this.randomFactor()
				);
				this.selectedCharacter.life = Math.max(
					0,
					this.selectedCharacter.life - enemyDamage
				);

				this.actionLog.push(
					`${this.enemyCharacter.name} colpisce ${this.selectedCharacter.name} infliggendo ${enemyDamage} danni.`
				);
			}
		},
		randomFactor() {
			return Math.floor(Math.random() * 6) - 3; // Fattore casuale tra -3 e 3
		},
		checkGameOver() {
			if (this.selectedCharacter.life <= 0) {
				this.gameOver = true;
				this.battleResult = "Hai perso la battaglia!";
				clearInterval(this.intervalId);
			} else if (this.enemyCharacter.life <= 0) {
				this.gameOver = true;
				this.battleResult = "Hai vinto la battaglia!";
				clearInterval(this.intervalId);
			}
		},
		resetGame() {
			this.gameStarted = false; // Resetta lo stato del gioco
			this.selectedCharacter = null; // Resetta il personaggio selezionato
			this.enemyCharacter = null; // Resetta il nemico
			this.currentIndex = 0; // Resetta l'indice del personaggio
			this.battleResult = null; // Resetta il risultato della battaglia
			this.actionLog = []; // Resetta il log delle azioni
			this.evadeUsed = false; // Resetta lo stato della schivata
			this.enemyEvadeUsed = false; // Resetta lo stato della schivata dell'avversario
		},
	},
	updated() {
		this.$nextTick(() => {
			const container = this.$refs.actionLogContainer;
			if (container) {
				container.scrollTop = container.scrollHeight;
			}
		});
	},
};
</script>

<style scoped>
/* Aggiungi qui il tuo CSS per lo styling */
.container {
	max-width: 800px;
	margin: auto;
}

.character-selection,
.battle-screen {
	text-align: center;
}

.button-group {
	margin: 20px 0;
}

.button-group button,
.reset-button {
	margin: 0 10px;
	padding: 10px 20px;
}

.battle-screen {
	border: 2px solid #ccc;
	padding: 20px;
	border-radius: 10px;
}

.progress {
	height: 20px;
	border-radius: 5px;
}

.action-log {
	margin-top: 20px;
}

.action-log-container {
	height: 200px; /* Regola l'altezza secondo le tue necessità */
	overflow-y: auto;
	border: 1px solid #ccc;
	padding: 10px;
	background-color: #f9f9f9;
	text-align: left; /* Allinea il testo a sinistra */
}

.battle-result {
	margin: 20px 0;
}
</style>
