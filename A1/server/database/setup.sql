ATTACH DATABASE 'CS455_A1.db' as 'CS455_A1';
CREATE TABLE NewTable (
	id INTEGER NOT NULL,
	response1 INTEGER NOT NULL,
	response2 INTEGER NOT NULL,
	response3 INTEGER NOT NULL,
	response4 INTEGER NOT NULL,
	textMessage TEXT(500),
	CONSTRAINT customer_feedback_PK PRIMARY KEY (id)
);

ALTER TABLE NewTable RENAME TO customer_feedback;
