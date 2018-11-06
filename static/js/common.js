function open_dialog(options)
{
	var title = options.title || '';
	var message = options.message || '';
	var content = options.content || '';
	var callbacks = options.callbacks || {};

	var src = '<div class="pop_zone">';
	src += (title ? '<div class="pop_tit"><h3>'+title+'</h3></div>' : '');
	src += (message ? '<div class="txt"><p>'+message+'</p></div>' : '');
	src += content+'</div>';

	$.magnificPopup.open({
		items: { src: src, type: 'inline' },
		showCloseBtn: false,
		callbacks: callbacks
	});
}

function open_popup(title, message, callbacks)
{
	message = message || '';
	callbacks = callbacks || {};

	var src = '<div class="pop_zone"><div class="pop_tit"><h3>'+title+'</h3></div>';
	src += (message ? '<div class="txt"><p>'+message+'</p></div>' : '');
	src += '<div class="s_btn ptb10"><div class="one_red"><a href="javascript:;" onclick="$.magnificPopup.close()">'+config.messages.ok+'</a></div></div></div>';

	$.magnificPopup.open({
		items: { src: src, type: 'inline' },
		showCloseBtn: false,
		callbacks: callbacks
	});
}

function open_confirm(title, message, cb)
{
	var src = '<div class="pop_zone"><div class="pop_tit"><h3>'+title+'</h3></div>';
	src += (message ? '<div class="txt"><p>'+message+'</p></div>' : '');
	src += '<div class="one_btn ptb10"><div class="red"><a href="javascript:;" class="btn-submit">'+config.messages.ok+'</a></div> <div class="gray"><a href="javascript:;" class="btn-cancel">'+config.messages.cancel+'</a></div></div></div>';
 
	$.magnificPopup.open({
		modal: true,
		items: { src: src, type: 'inline' },
		callbacks: {
			open: function() {
				var $content = $(this.content);
 
				$content.on('click', '.btn-submit', function() {
					if (typeof cb == 'function') cb();
					$.magnificPopup.close();
					$(document).off('keydown', keydownHandler);
				});
 
				$content.on('click', '.btn-cancel', function() {
					$.magnificPopup.close();
					$(document).off('keydown', keydownHandler);
				});
 
				var keydownHandler = function (e) {
					if (e.keyCode == 13) {
						$content.find('.btn-submit').click();
						return false;
					} else if (e.keyCode == 27) {
						$content.find('.btn-cancel').click();
						return false;
					}
				};
				$(document).on('keydown', keydownHandler);
			}
		}
	});
}

function show_message(type, message)
{
	if ($('#wrap_message').length) $('#wrap_message').remove();

	var src = '<div id="wrap_message" class="'+(type == 1 ? 'alarm_V' : 'alarm_r')+'"><div class="txt">'+message+'</div></div>';
	$('body').append(src);

	$(window).bind('scroll.show_message', function() { $('#wrap_message').fadeOut('slow'); $(window).unbind('.show_message'); });
}

function toggle_zipcode(o, callback)
{
	if ($('#wrap_zipcode').length) { $('#wrap_zipcode').remove(); return; }

	var src = '<div id="wrap_zipcode" style="display:block;width:100%;height:300px;margin:5px 0;position:relative"></div>';
	$(o).append(src);

	var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	new daum.Postcode({
		width : '100%',
		height : '100%',
		onresize : function(size) { $('#wrap_zipcode').css('height', size.height+'px'); },
		oncomplete: function(data) {
			var fullAddr = data.address;
			if (data.addressType === 'R') {
				var extraAddr = '';
				if (data.bname !== '') extraAddr += data.bname;
				if (data.buildingName !== '') extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}
			callback(data.zonecode, fullAddr);
			$('#wrap_zipcode').remove();
			document.body.scrollTop = currentScroll;
		}
	}).embed($('#wrap_zipcode')[0]);
}

