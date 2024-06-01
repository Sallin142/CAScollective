import { useState, useEffect, useRef } from 'react';
import '../stylesheets/DocumentForm.css';


export default function DocumentForm({
    keyValue,
    dataValue,
    handleSubmit,
    showForm = false,
    setShowForm = (boolean) => { },
}) {
    const [currentKeyValue, setCurrentKeyValue] = useState('');
    const [currentDataValue, setCurrentDataValue] = useState('');

    useEffect(() => {
        setCurrentKeyValue(keyValue);
        setCurrentDataValue(dataValue);
    }, [keyValue, dataValue]);

    const textareaRef = useRef(null);

    // adjusts the textarea height dynamically
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.addEventListener('input', adjustTextareaHeight);
            // Trigger the initial height adjustment
            // timeout insures the component is rendered before the initial height is calculated
            setTimeout(adjustTextareaHeight, 5);
            return () => {
                textarea.removeEventListener('input', adjustTextareaHeight);
            };
        }
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const documentKey = data.get('document-key');
        const documentData = data.get('document-data');
        handleSubmit(documentKey, documentData);
    }

    return (
        <>  
            {showForm ? (
                <form onSubmit={onSubmit} autoComplete="off" className='document-form'>
                    <div className='form-top'>
                        <input
                            type="text"
                            name="document-key"
                            placeholder="Document Key"
                            value={currentKeyValue}
                            onChange={(e) => setCurrentKeyValue(e.target.value)}
                        />
                        <div className="document-form-buttons">
                            <button type="submit">Submit</button>
                            <button type="submit" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </div>
                    <textarea
                        ref={textareaRef}
                        type="text"
                        name="document-data"
                        placeholder='Enter Document Data in JSON format: {"name": "John Doe"}'
                        value={currentDataValue}
                        onChange={(e) => {
                            setCurrentDataValue(e.target.value);
                            adjustTextareaHeight();
                        }}
                    />
                    <div className="document-form-buttons document-form-small-screen">
                        <button type="submit">Submit</button>
                        <button type='button' onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <></>
            )}
        </>
    );
}