import React from "react";
import {
  View,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const TodoModal = ({
  isModalVisible,
  setIsModalVisible,
  todo,
  setTodo,
  saveTodo,
}) => {
  return (
    <Modal visible={isModalVisible} transparent statusBarTranslucent>
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={{ fontSize: 35, color: "black" }}>&times;</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.inputTodo}
            placeholder="Type your todo here"
            value={todo}
            onChangeText={(text) => setTodo(text)}
            onSubmitEditing={saveTodo}
          />
          <Button
            color="#04d1ca"
            title="save"
            onPress={saveTodo}
            disabled={!todo.trim()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default TodoModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 15,
    backgroundColor: "#fff",
    width: "80%",
    alignItems: "center",
    paddingVertical: 20,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  closeModal: {
    marginBottom: 10,
    alignSelf: "flex-end",
    marginRight: 20,
    borderRadius: 23,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  inputTodo: {
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    padding: 4,
    width: "70%",
    marginBottom: 30,
    fontSize: 17,
  },
});
