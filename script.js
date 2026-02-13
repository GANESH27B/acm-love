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

    // --- NEW: Background Floating Hearts ---
    const redShades = [
        'rgba(255, 77, 109, 0.4)',
        'rgba(201, 24, 74, 0.5)',
        'rgba(255, 117, 143, 0.4)',
        'rgba(255, 0, 50, 0.3)'
    ];

    function spawnBGHeart() {
        const bgHeart = document.createElement('div');
        bgHeart.className = 'floating-bg-heart';
        bgHeart.innerText = '❤';

        // Random start position
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 50;

        bgHeart.style.left = `${startX}px`;
        bgHeart.style.top = `${startY}px`;

        // Random Red Shade
        bgHeart.style.color = redShades[Math.floor(Math.random() * redShades.length)];

        // Random size
        const size = 15 + Math.random() * 45;
        bgHeart.style.fontSize = `${size}px`;

        // Random drift duration 10-20s
        const duration = 8 + Math.random() * 8; // Slightly faster drift
        bgHeart.style.animationDuration = `${duration}s`;

        // Drift properties
        const dx = (Math.random() - 0.5) * 250;
        const dy = -(window.innerHeight + 150);
        const dr = (Math.random() - 0.5) * 720;

        bgHeart.style.setProperty('--dx', `${dx}px`);
        bgHeart.style.setProperty('--dy', `${dy}px`);
        bgHeart.style.setProperty('--dr', `${dr}deg`);

        body.appendChild(bgHeart);

        setTimeout(() => bgHeart.remove(), duration * 1000);
    }

    // Spawn EXTREMELY frequently (every 20ms) for total heart saturation
    setInterval(spawnBGHeart, 20);

    // Initial massive batch to instantly flood the screen
    for (let i = 0; i < 200; i++) {
        setTimeout(spawnBGHeart, Math.random() * 1000);
    }
});
