 //toggle class active
 const navbarNav = document.querySelector(".navbar-nav");
 document.querySelector("#hamburger-menu").onclick = () => {
   navbarNav.classList.toggle("active");
 };

 const hamburger = document.querySelector("#hamburger-menu");

 document.addEventListener("click", function (e) {
   if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
     navbarNav.classList.remove("active");
   }
 });

 // Smooth Scrolling for Navigation Links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
     e.preventDefault();
     const target = document.querySelector(this.getAttribute('href'));
     if (target) {
       target.scrollIntoView({
         behavior: 'smooth',
         block: 'start'
       });
       // Close mobile menu if open
       navbarNav.classList.remove("active");
     }
   });
 });

 // Navbar Scroll Effect
 window.addEventListener('scroll', () => {
   const navbar = document.querySelector('.navbar');
   if (window.scrollY > 100) {
     navbar.classList.add('scrolled');
   } else {
     navbar.classList.remove('scrolled');
   }
 });

 // Intersection Observer for Scroll Animations
 const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       entry.target.style.opacity = '1';
       entry.target.style.transform = 'translateY(0)';
     }
   });
 }, observerOptions);

 // Observe elements for animation
 document.addEventListener('DOMContentLoaded', () => {
   // Animate sections
   const animateElements = document.querySelectorAll('.about, .menu, .contact, .menu-card');
   animateElements.forEach(el => {
     el.style.opacity = '0';
     el.style.transform = 'translateY(50px)';
     el.style.transition = 'all 0.8s ease';
     observer.observe(el);
   });

   // Animate section titles
   const titles = document.querySelectorAll('h2');
   titles.forEach((title, index) => {
     title.style.opacity = '0';
     title.style.transform = 'translateY(30px)';
     title.style.transition = `all 0.6s ease ${index * 0.1}s`;
     observer.observe(title);
   });

   // Parallax effect for hero section
   const hero = document.querySelector('.hero');
   if (hero) {
     window.addEventListener('scroll', () => {
       const scrolled = window.pageYOffset;
       const parallax = hero.querySelector('.content');
       if (parallax) {
         parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
         parallax.style.opacity = 1 - scrolled / 800;
       }
     });
   }

   // Add hover effect to menu cards
   const menuCards = document.querySelectorAll('.menu-card');
   menuCards.forEach(card => {
     card.addEventListener('mouseenter', function() {
       this.style.transform = 'translateY(-15px) scale(1.02) rotate(1deg)';
     });
     
     card.addEventListener('mouseleave', function() {
       this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
     });
   });

   // Form validation feedback
   const form = document.querySelector('.contact form');
   if (form) {
     const inputs = form.querySelectorAll('input, textarea');
     
     inputs.forEach(input => {
       input.addEventListener('focus', function() {
         this.parentElement.classList.add('focused');
       });
       
       input.addEventListener('blur', function() {
         if (this.value === '') {
           this.parentElement.classList.remove('focused');
         }
       });
     });

     form.addEventListener('submit', function(e) {
       e.preventDefault();
       
       // Simple validation
       let isValid = true;
       inputs.forEach(input => {
         if (input.hasAttribute('required') && input.value.trim() === '') {
           isValid = false;
           input.parentElement.style.borderColor = '#ff6b6b';
           setTimeout(() => {
             input.parentElement.style.borderColor = '';
           }, 3000);
         }
       });
       
       if (isValid) {
         // Show success message
         const button = this.querySelector('.btn');
         const originalText = button.textContent;
         button.textContent = 'Terkirim! ✓';
         button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
         
         setTimeout(() => {
           button.textContent = originalText;
           button.style.background = '';
           this.reset();
         }, 3000);
       }
     });
   }

   // Loading animation for images
   const images = document.querySelectorAll('img');
   images.forEach(img => {
     img.addEventListener('load', function() {
       this.style.animation = 'fadeIn 0.6s ease';
     });
   });
 });

 // Add CSS animation keyframes
 const style = document.createElement('style');
 style.textContent = `
   @keyframes fadeIn {
     from { opacity: 0; transform: scale(0.95); }
     to { opacity: 1; transform: scale(1); }
   }
   
   .focused {
     box-shadow: 0 0 20px rgba(255, 215, 0, 0.3) !important;
   }
 `;
 document.head.appendChild(style);
