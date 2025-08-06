const Task = require('../models/task.model');

exports.getAll = async (filters = {}) => {
  return await Task.find(filters);
};

exports.getById = async (id) => {
  return await Task.findById(id);
};

exports.create = async (data) => {
  const task = new Task(data);
  return await task.save();
};

exports.update = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { 
    new: true,
    runValidators: true
  });
};

exports.partialUpdate = async (id, data) => {
  // Remove undefined fields
  const updateData = Object.keys(data).reduce((acc, key) => {
    if (data[key] !== undefined) acc[key] = data[key];
    return acc;
  }, {});

  return await Task.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

exports.delete = async (id) => {
  return await Task.findByIdAndDelete(id);
};