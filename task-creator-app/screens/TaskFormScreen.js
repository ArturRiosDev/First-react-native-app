import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import api from "../api";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({});
  const [editing, setEditing] = useState(false);

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  const handleSubmit = async () => {
    if(editing){
        const { id } = route.params;
        await api.updateTask(id,task)
        setEditing(!editing)
    }else{
      await api.createTask(task);
    }
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    if (route.params && route.params?.id) {
      navigation.setOptions({ headerTitle: "Updating Task" });

      (async () => {
       setEditing(!editing)
        const { id } = route.params;
        const taskSelected = await api.getTaskById(id);
        const { title, description } = taskSelected.tasks[0];
        setTask({ title, description });
      })();
      
    }
  }, []);

  return (
    <Layout>
      <TextInput
        style={style.input}
        placeholder="Write a title"
        placeholderTextColor="#546574"
        onChangeText={(text) => handleChange("title", text)}
        value={task?.title}
      />
      <TextInput
        style={style.input}
        placeholder="Write a description"
        placeholderTextColor="#546574"
        onChangeText={(text) => handleChange("description", text)}
        value={task?.description}
      />
      <TouchableOpacity style={style.buttonSave} onPress={handleSubmit}>
        <Text style={style.buttonText}>{editing? 'Update Task':'Save Task' }</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const style = StyleSheet.create({
  input: {
    width: "90%",
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#ffffff",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});
export default TaskFormScreen;
