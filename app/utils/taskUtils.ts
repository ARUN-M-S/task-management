

export const handleSaveTask = (task: any, boardData: any[], selectedTask: any, setBoardData: (data: any[]) => void, setSelectedTask: (task: any) => void, setShowForm: (show: boolean) => void) => {
  if (selectedTask) {
    // Editing an existing task
    const updatedTasks = boardData.map((category) => {
      if (category.name === selectedTask.status) {
        return {
          ...category,
          items: category.items.map((item) =>
            item.id === selectedTask.id ? { ...task, id: item.id } : item
          ),
        };
      }
      return category;
    });
    setBoardData(updatedTasks);
    setSelectedTask(null);
  } else {
    // Adding a new task
    const updatedTasks = boardData.map((category) => {
      if (category.name === task.status) {
        return {
          ...category,
          items: [
            ...category.items,
            { ...task, id: category.items.length + 1 },
          ], // Ensure unique ID
        };
      }
      return category;
    });

    setBoardData(updatedTasks);
  }
  setShowForm(false);
};

export const handleEdit = (task: any, setSelectedTask: (task: any) => void, setShowForm: (show: boolean) => void) => {
  setSelectedTask(task);
  setShowForm(true);
};

export const handleDelete = (id: number, boardData: any[], setBoardData: (data: any[]) => void) => {
  const updatedTasks = boardData.map((category) => ({
    ...category,
    items: category.items.filter((item) => item.id !== id),
  }));
  setBoardData(updatedTasks);
};
