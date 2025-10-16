import prisma from "../models/prisma.model.js";

// Lấy tất cả sản phẩm
export const getAllSanPham = async (req, res) => {
    try {
        const data = await prisma.sanpham.findMany({
            include: { danhmuc: true, baiviet: true }, // Lấy thêm dữ liệu từ bảng danh mục và bài viết
            where: { trangThai: true }, // Lấy sản phẩm có trạng thái là true
            orderBy: { ngayTao: 'asc' } // Sắp xếp theo ngày tạo tăng dần
        });
        return res.status(200).json({ mess: "Lấy Sản Phẩm Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Lấy Sản Phẩm Thất Bại !!!", error: error.message });
    }
};

// Lấy sản phẩm theo ID
export const getSanPhamById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await prisma.sanpham.findUnique({
            where: { id: parseInt(id) }, // Lấy sản phẩm theo ID
            include: { danhmuc: true, baiviet: true } // Lấy thêm dữ liệu từ bảng danh mục và bài viết
        });

        // Kiểm tra sản phẩm có tồn tại không
        if (!data) {
            return res.status(404).json({ mess: "Sản Phẩm Không Tồn Tại" });
        }

        return res.status(200).json({ mess: "Lấy Sản Phẩm Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Lấy Sản Phẩm Thất Bại !!!", error: error.message });
    }
};

// Tạo sản phẩm
export const createSanPham = async (req, res) => {
    try {
        const { tenSanPham, moTaSanPham, giaSanPham, soLuongSanPham, danhMucId, baiVietId, trangThai } = req.body;

        // Kiểm tra các trường bắt buộc phải có
        if (!tenSanPham || !moTaSanPham || !giaSanPham || !soLuongSanPham || !danhMucId || !baiVietId) {
            return res.status(400).json({ mess: "Vui lòng nhập đầy đủ thông tin bắt buộc: tenSanPham, moTaSanPham, giaSanPham, soLuongSanPham, danhMucId, baiVietId" });
        }

        // Kiểm tra kiểu dữ liệu của trường 'trangThai' nếu có gửi
        if (trangThai !== undefined && typeof trangThai !== "boolean") {
            return res.status(400).json({ mess: "trangThai phải là kiểu boolean" });
        }

        // Kiểm tra 'danhMucId' có phải là số hay không
        if (isNaN(danhMucId)) {
            return res.status(400).json({ mess: "danhMucId phải là một số hợp lệ" });
        }

        // Kiểm tra 'baiVietId' có phải là số hay không
        if (isNaN(baiVietId)) {
            return res.status(400).json({ mess: "baiVietId phải là một số hợp lệ" });
        }

        // Kiểm tra 'giaSanPham' có phải là số dương hay không
        if (isNaN(giaSanPham) || parseFloat(giaSanPham) <= 0) {
            return res.status(400).json({ mess: "giaSanPham phải là một số dương hợp lệ" });
        }

        // Kiểm tra 'soLuongSanPham' có phải là số nguyên dương hay không
        if (isNaN(soLuongSanPham) || !Number.isInteger(Number(soLuongSanPham)) || parseInt(soLuongSanPham) < 0) {
            return res.status(400).json({ mess: "soLuongSanPham phải là một số nguyên không âm" });
        }

        // Kiểm tra danh mục có tồn tại không
        const existingDanhMuc = await prisma.danhmuc.findUnique({
            where: { id: parseInt(danhMucId) }
        });

        if (!existingDanhMuc) {
            return res.status(404).json({ mess: "Danh mục không tồn tại" });
        }

        // Kiểm tra bài viết có tồn tại không
        const existingBaiViet = await prisma.baiviet.findUnique({
            where: { id: parseInt(baiVietId) }
        });

        if (!existingBaiViet) {
            return res.status(404).json({ mess: "Bài viết không tồn tại" });
        }

        // Kiểm tra tên sản phẩm đã tồn tại chưa (dùng findFirst thay vì findUnique)
        const existingSanPham = await prisma.sanpham.findFirst({
            where: { tenSanPham: tenSanPham }
        });

        // Nếu tên sản phẩm đã tồn tại, trả về lỗi
        if (existingSanPham) {
            return res.status(409).json({ mess: "Tên sản phẩm đã tồn tại" });
        }

        const data = await prisma.sanpham.create({
            data: {
                tenSanPham,
                moTaSanPham,
                giaSanPham,
                soLuongSanPham,
                danhMucId: Number(danhMucId),
                baiVietId: Number(baiVietId),
                ngayTao: new Date(),
                trangThai: trangThai !== undefined ? trangThai : true,
            }
        });

        return res.status(201).json({ mess: "Tạo Sản Phẩm Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Tạo Sản Phẩm Thất Bại !!!", error: error.message });
    }
};

