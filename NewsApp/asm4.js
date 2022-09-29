// dd2bc12b5ece3f6f04c0035797360ad1
// c7b7fd57c02b3c31f87f9fdfcffdc242
// 6662e3de339d09f28704dc0069b6775b

// Lấy dữ liệu headlines
var tk = '6662e3de339d09f28704dc0069b6775b';
gohome();

function gohome() {
    document.getElementById("load").style.display = "block"; // mở loading
    document.getElementById("returnArt").style.opacity = "0.1";

    fetch('https://gnews.io/api/v4/top-headlines?&lang=en&token=' + tk)
        .then(function (x) {
            return x.json();
        })
        .then(function (y) {

            var myNews = y.articles;
            var output = "";
            for (var i = 0; i < myNews.length; i++) {
                output += getArt(myNews[i].image, myNews[i].url, myNews[i].title, myNews[i].publishedAt, myNews[i].description);
            }

            document.getElementById("load").style.display = "none"; // tắt loading
            document.getElementById("returnArt").style.opacity = "1";
            document.getElementById("returnArt").innerHTML = output; // xuất dữ liệu ra html
        });
    
}


// Lấy dữ liệu từ search
function searchKey() {

    document.getElementById("load").style.display = "block"; // mở loading 

    var x = document.getElementById("fromDate").value; // lọc theo thời gian từ:
    var y = document.getElementById("toDate").value; // lọc theo thời gian đến: 

    if (x) {
        var fromDate = x + "T00:00:00Z"; // hiệu chuẩn thời gian theo chuẩn của trang gnews.io
    }
    if (y) {
        var toDate = y + "T23:59:59Z";
    }

    // console.log(fromDate);
    // console.log(toDate);

    var keywords = document.getElementById("keywords").value; // từ khóa tìm kiếm

    fetch('https://gnews.io/api/v4/search?q=' + keywords + '&from=' + fromDate + '&to=' + toDate + '&token=' + tk)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var myNews1 = data.articles;
            var output1 = "";

            var lenNews = myNews1.length;

            for (var i = 0; i < lenNews; i++) {
                output1 += getArt(myNews1[i].image, myNews1[i].url, myNews1[i].title, myNews1[i].publishedAt, myNews1[i].description);
            }

            document.getElementById("load").style.display = "none"; // tắt loading
            document.getElementById("returnArt").innerHTML = output1;  // xuất dữ liệu ra html  



        });

    var fromDate = ""; // xóa biến
    var toDate = "";

    document.getElementById("keywords").value = ""; // xóa từ khóa tìm kiếm ở input
    document.getElementById("fromDate").value = ""; // xóa thời gian lọc từ input
    document.getElementById("toDate").value = "";
    cancelSearch();

}


// mở form search khi nhấn nút vào biểu tượng "tìm kiếm" ở header
function formSearch() {
    document.getElementById("search").style.display = "block"; // hiển thị form tìm kiếm
    document.getElementById("header").style.opacity = "0.1"; // làm mờ phần header
    document.getElementById("returnArt").style.opacity = "0.1"; // làm mờ phần nội dung


}

// tắt form search khi nhấn vào biểu tượng "xóa" ở cuối form
function cancelSearch() {
    document.getElementById("search").style.display = "none"; // tắt form search
    document.getElementById("header").style.opacity = "1"; // bỏ làm mờ
    document.getElementById("returnArt").style.opacity = "1";
}

// hàm tạo biến text chứa nội dung và các phần tử trong html
function getArt(a, b, c, d, e) {
    var x =
        "<div class=\"col-lg-4 myArt\">" +
        "<img src=\"" + a + "\" alt=\"image-error-404\" style=\"width:100%; height: auto;\">" +
        "</div>" +
        "<div class=\"col-lg-8 myArt\">" +
        "<a href=\"" + b + "\" target=\"_blank\">" + c + "</a>" +
        "<br>" +
        "<p><i>" + d + "</i></p>" +
        "<p>" + e + "</p>" +
        "</div>";
    return x;
}