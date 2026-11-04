
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

  let isCollapsed = false;

  // ========================================
  // スタイル設定
  // ========================================

  if (!document.getElementById("season-card-collapse-style")) {
    const style = document.createElement("style");
    style.id = "season-card-collapse-style";

    style.textContent = `
      .season-card__body {
        display: grid;
        grid-template-rows: 1fr;
        opacity: 1;
        transition:
          grid-template-rows .3s ease,
          opacity .25s ease;
      }

      .season-card__body-inner {
        min-height: 0;
        overflow: hidden;
      }

      .season-card.is-collapsed .season-card__body {
        grid-template-rows: 0fr;
        opacity: 0;
      }

      .season-card__collapse-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        margin-top: 12px;
        padding: 9px 12px;
        border: none;
        border-top: 1px solid rgba(128, 128, 128, .2);
        background: transparent;
        color: inherit;
        font-size: 12px;
        cursor: pointer;
        transition: background .2s ease;
      }

      .season-card__collapse-button:hover {
        background: rgba(128, 128, 128, .08);
      }

      .season-card__collapse-icon {
        display: inline-block;
        transition: transform .3s ease;
      }

      .season-card.is-collapsed .season-card__collapse-icon {
        transform: rotate(180deg);
      }

      .season-card__compact {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 12px 8px 4px;
        font-size: 13px;
      }

      .season-card.is-collapsed .season-card__compact {
        display: flex;
      }

      .season-card__compact strong {
        font-size: 18px;
      }

      @media (prefers-reduced-motion: reduce) {
        .season-card__body,
        .season-card__collapse-icon {
          transition: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ========================================
  // カード表示
  // ========================================

  function updateCard() {
    const now = new Date();

    const remaining = Math.max(
      0,
      endDate.getTime() - now.getTime()
    );

    const daysLeft = Math.floor(
      remaining / (1000 * 60 * 60 * 24)
    );

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
      <section class="season-card ${isCollapsed ? "is-collapsed" : ""}">

        <div class="season-card__heading">
          <span>✦ SEASON ${season.number}</span>
          <span class="season-card__label">RANKED</span>
        </div>

        <div class="season-card__compact">
          <span>ランク終了まで</span>
          <strong>${daysLeft}<small>日</small></strong>
          <span>${hoursLeft}時間</span>
        </div>

        <div class="season-card__body">
          <div class="season-card__body-inner">

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

          </div>
        </div>

        <button
          type="button"
          class="season-card__collapse-button"
          aria-expanded="${!isCollapsed}"
        >
          <span class="season-card__collapse-icon">⌄</span>
          <span>${isCollapsed ? "展開する" : "折りたたむ"}</span>
        </button>

      </section>
    `;

    // ========================================
    // 折りたたみ操作
    // ========================================

    const card = root.querySelector(".season-card");
    const button = root.querySelector(".season-card__collapse-button");

    button.addEventListener("click", () => {
      isCollapsed = !isCollapsed;

      card.classList.toggle("is-collapsed", isCollapsed);

      button.setAttribute("aria-expanded", String(!isCollapsed));

      button.innerHTML = `
        <span class="season-card__collapse-icon">⌄</span>
        <span>${isCollapsed ? "展開する" : "折りたたむ"}</span>
      `;
    });
  }

  updateCard();

  // 1分ごとに更新
  setInterval(updateCard, 60 * 1000);

})();
