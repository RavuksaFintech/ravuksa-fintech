/* RAVUKSA FINTECH - Lightweight Interactive Effects */
(function () {
  "use strict";

  function initRavuksaEffects() {
    if (document.getElementById("ravuksa-scroll-progress")) return;

    /* 1. Scroll progress bar */
    var progress = document.createElement("div");
    progress.id = "ravuksa-scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    /* 2. Back to top button */
    var backToTop = document.createElement("button");
    backToTop.id = "ravuksa-back-to-top";
    backToTop.type = "button";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.setAttribute("title", "Back to top");
    backToTop.innerHTML = "&#8593;";
    document.body.appendChild(backToTop);

    var ticking = false;

    function updateOnScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      var percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      progress.style.width = Math.min(100, Math.max(0, percent)) + "%";
      backToTop.classList.toggle("is-visible", scrollTop > 350);
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }, { passive: true });

    updateOnScroll();

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* 4. Reveal selected content cards and headings */
    var revealItems = document.querySelectorAll(
      ".section-title, .card, .ravuksa-daily-card"
    );

    if (
      "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("rf-revealed");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

      revealItems.forEach(function (item) {
        item.classList.add("rf-reveal-ready");
        revealObserver.observe(item);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRavuksaEffects);
  } else {
    initRavuksaEffects();
  }
})();
