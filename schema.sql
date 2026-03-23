-- IQ Test 数据库 Schema
-- 适用于 MySQL (PlanetScale/TiDB Cloud)

CREATE DATABASE IF NOT EXISTS iq_test;
USE iq_test;

CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    iq INT NOT NULL,
    time_used INT DEFAULT 0,
    correct INT DEFAULT 0,
    age INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_iq (iq DESC),
    INDEX idx_name (name)
);