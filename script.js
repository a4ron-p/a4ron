const ghost = document.getElementById("ghost")

let ghostX = window.innerWidth / 2
let ghostY = window.innerHeight / 2
let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
const lastMouseX = mouseX
const lastMouseY = mouseY
let mouseStoppedTimer = null
let isMoving = false
let ghostRotation = 0

const heroSection = document.getElementById("home")
const heroContent = document.querySelector(".hero-content")
const heroButtons = document.querySelectorAll(".hero-buttons .btn")
const socialLinks = document.querySelectorAll(".social-link")

window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

const heroObserverOptions = {
  threshold: 0.3,
  rootMargin: "0px",
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (heroContent) {
        heroContent.classList.remove("animate-in-reverse")
        void heroContent.offsetWidth
        heroContent.classList.add("animate-in")
      }
      heroButtons.forEach((btn, index) => {
        btn.classList.remove("animate-button-reverse")
        void btn.offsetWidth
        btn.classList.add("animate-button")
        btn.style.animationDelay = `${1.2 + index * 0.2}s`
      })
      socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${1.6 + index * 0.15}s`
      })
    } else {
      if (heroContent) {
        heroContent.classList.remove("animate-in")
        heroContent.classList.add("animate-in-reverse")
      }
      heroButtons.forEach((btn) => {
        btn.classList.remove("animate-button")
        btn.classList.add("animate-button-reverse")
      })
    }
  })
}, heroObserverOptions)

if (heroSection) {
  heroObserver.observe(heroSection)
}

document.addEventListener("DOMContentLoaded", () => {
  const heroName = document.getElementById("heroName")
  const text = heroName.textContent

  // Clear the text and create letter spans
  heroName.textContent = ""

  // Create letter spans for animation
  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement("span")
    letter.className = "letter"
    letter.textContent = text[i]
    letter.style.animationDelay = i * 0.08 + "s"
    heroName.appendChild(letter)
  }

  // Calculate total animation time and show name after it completes
  const totalAnimationTime = text.length * 0.08 + 0.6
  setTimeout(() => {
    heroName.classList.add("show")
  }, totalAnimationTime * 1000)
})

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  isMoving = true

  if (mouseStoppedTimer) {
    clearTimeout(mouseStoppedTimer)
  }

  mouseStoppedTimer = setTimeout(() => {
    isMoving = false
  }, 150)
})

function animateGhost() {
  const heroRect = heroSection.getBoundingClientRect()
  const isInHeroSection = mouseY >= heroRect.top && mouseY <= heroRect.bottom

  const dx = mouseX - ghostX
  const dy = mouseY - ghostY
  const distance = Math.sqrt(dx * dx + dy * dy)

  const easing = 0.08

  if (isInHeroSection) {
    if (distance < 80) {
      const angle = Math.atan2(dy, dx)
      const pushDistance = 80 - distance
      ghostX -= Math.cos(angle) * pushDistance * 0.5
      ghostY -= Math.sin(angle) * pushDistance * 0.5
    } else {
      ghostX += dx * easing
      ghostY += dy * easing
    }

    if (isMoving && distance > 5) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      ghostRotation += (angle - ghostRotation) * 0.1
    } else {
      ghostRotation += (0 - ghostRotation) * 0.1
    }
  } else {
    const heroCenterX = heroRect.left + heroRect.width / 2
    const heroCenterY = heroRect.top + heroRect.height / 2
    ghostX += (heroCenterX - ghostX) * 0.05
    ghostY += (heroCenterY - ghostY) * 0.05
    ghostRotation += (0 - ghostRotation) * 0.1
  }

  ghost.style.left = ghostX + "px"
  ghost.style.top = ghostY + "px"
  ghost.style.transform = `translate(-50%, -50%) rotate(${ghostRotation}deg)`

  requestAnimationFrame(animateGhost)
}

animateGhost()

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

const contactBtn = document.getElementById("contactBtn")
const contactModal = document.getElementById("contactModal")
const closeContactModal = document.getElementById("closeContactModal")
const contactForm = document.getElementById("contactForm")
const contactSubmitBtn = document.getElementById("contactSubmitBtn")
const successAnimation = document.getElementById("successAnimation")

// Open modal when Contact Me button is clicked
if (contactBtn) {
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault()
    contactModal.classList.add("active")
    document.body.style.overflow = "hidden"
  })
}

// Close modal when close button is clicked
if (closeContactModal) {
  closeContactModal.addEventListener("click", () => {
    closeModal()
  })
}

// Close modal when clicking outside the modal content
if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      closeModal()
    }
  })
}

// Close modal when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && contactModal.classList.contains("active")) {
    closeModal()
  }
})

function closeModal() {
  contactModal.classList.remove("active")
  document.body.style.overflow = "auto"
  contactForm.reset()
  successAnimation.classList.add("hidden")
}

// Handle form submission
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Get form data
    const name = document.getElementById("contactName").value
    const email = document.getElementById("contactEmail").value
    const subject = document.getElementById("contactSubject").value
    const message = document.getElementById("contactMessage").value

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields")
      return
    }

    // Disable submit button during sending
    contactSubmitBtn.disabled = true
    contactSubmitBtn.textContent = "Sending..."

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_43sjlxl",
          template_id: "template_axnlnbm",
          user_id: "l3vAZwki72uq3V0gz",
          template_params: {
            to_email: "aaronmansueto9@gmail.com",
            name: name,
            email: email,
            subject: subject,
            message: message,
          },
        }),
      })

      if (response.ok) {
        showSuccessAnimation()
      } else {
        // Try to parse error response as JSON, fallback to status text
        let errorMessage = `Failed to send email: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error("[v0] Error sending email:", error)
      alert(`Failed to send message: ${error.message}`)
      contactSubmitBtn.disabled = false
      contactSubmitBtn.textContent = "Send Message"
    }
  })
}

