<script>
import wallpaper_01 from "../assets/wallpaper_01.png";
import wallpaper_02 from "../assets/wallpaper_02.png";
import wallpaper_03 from "../assets/wallpaper_03.png";
import wallpaper_04 from "../assets/wallpaper_04.png";
import wallpaper_05 from "../assets/wallpaper_05.png";
import wallpaper_06 from "../assets/wallpaper_06.png";
import wallpaper_07 from "../assets/wallpaper_07.png";
import wallpaper_08 from "../assets/wallpaper_08.png";
import wallpaper_09 from "../assets/wallpaper_09.png";
import wallpaper_10 from "../assets/wallpaper_10.png";

export default {
	data() {
		return {
			items: [
				{
					name: "Sky Fortress",
					description: "A magical flying fortress drifting above the clouds...",
					image: wallpaper_01,
					url: "",
				},
				{
					name: "Elven Sanctuary",
					description:
						"A serene elven village hidden deep in an ancient forest...",
					image: wallpaper_02,
					url: "",
				},
				{
					name: "Ancient Dungeon",
					description:
						"A dark and eerie dungeon with stone walls covered in moss and runes...",
					image: wallpaper_03,
					url: "",
				},
				{
					name: "Enchanted Forest",
					description:
						"A mysterious forest with ancient, twisted trees covered in glowing runes...",
					image: wallpaper_04,
					url: "",
				},
				{
					name: "Dragon's Cave",
					description:
						"A massive, dimly lit cave filled with piles of glittering treasure...",
					image: wallpaper_05,
					url: "",
				},
				{
					name: "Majestic Castle",
					description: "A towering medieval castle built atop a high cliff...",
					image: wallpaper_06,
					url: "",
				},
				{
					name: "Epic Battle Scene",
					description: "A medieval fantasy battlefield at sunset...",
					image: wallpaper_07,
					url: "",
				},
				{
					name: "Mythical City",
					description: "A sprawling medieval city built on floating islands...",
					image: wallpaper_08,
					url: "",
				},
				{
					name: "Dark Sorcerer's Lair",
					description:
						"A dark and menacing underground cavern filled with skulls...",
					image: wallpaper_09,
					url: "",
				},
				{
					name: "Battle Against the Undead",
					description:
						"A dark and foggy battlefield where an army of undead skeletons...",
					image: wallpaper_10,
					url: "",
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
	<div class="container">
		<div class="slide">
			<div
				class="item"
				v-for="(item, index) in items"
				:key="index"
				:style="{ backgroundImage: `url(${item.image})` }">
				<div class="content">
					<div class="name">{{ item.name }}</div>
					<div class="des">{{ item.description }}</div>
					<button>Show More</button>
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
<style lang="scss">
.container {
	position: relative;
	width: 800px;
	height: 480px;
	background: #f5f5f5;
	box-shadow: 0 30px 50px #dbdbdb;
	margin-top: 50px;
}

.container .slide .item {
	width: 165px;
	height: 250px;
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
	left: calc(50% + 430px);
	opacity: 0;
}

.item .content {
	position: absolute;
	top: 50%;
	left: 100px;
	width: 300px;
	text-align: left;
	color: #eee;
	transform: translate(0, -50%);
	display: none;
}

.slide .item:nth-child(2) .content {
	display: block;
}

.content .name {
	font-size: 40px;
	text-transform: uppercase;
	font-weight: bold;
	opacity: 0;
	animation: animate 1s ease-in-out 1 forwards;
}

.content .des {
	margin-top: 10px;
	margin-bottom: 20px;
	opacity: 0;
	animation: animate 1s ease-in-out 0.3s 1 forwards;
}

.content button {
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
	bottom: 70px;
}

.button button {
	width: 40px;
	height: 35px;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	margin: 0 50px;
	border: 1px solid #000;
	transition: 0.3s;
}

.button button:hover {
	background: #ababab;
	color: #fff;
}

.btn-svg {
	width: 65%;
	margin-bottom: 5px;
}
</style>
