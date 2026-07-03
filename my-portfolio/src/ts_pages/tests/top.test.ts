// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderTop, initTop } from '../top';

const CHARACTER_IMAGES = [
  '/public/images/character/Kaguya-stand.png',
  '/public/images/character/maya-stand.png',
  '/public/images/character/oto-stand.png',
];
const SESSION_KEY = 'lastCharacterIndex';

describe('renderTop', () => {
  it('page-top セクションとキャラクターイラストのimgを含む', () => {
    const html = renderTop();
    expect(html).toContain('page-top');
    expect(html).toContain('id="topCharacter"');
  });

  it('4つのナビボタン（works/service/profile/contact）を含む', () => {
    document.body.innerHTML = renderTop();
    const buttons = document.querySelectorAll<HTMLButtonElement>('.top-nav-btn');
    const pages = Array.from(buttons).map((b) => b.dataset.page);

    expect(buttons.length).toBe(4);
    expect(pages).toEqual(['works', 'service', 'profile', 'contact']);
  });

  it('中央の菱形装飾（polygon）を含む', () => {
    const html = renderTop();
    expect(html).toContain('top-polygon');
    expect(html).toContain('polygon.svg');
  });
});

describe('initTop', () => {
  beforeEach(() => {
    document.body.innerHTML = renderTop();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('topCharacterのsrcがcharacterImagesのいずれかにセットされる', () => {
    initTop();
    const img = document.getElementById('topCharacter') as HTMLImageElement;

    expect(img.src).toBeTruthy();
    const matched = CHARACTER_IMAGES.some((path) => img.src.endsWith(path));
    expect(matched).toBe(true);
  });

  it('altに「キャラクターイラスト <番号>」がセットされる', () => {
    initTop();
    const img = document.getElementById('topCharacter') as HTMLImageElement;

    expect(img.alt).toMatch(/^キャラクターイラスト \d$/);
  });

  it('sessionStorageに選択したインデックスが保存される', () => {
    initTop();
    const saved = sessionStorage.getItem(SESSION_KEY);

    expect(saved).not.toBeNull();
    expect(['0', '1', '2']).toContain(saved);
  });

  it('前回と同じキャラクターは連続で選ばれない', () => {
    // 前回のインデックスを 0 に設定
    sessionStorage.setItem(SESSION_KEY, '0');

    // Math.randomを固定シーケンスに差し替える
    // 1回目 -> 0 (前回と同じなのでリトライされる想定)
    // 2回目 -> 0.5 -> index 1
    const randomSpy = vi.spyOn(Math, 'random');
    randomSpy.mockReturnValueOnce(0).mockReturnValueOnce(0.5);

    initTop();

    const img = document.getElementById('topCharacter') as HTMLImageElement;
    expect(img.src.endsWith(CHARACTER_IMAGES[1])).toBe(true);
    expect(sessionStorage.getItem(SESSION_KEY)).toBe('1');
  });

  it('topCharacter要素が存在しない場合は何もせずエラーにならない', () => {
    document.body.innerHTML = '';
    expect(() => initTop()).not.toThrow();
  });

  it('ナビボタンをクリックするとnavigateカスタムイベントが正しいdetailで発火する', () => {
    initTop();

    const handler = vi.fn();
    document.addEventListener('navigate', handler as EventListener);

    const worksBtn = document.querySelector<HTMLButtonElement>('[data-page="works"]');
    worksBtn?.click();

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({ page: 'works' });
  });

  it('4つのナビボタンそれぞれで対応するpageのイベントが発火する', () => {
    initTop();
    const handler = vi.fn();
    document.addEventListener('navigate', handler as EventListener);

    const pages = ['works', 'service', 'profile', 'contact'];
    pages.forEach((page) => {
      document.querySelector<HTMLButtonElement>(`[data-page="${page}"]`)?.click();
    });

    expect(handler).toHaveBeenCalledTimes(4);
    const receivedPages = handler.mock.calls.map((c) => (c[0] as CustomEvent).detail.page);
    expect(receivedPages).toEqual(pages);
  });
});
