/**
 * IQ Test API - Vercel Serverless
 * 数据库: MySQL (PlanetScale/TiDB Cloud)
 */

import mysql from 'mysql2/promise';

// 数据库连接池
let pool;

function getPool() {
  if (!pool && process.env.DATABASE_URL) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

// CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  const { pathname } = new URL(req.url, `https://${req.headers.host}`);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  try {
    // 提交成绩 POST /api/submit
    if (pathname === '/api/submit' && req.method === 'POST') {
      const { name, iq, time, correct, age } = JSON.parse(req.body);
      
      const db = getPool();
      if (!db) {
        // 无数据库时返回成功（离线模式）
        return res.status(200).set(corsHeaders).json({ success: true, offline: true });
      }

      await db.execute(
        'INSERT INTO results (name, iq, time_used, correct, age) VALUES (?, ?, ?, ?, ?)',
        [name, iq, time, correct, age || null]
      );

      return res.status(200).set(corsHeaders).json({ success: true });
    }

    // 排行榜 GET /api/leaderboard
    if (pathname === '/api/leaderboard' && req.method === 'GET') {
      const db = getPool();
      if (!db) {
        return res.status(200).set(corsHeaders).json([]);
      }

      const [rows] = await db.execute(
        'SELECT name, iq, correct, age, created_at FROM results ORDER BY iq DESC LIMIT 50'
      );

      return res.status(200).set(corsHeaders).json(rows);
    }

    // 获取用户历史成绩 GET /api/history?name=xxx
    if (pathname === '/api/history' && req.method === 'GET') {
      const db = getPool();
      const name = new URL(req.url, `https://${req.headers.host}`).searchParams.get('name');
      
      if (!db || !name) {
        return res.status(200).set(corsHeaders).json([]);
      }

      const [rows] = await db.execute(
        'SELECT iq, correct, age, created_at FROM results WHERE name = ? ORDER BY created_at DESC LIMIT 10',
        [name]
      );

      return res.status(200).set(corsHeaders).json(rows);
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (e) {
    console.error(e);
    return res.status(500).set(corsHeaders).json({ error: e.message });
  }
}