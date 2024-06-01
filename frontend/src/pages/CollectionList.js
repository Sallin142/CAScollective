import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserID}  from '../hooks/useGetUserID'; 
import '../stylesheets/main.css'
import toast, { Toaster } from 'react-hot-toast';

import { 
    selectCollections, 
    getCollections, 
    createCollection, 
    deleteCollection, 
    updateCollection,
    selectCollectionStatus
} from '../features/collectionsSlice'
import '../stylesheets/CollectionList.css';
import Loader from '../components/Loader';
import CollectionForm from '../components/CollectionForm';
import CollectionCard from '../components/CollectionCard';

export default function CollectionList() {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editingCollection, setEditingCollection] = useState(undefined);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getCollections({}));
    }, [dispatch]);

    // get collections
    let collections = useSelector(selectCollections);

    // get collections status to check if it's loading
    const collectionsStatus = useSelector(selectCollectionStatus);

    async function handleSubmit(name) {
        await dispatch(createCollection({
            collectionName: name,
        }));
        setShowForm(false);

        dispatch(getCollections({}));
    }

    async function handleDelete(name) {
        console.log("deleting name = " + name);
        await dispatch(deleteCollection({
            collectionName: name
        }));
        navigate('/collections');

        dispatch(getCollections({}));
    }
    
    async function handleEdit(name) {
        await dispatch(updateCollection({
            collectionName: editingCollection,
            newName: name,
        }));
        setShowEdit(false);

        dispatch(getCollections({}));
    }

    return (
        <div className='collection-list-container'>
            <h1>Collections</h1>
            <Toaster/>
            {
                showForm ?
                <div></div> :
                <button onClick={() => setShowForm(!showForm)}>Add Collection</button>
            }
            <div className="collection-list">
                <CollectionForm
                    showForm={showForm}
                    closeForm={() => setShowForm(false)}
                    afterSubmit={handleSubmit}
                />
                { collectionsStatus === 'fulfilled' ? ( // show content if fulfilled
                    Array.isArray(collections) && collections.length !== 0 ? collections.map((collection) => (
                        <div key={collection.name}>
                            {showEdit && editingCollection === collection.name ?  (
                                <CollectionForm
                                    showForm={showEdit}
                                    closeForm={() => setShowEdit(false)}
                                    afterSubmit={handleEdit}
                                    nameValue={collection.name}
                                /> 
                            ) : ( 
                                <CollectionCard
                                    name={collection.name}
                                    setShowEdit={setShowEdit}
                                    setEditingCollection={setEditingCollection}
                                    handleDelete={handleDelete}
                                />
                            )}
                        </div>
                    )) : <div className='no-collections'><h2>No collections available.</h2></div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}
