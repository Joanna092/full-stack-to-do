import "./requests.js";
import $ from 'jquery';

import {
    indexTasks,
    postTask,
    getAndDisplayAllTasks
  } from "./requests.js";

  indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
      return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
        " + task.content + "\
        </div>";
    });
    $("#tasks").html(htmlString);
  });


  getAndDisplayAllTasks (function(response, textStatus) {
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
  });
