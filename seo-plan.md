# Whale 站点 SEO 规划

> 规划日期：2026-08-12  
> 站点域名：https://www.whale.sg  
> 技术栈：Astro 静态站点

---

## 1. 站点现状

### 已具备
- Astro 静态输出 + 自动 sitemap
- `robots.txt` 允许全站
- 首页 H1、title、description 完整
- 使用 Organization + WebSite JSON-LD

### 关键问题
- `/whale_spacesight/`、`/alivia/` 曾未传 `canonical`，默认指向首页 URL，**已修复**
- ogImage 全站共用一张外部图，建议分页面设置
- 站点只有 3 个页面，内容深度不足以覆盖搜索意图
- 外链行业页（Real Estate / Retail / Auto 等）都在 `whale.sg` 旧站，未纳入当前站内部链接体系
- 首页 hero 加载 anime.js + three.js，可能阻塞 LCP

---

## 2. 核心页面 SEO 标签（已更新）

| 页面 | Title | 长度 | Description | 长度 | Canonical |
|---|---|---|---|---|---|
| 首页 `/` | Whale AI \| Physical Operations Intelligence Platform | 51 | Whale converts cameras, voice, and floor activity into real-time intelligence for retail, automotive, healthcare, and transit. Request a demo. | 154 | `https://www.whale.sg/` |
| SpaceSight `/whale_spacesight/` | Whale SpaceSight \| AI Audit Platform for Retail & Facilities | 60 | SpaceSight turns existing cameras into an edge AI audit platform. Automate compliance, loss prevention, and customer analytics across every location. | 158 | `https://www.whale.sg/whale_spacesight/` |
| Alivia `/alivia/` | Whale Alivia \| Enterprise AI OS for Agent Orchestration | 56 | Alivia is Whale’s enterprise AI OS for model orchestration, intelligent execution, and role-based AI co-pilots across every workflow. | 144 | `https://www.whale.sg/alivia/` |

---

## 3. 关键词策略

### 核心主题

| 主题 | 英文表达 |
|---|---|
| 物理运营智能 | Physical Operations Intelligence |
| AI 视频审计 | AI Audit Platform / Automated Compliance Audit |
| 零售视频分析 | Retail Video Analytics / Footfall / Dwell Time |
| 边缘 AI 摄像头 | Edge AI Camera / AI Hub |
| 企业 AI 操作系统 | Enterprise AI OS / Agent Orchestration |
| 门店运营优化 | Store Operations / Loss Prevention / Space Analytics |

### 关键词地图

| 页面 | 主关键词 | 次关键词 | 搜索意图 |
|---|---|---|---|
| `/` | physical operations intelligence | AI operations platform, real-time intelligence, enterprise AI | 品牌 + 解决方案 |
| `/whale_spacesight/` | AI audit platform | video audit AI, retail compliance audit, edge AI camera, SpaceSight | 产品 + 功能 |
| `/alivia/` | enterprise AI operating system | AI agent orchestration, model orchestration, Alivia AIOS | 产品 + 概念 |

---

## 4. 内容扩展计划

### 产品页
- `/products/echo/` — Voice Intelligence Platform / enterprise voice analytics
- `/products/harbor/` — Content & Knowledge Operation Cloud / DAM AI
- `/products/lume/` — Content Engine Platform / AI campaign creation
- `/hardware/ai-cameras/`、 `/hardware/ai-hubs/`、 `/hardware/echo-pins/`、 `/hardware/echo-pods/`

### 行业方案页
- `/solutions/retail/` — retail video analytics, store operations
- `/solutions/automotive/` — showroom audit, automotive customer intelligence
- `/solutions/healthcare/` — healthcare compliance monitoring
- `/solutions/food-beverage/`、 `/solutions/luxury-retail/`、 `/solutions/rails-transit/`

### 场景 / 用例页
- `/use-cases/loss-prevention/`
- `/use-cases/compliance-audit/`
- `/use-cases/customer-intelligence/`
- `/use-cases/space-analytics/`

### 博客内容（关键词集群）
- "AI Audit Platform vs Traditional CCTV: 20× Efficiency Comparison"
- "Retail Video Analytics ROI: Footfall, Dwell Time & Conversion"
- "Edge AI Camera vs Cloud AI: Latency, Privacy & Cost"
- "What Is an Enterprise AI Operating System?"
- "AI Agent Orchestration for Store Operations"

---

## 5. 技术 SEO 建议

- **修复 canonical**：每个页面传入正确 `canonical`，如 `https://www.whale.sg/whale_spacesight/`（已完成）
- **分页面 ogImage**：SpaceSight / Alivia 各自准备 1200×630 封面图
- **Schema 增强**
  - 首页保留 Organization + WebSite
  - SpaceSight / Alivia 增加 `SoftwareApplication` + `Offer` schema
  - 新增页面增加 `BreadcrumbList`
- **性能**
  - anime.js / three.js 移到 body 末尾或加 `defer`
  - 为 hero 视频 / poster 加 `preload` 或 `fetchpriority`
  - 外部 OSS 图片确认有 `width/height` 避免 CLS
- **内链**
  - 导航 Products 下拉改为真实产品页链接，而非仅 `#products` 锚点
  - 案例区 NIO / Watsons / Unilever 增加对应行业方案页内链
  - Footer Solutions 链接改为当前站内部行业页（若旧站内容不迁移则先保留外部并标注）

---

## 6. 执行优先级

| 优先级 | 事项 | 预计影响 |
|---|---|---|
| P0 | 修复所有页面 canonical 与 ogImage | 高，避免权重分散 |
| P0 | 重写三个核心页面的 title / description | 高，直接影响 CTR（已完成） |
| P1 | 新增 `/solutions/retail/`、`/solutions/automotive/`、`/use-cases/loss-prevention/` | 高，覆盖高价值商业词 |
| P1 | 新增产品页 Echo / Harbor / Lume | 中，减少关键词空白 |
| P2 | 博客集群每月 2-4 篇 | 中，长尾流量 |
| P2 | 添加 SoftwareApplication schema | 中，富媒体展示 |
| P3 | 性能优化、图片 CLS、脚本 defer | 中，Core Web Vitals |

---

## 7. 关键指标追踪

- 自然搜索流量（按页面）
- 目标关键词排名（首页 Top 10 数量）
- 平均 CTR（Search Console）
- LCP / INP / CLS
- demo / contact 转化率

---

## 参考来源

- [ifactory AI Vision Cameras for Smart Retail](https://ifactoryapp.com/ai-vision-camera/ai-vision-cameras-smart-retail-inventories-shelf-monitoring)
- [Spot AI — AI Cameras for Retail](https://www.spot.ai/blog/ai-cameras-retail-2025-guide)
- [Agrex AI — Retail Video Analytics](https://www.agrexai.com/retail-video-analytics/)
- [AEyeTech — AI Video Analytics for Retail](https://aeyetechlabs.com/retail)
- [Visionplatform.ai — AI Video Analytics for Retail](https://visionplatform.ai/ai-video-analytics-for-retail/)
- [Tencent Cloud — What Is an Agent Operating System](https://www.tencentcloud.com/techpedia/145936?lang=en)
- [Kore.ai — Multi-Agent Orchestration](https://www.kore.ai/blog/what-is-multi-agent-orchestration)
- [Salesforce — AI Agent Orchestration](https://www.salesforce.com/agentforce/ai-agents/ai-agent-orchestration/)
