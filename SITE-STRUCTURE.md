# Whale AI 站点结构规划

> 版本：v1.0  
> 更新日期：2026-08-13  
> 站点域名：https://www.whale.sg  
> 技术栈：Astro 静态站点

---

## 1. 设计原则

1. **URL 语义化**：使用英文小写、连字符（hyphen）分隔，避免下划线和无意义参数。
2. **层级扁平化**：核心页面尽量控制在 2-3 级目录深度，便于搜索引擎抓取和用户理解。
3. **产品中心制**：所有产品页聚集在 `/products/` 下，硬件聚集在 `/hardware/` 下。
4. **行业与用例分离**：行业方案在 `/solutions/` 下，用例场景在 `/use-cases/` 下。
5. **旧站平滑迁移**：旧站 `.html` 页面通过 301 重定向到新站对应页面，保留权重。
6. **内链网络化**：每个页面都有清晰的上下级导航和相关内容推荐。

---

## 2. 推荐 URL 层级

### 2.1 完整站点树

```
https://www.whale.sg/
│
├── /products/
│   ├── /products/spacesight/          （原 /whale_spacesight/ 迁移）
│   ├── /products/alivia/
│   ├── /products/echo/
│   ├── /products/harbor/
│   └── /products/lume/
│
├── /hardware/
│   ├── /hardware/ai-cameras/
│   ├── /hardware/ai-hubs/
│   ├── /hardware/echo-pins/
│   └── /hardware/echo-pods/
│
├── /solutions/
│   ├── /solutions/retail/
│   ├── /solutions/luxury-retail/
│   ├── /solutions/automotive/
│   ├── /solutions/healthcare/
│   ├── /solutions/food-beverage/
│   ├── /solutions/real-estate/
│   ├── /solutions/rails-transit/
│   └── /solutions/finance-fbsi/
│
├── /use-cases/
│   ├── /use-cases/loss-prevention/
│   ├── /use-cases/compliance-audit/
│   ├── /use-cases/customer-intelligence/
│   ├── /use-cases/space-analytics/
│   └── /use-cases/store-operations/
│
├── /compare/
│   ├── /compare/spacesight-vs-spot-ai/
│   ├── /compare/spacesight-vs-agrex-ai/
│   ├── /compare/alivia-vs-kore-ai/
│   ├── /compare/alivia-vs-salesforce-agentforce/
│   └── /compare/whale-vs-manual-cctv/
│
├── /customers/
│   ├── /customers/nio-showroom-operations/
│   ├── /customers/watsons-retail-compliance/
│   ├── /customers/mtr-transit-operations/
│   └── /customers/unilever-store-operations/
│
├── /resources/
│   ├── /blog/
│   │   ├── /blog/what-is-physical-operations-intelligence/
│   │   ├── /blog/what-is-retail-video-analytics/
│   │   ├── /blog/retail-video-analytics-roi/
│   │   ├── /blog/edge-ai-camera-vs-cloud-ai/
│   │   ├── /blog/what-is-enterprise-ai-operating-system/
│   │   └── /blog/ai-agent-orchestration-store-operations/
│   ├── /guides/
│   │   └── /guides/ai-audit-platform-buyers-guide/
│   ├── /research/
│   │   └── /research/state-of-physical-operations-intelligence-2027/
│   ├── /glossary/
│   │   ├── /glossary/physical-operations-intelligence/
│   │   ├── /glossary/agent-orchestration/
│   │   └── /glossary/edge-ai/
│   └── /faq/
│
├── /integrations/
│
├── /pricing/
│
├── /company/
│   ├── /company/about/
│   ├── /company/team/
│   ├── /company/careers/
│   ├── /company/press/
│   └── /company/contact/
│
├── /privacy-policy/
├── /terms-of-service/
├── /llms.txt
└── /robots.txt
```

### 2.2 URL 命名规范

| 页面类型 | URL 模式 | 示例 |
|---|---|---|
| 产品页 | `/products/{product-name}/` | `/products/spacesight/` |
| 硬件页 | `/hardware/{hardware-name}/` | `/hardware/ai-cameras/` |
| 行业方案页 | `/solutions/{industry}/` | `/solutions/retail/` |
| 用例页 | `/use-cases/{use-case}/` | `/use-cases/loss-prevention/` |
| 对比页 | `/compare/{comparison-slug}/` | `/compare/spacesight-vs-spot-ai/` |
| 案例研究 | `/customers/{case-slug}/` | `/customers/nio-showroom-operations/` |
| 博客 | `/blog/{post-slug}/` | `/blog/what-is-physical-operations-intelligence/` |
| 指南 | `/guides/{guide-slug}/` | `/guides/ai-audit-platform-buyers-guide/` |
| 研究报告 | `/research/{report-slug}/` | `/research/state-of-physical-operations-intelligence-2027/` |
| 术语表 | `/glossary/{term}/` | `/glossary/agent-orchestration/` |
| 公司页 | `/company/{page}/` | `/company/about/` |
| 法律页 | `/{policy-name}/` | `/privacy-policy/` |

