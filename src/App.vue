<script>
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
	name: "App",
	components: {
		AppNavbar,
		AppFooter,
	},
};
</script>

<template>
	<AppNavbar />
	<router-view></router-view>
	<AppFooter />
</template>

<style scoped></style>
