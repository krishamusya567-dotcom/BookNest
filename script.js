
/* =================================
   BOOKNEST - JAVASCRIPT
================================= */


/* 1. MOBILE NAVIGATION MENU */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}


/* 2. DISPLAY CURRENT YEAR */

const yearElements = document.querySelectorAll(".year");

yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
});


/* 3. SHOPPING CART COUNTER */

let cartCount = Number(localStorage.getItem("booknestCart")) || 0;

function updateCartCount() {
    const cartElements = document.querySelectorAll("#cart-count");

    cartElements.forEach(function (element) {
        element.textContent = cartCount;
    });

    localStorage.setItem("booknestCart", cartCount);
}

updateCartCount();


/* 4. ADD BOOK TO CART */

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        cartCount++;

        updateCartCount();

        const originalText = button.innerHTML;

        button.innerHTML = '<i class="fa-solid fa-check"></i> Added!';

        button.disabled = true;

        setTimeout(function () {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1000);

    });

});


/* 5. BOOK SEARCH AND CATEGORY FILTER */

const bookSearch = document.querySelector("#book-search");
const categoryFilter = document.querySelector("#category-filter");

const bookCards = document.querySelectorAll(".book-card");
const noResults = document.querySelector(".no-results");

function filterBooks() {

    const searchText = bookSearch
        ? bookSearch.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value.toLowerCase()
        : "all";

    let visibleBooks = 0;

    bookCards.forEach(function (card) {

        const bookName = (
            card.dataset.search || card.textContent
        ).toLowerCase();

        const bookCategory = (
            card.dataset.category || ""
        ).toLowerCase();

        const matchesSearch = bookName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            bookCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {

            card.style.display = "";

            visibleBooks++;

        } else {

            card.style.display = "none";

        }

    });

    if (noResults) {
        noResults.style.display =
            visibleBooks === 0 ? "block" : "none";
    }

}

if (bookSearch) {
    bookSearch.addEventListener("input", filterBooks);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterBooks);
}


/* 6. CATEGORY FILTER FROM URL */

const urlParams = new URLSearchParams(window.location.search);
const selectedURLCategory = urlParams.get("category");

if (selectedURLCategory && categoryFilter) {

    const matchingOption = Array.from(categoryFilter.options)
        .find(function (option) {
            return option.value.toLowerCase() ===
                selectedURLCategory.toLowerCase();
        });

    if (matchingOption) {
        categoryFilter.value = matchingOption.value;
        filterBooks();
    }

}


/* 7. CONTACT FORM VALIDATION */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (!name || !email || !subject || !message) {

            alert("Please fill in all the fields.");

            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert(
            "Thank you, " + name +
            "! Your message has been validated successfully."
        );

        contactForm.reset();

    });

}
