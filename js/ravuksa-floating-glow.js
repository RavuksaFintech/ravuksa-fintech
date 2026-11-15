/* RAVUKSA FINTECH - Floating Glow Particles */

(function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const canvas = document.createElement("div");
    canvas.id = "ravuksa-floating-glow";

    document.body.appendChild(canvas);

    const particleCount = window.innerWidth < 768 ? 14 : 24;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");

        particle.className = "rf-glow-particle";

        const size = Math.random() * 4 + 2;

        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            (Math.random() * 12 + 10) + "s";

        particle.style.animationDelay =
            (Math.random() * -20) + "s";

        canvas.appendChild(particle);
    }
})();
