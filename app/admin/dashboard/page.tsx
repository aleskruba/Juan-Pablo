import Dashboard from "./components/Dashboard";

function page() {

  if (typeof window !== "undefined") {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

        if (key === "theme") {
          localStorage.removeItem(key);
        }
}
}

  return (
    <Dashboard/> 
 )
}

export default page