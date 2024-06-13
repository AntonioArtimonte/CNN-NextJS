import Cards from "@/components/upload";
import ResultCard from "@/components/img-card";
import ParentComponent from "@/components/parent-components/parent-comp";


const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Upload de arquivos</h1>
      <div className="flex items-center justify-center w-full">
        <div className="p-4"> 
          <ParentComponent />
        </div>
      </div>
    </div>
  );
}

export default Home
