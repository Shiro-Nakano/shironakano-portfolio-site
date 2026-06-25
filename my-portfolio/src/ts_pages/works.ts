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
  image: string;
  alt: string;
};

const workItems: WorkItem[] = [
  {
    category: 'illust',
    title: 'Kaguya ~the origin~',
    desc: 'the projectの考案前に制作したイラスト\nこの作品からインスピレーションを受けプロジェクトとして制作を開始する',
    date: '2025.1',
    image: '/public/images/workspage-button/kaguya-illust1.png',
    alt: 'イラスト作品：Kaguya ~the origin~',
  },
  {
    category: 'illust',
    title: 'Kaguya illust 2',
    desc: 'イラスト作品',
    date: '2025',
    image: '/public/images/workspage-button/kaguya-ilust2.png',
    alt: 'イラスト作品2',
  },
  {
    category: 'web',
    title: 'Kaguya Website',
    desc: 'Webデザイン作品',
    date: '2025',
    image: '/public/images/workspage-button/Pkaguya-website.png',
    alt: 'Webデザイン作品：Kaguya Website',
  },
  {
    category: 'logo',
    title: 'Kaguya Logo',
    desc: 'ロゴデザイン',
    date: '2025',
    image: '/public/images/workspage-button/kaguya-logo.png',
    alt: 'ロゴ作品：Kaguya Logo',
  },
  {
    category: 'logo',
    title: 'Maya Logo',
    desc: 'ロゴデザイン',
    date: '2025',
    image: '/public/images/workspage-button/maya-logo.png',
    alt: 'ロゴ作品：Maya Logo',
  },
  {
    category: 'logo',
    title: 'Oto Logo',
    desc: 'ロゴデザイン',
    date: '2025',
    image: '/public/images/workspage-button/oto-logo.png',
    alt: 'ロゴ作品：Oto Logo',
  },
  {
    category: 'character',
    title: 'Kaguya Character',
    desc: 'キャラクターデザイン',
    date: '2025',
    image: '/public/images/workspage-button/kaguya-icon.png',
    alt: 'キャラクター作品：Kaguya',
  },
  {
    category: 'character',
    title: 'Maya Character',
    desc: 'キャラクターデザイン',
    date: '2025',
    image: '/public/images/workspage-button/maya-icon.png',
    alt: 'キャラクター作品：Maya',
  },
  {
    category: 'character',
    title: 'Oto Character',
    desc: 'キャラクターデザイン',
    date: '2025',
    image: '/public/images/workspage-button/oto-icon.png',
    alt: 'キャラクター作品：Oto',
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
          data-image="${item.image}"
          role="button"
          tabindex="0"
          aria-label="${item.title}を開く"
        >
          <img src="${item.image}" alt="${item.alt}" loading="lazy" />
        </div>
      `
    )
    .join('');

  return `
    <section class="page page-works active" aria-label="作品一覧">

      <!-- セクションタイトル装飾（W） -->
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
          <img id="modalImage" src="" alt="" />
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

  // 作品アイテムをクリックしてモーダルを開く
  workGrid.querySelectorAll<HTMLElement>('.work-item').forEach((item) => {
    item.addEventListener('click', () => openModal(item));

    // キーボード操作（Enter/Space）でも開けるようにする
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  // オーバーレイクリックで閉じる
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Escキーで閉じる
  document.addEventListener('keydown', handleEscKey);


  function openModal(item: HTMLElement): void {
    modalImage.src = item.dataset.image ?? '';
    modalImage.alt = item.querySelector('img')?.alt ?? '';
    modalTitle.textContent = item.dataset.title ?? '';
    modalDesc.textContent = item.dataset.desc ?? '';
    modalDate.textContent = item.dataset.date ?? '';

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeModal(): void {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');

    // ページを離れたらEscキーのリスナーを削除する
    document.removeEventListener('keydown', handleEscKey);
  }

  function handleEscKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') closeModal();
  }
}