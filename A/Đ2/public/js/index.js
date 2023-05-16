// Thông tin các trường có dấu * là bắt buộc nhập
// Mã bệnh nhân có định dạng BN-YYYYY, trong có BN cố định, YYYYY là 5 chữ số
// Mật khẩu chứa từ 6 ký tự bất kỳ trở lên
// Ngày khám phải sau ngày hiện tại
// Loại dịch vụ: gồm 3 checkbox Khám theo yêu cầu, Điều trị ngoại trú, Bác sĩ theo yêu cầu với giá trị phụ thu tương ứng cho 1 loại dịch vụ là 500000 đồng
// Chuyên khoa gồm có 3 option với giá trị chiết khấu tương ứng: (0.5 điểm) Ngoại tổng quát Nhi Nội tổng quát
$(document).ready(function() {  
  function validCode() {
    var message = '';
    var formMessage = $('#patientCode').parent().find('.form-message');
    if($('#patientCode').val().length === 0) {
      message = '(*)BN-YYYYYY';
      formMessage.show();
      formMessage.text(message);
      return false;
    } 
    var regexCode = /^BN-(\d{5})$/;
    if(!regexCode.test($('#patientCode').val())) {
      message = 'Mã bệnh nhân có định dạng BN-YYYYY, trong có BN cố định, YYYYY là 5 chữ số';
      formMessage.show();
      formMessage.text(message);
      return false;
    }
    formMessage.hide();
    formMessage.text(message);
    return true;
  }
  function validPassword() {
    var message = '';
    var formMessage = $('#password').parent().find('.form-message');
    if($('#password').val().length === 0) {
      message = '(*)';
      formMessage.show();
      formMessage.text(message);
      return false;
    } 
    if($('#password').val().length < 6) {
      message = 'Mật khẩu chứa từ 6 ký tự bất kỳ trở lên';
      formMessage.show();
      formMessage.text(message);
      return false;
    }
    formMessage.hide();
    formMessage.text(message);
    return true;
  }
  function getPrice() {
    var service = $('input[type=checkbox][name=typeService]:checked');
    var price = 0;
    $(service).each(function(){
      price += parseFloat($(this).val());
    });
    return price;
  }
  function getSpecialist() {
    return $('#specialist option:checked').text();
  }
  function validOrderDate() {
    var message = '';
    var formMessage = $('#orderDate').parent().find('.form-message');
    if($('#orderDate').val().length === 0) {
      message = '(*)';
      formMessage.show();
      formMessage.text(message);
      return false;
    } 
    var orderDate = new Date($('#orderDate').val());
    orderDate.setHours(0, 0, 0 ,0);
    var dateCurrent = new Date();
    dateCurrent.setHours(0, 0, 0 ,0);
    if(orderDate.getTime() <= dateCurrent.getTime()) {
      message = 'Ngày khám phải sau ngày hiện tại';
      formMessage.show();
      formMessage.text(message);
      return false;
    }
    formMessage.hide();
    formMessage.text(message);
    return true;
  }
  $('#password').blur(validPassword);
  $('#patientCode').blur(validCode);
  $('#orderDate').blur(validOrderDate);    
  $('#btnCheck').click(() => {
    if(!validCode() || !validPassword() || !validOrderDate()) {
      return;
    }
    var code = $('#patientCode').val();
    var password = $('#password').val();
    var orderDate = $('#orderDate').val();
    var price = getPrice();
    var specialist = getSpecialist();
    var table = $('.table').children('tbody');
    var content = `<tr>
                        <td>${table.length + 1}</td>
                        <td>${code}</td>
                        <td>${password}</td>
                        <td>${orderDate}</td>
                        <td>${price}</td>
                        <td>${specialist}</td>
                    </tr>`
    $(table).append(content);
    $('#modal-id').modal('hide');
  }) 
});