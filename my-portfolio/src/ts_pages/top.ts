// ============================================
// top.ts
// 役割：TOPページのHTML生成・イベント初期化
// 　　　・4つのナビボタン（Works/Profile/Service/Contact）
// 　　　・キャラクターイラストのランダム表示
// ============================================


// ============================================
// キャラクター画像リスト
// ============================================
const characterImages: string[] = [
    '/images/character/Kaguya-stand.png',
    '/images/character/maya-stand.png',
    '/images/character/oto-stand.png',
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

        <!-- キャラクターイラスト（TSのinitTopでランダムにsrcをセット） -->
        <img class="top-character" id="topCharacter" alt="キャラクターイラスト">

        <!-- ページ遷移用ボタン -->
        <div class="top-buttons">

            <!-- Worksページ遷移ボタン -->
            <button class="top-nav-btn" data-page="works">
                    <img src="/images/toppage/Works-button.svg" id="worksBtnImg" class="btn-illust" alt="Worksページへ遷移するボタン">
            </button>

            <!-- Serviceページ遷移ボタン -->
            <button class="top-nav-btn" data-page="service">
                    <img src="/images/toppage/Service-button.svg" id="serviceBtnImg" class="btn-illust" alt="Serviceページへ遷移するボタン">
            </button>

            <!-- Profileページ遷移ボタン -->
            <button class="top-nav-btn" data-page="profile">
                    <img src="/images/toppage/Profile-button.svg" id="profileBtnImg" class="btn-illust" alt="Profileページへ遷移するボタン">
            </button>

            <!-- Contactページ遷移ボタン -->
            <button class="top-nav-btn" data-page="contact">
                    <img src="/images/toppage/Contact-button.svg" id="contactBtnImg" class="btn-illust" alt="Contactページへ遷移するボタン">
            </button>

        </div>

        <!-- 中央の菱形の装飾 -->
        <div class="top-polygon">
            <img src="/images/toppage/polygon.svg">
        </div>

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


// ランダムなキャラクター画像を同じキャラが連続表示されないようにセットする
const SESSION_KEY = 'lastCharacterIndex';

function setRandomCharacter(): void {
    const img = document.getElementById('topCharacter') as HTMLImageElement | null;
    if (!img) return;

    // 前回のインデックスをsessionStorageから取得
    const lastIndex = parseInt(sessionStorage.getItem(SESSION_KEY) ?? '-1');

    let randomIndex: number;
    do {
        randomIndex = Math.floor(Math.random() * characterImages.length);
    } while (randomIndex === lastIndex);

    // 今回のインデックスをsessionStorageに保存
    sessionStorage.setItem(SESSION_KEY, String(randomIndex));

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