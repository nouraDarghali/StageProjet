
import { TextField } from '@mui/material';
import { useState } from "react";

export default function AddFichier() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fileInput = document.getElementById("fileInput"); // Replace with your HTML element ID
const file = fileInput.files[0];

const formData = new FormData();
formData.append("file", file);

fetch("http://localhost:3000/espaceMembre/api/taches/fichiers", {
  method: "POST",
  body: formData,
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
            // Afficher ListeFichiers après envoi réussi
            setShowSuccessMessage(true);

        } catch (error) {
            // Gérer les erreurs de manière appropriée
            console.error('Erreur lors de la soumission :', error);
            alert(`Erreur lors de la soumission : ${error.message}`);
        }
    };

    return (
        <div>
            {showSuccessMessage && (
                <div className="bg-purple-300 border-2 dark:text-white border-blue-400 text-gray-700 p-4 rounded-md mb-4">
                    Fichier envoyé avec succès.
                </div>
            )}

            <form onSubmit={handleSubmit} className=" p-6 bg-white-700 border dark:bg-gray-700 dark:text-white shadow-lg rounded-lg">
                <TextField
                    id="fileInput" // Ajoutez l'ID ici
                    type="file"
                    className='dark:bg-gray-400 dark:text-white '
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 3, bgcolor: 'background.paper' }}
                    inputProps={{ accept: 'application/pdf, image/*' }}
                    InputProps={{
                        notched: true,
                        classes: {
                            root: 'rounded-md'
                        }
                    }}
                />

                <button
                    type="submit"
                    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
}
