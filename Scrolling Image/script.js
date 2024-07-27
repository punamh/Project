let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex =0;
    }
}
setInterval(showSlides, 2000);