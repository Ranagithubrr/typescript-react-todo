import { useState, useEffect } from 'react';
import BGImg from '../assets/img/bg.jpg';
import Item from './Item';

type TodoType = {
  title: string,
  desc: string,
  index?: number,
  DeleteClicked?: (ind: number) => void;
  UpdateClicked?: (ind: number) => void;
};

const Todo = () => {
  const localStorageData = localStorage.getItem('todos');
  const [initialTodos, setInitialTodos] = useState(localStorageData ? JSON.parse(localStorageData) : []);
  const [updateButton, setUpdateButton] = useState(false)
  // all todos
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  // new todo
  const [newtodo, setNewtodo] = useState({
    title: '',
    desc: '',
  });

  // updating to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

  }, [todos]);

  // getting item from local storage
  useEffect(() => {
    const localtodos = localStorage.getItem('todos');
    if (localtodos) {
      const Data = JSON.parse(localtodos);
      setTodos(Data);
    } else {
      console.log('no data');
    }
  }, []);

  // Add item
  const SubmitClicked = () => {
    if (newtodo.desc === "" || newtodo.title === "") {
      window.alert("fill all the fields")
      return;
    }
    const updatedTodos: any = [...todos, newtodo];
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodos(updatedTodos);
    setNewtodo({
      title: '',
      desc: '',
    });
  };

  // delete item

  const DeleteClicked = (ind: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(ind, 1);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }



  // trigger update item and set values
  const [ind, setInd] = useState(0);
  const UpdateClicked = (ind: number) => {
    setInd(ind)
    const foundTodo = todos.find((ele, index) => index === ind);
    if (foundTodo) {
      setUpdateButton(true);
      setNewtodo({
        title: foundTodo.title,
        desc: foundTodo.desc
      });
    } else {
      console.log('Todo not found for index:', ind);
    }
  }
  // update item
  const UpdateTodo = (ind: number) => {
    const updatedTodos = [...todos];
    updatedTodos[ind] = newtodo;
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setNewtodo({
      title: '',
      desc: '',
    });
    setUpdateButton(false);
  };
  return (
    <div className='bg-cover h-screen w-screen pt-10' style={{ backgroundImage: `url(${BGImg})` }}>
      <h2 className='text-gray-600 bg-gray-200 w-1/2 m-auto text-center font-bold text-3xl py-5 rounded'>React TypeScript ToDo</h2>
      <div className='w-1/2 m-auto shadow-lg bg-gradient-to-r from-gray-200 to-gray-300 p-10 mt-10 flex  rounded-sm'>        
        <div className='w-3/5 p-2'>      
          <h2 className='font-bold text-xl text-teal-600'>My ToDo's</h2>
          {
            todos.length === 0 ? <span>no items</span> :
              todos.map((ele, index) => {
                return (
                  <Item
                    key={index}
                    title={ele.title}
                    desc={ele.desc}
                    Serial={index + 1}
                    index={index}
                    initialTodos={initialTodos}
                    setInitialTodos={setInitialTodos}
                    DeleteClicked={DeleteClicked}
                    UpdateClicked={UpdateClicked} />
                )
              })
          }
        </div>
        <div className='w-2/5'>
          <h2 className='font-bold text-xl text-teal-600'>Add ToDo</h2>
          <label htmlFor="title" className='text-sm font-semibold py-2 block'>Title</label>
          <input
            type="text"
            placeholder='ex: Todo 1'
            id='title'
            className='block w-full p-2 outline-none border-transparent border-b-2 focus:border-teal-400'
            value={newtodo.title}
            onChange={(e) => setNewtodo({ ...newtodo, title: e.target.value })}

          />
          <label htmlFor="desc" className='text-sm font-semibold py-2 block'>Description</label>
          <input
            type="text"
            placeholder='ex: A simple Description'
            id='desc'
            className='block w-full p-2 outline-none border-transparent border-b-2 focus:border-teal-400'
            value={newtodo.desc}
            onChange={(e) => setNewtodo({ ...newtodo, desc: e.target.value })}
          />

          <div className='text-center'>
            <button
              className='bg-teal-500 text-gray-100 text-sm font-semibold px-5 py-1 my-2 rounded-full'
              onClick={updateButton ? () => UpdateTodo(ind) : () => SubmitClicked()}
            >{updateButton ? "Update Item" : "Add Item"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
