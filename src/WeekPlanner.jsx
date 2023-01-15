import React, { useState, useEffect } from 'react';

import './WeekPlanner.css';

const WeekPlanner = () => {

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [bucketName, setBucketName] = useState('');
    const [bucket, setBucket] = useState('');
    const [savedUrls, setSavedUrls] = useState([]);
    const [savedBuckets, setSavedBuckets] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editBucketIndex, setEditBucketIndex] = useState(null);



    useEffect(() => {
        const persistedUrls = localStorage.getItem('savedUrls');
        const persistedBuckets = localStorage.getItem('savedBuckets');
        if (persistedUrls) {
            setSavedUrls(JSON.parse(persistedUrls));
        }
        if (persistedBuckets) {
            setSavedBuckets(JSON.parse(persistedBuckets));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('savedUrls', JSON.stringify(savedUrls));
        localStorage.setItem('savedBuckets', JSON.stringify(savedBuckets));
    }, [savedUrls, savedBuckets]);

    const handleUrlInput = event => {
        setUrl(event.target.value);
    };

    const handleNameInput = event => {
        setName(event.target.value);
    };

    const handleBucketNameInput = event => {
        setBucketName(event.target.value);
    };

    const handleBucketSelect = event => {
        setBucket(event.target.value);
    }

    const handleSaveUrl = () => {
        if (editing) {
            const newUrls = [...savedUrls];
            newUrls[editIndex] = { name, url, bucket };
            setSavedUrls(newUrls);
            setEditing(false);
            setEditIndex(null);
        } else {
            setSavedUrls([...savedUrls, { name, url, bucket }]);
        }
        setUrl('');
        setName('');
        setBucket('');
    };

    const handleSaveBucket = () => {
        if (editing) {
            const newBuckets = [...savedBuckets];
            newBuckets[editBucketIndex] = { name: bucketName };
            setSavedBuckets(newBuckets);
            setEditing(false);
            setEditBucketIndex(null);
        } else {
            setSavedBuckets([...savedBuckets, { name: bucketName }]);
        }
        setBucketName('');
    };

    const handleDeleteUrl = index => {
        const newUrls = [...savedUrls];
        newUrls.splice(index, 1);
        setSavedUrls(newUrls);
    };

    const handleEditUrl = index => {
        setEditing(true);
        setEditIndex(index);
        const { name, url, bucket } = savedUrls[index];
        setName(name);
        setUrl(url);
        setBucket(bucket);
    };

    const handleDeleteBucket = index => {
        const newBuckets = [...savedBuckets];
        newBuckets.splice(index, 1);
        setSavedBuckets(newBuckets);
    };

    const handleEditBucket = index => {
        setEditing(true);
        setEditIndex(index);
        setBucketName(savedBuckets[index].name);
    };

    const handleDragStart = (event, index) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", event.target.parentNode);
        event.dataTransfer.setDragImage(event.target.parentNode, 20, 20);
    };

    const handleDragOver = event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    };

    const handleDrop = (event, bucket) => {
        let draggedUrlIndex = null;
        event.preventDefault();
        const newUrls = [...savedUrls];
        const draggedUrl = newUrls.splice(draggedUrlIndex, 1)[0];
        draggedUrl.bucket = bucket;
        newUrls.push(draggedUrl);
        setSavedUrls(newUrls);
    };
    return (
        <div className='bg'>
            <h1>React JS WeekPlanner Application</h1>
            {/* <h3>Create Bucket</h3> */}
            <input type="text" placeholder="Enter your category" onChange={handleBucketNameInput} value={bucketName} />
            <button onClick={handleSaveBucket}>{editing ? 'Update' : 'Add'} Category </button>
            {/* <h3>Add URLs to bucket</h3> */}
            <select value={bucket} onChange={handleBucketSelect}>
                <option value="">Please select a Category</option>
                {savedBuckets.map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                ))}
            </select>
            <input type="text" placeholder="Enter your WeekPlanner Name" onChange={handleNameInput} value={name} />
            <input type="text" pattern="https://.*" size="30" required placeholder="Enter your URL" onChange={handleUrlInput} value={url} />
            <button onClick={handleSaveUrl}>{editing ? 'Update' : 'Save'} WeekPlanner</button>
            {savedBuckets.map((item, index) => (
                <div key={index} className="bucketcardinfo">
                    <div className='bucketsection'>
                        <h3>Category Name</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                            <h4 >{item.name}</h4>
                            <div>  <button onClick={() => handleDeleteBucket(index)} className='buttonw'>Delete</button>
                                <button onClick={() => handleEditBucket(index)} className='buttonw'>Edit</button></div>
                        </div>
                    </div>

                    {savedUrls
                        .filter(url => url.bucket === item.name)
                        .map((url, urlIndex) => (
                            <div key={urlIndex} className="card">
                                <div className='bucketsection' key={urlIndex} draggable onDragStart={(e) => handleDragStart(e, urlIndex)} onDrop={(e) => handleDrop(e, item.name)} onDragOver={handleDragOver}>
                                    <h3>Card Name & URL</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                                        <h4 style={{ padding: '1rem' }} >{url.name}</h4>
                                        <div>
                                            <button onClick={() => handleDeleteUrl(urlIndex)} className='buttonw'>Delete</button>
                                            <button onClick={() => handleEditUrl(urlIndex)} className='buttonw'>Edit</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                </div>
            ))}


        </div>
    );
};


export default WeekPlanner;