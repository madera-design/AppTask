// Importa Axios
import axios from 'axios';

// Configura la instancia de Axios con la base URL y los headers comunes
const axiosInstance = axios.create({
  baseURL: 'https://ecsdevapi.nextline.mx/vdev/tasks-challenge/',
  headers: {
    'Authorization': 'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
  }
});


// Obtener todas las tareas
async function getAllTasks() {
  try {
    const response = await axiosInstance.get('tasks');
    return response.data;
  } catch (error) {
    console.error('Error al obtener todas las tareas:', error);
    throw error;
  }
}

// Obtener una tarea por su ID
async function getTaskById(taskId) {
  try {
    const response = await axiosInstance.get(`tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la tarea por su ID:', error);
    throw error;
  }
}

// Crear una nueva tarea
async function createTask(taskData) {
  try {
    const response = await axiosInstance.post('tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error al crear una nueva tarea:', error);
    throw error;
  }
}

// Actualizar una tarea existente
async function updateTask(taskId, taskData) {
  try {
    const response = await axiosInstance.put(`tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    throw error;
  }
}

// Eliminar una tarea por su ID
async function deleteTask(taskId) {
  try {
    const response = await axiosInstance.delete(`tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error;
  }
}

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

