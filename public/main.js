/* Particle detector event display — WebGL hero */

(function () {
  'use strict';

  const canvas = document.getElementById('detector');
  if (!canvas || typeof THREE === 'undefined') {
    // Graceful fallback: leave the radial gradient background
    return;
  }

  const isMobile = window.matchMedia('(pointer: coarse)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });
  renderer.setPixelRatio(dpr);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Detector rings
  const ringGroup = new THREE.Group();
  const ringMaterial = new THREE.LineBasicMaterial({ color: 0x4A6C8C, transparent: true, opacity: 0.35 });
  const ringCount = 5;
  for (let i = 1; i <= ringCount; i++) {
    const radius = i * 1.5;
    const segments = 64;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array((segments + 1) * 3);
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      positions[j * 3] = Math.cos(theta) * radius;
      positions[j * 3 + 1] = Math.sin(theta) * radius;
      positions[j * 3 + 2] = 0;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ring = new THREE.Line(geometry, ringMaterial);
    ringGroup.add(ring);
  }

  // Crosshair axes
  const axisMaterial = new THREE.LineBasicMaterial({ color: 0x4A6C8C, transparent: true, opacity: 0.2 });
  const axisGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-8, 0, 0), new THREE.Vector3(8, 0, 0),
    new THREE.Vector3(0, -8, 0), new THREE.Vector3(0, 8, 0)
  ]);
  ringGroup.add(new THREE.LineSegments(axisGeo, axisMaterial));

  // Beam pipe at center
  const coreGeo = new THREE.BufferGeometry();
  const coreSegments = 48;
  const corePositions = new Float32Array((coreSegments + 1) * 3);
  for (let i = 0; i <= coreSegments; i++) {
    const theta = (i / coreSegments) * Math.PI * 2;
    corePositions[i * 3] = Math.cos(theta) * 0.5;
    corePositions[i * 3 + 1] = Math.sin(theta) * 0.5;
    corePositions[i * 3 + 2] = 0;
  }
  coreGeo.setAttribute('position', new THREE.BufferAttribute(corePositions, 3));
  const coreMat = new THREE.LineBasicMaterial({ color: 0x0F172A, transparent: true, opacity: 0.15 });
  ringGroup.add(new THREE.Line(coreGeo, coreMat));

  scene.add(ringGroup);

  // Particle tracks
  const trackColors = {
    vision: 0xFFD23F,
    voice: 0x00E5FF,
    sensor: 0xFF4D8D
  };
  const trackGroup = new THREE.Group();
  const trackCount = isMobile ? 36 : 72;
  const tracks = [];

  function createTrack(index) {
    const types = ['vision', 'voice', 'sensor'];
    const type = types[index % types.length];
    const color = trackColors[type];
    const angle = Math.random() * Math.PI * 2;
    const tilt = (Math.random() - 0.5) * 0.4;
    const length = 4 + Math.random() * 5;
    const curvature = (Math.random() - 0.5) * 0.25;

    const segments = 40;
    const positions = new Float32Array((segments + 1) * 3);
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const r = 0.5 + t * length;
      const theta = angle + t * curvature * Math.PI;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r;
      positions[i * 3 + 2] = (t - 0.5) * tilt * length;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.75,
      linewidth: 2
    });

    const line = new THREE.Line(geometry, material);
    line.userData = { type, originalOpacity: 0.75, velocity: 0.002 + Math.random() * 0.003 };
    return line;
  }

  for (let i = 0; i < trackCount; i++) {
    const track = createTrack(i);
    trackGroup.add(track);
    tracks.push(track);
  }

  // Energy deposits grouped by type so isolation controls can dim them
  const depositGroups = {};
  const depositCountPerType = isMobile ? 8 : 16;
  const colorObj = new THREE.Color();

  Object.keys(trackColors).forEach((type) => {
    const depositGeo = new THREE.BufferGeometry();
    const depositPositions = new Float32Array(depositCountPerType * 3);
    const depositColors = new Float32Array(depositCountPerType * 3);

    colorObj.setHex(trackColors[type]);
    for (let i = 0; i < depositCountPerType; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 5;
      depositPositions[i * 3] = Math.cos(angle) * r;
      depositPositions[i * 3 + 1] = Math.sin(angle) * r;
      depositPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      depositColors[i * 3] = colorObj.r;
      depositColors[i * 3 + 1] = colorObj.g;
      depositColors[i * 3 + 2] = colorObj.b;
    }

    depositGeo.setAttribute('position', new THREE.BufferAttribute(depositPositions, 3));
    depositGeo.setAttribute('color', new THREE.BufferAttribute(depositColors, 3));

    const depositMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const deposits = new THREE.Points(depositGeo, depositMat);
    deposits.userData = { type, originalOpacity: 0.85 };
    trackGroup.add(deposits);
    depositGroups[type] = deposits;
  });

  scene.add(trackGroup);

  // Interaction state
  let isDragging = false;
  let previousMouse = { x: 0, y: 0 };
  let targetRotation = { x: 0, y: 0 };
  let currentRotation = { x: 0, y: 0 };

  function onPointerDown(e) {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    previousMouse = { x: clientX, y: clientY };
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - previousMouse.x;
    const deltaY = clientY - previousMouse.y;
    targetRotation.y += deltaX * 0.005;
    targetRotation.x += deltaY * 0.005;
    previousMouse = { x: clientX, y: clientY };
  }

  function onPointerUp() {
    isDragging = false;
  }

  canvas.addEventListener('mousedown', onPointerDown);
  canvas.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  canvas.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Track isolation controls
  let isolatedType = null;
  const legendButtons = document.querySelectorAll('.track-item[data-track]');

  function applyIsolation() {
    tracks.forEach((track) => {
      if (!isolatedType || track.userData.type === isolatedType) {
        track.userData.targetOpacity = track.userData.originalOpacity;
      } else {
        track.userData.targetOpacity = 0.12;
      }
    });

    Object.values(depositGroups).forEach((group) => {
      if (!isolatedType || group.userData.type === isolatedType) {
        group.userData.targetOpacity = group.userData.originalOpacity;
      } else {
        group.userData.targetOpacity = 0.12;
      }
    });
  }

  legendButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.track;
      if (isolatedType === type) {
        isolatedType = null;
        legendButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      } else {
        isolatedType = type;
        legendButtons.forEach((b) => {
          b.setAttribute('aria-pressed', b.dataset.track === type ? 'true' : 'false');
        });
      }
      applyIsolation();
    });
  });

  // Resize handling
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', resize);

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Inertial rotation
    if (!isDragging) {
      targetRotation.y += 0.001;
    }
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

    ringGroup.rotation.x = currentRotation.x;
    ringGroup.rotation.y = currentRotation.y;
    trackGroup.rotation.x = currentRotation.x;
    trackGroup.rotation.y = currentRotation.y;

    // Pulse deposits
    Object.values(depositGroups).forEach((group) => {
      group.material.size = 0.1 + Math.sin(time * 2) * 0.03;
      group.material.opacity += (group.userData.targetOpacity - group.material.opacity) * 0.1;
    });

    // Subtle track opacity wave + isolation tween
    tracks.forEach((track, i) => {
      const wave = Math.sin(time * 1.5 + i * 0.3);
      const base = track.userData.targetOpacity != null
        ? track.userData.targetOpacity
        : track.userData.originalOpacity;
      const target = base + wave * 0.15;
      track.material.opacity += (target - track.material.opacity) * 0.1;
    });

    renderer.render(scene, camera);
  }

  animate();
})();

