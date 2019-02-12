const path = require("path");
const Product = require('/root/LocalMountedDisk/Projects/Web/Node.JS/Node/classProject/models/product.js');
const multer = require('multer');
const upload = multer({dest :'/public'});
exports.retriveProducts = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.render(path.join(__dirname, '../', 'views', 'html', 'shop'), {
            pagetitle: 'Shoppers | Home',
            prods: rows,
            path: "/"
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.adminPage = (req, res, next) => {
    res.render(path.join(__dirname, '../', 'views', 'html', 'add-product'), {
        title: "Admin | Add Product"
    });
}

// exports.addProduct = (req, res, next) => {
//     console.log(req.file);
//     if (req.body.title == null && req.body.price == null && req.body.description == null && req.body.number == null) {
//         console.log("Fields Empty");
//         res.redirect("/");
//     } else {
//         const product = new Product(req.body.title, req.body.img, req.body.price, req.body.description, req.body.number);
//         product.save().then(() => {
//             res.redirect('/');
//         }).catch((err) => {
//             console.log(err);
//         });
//     }
// }


exports.cart = ((req, res, next) => {
    res.render(path.join(__dirname, '../', "views", "html", "cart"));
});

exports.checkout = ((req, res, next) => {
    res.render(path.join(__dirname, '../', "views", "html", "checkout"));
});

exports.orders = ((req, res, next) => {
    res.render(path.join(__dirname, '../', "views", "html", "order"));
});

//// Rest Api

exports.apiFetchAll = ((req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.status(200).json({
            "result": "okay",
            "products": rows
        });
    }).catch((err) => {
        res.status(404).json({
            "result": "error",
            "error": err
        });
    });
});

exports.apiAddProducts = ((req, res, next) => {

    const product = new Product(req.body.title, req.body.img, req.body.price, req.body.description, req.body.number);

    product.save().then(() => {
        res.status(200).json({
            "result": "okay",
            "message": "Product Added Succesfully",

        });
        res.redirect("/developer.api/products");
    }).catch((err) => {
        res.status(200).json({
            "result": "error",
            "error": err,

        });
    });
});
exports.ApifindProductById = (req, res, next) => {
    const Id = req.params.productId;
    Product.findById(Id).then(([product]) => {
        res.status(200).json({
            "result": "ok",
            "product": product
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.apiUpdateProduct = ((req, res, next) => {
    const productId = req.params._id;
    Product.updateProduct(productId).then(() => {
        res.status(200).json({
            "result": "okay",
            "messsage": "Product Updated Successfully",
        });
    }).catch((err) => {
        res.status(200).json({
            "result": "error",
            "error": err
        });
    });
});

exports.apiDeleteProduct = ((req, res, next) => {

    const id = req.params._id;

    Product.deleteById(id).then(() => {
        res.status(200).json({
            "result": "okay",
            "message": "Product Deleted Successfully"
        });
    }).catch((err) => {
        res.status(200).json({
            "result": "error",
            "error": err
        });
    });
});