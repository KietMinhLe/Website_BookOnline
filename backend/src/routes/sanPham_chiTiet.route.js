import express from "express";
import { createSanPhamChiTiet, deleteSanPhamChiTiet, getAllSanPhamChiTiet, getSanPhamChiTietById, updateSanPhamChiTiet } from "../controllers/sanPham_chiTiet.controller.js";
const sanPhamChiTietRouter = express.Router();

sanPhamChiTietRouter.get("/", getAllSanPhamChiTiet);
sanPhamChiTietRouter.get("/:id", getSanPhamChiTietById);
sanPhamChiTietRouter.post("/", createSanPhamChiTiet);
sanPhamChiTietRouter.put("/:id", updateSanPhamChiTiet);
sanPhamChiTietRouter.delete("/:id", deleteSanPhamChiTiet);

export default sanPhamChiTietRouter;