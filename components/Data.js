export  const Activity=[
    { id: 1, title: "Break"},
    { id: 2, title: "Communications"},
    { id: 3, title: "H/W - S/W Installation"},
    { id: 4, title: "Interview"},
    { id: 5, title: "Meetings"},
    { id: 6, title: "No Task"},
    { id: 7, title: "Out Of Office"},
    { id: 8, title: "R & D"},
    { id: 9, title: "Team Management"},
    { id: 10, title: "Training to new joinings and trainees"},
    { id: 11, title: "Travelling (Out of Station)"},
    { id: 12, title: "User Training"},
    

]

export  const Project=[
    { id: 1, title: "Khel Sathi"},
    { id: 2, title: "BharatEmart"},
    { id: 3, title: "Dhulayi"},
    { id: 4, title: "DD India"},
    
    

]
export  const TaskGroup=[
    { id: 1, title: "Designing"},
    { id: 2, title: "Development"},
    { id: 3, title: "Testing"},
    
    
    

    
]
export  const ProjectGroup=[
    { id: 1, title: "KhelSathi"},
    { id: 2, title: "Hrms"},
    { id: 3, title: "Icucaa"},
    
    
    

]
export  const Tasks=[
    { id: 1, title: "Design HomePagee"},
    { id: 2, title: "Add TimeSheet Functionality"},
    { id: 3, title: "Make Report for Security Audit"},
    { id: 4, title: "Make SRS"},
    
    

]
export  const Status=[
    { id: 1, title: "In Progress"},
    { id: 2, title: "Completed"},
    { id: 3, title: "Pending"},
    { id: 4, title: "Issue"},
    
    

]
export  const Issue=[
    { id: 1, title: "Ui Issue"},
    { id: 2, title: "Login Api Issue"},
    
    
    

]
export const DataSet=[
    {id:1,date:"10/09/2023",project:"Udid",taskGroup:"UI",task:"Correcting UI",issue:"UI",activity:"Done Correction in ui",fromTime:"09:00",toTime:"20:00",workingHours:"12:00",billingHours:"12:00",description:"testing",taskStatus:"In Progress"}
    ,{id:2,date:"10/09/2023",project:"BharatEmart",taskGroup:"UI",task:"Correcting UI",issue:"UI",activity:"Done Correction in ui",fromTime:"09:00",toTime:"20:00",workingHours:"12:00",billingHours:"12:00",description:"testing",taskStatus:"In Progress"}
   , {id:3,date:"10/09/2023",project:"Udid",taskGroup:"UI",task:"Correcting UI",issue:"UI",activity:"Done Correction in ui",fromTime:"09:00",toTime:"20:00",workingHours:"12:00",billingHours:"12:00",description:"testing",taskStatus:"In Progress"}]


   export const DataTimeSheet=
    [
        {"activity": {"id": 1, "title": "Break"}, 
        "description": "G",
         "formattedTime": "09:40", 
         "formattedTime2": "14:40",
          "formattedWorkingHours": "05:00",
           "id": "id_i8cmlcsa0_1705471834462", 
           "issue": {"id": 2, "title": "Login Api Issue"},
            "project": {"id": 1, "title": "Khel Sathi"},
             "selectedDate": "22-07-0017", 
             "status": {"id": 1, "title": "In Progress"},
              "task": {"id": 1, "title": "Design HomePagee"},
               "taskGroup": {"id": 2, "title": "Development"}},
               {"activity": {"id": 1, "title": "Break"}, 
               "description": "G",
                "formattedTime": "09:40", 
                "formattedTime2": "14:40",
                 "formattedWorkingHours": "05:00",
                  "id": "id_i9cmlcsa0_1705471834462", 
                  "issue": {"id": 2, "title": "Login Api Issue"},
                   "project": {"id": 1, "title": "Khel Sathi"},
                    "selectedDate": "22-07-0017", 
                    "status": {"id": 1, "title": "In Progress"},
                     "task": {"id": 1, "title": "Design HomePagee"},
                      "taskGroup": {"id": 2, "title": "Development"}}
            
            
            
            
            
            
            ]

            export const CheckIn=[
                {"18-01-2024":
                [{
                    "id":"1",
                    "date":"",
                    "checkInTime":"",
                    "location":"",
                    "remarks":"",
                    "checkOut":"",
                    "isCheckedIn":"",

                },
                {
                    "id":"3",
                    "date":"",
                    "checkInTime":"",
                    "location":"",
                    "remarks":"",
                    "checkOut":"",
                    "isCheckedIn":"",

                }],"id":"t1"},
                {"17-01-2024":
                {
                    "id":"2",
                    "date":"",
                    "checkInTime":"",
                    "location":"",
                    "remarks":"",
                    "checkOut":"",
                    "isCheckedIn":"",

                },"id":"t2"},
                

            ]