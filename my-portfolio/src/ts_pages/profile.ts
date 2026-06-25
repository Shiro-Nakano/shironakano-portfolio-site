// ============================================
// profile.ts
// 役割：ProfileページのHTML生成
// 　　　・プロフィールイラスト
// 　　　・名前・経歴などのテキスト
//
// ※ インタラクション（クリックなど）がないため
// 　 initProfile は不要
// ============================================


// ============================================
// renderProfile
// ProfileページのHTMLを文字列で返す
// ============================================
export function renderProfile(): string {
  return `
    <section class="page page-profile active" aria-label="プロフィール">

      <!-- セクションタイトル装飾（P） -->
      <div class="section-title-area">
        <div class="section-title">
          <span class="section-title-initial">P</span>
          <span class="section-title-rest">rofile</span>
        </div>
      </div>

      <!-- メインコンテンツ -->
      <div class="profile-content">

        <!-- 左側：プロフィールイラスト -->
        <div class="profile-illust">
          <img
            src="/public/images/profile_illust/nonou_light.png"
            alt="プロフィールイラスト"
            id="profileIllust"
          />
        </div>

        <!-- 右側：プロフィール詳細 -->
        <div class="profile-details">
          <h2 class="profile-name">Shiro&nbsp;&nbsp;Nakano</h2>
          <div class="profile-info">
            <p>illustrator / web designer</p>
            <p>生まれ年：2001年</p>
            <p>出身地：&emsp;兵庫県　日本</p>
            <p>所属：&emsp;&emsp;Fulfill株式会社</p>
            <p>使用ツール：Figma / ClipStudio / VSCode</p>
          </div>
        </div>

      </div>
    </section>
  `;
}