<template>
    <div>
      <!-- Footer Container -->
      <footer :class="['footer', { is_open: isFooterOpen }]">
        <div class="footer-header text-center" @click="toggleFooter">
          <h2>Get in Touch</h2>
          <svg class="toggle_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :class="{ rotated: isFooterOpen }">
            <path d="M12 16l-8-8h16z" />
          </svg>
        </div>
  
        <!-- Expanded Content -->
        <transition name="fade">
          <div v-if="isFooterOpen" class="footer-content text-center">
            <p>Contact us for more information or follow us on our social media channels.</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg viewBox="0 0 24 24"><!-- Facebook Icon --></svg>
              </a>
              <a href="#" class="social-icon">
                <svg viewBox="0 0 24 24"><!-- Twitter Icon --></svg>
              </a>
              <a href="#" class="social-icon">
                <svg viewBox="0 0 24 24"><!-- Instagram Icon --></svg>
              </a>
            </div>
            <a href="#" class="cta-button text-center">Contact Us</a>
          </div>
        </transition>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isFooterOpen: false,
      };
    },
    methods: {
      toggleFooter() {
        this.isFooterOpen = !this.isFooterOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  /* General Footer Style */
  .footer {
    background: linear-gradient(45deg, #02324a, #045b83);
    color: #fff;
    padding: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: height 0.5s ease, background 0.5s ease;
    height: 80px;
    overflow: hidden;
  }
  
  .footer.is_open {
    height: 320px;
    background: linear-gradient(135deg, #02324a, #337a96);
  }
  
  .footer-header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  
  .footer-header h2 {
    font-size: 1.2rem;
    margin: 0;
    font-family: "Lato", sans-serif;
  }
  
  .toggle_icon {
    fill: #fff;
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease, fill 0.3s ease;
  }
  
  .toggle_icon:hover {
    fill: #49a1c3;
  }
  
  .toggle_icon.rotated {
    transform: rotate(180deg);
  }
  
  /* Fade transition for content */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  /* Footer Content */
  .footer-content {
    margin-top: 20px;
    font-size: 1rem;
    font-family: "Lato", sans-serif;
    opacity: 0;
    animation: fadeIn 0.6s forwards;
  }
  
  /* Animations */
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  /* Social Media Links */
  .social-icons {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
    transition: transform 0.3s ease, fill 0.3s ease;
  }
  
  .social-icon svg {
    fill: #fff;
    transition: fill 0.3s ease;
  }
  
  .social-icon:hover svg {
    fill: #49a1c3;
  }
  
  .social-icon:hover {
    transform: scale(1.1);
  }
  
  /* CTA Button */
  .cta-button {
    background-color: #337a96;
    color: #fff;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.3s ease;
    display: inline-block;
  }
  
  .cta-button:hover {
    background-color: #49a1c3;
    transform: scale(1.05);
  }
  </style>
  