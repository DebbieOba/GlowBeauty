// ========================
// TOAST HELPER
// ========================
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// ========================
// WISHLIST
// ========================
document.querySelectorAll(".wishlist").forEach(button => {
    button.addEventListener("click", () => {
        const icon = button.querySelector("i");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
        button.classList.toggle("active");

        const msg = button.classList.contains("active")
            ? "Added to wishlist ♥"
            : "Removed from wishlist";
        showToast(msg);
    });
});

// ========================
// ADD TO CART
// ========================
document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", () => {
        const original = button.textContent;
        button.textContent = "✓ Added!";
        button.style.background = "#4CAF50";
        button.style.color = "white";
        setTimeout(() => {
            button.textContent = original;
            button.style.background = "";
            button.style.color = "";
        }, 1800);
        showToast("Item added to cart 🛍️");
    });
});

// ========================
// BUY NOW
// ========================
document.querySelectorAll(".buy").forEach(button => {
    button.addEventListener("click", () => {
        showToast("Redirecting to checkout...");
    });
});

// ========================
// SIDEBAR FILTER TOGGLES
// ========================
document.querySelectorAll(".filter-title").forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        content.classList.toggle("collapsed");
        btn.classList.toggle("open");
    });

    // Start all open
    btn.classList.add("open");
});

// ========================
// PRICE RANGE SLIDER
// ========================
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

if (priceRange && priceValue) {
    priceRange.addEventListener("input", () => {
        priceValue.textContent = "$" + priceRange.value;
    });
}

// ========================
// CLEAR FILTERS
// ========================
const clearBtn = document.querySelector(".clear-filters");
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        document.querySelectorAll(".filter-content input[type='checkbox']")
            .forEach(cb => cb.checked = false);
        document.querySelectorAll(".filter-content input[type='radio']")
            .forEach(rb => rb.checked = false);
        if (priceRange) {
            priceRange.value = 100;
            priceValue.textContent = "$100";
        }
        showToast("Filters cleared");
    });
}

// ========================
// SEARCH
// ========================
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query === "") {
            showToast("Please enter a search term");
            return;
        }
        showToast(`Searching for "${query}"...`);
    });

    // FIXED: keydown instead of deprecated keypress
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") searchBtn.click();
    });
}

// ========================
// PAGINATION
// FIXED: prev/next now uses the page-num array index,
// so it works across the "..." separator
// ========================
const pageNums = Array.from(document.querySelectorAll(".page-num"));
const prevPageBtn = document.querySelector(".prev-btn");
const nextPageBtn = document.querySelector(".next-btn");

function setActivePage(btn) {
    pageNums.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const currentIndex = pageNums.indexOf(btn);
    prevPageBtn.disabled = currentIndex === 0;
    nextPageBtn.disabled = currentIndex === pageNums.length - 1;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

pageNums.forEach(btn => {
    btn.addEventListener("click", () => setActivePage(btn));
});

nextPageBtn?.addEventListener("click", () => {
    const currentIndex = pageNums.findIndex(b => b.classList.contains("active"));
    if (currentIndex < pageNums.length - 1) {
        setActivePage(pageNums[currentIndex + 1]);
    }
});

prevPageBtn?.addEventListener("click", () => {
    const currentIndex = pageNums.findIndex(b => b.classList.contains("active"));
    if (currentIndex > 0) {
        setActivePage(pageNums[currentIndex - 1]);
    }
});

// ========================
// RECOMMENDATIONS CAROUSEL
// ========================
const recTrack = document.querySelector(".rec-track");
const recCards = document.querySelectorAll(".rec-card");
const recNext = document.getElementById("recNext");
const recPrev = document.getElementById("recPrev");
let recCurrent = 0;

function recCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1100) return 3;
    return 4;
}

function updateRec() {
    if (!recCards.length) return;
    const cardWidth = recCards[0].offsetWidth + 20;
    recTrack.style.transform = `translateX(-${recCurrent * cardWidth}px)`;
}

recNext?.addEventListener("click", () => {
    const visible = recCardsPerView();
    recCurrent < recCards.length - visible ? recCurrent++ : recCurrent = 0;
    updateRec();
});

recPrev?.addEventListener("click", () => {
    const visible = recCardsPerView();
    recCurrent > 0 ? recCurrent-- : recCurrent = recCards.length - visible;
    updateRec();
});

let recResizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(recResizeTimer);
    recResizeTimer = setTimeout(updateRec, 150);
});

updateRec();

// Auto scroll recommendations
setInterval(() => {
    const visible = recCardsPerView();
    recCurrent < recCards.length - visible ? recCurrent++ : recCurrent = 0;
    updateRec();
}, 4000);

// ========================
// MOBILE MENU
// FIXED: toggles a CSS class (styled as a dropdown panel)
// instead of inline display which had no mobile styling
// ========================
const mobileMenuIcon = document.getElementById("mobileMenu");
const headerNav = document.querySelector("nav");

mobileMenuIcon?.addEventListener("click", () => {
    headerNav.classList.toggle("mobile-open");
});

// Close mobile menu when a link is clicked
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        headerNav.classList.remove("mobile-open");
    });
});

// ========================
// SCROLL TO TOP
// FIXED: this button existed in your HTML/CSS but had no JS at all
// ========================
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

// ========================
// CTA NEWSLETTER
// ========================
const ctaForm = document.querySelector(".cta-form");
if (ctaForm) {
    const ctaBtn = ctaForm.querySelector("button");
    const ctaInput = ctaForm.querySelector("input");

    ctaBtn?.addEventListener("click", () => {
        const email = ctaInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showToast("Please enter your email");
            return;
        }
        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email");
            return;
        }

        showToast("🎉 Thank you for subscribing!");
        ctaInput.value = "";
    });
}