// Cập nhật sản phẩm
export const updateSanPham = async (req, res) => {
    try {
        const { id } = req.params;
        const { tenSanPham, moTaSanPham, giaSanPham, soLuongSanPham, danhMucId, baiVietId, trangThai } = req.body;

        // Kiểm tra sản phẩm có tồn tại không
        const existingSanPham = await prisma.sanpham.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingSanPham) {
            return res.status(404).json({ mess: "Sản Phẩm Không Tồn Tại" });
        }

        // Kiểm tra tên sản phẩm có trùng với sản phẩm khác không (nếu có thay đổi tên)
        if (tenSanPham && tenSanPham !== existingSanPham.tenSanPham) {
            const duplicateSanPham = await prisma.sanpham.findFirst({
                where: {
                    tenSanPham: tenSanPham,
                    id: { not: parseInt(id) }
                }
            });

            if (duplicateSanPham) {
                return res.status(409).json({ mess: "Tên sản phẩm đã tồn tại" });
            }
        }

        // Kiểm tra kiểu dữ liệu
        if (trangThai !== undefined && typeof trangThai !== "boolean") {
            return res.status(400).json({ mess: "trangThai phải là kiểu boolean" });
        }

        if (danhMucId && isNaN(danhMucId)) {
            return res.status(400).json({ mess: "danhMucId phải là một số hợp lệ" });
        }

        if (baiVietId && isNaN(baiVietId)) {
            return res.status(400).json({ mess: "baiVietId phải là một số hợp lệ" });
        }

        // Kiểm tra 'giaSanPham' có phải là số dương hay không (nếu có cập nhật)
        if (giaSanPham && (isNaN(giaSanPham) || parseFloat(giaSanPham) <= 0)) {
            return res.status(400).json({ mess: "giaSanPham phải là một số dương hợp lệ" });
        }

        // Kiểm tra 'soLuongSanPham' có phải là số nguyên không âm hay không (nếu có cập nhật)
        if (soLuongSanPham && (isNaN(soLuongSanPham) || !Number.isInteger(Number(soLuongSanPham)) || parseInt(soLuongSanPham) < 0)) {
            return res.status(400).json({ mess: "soLuongSanPham phải là một số nguyên không âm" });
        }

        // Kiểm tra danh mục có tồn tại không (nếu có cập nhật)
        if (danhMucId) {
            const existingDanhMuc = await prisma.danhmuc.findUnique({
                where: { id: parseInt(danhMucId) }
            });

            if (!existingDanhMuc) {
                return res.status(404).json({ mess: "Danh mục không tồn tại" });
            }
        }

        // Kiểm tra bài viết có tồn tại không (nếu có cập nhật)
        if (baiVietId) {
            const existingBaiViet = await prisma.baiviet.findUnique({
                where: { id: parseInt(baiVietId) }
            });

            if (!existingBaiViet) {
                return res.status(404).json({ mess: "Bài viết không tồn tại" });
            }
        }

        const data = await prisma.sanpham.update({
            where: { id: parseInt(id) },
            data: {
                ...(tenSanPham && { tenSanPham }),
                ...(moTaSanPham && { moTaSanPham }),
                ...(giaSanPham && { giaSanPham }),
                ...(soLuongSanPham && { soLuongSanPham }),
                ...(danhMucId && { danhMucId: Number(danhMucId) }),
                ...(baiVietId && { baiVietId: Number(baiVietId) }),
                ...(trangThai !== undefined && { trangThai }),
                ngayCapNhat: new Date()
            }
        });

        return res.status(200).json({ mess: "Cập Nhật Sản Phẩm Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Cập Nhật Sản Phẩm Thất Bại !!!", error: error.message });
    }
};

// Xóa sản phẩm (soft delete)
export const deleteSanPham = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra sản phẩm có tồn tại không
        const existingSanPham = await prisma.sanpham.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingSanPham) {
            return res.status(404).json({ mess: "Sản Phẩm Không Tồn Tại" });
        }

        // Soft delete - chỉ thay đổi trạng thái
        const data = await prisma.sanpham.update({
            where: { id: parseInt(id) },
            data: {
                trangThai: false,
                ngayCapNhat: new Date()
            }
        });

        return res.status(200).json({ mess: "Xóa Sản Phẩm Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Xóa Sản Phẩm Thất Bại !!!", error: error.message });
    }
};

// Lấy sản phẩm theo danh mục
export const getSanPhamByDanhMuc = async (req, res) => {
    try {
        const { danhMucId } = req.params;

        const data = await prisma.sanpham.findMany({
            where: {
                danhMucId: parseInt(danhMucId),
                trangThai: true
            },
            include: { danhmuc: true, baiviet: true },
            orderBy: { ngayTao: 'desc' }
        });

        return res.status(200).json({ mess: "Lấy Sản Phẩm Theo Danh Mục Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Lấy Sản Phẩm Theo Danh Mục Thất Bại !!!", error: error.message });
    }
};

// Tìm kiếm sản phẩm
export const searchSanPham = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ mess: "Vui lòng nhập từ khóa tìm kiếm" });
        }

        const data = await prisma.sanpham.findMany({
            where: {
                AND: [
                    { trangThai: true },
                    {
                        OR: [
                            { tenSanPham: { contains: keyword, mode: 'insensitive' } },
                            { moTaSanPham: { contains: keyword, mode: 'insensitive' } }
                        ]
                    }
                ]
            },
            include: { danhmuc: true, baiviet: true },
            orderBy: { ngayTao: 'desc' }
        });

        return res.status(200).json({ mess: "Tìm Kiếm Sản Phẩm Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Tìm Kiếm Sản Phẩm Thất Bại !!!", error: error.message });
    }
};

//Tìm kiếm sản phẩm theo tên
export const searchSanPhamByTen = async (req, res) => {
    try {
        const { tenSanPham } = req.query;

        if (!tenSanPham) {
            return res.status(400).json({ mess: "Vui lòng nhập tên sản phẩm để tìm kiếm" });
        }

        //Tìm kiếm sản phẩm theo tên
        const data = await prisma.sanpham.findMany({
            where: { tenSanPham: { contains: tenSanPham, mode: 'insensitive' } } // Tìm kiếm không phân biệt chữ hoa thường
        });

        return res.status(200).json({ mess: "Tìm Kiếm Sản Phẩm Theo Tên Thành Công", data: data });
    } catch (error) {
        res.status(500).json({ mess: "Tìm Kiếm Sản Phẩm Theo Tên Thất Bại !!!", error: error.message });
    }
}
