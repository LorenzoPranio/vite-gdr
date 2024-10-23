<script>
import Home from "../assets/Home.png";
import Dungeon from "../assets/Dungeon.png";
import I_Personaggi from "../assets/I-Personaggi.webp";
import Gli_Oggetti from "../assets/Gli-Oggetti.webp";
import Chi_Siamo from "../assets/Chi-Siamo.webp";

export default {
	data() {
		return {
			items: [
				{
					name: "Chi Siamo?",
					description:
						"Siamo un team di appassionati di giochi di ruolo, uniti dalla passione per le avventure immersive e le storie avvincenti. Creiamo mondi dove la tua immaginazione è l'unico limite. Unisciti a noi e vivi l'esperienza definitiva del GDR.",
					image: Chi_Siamo,
					route: "/who-we-are",
				},
				{
					name: "Home",
					description:
						"Da oggi, questa sarà la tua dimora. Incontra nuovi amici, stringi alleanze e parti all'avventura!",
					image: Home,
					route: "/",
				},
				{
					name: "I Personaggi",
					description:
						"Scegli il tuo destino: eroi coraggiosi, ladri astuti o maghi potenti. Personalizza ogni dettaglio, dalle abilità alle alleanze, e vivi un'avventura unica. Il tuo personaggio, la tua storia.",
					image: I_Personaggi,
					route: "/characters",
				},
				{
					name: "Gli Oggetti",
					description:
						"Scopri un vasto arsenale di armi potenti e oggetti rari. Potenzia il tuo equipaggiamento, trova artefatti leggendari e sblocca abilità segrete. Ogni oggetto può fare la differenza tra la vittoria e la sconfitta.",
					image: Gli_Oggetti,
					route: "/items",
				},
				{
					name: "Inizia la tua avventura!",
					description:
						"Entra in un mondo di avventure senza limiti, dove le tue scelte plasmano il destino. Crea il tuo eroe, esplora terre misteriose e affronta sfide epiche. Sei pronto a scrivere la tua leggenda?",
					image: Dungeon,
					route: "/game-two",
				},
			],
		};
	},
	mounted() {
		const $next = this.$el.querySelector(".next");
		const $prev = this.$el.querySelector(".prev");

		$next.addEventListener("click", this.nextSlide);
		$prev.addEventListener("click", this.prevSlide);
	},
	computed: {
		showButton() {
			return this.items.name !== "Home";
		},
	},
	methods: {
		nextSlide() {
			const items = this.$el.querySelectorAll(".item");
			this.$el.querySelector(".slide").appendChild(items[0]);
		},
		prevSlide() {
			const items = this.$el.querySelectorAll(".item");
			this.$el.querySelector(".slide").prepend(items[items.length - 1]);
		},
	},
};
</script>
<template>
	<div class="container-custom">
		<div class="slide">
			<div
				class="item"
				v-for="(item, index) in items"
				:key="index"
				:style="{ backgroundImage: `url(${item.image})` }">
				<div class="content-custom">
					<div class="name">{{ item.name }}</div>
					<div class="des">{{ item.description }}</div>
					<button
						class="btn-custom"
						:class="item.name == 'Home' ? 'd-none' : ''">
						<a :href="item.route">Esplora</a>
					</button>
				</div>
			</div>
		</div>
		<div class="button">
			<button class="prev">
				<img class="btn-svg" src="../assets/Bow-Arrow-SX.svg" />
			</button>
			<button class="next">
				<img class="btn-svg" src="../assets/Bow-Arrow-RX.svg" />
			</button>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.container-custom {
	position: relative;
	width: 100vw;
	height: 100vh;
	background: #f5f5f5;
}
a {
	text-decoration: none;
	color: #d4af37;
}

.container-custom .slide .item {
	width: 330px;
	height: 500px;
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	border-radius: 20px;
	box-shadow: 0 30px 50px #505050;
	background-position: 50% 50%;
	background-size: cover;
	display: inline-block;
	transition: 0.5s;
}

.container-custom .slide .item::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(
		0,
		0,
		0,
		0.5
	); /* Modifica l'opacità secondo le tue esigenze */
	border-radius: inherit;
	z-index: 1; /* Posiziona l'overlay sopra l'immagine di background */
}

.slide .item:nth-child(1),
.slide .item:nth-child(2) {
	top: 0;
	left: 0;
	transform: translate(0, 0);
	border-radius: 0;
	width: 100%;
	height: 100%;
}

.slide .item:nth-child(3) {
	left: calc(50% + 100px);
}

.slide .item:nth-child(4) {
	left: calc(50% + 500px);
}

.slide .item:nth-child(n + 5) {
	left: calc(50% + 900px);
	opacity: 0;
}

.item .content-custom {
	position: relative;
	top: 50%;
	left: 100px;
	width: 400px;
	text-align: left;
	color: #eee;
	transform: translate(0, -50%);
	display: none;
	z-index: 2;
}

.slide .item:nth-child(2) .content-custom {
	display: block;
}

.content-custom .name {
	font-size: 55px;
	text-transform: uppercase;
	font-weight: bold;
	opacity: 0;
	animation: animate 1s ease-in-out 0.1s 1 forwards;
	color: #d4af37;
}

.content-custom .des {
	font-size: 25px;
	margin-top: 10px;
	margin-bottom: 20px;
	opacity: 0;
	animation: animate 1s ease-in-out 0.3s 1 forwards;
}

.content-custom button {
	padding: 10px 20px;
	border: none;
	cursor: pointer;
	opacity: 0;
	animation: animate 1s ease-in-out 0.6s 1 forwards;
}

@keyframes animate {
	from {
		opacity: 0;
		transform: translate(0, 100px);
		filter: blur(33px);
	}

	to {
		opacity: 1;
		transform: translate(0);
		filter: blur(0);
	}
}

.button {
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 20px;
}

.button button {
	width: 100px;
	height: 70px;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	margin: 0 50px;
	border: 1px solid #000;
	transition: 0.3s;
	background: linear-gradient(45deg, #000000, #2f4f2f);
}

.button button:hover {
	background: linear-gradient(45deg, #141414, #75af75);
	scale: (1.15);
}

.btn-svg {
	width: 50%;
	filter: invert(57%) sepia(78%) saturate(400%) hue-rotate(1deg)
		brightness(105%) contrast(99%);
}

.btn-custom {
	background: linear-gradient(45deg, #000000, #2f4f2f);
	width: 200px;
	height: 50px;
	font-size: 20px;
	font-weight: bolder;
	color: #d4af37;

	&:hover {
		background: linear-gradient(45deg, #141414, #75af75);
		scale: (1.15);
	}
}
</style>
