import { useState, useEffect } from 'react'
import './FormComponent.css'
import { v4 as uuidv4 } from 'uuid';

const FormComponent = (props)=>{

const [title,setTitle] = useState('')
const [amount,setAmount] = useState(0)
const [formValid, setFormValid] = useState(false)

const inputTitle = (event)=>{
    setTitle(event.target.value)
}

const inputAmount = (event)=>{
    setAmount(event.target.value)
}

const saveItem = (event)=>{
    event.preventDefault()
    const itemData={
        id:uuidv4(),
        title:title,
        amount:Number(amount)
    }
    setTitle('')
    setAmount(0)
    setFormValid(false)
    props.onAddItem(itemData)
    console.log("บันทึกข้อมูลเรียบร้อยแล้ว");
}

useEffect(()=>{
    if (title.trim().length > 0 && amount !== 0) {
        setFormValid(true)
    }
},[title, amount])

    return(
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" onChange={inputTitle} value={title} placeholder="ระบุชื่อรายการของคุณ"/>
                    <label >กรุณากรอกชื่อรายการ</label>
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input type="number" onChange={inputAmount} value={amount} placeholder="(+ รายรับ , - รายจ่าย)"/>
                </div>
                <div>
                    <button type="submit" disabled={!formValid} className="btn">เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    );
}

export default FormComponent