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
    `petfinderId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `photos` VARCHAR(255) NOT NULL,
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

INSERT INTO `users` (`id`, `username`, `email`, `password`)
VALUES
-- pass: user12345
(1, 'user1', 'user1@gmail.com', '$2b$10$CIwX51lTg12RCs0/InOk7Oh9jRnA3XDfsAmF2RJUbLZG4qUrQflpe'),
-- pass: user23451
(2, 'user2', 'user2@gmail.com', '$2b$10$Vb.DwyghlKdtEpPLVbB71uGUYqI3BwPhDZNCgAsX6be6EnYPOIBoC'),
-- pass: user34512
(3, 'user3', 'user3@gmail.com', '$2b$10$9s0bDW6.BZ1SIlD1c/uTyuqSOaDLhY5iFlrwZJjENVJP9WjMnU3Wa');