// PERFECT AVATAR INTERACTION
const avatarContainer = document.querySelector(".avatar-container");
const avatarProgress = document.getElementById("avatar-progress");
const avatarOverlay = document.getElementById("avatar-overlay");
const toast = document.getElementById("toast");

let progress = 0;
let progressInterval;
let isHighlighted = false;
let isProgressActive = false;
let reverseProgressInterval;

avatarContainer.addEventListener("mouseenter", () => {
  console.log("Mouse entered avatar");
  if (isHighlighted) return;

  // Clear any reverse progress
  clearInterval(reverseProgressInterval);

  isProgressActive = true;
  progress = 0;

  progressInterval = setInterval(() => {
    if (!isProgressActive) {
      clearInterval(progressInterval);
      return;
    }

    progress += 2; // 2% per interval (50ms * 50 = 2500ms total)
    console.log("Progress:", progress + "%");
    avatarProgress.style.background = `conic-gradient(#10b981 ${progress * 3.6}deg, transparent 0deg)`;

    if (progress >= 100) {
      console.log("Progress completed!");
      clearInterval(progressInterval);

      // Show overlay image and highlights when progress completes
      avatarOverlay.style.opacity = "1";
      highlightSkills();
      showToast();
      isHighlighted = true;
    }
  }, 50); // 50ms intervals
});

avatarContainer.addEventListener("mouseleave", () => {
  console.log("Mouse left avatar");

  if (progress < 100) {
    // Reset progress if not completed
    console.log("Resetting progress");
    isProgressActive = false;
    clearInterval(progressInterval);

    // Reverse the progress animation
    reverseProgress(progress);
  } else {
    // If progress was completed, reset everything when mouse leaves
    console.log("Resetting everything");
    resetAll();
  }
});

function reverseProgress(currentProgress) {
  let reverseProgressValue = currentProgress;

  reverseProgressInterval = setInterval(() => {
    if (reverseProgressValue <= 0) {
      clearInterval(reverseProgressInterval);
      progress = 0;
      avatarProgress.style.background = `conic-gradient(#10b981 0deg, transparent 0deg)`;
      return;
    }

    reverseProgressValue -= 4; // Reverse faster than forward
    progress = reverseProgressValue;
    avatarProgress.style.background = `conic-gradient(#10b981 ${reverseProgressValue * 3.6}deg, transparent 0deg)`;
  }, 20); // Faster reverse animation
}

function highlightSkills() {
  console.log("Highlighting skills - ALL AT ONCE");
  // Highlight all skills simultaneously
  document.querySelectorAll(".highlightable").forEach((text) => {
    text.classList.add("highlighted");
    console.log("Highlighted:", text.textContent);
  });
}

function removeHighlights() {
  console.log("Removing highlights - ALL AT ONCE");
  // Remove all highlights simultaneously
  document.querySelectorAll(".highlightable").forEach((text) => {
    text.classList.remove("highlighted");
  });
}

function resetAll() {
  console.log("Resetting all effects");

  // Hide overlay image
  avatarOverlay.style.opacity = "0";

  // Remove all highlights at once
  removeHighlights();

  // Reverse the progress animation
  reverseProgress(100);

  // Reset progress variables
  setTimeout(() => {
    progress = 0;
    isHighlighted = false;
    isProgressActive = false;
  }, 1000); // Wait for animations to complete
}

