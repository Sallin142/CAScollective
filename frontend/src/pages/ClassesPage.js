import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../stylesheets/ClassesPage.css';
import axios from 'axios';
import { getClasses, createClass, updateClass, deleteClass, selectClasses, selectClassesStatus } from '../features/classesSlice'
import Loader from '../components/Loader';
import { NavLink } from 'react-router-dom';


export default function ClassesPage() {
    const dispatch = useDispatch();
    const classes = useSelector(selectClasses);
    const status = useSelector(selectClassesStatus);

    useEffect(() => {
        dispatch(getClasses());
    }, [dispatch]);

    const [showForm, setShowForm] = useState(false);
    const [className, setClassName] = useState('');
    const [editClassID, setEditClassID] = useState(null);

    async function handleCreate(e) {
        e.preventDefault();
        try {
            await dispatch(createClass({ name: className }));
            setClassName('');
            setShowForm(false);
            dispatch(getClasses({}));
        } catch (error) {
        console.log(error);
        }
    }

    async function handleDelete(e, classID) {
        e.preventDefault();
        try {
            await dispatch(deleteClass({ classID }));
            dispatch(getClasses({}));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='classes-page'>
            <h1>Your Classes</h1>

            { !showForm && <button onClick={() => setShowForm(true)}>Add Class</button> }

            <div className='class-list'>
                {showForm ? (
                    <div>
                        <form className='class-form' onSubmit={handleCreate}>
                        <input type="text" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} />
                        <div className='class-buttons'>
                            <button type="submit">{editClassID ? 'Update' : 'Add'}</button>
                            <button onClick={() => { setShowForm(false); setEditClassID(null); setClassName(''); }}>Cancel</button>
                        </div>
                        </form>
                    </div>
                ) : (
                    <></>
                )}
                { status === 'fulfilled' ? (
                    classes.map((cls) => 
                        <NavLink key={cls._id} className='class-card' to={`/classes/${cls._id}`}>
                            <h3>{cls.name}</h3>
                            <button onClick={(e) => handleDelete(e, cls._id)}>Delete</button>
                        </NavLink>
                    )
                ) : (
                    status === 'pending' ? (
                        <Loader />
                    ) : (
                        <div className='error-message'>An error occurred</div>
                    )
                )}

            </div>
        </div>
    );
}