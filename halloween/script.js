(() => {
  const backdrop = document.querySelector(".backdrop");
  const laugh = new Audio("assets/risa.mp3");
  const music = document.querySelector("#backgroundMusic");
  const musicToggle = document.querySelector("#musicToggle");
  const waitForImage = (src) => new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      if (typeof image.decode !== "function") {
        resolve();
        return;
      }

      image.decode().then(resolve).catch((error) => {
        console.error(`No se pudo decodificar ${src}:`, error);
        resolve();
      });
    };
    image.onerror = (error) => {
      console.error(`No se pudo cargar ${src}:`, error);
      resolve();
    };
    image.src = src;
  });

  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      musicToggle.disabled = true;

      try {
        await music.play();
        musicToggle.setAttribute("aria-pressed", "true");
        musicToggle.setAttribute("aria-label", "Detener música");
      } catch (error) {
        console.error("No se pudo reproducir musica.mp3:", error);
      } finally {
        musicToggle.disabled = false;
      }

      return;
    }

    music.pause();
    music.currentTime = 0;
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Reproducir música");
  });

  backdrop.addEventListener("click", () => {
    laugh.currentTime = 0;
    laugh.play().catch((error) => console.error("No se pudo reproducir risa.mp3:", error));
  });

  const gsap = window.gsap;
  const cta = document.querySelector(".cta");

  if (!gsap || !cta || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const halloween = document.querySelector(".night");
  const letters = Array.from(halloween.textContent.trim(), (character) => {
    const letter = document.createElement("span");
    letter.className = "night-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = character;
    return letter;
  });
  halloween.replaceChildren(...letters);

  Promise.all([waitForImage("images/fondo.webp"), waitForImage("images/fondoluz.webp")]).then(() => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".brand", { y: -80, rotate: -18, scale: .55, opacity: 0, duration: .9, ease: "back.out(1.8)" })
      .from(".date-number", { y: -120, rotate: -180, scale: .3, opacity: 0, duration: 1.1, ease: "bounce.out" }, "-=.55")
      .from([".month", ".weekday", ".time"], { y: -24, opacity: 0, stagger: .09, duration: .45 }, "-=.7")
      .from(".eyebrow", { y: -20, opacity: 0, letterSpacing: ".8em", duration: .55 }, "-=.35")
      .from(".halloween", { y: 70, rotateX: -70, scale: .7, opacity: 0, duration: .75, ease: "back.out(1.5)" }, "-=.25")
      .fromTo(letters,
        { y: -180, rotate: (index) => index % 2 ? 28 : -28, scale: .55, opacity: 0 },
        { y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.15, stagger: { each: .075 }, ease: "bounce.out" },
        "-=.15"
      )
      .from(".side-copy", {
        x: (index, element) => element.classList.contains("side-left") ? -70 : 70,
        rotate: (index, element) => element.classList.contains("side-left") ? -8 : 8,
        opacity: 0,
        duration: .6,
        stagger: .12,
        ease: "back.out(1.6)"
      }, "-=.55")
      .from(".guest", { scale: 1.8, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=.2")
      .call(() => gsap.to(".guest", { y: -8, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" }))
      .from(".perks div", { y: 35, rotateY: 55, opacity: 0, duration: .55, stagger: .12, ease: "back.out(1.7)" }, "-=.35")
      .from(".cta", { y: 90, rotate: 12, scale: .9, opacity: 0, duration: .8, ease: "elastic.out(1, .55)" }, "-=.15")
      .from(".microcopy", { y: 15, opacity: 0, duration: .45 }, "-=.35");
  });

  const embers = document.querySelector(".embers");
  const emberCount = 40;
  const emberColors = ["#fff7bd", "#ffd36b", "#ff9a3c", "#ff642d"];

  for (let index = 0; index < emberCount; index += 1) {
    const ember = document.createElement("span");
    const duration = 4 + Math.random() * 6;
    const drift = (Math.random() - .5) * 80;
    const travel = embers.clientHeight * (.78 + Math.random() * .06);
    const size = 1.2 + Math.random() * 2;

    ember.className = "ember";
    ember.style.left = `${Math.random() * 100}%`;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    ember.style.color = emberColors[Math.floor(Math.random() * emberColors.length)];
    embers.append(ember);

    gsap.timeline({ repeat: -1, delay: Math.random() * duration })
      .fromTo(ember,
        { y: 0, x: 0, opacity: 0 },
        { y: -travel * .2, x: drift * .2, opacity: .8, duration: duration * .2, ease: "none" }
      )
      .to(ember, {
        y: -travel * .72,
        x: drift * .72,
        opacity: .8,
        duration: duration * .52,
        ease: "none"
      })
      .to(ember, {
        y: -travel,
        x: drift,
        opacity: 0,
        duration: duration * .28,
        ease: "none"
      });
  }

  gsap.to(".cta", { scale: 1.025, "--button-glow": "14px", duration: .9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });
  gsap.to(".cta b", { x: 4, duration: .55, yoyo: true, repeat: -1, ease: "power1.inOut", delay: 2.5 });

  const animateCta = (rotate, scale) => gsap.to(cta, { rotate, scale, duration: .3, overwrite: true, ease: "back.out(2)" });
  cta.addEventListener("pointerenter", () => animateCta(1.5, 1.06));
  cta.addEventListener("pointerleave", () => animateCta(-1, 1));
  cta.addEventListener("focus", () => animateCta(1.5, 1.06));
  cta.addEventListener("blur", () => animateCta(-1, 1));

})();
