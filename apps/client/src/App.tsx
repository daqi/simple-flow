import { useEffect, useState } from 'react';
import Flow from './Flow';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    const fetchData = async () => {
        const res = await fetch('/api').then((res) => res.json());
        setCount(res.data);
    };
    const fetchEmail = async () => {
        const res = await fetch('/api/emails').then((res) => res.json());
        console.log(res.data);
    };
    const postData = async () => {
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then((res) => res.json());
        setCount(res.data);
    };
    useEffect(() => {
        fetchData();
        fetchEmail();
    }, []);

    return (
        <>
            <div className="card">
                <button onClick={() => postData()}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <div style={{ width: 800, height: 600 }}>
                <Flow />
            </div>
        </>
    );
}

export default App;
