<template>
	<div
		v-if="store.characters && store.characters.length > 0"
		class="bodyBattle">
		<div class="container">
			<div class="row container_character_selection">
				<div class="col-6 user_card">
					<div class="card">
						<img
							class="card-img-top"
							:src="`/img/character_images/${store.characters[currentIndex].name}.webp`"
							:alt="store.characters[currentIndex].name" />
						<div class="card-body text-center">
							<h5 class="card-title text-center">
								{{ store.characters[currentIndex].name }}
							</h5>
							<p class="card-text">
								{{ store.characters[currentIndex].description }}
							</p>
							<div>Difesa: {{ store.characters[currentIndex].defence }}</div>
							<div>
								Intelligenza: {{ store.characters[currentIndex].intelligence }}
							</div>
							<div>Vita: {{ store.characters[currentIndex].life }}</div>
							<div>Velocità: {{ store.characters[currentIndex].speed }}</div>
							<div>Forza: {{ store.characters[currentIndex].strength }}</div>
						</div>
					</div>
					<button class="prev" @click="prevCharacter">&lt;</button>
					<button class="next" @click="nextCharacter">&gt;</button>
				</div>
				<div class="col-6" v-if="store.characters[randomCharacters]">
					<div class="card">
						<img
							class="card-img-top"
							:src="`/img/character_images/${store.characters[randomCharacters].name}.webp`"
							:alt="store.characters[randomCharacters].name" />
						<div class="card-body text-center">
							<h5 class="card-title">
								{{ store.characters[randomCharacters].name }}
							</h5>
							<p class="card-text">
								{{ store.characters[randomCharacters].description }}
							</p>
							<div>
								Difesa: {{ store.characters[randomCharacters].defence }}
							</div>
							<div>
								Intelligenza:
								{{ store.characters[randomCharacters].intelligence }}
							</div>
							<div>Vita: {{ store.characters[randomCharacters].life }}</div>
							<div>
								Velocità: {{ store.characters[randomCharacters].speed }}
							</div>
							<div>
								Forza: {{ store.characters[randomCharacters].strength }}
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 text-center mt-3">
					<button class="btn bg-success text-white" @click="startGame">
						Start Game
					</button>
				</div>
			</div>
			<div v-if="store.characters.length > 3" class="container-fluid">
				<div class="row">
					<h2 class="text-center">Battle!</h2>
					<div class="col-6">
						<h3>{{ store.characters[currentIndex].name }}</h3>
						<img
							:src="`/img/character_images/${store.characters[currentIndex].name}.webp`"
							:alt="store.characters[currentIndex].name" />
						<p>Life: {{ store.characters[currentIndex].life }}</p>
						<div
							class="progress"
							role="progressbar"
							aria-label="Basic example"
							:aria-valuenow="store.characters[currentIndex].life"
							aria-valuemin="0"
							:aria-valuemax="store.characters[currentIndex].maxLife">
							<div
								class="progress-bar bg-danger"
								:style="{ width: store.characters[currentIndex].life + '%' }"></div>
						</div>
					</div>
					<div class="col-6">
						<h3>{{ store.characters[randomCharacters].name }}</h3>
						<img
							:src="`/img/character_images/${store.characters[randomCharacters].name}.webp`"
							:alt="store.characters[randomCharacters].name" />
						<p>Life: {{ store.characters[randomCharacters].life }}</p>
						<div
							class="progress"
							role="progressbar"
							aria-label="Basic example"
							:aria-valuenow="store.characters[randomCharacters].life"
							aria-valuemin="0"
							:aria-valuemax="store.characters[randomCharacters].maxLife">
							<div
								class="progress-bar bg-primary"
								:style="{ width: store.characters[randomCharacters].life + '%' }"></div>
						</div>
					</div>
				</div>
				<div class="text-center mt-4">
					<button class="btn btn-success" @click="startBattle">Start Battle</button>
				</div>
				<div v-if="battleResult" class="text-center mt-4">
					<h3>{{ battleResult }}</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { store } from "../store";

