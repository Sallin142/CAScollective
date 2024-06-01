import '../stylesheets/DocumentCard.css'

export default function({
    document,
    handleDelete,
    setShowForm,
    setEditingDocument,
}) {

    return(
        <div className="document-card">
            <div className="document-card-top">
                <h2>{document.key}</h2>
                <div className="document-card-buttons">
                    <button onClick={(e) => {
                        e.preventDefault();
                        setShowForm(true);
                        setEditingDocument(document.key);
                    }}>Edit</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleDelete(document.key);
                    }}>Delete</button>
                </div>
            </div>
            
            <p>{document.data}</p>

            <div className='document-card-buttons document-card-small-screen'>
                <button onClick={(e) => {
                    e.preventDefault();
                    setShowForm(true);
                    setEditingDocument(document.key);
                }}>Edit</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    handleDelete(document.key);
                }}>Delete</button>
            </div>

        </div>
    )
}