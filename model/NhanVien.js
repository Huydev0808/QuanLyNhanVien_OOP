function NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam) {
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNhanVien = "";

    this.tinhTongLuong = function () {
        switch (this.chucVu) {
            case "Giám đốc":
                this.tongLuong = this.luongCoBan * 3;
                break;
            case "Trưởng phòng":
                this.tongLuong = this.luongCoBan * 2;
                break;
            case "Nhân viên":
                this.tongLuong = this.luongCoBan;
                break;
        }
        return this.tongLuong;
    };
    this.xepLoai = function () {
        if(this.gioLam >= 192) {
            this.loaiNhanVien = "Nhân viên xuất sắc";
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            this.loaiNhanVien = "Nhân viên giỏi";
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            this.loaiNhanVien = "Nhân viên khá";
        } else if (this.gioLam > 0 && this.gioLam < 160) {
            this.loaiNhanVien = "Nhân viên trung bình";
        } else if (this.gioLam < 0) {
            this.loaiNhanVien = "Không hợp lệ";
        }
        return this.loaiNhanVien;
    };
};