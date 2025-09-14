// Animations JavaScript File

// Document Ready
$(document).ready(function () {
  // Initialize animations
  initScrollAnimations();
  initTypingEffect();
  initParallaxEffect();
  initCounterAnimation();
  initProgressBars();
  initScrollReveal();
});

// Scroll Animations
function initScrollAnimations() {
  // Animate elements on scroll
  const animatedElements = $(".animate-on-scroll");

  if (animatedElements.length) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $(entry.target).addClass("animated");
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.each(function () {
      animationObserver.observe(this);
    });
  }
}

// Typing Effect
function initTypingEffect() {
  const typingElements = $(".typing-effect");

  if (typingElements.length) {
    typingElements.each(function () {
      const element = $(this);
      const text = element.text();
      const speed = element.data("speed") || 100;

      element.text("");

      let i = 0;
      const timer = setInterval(function () {
        if (i < text.length) {
          element.append(text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    });
  }
}

// Parallax Effect
function initParallaxEffect() {
  const parallaxElements = $(".parallax");

  if (parallaxElements.length) {
    $(window).on("scroll", function () {
      const scrollTop = $(this).scrollTop();

      parallaxElements.each(function () {
        const element = $(this);
        const speed = element.data("speed") || 0.5;
        const yPos = -(scrollTop * speed);

        element.css("transform", `translateY(${yPos}px)`);
      });
    });
  }
}

// Counter Animation
function initCounterAnimation() {
  const counterElements = $(".counter");

  if (counterElements.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = $(entry.target);
            const target = parseInt(counter.data("target"));
            const duration = parseInt(counter.data("duration")) || 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.text(target.toLocaleString());
                clearInterval(timer);
              } else {
                counter.text(Math.floor(current).toLocaleString());
              }
            }, 16);

            counterObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    counterElements.each(function () {
      counterObserver.observe(this);
    });
  }
}

// Progress Bars Animation
function initProgressBars() {
  const progressBars = $(".progress-bar");

  if (progressBars.length) {
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = $(entry.target);
            const width = progressBar.data("width");

            progressBar.animate(
              {
                width: width + "%",
              },
              1000
            );

            progressObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    progressBars.each(function () {
      progressObserver.observe(this);
    });
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = $(".reveal");

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $(entry.target).addClass("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    revealElements.each(function () {
      revealObserver.observe(this);
    });
  }
}

// Text Scramble Effect
function initTextScramble() {
  const scrambleElements = $(".scramble-effect");

  if (scrambleElements.length) {
    scrambleElements.each(function () {
      const element = $(this);
      const text = element.text();
      const chars = "!<>-_\\/[]{}—=+*^?#________";

      element.text("");

      let queue = [];

      for (let i = 0; i < text.length; i++) {
        queue.push({
          from: chars[Math.floor(Math.random() * chars.length)],
          to: text[i],
          start: Math.floor(Math.random() * 40),
          end: Math.floor(Math.random() * 40) + 40,
        });
      }

      let frame = 0;
      let output = [];

      const update = () => {
        let complete = 0;

        for (let i = 0, n = queue.length; i < n; i++) {
          let { from, to, start, end, char } = queue[i];

          if (frame >= end) {
            complete++;
            output[i] = to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)];
              queue[i].char = char;
            }
            output[i] = char;
          } else {
            output[i] = from;
          }
        }

        element.text(output.join(""));

        if (complete === queue.length) {
          cancelAnimationFrame(update);
        } else {
          frame++;
          requestAnimationFrame(update);
        }
      };

      update();
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initTextScramble();
});

// Particle Effect
function initParticleEffect() {
  const canvas = $("#particle-canvas")[0];

  if (canvas) {
    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 100;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
      });
    }

    // Draw particles
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              0.2 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();

    // Resize canvas when window is resized
    $(window).on("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initParticleEffect();
});

// Gradient Animation
function initGradientAnimation() {
  const gradientElements = $(".gradient-animation");

  if (gradientElements.length) {
    let position = 0;

    setInterval(() => {
      position = (position + 1) % 100;

      gradientElements.each(function () {
        const element = $(this);
        const colors = element.data("colors") || ["#4e54c8", "#8f94fb"];

        element.css(
          "background",
          `linear-gradient(${position * 3.6}deg, ${colors[0]}, ${colors[1]})`
        );
      });
    }, 50);
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initGradientAnimation();
});

