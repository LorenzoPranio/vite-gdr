<script>
import axios from "axios";
import { store } from "../store";

export default {
	data() {
		return {
			store,
			hovereditem: null, // Aggiungi per tenere traccia del personaggio su cui si passa col mouse
		};
	},
	mounted() {
		this.getitems();
		const track = document.getElementById("image-track");

		const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

		const handleOnUp = () => {
			track.dataset.mouseDownAt = "0";
			track.dataset.prevPercentage = track.dataset.percentage;
		};

		const handleOnMove = (e) => {
			if (track.dataset.mouseDownAt === "0") return;

			const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
				maxDelta = window.innerWidth / 2;

			const percentage = (mouseDelta / maxDelta) * -100,
				nextPercentageUnconstrained =
					parseFloat(track.dataset.prevPercentage) + percentage,
				nextPercentage = Math.max(
					Math.min(nextPercentageUnconstrained, 0),
					-100
				);

			track.dataset.percentage = nextPercentage;

			track.animate(
				{
					transform: `translate(${nextPercentage}%, -50%)`,
				},
				{ duration: 1200, fill: "forwards" }
			);

			for (const image of track.getElementsByClassName("image")) {
				image.animate(
					{
						objectPosition: `${100 + nextPercentage}% center`,
					},
					{ duration: 1200, fill: "forwards" }
				);
			}
		};

		window.onmousedown = (e) => handleOnDown(e);
		window.ontouchstart = (e) => handleOnDown(e.touches[0]);
		window.onmouseup = (e) => handleOnUp(e);
		window.ontouchend = (e) => handleOnUp(e.touches[0]);
		window.onmousemove = (e) => handleOnMove(e);
		window.ontouchmove = (e) => handleOnMove(e.touches[0]);
	},
	methods: {
		getitems() {
			axios.get("http://127.0.0.1:8000/api/items").then((response) => {
				store.items = response.data.results;
			});
		},
		showOverlay(item) {
			this.hovereditem = item;
		},
		hideOverlay() {
			this.hovereditem = null;
		},
	},
};
</script>

<template>
	<div class="bg-items">
		<div class="body-items">
			<h1 class="text-center fw-bold">Oggetti</h1>
			<div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
				<div
					v-for="(item, index) in store.items"
					:key="index"
					class="image-container"
					@mouseover="showOverlay(item)"
					@mouseleave="hideOverlay">
					<img
						:src="`/img/Items_icons/${item.name.toLowerCase()}.png`"
						:alt="item.name"
						class="image"
						draggable="false" />
					<div v-if="hovereditem === item" class="overlay">
						<h3>{{ item.name }}</h3>
						<p class="text-light">{{ item.cost }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" sscoped>
.bg-items {
	background-image: url(../assets/wall_backgroung.webp);
	background-size: cover;
}
.body-items {
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.65);
	margin: 0rem;
	overflow-x: hidden;
	position: relative;
}

#image-track {
	display: flex;
	gap: 4vmin;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(0%, -50%);
	user-select: none;
}

#image-track > .image-container {
	position: relative;
	width: 28vmin;
	height: 38vmin;

	&:hover .image {
		transform: scale(1.1);
		transition: 0.2s;
		cursor: pointer;
	}
}

.image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: 50% 50%;
	border-radius: 15px;
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 5px;
	background-color: rgba(0, 0, 0, 0.75);
	color: #d4af37;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	opacity: 0;
	transition: opacity 0.3s;
}

.image-container:hover .overlay {
	opacity: 1;
}
h1 {
	text-align: center;
	margin-bottom: 20px;
	color: #d4af37;
	font-weight: 700;
	padding-top: 100px;
	font-size: 75px;
}
</style>
