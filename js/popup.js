$(function() {
 
  $('input[name="help[]"]').change(function() {
 
    var helps = [];
    $('input[name="help[]"]:checked').each(function() {
      helps.push($(this).val());
    });
    
    // ブラウザのストレージに保存
    localStorage["help"] = helps;
    
    boxShow();
  });
});

function boxShow(){
    if(localStorage["help"]){
        $('#checkedBox').text("選択中："+localStorage["help"])
    }else{
        $('#checkedBox').text("現在何も選択されていません。");
    }
}

function boxCheck(){
    var boxes = document.getElementsByName("help[]");
    var cnt = boxes.length;
    var storage = localStorage["help"];
    
    for(var i=0; i<cnt; i++) {
        if(storage.indexOf(boxes.item(i).value) >= 0) {
           boxes.item(i).checked = true;
        }
    }
}