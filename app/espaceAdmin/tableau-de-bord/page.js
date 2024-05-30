// projet.js
/*
const TableauDeBordPage = () => {
    return (

        <div id="resultat">
            <h1 className="titre">TABLEAU DE BORD_</h1>
        </div>
    );
};

export default TableauDeBordPage;

*/
/*
"use client"
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Layout from '../Layout';

const TableauDeBordPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedChart !== '') {
      switch (selectedChart) {
        case 'projectByMonthChart':
          renderProjectByMonthChart();
          break;
        case 'projectStatusChart':
          renderProjectStatusChart();
          break;
        case 'teamProjectChart':
          renderTeamProjectChart();
          break;
        default:
          break;
      }
    }
  }, [selectedChart]);

  const renderProjectByMonthChart = () => {
    // Code pour le diagramme des projets par mois
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const projectsByMonth = Array(12).fill(0);

    projectData.forEach(project => {
      const monthIndex = new Date(project.date_debut).getMonth();
      projectsByMonth[monthIndex]++;
    });

    const ctx = document.getElementById('projectByMonthChart');

    // Détruire le graphique précédent s'il existe
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    // Créer un nouveau graphique
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Number of Projects',
          data: projectsByMonth,
          backgroundColor: '#50C878',
          borderColor: '#50C878',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  };

  const renderProjectStatusChart = () => {
    // Code pour le diagramme circulaire du statut des projets
    const projectStatusCounts = {};

    projectData.forEach(project => {
      if (projectStatusCounts[project.statut]) {
        projectStatusCounts[project.statut]++;
      } else {
        projectStatusCounts[project.statut] = 1;
      }
    });

    const ctx = document.getElementById('projectStatusChart');

    // Détruire le graphique précédent s'il existe
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    // Créer un nouveau graphique
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(projectStatusCounts),
        datasets: [{
          label: 'Project Status',
          data: Object.values(projectStatusCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(120, 40, 200, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(120, 40, 200, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  };

  const renderTeamProjectChart = () => {
    // Code pour le diagramme circulaire de l'équipe en fonction du nombre de projets
    const teamProjectCounts = {};

    projectData.forEach(project => {
      const teamMembers = project.equipe.split(',').map(member => member.trim());
      teamMembers.forEach(member => {
        if (teamProjectCounts[member]) {
          teamProjectCounts[member]++;
        } else {
          teamProjectCounts[member] = 1;
        }
      });
    });

    const ctx = document.getElementById('teamProjectChart');

    // Détruire le graphique précédent s'il existe
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    // Créer un nouveau graphique
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(teamProjectCounts),
        datasets: [{
          label: 'Team Members',
          data: Object.values(teamProjectCounts),
          backgroundColor: [/*Turquoise douce : #5FC8D8
          Rose pâle : #F4A7B9
          Jaune doux : #FFD868
          Gris clair : #D3D3D3----Bleu cobalt : #0047AB
Bleu sarcelle : #30D5C8
Vert émeraude : #50C878
Bleu marine : #001F3F
            '#0047AB', '#30D5C8', '#50C878', '#001F3F',
          ],
          borderColor: [
            '#0047AB', '#30D5C8', '#50C878', '#001F3F',
          ],
          borderWidth: 1
        }]
      }
    });
  };

  const handleChartButtonClick = (chartId) => {
    setSelectedChart(chartId);
  };

  return (
    <Layout>
      <div className="menu-container">
      <h1 className="text-black">----------------</h1>
      <h1 className="text-black">----------------</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={() => handleChartButtonClick('projectByMonthChart')}>
          Répartition des projets par mois
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={() => handleChartButtonClick('projectStatusChart')}>
          Statut des projets
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={() => handleChartButtonClick('teamProjectChart')}>
          Répartition de l'équipe en fonction des projets
        </button>
      </div>
      <div className="border-l ml-4 h-full"></div> {/* Ligne verticale
      <h1 className="text-black">----------------</h1>
      <h1 className="text-black">----------------</h1>
      <h1 className="text-black">----------------</h1>
      <div className="charts-container">
      <div className="section-background">
        <div className="chart" style={{ display: selectedChart === 'projectByMonthChart' ? 'block' : 'none' }}>
          <canvas id="projectByMonthChart" width="400" height="200"></canvas><h1 className="text-black">----------------</h1>
<h1 className="text-black">----------------</h1>
          <p>Description: Répartition des projets par mois</p>
        </div>
        <div className="chart" style={{ display: selectedChart === 'projectStatusChart' ? 'block' : 'none' }}>
          <canvas id="projectStatusChart" width="400" height="200"></canvas><h1 className="text-black">----------------</h1>
<h1 className="text-black">----------------</h1>
          <p>Description: Statut des projets</p>
        </div>
        <div className="chart" style={{ display: selectedChart === 'teamProjectChart' ? 'block' : 'none' }}>
          <canvas id="teamProjectChart" width="400" height="200"></canvas>
          <h1 className="text-black">----------------</h1>
<h1 className="text-black">----------------</h1>
          <p>Description: Répartition de l'équipe en fonction du nombre de projets effectués</p>
        </div>
      </div></div>
      <h1 className="text-black">----------------</h1>
<h1 className="text-black">----------------</h1><h1 className="text-black">----------------</h1>
<h1 className="text-black">----------------</h1><h1 className="text-black">----------------</h1>
<h1 className="text-black">----------------</h1><h1 className="text-black">----------------</h1>
<h1 className="text-black">----------------</h1>
    </Layout>
  );
};

export default TableauDeBordPage;*/

