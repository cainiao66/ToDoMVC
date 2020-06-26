/*
 *  ID: 1754225
 *  Name: Ning Xinzhi
 *  Date: 2020 06 24
 *  Description: The javascript file for TOdoMVC.html
 */

notes = [];
notes_show = [];
max_id = 0;
clear_note = 0;
edit_note = 0;
state = 0;

window.onload = function(){
    if(localStorage.getItem("notes")!=null){
        notes = JSON.parse(localStorage.getItem("notes"))
        for(var i=0;i<notes.length;i++){
            if(notes[i].id>max_id){
                max_id = notes[i].id;
            }
        }
    }
    init_choose_button();
    init_add_button();
    init_clear_button();
    show();
}

init_choose_button = function(){
    var choose_div1 = document.getElementsByClassName("state");
    for(var i=0;i<choose_div1.length;i++){
        choose_div1[i].addEventListener('touchend',function(event){
            document.getElementById("menu_state").innerHTML = this.innerHTML;
            show();
        },false);
    }
    var choose_div1 = document.getElementsByClassName("tag");
    for(var i=0;i<choose_div1.length;i++){
        choose_div1[i].addEventListener('touchend',function(event){
            document.getElementById("menu_tag").innerHTML = this.innerHTML;
            show();
        },false);
    }
    var choose_div1 = document.getElementsByClassName("sort");
    for(var i=0;i<choose_div1.length;i++){
        choose_div1[i].addEventListener('touchend',function(event){
            document.getElementById("menu_sort").innerHTML = this.innerHTML;
            show();
        },false);
    }
    var choose_div1 = document.getElementsByClassName("order");
    for(var i=0;i<choose_div1.length;i++){
        choose_div1[i].addEventListener('touchend',function(event){
            document.getElementById("menu_order").innerHTML = this.innerHTML;
            show();
        },false);
    }
}

init_add_button = function(){
    var screenHeight = document.documentElement.clientHeight;  
    var add_div = document.getElementById("tool"); 
    add_div.move = false;
    add_div.addEventListener('touchmove', function(event) {
        this.move = true;
        if (event.targetTouches.length == 1) {
            event.preventDefault();
            var touch = event.targetTouches[0]; 
            if((touch.pageY/screenHeight)<=0.1)
            {
                //too high
                add_div.style.top="10%";
            }
            else if((touch.pageY/screenHeight)>=0.9)
            {
                //too low
                add_div.style.top="90%";
            }
            else
            {
                add_div.style.top = (touch.pageY/screenHeight*100).toString()+"%"
            }
        }
    }, false);
    add_div.addEventListener("touchend",function(event){
        if(this.move == false){
            document.getElementById("add_layer").style.display = "block";
            document.getElementById("add").style.display = "none";
            document.getElementById("clear").style.display = "none";
        }
        this.move = false;
    },false);
    var close_div = document.getElementById("add_close");
    close_div.addEventListener("touchend",function(event){
        document.getElementById("add_layer").style.display = "none";
        document.getElementById("add").style.display = "block";
        document.getElementById("clear").style.display = "block";
    },false);
    var cancel_div = document.getElementById("add_cancel");
    cancel_div.addEventListener("touchend",function(event){
        document.getElementById("add_layer").style.display = "none";
        document.getElementById("add").style.display = "block";
        document.getElementById("clear").style.display = "block";
    },false);
    var confirm_div = document.getElementById("add_confirm");
    confirm_div.addEventListener("touchend",function(event){
        title = document.getElementById("add_title").value
        if(title == ""){
            alert("任务标题不能为空！")
        }
        else{
            tag = document.getElementById("add_tag").value;
            start_year = document.getElementById("add_start_year").value;
            start_month = document.getElementById("add_start_month").value;
            start_day = document.getElementById("add_start_day").value;
            start_hour = document.getElementById("add_start_hour").value;
            end_year = document.getElementById("add_end_year").value;
            end_month = document.getElementById("add_end_month").value;
            end_day = document.getElementById("add_end_day").value;
            end_hour = document.getElementById("add_end_hour").value;
            order = document.getElementById("add_order").value;
            info = document.getElementById("add_info").value;
            var note = {};
            max_id += 1;
            note.id = max_id ;
            note.state = 0;
            note.title = title;
            note.tag = tag;
            note.start_year = start_year;
            note.start_month = start_month;
            note.start_day = start_day;
            note.start_hour = start_hour;
            note.end_year = end_year;
            note.end_month = end_month;
            note.end_day = end_day;
            note.end_hour = end_hour;
            note.order = order;
            note.info = info;
            notes.push(note);
            document.getElementById("add_title").value = "";
            document.getElementById("add_info").value = "";
            document.getElementById("add_layer").style.display = "none";
            document.getElementById("add").style.display = "block";
            document.getElementById("clear").style.display = "block";
            localStorage.setItem("notes",JSON.stringify(notes));
            show();
        }
    },false);
}

