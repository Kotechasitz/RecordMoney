import React, { useEffect, useState } from 'react';
import './App.css';
import  Transaction from './components/Transaction'
import FormComponent from './components/FormComponent';
import DataContext from './data/DataContext';
import ReportComponent from './components/ReportComponent';
import { BrowserRouter as  Router, Switch, Route, Link} from "react-router-dom"

function App() {

const design = {color:'green', textAlign:'center', fontSize:'1.5rem'}
const initState = [
  {id:1,title:"a",amount:1000},
  {id:2,title:"b",amount:-500},
  {id:3,title:"c",amount:-500},
  {id:4,title:"d",amount:500}
]

const [items,setItems] = useState(initState) 
const [reportIncome,setReportIncome] = useState(0)
const [reportExpense,setreportExpense] = useState(0)

const onAddItem = (newItem)=>{
  setItems((prevItem)=>{
    return [newItem,...prevItem]
  })
  console.log("ข้อมูลที่ส่งมาจาก FormComponent ",newItem)
}

useEffect(()=>{
  const amounts =  items.map(items=>items.amount)
  const income = amounts.filter(element=>element > 0).reduce((total,element)=>total+=element,0)
  const expense = (amounts.filter(element=>element < 0).reduce((total,element)=>total+=element,0))*-1

  setReportIncome(income)
  setreportExpense(expense)
 },[items,reportIncome, reportExpense])

  return (
    <DataContext.Provider value ={
      {income : reportIncome,expense : reportExpense}
    }>
      <dev className="contrainer">
        <h1 style={design}>บัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/" exact>ข้อมูลบัญชี</Link>
              </li>
              <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" exact>
                <ReportComponent/>
              </Route>
              <Route path="/insert">
                <FormComponent onAddItem={onAddItem}/>
                <Transaction items={items}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </dev>
    </DataContext.Provider>

  );
}

export default App;
