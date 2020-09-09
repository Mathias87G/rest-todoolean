$(document).ready(function(){

  getData();

  $(document).on('click', 'span.delete', function(){
    var elemento = $(this);
    var idToDo = elemento.parent().attr('data-id');
    deleteElement(idToDo);
  });

  $(document).on('click', '.list', function(){
    var oggetto = $(this);
    var elemento = $(this).find('.text').text();
    $('input.edit').addClass('hidden');
    $(this).children('input').removeClass('hidden').val(elemento);
  });

  $('.inserisci').click(function(){
    var newElement = $('#nuova-voce').val();
    createElement(newElement);
  });

  $(document).on('keydown', '.edit', keyboard)
});

function createElement(elemento){
  $.ajax(
    {
      url: 'http://157.230.17.132:3013/todos',
      method: 'POST',
      data: {
        text: elemento
      },
      success: function(risposta){
        $('.todos').html('');
        getData();
      },
      error: function(){
        alert('Errore!')
      }
    }
  );
}

function deleteElement(id){
  $.ajax(
    {
      url: 'http://157.230.17.132:3013/todos/' + id,
      method: 'DELETE',
      success: function(risposta){
        $('.todos').html('');
        getData();
      },
      error: function(){
        alert('Errore!')
      }
    }
  );
}

function getData(){
  $.ajax(
    {
      url: 'http://157.230.17.132:3013/todos',
      method: 'GET',
      success: function(risposta){
        getElement(risposta);
      },
      error: function(){
        alert('Errore!');
      }
    }
  );
}

function getElement(data){
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.length; i++){
    var context = {
      text: data[i].text,
      id: data[i].id
    }
    var html = template(context);
    $('.todos').append(html);
  }
}

function keyboard(){
  if (event.which == 13 || event.keyCode == 13) {
    var elemento = $(this);
    var idToDo = elemento.parent().attr('data-id');
    editData(idToDo);
  }
}

function editData(id){
  var edit = $('.list[data-id="' + id + '"]').find('.edit').val();
  $.ajax(
    {
      url: 'http://157.230.17.132:3013/todos/' + id,
      method: 'PUT',
      data: {
        text: edit
      },
      success: function(data){
        $('.todos').html('');
        getData();
      },
      error: function(){
        alert('Errore!');
      }
    }
  );
    console.log(edit);
}
