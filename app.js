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
const publicDir = path.join(__dirname, 'public', 'uploads');


// Create necessary directories if they don't exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Multer storage with file validation (e.g., limiting to image files)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
    fileFilter: fileFilter
});
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
app.get('/start.html', (req, res) => {
    const visitedPages = req.session.visitedPages || [];


    // Read the index.html file and replace a placeholder with visited pages data
    const now = new Date();
    const activity = {
        url: 'start.html', // Store the base URL
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };

    // Only log the visit if it is not already in the visited pages
    // const exists = visitedPages.some(page => page.url === activity.url);
    // if (!exists) {
        visitedPages.push(activity);
        req.session.visitedPages = visitedPages; // Update the session with the new visited pages
        console.log('Visited Pages:', req.session.visitedPages);
    // }
    if (visitedPages.length >= 4) {
        visitedPages.shift();
    }

    // Read the checkout.html file and replace a placeholder with visited pages data
    fs.readFile(path.join(__dirname, 'start.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Convert visited pages to HTML
        const visitedPagesHTML = visitedPages.map(page => `
            <li>${page.url} - ${page.date} ${page.time}</li>
        `).join('');

        // Replace the placeholder in the new div for visited pages
        const result = data.replace('<!-- VISITED_PAGES -->', visitedPagesHTML);
        res.send(result);
    });
});
// app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => {
    const visitedPages = req.session.visitedPages || [];


    // Read the index.html file and replace a placeholder with visited pages data
    const now = new Date();
    const activity = {
        url: 'index.html', // Store the base URL
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };

    // Only log the visit if it is not already in the visited pages
    // const exists = visitedPages.some(page => page.url === activity.url);
    // if (!exists) {
        visitedPages.push(activity);
        req.session.visitedPages = visitedPages; // Update the session with the new visited pages
        console.log('Visited Pages:', req.session.visitedPages);
    // }
    if (visitedPages.length >= 4) {
        visitedPages.shift();
    }

    // Read the checkout.html file and replace a placeholder with visited pages data
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Convert visited pages to HTML
        const visitedPagesHTML = visitedPages.map(page => `
            <li>${page.url} - ${page.date} ${page.time}</li>
        `).join('');

        // Replace the placeholder in the new div for visited pages
        const result = data.replace('<!-- VISITED_PAGES -->', visitedPagesHTML);
        res.send(result);
    });
});

app.get('/checkout.html', (req, res) => {
    const visitedPages = req.session.visitedPages || [];

    // Log the current visit to checkout.html
    const now = new Date();
    const activity = {
        url: 'checkout.html', // Store the base URL
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };

    // // Only log the visit if it is not already in the visited pages
    // const exists = visitedPages.some(page => page.url === activity.url);
    // if (!exists) {
        visitedPages.push(activity);
        req.session.visitedPages = visitedPages; // Update the session with the new visited pages
        console.log('Visited Pages:', req.session.visitedPages);
    // }
    if (visitedPages.length >= 4) {
        visitedPages.shift();
    }

    // Read the checkout.html file and replace a placeholder with visited pages data
    fs.readFile(path.join(__dirname, 'checkout.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Convert visited pages to HTML
        const visitedPagesHTML = visitedPages.map(page => `
            <li>${page.url} - ${page.date} ${page.time}</li>
        `).join('');

        // Replace the placeholder in the new div for visited pages
        const result = data.replace('<!-- VISITED_PAGES -->', visitedPagesHTML);
        res.send(result);
    });
});



