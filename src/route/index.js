// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const to_do = require('./to_do')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', to_do)
// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
