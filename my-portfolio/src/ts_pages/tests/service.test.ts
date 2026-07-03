// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderService } from '../service';

describe('renderService', () => {
  it('page-service セクションを含むHTMLを返す', () => {
    const html = renderService();
    expect(html).toContain('page-service');
    expect(html).toContain('aria-label="サービス"');
  });

  it('ページタイトル（Service）が含まれる', () => {
    const html = renderService();
    expect(html).toContain('section-title-initial">S<');
    expect(html).toContain('section-title-rest">ervice<');
  });

  it('3つのサービスカード（Character Design / Web Design / Illustration & Logo）を含む', () => {
    document.body.innerHTML = renderService();
    const cards = document.querySelectorAll('.service-card');
    expect(cards.length).toBe(3);
  });

  it('Character Designカードのタイトルと強調色を含む', () => {
    const html = renderService();
    expect(html).toContain('Character&nbsp;Design');
    expect(html).toContain('#81c498');
  });

  it('Web Designカードのタイトルと強調色を含む', () => {
    const html = renderService();
    expect(html).toContain('Web&nbsp;&nbsp;Design');
    expect(html).toContain('#81a0c4');
  });

  it('Illustration & Logo Designカードのタイトルと強調色を含む', () => {
    const html = renderService();
    expect(html).toContain('Illustration');
    expect(html).toContain('Logo Design');
    expect(html).toContain('#c49b81');
  });

  it('各カードの紹介文がservice-scroll-areaクラスを持つ', () => {
    document.body.innerHTML = renderService();
    const descs = document.querySelectorAll('.service-card-desc.service-scroll-area');
    expect(descs.length).toBe(3);
  });

  it('呼び出すたびに同じ内容の文字列を返す（副作用がない）', () => {
    expect(renderService()).toBe(renderService());
  });
});
