<script>
export default {
	props: {
		character1: Object,
		character2: Object,
	},
	data() {
		return {
			battleResult: null,
			isBlocking: false, // Stato del blocco
		};
	},
	methods: {
		// Metodo per l'attacco del personaggio 1
		character1Attack() {
			let damage = this.calculateDamage(this.character1.strength, this.character2.defence);
			if (this.isBlocking) {
				damage = Math.floor(damage / 2); // Se il personaggio 2 blocca, riduci il danno a metà
				this.isBlocking = false; // Bloccare funziona una sola volta per attacco
			}
			this.character2.life = Math.max(0, this.character2.life - damage);
			this.checkBattleResult();
		},

		// Metodo per il blocco del personaggio 2
		character2Block() {
			this.isBlocking = true; // Attiva lo stato di blocco
		},

		// Metodo per calcolare il danno
		calculateDamage(strength, defence) {
			const baseDamage = Math.max(0, strength - defence);
			const randomFactor = Math.floor(Math.random() * 6); // Aggiungi un fattore casuale
			return baseDamage + randomFactor;
		},

		// Controlla se c'è un vincitore
		checkBattleResult() {
			if (this.character1.life <= 0 && this.character2.life <= 0) {
				this.battleResult = "It's a draw!";
			} else if (this.character1.life <= 0) {
				this.battleResult = `${this.character2.name} wins!`;
			} else if (this.character2.life <= 0) {
				this.battleResult = `${this.character1.name} wins!`;
			} else {
				this.battleResult = null; // Se non c'è ancora un vincitore, continua la battaglia
			}
		},
	},
};
</script>


<template>
	<div class="container-fluid">
		<div class="row">
			<h2 class="text-center">Battle!</h2>
			<div class="col-6">
				<h3>{{ character1.name }}</h3>
				<img
					:src="`/img/character_images/${character1.name}.webp`"
					:alt="character1.name" />
				<p>Life: {{ character1.life }}</p>
				<div
					class="progress"
					role="progressbar"
					aria-label="Basic example"
					:aria-valuenow="character1.life"
					aria-valuemin="0"
					aria-valuemax="100">
					<div
						class="progress-bar bg-danger"
						:style="{ width: character1.life + '%' }"></div>
				</div>
			</div>
			<div class="col-6">
				<h3>{{ character2.name }}</h3>
				<img
					:src="`/img/character_images/${character2.name}.webp`"
					:alt="character2.name" />
				<p>Life: {{ character2.life }}</p>
				<div
					class="progress"
					role="progressbar"
					aria-label="Basic example"
					:aria-valuenow="character2.life"
					aria-valuemin="0"
					aria-valuemax="100">
					<div
						class="progress-bar bg-primary"
						:style="{ width: character2.life + '%' }"></div>
				</div>
			</div>
		</div>

		<!-- Bottoni per attaccare e bloccare -->
		<div class="text-center mt-4">
			<button class="btn btn-success" @click="character1Attack">Personaggio 1 Attacca</button>
			<button class="btn btn-warning" @click="character2Block">Personaggio 2 Blocca</button>
		</div>

		<div v-if="battleResult" class="text-center mt-4">
			<h3>{{ battleResult }}</h3>
		</div>
	</div>
</template>

<style scoped>
img {
	width: 100%;
	height: auto;
	object-fit: contain;
}
</style>
