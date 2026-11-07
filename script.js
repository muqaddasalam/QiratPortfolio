// Contact form opens the visitor's email app addressed to this email.
const CONTACT_EMAIL = "qiratiqbal987@gmail.com";

(function () {
    "use strict";

    // ---- Mobile menu ----
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");
    const closeMenu = () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

    // ---- Active nav link on scroll ----
    const links = [...nav.querySelectorAll("a")];
    const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach(s => spy.observe(s));
    }

    // ---- Certificate filters ----
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".cert-card");
    function applyFilter(f) {
        buttons.forEach(b => b.classList.toggle("active", b.dataset.filter === f));
        cards.forEach(c => c.classList.toggle("hide", !(f === "all" || c.dataset.cat === f)));
    }
    buttons.forEach(b => b.addEventListener("click", () => applyFilter(b.dataset.filter)));
    document.querySelectorAll("[data-filter-link]").forEach(a =>
        a.addEventListener("click", () => applyFilter(a.dataset.filterLink)));

    // ---- Lightbox ----
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg");
    const lbCap = document.getElementById("lbCap");
    const openLb = btn => {
        lbImg.src = btn.dataset.full;
        lbImg.alt = btn.dataset.title;
        lbCap.textContent = btn.dataset.title;
        lb.hidden = false;
        document.body.style.overflow = "hidden";
    };
    const closeLb = () => { lb.hidden = true; lbImg.src = ""; document.body.style.overflow = ""; };
    document.querySelectorAll(".cert-thumb").forEach(b => b.addEventListener("click", () => openLb(b)));
    lb.addEventListener("click", closeLb);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

    // ---- Contact form (opens email app) ----
    const form = document.getElementById("contactForm");
    const note = document.getElementById("formNote");
    form.addEventListener("submit", e => {
        e.preventDefault();
        const d = new FormData(form);
        const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
        window.location.href =
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(d.get("subject"))}&body=${encodeURIComponent(body)}`;
        note.textContent = "Opening your email app…";
        form.reset();
    });
})();
