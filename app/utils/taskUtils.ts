import { Status } from "app/components/forms/TaskModel";
import { TaskServices } from "./services/api/apiService";
import { taskDataRequest } from "./services/Dto/requestsTypes";
import useTaskSocket from "./services/socket/useTaskSocket";



export const handleSaveTask = async (data: any, boardData: any[], selectedTask: any, setBoardData: (data: any[]) => void, setSelectedTask: (task: any) => void, setShowForm: (show: boolean) => void) => {
    if (selectedTask) {
        let task: taskDataRequest = data as taskDataRequest
        task.status = statusMapping[task?.status]

        await TaskServices.taskUpdate({ task }, data?.id)
        setSelectedTask(null);
    } else {
        let task: taskDataRequest = data as taskDataRequest
        await TaskServices.taskCreate({ task })

    }
    setShowForm(false);
};

export const handleEdit = (task: any, setSelectedTask: (task: any) => void, setShowForm: (show: boolean) => void) => {
    setSelectedTask(task);
    setShowForm(true);
};

export const handleDelete = (id: number, boardData: any[], setBoardData: (data: any[]) => void) => {
    TaskServices.taskDelete(id)
    const updatedTasks = boardData.map((category) => ({
        ...category,
        items: category.items.filter((item) => item.id !== id),
    }));
    setBoardData(updatedTasks);
};


// src/utils/taskUtils.js
// Status enum mapping
export const statusMapping = {
    [Status.Todo]: '1',
    [Status.InProgress]: '2',
    [Status.Done]: '0',
    [Status.InPreview]: '3'
};
export const statusMappings = {
    [Status.Todo]: 'To Do',
    [Status.InProgress]: 'In Progress',
    [Status.Done]: 'Done',
    [Status.InPreview]: 'In Preview'
};


export const updateTaskCategories = (categories, task) => {

    const taskStatus = statusMappings[task?.status];

    const updatedCategories = categories.map(category => {
        if (category.name === taskStatus) {
            const updatedItems = category.items.filter(item => item.id !== task.id);
            updatedItems.push(task);
            return {
                ...category,
                items: updatedItems
            };
        }
        return category;
    });

    // Check if the task status is not present in categories
    const statusNames = categories.map(cat => cat.name);
    if (!statusNames.includes(taskStatus)) {
        updatedCategories.push({
            name: taskStatus,
            items: [task]
        });
    }

    return updatedCategories;
};


export function getStatusValue(status: string): Status {
    switch (status) {
        case "To Do":
            return Status.Todo;
        case "In Progress":
            return Status.InProgress;
        case "Done":
            return Status.Done;
        case "In Preview":
            return Status.InPreview;
        default:
            throw new Error("Unknown status description: " + status);
    }
}