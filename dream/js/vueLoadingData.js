(function ($) {
    $(function () {
     var userInfo = {};
        // new a obj for sending data back server
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //flag for icon input wrap
        var flagToStopWrap = true;

        function loadMsgBoard() {
            var msgBoardHtml = '';
            msgBoardHtml += '<div data-role="page" id="msgBoard">';
            msgBoardHtml += '<div data-role="header"><div class="ui-grid-b"><div class="ui-block-a">';
            msgBoardHtml += '<div class="backButton"><a href="#" id="msgBoardBackButton" class="fa fa-arrow-left ui-link" data-rel="back"></a>';
            msgBoardHtml += '</div></div><div class="ui-block-b"><div><h4 class="headerTxt">留言</h4></div></div><div class="ui-block-c"><div></div></div></div></div>';
            msgBoardHtml += '<div data-role="main" class="ui-content">';
            msgBoardHtml += '<div id="toShowMessageBoard">';
            msgBoardHtml += '<div id="msgLists">';
            msgBoardHtml += '</div>';
            msgBoardHtml += '<div class="row msgRowInput">';
            msgBoardHtml += '<div class="box" id="box">';
            msgBoardHtml += '<div class="leaveNewMsg">';
            msgBoardHtml += '<input id="leftMsg" type="text" placeholder="請輸入留言" />';
            msgBoardHtml += '</div>';
            msgBoardHtml += '</div></div></div></div>';
            var finalMsgBoardHtml = $.parseHTML(msgBoardHtml);
            $('body').append(finalMsgBoardHtml);
        }

        //function for load msg row to the page
        function loadMsgRowHtml(msgData) {
            var msgRowHtml = '';
            $.each(msgData, function (index, msgList) {
                msgRowHtml += '<div id="msgRow" class="row">';
                msgRowHtml += '<div class="col-xs-2 text-right">';
                msgRowHtml += '<img class="portrait" src="' + msgList.UserPhotoLink + '" alt="">';
                msgRowHtml += '</div><div class="col-xs-8">';
                if (msgList.Message.substring(0, 7) == "http://") {
                    msgRowHtml += '<div>' + msgList.UserNickName + ': ' + '<img class="iconImg" src="' + msgList.Message + '" alt="">';
                    msgRowHtml += '<br/> 於 ' + msgList.MessageDate + ' </div>';
                } else {
                    msgRowHtml += '<div>'+ msgList.UserNickName + ': ' + msgList.Message + '<br/> 於 ' + msgList.MessageDate + ' </div>';
                }
                msgRowHtml += '</div>';
                msgRowHtml += '<div class="col-xs-2 hover-btn">';
                msgRowHtml += '<button type="button" id="deleteMsgButton" class="close" data-id="' + msgList.MessageID + '" data-dismiss="alert">';
                msgRowHtml += '<span aria-hidden="true">×</span>';
                msgRowHtml += '<span class="sr-only">Close</span>';
                msgRowHtml += '</button>';
                msgRowHtml += '</div>';
                msgRowHtml += '</div>';
            });
            var finalMsgRowHtml = $.parseHTML(msgRowHtml);
            $('#msgLists').prepend(finalMsgRowHtml);
        }


        //function for emotion icon load
        function emojiLoading(msgImgLists) {
            var popContent = '';
            popContent += '<div class="row">';
            popContent += '<div class="container">';
            var img = '<div class="smileyIcon">';
            console.log(msgImgLists);
            $.each(msgImgLists, function (index, imgListLink) {
                if (index == 0) {
                    img += ' <a href="#" id=""><img id="iconClick" style="height:35px; width:35px;" src="' + imgListLink + '" alt="" /></a>';
                } else {
                    popContent += '<img class="col-xs-3 hidden iconPopImg" src="' + imgListLink + '" alt="">';
                }
            });
            img += '</div>';
            popContent += '</div>';
            popContent += '</div>';

            $('div#box').append(popContent);
            $('input#leftMsg').wrap(img);

            $(document).on('click', 'img.iconPopImg', function () {
                var imgUrl = $(this).prop('src');
                var userPhoto = "./img/por2.jpeg";
                Number.prototype.padLeft = function (base, chr) {
                    var len = (String(base || 10).length - String(this).length) + 1;
                    return len > 0 ? new Array(len).join(chr || '0') + this : this;
                }
                var d = new Date,
                    dformat = [(d.getMonth() + 1).padLeft(),
                            d.getDate().padLeft(),
                            d.getFullYear()].join('/') +
                        ' ' +
                        [d.getHours().padLeft(),
                            d.getMinutes().padLeft(),
                            d.getSeconds().padLeft()].join(':');

                var msgRow = '';
                msgRow += '<div id="msgRow" class="row"><div class="col-xs-2 text-right">';
                msgRow += '<img src="' + userPhoto + '" alt="" class="portrait">';
                msgRow += '</div> <div class="col-xs-8"><div> ';
                msgRow += "馬龍白蘭度" + ': ';
                msgRow += ' <img class="iconImg" src="' + imgUrl + '" alt=""><br>';
                msgRow += '於 ' + dformat + ' </div></div>';
                msgRow += '<div class="col-xs-2 hover-btn">';
                msgRow += '<button type="button" id="deleteMsgButton" class="close" data-dismiss="alert">';
                msgRow += '<span aria-hidden="true">×</span>';
                msgRow += '<span class="sr-only">Close</span>';
                msgRow += '</button>';
                msgRow += '</div>';
                msgRow += '</div>';

                //get msg function
                function sendMsgDatBack(userInfo) {
                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        data: userInfo,
                        url: './json/message.json',
                        success: function (response) {
                            if (response.ReturnCode !== '00') {
                                alert(response.ReturnCode);
                            }
                        }
                    });
                }
                //function send msg back server
                // sendMsgDatBack(userInfo);

                $('#msgLists').append(msgRow);
                $('#box').animate({ 'bottom': '-41%' }, 300);
                $(document).scrollTop($(document).height());
            });

            // bind event to button and go to Msgboard
            $(document).on('click', 'a#msgBoardBackButton', function () {
                $('div#msgLists').empty();
            });
        }

        //get msg function
        function callAjaxToGetMsg() {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                data: userInfo,
                url: './json/message.json',
                success: function (response) {
                    var msgLists = response.Result.ShareMessage;
                    var iconLists = response.Result.Icons;
                    loadMsgRowHtml(msgLists)
                    if (flagToStopWrap) {
                        flagToStopWrap = false;
                        emojiLoading(iconLists);
                    }
                }
            });
        }

        //to leave a new msg to the msg-board
        function leaveNewMsgToTheBoard() {
            $(document).on('change', 'input#leftMsg', function () {
                var newMsg = $(this).val();
                var userPhoto = "./img/por2.jpeg";
                if (newMsg == '') {
                    return false;
                } else {
                    var userPhoto = "./img/por2.jpeg";
                    Number.prototype.padLeft = function (base, chr) {
                        var len = (String(base || 10).length - String(this).length) + 1;
                        return len > 0 ? new Array(len).join(chr || '0') + this : this;
                    }
                    var d = new Date,
                        dformat = [(d.getMonth() + 1).padLeft(),
                                d.getDate().padLeft(),
                                d.getFullYear()].join('/') +
                            ' ' +
                            [d.getHours().padLeft(),
                                d.getMinutes().padLeft(),
                                d.getSeconds().padLeft()].join(':');

                    var msgRow = '';
                    msgRow += '<div id="msgRow" class="row"><div class="col-xs-2 text-right">';
                    msgRow += '<img src="' + userPhoto + '" alt="" class="portrait">';
                    msgRow += '</div> <div class="col-xs-8"><div>';
                    msgRow += '馬龍白蘭度' + ': ';
                    msgRow += newMsg + '<br>';
                    msgRow += '於' + dformat + '</div></div>';
                    msgRow += '<div class="col-xs-2 hover-btn">';
                    msgRow += '<button type="button" id="deleteMsgButton" class="close" data-dismiss="alert">';
                    msgRow += '<span aria-hidden="true">×</span>';
                    msgRow += '<span class="sr-only">Close</span>';
                    msgRow += '</button>';
                    msgRow += '</div>';
                    msgRow += '</div>';

                    //get msg function
                    function sendMsgDatBack(userInfo) {
                        $.ajax({
                            type: 'GET',
                            dataType: 'json',
                            data: userInfo,
                            url: './json/message.json',
                            success: function (response) {
                                if (response.ReturnCode == '00') {
                                } else {
                                    alert('錯誤訊息' + response.ReturnCode + '，' + response.Message);
                                }
                            }
                        });
                    }
                    //function send msg back server
                    sendMsgDatBack(userInfo);

                    $('#msgLists').append(msgRow);
                    $(this).val('');
                    $('#box').animate({ 'bottom': '-43%' }, 300);
                    
                    $(document).scrollTop($(document).height());
                }
            });
        }

        // bind event to button and go to Msgboard
        $(document).on('click', 'a.toGoMsgBoard', function () {
            var shareId = $(this).attr('data-id');
            var targetId = $(this).attr('id');
              var userInfo = {};
    			userInfo['ShareID'] = shareId;
           	        userInfo['TargetID'] = targetId;
	
            
            //trigger load msgBoard html function
            loadMsgBoard();
            //trigger leave msg function
            leaveNewMsgToTheBoard();
            //fire get msg function()
            callAjaxToGetMsg();
        });

        function sharedBoard() {
            var shareBoardHtml = '';
            shareBoardHtml += '<div data-role="page" id="sharedBoard">';
            shareBoardHtml += '<div data-role="header">';
            shareBoardHtml += '<div class="ui-grid-b">';
            shareBoardHtml += '<div class="ui-block-a">';
            shareBoardHtml += '<div class="backButton backButtonFromFriendsBoard">';
            shareBoardHtml += '<a href="#" class="fa fa-arrow-left ui-link" data-rel="back"></a>';
            shareBoardHtml += '</div>';
            shareBoardHtml += '</div>';
            shareBoardHtml += '<div class="ui-block-b">';
            shareBoardHtml += '<div>';
            shareBoardHtml += '<h4 class="headerTxt">已分享好友</h4>';
            shareBoardHtml += '</div>';
            shareBoardHtml += '</div>';
            shareBoardHtml += '<div class="ui-block-c">';
            shareBoardHtml += '<div></div></div></div></div>';
            shareBoardHtml += '<div data-role="main" class="ui-content">';
            shareBoardHtml += '<div id="sharedData">';
            shareBoardHtml += '</div></div></div>';
            var finalShareBoardHtml = $.parseHTML(shareBoardHtml);
            $('body').prepend(finalShareBoardHtml);
        }
        sharedBoard();

        //load share friends row
        function loadSharedFriHtml(data) {
            var sharedFriHtml = '';
            $.each(data, function (index, data) {
                sharedFriHtml += '<div class="row" v-for="(item, index) in items">';
                sharedFriHtml += '<div class="col-xs-2 text-left">';
                sharedFriHtml += '<img class="portrait" src="' + data.UserPhotoLink + '" alt=""></div>';
                sharedFriHtml += '<div class="col-xs-10 nickName"><div>' + data.UserNickName + '</div>';
                sharedFriHtml += '</div></div>';
            });
            var finalSharedFriHtmll = $.parseHTML(sharedFriHtml);
            $('#sharedData').prepend(finalSharedFriHtmll);
        }

        // bind event to button and go to shareBoard
        $(document).on('click', '.clickToGoSharedBoard', function () {
            var shareData = $(this).attr('data-id').split('|');
            $.each(shareData, function (index, data) {
                if (index == 0) {
                    //userInfo['UserID'] = data;
                } else if (index == 1) {
                    //userInfo['ShareID'] = data;
                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: './json/shared.json',
                        success: function (response) {
                            items = response.Result;
                            loadSharedFriHtml(items);
                        },
                        error: function (data, status, error) {
                            alert(error);
                        }
                    });
                }
            });
        });

        // bind delete event to button and delete msg
        $(document).on('click', '#deleteMsgButton', function () {
            var checkAns = confirm('您確認要刪除這筆留言?');
            if (checkAns) {
                userInfo['DeleteFrom'] = '5';
                userInfo['DeleteID'] = $(this).attr('data-id');
                $(this).closest('#msgRow').remove();
                //get msg function
                function sendDeleteMsgID(userInfo) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: userInfo,
                        headers: {
                            "Token": userInfo['Token'],
                        },
                        url: '/api/DreamPlan/DeleteData',
                        success: function (response) {
                            if (response.ReturnCode !== '00') {
                                alert(response.ReturnCode);
                            }
                        }
                    });
                }
                //function send msg back server
                // sendDeleteMsgID(userInfo);
            } else {
                return false;
            }
        });

        // bind event to animate panel class
        $(document).on('focus', '#leftMsg', function () {
        checkClassForIcon = $(this).parents('.box').find('.iconPopImg').hasClass('hidden');
        
        if(toggleOpenFlag){
            $('.iconPopImg').addClass('hidden');
            toggleOpenFlag = false;
	    $('#box').animate({ 'bottom': '-41%' }, 300);
	    $('html, body').animate({
        scrollTop: $(this).offset().top
       }, 2000);
            $(document).scrollTop($(document).height());
        }else{
            $('#box').animate({ 'bottom': '-41%' }, 300);
            $(document).scrollTop($(document).height());
            $('html, body').animate({
        scrollTop: $(this).offset().top
       }, 2000);
        }
        });

        var toggleOpenFlag = false;
        // bind event to animate panel class
        $(document).on('click', '#iconClick', function () {
            var checkClassForIcon = $(this).parents('.box').find('.iconPopImg').hasClass('hidden');
            if (checkClassForIcon || toggleOpenFlag == false) {
                $('.iconPopImg').removeClass('hidden');
            } else {
                $('.iconPopImg').addClass('hidden');
            }

            if (toggleOpenFlag == false) {
                toggleOpenFlag = true;
                $('#box').animate({ 'bottom': '0' }, 300);
            } else {
                toggleOpenFlag = false;
                $('#box').animate({ 'bottom': '-41%' }, 300);
            }
        });

        // bind event to button and go to shareBoard
        $(document).on('click', '.backButtonFromFriendsBoard', function () {
            $('#sharedData').empty();
        });
        
        function cancelZoom() {
            var d = document,
                viewport,
                content,
                maxScale = ',maximum-scale=',
                maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;

            // this should be a focusable DOM Element
            if (!this.addEventListener || !d.querySelector) {
                return;
            }

            viewport = d.querySelector('meta[name="viewport"]');
            content = viewport.content;

            function changeViewport(event) {
                viewport.content = content + (event.type == 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
            }

            // We could use DOMFocusIn here, but it's deprecated.
            this.addEventListener('focus', changeViewport, true);
            this.addEventListener('blur', changeViewport, false);
        }

        // jQuery-plugin
            $.fn.cancelZoom = function () {
                return this.each(cancelZoom);
            };

            // Usage:
            $('input:text,select,textarea, .smileyIcon').cancelZoom();
            
		            var portraitScreenHeight;
		var landscapeScreenHeight;
		
		if(window.orientation === 0 || window.orientation === 180){
		    portraitScreenHeight = $(window).height();
		    landscapeScreenHeight = $(window).width();
		}
		else{
		    portraitScreenHeight = $(window).width();
		    landscapeScreenHeight = $(window).height();
		}
		
		var tolerance = 25;
		$(window).bind('resize', function(){
		    if((window.orientation === 0 || window.orientation === 180) &&
		       ((window.innerHeight + tolerance) < portraitScreenHeight)){
		        // keyboard visible in portrait
		    }
		    else if((window.innerHeight + tolerance) < landscapeScreenHeight){
		        // keyboard visible in landscape
		    }
		    else{
		        // keyboard NOT visible
		    }
		});
        
    })
})(jQuery);


