DROP TABLE IF EXISTS `users_pets`;
DROP TABLE IF EXISTS `pets`;
DROP TABLE IF EXISTS `users`;


CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `pets`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
    `breed` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `users_pets`(
    `userId` INT NOT NULL,
    `petId` INT NOT NULL,
    PRIMARY KEY (userId, petId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (petId) REFERENCES pets(id) ON DELETE CASCADE
);


