// // Require express
// const express = require('express');
// // Create an express router
// const router = express.Router();
// // Require path
// const path = require('path');
// // Require express-validator
// const { check, validationResult } = require('express-validator');
// // Require bodyParser
// const bodyParser = require('body-parser');
// // Require multer for file uploads
// const multer = require('multer');
// const fs = require('fs');
//
// const uploadsDir = path.join(__dirname, 'uploads');
//
// // Kiểm tra xem thư mục uploads đã tồn tại chưa, nếu không thì tạo mới
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }
//
// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir); // Lưu tệp vào thư mục uploads
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Tên tệp sẽ là thời gian hiện tại + phần mở rộng của tệp
//     }
// });
// const upload = multer({ storage: storage });
//
//
//
// // Create a bodyParser middleware to parse the posted body
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
//
// // DEFINE ROUTE HANDLER
//
// // When user accesses this path, send the html file
// router.get('/', function (req, res, next) {
//     res.sendFile(`${__dirname}/checkout.html`); // Thay đổi đường dẫn nếu cần
// });
//
// // Handle form submission
// // Handle form submission
// router.post('/submit', upload.single('file'),(req, res, next) =>[
//     check('firstName')
//         .trim()
//         .not().isEmpty()
//         .withMessage('Please enter your first name')
//         .isLength({ min: 2, max: 50 })
//         .withMessage('First name must be at least 2 characters long'),
//
//     check('lastName')
//         .trim()
//         .not().isEmpty()
//         .withMessage('Please enter your last name')
//         .isLength({ min: 2, max: 50 })
//         .withMessage('Last name must be at least 2 characters long'),
//
//     check('email')
//         .not().isEmpty()
//         .withMessage('Please enter your email')
//         .isEmail()
//         .withMessage('Invalid email address'),
//
//     check('phone')
//         .trim()
//         .not().isEmpty()
//         .withMessage('Please enter your phone number')
//         .isInt()
//         .withMessage('Phone number must contain digits only')
//         .isLength({ min: 10, max: 15 })
//         .withMessage('Phone number must be between 10 and 15 digits long'),
//
//     check('number')
//         .not().isEmpty()
//         .withMessage('Please select a number'),
//
//     check('size')
//         .not().isEmpty()
//         .withMessage('Please select a size'),
//
//     check('review')
//         .trim()
//         .not().isEmpty()
//         .withMessage('Please enter your review')
//         .isLength({ min: 5 })
//         .withMessage('Review must be at least 5 characters long')
// ],  (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             errors: errors.array()
//         });
//     }
//
//     // Xử lý thành công
//     console.log(req.body);
//     if (req.file) {
//         console.log('Uploaded file:', req.file);
//     }
//     res.send('Order submitted successfully');
// });
//
// module.exports = router;
