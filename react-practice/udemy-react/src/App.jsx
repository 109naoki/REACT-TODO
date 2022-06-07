import React,{useState} from "react";
import CompleteTodos from "./components/CompleteTodos";
import IncompleteTodos from "./components/IncompleteTodos";
import InputTodo from "./components/InputTodo";
import "./style.css";


export const App = () => {
  // TODOを入力エリアのState
  const [todoText,setTodoText] = useState('');
  // 未完了のTODO初期値
  const [incompleteTodos,setincompleteTodos] = useState([]);
  // 完了のTODO初期値
  const [completeTodos,setcompleteTodos] = useState([]);
  // テキストを描画
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // 未完了のTODOエリアに追加する
  const onClickAdd = () => {
    if(todoText === "") return;
    const newTodos = [...incompleteTodos,todoText];
    setincompleteTodos(newTodos);
    setTodoText("");

  }

  // タスクの削除
  const onClickDelete = (index) => {
   const newTodos = [...incompleteTodos];
   newTodos.splice(index,1);
  setincompleteTodos(newTodos);

  }

  // 完了エリアに移動させる
  const onClickComplete = (index) => {
   const newIncompleteTodos = [...incompleteTodos];
   newIncompleteTodos.splice(index,1);
   const newCompleteTodos = [...completeTodos,incompleteTodos[index]];

   setincompleteTodos(newIncompleteTodos);
   setcompleteTodos(newCompleteTodos);
  }

  // 完了エリアから未完了エリアに戻す
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index,1);

    const newIncompleteTodos = [...incompleteTodos,completeTodos[index]];

   setcompleteTodos(newCompleteTodos);
     setincompleteTodos(newIncompleteTodos);

  }
  return(
    <>
  <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick = {onClickAdd} disabled={incompleteTodos.length >= 5}/>
  {incompleteTodos.length >= 5 && (
      <p>登録できるtodoは5個までだよ</p>
  )}

  <IncompleteTodos todos={incompleteTodos} onClickComplete={onClickComplete} onClickDelete={onClickDelete}/>
  <CompleteTodos todos={completeTodos} onClickBack={onClickBack}/>
    </>
  )
}

export default App;