// NIO case card — detection scan reveal
(function () {
  'use strict';

  const nioCase = document.getElementById('nio-case');
  if (!nioCase) return;

  const scanLayer = nioCase.querySelector('.nio-scan');
  if (!scanLayer) return;

  function triggerScan() {
    scanLayer.classList.add('is-scanned');
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerScan();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    observer.observe(nioCase);
  } else {
    triggerScan();
  }
})();

// Capability tabs — keyboard-accessible tablist
(function () {
  'use strict';

  const capabilityTabs = document.querySelectorAll('#capabilityTabs .capability-tab');
  const capabilityPanes = document.querySelectorAll('#capabilityPanes .capability-pane');

  if (capabilityTabs.length && capabilityPanes.length) {
    const activateTab = (index) => {
      const tab = capabilityTabs[index];
      if (!tab) return;

      capabilityTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.removeAttribute('tabindex');
      tab.focus();

      capabilityPanes.forEach(pane => {
        const isActive = pane.dataset.index === String(index);
        pane.classList.toggle('active', isActive);
        pane.hidden = !isActive;
      });
    };

    capabilityTabs.forEach((tab, idx) => {
      const isActive = tab.classList.contains('active');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');

      tab.addEventListener('click', () => activateTab(idx));

      tab.addEventListener('keydown', (e) => {
        let nextIndex = idx;
        if (e.key === 'ArrowRight') {
          nextIndex = (idx + 1) % capabilityTabs.length;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = (idx - 1 + capabilityTabs.length) % capabilityTabs.length;
        } else if (e.key === 'Home') {
          nextIndex = 0;
        } else if (e.key === 'End') {
          nextIndex = capabilityTabs.length - 1;
        } else {
          return;
        }
        e.preventDefault();
        activateTab(nextIndex);
      });
    });
  }
})();

