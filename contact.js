// TOAST HELPER
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

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

// CONTACT FORM VALIDATION
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const phone = document.getElementById("cPhone").value.trim();
    const subject = document.getElementById("cSubject").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    // All fields required
    if (!name || !email || !phone || !subject || !message) {
        contactMessage.style.color = "#ff6b6b";
        contactMessage.textContent = "Please fill in all the fields.";
        return;
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        contactMessage.style.color = "#ff6b6b";
        contactMessage.textContent = "Please enter a valid email address.";
        return;
    }

    const phoneDigits = phone.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 7 || /[^0-9+\-\s()]/.test(phone)) {
        contactMessage.style.color = "#ff6b6b";
        contactMessage.textContent = "Please enter a valid phone number.";
        return;
    }

    contactMessage.style.color = "#5fd68a";
    contactMessage.textContent = "✓ Message sent! We'll get back to you within 24 hours.";
    showToast("Message sent 💌");
    contactForm.reset();

    setTimeout(() => {
        contactMessage.textContent = "";
    }, 5000);
});

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