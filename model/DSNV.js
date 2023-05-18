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
    this.suaNV = function () {};
    this.capNhatNV = function () {};
};