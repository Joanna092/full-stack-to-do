import $ from 'jquery';
import { getAndDisplayAllTasks, createTask, deleteTask, markTaskComplete, markTaskActive } from './requests.js';

$(document).ready(function() {
  getAndDisplayAllTasks();
});
