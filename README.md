# IQ Test - 流体智力测试

基于 Raven's Progressive Matrices (RPM) 的抽象推理测试

## 功能

- 🧠 流体智力测试（12道矩阵推理题）
- 📊 IQ 计算（标准差15）
- 🏆 排行榜
- 👤 用户名保存

## 部署

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
cd iq-test
vercel

# 4. 绑定数据库（可选）
# 使用 PlanetScale 或 TiDB Cloud 免费 MySQL
```

## 数据库配置

需要设置环境变量：
- `DATABASE_URL` - MySQL 连接字符串

## 免费 MySQL 推荐

1. **PlanetScale** (推荐)
   - 免费额度：10GB 存储
   - https://planetscale.com/

2. **TiDB Cloud**
   - 免费额度：500MB 存储
   - https://tidb.cloud/

3. **Supabase** (PostgreSQL)
   - 免费额度：500MB
   - https://supabase.com/