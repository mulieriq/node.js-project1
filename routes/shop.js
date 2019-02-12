const express = require("express");
const multer = require('multer');
const upload = multer({
    dest: '/public'
});
const ProductControler = require('/root/LocalMountedDisk/Projects/Web/Node.JS/Node/classProject/controllers/product.js');
const router = express.Router();
router.get("/", ProductControler.retriveProducts);
router.get('/cart', ProductControler.cart);
router.get('/checkout', ProductControler.checkout);
router.get('/order', ProductControler.orders);
router.get('/developer.api/products', ProductControler.apiFetchAll);
router.post('/developer.api/products', upload.single(), ProductControler.apiAddProducts);
router.get("/developer.api/products/:productId", ProductControler.ApifindProductById);
router.patch('/developer.api/products/:_id', ProductControler.apiUpdateProduct);
router.delete('/developer.api/products/:_id', ProductControler.apiDeleteProduct);
module.exports = router;