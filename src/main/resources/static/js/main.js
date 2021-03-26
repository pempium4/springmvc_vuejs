$('#trigger').click(function (){
    form.save();
});
$('#target input').click(function (){
    $('#target textarea').show(500).css("display", "inline-block");
    $('#trigger').css("display", "block");
});
/*$('.testButton').click(function (){
    let noteId = $(this).data('id');
    // $('#exampleModal .modal-body #testInput').val(userId);
    //отправить get запрос в контроллер
    $.get("/modals/modalEditNote?id=" + noteId, function (data){
        //вставить данные из файла html в modal window
        $('#exampleModal').find('.modal-body').html(data);
        // alert("data = " + data);
    })
});
$('#updateBtn').click(function (){
    $('#update').submit();
});
$('#deleteBtn').click(function (){
    $('#delete').submit();
});*/
autosize($('textarea'));