---

## 3. 当前页面迁移建议

### 3.1 现有 URL 问题

| 当前 URL | 问题 | 建议 |
|---|---|---|
| `/whale_spacesight/` | URL 含下划线，可读性差 | 迁移至 `/products/spacesight/`，并 301 重定向 |
| `/alivia/` | 层级过浅，但可接受 | 可选迁移至 `/products/alivia/`，并 301 重定向 |
| `/` | 无问题 | 保留 |

### 3.2 推荐 301 重定向

| 旧 URL | 新 URL | 原因 |
|---|---|---|
| `/whale_spacesight/` | `/products/spacesight/` | 移除下划线，统一产品目录 |
| `/alivia/` | `/products/alivia/` | 统一产品目录结构（可选） |
| 旧站 `/retail.html` | `/solutions/retail/` | 内容迁移与权重转移 |
| 旧站 `/automotive.html` | `/solutions/automotive/` | 内容迁移与权重转移 |
| 旧站 `/healthcare.html` | `/solutions/healthcare/` | 内容迁移与权重转移 |
| 旧站 `/realestate.html` | `/solutions/real-estate/` | 内容迁移与权重转移 |
| 旧站 `/rail.html` | `/solutions/rails-transit/` | 内容迁移与权重转移 |
| 旧站 `/finance.html` | `/solutions/finance-fbsi/` | 内容迁移与权重转移 |

---

## 4. 导航结构变更

### 4.1 当前问题

- Header 导航使用 `#products`、`#hardware` 等锚点，在 sub-page 上无法工作
- Footer Solutions 链接指向旧站 `.html` 页面
- "Request Demo" 指向 `#contact`，但页面无此 id
- 无面包屑导航

### 4.2 推荐 Header 导航

```
Whale AI Logo → /

Products
├── SpaceSight → /products/spacesight/
├── Alivia → /products/alivia/
├── Echo → /products/echo/
├── Harbor → /products/harbor/
└── Lume → /products/lume/

Hardware
├── AI Cameras → /hardware/ai-cameras/
├── AI Hubs → /hardware/ai-hubs/
├── Echo Pins → /hardware/echo-pins/
└── Echo Pods → /hardware/echo-pods/

Solutions
├── Retail → /solutions/retail/
├── Luxury Retail → /solutions/luxury-retail/
├── Automotive → /solutions/automotive/
├── Healthcare → /solutions/healthcare/
├── Food & Beverage → /solutions/food-beverage/
├── Real Estate → /solutions/real-estate/
├── Rails & Transit → /solutions/rails-transit/
└── Finance / FBSI → /solutions/finance-fbsi/

Use Cases
├── Loss Prevention → /use-cases/loss-prevention/
├── Compliance Audit → /use-cases/compliance-audit/
├── Customer Intelligence → /use-cases/customer-intelligence/
└── Space Analytics → /use-cases/space-analytics/

Resources
├── Blog → /blog/
├── Guides → /guides/
├── Case Studies → /customers/
├── FAQ → /faq/
└── Glossary → /glossary/

Company
├── About → /company/about/
├── Careers → /company/careers/
├── Press → /company/press/
└── Contact → /company/contact/

Pricing → /pricing/

[Request Demo] → /company/contact/ 或 #footer-contact（首页）
```

### 4.3 推荐 Footer 导航

```
Platform
├── SpaceSight → /products/spacesight/
├── Alivia → /products/alivia/
├── Echo → /products/echo/
├── Harbor → /products/harbor/
└── Lume → /products/lume/

Hardware
├── AI Cameras → /hardware/ai-cameras/
├── AI Hubs → /hardware/ai-hubs/
├── Echo Pins → /hardware/echo-pins/
└── Echo Pods → /hardware/echo-pods/

Solutions
├── Retail → /solutions/retail/
├── Automotive → /solutions/automotive/
├── Healthcare → /solutions/healthcare/
├── Food & Beverage → /solutions/food-beverage/
└── View All → /solutions/

Use Cases
├── Loss Prevention → /use-cases/loss-prevention/
├── Compliance Audit → /use-cases/compliance-audit/
├── Customer Intelligence → /use-cases/customer-intelligence/
└── Space Analytics → /use-cases/space-analytics/

Resources
├── Blog → /blog/
├── Case Studies → /customers/
├── Guides → /guides/
├── FAQ → /faq/
└── Glossary → /glossary/

Company
├── About → /company/about/
├── Careers → /company/careers/
├── Press → /company/press/
├── Contact → /company/contact/
└── Pricing → /pricing/

Legal
├── Privacy Policy → /privacy-policy/
└── Terms of Service → /terms-of-service/
```

