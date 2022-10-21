jQuery(document).ready(function($){

	$('#attend-form').on('submit', function(){
		
		var this_form = $(this);
		var form_data = $(this).serializeArray();
		var data = {action : 'endfa_gs_attend'};
		for (let i = 0; i < form_data.length; i++) {
			data[form_data[i]['name']] = form_data[i]['value'];
		}

		var ajax_url = data.ajax_url;
		delete data.ajax_url;

		$.ajax({
			url: ajax_url,
			type: 'POST',
			dataType: 'json',
			data: data,
			success: function( response ) {
				if (response.success) {
					//this custom for each template
					if(data.attend == 1){
						//co di
						let text = 'Hẹn ' + data.name + ' ngày cưới nhé!';
						alert(text);
					}else{
						//khong di
						let text = 'Mong hôm đó ' + data.name + ' vẫn đến chung vui!';
						alert(text);
					}
					this_form.find('input[type="text"], input[type="email"], textarea').val('');
				}else{
					let text = 'Đã có lỗi xảy ra!';
					alert(text);
				}
			}
		});
		return false;
	});

});