export default {
	data() {
		return {
			store,
			currentIndex: 0,
			randomCharacters: 3,
			intervalId: null,
			battleResult: null,
		};
	},
	methods: {
		nextCharacter() {
			if (this.currentIndex < this.store.characters.length - 1) {
				this.currentIndex++;
			} else {
				this.currentIndex = 0; // Torna al primo personaggio
			}
		},
		prevCharacter() {
			if (this.currentIndex > 0) {
				this.currentIndex--;
			} else {
				this.currentIndex = this.store.characters.length - 1; // Torna all'ultimo personaggio
			}
		},
		startGame() {
			const randomNumber = Math.floor(Math.random() * store.characters.length);
			this.scrollCharacters(randomNumber);
		},
		scrollCharacters(targetIndex) {
			// Imposta un intervallo che cambia l'indice randomCharacters
			this.intervalId = setInterval(() => {
				if (this.randomCharacters < this.store.characters.length - 1) {
					this.randomCharacters++;
				} else {
					this.randomCharacters = 0; // Torna al primo personaggio
				}

				// Se l'indice attuale è uguale a quello random selezionato, ferma lo scorrimento
				if (this.randomCharacters === targetIndex) {
					clearInterval(this.intervalId); // Ferma lo scorrimento
					this.intervalId = null; // Reset dell'intervallo
				}
			}, 100); // Cambia i character ogni 100ms per dare l'effetto di scorrimento veloce
		},
		startBattle() {
			// Resetta la vita dei personaggi all'inizio di ogni battaglia
			this.store.characters[this.currentIndex].life = 100;
			this.store.characters[this.randomCharacters].life = 100;
			this.battleResult = null;

			// Avvia la battaglia
			this.intervalId = setInterval(() => {
				this.executeTurn();
			}, 1000);
		},
		executeTurn() {
			// Calcola il danno inflitto da ciascun personaggio
			const damage1 = Math.max(0, this.store.characters[this.currentIndex].strength - this.store.characters[this.randomCharacters].defence + this.randomFactor());
			const damage2 = Math.max(0, this.store.characters[this.randomCharacters].strength - this.store.characters[this.currentIndex].defence + this.randomFactor());

			// Aggiorna la vita dei personaggi
			this.store.characters[this.currentIndex].life = Math.max(0, this.store.characters[this.currentIndex].life - damage2);
			this.store.characters[this.randomCharacters].life = Math.max(0, this.store.characters[this.randomCharacters].life - damage1);

			// Verifica se uno dei personaggi ha perso
			if (this.store.characters[this.currentIndex].life <= 0 && this.store.characters[this.randomCharacters].life <= 0) {
				this.battleResult = "It's a draw!";
				clearInterval(this.intervalId);
			} else if (this.store.characters[this.currentIndex].life <= 0) {
				this.store.characters[this.currentIndex].life = 0;
				this.battleResult = `${this.store.characters[this.randomCharacters].name} wins!`;
				clearInterval(this.intervalId);
			} else if (this.store.characters[this.randomCharacters].life <= 0) {
				this.store.characters[this.randomCharacters].life = 0;
				this.battleResult = `${this.store.characters[this.currentIndex].name} wins!`;
				clearInterval(this.intervalId);
			}
		},
		randomFactor() {
			// Aggiunge un po' di casualità per simulare i tiri di dado (es. da 0 a 5)
			return Math.floor(Math.random() * 6);
		},
	},
};
</script>

<style scoped>
.container_character_selection {
	margin-bottom: 100px;

	p {
		color: black;
	}
}

.user_card {
	position: relative;
}

.prev,
.next {
	position: absolute;
	bottom: 35%;
	width: 25%;
	transform: translate(0%, 50%);
}

.prev {
	left: 1.5rem;
}

.next {
	right: 1.5rem;
}

.bodyBattle {
	padding: 25px 0 150px 0;
}

img {
	width: 100%;
	height: auto;
	object-fit: contain;
}
.progress-bar {
	transition: width 0.5s ease-in-out;
}
</style>
