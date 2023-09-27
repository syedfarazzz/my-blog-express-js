const express = require('express');
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require("../controllers/articleController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/", validateToken, createArticle );

router.get("/", getArticles);

router.get("/:id", validateToken ,getArticleById );

router.put("/:id", validateToken ,updateArticle );

router.delete("/:id", validateToken , deleteArticle );

module.exports = router;