// HR-UPDATER: v1.0
import React from 'react';
import Autorenbox from './Autorenbox';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Ueber den Autor</h2>
        <div className="autor-content">
          <p>
            Thomas Sander gruendete stellenangebotekrankenpflege.de mit der Vision, den Recruiting-Prozess
            im Bereich Krankenpflege grundlegend zu verbessern.
          </p>
          <Autorenbox />
        </div>
      </div>
    </div>
  );
};

export default AuthorModal;
