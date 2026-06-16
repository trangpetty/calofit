-- 1. Bảng Users
CREATE TABLE users (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   email VARCHAR(255) NOT NULL UNIQUE,
   password_hash VARCHAR(255), -- Có thể null nếu đăng nhập bằng Google
   display_name VARCHAR(100),
   avatar_url VARCHAR(500),
   gender VARCHAR(20),
   birth_date DATE,
   height_cm DECIMAL(5,2),
   weight_kg DECIMAL(5,2),
   activity_level VARCHAR(50),
   role VARCHAR(20) DEFAULT 'USER',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Bảng Subscriptions (Quản lý gói Free/Premium)
CREATE TABLE subscriptions (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   user_id BIGINT NOT NULL,
   plan_type VARCHAR(50) DEFAULT 'FREE', -- FREE hoặc PREMIUM
   status VARCHAR(50) DEFAULT 'ACTIVE',  -- ACTIVE, EXPIRED, CANCELLED
   start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   end_date TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Bảng Meals (Lưu trữ bữa ăn & Macro)
CREATE TABLE meals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL, -- Tên món (VD: Cơm gà)
    image_url VARCHAR(500),     -- Link ảnh để AI nhận diện
    calories INT NOT NULL,
    protein_g DECIMAL(6,2) DEFAULT 0,
    carbs_g DECIMAL(6,2) DEFAULT 0,
    fat_g DECIMAL(6,2) DEFAULT 0,
    meal_type VARCHAR(50),      -- BREAKFAST, LUNCH, DINNER, SNACK
    logged_date DATE NOT NULL,  -- Ngày ăn (tách biệt với ngày tạo bản ghi)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Bảng Workouts (Lưu trữ lịch tập)
CREATE TABLE workouts (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT NOT NULL,
      name VARCHAR(255) NOT NULL,      -- VD: "Tập Ngực - Lưng"
      workout_type VARCHAR(50),        -- STRENGTH, CARDIO, YOGA
      calories_burned INT DEFAULT 0,
      duration_minutes INT,
      workout_data JSON,               -- LƯU TOÀN BỘ SỐ HIỆP, SỐ TẠ VÀO ĐÂY THEO DẠNG ARRAY
      logged_date DATE NOT NULL,       -- Ngày tập
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Bảng lưu thông tin chi tiết của PT (Chỉ tạo bản ghi khi user_id có role = 'PT')
CREATE TABLE pt_profiles (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     user_id BIGINT NOT NULL UNIQUE,
     bio TEXT,                           -- Giới thiệu bản thân
     experience_years INT,               -- Số năm kinh nghiệm
     certificates JSON,                  -- Lưu danh sách link ảnh bằng cấp dạng Array
     price_per_month DECIMAL(12,2),      -- Giá tiền thuê theo tháng
     is_verified BOOLEAN DEFAULT FALSE,  -- Admin duyệt bằng cấp thật thì mới hiện lên app
     wallet_balance DECIMAL(12,2) DEFAULT 0; -- Số dư tiền PT kiếm được
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Bảng liên kết giữa Học viên và PT (Quan hệ Active Subscription giữa 2 người)
CREATE TABLE pt_students (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     pt_id BIGINT NOT NULL,              -- ID của user làm PT
     student_id BIGINT NOT NULL,         -- ID của user làm Học viên
     status VARCHAR(50) DEFAULT 'ACTIVE',-- ACTIVE, ENDED
     start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     end_date TIMESTAMP,
     FOREIGN KEY (pt_id) REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Bảng lưu tin nhắn Chat (Dành cho tính năng Real-time Messenger)
CREATE TABLE chat_messages (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   sender_id BIGINT NOT NULL,          -- Người gửi (có thể là PT hoặc Học viên)
   receiver_id BIGINT NOT NULL,        -- Người nhận
   message_text TEXT NOT NULL,         -- Nội dung tin nhắn
   is_read BOOLEAN DEFAULT FALSE,      -- Trạng thái đã đọc hay chưa
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Bảng transaction
CREATE TABLE transactions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

-- Ai trả tiền? (VD: User mua gói Premium hoặc User trả tiền thuê PT)
  user_id BIGINT NOT NULL,

-- Ai nhận tiền? (Null nếu tiền chạy thẳng vào túi hệ thống của bạn, có ID nếu tiền trả cho PT)
  pt_id BIGINT,

-- Loại giao dịch
  transaction_type VARCHAR(50) NOT NULL, -- 'BUY_PREMIUM', 'HIRE_PT', 'PT_WITHDRAW'

-- Xử lý dòng tiền (Cốt lõi kinh doanh)
  gross_amount DECIMAL(12,2) NOT NULL,   -- Tổng số tiền User thanh toán (VD: 1.000.000)
  platform_fee DECIMAL(12,2) DEFAULT 0,  -- Phần trăm nền tảng cắt lại (VD: 200.000)
  net_amount DECIMAL(12,2) NOT NULL,     -- Số tiền PT thực nhận (VD: 800.000)

-- Trạng thái thanh toán
  status VARCHAR(20) DEFAULT 'PENDING',  -- 'PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'
  payment_gateway VARCHAR(50),           -- 'VNPAY', 'MOMO', 'STRIPE'
  transaction_reference VARCHAR(100),    -- Mã giao dịch trả về từ ngân hàng để đối soát

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pt_id) REFERENCES users(id)
);
