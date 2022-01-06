import { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";

import Modal from "react-modal";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Francois One", sans-serif;
`;

const Title = styled.div`
  font-size: 3rem;
  margin-top: 2rem;
`;

const Buttons = styled.div`
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
`;

const Enter = styled.button`
  justify-self: start;
  align-self: center;
  background: #ffffff;
  font-size: 1rem;
  border: 5px solid #f5f7fa;
  box-sizing: border-box;
  box-shadow: 0px 8px 24px #eff3f9;
  border-radius: 40px;
  padding: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  &:enabled {
    &:hover {
      color: black;
      background: #e6e6e6;
      font-weight: bold;
      border: 5px solid #d2d2d4;
    }
  }
`;

const Text = styled.div`
  justify-self: end;
  align-self: center;
  background: #ffffff;
  border: 5px solid #f5f7fa;
  box-sizing: border-box;
  box-shadow: 0px 8px 24px #eff3f9;
  border-radius: 40px;
  padding: 1rem;
  width: 20%;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const First = styled.div`
  justify-self: end;
  align-self: center;
  background: #ffffff;
  border: 5px solid #f5f7fa;
  box-sizing: border-box;
  box-shadow: 0px 8px 24px #eff3f9;
  border-radius: 40px;
  padding: 1rem;
  width: 100%;
`;

const Card = styled.div``;

function App() {
  Modal.setAppElement("#root");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [inventory, setInventory] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory/").then((res) => {
      setInventory(res.data);
    });
  }, [submitted]);

  const resetInputs = () => {
    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setBrand("");
  };

  const submitNewInventoryItem = async () => {
    const newInventoryObject = {
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      brand: brand,
    };
    await axios.post(
      "http://localhost:5000/api/inventory/",
      newInventoryObject
    );
  };

  const editInventoryItem = async () => {
    const editedInventoryObject = {
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      brand: brand,
    };
    await axios.put(
      `http://localhost:5000/api/inventory/${inventory[selected]._id}`,
      editedInventoryObject
    );
  };

  const deleteInventoryItem = async () => {
    await axios.delete(
      `http://localhost:5000/api/inventory/${inventory[selected]._id}`
    );
  };

  const populateModel = () => {
    setName(inventory[selected].name);
    setPrice(inventory[selected].price);
    setDescription(inventory[selected].description);
    setQuantity(inventory[selected].quantity);
    setBrand(inventory[selected].brand);
  };

  return (
    <Container>
      <Title>Inventory Manager</Title>
      <Buttons>
        <Enter
          enabled
          id="buttonControl"
          onClick={async () => {
            setIsOpen(true);
          }}
        >
          Create New Inventory Item
        </Enter>
        <Enter
          enabled
          id="buttonControl"
          onClick={() => {
            populateModel();
            setEdit(true);
            setIsOpen(true);
          }}
        >
          Edit Inventory Item
        </Enter>
        <Enter
          enabled
          id="buttonControl"
          onClick={async () => {
            await deleteInventoryItem();
            setSubmitted(!submitted);
          }}
        >
          Delete Inventory Item
        </Enter>
        <Enter
          enabled
          id="buttonControl"
          onClick={() => {
            onSubmit();
          }}
        >
          Export Data to CSV
        </Enter>
      </Buttons>

      {Object.keys(inventory).map(function (key, index) {
        return (
          <Card onClick={() => setSelected(index)}>
            {inventory[key].name};{inventory[key].price};
            {inventory[key].description};{inventory[key].quantity};
            {inventory[key].brand}
          </Card>
        );
      })}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <First>
          <input
            type="text"
            placeholder="Inventory Name"
            value={name}
            onChange={(e) => setName(e.target?.value)}
          ></input>
        </First>
        <First>
          <input
            type="text"
            placeholder="Inventory Price"
            value={price}
            onChange={(e) => setPrice(e.target?.value)}
          ></input>
        </First>
        <First>
          <input
            type="text"
            placeholder="Inventory Description"
            value={description}
            onChange={(e) => setDescription(e.target?.value)}
          ></input>
        </First>
        <First>
          <input
            type="text"
            placeholder="Inventory Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target?.value)}
          ></input>
        </First>
        <First>
          <input
            type="text"
            placeholder="Inventory Brand"
            value={brand}
            onChange={(e) => setBrand(e.target?.value)}
          ></input>
        </First>
        <button
          onClick={() => {
            setIsOpen(false);
            resetInputs();
            setEdit(false);
          }}
        >
          close
        </button>
        {edit ? (
          <button
            onClick={async () => {
              setIsOpen(false);
              await editInventoryItem();
              setSubmitted(!submitted);
              setEdit(false);
            }}
          >
            Edit
          </button>
        ) : (
          <button
            onClick={async () => {
              await submitNewInventoryItem();
              setIsOpen(false);
              setSubmitted(!submitted);
            }}
          >
            create
          </button>
        )}
      </Modal>
    </Container>
  );
}

export default App;