function showToast(title = "Achievement Unlocked!", message = "Key Skills Highlighted", iconClass = "fa-trophy") {
  console.log("Showing toast");
  
  const toastTitle = toast.querySelector(".toast-title");
  const toastMessage = toast.querySelector(".toast-message");
  const toastIcon = toast.querySelector(".toast-icon i");
  
  if (toastTitle) toastTitle.textContent = title;
  if (toastMessage) toastMessage.textContent = message;
  if (toastIcon) toastIcon.className = `fas ${iconClass}`;
  
  toast.classList.remove("show");
  void toast.offsetWidth; // trigger reflow to restart animation
  toast.classList.add("show");

  // Auto-hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Tab functionality for work/education
document.addEventListener("DOMContentLoaded", function () {
  // Update footer year dynamically
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  const workTab = document.getElementById("work-tab");
  const educationTab = document.getElementById("education-tab");
  const workContent = document.getElementById("work-content");
  const educationContent = document.getElementById("education-content");

  workTab.addEventListener("click", function () {
    workTab.classList.remove("tab-inactive");
    workTab.classList.add("tab-active");
    educationTab.classList.remove("tab-active");
    educationTab.classList.add("tab-inactive");

    workContent.classList.remove("hidden");
    educationContent.classList.add("hidden");
  });

  educationTab.addEventListener("click", function () {
    educationTab.classList.remove("tab-inactive");
    educationTab.classList.add("tab-active");
    workTab.classList.remove("tab-active");
    workTab.classList.add("tab-inactive");

    educationContent.classList.remove("hidden");
    workContent.classList.add("hidden");
  });
});

// Navigation smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Video auto-replay after 5 seconds
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("heroVideo");
  if (video) {
    // Set video to autoplay and loop
    video.autoplay = true;
    video.loop = false;
    video.muted = true;

    // When video ends, wait 5 seconds and play again
    video.addEventListener("ended", function () {
      setTimeout(function () {
        video.play();
      }, 5000); // 5 seconds delay
    });

    // Start playing the video
    video.play();
  }
});

// Theme toggle functionality
document
  .querySelector("header div:last-child")
  .addEventListener("click", function () {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  });

// Airplane animation - try to load the video and hide placeholder
document.addEventListener("DOMContentLoaded", function () {
  const airplaneVideo = document.querySelector(".airplane-video");
  const airplanePlaceholder = document.querySelector(".airplane-placeholder");

  if (airplaneVideo) {
    airplaneVideo.addEventListener("loadeddata", function () {
      // Video loaded successfully, hide placeholder
      if (airplanePlaceholder) {
        airplanePlaceholder.style.display = "none";
      }
    });

    airplaneVideo.addEventListener("error", function () {
      // Video failed to load, show placeholder
      if (airplanePlaceholder) {
        airplanePlaceholder.style.display = "flex";
      }
    });
  }
});

