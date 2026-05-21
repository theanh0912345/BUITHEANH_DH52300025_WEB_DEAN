let currentIndex=0;
const slider=document.getElementById('slider');
const totalslides=document.querySelectorAll('.slider img').length;
function updateSlider(){
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
}
function nextslide(){
    currentIndex = (currentIndex + 1) % totalslides;
    updateSlider();
}
function prevslide(){
    currentIndex = (currentIndex -1 + totalslides) % totalslides;
    updateSlider();
}
setInterval(nextslide,6000);

