<script setup>
import Characters from "./pages/Characters.vue"
import AppNavbar from "./components/AppNavbar.vue"
import AppFooter from "./components/AppFooter.vue"
import HomePage from "./pages/HomePage.vue"
import WhoWeAre from "./pages/WhoWeAre.vue"
import GameBoard from "./pages/GameBoard.vue"
</script>

<template>
    <AppNavbar />
    <!-- <HomePage /> -->
    <Characters />
    <GameBoard />
    <!-- <WhoWeAre /> -->
    <AppFooter />
</template>

<style scoped></style>
