const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const session = require('express-session'); // Import express-session
const querystring = require('querystring');
const app = express();
const port = 8080;

const uploadsDir = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve static files
app.use('/css', express.static(__dirname + '/css/'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use('/routes', express.static(path.join(__dirname, '/routes')));


// Serve HTML files
app.get('/start.html', (req, res) => res.sendFile(path.join(__dirname, 'start.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/checkout.html', (req, res) => res.sendFile(path.join(__dirname, 'checkout.html')));
// Serve product.html with embedded session data
app.get('/product.html', (req, res) => {
    const productData = req.session.productData; // Lấy dữ liệu sản phẩm từ session
    if (productData) {
        res.sendFile(path.join(__dirname, 'product.html'));
        // Tạo chuỗi query từ dữ liệu sản phẩm
        const queryString = querystring.stringify(productData);

    }
});


// Handle form submission
app.post('/checkout', upload.single('file'), [
    check('firstName').trim().notEmpty()
        .withMessage('Please enter your first name')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be at least 2 characters long'),
    check('lastName').trim().notEmpty().withMessage('Please enter your last name').isLength({ min: 2, max: 50 }).withMessage('Last name must be at least 2 characters long'),
    check('email').notEmpty().withMessage('Please enter your email').isEmail().withMessage('Invalid email address'),
    check('phone').trim().notEmpty().withMessage('Please enter your phone number').isInt().withMessage('Phone number must contain digits only').isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 digits long'),
    check('number').notEmpty().withMessage('Please select a number'),
    check('size').notEmpty().withMessage('Please select a size'),
    check('review').trim().notEmpty().withMessage('Please enter your review').isLength({ min: 5 }).withMessage('Review must be at least 5 characters long')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
    }

    // Handle successful order submission
   // console.log(req.body);
    req.session.productData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        number: req.body.number,
        size: req.body.size,
        review: req.body.review,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null// Save image URL
    };
    const queryString = querystring.stringify(req.session.productData); // Thay đổi từ req.body sang req.session.productData
    const redirectUrl = '/product.html?' + queryString;


    res.redirect(redirectUrl);
});



// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
