import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

const products = [
  { id:"projet 1", name: "apple", price: "10%" },
  { id:"projet 2", name: "orange", price: "20%" },
  { id:"projet 3", name: "banana", price: "12%" },
  { id:"projet 4", name: "peach", price: "2%" }
];

const columns = [
  {
    dataField: "id",
    text: "Projet",
    sort: true
  },
  {
    dataField: "price",
    text: "Drainage",
    sort: true
  },
  {
    dataField: "price",
    text: "Voirie",
    sort: true,
    validator: (newValue, row, column) => {
      if (isNaN(newValue)) {
        return {
          valid: false,
          message: "Price should be numeric"
        };
      }
      if (newValue > 5) {
        return {
          valid: false,
          message: "Price should less than 6"
        };
      }
      return true;
    }
  },
  {
    dataField: "price",
    text: "eau potable",
    sort: true
  },
  {
    dataField: "price",
    text: "assainissement",
    sort: true
  },
  {
    dataField: "price",
    text: "eclairage public ",
    sort: true
  }
];

const defaultSorted = [
  {
    dataField: "name",
    order: "desc"
  }
];

export default class TranchTab extends React.Component {
  render() {
    return (
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true 
        })}
      />
    );
  }
}
