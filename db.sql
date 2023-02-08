-- Active: 1675790193375@@pijardb-do-user-13063919-0.b.db.ondigitalocean.com@25060@crud-rizky@public
CREATE TABLE users(
    id VARCHAR(200) PRIMARY KEY NOT NULL,
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE products(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    sellprice VARCHAR NOT NULL,
    buyprice VARCHAR NOT NULL,
    stock VARCHAR NOT NULL,
    id_users VARCHAR,
    photo VARCHAR
);