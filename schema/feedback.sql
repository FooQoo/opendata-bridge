CREATE TABLE feedback (
    id SERIAL NOT NULL,
    usercaseId char(25) NOT NULL,
    isGood Boolean default FALSE,
    isBad Boolean default FALSE,
    PRIMARY KEY (id)
);
create index on feedback (usercaseId);