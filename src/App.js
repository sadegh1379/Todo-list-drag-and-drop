import React from "react";
import Header from "./components/Header";
import Board from "./components/Board";

const App = () =>{
    return (
       <div className="max-w-5xl mx-auto pt-[5%] px-10">
        <Header />
        <Board />
       </div>
    )
}

export default App