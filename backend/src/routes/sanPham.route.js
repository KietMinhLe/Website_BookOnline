import express from "express";
import { getAllSanPham, getSanPhamById, createSanPham, updateSanPham, deleteSanPham, getSanPhamByDanhMuc, searchSanPham } from "../controllers/sanPham.controller.js";

const router = express.Router();

// Lấy tất cả sản phẩm
router.get("/", getAllSanPham);

// Tìm kiếm sản phẩm
router.get("/search", searchSanPham);

// Lấy sản phẩm theo ID
router.get("/:id", getSanPhamById);

// Lấy sản phẩm theo danh mục
router.get("/danh-muc/:danhMucId", getSanPhamByDanhMuc);

// Tạo sản phẩm mới
router.post("/", createSanPham);

// Cập nhật sản phẩm
router.put("/:id", updateSanPham);

// Xóa sản phẩm (soft delete)
router.delete("/:id", deleteSanPham);

export default router;

