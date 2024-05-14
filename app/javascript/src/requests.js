console.log('ajax requests');

//tutorial follow up 
import $ from 'jquery';
var indexTasks = function () {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: function (response) {
      console.log(response);
    },
    error: function (request, errorMsg) {
      console.log(request, errorMsg);
    }
  }
  $.ajax(request);
};
indexTasks();

//my code
var getAndDisplayAllTasks = function() {
    $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=148',
        dataType: 'json',
        success: function(response, textStatus) {
            $('#todo-list').empty();


            var filteredTasks = response.tasks.filter(function(task) {
                return true;
            })
            filteredTasks.forEach(function(task) {
                $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div><hr>');
            });


            $("#all").click(function(event) {
                event.preventDefault();
                $('#todo-list').empty();
                var filteredTasks = response.tasks.filter(function(task) {
                    return true;
                })
                filteredTasks.forEach(function(task) {
                    $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div><hr>');
                });
            });

            $("#completed").click(function(event) {
                event.preventDefault();

                $('#todo-list').empty();
                var filteredTasks = response.tasks.filter(function(task) {
                    return task.completed === true;
                })
                filteredTasks.forEach(function(task) {
                    $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div><hr>');
                });
            });

            $("#active").click(function(event) {
                event.preventDefault();
                $('#todo-list').empty();
                var filteredTasks = response.tasks.filter(function(task) {
                    return task.completed === false;
                })
                filteredTasks.forEach(function(task) {
                    $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div><hr>');
                });
            });


        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}
getAndDisplayAllTasks();

var deleteTask = function(id) {
    $.ajax({
        type: 'DELETE',
        url: 'api/tasks/' + id + '?api_key=1',
        success: function(response, textStatus) {
            getAndDisplayAllTasks();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

$(document).on('click', '.delete', function() {
    deleteTask($(this).data('id'));
});

var markTaskComplete = function(id) {
    $.ajax({
        type: 'PUT',
        url: 'api/tasks/' + id + '/mark_complete?api_key=1',
        dataType: 'json',
        success: function(response, textStatus) {
            getAndDisplayAllTasks();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

$(document).on('change', '.mark-complete', function() {
    if (this.checked) {
        markTaskComplete($(this).data('id'));
    } else {
        markTaskActive($(this).data('id'));

    }

});

var markTaskActive = function(id) {
    $.ajax({
        type: 'PUT',
        url: 'api/tasks/' + id + '/mark_active?api_key=1',
        dataType: 'json',
        success: function(response, textStatus) {
            getAndDisplayAllTasks();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}


