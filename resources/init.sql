CREATE TABLE conference(
   id serial PRIMARY KEY,
   name VARCHAR (100) NOT NULL,
   room VARCHAR (100) NOT NULL
);

INSERT INTO conference (name, room) VALUES ('Cobol', 'Past');
INSERT INTO conference (name, room) VALUES ('Java', 'Present');
INSERT INTO conference (name, room) VALUES ('Node.js', 'Future');

CREATE TABLE confi_user(
   id serial PRIMARY KEY,
   firstname VARCHAR (200) NOT NULL,
   lastname VARCHAR (200) NOT NULL,
   email VARCHAR(254) UNIQUE NOT NULL,
   phonenumber TEXT NOT NULL
);

CREATE TABLE booking(
   id serial PRIMARY KEY,
   conferenceid INTEGER NOT NULL,
   confiuserid INTEGER NOT NULL
);