init_clear_button = function(){
    var screenHeight = document.documentElement.clientHeight;  
    var clear_div = document.getElementById("tool_clear"); 
    clear_div.mone = false;
    clear_div.addEventListener('touchmove', function(event) {
        this.move = true;
        if (event.targetTouches.length == 1) {
            event.preventDefault();
            var touch = event.targetTouches[0]; 
            if((touch.pageY/screenHeight)<=0.1)
            {
                //too high
                clear_div.style.top="10%";
            }
            else if((touch.pageY/screenHeight)>=0.9)
            {
                //too low
                clear_div.style.top="90%";
            }
            else
            {
                clear_div.style.top = (touch.pageY/screenHeight*100).toString()+"%"
            }
        }
    }, false); 
    clear_div.addEventListener("touchend",function(event){
        if(this.move == false){
            document.getElementById("clear_layer").style.display = "block";
        }
        this.move = false;
    },false);
    var close_div = document.getElementById("clear_close");
    close_div.addEventListener("touchend",function(event){
        document.getElementById("clear_layer").style.display = "none";
    },false);
    var cancel_div = document.getElementById("clear_cancel");
    cancel_div.addEventListener("touchend",function(event){
        document.getElementById("clear_layer").style.display = "none";
    },false);
    var confirm_div = document.getElementById("clear_confirm");
    confirm_div.addEventListener("touchend",function(event){
        lines = document.getElementsByClassName("content_line");
        for(var i=0;i<lines.length;i++){
            var temp_id = lines[i].id;
            for(var j=0;j<notes.length;j++){
                if(notes[j].id==temp_id){
                    notes.splice(j,1);
                    break;
                }
            }
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        document.getElementById("clear_layer").style.display = "none";
        show();
    },false);
}

init_todo_button = function(){
    var todo_div = document.getElementsByName("todo");
    for(var i=0;i<todo_div.length;i++){
        todo_div[i].addEventListener('touchstart',function(event){
            note_id = this.parentNode.parentNode.id;
            for(var i=0;i<notes.length;i++){
                if(notes[i].id==note_id){
                    notes[i].state = 1-notes[i].state;
                    break;
                }
            }
            event.target.parentNode.move = true;
            localStorage.setItem("notes",JSON.stringify(notes));
            show();
        }, false);
    }
    var all_todo_div = document.getElementById("all_todo");
    all_todo_div.addEventListener('touchstart',function(event){
        for(var i=0;i<notes_show.length;i++){
            notes_show[i].state = 1;
        }
        this.className = "iconfont icon-todo"
        localStorage.setItem("notes",JSON.stringify(notes));
        show();
    }, false);
}

init_note = function(){
    var expansion = null; //是否存在展开的list
    var container = document.getElementsByClassName("note")
    for(var i = 0; i < container.length; i++){    
        var x, y, X, Y, swipeX, swipeY;
        container[i].addEventListener('touchstart', function(event) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
            swipeX = true;
            swipeY = true ;
            if(expansion){   //判断是否展开，如果展开则收起
                expansion.className = "note";
                var edit_div = expansion.nextSibling.nextSibling
                edit_div.style.display = "none"
            }       
        });
        container[i].move = false;
        container[i].addEventListener('touchend', function(event) {
            if(this.move == false){
                note_id = this.parentNode.id
                for(var i=0;i<notes.length;i++){
                    if(notes[i].id==note_id){
                        document.getElementById("note_title").innerHTML = notes[i].title;
                        document.getElementById("note_tag").innerHTML = notes[i].tag;
                        document.getElementById("note_start").innerHTML = notes[i].start_year+"年"+notes[i].start_month+"月"+notes[i].start_day+"日"+notes[i].start_hour+"时";
                        document.getElementById("note_end").innerHTML = notes[i].end_year+"年"+notes[i].end_month+"月"+notes[i].end_day+"日"+notes[i].end_hour+"时";
                        document.getElementById("note_order").innerHTML = notes[i].order;
                        document.getElementById("note_info").innerHTML = notes[i].info;
                        break;
                    }
                }
                document.getElementById("note_layer").style.display = "block";
            }
            this.move = false;
        },false);
        var close_div = document.getElementById("note_close");
        close_div.addEventListener("touchend",function(event){
            document.getElementById("note_layer").style.display = "none";
        },false);
        container[i].addEventListener('touchmove', function(event){
            this.move = true;
            var edit_div = this.nextSibling.nextSibling
            X = event.changedTouches[0].pageX;
            Y = event.changedTouches[0].pageY;        
            // 左右滑动
            if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
                // 阻止事件冒泡
                event.stopPropagation();
                if(X - x > 10){   //右滑
                    event.preventDefault();
                    this.className = "note";    //右滑收起
                    edit_div.style.display = "none"
                }
                if(x - X > 10){   //左滑
                    event.preventDefault();
                    this.className = "note_left";   //左滑展开
                    edit_div.style.display = "inline-block"
                    expansion = this;
                }
                swipeY = false;
            }   
        });
    }
}

