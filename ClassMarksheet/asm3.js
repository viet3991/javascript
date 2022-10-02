$(document).ready(function(){
    var i = 0;
    // Bước 1
    $("#btnNhap").click(function(){
        // Khai báo object
        var testCore = {
            name: "",
            math: 0,
            physical: 0,
            chemistry: 0
        };
    
        // Gán giá trị nhập từ input vào object
    
        testCore.name = $("#name").val();
        while(!testCore.name) {
            alert("Xin vui lòng nhập lại tên");
            return false;    
        }
    
        testCore.math = $("#math").val();
        while(testCore.math < 0 || testCore.math > 10 || !testCore.math) {
            alert("Xin vui lòng nhập lại điểm Toán");
            return false;
        }
    
        testCore.physical = $("#physical").val();
        while(testCore.physical < 0 || testCore.physical > 10 || !testCore.physical) {
            alert("Xin vui lòng nhập lại điểm Vật lý");
            return false;
        }
    
        testCore.chemistry = $("#chemistry").val();
        while(testCore.chemistry < 0 || testCore.chemistry > 10 || !testCore.chemistry) {
            alert("Xin vui lòng nhập lại điểm Hóa học");
            return false;
        }
    
        
        // Gán giá trị vào bảng
        i = i + 1;
        $("#myTable tr:last").after("<tr><td>" + i + "</td><td>" + testCore.name.toUpperCase() + "</td><td>" + testCore.math + 
            "</td><td>" + testCore.physical + "</td><td>" + testCore.chemistry + "</td><td>?</td></tr>")
        
        // Xóa trắng ô input
        $("#name").val("");
        $("#math").val("");
        $("#physical").val("");
        $("#chemistry").val("");
        

    });


    // Bước 2
    
    $("#btnDiemTB").click(function(){
        
        $("#myTable tr").each(function(){  
            let math = parseFloat($(this).find("td").eq(2).html());
            let physical = parseFloat($(this).find("td").eq(3).html());
            let chemistry = parseFloat($(this).find("td").eq(4).html());
            $(this).find("td").eq(5).html(((math + physical + chemistry)/3).toFixed(1));
            
        });
    });

    
    // Bước 3
    $("#btnXepLoai").click(function(){

        var m = 0;
        $("#myTable tr").each(function(){
            if($(this).find("td").eq(5).html() == "?") {
                alert("Bạn phải tính điểm trung bình trước!");
                m++;
                return false;                       
            }
    
            if($(this).find("td").eq(5).html() >= 8.0) {
                $(this).find("td").addClass("red");
                m++;
            } 
        });
        
        if(m == 0) {
            alert("Không có học sinh giỏi")
        }
    });

    // Bước 3 plus
    $("#btnKem").click(function(){

        var k = 0;
        $("#myTable tr").each(function(){
            if($(this).find("td").eq(5).html() == "?") {
                alert("Bạn phải tính điểm trung bình trước!");
                k++;
                return false;                       
            }
    
            if($(this).find("td").eq(5).html() < 3.5) {
                $(this).find("td").addClass("kem");
                k++;
            } 
        });
        
        if(k == 0) {
            alert("Không có học sinh kém")
        }
    });
    
    
    // Bước 4
    $("#btnXoa").click(function(){
        var r = $("#rowDel").val();
        var tbLength = $("#myTable tr").length;
    
        while(r < 1 || !r || r > (tbLength - 1)) {
            alert("Xin vui lòng nhập lại STT dòng muốn xóa");
            $("#rowDel").val("");
            return false;
        }
        
        $("#myTable tr").eq(r).remove();
        $("#rowDel").val("");


        // Đánh số ở cột STT sau khi xóa dòng  
        let n = 0;            
        $("#myTable tr").each(function(){
            $(this).find("td").eq(0).html(n++);
        });

        i = $("#myTable tr").length - 1;

        

    });
    
})
