"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "./components/ui/CardItem";
import BoardData from "../app/data/board-data.json";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import TaskModal from "./components/forms/TaskModel";
import { handleSaveTask, handleEdit, handleDelete, updateTaskCategories } from './utils/taskUtils'; 
import { TaskServices } from "./utils/services/api/apiService";
import useTaskSocket from "./utils/services/socket/useTaskSocket";
import {io} from 'socket.io-client'
import useSocket from "./utils/services/socket/useTaskSocket";
import { taskDataRequest, TaskStatus } from "./utils/services/Dto/requestsTypes";
import { useRouter } from "next/navigation";


const Home = () => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
   const [socket,setSocket]= useState<any>(undefined)
   const router = useRouter();

  //  useEffect(() => {
  //   const auth = localStorage.getItem('isAuthenticated');
  //   if (auth === 'false') {
  //     router.push('/sign-in');
  //   }
  // }, [router]);
  // useEffect(()=>{
  //   const socket=io('http://localhost:4000')
  //   setSocket(socket)
  //   },[])
  // useEffect(() => {
  //   if (process.browser) {
  //     setReady(true);
  //   }
  // }, []);
  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'false') {
      router.push('/sign-in');
      return; // Early exit if not authenticated
    }

    // Initialize socket connection
    const socket = io('http://localhost:4000');
    setSocket(socket);

    // Set ready state on client-side
    setReady(true);

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [router]);
  useEffect(() => {
    if (socket) {
      socket.on('taskUpdated', (data) => {
        console.log(data, 'this is new tasksks');
      });

      // Clean up the event listener when the component unmounts or socket changes
      return () => {
        socket.off('taskUpdated');
      };
    }
  }, [socket]);

  useSocket('http://localhost:4000', 'taskUpdated', (data) => {
    console.log(data, 'this is new tasksks');
   let newData= updateTaskCategories(boardData,data)
    // Update tasks state or perform other actions based on the new data
    setBoardData(newData); // Example: Update state with new tasks
  });
  
  useEffect(() => {
    const loadBoardData = async () => {
      const response = await TaskServices.task();
     
      
      setBoardData(response?.data);
      setReady(true);
    };

    if (process.browser) {
      loadBoardData();
    }
  }, []);

  const onDragEnd = (result: DropResult) => {
    socket.emit('message')
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumnIndex = parseInt(source.droppableId);
    const destinationColumnIndex = parseInt(destination.droppableId);
    const newBoardData = [...boardData];
    const sourceColumn = newBoardData[sourceColumnIndex];
    const destinationColumn:any = newBoardData[destinationColumnIndex];
    const sourceItemIndex = sourceColumn.items.findIndex(
      (item) => item.id === source.index
    );

    const [movedItem] = sourceColumn.items.splice(sourceItemIndex, 1);
    console.log(movedItem,"moved item");
    movedItem.status = TaskStatus[destinationColumn?.name]
    console.log(movedItem,"moved item afer");
    let task: taskDataRequest = movedItem as taskDataRequest
     TaskServices.taskUpdate({ task }, movedItem?.id)
    //     setSelectedTask(null);
    // // destinationColumn.items.splice(destination.index, 0, movedItem);
    // setBoardData(newBoardData);
  };
  

 


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-end w-full p-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          Add New Task
          <PlusCircleIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
      {ready && boardData?.length > 0 ?(
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-5 my-5">
            {boardData?.map((board, bIndex) => {
              return (
                <div key={board.name}>
                  <Droppable droppableId={bIndex.toString()} key={bIndex}>
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div
                          className={`bg-gray-100 rounded-md shadow-md
                        flex flex-col relative overflow-hidden p-3
                        ${snapshot.isDraggingOver && "bg-green-100"}`}
                        >
                          <span
                            className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                      absolute inset-x-0 top-0"
                          ></span>
                          <h4 className=" p-3 flex justify-between items-center mb-2">
                            <span className="text-2xl text-white-600">
                              {board.name}
                            </span>
                            <DotsVerticalIcon className="w-5 h-5 text-black" />
                          </h4>

                          <div
                            className="overflow-y-auto overflow-x-hidden h-auto"
                            style={{ maxHeight: "calc(100vh - 290px)" }}
                          >
                            {board.items.length > 0 &&
                              board.items.map((item, iIndex) => {
                                return (
                                  <CardItem
                                    key={item?.id}
                                    data={item}
                                    index={iIndex}
                                    onEdit={() => handleEdit(item, setSelectedTask, setShowForm)}
                                    onDelete={() => handleDelete(item.id, boardData, setBoardData)}
                                  />
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      ):  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <img
        style={{ height: '70%', width: '50%' }}
        src="https://static.vecteezy.com/system/resources/previews/014/814/192/original/creatively-designed-flat-conceptual-icon-of-no-task-vector.jpg"
        alt="No Task"
      />
    </div>
    }

      <TaskModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={(task) =>  handleSaveTask(task, boardData, selectedTask, setBoardData, setSelectedTask, setShowForm)
          }
        task={selectedTask}
      />
    </div>
  );
};

export default Home;
