$(function (){
    setTimeout( function (){
    $.get("notes/", function (data){
        $.each(data, function (i, note){
            $('.row').append('<a class="col-lg-3 col-md-4 col-sm-6 col-xs-12 card btn btn-dark bg-dark open-note" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="'+note.id+'"><p>'+ note.title +'</p><p>'+note.description+'</p></a>')
        })
    })}, 50);
})
let globalID = 0;

let $title = $('#title');
let $description = $('#description');

$('#trigger').click(function (){
    let note = {
        title: $title.val(),
        description: $description.val()
    }
    fetch('/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    })
    window.location.reload();
 });
$('.row').on('click', '.open-note',function (){
    let noteId = $(this).data('id')
    $.get("notes/" + noteId, function (data){
        globalID = data.id;
        $("#titleInsert").val('').val(data.title);
        $("#descriptionInsert").val('').val(data.description);
    })
})
$('#target input').click(function (){
    $('#target textarea').show(500).css("display", "inline-block");
    $('#trigger').css("display", "block");
});

let $titleUpdate = $('#titleInsert');
let $descUpdate = $('#descriptionInsert');

$('#updateBtn').click(function (){
    let note = {
        title: $titleUpdate.val(),
        description: $descUpdate.val()
    }
    fetch('/notes/' + globalID,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        })
    window.location.reload();
});
$('#deleteBtn').click(function (){
    fetch("notes/" + globalID, {
        method: 'DELETE'
    })
    window.location.reload();
});

autosize($('textarea'));
