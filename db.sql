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
    sellprice INT NOT NULL,
    buyprice INT NOT NULL,
    stock INT NOT NULL,
    id_users VARCHAR,
    photo VARCHAR
);

SELECT products.id, products.name,products.sellprice,products.buyprice,products.stock,products.photo FROM products as products
        WHERE products.name ILIKE ('%%') AND products.id_users = '5f08fa6f-266e-4b50-9e38-491c1d290466' ORDER BY products.id