### 4.4 面包屑导航

所有非首页页面应添加面包屑导航，并配置 `BreadcrumbList` schema。

**示例**：

```
Home > Products > SpaceSight
Home > Solutions > Retail
Home > Use Cases > Loss Prevention
Home > Resources > Blog > What Is Physical Operations Intelligence?
```

**BreadcrumbList Schema 示例**：

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.whale.sg/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://www.whale.sg/products/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "SpaceSight",
      "item": "https://www.whale.sg/products/spacesight/"
    }
  ]
}
```

---

## 5. 内链策略

### 5.1 内链原则

- **首页**链接到所有核心产品页、主要行业方案页和最新博客
- **产品页**链接到相关用例页、硬件页、行业方案页和对比页
- **行业方案页**链接到相关用例页、产品页、案例研究
- **用例页**链接到相关产品页、行业方案页、对比页
- **博客**链接到相关产品页、方案页、用例页
- **对比页**链接到被对比的 Whale 产品页和相关用例页
- **案例研究**链接到对应行业方案页和产品页

### 5.2 内链密度建议

| 页面类型 | 建议内链数 | 外链/引用 |
|---|---|---|
| 首页 | 15-25 | 2-3（social profiles） |
| 产品页 | 10-15 | 2-3（合作伙伴/认证） |
| 硬件页 | 8-12 | 2-3（技术文档） |
| 行业方案页 | 8-12 | 1-2（行业报告） |
| 用例页 | 6-10 | 1-2（相关标准/法规） |
| 对比页 | 8-12 | 3-5（竞品官网，nofollow 可选） |
| 博客 | 4-8 | 2-4（研究来源） |
| 案例研究 | 6-10 | 1-2（客户官网） |

### 5.3 关键内链矩阵

#### 首页 → 其他页面

| 目标页面 | 锚文本示例 | 优先级 |
|---|---|---|
| `/products/spacesight/` | "AI audit platform SpaceSight" | P0 |
| `/products/alivia/` | "Enterprise AI OS Alivia" | P0 |
| `/solutions/retail/` | "Retail video analytics" | P1 |
| `/solutions/automotive/` | "Automotive showroom intelligence" | P1 |
| `/solutions/healthcare/` | "Healthcare compliance monitoring" | P1 |
| `/use-cases/loss-prevention/` | "Loss prevention AI" | P1 |
| `/customers/` | "Customer stories" | P2 |
| `/blog/` | "Latest insights" | P2 |

#### SpaceSight 产品页 ↔ 相关页面

| 相关页面 | 锚文本示例 | 方向 |
|---|---|---|
| `/use-cases/loss-prevention/` | "Loss prevention" | 双向 |
| `/use-cases/compliance-audit/` | "Compliance audit" | 双向 |
| `/use-cases/customer-intelligence/` | "Customer intelligence" | 双向 |
| `/use-cases/space-analytics/` | "Space analytics" | 双向 |
| `/hardware/ai-cameras/` | "AI cameras" | 双向 |
| `/solutions/retail/` | "Retail solutions" | 双向 |
| `/compare/spacesight-vs-spot-ai/` | "Compare with Spot AI" | 从 SpaceSight 到对比页 |
| `/customers/` | "See customer results" | 从 SpaceSight 到案例 |

#### Alivia 产品页 ↔ 相关页面

| 相关页面 | 锚文本示例 | 方向 |
|---|---|---|
| `/integrations/` | "Enterprise integrations" | 双向 |
| `/use-cases/store-operations/` | "Store operations copilot" | 双向 |
| `/solutions/retail/` | "Retail operations" | 双向 |
| `/blog/what-is-enterprise-ai-operating-system/` | "What is an Enterprise AI OS?" | 从 Alivia 到博客 |
| `/blog/ai-agent-orchestration-store-operations/` | "Agent orchestration for stores" | 从 Alivia 到博客 |
| `/compare/alivia-vs-kore-ai/` | "Compare with Kore.ai" | 从 Alivia 到对比页 |

---

## 6. Sitemap 规划

### 6.1 Sitemap 结构

```
/sitemap-index.xml
├── /sitemap-0.xml          （核心页面）
├── /sitemap-blog.xml       （博客文章）
├── /sitemap-customers.xml  （案例研究）
└── /sitemap-images.xml     （图片资源，可选）
```

### 6.2 `sitemap-0.xml` 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.whale.sg/</loc>
    <lastmod>2026-08-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.whale.sg/products/spacesight/</loc>
    <lastmod>2026-08-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.whale.sg/products/alivia/</loc>
    <lastmod>2026-08-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.whale.sg/solutions/retail/</loc>
    <lastmod>2026-10-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 更多 URL -->
</urlset>
```