// ETHIOPIAN TIME FUNCTIONALITY
function getEthiopianTime() {
  const now = new Date();

  // Ethiopia is UTC+3 (East Africa Time)
  const ethiopiaOffset = 3 * 60; // 3 hours in minutes
  const localOffset = now.getTimezoneOffset();
  const ethiopiaTime = new Date(
    now.getTime() + (localOffset + ethiopiaOffset) * 60000,
  );

  let hours = ethiopiaTime.getHours();
  let minutes = ethiopiaTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  // Add leading zeros
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm} EAT`;
}

function updateEthiopianTime() {
  const timeElement = document.getElementById("ethiopian-time");
  if (timeElement) {
    timeElement.textContent = getEthiopianTime();
  }
}

// Update time immediately and then every minute
updateEthiopianTime();
setInterval(updateEthiopianTime, 60000);

// MAGIC BENTO GRID IMPLEMENTATION
const skillsData = [
  {
    color: "#060010",
    title: "JavaScript",
    description: "",
    label: "",
    icon: "fab fa-js",
    iconColor: "text-yellow-400",
  },
  {
    color: "#060010",
    title: "Java",
    description: "",
    label: "",
    icon: "fab fa-java",
    iconColor: "text-orange-400",
  },
  {
    color: "#060010",
    title: "C++",
    description: "",
    label: "",
    icon: "fas fa-code",
    iconColor: "text-blue-500",
  },
  {
    color: "#060010",
    title: "PHP",
    description: "",
    label: "",
    icon: "fab fa-php",
    iconColor: "text-indigo-400",
  },
  {
    color: "#060010",
    title: "Python",
    description: "",
    label: "",
    icon: "fab fa-python",
    iconColor: "text-yellow-400",
  },
  {
    color: "#060010",
    title: "React",
    description: "",
    label: "",
    icon: "fab fa-react",
    iconColor: "text-blue-400",
  },
  {
    color: "#060010",
    title: "Next.js",
    description: "",
    label: "",
    icon: "fas fa-rocket",
    iconColor: "text-gray-200",
  },
  {
    color: "#060010",
    title: "Tailwind",
    description: "",
    label: "",
    icon: "fas fa-wind",
    iconColor: "text-cyan-400",
  },
];

let projectsData = [];

// Configuration for Magic Bento effects
const config = {
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  clickEffect: true,
  spotlightRadius: 300,
  particleCount: 12,
  glowColor: "255, 255, 255", // WHITE glow color
};

// DOM elements
const skillsGrid = document.getElementById("skillsGrid");
const projectsGrid = document.getElementById("projectsGrid");
let globalSpotlight;

// Call on load
document.addEventListener("DOMContentLoaded", () => {
  initGrids();

  // Set up resize observer to update spotlights
  const observer = new ResizeObserver(() => {
    if (config.enableSpotlight) {
      initGlobalSpotlight();
    }
  });

  observer.observe(document.body);

  // Fetch from backend
  fetchPortfolioData();
});

// --- DYNAMIC BACKEND INTEGRATION ---

const API_URL = "http://localhost:3000/api";

// Fetch initial data
async function fetchPortfolioData() {
  try {
    // Fetch Profile
    const profileRes = await fetch(`${API_URL}/profile`);
    if (profileRes.ok) {
      const profile = await profileRes.json();
      updateProfileUI(profile);
    }

    // Fetch Projects
    const projectsRes = await fetch(`${API_URL}/projects`);
    if (projectsRes.ok) {
      const data = await projectsRes.json();
      if (data && data.length > 0) {
        projectsData = data;
        initProjectsGrid();
      }
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
}

function updateProfileUI(profile) {
  if (profile.name)
    document.getElementById("profile-name").textContent = profile.name;
  if (profile.bio)
    document.getElementById("profile-bio").textContent = profile.bio;
  if (profile.description) {
    let htmlDesc = profile.description;
    const highlightMap = {
      "creative software developer": "creative",
      "full-stack development": "fullstack",
      "UI/UX design": "uiux",
      "engaging user experiences": "ux",
      "improve app responsiveness by 20%": "performance",
      "increased user engagement by 40%": "engagement"
    };
    for (const [text, skill] of Object.entries(highlightMap)) {
      htmlDesc = htmlDesc.replace(text, `<span class="highlightable" data-skill="${skill}">${text}</span>`);
    }
    document.getElementById("description-text").innerHTML = htmlDesc;
  }
  if (profile.profileImage)
    document.getElementById("profile-image-src").src = profile.profileImage;
}

// Modal Logic
const editProfileModal = document.getElementById("edit-profile-modal");
const addProjectModal = document.getElementById("add-project-modal");

document
  .getElementById("edit-profile-btn")
  .addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_URL}/profile`);
      if (res.ok) {
        const profile = await res.json();
        document.getElementById("edit-name").value = profile.name || "";
        document.getElementById("edit-bio").value = profile.bio || "";
        document.getElementById("edit-description").value =
          profile.description || "";
        document.getElementById("edit-image").value =
          profile.profileImage || "";
      }
    } catch (e) {
      console.error(e);
    }
    editProfileModal.classList.remove("hidden");
    editProfileModal.classList.add("flex");
  });

document.getElementById("close-profile-modal").addEventListener("click", () => {
  editProfileModal.classList.add("hidden");
  editProfileModal.classList.remove("flex");
});

