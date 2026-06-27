
// CAROUSEL FUNCTIONALITY

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carousel && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;
        let isTransitioning = false;
        const autoSlideDelay = 4000;

        function updateCarousel() {
            if (!carousel) return;
            const wrapper = document.querySelector('.carousel-wrapper');
            if (!wrapper) return;
            const slideWidth = wrapper.clientWidth;
            carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            
            if (indicators) {
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
            setTimeout(() => { isTransitioning = false; }, 900);
            resetAutoSlide();
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
            setTimeout(() => { isTransitioning = false; }, 900);
            resetAutoSlide();
        }

        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        if (indicators) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function() {
                    if (isTransitioning) return;
                    if (currentIndex === index) return;
                    isTransitioning = true;
                    currentIndex = index;
                    updateCarousel();
                    setTimeout(() => { isTransitioning = false; }, 900);
                    resetAutoSlide();
                });
            });
        }

        const carouselWrapper = document.querySelector('.carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
            carouselWrapper.addEventListener('mouseleave', startAutoSlide);
        }

        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateCarousel, 100);
        });

        window.addEventListener('load', updateCarousel);
        startAutoSlide();
        updateCarousel();
    }

    // BACK TO TOP BUTTON
    
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        function checkScrollPosition() {
            const halfway = document.body.scrollHeight / 2;
            const currentPosition = window.scrollY + window.innerHeight;
            
            if (currentPosition > halfway) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.addEventListener('scroll', checkScrollPosition);
        backToTopButton.addEventListener('click', scrollToTop);
        checkScrollPosition();
    }

    // CONTACT FORM VALIDATION WITH MESSAGES
    
    
    const contactForm = document.getElementById('contactForm');
    const messageBox = document.getElementById('messageBox');
    const submitBtn = document.getElementById('submitBtn');
    
    // Clear all error messages
    function clearErrors() {
        document.getElementById('nameError').innerHTML = '';
        document.getElementById('emailError').innerHTML = '';
        document.getElementById('phoneError').innerHTML = '';
        document.getElementById('serviceError').innerHTML = '';
        document.getElementById('messageError').innerHTML = '';
        
        // Remove red borders
        document.getElementById('name').style.borderColor = '#ddd';
        document.getElementById('email').style.borderColor = '#ddd';
        document.getElementById('phone').style.borderColor = '#ddd';
        document.getElementById('service').style.borderColor = '#ddd';
        document.getElementById('message').style.borderColor = '#ddd';
    }
    
    // Show error message for a specific field
    function showFieldError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.innerHTML = message;
            errorElement.style.color = '#f44336';
            errorElement.style.fontSize = '12px';
            errorElement.style.display = 'block';
            errorElement.style.marginTop = '5px';
        }
        
        const fieldElement = document.getElementById(fieldId);
        if (fieldElement) {
            fieldElement.style.borderColor = '#f44336';
            fieldElement.style.backgroundColor = '#fff3f3';
        }
    }
    
    // Show main message (success, warning, error)
    function showMessage(type, text) {
        messageBox.style.display = 'block';
        messageBox.style.padding = '15px 20px';
        messageBox.style.borderRadius = '8px';
        messageBox.style.marginBottom = '20px';
        messageBox.style.textAlign = 'left';
        
        if (type === 'success') {
            messageBox.style.backgroundColor = '#e8f5e9';
            messageBox.style.color = '#2e7d32';
            messageBox.style.border = '1px solid #4CAF50';
            messageBox.innerHTML = '<i class="fas fa-check-circle" style="margin-right: 10px;"></i> ' + text;
        } else if (type === 'error') {
            messageBox.style.backgroundColor = '#fff3f3';
            messageBox.style.color = '#d32f2f';
            messageBox.style.border = '1px solid #f44336';
            messageBox.innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right: 10px;"></i> ' + text;
        } else if (type === 'warning') {
            messageBox.style.backgroundColor = '#fff8e1';
            messageBox.style.color = '#ed6c02';
            messageBox.style.border = '1px solid #ff9800';
            messageBox.innerHTML = '<i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i> ' + text;
        }
        
        // Auto hide after 5 seconds
        setTimeout(function() {
            if (messageBox) {
                messageBox.style.display = 'none';
            }
        }, 5000);
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation (Kenyan format)
    function isValidPhone(phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^(0[17]\d{8}|254[17]\d{8}|\+254[17]\d{8})$/;
        return phoneRegex.test(cleanPhone);
    }
    
    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Clear previous errors and messages
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            let hasError = false;
            
            // Validate Name
            if (name === '') {
                showFieldError('name', 'Full name is required');
                hasError = true;
            } else if (name.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters');
                hasError = true;
            }
            
            // Validate Email
            if (email === '') {
                showFieldError('email', 'Email address is required');
                hasError = true;
            } else if (!isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address (e.g., name@example.com)');
                hasError = true;
            }
            
            // Validate Phone
            if (phone === '') {
                showFieldError('phone', 'Phone number is required');
                hasError = true;
            } else if (!isValidPhone(phone)) {
                showFieldError('phone', 'Enter valid phone number (e.g., 0712345678 or 254712345678)');
                hasError = true;
            }
            
            // Validate Service
            if (!service || service === '' || service === '— Select a service —') {
                showFieldError('service', 'Please select a service');
                hasError = true;
            }
            
            // Validate Message
            if (message === '') {
                showFieldError('message', 'Message is required');
                hasError = true;
            } else if (message.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters');
                hasError = true;
            }
            
            // If no errors, show success message and clear form
            if (!hasError) {
                // Show success message
                showMessage('success', 'Thank you for contacting us! We will get back to you as soon as possible. Your success is our business!');
                
                // Clear the form
                contactForm.reset();
                
                // Reset all field styles
                document.getElementById('name').style.borderColor = '#ddd';
                document.getElementById('name').style.backgroundColor = '#fefefe';
                document.getElementById('email').style.borderColor = '#ddd';
                document.getElementById('email').style.backgroundColor = '#fefefe';
                document.getElementById('phone').style.borderColor = '#ddd';
                document.getElementById('phone').style.backgroundColor = '#fefefe';
                document.getElementById('service').style.borderColor = '#ddd';
                document.getElementById('service').style.backgroundColor = '#fefefe';
                document.getElementById('message').style.borderColor = '#ddd';
                document.getElementById('message').style.backgroundColor = '#fefefe';
                
                // Reset select dropdown
                document.getElementById('service').selectedIndex = 0;
            } else {
                // Show warning message
                showMessage('warning', 'Please fix the errors above before submitting.');
            }
        });
    }

    // HAMBURGER MENU TOGGLE

    const hamburger = document.getElementById('hamburger');
    const navmenu = document.getElementById('navmenu');
    
    if (hamburger && navmenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navmenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const navLinks = navmenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navmenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navmenu.contains(event.target) && !hamburger.contains(event.target)) {
                hamburger.classList.remove('active');
                navmenu.classList.remove('active');
            }
        });
    }
    
    // Real-time validation (green border when valid)
    function setupRealTimeValidation() {
        const nameField = document.getElementById('name');
        if (nameField) {
            nameField.addEventListener('input', function() {
                const val = this.value.trim();
                if (val !== '' && val.length >= 2) {
                    this.style.borderColor = '#4CAF50';
                    this.style.backgroundColor = '#f0fff0';
                    document.getElementById('nameError').innerHTML = '';
                } else if (val !== '') {
                    this.style.borderColor = '#f44336';
                    this.style.backgroundColor = '#fff3f3';
                } else {
                    this.style.borderColor = '#ddd';
                    this.style.backgroundColor = '#fefefe';
                }
            });
        }
        
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', function() {
                const val = this.value.trim();
                if (val !== '' && isValidEmail(val)) {
                    this.style.borderColor = '#4CAF50';
                    this.style.backgroundColor = '#f0fff0';
                    document.getElementById('emailError').innerHTML = '';
                } else if (val !== '') {
                    this.style.borderColor = '#f44336';
                    this.style.backgroundColor = '#fff3f3';
                } else {
                    this.style.borderColor = '#ddd';
                    this.style.backgroundColor = '#fefefe';
                }
            });
        }
        
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', function() {
                const val = this.value.trim();
                if (val !== '' && isValidPhone(val)) {
                    this.style.borderColor = '#4CAF50';
                    this.style.backgroundColor = '#f0fff0';
                    document.getElementById('phoneError').innerHTML = '';
                } else if (val !== '') {
                    this.style.borderColor = '#f44336';
                    this.style.backgroundColor = '#fff3f3';
                } else {
                    this.style.borderColor = '#ddd';
                    this.style.backgroundColor = '#fefefe';
                }
            });
        }
        
        const serviceField = document.getElementById('service');
        if (serviceField) {
            serviceField.addEventListener('change', function() {
                const val = this.value;
                if (val && val !== '' && val !== '— Select a service —') {
                    this.style.borderColor = '#4CAF50';
                    this.style.backgroundColor = '#f0fff0';
                    document.getElementById('serviceError').innerHTML = '';
                } else {
                    this.style.borderColor = '#ddd';
                    this.style.backgroundColor = '#fefefe';
                }
            });
        }
        
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('input', function() {
                const val = this.value.trim();
                if (val !== '' && val.length >= 10) {
                    this.style.borderColor = '#4CAF50';
                    this.style.backgroundColor = '#f0fff0';
                    document.getElementById('messageError').innerHTML = '';
                } else if (val !== '') {
                    this.style.borderColor = '#f44336';
                    this.style.backgroundColor = '#fff3f3';
                } else {
                    this.style.borderColor = '#ddd';
                    this.style.backgroundColor = '#fefefe';
                }
            });
        }
    }
    
    setupRealTimeValidation();
    
    // Navigation active state
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'home.html';
        const navLinks = document.querySelectorAll('.navbar ul li a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();
});
 // ============================================================
        // WHATSAPP CONFIGURATION - NUMBER is: 0718950180
        // ============================================================
        
        
        const YOUR_WHATSAPP_NUMBER = "254718950180";  
        
        // Optional pre-filled message (customize as you like)
        const DEFAULT_MESSAGE = "Hello! I need assistance with Makivan Consultants services.";
        
        // ============================================================
        // DO NOT EDIT BELOW - WhatsApp link generator
        // ============================================================
        
        const chatButton = document.getElementById('whatsappLiveChatBtn');
        
        function cleanPhoneNumber(num) {
            return num.toString().replace(/\D/g, '');
        }
        
        function buildWhatsAppUrl(phone, message) {
            let cleaned = cleanPhoneNumber(phone);
            if (!cleaned || cleaned.length === 0) {
                console.error('❌ Live Chat: No valid WhatsApp number.');
                cleaned = "254718950180";
            }
            let url = `https://wa.me/${cleaned}`;
            if (message && message.trim() !== "") {
                url += `?text=${encodeURIComponent(message)}`;
            }
            return url;
        }
        
        // Initialize WhatsApp chat button
        function initWhatsAppChat() {
            if (!chatButton) return;
            const whatsappUrl = buildWhatsAppUrl(YOUR_WHATSAPP_NUMBER, DEFAULT_MESSAGE);
            chatButton.href = whatsappUrl;
            console.log("✅ Live Chat ready! WhatsApp number: +254718950180");
        }
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initWhatsAppChat);
        } else {
            initWhatsAppChat();
        }
        
        // Optional click tracking
        if (chatButton) {
            chatButton.addEventListener('click', function(e) {
                console.log("💬 Opening WhatsApp chat for Makivan Consultants");
            });
        }
        
        // AOS Initialization
        AOS.init({
            duration: 800,
            once: true
        });
        
 

document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons to disable EXCEPT Company Brochure
    const allButtons = document.querySelectorAll('.form-card .btn-download, .form-card .btn-view, .resource-link');
    
    allButtons.forEach(button => {
        // Check if this button belongs to Company Brochure
        const parentCard = button.closest('.form-card');
        const isCompanyBrochure = parentCard && parentCard.querySelector('h3') && 
                                  parentCard.querySelector('h3').textContent.includes('Company Brochure');
        
        // Only disable if NOT Company Brochure
        if (!isCompanyBrochure) {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';  
            button.style.pointerEvents = 'auto';   
            
            // Prevent click but keep cursor style
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert('This form will be available soon!');
                return false;
            });
        }
    });
});



// Initialize AOS
AOS.init();