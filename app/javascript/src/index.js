import $ from 'jquery';
import { getAndDisplayAllTasks, createTask, deleteTask, markTaskComplete, markTaskActive } from './requests.js';

$(document).ready(function() {
  // Initially load all tasks
  getAndDisplayAllTasks();

  // Event listeners for filtering tasks
  $('#all').on('click', function() {
    getAndDisplayAllTasks();
  });

  $('#active').on('click', function() {
    getAndDisplayAllTasks('active');
  });

  $('#completed').on('click', function() {
    getAndDisplayAllTasks('completed');
  });
});
