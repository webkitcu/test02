// 調査ページ ---------------------------------------------------------------
// アコーディオン
// タイトルをクリックでターゲット要素をオープン
jQuery(function($) {
    'use strict';
    
	var str_target = '[data-role="contents"]';
	var str_root = '[data-role="root"]';
	var str_clname = 'is-running';
	var str_btn = '[data-func="acdn_reserch"]';

	var btn = $(str_btn);
	
    btn.click(function(){
		var self = $(this);
			self.toggleClass(str_clname);
		var root = self.closest(str_root);
		var target = root.find(str_target);
		target.slideToggle(300);
	    
	});

});


// 調査ページ ---------------------------------------------------------------
// プラスボタンでINPUT追加
// マイナスボタンでINPUT削除
jQuery(function($) {
	var max = 5;
	var str_btn_add  = "[data-func='addInput']";
	var str_btn_del  = "[data-func='delInput']";
	var str_entry    = "[data-role='entry']";
	var str_component  = "[data-role='component']";
	var str_clname_del = "btn_del";
	
	var btns = $(str_btn_add);
	var component = $(str_component);
	var entry = $(str_entry);
	
	// 追加：data-func:addInputで自モジュールを除去
	$("body").on("click", str_btn_add , function(e){

		var self = $(this);
		var entry = self.closest(str_entry);
		var component = entry.find(str_component);	
		var len = component.length;
		
		if(len < max){
			var copy = entry.find(str_component).eq(0).clone();
			copy = changeDel(copy);
			entry.append(copy);
		}

		initId(entry);
	})
	
	// 削除：data-func:delInputで自モジュールを除去
	$("body").on("click", str_btn_del, function(){
		var self = $(this);
		self.closest(str_component).remove();
	})
	
	// valueを空にする
	// ボタンを削除ボタンに変更
	function changeDel(elm){
        'use strict';
        var elm = elm;
		elm.find('input').val('');
		elm.find('button').attr('data-func','delInput');
		elm.find('button').addClass(str_clname_del);
		return elm;
	}  
	
	// inputのidナンバーを振り直す
	function initId(module){
	    'use strict';
	    var root = $(module);
	    var items = root.find('input');
		var idName = root.find('input:first').attr('id').slice(0,-1) ;
		var len = 0;
		items.each(function(){
			var self = $(this);
			len++;
			var idName2 = idName + len;
			self.attr('id',idName2);
		})
	}
});



// 対応ブラウザ要確認 ---------------------------------------------------------------
// エラーメッセージの表示・非表示
jQuery(function($) {
	var str_place = '[data-role="error-front"]';
	var place = $(str_place);

    place.on('DOMSubtreeModified propertychange', function() {
        console.log('Input is changed');
	    var target = $(this).find('p');
	    var errorText = target.text();
		if(errorText){
			$(this).removeClass('is-hide');
		}else{
				$(this).addClass('is-hide');
		}
         
    });
    $('.form-item .form_error .stripe_element_error').on('DOMSubtreeModified propertychange', function() {
         console.log('stripe!');
	    //var target = $(this).find('.stripe_element_error');
	    var errorText = $(this).text();
		if(errorText){
			$(this).removeClass('is-hide');
		}else{
				$(this).addClass('is-hide');
		}
         
    });

});



// input要素を監視
// input.is-errorを見つけたら
// モジュールルート検索、エラーコンポーネントを検索し表示




