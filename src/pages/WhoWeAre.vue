<script>
export default {
    mounted() {
        window.addEventListener('load', () => {
            const elements = document.querySelectorAll('.team-member');
            let delay = 300; // Ritardo in millisecondi tra ogni elemento
            elements.forEach((element, index) => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }, delay * index);
            });
        });
    },
}
</script>

<template>
<div class="team">
    <div class="box">
        <div class="card text-center" style="--i:1;">
            <div class="card-front">
                <img src="../assets/gioele.webp" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Gioele
                    </h5>
                    <h6><i class="fa-solid fa-mug-hot"></i> Il GOAT <i class="fa-solid fa-mug-hot"></i></h6>
                </div>
            </div>
            <div class="card-back"></div>
        </div>
        <div class="card text-center" style="--i:2;">
            <div class="card-front">
                <img src="../assets/lorenzo.webp" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Lorenzo</h5>
                    <h6><i class="fa-solid fa-paintbrush"></i> Il GraFICO <i class="fa-solid fa-paintbrush"></i></h6>
                </div>
            </div>
            <div class="card-back"></div>
        </div>
        <div class="card text-center" style="--i:3;">
            <div class="card-front">
                <img src="../assets/mattia.webp" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Mattia</h5>
                    <h6><i class="fa-solid fa-crown"></i> Er Capoccia <i class="fa-solid fa-crown"></i></h6>
                </div>
            </div> 
            <div class="card-back"></div>
        </div>
        <div class="card text-center" style="--i:4;">
            <div class="card-front">
                <img src="https://placehold.co/1024x1024?text=Francesco"  class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Francesco</h5>
                    <h6><i class="fa-solid fa-heart-pulse"></i> Il Support <i class="fa-solid fa-heart-pulse"></i></h6>
                </div>
            </div>
            <div class="card-back"></div>
        </div>
        <div class="card text-center" style="--i:5;">
            <div class="card-front">
                <img src="https://placehold.co/1024x1024?text=Roberto" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Roberto</h5>
                    <h6><i class="fa-solid fa-ghost"></i> The Unknown <i class="fa-solid fa-ghost"></i></h6>
                </div>
            </div>
            <div class="card-back"></div>
        </div>
    </div>
</div>
</template>


<style lang="scss">

.team {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #000;
}

.box {
    position: relative;
    width: 250px;
    height: 350px;
    transform-style: preserve-3d;
    animation: animate 30s linear infinite;
}

@keyframes animate {
    0% {
        transform: perspective(1000px) rotateY(0deg);
    }
    100% {
        transform: perspective(1000px) rotateY(360deg);
    }
}

.box .card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: rotateY(calc(var(--i)* 72deg)) translateZ(250px);
    -webkit-box-reflect: below 0px linear-gradient(transparent, transparent, #0004);
    transition: transform 0.8s;
    border: none;
}

.card-front , .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.card-front {
    background: linear-gradient(135deg, #000000, #2F4F2F);
    padding: 5px;
    color:#D4AF37;
}

.card-back {
    background: linear-gradient(135deg, #000000, #2F4F2F);
    transform: rotateY(180deg);
}
</style>