document
  .getElementById("edit-profile-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const updatedProfile = {
      name: document.getElementById("edit-name").value,
      bio: document.getElementById("edit-bio").value,
      description: document.getElementById("edit-description").value,
      profileImage: document.getElementById("edit-image").value,
    };

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      if (res.ok) {
        const profile = await res.json();
        updateProfileUI(profile);
        editProfileModal.classList.add("hidden");
        editProfileModal.classList.remove("flex");
        showToast("Success!", "Profile updated successfully!", "fa-check-circle");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  });

document.getElementById("add-project-btn").addEventListener("click", () => {
  document.getElementById("add-project-form").reset();
  addProjectModal.classList.remove("hidden");
  addProjectModal.classList.add("flex");
});

document.getElementById("close-project-modal").addEventListener("click", () => {
  addProjectModal.classList.add("hidden");
  addProjectModal.classList.remove("flex");
});

document
  .getElementById("add-project-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const newProject = {
      title: document.getElementById("proj-title").value,
      description: document.getElementById("proj-desc").value,
      label: document.getElementById("proj-label").value || "Project",
      icon: document.getElementById("proj-icon").value || "fas fa-code",
      iconColor:
        document.getElementById("proj-iconColor").value || "text-blue-500",
      link: document.getElementById("proj-link").value || "#",
    };

    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        const savedProject = await res.json();
        projectsData.push(savedProject);
        initProjectsGrid();
        addProjectModal.classList.add("hidden");
        addProjectModal.classList.remove("flex");
        showToast("Success!", "Project added successfully!", "fa-check-circle");
      }
    } catch (error) {
      console.error("Error adding project", error);
    }
  });

async function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      projectsData = projectsData.filter((p) => p._id !== id);
      initProjectsGrid();
      showToast("Success!", "Project deleted successfully!", "fa-trash-alt");
    }
  } catch (error) {
    console.error("Error deleting project", error);
  }
}

function initGrids() {
  initSkillsGrid();
  initProjectsGrid();
}

function initSkillsGrid() {
  skillsGrid.innerHTML = "";

  skillsData.forEach((skill, index) => {
    const cardElement = createMagicBentoCard(skill, index, "skills");
    skillsGrid.appendChild(cardElement);
  });
}

// Initialize projects grid
function initProjectsGrid() {
  projectsGrid.innerHTML = "";

  projectsData.forEach((project, index) => {
    const cardElement = createMagicBentoCard(project, index, "projects");
    projectsGrid.appendChild(cardElement);
  });
}

// Create a Magic Bento card
function createMagicBentoCard(data, index, type) {
  const cardElement = document.createElement("div");
  cardElement.className = `magic-bento-card ${config.textAutoHide ? "magic-bento-card--text-autohide" : ""} ${config.enableBorderGlow ? "magic-bento-card--border-glow" : ""} ${type === "skills" ? "icon-card" : ""}`;
  cardElement.style.backgroundColor = data.color;
  cardElement.style.setProperty("--glow-color", config.glowColor);

  // For skills, show only icon and title (no description)
  if (type === "skills") {
    cardElement.innerHTML = `
            <div class="magic-bento-card__content">
              <i class="${data.icon} ${data.iconColor} text-3xl mb-2"></i>
              <h2 class="magic-bento-card__title">${data.title}</h2>
            </div>
          `;
  } else {
    // For projects, show full content
    cardElement.innerHTML = `
            <div class="magic-bento-card__header w-full flex justify-between items-center">
              <div class="magic-bento-card__label">${data.label}</div>
              <div class="flex gap-2">
                ${data.link ? `<a href="${data.link}" target="_blank" class="text-gray-400 hover:text-white transition-colors z-10 text-sm" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i></a>` : ""}
                ${data._id ? `<button class="text-red-400 hover:text-red-300 transition-colors z-10 text-sm" onclick="event.stopPropagation(); deleteProject('${data._id}')"><i class="fas fa-trash"></i></button>` : ""}
              </div>
            </div>
            <div class="magic-bento-card__content mt-2">
              <div class="flex items-center gap-3 mb-3">
                <i class="${data.icon} ${data.iconColor} text-2xl"></i>
                <h2 class="magic-bento-card__title">${data.title}</h2>
              </div>
              <p class="magic-bento-card__description">${data.description}</p>
            </div>
          `;

    if (data.link) {
      cardElement.addEventListener("click", () => {
        window.open(data.link, "_blank");
      });
    }
  }

  // Add event listeners for interactive effects
  if (config.enableStars) {
    cardElement.classList.add("particle-container");
    setupParticleCard(cardElement, index);
  } else {
    setupBasicCard(cardElement);
  }

  return cardElement;
}