### 6.3 Sitemap 优先级建议

| 页面类型 | Priority | Changefreq |
|---|---|---|
| 首页 `/` | 1.0 | weekly |
| 产品页 `/products/*/` | 0.9 | weekly |
| 行业方案页 `/solutions/*/` | 0.8 | monthly |
| 用例页 `/use-cases/*/` | 0.8 | monthly |
| 硬件页 `/hardware/*/` | 0.7 | monthly |
| 对比页 `/compare/*/` | 0.7 | monthly |
| 案例研究 `/customers/*/` | 0.7 | monthly |
| 博客 `/blog/*/` | 0.6 | weekly |
| 指南 `/guides/*/` | 0.7 | monthly |
| 研究报告 `/research/*/` | 0.7 | yearly |
| 公司页 `/company/*/` | 0.5 | monthly |
| 定价页 `/pricing/` | 0.8 | monthly |
| FAQ `/faq/` | 0.6 | monthly |
| 法律页 `/privacy-policy/` | 0.3 | yearly |

### 6.4 Image / Video Sitemap 扩展

对于产品页的视频和 og:image，建议在 sitemap 中添加扩展信息：

```xml
<url>
  <loc>https://www.whale.sg/products/spacesight/</loc>
  <video:video>
    <video:thumbnail_loc>https://www.whale.sg/images/spacesight-video-poster.jpg</video:thumbnail_loc>
    <video:title>SpaceSight AI Audit Platform Demo</video:title>
    <video:description>See how SpaceSight turns existing cameras into an AI audit platform.</video:description>
    <video:content_loc>https://www.whale.sg/videos/spacesight-demo.mp4</video:content_loc>
  </video:video>
  <image:image>
    <image:loc>https://www.whale.sg/images/spacesight-og.jpg</image:loc>
    <image:title>SpaceSight AI Audit Platform</image:title>
  </image:image>
</url>
```

---

## 7. Robots.txt 规划

```
User-agent: *
Allow: /

# AI crawlers guidance
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://www.whale.sg/sitemap-index.xml
```

### 7.1 `llms.txt` 建议

在站点根目录创建 `/llms.txt`，帮助 AI crawler 快速理解站点结构：

```text
# Whale AI

Whale AI is a Physical Operations Intelligence platform that converts cameras, 
voice, and floor activity into real-time AI intelligence for retail, automotive, 
healthcare, food & beverage, real estate, rails & transit, and finance.

## Core Pages
- Home: https://www.whale.sg/
- SpaceSight: https://www.whale.sg/products/spacesight/
- Alivia: https://www.whale.sg/products/alivia/
- Pricing: https://www.whale.sg/pricing/
- Contact: https://www.whale.sg/company/contact/

## Products
- SpaceSight: AI video audit and space analytics platform
- Alivia: Enterprise AI OS for agent orchestration
- Echo: Voice intelligence platform
- Harbor: Content & knowledge operation cloud
- Lume: Content engine platform

## Hardware
- AI Cameras
- AI Hubs
- Echo Pins
- Echo Pods

## Contact
- Website: https://www.whale.sg/
- Email: sales@whale.sg
- Company: WHALE TECH PTE. LTD.
```

---

## 8. Schema 页面映射

