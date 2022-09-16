//------------------------------------------------------------------------9------------------------------------------------------------------------

import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Esteban'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        //------------------------------------------------------------------------12------------------------------------------------------------------------
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null;
        },
        //------------------------------------------------------------------------12------------------------------------------------------------------------
        //------------------------------------------------------------------------13------------------------------------------------------------------------
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {

                if (event._id === payload._id) {
                    return payload;
                }

                return event;
            })
        },
        //------------------------------------------------------------------------13------------------------------------------------------------------------
        //------------------------------------------------------------------------14------------------------------------------------------------------------
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
        //------------------------------------------------------------------------14------------------------------------------------------------------------
    }
});

//Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
//------------------------------------------------------------------------9------------------------------------------------------------------------