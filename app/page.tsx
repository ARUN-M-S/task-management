"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { DotsVerticalIcon, PlusCircleIcon } from "@heroicons/react/outline";
import CardItem from "./components/ui/CardItem";
import BoardData from "../app/data/board-data.json";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import TaskModal from "./components/forms/TaskModel";
import { handleSaveTask, handleEdit, handleDelete } from './utils/taskUtils'; 

const Home = () => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (result: DropResult) => {
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
    const destinationColumn = newBoardData[destinationColumnIndex];
    const sourceItemIndex = sourceColumn.items.findIndex(
      (item) => item.id === source.index
    );

    const [movedItem] = sourceColumn.items.splice(sourceItemIndex, 1);
    destinationColumn.items.splice(destination.index, 0, movedItem);
    setBoardData(newBoardData);
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
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-5 my-5">
            {boardData.map((board, bIndex) => {
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
      )}

      <TaskModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={(task) => handleSaveTask(task, boardData, selectedTask, setBoardData, setSelectedTask, setShowForm)}
        task={selectedTask}
      />
    </div>
  );
};

export default Home;
