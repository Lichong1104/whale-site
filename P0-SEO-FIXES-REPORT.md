# P0 SEO 技术问题修复汇报

> 汇报日期：2026-08-13  
> 站点域名：https://www.whale.sg  
> 相关 Commit：`9ceb53c`  
> 分支：`main`

---

## 1. 修复概览

本次修复针对 SEO 审计中识别的 **P0 级技术问题**，共涉及 22 个文件的变更（+2,364 / −24 行）。修复后已通过 `npm run build` 构建验证，并已推送至远端 `main` 分支。

| 修复领域 | 修复前问题 | 修复后状态 |
|---|---|---|
| **Open Graph 图片** | 全站共用一张 App Store badge 图片，与页面内容无关 | 首页、SpaceSight、Alivia 各自拥有 1200×630 专属 OG 图 |
| **导航锚点** | Header / Footer 使用 `#products`、`#contact` 等片段锚点，在子页面失效或指向缺失元素 | 全部改为根相对锚点（`/#products`、`/#footer-contact` 等） |
| **产品页 Schema** | 仅首页有组织/网站 Schema，产品页无结构化数据 | SpaceSight / Alivia 增加 `SoftwareApplication` + `Offer` + `BreadcrumbList` |
| **Alivia H1** | H1 仅为 "Alivia"，缺少主题关键词 | 扩展为 "Alivia — Enterprise AI Operating System for Agent Orchestration" |

---

## 2. 详细变更

### 2.1 Open Graph 图片

**新增文件**

| 文件 | 尺寸 | 用途 |
|---|---|---|
| `public/og/home.png` | 1200×630 | 首页 `/` |
| `public/og/spacesight.png` | 1200×630 | `/whale_spacesight/` |
| `public/og/alivia.png` | 1200×630 | `/alivia/` |
| `scripts/generate-og-images.mjs` | — | Playwright 生成脚本，便于后续复用 |

**实现方式**

- 使用 Playwright 渲染 HTML 模板并截图生成 PNG。
- 模板中嵌入 Whale 品牌 logo 与产品 logo（base64），背景采用品牌蓝/紫/青色渐变。

**代码变更**

`src/components/SEO.astro` 默认 og:image 从通用 App Store badge 改为首页专用图：

```astro
// 修复前
ogImage = 'https://www.whale.sg/images/2025/f-pic1.png',

// 修复后
ogImage = 'https://www.whale.sg/og/home.png',
```

产品页显式传入专属 og:image：

```astro
<!-- whale_spacesight.astro -->
<Layout
  ...
  ogImage="/og/spacesight.png"
>

<!-- alivia.astro -->
<Layout
  ...
  ogImage="/og/alivia.png"
>
```

---

### 2.2 导航与 CTA 锚点

**问题**

- Header 的 `Products`、`Hardware`、`Solutions`、`Cases` 使用 `#section` 锚点，在 `/alivia/` 或 `/whale_spacesight/` 等子页面无法跳转。
- `Request Demo` 按钮指向 `#contact`，但页面中不存在该 ID。
- Footer 的 `About Us` 为死链 `#`，`Use Cases` 和 `Contact Us` 也存在类似问题。

**修复后代码（Header.astro）**

```astro
<nav class="site-nav" aria-label="Primary">
  <a href="/#products">Products</a>
  <a href="/#hardware">Hardware</a>
  <a href="/#integrated-platform">Solutions</a>
  <a href="/#cases">Cases</a>
  <a href="/#footer-contact">Contact</a>
</nav>
<a href="/#footer-contact" class="btn btn-primary">Request Demo</a>
```

**修复后代码（Footer.astro 关键项）**

```astro
<a href="/">About Us</a>
<a href="#footer-contact">Contact Us</a>
<a href="/#cases">Use Cases</a>
```

---

### 2.3 结构化数据（Schema）

**问题**

- 全站仅有 `Organization` 与 `WebSite` Schema，产品页缺失 `SoftwareApplication` / `Offer` / `BreadcrumbList`。

**修复方式**

1. `SEO.astro` 与 `Layout.astro` 增加 `extraSchema` 可选参数：

```astro
// SEO.astro
export interface Props {
  ...
  extraSchema?: any[];
}

if (extraSchema && extraSchema.length > 0) {
  structuredData['@graph'].push(...extraSchema);
}
```

2. SpaceSight 与 Alivia 页面传入 `SoftwareApplication` + `Offer` + `BreadcrumbList`：

```astro
const extraSchema = [
  {
    '@type': 'SoftwareApplication',
    name: 'Whale SpaceSight',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Edge, Cloud',
    description: pageDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: 'Contact sales',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl
    }
  },
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { position: 1, name: 'Home', item: 'https://www.whale.sg/' },
      { position: 2, name: 'Products', item: 'https://www.whale.sg/products/' },
      { position: 3, name: 'SpaceSight', item: 'https://www.whale.sg/whale_spacesight/' }
    ]
  }
];
```

---

### 2.4 Alivia H1 优化

**修复前**

```html
<h1>Alivia</h1>
```

**修复后**

```html
<h1>
  Alivia
  <span class="alivia-hero-subtitle">
    — Enterprise AI Operating System for Agent Orchestration
  </span>
</h1>
```

副标题通过 CSS 控制为较小字号，保持视觉层级：

```css
.alivia-hero-brand h1 .alivia-hero-subtitle {
  display: block;
  font-size: 0.5em;
  opacity: 0.85;
  margin-top: 0.25rem;
  font-weight: 500;
}
```

---

## 3. 文件变更清单

```text
22 files changed, 2364 insertions(+), 24 deletions(-)

新增：
  COMPETITOR-ANALYSIS.md
  CONTENT-CALENDAR.md
  IMPLEMENTATION-ROADMAP.md
  SEO-STRATEGY.md
  SITE-STRUCTURE.md
  public/og/alivia.png
  public/og/home.png
  public/og/spacesight.png
  dist/og/alivia.png
  dist/og/home.png
  dist/og/spacesight.png
  scripts/generate-og-images.mjs

修改：
  src/components/Header.astro
  src/components/Footer.astro
  src/components/SEO.astro
  src/layouts/Layout.astro
  src/pages/alivia.astro
  src/pages/whale_spacesight.astro
  dist/alivia/index.html
  dist/index.html
  dist/whale_spacesight/index.html
```

---

## 4. 验证结果

- `npm run build` 构建成功，生成 3 个静态页面 + `sitemap-index.xml`。
- 生成的 `dist/index.html` 中 `og:image` 指向 `https://www.whale.sg/og/home.png`。
- `dist/whale_spacesight/index.html` 与 `dist/alivia/index.html` 中均出现 `SoftwareApplication` 与 `BreadcrumbList`。
- `dist/alivia/index.html` 中 H1 包含完整关键词短语。

---

## 5. 后续建议

按 `SEO-STRATEGY.md` / `IMPLEMENTATION-ROADMAP.md` 继续推进：

1. **P1**：上线 `/solutions/retail/`、`/solutions/automotive/`、`/use-cases/loss-prevention/` 等页面。
2. **P1**：将 `/whale_spacesight/` 301 迁移至 `/products/spacesight/`。
3. **P2**：将 `anime.js` / `three.js` 移出 `<head>` 并加 `defer`，优化 LCP / INP。
4. **P3**：启动博客集群，覆盖 physical operations intelligence、AI audit、agent orchestration 等主题。
