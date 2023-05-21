var dsnv = new DSNV();
var validation = new Validation();
function getEle(id) {
    return document.getElementById(id);
};

function layThongTinNV(isAdd) {
    var _taiKhoan = getEle("tknv").value;
    var _tenNV = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

//Validation
    
    var isValid = true;
    if(isAdd) {
        //Validation taikhoan NV
        isValid &= validation.kiemTraRong(_taiKhoan, "tbTKNV", "(*) Vui lòng nhập mã nhân viên") &&
        validation.kiemTraDoDaiKiTu(_taiKhoan, "tbTKNV", "(*) Vui lòng nhập 4 - 6 kí tự không để trống",4,6) &&
        validation.kiemTraTKTonTai(_taiKhoan, "tbTKNV", "(*) Tài khoản NV đã tồn tại", dsnv.arr);
    };
    //Validation tên nhân viên
    isValid &= validation.kiemTraRong(_tenNV, "tbTen", "(*) Vui lòng nhập tên nhân viên") &&
    validation.kiemTraChuoiKiTu(_tenNV, "tbTen", "(*) Tên nhân viên là chữ");
    //Validation email
    isValid &= validation.kiemTraRong(_email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.kiemTraPattern(_email,/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"tbEmail",
    "(*) Email không hợp lệ");
    //Validation mật khẩu
    isValid &= validation.kiemTraRong(_matKhau, "tbMatKhau", "(*) Vui lòng nhập password") &&
    validation.kiemTraPattern(_matKhau,/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,"tbMatKhau",
    "(*) Mật khẩu 6-10 ký tự: 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");
    // Validation ngày làm
    isValid &= validation.kiemTraRong(_ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm (mm/dd/yyyy)");
    // Validation chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Chức vụ không hợp lệ");
    //Validation giờ làm
    isValid &= validation.kiemTraRong(_gioLam, "tbGiolam", "(*) Vui lòng nhập số giờ làm trong tháng") &&
    validation.kiemTraGioiHan(_gioLam, "tbGiolam", "(*) Giờ làm phải từ 80 - 200 giờ",80,200);
    //Validation lương CB
    isValid &= validation.kiemTraRong(_luongCoBan, "tbLuongCB", "(*) Vui lòng nhập lương cơ bản") &&
    validation.kiemTraGioiHan(_luongCoBan, "tbLuongCB", "(*) Lương cơ bản từ 1 triệu - 20 triệu",1000000,20000000);

    if (!isValid) return null;
    var nv = new NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam);
    nv.tinhTongLuong();
    nv.xepLoai();
    return nv;
    
};
//Feature thêm nv hiển thị form 
getEle("btnThem").addEventListener("click", function() {
    //event.preventDefault();
    getEle("tknv").disabled = false;
    getEle("btnCapNhat").style.display = "none";
    getEle("formNV").reset();
    getEle("btnThemNV").style.display = "inline-block";


});
//Feature thêm nhân viên
getEle("btnThemNV").addEventListener("click", function (event) {
    event.preventDefault();
    var nv = layThongTinNV(true);
    if(nv) {
        dsnv.themNV(nv);
        renderTable(dsnv.arr);
        setLocalStorage();
    }
});
//Feature xoá nhân viên
function deleteNV (tkNV) {
    dsnv.xoaNV(tkNV);
    renderTable(dsnv.arr);
    setLocalStorage();
};
//Feature edit nhân viên
function editNV (tkNV) {
    getEle("btnCapNhat").style.display = "inline-block";
    var nv = dsnv.layThongTinNV(tkNV);
    if(nv) {
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;

        getEle("btnThemNV").style.display = "none";
        getEle("name").value = nv.tenNV;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }
};
getEle("btnCapNhat").addEventListener("click", function () {
    var nv = layThongTinNV(false);
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
});
//Feature tìm kiếm nhân viên
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
});
/**
 *               
 */
function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nv = data[i];
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNhanVien}</td>
                <td>  
                    <button class="btn btn-info" onclick="editNV('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Edit</button>                
                    <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
                </td>
            </tr>
        `;
    }
    getEle("tableDanhSach").innerHTML = content;
};
getLocalStorage();
function setLocalStorage () {
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV",dataString);
};
function getLocalStorage () {
    if(localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        dsnv.arr = JSON.parse(dataString);
        renderTable(dsnv.arr);
    }
};