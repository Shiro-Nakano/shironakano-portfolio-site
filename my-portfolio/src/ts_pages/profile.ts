// ============================================
// profile.ts
// 役割：ProfileページのHTML生成
// 　　　・プロフィールイラスト
// 　　　・名前・経歴などのテキスト
//
// ※ インタラクション（クリックなど）がなし
// 　 initProfile は不要
// ============================================


// ============================================
// renderProfile
// ProfileページのHTMLを文字列で返す
// ============================================
export function renderProfile(): string {
  return `
    <section class="page page-profile active" aria-label="プロフィール">

      <!-- Profileページタイトル -->
      <div class="section-title-area">
        <div class="section-title">
          <!-- Pの文字 -->
          <span class="section-title-initial">P</span>
          <!-- 残りの文字 -->
          <span class="section-title-rest">rofile</span>
        </div>
      </div>

      <!-- メインコンテンツ -->
      <div class="profile-content">

        <!-- 左側：プロフィールイラスト -->
        <div class="profile-illust">
          <img src="/public/images/profile_illust/nonou_light.png" alt="ノノウのイラスト" id="profileIllust">
        </div>

        <!-- 右側：プロフィール詳細 -->
        <div class="profile-details">
          <!-- 名前 -->
          <h2 class="profile-name">Shiro&nbsp;&nbsp;Nakano</h2>

          <!-- 紹介文 -->
          <div class="profile-info">
            <p>職業：&emsp;illustrator&nbsp;&middot;&nbsp;web designer</p>
            <p>生年：&emsp;2001年</p>
            <p>出身：&emsp;兵庫県</p>
            <p>所属：&emsp;Fulfill株式会社</p>
            <p>ツール：Figma&nbsp;&middot;&nbsp;ClipStudio&nbsp;&middot;&nbsp;VSCode</p>
            <p>言語：&emsp;HTML&nbsp;&middot;&nbsp;CSS&nbsp;&middot;&nbsp;TypeScript</p>
            <br>
            <p>
              鮮やかな色使いを好み
              <br>
              多様なタッチのイラストを描けます
              </p>
          </div>
        </div>

      </div>
    </section>
  `;
}