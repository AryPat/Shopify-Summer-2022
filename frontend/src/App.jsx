import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Modal from "react-modal";
import {
  Container,
  Title,
  Buttons,
  Enter,
  First,
  customStyles,
  Card,
  Links,
  ATag,
  Item
} from "./AppStyle";

function App() {
  Modal.setAppElement("#root");

  // useStates
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

  // Update page once you submit a new inventory
  useEffect(() => {
    axios.get(`/inventory/`).then((res) => {
      setInventory(res.data.items);
    });
  }, [submitted]);

  // Lock buttons if you are not selecting anything
  useEffect(() => {
    selected == -1 || inventory.length == 0
      ? (document.getElementById("DeleteButton").disabled = true)
      : (document.getElementById("DeleteButton").disabled = false);

    selected == -1 || inventory.length == 0
      ? (document.getElementById("EditButton").disabled = true)
      : (document.getElementById("EditButton").disabled = false);
  }, [selected, inventory]);

  // Reset input fields
  const resetInputs = () => {
    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");
    setBrand("");
  };

  // Submit new inventory item
  const submitNewInventoryItem = async () => {
    const newInventoryObject = {
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      brand: brand,
    };
    await axios.post(`/inventory/`, newInventoryObject);
  };

  // Edit inventory item
  const editInventoryItem = async () => {
    const editedInventoryObject = {
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      brand: brand,
    };
    await axios.put(
      `/inventory/${inventory[selected]._id}`,
      editedInventoryObject
    );
  };

  // Delete Inventory Item
  const deleteInventoryItem = async () => {
    await axios.delete(
      `/inventory/${inventory[selected]._id}`
    );
  };

  // Download CSV file
  const exportCSV = async () => {
    axios({
      url: `/inventory/csv`, //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Inventory-${new Date().toISOString()}.csv`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  // Populate model with inventory item that exists
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
      <Links>
        <ATag href="https://shopify-summer-2022.herokuapp.com/api-docs/">Swagger</ATag>
        <ATag href="https://github.com/AryPat/Shopify-Summer-2022">Github</ATag>
      </Links>
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
          id="EditButton"
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
          id="DeleteButton"
          onClick={async () => {
            await deleteInventoryItem();
            setSubmitted(!submitted);
          }}
        >
          Delete Inventory Item
        </Enter>
        <Enter
          enabled
          id="ExportDataButton"
          onClick={async () => {
            await exportCSV();
          }}
        >
          Export Data to CSV
        </Enter>
      </Buttons>
      {inventory.length != 0 && (
        <Card style={{ background: "#DBEFF4" }}>
          <Item>ID</Item>
          <Item>Name</Item>
          <Item>Price($)</Item>
          <Item>Description</Item>
          <Item>Quantity</Item>
          <Item>Brand</Item>
        </Card>
      )}

      {inventory.length == 0 && (
        <Card>There is no Inventory at this moment.</Card>
      )}

      {Object.keys(inventory).map(function (key, index) {
        return (
          <Card onClick={() => setSelected(index)} chosen={selected == index}>
            <Item>{inventory[key]._id.slice(0,10)+'...'}</Item>
            <Item>{inventory[key].name}</Item>
            <Item>{'$'+inventory[key].price}</Item>
            <Item>{inventory[key].description}</Item>
            <Item>{inventory[key].quantity}</Item>
            <Item>{inventory[key].brand}</Item>
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
            type="number"
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
            type="number"
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
        <Enter
          onClick={() => {
            setIsOpen(false);
            resetInputs();
            setEdit(false);
          }}
        >
          close
        </Enter>
        {edit ? (
          <Enter
            id="edit"
            enabled
            onClick={async () => {
              setIsOpen(false);
              await editInventoryItem();
              setSubmitted(!submitted);
              setEdit(false);
            }}
          >
            Edit
          </Enter>
        ) : (
          <Enter
            id="create"
            enabled
            onClick={async () => {
              await submitNewInventoryItem();
              setIsOpen(false);
              setSubmitted(!submitted);
              resetInputs();
            }}
          >
            create
          </Enter>
        )}
      </Modal>
    </Container>
  );
}

export default App;
