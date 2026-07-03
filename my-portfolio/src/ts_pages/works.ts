// ============================================
// works.ts
// 役割：WorksページのHTML生成・イベント初期化
// 　　　・作品グリッドの表示
// 　　　・カテゴリフィルター（ALL/Illust/Logo...）
// 　　　・作品クリックでモーダル表示
// ============================================


// ============================================
// 作品データ
// 作品を追加・編集するときはここを変更する
// ============================================
type WorkItem = {
  category: 'illust' | 'logo' | 'character' | 'web';
  title: string;
  desc: string;
  date: string;
  thumbnail: string;
  image: string;
  alt: string;
};

const workItems: WorkItem[] = [
  {
    category: 'illust',
    title: 'Kaguya ~the origin~',
    desc: 'この作品から\nインスピレーションを受け\nThe Projectシリーズの\n制作を開始する',
    date: '制作年：2024.12\n使用ツール：ClipStudio\n制作期間：5日',
    thumbnail: '/images/workspage-button/kaguya-illust1.png',
    image: '/images/illustration/kaguya-origin.png',
    alt: 'イラスト：Kaguya ~the origin~',
  },
  {
    category: 'illust',
    title: 'Kaguya ~neo~',
    desc: '',
    date: '制作年：2025.1\n使用ツール：ClipStudio\n制作期間：3日',
    thumbnail: '/images/workspage-button/kaguya-ilust2.png',
    image: '/images/illustration/kaguya-new.png',
    alt: 'イラスト：Kaguya ~new~',
  },
  {
    category: 'web',
    title: 'Project Kaguya',
    desc: 'Kaguyaの\nプロフィールサイト\n<a href=\'https://kensyu.whitesnow.jp/Nakano_Shiro/index.html\' target=\'_blank\'>サイトを見る</a>',
    date: '制作年：2025.2\n使用言語：HTML・CSS\n使用ツール：Vscode\nFigma・ClipStudio\n制作期間：3ヶ月',
    thumbnail: '/images/workspage-button/Pkaguya-website.png',
    image: '/images/illustration/kaguya-website-detail.png',
    alt: 'Webデザイン：Kaguya Website',
  },
  {
    category: 'logo',
    title: 'Project Kaguyaロゴ',
    desc: 'Kaguyaの横顔と\n月をあしらいました',
    date: '制作年：2024.12\n使用ツール：ClipStudio\n制作期間：3日',
    thumbnail: '/images/workspage-button/kaguya-logo.png',
    image: '/images/logo/kaguya-logoname.png',
    alt: 'ロゴ：Kaguya',
  },
  {
    category: 'logo',
    title: 'Project Mayaロゴ',
    desc: 'Mayaの横顔と\n鈴蘭をあしらいました',
    date: '制作年：2026.4\n使用ツール：ClipStudio\n制作期間：1日',
    thumbnail: '/images/workspage-button/maya-logo.png',
    image: '/images/logo/maya-logoname.png',
    alt: 'ロゴ：Maya',
  },
  {
    category: 'logo',
    title: 'Project Otoロゴ',
    desc: 'Otoの横顔と\n羽衣をあしらいました',
    date: '制作年：2026.5\n使用ツール：ClipStudio\n制作期間：1日',
    thumbnail: '/images/workspage-button/oto-logo.png',
    image: '/images/logo/oto-logoname.png',
    alt: 'ロゴ：Oto',
  },
  {
    category: 'character',
    title: 'Kaguya',
    desc: '年齢：？？？？歳\n身長：160cm\n職業：モデル\n出典：かぐや姫',
    date: 'Since：2024.12\n構想期間：1ヶ月',
    thumbnail: '/images/workspage-button/kaguya-icon.png',
    image: '/images/character/Kaguya-stand.png',
    alt: 'キャラクター：Kaguya',
  },
  {
    category: 'character',
    title: 'Maya',
    desc: '年齢：25歳\n身長：5cm\n職業：動画配信者\n出典：おやゆび姫',
    date: 'Since：2025.12\n構想期間：3週間',
    thumbnail: '/images/workspage-button/maya-icon.png',
    image: '/images/character/maya-stand.png',
    alt: 'キャラクター：Maya',
  },
  {
    category: 'character',
    title: 'Oto',
    desc: '年齢：17歳\n身長：158cm\n職業：アイドル\n・インフルエンサー\n出典：浦島太郎',
    date: 'Since：2026.5\n構想期間：2週間',
  thumbnail: '/images/workspage-button/oto-icon.png',
    image: '/images/character/oto-stand.png',
    alt: 'キャラクター：Oto',
  },
];


