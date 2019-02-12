const express = require("express");
const Product = require("/root/LocalMountedDisk/Projects/Web/Node.JS/Node/classProject/models/product.js");
const ProductControler = require("/root/LocalMountedDisk/Projects/Web/Node.JS/Node/classProject/controllers/product.js");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(
      null,
      "/root/LocalMountedDisk/Projects/Web/Node.JS/Node/classProject/public/"
    );
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/add-product", ProductControler.adminPage);
router.post("/product", upload.single("imagename"), (req, res, next) => {
  console.log(req.body.img);
  if (
    req.body.title == null &&
    req.body.price == null &&
    req.body.description == null &&
    req.body.number == null
  ) {
    console.log("Fields Empty");
    res.redirect("/");
  } else {
    const product = new Product(
      req.body.title,
      req.body.img,
      req.body.price,
      req.body.description,
      req.body.number
    );
    product
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
});
exports.routes = router;
