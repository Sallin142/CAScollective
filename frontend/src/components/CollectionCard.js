import { NavLink } from 'react-router-dom';
import '../stylesheets/CollectionCard.css';

export default function CollectionCard({
    name,
    setShowEdit,
    setEditingCollection,
    handleDelete,
}) {

    return (
        <NavLink 
            to={`/collections/${name}`} /* TODO: change link to the name eventually */
            key={name}
            className='collection-card'
        > 
            <h2>{name}</h2>
            <div className='collection-card-buttons'>
                <button onClick={(e) => { 
                    e.preventDefault();
                    setShowEdit(true); 
                    setEditingCollection(name);
                }}>Edit</button>
                <button onClick={(e) => {
                    e.preventDefault(); // for some reason e.stopPropagation() doesn't work, but this does :/
                    handleDelete(name)
                }}>Delete</button>
            </div>
        </NavLink>
    );
}