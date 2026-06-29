// ============================================
// service.ts
// 役割：ServiceページのHTML生成
// ============================================

export function renderService(): string {
  return `
    <section class="page page-service active" aria-label="サービス">

      <div class="section-title-area">
        <div class="section-title">
          <span class="section-title-initial">S</span>
          <span class="section-title-rest">ervice</span>
        </div>
      </div>

      <div class="service-content">

        <div class="service-card">
          <div class="service-card-header">
            <div class="service-card-header-img"></div>
            <h3 class="service-card-title-en">
              <span>Illustration</span><br />
              <span class="service-ampersand">&amp;</span><br />
              <span>Logo</span>
            </h3>
          </div>
          <h4 class="service-card-subtitle" style="color: #c49b81;">
            ロゴから印刷物まで<br />幅広いご要望にお応えします
          </h4>
          <p class="service-card-desc">
            SNSアイコンやグッズ、コンテンツイラスト・活動やブランドの顔となるロゴを一緒に作り上げます！<br />
            テイストや用途に合わせてデザインしますので、<br />
            「なんとなくこんな雰囲気で」というご相談も大歓迎です！
          </p>
        </div>

        <div class="service-card">
          <div class="service-card-header">
            <div class="service-card-header-img"></div>
            <h3 class="service-card-title-en">
              <span>Web&nbsp;&nbsp;Design</span>
            </h3>
          </div>
          <h4 class="service-card-subtitle" style="color: #81a0c4;">
            斬新なデザインと<br />実用性を両立するWebサイト
          </h4>
          <p class="service-card-desc">
            デザインからコーディングまで<br />
            制作いたします。<br />
            HTML / CSS / TypeScriptを使用し、<br />
            コーポレートサイト・LP・ポートフォリオなど、<br />
            用途に合わせて幅広く対応しています。
          </p>
        </div>

        <div class="service-card">
          <div class="service-card-header">
            <div class="service-card-header-img"></div>
            <h3 class="service-card-title-en">
              <span>Character</span><br />
              <span>Design</span>
            </h3>
          </div>
          <h4 class="service-card-subtitle" style="color: #81c498;">
            あなたの理想のキャラクターをデザインします
          </h4>
          <p class="service-card-desc">
            「こんなキャラクターを作りたい！」<br />
            という思いを形にします。<br />
            イラスト制作はもちろん、<br />
            設定やキャラクターシートの作成までまとめてお任せください。<br />
            画風はご要望に合わせて柔軟に対応します!!
          </p>
        </div>

      </div>

    </section>
  `;
}