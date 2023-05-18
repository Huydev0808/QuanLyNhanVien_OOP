var dsnv = new DSNV();

function getEle(id) {
    return document.getElementById(id);
};

function layThongTinNV() {
    var _taiKhoan = getEle("tknv").value;
    var _tenNV = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    var nv = new NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam);
    nv.tinhTongLuong();
    nv.xepLoai();
    return nv;
};
//Feature thêm nhân viên
getEle("btnThemNV").addEventListener("click", function () {
    var nv = layThongTinNV();
    dsnv.themNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
});
//Feature xoá nhân viên
function deleteNV (tkNV) {
    dsnv.xoaNV(tkNV);
    renderTable(dsnv.arr);
    setLocalStorage();
};
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
                    <button class="btn btn-info" onclick="editNV('${nv.taiKhoan}')">Edit</button>                
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