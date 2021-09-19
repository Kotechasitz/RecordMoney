import  Item from './Item'
import  './Transaction.css'

const Transaction=(props)=>{
  const {items} = props
  return(
    <div>
      <ul className="item-list">
          {items.map((element)=>{
            return <Item title={element.title} amount={element.amount} key={element.id}/>
          })}
      </ul>
    </div>
  );
}

  export default Transaction