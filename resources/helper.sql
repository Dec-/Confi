INSERT INTO confi_user (firstname, lastname, email, phoneNumber) VALUES 
('Jon', 'Doe', 'jon.doe@gmail.com', '+23 213 1344');

INSERT INTO booking (conferenceid, confiuserid) VALUES (1, 1);

SELECT b.id, c."name", c.room, u.firstname, u.lastname, u.email, u.phonenumber 
FROM booking b inner join conference c on (b.conferenceid = c.id)
	INNER JOIN confi_user u on (b.confiuserid = u.id);
	
SELECT * FROM confi_user;
SELECT * FROM conference;

DELETE FROM booking WHERE id = 3 returning id;

DROP TABLE booking;
DROP TABLE conference;
DROP TABLE confi_user;

TRUNCATE TABLE confi_user;