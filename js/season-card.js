(() => {
  const root = document.getElementById("season-card-root");
  if (!root) return;

  // シーズン情報
  const season = {
    number: 13,
    start: "2026-11-12",
    end: "2027-02-17",
    rankText: "○○RP以上",
    image: "/assets/images/season-mascot.png"
  };

  const startDate = new Date(`${season.start}T00:00:00`);
  const endDate = new Date(`${season.end}T23:59:59`);

  function updateCard() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const daysLeft = Math.max(
      0,
      Math.ceil((endDate - today) / 86400000)
    );

    const totalDays = Math.ceil((endDate - startDate) / 86400000);
    const elapsedDays = Math.max(
      0,
      Math.min(totalDays, Math.floor((today - startDate) / 86400000))
    );

    const progress = totalDays > 0
      ? Math.round((elapsedDays / totalDays) * 100)
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
            <strong>${daysLeft}<small>日</small></strong>
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
          <span>${season.end.replaceAll("-", ".")}</span>
        </div>
      </section>
    `;
  }

  updateCard();
  setInterval(updateCard, 60 * 60 * 1000);
})();
