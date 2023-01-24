import './App.css';
import {useState, useEffect} from "react";
import firebase from "./Firebase";


function App() {
    const ref = firebase.firestore().collection("Projects")
    // console.log(ref);
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)

    function getData() {
        ref.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setData(items)
            setLoader(false)
        })
    }

    useEffect(() => {
        getData()
        // console.log(data)
    }, [])
    return (
        <div className="App">
            <h1> #firebase firestore database</h1>
            {loader === false && (data.map((dev) => (
                <div key={dev.id}>
                    <h1>Name: {dev.name}</h1>
                    <p>Author: {dev.author}</p>
                </div>
            )))}
        </div>
    );
}

export default App;
