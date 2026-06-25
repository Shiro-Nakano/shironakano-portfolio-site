// ============================================
// top.ts
// 役割：TOPページのHTML生成・イベント初期化
// 　　　・4つのナビボタン（Works/Profile/Service/Contact）
// 　　　・キャラクターイラストのランダム表示
// ============================================


// ============================================
// キャラクター画像リスト
// publicフォルダの実際のパスに合わせる
// ============================================
const characterImages: string[] = [
  '/public/images/character/Kaguya-stand.png',
  '/public/images/character/maya-stand.png',
  '/public/images/character/oto-stand.png',
];


// ============================================
// renderTop
// TOPページのHTMLを文字列で返す
// main.tsのouterFrame.innerHTMLに差し込まれる
// ============================================
export function renderTop(): string {
  return `
    <section class="page page-top active" aria-label="トップページ">
      <div class="top-section-title">

        <!-- キャラクターイラスト（initTopでランダムにsrcをセット） -->
        <img
          class="top-character"
          id="topCharacter"
          src=""
          alt="キャラクターイラスト"
        />

        <!-- 4つのナビボタン -->
        <div class="top-buttons">

          <button class="top-nav-btn" data-page="works">
            <div class="top-nav-btn-bg">
              <img
                src="/public/images/toppage/Works-button.svg"
                alt=""
                class="btn-illust"
              />
            </div>
            <span class="top-nav-btn-text">Works</span>
          </button>

          <button class="top-nav-btn" data-page="profile">
            <div class="top-nav-btn-bg">
              <img
                src="/public/images/toppage/Profile-button.svg"
                alt=""
                class="btn-illust"
              />
            </div>
            <span class="top-nav-btn-text">Profile</span>
          </button>

          <button class="top-nav-btn" data-page="service">
            <div class="top-nav-btn-bg">
              <img
                src="/public/images/toppage/Service-button.svg"
                alt=""
                class="btn-illust"
              />
            </div>
            <span class="top-nav-btn-text">Service</span>
          </button>

          <button class="top-nav-btn" data-page="contact">
            <div class="top-nav-btn-bg">
              <img
                src="/public/images/toppage/Contact-button.svg"
                alt=""
                class="btn-illust"
              />
            </div>
            <span class="top-nav-btn-text">Contact</span>
          </button>

        </div>

        <!-- 右側の装飾ポリゴン -->
        <div class="top-polygon"></div>

      </div>
    </section>
  `;
}


// ============================================
// initTop
// HTMLが差し込まれた後に呼ばれる
// ・キャラクターをランダム表示
// ・ナビボタンのクリックイベントを登録
// ============================================
export function initTop(): void {
  setRandomCharacter();
  initTopNavButtons();
}


// ランダムなキャラクター画像をセットする
function setRandomCharacter(): void {
  const img = document.getElementById('topCharacter') as HTMLImageElement | null;
  if (!img) return;

  const randomIndex = Math.floor(Math.random() * characterImages.length);
  img.src = characterImages[randomIndex];
  img.alt = `キャラクターイラスト ${randomIndex + 1}`;
}


// TOPページのナビボタンにクリックイベントを登録する
// （main.tsのnavigateToを呼び出す）
function initTopNavButtons(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.top-nav-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page) {
        // main.tsのnavigateToをカスタムイベント経由で呼び出す
        document.dispatchEvent(
          new CustomEvent('navigate', { detail: { page } })
        );
      }
    });
  });
}