init_edit_button = function(){
    var edit_note_divs = document.getElementsByName("edit_note"); 
    for(var i=0;i<edit_note_divs.length;i++){
        edit_note_div = edit_note_divs[i];
        edit_note_div.addEventListener("touchend",function(event){
            edit_note = this.parentNode.parentNode.id;
            edit_id = this.parentNode.parentNode.id;
            for(var i=0;i<notes.length;i++){
                if(notes[i].id==edit_id){
                    document.getElementById("edit_title").value= notes[i].title;
                    document.getElementById("edit_tag").value = notes[i].tag;
                    document.getElementById("edit_start_year").value = notes[i].start_year;
                    document.getElementById("edit_start_month").value = notes[i].start_month;
                    document.getElementById("edit_start_day").value = notes[i].start_day;
                    document.getElementById("edit_start_hour").value = notes[i].start_hour;
                    document.getElementById("edit_end_year").value = notes[i].end_year;
                    document.getElementById("edit_end_month").value = notes[i].end_month;
                    document.getElementById("edit_end_day").value = notes[i].end_day;
                    document.getElementById("edit_end_hour").value = notes[i].end_hour;
                    document.getElementById("edit_order").value = notes[i].order;
                    document.getElementById("edit_info").value = notes[i].info;
                    break;
                }
            }
            document.getElementById("edit_note_layer").style.display = "block";
            document.getElementById("add").style.display = "none";
            document.getElementById("clear").style.display = "none";
        },false);
    }
    var close_div = document.getElementById("edit_note_close");
    close_div.addEventListener("touchend",function(event){
        document.getElementById("edit_note_layer").style.display = "none";
        document.getElementById("add").style.display = "block";
        document.getElementById("clear").style.display = "block";
    },false);
    var cancel_div = document.getElementById("edit_note_cancel");
    cancel_div.addEventListener("touchend",function(event){
        document.getElementById("edit_note_layer").style.display = "none";
        document.getElementById("add").style.display = "block";
        document.getElementById("clear").style.display = "block";
    },false);
    var confirm_div = document.getElementById("edit_note_confirm");
    confirm_div.addEventListener("touchend",function(event){
        title = document.getElementById("edit_title").value
        if(title == ""){
            alert("任务标题不能为空！")
        }
        else{
            for(var i=0;i<notes.length;i++){
                if(notes[i].id==edit_note){
                    notes[i].title = document.getElementById("edit_title").value;
                    notes[i].tag = document.getElementById("edit_tag").value ;
                    notes[i].start_year = document.getElementById("edit_start_year").value;
                    notes[i].start_month = document.getElementById("edit_start_month").value ;
                    notes[i].start_day = document.getElementById("edit_start_day").value;
                    notes[i].start_hour = document.getElementById("edit_start_hour").value;
                    notes[i].end_year = document.getElementById("edit_end_year").value ;
                    notes[i].end_month = document.getElementById("edit_end_month").value;
                    notes[i].end_day = document.getElementById("edit_end_day").value;
                    notes[i].end_hour = document.getElementById("edit_end_hour").value;
                    notes[i].order = document.getElementById("edit_order").value;
                    notes[i].info = document.getElementById("edit_info").value;
                    break;
                }
            }
            localStorage.setItem("notes",JSON.stringify(notes));
            show();
            document.getElementById("edit_note_layer").style.display = "none";
            document.getElementById("add").style.display = "block";
            document.getElementById("clear").style.display = "block";
        }
    },false);
}

