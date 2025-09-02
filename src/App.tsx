import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [incompleteTodo, setIncompleteTodo] = useState<string[]>([]);
  const [completeTodo, setCompleteTodo] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickAddTask = () => {
    const inputvalue = inputRef.current?.value;

    // inputRefのDOM内にテキスト内容があるか？
    if (inputvalue && inputvalue.trim()) {
      setIncompleteTodo((prev) => [...prev, inputvalue]);
    }
  };

  const onClickDeleteTask = (todo: string) => {
    const newInCompleteTodo = incompleteTodo.filter((t) => t !== todo);
    setIncompleteTodo(newInCompleteTodo);
  };

  const onClickCompleteTask = (todo: string) => {
    const newIncompleteTodo = incompleteTodo.filter((t) => t !== todo);
    setIncompleteTodo(newIncompleteTodo);

    setCompleteTodo((prev) => [...prev, todo]);
  };

  const onClickBackTask = (todo: string) => {
    const newCompleteTodo = completeTodo.filter((t) => t !== todo);
    setCompleteTodo(newCompleteTodo);

    setIncompleteTodo((prev) => [...prev, todo]);
  };

  return (
    <div>
      <div className="input-area">
        <input
          type="text"
          ref={inputRef}
          placeholder="TODOを入力"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={onClickAddTask}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodo.length === 0 ? (
            <div>TODOはありません</div>
          ) : (
            incompleteTodo.map((todo) => (
              <li key={todo}>
                <p className="todo-item">{todo}</p>
                <button onClick={() => onClickCompleteTask(todo)}>完了</button>
                <button onClick={() => onClickDeleteTask(todo)}>削除</button>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodo.length === 0 ? (
            <div className="">完了したTODOはありません</div>
          ) : (
            completeTodo.map((todo) => (
              <div className="list-row">
                <li key={todo}>
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickBackTask(todo)}>戻す</button>
                </li>
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
