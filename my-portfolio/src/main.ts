// ============================================
// main.ts
// 役割：サイト全体の管理
// 　　　・CSSの読み込み
// 　　　・ページ切り替え（navigateTo）
// 　　　・ライト/ダークモード切替
// ============================================


// ============================================
// CSSのインポート
// ============================================
import './style/base.css';
import './style/side-bar.css';
import './style/layout.css';
import './style/footer.css';
import './style/modal.css';
import './style/pages/top.css';
import './style/pages/works.css';
import './style/pages/profile.css';
import './style/pages/service.css';
import './style/pages/contact.css';
import './style/responsive.css';


// ============================================
// 各ページのレンダー関数をインポート
// それぞれのtsファイルがHTMLを生成して返す
// ============================================
import { renderTop, initTop } from './ts_pages/top';
import { renderWorks, initWorks } from './ts_pages/works';
import { renderProfile } from './ts_pages/profile';
import { renderService } from './ts_pages/service';
import { renderContact, initContact } from './ts_pages/contact';


// ============================================
// 型定義
// ============================================
type PageName = 'top' | 'works' | 'profile' | 'service' | 'contact';
type Theme = 'light' | 'dark';


// ============================================
// 状態管理
// ============================================
let currentTheme: Theme = 'light';


// ============================================
// DOM要素の取得
// ============================================
const app = document.getElementById('app')!;
const outerFrame = document.getElementById('outerFrame')!;
const pageBackground = document.getElementById('pageBackground')!;
const menuItems = document.querySelectorAll<HTMLButtonElement>('.menu-item');
const modeToggle = document.getElementById('modeToggle')!;


// ============================================
// ページごとの設定マップ
// ============================================

// 背景画像のクラス名
const bgClassMap: Record<PageName, string> = {
  top:     'page-bg-top',
  works:   'page-bg-works',
  profile: 'page-bg-profile',
  service: 'page-bg-service',
  contact: 'page-bg-contact',
};

// ページのHTMLを生成する関数
const renderMap: Record<PageName, () => string> = {
  top:     renderTop,
  works:   renderWorks,
  profile: renderProfile,
  service: renderService,
  contact: renderContact,
};

// ページ表示後にイベントを初期化する関数
// （イベントリスナーはHTMLが差し込まれた後に登録する必要がある）
const initMap: Partial<Record<PageName, () => void>> = {
  top:     initTop,
  works:   initWorks,
  contact: initContact,
};


// ============================================
// ページ切り替え
// ============================================
function navigateTo(page: PageName): void {

  // 1. outerFrameにページのHTMLを差し込む
  outerFrame.innerHTML = renderMap[page]();

  // 2. ページ固有のイベントリスナーを初期化する
  const initFn = initMap[page];
  if (initFn) initFn();

  // 3. サイドバーのアクティブメニューを更新する
  menuItems.forEach((item) => {
    item.classList.remove('active');
    if (item.dataset.page === page) {
      item.classList.add('active');
    }
  });

  // 4. 背景画像を切り替える
  pageBackground.className = 'page-background';
  pageBackground.classList.add(bgClassMap[page]);
}


// ============================================
// ライト/ダークモード切替
// ============================================
function setTheme(theme: Theme): void {
  currentTheme = theme;
  if (theme === 'dark') {
    app.setAttribute('data-theme', 'dark');
    modeToggle.setAttribute('aria-checked', 'true');
  } else {
    app.removeAttribute('data-theme');
    modeToggle.setAttribute('aria-checked', 'false');
  }
}

function toggleTheme(): void {
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}


// ============================================
// イベントリスナーの登録
// ============================================
function initGlobalEvents(): void {

  // サイドバーのメニューボタン
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      const page = item.dataset.page as PageName;
      navigateTo(page);
    });
  });

  // モード切替トグル
  modeToggle.addEventListener('click', toggleTheme);

  // TOPページ内のボタン押下時に各ページに遷移する
  document.addEventListener('navigate', (e: Event) => {
    const custom = e as CustomEvent<{ page: PageName }>;
    navigateTo(custom.detail.page);
  });
}



// ============================================
// 初期化
// 最初にTOPページを表示する
// ============================================
function init(): void {
  initGlobalEvents();
  navigateTo('top');
}

init();