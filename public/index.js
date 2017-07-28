$("document").ready(() => {

    var arr = [];
    var indexOn = -1;
    var idOn = "";
    var NUMBERURL = 5;
    $("#tag").hide();
    $("#submitTag").hide();
    $("#send").hide();
    $("#getPlus").hide();

    function reset() {
        arr = []
        indexOn = -1;
        idOn = "";
    }
    function display(data) {
        var result = "";
        for (var index in data) {

            var url = data[index].url;
            var id = data[index].id_url;

            var newUrl = "<div class=\"url\" id=\"" + id + "\" index=\"" + index + "\">" + "<b>Url " + index + " :</b>" +
                "<button class=\"btn tagbtn\" > <a href=\""
                + url + "\" target=\"_blank\">" + url.substring(7, 42) + "</a></button><br><h class=\"listTag index"
                + index + "\"></h></div>";

            result += newUrl;
        }

        return result;
    }


    $("#getUrl").on('click', function () {

        reset()

        $.post("/", { message: "getUrl" },
            function (data, status) {
                console.log(data.data);

                $("#urls").html(display(data.data));
            })
        $(this).hide();
        $("#send").show();
        $("#getUrlPlus").hide();

    })

    $("#submitID").live('click', function() {
        $("#getPlus").hide()
        var val = $("#inputID").val()
        
        $.post("/", { message: "getUrlPlus", id:val },
            function (data, status) {
                console.log(data.data);

                $("#urls").html(display(data.data));
            })
        $(this).hide();
        $("#send").show();

    })

    $("#getUrlPlus").on('click',function() {
        $("#getUrl").hide()
        $("#getPlus").show()
        $(this).hide()
    })

    $(".tagbtn").live('click', function () {
        var index = $(this).parent().attr('index')
        var value = $(this).html()
        idOn = $(this).parent().attr('id')
        indexOn = index

        $('input:checkbox').removeAttr('checked');

        $("#tag").show();
        $("#submitTag").show();
        $("#name").html("Url " + index + " : " + value)
    })

    $("#submitTag").live('click', function () {
        var value = ""
        var listTags = ""
        $('input:checkbox:checked').each(function () {
            value += $(this).attr('value') + ","
            listTags += check($(this).attr('value')) + "<br>"
        })
        value = value.slice(0, -1);
        if (indexOn != -1) {
            arr[indexOn] = { id: idOn, value: value }
        }
        $('.index' + indexOn).html(listTags)
        $("#tag").hide()
        $("#submitTag").hide()
    })

    function send(index) {
        if(index >= NUMBERURL) return;
        if (arr[index] == null) {
            send(index + 1)
        }
        else {
            $.post("/", { message: "setUrl", data: JSON.stringify(arr[index]) },
                function (data, status) {
                    send(index + 1)
                })
        }
    }

    $("#send").live('click', function () {
        console.log(arr)
        send(0)
        $("#urls").html("")
        $("send").hide()
        $("#getUrl").show()
        $(this).hide()
        $("#getUrlPlus").show()

    })


    function check(id) {
        var checkDict = {'18': 'Bán buôn bán lẻ', '118': 'Trung tâm thương mại', '70': 'Dịch vụ thể dục, thể thao thẩm mỹ', '125': 'Tổ chức phi chính phủ, đại sứ quán', '28':'Linh kiện, phụ kiện thiết bị kỹ thuật số', '81': 'Túi xách, Ba lô, Valy', '120': 'Đại lý phân phối', '155': 'Vận tải hành khách', '137': 'Sản phẩm Nông nghiệp', '38': 'Du lịch', '40': 'Việc làm', '116': 'Kênh truyền hình', '58': 'Sữa bột dành cho trẻ em >12 tháng tuổi', '154': 'Kiểm toán', '42': 'Hóa phẩm: Xà phòng giặt, xà phòng tắm, nước xả vải, nước rửa chén, dung dịch tẩy rửa,...', '6': 'Du lịch & vận tải', '131': 'Ấn phẩm khác: băng đĩa, in ấn', '112': 'Ngân hàng', '68': 'Thiết bị y tế', '41': 'Giáo dục', '87': 'Quạt (hơi nước, tích điện, cây, bàn,...) Lò sưởi, quạt sưởi, đèn sưởi,...', '175': 'Ngoại ngữ', '39': 'Vận tải', '176': 'Tư vấn du học/MBA', '179': 'Tiếng Trung', '100': 'Ngoại thất (sân vườn, cảnh quan,..)', '122': 'Sàn Thương mại điện tử', '51': 'Hàng tiêu dùng khác', '130': 'Năng lượng (Gas, xăng, dầu …)', '24': 'Mẹ và bé', '91': 'Sản xuất vật tư, vật liệu xây dựng', '26': 'Máy ảnh/ Máy quay', '105': 'Ô tô', '84': 'Phụ kiện khác (dây lưng, ví da,…)', '85': 'Xây dựng', '170': 'Sữa bột dành cho người lớn ( sữa canxi, sữa bột nói chung,…)', '82': 'Máy hút/Máy lọc/Máy xay/ Máy vắt/Máy ép,...', '117': 'Cho thuê tài chính', '4': 'Máy tính/laptop/máy tính bảng', '151': 'Dịch vụ du lịch khác', '12': 'Thời trang & trang sức', '113': 'Bảo hiểm', '147': 'Dịch vụ chụp ảnh', '52': 'Rau củ quả', '162': 'Thời trang - phụ kiện cho mẹ và bé', '111': 'Dịch vụ sửa chữa, cứu hộ ô tô, xe máy', '139': 'Sản phẩm Thủy sản', '129': 'Hóa chất (hóa chất công nghiệp, chế phẩm môi trường)', '7': 'Việc làm & Giáo dục', '180': 'Tiếng Nhật', '148': 'Dịch vụ lưu trú: biệt thự, khách sạn, nhà khách, nhà nghỉ, nhà trọ,...', '185': 'Các ngoại ngữ khác', '128': 'Dịch vụ internet: dịch vụ website, trang tin điện tử', '150': 'Dịch vụ khác', '184': 'Dụng cụ thể dục, thể thao/ Dụng cụ chăm sóc sắc đẹp', '46': 'Thực phẩm', '76': 'Trang phục nữ', '109': 'Phụ tùng ô tô, xe máy, xe đạp', '49': 'Đồ uống', '93': 'Chủ đầu tư, dự án BĐS', '107': 'Dịch vụ viễn thông: Internet, điện thoại, truyền hình', '65': 'Thuốc chữa bệnh', '106': 'Xe máy', '174': 'Khóa học ngắn hạn: thiết kế, kế toán, tin học', '43': 'Đồ gia dụng: Bát, đĩa, thìa, dĩa, cốc, chén, ấm nước,...', '34': 'Máy văn phòng', '50': 'Ngũ cốc', '164': 'Vitamin, thuốc, thực phẩm chức năng cho mẹ và bé', '83': 'Đồng hồ', '80': 'Giày dép nam', '177': 'Giáo dục khác (sách, trang thiết bị giáo dục, ấn phẩm giáo dục,...)', '19': 'Luật & chính phủ', '27': 'Tivi/ Màn hình LCD/Dàn audio/Loa/Đầu KTS', '23': 'Game', '48': 'Sữa', '149': 'Dịch vụ vệ sinh', '135': 'In ấn và các sản phẩm phụ trợ', '89': 'Cung ứng vật tư, vật liệu xây dựng', '22': 'Kế toán - Kiểm toán', '59': 'Sữa bột dành cho người lớn (sữa canxi, sữa bột nói chung,…)', '31': 'Điều hòa/ Bìnhnóng lạnh', '36': 'Truyền thông', '169': 'Sữa bột dành cho trẻ em >12 tháng tuổi', '63': 'Dược phẩm', '25': 'Điện thoại di động/ Điện thoại cố định/ Bộ đàm', '74': 'Trang sức', '156': 'Hàng không: hãng hàng không, phòng vé,...', '114': 'Chứng khoán', '123': 'Dịch vụ pháp luật : Tư vấn luật, công chứng, thừa phát lại …', '160': 'Midcore', '102': 'Quán bar & Café', '165': 'Sữa và các chế phẩm từ sữa', '21': 'Dịch vụ', '10': 'Y tế và Thuốc', '77': 'Trang phục nam', '47': 'Văn phòng phẩm', '119': 'Hệ thống siêu thị', '166': 'Hàng không: hãng hàng không, phòng vé,...', '44': 'Hóa mỹ phẩm: dầu gội, sữatắm, nước hoa, kem đánh răng, mỹ phẩm khác,...', '134': 'Máy công nghiệp', '30': 'Máy giặt/Máy sấy quần áo/Máy hút bụi', '14': 'Đồ nội thất, ngoại thất', '90': 'Xây dựng nhà cửa, công trình...', '124': 'Báo chí, tạp chí', '181': 'Dụng cụ điện: máy khoan, xịt áp lực, máy cắt, máy mài, máy bào', '5': 'Điện lạnh', '56': 'Sữa bột', '75': 'Trang phục', '1': 'Điện tử & điện lạnh', '35': 'Viễn thông', '61': 'Đồ uống có cồn: Bia, rượu …', '57': 'Đèn điện/Bếp điện/Bàn là', '153': 'Vận tải hàng hóa', '67': 'Khám chữa bệnh (Bệnh viện, phòng khám, dịch vụ y tế...)', '78': 'Giày dép', '127': 'Điện (vật tư thiết bị điện công nghiệp)', '69': 'Spa, Massage', '188': 'Thể thao', '133': 'Khoa học và công nghệ', '145': 'Tour du lịch: inbound, out bound', '11': 'Chăm sóc sắc đẹp', '88': 'Thiết kế kiến trúc', '167': 'Khóa học dành cho mẹ', '15': 'Nhà hàng, quán bar, trung tâm giải trí', '161': 'Hardcore', '158': 'Tàu biển, du thuyền', '2': 'Viễn thông & truyền thông', '53': 'Thịt cá tươi sống, hải sản tươi sống,…', '178': 'Tiếng Anh', '152': 'Kế toán', '141': 'Hội chợ, triển lãm, sự kiện, hội nghị', '60': 'Các chế phẩm từ sữa như phô mai, váng sữa, sữa chua,…', '143': 'Dịch vụ Quà Tặng (tư vấn, kinh doanh, chuyển phát quà tặng …)', '101': 'Nhà hàng & Quán ăn', '121': 'Kênh phát thanh', '140': 'Ngành khác', '20': 'Ngành công nghiệp, đặc thù', '13': 'Xây dựng và bất động sản', '182': 'Bánh kẹo/ Đồ hộp, thực phẩm chế biến sẵn, ăn liền', '132': 'Sản phẩm công nghiệp', '92': 'Xây dựng khác', '62': 'Đồ uống không cồn: nước ngọt, nước tinh khiết, nước khoáng …', '71': 'Beauty salon', '64': 'Y tế & Thiết bị y tế', '79': 'Giày dép nữ', '98': 'Điện tử và điện lạnhkhác', '37': 'Viễn thông và truyền thông khác: phần mềm quản lý,...', '104': 'Trung tâm giải trí (công viên, rạp chiếu phim, khu vui chơi...)', '110':'Hoạt động xử lý dữ liệu, cho thuê hosting và các hoạt động liên quan', '144': 'Dịch vụ cưới hỏi', '33': 'Điện gia dụng', '168': 'Khóa học cho trẻ', '103': 'Điện tử và điện lạnh khác', '9': 'Thực phẩm và đồ uống', '186': 'Giường, tủ, bàn ghế/ Vòi sen, bồn rửa...', '138': 'Sản phẩm Lâm nghiệp', '16': 'Ô tô - xe máy', '146': 'Giải trí (phim, chương trình ca nhạc, sự kiện....)', '99': 'Nội thất (đồ dùng nội thất)', '45': 'Đồ dùng sinh hoạt: giấy vệ sinh, tampon, bvs,...', '172': 'Đào tạo trung cấp, cao đẳng, đại học, liên thông, sau ĐH', '115': 'Dịch vụ tư vấn đầu tư, tài chính', '142': 'Tổ chức sự kiện', '163': 'Đồ chơi cho bé', '159': 'Casual game', '73': 'Thời trang & phụ kiện', '96': 'Máy chiếu, màn chiếu', '17': 'Tài chính, Bảo hiểm', '3': 'Điện tử', '94': 'Máy in/Máy photocopy/Máy fax/Máy đếm tiền/Máy chấm công/Máy hủy tài liệu/Máy scan', '72': 'Thẩm mỹ viện/ Dịch vụ thẩm mỹ', '183': 'Đồ hộp', '108': 'Xe đạp', '173': 'Đào tạo, huấn luyện kỹ năng sống, trại hè', '29': 'Tủ lạnh/Máy lọc nước', '157': 'Xe khách, tàu hỏa, taxi', '187': 'Chăn,ga, gối, đệm', '54': 'Sữa tươi', '55': 'Radio/Cassette/Máy nghe nhạc', '136': 'Dịch vụ chuyển phát bưu chính', '171': 'Giáo dục mầm non, tiểu học, trung học cơ sở, trung học phổ thông', '8': 'Hàng tiêu dùng', '86': 'Bất động sản', '97': 'Bất động sản khác (thuê, cho thuê bất động sản, mua bán bất động sản cá nhân)', '32': 'Máy phát điện/Bộ lưu điện/Ắc quy', '66': 'Thực phẩm chức năng', '95': 'Sàn giao dịch và môi giới BĐS', '126': 'Hoạt động của chính phủ: Chương trình hành động Quốc gia'}
        return checkDict[id];
    }

})