function showSuccessAnimation() {
  // Hide form and show success animation
  contactForm.style.display = "none"
  successAnimation.classList.remove("hidden")

  // Auto-close modal after 3 seconds
  setTimeout(() => {
    closeModal()
    contactForm.style.display = "block"
    contactSubmitBtn.disabled = false
    contactSubmitBtn.textContent = "Send Message"
  }, 3000)
}

const scrollAnimationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("animate-reverse")
        entry.target.classList.add("animate")
      } else {
        entry.target.classList.remove("animate")
        entry.target.classList.add("animate-reverse")
      }
    })
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  },
)

// Observe all scroll-animate elements individually
document
  .querySelectorAll(".scroll-animate-left, .scroll-animate-right, .scroll-animate-fade, .scroll-animate-card")
  .forEach((el) => {
    scrollAnimationObserver.observe(el)
  })

const aboutSection = document.getElementById("about")
const aboutImageWrapper = document.querySelector(".about-image-wrapper")
const aboutHeading = document.querySelector(".about-heading")
const aboutText = document.querySelector(".about-text")
const aboutBullets = document.querySelectorAll(".about-bullet")

const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (aboutImageWrapper) {
        aboutImageWrapper.classList.remove("animate-in-reverse")
        void aboutImageWrapper.offsetWidth
        aboutImageWrapper.classList.add("animate-in")
      }
      if (aboutHeading) {
        aboutHeading.classList.remove("animate-heading-reverse")
        void aboutHeading.offsetWidth
        aboutHeading.classList.add("animate-heading")
      }
      if (aboutText) {
        aboutText.classList.remove("animate-text-reverse")
        void aboutText.offsetWidth
        aboutText.classList.add("animate-text")
      }
      aboutBullets.forEach((bullet) => {
        bullet.classList.remove("animate-bullet-reverse")
        void bullet.offsetWidth
        bullet.classList.add("animate-bullet")
      })
    } else {
      if (aboutImageWrapper) {
        aboutImageWrapper.classList.remove("animate-in")
        aboutImageWrapper.classList.add("animate-in-reverse")
      }
      if (aboutHeading) {
        aboutHeading.classList.remove("animate-heading")
        aboutHeading.classList.add("animate-heading-reverse")
      }
      if (aboutText) {
        aboutText.classList.remove("animate-text")
        aboutText.classList.add("animate-text-reverse")
      }
      aboutBullets.forEach((bullet) => {
        bullet.classList.remove("animate-bullet")
        bullet.classList.add("animate-bullet-reverse")
      })
    }
  })
}, observerOptions)

if (aboutSection) {
  observer.observe(aboutSection)
}

const cubes = document.querySelectorAll(".cube")

cubes.forEach((cube) => {
  cube.addEventListener("mouseenter", () => {
    cube.classList.add("rotating")
  })

  cube.addEventListener("mouseleave", () => {
    cube.classList.remove("rotating")
  })
})

