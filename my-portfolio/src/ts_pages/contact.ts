// ============================================
// contact.ts
// 役割：ContactページのHTML生成・イベント初期化
// 　　　・お問い合わせフォームの表示
// 　　　・入力バリデーション（必須項目チェック）
// 　　　・Google Formsへの送信処理
// ============================================


// ============================================
// renderContact
// ContactページのHTMLを文字列で返す
// ============================================
export function renderContact(): string {
  return `
    <section class="page page-contact active" aria-label="お問い合わせ">

        <!-- ページタイトル+メッセージ -->
      <div class="section-title-area">

        <!-- Contactページタイトル  -->
        <div class="section-title">
          <span class="section-title-initial">C</span>
          <span class="section-title-rest">ontact</span>
        </div>

        <!-- メッセージ・注意事項 -->
        <p class="contact-message">
          お仕事のご相談などなどお気軽にお問い合わせください。
          <br>
          もちろん「こんなイメージで」という相談も大歓迎です！
          <br>
          お問い合わせ後、3営業日以内にご返事いたします。
        </p>
      </div>


      <!-- メインコンテンツ -->
      <div class="contact-content">

        <!-- お問い合わせフォーム -->
        <form class="contact-form" id="contactForm" novalidate>

          <!-- 左側：基本情報 -->
          <div class="form-left">

            <div class="form-group">
              <label for="contact-name">お名前<span class="asterisk">&#42;</span></label>
              <input type="text" id="contact-name" name="name" placeholder="山田 太郎" required>
            </div>

            <div class="form-group">
              <label for="contact-company">会社名</label>
              <input type="text" id="contact-company" name="company" placeholder="株式会社〇〇">
            </div>

            <div class="form-group">
              <label for="contact-email">E-mail<span class="asterisk">&#42;</span></label>
              <input type="email" id="contact-email" name="email" placeholder="example@email.com" required>
            </div>

            <div class="form-group">
              <label for="contact-service">サービス<span class="asterisk">&#42;</span></label>
              <select id="contact-service" name="service" required>
                <option value="">
                  選択してください
                </option>
                <option value="illust-logo">
                  イラスト・ロゴ制作
                </option>
                <option value="web-design">
                  Webデザイン
                </option>
                <option value="character-design">
                  キャラクターデザイン
                </option>
                <option value="other">
                  その他
                </option>
              </select>
            </div>

          </div>

          <!-- 右側：お問い合わせ内容 -->
          <div class="form-right">
            <div class="form-group form-group-details">
              <label for="contact-details">
                お問合わせ
                <br>
                内容<span class="asterisk">&#42;</span>
              </label>
              <textarea id="contact-details" name="details" placeholder="ご依頼内容をご記入ください" required></textarea>
            </div>
          </div>

          <!-- 送信ボタン -->
          <button type="submit" class="submit-btn" id="submitBtn" disabled>
            送信
          </button>

        </form>
      </div>
    </section>
  `;
}


// ============================================
// initContact
// HTMLが差し込まれた後に呼ばれる
// ・入力バリデーション
// ・フォーム送信処理
// ============================================
export function initContact(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement | null;
  if (!form || !submitBtn) return;

  // 入力のたびにバリデーションを実行する
  form.addEventListener('input', () => validateForm(submitBtn));

  // フォーム送信
  form.addEventListener('submit', (e) => handleSubmit(e, form, submitBtn));
}


// ============================================
// バリデーション
// 必須項目（*）が全て入力されたら送信ボタンを有効にする
// ============================================
function validateForm(submitBtn: HTMLButtonElement): void {
  const name    = (document.getElementById('contact-name')    as HTMLInputElement).value.trim();
  const email   = (document.getElementById('contact-email')   as HTMLInputElement).value.trim();
  const service = (document.getElementById('contact-service') as HTMLSelectElement).value;
  const details = (document.getElementById('contact-details') as HTMLTextAreaElement).value.trim();

  const isValid = name !== '' && email !== '' && service !== '' && details !== '';

  submitBtn.disabled = !isValid;
  submitBtn.classList.toggle('enabled', isValid);
}


// ============================================
// フォーム送信処理
// Google Formsにno-corsで送信する
// ============================================
function handleSubmit(
  e: Event,
  form: HTMLFormElement,
  submitBtn: HTMLButtonElement
): void {
  e.preventDefault();

  const name    = (document.getElementById('contact-name')    as HTMLInputElement).value.trim();
  const email   = (document.getElementById('contact-email')   as HTMLInputElement).value.trim();
  const company = (document.getElementById('contact-company') as HTMLInputElement).value.trim();
  const service = (document.getElementById('contact-service') as HTMLSelectElement).value;
  const details = (document.getElementById('contact-details') as HTMLTextAreaElement).value.trim();

  // Google FormsのエンドポイントURL
  // ※ フォームIDは実際のGoogle FormsのURLに合わせて変更する
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScpeUSeFP1pExK5GvILert62qeTM--NtbHS2ws3afTKfrftLQ/viewform?embedded=true';

  const formData = new FormData();
  formData.append('entry.name',    name);
  formData.append('entry.email',   email);
  formData.append('entry.company', company);
  formData.append('entry.service', service);
  formData.append('entry.details', details);

  // no-cors：Google Formsはレスポンスが読めないが送信はできる
  fetch(formUrl, {
    method: 'POST',
    body: formData,
    mode: 'no-cors',
  })
    .then(() => {
      alert('お問い合わせを送信しました。ありがとうございます。');
      form.reset();
      validateForm(submitBtn);
    })
    .catch(() => {
      alert('送信に失敗しました。お手数ですが、もう一度お試しください。');
    });
}