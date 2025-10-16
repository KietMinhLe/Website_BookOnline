import prisma from "../models/prisma.model.js";

//Lấy tất cả sản phẩm chi tiết
export const getAllSanPhamChiTiet = async (req, res) => {
    try {
        const data = await prisma.sanpham_chitiet.findMany({
            include: {
                sanpham: true,
                chitietsanpham: true
            },
            orderBy: { id: 'desc' } // Sắp xếp theo ID giảm dần
        });

        return res.status(200).json({ mess: "Lấy Tất Cả Sản Phẩm Chi Tiết Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Lấy Tất Cả Sản Phẩm Chi Tiết Thất Bại !!!", error: error.message });
    }
}

//Lấy sản phẩm chi tiết theo ID
export const getSanPhamChiTietById = async (req, res) => {
    try {
        const { id } = req.params;

        //Kiểm tra id có phải là số hay không
        if (isNaN(id)) {
            return res.status(400).json({ mess: "ID phải là một số hợp lệ" });
        }

        //Kiểm tra id có phải là số nguyên dương hay không
        if (parseInt(id) <= 0) {
            return res.status(400).json({ mess: "ID phải là một số nguyên dương" });
        }

        //Lấy sản phẩm chi tiết theo ID
        const data = await prisma.sanpham_chiTiet.findUnique({
            where: { id: parseInt(id) },
            include: {
                sanPham: true,
                chiTietSanPham: true
            }
        });

        //Kiểm tra sản phẩm chi tiết có tồn tại không
        if (!data) {
            return res.status(404).json({ mess: "Sản Phẩm Chi Tiết Không Tồn Tại" });
        }

        return res.status(200).json({ mess: "Lấy Sản Phẩm Chi Tiết Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Lấy Sản Phẩm Chi Tiết Thất Bại !!!", error: error.message });
    }
}

//Tạo sản phẩm chi tiết
export const createSanPhamChiTiet = async (req, res) => {
    try {
        const { sanPham_id, chiTietSanPham_id } = req.body;

        //Kiểm tra dữ liệu đầu vào
        if (!sanPham_id || !chiTietSanPham_id) {
            return res.status(400).json({ mess: "Thiếu dữ liệu đầu vào" });
        }

        //Kiểm tra sản phẩm có tồn tại không
        const sanPham = await prisma.sanpham.findUnique({
            where: { id: parseInt(sanPham_id) } // Lấy sản phẩm theo ID
        });

        //Kiểm tra sản phẩm chi tiết có tồn tại không
        const chiTietSanPham = await prisma.chitietsanpham.findUnique({
            where: { id: parseInt(chiTietSanPham_id) } // Lấy sản phẩm chi tiết theo ID
        });

        // Kiểm tra sản phẩm có tồn tại không
        if (!sanPham) {
            return res.status(404).json({ mess: "Sản Phẩm Không Tồn Tại" });
        }

        // Kiểm tra chi tiết sản phẩm có tồn tại không
        if (!chiTietSanPham) {
            return res.status(404).json({ mess: "Chi Tiết Sản Phẩm Không Tồn Tại" });
        }
        // Kiểm tra trùng
        const existingSanPhamChiTiet = await prisma.sanpham_chitiet.findFirst({
            where: {
                sanPham_id: parseInt(sanPham_id),
                chiTietSanPham_id: parseInt(chiTietSanPham_id)
            }
        });

        if (existingSanPhamChiTiet) {
            return res.status(409).json({ mess: "Sản Phẩm Chi Tiết Đã Tồn Tại" });
        }

        //Tạo sản phẩm chi tiết
        const data = await prisma.sanpham_chitiet.create({
            data: {
                sanPham_id: parseInt(sanPham_id),
                chiTietSanPham_id: parseInt(chiTietSanPham_id),
                // ngayTao: new Date(),
                // ngayCapNhat: new Date(),
            }
        });
        return res.status(201).json({ mess: "Tạo Sản Phẩm Chi Tiết Thành Công", data: data });
    } catch (error) {
        return res.status(500).json({ mess: "Tạo Sản Phẩm Chi Tiết Thất Bại !!!", error: error.message });
    }
}

//Cập nhật sản phẩm chi tiết
export const updateSanPhamChiTiet = async (req, res) => {
    try {
        const { id } = req.params;
        const { sanPham_id, chiTietSanPham_id } = req.body;

        //Kiểm tra dữ liệu đầu vào
        if (!sanPham_id || !chiTietSanPham_id) {
            return res.status(400).json({ mess: "Thiếu dữ liệu đầu vào" });
        }

        //Kiểm tra sản phẩm có tồn tại không
        const sanPham = await prisma.sanpham.findUnique({
            where: { id: parseInt(sanPham_id) } // Lấy sản phẩm theo ID
        });

        //Kiểm tra sản phẩm chi tiết có tồn tại không
        const chiTietSanPham = await prisma.chitietsanpham.findUnique({
            where: { id: parseInt(chiTietSanPham_id) } // Lấy sản phẩm chi tiết theo ID
        });

        //Kiểm tra sản phẩm chi tiết có tồn tại không
        if (!chiTietSanPham) {
            return res.status(404).json({ mess: "Sản Phẩm Chi Tiết Không Tồn Tại" });
        }

        //Kiểm tra trùng
        const existingSanPhamChiTiet = await prisma.sanpham_chitiet.findFirst({
            where: {
                sanPham_id: parseInt(sanPham_id),
                chiTietSanPham_id: parseInt(chiTietSanPham_id)
            }
        });

        if (existingSanPhamChiTiet) {
            return res.status(409).json({ mess: "Sản Phẩm Chi Tiết Đã Tồn Tại" });
        }

        //Cập nhật sản phẩm chi tiết
        const data = await prisma.sanpham_chitiet.update({
            where: { id: parseInt(id) },
            data: {
                sanPham_id: parseInt(sanPham_id),
                chiTietSanPham_id: parseInt(chiTietSanPham_id)
            }
        });

        return res.status(200).json({ mess: "Cập Nhật Sản Phẩm Chi Tiết Thành Công", data: data });
    } catch (error) {
        return res.status(500).json({ mess: "Cập Nhật Sản Phẩm Chi Tiết Thất Bại !!!", error: error.message });
    }
}

//Xóa sản phẩm chi tiết
export const deleteSanPhamChiTiet = async (req, res) => {
    try {
        const { id } = req.params;

        //Kiểm tra id có phải là số hay không
        if (isNaN(id)) {
            return res.status(400).json({ mess: "ID phải là một số hợp lệ" });
        }

        //Kiểm tra id có phải là số nguyên dương hay không
        if (parseInt(id) <= 0) {
            return res.status(400).json({ mess: "ID phải là một số nguyên dương" });
        }

        //Xóa sản phẩm chi tiết
        const data = await prisma.sanpham_chitiet.delete({
            where: { id: parseInt(id) } // Xóa sản phẩm chi tiết theo ID
        });
        return res.status(200).json({ mess: "Xóa Sản Phẩm Chi Tiết Thành Công" });
    } catch (error) {
        return res.status(500).json({ mess: "Xóa Sản Phẩm Chi Tiết Thất Bại !!!", error: error.message });
    }
}
