use project3;
-- INSERT INTO transactions (transaction_type,coin,quantity,purchaseDate,sellDate,createdAt,updatedAt,UserId) VALUES ('buy','btc', 8, '12-25-2019', null, NOW(),NOW(),2);
-- INSERT INTO transactions (transaction_type,coin,quantity,purchaseDate,sellDate,createdAt,updatedAt,UserId) VALUES ('buy','eth', 22,'10-11-2018', null, NOW(),NOW(),2);
-- INSERT INTO transactions (transaction_type,coin,quantity,purchaseDate,sellDate, createdAt,updatedAt,UserId) VALUES ('buy','ltc', 96,'05-12-2019', null,NOW(),NOW(),2);

INSERT INTO transactions (transaction_type,coin,name,quantity,purchaseDate,sellDate, createdAt,updatedAt,UserId) VALUES ('buy','btc','Bitcoin', 0.54, 1547272800000, null,NOW(),NOW(),2);
INSERT INTO transactions (transaction_type,coin,name,quantity,purchaseDate,sellDate, createdAt,updatedAt,UserId) VALUES ('buy','btc', 'Bitcoin',1.34, 1552608000, null,NOW(),NOW(),2);
INSERT INTO transactions (transaction_type,coin,name,quantity,purchaseDate,sellDate, createdAt,updatedAt,UserId) VALUES ('buy','btc', 'Bitcoin',0.14, 1579719931, null,NOW(),NOW(),2);
INSERT INTO transactions (transaction_type,coin,name,quantity,purchaseDate,sellDate, createdAt,updatedAt,UserId) VALUES ('buy','eth', 'Bitcoin',300.54, 1579719931, null,NOW(),NOW(),2);
