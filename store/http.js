import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "./auth-context";

const BACKEND_URL =
  "https://projectmanagement-84b7c-default-rtdb.firebaseio.com";
const BASE_URl = "http://167.172.152.167:81/pm_tool_app_old/api/rest/";


async function authenticate(email, password) {
  // const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const response = await axios.post(
      "http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/login",
      {
        email: email,
        password: password,
      }
    );

    const data = response.data._result;
    const _resultflag = response.data._resultflag;

    await AsyncStorage.setItem("user", JSON.stringify(data));
    return _resultflag;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}

async function getTasksDetails(userid, token,emp_id) {

  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/taskdetails", {
      userid: userid,
      emp_id:emp_id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data._result;
    const _resultflag = response.data._resultflag;
    if(_resultflag===0)
    {
      return _resultflag
    }
    return data;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}


async function getProjectDetails(userid, token,emp_id,ITEMS_PER_PAGE,page) {

  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/projectlist", {
      userid: userid,
      ITEMS_PER_PAGE:ITEMS_PER_PAGE,
      page:page

      // emp_id:emp_id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data._result;
    const _resultflag = response.data._resultflag;
    if(_resultflag===0)
    {
      return _resultflag
    }
    return data;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}

async function getCheckInDetails(userid, token) {
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/checkInDetailList", {
      userid: userid,
      
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data;
    const _resultflag = response.data._resultflag;
  
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}
postCheckInData

async function postCheckInData(userid,checkedInStatus,time, place_name,date,location,token) {
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/checkinDetailAdd", {
    userid: userid,
    check_in_status:checkedInStatus,
    time:time,
    place_name:place_name,
    date:date,
    location:location
      
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data;
    const _resultflag = response.data._resultflag;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}


async function updateStatus(userid, token,id,status) {
  
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/editStatus", {
      userid: userid,
      id:id,
      status:status
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data.message;
    const _resultflag = response.data._resultflag;
  
    console.log("Status update ",data);
    return _resultflag;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}
export async function addProject( token,projectData) {
  console.log(projectData)
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/addproject", projectData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data.message;
    const _resultflag = response.data._resultflag;
  
    console.log("Status update ",data);
    return _resultflag;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}

export async function uploadFile(requestBody, token) {
  
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/uploadfile", requestBody,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    
  
    const _resultflag = response.data
    console.log("api response  ",response.data);
    return _resultflag;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}
async function getEmployees(userid,token, designation) {
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/getemployees", {
      userid: userid,
      designation:designation
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data._result;
    const _resultflag = response.data._resultflag;
  
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}
async function logout(userid, token) {
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/logout", {
      userid: userid,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data;
    const _resultflag = response.data._resultflag;
  
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}


async function getDeleteTask(userid,id, token) {
  try {
    const response = await axios.post("http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/deletetask", {
      userid: userid,
      id: id,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = response.data.message;
    const _resultflag = response.data._resultflag;
  
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}


export function login(email, password) {
  return authenticate(email, password);
}

export function deleteTask(userid,id, token) {
  return getDeleteTask(userid,id, token);
}

export function getTaks(userId, token,emp_id) {
  return getTasksDetails(userId, token,emp_id);
}
export function getProjects(userId, token,emp_id,ITEMS_PER_PAGE,page) {
  return getProjectDetails(userId, token,emp_id,ITEMS_PER_PAGE,page);
}
export function setStatus(userId, token,id,status) {
  return updateStatus(userId, token,id,status);
}

export function getCheckInList(userId, token) {
  return getCheckInDetails(userId, token);
}
export function postCheckIn(userid,checkedInStatus,time, place_name,date,location,token) {
  return postCheckInData(userid,checkedInStatus,time, place_name,date,location, token);
}


getCheckInDetails

export function getEmp(userId, token,designation) {
  return getEmployees(userId, token,designation);
}

export function Logout(userId, token) {
  return logout(userId, token);
}
export async function storeTask(taskData) {
  const response = await axios.post(
    BACKEND_URL + "/tasks" + "/allTasks.json",
    taskData
  );
  const id = response.data.name;
  return id;
}

export async function assignedStore(taskData,token) {
  const response = await axios.post(
   "http://167.172.152.167:81/wcd_audit/pm_tool_app_old/api/rest/addTask",
    taskData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  const id = response.data.message;
  console.log(id)
  return id;
}

export async function fetchTasks() {
  const response = await axios.get(BACKEND_URL + "/tasks" + "/allTasks.json");

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
  const response = await axios.get(BACKEND_URL + "/tasks" + "/assigned.json");

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


export async function fetchCheckIn() {
  const response = await axios.get(BACKEND_URL + "/checkIn.json");

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
  console.log("dte" + currentDate);

  // Check if data for the current date already exists
  const existingDataResponse = await axios.get(
    `${BACKEND_URL}/checkIn.json?orderBy="date"&equalTo="${currentDate}"`
  );
  console.log("edr" + existingDataResponse);

  const existingData = existingDataResponse.data;
  console.log("ed" + existingData);

  if (existingData) {
    // Date exists, update the existing entry with the new data
    const existingEntryKey = Object.keys(existingData)[0];
    const existingEntry = existingData[existingEntryKey];

    // Ensure the 'data' property is an array
    const newDataArray = Array.isArray(existingEntry.data)
      ? existingEntry.data
      : [];

    // Check if the entry already exists in the array based on some unique identifier like 'id'
    const existingIndex = newDataArray.findIndex(
      (entry) => entry.id === checkInData.data[0].id
    );

    if (existingIndex !== -1) {
      // Entry already exists, update it
      newDataArray[existingIndex] = checkInData.data[0];
    } else {
      // Entry doesn't exist, add it to the array
      newDataArray.push(checkInData.data[0]);
    }

    // Update the existing data with the new array
    await axios.put(`${BACKEND_URL}/checkIn/${existingEntryKey}.json`, {
      ...existingEntry,
      data: newDataArray,
    });

    return existingEntryKey;
  } else {
    // Date doesn't exist, add a new entry with the provided data
    const response = await axios.post(
      `${BACKEND_URL}/checkIn.json`,
      checkInData
    );
    const id = response.data.name;
    return id;
  }
}