init_clear_note_button = function(){
    var clear_note_divs = document.getElementsByName("clear_note"); 
    for(var i=0;i<clear_note_divs.length;i++){
        clear_note_div = clear_note_divs[i];
        clear_note_div.addEventListener("touchend",function(event){
            clear_note = this.parentNode.parentNode.id
            document.getElementById("clear_note_layer").style.display = "block";
        },false);
    }
    var close_div = document.getElementById("clear_note_close");
    close_div.addEventListener("touchend",function(event){
        document.getElementById("clear_note_layer").style.display = "none";
    },false);
    var cancel_div = document.getElementById("clear_note_cancel");
    cancel_div.addEventListener("touchend",function(event){
        document.getElementById("clear_note_layer").style.display = "none";
    },false);
    var confirm_div = document.getElementById("clear_note_confirm");
    confirm_div.addEventListener("touchend",function(event){
        for(var i=0;i<notes.length;i++){
            if(notes[i].id==clear_note){
                notes.splice(i,1);
                break;
            }
        }
        document.getElementById("clear_note_layer").style.display = "none";
        localStorage.setItem("notes",JSON.stringify(notes));
        show();
    },false);
}

choose_state = function(){
    temp_notes = []
    if(document.getElementById("menu_state").innerHTML == "全部"){
        temp_notes = notes_show;
    }
    else if(document.getElementById("menu_state").innerHTML == "状态"){
        temp_notes = notes_show;
    }
    else if(document.getElementById("menu_state").innerHTML == "未完成"){
        for(var i=0;i<notes_show.length;i++){
            if(notes_show[i].state == 0){
                temp_notes.push(notes_show[i]);
            }
        }
    }
    else{
        for(var i=0;i<notes_show.length;i++){
            if(notes_show[i].state == 1){
                temp_notes.push(notes_show[i]);
            }
        }
    }
    notes_show = temp_notes;
}

choose_tag = function(){
    temp_notes = []
    if(document.getElementById("menu_tag").innerHTML == "全部"){
        temp_notes = notes_show;
    }
    else if(document.getElementById("menu_tag").innerHTML == "标签"){
        temp_notes = notes_show;
    }
    else{
        for(var i=0;i<notes_show.length;i++){
            if(notes_show[i].tag == document.getElementById("menu_tag").innerHTML){
                temp_notes.push(notes_show[i]);
            }
        }
    }
    notes_show = temp_notes;
}

choose_order = function(){
    temp_notes = []
    if(document.getElementById("menu_order").innerHTML == "全部"){
        temp_notes = notes_show;
    }
    else if(document.getElementById("menu_order").innerHTML == "优先级"){
        temp_notes = notes_show;
    }
    else{
        for(var i=0;i<notes_show.length;i++){
            if(notes_show[i].order == document.getElementById("menu_order").innerHTML){
                temp_notes.push(notes_show[i]);
            }
        }
    }
    notes_show = temp_notes;
}

