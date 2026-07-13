const menuBtn = document.getElementById("mobileMenu");
const nav = document.querySelector("nav");

menuBtn.onclick = () => {
    nav.classList.toggle("mobile-open");
};

// Close mobile menu when a link is clicked
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
    });
});

// SLIDESHOW
const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(n){
    slides.forEach(slide => slide.classList.remove("active"));
    slides[n].classList.add("active");
}

setInterval(() => {
    index++;
    if(index >= slides.length) index = 0;
    showSlide(index);
}, 5000);

// WISHLIST
document.querySelectorAll(".wishlist").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        const icon = btn.querySelector("i");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
    });
});

// QUICK VIEW
document.querySelectorAll(".quick-view").forEach(button => {
    button.onclick = () => {
        const toast = document.createElement("div");
        toast.textContent = "Quick View coming soon!";
        toast.style.cssText = `
            position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
            background:#E86B9B; color:white; padding:12px 28px;
            border-radius:30px; font-size:14px; z-index:9999;
            box-shadow: 0 8px 20px rgba(0,0,0,.15);
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    };
});

// ADD TO CART
document.querySelectorAll(".cart-btn").forEach(button => {
    button.onclick = () => {
        button.innerHTML = "✓ Added";
        setTimeout(() => {
            button.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
        }, 1500);
    };
});

// BEST SELLERS CAROUSEL
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".best-card");
const nextBtn = document.getElementById("bestNext");
const prevBtn = document.getElementById("bestPrev");
let current = 0;

function cardsPerView(){
    if(window.innerWidth <= 650) return 1;
    if(window.innerWidth <= 992) return 2;
    return 4;
}

function updateCarousel(){
    const cardWidth = cards[0].offsetWidth + 25;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
}

nextBtn.onclick = () => {
    const visible = cardsPerView();
    if(current < cards.length - visible){
        current++;
    } else {
        current = 0;
    }
    updateCarousel();
};

prevBtn.onclick = () => {
    const visible = cardsPerView();
    if(current > 0){
        current--;
    } else {
        current = cards.length - visible;
    }
    updateCarousel();
};

// Auto Slide
setInterval(() => {
    const visible = cardsPerView();
    current < cards.length - visible ? current++ : current = 0;
    updateCarousel();
}, 4000);

// Debounced Resize
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateCarousel, 150);
});

updateCarousel();

// NEWSLETTER
const form = document.getElementById("newsletterForm");
const message = document.getElementById("newsletterMessage");

form.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email").value;

    if(email === ""){
        message.style.color = "red";
        message.textContent = "Please enter your email.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
        return;
    }

    message.style.color = "green";
    message.textContent = "🎉 Thank you for subscribing!";
    form.reset();

    setTimeout(() => {
        message.textContent = "";
    }, 4000);
});

// SCROLL TO TOP
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if(window.scrollY > 400){
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});