$(document).ready(function () {
	        //创建类，采用键值对的方式
	        var obj = {
	        	"Link1":{"Link1.1":"bb","Link1.2":"cc","Link1.3":"dd"},
	        	"Link2":{"Link2.1":"aa","Link2.2":{"link2.2-1":"a1","link2.2-2":"a2","link2.2-3":"a3","link2.2-4":{"link2.2-4.1":"aa1","link2.2-4.2":"aa2","link2.2-4.3":"aa3"}}},
	        	"Link3":{"Link3.1":"aa","Link3.2":"bb","Link3.3":{"link3.3-1":"b1","link3.3-2":"b2","link3.3-3":"b3"}},
	        	"Link4":{"Link4.1":"aa","Link4.2":{"link4.2-1":"a1","link4.2-2":{"link4.2-1.1":"a1","link4.2-1.2":{"link4.2-1.1.1":"aa1","link4.2-1.2.1":{"link4.2-1.1.1.1":"aaa1","link4.2-1.2.1.1":"aaa2","link4.2-1.3.1.1":"aaa3"}}}}},
	        	"Link5":{"Link5.1":"aa","Link5.2":"bb","Link5.3":"cc","Link5.4":"dd"},
	        	"Link6":{"Link6.1":"aa","Link6.2":{"Link6.2-1":"c1","Link6.2-2":"c2","Link6.2-3":"c3"}},
	        	"Link7":{"Link7.1":"aa","Link7.2":"bb","Link7.3":{"Link7.3-1":"c1","Link7.3-2":"c2","Link7.3-3":"c3"}}
	        };
	        //动态创建
	        buildMenu(obj);
	        $(".menu").html(buildMenu(obj));
	    });
	    //创建按钮实例
	    function buildMenu(obj) {
	        var str = "<ul class='menu-link-ul'>";
	        $.each(obj, function (index, item) {
	            if (typeof(obj[index]) == "object") {
	                str += "<li>" + "<span>" + index + "</span>";
	                str += buildMenu(obj[index]); //递归判断是不是object,直到不是li
	                str += "</li>";
	            }
	            else {
	                str += "<li>" + index + "</li>"
	            }
	        });
	        str += "</ul>";
	        return str;
	    }
