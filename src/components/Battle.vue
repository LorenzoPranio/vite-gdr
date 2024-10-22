<script>
export default {
	props: {
		character1: Object,
		character2: Object,
	},
	data() {
		return {
			battleResult: null,
			intervalId: null,
		};
	},
	methods: {
		startBattle() {
			// Resetta la vita dei personaggi all'inizio di ogni battaglia
			this.character1.life = 100;
			this.character2.life = 100;
			this.battleResult = null;

			// Avvia la battaglia
			this.intervalId = setInterval(() => {
				this.executeTurn();
			}, 1000);
		},
		executeTurn() {
			// Calcola il danno inflitto da ciascun personaggio
			const damage1 = Math.max(0, this.character1.strength - this.character2.defence + this.randomFactor());
			const damage2 = Math.max(0, this.character2.strength - this.character1.defence + this.randomFactor());

			// Aggiorna la vita dei personaggi
			this.character1.life = Math.max(0, this.character1.life - damage2);
			this.character2.life = Math.max(0, this.character2.life - damage1);

			// Verifica se uno dei personaggi ha perso
			if (this.character1.life <= 0 && this.character2.life <= 0) {
				this.battleResult = "It's a draw!";
				clearInterval(this.intervalId);
			} else if (this.character1.life <= 0) {
				this.character1.life = 0;
				this.battleResult = `${this.character2.name} wins!`;
				clearInterval(this.intervalId);
			} else if (this.character2.life <= 0) {
				this.character2.life = 0;
				this.battleResult = `${this.character1.name} wins!`;
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
		<div class="text-center mt-4">
			<button class="btn btn-success" @click="startBattle">Start Battle</button>
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
.progress-bar {
	transition: width 0.5s ease-in-out;
}
</style>
