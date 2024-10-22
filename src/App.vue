<script>
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
	name: "App",
	components: {
		AppNavbar,
		AppFooter,
	},
	computed: {
		showNavbar() {
			return this.$route.path !== "/";
		},
		showFooter() {
			return this.$route.path !== "/";
		},
	},
};
</script>

<template>
	<div>
		<AppNavbar v-if="showNavbar" />
		<router-view></router-view>
		<AppFooter v-if="showFooter" />
	</div>
</template>

<style scoped></style>
