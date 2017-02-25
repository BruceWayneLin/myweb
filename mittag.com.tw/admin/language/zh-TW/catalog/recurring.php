<?php
// Heading
$_['heading_title']			= '分期付款';

// Text
$_['text_success']          = '更新成功';
$_['text_list']             = '分期付款列表';
$_['text_add']              = '新增分期設定';
$_['text_edit']             = '編輯分期設定';
$_['text_day']				= '日';
$_['text_week']				= '週';
$_['text_semi_month']		= '半個月';
$_['text_month']			= '月';
$_['text_year']				= '年';
$_['text_recurring']	    = '<p><i class="fa fa-info-circle"></i> 例：如果要達成分六期，每兩個月繳款一次，一次繳納500元，可以這樣設定：<br />價格填500，期數填6，單位的數量填2，單位選月。另外如果期數填0則代表持續扣款直到取消。 </p> (Recurring amounts are calculated by the frequency and cycles.</p><p>For example if you use a frequency of "week" and a cycle of "2", then the user will be billed every 2 weeks.</p><p>The duration is the number of times the user will make a payment, set this to 0 if you want payments until they are cancelled.)</p>';
$_['text_profile']			= '分期設定';
$_['text_trial']			= '試用設定';

// Entry
$_['entry_name']			= '名稱';
$_['entry_price']			= '價格';
$_['entry_duration']		= '期數';
$_['entry_cycle']			= '單位數量';
$_['entry_frequency']		= '單位';
$_['entry_trial_price']		= '價格';
$_['entry_trial_duration']	= '期數';
$_['entry_trial_status']	= '狀態';
$_['entry_trial_cycle']	    = '單位數量';
$_['entry_trial_frequency']	= '單位';
$_['entry_status']			= '狀態';
$_['entry_sort_order']		= '排序';

// Column
$_['column_name']			= '名稱';
$_['column_sort_order']	    = '排序';
$_['column_action']         = '動作';

// Error
$_['error_warning']          = '發生錯誤,請再確認!';
$_['error_permission']       = '您沒有權限更改分期付款的設置!';
$_['error_name']             = '名稱必須在3到255個字元之間!';
$_['error_product']     = '不能被刪除，因為目前尚有%s 件商品使用該分期設定!';
