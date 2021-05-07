import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import axios from "../features/axios";
import TodoModal from "./TodoModal";

const Todo = ({ data, todosChangeHandler }) => {
  const [todo, setTodo] = useState(data.name);
  const [isModalVisible, setIsModalVisible] = useState("");

  const updateTodo = async () => {
    try {
      const {
        data: updatedTodo,
      } = await axios.patch(`/todo/update/${data._id}`, { todo });
      todosChangeHandler((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo._id === updatedTodo._id ? updatedTodo : prevTodo
        )
      );
    } catch (error) {
      Alert.alert("Update Error", "Something went wrong!", [{ text: "Ok" }]);
    }
    setIsModalVisible(false);
  };

  const deleteTodo = async () => {
    try {
      const deletedTodo = await axios.delete(`/todo/delete/${data._id}`);
      todosChangeHandler((prevTodos) =>
        prevTodos.filter((prevTodo) => prevTodo._id !== deletedTodo.data._id)
      );
    } catch (error) {
      Alert.alert("Delete Error", "Something went wrong!", [{ text: "Ok" }]);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.todoTitle}>{data.name}</Text>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          color="#04d1ca"
          title="Update"
          onPress={() => setIsModalVisible(true)}
        />
        <Button color="#dc3545" title="Delete" onPress={deleteTodo} />
      </View>
      <TodoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        todo={todo}
        setTodo={setTodo}
        saveTodo={updateTodo}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "99%",
    flexDirection: "row",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    marginBottom: 20,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 6,
  },
  todoTitle: {
    flex: 1,
  },
});