const miniCubes = document.querySelectorAll(".mini-cube")
miniCubes.forEach((cube) => {
  cube.addEventListener("click", (e) => {
    e.stopPropagation()
    const rubiksCube = document.querySelector(".rubiks-cube")
    rubiksCube.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`
  })
})

const techLanguages = [
  {
    name: "PHP",
    description:
      "A server-side scripting language perfect for building dynamic web applications and APIs. Known for its ease of use and powerful backend capabilities.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-logo-1vfuOuAW8XO47VbU3lOdnrm39JaaVI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-logo-1vfuOuAW8XO47VbU3lOdnrm39JaaVI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-logo-1vfuOuAW8XO47VbU3lOdnrm39JaaVI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-logo-1vfuOuAW8XO47VbU3lOdnrm39JaaVI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-logo-1vfuOuAW8XO47VbU3lOdnrm39JaaVI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-logo-1vfuOuAW8XO47VbU3lOdnrm39JaaVI.jpg",
    ],
  },
  {
    name: "HTML",
    description:
      "The foundation of web development. HTML provides the structure and semantic meaning to web content, making it accessible and SEO-friendly.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html5-logo-E0AtIK9jdX1VZRIrbYdnci721Uq1J0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html5-logo-E0AtIK9jdX1VZRIrbYdnci721Uq1J0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html5-logo-E0AtIK9jdX1VZRIrbYdnci721Uq1J0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html5-logo-E0AtIK9jdX1VZRIrbYdnci721Uq1J0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html5-logo-E0AtIK9jdX1VZRIrbYdnci721Uq1J0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html5-logo-E0AtIK9jdX1VZRIrbYdnci721Uq1J0.png",
    ],
  },
  {
    name: "JavaScript",
    description:
      "A versatile programming language that powers interactive web experiences. Essential for front-end development and increasingly used for backend with Node.js.",
    images: ["js-logo.jpg", "js-logo.jpg", "js-logo.jpg", "js-logo.jpg", "js-logo.jpg", "js-logo.jpg"],
  },
  {
    name: "CSS",
    description:
      "Cascading Style Sheets bring visual design to life. CSS enables responsive layouts, animations, and beautiful styling that makes websites engaging.",
    images: ["css3-logo.png", "css3-logo.png", "css3-logo.png", "css3-logo.png", "css3-logo.png", "css3-logo.png"],
  },
  {
    name: "Bootstrap",
    description:
      "A powerful front-end framework that accelerates development with pre-built components and responsive grid system. Perfect for rapid prototyping.",
    images: ["bs-logo.jpg", "bs-logo.jpg", "bs-logo.jpg", "bs-logo.jpg", "bs-logo.jpg", "bs-logo.jpg"],
  },
  {
    name: "AJAX",
    description:
      "Asynchronous JavaScript and XML enables seamless data exchange without page reloads. Creates smooth, responsive user experiences.",
    images: ["ajax-logo.jpg", "ajax-logo.jpg", "ajax-logo.jpg", "ajax-logo.jpg", "ajax-logo.jpg", "ajax-logo.jpg"],
  },

  {
    name: "MySQL",
    description:
      "A reliable relational database management system. MySQL powers data storage and retrieval for countless web applications worldwide.",
    images: ["sql--logo.jpg", "sql--logo.jpg", "sql--logo.jpg", "sql--logo.jpg", "sql--logo.jpg", "sql--logo.jpg"],
  },
  {
    name: "JSON",
    description:
      "JavaScript Object Notation is the standard format for data exchange in modern web APIs. Lightweight, readable, and universally supported.",
    images: ["json-logo.jpg", "json-logo.jpg", "json-logo.jpg", "json-logo.jpg", "json-logo.jpg", "json-logo.jpg"],
  },
]

let currentTechIndex = 0
let currentCubeRotationX = 0
let currentCubeRotationY = 0

function updateTechCube() {
  const lang = techLanguages[currentTechIndex]

  document.getElementById("techLangName").textContent = lang.name
  document.getElementById("techLangDescription").textContent = lang.description

  currentCubeRotationX = Math.random() * 360
  currentCubeRotationY = Math.random() * 360

  const faces = document.querySelectorAll(".tech-cube-face")
  faces.forEach((face, index) => {
    const img = face.querySelector("img")
    img.src = lang.images[index]
    img.alt = lang.name
    img.crossOrigin = "anonymous"
    img.style.transform = `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
  })

  document.getElementById("techCounter").textContent = `${currentTechIndex + 1} / ${techLanguages.length}`

  const cube = document.getElementById("techCube")
  cube.style.transform = `rotateX(${currentCubeRotationX}deg) rotateY(${currentCubeRotationY}deg)`
}

document.getElementById("techPrevBtn").addEventListener("click", () => {
  currentTechIndex = (currentTechIndex - 1 + techLanguages.length) % techLanguages.length
  updateTechCube()
})

document.getElementById("techNextBtn").addEventListener("click", () => {
  currentTechIndex = (currentTechIndex + 1) % techLanguages.length
  updateTechCube()
})

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    document.getElementById("techPrevBtn").click()
  } else if (e.key === "ArrowRight") {
    document.getElementById("techNextBtn").click()
  }
})

