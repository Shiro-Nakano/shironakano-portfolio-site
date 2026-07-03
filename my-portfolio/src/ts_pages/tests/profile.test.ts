// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderProfile } from '../profile';

describe('renderProfile', () => {
  it('page-profile セクションを含むHTMLを返す', () => {
    const html = renderProfile();
    expect(html).toContain('page-profile');
    expect(html).toContain('aria-label="プロフィール"');
  });

  it('ページタイトル（Profile）が含まれる', () => {
    const html = renderProfile();
    expect(html).toContain('section-title-initial">P<');
    expect(html).toContain('section-title-rest">rofile<');
  });

  it('プロフィールイラストのimgタグが正しいsrc/idを持つ', () => {
    const html = renderProfile();
    expect(html).toContain('id="profileIllust"');
    expect(html).toContain('/images/profile_illust/nonou_light.png');
    expect(html).toContain('alt="ノノウのイラスト"');
  });

  it('名前・経歴などのプロフィール詳細テキストを含む', () => {
    const html = renderProfile();
    expect(html).toContain('Shiro');
    expect(html).toContain('Nakano');
    expect(html).toContain('illustrator');
    expect(html).toContain('Fulfill株式会社');
    expect(html).toContain('Figma');
    expect(html).toContain('HTML');
  });

  it('実際にDOMへ挿入してもエラーなく描画できる', () => {
    document.body.innerHTML = renderProfile();
    const section = document.querySelector('.page-profile');
    const img = document.getElementById('profileIllust') as HTMLImageElement;

    expect(section).not.toBeNull();
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('/images/profile_illust/nonou_light.png');
  });

  it('呼び出すたびに同じ内容の文字列を返す（副作用がない）', () => {
    expect(renderProfile()).toBe(renderProfile());
  });
});
