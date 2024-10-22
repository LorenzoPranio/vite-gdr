<template>
    <div class="battle-container">
        <h2>Battle!</h2>
        <div class="row">
            <div class="col-6">
                <h3>{{ character1.name }}</h3>
                <img
                    :src="`/img/character_images/${character1.name}.webp`"
                    :alt="character1.name" />
                <p>Life: {{ character1.life }}</p>
            </div>
            <div class="col-6">
                <h3>{{ character2.name }}</h3>
                <img
                    :src="`/img/character_images/${character2.name}.webp`"
                    :alt="character2.name" />
                <p>Life: {{ character2.life }}</p>
            </div>
        </div>
        <button @click="startBattle">Start Battle</button>
        <div v-if="battleResult">
            <h3>{{ battleResult }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        character1: Object,
        character2: Object,
    },
    data() {
        return {
            battleResult: null,
        }
    },
    methods: {
        startBattle() {
            // Logica semplice per determinare il vincitore
            const damage1 = Math.max(0, this.character1.strength - this.character2.defence)
            const damage2 = Math.max(0, this.character2.strength - this.character1.defence)

            // Sottrai la vita in base al danno inflitto
            this.character1.life -= damage2
            this.character2.life -= damage1

            // Determina il vincitore
            if (this.character1.life <= 0 && this.character2.life <= 0) {
                this.battleResult = "It's a draw!"
            } else if (this.character1.life <= 0) {
                this.battleResult = `${this.character2.name} wins!`
            } else if (this.character2.life <= 0) {
                this.battleResult = `${this.character1.name} wins!`
            } else {
                this.battleResult = "The battle is ongoing!"
            }
        },
    },
}
</script>

<style scoped>
img {
    width: 100%;
    height: auto;
    object-fit: contain;
}
</style>
