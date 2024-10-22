<script>
export default {
    mounted() {

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

        const inputs = document.querySelectorAll('.form-control');

        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.05)'; 
                this.style.boxShadow = '0 0 15px rgba(0, 170, 255, 0.5)'; 
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)'; 
                this.style.boxShadow = 'none';


                if (!this.value.trim()) {
                    this.classList.add('shake');
                    setTimeout(() => this.classList.remove('shake'), 500);
                }
            });
        });

        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();


            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.classList.add('sending');


            setTimeout(() => {
                submitButton.classList.remove('sending');
                submitButton.classList.add('sent'); 
                submitButton.textContent = 'Messaggio inviato!';
                

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('sent');
                    submitButton.textContent = 'Invia Messaggio';
                    form.reset();
                }, 2000);
            }, 1500); 
        });
    },
}

</script>
<template>
<div class="bg-items">
    <div class="bg-contact">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8">
                    <h1 class="text-center fw-bold">Contattaci</h1>
                    <p class="text-center">Ci piacerebbe sentirti! Compila il modulo qui sotto e ti risponderemo il prima possibile.</p>
                    
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
    
                        <div class="form-group d-grid">
                            <button type="submit" class="btn-lg">Invia Messaggio</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
    
<style lang="scss">
.bg-items {
	background-image: url(../assets/wall_backgroung.webp);
	background-size: cover;
}
.bg-contact {
    background-color: rgba(0, 0, 0, 0.65);
    color: white;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.contact-container {
    background-color: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 1s forwards ease-in-out;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}


h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #d4af37; 
    font-weight: 700;
}


p {
    text-align: center;
    margin-bottom: 40px;
    color: #ffffff; 
    font-size: 18px;
}


.contact-form label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
    font-size: 16px;
}


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


.contact-form input:focus, 
.contact-form textarea:focus {
    outline: none;
    border-color: #d4af37;
}


button {
    padding: 12px;
    background: linear-gradient(
		45deg,
		#000000,
		#2f4f2f
	);
    color: #d4af37;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    width: 100%;
}


button:hover {
    transform: scale(1.05);
}

button:active {
    transform: scale(0.98); 
}


.form-group {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}


@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
}

.shake {
    animation: shake 0.5s ease-in-out;
}


button.sending {
    background-color: #ffaa00;
    cursor: wait;
}

button.sent {
    background-color: #28a745;
    cursor: not-allowed;
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

</style>