/* ==========================================
   RAVUKSA FINTECH
   PHASE 2 - PREMIUM FEATURES JAVASCRIPT
========================================== */

(function () {
    "use strict";

    /* Prevent duplicate initialization */
    if (window.rfPhase2Initialized) return;
    window.rfPhase2Initialized = true;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* ======================================
       1. PREMIUM LOADING SCREEN
    ====================================== */

    function initPremiumLoader() {
        const loader = document.getElementById(
            "ravuksa-premium-loader"
        );

        if (!loader) return;

        let loaderHidden = false;

        function hideLoader() {
            if (loaderHidden) return;

            loaderHidden = true;
            loader.classList.add("rf-loader-hidden");
            loader.setAttribute("aria-hidden", "true");
        }

        /* Show loader briefly while page initializes */
        loader.classList.remove("rf-loader-hidden");
        loader.setAttribute("aria-hidden", "false");

        if (document.readyState === "complete") {
            setTimeout(hideLoader, 350);
        } else {
            window.addEventListener("load", function () {
                setTimeout(hideLoader, 350);
            }, { once: true });
        }

        /* Safety fallback: never leave loader covering the page */
        setTimeout(hideLoader, 4000);
    }


    /* ======================================
       2. ANIMATED NUMBER COUNTER
    ====================================== */

    function initNumberCounters() {
        const counters = document.querySelectorAll(
            ".rf-counter[data-target]"
        );

        if (!counters.length) return;

        function animateCounter(counter) {
            if (counter.dataset.rfAnimated === "true") return;

            counter.dataset.rfAnimated = "true";

            const target = Number(counter.dataset.target);

            if (!Number.isFinite(target)) return;

            if (reducedMotion) {
                counter.textContent = Math.round(target).toLocaleString();
                return;
            }

            const duration = 1600;
            const startTime = performance.now();

            counter.classList.add("rf-counter-active");

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                /* Smooth ease-out animation */
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                const currentValue = Math.round(
                    target * easedProgress
                );

                counter.textContent =
                    currentValue.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent =
                        Math.round(target).toLocaleString();

                    counter.classList.remove(
                        "rf-counter-active"
                    );
                }
            }

            requestAnimationFrame(updateCounter);
        }

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.35 }
            );

            counters.forEach(function (counter) {
                observer.observe(counter);
            });

        } else {
            counters.forEach(animateCounter);
        }
    }


    /* ======================================
       3. PLATFORM STATUS INDICATOR
    ====================================== */

    function initPlatformStatus() {
        const statusElements = document.querySelectorAll(
            ".rf-platform-status"
        );

        statusElements.forEach(function (status) {
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
        });
    }


    /* ======================================
       4. COPY WEBSITE LINK BUTTON
    ====================================== */

    function initCopyLinkButtons() {
        const buttons = document.querySelectorAll(
            ".rf-copy-link"
        );

        buttons.forEach(function (button) {

            if (button.dataset.rfCopyReady === "true") return;

            button.dataset.rfCopyReady = "true";

            button.addEventListener("click", async function () {

                const url = button.dataset.copyUrl;

                if (!url) return;

                const originalHTML = button.innerHTML;

                async function copyUsingFallback(text) {
                    const textarea = document.createElement("textarea");

                    textarea.value = text;
                    textarea.style.position = "fixed";
                    textarea.style.opacity = "0";
                    textarea.style.pointerEvents = "none";

                    document.body.appendChild(textarea);

                    textarea.select();
                    textarea.setSelectionRange(0, text.length);

                    let successful = false;

                    try {
                        successful = document.execCommand("copy");
                    } catch (error) {
                        successful = false;
                    }

                    textarea.remove();

                    if (!successful) {
                        throw new Error("Copy failed");
                    }
                }

                try {
                    if (navigator.clipboard &&
                        window.isSecureContext) {

                        await navigator.clipboard.writeText(url);

                    } else {
                        await copyUsingFallback(url);
                    }

                    button.classList.add("rf-copy-success");

                    button.innerHTML =
                        "<span>✓</span><span>Link Copied!</span>";

                    button.setAttribute(
                        "aria-label",
                        "Website link copied"
                    );

                } catch (error) {

                    button.innerHTML =
                        "<span>⚠️</span><span>Copy Failed</span>";

                    button.setAttribute(
                        "aria-label",
                        "Unable to copy website link"
                    );
                }

                setTimeout(function () {
                    button.innerHTML = originalHTML;

                    button.classList.remove(
                        "rf-copy-success"
                    );

                    button.removeAttribute("aria-label");

                }, 2200);

            });
        });
    }


    /* ======================================
       5. SMOOTH SCROLLING
       Already handled by Phase 2 CSS.
       No additional JavaScript required.
    ====================================== */


    /* ======================================
       INITIALIZE ALL PHASE 2 FEATURES
    ====================================== */

    function initRavuksaPhase2() {

        initPremiumLoader();

        initNumberCounters();

        initPlatformStatus();

        initCopyLinkButtons();
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initRavuksaPhase2,
            { once: true }
        );

    } else {

        initRavuksaPhase2();

    }

})();
