import { useCalendarStore } from "../../hooks"

//------------------------------------------------------------------------14------------------------------------------------------------------------
export const FabDelete = () => {

    const {startDeleteEvent, hasEventSelected} = useCalendarStore();

    const handleDelete = () => {
        startDeleteEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '': 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
//------------------------------------------------------------------------14------------------------------------------------------------------------