// MOBILE MENU 
const mobileMenuIcon = document.getElementById("mobileMenu");
const headerNav = document.querySelector("nav");

mobileMenuIcon?.addEventListener("click", () => {
    headerNav.classList.toggle("mobile-open");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        headerNav.classList.remove("mobile-open");
    });
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// SCROLL TO TOP
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// NEWSLETTER
const blogForm = document.getElementById("blogNewsletterForm");
const blogMessage = document.getElementById("blogNewsletterMessage");

blogForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("blogEmail").value.trim();

    if (email === "") {
        blogMessage.style.color = "#c0392b";
        blogMessage.textContent = "Please enter your email.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        blogMessage.style.color = "#c0392b";
        blogMessage.textContent = "Please enter a valid email address.";
        return;
    }

    blogMessage.style.color = "#27ae60";
    blogMessage.textContent = "🎉 You're in! See you Friday.";
    blogForm.reset();

    setTimeout(() => {
        blogMessage.textContent = "";
    }, 4000);
});