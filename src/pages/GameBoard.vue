<template>
    <div v-if="store.characters && store.characters.length > 0">
        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
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
                    <button class="prev" @click="prevCharacter"><</button>
                    <button class="next" @click="nextCharacter">></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store"

export default {
    data() {
        return {
            store,
            currentIndex: 0,
        }
    },
    methods: {
        nextCharacter() {
            if (this.currentIndex < this.store.characters.length - 1) {
                this.currentIndex++
            } else {
                this.currentIndex = 0 // Torna al primo personaggio
            }
        },
        prevCharacter() {
            if (this.currentIndex > 0) {
                this.currentIndex--
            } else {
                this.currentIndex = this.store.characters.length - 1 // Torna all'ultimo personaggio
            }
        },
    },
}
</script>

<style scoped>
.col-6 {
    position: relative;
}

.prev,
.next {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
}

.prev {
    left: 1.5rem;
}

.next {
    right: 1.5rem;
}
</style>
