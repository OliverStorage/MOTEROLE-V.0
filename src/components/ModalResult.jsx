import React from 'react';

const ModalResult = ({ accuracy, onClose }) => {
    return (
        <div className="bg-white rounded-lg p-5 shadow-lg">
            <h2 className="text-xl font-bold">Result</h2>
            <p className="mt-2">Accuracy: {accuracy.toFixed(2)}%</p>
            <button
                onClick={onClose}
                className="mt-4 rounded bg-blue-600 p-2 text-white"
            >
                Close
            </button>
        </div>
    );
};

export default ModalResult;
