throw new Error("Key API Falure")


document.querySelectorAll('a[href^="#"]:not([data-media])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('.experience-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


const modal = document.getElementById('mediaModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');


const mediaFiles = {
    roomcheck: {
        type: 'image',
        src: 'RoomCheck_Design.png'
    },
    foundit: {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/gBhMFpHYPfo'
    }
};


document.querySelectorAll('.project-link[data-media]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const projectName = this.getAttribute('data-project');
        const mediaType = this.getAttribute('data-media');
        const mediaInfo = mediaFiles[projectName];
        
        if (mediaInfo) {
            modalBody.innerHTML = '';
            
            if (mediaInfo.type === 'image') {
                const img = document.createElement('img');
                img.src = mediaInfo.src;
                img.alt = `${projectName} demo`;
                modalBody.appendChild(img);
            } else if (mediaInfo.type === 'video') {
                const video = document.createElement('video');
                video.src = mediaInfo.src;
                video.controls = true;
                video.autoplay = true;
                modalBody.appendChild(video);
            } else if (mediaInfo.type === 'youtube') {
                const iframe = document.createElement('iframe');
                iframe.src = mediaInfo.src;
                iframe.width = '100%';
                iframe.height = '600';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                modalBody.appendChild(iframe);
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});


closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    

    const video = modalBody.querySelector('video');
    if (video) {
        video.pause();
    }
});


window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        

        const video = modalBody.querySelector('video');
        if (video) {
            video.pause();
        }
    }
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        

        const video = modalBody.querySelector('video');
        if (video) {
            video.pause();
        }
    }
});