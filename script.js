document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação de fade-in para seções
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Validação simples de formulário
   

    // Toggle do menu de navegação
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Fechar o menu ao clicar em um link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    // Toggle do menu móvel
    const navToggleMobile = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    navToggleMobile.addEventListener('click', () => {
        mobileMenu.classList.add('show');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
    });

    // Fechar o menu ao clicar em um link
    document.querySelectorAll('.mobile-menu ul li a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
        });
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navToggleMobile.contains(e.target)) {
            mobileMenu.classList.remove('show');
        }
    });

    // Remover os event listeners antigos do menu de navegação
    const oldNavToggle = document.querySelector('.nav-toggle');
    const oldNavMenu = document.querySelector('nav ul');
    oldNavToggle.removeEventListener('click', () => {
        oldNavMenu.classList.toggle('show');
    });

    // Carrossel
    const carousel = document.querySelector('.carousel');
    const carouselInner = carousel.querySelector('.carousel-inner');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = items.length - 1;
        } else if (index >= items.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Mudar slide automaticamente a cada 5 segundos
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);

    // Carrossel de serviços
    const servicosContainer = document.querySelector('.servicos-container');
    const servicosItems = document.querySelectorAll('.servico');
    const prevServico = document.querySelector('.servicos-control.prev');
    const nextServico = document.querySelector('.servicos-control.next');
    let servicoIndex = 0;

    function showServicos(index) {
        const itemWidth = servicosItems[0].offsetWidth;
        const itemsPerView = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = Math.max(0, servicosItems.length - itemsPerView);

        if (index < 0) {
            servicoIndex = maxIndex;
        } else if (index > maxIndex) {
            servicoIndex = 0;
        } else {
            servicoIndex = index;
        }

        const translateX = servicoIndex * (itemWidth + 20); // 20px é a soma das margens laterais
        servicosContainer.style.transform = `translateX(-${translateX}px)`;

        // Atualizar a visibilidade dos botões de controle
        prevServico.style.display = servicoIndex === 0 ? 'none' : 'block';
        nextServico.style.display = servicoIndex === maxIndex ? 'none' : 'block';
    }

    prevServico.addEventListener('click', () => {
        showServicos(servicoIndex - 1);
    });

    nextServico.addEventListener('click', () => {
        showServicos(servicoIndex + 1);
    });

    // Inicializar o carrossel
    showServicos(0);

    // Atualizar o carrossel quando a janela for redimensionada
    window.addEventListener('resize', () => {
        showServicos(0); // Reset para o início ao redimensionar
    });
});

document.getElementById("year").textContent = new Date().getFullYear();


document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const modal = document.getElementById("successModal");
    const closeBtn = document.querySelector(".close");

    if (params.get('success') === 'true') {
        modal.style.display = "block"; // Mostrar o modal
    }

    // Fechar o modal quando clicar no "x"
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Fechar o modal quando clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});