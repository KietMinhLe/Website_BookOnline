import prisma from "../models/prisma.model.js";

//Lấy tất cả chi tiết sản phẩm
export const getAllChiTietSanPham = async (req, res) => {
    try {
        const data = await prisma.chitietsanpham.findMany({
            orderBy: { id: 'desc' } // Sắp xếp theo ID giảm dần
        });
        return res.status(200).json({ mess: "Lấy Tất Cả Chi Tiết Sản Phẩm Thành Công ", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Lấy Tất Cả Chi Tiết Sản Phẩm Thất Bại !!!", error: error.message });
    }
}

//Lấy chi tiết sản phẩm theo ID
export const getChiTietSanPhamById = async (req, res) => {
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

        //Lấy chi tiết sản phẩm theo ID
        const data = await prisma.chitietsanpham.findUnique({
            where: { id: parseInt(id) } //Lấy chi tiết sản phẩm theo ID
        });

        //Kiểm tra chi tiết sản phẩm có tồn tại không
        if (!data) {
            return res.status(404).json({ mess: "Chi Tiết Sản Phẩm Không Tồn Tại" });
        }

        return res.status(200).json({ mess: "Lấy Chi Tiết Sản Phẩm Thành Công", data: data });
    } catch (error) {
        return res.status(500).json({ mess: "Lấy Chi Tiết Sản Phẩm Thất Bại !!!", error: error.message });
    }
}

//Tạo chi tiết sản phẩm
export const createChiTietSanPham = async (req, res) => {
    try {
        const { moTaChiTiet } = req.body;

        //Kiểm tra dữ liệu đầu vào
        if (!moTaChiTiet) {
            return res.status(400).json({ mess: "Thiếu dữ liệu đầu vào" });
        }

        //Kiểm tra trùng
        const existingChiTietSanPham = await prisma.chitietsanpham.findFirst({
            where: { moTaChiTiet: moTaChiTiet }
        });

        if (existingChiTietSanPham) {
            return res.status(409).json({ mess: "Chi Tiết Sản Phẩm Đã Tồn Tại" });
        }

        //Tạo chi tiết sản phẩm
        const data = await prisma.chitietsanpham.create({
            data: {
                moTaChiTiet,
                ngayTao: new Date(),
                ngayCapNhat: new Date(),
            }
        });

        return res.status(201).json({ mess: "Tạo Chi Tiết Sản Phẩm Thành Công", data: data });
    } catch (error) {
        return res.status(500).json({ mess: "Tạo Chi Tiết Sản Phẩm Thất Bại !!!", error: error.message });
    }
}

//Cập nhật chi tiết sản phẩm
export const updateChiTietSanPham = async (req, res) => {
    try {
        const { id } = req.params;

        const { moTaChiTiet } = req.body;

        //Kiểm tra id có phải là số hay không
        if (isNaN(id)) {
            return res.status(400).json({ mess: "ID phải là một số hợp lệ" });
        }

        //Kiểm tra id có phải là số nguyên dương hay không
        if (parseInt(id) <= 0) {
            return res.status(400).json({ mess: "ID phải là một số nguyên dương hợp lệ" });
        }

        //Lấy chi tiết sản phẩm theo ID
        const data = await prisma.chitietsanpham.findUnique({
            where: { id: parseInt(id) } //Lấy chi tiết sản phẩm theo ID
        });

        //Kiểm tra chi tiết sản phẩm có tồn tại không
        if (!data) {
            return res.status(404).json({ mess: "Chi Tiết Sản Phẩm Không Tồn Tại" });
        }

        //Cập nhật chi tiết sản phẩm
        const updatedData = await prisma.chitietsanpham.update({
            where: { id: parseInt(id) },
            data: {
                moTaChiTiet,
                ngayCapNhat: new Date()
            },
        });

        return res.status(200).json({ mess: "Cập Nhật Chi Tiết Sản Phẩm Thành Công", data: updatedData });
    } catch (error) {
        return res.status(500).json({ mess: "Cập Nhật Chi Tiết Sản Phẩm Thất Bại !!!", error: error.message });
    }
}

//Xóa chi tiết sản phẩm
export const deleteChiTietSanPham = async (req, res) => {
    try {
        const { id } = req.params;

        //Kiểm tra id có phải là số hay không
        if (isNaN(id)) {
            return res.status(400).json({ mess: "ID phải là một số hợp lệ" });
        }

        //Kiểm tra id có phải là số nguyên dương hay không
        if (parseInt(id) <= 0) {
            return res.status(400).json({ mess: "ID phải là một số nguyên dương hợp lệ" });
        }

        //Kiểm tra chi tiết sản phẩm có tồn tại không
        const existingChiTietSanPham = await prisma.chitietsanpham.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingChiTietSanPham) {
            return res.status(404).json({ mess: "Chi Tiết Sản Phẩm Không Tồn Tại" });
        }

        //Xóa chi tiết sản phẩm theo ID
        const data = await prisma.chitietsanpham.delete({
            where: { id: parseInt(id) } //Xóa chi tiết sản phẩm theo ID
        });

        return res.status(200).json({ mess: "Xóa Chi Tiết Sản Phẩm Thành Công", data: data });
    } catch (error) {
        return res.status(500).json({ mess: "Xóa Chi Tiết Sản Phẩm Thất Bại !!!", error: error.message });
    }
}