INSERT INTO cats 
    (breed, birthdate , username, image_url, name, password_digest, weight)
VALUES
    (),
    (); 



CREATE TABLE cats (
    `id` INT NOT NULL AUTO_INCREMENT,
    `added_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `breed` VARCHAR(32),
    `birthdate` DATE,
    `username` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255),
    `last_seen_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, !-- ON UPDATE CURRENT_TIME_STAMP
    `name` VARCHAR(255) NOT NULL,
    `password_digest`  VARCHAR(32) NOT NULL, 
    `weight` FLOAT NOT NULL
    PRIMARY KEY (id)
);