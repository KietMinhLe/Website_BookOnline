import baiVietRouter from "../routes/baiViet.route.js";
import danhMucRouter from "../routes/danhMuc.route.js";
import thongBaoRouter from "../routes/thongBao.route.js";
import sanPhamRouter from "../routes/sanPham.route.js";
import chiTietSanPhamRouter from "./chiTietSanPham.route.js";
import sanPhamChiTietRouter from "./sanPham_chiTiet.route.js";

const Routes = (app) => {
    app.use('/api/baiViet', baiVietRouter);
    app.use('/api/thongBao', thongBaoRouter);
    app.use('/api/danhMuc', danhMucRouter);
    app.use('/api/sanPham', sanPhamRouter);
    app.use('/api/chiTietSanPham', chiTietSanPhamRouter);
    app.use('/api/sanPham_chiTiet', sanPhamChiTietRouter);
}



export default Routes;