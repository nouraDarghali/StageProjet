 'use client';
 import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr'; // Importation de la langue française

const fetchTaches = async (username) => {
    try {
        const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/mesTaches?username=${username}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des tâches');
        }
        const data = await response.json();
        return data.taches;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
};

const convertDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
};

const Calendriers = () => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const username = urlParams.get('username');
    console.log("username:", username);

    const [taches, setTaches] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndSetTaches = async () => {
            try {
                const fetchedTaches = await fetchTaches(username);
                console.log('Fetched tasks:', fetchedTaches);

                const transformedTaches = fetchedTaches.map(tache => {
                    let start = new Date(convertDate(tache.date_debut));
                    let end = tache.date_fin ? new Date(convertDate(tache.date_fin)) : null;

                    if (isNaN(start) || (end && isNaN(end))) {
                        throw new Error('Invalid date format');
                    }

                    // Préfixer le titre avec une icône "✔" si la tâche est terminée
                    const title = tache.statut === 'terminée' ? `✔ ${tache.tache}` : tache.tache;

                    console.log(`Tâche: ${tache._id} Date de début: ${start} Date de fin: ${end}`);

                    return {
                        id: tache._id,
                        title: title,
                        start: start.toISOString(),
                        end: end ? end.toISOString() : null,
                        allDay: true,
                        status: tache.statut // Ajoutez le statut pour une utilisation ultérieure
                    };
                });
                console.log('Transformed tasks:', transformedTaches);
                setTaches(transformedTaches);
            } catch (err) {
                setError(err);
            }
        };

        fetchAndSetTaches();
    }, [username]);

    const handleDateClick = (arg) => {
        const title = prompt('Entrez le titre de l\'événement :');
        if (title) {
            const newTache = { title, start: arg.date.toISOString(), allDay: arg.allDay };
            setTaches([...taches, newTache]);
        }
    };

    const handleEventDropOrResize = async (arg) => {
        const { event } = arg;

        try {
            const updatedTache = {
                id: event.id,
                date_debut: `${event.start.getFullYear()}-${(event.start.getMonth() + 1).toString().padStart(2, '0')}-${event.start.getDate().toString().padStart(2, '0')}`,
                date_fin: event.end ? `${event.end.getFullYear()}-${(event.end.getMonth() + 1).toString().padStart(2, '0')}-${event.end.getDate().toString().padStart(2, '0')}` : null,
            };
            const response = await fetch(`http://localhost:3000/espaceMembre/api/taches/calendrier/${updatedTache.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTache),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la tâche');
            }

            const updatedTaches = taches.map(tache =>
                tache.id === updatedTache.id
                    ? { ...tache, start: updatedTache.date_debut, end: updatedTache.date_fin }
                    : tache
            );

            setTaches(updatedTaches); // Mettre à jour l'état local après la mise à jour réussie

            console.log('Tâche mise à jour avec succès');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }

    const eventContent = (eventInfo) => {
        const backgroundColor = eventInfo.event.extendedProps.status === 'terminée' ? 'bg-green-400' : 'bg-yellow-400';
        return (
            <div className={`p-8 rounded ${backgroundColor}`}>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        );
    };
    return (
        <div id='resultat'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={taches}
                dateClick={handleDateClick}
                eventDrop={handleEventDropOrResize}
                eventResize={handleEventDropOrResize}
                editable={true}
                locale={frLocale} // Ajoutez cette ligne pour définir la langue en français
                eventContent={eventContent}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }} // Ajoutez cette ligne pour définir les boutons de navigation
            />
        </div>
    );
};

export default Calendriers;
