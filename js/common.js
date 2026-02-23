// ========================================
// GSAP Loading Animation
// ========================================

// グローバル設定
gsap.defaults({
  ease: 'power2.inOut'
});

// ページ読み込み時の処理
window.addEventListener('load', function() {
  // body に loading-active クラスを追加（初期状態）
  document.body.classList.add('loading-active');

  // テキストを1文字ずつ分割
  const textElement = document.querySelector('.loading__text');
  const text = textElement.textContent;
  textElement.innerHTML = text.split('').map(char =>
    char === ' ' ? '<span class="char">&nbsp;</span>' : `<span class="char">${char}</span>`
  ).join('');

  // サブテキストも1文字ずつ分割
  const subtextElement = document.querySelector('.loading__subtext');
  const subtext = subtextElement.textContent;
  subtextElement.innerHTML = subtext.split('').map(char =>
    char === ' ' ? '<span class="char">&nbsp;</span>' : `<span class="char">${char}</span>`
  ).join('');

  // GSAP Timeline を作成
  const timeline = gsap.timeline({
    onComplete: function() {
      // アニメーション完了後、ローディング要素を DOM から削除
      const loadingElement = document.getElementById('loading');
      if (loadingElement) {
        loadingElement.remove();
      }
      document.body.classList.remove('loading-active');
    }
  });

  // 文字の初期状態（右から歩いてくる）
  gsap.set('.loading__text .char', { opacity: 0, x: 30 });
  gsap.set('.loading__subtext .char', { opacity: 0, x: 20 });

  // アニメーションシーケンス
  timeline
    // 1. ロゴが中心でフェードイン（0.6秒）
    .from('.loading__logo', {
      duration: 0.6,
      opacity: 0,
      scale: 0.8,
      ease: 'power2.out'
    })

    // 2. テキストエリアを広げる
    .to('.loading__text-wrap', {
      duration: 0.3,
      maxWidth: '500px',
      ease: 'power2.out'
    }, '+=0.3')

    // 3. 1文字ずつトコトコ歩いてくる
    .to('.loading__text .char', {
      duration: 0.5,
      opacity: 1,
      x: 0,
      ease: 'power2.out',
      stagger: {
        each: 0.06,
        onStart: function() {
          // トコトコ歩く動き（小さく上下 + 左右に傾く）
          const tl = gsap.timeline();
          tl.to(this.targets()[0], {
            y: -3,
            rotation: -5,
            duration: 0.08,
            ease: 'power1.out'
          })
          .to(this.targets()[0], {
            y: 0,
            rotation: 5,
            duration: 0.08,
            ease: 'power1.in'
          })
          .to(this.targets()[0], {
            y: -3,
            rotation: -3,
            duration: 0.08,
            ease: 'power1.out'
          })
          .to(this.targets()[0], {
            y: 0,
            rotation: 0,
            duration: 0.08,
            ease: 'power1.in'
          });
        }
      }
    }, '-=0.1')

    // 4. サブテキストも1文字ずつトコトコ（メインと同時開始）
    .to('.loading__subtext .char', {
      duration: 0.4,
      opacity: 1,
      x: 0,
      ease: 'power2.out',
      stagger: {
        each: 0.04,
        onStart: function() {
          const tl = gsap.timeline();
          tl.to(this.targets()[0], {
            y: -2,
            rotation: -4,
            duration: 0.06,
            ease: 'power1.out'
          })
          .to(this.targets()[0], {
            y: 0,
            rotation: 4,
            duration: 0.06,
            ease: 'power1.in'
          })
          .to(this.targets()[0], {
            y: -2,
            rotation: -2,
            duration: 0.06,
            ease: 'power1.out'
          })
          .to(this.targets()[0], {
            y: 0,
            rotation: 0,
            duration: 0.06,
            ease: 'power1.in'
          });
        }
      }
    }, '<')

    // 5. ローディング画面フェードアウト（0.5秒）
    .to('.loading', {
      duration: 0.5,
      opacity: 0,
      ease: 'power2.out'
    }, '+=1')

    // 6. メインコンテンツフェードイン（1秒）
    .to(['header', '.hero', '.contentOuter', '.footer'], {
      duration: 1,
      opacity: 1,
      visibility: 'visible',
      ease: 'power2.out'
    }, '-=0.5')

    // 7. FV画像がふわっとフェードイン
    .from('.heroImage', {
      duration: 2,
      opacity: 0,
      scale: 0.98,
      ease: 'power2.out'
    }, '-=0.3')

    // 7. スクロールインジケーターがフェードイン
    .from('.scroll-indicator', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    }, '-=0.5');
});

// ========================================
// Lenis Smooth Scroll
// ========================================

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ========================================
// ScrollTrigger Setup
// ========================================

gsap.registerPlugin(ScrollTrigger);

// Lenis と ScrollTrigger を連携
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// スクロールインジケーターのフェードアウト
gsap.to('.scroll-indicator', {
  y: 50,
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: '50% top',
    scrub: 1,
  }
});

// ========================================
// Parallax Effect
// ========================================

window.addEventListener('scroll', function(e) {
  let scrolled = window.pageYOffset;

  const parallax = document.querySelector('.parallax');
  if (parallax) {
    parallax.style.top = -(scrolled * 0.2) + 'px';
  }

  const parallax2 = document.querySelector('.parallax2');
  if (parallax2) {
    parallax2.style.top = -(scrolled * 0.17) + 'px';
  }

  const parallax3 = document.querySelector('.parallax3');
  if (parallax3) {
    parallax3.style.top = -(scrolled * 0.1) + 'px';
  }
});

// ========================================
// Windows Smooth Scroll
// ========================================

jQuery(function($) {
  var ua = navigator.userAgent.toLowerCase();
  var isWindows =
    ua.indexOf('windows') > -1 &&
    !(ua.indexOf('mac') > -1 && ua.indexOf('os') > -1) &&
    !(ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1);

  if (isWindows && typeof $.fn.easeScroll !== 'undefined') {
    $('html').easeScroll({
      frameRate: 100,
      animationTime: 1000,
      stepSize: 45,
      pulseAlgorithm: 1,
      pulseScale: 8,
      pulseNormalize: 1,
      accelerationDelta: 20,
      accelerationMax: 1,
      keyboardSupport: true,
      arrowScroll: 30,
      touchpadSupport: true,
      fixedBackground: false
    });
  }
});

