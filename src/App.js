import { useState, useEffect } from "react";
import "./App.css";
import Home from "./home";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    const res = await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge),
    });
    setUsers((prev) => [
      { id: res.id, name: newName, age: Number(newAge) },
      ...prev,
    ]);
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    setUsers((prev) =>
      prev.map((data) =>
        data.id == id ? { ...data, age: data.age + 1 } : data
      )
    );
    await updateDoc(userDoc, newFields);
  };
  const decreaseUserAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    setUsers((prev) =>
      prev.map((data) =>
        data.id == id ? { ...data, age: data.age - 1 } : data
      )
    );
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    setUsers((prev) => prev.filter((data) => data.id != id));
    await deleteDoc(userDoc);
  };
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <Home />
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />

      <button onClick={createUser}> Create User</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button
              onClick={() => {
                decreaseUserAge(user.id, user.age);
              }}
            >
              {" "}
              Decrease Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
