import React from 'react';

const ModalResult = ({ accuracy, letter, lines, shapes, onClose }) => {
    return (
        <div className="modal-content">
            <h2>Results</h2>
            <p>Detected Letter: {letter}</p>
            <p>Accuracy: {accuracy.toFixed(2)}%</p>
            <h3>Line Detection</h3>
            <ul>
                {Object.entries(lines).map(([lineType, percentage]) => (
                    <li key={lineType}>{lineType}: {percentage}%</li>
                ))}
            </ul>
            <h3>Shape Detection</h3>
            <ul>
                {Object.entries(shapes).map(([shapeType, count]) => (
                    <li key={shapeType}>{shapeType}: {count}</li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ModalResult;
