
(() => {
  const root = document.getElementById("season-card-root");
  if (!root) return;

  // ========================================
  // シーズン情報設定
  // ========================================

  const season = {
    number: 12,
    start: "2026-08-13T15:00:00+09:00",
    end: "2026-11-12T09:59:59+09:00",
    rankText: "8800RP以上",
    image: "/assets/images/season-mascot.png"
  };

  const startDate = new Date(season.start);
  const endDate = new Date(season.end);

  // ========================================
  // カード表示
  // ========================================

  function updateCard() {
    const now = new Date();

    const remaining = Math.max(0, endDate.getTime() - now.getTime());

    const daysLeft = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const totalTime = endDate.getTime() - startDate.getTime();
    const elapsedTime = Math.max(
      0,
      Math.min(totalTime, now.getTime() - startDate.getTime())
    );

    const progress = totalTime > 0
      ? Math.round((elapsedTime / totalTime) * 100)
      : 0;

    root.innerHTML = `
      <section class="season-card">

        <div class="season-card__heading">
          <span>✦ SEASON ${season.number}</span>
          <span class="season-card__label">RANKED</span>
        </div>

        <div class="season-card__main">

          <div class="season-card__image">
            <img src="${season.image}" alt="">
          </div>

          <div class="season-card__count">
            <span class="season-card__caption">ランク終了まで</span>

            <strong>
              ${daysLeft}<small>日</small>
            </strong>

            <span class="season-card__hours">
              ${hoursLeft}時間
            </span>
          </div>

        </div>

        <div class="season-card__progress">
          <div class="season-card__progress-bar">
            <span style="width: ${progress}%"></span>
          </div>
          <span>${progress}%</span>
        </div>

        <div class="season-card__footer">
          <span>上位マッチ：${season.rankText}</span>
          <span>${season.end.slice(0, 10).replaceAll("-", ".")}</span>
        </div>

      </section>
    `;
  }

  updateCard();

  // 1分ごとに更新
  setInterval(updateCard, 60 * 1000);

})();
