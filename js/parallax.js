// マウス追従パララックス
(function() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  // マウス位置を追跡
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // スムーズなアニメーション
  function animate() {
    // イージング
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    parallaxElements.forEach((el) => {
      const strength = 20; // 動きの強さ
      const x = currentX * strength;
      const y = currentY * strength;
      const rotateX = currentY * 5;
      const rotateY = -currentX * 5;

      el.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    requestAnimationFrame(animate);
  }

  // heroImageに perspective を追加
  const heroImageBox = document.querySelector('.heroImageBox');
  if (heroImageBox) {
    heroImageBox.style.perspective = '1000px';
  }

  animate();
})();

// スクロール連動マーキー
(function() {
  const marqueeSpan = document.querySelector('.introduce__marquee span');
  if (!marqueeSpan) return;

  let currentX = 0;
  let targetX = 0;

  window.addEventListener('scroll', () => {
    targetX = -window.scrollY * 0.5; // スクロール量に応じて移動
  });

  function animateMarquee() {
    currentX += (targetX - currentX) * 0.1; // スムーズに追従
    marqueeSpan.style.transform = `translateX(${currentX}px)`;
    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
})();
