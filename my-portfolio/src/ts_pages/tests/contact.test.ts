// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderContact, initContact } from '../contact';

describe('renderContact', () => {
  it('page-contact セクションとフォームを含む', () => {
    const html = renderContact();
    expect(html).toContain('page-contact');
    expect(html).toContain('id="contactForm"');
  });

  it('必須の入力項目（name/email/service/details）を含む', () => {
    document.body.innerHTML = renderContact();
    expect(document.getElementById('contact-name')).not.toBeNull();
    expect(document.getElementById('contact-email')).not.toBeNull();
    expect(document.getElementById('contact-service')).not.toBeNull();
    expect(document.getElementById('contact-details')).not.toBeNull();
    // 任意項目
    expect(document.getElementById('contact-company')).not.toBeNull();
  });

  it('必須項目にrequired属性が付与されている', () => {
    document.body.innerHTML = renderContact();
    expect((document.getElementById('contact-name') as HTMLInputElement).required).toBe(true);
    expect((document.getElementById('contact-email') as HTMLInputElement).required).toBe(true);
    expect((document.getElementById('contact-service') as HTMLSelectElement).required).toBe(true);
    expect((document.getElementById('contact-details') as HTMLTextAreaElement).required).toBe(
      true
    );
    expect((document.getElementById('contact-company') as HTMLInputElement).required).toBe(
      false
    );
  });

  it('送信ボタンは初期状態でdisabled', () => {
    document.body.innerHTML = renderContact();
    const btn = document.getElementById('submitBtn') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('サービス選択肢に4つの選択肢＋プレースホルダーを含む', () => {
    document.body.innerHTML = renderContact();
    const options = document.querySelectorAll('#contact-service option');
    expect(options.length).toBe(5); // プレースホルダー含む
  });
});

describe('initContact', () => {
  let form: HTMLFormElement;
  let submitBtn: HTMLButtonElement;

  const fillField = (id: string, value: string) => {
    const el = document.getElementById(id) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };

  beforeEach(() => {
    document.body.innerHTML = renderContact();
    form = document.getElementById('contactForm') as HTMLFormElement;
    submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

    // jsdomはalert/HTMLFormElement.requestSubmit等が未実装のためスタブする
    window.alert = vi.fn();
    globalThis.fetch = vi.fn().mockResolvedValue({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('formまたはsubmitBtnが存在しない場合は何もせずエラーにならない', () => {
    document.body.innerHTML = '';
    expect(() => initContact()).not.toThrow();
  });

  it('必須項目が全て埋まるまでsubmitBtnはdisabledのまま', () => {
    initContact();

    fillField('contact-name', '山田 太郎');
    expect(submitBtn.disabled).toBe(true);

    fillField('contact-email', 'test@example.com');
    expect(submitBtn.disabled).toBe(true);

    fillField('contact-service', 'web-design');
    expect(submitBtn.disabled).toBe(true);

    fillField('contact-details', 'よろしくお願いします');
    expect(submitBtn.disabled).toBe(false);
    expect(submitBtn.classList.contains('enabled')).toBe(true);
  });

  it('必須項目のいずれかが空欄に戻るとsubmitBtnが再度disabledになる', () => {
    initContact();
    fillField('contact-name', '山田 太郎');
    fillField('contact-email', 'test@example.com');
    fillField('contact-service', 'web-design');
    fillField('contact-details', 'よろしくお願いします');
    expect(submitBtn.disabled).toBe(false);

    fillField('contact-name', '');
    expect(submitBtn.disabled).toBe(true);
  });

  it('会社名（任意項目）が空でも送信可能になる', () => {
    initContact();
    fillField('contact-name', '山田 太郎');
    fillField('contact-email', 'test@example.com');
    fillField('contact-service', 'illust-logo');
    fillField('contact-details', 'ロゴをお願いしたいです');

    expect(submitBtn.disabled).toBe(false);
  });

  it('サービスを選択すると背景色がvar(--bg-primary)になり、未選択に戻すと解除される', () => {
    initContact();
    const serviceEl = document.getElementById('contact-service') as HTMLSelectElement;

    fillField('contact-service', 'web-design');
    expect(serviceEl.style.background).toBe('var(--bg-primary)');

    fillField('contact-service', '');
    expect(serviceEl.style.background).toBe('');
  });

  it('フォーム送信時にpreventDefaultが呼ばれる（ページ遷移しない）', () => {
    initContact();
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('送信成功時：Google Formsへno-corsでPOSTし、成功アラートを出し、フォームをリセットする', async () => {
    initContact();
    fillField('contact-name', '山田 太郎');
    fillField('contact-email', 'test@example.com');
    fillField('contact-service', 'character-design');
    fillField('contact-details', 'キャラクターデザインの相談です');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await vi.waitFor(() => expect(window.alert).toHaveBeenCalled());

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('docs.google.com/forms'),
      expect.objectContaining({ method: 'POST', mode: 'no-cors' })
    );
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('送信しました')
    );

    // フォームがリセットされ、再度バリデーションによりdisabledに戻る
    expect(submitBtn.disabled).toBe(true);
  });

  it('送信するFormDataに入力内容が正しく含まれる', async () => {
    initContact();
    fillField('contact-name', '田中 花子');
    fillField('contact-company', '株式会社テスト');
    fillField('contact-email', 'hanako@example.com');
    fillField('contact-service', 'other');
    fillField('contact-details', 'その他の相談内容');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await vi.waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());

    const [, options] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const body = options.body as FormData;

    expect(body.get('entry.name')).toBe('田中 花子');
    expect(body.get('entry.company')).toBe('株式会社テスト');
    expect(body.get('entry.email')).toBe('hanako@example.com');
    expect(body.get('entry.service')).toBe('other');
    expect(body.get('entry.details')).toBe('その他の相談内容');
  });

  it('送信失敗時：失敗アラートを表示する', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('network error'));

    initContact();
    fillField('contact-name', '山田 太郎');
    fillField('contact-email', 'test@example.com');
    fillField('contact-service', 'web-design');
    fillField('contact-details', 'よろしくお願いします');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await vi.waitFor(() => expect(window.alert).toHaveBeenCalled());

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('送信に失敗しました')
    );
  });
});
