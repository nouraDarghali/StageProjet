"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Table from './components/table_2';
import Layout from './components/layout';

export default function Chef() {
    const [projets, setProjets] = useState([]);
    const router = useRouter();
   

    const fetchProjets = async (chefProjet) => {
        const response = await fetch(`/api/projets?chefProjet=${chefProjet}`);
        const data = await response.json();
        setProjets(data);
    };

    

    return (
        <Layout>
            <div><br /><br />
                <p className="text-gray-700 text-3xl mb-16 font-bold">Projets </p>
                <div className="grid col-1 bg-white h-96 shadow-sm">
                    <Table projets={projets} />
                </div>
            </div>
        </Layout>
    );
}
