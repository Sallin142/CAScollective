import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { selectCollections, getCollections, selectCollectionStatus } from '../features/collectionsSlice'
import { selectDocuments, getDocuments, createDocument, selectDocumentsStatus, updateDocument, deleteDocument } from '../features/documentsSlice';

import '../stylesheets/Collection.css';
import DocumentForm from '../components/DocumentForm';
import Loader from '../components/Loader';
import DocumentCard from '../components/DocumentCard';

import toast, { Toaster } from 'react-hot-toast';

export default function Collection() {
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editingDocument, setEditingDocument] = useState(undefined); // document being edited

    useEffect(() => {
        dispatch(getCollections({}));
        dispatch(getDocuments({collectionName: collectionName}));
    }, [dispatch]);

    // filter an get collection with the same key as the one in the url
    const { collectionName } = useParams();
    const collections = useSelector(selectCollections);
    const collection = collections.find((collection) => collection.name == collectionName);

    // get collection and document status to check if it's loading
    const collectionStatus = useSelector(selectCollectionStatus);
    const documentStatus = useSelector(selectDocumentsStatus);

    // Filter an get document with the same key as the one in the url
    let documents = useSelector(selectDocuments);
    
    async function handleEdit(documentKey, documentData) {
        await dispatch(updateDocument({
            collectionName: collectionName,
            document: {
                key: editingDocument,
                newKey: documentKey,
                newData: documentData,
            },
        }));
        setShowEdit(false);

        dispatch(getDocuments({collectionName: collectionName}));
    }

    async function handleDelete(key){
        await dispatch(deleteDocument({
            collectionName: collectionName,
            documentKey: key,
        }))

        dispatch(getDocuments({collectionName: collectionName}));
    }

    async function handleCreateDocument(documentKey, documentData) {
        await dispatch(createDocument({
            collectionName: collectionName,
            document: {
                key: documentKey,
                data: documentData,
            },
        }));
        setShowForm(false);
        dispatch(getDocuments({collectionName: collectionName}));
    }
    
    return (
        <div className="collection">
            {collectionStatus === 'fulfilled' && documentStatus === 'fulfilled' ? (
                <>
                    <Toaster/>
                    <h1>{collection.name}</h1>
                    {
                        !showForm ?
                            <button onClick={() => setShowForm(true)}>Add Document</button> :
                            <></>
                    }

                    <div className='document-list'> 
                        <DocumentForm
                            handleSubmit={handleCreateDocument}
                            showForm={showForm}
                            setShowForm={setShowForm}
                        />
                        {Array.isArray(documents) && documents.length > 0 ? (
                            documents.map((document) => {
                                return(
                                    <div key={document.key}>
                                        {showEdit && document.key === editingDocument ?
                                            <DocumentForm
                                            
                                                handleSubmit={handleEdit}
                                                showForm={showEdit}
                                                setShowForm={setShowEdit}
                                                keyValue={document ? document.key : ''}
                                                dataValue={document ? document.data : ''}
                                            />
                                            
                                        :
                                            <DocumentCard
                                                document={document}
                                                handleDelete={handleDelete}
                                                setShowForm={setShowEdit}
                                                setEditingDocument={setEditingDocument}
                                            />
                                        }
                                    </div>
                                );
                            })
                        ) : (
                            <div className='no-documents'><h2>This collection has no documents</h2></div>
                        )}
                    </div>
                </>
            ) : (
                collectionStatus === 'pending' || documentStatus === 'pending' ? (
                    <Loader />
                ) : (
                    <h1>Invalid Collection Name</h1>
                )
                
            )}

            

        </div>

    );
}