
(() => {
  // 二重読み込みを防止
  if (document.getElementById("kaworia-menu-button")) return;

  const header = document.querySelector(".topbar");
  if (!header) return;

  // メニューのデザイン
  const style = document.createElement("style");
  style.id = "kaworia-menu-style";
  style.textContent = `
    .kaworia-menu-button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 42px;
      height: 42px;
      margin-left: 24px;
      padding: 0;
      border: 1px solid #eae4f0;
      border-radius: 12px;
      background: #fff;
      color: #827394;
      cursor: pointer;
      transition: background .2s, border-color .2s, color .2s;
    }

    .kaworia-menu-button:hover,
    .kaworia-menu-button[aria-expanded="true"] {
      background: #f7f2fb;
      border-color: #d7c5e7;
      color: #9477b5;
    }

    .kaworia-menu-button .material-symbols-rounded {
      font-size: 24px;
    }

    .kaworia-menu-dropdown {
      position: fixed;
      z-index: 9999;
      width: 280px;
      max-width: calc(100vw - 24px);
      max-height: calc(100vh - 100px);
      overflow-y: auto;
      padding: 12px;
      border: 1px solid #eae4f0;
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 12px 35px rgba(91, 72, 115, .16);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-7px);
      transition:
        opacity .2s ease,
        transform .2s ease,
        visibility .2s ease;
    }

    .kaworia-menu-dropdown.is-open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .kaworia-menu-dropdown[hidden] {
      display: none;
    }

    .kaworia-menu-brand {
      display: block;
      padding: 12px 13px;
      color: #a38bbd;
      font-size: 23px;
      font-weight: 700;
      letter-spacing: .02em;
      text-decoration: none;
    }

    .kaworia-menu-divider {
      height: 1px;
      margin: 7px 5px;
      background: #eeeaf2;
    }

    .kaworia-menu-link,
    .kaworia-menu-heading,
    .kaworia-menu-sub-link {
      display: block;
      padding: 10px 13px;
      border-radius: 9px;
      color: #625773;
      font-size: 13px;
      text-decoration: none;
      transition: background .2s, color .2s;
    }

    .kaworia-menu-link:hover,
    .kaworia-menu-sub-link:hover {
      background: #f7f2fb;
      color: #9477b5;
    }

    .kaworia-menu-heading {
      padding-bottom: 5px;
      font-weight: 600;
    }

    .kaworia-menu-sub-link {
      padding: 8px 13px 8px 25px;
      color: #898095;
      font-size: 12px;
    }

    .kaworia-menu-note {
      display: block;
      padding: 0 13px 9px;
      color: #a39aaa;
      font-size: 11px;
    }

    @media (max-width: 850px) {
      .kaworia-menu-button {
        width: 38px;
        height: 38px;
        margin-left: 14px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .kaworia-menu-dropdown,
      .kaworia-menu-button {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);

  // メニューボタン
  const button = document.createElement("button");
  button.id = "kaworia-menu-button";
  button.className = "kaworia-menu-button";
  button.type = "button";
  button.setAttribute("aria-label", "メニューを開く");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "kaworia-site-menu");
  button.innerHTML = `
    <span class="material-symbols-rounded" aria-hidden="true">menu</span>
  `;

  // 既存ナビゲーションの後ろに追加
  const nav = header.querySelector(".top-nav");
  if (nav) {
    nav.insertAdjacentElement("afterend", button);
  } else {
    header.appendChild(button);
  }

  // メニュー本体
  const menu = document.createElement("nav");
  menu.id = "kaworia-site-menu";
  menu.className = "kaworia-menu-dropdown";
  menu.setAttribute("aria-label", "サイトメニュー");
  menu.hidden = true;

  // メニュー項目を作成
  const addDivider = () => {
    const divider = document.createElement("div");
    divider.className = "kaworia-menu-divider";
    menu.appendChild(divider);
  };

  const addLink = (label, href, className = "kaworia-menu-link") => {
    const link = document.createElement("a");
    link.className = className;
    link.href = href;
    link.textContent = label;

    // リンク先が未設定の項目は仮表示にする
    if (href === "#") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }

    menu.appendChild(link);
  };

  // トップへ戻る
  addLink("kaworia", "/", "kaworia-menu-brand");
  addDivider();

  // クーポン
  addLink("クーポン", "#");
  addDivider();

  // シーズンガイド
  addLink("シーズンガイド", "#");

  const seasonNote = document.createElement("span");
  seasonNote.className = "kaworia-menu-note";
  seasonNote.textContent = "あと何日？";
  menu.appendChild(seasonNote);

  addDivider();

  // 便利なまとめ画像
  addLink("便利なまとめ画像", "#");
  addDivider();

  // スキン関連
  addLink("スキン一覧", "https://kaworia.com/Skins/");
  addLink("実装日ランキング", "https://kaworia.com/Skins/ranking/");
  addDivider();

  // 調整履歴
  const historyHeading = document.createElement("span");
  historyHeading.className = "kaworia-menu-heading";
  historyHeading.textContent = "調整履歴";
  menu.appendChild(historyHeading);

  addLink("特性・戦術スキル・武器スキル", "#", "kaworia-menu-sub-link");
  addLink("実験体", "#", "kaworia-menu-sub-link");
  addLink("武器・防具", "#", "kaworia-menu-sub-link");

  addDivider();

  // お問い合わせ・ギャラリー
  addLink("お問い合わせ", "/contact/");
  addLink("ギャラリー", "#");

  document.body.appendChild(menu);

  const icon = button.querySelector(".material-symbols-rounded");

  // メニューの位置をボタンに合わせる
  const positionMenu = () => {
    const rect = button.getBoundingClientRect();
    const right = Math.max(12, window.innerWidth - rect.right);

    menu.style.top = `${rect.bottom + 10}px`;
    menu.style.right = `${right}px`;
  };

  const openMenu = () => {
    positionMenu();
    menu.hidden = false;

    // hidden解除後にアニメーションを開始
    requestAnimationFrame(() => {
      menu.classList.add("is-open");
    });

    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "メニューを閉じる");
    icon.textContent = "close";
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "メニューを開く");
    icon.textContent = "menu";

    window.setTimeout(() => {
      if (!menu.classList.contains("is-open")) {
        menu.hidden = true;
      }
    }, 200);
  };

  // ボタン操作
  button.addEventListener("click", () => {
    if (menu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // メニュー外をクリックしたら閉じる
  document.addEventListener("click", (event) => {
    if (
      !menu.hidden &&
      !menu.contains(event.target) &&
      !button.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Escapeキーで閉じる
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      button.focus();
    }
  });

  // メニュー内のリンクを押したら閉じる
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a") && event.target.getAttribute("href") !== "#") {
      closeMenu();
    }
  });

  // 画面サイズが変わったら位置を調整
  window.addEventListener("resize", () => {
    if (!menu.hidden) positionMenu();
  });
})();