// SpaceSight capability carousel
(function () {
  'use strict';

  const track = document.getElementById('spacesightCarouselTrack');
  const dotsContainer = document.getElementById('spacesightCarouselDots');
  const prevBtn = document.querySelector('.spacesight-carousel-prev');
  const nextBtn = document.querySelector('.spacesight-carousel-next');
  const slides = track ? Array.from(track.querySelectorAll('.spacesight-carousel-slide')) : [];

  if (!track || !slides.length) return;

  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoPlayTimer = null;
  const AUTOPLAY_DELAY = 5000;
  const featureTabs = document.querySelectorAll('.spacesight-feature-tab');
  const featureTitle = document.querySelector('.spacesight-feature-title');
  const videos = slides.map((slide) => slide.querySelector('video'));

  function updateFeatureTabs(index) {
    if (featureTitle && featureTabs[index]) {
      featureTitle.textContent = featureTabs[index].dataset.title || '';
    }
    featureTabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  function updateVideos(index) {
    videos.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  function bindFeatureTabs() {
    featureTabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        stopAutoPlay();
        goTo(idx);
        startAutoPlay();
      });
    });
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'spacesight-carousel-dot';
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      if (i !== currentIndex) dot.setAttribute('tabindex', '-1');
      dot.addEventListener('click', () => {
        stopAutoPlay();
        goTo(i);
        startAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.spacesight-carousel-dot');
    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  function updateAriaLabels() {
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i === currentIndex ? 'false' : 'true');
    });
  }

  function goTo(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    if (currentIndex >= totalSlides) currentIndex = 0;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
    updateAriaLabels();
    updateFeatureTabs(currentIndex);
    updateVideos(currentIndex);
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prev();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      next();
      startAutoPlay();
    });
  }

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      stopAutoPlay();
      diff > 0 ? next() : prev();
      startAutoPlay();
    }
  }, { passive: true });

  createDots();
  bindFeatureTabs();
  goTo(0);
  startAutoPlay();
})();

