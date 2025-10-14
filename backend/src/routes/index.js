import baiVietRouter from "../routes/baiViet.route.js";
import danhMucRouter from "../routes/danhMuc.route.js";
import thongBaoRouter from "../routes/thongBao.route.js";
import sanPhamRouter from "../routes/sanPham.route.js";

const Routes = (app) => {
    app.use('/api/baiViet', baiVietRouter);
    app.use('/api/thongBao', thongBaoRouter);
    app.use('/api/danhMuc', danhMucRouter);
    app.use('/api/sanPham', sanPhamRouter);
}



export default Routes;