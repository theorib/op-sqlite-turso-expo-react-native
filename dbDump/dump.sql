PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `lights` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`output` text,
	`image` text
);
INSERT INTO lights VALUES('0190b1ab-9a59-702f-baca-342b65665f70','skypanel','12333',NULL);
INSERT INTO lights VALUES('0190b1ab-9a59-702f-baca-342cf15eab0e','d25','345454',NULL);
INSERT INTO lights VALUES('0190b1ab-9a59-702f-baca-342db3048d9c','M18','123233',NULL);
INSERT INTO lights VALUES('0190b1ab-9a59-702f-baca-342e70db46c3','Aladdin','1233',NULL);
INSERT INTO lights VALUES('0190b1ab-9a59-702f-baca-342f3389aba1','Aputure D600','54985',NULL);
COMMIT;
