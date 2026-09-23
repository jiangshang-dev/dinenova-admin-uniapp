# DineNova Admin UniApp

> 多租户 SaaS 餐饮点餐 · 商家管理端（UniApp）

<p align="center">
  <a href="https://github.com/jiangshang-dev/dinenova-admin-uniapp/stargazers"><img src="https://img.shields.io/github/stars/jiangshang-dev/dinenova-admin-uniapp?style=for-the-badge&logo=github" alt="Stars"/></a>
  <a href="https://github.com/jiangshang-dev/dinenova-admin-uniapp/network/members"><img src="https://img.shields.io/github/forks/jiangshang-dev/dinenova-admin-uniapp?style=for-the-badge" alt="Forks"/></a>
  <img src="https://img.shields.io/badge/UniApp-Vue-2b9939?style=for-the-badge" alt="UniApp"/>
  <img src="https://img.shields.io/badge/SaaS-B%E7%AB%AF-purple?style=for-the-badge" alt="SaaS"/>
  <img src="https://img.shields.io/badge/Merchant-App-orange?style=for-the-badge" alt="Merchant"/>
</p>

<p align="center">
  <a href="https://github.com/jiangshang-dev/dinenova">后端 API</a> ·
  <a href="https://github.com/jiangshang-dev/dinenova-views">PC 管理后台</a> ·
  <a href="https://github.com/jiangshang-dev/dinenova-uniapp">顾客端 UniApp</a> ·
  <b>商家管理端（本仓库）</b>
</p>

---

## ⭐ 开源约定（请先读）

本仓库遵循开源精神，代码可自由学习与二次开发。

同时请遵守一条**君子协议**：

> **请先给本仓库点一个 Star，再执行 Clone。**  
> 未 Star 禁止 Clone（开源江湖规矩，不做技术校验，全靠人品）。

点 Star 是对作者最大的鼓励。建议四个仓库一起点：

| 仓库 | 说明 | Star |
|------|------|------|
| [dinenova](https://github.com/jiangshang-dev/dinenova) | 后端 API | [![Star](https://img.shields.io/github/stars/jiangshang-dev/dinenova?style=social)](https://github.com/jiangshang-dev/dinenova) |
| [dinenova-views](https://github.com/jiangshang-dev/dinenova-views) | PC 管理后台 | [![Star](https://img.shields.io/github/stars/jiangshang-dev/dinenova-views?style=social)](https://github.com/jiangshang-dev/dinenova-views) |
| [dinenova-uniapp](https://github.com/jiangshang-dev/dinenova-uniapp) | 顾客点餐端 | [![Star](https://img.shields.io/github/stars/jiangshang-dev/dinenova-uniapp?style=social)](https://github.com/jiangshang-dev/dinenova-uniapp) |
| [dinenova-admin-uniapp](https://github.com/jiangshang-dev/dinenova-admin-uniapp) | 商家管理端（本仓库） | [![Star](https://img.shields.io/github/stars/jiangshang-dev/dinenova-admin-uniapp?style=social)](https://github.com/jiangshang-dev/dinenova-admin-uniapp) |

```bash
# 正确姿势：浏览器点亮 Star → 再拉代码
git clone https://github.com/jiangshang-dev/dinenova-admin-uniapp.git
```

---

## 项目简介

本仓库是 **DineNova SaaS 点餐系统** 的 **商家 / 店员移动管理端**：随时看看板、接单处理、管会员与营销。与 PC 后台共用同一套后端 API，适合店长、收银、服务员在手机上完成日常运营。

### 技术栈

| 项 | 说明 |
|----|------|
| 框架 | UniApp · Vue |
| 状态 | Vuex |
| 后端 | 与 PC 后台同一 [dinenova](https://github.com/jiangshang-dev/dinenova) 服务 |

### 功能概览

- **数据看板** · **工作台**  
- **订单**：列表 / 详情 / 售后 / 结算 / 交易设置  
- **会员**：列表、详情、分组  
- **菜品 / 优惠券 / 积分 / 余额** 等运营能力（以 `pages` 目录为准）  
- **登录 / 注册 / 我的**  

---

## 快速开始

### 环境要求

- [HBuilderX](https://www.dcloud.io/hbuilderx.html)（推荐）或 UniApp CLI  
- 已启动后端 [dinenova](https://github.com/jiangshang-dev/dinenova)（默认 `8082`）  
- 后台已存在可用的商户账号（与 PC 端同一套账号体系）

### 1. 配置 API

编辑根目录 `config.js`：

```js
module.exports = {
  baseUrl: 'http://127.0.0.1:8082/',  // 与 PC 后台同一后端，斜杠结尾
  appInfo: {
    name: '仁信管理端',
    version: '1.0.0',
    logo: '/static/logo.png'
    // …
  }
}
```

真机调试请改为局域网 IP 或 HTTPS 域名，并配置微信合法域名（若发小程序）。

### 2. 运行

1. 用 HBuilderX 打开本工程  
2. 运行到浏览器 / 微信开发者工具 / 真机  
3. 使用平台或商户后台账号登录  

---

## 与 SaaS 体系的关系

```
顾客 UniApp  ──merchantNo──►  dinenova API  ◄──账号登录──  商家 Admin UniApp
                                      ▲
                                      │
                               PC Views 管理后台
```

- **平台**：开商户、配权限  
- **商家端（本仓库）**：移动办公，处理本商户订单与会员  
- **顾客端**：按 `merchantNo` 点餐  

---

## 关联仓库

- 后端：[dinenova](https://github.com/jiangshang-dev/dinenova)  
- PC 后台：[dinenova-views](https://github.com/jiangshang-dev/dinenova-views)  
- 顾客端：[dinenova-uniapp](https://github.com/jiangshang-dev/dinenova-uniapp)  

---

## License

以仓库内 `LICENSE` 为准。  
觉得有用请 **Star**，未 Star 请勿 Clone —— 谢谢！

<p align="center">
  <sub>Part of <a href="https://github.com/jiangshang-dev/dinenova">DineNova</a> · by <a href="https://github.com/jiangshang-dev">jiangshang-dev</a></sub>
</p>
