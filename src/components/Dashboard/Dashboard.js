import React from "react"
import dollarSign from "../../assets/images/dollar-sign.png"
import cart from "../../assets/images/cart.png"
import Balance from "./Balance"
import EntryList from "./EntryList"
import Header from "../Header/Header"
import Graph from "./Graph"
export const Dashboard = () => {
  return (
    <>
      <Balance />
      <EntryList />
      <Graph/>
    </>
  )
}