| 页面类型 | URL 示例 | Schema 类型 |
|---|---|---|
| 首页 | `/` | Organization、WebSite、SoftwareApplication |
| 产品列表 | `/products/` | CollectionPage、ItemList |
| 产品详情 | `/products/spacesight/` | SoftwareApplication、Offer、FAQPage、BreadcrumbList |
| 硬件详情 | `/hardware/ai-cameras/` | Product、Offer、BreadcrumbList |
| 行业方案 | `/solutions/retail/` | WebPage、BreadcrumbList、FAQPage |
| 用例页 | `/use-cases/loss-prevention/` | WebPage、HowTo、BreadcrumbList |
| 对比页 | `/compare/spacesight-vs-spot-ai/` | WebPage、Table、FAQPage、BreadcrumbList |
| 案例研究 | `/customers/nio-showroom-operations/` | Article、Organization、BreadcrumbList |
| 博客 | `/blog/what-is-physical-operations-intelligence/` | Article、BlogPosting、BreadcrumbList、Person |
| 指南 | `/guides/ai-audit-platform-buyers-guide/` | Article、BreadcrumbList |
| 研究报告 | `/research/state-of-physical-operations-intelligence-2027/` | Article、BreadcrumbList |
| 术语表 | `/glossary/agent-orchestration/` | WebPage、BreadcrumbList、DefinedTerm |
| FAQ | `/faq/` | FAQPage、BreadcrumbList |
| 关于 | `/company/about/` | AboutPage、Organization、BreadcrumbList |
| 联系 | `/company/contact/` | ContactPage、Organization、BreadcrumbList |
| 定价 | `/pricing/` | SoftwareApplication、Offer、BreadcrumbList |

---

## 9. 移动端与性能考虑

- **Header 导航**：在移动端使用汉堡菜单，避免桌面导航换行问题
- **Footer 导航**：移动端可折叠分组，减少滚动长度
- **面包屑**：移动端可截断显示或仅显示上一级
- **图片**：所有图片必须设置 `width`/`height`，使用 WebP 格式，配合 `srcset`
- **脚本**：anime.js / three.js 必须 `defer` 或移到 `</body>` 前
- **字体**：Google Fonts 使用 `display=swap` 或自托管

---

## 10. 实施优先级

### 10.1 P0（立即执行）

1. 修复 header 导航，sub-page 使用真实 URL
2. 修复 Request Demo 锚点至 `#footer-contact` 或 `/company/contact/`
3. 为 `/whale_spacesight/` 设置 301 重定向至 `/products/spacesight/`
4. 为首页、SpaceSight、Alivia 设置独立 og:image
5. 为 SpaceSight / Alivia 添加 SoftwareApplication + Offer schema
6. 为所有产品页添加 BreadcrumbList schema

### 10.2 P1（1-3 个月）

1. 创建 `/products/`、(`/solutions/`)、(`/use-cases/`) 聚合页
2. 上线核心行业方案页（retail、automotive、healthcare）
3. 上线核心用例页（loss prevention、compliance audit）
4. 优化 Alivia H1 与内容
5. 移除内部链接 `target="_blank"`

### 10.3 P2（3-6 个月）

1. 迁移旧站 `.html` 页面并设置 301 重定向
2. 上线硬件页、对比页、FAQ
3. 优化 sitemap（lastmod、priority、image/video 扩展）
4. 创建 `/llms.txt`

### 10.4 P3（6-12 个月）

1. 完善公司页（about、careers、press、contact）
2. 创建博客资源中心架构
3. 创建研究报告与长指南页面
4. 持续监控并优化内链结构

---

## 11. 验证清单

站点结构上线后，使用以下工具验证：

- [ ] Google Search Console：sitemap 提交、索引状态、覆盖率报告
- [ ] Screaming Frog：抓取全站，检查断链、重定向链、重复内容
- [ ] PageSpeed Insights：Core Web Vitals 评分
- [ ] Schema Markup Validator：所有结构化数据验证通过
- [ ] Rich Results Test：关键页面富媒体结果测试
- [ ] Mobile-Friendly Test：移动端可用性
- [ ] 301 重定向测试：确保旧 URL 正确跳转
- [ ] 内链完整性检查：所有页面有合理内链入口

---

## 12. 总结

本站点结构规划为 Whale AI 提供了清晰的 URL 层级、导航架构、内链策略和 sitemap 方案。核心要点：

1. **统一产品目录**：将 SpaceSight 迁移至 `/products/spacesight/`，未来所有产品集中在 `/products/` 下
2. **清晰的行业/用例分离**：`/solutions/` 与 `/use-cases/` 分别承载行业方案与场景用例
3. **修复导航与锚点**：所有页面使用真实 URL，避免 `#` 锚点在 sub-page 失效
4. **完整的面包屑与 Schema**：每个页面都有 BreadcrumbList 和对应结构化数据
5. **旧站平滑迁移**：通过 301 重定向将旧 `.html` 页面权重转移至新站
6. **AI 搜索友好**：通过 `/llms.txt` 和清晰实体结构支持 AI crawler 理解

实施本结构后，Whale AI 将拥有可扩展、搜索引擎友好、用户易于理解的站点架构，为后续内容扩展和 SEO 增长奠定坚实基础。
