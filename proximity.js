// 各グループに対してアニメーションを定義
const groups = [
  {
    className: 'group-existence',
    baseDuration: 3000,
    hoverDuration: 1500,
    update: (el, progress) => {
      const scale = 1 + 0.15 * Math.sin(progress * 2 * Math.PI);
      el.style.transform = `scale(${scale})`;
    }
  },
  {
    className: 'group-life',
    baseDuration: 6000,
    hoverDuration: 6000,
    update: (el, progress) => {
      const scale = 1 + 0.05 * Math.sin(progress * 2 * Math.PI);
      el.style.transform = `scale(${scale})`;
    }
  },
  {
    className: 'group-breath',
    baseDuration: () => 4000 + Math.random() * 2000,
    hoverDuration: 2000,
    update: (el, progress) => {
      const scale = 1 + 0.1 * Math.sin(progress * 2 * Math.PI);
      const jitter = Math.random() < 0.05 ? 0.002 * Math.sin(Date.now() / 50) : 0;
      el.style.transform = `scale(${scale + jitter})`;
    }
  },
  {
    className: 'group-sense',
    baseDuration: 10000,
    hoverDuration: 10000,
    update: (el, progress, hovering) => {
      const scale = 1 - 0.1 * Math.abs(Math.sin(progress * 2 * Math.PI));
      el.style.transform = `scale(${scale})`;
      el.style.opacity = hovering ? "1" : "0.8";
    }
  },
  {
    className: 'group-fade',
    baseDuration: 8000,
    hoverDuration: 8000,
    update: (el, progress, hovering) => {
      const scale = 1 + 0.05 * Math.sin(progress * 2 * Math.PI);
      const opacity = hovering ? 0.1 : 0.6 + 0.3 * Math.sin(progress * 2 * Math.PI);
      el.style.transform = `scale(${scale})`;
      el.style.opacity = opacity;
    }
  },
  {
    className: 'group-memory',
    baseDuration: 10000,
    hoverDuration: 10000,
    update: (el, progress, hovering) => {
      const scale = 1 + 0.05 * Math.sin(progress * 2 * Math.PI);
      const blurAmount = hovering
        ? 2 + 2 * Math.abs(Math.sin(progress * 2 * Math.PI))
        : 1 + 1 * Math.abs(Math.sin(progress * 2 * Math.PI));
      el.style.transform = `scale(${scale})`;
      el.style.filter = `blur(${blurAmount}px)`;
    }
  },
  {
    className: 'group-flow',
    baseDuration: 6000,
    hoverDuration: 6000,
    update: (el, progress, hovering) => {
      const scale = 1 + 0.08 * Math.sin(progress * 2 * Math.PI);
  
      // 呼吸に合わせたマスクのゆらぎ
      const fade = 0.2 + 0.3 * Math.sin(progress * 2 * Math.PI);
      el.style.maskImage = `linear-gradient(to top, rgba(255,255,255,${fade}) 0%, rgba(0,0,0,0.9) 100%)`;
      el.style.webkitMaskImage = `linear-gradient(to top, rgba(255,255,255,${fade}) 0%, rgba(0,0,0,0.9) 100%)`;
  
      // スケール変化（呼吸）
      el.style.transform = `scale(${scale})`;
  
      // 不透明度（hoverでふわっと薄くなる）
      el.style.transition = 'opacity 0.6s ease'; // ← ここでふわっと
      el.style.opacity = hovering ? 0.4 : 1.0;
    }
  },
  {
    className: 'group-infinity',
    baseDuration: 15000,
    hoverDuration: 15000,
    update: (el, progress, hovering) => {
      const scale = 1 + 0.02 * Math.sin(progress * 2 * Math.PI);
      const jitter = hovering ? 0.003 * Math.sin(Date.now() / 60) : 0;
      el.style.transform = `scale(${scale + jitter})`;
    }
  }
];

// アニメーションループ
groups.forEach(group => {
  const elements = document.querySelectorAll(`.${group.className}`);
  elements.forEach(el => {
    let start = performance.now();
    let duration = typeof group.baseDuration === 'function' ? group.baseDuration() : group.baseDuration;
    let hovering = false;

    const animate = (time) => {
      const elapsed = time - start;
      const currentDuration = hovering ? group.hoverDuration : duration;
      const progress = (elapsed % currentDuration) / currentDuration;

      group.update(el, progress, hovering);
      requestAnimationFrame(animate);
    };

    el.addEventListener('mouseenter', () => {
      hovering = true;
    });
    el.addEventListener('mouseleave', () => {
      hovering = false;
      if (typeof group.baseDuration === 'function') {
        duration = group.baseDuration(); // リセット（不規則対応）
      }
    });

    requestAnimationFrame(animate);
  });
});
