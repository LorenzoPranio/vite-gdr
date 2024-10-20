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
    <div class="bg-black">
        <div class="container">
            <h1 class="text-center my-5">Chi Siamo</h1>
            <p class="text-center mb-4">
                Siamo un team di professionisti appassionati, dedicati a fornire
                soluzioni innovative e di alta qualità ai nostri clienti.
            </p>
            <p class="text-center mb-4">
                La nostra missione è creare valore attraverso l'innovazione e
                l'eccellenza nel servizio, lavorando a stretto contatto con i
                nostri clienti per raggiungere i loro obiettivi.
            </p>

            <h2 class="text-center my-4">Il Nostro Team</h2>
            <div class="row">
                <div class="col-md-4 team-member">
                    <div class="card">
                        <img src="https://via.placeholder.com/150" alt="Membro del team" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">Mario Rossi</h5>
                            <p class="card-text">CEO & Fondatore</p>
                            <p class="card-description">Mario è il nostro fondatore, con oltre 10 anni di esperienza nel settore.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 team-member">
                    <div class="card">
                        <img src="https://via.placeholder.com/150" alt="Membro del team" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">Giulia Bianchi</h5>
                            <p class="card-text">Direttore Marketing</p>
                            <p class="card-description">Giulia porta creatività e strategia al nostro team, garantendo la massima visibilità.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 team-member">
                    <div class="card">
                        <img src="https://via.placeholder.com/150" alt="Membro del team" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">Luca Verdi</h5>
                            <p class="card-text">Sviluppatore Software</p>
                            <p class="card-description">Luca è il nostro esperto di tecnologia, sempre pronto a trovare soluzioni innovative.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

.bg-black {
    background-color: #121212;
    color: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}


.container {
    padding: 40px;
    max-width: 900px;
}


h1 {
    color: #00aaff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2.5rem;
}

h2 {
    color: #ffffff;
    font-weight: 600;
    font-size: 2rem;
}

.team-member {
    margin-bottom: 30px;
}

.card {
    background-color: #1e1e1e;
    border-radius: 15px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
}


.card-img-top {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.card-title {
    font-weight: bold;
    font-size: 1.5rem;
}

.card-text {
    color: #00aaff;
    font-weight: 600;
}

.card-description {
    font-size: 0.9rem;
    color: #d1d1d1;
    margin-top: 10px;
}

p {
    text-align: center;
    color: #d1d1d1;
    margin-bottom: 20px;
    font-size: 1rem;
}

</style>