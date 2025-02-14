import QueryProvider from "./context/queryProvider";
import Header from "./components/Header";
import SuperheroList from "./components/SuperheroList";

const App: React.FC = () => {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <SuperheroList />
      </div>
    </QueryProvider>
  );
};

export default App;
