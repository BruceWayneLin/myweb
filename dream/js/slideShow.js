(function ($) {
    $(function () {
    	
        // new a obj for sending data back server
        var userInfo = {};
        userInfo['UserID'] = $('#UserID').val();
        userInfo['UserPhotoLink'] = $('#UserPhoto').val();
        userInfo['ShareType'] = $('#ShareType').val();
        userInfo['UserNickName'] = $('#UserNickName').val();
        userInfo['Page'] = '1';
        userInfo['Sort'] = '0';
        userInfo['Token'] = $('#Token').val();
        
        function isLocalStorageNameSupported() 
	{
	    var testKey = 'userInfo', storage = window.sessionStorage;
	    try 
	    {
	        storage.setItem(testKey, userInfo);
	        storage.removeItem(testKey);
	        return localStorageName in win && win[localStorageName];
	    } 
	    catch (error) 
	    {
	        return false;
	    }
	}
        isLocalStorageNameSupported();
        
        //function for header Html
        function loadHeaderHtml() {
            //start header area html
            var headerSearchBar = '';
            headerSearchBar += '<div class="headerCustomGrid ui-grid-a">';
            headerSearchBar += '<div class="ui-block-a">';
            headerSearchBar += '</div>';
            headerSearchBar += '<div class="ui-block-b"><input class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset searchBarInput" type="text" placeholder=" 請輸入日期/暱稱/目標名稱">';
            headerSearchBar += '</div></div>';

            if (userInfo['ShareType'] == '2') {
                $('.mainPage').css({
                    'position' : 'relative',
                    'top' : '57px'
                });
                headerSearchBar += '<div class="selectionBar ui-grid-a">';
                headerSearchBar += '<div class="ui-block-a"><div><label>熱門資訊排行</label></div></div>';
                headerSearchBar += '<div class="ui-block-b"><div><select data-role="none" class="form-control"><option value="">請選擇</option>';
                headerSearchBar += '<option value="1">依熱門資料排行</option>';
                headerSearchBar += '</select></div></div>';
                headerSearchBar += '</div>';
            }
            var finalheaderSearchBar = $.parseHTML(headerSearchBar);
            $('.headerBar').append(finalheaderSearchBar);
        }

        //fire event load header html
        loadHeaderHtml();

        //loadNewHtml functionate to create new Html of Divs in view
        function loadNewHtml(Data) {
            // a flag of half length loading data
            var dataHalfLength = Math.ceil((Data.length / 2));

            //show more li of the content
            $(document).on('click', '#toShowMoreLi', function () {
                $(this).closest('ul').find('li#restLi').removeClass('hidden');
                $(this).hide();
            });

            //limitContextWording is for brief content words to show as a hook
            function limitContextWording() {
                var showChar = 50;  // How many characters are shown by default
                var ellipsestext = "...";
                var moretext = "繼續閱讀";
                var lesstext = "返回";

                $('.more').each(function () {
                    var content = $(this).html();
                    if (content.length > showChar) {
                        var hookText = content.substr(0, showChar);
                        var restContent = content.substr(showChar, content.length - showChar);

                        var html = hookText + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span>'
                            + '<span class="morecontent"><span>' + restContent + '</span>'
                            + '&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                        $(this).html(html);
                    }
                });

                $(".morelink").click(function () {
                    if ($(this).hasClass("less")) {
                        $(this).removeClass("less");
                        $(this).html(moretext);
                    } else {
                        $(this).addClass("less");
                        $(this).html(lesstext);
                    }
                    $(this).parent().prev().toggle();
                    $(this).prev().toggle();
                    return false;
                });
            }

            //run loop to show divs
            $.each(Data, function (key, Data) {
                //get variable for later for building html
                var imgPortrait = Data.UserPhotoLink;
                var templateId = Data.ShareTemplate;
                var userName = Data.UserNickName;
                var userID = Data.UserID;
                var releaseDate = Data.ShareDate;
                var content = Data.UserWording;
                var targetID = Data.TargetID;
                var sharePhoData = Data.SharePhotos;
                var targetName = Data.TargetName;
                var targetMemo = Data.TargetMemo;
                var pushCNT = Data.PushCNT;
                var userPush = Data.UserPush;
                var shareId = Data.ShareID;
                var sharePhoLength = sharePhoData.length;
                var contentArr;

                //mainContent html
                var divHtmlContent = '';
                //flag for infinite scrolling
                divHtmlContent += dataHalfLength == key ? '<div id="loadBusyShow">' : '';

                //header section start from here
                divHtmlContent += '<div id="contentDiv">';
                divHtmlContent += '<div id="firstUiGrid" class="ui-grid-a"><div class="ui-block-a"><div class="blockDiv">';
                divHtmlContent += '<img class="portrait" src="' + imgPortrait + '" alt=""></div><div class="blockDiv">';
                divHtmlContent += '<span>' + userName + '</span><br /> <span>於' + releaseDate + '</span></div></div>';
                divHtmlContent += '<div class="ui-block-b"><div class="blockDiv"><div class="pull-right"><a data-transition="slide" href="#pageContent' + shareId + '" ><span class="fa fa-pencil ';
                if (userInfo['UserID'] !== userID || templateId == '2') {
                    divHtmlContent += 'hidden';
                } else {
                    divHtmlContent += '';
                }
                divHtmlContent += '" aria-hidden="true"></span></a><span id="trashIcon" style="cursor: pointer" data-id="' + shareId + '" class="glyphicon glyphicon-trash ' + (userInfo['UserID'] == userID ? '' : 'hidden') + '"></span></div></div></div></div>';
                //end header

                //start complete dream testimony
                if (templateId == '2') {
                    divHtmlContent += '<div class="completedArea">';
                    divHtmlContent += '<h4>完成了-- 【' + targetName + '】 的目標</h4>';
                    divHtmlContent += '<h4>完成目標感言</h4>';
                    divHtmlContent += '<div class="targetMemo"><div>' + targetMemo + '</div></div>'
                    divHtmlContent += '</div>';
                }

                //start content
                if (content.length <= 60 && templateId !== '2') {
                    divHtmlContent += '<div class="context">' + content + '</div>';
                } else if (templateId == '2') {
                    contentArr = content.split("|");
                    divHtmlContent += '<div class="context"><ul>';
                    for (var i = 0 ; i < contentArr.length; i++) {
                        if (i == 0) {
                            divHtmlContent += contentArr[0];
                        } else {
                            if (contentArr.length > 2) {
                                if (i <= 1) {
                                    divHtmlContent += '<li>' + contentArr[i] + '<a href="#" id="toShowMoreLi">繼續閱讀...</a></li>';
                                } else {
                                    divHtmlContent += '<li id="restLi" class="hidden">' + contentArr[i] + '</li>';
                                }
                            } else {
                                divHtmlContent += '<li>' + contentArr[i] + '</li>';
                            }
                        }
                    }
                    divHtmlContent += '</ul></div>';
                } else {
                    divHtmlContent += '<div class="context"><span class="more">' + content + '</span></div>';
                }

                //start img list of content
                divHtmlContent += '<div class="waterMark ' + (sharePhoLength > 1 || sharePhoLength < 1 ? 'hidden' : '') + '"></div><div class="imgList">';
                $.each(sharePhoData, function (key, shaPhoData) {
                    var imgLink = shaPhoData.SharePhotoLink;
                    var sharedPhoId = shaPhoData.SharePhotoID;

                    var testimonyHtml = '<div data-role="page" class="clearUse" id="testimony' + sharedPhoId + '">';

                    //memo content part
                    testimonyHtml += '<div data-role="main" class="ui-content colorFulBkg">';
                    testimonyHtml += '<div><div class="ui-grid-b"><div class="ui-block-a">';
                    testimonyHtml += '<div class="backButton"><a href="#" class="fa fa-arrow-left ui-link" data-rel="back"></a>';
                    testimonyHtml += '</div></div><div class="ui-block-b"><div><h4 class="headerTxt"></h4></div></div><div class="ui-block-c"><div data-id="' + sharedPhoId + '" id="checkButtonPicture" class="checkButton ' + (userInfo['UserID'] == userID ? '' : 'hidden') + '"><i class="fa fa-check" aria-hidden="true"></i></div><div>';
                    testimonyHtml += '</div></div></div></div>';
                    testimonyHtml += (userInfo['UserID'] !== userID ? '' : '<h4>寫下您的感言</h4>');
                    testimonyHtml += '<div class="row"><div class="col-lg-12 memo">' + (userInfo['UserID'] == userID ? '<div class="memoContent" style="cursor:pointer;">' : '<div>') + shaPhoData.PhotoMemo + '</div></div></div>';
                    testimonyHtml += '<div class="row"><div class="col-lg-12"><div class="waterMark"></div><div class="target-img"><img src="' + imgLink + '" alt=""></div>';
                    testimonyHtml += '</div></div></div>';
                    //end of memo content part

                    //footer part
                    testimonyHtml += '<div data-role="footer"></div></div>';

                    var finalMemoContent = $.parseHTML(testimonyHtml);
                    $('body').append(finalMemoContent);

                    if (sharePhoLength <= 1) {
                        divHtmlContent += '<a href="#testimony' + sharedPhoId + '"><div class="target-img"><img src="' + imgLink + '" alt=""></div></a>';
                    } else if (sharePhoLength > 1) {
                        if (key == 5) {
                            divHtmlContent += '<a id="showMoreImg" class="disabled" href="#testimony' + sharedPhoId + '"><div class="target-img-thumb"><div class="addPlusDiv ' + (sharePhoLength > 5 ? 'hidden' : '') + '"></div><img class="img-responsive" src="' + imgLink + '" alt=""></div></a>';
                        } else if (key >= 6) {
                            divHtmlContent += '<a id="restImgThumb" class="hidden" href="#testimony' + sharedPhoId + '"><div class="target-img-thumb"><img class="img-responsive" src="' + imgLink + '" alt=""></div></a>';
                        } else {
                            divHtmlContent += '<a href="#testimony' + sharedPhoId + '"><div class="target-img-thumb"><img class="img-responsive" src="' + imgLink + '" alt=""></div></a>';
                        }
                    }
                });

                divHtmlContent += '</div>';
                divHtmlContent += '<div class="clearfix"></div>';

                //start content of footer
                divHtmlContent += '<div class="row topLine"></div>';
                divHtmlContent += '<div id="footerContentGrid" class="' + (userInfo['ShareType'] == '2' ? 'ui-grid-a' : 'ui-grid-c') + '">'
                divHtmlContent += '<div class="ui-block-a ' + (userInfo['ShareType'] == '2' ? 'centerTextAlign' : '') + '"><div class="thumbsNumber"><input id="thumbsCNT" class="hidden" value="' + pushCNT + '" /></div><div class="pushNo"> ' + pushCNT + ' 人 </div></div>';
                divHtmlContent += '<div class="ui-block-b"><div style="cursor: pointer" class=' + (userPush == true ? "thumbsUpClicked" : "thumbsUpClick") + ' data-id="' + shareId + '"><i></i></div></div>';
                divHtmlContent += '<div class="ui-block-c ' + (userInfo['ShareType'] == '2' ? 'hidden' : '') + '"><div class="clickToGoSharedBoard" data-id="' + userID + '|' + shareId + '"><a href="#sharedBoard" data-transition="slideup" id="msgBoard"><i class="fa fa-group"></i></a></div></div>';
                divHtmlContent += '<div class="ui-block-d ' + (userInfo['ShareType'] == '2' ? 'hidden' : '') + '"><div><a href="#msgBoard" class="toGoMsgBoard" data-id="' + shareId + '" "data-transition="slideup" id="' + targetID + '" ><i class="fa fa-comment-o"></i></a></div></div>';
                divHtmlContent += '</div></div>';

                divHtmlContent += dataHalfLength == key ? '</div>' : '';
                divHtmlContent += '<div class="row bottomLine"></div>';

                var finalHtml = $.parseHTML(divHtmlContent);
                $('.mainPage').append(finalHtml);

                //contentPage html
                var contentPage = '';
                contentPage += '<div data-role="page" id="pageContent' + shareId + '">';
                contentPage += '<div data-role="main" class="ui-content colorFulBkg">';
                contentPage += '<div><div class="ui-grid-b"><div class="ui-block-a"><div class="backButton"><a href="#" class="fa fa-arrow-left" data-rel="back"></a>';
                contentPage += '</div></div><div class="ui-block-b"><h4 class="headerTxt"></h4><div></div></div><div class="ui-block-c"><div><div data-id="' + shareId + '" id="checkButtonHeart" class="checkButton ' + (templateId == 2 ? 'hidden' : '') + '"><i class="fa fa-check" aria-hidden="true"></i></div></div></div></div></div>';
                contentPage += (userInfo['UserID'] !== userID ? '' : '<h4>寫下您的感言</h4>');
                contentPage += '<div class="textArea">' + (templateId == 2 || userInfo['UserID'] !== userID ? '<div>' : '<div class="textBubble" style="cursor:pointer;">');
                if (templateId == 2) {
                    contentPage += '<ul>';
                    $.each(contentArr, function (key, contentData) {
                        contentPage += '<li>' + contentData + '</li>';
                    });
                    contentPage += '</ul>';
                } else {
                    contentPage += content ;
                }
                contentPage += '</div></div></div></div>';

                var finalContent = $.parseHTML(contentPage);
                $('body').append(contentPage);

            });
            limitContextWording();
        }

        function clickShowRestImgList() {
            $(document).on('click', '#showMoreImg', function (event) {
                var checkAns = $(this).hasClass('disabled');
                if (checkAns == true) {
                    $(this).removeClass('disabled');
                    $(this).find('.addPlusDiv').addClass('hidden');
                    $(this).parents().closest('div.imgList').find('a#restImgThumb').each(function () {
                        $(this).removeClass('hidden');
                    });
                    return false;
                } else {
                    return true;
                }
            })
        }

        //function event click searchbar
        function clickSearchBar() {
            $(document).on('click', '.searchBarInput', function () {
                $(location).attr('href', "./search.html");
            });
        }
        //fire clickSearchBar function
        clickSearchBar();

        //function event click delete
        function clickDelete(){
            $(document).on('click', '#trashIcon', function () {
                var ans = confirm('您確定要刪除此筆文章。');
                userInfo['DeleteID'] = $(this).attr('data-id');
                userInfo['DeleteFrom'] = '3';
                if (ans == true) {
                    $(this).parents('div#contentDiv').empty();
                    //send data to delete function
                    function sendMsgDatBack(userInfo) {
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            headers: {
                                "Token": userInfo['Token'],
                            },
                            data: userInfo,
                            url: '/api/DreamPlan/DeleteData',
                            success: function (response) {
                                if (response.ReturnCode == '00') {
                                    alert('您已成功刪除。');
                                } else {
                                    alert('錯誤訊息' + response.ReturnCode + '，' + response.Message);
                                }
                            }
                        });
                    }
                    //function send id back server and delete
                    // sendMsgDatBack(userInfo);
                } else {
                    return false;
                }
            });
        }
        //fire clickDelete function
        clickDelete();

        function clickPictureCheckButtonToSave() {
            $(document).on('click', '#checkButtonPicture', function () {
                var sharePhotoId = $(this).attr('data-id');
                var contentText = $(this).closest('[data-role="page"]').find('div.memo textarea').val();
                if (!contentText) {
                    contentText = $(this).closest('[data-role="page"]').find('div.memoContent').text();
                }
                console.log(contentText);
                userInfo['SharePhotoID'] = sharePhotoId;
                userInfo['PhotoMemo'] = contentText;
                //get msg function
                function sendMsgDatBack(userInfo) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: userInfo,
                        headers: {
                            "Token": userInfo['Token'],
                        },
                        url: '/api/DreamPlan/UpdateSharePhoto',
                        success: function (response) {
                            if (response.ReturnCode !== '00') {
                                alert(response.ReturnCode);
                            } else {
                                alert('您已儲存成功。');
                            }
                        }
                    });
                }
                //function send msg back server
                // sendMsgDatBack(userInfo);
                location.reload();
            });
        }
        //fire clickDelete function
        clickPictureCheckButtonToSave();

        //function event click delete
        function clickCheckButtonToSave() {
            $(document).on('click', '#checkButtonHeart', function () {
                var shareId = $(this).attr('data-id');
                var contentText = $(this).closest('[data-role="page"]').find('div.textArea textarea').val();
                if (!contentText) {
                    contentText = $(this).closest('[data-role="page"]').find('div.textBubble').text();
                }
                console.log(contentText);
                userInfo['ShareID'] = shareId;
                userInfo['UserWording'] = contentText;
                //get msg function
                function sendMsgDatBack(userInfo) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            "Token": userInfo['Token'],
                        },
                        data: userInfo,
                        url: '/api/DreamPlan/UpdateUserWording',
                        success: function (response) {
                            if (response.ReturnCode !== '00') {
                                alert(response.ReturnCode);
                            } else {
                                alert('您已儲存成功。');
                            }
                        }
                    });
                }
                //function send msg back server
                // sendMsgDatBack(userInfo);
                location.reload();
            });
        }
        //fire clickDelete function
        clickCheckButtonToSave();

        //infiniteScroll a function for infinite scrolling on window
        function infiniteScroll(userInfo) {
            var timeCall = 1;
            var userData = userInfo;
            var flagToStop = true;

            $(window).scroll(function () {
                if ($(window).scrollTop() >= $(document).height() - $('div#loadBusyShow').offset().top || $(document).height() > $(window).height()) {
                    timeCall++;
                    userInfo['Page'] = timeCall.toString();
                    if (flagToStop) {
                        $.mobile.loading("show");
                        $.ajax({
                            type: 'GET',
                            data: userData,
                            headers: {
                                "Token": userInfo['Token'],
                            },
                            dataType: 'json',
                            url: './json/test2.json',
                            success: function (response) {
                                if (response.ReturnCode !== "00") {
                                    alert(response.ReturnCode);
                                    $.mobile.loading("hide");
                                } else if (response.ReturnCode == "00") {
                                    if (response.Result.length == 0) {
                                        flagToStop = false;
                                    }
                                    loadNewHtml(response.Result);
                                    $.mobile.loading("hide");
                                }
                            }
                        });
                    } else {
                        return false;
                    }
                }
            })
        }

        //call first AJAX to load data
        function callFirstAjax(userInfo) {
            $.mobile.loading("show");
            $.ajax({
                type: 'GET',
                dataType: 'json',
                headers: {
                    "Token": userInfo['Token'],
                },
                data: userInfo,
                url: './json/test2.json',
                success: function (response) {
                    if (response.ReturnCode == "00") {
                        loadNewHtml(response.Result);
                        infiniteScroll(userInfo);
                        clickShowRestImgList();
                        $.mobile.loading("hide");
                    } else {
                        alert('錯誤訊息' + response.ReturnCode + '，' + response.Message);
                    }
                }
            });
        }
        //trigger the ajax function
        callFirstAjax(userInfo);

        function clickAbleContent() {
            $(document).on('click', '.textBubble', function () {
                var divHtml = $(this).html();
                var editableText = $("<textarea />").attr(
                    {
                        'rows': 10,
                        'cols': 32
                    }).css({
                    'font-size': '16px',
                    'width': '100%'
                });
                editableText.val(divHtml);
                $(this).replaceWith(editableText);
                editableText.focus();
            });
        }
        //fire editable function
        clickAbleContent();
        $(document).on('click', '.memoContent', function () {
            var divHtml = $(this).html();
            var editableText = $("<textarea />").attr(
                {
                    'rows': 10,
                    'cols': 50
                }).css({
                'font-size': '16px',
                'width': '100%'
            });
            editableText.val(divHtml);
            $(this).replaceWith(editableText);
            editableText.focus();
        });

        //bind click thumbs up funciton
        $(document).on('click', '.thumbsUpClick', function () {
            $(this).parents('#footerContentGrid').find('.pushNo').empty();
            var CtNumber = $(this).parents('#footerContentGrid').find('#thumbsCNT').val();
            CtNumber++;
            $(this).parents('#footerContentGrid').find('.pushNo').append(CtNumber + '人');
            $(this).removeClass('thumbsUpClick').addClass('thumbsUpClicked');
            var shareId = $(this).attr('data-id');
            userInfo['PushID'] = shareId;
            userInfo['PushFrom'] = '1';
            //call ajax to get Thumbs
            function callAjaxToSaveThumb(userInfo) {
                $.mobile.loading("show");
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        "Token": userInfo['Token'],
                    },
                    data: userInfo,
                    url: '/api/Common/UpdatePushCount',
                    success: function (response) {
                        console.log(response);
                        if (response.ReturnCode == "00") {
                            $.mobile.loading("hide");
                        } else {
                            alert('錯誤訊息' + response.ReturnCode + '，' + response.Message);
                        }
                    }
                });
            }
            //trigger the ajax function
            // callAjaxToSaveThumb(userInfo);
        });

        //bind selection funciton
        $(document).on('change', '.form-control', function () {
            userInfo['Sort'] = $(this).val();
            $('.mainPage').empty();
            //call first AJAX to load data
            callFirstAjax(userInfo);
        });

    });
})(jQuery);




