import $ from 'jquery';

console.log('ajax requests');

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

// Function to get and display all tasks
export var getAndDisplayAllTasks = function() {
  $.ajax({
    type: 'GET',
    url: 'api/tasks?api_key=1',
    dataType: 'json',
    success: function(response, textStatus) {
      $('#todo-list').empty();
      var filteredTasks = response.tasks.filter(function(task) {
        return true;
      });
      filteredTasks.forEach(function(task) {
        $('#todo-list').prepend('<div class="row d-flex"><div class="p-2"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div><div class="p-2"><p class="col-xs-8">' + task.content + '</p></div><div class="ml-auto p-2"><button class="delete" data-id="' + task.id + '"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div><hr>');
      });
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

// Function to create a new task
export var createTask = function() {
  $.ajax({
    type: 'POST',
    url: 'api/tasks?api_key=1',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task-content').val()
      }
    }),
    success: function(response, textStatus) {
      $('#new-task-content').val('');
      getAndDisplayAllTasks();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};

// Function to delete a task
export var deleteTask = function(id) {
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
};

// Function to mark a task as complete
export var markTaskComplete = function(id) {
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
};

// Function to mark a task as active
export var markTaskActive = function(id) {
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
};

// Event listener for creating a task
$(document).ready(function() {
  $('#create-task').on('submit', function(e) {
    e.preventDefault();
    createTask();
  });
});

// Event listener for deleting a task
$(document).on('click', '.delete', function() {
  deleteTask($(this).data('id'));
});

// Event listener for marking a task as complete or active
$(document).on('change', '.mark-complete', function() {
  if (this.checked) {
    markTaskComplete($(this).data('id'));
  } else {
    markTaskActive($(this).data('id'));
  }
});

// Ensure the initial load displays all tasks
$(document).ready(function() {
  getAndDisplayAllTasks();
});
