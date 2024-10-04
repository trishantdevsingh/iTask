import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import "./App.css"
function App() {
  const [todo, setTodo] = useState("");
  var [todos, setTodos] = useState([]);
  const [check , setCheck] = useState(false);
useEffect(() => {
  let newt = localStorage.getItem("todos1")
  if(newt){
    let newt11 = JSON.parse(newt);
    setTodos(newt11);
  }
}, [])


  function saveTLS(){
    localStorage.setItem("todos1" , JSON.stringify(todos));
  }
  function handleChange(e){
    setTodo(e.target.value);
  }
  function handleAdd(){
    todos.push({id:uuidv4() , text:todo , isCompleted:false});
    setTodos(todos);
    setTodo("");
    saveTLS();
  }
  function handleEdit(id){
    let index = todos.findIndex((item)=>{
      return item.id===id;
    })
    setTodo(todos[index].text);
    handleDelete(id);
  }
  function handleDelete(id){
    let newt = todos.filter((item)=>{
      return item.id !== id;
    })
    todos = newt;
    setTodos(todos);
    saveTLS();
  }
  function handleCheckChange(e){
    let id = e.target.name;
    let index = todos.findIndex((item)=>{
      return item.id === id;
    });
    // let temp = [...todos];
    let newt = [...todos];
    newt[index].isCompleted = !newt[index].isCompleted;
    setTodos(newt);
    saveTLS();
  }
  function handleShowCheck(e){
    setCheck(!check);
  }
  return (
    <>
      <Navbar/> 
      <div className="container bg-slate-200 justify-center w-1/2 min-w-[300px] rounded-xl mx-auto my-9 py-7 px-5 min-h-[80vh]">
        <h2 className='font-bold text-xl'>Add a todo</h2>
          <div className="input flex gap-16  justify-center my-3 mx-3">
            <input onChange={handleChange} type="text" value={todo} className='w-3/4 min-w-[170px] rounded-md px-3' placeholder='Enter things todo.....'/>
            <button onClick={handleAdd} className='bg-violet-800 p-1 rounded-md text-white font-bold px-3 hover:bg-violet-950 disabled:bg-slate-500'  disabled={todo.length<1}> Save </button>
          </div>
        <input type="checkbox" checked = {check} onChange={handleShowCheck}/> Show Finished items
        <h2 className='font-bold text-xl mt-3'>Your Todos</h2>
        <div className="todos">
        {todos.map((i)=>{
          return((check || !i.isCompleted) && <div key={i.id} className="todo flex justify-between  my-5">
            <div className={"flex gap-2 items-center max-w-[55%]" }>
              <input onChange={handleCheckChange} name={i.id} type="checkbox" checked={i.isCompleted}/>
              <div className={i.isCompleted?"line-through  flex break-all":"flex break-all"}>{i.text}</div>
            </div>
            <div className="buttons flex">
              <button onClick={(e)=>handleEdit(i.id)} className='bg-violet-800 self-center rounded-md p-1 text-white font-bold px-2 hover:bg-violet-950'>Edit</button>
              <button onClick={(e)=>{handleDelete(i.id) }} className='bg-violet-800 self-center rounded-md p-1 text-white font-bold px-2 ml-1 hover:bg-violet-950'>Delete</button>
            </div>
          </div>
          )})}
        </div>
      </div>
    </>
  )
}

export default App