(function () {
  'use strict';

  const track = document.getElementById('productCarouselTrack');
  const dotsContainer = document.getElementById('productCarouselDots');
  const prevBtn = document.querySelector('.platform-carousel-prev');
  const nextBtn = document.querySelector('.platform-carousel-next');
  const originalSlides = Array.from(track.querySelectorAll('.platform-carousel-slide'));

  if (!track || !originalSlides.length) return;

  const totalSlides = originalSlides.length;
  const AUTOPLAY_DELAY = 4500;
  const TRANSITION_DURATION = 450;

  let currentRealIndex = 0;
  let currentExtendedIndex = 1;
  let peekMode = isPeekMode();
  let isAnimating = false;
  let autoPlayTimer = null;
  let isPaused = false;

  // Build extended track: [last clone] [real slides...] [first clone]
  function buildTrack() {
    const firstClone = createClone(originalSlides[0]);
    const lastClone = createClone(originalSlides[totalSlides - 1]);

    track.innerHTML = '';
    track.appendChild(lastClone);
    originalSlides.forEach((slide) => track.appendChild(slide));
    track.appendChild(firstClone);
  }

  function createClone(original) {
    const clone = original.cloneNode(true);
    clone.classList.add('platform-carousel-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    clone.removeAttribute('aria-label');
    clone.removeAttribute('role');

    // Replace videos with static posters to avoid duplicate playback
    clone.querySelectorAll('video').forEach((video) => {
      const poster = video.getAttribute('poster');
      const img = document.createElement('img');
      img.src = poster || '';
      img.alt = video.getAttribute('aria-label') || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.style.cssText = 'display:block;width:100%;height:auto;object-fit:cover;';
      video.parentNode.replaceChild(img, video);
    });

    return clone;
  }

  function isPeekMode() {
    return window.innerWidth > 720;
  }

  function getTranslateFor(extendedIndex) {
    const slidePercent = peekMode ? 46 : 100;
    const step = peekMode ? 50 : 100;
    const centerOffset = peekMode ? 27 : 0;
    return centerOffset - extendedIndex * step;
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'platform-carousel-dot';
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.setAttribute('aria-selected', i === currentRealIndex ? 'true' : 'false');
      if (i !== currentRealIndex) dot.setAttribute('tabindex', '-1');
      dot.addEventListener('click', () => {
        stopAutoPlay();
        goTo(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.platform-carousel-dot');
    dots.forEach((dot, i) => {
      const isActive = i === currentRealIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  function updateAriaLabels() {
    originalSlides.forEach((slide, i) => {
      const isVisible = peekMode
        ? (i >= currentRealIndex - 1 && i <= currentRealIndex + 1)
        : i === currentRealIndex;
      slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
    });
  }

  function setTransform(extendedIndex, animate) {
    if (!animate) {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(${getTranslateFor(extendedIndex)}%)`;
    if (!animate) {
      // Force reflow and restore transition
      void track.offsetHeight;
      track.style.transition = '';
    }
  }

  function goTo(realIndex, direction) {
    if (isAnimating) return;
    isAnimating = true;

    direction = direction || 0;
    let targetRealIndex = realIndex;

    // Normalize real index for looping
    if (targetRealIndex < 0) targetRealIndex = totalSlides - 1;
    if (targetRealIndex >= totalSlides) targetRealIndex = 0;

    currentRealIndex = targetRealIndex;
    const targetExtendedIndex = currentRealIndex + 1;

    updateDots();
    updateAriaLabels();

    // Detect seamless wrap
    const goingForwardOverEnd = direction === 1 && currentExtendedIndex === totalSlides && targetExtendedIndex === totalSlides + 1;
    const goingBackwardOverStart = direction === -1 && currentExtendedIndex === 1 && targetExtendedIndex === 0;

    if (goingForwardOverEnd) {
      setTransform(targetExtendedIndex, true);
      currentExtendedIndex = targetExtendedIndex;
      waitForTransition(() => {
        currentExtendedIndex = 1;
        setTransform(currentExtendedIndex, false);
        isAnimating = false;
      });
    } else if (goingBackwardOverStart) {
      setTransform(targetExtendedIndex, true);
      currentExtendedIndex = targetExtendedIndex;
      waitForTransition(() => {
        currentExtendedIndex = totalSlides;
        setTransform(currentExtendedIndex, false);
        isAnimating = false;
      });
    } else {
      setTransform(targetExtendedIndex, true);
      currentExtendedIndex = targetExtendedIndex;
      waitForTransition(() => {
        isAnimating = false;
      });
    }
  }

  function waitForTransition(callback) {
    const handler = () => {
      track.removeEventListener('transitionend', handler);
      callback();
    };
    track.addEventListener('transitionend', handler);
    // Fallback in case transitionend doesn't fire
    setTimeout(() => {
      track.removeEventListener('transitionend', handler);
      callback();
    }, TRANSITION_DURATION + 50);
  }

  function next() {
    goTo(currentRealIndex + 1, 1);
  }

  function prev() {
    goTo(currentRealIndex - 1, -1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (isPaused) return;
    autoPlayTimer = setInterval(() => {
      if (!isPaused) next();
    }, AUTOPLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function onResize() {
    const newPeekMode = isPeekMode();
    if (newPeekMode !== peekMode) {
      peekMode = newPeekMode;
      setTransform(currentExtendedIndex, false);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prev();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      next();
      startAutoPlay();
    });
  }

  // Keyboard navigation
  const carousel = document.querySelector('.platform-carousel');
  if (carousel) {
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        stopAutoPlay();
        next();
        startAutoPlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stopAutoPlay();
        prev();
        startAutoPlay();
      }
    });
  }

  // Pause autoplay on hover/focus
  if (carousel) {
    carousel.addEventListener('mouseenter', () => { isPaused = true; stopAutoPlay(); });
    carousel.addEventListener('mouseleave', () => { isPaused = false; startAutoPlay(); });
    carousel.addEventListener('focusin', () => { isPaused = true; stopAutoPlay(); });
    carousel.addEventListener('focusout', () => { isPaused = false; startAutoPlay(); });
  }

  // Basic swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        stopAutoPlay();
        if (diff > 0) next(); else prev();
        startAutoPlay();
      }
    }, { passive: true });
  }

  window.addEventListener('resize', onResize);

  buildTrack();
  createDots();
  setTransform(currentExtendedIndex, false);
  updateAriaLabels();
  startAutoPlay();
})();