// Setup particle card with advanced effects
function setupParticleCard(cardElement, index) {
  const particles = [];
  const timeouts = [];
  let isHovered = false;

  // Initialize particles
  function initializeParticles() {
    const { width, height } = cardElement.getBoundingClientRect();
    return Array.from({ length: config.particleCount }, () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * width}px`;
      particle.style.top = `${Math.random() * height}px`;
      return particle;
    });
  }

  const memoizedParticles = initializeParticles();

  // Clear all particles
  function clearAllParticles() {
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;

    particles.forEach((particle) => {
      particle.style.transform = "scale(0)";
      particle.style.opacity = "0";
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 300);
    });
    particles.length = 0;
  }

  // Animate particles
  function animateParticles() {
    if (!isHovered) return;

    memoizedParticles.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHovered) return;

        const clone = particle.cloneNode(true);
        cardElement.appendChild(clone);
        particles.push(clone);

        // Animate the particle
        clone.style.transform = "scale(1)";
        clone.style.opacity = "1";

        // Create animation
        const keyframes = [
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0.3,
          },
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        ];

        const animation = clone.animate(keyframes, {
          duration: 2000 + Math.random() * 2000,
          iterations: Infinity,
        });
      }, index * 100);

      timeouts.push(timeoutId);
    });
  }

  // Mouse enter event
  cardElement.addEventListener("mouseenter", () => {
    isHovered = true;
    animateParticles();
  });

  // Mouse leave event
  cardElement.addEventListener("mouseleave", () => {
    isHovered = false;
    clearAllParticles();
  });

  // Click event
  cardElement.addEventListener("click", (e) => {
    if (!config.clickEffect) return;

    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height),
    );

    const ripple = document.createElement("div");
    ripple.style.cssText = `
            position: absolute;
            width: ${maxDistance * 2}px;
            height: ${maxDistance * 2}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(${config.glowColor}, 0.4) 0%, rgba(${config.glowColor}, 0.2) 30%, transparent 70%);
            left: ${x - maxDistance}px;
            top: ${y - maxDistance}px;
            pointer-events: none;
            z-index: 1000;
          `;

    cardElement.appendChild(ripple);

    // Animate the ripple
    ripple.animate(
      [
        { transform: "scale(0)", opacity: 1 },
        { transform: "scale(1)", opacity: 0 },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        fill: "forwards",
      },
    ).onfinish = () => {
      ripple.remove();
    };
  });
}

// Setup basic card without particles
function setupBasicCard(cardElement) {
  cardElement.addEventListener("click", (e) => {
    if (!config.clickEffect) return;

    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height),
    );

    const ripple = document.createElement("div");
    ripple.style.cssText = `
            position: absolute;
            width: ${maxDistance * 2}px;
            height: ${maxDistance * 2}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(${config.glowColor}, 0.4) 0%, rgba(${config.glowColor}, 0.2) 30%, transparent 70%);
            left: ${x - maxDistance}px;
            top: ${y - maxDistance}px;
            pointer-events: none;
            z-index: 1000;
          `;

    cardElement.appendChild(ripple);

    // Animate the ripple
    ripple.animate(
      [
        { transform: "scale(0)", opacity: 1 },
        { transform: "scale(1)", opacity: 0 },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        fill: "forwards",
      },
    ).onfinish = () => {
      ripple.remove();
    };
  });
}

// Initialize global spotlight
function initGlobalSpotlight() {
  if (globalSpotlight) {
    globalSpotlight.remove();
  }

  globalSpotlight = document.createElement("div");
  globalSpotlight.className = "global-spotlight";
  document.body.appendChild(globalSpotlight);

  // Calculate spotlight values
  const calculateSpotlightValues = (radius) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75,
  });

  // Update card glow properties
  const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty("--glow-x", `${relativeX}%`);
    card.style.setProperty("--glow-y", `${relativeY}%`);
    card.style.setProperty("--glow-intensity", glow.toString());
    card.style.setProperty("--glow-radius", `${radius}px`);
  };

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!globalSpotlight || (!skillsGrid && !projectsGrid)) return;

    const sections = document.querySelectorAll(".bento-section");
    let mouseInside = false;
    let currentGrid = null;

    // Check if mouse is inside any bento section
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseInside = true;
        currentGrid = section.querySelector(".card-grid");
      }
    });

    isInsideSection = mouseInside;

    if (!mouseInside || !currentGrid) {
      globalSpotlight.style.opacity = "0";
      const allCards = document.querySelectorAll(".magic-bento-card");
      allCards.forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      return;
    }

    const { proximity, fadeDistance } = calculateSpotlightValues(
      config.spotlightRadius,
    );
    let minDistance = Infinity;
    const cards = currentGrid.querySelectorAll(".magic-bento-card");

    cards.forEach((card) => {
      const cardElement = card;
      const cardRect = cardElement.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const distance =
        Math.hypot(e.clientX - centerX, e.clientY - centerY) -
        Math.max(cardRect.width, cardRect.height) / 2;
      const effectiveDistance = Math.max(0, distance);

      minDistance = Math.min(minDistance, effectiveDistance);

      let glowIntensity = 0;
      if (effectiveDistance <= proximity) {
        glowIntensity = 1;
      } else if (effectiveDistance <= fadeDistance) {
        glowIntensity =
          (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
      }

      updateCardGlowProperties(
        cardElement,
        e.clientX,
        e.clientY,
        glowIntensity,
        config.spotlightRadius,
      );
    });

    globalSpotlight.style.left = `${e.clientX}px`;
    globalSpotlight.style.top = `${e.clientY}px`;

    const targetOpacity =
      minDistance <= proximity
        ? 0.8
        : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

    globalSpotlight.style.opacity = targetOpacity.toString();
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    isInsideSection = false;
    const allCards = document.querySelectorAll(".magic-bento-card");
    allCards.forEach((card) => {
      card.style.setProperty("--glow-intensity", "0");
    });
    if (globalSpotlight) {
      globalSpotlight.style.opacity = "0";
    }
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);
}

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", function () {
  initGrids();

  // Side Menu Logic
  const menuBtn = document.getElementById("menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const sideMenu = document.getElementById("side-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  const sideNavLinks = document.querySelectorAll(".side-nav-link");

  function openMenu() {
    if (!sideMenu || !menuOverlay) return;
    sideMenu.classList.remove("translate-x-full");
    menuOverlay.classList.remove("hidden");
    // Small delay for transition
    setTimeout(() => {
      menuOverlay.classList.remove("opacity-0");
    }, 10);
  }

  function closeMenu() {
    if (!sideMenu || !menuOverlay) return;
    sideMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("opacity-0");
    setTimeout(() => {
      menuOverlay.classList.add("hidden");
    }, 300);
  }

  if (menuBtn && closeMenuBtn && sideMenu && menuOverlay) {
    menuBtn.addEventListener("click", openMenu);
    closeMenuBtn.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);

    sideNavLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
});
