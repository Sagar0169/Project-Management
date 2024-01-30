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
     
      const taskObj = {
        id: titleKey, // Use titleKey as the datam
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

export async function fetchCheckIn() {
  const response = await axios.get(BACKEND_URL + '/checkIn.json');

  const checkIn = [];

  for (const entry of response.data) {
    const dateEntry = {
      date: entry.date,
      data: [],
      id: entry.id,
    };

    for (const dataEntry of entry.data) {
      const taskObj = {
        id: dataEntry.id,
        date: dataEntry.date,
        checkInTime: dataEntry.checkInTime,
        location: dataEntry.location,
        remarks: dataEntry.remarks,
        checkOut: dataEntry.checkOut,
        isCheckedIn: dataEntry.isCheckedIn,
        placeName: dataEntry.placeName,
      };

      dateEntry.data.push(taskObj);
    }

    checkIn.push(dateEntry);
  }

  return checkIn;
}


// export async function storeCheckIn(checkInData) {
//   const response = await axios.post(BACKEND_URL + '/checkIn.json', checkInData);
//   const id = response.data.name;
//   return id;
// }
export async function storeCheckIn(checkInData) {
  const currentDate = checkInData.date;
  console.log("dte"+currentDate)

  // Check if data for the current date already exists
  const existingDataResponse = await axios.get(`${BACKEND_URL}/checkIn.json?orderBy="date"&equalTo="${currentDate}"`);
  console.log("edr"+existingDataResponse)
  
  const existingData = existingDataResponse.data;
  console.log("ed"+existingData)


  if (existingData) {
    // Date exists, update the existing entry with the new data
    const existingEntryKey = Object.keys(existingData)[0];
    const existingEntry = existingData[existingEntryKey];

    // Ensure the 'data' property is an array
    const newDataArray = Array.isArray(existingEntry.data) ? existingEntry.data : [];

    // Check if the entry already exists in the array based on some unique identifier like 'id'
    const existingIndex = newDataArray.findIndex((entry) => entry.id === checkInData.data[0].id);

    if (existingIndex !== -1) {
      // Entry already exists, update it
      newDataArray[existingIndex] = checkInData.data[0];
    } else {
      // Entry doesn't exist, add it to the array
      newDataArray.push(checkInData.data[0]);
    }

    // Update the existing data with the new array
    await axios.put(`${BACKEND_URL}/checkIn/${existingEntryKey}.json`, { ...existingEntry, data: newDataArray });

    return existingEntryKey;
  } else {
    // Date doesn't exist, add a new entry with the provided data
    const response = await axios.post(`${BACKEND_URL}/checkIn.json`, checkInData);
    const id = response.data.name;
    return id;
  }
}