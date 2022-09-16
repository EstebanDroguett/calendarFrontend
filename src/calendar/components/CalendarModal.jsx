//------------------------------------------------------------------------6------------------------------------------------------------------------
import { addHours, differenceInSeconds } from 'date-fns';
import React, { useMemo, useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); //Se utiliza el id que tiene el index.html.

export const CalendarModal = () => {

    //------------------------------------------------------------------------8------------------------------------------------------------------------
    const { isDateModalOpen, closeDateModal } = useUiStore();
    //------------------------------------------------------------------------8------------------------------------------------------------------------
    //------------------------------------------------------------------------10-12------------------------------------------------------------------------
    const { activeEvent, startSavingEvent } = useCalendarStore();
    //------------------------------------------------------------------------10-12------------------------------------------------------------------------
    const [formSubmitted, setFormSubmitted] = useState(false)

    const [formValue, setFormValue] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValue.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValue.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValue({ ...activeEvent });
        }


    }, [activeEvent])


    const onInputChanged = ({ target }) => {          //Sirve para poder realizar cambios de texto en el modal.
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValue({
            ...formValue,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log('cerrando modal');
        closeDateModal();
        //------------------------------------------------------------------------8------------------------------------------------------------------------
        //setIsOpen(false);
        //------------------------------------------------------------------------8------------------------------------------------------------------------
    }

    const onSubmit = async (event) => {                   //Se coloca en el formulario, para prevenir una recarga al momento de enviar este formulario.
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValue.end, formValue.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if (formValue.title.length <= 0) return;

        console.log({ formValue });

        //TODO:
        await startSavingEvent(formValue);
        closeDateModal();
        setFormSubmitted(false);
        
    }

    return (
        <Modal
            //isOpen={isOpen}
            //------------------------------------------------------------------------8------------------------------------------------------------------------
            isOpen={isDateModalOpen}
            //------------------------------------------------------------------------8------------------------------------------------------------------------
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValue.start}
                        onChange={(event) => onDateChanged(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        selected={formValue.end}
                        onChange={(event) => onDateChanged(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValue.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValue.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
//------------------------------------------------------------------------6------------------------------------------------------------------------