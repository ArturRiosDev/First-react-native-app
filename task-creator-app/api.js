const API = "http://10.0.2.2:3000/tasks";

export default {
  getTasks: async () => {
    const response = await fetch(API);
    const json = await response.json();
    return json;
  },
  createTask: async (task) => {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    return await response.json();
  },
  deleteTask: async (id) => {
    const response = await fetch(`${API}/${id}`,{
      method:'DELETE',
    });
    const json = await response.json();
    return json;
  },
  getTaskById: async(id)=>{
    console.log(id);
    const response = await fetch(`${API}/${id}`);
    const json = await response.json();
    return json;
  },
  updateTask: async(id,taskUpdated)=>{
    const response = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskUpdated),
    });

    return await response.json();
  }

};
