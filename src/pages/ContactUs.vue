<script>
export default {
    mounted() {
        window.addEventListener('load', () => {
            const formElements = document.querySelectorAll('.form-group');
            let delay = 200;
            formElements.forEach((element, index) => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }, delay * index);
                });
            });
        });

        // Funzione per aggiungere animazioni interattive agli input
        const inputs = document.querySelectorAll('.form-control');

        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.05)'; // Ingrandisce l'input
                this.style.boxShadow = '0 0 15px rgba(0, 170, 255, 0.5)'; // Effetto glow
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)'; // Torna alla dimensione originale
                this.style.boxShadow = 'none'; // Rimuove il glow

                // Se l'input è vuoto, scuote l'elemento
                if (!this.value.trim()) {
                    this.classList.add('shake');
                    setTimeout(() => this.classList.remove('shake'), 500); // Rimuove l'effetto di shake dopo 0.5 secondi
                }
            });
        });

        // Gestione submit form con animazione di successo o errore
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disabilita il pulsante e aggiunge un effetto di invio
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.classList.add('sending');

            // Simulazione di invio (puoi sostituirlo con una chiamata API reale)
            setTimeout(() => {
                submitButton.classList.remove('sending');
                submitButton.classList.add('sent'); // Animazione di successo
                submitButton.textContent = 'Messaggio inviato!';
                
                // Reimposta il form dopo 2 secondi
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('sent');
                    submitButton.textContent = 'Invia Messaggio';
                    form.reset();
                }, 2000);
            }, 1500); // Simula un invio ritardato
        });
    },
}

</script>
<template>
    <div class="bg-black">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8">
                    <h1 class="text-center my-5 fw-bold">Contattaci</h1>
                    <p class="text-center mb-4">Ci piacerebbe sentirti! Compila il modulo qui sotto e ti risponderemo il prima possibile.</p>
                    
                    <form>
                        <div class="form-group mb-3">
                            <label for="nome" class="form-label">Nome completo</label>
                            <input type="text" class="form-control" id="nome" placeholder="Il tuo nome completo" required>
                        </div>
    
                        <div class="form-group mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Il tuo indirizzo email" required>
                        </div>
    
                        <div class="form-group mb-3">
                            <label for="oggetto" class="form-label">Oggetto</label>
                            <input type="text" class="form-control" id="oggetto" placeholder="L'oggetto del messaggio" required>
                        </div>
    
                        <div class="form-group mb-3">
                            <label for="messaggio" class="form-label">Messaggio</label>
                            <textarea class="form-control" id="messaggio" rows="5" placeholder="Il tuo messaggio" required></textarea>
                        </div>
    
                        <!-- Aggiungiamo la classe form-group per applicare l'animazione anche al pulsante -->
                        <div class="form-group d-grid">
                            <button type="submit" class="btn btn-primary btn-lg">Invia Messaggio</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss">
/* Applica uno sfondo nero all'intera pagina e imposta il testo in bianco */
.bg-black {
    background-color: black;
    color: white;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

/* Stile per il contenitore del modulo */
.contact-container {
    background-color: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Ombra più forte */
    max-width: 600px;
    width: 100%;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 1s forwards ease-in-out;
}

/* Animazione per far comparire il contenitore in modo elegante */
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Stile per l'intestazione */
h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #222; /* Un nero più morbido */
    font-weight: 700;
}

/* Stile per la descrizione */
p {
    text-align: center;
    margin-bottom: 40px;
    color: #8f8f8f; /* Colore più tenue */
    font-size: 18px;
}

/* Etichetta dei campi */
.contact-form label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
    font-size: 16px;
}

/* Stile degli input e del textarea */
.contact-form input, 
.contact-form textarea {
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    color: #333;
    transition: border-color 0.3s, box-shadow 0.3s;
}

/* Effetto focus interattivo sugli input */
.contact-form input:focus, 
.contact-form textarea:focus {
    outline: none;
    border-color: #00aaff;
    box-shadow: 0 0 10px rgba(0, 170, 255, 0.3); /* Effetto glow */
}

/* Stile per il pulsante */
button {
    padding: 12px;
    background-color: #00aaff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 170, 255, 0.3); /* Ombra leggera */
}

/* Effetto hover sul pulsante */
button:hover {
    background-color: #0088cc;
    transform: scale(1.05); /* Effetto ingrandimento al passaggio del mouse */
}

/* Effetto di clic sul pulsante */
button:active {
    transform: scale(0.98); /* Leggero effetto di pressione */
}

/* Animazione e transizioni per gli elementi del form */
.form-group {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Effetto di "shake" per input vuoti */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
}

.shake {
    animation: shake 0.5s ease-in-out;
}

/* Animazione per il pulsante di submit durante l'invio */
button.sending {
    background-color: #ffaa00; /* Colore giallo durante l'invio */
    cursor: wait;
}

button.sent {
    background-color: #28a745; /* Colore verde per il successo */
    cursor: not-allowed;
}

/* Disabilita il pulsante di submit */
button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>