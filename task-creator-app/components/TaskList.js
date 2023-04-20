import { Text, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import TaskItem from "./TaskItem";
import api from "../api";
import { useIsFocused } from "@react-navigation/native";

const TaskList = () => {
  const [tasksInfo, setTasksInfo] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused()

  useEffect(() => {
    (async () => {
      const response = await api.getTasks();
      const { tasks } = response;
      setTasksInfo(tasks);
    })();
  }, [isFocused]);
  const renderItem = ({ item }) => <TaskItem task={item} handleDelete={handleDelete}/>;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const response = await api.getTasks();
    const { tasks } = response;
    setTasksInfo(tasks);
    setRefreshing(false);
  });

  const handleDelete = async (id)=>{
    await api.deleteTask(id)
    const response = await api.getTasks();
    const { tasks } = response;
    setTasksInfo(tasks);
  }

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasksInfo}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#78e08f"]}
          progressBackgroundColor="#0a3d62"
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default TaskList;
