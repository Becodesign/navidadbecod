document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.menu-item');

    items.forEach((item, i) => {
        item.style.opacity = 0;
        item.style.transform = `translateX(${i % 2 === 0 ? '-200px' : '200px'})`;
    });

    items.forEach((item, i) => {
        setTimeout(() => {
            anime({
                targets: item,
                opacity: [0, 1],
                translateX: 0,
                duration: 800,
                easing: 'easeOutQuad'
            });
        }, i * 800); // 200ms de diferencia entre cada uno
    });
});
