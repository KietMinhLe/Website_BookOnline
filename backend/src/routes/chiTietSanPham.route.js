import express from "express";
import { createChiTietSanPham, deleteChiTietSanPham, getAllChiTietSanPham, getChiTietSanPhamById, updateChiTietSanPham } from "../controllers/chiTietSanPham.controller.js";
const chiTietSanPhamRouter = express.Router();

chiTietSanPhamRouter.get("/", getAllChiTietSanPham);
chiTietSanPhamRouter.get("/:id", getChiTietSanPhamById);
chiTietSanPhamRouter.post("/", createChiTietSanPham);
chiTietSanPhamRouter.put("/:id", updateChiTietSanPham);
chiTietSanPhamRouter.delete("/:id", deleteChiTietSanPham);

export default chiTietSanPhamRouter;