const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const categoryService = require("../../services/profile/categories_services");
const { categorySchema } = require("../../models/profile/category_schema");
const multer = require("multer");
const fileUploaderController = require("./../../controller/imageUploader/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get("/getAllCategory", (req, res) => {
  categoryService
    .getAllCategories()
    .then((data) => responseManager.sendSuccess(res, data))
    .catch((error) => responseManager.sendError(res, error.message));
});

route.post("/addCategory", upload.single("category_image"), (req, res) => {
  const fileBuffer = req.file.buffer;
  const formData = req.body;

  const { error } = categorySchema.validate(formData);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  fileUploaderController
    .uploadMedia(fileBuffer)
    .then((imageUrl) => {
      const newCategoryData = { ...formData, category_image: imageUrl };
      return categoryService.addCategory(newCategoryData);
    })
    .then((newCategory) => responseManager.sendSuccess(res, newCategory))
    .catch((error) => responseManager.sendError(res, error.message));
});

route.put(
  "/updateCategory/:category_id",
  upload.single("category_image"),
  (req, res) => {
    const category_id = req.params.category_id;
    const data = req.body;

    const { error } = categorySchema.validate(data);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return res.status(400).send(errorMessage);
    }

    const handleFileUpload = req.file
      ? fileUploaderController.uploadMedia(req.file.buffer)
      : Promise.resolve(null);

    handleFileUpload
      .then((imageUrl) => {
        if (imageUrl) {
          data.category_image = imageUrl; 
        }
        return categoryService.updateCategory(category_id, data);
      })
      .then((updatedCategory) =>
        responseManager.sendSuccess(res, updatedCategory)
      )
      .catch((error) => responseManager.sendError(res, error.message));
  }
);

route.delete("/deleteCategory/:category_id", (req, res) => {
  const id = req.params.category_id;

  categoryService
    .deleteCategory(id)
    .then((deletedCategory) =>
      responseManager.sendSuccess(res, deletedCategory)
    )
    .catch((error) => responseManager.sendError(res, error.message));
});

module.exports = route;
