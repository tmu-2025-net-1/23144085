document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("intro-overlay");
    const closeBtn = document.getElementById("close-intro");
  
    // 最初に表示するか判定
    if (localStorage.getItem("introShown")) {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "flex";
    }
  
    // 閉じるボタン
    closeBtn.addEventListener("click", function () {
      overlay.style.display = "none";
      localStorage.setItem("introShown", "true");
    });
  
    // Mキー押下で説明画面再表示
    document.addEventListener("keydown", function (event) {
      if (event.key === "m" || event.key === "M") {
        localStorage.removeItem("introShown");  // 見た記録を消す
        overlay.style.display = "flex";          // オーバーレイ表示
      }
    });
  });
  