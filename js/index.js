$(function () {
    //抓取localStorage
    var i = localStorage.getItem('i') || 0;
    var data = localStorage.getItem('data') || "";
    var adata = data.replace(/inline/, "none");
    $("#todobody").html(adata);
    $("#todoCount").text(i);
    // 將資料內容和count儲存到localstorage
    function store() {
        localStorage.setItem("i", i);
        localStorage.setItem("data", $("#todobody").html());
    }
    // 開關todo list
    $("#todo-btn").click(
        function () {
            $("#todo").toggle();
        }
    );
    // todo input按下enter輸入
    $("#todo-input").keyup(function (e) {
        if (e.keyCode == 13 && $("#todo-input").val() != "") {
            uploadTodo();
        }
    });
    // 定義輸入todo function
    function uploadTodo() {
        var todoValue = $("#todo-input").val();

        var template = `<li class="todoli view" draggable="true"> 
                        <i class ="fas fa-minus-circle del-btn"> </i>
                        <input type="checkbox" class="checkbox">
                        <span class="todospan">${todoValue}</span>
                         </li>`;
        $("#todobody").append(template);
        // console.log(typeof $("#todobody").html());
        // 清空input
        $("#todo-input").val("");
        // todo count累加
        $("#todoCount").text(++i);
        store();
    }
    // 刪除按鈕滑鼠移入後才顯示, 移出隱藏
    $("#todobody").on("mouseenter", ".todoli", function () {
        $(this).children(":first").show();
    });
    $("#todobody").on("mouseleave", ".todoli", function () {
        $(this).children(":first").hide();
    });
    // 定義刪除todo按鈕功能
    $("#todobody").on("click", ".del-btn", function () {
        if (!$(this).siblings(":nth-child(2)").prop('checked')) {
            $("#todoCount").text(--i);
        }
        $(this).parent().remove();
        store();
        // console.log("delete");
    });
    // todo可拖移位置 by jqueryUI
    $("#todo").on("mouseover dragenter dragover", "#todobody", function () {
        $("#todobody").sortable();
        $("#todobody").disableSelection();
        store();
    });
    // checkbox 點擊
    $("#todobody").on("click", ".checkbox", function () {
        if ($(this).prop('checked')) {
            $(this).attr('checked', 'checked');
            $(this).siblings(":last").addClass("checkspan");
            $("#todoCount").text(--i);
            // console.log("checked");
        } else {
            $(this).removeAttr('checked');
            $(this).siblings(":last").removeClass("checkspan");
            $("#todoCount").text(++i);
            // console.log("unchecked");
        }
        store();
    });
    // 雙擊編輯todo內容
    $("#todobody").on("dblclick", ".todospan", function (e) {
        $("#todobody").sortable('disable');
        $("#todobody").enableSelection();
        if (!$(this).siblings(":nth-child(2)").prop('checked')) {
            $(this).addClass("edit");
            $(this).attr("contenteditable", "true");
            $(this).focusEnd();
            $(this).off("focusout").focusout(function () {
                // console.log("focusout")
                $(this).removeClass("edit");
                $(this).removeAttr("contenteditable");
                $("#todobody").sortable('enable');
                $("#todobody").disableSelection();
                // 如果編輯值為空值, 執行刪除
                if ($(this).text() == "") {
                    $(this).parent().remove();
                    $("#todoCount").text(--i);
                }
                store();
            });
            $(this).off("keydown").keydown(function (e) {
                if (e.keyCode == 13) {
                    // console.log("enter")
                    $(this).removeAttr("contenteditable");
                    e.preventDefault();
                }
            });
        }
    });
    $.fn.focusEnd = function () {
        $(this).focus();
        var tmp = $('<span />').appendTo($(this)),
            node = tmp.get(0),
            range = null,
            sel = null;

        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(node);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        tmp.remove();
        return this;
    }
});