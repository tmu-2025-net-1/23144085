document.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;

  // 最下部判定
  if (scrollTop + winHeight >= docHeight - 2) {
    window.scrollTo(0, 0); // アニメーションなしで一瞬で戻る
  }
});