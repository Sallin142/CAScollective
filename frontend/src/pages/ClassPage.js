import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectClasses, getClasses, selectClassesStatus, deleteStudent, addStudents } from "../features/classesSlice";
import '../stylesheets/ClassPage.css';
import CSVFileOpener from "../components/CSVFileOpener";
import Loader from "../components/Loader";

export default function ClassPage() {
    const status = useSelector(selectClassesStatus);
    const dispatch = useDispatch();
    const { classID } = useParams();  
    const classes = useSelector(selectClasses);
    const cls = classes.find((cls) => cls._id === classID);
    console.log(status);

    useEffect(() => {
        dispatch(getClasses({}));
    }, []);

    const [showForm, setShowForm] = useState(false);

    async function handleDelete(userID) {
        try {
            await dispatch(deleteStudent({ classID, userID }));
            dispatch(getClasses({}));
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAddStudents(students) {
        try {
            await dispatch(addStudents({ classID, students: students }));
            setShowForm(false);
            dispatch(getClasses({}));
        } catch (error) {
            console.log(error);
        }
    }

    async function handleStudentSubmit(e) {
        e.preventDefault();
        await handleAddStudents([e.target.userID.value]);
    }

    return (
        <div className="class-page">
        { status === 'fulfilled' ? (
            <>
            <h1>{cls.name}</h1>
            { showForm ? (
                <>
                    <form className="student-form" onSubmit={handleStudentSubmit} autoComplete="off">
                        <div className="single-student-form">
                            <input placeholder="Student Computing ID" name="userID" />
                            <div className="single-form-buttons">
                                <button type="submit">Add</button>
                                <button onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </div>

                        <CSVFileOpener
                            remove={() => setShowForm(false)}
                            
                            onSubmit={(data) => {
                                setShowForm(false);
                                handleAddStudents(data);
                            }}
                        />
                    </form>
                    
                </>
            ) : (
                <button onClick={() => setShowForm(true)}>Add Students</button>
            )}
            <div className="student-list">
                { Array.isArray(cls.students) && cls.students.length !== 0 ? cls.students.map((student) => (
                <div className="student-card" key={student}>
                    <h3>{student}</h3>
                    <button onClick={() => handleDelete(student)}>Delete</button>
                </div>
                )) : (
                    <h2 className="no-students">No students</h2>
                )}
            </div>
            </>
        ) : (
            status === 'pending' ? (
                <Loader />
            
            ) : (
                <h1 className="no-class">Class not found</h1>
            )
        )}
        </div>
    );
}