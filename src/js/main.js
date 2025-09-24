document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar__link");

    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.remove("navbar--large");
            navbar.classList.add("navbar--small");
        } else {
            navbar.classList.remove("navbar--small");
            navbar.classList.add("navbar--large");
        }

        let current = "";
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= documentHeight - 10) {
            current = "contact";
        } else {
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - navbar.offsetHeight;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollY >= sectionTop &&
                    scrollY < sectionTop + sectionHeight
                ) {
                    current = section.getAttribute("id");
                }
            });
        }

        navLinks.forEach((link) => {
            link.classList.remove("navbar__link--active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("navbar__link--active");
            }
        });
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });

                setTimeout(() => {
                    history.pushState(null, null, `#${targetId}`);
                }, 100);
            }
        });
    });

    const carouselContainer = document.getElementById("carousel-container");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const slides = document.querySelectorAll(".carousel__slide");

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carouselContainer.style.transform = `translateX(${translateX}%)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }

    const modal = document.getElementById("process-modal");
    const modalTrigger = document.getElementById("modal-trigger");
    const modalClose = document.getElementById("modal-close");

    if (modalTrigger) {
        modalTrigger.addEventListener("click", function () {
            modal.classList.add("modal--active");
            document.body.style.overflow = "hidden";
        });
    }

    if (modalClose) {
        modalClose.addEventListener("click", function () {
            modal.classList.remove("modal--active");
            document.body.style.overflow = "";
        });
    }

    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.classList.remove("modal--active");
                document.body.style.overflow = "";
            }
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("modal--active")) {
            modal.classList.remove("modal--active");
            document.body.style.overflow = "";
        }
    });
});
