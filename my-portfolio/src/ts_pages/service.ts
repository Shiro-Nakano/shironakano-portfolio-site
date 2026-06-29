// ============================================
// service.ts
// 役割：ServiceページのHTML生成
// 　　　・各サービスの概要説明
// 
// ※ インタラクション（クリックなど）がなし
// 　 initProfile は不要
// ============================================


// ============================================
// renderService
// ServiceページのHTMLを文字列で返す
// ============================================
export function renderService(): string {
  return `
    <section class="page page-service active" aria-label="サービス">

      <!-- Serviceページタイトル -->
      <div class="section-title-area">
        <div class="section-title">
          <!-- Sの文字 -->
          <span class="section-title-initial">S</span>
          <!-- 残りの文字 -->
          <span class="section-title-rest">ervice</span>
        </div>
      </div>

      <!-- メインコンテンツ -->
      <div class="service-content">

        <!-- キャラクターデザイン -->
        <div class="service-card">
          <!-- 中タイトル -->
          <div class="service-card-header service-card-header-center">
            <h3 class="service-card-title">
              Character&nbsp;Design
            </h3>
          </div>

          <!-- 小タイトル -->
          <h4 class="service-card-subtitle" style="color: #81c498;">
            あなたの理想のキャラクター
            <br>
            形にしてみませんか？
          </h4>

          <!-- 紹介文 -->
          <p class="service-card-desc">
            「こんなキャラクターを作りたい！」
            <br>
            という思いを形にします。
            <br>
            ビジュアルや立ち絵制作だけでなく、
            <br>
            雰囲気しか決まっていないという場合は
            <br>
            設定やキャラクターシートの作成まで
            <br>
            まとめてお任せください!!
          </p>
        </div>

        <!-- Webデザイン・制作 -->
        <div class="service-card">
          <!-- 中タイトル -->
          <div class="service-card-header">
            <h3 class="service-card-title">
              Web&nbsp;&nbsp;Design
              <span class="service-ampersand">&amp;</span>&nbsp;Development
            </h3>
          </div>

          <!-- 小タイトル -->
          <h4 class="service-card-subtitle" style="color: #81a0c4;">
            斬新なデザインと実用性を
            <br>
            両立するWebサイト
          </h4>

          <!-- 紹介文 -->
            <p class="service-card-desc">
              デザインからコーディングまで
              <br>
              制作いたします。
              <br>
              HTML / CSS / TypeScriptを使用し、
              <br>
              コーポレートサイト・LPサイト・
              <br>
              ポートフォリオサイトなど、
              <br>
              用途にあったサイトを制作いたします。
            </p>
        </div>

        <!-- イラスト＆ロゴ -->
        <div class="service-card">
          <!-- 中タイトル -->
          <div class="service-card-header">
            <h3 class="service-card-title">
              Illustration&nbsp;<span class="service-ampersand">&amp;</span>&nbsp;Logo
            </h3>
          </div>

          <!-- 小タイトル -->
          <h4 class="service-card-subtitle" style="color: #c49b81;">
            ロゴから印刷物まで
            <br>
            幅広いご要望にお応えします
          </h4>

          <!-- 紹介文 -->
          <p class="service-card-desc">
            SNS用のアイコンや一枚絵、
            <br>
            ブランドの顔となるロゴやテーマ画像
            <br>
            などなど制作いたします。
            <br>
            ご要望に合わせてデザインしますので、
            <br>
            「なんとなくこんな雰囲気で」という
            <br>
            ご相談も大歓迎です！
          </p>
        </div>
      </div>
    </section>
  `;
}