function get_time_remaining(enddate)
{
	var arr = enddate.split(/[- :]/);
	enddate = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);

	var t = Date.parse(enddate) - Date.parse(new Date());
	var seconds = Math.floor((t/1000) % 60);
	var minutes = Math.floor((t/1000/60) % 60);
	var hours = Math.floor((t/(1000*60*60)) % 24);
	var days = Math.floor(t/(1000*60*60*24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function number_format(n)
{
	n += '';
	x = n.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) { x1 = x1.replace(rgx, '$1' + ',' + '$2'); }
	return x1 + x2;
}

function show_graph(id, mode)
{
	if (mode == 'm') {
		$('#btn_show_'+id).html(config.messages.view_yearly);
		$('#btn_show_'+id).attr('onclick', "show_graph('"+id+"', 'y')");
		$('#btn_years_'+id).show();
		show_graph_month(id, max_year);
	} else {
		$('#btn_show_'+id).html(config.messages.view_monthly);
		$('#btn_show_'+id).attr('onclick', "show_graph('"+id+"', 'm')");
		$('#btn_years_'+id).hide();
		$('#'+id).html($('#'+id+'-yearly').html());
	}
}

function show_graph_month(id, year)
{
	var amt_royalty_ym = arr_amt_royalty_ym[id];

	for (var i = max_year - 4; i <= max_year; i++) {
		$('#btn_year_'+id+'_'+i).toggleClass('on', i == year ? true : false);
	}

	var amt_royalty_m = (amt_royalty_ym[year] ? amt_royalty_ym[year] : {});
	var max_amt_royalty_m = 0;
	for (k in amt_royalty_m) {
		if (max_amt_royalty_m < amt_royalty_m[k]) max_amt_royalty_m = amt_royalty_m[k];
	}
	var html = '<span class="bar"></span>';
	for (var i = 1; i <= 12; i++) {
		var k = (i < 10 ? "0"+i : i);
		var amt = (amt_royalty_m[k] ? amt_royalty_m[k] : 0);
		  '<span class="bar" style="width:8%; height:'+Math.floor(amt / max_amt_royalty_m * 85)+'%;" data-bar-label="'+i+'" data-bar-value="'+number_format(amt)+'"><span class="bg"></span></span>';
	}
	$('#'+id).html(html);
}

function get_url_param(name)
{
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function load_page_init(args)
{
	args = args || {};
	load_page_config.next_page = 1;
	load_page_config.is_loading = false;
	load_page_config.is_last_page = false;

	$('#keyword').keyup(function(e) {
		var keyword = $('#keyword').val();
		if (e.which == 13) {
			$('[name=keyword]').val(keyword);
			document.fo_search.submit();
			return;
		}
		$('#clear_keyword').toggle(keyword ? true : false);
	});
	$('#clear_keyword').click(function() {
		$('#clear_keyword').hide();
		$('#keyword').val('');
		$('#keyword').focus();
	});

	var keyword = get_url_param('keyword');
	load_page_config.keyword = (keyword ? keyword : '');

	load_page();
	$(window).scroll(function() {
		if ($("#loading").offset().top - ($(window).scrollTop() + $(window).height()) < 0) load_page();
	});
}

function load_page()
{
	if (load_page_config.is_loading || load_page_config.is_last_page) return;

	load_page_config.is_loading = true;
	$('#loading').html('<img src="/images/ico_loading.svg" />');

	var api = load_page_api();
	$.post(api.uri, api.params, function (data) {
		load_page_config.is_loading = false;
		$('#loading').html('');

		if (data.status == 'ok') {
			load_page_item(data);
			if (data.is_last_page) load_page_config.is_last_page = true; else load_page_config.next_page++;
			if (!load_page_config.is_last_page && $("#loading").offset().top - ($(window).scrollTop() + $(window).height()) < 0) load_page();
		} else {
			open_popup(data.message);
		}
	}, 'json');
}

var load_page_config = { next_page:1, is_loading:false, is_last_page:false };

