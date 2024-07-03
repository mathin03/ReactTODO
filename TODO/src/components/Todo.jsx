import { useState, useRef, useEffect } from 'react';
import './CSS/Todo.css';
import Todoitems from './Todoitems';

let cnt = 0;
function Todo() {
    
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([...todos, { no: cnt++, text: inputRef.current.value.trim(), display: " " }]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count",cnt)
  };

  useEffect(() => {
    setTimeout(()=>{
        console.log(todos);
        localStorage.setItem("todos",JSON.stringify(todos));
    },100)
  }, [todos]);

  useEffect(()=>{
    setTodos(JSON.parse(localStorage.getItem("todos")));
    cnt=localStorage.getItem("todos_count")
  },[])

  return (
    <div className='todo'>
      <div className="todo-header">TO-DO LIST</div>
      <div className="todo-add">
        <input type="text" ref={inputRef} placeholder='ADD YOUR TASK' className='todo-input' />
        <div onClick={add} className="to-do-btn">ADD</div>
      </div>
      <div className="todo-list">
        {todos.map((item,index)=>{
            return <Todoitems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
        })}
      </div>
    </div>
  );
}

export default Todo;
