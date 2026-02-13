document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loveBtn = document.getElementById('loveBtn');

    // Heart and Electronics symbols to randomize
    const hearts = ['❤️', '💖', '💝', '⚡', '🔌', '💡', '⚙️', '💓'];

    let lastX = 0;
    let lastY = 0;
    const distanceThreshold = 10; // Lower threshold = MORE hearts

    // Mouse Parallax variables
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse move for both trail and parallax
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;

        // Update parallax CSS variables
        body.style.setProperty('--mx', `${mouseX * 30}px`);
        body.style.setProperty('--my', `${mouseY * 30}px`);

        const x = e.clientX;
        const y = e.clientY;

        // Calculate distance moved
        const dist = Math.hypot(x - lastX, y - lastY);

        if (dist > distanceThreshold) {
            spawnHeart(x, y);
            lastX = x;
            lastY = y;
        }
    });

    // Track touch move for mobile devices
    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        const dist = Math.hypot(x - lastX, y - lastY);

        if (dist > distanceThreshold) {
            spawnHeart(x, y);
            lastX = x;
            lastY = y;
        }
    });

    // Handle click on button (only if it exists)
    if (loveBtn) {
        loveBtn.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            for (let i = 0; i < 25; i++) { // Increased burst count
                setTimeout(() => {
                    spawnHeart(x + (Math.random() - 0.5) * 150, y + (Math.random() - 0.5) * 150);
                }, i * 30);
            }
        });
    }

    // Removal logic for cursor hearts (already in the function, just making sure we keep it)
    function spawnHeart(x, y) {
        const heartEl = document.createElement('div');
        heartEl.className = 'moving-heart';
        heartEl.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heartEl.style.left = `${x}px`;
        heartEl.style.top = `${y}px`;
        const tx = (Math.random() - 0.5) * 200;
        const ty = -100 - (Math.random() * 200);
        heartEl.style.setProperty('--tx', `${tx}px`);
        heartEl.style.setProperty('--ty', `${ty}px`);
        heartEl.style.transform = `rotate(${Math.random() * 360}deg)`;
        body.appendChild(heartEl);
        setTimeout(() => heartEl.remove(), 2000);
    }

    // --- Background Floating Hearts ---
    const redShades = [
        'rgba(185, 14, 54, 0.6)',
        'rgba(154, 3, 30, 0.5)',
        'rgba(128, 0, 0, 0.4)',
        'rgba(201, 24, 74, 0.6)',
        '#800000'
    ];

    const isMobile = window.innerWidth <= 768;

    function spawnBGHeart() {
        const bgHeart = document.createElement('div');
        bgHeart.className = 'floating-bg-heart';
        bgHeart.innerText = '❤';

        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 50;

        bgHeart.style.left = `${startX}px`;
        bgHeart.style.top = `${startY}px`;

        bgHeart.style.color = redShades[Math.floor(Math.random() * redShades.length)];

        const size = isMobile ? (10 + Math.random() * 30) : (15 + Math.random() * 55);
        bgHeart.style.fontSize = `${size}px`;

        const duration = isMobile ? (8 + Math.random() * 12) : (6 + Math.random() * 10);
        bgHeart.style.animationDuration = `${duration}s`;

        const dx = (Math.random() - 0.5) * (isMobile ? 150 : 300);
        const dy = -(window.innerHeight + 150);
        const dr = (Math.random() - 0.5) * 720;

        bgHeart.style.setProperty('--dx', `${dx}px`);
        bgHeart.style.setProperty('--dy', `${dy}px`);
        bgHeart.style.setProperty('--dr', `${dr}deg`);

        body.appendChild(bgHeart);
        setTimeout(() => bgHeart.remove(), duration * 1000);
    }

    // Adjust density based on device
    const spawnInterval = isMobile ? 300 : 20; // Slower on mobile for professionalism
    setInterval(spawnBGHeart, spawnInterval);

    const initialCount = isMobile ? 30 : 200;
    for (let i = 0; i < initialCount; i++) {
        setTimeout(spawnBGHeart, Math.random() * (isMobile ? 5000 : 1000));
    }
});
