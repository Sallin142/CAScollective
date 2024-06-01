import { useState } from 'react';
import '../stylesheets/CollectionForm.css';


export default function CollectionForm({
    nameValue,
    afterSubmit = (name) => {},
    showForm,
    closeForm = () => {},
}) {

    const [currentNameValue, setCurrentNameValue] = useState(nameValue);

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data.get('collection-name'))
        const collectionName = data.get('collection-name');
        afterSubmit(String(collectionName));
    }

    return (
        showForm ? (
            <form className='collection-form' onSubmit={handleSubmit} autoComplete="off">
                <input 
                    type='text' 
                    name='collection-name' 
                    placeholder='Collection Name' 
                    value={currentNameValue} 
                    onChange={(e) => setCurrentNameValue(e.target.value)}
                />
                <div className='collection-form-buttons'>
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={closeForm}>Cancel</button>
                </div>
            </form>
        ) : (
            <></>
        )
    );
}
