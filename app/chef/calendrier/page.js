"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Layout from '../components/layout';

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('api/tache');
                const tasks = response.data;
                const eventsData = tasks.map(task => ({
                    title: task.tache,
                    start: new Date(task.dateDebut),
                    end: new Date(task.dateFin),
                    allDay: true // Indique que l'événement dure toute la journée
                }));
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <Layout>
            <div style={{ height: '600px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ margin: '50px' }}
                />
            </div>
        </Layout>
    );
}
