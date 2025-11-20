CREATE DATABASE lms;

USE lms;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loan_types (
    loan_type_id INT AUTO_INCREMENT PRIMARY KEY,
    loan_name VARCHAR(100) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    description TEXT
);

CREATE TABLE loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    loan_type_id INT,
    principal_amount DECIMAL(12,2) NOT NULL,
    interest_rate DECIMAL(5,2),
    tenure_months INT NOT NULL,
    start_date DATE,
    end_date DATE,
    status ENUM('Pending','Approved','Rejected','Active','Completed') DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (loan_type_id) REFERENCES loan_types(loan_type_id)
);


CREATE TABLE loan_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT NOT NULL,
    due_date DATE NOT NULL,
    amount_due DECIMAL(12,2) NOT NULL,
    amount_paid DECIMAL(12,2),
    payment_date DATE,
    status ENUM('Pending','Paid','Overdue') DEFAULT 'Pending',

    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
);


CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id INT NOT NULL,
    mode ENUM('UPI','NetBanking','Cash','Card') NOT NULL,
    reference_no VARCHAR(120),
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (payment_id) REFERENCES loan_payments(payment_id)
);

CREATE TABLE admin_users (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','clerk') DEFAULT 'manager'
);

-- INSERT LOAN TYPES (ALL MERGED TOGETHER)
INSERT INTO loan_types (loan_name, interest_rate, description) VALUES
('Home Loan', 9.50, 'Loan for buying or constructing house'),
('Education Loan', 11.25, 'Loan for higher studies'),
('Personal Loan', 14.75, 'Loan for personal use and emergency funds'),
('Vehicle Loan', 10.20, 'Loan for two wheeler or four wheeler purchase'),
('Gold Loan', 8.75, 'Loan against gold ornaments'),
('Agriculture Loan', 7.50, 'Loan for farming and agricultural development'),
('Medical Emergency Loan', 13.40, 'Loan for urgent hospitalization and medical treatment'),
('Startup Loan', 18.00, 'Funding support for new business startups'),
('Travel Loan', 12.25, 'Loan to cover vacation and travel expenses'),
('Renovation Loan', 10.80, 'Loan for home renovation and interior remodeling'),
('Laptop & Gadget Loan', 15.60, 'Loan for purchasing gadgets or laptop for students or professionals');

------------------------------------------

-- INSERT USERS (ALL MERGED)
INSERT INTO users (full_name, email, password, phone, address) VALUES
('Rahul Sharma', 'rahul@gmail.com', 'rahul123', '9876543210', 'Pune, Maharashtra'),
('Priya Verma', 'priya@gmail.com', 'priya123', '9898989898', 'Mumbai, Maharashtra'),
('Amit Singh', 'amit@gmail.com', 'amit123', '9123456789', 'Nagpur, Maharashtra'),
('Karan Malhotra', 'karan.m@gmail.com', 'karan321', '9811122233', 'Thane, Maharashtra'),
('Rohan Kulkarni', 'rohan.k@gmail.com', 'rohan890', '9877001122', 'Kolhapur, Maharashtra'),
('Deepika Rao', 'deepika.rao@gmail.com', 'deepika777', '9001234567', 'Hyderabad, Telangana'),
('Manish Deshmukh', 'manish.d@gmail.com', 'manish111', '9922110033', 'Bhopal, Madhya Pradesh'),
('Neha Gupta', 'neha.g@gmail.com', 'neha987', '9911445577', 'Indore, Madhya Pradesh'),
('Arjun Mehta', 'arjun.m@gmail.com', 'arjun555', '9099887766', 'Surat, Gujarat'),
('Sonal Kapoor', 'sonal.k@gmail.com', 'sonal444', '9008007006', 'Delhi, India');

------------------------------------------

-- INSERT LOANS (ALL MERGED)
INSERT INTO loans (user_id, loan_type_id, principal_amount, interest_rate, tenure_months, start_date, end_date, status) VALUES
(1, 1, 1200000.00, 9.50, 120, '2025-01-01', '2035-01-01', 'Approved'),
(2, 3, 300000.00, 14.75, 36, '2025-02-15', '2028-02-15', 'Pending'),
(3, 4, 800000.00, 10.20, 60, '2025-03-10', '2030-03-10', 'Active'),
(4, 1, 1600000.00, 9.80, 180, '2025-05-01', '2040-05-01', 'Approved'),
(5, 2, 550000.00, 11.00, 60, '2025-04-05', '2030-04-05', 'Active'),
(6, 3, 250000.00, 15.25, 24, '2025-03-15', '2027-03-15', 'Pending'),
(7, 5, 2000000.00, 16.50, 96, '2025-06-01', '2033-06-01', 'Rejected'),
(8, 4, 650000.00, 10.50, 48, '2025-02-20', '2029-02-20', 'Approved'),
(9, 3, 350000.00, 14.20, 36, '2025-03-25', '2028-03-25', 'Active'),
(10, 1, 950000.00, 9.25, 84, '2025-01-05', '2032-01-05', 'Approved');

------------------------------------------

-- INSERT LOAN PAYMENTS
INSERT INTO loan_payments (loan_id, due_date, amount_due, amount_paid, payment_date, status) VALUES
(1, '2025-02-01', 15000.00, 15000.00, '2025-02-01', 'Paid'),
(1, '2025-03-01', 15000.00, NULL, NULL, 'Pending'),
(3, '2025-04-10', 18000.00, 18000.00, '2025-04-10', 'Paid'),
(4, '2025-06-01', 19000.00, 19000.00, '2025-06-01', 'Paid'),
(5, '2025-05-05', 10000.00, NULL, NULL, 'Pending'),
(6, '2025-04-15', 15000.00, 15000.00, '2025-04-15', 'Paid'),
(7, '2025-07-01', 26000.00, NULL, NULL, 'Pending'),
(8, '2025-03-20', 14000.00, 14000.00, '2025-03-20', 'Paid'),
(9, '2025-04-25', 12500.00, NULL, NULL, 'Overdue'),
(10, '2025-02-05', 13500.00, 13500.00, '2025-02-05', 'Paid');

------------------------------------------

-- INSERT TRANSACTIONS (MERGED)
INSERT INTO transactions (payment_id, mode, reference_no) VALUES
(1, 'UPI', 'TXN987654ABC'),
(3, 'NetBanking', 'TXN123456XYZ'),
(4, 'UPI', 'UPI11223999'),
(5, 'NetBanking', 'NB554433221'),
(6, 'Card', 'CARD765433'),
(7, 'UPI', 'UPI88776655'),
(8, 'Cash', 'CASH990011'),
(9, 'NetBanking', 'NB1200456'),
(10, 'UPI', 'UPI55667788');

------------------------------------------

-- INSERT ADMIN USERS (MERGED)
INSERT INTO admin_users (name, email, password, role) VALUES
('Admin One', 'admin@gmail.com', 'admin123', 'admin'),
('Loan Manager', 'manager@gmail.com', 'manager123', 'manager'),
('Rakesh Kumar', 'rakesh.admin@gmail.com', 'rakesh222', 'manager'),
('Jyoti Nair', 'jyoti.clerk@gmail.com', 'jyoti666', 'clerk');