// Staggered Animation
function initStaggeredAnimation() {
  const staggeredElements = $(".stagger-animation");

  if (staggeredElements.length) {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = $(entry.target).find(".stagger-item");

            elements.each(function (index) {
              const element = $(this);

              setTimeout(() => {
                element.addClass("animated");
              }, index * 100);
            });

            staggerObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    staggeredElements.each(function () {
      staggerObserver.observe(this);
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initStaggeredAnimation();
});

// Morphing Text Animation
function initMorphingText() {
  const morphTextElements = $(".morph-text");

  if (morphTextElements.length) {
    morphTextElements.each(function () {
      const element = $(this);
      const texts = element.data("texts") || ["Text 1", "Text 2", "Text 3"];
      let index = 0;

      setInterval(() => {
        element.fadeOut(500, function () {
          index = (index + 1) % texts.length;
          element.text(texts[index]).fadeIn(500);
        });
      }, 3000);
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initMorphingText();
});

// Floating Elements Animation
function initFloatingAnimation() {
  const floatingElements = $(".float-animation");

  if (floatingElements.length) {
    floatingElements.each(function () {
      const element = $(this);
      const amplitude = element.data("amplitude") || 10;
      const duration = element.data("duration") || 3;

      element.css({
        animation: `float ${duration}s ease-in-out infinite`,
        transformOrigin: "center center",
      });

      // Add keyframes dynamically
      if (!$("#float-keyframes").length) {
        $("head").append(`
                    <style id="float-keyframes">
                        @keyframes float {
                            0% { transform: translateY(0px); }
                            50% { transform: translateY(-${amplitude}px); }
                            100% { transform: translateY(0px); }
                        }
                    </style>
                `);
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFloatingAnimation();
});

// Glitch Effect
function initGlitchEffect() {
  const glitchElements = $(".glitch-effect");

  if (glitchElements.length) {
    glitchElements.each(function () {
      const element = $(this);

      setInterval(() => {
        if (Math.random() < 0.1) {
          element.addClass("glitching");

          setTimeout(() => {
            element.removeClass("glitching");
          }, 200);
        }
      }, 2000);
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initGlitchEffect();
});

// Wave Animation
function initWaveAnimation() {
  const waveElements = $(".wave-animation");

  if (waveElements.length) {
    waveElements.each(function () {
      const element = $(this);
      const path = element.find("path");
      const originalD = path.attr("d");
      let waveOffset = 0;

      setInterval(() => {
        waveOffset = (waveOffset + 1) % 100;

        // Create wave effect by modifying the path
        const newD = originalD.replace(/M985\.66.*Z/, function (match) {
          return match.replace(
            /c-80\.26-17\.34-168\.06-16\.33-250\.45\.39/,
            `c-${80 + Math.sin(waveOffset * 0.1) * 10}-17.34-${
              168 + Math.cos(waveOffset * 0.1) * 10
            }-16.33-250.45.39`
          );
        });

        path.attr("d", newD);
      }, 50);
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initWaveAnimation();
});

// Tilt Effect
function initTiltEffect() {
  const tiltElements = $(".tilt-effect");

  if (tiltElements.length) {
    tiltElements.each(function () {
      const element = $(this);

      element.on("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.css(
          "transform",
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        );
      });

      element.on("mouseleave", function () {
        element.css(
          "transform",
          "perspective(1000px) rotateX(0deg) rotateY(0deg)"
        );
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initTiltEffect();
});

// Blob Animation
function initBlobAnimation() {
  const blobElements = $(".blob-animation");

  if (blobElements.length) {
    blobElements.each(function () {
      const element = $(this);
      const amplitude = element.data("amplitude") || 20;

      setInterval(() => {
        const radius1 = 50 + Math.sin(Date.now() * 0.001) * amplitude;
        const radius2 = 50 + Math.cos(Date.now() * 0.001) * amplitude;

        element.css(
          "border-radius",
          `${radius1}% ${100 - radius1}% ${radius2}% ${100 - radius2}% / ${
            100 - radius2
          }% ${radius1}% ${100 - radius1}% ${radius2}%`
        );
      }, 50);
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initBlobAnimation();
});

// Text Highlight Animation
function initTextHighlight() {
  const highlightElements = $(".highlight-animation");

  if (highlightElements.length) {
    highlightElements.each(function () {
      const element = $(this);
      const text = element.text();
      const words = text.split(" ");

      element.html(
        words
          .map((word) => {
            return `<span class="highlight-word">${word}</span>`;
          })
          .join(" ")
      );

      const wordsElements = element.find(".highlight-word");

      wordsElements.each(function (index) {
        const word = $(this);

        setTimeout(() => {
          word.addClass("highlighted");
        }, index * 200);
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initTextHighlight();
});