"use client"
//import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import Layout from '../Layout';
import React, { useState, useEffect} from 'react';





const TableauDeBordPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [historique, setHistorique] = useState([]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projets');
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    renderProjectByMonthChart();
    renderProjectStatusChart();
    //renderTeamProjectChart();
  }, [projectData]);

  const renderProjectByMonthChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const projectsByMonth = Array(12).fill(0);

    projectData.forEach(project => {
      const monthIndex = new Date(project.date_debut).getMonth();
      projectsByMonth[monthIndex]++;
    });

    const ctx = document.getElementById('projectByMonthChart');

    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Number of Projects',
          data: projectsByMonth,
          backgroundColor: '#50C878',
          borderColor: '#50C878',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    }); //updateHistorique('Affichage du graphique des projets par mois');
  };

 


  const renderProjectStatusChart = () => {
    const projectStatusCounts = {};

    projectData.forEach(project => {
      if (projectStatusCounts[project.statut]) {
        projectStatusCounts[project.statut]++;
      } else {
        projectStatusCounts[project.statut] = 1;
      }
    });

    const ctx = document.getElementById('projectStatusChart');

    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(projectStatusCounts),
        datasets: [{
          label: 'Project Status',
          data: Object.values(projectStatusCounts),
          backgroundColor: [
            '#0047AB', '#30D5C8', '#50C878', '#001F3F',
          ],
          borderColor: [
            '#0047AB', '#30D5C8', '#50C878', '#001F3F',
          ],
          borderWidth: 1
        }]
      },
      animation: {
        duration: 9000, // Durée de l'animation en millisecondes
        easing: 'easeInOutElastic', // Type d'animation moderne
        onProgress: function(animation) {
          const chartInstance = animation.chart;
          const ctx = chartInstance.ctx;
          const dataset = chartInstance.data.datasets[0];
          const meta = chartInstance.getDatasetMeta(0);

          meta.data.forEach((point, index) => {
            const { x, y } = point.getProps(['x', 'y'], animation.easing);
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = dataset.borderColor[index % dataset.borderColor.length];
            ctx.fill();
            ctx.restore();
          });
        }
      }
    });  
    //updateHistorique('Affichage du graphique de statut des projets');
  };



/*
const renderTeamProjectChart = () => {
  const teamProjectCounts = {};

  projectData.forEach(project => {
    const teamMembers = project.equipe.split(',').map(member => member.trim());
    teamMembers.forEach(member => {
      if (teamProjectCounts[member]) {
        teamProjectCounts[member]++;
      } else {
        teamProjectCounts[member] = 1;
      }
    });
  });

  const ctx = document.getElementById('teamProjectChart');

  if (Chart.getChart(ctx)) {
    Chart.getChart(ctx).destroy();
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(teamProjectCounts),
      datasets: [{
        label: 'Team Members',
        data: Object.values(teamProjectCounts),
        backgroundColor: [
          'rgba(0, 71, 171, 0.2)', 
          '#F31260', 
          'rgba(80, 200, 120, 0.2)', 
          '#F5A524',
        ],
        borderColor: [
          '#0047AB', '#F31260', '#50C878', '#F5A524',
        ],
        borderWidth: 2,
        fill: true,  // Remplir la zone sous la ligne
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: [
          '#0047AB', '#F31260', '#50C878', '#F5A524',
        ],
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 9000, // Durée de l'animation en millisecondes
        easing: 'easeInOutElastic' // Type d'animation moderne
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 400 // Durée de l'animation au survol
      },
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem) {
              return ` ${tooltipItem.label}: ${tooltipItem.raw}`;
            }
          }
        }
      }
    }
  }); //updateHistorique('Affichage du graphique des projets par équipe');
};
*/
useEffect(() => {
  if (projectData.length > 0) {
    renderProjectByMonthChart();
    renderProjectStatusChart();
    //renderTeamProjectChart();
  }
}, [projectData]);

const ResultSection = ({ children }) => (
  <div className="my-8 flex items-center">
    <div className="rounded-lg bg-gray-200 p-8 text-black-bold transition-transform duration-300 hover:scale-105 hover:bg-gray-300">
      {children}
    </div>
  </div>
);

return (
  
  <Layout>
    
    <h1 className='text-white'>----------</h1><h1 className='text-white'>----------</h1>
    <h1 className='text-white'>----------</h1><h1 className='text-white'>----------</h1>
    
    <div className="charts-container">
      <div className="grid grid-cols-2 gap-9">
        <ResultSection>
          <div className="chart">
            <canvas id="projectByMonthChart" width="300" height="300"></canvas>
            <h1 className='text-white'>----------</h1>
            <p className='text-black items-center font-bold'>Description: Répartition des projets par mois</p>
          </div>
        </ResultSection>
            
        <ResultSection>
          <div className="chart">
            <canvas id="projectStatusChart" width="300" height="80"></canvas>
            <h1 className='text-white'>----------</h1>
            <p className='text-black items-center font-bold'>Description: Statut des projets</p>
          </div>
        </ResultSection>
      </div>
{/*}
      <ResultSection>
        <div className="chart">
          <canvas id="teamProjectChart" width="700" height="400"></canvas>
          <h1 className='text-white'>----------</h1>
          <p className='text-black items-center font-bold'> Description: Répartition de l'équipe en fonction du nombre de projets effectués</p>
        </div>
</ResultSection>*/}
    </div>
  </Layout>
);
};


export default TableauDeBordPage;
