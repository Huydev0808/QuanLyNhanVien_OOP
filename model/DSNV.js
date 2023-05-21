function DSNV () {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    };
    this.timViTri = function (taiKhoan) {
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.taiKhoan === taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    };
    this.xoaNV = function (tkNV) {
        var index = this.timViTri(tkNV);
        if (index !== -1) {
            this.arr.splice(index,1);
        }
        return null;
    };
    this.layThongTinNV = function (tkNV) {
        var index = this.timViTri(tkNV);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };
    this.capNhatNV = function (nv) {
        var index = this.timViTri(nv.taiKhoan);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };
};
//Add phương thức và lớp đối tượng
DSNV.prototype.timKiemNV = function (keyword) {
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
        var nv = this.arr[i];
        
        var keywordLowerCase = keyword.toLowerCase()
        
        var tenNVToLowerCase = nv.loaiNhanVien.toLowerCase();
        keyword = keyword.toLowerCase()
        if (tenNVToLowerCase.indexOf(keywordLowerCase) !== -1) {
            mangTimKiem.push(nv);
        }
    }
    return mangTimKiem;
};