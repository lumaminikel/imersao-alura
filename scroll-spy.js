document.addEventListener("DOMContentLoaded", () => {
  // Aguarda o DOM estar completamente carregado

  const sections = document.querySelectorAll(".series-section");
  const menuLinks = document.querySelectorAll(".side-menu li a");

  // Se não houver seções ou links no menu, não faz nada
  if (sections.length === 0 || menuLinks.length === 0) {
    return;
  }

  // Função para atualizar o link ativo no menu
  const activateMenuLink = () => {
    let currentSectionId = "";

    // Itera sobre as seções para encontrar a que está visível
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // O valor 160 é um ajuste para a altura do header fixo
      if (window.scrollY >= sectionTop - 160) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Atualiza a classe 'active' nos links do menu
    menuLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  // Adiciona o listener de scroll na janela
  window.addEventListener("scroll", activateMenuLink);
});