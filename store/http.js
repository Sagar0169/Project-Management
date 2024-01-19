import axios from "axios";

const BACKEND_URL = "https://projectmanagement-84b7c-default-rtdb.firebaseio.com";

export async function storeTask(taskData) {
  const response = await axios.post(
    BACKEND_URL + "/tasks"+"/allTasks.json",
    taskData
  );
  const id = response.data.name;
  return id;
}

export async function assignedStore(taskData) {
  const response = await axios.post(
    BACKEND_URL + "/tasks"+"/assigned.json",
    taskData
  );
  const id = response.data.name;
  return id;
}

export async function fetchTasks() {
  const response = await axios.get(BACKEND_URL + "/tasks"+"/allTasks.json");

  const tasks = [];

  for (const key in response.data) {
    // Access the 'title' property within each array
   
    const titles = response.data[key];

    for (const titleKey in titles) {
      console.log(titleKey)
      const taskObj = {
        id: titleKey, // Use titleKey as the data
        Assigned: titles[titleKey].Assigned, // Access the 'title' property
        title: titles[titleKey].title,
        Created: titles[titleKey].Created,
        FormTitle: titles[titleKey].FormTitle,
        Status: titles[titleKey].Status,
        TaskPhase: titles[titleKey].TaskPhase,
        StartDate: titles[titleKey].StartDate,
        time: titles[titleKey].time,
        Qc: titles[titleKey].Qc,
        Priority: titles[titleKey].Priority,
        TaskType: titles[titleKey].TaskType,
        TaskComplexity: titles[titleKey].TaskComplexity,
      };
      tasks.push(taskObj);
    }
  }
  return tasks;
}

export async function assignedTasksFetch() {
  const response = await axios.get(BACKEND_URL + "/tasks"+"/assigned.json");

  const assigned = [];

  for (const key in response.data) {
    // Access the 'title' property within each array
    const titles = response.data;
    const taskObj = {
      id: key, // Use titleKey as the data
      Assigned: titles[key].Assigned, // Access the 'title' property
      title: titles[key].title,
      Created: titles[key].Created,
      FormTitle: titles[key].FormTitle,
      Status: titles[key].Status,
      TaskPhase: titles[key].TaskPhase,
      StartDate: titles[key].StartDate,
      time: titles[key].time,
      Qc: titles[key].Qc,
      Priority: titles[key].Priority,
      TaskType: titles[key].TaskType,
      TaskComplexity: titles[key].TaskComplexity,
    };
    assigned.push(taskObj);
    
  }
  return assigned;
}

export function updateTask(id, taskData) {
  return axios.put(BACKEND_URL + `/tasks/${id}.json`, taskData);
}

export function deleteTask(id) {
  return axios.delete(BACKEND_URL + `/tasks/${id}.json`);
}
