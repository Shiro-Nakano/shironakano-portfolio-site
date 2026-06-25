// ============================================
// service.ts
// 役割：ServiceページのHTML生成
// 　　　・3つのサービスカード
// 　　　　（Illustration & Logo / Web Design / Character Design）
//
// ※ インタラクション（クリックなど）がないため
// 　 initService は不要
// ============================================


// ============================================
// サービスデータ
// カードの内容を変えたいときはここを編集する
// ============================================
type ServiceCard = {
  titleLines: string[];   // ヘッダーのタイトル（複数行対応）
  subtitleColor: string;  // サブタイトルの色
  subtitle: string;       // 日本語サブタイトル
  desc: string;           // 説明文
};

const serviceCards: ServiceCard[] = [
  {
    titleLines: ['Illustration', '&amp;', 'Logo'],
    subtitleColor: '#c49b81',
    subtitle: 'ロゴから印刷物まで<br />幅広いご要望にお応えします',
    desc: 'SNSアイコンやグッズ、コンテンツイラスト・活動やブランドの顔となるロゴを一緒に作り上げます！<br />テイストや用途に合わせてデザインしますので、<br />「なんとなくこんな雰囲気で」というご相談も大歓迎です！',
  },
  {
    titleLines: ['Web&nbsp;&nbsp;Design'],
    subtitleColor: '#81a0c4',
    subtitle: '斬新なデザインと<br />実用性を両立するWebサイト',
    desc: 'デザインからコーディングまで<br />制作いたします。<br />HTML / CSS / TypeScriptを使用し、<br />コーポレートサイト・LP・ポートフォリオなど、<br />用途に合わせて幅広く対応しています。',
  },
  {
    titleLines: ['Character', 'Design'],
    subtitleColor: '#81c498',
    subtitle: 'あなたの理想のキャラクターをデザインします',
    desc: '「こんなキャラクターを作りたい！」<br />という思いを形にします。<br />イラスト制作はもちろん、<br />設定やキャラクターシートの作成までまとめてお任せください。<br />画風はご要望に合わせて柔軟に対応します!!',
  },
];


// ============================================
// renderService
// ServiceページのHTMLを文字列で返す
// ============================================
export function renderService(): string {
  const cardsHTML = serviceCards
    .map(
      (card) => `
        <div class="service-card">
          <div class="service-card-header">
            <div class="service-card-header-img"></div>
            <h3 class="service-card-title-en">
              ${card.titleLines
                .map((line, i) =>
                  i === 1 && line === '&amp;'
                    ? `<span class="service-ampersand">&amp;</span>`
                    : `<span>${line}</span>`
                )
                .join(i => i === 0 ? '' : '<br />')}
            </h3>
          </div>
          <h4 class="service-card-subtitle" style="color: ${card.subtitleColor};">
            ${card.subtitle}
          </h4>
          <p class="service-card-desc">${card.desc}</p>
        </div>
      `
    )
    .join('');

  return `
    <section class="page page-service active" aria-label="サービス">

      <!-- セクションタイトル装飾（S） -->
      <div class="section-title-area">
        <div class="section-title">
          <span class="section-title-initial">S</span>
          <span class="section-title-rest">ervice</span>
        </div>
      </div>

      <!-- サービスカード3枚 -->
      <div class="service-content">
        ${cardsHTML}
      </div>

    </section>
  `;
}