"use client";
import React, { useState, useEffect } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import Form from '../components/form';
import Table from '../components/table';
import Layout from '../components/Layout';


export default function ProjetPage() {
    const [showForm, setShowForm] = useState(false);
    const [projets, setProjets] = useState([]);

    const fetchProjets = async () => {
        const response = await fetch('/api/projets');
        const data = await response.json();
        setProjets(data);
    };

    useEffect(() => {
        fetchProjets();
    }, []);

    const handleFormSubmit = () => {
        fetchProjets();
        setShowForm(false);  // Hide the form after submission
    };

    return (
        <>
            <Layout>
                <p className="text-gray-700 text-3xl mb-16 font-bold"></p>

                <div className="grid col-1 bg-white h-auto shadow-sm">
                    <div className="p-4">
                        <button
                            className='bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800'
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Ajouter projet' : 'Ajouter Projet'}

                        </button>
                    </div>
                    <div className="container mx-auto">
                        <div className={`${showForm ? 'p-4' : 'hidden'}`}>
                            <Form onSubmit={handleFormSubmit} />
                        </div>
                        <div className="py-4">
                            {!showForm && <Table projets={projets} />}
                        </div>
                    </div>
                </div></Layout>
        </>
    );
}
