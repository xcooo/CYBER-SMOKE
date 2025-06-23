# 🧪 虚拟赛博吸烟模拟器 · Cyber Smoke Simulator

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Vue 2](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![UniApp](https://img.shields.io/badge/UniApp-H5%20%7C%20小程序%20%7C%20APP-orange.svg)](https://uniapp.dcloud.io/)

> 一个高拟真度的虚拟香烟体验页面，支持香烟燃烧、烟雾扩散、火星飞溅等多种交互效果。纯娱乐用途，**拒绝真实吸烟行为**！

---

## 功能特性

### 🚬 核心功能
- **香烟燃烧效果**: 香烟慢慢燃烧，长度逐渐变短
- **火光动画**: 逼真的火焰效果，包含多层火焰和闪烁动画
- **火星粒子**: 燃烧时产生的小火星粒子效果
- **烟雾系统**: 高级Canvas粒子系统，实现逼真的烟雾飘散效果

### 🎮 交互功能
- **手势控制**: 通过触摸屏幕控制烟雾飘散方向
- **点击点燃**: 点击按钮点燃香烟
- **吸一口**: 点击按钮触发吸一口动画，产生大量烟雾
- **震动反馈**: 操作时提供触觉反馈
- **音效系统**: 完整的音效支持（点燃、吸一口、熄灭、火星）

### ⚙️ 设置面板
- **燃烧速度调节**: 可调整香烟燃烧速度
- **烟雾强度控制**: 调节烟雾产生强度
- **火星数量设置**: 调整火星粒子数量
- **音效开关**: 控制音效播放

## 技术实现

### 核心技术栈
- **Vue2**: 前端框架
- **UniApp**: 跨平台开发框架
- **Canvas**: 烟雾粒子渲染
- **CSS3**: 动画效果

### 兼容性
- ✅ H5 (Web浏览器)
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 头条小程序
- ✅ App (iOS/Android)

### 文件结构
```
pages/tabBar/home.vue          # 主页面
utils/smokeParticleSystem.js   # 烟雾粒子系统
utils/audioManager.js          # 音效管理器
static/sounds/                 # 音效文件目录
```

## 使用方法

### 1. 基本操作
1. 打开页面，点击"点燃"按钮开始体验
2. 触摸屏幕并拖动手指控制烟雾方向
3. 点击"吸一口"按钮触发吸一口动画
4. 点击"重置"按钮重新开始

### 2. 设置调节
1. 点击右上角"⚙️ 设置"按钮打开设置面板
2. 调节燃烧速度滑块控制燃烧快慢
3. 调节烟雾强度滑块控制烟雾浓度
4. 调节火星数量滑块控制火星密度
5. 点击音效按钮开关音效

### 3. 手势控制
- **触摸拖动**: 控制烟雾飘散方向
- **长按**: 持续控制烟雾方向
- **快速拖动**: 产生更强的风向效果

## 音效文件

需要在 `static/sounds/` 目录下放置以下音效文件：
- `ignite.mp3` - 点燃音效
- `puff.mp3` - 吸一口音效
- `extinguish.mp3` - 熄灭音效
- `spark.mp3` - 火星音效

## 性能优化

### Canvas优化
- 使用 `requestAnimationFrame` 进行动画循环
- 粒子生命周期管理，自动清理过期粒子
- 限制最大粒子数量，避免性能问题

### 内存管理
- 组件销毁时自动清理定时器和动画
- 音效资源自动释放
- 粒子系统自动停止

### 兼容性处理
- 使用条件编译处理不同平台差异
- Canvas API 统一封装
- 音效播放兼容不同平台

## 自定义配置

### 烟雾粒子系统配置
```javascript
const smokeSystem = new SmokeParticleSystem('canvasId', {
  maxParticles: 150,           // 最大粒子数量
  particleSize: { min: 8, max: 30 },  // 粒子大小范围
  particleLife: { min: 3000, max: 6000 },  // 粒子生命周期
  particleSpeed: { min: 0.8, max: 3 },  // 粒子速度范围
  particleAlpha: { min: 0.2, max: 0.7 },  // 透明度范围
  turbulence: 0.15,           // 湍流强度
  gravity: -0.08              // 重力效果
})
```

### 燃烧配置
```javascript
config: {
  burnSpeed: 0.5,        // 燃烧速度 (%/秒)
  sparkCount: 8,         // 火星数量
  smokeIntensity: 50,    // 烟雾强度
  puffIntensity: 20      // 吸一口增加的烟雾强度
}
```

## 注意事项

1. **音效文件**: 确保音效文件存在且格式正确
2. **性能**: 在低端设备上可能需要降低粒子数量
3. **权限**: 小程序可能需要申请震动权限
4. **兼容性**: 不同平台的Canvas表现可能略有差异

## 扩展功能

### 可以添加的功能
- 多种香烟类型选择
- 烟雾颜色自定义
- 背景音乐
- 成就系统
- 数据统计
- 社交分享

### 技术扩展
- WebGL 渲染提升性能
- 3D 效果增强
- 物理引擎集成
- AI 烟雾行为模拟

## 许可证

本项目仅供学习和娱乐使用，请勿用于商业用途。

## ☕ 赞助支持
如果你喜欢这个项目，欢迎通过以下方式打赏支持：

<table align="center">
  <tr>
    <td align="center">
      <img src="./static/donate-wechat.jpg" width="180" height="180" />
    </td>
    <td style="width: 40px;"></td> <!-- 间距 -->
    <td align="center">
      <img src="./static/donate-alipay.jpg" width="180" height="180" />
    </td>
  </tr>
  <tr>
    <td align="center"><strong>微信扫码打赏</strong></td>
    <td></td>
    <td align="center"><strong>支付宝扫码打赏</strong></td>
  </tr>
</table>




## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

---

**免责声明**: 本应用仅为虚拟体验，不鼓励真实吸烟行为。吸烟有害健康，请远离烟草。 
