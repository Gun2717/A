/*
a. Dấu * là thông tin bắt buộc
b. Số serial có thể gồm các ký tự chữ cái hoa, dấu _ và các ký số; chiều dài ít nhất là 6
c. Trọng lượng là số > 0
d. Chi phí vận chuyển cho 1 kiện hàng theo bảng giá sau:
    Trọng lượng (1 kiện hàng)	Giá /1kg
    1-20kg	                    35000đ
    21-50kg	                    30000đ
    >50kg	                    15000đ
e. Gán giá trị mặc định hợp lệ cho các thành phần trên form
*/
$(document).ready(function() {  
  function validSerial() {
    var message = '';
    var formMessage = $('#serial').parent().find('.form-message');
    if($('#serial').val().length === 0) {
      message = 'Số serial in trên kiện hàm nếu có';
      formMessage.show();
      formMessage.text(message);
      return false;
    } 
    if($('#serial').val().length < 6) {
      message = 'Số serial có thể gồm các ký tự chữ cái hoa, dấu _ và các ký số; chiều dài ít nhất là 6';
      formMessage.show();
      formMessage.text(message);
      return false;
    }
    formMessage.hide();
    formMessage.text(message);
    return true;
  }
  function validMota() {
    var message = '';
    var formMessage = $('#mota').parent().find('.form-message');
    if($('#mota').val().length === 0) {
      message = '(*)';
      formMessage.show();
      formMessage.text(message);
      return false;
    } 
    formMessage.hide();
    formMessage.text(message);
    return true;
  }
  function validTrongluong() {
    var message = '';
    var formMessage = $('#trongluong').parent().find('.form-message');
    var trongluong = parseFloat($('#trongluong').val());
    
    if (isNaN(trongluong) || trongluong <= 0) {
        message = 'Trọng lượng phải là một số lớn hơn 0';
        formMessage.show();
        formMessage.text(message);
        return false;
    }
    
        formMessage.hide();
        formMessage.text(message);
        return true;
    }
  function validChiphi(){
    var trongluong = parseFloat($('#trongluong').val());
    var chiPhi = 0;
    
    if (isNaN(trongluong) || trongluong <= 0) {
        alert('Trọng lượng phải là một số lớn hơn 0');
        return;
    }
    
    if (trongluong <= 20) {
        chiPhi = 35000;
    } else if (trongluong <= 50) {
        chiPhi = 30000;
    } else {
        chiPhi = 15000;
    }
    
    $('#chiphi').val(chiPhi);
    }
  $('#btnCheck').click(() => {
    if (!validSerial() || !validMota() || !validTrongluong() || !validChiphi()) {
      return;
    }
    var serial = $('#serial').val();
    var mota = $('#mota').val();
    var trongluong = $('#trongluong').val();
    var chiphi = $('#chiphi').val();
    var specialist = getSpecialist();
  
    var row = '<tr>' +
              '<td>' + (table.length + 1) + '</td>' +
              '<td>' + serial + '</td>' +
              '<td>' + mota + '</td>' +
              '<td>' + trongluong + '</td>' +
              '<td>' + chiphi + '</td>' +
              '<td>' + specialist + '</td>' +
              '</tr>';

    $('#resultTable').append(row);
    $('#modal-id').modal('hide');
});
});