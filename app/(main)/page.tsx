const MainPage = () => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col p-0 m-0 bg-white">
      <main className="md:relative flex flex-col gap-2 flex-1 justify-center items-center space-y-2 p-4 z-10">
        <div className="flex flex-col items-center md:flex-row max-w-[60rem] frosted-glass-card p-10 gap-10">
          <div className="flex-1 flex-col min-w-0 space-y-2">
            <div className="flex flex-col gap-4 items-center text-4xl">ProMed Exams</div>
            <div className="flex flex-col gap-4 items-center text-xl">[ COMING SOON ]</div>
          </div>
        </div>
      </main>
      <footer className="text-black/50 flex flex-col items-center m-4">
        <p>COPYRIGHT (©) 2025, ProMed Exams PC</p>
      </footer>
    </div>
  );
};

export default MainPage;
