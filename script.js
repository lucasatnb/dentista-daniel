/* Interacoes da landing page: menu mobile, sombra do topo e animacao de entrada. */
(() => {
  window.__lpIniciado = true;

  const nav = document.querySelector(".nav");
  const botao = document.querySelector(".nav__botao");
  const lista = document.querySelector("#menu-principal");

  if (nav && botao && lista) {
    const fechar = () => {
      nav.classList.remove("nav--aberto");
      botao.setAttribute("aria-expanded", "false");
    };

    botao.addEventListener("click", () => {
      const aberto = nav.classList.toggle("nav--aberto");
      botao.setAttribute("aria-expanded", String(aberto));
    });

    lista.addEventListener("click", (evento) => {
      if (evento.target.closest("a")) fechar();
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && nav.classList.contains("nav--aberto")) {
        fechar();
        botao.focus();
      }
    });

    document.addEventListener("click", (evento) => {
      if (nav.classList.contains("nav--aberto") && !nav.contains(evento.target)) fechar();
    });
  }

  const topo = document.querySelector(".topo");
  if (topo) {
    const aoRolar = () => topo.classList.toggle("topo--rolado", window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
  }

  const alvos = document.querySelectorAll("[data-revelar]");
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduzirMovimento) {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    alvos.forEach((alvo) => observador.observe(alvo));
  } else {
    alvos.forEach((alvo) => alvo.classList.add("visivel"));
  }
})();
