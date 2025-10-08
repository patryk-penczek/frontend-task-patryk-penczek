import BackgroundWrapper from "./components/BackgroundWrapper";
import CardWrapper from "./components/CardWrapper";
import ContentWrapper from "./components/ContentWrapper";
import Header from "./components/Header";
import Input from "./components/Input";
import ListInfo from "./components/ListInfo";
import TodoList from "./components/ToDoList";
import ToDoListActionBar from "./components/ToDoListActionBar";
import useTodos from "./hooks/useTodos";

export function App() {
  const {
    todos,
    inputValue,
    incompleteTodosCount,
    completedTodosCount,
    hasTodos,
    actions,
  } = useTodos();

  return (
    <BackgroundWrapper>
      <ContentWrapper>
        <Header />
        <CardWrapper>
          <Input
            handleSubmit={actions.handleSubmit}
            inputValue={inputValue}
            setInputValue={actions.setInputValue}
          />
          <TodoList
            todos={todos}
            handleToggleComplete={actions.handleToggleComplete}
          />
          {hasTodos && (
            <ToDoListActionBar
              incompleteTodosCount={incompleteTodosCount}
              completedTodosCount={completedTodosCount}
              handleClearCompleted={actions.handleClearCompleted}
            />
          )}
        </CardWrapper>
        <ListInfo />
      </ContentWrapper>
    </BackgroundWrapper>
  );
}
