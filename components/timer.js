import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios"
const Stopwatch = ({ taskId }) => {
  // Retrieve time from local storage on component mount
  // const initialTime = parseInt(localStorage.getItem(`taskTime_${taskId}`)) || 0;

  // State to store time
  const [time, setTime] = useState(0);
  
  // State to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);
  
  // State to store task times as an array of objects [{taskId, time}]
  

  // State to check if the timer has ended
  const [timerEnd, setTimerEnd] = useState(false);
  const { updateTaskStatus } = useAuth();
 
  const {user}=useAuth()

  useEffect(() => {
    let intervalId;
    
    // Retrieve time and timerEnd from local storage on component mount
    const storedTime = localStorage.getItem(`taskTime_${taskId}`);
    const storedTimerEnd = localStorage.getItem(`timerEnd_${taskId}`);
    if (storedTime) {
      setTime(parseInt(storedTime));
    }
    if (storedTimerEnd) {
      setTimerEnd(JSON.parse(storedTimerEnd));
    }
  
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          // Update local storage with the new time
          localStorage.setItem(`taskTime_${taskId}`, newTime.toString());
          return newTime;
        });
      }, 10);
    }
    
    return () => clearInterval(intervalId);
  }, [isRunning, taskId]);
  
  
  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = (id) => {
   
 if(user&&user.role=="Assignee"){
(async()=>{
  try{

    await axios.put(`http://localhost:4444/status/${id}`,{ status: "In-Progress" },
   {
     headers: {
       Authorization: localStorage.getItem("token"),
     },
   })
   updateTaskStatus("In-Progress");
  
   }
   catch(err){console.error(err)}
  })()
   
 }
   
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = (time, taskId) => {
    setIsRunning(false);
    if(user&&user.role=="Assignee"){
      (async()=>{
        try{
      
          await axios.put(`http://localhost:4444/status/${taskId}`,{ status: "Completed" },
         {
           headers: {
             Authorization: localStorage.getItem("token"),
           },
         })
         updateTaskStatus("Completed");
        
         }
         catch(err){console.error(err)}
        })()
         
       }

    localStorage.setItem(`timerEnd_${taskId}`, true);
    
    // Reset the timer
    setTime(0);
    setTimerEnd(true);
    
    const data = { taskId: taskId, time: time };
    localStorage.setItem('task', JSON.stringify(data));
    const storedData = JSON.parse(localStorage.getItem('task'));
    
    if (user && user.role === "Assignee") {
      (async () => {
        try {
          const response = await axios.post(
            "http://localhost:4444/log",
            storedData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    }

    
};



  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        {!timerEnd && (
          <>
            <button className="start" onClick={()=>{startAndStop(taskId)}}>
              {isRunning ? "Hold" : "Start"}
            </button>
            <button className="end" onClick={()=>{
              reset(time,taskId)
            }}>
              End
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
