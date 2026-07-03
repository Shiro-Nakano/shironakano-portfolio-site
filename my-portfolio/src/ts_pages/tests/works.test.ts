// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { renderWorks, initWorks } from '../works';

describe('renderWorks', () => {
  it('page-works セクションとworksGridを含む', () => {
    const html = renderWorks();
    expect(html).toContain('page-works');
    expect(html).toContain('id="worksGrid"');
  });

  it('作品アイテムが9件生成される', () => {
    document.body.innerHTML = renderWorks();
    const items = document.querySelectorAll('.work-item');
    expect(items.length).toBe(9);
  });

  it('カテゴリごとの件数が正しい（illust:2, logo:3, character:3, web:1）', () => {
    document.body.innerHTML = renderWorks();
    const count = (cat: string) =>
      document.querySelectorAll(`.work-item[data-category="${cat}"]`).length;

    expect(count('illust')).toBe(2);
    expect(count('logo')).toBe(3);
    expect(count('character')).toBe(3);
    expect(count('web')).toBe(1);
  });

  it('フィルターボタン（ALL/Illust/Logo/Character/Web）を含み、ALLが初期状態でactive', () => {
    document.body.innerHTML = renderWorks();
    const buttons = document.querySelectorAll<HTMLButtonElement>('.sort-btn');
    expect(buttons.length).toBe(5);

    const allBtn = document.querySelector('.sort-btn[data-filter="all"]');
    expect(allBtn?.classList.contains('active')).toBe(true);
  });

  it('モーダル用のDOM（overlay/image/title/desc/date）が生成される', () => {
    document.body.innerHTML = renderWorks();
    expect(document.getElementById('modalOverlay')).not.toBeNull();
    expect(document.getElementById('modalImage')).not.toBeNull();
    expect(document.getElementById('modalTitle')).not.toBeNull();
    expect(document.getElementById('modalDesc')).not.toBeNull();
    expect(document.getElementById('modalDate')).not.toBeNull();
  });

  it('各work-itemはrole="button"とtabindex="0"を持つ（キーボード操作対応）', () => {
    document.body.innerHTML = renderWorks();
    const items = document.querySelectorAll('.work-item');
    items.forEach((item) => {
      expect(item.getAttribute('role')).toBe('button');
      expect(item.getAttribute('tabindex')).toBe('0');
    });
  });
});

describe('initWorks - フィルター機能', () => {
  beforeEach(() => {
    document.body.innerHTML = renderWorks();
    initWorks();
  });

  it('Logoフィルターをクリックするとlogo以外のアイテムがhiddenになる', () => {
    const logoBtn = document.querySelector<HTMLButtonElement>('.sort-btn[data-filter="logo"]');
    logoBtn?.click();

    const items = document.querySelectorAll<HTMLElement>('.work-item');
    items.forEach((item) => {
      if (item.dataset.category === 'logo') {
        expect(item.classList.contains('hidden')).toBe(false);
      } else {
        expect(item.classList.contains('hidden')).toBe(true);
      }
    });
  });

  it('フィルターをクリックすると押したボタンだけがactiveになる', () => {
    const characterBtn = document.querySelector<HTMLButtonElement>(
      '.sort-btn[data-filter="character"]'
    );
    characterBtn?.click();

    const buttons = document.querySelectorAll<HTMLButtonElement>('.sort-btn');
    buttons.forEach((btn) => {
      if (btn.dataset.filter === 'character') {
        expect(btn.classList.contains('active')).toBe(true);
      } else {
        expect(btn.classList.contains('active')).toBe(false);
      }
    });
  });

  it('ALLフィルターをクリックすると全アイテムのhiddenが解除される', () => {
    const logoBtn = document.querySelector<HTMLButtonElement>('.sort-btn[data-filter="logo"]');
    const allBtn = document.querySelector<HTMLButtonElement>('.sort-btn[data-filter="all"]');

    logoBtn?.click();
    allBtn?.click();

    const items = document.querySelectorAll<HTMLElement>('.work-item');
    items.forEach((item) => {
      expect(item.classList.contains('hidden')).toBe(false);
    });
  });
});

describe('initWorks - モーダル機能', () => {
  beforeEach(() => {
    document.body.innerHTML = renderWorks();
    initWorks();
  });

  function getModalEls() {
    return {
      overlay: document.getElementById('modalOverlay') as HTMLElement,
      image: document.getElementById('modalImage') as HTMLImageElement,
      title: document.getElementById('modalTitle') as HTMLElement,
      desc: document.getElementById('modalDesc') as HTMLElement,
      date: document.getElementById('modalDate') as HTMLElement,
    };
  }

  it('work-itemをクリックするとモーダルが開き内容が反映される', () => {
    const firstItem = document.querySelector<HTMLElement>(
      '.work-item[data-title="Kaguya ~the origin~"]'
    )!;
    firstItem.click();

    const { overlay, image, title, desc, date } = getModalEls();

    expect(overlay.classList.contains('active')).toBe(true);
    expect(overlay.getAttribute('aria-hidden')).toBe('false');
    expect(title.textContent).toBe('Kaguya ~the origin~');
    expect(image.src).toContain('kaguya-origin.png');
    expect(desc.textContent).toContain('インスピレーション');
    expect(date.textContent).toContain('制作年：2024.12');
  });

  it('Enterキーでもwork-itemを開ける', () => {
    const item = document.querySelector<HTMLElement>(
      '.work-item[data-title="Project Kaguyaロゴ"]'
    )!;
    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    const { overlay, title } = getModalEls();
    expect(overlay.classList.contains('active')).toBe(true);
    expect(title.textContent).toBe('Project Kaguyaロゴ');
  });

  it('スペースキーでもwork-itemを開ける', () => {
    const item = document.querySelector<HTMLElement>('.work-item[data-title="Maya"]')!;
    item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

    const { overlay, title } = getModalEls();
    expect(overlay.classList.contains('active')).toBe(true);
    expect(title.textContent).toBe('Maya');
  });

  it('オーバーレイの外側（背景）をクリックするとモーダルが閉じる', () => {
    const item = document.querySelector<HTMLElement>('.work-item')!;
    item.click();

    const { overlay } = getModalEls();
    expect(overlay.classList.contains('active')).toBe(true);

    overlay.click();

    expect(overlay.classList.contains('active')).toBe(false);
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
  });

  it('モーダル内部（modal-content）をクリックしても閉じない', () => {
    const item = document.querySelector<HTMLElement>('.work-item')!;
    item.click();

    const content = document.querySelector<HTMLElement>('.modal-content')!;
    content.click();

    const { overlay } = getModalEls();
    expect(overlay.classList.contains('active')).toBe(true);
  });

  it('Escキーでモーダルが閉じる', () => {
    const item = document.querySelector<HTMLElement>('.work-item')!;
    item.click();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    const { overlay } = getModalEls();
    expect(overlay.classList.contains('active')).toBe(false);
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
  });

  it('descが空文字のアイテムはmodalDescが空になる', () => {
    const item = document.querySelector<HTMLElement>('.work-item[data-title="Kaguya ~neo~"]')!;
    item.click();

    const { desc } = getModalEls();
    expect(desc.textContent).toBe('');
  });
});
