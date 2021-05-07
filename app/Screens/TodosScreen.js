import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Todo from "../components/Todo";
import TodoModal from "../components/TodoModal";
import axios from "../features/axios";

const TodosScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("/todos");
      setTodos(data);
    } catch (error) {
      Alert.alert("Network Error!", error.response.data, [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const saveTodo = async () => {
    try {
      const { data } = await axios.post("/todo/add", { todo });
      setTodos((prevTodos) => [...prevTodos, data]);
      setTodo("");
    } catch (error) {
      Alert.alert("Network Error!", error.response.data, [{ text: "OK" }]);
    }
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated
        translucent
        backgroundColor="rgba(0,0,0,0.1)"
        barStyle="light-content"
      />
      <TodoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        todo={todo}
        setTodo={setTodo}
        saveTodo={saveTodo}
      />
      <View style={styles.headerStyle}>
        <Text style={styles.heading}>Todos List</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.heading}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={styles.todos}
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Todo data={item} todosChangeHandler={setTodos} />
        )}
      />
    </View>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerStyle: {
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    height: 70,
    backgroundColor: "#04d1ca",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    alignItems: "center",
    flexDirection: "row",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#fff",
  },
  todos: {
    width: "95%",
    marginVertical: 10,
    paddingHorizontal: 1,
    alignItems: "center",
  },
  addButton: {
    padding: 7,
  },
});