// app.get('/endpage.html', (req, res) => res.sendFile(path.join(__dirname, 'endpage.html')));
app.get('/endpage.html', (req, res) => {
    const visitedPages = req.session.visitedPages || [];

    // Read the endpage.html file and replace a placeholder with visited pages data
    const now = new Date();
    const activity = {
        url: 'endpage.html', // Store the base URL
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };

    // Only log the visit if it is not already in the visited pages
    // const exists = visitedPages.some(page => page.url === activity.url);
    // if (!exists) {
        visitedPages.push(activity);
        req.session.visitedPages = visitedPages; // Update the session with the new visited pages
        console.log('Visited Pages:', req.session.visitedPages);
    // }
    if (visitedPages.length >= 4) {
        visitedPages.shift();
    }

    // Read the checkout.html file and replace a placeholder with visited pages data
    fs.readFile(path.join(__dirname, 'endpage.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Convert visited pages to HTML
        const visitedPagesHTML = visitedPages.map(page => `
            <li>${page.url} - ${page.date} ${page.time}</li>
        `).join('');

        // Replace the placeholder in the new div for visited pages
        const result = data.replace('<!-- VISITED_PAGES -->', visitedPagesHTML);
        res.send(result);
    });
});
// app.get('/AboutUs.html', (req, res) => res.sendFile(path.join(__dirname, 'AboutUs.html')));
app.get('/AboutUs.html', (req, res) => {
    const visitedPages = req.session.visitedPages || [];
    if (visitedPages.length >= 4) {
        visitedPages.shift();
    }

    // Read the AboutUs.html file and replace a placeholder with visited pages data
    fs.readFile(path.join(__dirname, 'AboutUs.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Convert visited pages to HTML
        const visitedPagesHTML = visitedPages.map(page => `
            <li>${page.url} - ${page.date} ${page.time}</li>
        `).join('');

        // Replace the placeholder in the new div for visited pages
        const result = data.replace('<!-- VISITED_PAGES -->', visitedPagesHTML);
        res.send(result);
    });
});


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
app.post('/checkout.html', upload.single('file'), [
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
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
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
    const now = new Date();
    const activity = {
        url: 'product.html', // Chỉ lưu URL mà không có query
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };


    // Thêm vào visitedPages
    if (!req.session.visitedPages) {
        req.session.visitedPages = [];
    }

    req.session.visitedPages.push(activity);

    res.redirect(redirectUrl);
});
app.post('/submit-feedback', [
    // Name validation: Required and at least 3 characters long
    check('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

    // Email validation: Required, valid format
    check('email')
        .isEmail().withMessage('Please provide a valid email address'),

    // Cake Name validation: Custom validator to check if it contains 'cake'
    check('cakeName')
        .custom(value => {
            if (!value.toLowerCase().includes('cake')) {
                throw new Error('Cake name must contain the word "cake"');
            }
            return true;
        }),

    // Phone validation: Required, valid format (example: 123-456-7890)
    check('phone')
        .isMobilePhone().withMessage('Please provide a valid phone number')
        .matches(/\d{3}-\d{3}-\d{4}/).withMessage('Phone number must be in the format 123-456-7890'),

], (req, res) => {
    // Find the validation errors in this request and wrap them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('Feedback submitted successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// app.get('/checkout.html', (req, res) => res.sendFile(path.join(__dirname, 'checkout.html')));
// app.get('/checkout.html', (req, res) => {
//     const visitedPages = req.session.visitedPages || [];
//
//     // Read the checkout.html file and replace a placeholder with visited pages data
//     fs.readFile(path.join(__dirname, 'checkout.html'), 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Error reading file.');
//         }
//
//         // Convert visited pages to HTML
//         const visitedPagesHTML = visitedPages.map(page => `
//             <li>${page.url} - ${page.date} ${page.time}</li>
//         `).join('');
//
//         // Replace the placeholder in the new div for visited pages
//         const result = data.replace('<!-- VISITED_PAGES -->', visitedPagesHTML);
//         res.send(result);
//     });
// });
// Serve checkout.html and log the visit activity

//không có sự  dữ liệu từ index lên máy chủ có nghĩa là từ index nó đến một trang khác nhưng mà cái đó không phải từ server lên máy
// app.use((req, res, next) => {
//     // Initialize an array in the session to keep track of visited pages
//     if (!req.session.visitedPages) {
//         req.session.visitedPages = [];
//     }
//
//     // Store the current page URL
//     if (req.url !== '/favicon.ico') { // Ignore favicon requests
//         req.session.visitedPages.push(req.url);
//         console.log('Visited Pages:', req.session.visitedPages);
//     }
//
//     next(); // Call the next middleware or route handler
// });

// app.use((req, res, next) => {
//     // Khởi tạo một mảng trong session để theo dõi các trang đã truy cập
//     if (!req.session.visitedPages) {
//         req.session.visitedPages = [];
//     }
//
//     // Lưu tất cả các trang đã truy cập
//     if (req.url !== '/favicon.ico' && req.url.endsWith('.html')) {
//         // Check if the page has already been visited
//         const now = new Date();
//         const activity = {
//             url: req.url,
//             date: now.toLocaleDateString(),
//             time: now.toLocaleTimeString()
//         };
//
//         // Kiểm tra nếu URL là product.html
//         if (req.url.startsWith('/product.html')) {
//             // Chỉ lưu '/product.html' mà không có tham số truy vấn
//             const productActivity = {
//                 url: '/product.html',
//                 date: now.toLocaleDateString(),
//                 time: now.toLocaleTimeString()
//             };
//
//             // Kiểm tra sự tồn tại của sản phẩm để không thêm nhiều lần
//             const exists = req.session.visitedPages.find(page => page.url === productActivity.url);
//             if (!exists) {
//                 req.session.visitedPages.push(productActivity);
//             }
//         } else {
//             // Lưu tất cả các hoạt động khác
//             req.session.visitedPages.push(activity);
//         }
//
//         console.log('Visited Pages:', req.session.visitedPages);
//     }
//
//     next(); // Gọi middleware hoặc route handler tiếp theo
// });
// app.use((req, res, next) => {
//     // Initialize an array in the session to track visited pages
//     if (!req.session.visitedPages) {
//         req.session.visitedPages = [];
//     }
//
//     // Log the current date and time
//     const now = new Date();
//     let pageUrl = req.url;
//     if (pageUrl.startsWith('/checkout.html')) {
//         pageUrl = '/checkout.html'; // Store only the base URL
//     }
//     const activity = {
//         url: req.url.startsWith('/') ? req.url.slice(1) : req.url,
//         date: now.toLocaleDateString(),
//         time: now.toLocaleTimeString()
//     };
//
//     // Ignore favicon requests and only track HTML pages
//     // if (req.url !== '/favicon.ico' && req.url.endsWith('.html')) {
//     //     // Check if the page has already been visited
//     //     const exists = req.session.visitedPages.find(page => page.url === activity.url);
//     //     if (!exists) {
//     //         req.session.visitedPages.push(activity);
//     //         // Trim to the last 4 pages
//     //         if (req.session.visitedPages.length > 4) {
//     //             req.session.visitedPages = req.session.visitedPages.slice(-4);
//     //         }
//     //     }
//     if (req.url !== '/favicon.ico' && req.url.endsWith('.html')) {
//         const exists = req.session.visitedPages.some(page => page.url === activity.url);
//         if (!exists) {
//             req.session.visitedPages.push(activity);
//             // Keep only the latest four entries visible in the HTML display
//             if (req.session.visitedPages.length > 4) {
//                 req.session.visitedPages = req.session.visitedPages.slice(-4);
//             }
//         }
//
//         console.log('Visited Pages:', req.session.visitedPages);
//     }
//
//
//     next(); // Call the next middleware or route handler
// });