import React from "react";
import Layout from "../component/Layout";
import Navbar from "../component/nav/Navbar";
import TaskList from "../component/task/TaskList";

function Home() {
  return (
    <>
      <div className="fixed bottom-0 right-0 bg-gray-800 text-sm font-medium text-gray-50 p-2 mr-2 mb-2 rounded-lg">
        Crafted with <span className="text-red-500">&hearts;</span> by{" "}
        <a
          href="https://github.com/coolkishann"
          target="_blank"
          className="italic"
        >
          Kishan
        </a>{" "}
        &{" "}
        <a
          href="http://Artbyadi77.netlify.app"
          target="_blank"
          className="italic"
        >
          Aditya
        </a>{" "}
        <span className="text-green-500">&#x1F680;</span>
      </div>
      <Layout>
        <Navbar />
        <hr />
        <TaskList />
      </Layout>
    </>
  );
}
export default Home;
