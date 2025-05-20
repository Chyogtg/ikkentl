// Set the wedding date here
const weddingDate = new Date('2025-03-04T19:00:00+07:00').getTime();

// Update the countdown every second
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the results
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector('.timer').innerHTML = "The wedding has begun!";
    }
}, 1000);

// Add cat-themed animations
document.addEventListener('DOMContentLoaded', function() {
    // Function to create passing cats
    function createPassingCat() {
        const cat = document.createElement('div');
        cat.className = 'passing-cat';
        cat.classList.add(Math.random() > 0.5 ? 'left' : 'right');
        
        // Random size between 40-80px
        const size = Math.random() * 40 + 40;
        cat.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            border-radius: ${size/2}px ${size/2}px 0 0;
            top: ${Math.random() * 60 + 20}%;
            animation-duration: ${Math.random() * 4 + 6}s;
        `;
        
        document.querySelector('.video-section').appendChild(cat);
        
        // Remove the cat after animation
        setTimeout(() => {
            cat.remove();
        }, 10000);
    }

    // Create passing cats at random intervals
    function schedulePassingCat() {
        createPassingCat();
        setTimeout(schedulePassingCat, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds
    }

    // Start creating passing cats
    schedulePassingCat();

    // Add floating animation to cat ears
    const catEars = document.querySelectorAll('.cat-ears');
    catEars.forEach(ear => {
        setInterval(() => {
            ear.style.transform = `translateX(-50%) translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        }, 50);
    });

    // Create floating cat silhouettes
    function createFloatingCat() {
        const cat = document.createElement('div');
        cat.className = 'floating-cat';
        const size = Math.random() * 20 + 30; // Random size between 30-50px
        cat.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: #ffb6c1;
            border-radius: ${size/2}px ${size/2}px 0 0;
            pointer-events: none;
            opacity: ${Math.random() * 0.2 + 0.1};
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            transform: rotate(${Math.random() * 360}deg);
            animation: float ${Math.random() * 5 + 5}s linear infinite;
        `;
        document.querySelector('.floating-cats').appendChild(cat);
        
        setTimeout(() => {
            cat.remove();
        }, 10000);
    }

    // Create floating cats more frequently
    setInterval(createFloatingCat, 500); // Create a new cat every 500ms

    // Add paw prints randomly on the page
    function createPawPrint() {
        const paw = document.createElement('div');
        paw.className = 'cat-paw';
        const size = Math.random() * 10 + 20; // Random size between 20-30px
        paw.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: #ffb6c1;
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.2 + 0.1};
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: fadeOut 2s forwards;
        `;
        document.body.appendChild(paw);
        
        setTimeout(() => {
            paw.remove();
        }, 2000);
    }

    // Create paw prints more frequently
    setInterval(createPawPrint, 300); // Create a new paw print every 300ms

    // Add mouse follower cat
    let mouseX = 0;
    let mouseY = 0;
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: #ffb6c1;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.5;
        transition: transform 0.1s ease;
        z-index: 1000;
    `;
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.left = `${mouseX - 10}px`;
        follower.style.top = `${mouseY - 10}px`;
    });
});

// Add CSS animation for floating cats
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translate(100px, -100px) rotate(180deg);
            opacity: 0.1;
        }
        100% {
            transform: translate(200px, 0) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        0% { opacity: 0.2; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Video initialization
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('wedding-video');
    
    // Set initial video properties
    video.muted = false;
    video.volume = 1;
    video.playbackRate = 1.0;
    video.autoplay = true;
    video.playsInline = true;
    
    // Function to handle video play with sound
    async function playVideoWithSound() {
        try {
            // Force play with sound
            video.muted = false;
            video.volume = 1;
            await video.play();
        } catch (error) {
            console.log("Play failed, retrying:", error);
            // Retry after a short delay
            setTimeout(playVideoWithSound, 1000);
        }
    }

    // Try to play when video is ready
    video.addEventListener('canplay', playVideoWithSound);
    
    // Also try immediately
    playVideoWithSound();
    
    // Add error handling
    video.addEventListener('error', (e) => {
        console.error("Video error:", e);
        // Retry on error
        setTimeout(playVideoWithSound, 1000);
    });
}); 