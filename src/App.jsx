import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const now = new Date()
  const [todo, setTodo] = useState([
    {
      id: Number(now),
      content: "Todo List를 작성해주세요.",
      timestamp: now.toLocaleTimeString('ko', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    },
  ]);

  
  return(
    <>
    <h1>Todo List</h1>
    <hr />
    <Advice/>
    <Clock/>
    <TodoInput setTodo ={setTodo}/>
    <hr />
    <TodoList todo ={todo} setTodo ={setTodo} />
    </>
  ) 
}

const useFetch = (url)=>{
  const [isLoading, setIsLoading]=useState(true)
  const [data, setData] =useState(null)

  useEffect(()=>{
    fetch(url)
    .then(res => res.json())
    .then(res => {
      setData(res)
      setIsLoading(false)
    })
  },[url])
  return [isLoading, data]
}


const Advice = ()=>{
  const [isLoading, data] = useFetch("https://korean-advice-open-api.vercel.app/api/advice")
 
  return(<>
  {!isLoading && (
    <>
    
    <div className="advice advice_main">{data.message}</div>
    <div className="advice">-{data.author}</div>
   
    </>
    )}
  </>)
}

const Clock = ()=>{
  const [time, setTime] = useState(new Date())
  const nowTime = time.toLocaleTimeString('ko',{
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })

  useEffect(()=>{
    setInterval(()=>{
      setTime(new Date())
    }, 1000)
  },[])

  return(
    <div className="clock_container">
    <div className="clock">{nowTime}</div>
    </div>
  )
}

const TodoInput = ({setTodo}) => {
  const inputRef = useRef(null);
  const now = new Date()
  const addTodo = () => {
    
    const newTodo = {
      id: Number(now),
      content: inputRef.current.value,
      timestamp: now.toLocaleTimeString('ko', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    setTodo((prev) => [...prev, newTodo]);
    inputRef.current.value = ""
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(); // 엔터키가 눌리면 할 일 추가
    }
  };


  return (
    <>
      <div className="input">
      <input className="todo_input" ref={inputRef} placeholder="할 일을 입력해주세요." onKeyDown={handleKeyPress} />
      <button className="inputBtn" onClick={addTodo}>추가</button>
      </div>
    </>
  );
};

const TodoList = ({todo, setTodo}) => {
  return (
    <>
    <div className="todoList">
      <ul>
        {todo.map((el) => (
          <Todo todo ={el} setTodo={setTodo} key={el.id} />
        ))}
      </ul>
      </div>
    </>
  );
};

const Todo = ({todo, setTodo}) => {
  return (
    <li>
      {todo.content} <span className="timestamp">{todo.timestamp}</span>
      <button className="btn2"
        onClick={() => {
          setTodo((prev) => prev.filter((el) => el.id !== todo.id));
        }}
      >
        삭제
      </button>
    </li>
  );
};

export default App;
