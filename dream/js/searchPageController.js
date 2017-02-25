(function ($) {
    $(function () {
        // new a obj for sending data back server
        var userInfo = {};
        userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //userInfo['SearchType'] = '2';

        //function for header Html
        function loadHeaderHtml() {
            //start loading extra header area html
            var extraHeaderHtml = '';
            extraHeaderHtml += '<div data-role="header" id="fixedHeader">';
            extraHeaderHtml += '<div class="ui-grid-b">';
            extraHeaderHtml += '<div class="ui-block-a">';
            extraHeaderHtml += '<div class="backButton"><a href="#" class="fa fa-arrow-left ui-link" data-rel="back"></a>';
            extraHeaderHtml += '</div></div>';
            extraHeaderHtml += '<div class="ui-block-b">';
            extraHeaderHtml += '<div><h4 class="headerTxt">搜尋</h4></div>';
            extraHeaderHtml += '</div><div class="ui-block-c">';
            extraHeaderHtml += '<div></div><div>';
            extraHeaderHtml += '</div></div></div></div>';

            var finalExtraHeaderHtml = $.parseHTML(extraHeaderHtml);
            $('#extraHeaderArea').append(finalExtraHeaderHtml);

            //start header area html
            var headerSearchBar = '';
            headerSearchBar += '<div class="searchBarHead ui-grid-a">';
            headerSearchBar += '<div class="ui-block-a">';
            headerSearchBar += '</div>';
            headerSearchBar += '<div class="ui-block-b"><input class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset searchBarInput" type="text" placeholder=" 請先選擇下方要搜尋的項目"></div>';
            headerSearchBar += '<div class="ui-block-c"><button class="btn btn-success searchBtnGo">搜尋</button></div>'
            headerSearchBar += '</div>';

            var finalheaderSearchBar = $.parseHTML(headerSearchBar);
            $('.headerBar').append(finalheaderSearchBar);
        }
        //fire event load header html
        loadHeaderHtml();

        //function loading 3 buttons on the page
        function loadContentThreeButtons() {
            //start buttons html
            var btnHtml = '';
            btnHtml += '<fieldset class="ui-grid-b">';
            btnHtml += '<div class="ui-block-a"><button id="searchBtn" data-theme="a" value="1" class=" ui-btn ui-btn-a ui-shadow ui-corner-all">搜尋日期</button></div>';
            btnHtml += '<div class="ui-block-b"><button id="searchBtn" data-theme="a" value="2" class=" ui-btn ui-btn-a ui-shadow ui-corner-all">搜尋暱稱</button></div>';
            btnHtml += '<div class="ui-block-c"><button id="searchBtn" data-theme="a" value="3" class=" ui-btn ui-btn-a ui-shadow ui-corner-all">搜尋目標名稱</button></div>';
            btnHtml += '</fieldset>';

            var finalbtnHtml = $.parseHTML(btnHtml);
            $('#searchBtnArea').append(finalbtnHtml);
        }
        //fire the btnhtml function
        loadContentThreeButtons();

        //loadDateHtmlPage function load page for date selection
        function loadDateHtmlPage() {
            var dateHtmlPage = '';
            dateHtmlPage += '<div class="dateBox" id="dateBox">';
            dateHtmlPage += '<div class="dateBox-inner" >';
            dateHtmlPage += '<div class="datePickDiv">';
            dateHtmlPage += '<label for="date">起:</label>';
            dateHtmlPage += '<input type="date" name="date" data-inline="true" id="dateStart" value="">';
            dateHtmlPage += '<label for="date">迄:</label>';
            dateHtmlPage += '<input type="date" name="date" data-inline="true" id="dateEnd" value="">';
            dateHtmlPage += '</div><div id="btnCheckBottom" class="row">';
            dateHtmlPage += '<div class="col-lg-12"><div class="text-center">';
            dateHtmlPage += '<button class="btn btn-default" id="close">確定</button>';
            dateHtmlPage += '</div></div></div></div></div>';

            var finalDateHtmlPage = $.parseHTML(dateHtmlPage);
            $('body').append(finalDateHtmlPage);
        }
        //fire load datepicker html
        loadDateHtmlPage();

        //button click function
        function searchBtnClick() {
            $(document).on('click', '#searchBtn', function () {
                var btnVal = $(this).val();
                $('button').removeClass('selected');
                $(this).addClass('selected');
                if (btnVal == 1) {
                    $('#dateBox').animate({ 'bottom': '0' }, 300);
                } else if (btnVal == 2) {
                    $('#dateBox').animate({ 'bottom': '-100%' }, 300);
                   
                } else if (btnVal == 3) {
                    $('#dateBox').animate({ 'bottom': '-100%' }, 300);
                }

            });

            //click the confirm button of the panel
            $(document).on('click', '#close', function () {
                //start day
                var startDate = $('#dateStart').val();
                var startFormatedDate;
                if (!startDate) {
                    startFormatedDate = '';
                } else {
                    var formatedStartDate = new Date(startDate);
                    startFormatedDate = formatedStartDate.getFullYear() + '/' + (formatedStartDate.getMonth() + 1) + '/' + formatedStartDate.getDate();
                }
                //end day
                var endFormatedDate;
                var endDate = $('#dateEnd').val();
                if (!endDate) {
                    endFormatedDate = '';
                } else {
                    var formatedEndDate = new Date(endDate);
                    endFormatedDate = formatedEndDate.getFullYear() + '/' + (formatedEndDate.getMonth() + 1) + '/' + formatedEndDate.getDate();
                }

                if (startDate == '' && endDate == '') {
                    $('.searchBarInput').val('');
                } else {
                    $('.searchBarInput').val(' ' + startFormatedDate + '~' + endFormatedDate);
                }
                $('.searchBarInput').focus();
                $('#dateBox').animate({ 'bottom': '-100%' }, 300);
            });
        }
        //fire click button function
        searchBtnClick();

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
                divHtmlContent += '<div id="contentDiv"><div id="firstUiGrid" class="ui-grid-a"><div class="ui-block-a"><div class="blockDiv">';
                divHtmlContent += '<img class="portrait" src="' + imgPortrait + '" alt=""></div><div class="blockDiv">';
                divHtmlContent += '<span>' + userName + '</span><br /> <span>於' + releaseDate + '</span></div></div>';
                divHtmlContent += '<div class="ui-block-b"><div class="blockDiv"><div class="pull-right"><a data-transition="slide" href="#pageContent' + shareId + '" ><span class="fa fa-pencil ';
                if (templateId == '2') {
                    divHtmlContent += 'hidden';
                } else {
                    divHtmlContent += '';
                }
                divHtmlContent += '" aria-hidden="true"></span></a><span style="cursor: pointer" id="trashIcon" data-id="' + shareId + '" class="glyphicon glyphicon-trash ' + '' + '"></span></div></div></div></div>';
                //end header

                //start complete dream testimony
                if (templateId == '2') {
                    divHtmlContent += '<div class="completedArea">';
                    divHtmlContent += '<h4>完成了-- ' + targetName + ' 的目標</h4>';
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
                    ////header part
                    //testimonyHtml += '<div data-role="header"><div class="ui-grid-b"><div class="ui-block-a">';
                    //testimonyHtml += '<div class="backButton"><a href="#" class="fa fa-arrow-left ui-link" data-rel="back"></a>';
                    //testimonyHtml += '</div></div><div class="ui-block-b"><div><h4 class="headerTxt">寫下照片感言</h4></div></div><div class="ui-block-c"><div data-id="' + sharedPhoId + '" id="checkButtonPicture" class="checkButton"><i class="fa fa-check" aria-hidden="true"></i></div><div>';
                    //testimonyHtml += '</div></div></div></div>';
                    //end of header part

                    //memo content part
                    testimonyHtml += '<div data-role="main" class="ui-content colorFulBkg">';
                    testimonyHtml += '<div><div class="ui-grid-b"><div class="ui-block-a">';
                    testimonyHtml += '<div class="backButton"><a href="#" class="fa fa-arrow-left ui-link" data-rel="back"></a>';
                    testimonyHtml += '</div></div><div class="ui-block-b"><div><h4 class="headerTxt"></h4></div></div><div class="ui-block-c"><div data-id="' + sharedPhoId + '" id="checkButtonPicture" class="checkButton ' + "" + '"><i class="fa fa-check" aria-hidden="true"></i></div><div>';
                    testimonyHtml += '</div></div></div></div>';
                    testimonyHtml += '<h4>寫下您的感言</h4>';
                    testimonyHtml += '<div class="row"><div class="col-lg-12 memo">' + '<div style="cursor:pointer;" class="memoContent">' + '</div></div></div>';
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
                divHtmlContent += '<div id="footerContentGrid" class="ui-grid-c">'
                divHtmlContent += '<div class="ui-block-a"><div class="thumbsNumber"><input id="thumbsCNT" class="hidden" value="' + pushCNT + '" /></div><div class="pushNo"> ' + pushCNT + ' 人 </div></div>';
                divHtmlContent += '<div class="ui-block-b"><div style="cursor: pointer" class=' + (userPush == true ? "thumbsUpClicked" : "thumbsUpClick") + ' data-id="' + shareId + '"><i></i></div></div>';
                divHtmlContent += '<div class="ui-block-c"><div class="clickToGoSharedBoard" data-id="' + userID + '|' + shareId + '"><a href="#sharedBoard" data-transition="slideup" id="msgBoard"><i class="fa fa-group"></i></a></div></div>';
                divHtmlContent += '<div class="ui-block-d"><div><a href="#msgBoard" class="toGoMsgBoard" data-id="' + shareId + '" "data-transition="slideup" id="' + targetID + '" ><i class="fa fa-comment-o"></i></a></div></div>';
                divHtmlContent += '</div></div>';

                divHtmlContent += dataHalfLength == key ? '</div>' : '';
                divHtmlContent += '<div class="row bottomLine"></div>';

                var finalHtml = $.parseHTML(divHtmlContent);
                $('#searchResultArea').append(finalHtml);

                //contentPage html
                var contentPage = '';
                contentPage += '<div data-role="page" id="pageContent' + shareId + '">';
                contentPage += '<div data-role="main" class="ui-content colorFulBkg">';
                contentPage += '<div><div class="ui-grid-b"><div class="ui-block-a"><div class="backButton"><a href="#" class="fa fa-arrow-left" data-rel="back"></a>';
                contentPage += '</div></div><div class="ui-block-b"><h4 class="headerTxt"></h4><div></div></div><div class="ui-block-c"><div><div data-id="' + shareId + '" id="checkButtonHeart" class="checkButton"><i class="fa fa-check" aria-hidden="true"></i></div></div></div></div></div>';
                contentPage += '<h4>寫下您的感言</h4>';
                contentPage += '<div class="textArea">' + '<div class="textBubble" style="cursor:pointer;">';
                if (templateId == 2) {
                    contentPage += '<ul>';
                    $.each(contentArr, function (key, contentData) {
                        contentPage += '<li>' + contentData + '</li>';
                    });
                    contentPage += '</ul>';
                } else {
                    contentPage += content;
                }
                contentPage += '</div></div></div></div>';

                var finalContent = $.parseHTML(contentPage);
                $('body').append(contentPage);

            });
            limitContextWording();
        }

        //to leave a new msg to the msg-board
        function leaveNewMsgToTheBoard() {
            $(document).on('change', 'input#leftMsg', function () {
                var newMsg = $(this).val();
                var userPhoto = userInfo['UserPhotoLink'];
                userInfo['Message'] = newMsg;
                if (newMsg == '') {
                    return false;
                } else {
                    var userPhoto = userInfo['UserPhotoLink'];
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
                    msgRow += '<div id="msgRow" class="row"><div class="col-xs-4 text-right">';
                    msgRow += '<img src="' + userPhoto + '" alt="" class="portrait">';
                    msgRow += '</div> <div class="col-xs-8"><div>';
                    msgRow += newMsg + '<br>';
                    msgRow += '於' + dformat + '</div></div></div>';

                    //get msg function
                    function sendMsgDatBack(userInfo) {
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            headers: {
                                "Token": userInfo['Token'],
                            },
                            data: userInfo,
                            url: '/api/DreamPlan/UpdateMessage',
                            success: function (response) {
                                if (response.ReturnCode !== '00') {
                                    alert(response.ReturnCode);
                                }
                            }
                        });
                    }
                    //function send msg back server
                    // sendMsgDatBack(userInfo);

                    $('#msgLists').prepend(msgRow);
                    $(this).val('');
                }
            });
        }

        //function event click delete
        function clickDelete() {
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
                            data: userInfo,
                            headers: {
                                "Token": userInfo['Token'],
                            },
                            url: '/api/DreamPlan/DeleteData',
                            success: function (response) {
                                if (response.ReturnCode == '00') {
                                    alert('您已成功刪除。');
                                } else {
                                    alert(response.ReturnCode);
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
                userInfo['SharePhotoID'] = sharePhotoId;
                userInfo['PhotoMemo'] = contentText;
                //get msg function
                function sendMsgDatBack(userInfo) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            "Token": userInfo['Token'],
                        },
                        data: userInfo,
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
                    if (flagToStop) {
                        $.mobile.loading("show");
                        $.ajax({
                            type: 'GET',
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

        //click search Go button
        function clickSearchGo() {
            $(document).on('click', '.searchBtnGo', function () {
                $('#searchResultArea').empty();

                    $('.searchBarInput').empty();
                    //to load search data
                    $.mobile.loading("show");
                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: './json/test2.json',
                        success: function (response) {
                            loadNewHtml(response.Result);
                            infiniteScroll(userInfo);
                            clickShowRestImgList();
                            leaveNewMsgToTheBoard();
                            $.mobile.loading("hide");
                        }
                    });
            });
        }
        //fire the search event
        clickSearchGo();

        //funciton for click content and to edit
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
        //fire the function
        clickAbleContent();

        //bind the click memo and able to edit event
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

        //focus on input
        $(document).on('focus', '.searchBarInput', function () {
            $('#dateBox').animate({ 'bottom': '-100%' }, 300);
        })

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
                    type: 'POST',
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
                            alert(response.ReturnCode + '<br/>' + response.Message);
                        }
                    }
                });
            }
            //trigger the ajax function
            // callAjaxToSaveThumb(userInfo);
        });
    });
})(jQuery);