const techSection = document.getElementById("tech")
const techCubeWrapper = document.querySelector(".tech-cube-wrapper")
const techDescription = document.querySelector(".tech-description")
const techNavigation = document.querySelector(".tech-navigation")
const techHeading = document.querySelector(".tech-heading")
const techSubtitle = document.querySelector(".tech-subtitle")

const techObserverOptions = {
  threshold: 0.3,
  rootMargin: "0px",
}

const techObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (techHeading) {
        techHeading.classList.remove("animate-heading-reverse")
        void techHeading.offsetWidth
        techHeading.classList.add("animate-heading")
      }
      if (techSubtitle) {
        techSubtitle.classList.remove("animate-subtitle-reverse")
        void techSubtitle.offsetWidth
        techSubtitle.classList.add("animate-subtitle")
      }
      if (techCubeWrapper) {
        techCubeWrapper.classList.remove("animate-cube-reverse")
        void techCubeWrapper.offsetWidth
        techCubeWrapper.classList.add("animate-cube")
      }
      if (techDescription) {
        techDescription.classList.remove("animate-description-reverse")
        void techDescription.offsetWidth
        techDescription.classList.add("animate-description")
      }
      if (techNavigation) {
        techNavigation.classList.remove("animate-buttons-reverse")
        void techNavigation.offsetWidth
        techNavigation.classList.add("animate-buttons")
      }
    } else {
      if (techHeading) {
        techHeading.classList.remove("animate-heading")
        techHeading.classList.add("animate-heading-reverse")
      }
      if (techSubtitle) {
        techSubtitle.classList.remove("animate-subtitle")
        techSubtitle.classList.add("animate-subtitle-reverse")
      }
      if (techCubeWrapper) {
        techCubeWrapper.classList.remove("animate-cube")
        techCubeWrapper.classList.add("animate-cube-reverse")
      }
      if (techDescription) {
        techDescription.classList.remove("animate-description")
        techDescription.classList.add("animate-description-reverse")
      }
      if (techNavigation) {
        techNavigation.classList.remove("animate-buttons")
        techNavigation.classList.add("animate-buttons-reverse")
      }
    }
  })
}, techObserverOptions)

if (techSection) {
  techObserver.observe(techSection)
}

const worksSection = document.getElementById("works")
const worksHeading = document.querySelector(".works-heading")
const worksSubtitle = document.querySelector(".works-subtitle")

const worksObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px",
}

const worksObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (worksHeading) {
        worksHeading.classList.remove("animate-heading-reverse")
        void worksHeading.offsetWidth
        worksHeading.classList.add("animate-heading")
      }
      if (worksSubtitle) {
        worksSubtitle.classList.remove("animate-subtitle-reverse")
        void worksSubtitle.offsetWidth
        worksSubtitle.classList.add("animate-subtitle")
      }
    } else {
      if (worksHeading) {
        worksHeading.classList.remove("animate-heading")
        worksHeading.classList.add("animate-heading-reverse")
      }
      if (worksSubtitle) {
        worksSubtitle.classList.remove("animate-subtitle")
        worksSubtitle.classList.add("animate-subtitle-reverse")
      }
    }
  })
}, worksObserverOptions)

if (worksSection) {
  worksObserver.observe(worksSection)
}

window.addEventListener("load", () => {
  if (heroContent) {
    heroContent.classList.add("animate-in")
  }
  heroButtons.forEach((btn, index) => {
    btn.classList.add("animate-button")
    btn.style.animationDelay = `${1.2 + index * 0.2}s`
  })

  updateTechCube()

  if (techSection) {
    const rect = techSection.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (techHeading) techHeading.classList.add("animate-heading")
      if (techSubtitle) techSubtitle.classList.add("animate-subtitle")
      if (techCubeWrapper) techCubeWrapper.classList.add("animate-cube")
      if (techDescription) techDescription.classList.add("animate-description")
      if (techNavigation) techNavigation.classList.add("animate-buttons")
    }
  }

  if (worksSection) {
    const rect = worksSection.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (worksHeading) worksHeading.classList.add("animate-heading")
      if (worksSubtitle) worksSubtitle.classList.add("animate-subtitle")
    }
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const heroName = document.getElementById("heroName")
  const text = heroName.textContent

  // Clear the text and create letter spans
  heroName.textContent = ""

  // Create letter spans for animation
  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement("span")
    letter.className = "letter"
    letter.textContent = text[i]
    letter.style.animationDelay = i * 0.05 + "s"
    heroName.appendChild(letter)
  }

  // Calculate total animation time and show name after it completes
  const totalAnimationTime = text.length * 0.05 + 0.6
  setTimeout(() => {
    heroName.classList.add("show")
  }, totalAnimationTime * 1000)
})