sort = function(){
    temp_notes = []
    if(document.getElementById("menu_sort").innerHTML == "排序"){
        temp_notes = notes_show;
    }
    else if(document.getElementById("menu_sort").innerHTML == "默认"){
        temp_notes = notes_show;
    }
    else if(document.getElementById("menu_sort").innerHTML == "起始时间"){
        for(var i=0;i<notes_show.length;i++){
            temp_notes.push(notes_show[i]);
        }
        temp_notes.sort(sortStart);
    }
    else if(document.getElementById("menu_sort").innerHTML == "终止时间"){
        for(var i=0;i<notes_show.length;i++){
            temp_notes.push(notes_show[i]);
        }
        temp_notes.sort(sortEnd);
    }
    else{
        for(var i=0;i<notes_show.length;i++){
            temp_notes.push(notes_show[i]);
        }
        temp_notes.sort(sortOrder);
    }
    notes_show = temp_notes;
}

sortOrder = function(a,b){
    dict = {"最重要":4,"重要":3,"一般":2,"不重要":1}
    return -1*(dict[a.order] - dict[b.order]);
}

sortStart = function(a,b){
    if(a.start_year != b.start_year){
        if(a.start_year == ''){
            return 1;
        }
        else if(b.start_year == ''){
            return -1;
        }
        else{
            return a.start_year - b.start_year
        }
    }
    else if(a.start_month != b.start_month){
        if(a.start_month == ''){
            return 1;
        }
        else if(b.start_month == ''){
            return -1;
        }
        else{
            return a.start_month - b.start_month
        }
    }
    else if(a.start_day != b.start_day){
        if(a.start_day == ''){
            return 1;
        }
        else if(b.start_day == ''){
            return -1;
        }
        else{
            return a.start_day - b.start_day
        }
    }
    else if(a.start_hour != b.start_hour){
        if(a.start_hour == ''){
            return 1;
        }
        else if(b.start_hour == ''){
            return -1;
        }
        else{
            return a.start_hour - b.start_hour
        }
    }else{
        return 0;
    }
}

sortEnd = function(a,b){
    if(a.end_year != b.end_year){
        if(a.end_year == ''){
            return 1;
        }
        else if(b.end_year == ''){
            return -1;
        }
        else{
            return a.end_year - b.end_year
        }
    }
    else if(a.end_month != b.end_month){
        if(a.send_month == ''){
            return 1;
        }
        else if(b.end_month == ''){
            return -1;
        }
        else{
            return a.end_month - b.end_month
        }
    }
    else if(a.end_day != b.end_day){
        if(a.end_day == ''){
            return 1;
        }
        else if(b.end_day == ''){
            return -1;
        }
        else{
            return a.end_day - b.end_day
        }
    }
    else if(a.end_hour != b.end_hour){
        if(a.end_hour == ''){
            return 1;
        }
        else if(b.end_hour == ''){
            return -1;
        }
        else{
            return a.end_hour - b.end_hour
        }
    }else{
        return 0;
    }
}

search = function(){
    temp_notes = []
    var txt = document.getElementById("search").value;
    if(txt == ""){
        temp_notes = notes_show;
    }
    else{
        for(var i=0;i<notes_show.length;i++){
            if(notes_show[i].title.indexOf(txt)!=-1 || notes_show[i].info.indexOf(txt)!=-1){
                temp_notes.push(notes_show[i]);
            }
        }
    }
    notes_show = temp_notes;
}

show = function(){
    notes_show = notes;
    choose_state();
    choose_tag();
    choose_order();
    sort();
    search();
    console.log(notes_show);
    var content_div = document.getElementById("content");
    content_div.innerHTML = ''
    var mystr = ''
    for(var i=0;i<notes_show.length;i++){
        mystr  += '<div class="content_line" id="'
        mystr += notes_show[i].id;
        if(notes_show[i].state ==0){
            mystr += '"> \
            <div class="note"> \
                <span class="iconfont icon-todolist-choose" name="todo"></span> \
                <div class="todo_text">';
        }
        else{
            mystr += '"> \
            <div class="note"> \
                <span class="iconfont icon-todo" name="todo"></span> \
                <div class="todo_text">';
        }
        mystr  += notes_show[i].title;
        mystr  += '</div> \
        </div> \
        <div class="edit"> \
            <span class="iconfont icon-bianji" name="edit_note"></span> \
            <span class="iconfont icon-shanchu" name="clear_note"></span> \
        </div> \
        </div>'
    }
    content_div.innerHTML = mystr;
    init_note();
    init_todo_button();
    init_edit_button();
    init_clear_note_button();
}

 