// ============================================
// renderWorks
// WorksページのHTMLを文字列で返す
// ============================================
export function renderWorks(): string {
  // 作品アイテムのHTMLをworkItemsから生成する
const itemsHTML = workItems
  .map(
    (item) => `
      <div
        class="work-item"
        data-category="${item.category}"
        data-title="${item.title}"
        data-desc="${item.desc}"
        data-date="${item.date}"
        data-thumbnail="${item.thumbnail}"
        data-full-image="${item.image}"
        role="button"
        tabindex="0"
        aria-label="${item.title}を開く"
      >
        <img src="${item.thumbnail}" alt="${item.alt}" loading="lazy" />
      </div>
    `
  )
  .join('');

  return `
    <section class="page page-works active" aria-label="作品一覧">

      <!-- Worksページ名 -->
      <div class="section-title-area">
        <div class="section-title">
          <span class="section-title-initial">W</span>
          <span class="section-title-rest">orks</span>
        </div>
      </div>

      <!-- メインコンテンツ -->
      <div class="works-content">

        <!-- フィルターボタン -->
        <div class="sort-buttons" role="group" aria-label="作品フィルター">
          <button class="sort-btn active" data-filter="all">ALL</button>
          <button class="sort-btn" data-filter="illust">Illust</button>
          <button class="sort-btn" data-filter="logo">Logo</button>
          <button class="sort-btn" data-filter="character">Character</button>
          <button class="sort-btn" data-filter="web">Web</button>
        </div>

        <!-- 作品グリッド（スクロールエリア） -->
        <div class="works-scroll-area">
          <div class="works-grid" id="worksGrid">
            ${itemsHTML}
          </div>
        </div>

      </div>
    </section>

    <!-- モーダル（Worksページのセットとして生成） -->
    <div class="modal-overlay" id="modalOverlay" aria-hidden="true">
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-image">
          <img id="modalImage" src="" alt="">
        </div>
        <div class="modal-info">
          <h3 class="modal-title" id="modalTitle"></h3>
          <p class="modal-desc" id="modalDesc"></p>
          <p class="modal-date" id="modalDate"></p>
        </div>
      </div>
    </div>
  `;
}


// ============================================
// initWorks
// HTMLが差し込まれた後に呼ばれる
// ・フィルターボタンのイベント登録
// ・作品クリックでモーダルを開く
// ・モーダルを閉じる処理
// ============================================
export function initWorks(): void {
  initFilter();
  initModal();
}


// ============================================
// フィルター処理
// ============================================
function initFilter(): void {
  const sortButtons = document.querySelectorAll<HTMLButtonElement>('.sort-btn');
  const workGrid = document.getElementById('worksGrid');
  if (!workGrid) return;

  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter ?? 'all';

      // 全アイテムの表示・非表示を切り替える
      const items = workGrid.querySelectorAll<HTMLElement>('.work-item');
      items.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      // アクティブボタンを更新する
      sortButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}


// ============================================
// モーダル処理
// ============================================
function initModal(): void {
  const overlay = document.getElementById('modalOverlay');
  const modalImage = document.getElementById('modalImage') as HTMLImageElement | null;
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalDate = document.getElementById('modalDate');
  const workGrid = document.getElementById('worksGrid');

  if (!overlay || !modalImage || !modalTitle || !modalDesc || !modalDate || !workGrid) return;

  const modalOverlay = overlay;
  const modalImageEl = modalImage;
  const modalTitleEl = modalTitle;
  const modalDescEl = modalDesc;
  const modalDateEl = modalDate;
  const grid = workGrid;

  grid.querySelectorAll<HTMLElement>('.work-item').forEach((item) => {
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', handleEscKey);

function openModal(item: HTMLElement): void {
  modalImageEl.src = item.dataset.fullImage ?? '';
  modalImageEl.alt = item.querySelector('img')?.alt ?? '';
  modalTitleEl.textContent = item.dataset.title ?? '';
  modalDescEl.innerHTML = (item.dataset.desc ?? '').replace(/\n/g, '<br>');
  modalDateEl.innerHTML = (item.dataset.date ?? '').replace(/\n/g, '<br>');;

  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

  function closeModal(): void {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleEscKey);
  }

  function handleEscKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') closeModal();
  }
}