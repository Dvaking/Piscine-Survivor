CREATE TABLE payments_history (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    payment_method TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    comment TEXT
);
